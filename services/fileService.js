//import fs from "fs";
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

    loadFileFromLoc(fileLoc, callback){
        this.loadFileFromStream(fs.createReadStream(fileLoc), callback);
    }

    loadFileFromStream(fileStream, callback){
        fileStream.setEncoding("UTF8");
        fileStream.on("data", (chunk)=>{
            this.fileContent += chunk;
        });
        fileStream.on("end", ()=>{
            callback(this.fileContent);
        });
        fileStream.on("error", (error)=>{
            console.log(`loadFileFromStream failed,\nexception: ${error}`);
        });
    }

    writingFile(fileLoc, data){
        let fileStream = fs.createWriteStream(fileLoc);
        fileStream.write(data, "UTF8");
        fileStream.end();
        fileStream.on("finish", () => {
            console.log(`Complete!\n${data}`);
        });
        fileStream.on("error", (error) => {
            console.log(`writingFile failed,\nexception: ${error}`);
        })
    }
}

//export default FileService;
module.exports = FileService;