/**
 * 패킷 분석을 위한 라우터
 * @author 중사 박길선
 * @since 2022.10.12
 * @param {*} app 
 */
const cors = require('cors');
const sqlMap = require('../db/sql-map');

module.exports = (app)=>{
    
    app.get("/api/analyze/viewPacketData", async (request, response)=>{
        let rtn = await sqlMap.analyze.selectTbPacketLogs({});
        response.send(rtn);
    })



}