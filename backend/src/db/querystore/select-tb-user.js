/**
 * 로그인 처리 등 유저테이블을 조회하는 쿼리
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
                password,
                permission,
                user_name,
                client_ip,
                email,
                phone,
                reg_date
            from tb_user
            where 1=1 `;
         
        if(param.id != undefined) query += ` and user_id=?`
        if(param.password != undefined) query += ` and password=?`

         let { queryStr, paramArr } = queryBuilder(query, param);
         return await executeQuery(queryStr, paramArr);
     }
     catch(e){
        console.log(e);
         return {err_msg : "Something Wrong."}
     }
 }