// api/index.js

const serverless = require('serverless-http');
const app = require('./app');

// Export the serverless handler
module.exports.handler = serverless(app);
