import { UrlRepository } from '../repositories/UrlRepository';
import { generateRandomCode } from '../utils/base62';

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

    let shortCode: string;
    let isUnique = false;
    let attempts = 0;

    do {
      shortCode = generateRandomCode(7);
      const existingCode = await this.urlRepository.findByShortCode(shortCode);
      if (!existingCode) {
        isUnique = true;
      }
      attempts++;
    } while (!isUnique && attempts < 10);

    if (!isUnique) {
      throw new Error('Failed to generate a unique short code');
    }

    const newUrl = await this.urlRepository.create(originalUrl, shortCode);
    return newUrl.shortCode!;
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
