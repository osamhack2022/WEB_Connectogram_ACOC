/**
 * Chrome Extension과 통신하기 위한 API 라우터
 * @author 중사 박길선
 * @since 2022.10.03
 * @param {*} app 
 */
const cors = require('cors');

module.exports = (app)=>{
    
    app.post("/api/extension/pushPerformance", (request, response)=>{
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        let date = new Date().toJSON()
        let rtn = {reqDate : date, remoteIp : remoteIp, performance : JSON.parse(request.body.payload)};
        console.log(`${new Date().toLocaleString()} : GET /api/extension/pushPerformance > from ${remoteIp}`);  
        response.send(rtn);
    })



}