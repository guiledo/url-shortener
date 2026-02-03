import { Request, Response, NextFunction } from 'express';
import { UrlService } from '../services/UrlService';

const urlService = new UrlService();

export class UrlController {
  async shorten(req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.body;
      const shortCode = await urlService.shorten(url);
      res.status(201).json({
        shortCode,
        shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}`,
      });
    } catch (error) {
      next(error);
    }
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.params;
      const shortCode = typeof code === 'string' ? code : code[0];
      const originalUrl = await urlService.getOriginalUrl(shortCode);

      if (!originalUrl) {
        return res.status(404).json({ message: 'URL not found' });
      }

      await urlService.trackClick(shortCode);
      res.redirect(originalUrl);
    } catch (error) {
      next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
        const { code } = req.params;
        const shortCode = typeof code === 'string' ? code : code[0];
        const clicks = await urlService.getStats(shortCode);

        if (clicks === null) {
            return res.status(404).json({ message: 'URL not found' });
        }

        res.json({ clicks });
    } catch (error) {
        next(error);
    }
  }
}
