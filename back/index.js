// index principal que levantara el servidor e importara las funciones de consulta.js
// se crearan las rutas de acceso
const cors = require("cors");
const express = require('express');
const app = express();
const { agregarRegistro, obtenerRegistros } = require('./consultas');
const PORT = 3000;

// middleware
app.use(express.json());
app.use(cors());

app.listen(3000, ()=> console.log(`SERVIDOR ENCENDIDO EN PUERTO: ${PORT}`));

app.get("/posts", async (req, res) => {
  const registros = await obtenerRegistros()
  res.json(registros)
})

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body
  await agregarRegistro(titulo, url, descripcion)
  res.send("Registro agregado con éxito")
})

// Esto es por sino se accedio a ninguna de las rutas programadas
app.use("*", async (req, res) => {
  res.send("Error 404 Ruta no encontrada")
})