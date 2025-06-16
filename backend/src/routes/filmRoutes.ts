import { Router } from 'express';
import { getFilms , getAvailable } from '../controllers/filmController';

const router = Router();

router.get('/', getFilms);

router.get('/available', getAvailable);

export default router;
