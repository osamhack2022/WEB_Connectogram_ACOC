/**
 * 패킷 분석을 위한 라우터
 * @author 중사 박길선
 * @since 2022.10.12
 * @param {*} app 
 */
const cors = require('cors');
const sqlMap = require('../db/sql-map');

module.exports = (app)=>{
    
    app.get("/api/analyze/packet-data", async (request, response)=>{
        let rtn = await sqlMap.analyze.selectTbPacketLogs({});
        response.send(rtn);
    })

    app.post("/api/analyze/make-connection-data", async (request, response)=>{
        let {public_ip, time, connection} = request.body;
        console.log(public_ip, time, JSON.stringify(connection));

        sqlMap.analyze.insertTbConnectionData({
            public_ip,
            time,
            connection : JSON.stringify(connection)
        })
        response.send({msg : `Complate make connection data from ${public_ip}`});
    })

    app.get("/api/analyze/connection-data", async (request, response)=>{
        let {ip, start, end, conn} = request.query;
        try{
            start = `${start.substr(0,4)}-${start.substr(4,2)}-${start.substr(6,2)} ${start.substr(8,2)}:${start.substr(10,2)}:${start.substr(12,2)}`
        } catch(e){}
        try{
            end = `${end.substr(0,4)}-${end.substr(4,2)}-${end.substr(6,2)} ${end.substr(8,2)}:${end.substr(10,2)}:${end.substr(12,2)}`
        }
        catch(e){}
        let rtn = await sqlMap.analyze.selectTbConnectionData({ip, start, end, conn});
        if(rtn.length > 0){
            rtn.forEach((item,idx)=>{
                rtn[idx].connection = JSON.parse(item.connection);
            })
        }
        response.send(rtn);
    })
}