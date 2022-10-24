/**
 * 회원가입시 회원가입 승인 테이블 (tb_user_appl)에 insert 하는 기능
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.09.27
 */

const executeQuery = require("../execute-query");
const queryBuilder = require("../query-builder")

module.exports = async (param) => {
    try {
        let query = `
        INSERT IGNORE INTO tb_user (
            SELECT idx, 
                user_id, 
                PASSWORD, 
                permission, 
                user_name, 
                client_ip, 
                email, 
                phone, 
                reg_date 
            FROM tb_user_appl 
            WHERE idx=?)`;
        let { queryStr, paramArr } = queryBuilder(query, param);
        return await executeQuery(queryStr, paramArr);
    }
    catch (e) {
        console.log(e);
        return { err_msg: "Something Wrong." }
    }
}