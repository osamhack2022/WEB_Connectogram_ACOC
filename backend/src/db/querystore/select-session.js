/**
 * 세션ID로 세션테이블을 조회한다 (로그인확인용)
 * @author 중사 박길선
 * @param {Object} param : 세션ID가 들어감(sessionID)
 * @returns {Array} session의 data를 반환한다.
 * @since 2022.10.12
 */

 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try{
         let query = `select data from sessions where session_id=?`

         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
         return {err_msg : "Something Wrong."}
     }
 }