class ConvertService {
    stringToJson(jsonString){
        try{
            return JSON.parse(jsonString);
        } catch (exception){
            console.log(exception);
            return {};
        }
    }
    jsonToString(jsonObject){
        try{
            return JSON.stringify(jsonObject);
        } catch (exception){
            console.log(exception);
            return "{}";
        }
    }
}


//export default ParseService;
module.exports = ConvertService;