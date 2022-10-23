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
                distinct private_ip, public_ip
            from tb_connection_data
            where 1=1 `;
            let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }