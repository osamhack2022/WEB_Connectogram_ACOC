/**
 * 클라이언트 프로그램에서 수집된 네트워크 연결정보를 테이블에 insert한다.
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.10.16
 */

 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try{
         let query = `insert into tb_connection_data`;
         let inputValues = []
         if (param.private_ip != undefined) inputValues.push("private_ip");
         if (param.public_ip != undefined) inputValues.push("public_ip");
         if (param.time != undefined) inputValues.push("time");
         if (param.connection != undefined) inputValues.push("connection");
         let paramList = [];
         inputValues.forEach(item => paramList.push('?'))
         inputValues = inputValues.join(",");
         paramList = paramList.join(",")
         query += `(${inputValues}) values (${paramList})`
         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
         return {err_msg : "Something Wrong."}
     }
 }