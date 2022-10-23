const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/api',
        createProxyMiddleware({
            target : 'http://146.56.100.135:8810/api',
            pathRewrite: {
                '^/api' : '',
            }
        })
    )
}
