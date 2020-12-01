const express = require('express');
const path = require('path');
const NewsController = require('./controllers/NewsController');
const CommentController = require('./controllers/CommentController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));

routes.post('/news', NewsController.create);
routes.put('/news', NewsController.update);
routes.get('/news', NewsController.index);
routes.get('/news/:id', NewsController.read);
routes.delete('/news/:id', NewsController.delete);

routes.post('/comments', CommentController.create);

routes.post('/users', UserController.create);
routes.put('/users', UserController.update);
routes.get('/users/:id', UserController.read);

routes.post('/sessions', SessionController.create);

routes.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'OK'
  })
});

routes.use((error, req, res, next) => {
  console.log(error);
  return res.json({
    success: false,
    message: 'Erro interno no servidor'
  });
});

module.exports = routes;