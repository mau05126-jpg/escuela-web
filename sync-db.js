const { sequelize } = require('./models');

async function sync() {
  try {
    await sequelize.sync({ force: true });
    console.log('Tablas creadas en Neon exitosamente.');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

sync();
