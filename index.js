//import FileService from "./services/fileService";
let FileService = require("./services/fileService");
let ParseService = require("./services/parseService");
let ConvertService = require("./services/convertService");

const configLocation = "./config.conf";

class Sb_parser_b {
    constructor(option) {
        this.convertService = new ConvertService();
        this.fileService = new FileService();
        this.loadedFile = this.loadedFile.bind(this);
        this.ruleOption = {
            "preRules": this.init(configLocation),
            "strongNumber": option.strongNumber,
            "disableRules": option.disableRules,
            "addRules": option.addRules
        };
        this.fileLoc = option.htmlLoc;
        this.fileStream = option.fileStream;
        this.outputLoc = option.outputLoc;
        this.results = {};
    }

    get getResult(){
        this.loadingFile();
    }

    init(configLoc){
        let configService = new FileService();
        let configContent = configService.loadFileSync(configLocation.toLowerCase());
        return this.convertService.stringToJson(configContent);
    }

    loadingFile(){
        let fileContent = "";
        if(typeof this.fileLoc !== "undefined"){
            this.fileService.loadFileFromLoc(this.fileLoc, this.loadedFile);
        } else {
            this.fileService.loadFileFromStream(this.fileStream, this.loadedFile);
        }
    }

    loadedFile(data){
        let parseService = new ParseService(this.ruleOption, data);
        this.results = parseService.parsing();
        this.fileService.writingFile(this.outputLoc, this.convertService.jsonToString(this.results));
        //return this.results;
    }
}


//export default Sb_parser_b;
module.exports = Sb_parser_b;