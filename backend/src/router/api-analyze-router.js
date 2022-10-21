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
        let {private_ip, public_ip, time, connection} = request.body;

        if(connection.length > 0){
            connection.forEach(async (item, idx)=>{
                let ip = item.foreign.match(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/).toString()
                let isMalicious = await sqlMap.analyze.selectTbBlockListIp({ip});
                if(isMalicious.length > 0)  connection[idx].is_malicious = true;
                else connection[idx].is_malicious = false;
            })

        }


        sqlMap.analyze.insertTbConnectionData({
            private_ip,
            public_ip,
            time,
            connection : JSON.stringify(connection)
        })
        response.send({msg : `Complete make connection data from ${public_ip}`});
    })

    app.get("/api/analyze/connection-data", async (request, response)=>{
        let {ip, privateip, start, end, conn, lastest} = request.query;
        try{
            start = `${start.substr(0,4)}-${start.substr(4,2)}-${start.substr(6,2)} ${start.substr(8,2)}:${start.substr(10,2)}:${start.substr(12,2)}`
        } catch(e){}
        try{
            end = `${end.substr(0,4)}-${end.substr(4,2)}-${end.substr(6,2)} ${end.substr(8,2)}:${end.substr(10,2)}:${end.substr(12,2)}`
        }
        catch(e){}
        let rtn = await sqlMap.analyze.selectTbConnectionData({ip, privateip, start, end, conn, lastest : parseInt(lastest)});
        if(rtn.length > 0){
            rtn.forEach((item,idx)=>{
                rtn[idx].connection = JSON.parse(item.connection);
            })
        }
        response.send(rtn);
    })

    app.get("/api/analyze/client-list", async (request, response)=>{
        return await sqlMap.analyze.selectDistinctTbConnectionData({});
    })

    app.get("/api/analyze/blocklistip", async (request, response)=>{
        let {ip} = request.query;
        console.log(ip);
        if(ip != undefined && ip != ''){
            let iptoLong = function toInt(ip) {
                var ipl = 0;
                ip.split('.').forEach(function (octet) {
                    ipl <<= 8;
                    ipl += parseInt(octet);
                });
                return (ipl >>> 0);
            };
            
            rtn = await sqlMap.analyze.selectTbBlockListIp({ip : iptoLong(ip)});
            console.log(rtn);
            if(rtn.length > 0){
                response.send({result : true, block : rtn})
            }
            else{
                response.send({result : false})
            }
        }
        else{
            response.send({msg : `You Need IP`})
        }
    })
}