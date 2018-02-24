//import Sb_parser from "./index";
let Sb_parser = require("./index");
let fs = require("fs");
let htmlLoc = "./product.html";
let outputLoc = "./results.txt";
//let htmlLoc;

let option = {
    "htmlLoc": htmlLoc,
    //"fileStream": fs.createReadStream(htmlLoc),
    "outputLoc": outputLoc,
    "strongNumber": "5",
    "disableRules": ["rule1", "rule99"],
    "addRules":{}
};

let htmlParser = new Sb_parser(option);
htmlParser.getResult;
