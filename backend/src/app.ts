import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import filmRoutes from './routes/filmRoutes';
import { authRouter, dbConfig } from './routes/autentificacion';

const app = express();
const publicPath = path.join(__dirname, '../../frontend/public');
const distPath   = path.join(__dirname, '../../frontend/dist');

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas de autenticación (login, connect, config)
app.use('/', authRouter);

// Protección de root e index antes de servir los archivos estátitcos
app.get(['/', '/index.html'], (_req, res, next) => {
  if (!dbConfig) {
    return res.redirect('/login.html');
  }
  next();
});

// Servimos archivos estáticos
app.use(express.static(publicPath));
app.use('/dist', express.static(distPath));

// API protegida: FILMS
app.use(
  '/api/films',
  // middleware de auth
  (req: Request, res: Response, next: NextFunction): void => {
    if (!dbConfig) {
      res.status(403).json({ message: 'Autenticar conexión primero' });
      return;   // ¡aquí salimos sin devolver el Response!
    }
    next();    // continuamos hacia filmRoutes
  },
  filmRoutes
);

export default app;
