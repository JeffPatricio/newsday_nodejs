const database = require('../database/connection');

module.exports = {
  create: async (req, res) => {
    const comment = req.body;
    const [id] = await database('comments').insert(comment);

    if (!!id) {

      const user = await database('users').select(['*']).where({ id: comment.user_id }).first();

      delete user.password;
      delete user.email;
      delete comment.user_id;

      return res.json({
        success: true,
        message: 'Notícia comentada com sucesso.',
        comment: { ...comment, id, user }
      });
    }

    return res.json({
      success: false,
      message: 'Ocorreu um erro ao comentar a notícia'
    });
  }
}