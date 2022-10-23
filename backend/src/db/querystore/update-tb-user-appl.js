/**
 * 회원가입 승인 테이블 (tb_user_appl)에서 일련번호(idx)를 가지고 승인처리 (승인대기→승인 또는 반려 )
 * @author 중사 박길선
 * @param {Object} param : 쿼리에 대입할 인자값을 객체로 넣어준다.
 * @returns {Array} SQL 결과값을 반환한다.
 * @since 2022.09.27
 * @description SQL Parameters
 *    approval : 승인여부 (승인, 반려, 승인대기)
 *    idx : 회원가입 일련번호 (idx 컬럼)
 *     * approval 값이 승인, 또는 반려인 경우에만 동작
 */

const executeQuery = require("../execute-query");
const queryBuilder = require("../query-builder")

module.exports = async (param) => {
    try {
        let query = `update tb_user_appl set approval=? where idx=?`;
        
        if (param.approval == '승인' || param.approval == '반려') {
            let { queryStr, paramArr } = queryBuilder(query, param);
            return await executeQuery(queryStr, paramArr);
        }

        return { err_msg: "Parameters are wrong." }
    }
    catch (e) {
        console.log(e);
        return { err_msg: "Something Wrong." }
    }
}