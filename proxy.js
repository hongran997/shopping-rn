const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(cors());
app.use(morgan('combined'));
const proxyMiddleware = createProxyMiddleware({
  target: 'http://shop.huanghanlian.com',
  changeOrigin: true,
});
app.use(proxyMiddleware);

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});

