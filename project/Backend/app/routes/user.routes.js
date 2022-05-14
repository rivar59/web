module.exports = function(app) {
  const user = require('../controllers/Users/user.controller');
  const authController = require('../controllers/Auth/auth.controller');

  app.get('/api/users', authController.isAdmin, user.findAll);
  app.post('/api/users/:userId/ban', authController.isAdmin, user.ban);
  app.post('/api/users/:userId/unban', authController.isAdmin, user.unban);
}
