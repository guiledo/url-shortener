import request from 'supertest';
import app from '../app';

// Mock the Prisma client
jest.mock('../config/db', () => ({
  __esModule: true,
  default: {
    url: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import prisma from '../config/db';

describe('Url Shortener API Integration Tests', () => {
  const mockOriginalUrl = 'https://www.example.com';
  const mockShortCode = 'abcd12';
  const mockUrlRecord = {
    id: 1,
    originalUrl: mockOriginalUrl,
    shortCode: mockShortCode,
    createdAt: new Date(),
    clicks: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/shorten', () => {
    it('should shorten a valid URL', async () => {
      // Setup mock
      (prisma.url.findFirst as jest.Mock).mockResolvedValue(null); // No existing
      (prisma.url.create as jest.Mock).mockResolvedValue({ ...mockUrlRecord, shortCode: null }); // Create returns ID
      (prisma.url.update as jest.Mock).mockResolvedValue(mockUrlRecord); // Update with shortCode

      const res = await request(app)
        .post('/api/shorten')
        .send({ url: mockOriginalUrl });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('shortCode');
      expect(res.body).toHaveProperty('shortUrl');
      expect(res.body.shortUrl).toContain(res.body.shortCode);
    });

    it('should return existing short code if URL already exists', async () => {
        // Setup mock to return existing
        (prisma.url.findFirst as jest.Mock).mockResolvedValue(mockUrlRecord);
  
        const res = await request(app)
          .post('/api/shorten')
          .send({ url: mockOriginalUrl });
  
        expect(res.status).toBe(201);
        expect(res.body.shortCode).toBe(mockShortCode);
        expect(prisma.url.create).not.toHaveBeenCalled();
      });

    it('should return 400 for invalid URL', async () => {
      const res = await request(app)
        .post('/api/shorten')
        .send({ url: 'not-a-url' });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /:code', () => {
    it('should redirect to the original URL', async () => {
      (prisma.url.findUnique as jest.Mock).mockResolvedValue(mockUrlRecord);
      (prisma.url.update as jest.Mock).mockResolvedValue({ ...mockUrlRecord, clicks: 1 });

      const res = await request(app).get(`/${mockShortCode}`);

      expect(res.status).toBe(302);
      expect(res.header.location).toBe(mockOriginalUrl);
    });

    it('should return 404 if code not found', async () => {
      (prisma.url.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/nonexistent');

      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/analytics/:code', () => {
    it('should return analytics for valid code', async () => {
      (prisma.url.findUnique as jest.Mock).mockResolvedValue(mockUrlRecord);

      const res = await request(app).get(`/api/analytics/${mockShortCode}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('clicks', 0);
    });

    it('should return 404 for analytics if code not found', async () => {
      (prisma.url.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/analytics/nonexistent');

      expect(res.status).toBe(404);
    });
  });
});
