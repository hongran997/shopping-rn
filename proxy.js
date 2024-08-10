const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const corsOptions = {
  origin: 'http://localhost:8081', // 允许来自localhost:8081的请求
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(morgan('combined'));

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://shop.huanghanlian.com/api',
    changeOrigin: true,
    onProxyRes(proxyRes, req, res) {
      console.log(req, res);
      proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // 允许任何来源
      proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    },
  }),
);

app.get('/get/user', (req, res) => {
  return res.send([1,2,3]);
})

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});

