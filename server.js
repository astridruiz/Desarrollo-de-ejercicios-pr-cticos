const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Admr*#2407',
  database: 'inventario_db'
});

conexion.connect((error) => {
  if (error) {
    console.log('Error al conectar a MySQL:', error);
  } else {
    console.log('Conectado a MySQL correctamente');
  }
});

module.exports = conexion;

