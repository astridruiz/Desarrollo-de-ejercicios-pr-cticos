const express = require('express');
const app = express();
const conexion = require('./server');

app.use(express.json());


app.post('/productos', (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  const sql = `
    INSERT INTO productos 
    (nombre, descripcion, precio, stock, categoria)
    VALUES (?, ?, ?, ?, ?)
  `;

  conexion.query(
    sql,
    [nombre, descripcion, precio, stock, categoria],
    (error, resultado) => {
      if (error) {
        return res.status(500).json({ mensaje: 'Error al crear producto' });
      }

      res.status(201).json({
        mensaje: 'Producto creado correctamente',
        id: resultado.insertId
      });
    }
  );
});


app.get('/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';

  conexion.query(sql, (error, resultados) => {
    if (error) {
      return res.status(500).json({ mensaje: 'Error al obtener productos' });
    }

    res.json(resultados);
  });
});


app.get('/productos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM productos WHERE id = ?';

  conexion.query(sql, [id], (error, resultados) => {
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(resultados[0]);
  });
});


app.put('/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  const sql = `
    UPDATE productos
    SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?
    WHERE id = ?
  `;

  conexion.query(
    sql,
    [nombre, descripcion, precio, stock, categoria, id],
    (error, resultado) => {
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }

      res.json({ mensaje: 'Producto actualizado correctamente' });
    }
  );
});


app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM productos WHERE id = ?';

  conexion.query(sql, [id], (error, resultado) => {
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
});


app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
