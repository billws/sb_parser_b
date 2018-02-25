const VOIDELEMENTS = {
    "area": "area",
    "base": "base",
    "br": "br",
    "col": "col",
    "embed": "embed",
    "hr": "hr",
    "img": "img",
    "input": "input",
    "keygen": "keygen",
    "link": "link",
    "meta": "meta",
    "param": "param",
    "source": "source",
    "track": "track",
    "wbr": "wbr"
}

class TagParser {
    constructor(tagName){
        this.tag = tagName;
    }

    get tagName(){
        return this.tag;
    }

    findStartIndex(raw, fromIndex, maxLength){
        if(maxLength < fromIndex){
            return -1;
        }
        let startIndex = -1;
        let searchValue = `<${this.tag}`;
        let matchIndex = raw.indexOf(searchValue, fromIndex);
        if(matchIndex === -1){
            return startIndex;
        }
        if (raw[matchIndex + searchValue.length] === " " || raw[matchIndex + searchValue.length] === ">") {
            startIndex = matchIndex;
        } else {
            startIndex = this.findStartIndex(raw, matchIndex + searchValue.length, maxLength);
        }
        return startIndex;
    }

    findStartTagEndIndex(raw, fromIndex, maxLength){
        if(maxLength < fromIndex){
            return -1;
        }
        let endIndex = -1;
        let searchValue = ">";
        let matchIndex = raw.indexOf(searchValue, fromIndex);
        if(matchIndex === -1){
            return endIndex;
        }
        endIndex = matchIndex;
        return endIndex;
    }

    findEndIndex(raw, fromIndex, maxLength){
        if(maxLength < fromIndex){
            return -1;
        }
        let endIndex = -1;
        let searchValue = this.getSearchEndValue();
        let matchIndex = raw.indexOf(searchValue, fromIndex);
        if(matchIndex === -1){
            return endIndex;
        }
        if(searchValue.length === 1 || 
            (searchValue.length > 2 && (raw[matchIndex + searchValue.length] === " " || raw[matchIndex + searchValue.length] === ">"))){
            endIndex = matchIndex;
        } else {
            endIndex = this.findEndIndex(raw, matchIndex + searchValue.length, maxLength);
        }
        return endIndex;
    }

    getSearchEndValue(){
        if(VOIDELEMENTS.hasOwnProperty(this.tag)){
            return ">";
        }else{
            return `</${this.tag}`;
        }
    }
}


//export default ParseService;
module.exports = TagParser;