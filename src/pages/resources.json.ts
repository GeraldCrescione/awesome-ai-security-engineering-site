import { resources } from '../lib/data';

export function GET() {
  return new Response(JSON.stringify({ generated: new Date().toISOString(), count: resources.length, resources }, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
}
