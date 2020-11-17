const database = require('../database/connection');

module.exports = {
  create: async (req, res) => {
    const comment = req.body;
    const [id] = await database('comments').insert(comment);
    if (!!id) return res.json({
      success: true,
      message: 'Notícia comentada com sucesso.',
      comment: { ...comment, id }
    });
    return res.json({
      success: true,
      message: 'Ocorreu um erro ao comentar a notícia'
    });
  }
}