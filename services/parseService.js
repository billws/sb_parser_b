let elementService = require("./elementService");

const FIXTAGNAME = {
    "html": "html",
    "head": "head",
    "body": "body"
}

class ParseService {
    constructor(option, raw){
        this.option = option;
        if(!isNaN(parseInt(this.option.strongNumber, 10))){
            this.option.preRules.rules.rule4.moreThan = Number.parseInt(this.option.strongNumber, 10);
        }
        this.option.disableRules.map((name) => {
            delete this.option.preRules.rules[name];
        });
        this.rawCode = raw;
        this.rawLength = raw.length;
        this.headBlock = this.parsingTagBlock(FIXTAGNAME.head);
        this.bodyBlock = this.parsingTagBlock(FIXTAGNAME.body);
        this.results = {};
    }

    parsing(){
        Object.keys(this.option.preRules.rules).map((key)=>{
            this.results[key] = this.parsingByRule(key, this.option.preRules.rules[key]);
        });

        this.option.addRules.map((rule, index)=>{
            let addKey = `User-defined${index}`;
            this.results[addKey] = this.parsingByRule(addKey, rule);
        });

        return this.results;
    }

    parsingByRule(key, rule){
        let result = "";
        if(!rule.hasOwnProperty("tag")){
            result = `${key} rule-defined error.`;
        }
        let scope = this.getBlockIndex(rule);
        let elements = [];
        this.getAllElements(new elementService("Tag", rule.tag), scope, 0, scope.length, elements);
        
        if(rule.hasOwnProperty("moreThan")){
            if(elements.length > rule.moreThan){
                result += `This HTML have more than ${rule.moreThan} <${rule.tag}> tag. `
            }
        }

        if(rule.hasOwnProperty("mustHave")){
            if(elements.length === 0){
                result += `This HTML without <${rule.tag}> tag. `
            }
        }

        if(rule.hasOwnProperty("withoutAttr") && rule.withoutAttr){
            let withoutElements = this.parsingTagAttr(scope, elements, rule, rule.withoutAttr, false);
            if(withoutElements.length > 0){
                result += `There are ${withoutElements.length} <${rule.tag}> tag without ${rule.withoutAttr} attribute. `;
            }
        }

        if(rule.hasOwnProperty("withAttr") && rule.withAttr){
            let withElements = this.parsingTagAttr(scope, elements, rule, rule.withAttr, true);
            if(withElements.length > 0){
                result += `There are ${withElements.length} <${rule.tag}> tag with ${rule.withAttr} attribute and value is ${rule.attrValue}. `;
            } else {
                result += `There are no <${rule.tag}> tag with ${rule.withAttr} attribute and value is ${rule.attrValue}. `;
            }
        }

        return result;
    }

    parsingTagAttr(scope, elements, rule, attrKey, isContain){
        let matchElements = [];
        elements.map((element)=>{
            let attrValue = (rule.hasOwnProperty("attrValue") && rule.attrValue) ? rule.attrValue : "";
            let matchElement = this.parsingAttr(scope.substring(element.startIndex, element.endIndex), isContain, attrKey, attrValue);
            if(matchElement.hasOwnProperty("raw")){
                matchElements.push(matchElement);
            }
        });
        return matchElements;
    }

    getBlockIndex(rule){
        if(rule.hasOwnProperty("block")){
            if(rule.block === "head"){
                return this.headBlock;
            }else{
                return this.bodyBlock;
            }
        }
        return this.bodyBlock;
    }

    getAllElements(tagService, scope, startIndex, maxLength, elements){
        let startTagIndex = tagService.findStartIndex(scope, startIndex, maxLength);
        let endTagIndex;
        if(startTagIndex >= 0){
            endTagIndex = tagService.findStartTagEndIndex(scope, startTagIndex, maxLength);
            if(startTagIndex >= 0 && endTagIndex > 0){
                elements.push({"startIndex": startTagIndex, "endIndex": endTagIndex});
                this.getAllElements(tagService, scope, endTagIndex, maxLength, elements);
            }
        }
    }

    parsingTagBlock(tag){
        let htmlTagService = new elementService("Tag", tag);
        let startTagIndex = htmlTagService.findStartIndex(this.rawCode, 0, this.rawLength);
        let endTagIndex;
        if(startTagIndex >= 0){
            endTagIndex = htmlTagService.findEndIndex(this.rawCode, startTagIndex, this.rawLength);
        }
        if(startTagIndex >= 0 && endTagIndex > 0){
            return this.rawCode.substring(startTagIndex, endTagIndex);
        }
        return "";
    }

    

    parsingAttr(raw, isContain, attrKey, attrValue){
        let attrService = new elementService("Attr", attrKey);
        if(isContain === attrService.detectAttr(raw, attrValue)){
            return {"raw": raw};
        }
        return {};
    }
}


//export default ParseService;
module.exports = ParseService;