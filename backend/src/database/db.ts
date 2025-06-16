import mysql, { Pool } from 'mysql2/promise';
import { dbConfig } from '../routes/autentificacion'; //importada dbConfig desde autentificacion para chuquear que haya conexion

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!dbConfig) {
    throw new Error('No hay configuración de base de datos válida');
  }
  if (!pool) {
    pool = mysql.createPool({
      host: dbConfig.host,
      port: dbConfig.port,
      database: dbConfig.database,
      user: dbConfig.user,
      password: dbConfig.password,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}
