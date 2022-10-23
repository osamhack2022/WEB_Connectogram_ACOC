const sqlMap = require("../db/sql-map");
const bcrypt = require("bcrypt");
const cors = require('cors');

module.exports = (app) => {
    
    app.post("/api/session/login",    async (request, response)=>{
        
        let {id, password} = request.body;
        console.log(id, password);
        let param = {id};
        var _userInfo = await sqlMap.session.selectTbUser(param)
        if(_userInfo.length == 1){
            let userInfo = _userInfo[0];
            let hashedPassword = userInfo.password;
            if(bcrypt.compareSync(password, hashedPassword)){
                delete userInfo.password;
                request.session.userInfo = userInfo;
                let sessionInfo = {
                    ...request.session,
                    session_id : request.sessionID
                }
                let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
                console.log(`${new Date().toLocaleString()} : POST /api/session/login > Logged In ${id} from ${remoteIp}`);
                response.send(sessionInfo);
            }
            else{
                response.send({"err_msg" : "Password Incorrect"});
            }
        }
        else{
            response.send({"err_msg" : "User Not Found"});
        }
    })

    app.get("/api/session/check",   async (request, response)=>{
        let {session_id} = request.query;
        let sessionData = await sqlMap.session.selectSession({session_id});
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/session/check > Session Check from ${remoteIp}`);
        if(sessionData.length > 0) {
            response.json(JSON.parse(sessionData[0].data));
        }
        else{
            response.send({"err_msg" : "You Did Not Login"});
        }
    })

    app.get("/api/session/logout",   async (request, response)=>{
        let {session_id} = request.query;
        let rtn = await sqlMap.session.deleteSession({session_id});
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/session/logout > Logout ${session_id} from ${remoteIp}`);
        request.session.destroy(()=>response.send({msg : "Logged out"}));
    })

    app.get("/api/session/ipaddr", (request, response)=>{
        let remoteIp = request.headers['x-forwarded-for'] || request.connection.remoteAddress.replace(/:.*:/,"");
        console.log(`${new Date().toLocaleString()} : GET /api/session/ipaddr > Ip Check from ${remoteIp}`);
        response.send({"ipaddr" : remoteIp});
    })
}