// backend/src/routes/auth.ts
import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

// Esta variable guardará temporalmente la conexión si es válida
let dbConfig: any = null;

router.post('/connect', async (req, res) => {
  const { host, port, database, user, password } = req.body;

  try {
    const conn = await mysql.createConnection({
      host,
      port: Number(port),
      database,
      user,
      password
    });

    await conn.query('SELECT 1'); // test query
    await conn.end();

    // Guardamos la config si es válida
    dbConfig = { host, port: Number(port), database, user, password };
    res.status(200).json({ success: true });

  } catch (err: any) {
    console.error('Connection failed:', err.message);
    res.status(401).json({ success: false, message: 'Datos incorrectos o conexión fallida.' });
  }
});

router.get('/config', (req, res) => {
  if (dbConfig) {
    res.status(200).json({ success: true });
  } else {
    res.status(403).json({ success: false });
  }
});

export { router as authRouter, dbConfig };
