const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const globalConfig = require('./src/config/global_config');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const apiRouter = require('./src/router/api-router');

apiRouter(app);

app.listen(globalConfig.port, ()=>{
    console.log(`Server Is Opened Port ${globalConfig.port}`);
})
