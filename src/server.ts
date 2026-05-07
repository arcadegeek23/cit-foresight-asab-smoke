import express from 'express';
import { health } from './health.js';
import { getVersionInfo } from './version.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/healthz', (req, res) => {
  const healthResponse = health();
  res.json(healthResponse);
});

// Version info endpoint
app.get('/version', (req, res) => {
  const versionInfo = getVersionInfo();
  res.json(versionInfo);
});

// Basic root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'ASAB Smoke Test Server' });
});

export function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  return server;
}

export default app;
