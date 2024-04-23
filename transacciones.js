const pool = require("./bdConfig");

const nueva = async ({ descripcion, fecha, monto, cuenta, cuentaDestino }) => {
    const actualizarCuentaOrigen = {
        text: `UPDATE cuentas SET saldo = saldo - $1 WHERE id = $2 RETURNING *`,
        values: [monto, cuenta],
    };
    const actualizarCuentaDestino = {
        text: `UPDATE cuentas SET saldo = saldo + $1 WHERE id = $2 RETURNING *`,
        values: [monto, cuentaDestino],
    };

    const nueva = {
        text: "INSERT INTO transferencias values ($1, $2, $3, $4, $5) returning *",
        values: [descripcion, fecha, monto, cuenta, cuentaDestino],
    };

    try {
        await pool.query("BEGIN");
        const result = await pool.query(nueva);
        await pool.query(actualizarCuentaOrigen);
        await pool.query(actualizarCuentaDestino);
        await pool.query("COMMIT");
        console.log("Transacción realizada con éxito");
        console.log("Ultima transacción: ", result.rows[0]);
    } catch (e) {
        await pool.query("ROLLBACK");
        throw e;
    }
};

module.exports = nueva;
