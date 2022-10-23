/**
 * Test Table을 조회하기위한 쿼리
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.09.23
 */

const executeQuery = require("../execute-query");
const queryBuilder = require("../query-builder")

module.exports = async (param) => {
    try {
        let query = `select * from test_table where 1=1 `;
        if (param.idx != undefined) query += ` and idx=? `
        if (param.name != undefined) query += ` and name=? `
        if (param.grade != undefined) query += ` and grade=? `
        if (param.org != undefined) query += ` and org=? `
        if (param.position != undefined) query += ` and position=? `

        let { queryStr, paramArr } = queryBuilder(query, param);
        return await executeQuery(queryStr, paramArr);
    }
    catch (e) {
        return { err_msg: "Something Wrong." }
    }
}