const mariadb = require('mariadb');
const { sequelize, Usuario, Cinturon, Instructor, Alumno, Avance } = require('./models');

async function migrar() {
  const pool = mariadb.createPool({ host: 'localhost', port: 3306, user: 'root', password: 'Mau2026*', database: 'escuela_artes_marciales' });
  const conn = await pool.getConnection();

  try {
    const cinturones = await conn.query('SELECT * FROM cinturones ORDER BY id_cinturon');
    const usuarios = await conn.query('SELECT * FROM usuarios ORDER BY id_usuario');
    const instructores = await conn.query('SELECT * FROM instructores ORDER BY id_instructor');
    const alumnos = await conn.query('SELECT * FROM alumnos ORDER BY id_alumno');
    const avances = await conn.query('SELECT * FROM avances ORDER BY id_avance');

    console.log('Datos leidos de MariaDB local.');

    await Cinturon.bulkCreate(cinturones.map(r => ({ ...r })));
    console.log('Cinturones migrados:', cinturones.length);

    await Usuario.bulkCreate(usuarios.map(r => ({ ...r })));
    console.log('Usuarios migrados:', usuarios.length);

    await Instructor.bulkCreate(instructores.map(r => ({ ...r })));
    console.log('Instructores migrados:', instructores.length);

    await Alumno.bulkCreate(alumnos.map(r => ({ ...r })));
    console.log('Alumnos migrados:', alumnos.length);

    await Avance.bulkCreate(avances.map(r => ({ ...r })));
    console.log('Avances migrados:', avances.length);

    console.log('Migracion de MariaDB a Neon completada.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    conn.release();
    await pool.end();
    await sequelize.close();
  }
}

migrar();
