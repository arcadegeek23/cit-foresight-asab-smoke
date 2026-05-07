export interface HealthResponse {
  status: 'ok';
  ts: string;
}

/**
 * Returns a health check response with current ISO 8601 timestamp
 */
export function health(): HealthResponse {
  return {
    status: 'ok',
    ts: new Date().toISOString()
  };
}
