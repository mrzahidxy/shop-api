// api/index.js
const serverless = require('serverless-http');
const app = require('./api');  // Adjust the path if necessary

module.exports.handler = serverless(app);
