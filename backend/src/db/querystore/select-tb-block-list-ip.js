/**
 * 유해IP 정보를 확인한다.
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.10.17
 */

 const e = require("cors");
 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try{
         let query = `
            select 
                *
            from tb_block_list_ip
            where 1=1 `;
         //let {ip, start, end, conn} = request.query;
        if(param.ip != undefined) query += ` and ? BETWEEN long_start AND long_end`
         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }