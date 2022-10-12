/**
 * Express 서버 구동을 위한 로직
 * @author 중사 박길선
 * @since 2022.09.23
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const globalConfig = require('./src/config/global-config');
const cors = require('cors');
const sessionConfig = require('./src/config/session-config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessionConfig);

const apiUserRouter = require('./src/router/api-user-router');
const apiExtensionRouter = require('./src/router/api-extension-router');
const apiSessionRouter = require('./src/router/api-session-router');
const apiAnalyzeRouter = require('./src/router/api-analyze-router');


/*
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress.replace(/:.*:/,""))
    console.log(req.body);
    if(req.body.key == process.env.API_KEY || req.query.key == process.env.API_KEY){
        app.use(cors());
        next();
    }
    else res.send({err_msg : "API Key is not valid."});
})
*/

app.use(cors(globalConfig.corsOptions));
apiSessionRouter(app);
apiUserRouter(app);
apiExtensionRouter(app);
apiAnalyzeRouter(app);

app.listen(globalConfig.port, ()=>{
    console.log(`Server Is Opened Port ${globalConfig.port}`);

})