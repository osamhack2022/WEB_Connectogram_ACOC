/**
 * Express 서버 구동을 위한 로직
 * @author 중사 박길선
 * @since 2022.09.23
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const globalConfig = require('./src/config/global_config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRouter = require('./src/router/api-router');

app.use((req,res,next)=>{
    console.log(req.params, req.body, req.query);
    if(req.body.key == process.env.API_KEY || req.query.key == process.env.API_KEY) next();
    else res.send({err_msg : "API Key is not valid."});
})
apiRouter(app);

app.listen(globalConfig.port, ()=>{
    console.log(`Server Is Opened Port ${globalConfig.port}`);
}) 
