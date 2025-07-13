import { Router } from 'express';
import {
  searchStops,
  getLineById,
} from '../controllers/mbtaController';

const router = Router();

router.get('/stops/search', searchStops);
router.get('/line/:id', getLineById);

export default router;