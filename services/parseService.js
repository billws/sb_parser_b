let elementService = require("./elementService");

class ParseService {
    constructor(option){
        this.option = option;
        if(Number.parseInt(this.option.strongNumber, 10)){
            this.option.preRules.rules.rule4.moreThan = Number.parseInt(this.option.strongNumber, 10);
        }
        this.option.disableRules.map((name) => {
            delete this.option.preRules.rules[name];
        });
    }

    parsingString(data){
        return this.option;
    }
}


//export default ParseService;
module.exports = ParseService;