/**
 * 세션ID로 세션테이블에서 세션을 삭제한다 (로그아웃용)
 * @author 중사 박길선
 * @param {Object} param : 세션ID가 들어감(sessionID)
 * @returns {Array} delete 이기때문에 오류가발생하지않으면 아무값도 반환하지 않음
 * @since 2022.10.12
 */

 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try{
         let query = `delete from sessions where session_id=?`

         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
         return {err_msg : "Something Wrong."}
     }
 }