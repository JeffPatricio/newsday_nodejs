const database = require('../database/connection');

module.exports = {
  create: async (req, res) => {
    const comment = req.body;
    const [id] = await database('comments').insert(comment);

    if (!!id) {

      const user = await database('users').select(['users.name as user_name', 'users.photo as user_photo']).where({ id: comment.user_id }).first();

      return res.json({
        success: true,
        message: 'Notícia comentada com sucesso.',
        comment: { ...comment, id, ...user }
      });
    }

    return res.json({
      success: false,
      message: 'Ocorreu um erro ao comentar a notícia'
    });
  }
}