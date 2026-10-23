import { resources } from '../lib/data';

export function GET() {
  const cols = ['id', 'name', 'type', 'license', 'flag', 'maint', 'rel', 'ver', 'by', 'on', 'url', 'source'] as const;
  const q = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines = [[...cols, 'stages', 'domains'].join(',')].concat(
    resources.map((r) => [...cols.map((c) => q(r[c])), q(r.stages.join('|')), q(r.domains.join('|'))].join(',')),
  );
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/csv' } });
}
