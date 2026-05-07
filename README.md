# CIT Foresight ASAB Smoke Tests

Smoke tests for Foresight ASAB integration.

## Features

- **Health Check Endpoint**: `/healthz` returns `{status: 'ok', ts: '<ISO 8601>'}` for deployment verification
- **Comprehensive Tests**: Vitest suite validating endpoint response structure and timestamp format

## Quick Start

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Start development server
npm run dev
```

## Project Structure

```
src/
├── server.ts      # Express server setup
├── health.ts      # Health check logic
└── health.test.ts # Vitest tests
```

## API Endpoints

### GET /healthz

Returns JSON health check response.

**Response (200 OK):**
```json
{
  "status": "ok",
  "ts": "2026-05-07T11:53:45.123Z"
}
```

## Testing

The Vitest suite validates:
- ✅ `status` field equals `'ok'`
- ✅ `ts` field contains valid ISO 8601 timestamp
- ✅ Timestamp can be parsed as a valid Date
- ✅ Both fields are present in response
- ✅ HTTP endpoint returns 200 status with JSON content type

Run with:
```bash
npm test
```

## License

MIT
