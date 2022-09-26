/**
 * SQL 쿼리문을 .query 함수에 대입하기 위한 쿼리문을 생성한다.
 * @author 중사 박길선
 * @since 2022.09.23
 * @param {String} query 
 * @param {Object} param 
 * @returns {Object} query 원문과 param 배열(Object param에서 변환)을 함께 반환한다.
 */
module.exports = (query, param) => {
    let paramArr = [];
    if(param != null){
        Object.keys(param).forEach(item => {
            if(param[item] != undefined) paramArr.push(param[item]);
        })
    }
    return {
        queryStr : query,
        paramArr : paramArr
    }
}