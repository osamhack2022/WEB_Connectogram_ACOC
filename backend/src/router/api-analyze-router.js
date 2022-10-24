/**
 * 패킷 분석을 위한 라우터
 * @author 중사 박길선
 * @since 2022.10.12
 * @param {*} app 
 */
const cors = require('cors');
const sqlMap = require('../db/sql-map');
const axios = require("axios");
const cheerio= require("cheerio");

module.exports = (app) => {

    app.get("/api/analyze/packet-data", async (request, response) => {
        let rtn = await sqlMap.analyze.selectTbPacketLogs({});
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/analyze/packet-data > from ${remoteIp}`);  
        response.send(rtn);
    })

    app.post("/api/analyze/make-connection-data", async (request, response) => {
        let { private_ip, public_ip, time, connection } = request.body;
        if (connection.length > 0) {
            
            let cnt = 0;
            let getConnection = async (connection)=>{
                let res = [];

                for await(let item of connection){
                //connection.forEach(async (item, idx) => {
                    let ip = item.foreign.match(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/).toString()
                    let iptoLong = function toInt(ip) {
                        var ipl = 0;
                        ip.split('.').forEach(function (octet) {
                            ipl <<= 8;
                            ipl += parseInt(octet);
                        });
                        return (ipl >>> 0);
                    };
                    let bip = await sqlMap.analyze.selectTbBlockListIp({ "ip": iptoLong(ip) })
                    if(bip.length > 0) res.push(bip);
                    res.push(false);
                }
                return res;
            }

            let malicious = await getConnection(connection);

            for(let idx in connection){
                connection[idx].malicious = malicious[idx];
            }

            
            let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
            console.log(`${new Date().toLocaleString()} : POST /api/analyze/make-connection-data > from ${remoteIp}`);  

            sqlMap.analyze.insertTbConnectionData({
                private_ip,
                public_ip,
                time,
                connection: JSON.stringify(connection)
            })
            
        }

        response.send({ msg: `Complete make connection data from ${public_ip}` });
    })

    app.get("/api/analyze/connection-data", async (request, response) => {
        let { ip, privateip, start, end, conn, lastest } = request.query;
        try {
            start = `${start.substr(0, 4)}-${start.substr(4, 2)}-${start.substr(6, 2)} ${start.substr(8, 2)}:${start.substr(10, 2)}:${start.substr(12, 2)}`
        } catch (e) { }
        try {
            end = `${end.substr(0, 4)}-${end.substr(4, 2)}-${end.substr(6, 2)} ${end.substr(8, 2)}:${end.substr(10, 2)}:${end.substr(12, 2)}`
        }
        catch (e) { }
        let rtn = await sqlMap.analyze.selectTbConnectionData({ ip, privateip, start, end, conn, lastest: parseInt(lastest) });
        if (rtn.length > 0) {
            rtn.forEach((item, idx) => {
                rtn[idx].connection = JSON.parse(item.connection);
            })
        }
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/analyze/connection-data > Connection-data (${ip}) from ${remoteIp}`);  
        response.send(rtn);
    })

    app.get("/api/analyze/client-list", async (request, response) => {
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/analyze/client-list > from ${remoteIp}`);  
        response.send(await sqlMap.analyze.selectDistinctTbConnectionData({}));
    })

    app.get("/api/analyze/blocklistip", async (request, response) => {
        let { ip } = request.query;
        if (ip != undefined && ip != '') {
            let iptoLong = function toInt(ip) {
                var ipl = 0;
                ip.split('.').forEach(function (octet) {
                    ipl <<= 8;
                    ipl += parseInt(octet);
                });
                return (ipl >>> 0);
            };

            rtn = await sqlMap.analyze.selectTbBlockListIp({ ip: iptoLong(ip) });
            let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
            console.log(`${new Date().toLocaleString()} : GET /api/analyze/blocklistip > Search BlockList (${ip}) from ${remoteIp}`);  
            if (rtn.length > 0) {
                response.send({ result: true, block: rtn })
            }
            else {
                response.send({ result: false })
            }
        }
        else {
            response.send({ msg: `You Need IP` })
        }
    })

    app.get("/api/kisa", async (request, response)=>{
        let data = await axios.get("https://www.boho.or.kr/main.do");
        var $ = cheerio.load(data.data);
        let alertLevel = {
            todayDate: $("div.inWrap span.todayDate").text(),
            state: $("div.inWrap span.state").text()
        }
 
        let todayCyberAttactTh = $("table.todayCyberAttactTable tbody th");
        let todayCyberAttactTodayNum = $("table.todayCyberAttactTable tbody td span.todayNum");
        let todayCyberAttactBulUpDown = $("table.todayCyberAttactTable tbody td span[class^=bul]");

        let cyberAttact = []
        for (let i = 0; i < todayCyberAttactTh.length; i++) {
            cyberAttact.push(
                {
                    title: todayCyberAttactTh.children().eq(i).text().trim(),
                    data: parseInt(todayCyberAttactTodayNum.eq(i).text()),
                    updown: todayCyberAttactBulUpDown.eq(i).text()
                })
        }
 
        let totalNewsUl = $("div#totalNewsPC ul.totalNewsUl li");
        let totalNews = [];
        for (let i = 0; i < totalNewsUl.length; i++) {
            let type = totalNewsUl.eq(i).children().eq(0).text().trim();
            let title = totalNewsUl.eq(i).children().eq(1).text().trim();
            let href = "https://www.boho.or.kr" + totalNewsUl.eq(i).children().eq(1).attr("href").trim();
            let date = totalNewsUl.eq(i).children().eq(2).text().trim();

            totalNews.push({
                type, title, href, date
            })
        }
 
        let keywords = $("div.keywordRanking div.inbox a");
        let keywordRanking = [];
        for(let i=0;i<keywords.length;i++){
            keywordRanking.push({
                keyword : keywords.eq(i).html().trim(),
                href : keywords.eq(i).attr("href").replace(/\/search\/boardList.do/gi, "https://www.boho.or.kr/search/boardList.do"),
            })
        }
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/kisa > from ${remoteIp}`);  
        response.send({
            alertLevel, cyberAttact, totalNews, keywordRanking
        })
    })
}