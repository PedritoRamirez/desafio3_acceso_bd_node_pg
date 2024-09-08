const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "likeme",
  allowExitOnIdle: true,
});

//Agregar Registros
const agregarRegistro = async (titulo, url, descripcion, likes) => {
  const consulta =
    "INSERT INTO posts values (DEFAULT,$1, $2, $3, 0) RETURNING *";
  const values = [titulo, url, descripcion];
  await pool.query(consulta, values);
  console.log("Informacion de Registro agregada");
};

//Obtener Registros
const obtenerRegistros = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  console.log("Registros de la BD: ", rows);
  return rows;
};

module.exports = { agregarRegistro, obtenerRegistros };