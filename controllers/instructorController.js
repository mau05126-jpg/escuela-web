const { Instructor, Usuario } = require('../models');

const instructorController = {
  index: async (req, res) => {
    try {
      const instructores = await Instructor.findAll({ include: Usuario });
      res.render('instructores/index', { instructores });
    } catch (err) {
      res.status(500).send('Error al cargar instructores: ' + err.message);
    }
  },
  crear: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({ where: { rol: 1 } });
      res.render('instructores/crear', { usuarios });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  guardar: async (req, res) => {
    try {
      await Instructor.create(req.body);
      res.redirect('/instructores');
    } catch (err) {
      res.status(500).send('Error al guardar instructor: ' + err.message);
    }
  },
  editar: async (req, res) => {
    try {
      const instructor = await Instructor.findByPk(req.params.id);
      const usuarios = await Usuario.findAll({ where: { rol: 1 } });
      res.render('instructores/editar', { instructor, usuarios });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  actualizar: async (req, res) => {
    try {
      await Instructor.update(req.body, { where: { id_instructor: req.params.id } });
      res.redirect('/instructores');
    } catch (err) {
      res.status(500).send('Error al actualizar instructor: ' + err.message);
    }
  },
  eliminar: async (req, res) => {
    try {
      await Instructor.destroy({ where: { id_instructor: req.params.id } });
      res.redirect('/instructores');
    } catch (err) {
      res.status(500).send('Error al eliminar instructor: ' + err.message);
    }
  }
};

module.exports = instructorController;
