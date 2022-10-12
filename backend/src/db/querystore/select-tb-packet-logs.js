/**
 * 패킷로그 테이블 조회
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.10.12
 */

 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try {
         let query = `select time, source, destination, protocol, length, info from tb_packet_logs where 1=1 `;
          
         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch (e) {
         return { err_msg: "Something Wrong." }
     }
 }