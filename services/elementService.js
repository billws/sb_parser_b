let TagParser = require('./elementParser/tagParser');
let AttrParser = require('./elementParser/attrParser');

const parsers = {
    "Tag": TagParser,
    "Attr": AttrParser
};

class ElementService {
    constructor(type, option){
        return new parsers[type](option);
    }
}


//export default ParseService;
module.exports = ElementService;