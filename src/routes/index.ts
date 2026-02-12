import { Router } from 'express';
import { UrlController } from '../controllers/UrlController';
import { validate } from '../middlewares/validate';
import { shortenUrlSchema } from '../schemas/url.schema';

const router = Router();
const urlController = new UrlController();

router.get('/', (req, res) => res.json({ message: 'URL Shortener API is running' }));
router.get('/api/health', (req, res) => res.json({ status: 'ok' }));
router.post('/api/shorten', validate(shortenUrlSchema), urlController.shorten.bind(urlController));
router.get('/api/analytics/:code', urlController.getStats.bind(urlController));
router.get('/:code', urlController.redirect.bind(urlController));

export default router;
