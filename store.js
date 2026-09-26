/* Infinity Sparkle Studios — shared data store
   Saves to this browser (localStorage). Studio can back up / restore a JSON file,
   and optionally sync to a PRIVATE GitHub repo (token kept only in this browser). */

const STORE_KEY = 'iss-data-v1';
const TOKEN_KEY = 'iss-github-token';

const Store = {
  data: null,

  load() {
    let raw = null;
    try { raw = localStorage.getItem(STORE_KEY); } catch (e) {}
    if (raw) {
      try { Store.data = Store.migrate(JSON.parse(raw)); return Store.data; } catch (e) {}
    }
    Store.data = Store.seed();
    Store.save();
    return Store.data;
  },

  save() {
    Store.data.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(Store.data)); return true; }
    catch (e) { console.warn('Could not save', e); return false; }
  },

  migrate(d) {
    const base = Store.seed(true);
    d.settings = deepMerge(base.settings, d.settings || {});
    d.requests = d.requests || [];
    d.jobs = d.jobs || [];
    d.github = d.github || { owner: '', repo: '', branch: 'main', path: 'data/iss-data.json' };
    return d;
  },

  seed(empty) {
    const d = {
      settings: JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
      requests: [],
      jobs: [],
      github: { owner: '', repo: '', branch: 'main', path: 'data/iss-data.json' },
      studioPinHash: '',
      updatedAt: new Date().toISOString()
    };
    if (empty) return d;
    d.requests = [
      { id: 'r1', demo: true, createdAt: '2026-09-20T09:00:00Z', name: 'Priya Nair', email: 'priya@email.com',
        idea: "Reset my mother's tanzanite into something like your heart pendant, but a little smaller.",
        occasion: 'Memorial / Heirloom', metal: 'Sterling Silver', budget: 'R3,000 – R7,500', image: null,
        status: 'discussion', quote: null, paymentLink: null,
        messages: [
          { from: 'customer', text: "Reset my mother's tanzanite into something like your heart pendant, but a little smaller." },
          { from: 'studio', text: 'What a beautiful idea, Priya. We can scale the heart down by about 20% and centre a single tanzanite. Would you like the pavé border in silver or white gold?' },
          { from: 'customer', text: 'Silver, please — and could we add a tiny engraving on the back?' },
          { from: 'studio', text: 'Yes, easily done. Sketch coming your way within 2 business days!' }
        ] },
      { id: 'r2', demo: true, createdAt: '2026-09-22T09:00:00Z', name: 'Marcus Webb', email: 'marcus@email.com',
        idea: 'Something simple for a first anniversary — maybe a thin band with our initials.',
        occasion: 'Anniversary', metal: 'Yellow Gold', budget: 'R7,500 – R15,000', image: null,
        status: 'approved', quote: null, paymentLink: null,
        messages: [
          { from: 'customer', text: 'Something simple for a first anniversary — maybe a thin band with our initials.' },
          { from: 'studio', text: 'Love this. Here\'s a first concept: a 2mm hammered gold band with "M + L" engraved inside.' },
          { from: 'customer', text: "This is perfect, let's go with this one!" }
        ] }
    ];
    const s = d.settings;
    const job = Store.newJob('Marcus Webb — 2mm hammered band', 'r2', '9ct');
    job.demo = true;
    job.stages.design.lines.push(...Pricing.catalogLine(s, 'cad1', 1));
    job.stages.design.status = 'done';
    job.stages.print.lines.push(...Pricing.resinPrintLines(s, 'castable', 2.5, 1.5));
    job.stages.print.status = 'done';
    job.stages.cast.lines.push(...Pricing.metalLines(s, '9ct', 3.2));
    job.stages.cast.lines.push(...Pricing.catalogLine(s, 'tree', 1));
    job.stages.cast.status = 'progress';
    d.jobs.push(job);
    return d;
  },

  newJob(title, requestId, metalKey) {
    const stages = {};
    STAGES.forEach(st => { stages[st.key] = { status: 'todo', lines: [] }; });
    return { id: 'j' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
             title: title || 'New piece', requestId: requestId || '', metal: metalKey || '9ct',
             createdAt: new Date().toISOString(), markupOverride: '', shadowOverride: '', notes: '', stages,
             history: [] };
  },

  /* ---- backup ---- */
  exportFile() {
    const blob = new Blob([JSON.stringify(Store.data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'iss-studio-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  },
  importText(text) {
    const d = JSON.parse(text);
    if (!d.settings || !d.jobs) throw new Error('This does not look like a studio backup file.');
    const keep = Store.data ? { pin: Store.data.studioPinHash, gh: Store.data.github } : {};
    Store.data = Store.migrate(d);
    if (keep.pin) Store.data.studioPinHash = keep.pin;
    if (keep.gh && keep.gh.owner) Store.data.github = { ...keep.gh, ...{ sha: (d.github || {}).sha || keep.gh.sha } };
    Store.save();
  },

  /* ---- GitHub sync (private repo recommended) ---- */
  getToken() { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch (e) { return ''; } },
  setToken(t) { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch (e) {} },

  async ghRequest(method, body) {
    const g = Store.data.github, token = Store.getToken();
    if (!g.owner || !g.repo || !token) throw new Error('Fill in owner, repo and token under Sync first.');
    const url = `https://api.github.com/repos/${encodeURIComponent(g.owner)}/${encodeURIComponent(g.repo)}/contents/${g.path.split('/').map(encodeURIComponent).join('/')}`;
    const res = await fetch(method === 'GET' ? `${url}?ref=${encodeURIComponent(g.branch)}` : url, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      body: body ? JSON.stringify(body) : undefined
    });
    if (method === 'GET' && res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub said ${res.status}: ${(await res.text()).slice(0, 160)}`);
    return res.json();
  },
  async pull() {
    const f = await Store.ghRequest('GET');
    if (!f) throw new Error('No data file on GitHub yet — push first.');
    const text = decodeURIComponent(escape(atob(f.content.replace(/\n/g, ''))));
    Store.importText(text);
    Store.data.github.sha = f.sha;
    Store.save();
  },
  async push() {
    let sha;
    try { const f = await Store.ghRequest('GET'); sha = f && f.sha; } catch (e) { throw e; }
    const copy = JSON.parse(JSON.stringify(Store.data));
    delete copy.studioPinHash;
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(copy, null, 2))));
    const r = await Store.ghRequest('PUT', {
      message: 'Studio data update ' + new Date().toISOString(),
      content, branch: Store.data.github.branch, sha
    });
    Store.data.github.sha = r.content.sha;
    Store.data.github.lastPush = new Date().toISOString();
    Store.save();
  }
};

function deepMerge(base, over) {
  if (Array.isArray(base)) return Array.isArray(over) ? over : base;
  if (typeof base !== 'object' || base === null) return over === undefined ? base : over;
  const out = { ...base };
  Object.keys(over || {}).forEach(k => { out[k] = k in base ? deepMerge(base[k], over[k]) : over[k]; });
  return out;
}

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
