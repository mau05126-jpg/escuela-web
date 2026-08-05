const { Alumno, Cinturon } = require('../models');

const alumnoController = {
  index: async (req, res) => {
    try {
      const alumnos = await Alumno.findAll({ include: Cinturon });
      res.render('alumnos/index', { alumnos });
    } catch (err) {
      res.status(500).send('Error al cargar alumnos: ' + err.message);
    }
  },
  crear: async (req, res) => {
    try {
      const cinturones = await Cinturon.findAll({ order: [['orden', 'ASC']] });
      res.render('alumnos/crear', { cinturones });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  guardar: async (req, res) => {
    try {
      await Alumno.create(req.body);
      res.redirect('/alumnos');
    } catch (err) {
      res.status(500).send('Error al guardar alumno: ' + err.message);
    }
  },
  editar: async (req, res) => {
    try {
      const alumno = await Alumno.findByPk(req.params.id);
      const cinturones = await Cinturon.findAll({ order: [['orden', 'ASC']] });
      res.render('alumnos/editar', { alumno, cinturones });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  actualizar: async (req, res) => {
    try {
      await Alumno.update(req.body, { where: { id_alumno: req.params.id } });
      res.redirect('/alumnos');
    } catch (err) {
      res.status(500).send('Error al actualizar alumno: ' + err.message);
    }
  },
  eliminar: async (req, res) => {
    try {
      await Alumno.destroy({ where: { id_alumno: req.params.id } });
      res.redirect('/alumnos');
    } catch (err) {
      res.status(500).send('Error al eliminar alumno: ' + err.message);
    }
  }
};

module.exports = alumnoController;
