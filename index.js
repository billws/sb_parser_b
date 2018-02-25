//import FileService from "./services/fileService";
let FileService = require("./services/fileService");
let ParseService = require("./services/parseService");
let ConvertService = require("./services/convertService");
let EventEmitter = require("events").EventEmitter;
let util = require("util");

const configLocation = "config.conf";

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

    parsing(){
        return this.loadingFile().on("parsedFile", this.parsedFile);
    }

    parsedFile(){
        let results = "";
        Object.keys(this.results).map((key)=>{
            results += `${this.results[key]}\n`;
        });
        this.fileService.writingFile(this.outputLoc, results).on("wroteFile", ()=>{
            this.emit("completedOutput", results);
        });
        return this;
    }

    init(configLoc){
        let configService = new FileService();
        let configContent = configService.loadFileSync(configLocation.toLowerCase());
        return this.convertService.stringToJson(configContent);
    }

    loadingFile(){
        let fileContent = "";
        if(typeof this.fileLoc !== "undefined"){
            this.fileService.loadFileFromLoc(this.fileLoc).on("loadedFile", this.loadedFile);
        } else {
            this.fileService.loadFileFromStream(this.fileStream).on("loadedFile", this.loadedFile);
        }
        return this;
    }

    loadedFile(data){
        let parseService = new ParseService(this.ruleOption, data);
        this.results = parseService.parsing();
        this.emit("parsedFile");
        return this;
    }
}

util.inherits(Sb_parser_b, EventEmitter);
//export default Sb_parser_b;
module.exports = Sb_parser_b;