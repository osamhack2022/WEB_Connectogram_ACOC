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
    try{
        let query = `insert into tb_user_appl`;
        let inputValues = []
        if (param.user_id != undefined) inputValues.push("user_id");
        if (param.password != undefined) inputValues.push("password");
        if (param.permission != undefined) inputValues.push("permission");
        if (param.user_name != undefined) inputValues.push("user_name");
        if (param.client_ip != undefined) inputValues.push("client_ip");
        if (param.email) inputValues.push("email");
        if (param.phone) inputValues.push("phone");
        inputValues.push("approval");

        let paramList = [];
        inputValues.forEach(item => paramList.push('?'))
        paramList[paramList.length-1] = "'승인대기'"
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