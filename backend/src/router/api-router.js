const sqlMap = require("../db/sql-map");

/**
 * API Requests에 대한 라우터 제공
 * @author 중사 박길선
 * @since 2022.09.23
 * @param {*} app 
 */
module.exports = (app) => {
    app.get("/", async (req, res)=>{
        //res.send(await sqlMap.test.selectTestTable());
        res.send("Connectogram ACOC Backend Server is Opened. by K.S 20220923");
    })

    /**
     * GET 방식으로 testdata를 호출하는 라우터, querystring 에서 파라미터값을 받아온다.
     * 예) http://[백엔드주소]:8810/testdata?key=[API_KEY]&name=[검색할내용]
     * @author 중사 박길선
     */
    app.get("/api/testdata", async (req, res)=>{
        let {idx, grade, name, org, position} = req.query; //GET 방식으로 호출하려면 request의 query에서 필요한 param을 추출하고 구조분해할당 한다.
        let param = {idx, grade, name, org, position};
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
    app.post("/api/testdata", async (req, res)=>{
        let {idx, grade, name, org, position} = req.body; //POST에서 호출하려면 request의 body에서 필요한 param을 추출하고 구조분해할당 한다.
        let param = {idx, grade, name, org, position};
        res.send(await sqlMap.test.selectTestTable(param));
    })

    

}