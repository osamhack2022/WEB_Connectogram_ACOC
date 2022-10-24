/**
 * 회원가입 승인 테이블 (tb_user_appl) 조회
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.09.27
 */

 const executeQuery = require("../execute-query");
 const queryBuilder = require("../query-builder")
 
 module.exports = async (param) => {
     try{
         let query = `
            select 
                idx,
                user_id,
                permission,
                user_name,
                client_ip,
                email,
                phone,
                approval,
                reg_date
            from tb_user_appl
            where 1=1 `;
         
        if(param.approval != undefined) query += ` and approval=?`

         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
         return {err_msg : "Something Wrong."}
     }
 }