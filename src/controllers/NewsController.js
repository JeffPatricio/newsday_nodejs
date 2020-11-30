const multer = require('multer');
const database = require('../database/connection');
const multerConfig = require('../config/multer');

module.exports = {
  create: async (req, res) => {
    const upload = multer(multerConfig).single('file');
    return upload(req, res, async err => {
      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });
      const news = req.body;
      news['image'] = `http://localhost:3001/images/${req.file.filename}`;
      const [id] = await database('news').insert(news);
      if (!!id) return res.json({
        success: true,
        message: 'Notícia criada com sucesso',
        news: { ...news, id }
      });
      return res.json({
        success: false,
        message: 'Ocorreu um erro ao criar a notícia'
      });
    });
  },

  index: async (req, res) => {

    const news = await database('news')
      .select(['*'])
      .orderBy('id', 'desc')
      .where((builder) => {
        if (req.query.search) {
          builder
            .where('title', 'like', `%${req.query.search || ''}%`)
            .orWhere('content', 'like', `%${req.query.search || ''}%`);
        }
      })
      .andWhere((builder) => {
        if (req.headers.user_id) {
          builder.andWhere('user_id', req.headers.user_id);
        }
      });
    return res.json({
      success: true,
      message: 'OK',
      news
    });
  },

  read: async (req, res) => {
    const { id } = req.params;
    const news = await database('news').select(['*']).where({ id }).first();
    const comments = await database('comments')
      .where({ news_id: id })
      .orderBy('comments.id', 'desc')
      .join('users', { 'comments.user_id': 'users.id' })
      .select(['users.name as user_name', 'users.photo as user_photo', 'comments.*']);

    if (!!news) return res.json({
      success: true,
      message: 'OK',
      news: { ...news, comments }
    });
    return res.json({
      success: false,
      message: 'Not Found'
    });
  },

  update: async (req, res) => {
    const upload = multer(multerConfig).single('file');
    return upload(req, res, async err => {
      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });

      const news = req.body;
      const newsUpdate = {}

      newsUpdate.title = news.title;
      newsUpdate.content = news.content;

      if (req.file) newsUpdate.image = `http://localhost:3001/images/${req.file.filename}`;

      const updated = await database('news')
        .where({ id: news.news_id })
        .update(newsUpdate);
      if (updated === 1) return res.json({
        success: true,
        message: 'Notícia atualizada com sucesso',
        news: {
          id: news.news_id,
          title: newsUpdate.title,
          email: newsUpdate.content,
          image: newsUpdate.image
        }
      });
      return res.json({
        success: false,
        message: 'Ocorreu um erro ao atualizar a notícia',
        news: {}
      });
    });
  },
}