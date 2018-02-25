class AttrParser {
    constructor(attrKey){
        this.attr = attrKey;
    }
    
    detectAttr(raw, attrValue){
        let regexpRule;
        if(attrValue){
            regexpRule = new RegExp(`${this.attr}\s*\=\s*\"${attrValue}\"`);
        } else {
            regexpRule = new RegExp(`${this.attr}\s*\=\s*`);
        }
        return raw.search(regexpRule) >= 0 ? true : false;
    }
}


//export default ParseService;
module.exports = AttrParser;