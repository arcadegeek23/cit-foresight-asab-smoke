import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from './server.js';
import { health } from './health.js';

describe('Health Check', () => {
  describe('health() function', () => {
    it('should return status as ok', () => {
      const response = health();
      expect(response.status).toBe('ok');
    });

    it('should return a valid ISO 8601 timestamp', () => {
      const response = health();
      expect(response.ts).toBeDefined();
      // Verify it's a valid ISO 8601 string
      const timestamp = new Date(response.ts);
      expect(timestamp.toString()).not.toBe('Invalid Date');
      // Verify format matches ISO 8601
      expect(response.ts).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should return both status and ts fields', () => {
      const response = health();
      expect(response).toHaveProperty('status');
      expect(response).toHaveProperty('ts');
      expect(Object.keys(response).length).toBe(2);
    });

    it('should return different timestamps on consecutive calls', async () => {
      const response1 = health();
      // Wait a tiny bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));
      const response2 = health();
      expect(response1.ts).not.toBe(response2.ts);
    });
  });

  describe('GET /healthz endpoint', () => {
    it('should return 200 status', async () => {
      const response = await request(app).get('/healthz');
      expect(response.status).toBe(200);
    });

    it('should return JSON content type', async () => {
      const response = await request(app).get('/healthz');
      expect(response.headers['content-type']).toContain('application/json');
    });

    it('should return status as ok', async () => {
      const response = await request(app).get('/healthz');
      expect(response.body.status).toBe('ok');
    });

    it('should return a valid ISO 8601 timestamp', async () => {
      const response = await request(app).get('/healthz');
      expect(response.body.ts).toBeDefined();
      // Verify it's a valid ISO 8601 string
      const timestamp = new Date(response.body.ts);
      expect(timestamp.toString()).not.toBe('Invalid Date');
      // Verify format matches ISO 8601
      expect(response.body.ts).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });

    it('should return both status and ts fields in response', async () => {
      const response = await request(app).get('/healthz');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('ts');
    });
  });
});
