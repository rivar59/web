module.exports = function(app) {
  const auth = require('../controllers/Auth/auth.controller');

  app.post('/auth/register', auth.register);
  app.post('/auth/login', auth.login);
}
