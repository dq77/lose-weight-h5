const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: 'http://49.234.43.245:8081', changeOrigin: true }));
}