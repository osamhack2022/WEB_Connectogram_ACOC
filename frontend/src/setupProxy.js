const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target : 'http://144.24.89.242:8810/api',
            pathRewrite: {
                '^/api' : '',
            }
        })
    )
}