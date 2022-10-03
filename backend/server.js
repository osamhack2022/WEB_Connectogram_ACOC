/**
 * Express 서버 구동을 위한 로직
 * @author 중사 박길선
 * @since 2022.09.23
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const globalConfig = require('./src/config/global_config');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const apiUserRouter = require('./src/router/api-user-router');
const apiExtensionRouter = require('./src/router/api-extension-router');

app.use((req,res,next)=>{
    //console.log(req.params, req.body, req.query);
    if(req.body.key == process.env.API_KEY || req.query.key == process.env.API_KEY) next();
    else res.send({err_msg : "API Key is not valid."});
})

apiUserRouter(app);
apiExtensionRouter(app);

app.listen(globalConfig.port, ()=>{
    console.log(`Server Is Opened Port ${globalConfig.port}`);

})