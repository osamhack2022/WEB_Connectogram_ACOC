const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target : 'http://4.230.41.183:8081/api',
            pathRewrite: {
                '^/api' : '',
            }
        })
    )
}