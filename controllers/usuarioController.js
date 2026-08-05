const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

const usuarioController = {
  index: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({ order: [['id_usuario', 'ASC']] });
      res.render('usuarios/index', { usuarios });
    } catch (err) {
      res.status(500).send('Error al cargar usuarios: ' + err.message);
    }
  },
  crear: async (req, res) => {
    try {
      res.render('usuarios/crear');
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  guardar: async (req, res) => {
    try {
      const datos = { ...req.body };
      datos.contrasena = await bcrypt.hash(datos.contrasena, 10);
      await Usuario.create(datos);
      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).send('Error al guardar usuario: ' + err.message);
    }
  },
  editar: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      res.render('usuarios/editar', { usuario });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  actualizar: async (req, res) => {
    try {
      const datos = { ...req.body };
      if (datos.contrasena) {
        datos.contrasena = await bcrypt.hash(datos.contrasena, 10);
      } else {
        delete datos.contrasena;
      }
      await Usuario.update(datos, { where: { id_usuario: req.params.id } });
      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).send('Error al actualizar usuario: ' + err.message);
    }
  },
  eliminar: async (req, res) => {
    try {
      await Usuario.destroy({ where: { id_usuario: req.params.id } });
      res.redirect('/usuarios');
    } catch (err) {
      res.status(500).send('Error al eliminar usuario: ' + err.message);
    }
  }
};

module.exports = usuarioController;
