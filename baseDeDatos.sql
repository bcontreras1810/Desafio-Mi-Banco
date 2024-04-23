--Crea una base de datos llamada banco
CREATE DATABASE banco;
--Conectate a la base de datos banco
\c banco;
--Crea una tabla de tansferencia
CREATE TABLE transferencias (
  descripcion varchar(50),
  fecha varchar(10),
  monto DECIMAL,
  cuenta_origen INT,
  cuenta_destino INT
);
--Crea una tabla de cuentas
CREATE TABLE cuentas (id INT, saldo DECIMAL CHECK (saldo >= 0));
--inserta informacion en la tabla cuentas
INSERT INTO cuentas
values (1, 20000);
INSERT INTO cuentas
values (2, 10000);