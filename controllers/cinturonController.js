const { Cinturon } = require('../models');

const cinturonController = {
  index: async (req, res) => {
    try {
      const cinturones = await Cinturon.findAll({ order: [['orden', 'ASC']] });
      res.render('cinturones/index', { cinturones });
    } catch (err) {
      res.status(500).send('Error al cargar cinturones: ' + err.message);
    }
  },
  crear: async (req, res) => {
    try {
      res.render('cinturones/crear');
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  guardar: async (req, res) => {
    try {
      await Cinturon.create(req.body);
      res.redirect('/cinturones');
    } catch (err) {
      res.status(500).send('Error al guardar cinturon: ' + err.message);
    }
  },
  editar: async (req, res) => {
    try {
      const cinturon = await Cinturon.findByPk(req.params.id);
      res.render('cinturones/editar', { cinturon });
    } catch (err) {
      res.status(500).send('Error: ' + err.message);
    }
  },
  actualizar: async (req, res) => {
    try {
      await Cinturon.update(req.body, { where: { id_cinturon: req.params.id } });
      res.redirect('/cinturones');
    } catch (err) {
      res.status(500).send('Error al actualizar cinturon: ' + err.message);
    }
  },
  eliminar: async (req, res) => {
    try {
      await Cinturon.destroy({ where: { id_cinturon: req.params.id } });
      res.redirect('/cinturones');
    } catch (err) {
      res.status(500).send('Error al eliminar cinturon: ' + err.message);
    }
  }
};

module.exports = cinturonController;
