const express = require('express');
const path = require('path');
const NewsController = require('./controllers/NewsController');
const CommentController = require('./controllers/CommentController');

const routes = express.Router();

routes.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));

routes.post('/news', NewsController.create);
routes.get('/news', NewsController.index);
routes.get('/news/:id', NewsController.read);

routes.post('/comments', CommentController.create);

routes.get('/', (req, res) => {
  return res.json({
    news: {
      post: ''
    }
  })
});

module.exports = routes;