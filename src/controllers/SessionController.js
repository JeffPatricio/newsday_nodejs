const database = require('../database/connection');

module.exports = {
  create: async (req, res) => {

    const { email, password } = req.body;
    const user = await database('users').where('email', email).first();
    if (!user || user.password !== password) return res.status(404).json({
      success: false,
      message: 'E-mail ou senha incorretos',
      user: {}
    });

    return res.status(200).json({
      success: true,
      message: 'Ok',
      user_id: user.id
    });
  }
}