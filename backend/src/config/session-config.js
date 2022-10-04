const session = require('express-session');
const globalConfig = require('./global-config');
const MySQLStore = require('express-mysql-session');

require('dotenv').config();
//console.log(globalConfig.mysql);
const sessionStore = new MySQLStore(globalConfig.mysql);

const sessionConfig = session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expiration: 1000 * 60 * 60,  // 세션 expires를 1시간으로 설정
        maxAge: 1000 * 60 * 60   // 쿠키 maxAge를 1시간으로 설정
    },
    store: sessionStore,

})

module.exports = sessionConfig;