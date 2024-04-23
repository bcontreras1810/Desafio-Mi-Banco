
const { consulta, consultaSaldo } = require("./consultas")
const nueva  = require("./transacciones")
const pool = require("./bdConfig");

const argumentos = process.argv.slice(2);
const tipo_transaccion = argumentos[0];
const cuenta = argumentos[1];
const fecha = argumentos[2];
const descripcion = argumentos[3];
const monto = argumentos[4];
const cuentaDestino = argumentos[5];

const funciones = {
  nueva,
  consulta,
  "consulta-saldo": consultaSaldo,
};

(async () => {
  try {
    await funciones[tipo_transaccion]({
      cuenta,
      fecha,
      descripcion,
      monto,
      cuentaDestino,
    });
  } catch (error) {
    console.log("Error", error);
  } finally {
    pool.end();
  }
})();
