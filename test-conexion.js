const sequelize = require('./config/database');

async function test() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a Neon (PostgreSQL en la nube).');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

test();