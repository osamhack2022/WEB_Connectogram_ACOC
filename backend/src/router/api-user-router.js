const sqlMap = require("../db/sql-map");
const bcrypt = require("bcrypt");
const cors = require('cors');
/**
 * API Requests에 대한 라우터 제공
 * @author 중사 박길선
 * @since 2022.09.23
 * @param {*} app 
 */
module.exports = (app) => {
    app.get("/",   async (req, res) => {
        
        res.send("Connectogram ACOC Backend Server is Opened. by K.S 20220923");
    })

    /**
     * GET 방식으로 testdata를 호출하는 라우터, querystring 에서 파라미터값을 받아온다.
     * 예) http://[백엔드주소]:8810/testdata?key=[API_KEY]&name=[검색할내용]
     * @author 중사 박길선
     */

    app.get("/api/testdata",   async (req, res) => {
        let { idx, grade, name, org, position } = req.query; //GET 방식으로 호출하려면 request의 query에서 필요한 param을 추출하고 구조분해할당 한다.
        let param = { idx, grade, name, org, position };
        
        res.send(await sqlMap.test.selectTestTable(param));
    })

    /**
     * POST 방식으로 testdata를 호출하는 라우터, fetch/axios 등 body에서 파라미터값을 받아온다 (application/json 형식).
     * 예) fetch("http://[백엔드주소]/testdata", {
                method : "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({
                    key : '[API_KEY]',
                    org : '[검색할내용]'
                })
            })
     * @author 중사 박길선
     */

    app.post("/api/testdata",   async (req, res) => {
        let { idx, grade, name, org, position } = req.body; //POST에서 호출하려면 request의 body에서 필요한 param을 추출하고 구조분해할당 한다.
        let param = { idx, grade, name, org, position };
        
        res.send(await sqlMap.test.selectTestTable(param));
    })

    /**
     * 회원가입 POST (password는 암호화되어 저장된다.)
     * @param {String} user_id : 사용자 아이디
     * @param {String} password : 비밀번호(평문)
     * @param {String} user_name : 이름
     * @param {String} permission : 권한
     * @param {String} client_ip : 접속가능 IP
     * @param {String} email : 이메일
     * @param {String} phone : 전화번호
     * @author 중사 박길선
     * @since 2022.09.27
     */
    app.post("/api/user/register",   async (req, res) => {
        
        try {
            let { user_id, password, user_name, permission, client_ip, email, phone } = req.body;

            bcrypt.genSalt(10);
            password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            let param = { user_id, password, permission, user_name, client_ip, email, phone };
            let remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress.replace(/:.*:/,"");
            console.log(`${new Date().toLocaleString()} : POST /api/user/register > User Register from ${remoteIp}`);    
            res.send(await sqlMap.user.insertTbUserAppl(param));
        }
        catch (e) { res.send({err_msg : "Something wrong."}); }
    })

    /**
     * 회원가입 승인 대상 목록 조회 (GET)
     * @param {String} approval : 승인대기 / 반려 / 승인 / (비어있으면 전체조회)
     * @author 중사 박길선
     * @since 2022.09.27
     */
    app.get("/api/user/viewUserApprovalList",   async (req, res) => {
        let { approval } = req.query;
        let param = { approval };
        let remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/user/viewUserApprovalList > from ${remoteIp}`);    
        res.send(await sqlMap.user.selectTbUserAppl(param));
    })

    /**
     * 회원가입 승인처리 (GET)
     * @param {String} approval : 승인대기 / 반려 / 승인 / (비어있으면 전체조회)
     * @author 중사 박길선
     * @since 2022.09.27
     */
    app.get("/api/user/userApproval",   async (req, res) => {
        let { idx, approval } = req.query;
        
        let param = { idx, approval };
        var updateResult = await sqlMap.user.updateTbUserAppl({ approval: approval, idx: idx })
        let remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/user/userApproval > from ${remoteIp}`);    
        if (updateResult.err_msg == undefined) {
            if (approval == '승인') {
                let insertResult = await sqlMap.user.insertTbUser({ idx: idx });
                if (insertResult.err_msg != undefined) {
                    res.send({ err_msg: "회원가입 처리중 오류." })
                }

            }
        }
        res.send({ msg: "처리완료" })
    })
    
}