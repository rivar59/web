module.exports = function(app) {
  const comments = require('../controllers/Comments/comment.controller');
  const authController = require('../controllers/Auth/auth.controller');

  app.get('/api/comments', comments.findAll);
  app.post('/api/comments', authController.isNotBanned, comments.create);

  app.get('/api/comments/@me', authController.loginRequired, comments.getMine);
  app.get('/api/comments/@fav', authController.loginRequired, comments.getFav);

  app.get('/api/comments/:commentId', comments.getOne);
  app.patch('/api/comments/:commentId', authController.loginRequired, comments.update);
  app.delete('/api/comments/:commentId', authController.loginRequired, comments.delete);

  app.post('/api/comments/:commentId/like', authController.loginRequired, comments.like);
  app.post('/api/comments/:commentId/unlike', authController.loginRequired, comments.unlike);
  app.post('/api/comments/:commentId/toggleFavorite', authController.loginRequired, comments.toggleFavorite);
  app.post('/api/comments/:commentId/toggleFavoritedown', authController.loginRequired, comments.toggleFavoritedown);
}
