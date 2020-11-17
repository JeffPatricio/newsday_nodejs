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
        success: true,
        message: 'Ocorreu um erro ao criar a notícia'
      });
    });
  },

  index: async (req, res) => {
    const news = await database('news').select(['*']).orderBy('id', 'desc');
    return res.json({
      success: true,
      message: 'OK',
      news
    });
  },

  read: async (req, res) => {
    const { id } = req.params;
    const news = await database('news').select(['*']).where({ id }).first();
    const comments = await database('comments').select(['*']).where({ news_id: id }).orderBy('id', 'desc');
    if (!!news) return res.json({
      success: true,
      message: 'OK',
      news: { ...news, comments }
    });
    return res.json({
      success: false,
      message: 'Not Found'
    });
  }
}