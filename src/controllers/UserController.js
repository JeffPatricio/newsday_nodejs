const multer = require('multer');
const database = require('../database/connection');
const multerConfig = require('../config/multer');

module.exports = {
  create: async (req, res) => {
    const user = req.body;
    const [id] = await database('users').insert(user);
    if (!!id) return res.json({
      success: true,
      message: 'Usuário criado com sucesso.',
      user_id: id
    });
    return res.json({
      success: false,
      message: 'Ocorreu um erro ao criar usuário',
      user: {}
    });
  },

  update: async (req, res) => {
    const upload = multer(multerConfig).single('file');
    return upload(req, res, async err => {
      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });
      const user = req.body;
      const userUpdate = {}

      if (req.body.removePhoto) userUpdate.photo = null;
      if (req.file) userUpdate.photo = `http://localhost:3001/images/${req.file.filename}`;

      if (user.currentPassword) {
        const userConfirmPassword = await database('users')
          .select('password')
          .where({
            id: user.user_id,
            password: user.currentPassword
          })
          .first();

        if (!userConfirmPassword) return res.json({
          success: false,
          message: 'A senha antiga inserida não confere',
          user: {}
        });

        userUpdate.password = user.newPassword;
      }

      userUpdate.name = user.name;
      userUpdate.email = user.email;

      const updated = await database('users')
        .where({ id: user.user_id })
        .update(userUpdate);
      if (updated === 1) return res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        user: { id: userUpdate.user_id, name: userUpdate.name, email: userUpdate.email, photo: userUpdate.photo }
      });
      return res.json({
        success: false,
        message: 'Ocorreu um erro ao atualizar o usuário',
        user: {}
      });
    });
  },

  read: async (req, res) => {
    const { id } = req.params;
    const user = await database('users').select(['*']).where({ id }).first();
    if (!!user) {
      delete user.password;
      return res.json({
        success: true,
        message: 'OK',
        user: { ...user }
      });
    }
    return res.json({
      success: false,
      message: 'Not Found'
    });
  }
}