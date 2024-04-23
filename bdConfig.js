//Importamos el paquete pg y crear una instancia de la clase Pool, definiendo las propiedades básicas para una consulta. 
const { Pool } = require("pg");
const dotenv = require('dotenv');
// Cargar las variables de entorno desde el archivo .env
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: "banco",
    port: 5432,
});

//Funcion para verificar la conexion a la base de datos
const conectarDB = async () => {
    try {
        const res = await pool.query(`SELECT NOW()`);
        console.log("Conexion exitosa, fecha y hora actuales:", res.rows[0]);
    } catch (error) {
        console.error("Error al conectar a la Base de datos", error);
    }
}
//Llamar a la funcion de conectarDB
conectarDB();

//exportamos el modulo pool
module.exports = pool;