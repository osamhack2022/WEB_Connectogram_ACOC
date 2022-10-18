/**
 * querystore에서 불러오는 쿼리문에 param을 대입하여 실제 DB에 실행한 결과값을 Promise로 반환한다.
 * @author 중사 박길선
 * @since 2022.09.23
 * @param {String} query : 작성한 SQL 쿼리
 * @param {Array} param : query-builder에 의해 생성된 param 배열 (Object -> Array로 변환)
 * @returns {Array} SQL의 결과값을 반환한다
 */
const mysql = require('mysql2/promise');
const globalConfig = require('../config/global-config');

module.exports = async (query, param) => {
    let conn = await mysql.createConnection(globalConfig.mysql);
    let [res] = await conn.query(query, param)
    conn.close();
    return res;
}