const { Avance, Alumno, Cinturon, Instructor } = require('../models');

const avanceController = {
  index: async (req, res) => {
    try {
      const avances = await Avance.findAll({ include: [Alumno, Cinturon, Instructor], order: [['fecha_examen', 'DESC']] });
      res.render('avances/index', { avances });
    } catch (err) {
      res.status(500).send('Error al cargar avances: ' + err.message);
    }
  },
  crear: async (req, res) => {
    try {
      const alumnos = await Alumno.findAll();
      const cinturones = await Cinturon.findAll({ order: [['orden', 'ASC']] });
      const instructores = await Instructor.findAll();
      res.render('avances/crear', { alumnos, cinturones, instructores });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  guardar: async (req, res) => {
    try {
      await Avance.create(req.body);
      res.redirect('/avances');
    } catch (err) {
      res.status(500).send('Error al guardar avance: ' + err.message);
    }
  },
  editar: async (req, res) => {
    try {
      const avance = await Avance.findByPk(req.params.id);
      const alumnos = await Alumno.findAll();
      const cinturones = await Cinturon.findAll({ order: [['orden', 'ASC']] });
      const instructores = await Instructor.findAll();
      res.render('avances/editar', { avance, alumnos, cinturones, instructores });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  actualizar: async (req, res) => {
    try {
      await Avance.update(req.body, { where: { id_avance: req.params.id } });
      res.redirect('/avances');
    } catch (err) {
      res.status(500).send('Error al actualizar avance: ' + err.message);
    }
  },
  eliminar: async (req, res) => {
    try {
      await Avance.destroy({ where: { id_avance: req.params.id } });
      res.redirect('/avances');
    } catch (err) {
      res.status(500).send('Error al eliminar avance: ' + err.message);
    }
  }
};

module.exports = avanceController;
