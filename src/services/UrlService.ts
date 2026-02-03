import { UrlRepository } from '../repositories/UrlRepository';
import { encode } from '../utils/base62';

export class UrlService {
  private urlRepository: UrlRepository;

  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async shorten(originalUrl: string): Promise<string> {
    const existing = await this.urlRepository.findByOriginalUrl(originalUrl);
    if (existing && existing.shortCode) {
      return existing.shortCode;
    }

    const newUrl = await this.urlRepository.create(originalUrl);
    const shortCode = encode(newUrl.id);
    await this.urlRepository.updateShortCode(newUrl.id, shortCode);
    return shortCode;
  }

  async getOriginalUrl(shortCode: string): Promise<string | null> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) return null;
    return url.originalUrl;
  }

  async trackClick(shortCode: string): Promise<void> {
    await this.urlRepository.incrementClicks(shortCode);
  }

  async getStats(shortCode: string): Promise<number | null> {
    const url = await this.urlRepository.findByShortCode(shortCode);
    if (!url) return null;
    return url.clicks;
  }
}
