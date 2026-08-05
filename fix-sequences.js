const { sequelize } = require('./models');
require('dotenv').config();

async function fixSequences() {
  try {
    await sequelize.query("SELECT setval('alumnos_id_alumno_seq', (SELECT MAX(id_alumno) FROM alumnos))");
    await sequelize.query("SELECT setval('usuarios_id_usuario_seq', (SELECT MAX(id_usuario) FROM usuarios))");
    await sequelize.query("SELECT setval('instructores_id_instructor_seq', (SELECT MAX(id_instructor) FROM instructores))");
    await sequelize.query("SELECT setval('cinturones_id_cinturon_seq', (SELECT MAX(id_cinturon) FROM cinturones))");
    await sequelize.query("SELECT setval('avances_id_avance_seq', (SELECT MAX(id_avance) FROM avances))");
    console.log('Secuencias corregidas correctamente.');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await sequelize.close();
  }
}

fixSequences();
