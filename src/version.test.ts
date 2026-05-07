import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from './server';
import { getVersionInfo } from './version';

describe('Version Info', () => {
  describe('getVersionInfo() function', () => {
    it('should return an object with version and commit properties', () => {
      const info = getVersionInfo();
      expect(info).toHaveProperty('version');
      expect(info).toHaveProperty('commit');
    });

    it('should return version as a non-empty string', () => {
      const info = getVersionInfo();
      expect(typeof info.version).toBe('string');
      expect(info.version.length).toBeGreaterThan(0);
    });

    it('should return commit as a non-empty string', () => {
      const info = getVersionInfo();
      expect(typeof info.commit).toBe('string');
      expect(info.commit.length).toBeGreaterThan(0);
    });

    it('should return a valid semantic version or fallback', () => {
      const info = getVersionInfo();
      // Either a valid semver (X.Y.Z) or 'unknown'
      const semverRegex = /^\d+\.\d+\.\d+$|^unknown$/;
      expect(info.version).toMatch(semverRegex);
    });

    it('should return a git commit SHA or fallback', () => {
      const info = getVersionInfo();
      // Either a short SHA (7+ chars hex) or 'unknown' or 'detached'
      const commitRegex = /^[a-f0-9]{7,}$|^unknown$|^detached$/;
      expect(info.commit).toMatch(commitRegex);
    });
  });

  describe('GET /version endpoint', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/version');
      expect(response.status).toBe(200);
    });

    it('should return JSON content type', async () => {
      const response = await request(app).get('/version');
      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('should return version field as non-empty string', async () => {
      const response = await request(app).get('/version');
      expect(response.body).toHaveProperty('version');
      expect(typeof response.body.version).toBe('string');
      expect(response.body.version.length).toBeGreaterThan(0);
    });

    it('should return commit field as non-empty string', async () => {
      const response = await request(app).get('/version');
      expect(response.body).toHaveProperty('commit');
      expect(typeof response.body.commit).toBe('string');
      expect(response.body.commit.length).toBeGreaterThan(0);
    });

    it('should return both version and commit in response', async () => {
      const response = await request(app).get('/version');
      expect(Object.keys(response.body).sort()).toEqual(['commit', 'version']);
    });

    it('should return consistent version info across calls', async () => {
      const response1 = await request(app).get('/version');
      const response2 = await request(app).get('/version');
      expect(response1.body.version).toBe(response2.body.version);
      expect(response1.body.commit).toBe(response2.body.commit);
    });
  });
});
