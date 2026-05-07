import { startServer } from './server.js';

// Start server only if running as main module
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
