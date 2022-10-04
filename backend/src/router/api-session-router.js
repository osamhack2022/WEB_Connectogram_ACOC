const sqlMap = require("../db/sql-map");
const bcrypt = require("bcrypt");


module.exports = (app) => {

    app.post("/api/session/login", async (request, response)=>{
        let {id, password} = request.body;
        let param = {id};
        var _userInfo = await sqlMap.session.selectTbUser(param)
        if(_userInfo.length == 1){
            let userInfo = _userInfo[0];
            let hashedPassword = userInfo.password;
            if(bcrypt.compareSync(password, hashedPassword)){
                delete userInfo.password;
                request.session.userInfo = userInfo;
                response.send(userInfo);
            }
            else{
                response.send({"err_msg" : "Password Incorrect"});
            }
        }
        else{
            response.send({"err_msg" : "User Not Found"});
        }
    })

    app.get("/api/session/check", async (request, response)=>{
        response.send(request.session.userInfo);
    })

    app.get("/api/session/logout", async (request, response)=>{
        request.session.destroy(()=>response.send({msg : "Logged out"}));
    })
}