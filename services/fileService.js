//import fs from "fs";
let EventEmitter = require("events").EventEmitter;
let util = require("util");
let fs = require("fs");

class FileService {
    constructor(){
        this.fileContent = "";
    }

    loadFileSync(fileLoc){
        try {
            this.fileContent = fs.readFileSync(fileLoc, "utf8");
            return fs.readFileSync(fileLoc, "utf8");
        } catch(exception) {
            console.log(`loadFileSync failed,\nexception: ${exception}`);
            return "{}";
        }
    }

    loadFileFromLoc(fileLoc){
        return this.loadFileFromStream(fs.createReadStream(fileLoc));
    }

    loadFileFromStream(fileStream){
        fileStream.setEncoding("UTF8");
        fileStream.on("data", (chunk)=>{
            this.fileContent += chunk.toLowerCase();
        });
        fileStream.on("end", ()=>{
            this.emit("loadedFile", this.fileContent);
        });
        fileStream.on("error", (error)=>{
            console.log(`loadFileFromStream failed,\nexception: ${error}`);
        });
        return this;
    }

    writingFile(fileLoc, data){
        let fileStream = fs.createWriteStream(fileLoc);
        fileStream.write(data, "UTF8");
        fileStream.end();
        fileStream.on("finish", () => {
            this.emit("wroteFile", data);
        });
        fileStream.on("error", (error) => {
            console.log(`writingFile failed,\nexception: ${error}`);
        })
        return this;
    }
}

util.inherits(FileService, EventEmitter);
//export default FileService;
module.exports = FileService;