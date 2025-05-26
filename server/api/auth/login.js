const app = require('../../server');
const allowCors = require('../../middleware');

module.exports = allowCors(async (req, res) => {
  // Forward the request to Express app
  return app(req, res);
}); 