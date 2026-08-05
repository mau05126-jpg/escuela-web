const express = require('express');
const { sequelize, Alumno, Cinturon, Usuario, Instructor, Avance } = require('./models');
const alumnoController = require('./controllers/alumnoController');
const cinturonController = require('./controllers/cinturonController');
const usuarioController = require('./controllers/usuarioController');
const instructorController = require('./controllers/instructorController');
const avanceController = require('./controllers/avanceController');
const { Op } = require('sequelize');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const totalAlumnos = await Alumno.count();
    const totalInstructores = await Instructor.count();
    const totalCinturones = await Cinturon.count();
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1).toISOString().split('T')[0];
    const avancesMes = await Avance.count({ where: { fecha_examen: { [Op.gte]: primerDiaMes }, resultado: 'aprobado' } });

    const ultimosAvances = await Avance.findAll({ include: [Alumno, Cinturon, Instructor], order: [['fecha_examen', 'DESC'], ['id_avance', 'DESC']], limit: 5 });
    const ultimosAlumnos = await Alumno.findAll({ order: [['fecha_inscripcion', 'DESC'], ['id_alumno', 'DESC']], limit: 5 });

    const actividad = [
      ...ultimosAvances.map(a => ({
        tipo: 'avance',
        nombre: a.Alumno ? a.Alumno.nombre : 'N/A',
        resultado: a.resultado,
        cinturon: a.Cinturon ? a.Cinturon.nombre_cinturon : 'N/A',
        instructor: a.Instructor ? a.Instructor.nombre : 'N/A',
        fecha: a.fecha_examen
      })),
      ...ultimosAlumnos.map(al => ({
        tipo: 'inscripcion',
        nombre: al.nombre,
        fecha: al.fecha_inscripcion
      }))
    ].sort((a, b) => {
      if (!a.fecha) return 1;
      if (!b.fecha) return -1;
      return b.fecha.localeCompare(a.fecha);
    }).slice(0, 8);

    res.render('index', { totalAlumnos, totalInstructores, totalCinturones, avancesMes, actividad });
  } catch (err) {
    res.status(500).send('Error al cargar el inicio: ' + err.message);
  }
});

app.get('/usuarios', usuarioController.index);
app.get('/usuarios/crear', usuarioController.crear);
app.post('/usuarios', usuarioController.guardar);
app.get('/usuarios/editar/:id', usuarioController.editar);
app.post('/usuarios/actualizar/:id', usuarioController.actualizar);
app.post('/usuarios/eliminar/:id', usuarioController.eliminar);

app.get('/instructores', instructorController.index);
app.get('/instructores/crear', instructorController.crear);
app.post('/instructores', instructorController.guardar);
app.get('/instructores/editar/:id', instructorController.editar);
app.post('/instructores/actualizar/:id', instructorController.actualizar);
app.post('/instructores/eliminar/:id', instructorController.eliminar);

app.get('/alumnos', alumnoController.index);
app.get('/alumnos/crear', alumnoController.crear);
app.post('/alumnos', alumnoController.guardar);
app.get('/alumnos/editar/:id', alumnoController.editar);
app.post('/alumnos/actualizar/:id', alumnoController.actualizar);
app.post('/alumnos/eliminar/:id', alumnoController.eliminar);

app.get('/cinturones', cinturonController.index);
app.get('/cinturones/crear', cinturonController.crear);
app.post('/cinturones', cinturonController.guardar);
app.get('/cinturones/editar/:id', cinturonController.editar);
app.post('/cinturones/actualizar/:id', cinturonController.actualizar);
app.post('/cinturones/eliminar/:id', cinturonController.eliminar);

app.get('/avances', avanceController.index);
app.get('/avances/crear', avanceController.crear);
app.post('/avances', avanceController.guardar);
app.get('/avances/editar/:id', avanceController.editar);
app.post('/avances/actualizar/:id', avanceController.actualizar);
app.post('/avances/eliminar/:id', avanceController.eliminar);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor corriendo en http://localhost:' + PORT));
