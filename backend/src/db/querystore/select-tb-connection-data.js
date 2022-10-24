/**
 * 네트워크 연결정보 (connection_data) 검색
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.09.27
 */

 const e = require("cors");
 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try{
         let query = `
            select 
                private_ip, public_ip, time, connection
            from tb_connection_data
            where 1=1 `;
         //let {ip, start, end, conn} = request.query;
        if(param.ip != undefined) query += ` and public_ip=?`
        if(param.privateip != undefined) query += ` and private_ip=?`
        if(param.start != undefined && param.end != undefined){
            query += ` and time between ? and ?`
        }
        if(param.start != undefined && param.end == undefined){
            query += ` and time >= ?`
        }
        if(param.start == undefined && param.end != undefined){
            query += ` and time <= ?`
        }
        if(param.conn != undefined) query += `
         and connection like '%${param.conn}%'`;

         if(param.lastest != undefined && param.lastest >= '0'){
            query += ` order by time desc limit ?`
         }

         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }