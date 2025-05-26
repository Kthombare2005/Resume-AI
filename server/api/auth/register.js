const app = require('../../server');
const allowCors = require('../../middleware');

module.exports = allowCors(async (req, res) => {
  return app(req, res);
}); 