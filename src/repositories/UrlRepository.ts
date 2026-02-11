import prisma from '../config/db';
import { Url } from '@prisma/client';

export class UrlRepository {
  async create(originalUrl: string, shortCode?: string): Promise<Url> {
    return prisma.url.create({
      data: {
        originalUrl,
        shortCode,
      },
    });
  }

  async updateShortCode(id: number, shortCode: string): Promise<Url> {
    return prisma.url.update({
        where: { id },
        data: { shortCode }
    });
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return prisma.url.findUnique({
      where: {
        shortCode,
      },
    });
  }

  async incrementClicks(shortCode: string): Promise<Url> {
    return prisma.url.update({
      where: {
        shortCode,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }

  async findByOriginalUrl(originalUrl: string): Promise<Url | null> {
    return prisma.url.findFirst({
        where: {
            originalUrl
        }
    });
  }
}