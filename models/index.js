const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  id_usuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_usuario: { type: DataTypes.STRING(50), allowNull: false },
  contrasena: { type: DataTypes.STRING(255), allowNull: false },
  correo: { type: DataTypes.STRING(100) },
  rol: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'usuarios', timestamps: false });

const Cinturon = sequelize.define('Cinturon', {
  id_cinturon: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre_cinturon: { type: DataTypes.STRING(30), allowNull: false },
  orden: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'cinturones', timestamps: false });

const Instructor = sequelize.define('Instructor', {
  id_instructor: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  especialidad: { type: DataTypes.STRING(50) },
  telefono: { type: DataTypes.STRING(15) }
}, { tableName: 'instructores', timestamps: false });

const Alumno = sequelize.define('Alumno', {
  id_alumno: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATEONLY },
  fecha_inscripcion: { type: DataTypes.DATEONLY },
  telefono_contacto: { type: DataTypes.STRING(15) }
}, { tableName: 'alumnos', timestamps: false });

const Avance = sequelize.define('Avance', {
  id_avance: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fecha_examen: { type: DataTypes.DATEONLY, allowNull: false },
  resultado: { type: DataTypes.STRING(20), allowNull: false },
  observaciones: { type: DataTypes.STRING(255) }
}, { tableName: 'avances', timestamps: false });

Usuario.hasOne(Instructor, { foreignKey: 'id_usuario' });
Instructor.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Cinturon.hasMany(Alumno, { foreignKey: 'id_cinturon_actual' });
Alumno.belongsTo(Cinturon, { foreignKey: 'id_cinturon_actual' });
Alumno.hasMany(Avance, { foreignKey: 'id_alumno' });
Avance.belongsTo(Alumno, { foreignKey: 'id_alumno' });
Cinturon.hasMany(Avance, { foreignKey: 'id_cinturon' });
Avance.belongsTo(Cinturon, { foreignKey: 'id_cinturon' });
Instructor.hasMany(Avance, { foreignKey: 'id_instructor' });
Avance.belongsTo(Instructor, { foreignKey: 'id_instructor' });

module.exports = { sequelize, Usuario, Cinturon, Instructor, Alumno, Avance };
