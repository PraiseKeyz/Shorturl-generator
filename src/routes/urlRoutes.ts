import { Router } from 'express';
import { UrlController } from '../controllers/urlController';

const router = Router();

router.post('/shorten', UrlController.shortenUrl);
router.get('/:code', UrlController.redirectUrl);

export default router;