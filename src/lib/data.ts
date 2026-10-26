import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

export const REPO = 'https://github.com/GeraldCrescione/awesome-ai-security-engineering';
export const COMMUNITY = 'https://www.aiseceng.io/';

export const u = (p = '') =>
  import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p.replace(/^\//, '');

export const CATALOGUE_HELP = `${REPO}/blob/main/resources/README.md`;
export const CONTRIBUTING = `${REPO}/blob/main/CONTRIBUTING.md`;
export const TAXONOMY_ISSUE = `${REPO}/issues/new?template=taxonomy.yml`;

export const VER_HELP: Record<string, string> = {
  verified: 'License and release evidence were both checked against the primary source.',
  partial: 'Something could not be confirmed. The entry notes say what is missing.',
  direct: 'Checked from the primary source (for example the LICENSE file) by a maintainer-run pass.',
  delegated: 'A separate research pass read the primary source. A human spot-check is welcome.',
};
export const FLAG_HELP: Record<string, string> = {
  'Share-alike': 'Creative Commons Share-Alike (CC-BY-SA). You can reuse and adapt the content with credit, but whatever you build from it must be shared under the same license.',
  Copyleft: 'Copyleft license (LGPL). Changes you make to the library must be shared under the same license. Using it unmodified as a dependency is usually fine, but check with your legal team.',
  'Open core': 'Only part of the project is open source. Some capabilities need a proprietary hosted service, account or token. The entry says where the boundary is.',
  'Commercial add-ons': 'The tool itself is open source, but its maintainer also sells related commercial products that are not covered by this listing.',
  'Mixed licensing': 'Different parts of the repository carry different licenses. Check the license of the exact component you plan to use.',
  'License transition': 'The project is moving from one license to another. Older contributions may remain under the previous license.',
};

export const STAGES =['discover', 'design', 'build', 'break', 'defend'] as const;
export const ST: Record<string, { c: string; q: string }> = {
  discover: { c: '#5eead4', q: 'What AI exists in our environment, and what can it reach?' },
  design: { c: '#a78bfa', q: 'What are the trust boundaries, identities and permissions?' },
  build: { c: '#60a5fa', q: 'How do we ship AI-assisted and AI-powered software securely?' },
  break: { c: '#fb7185', q: 'How does the system fail under adversarial conditions?' },
  defend: { c: '#fbbf24', q: 'How do we detect, contain and respond at runtime?' },
};
export const DOM: Record<string, string> = {
  'llm-model': 'LLM / model',
  agentic: 'Agentic',
  'mcp-skills': 'MCP & skills',
  'supply-chain': 'Supply chain',
  runtime: 'Runtime',
  'governance-controls': 'Governance',
  'agent-identity': 'Agent identity',
  'red-teaming': 'Red teaming',
  'ai-assisted-dev': 'AI-assisted dev',
  'data-rag': 'Data & RAG',
};

export interface Resource {
  id: string; name: string; url: string; source: string; summary: string; description: string;
  type: string; stages: string[]; domains: string[]; license: string; licenseNote: string;
  licenseEvidence: string; maint: string; rel: string; ver: string; by: string; on: string;
  notes: string; disc: string; flag: string;
}

function flagOf(r: any): string {
  const lic = String(r.license || '');
  const note = String(r.license_note || '');
  if (/LGPL|GPL/.test(lic)) return 'Copyleft';
  if (/-SA-/.test(lic)) return 'Share-alike';
  if (/open core/i.test(note) || /open core/i.test(String(r.disclosure || ''))) return 'Open core';
  if (/NOT an open-source|mixed/i.test(note)) return 'Mixed licensing';
  if (/transition/i.test(note)) return 'License transition';
  if (/commercial|sells a hosted|hosted platform/i.test(note)) return 'Commercial add-ons';
  return '';
}

const raw = fs.readFileSync(path.resolve(process.cwd(), 'data/resources.yml'), 'utf8');
const clean = (s: any) => String(s ?? '').replace(/\s+/g, ' ').trim();

export const resources: Resource[] = (YAML.parse(raw).resources as any[]).map((r) => ({
  id: r.id, name: r.name, url: r.url, source: r.source || r.url,
  summary: clean(r.summary), description: clean(r.description),
  type: r.type, stages: r.lifecycle || [], domains: r.domains || [],
  license: clean(r.license), licenseNote: clean(r.license_note),
  licenseEvidence: r.license_evidence || '', maint: clean(r.maintainer),
  rel: clean(r.last_release), ver: r.verification, by: r.verified_by,
  on: String(r.verified_on), notes: clean(r.notes), disc: clean(r.disclosure),
  flag: flagOf(r),
}));

export const byId = (id: string) => resources.find((r) => r.id === id)!;
export const primary = (r: Resource) => r.stages[0];
export const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export function matrixCounts(rows: Resource[] = resources) {
  const doms = Object.keys(DOM);
  const cells = STAGES.map((s) =>
    doms.map((d) => rows.filter((r) => r.stages.includes(s) && r.domains.includes(d)).length),
  );
  const max = Math.max(1, ...cells.flat());
  return { doms, cells, max };
}
