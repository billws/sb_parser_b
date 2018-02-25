# sb_parser_b


1. Create a config file "config.conf" for pre rules at root folder.

2. 
Sample code 
```
let Sb_parser = require("Sb_parser_b");
let fs = require("fs");
let htmlLoc = "./product.html";
let outputLoc = "./results.txt";


class Sample {
    execute(){
        let option = {
            // Config the input path.
            "htmlLoc": htmlLoc,
            "fileStream": fs.createReadStream(htmlLoc),
            // Config the output destination.
            "outputLoc": outputLoc,
            // Config the strong number.
            "strongNumber": "5",
            // Config disable rule.
            "disableRules": ["rule3i"],
            // Add rules by user.
            "addRules":[
                {"tag": "meta", "withAttr": "name", "attrValue": "robots", "block": "head", "detect": ""}
            ]
        };

        let htmlParser = new Sb_parser(option);

        htmlParser.parsing().on("parsedFile", ()=>{
            console.log(`Parsed completely!\n`);
        }).on("completedOutput", (results)=>{
            console.log(results);
        });
        
    }
}

let sample = new Sample();
sample.execute();
```