/* Infinity Sparkle Studios — pricing engine
   All amounts in ZAR. Default rates come from:
   - Precious Metals Tswane "Design, Print, Cast and Finishing Price List" (Mar–Aug 2026)
   - Elegoo_Mars_Advanced_Resin_Pricing_System.xlsx (resin library)
   - Filigree_Pricing_Calculator_South_Africa (labour rate, overheads, risk, mark-up)
   Every value is editable in Studio → Price Book. */

const DEFAULT_SETTINGS = {
  version: 1,
  priceListNote: 'PMT price list Mar–Aug 2026 — request the current list',
  metalPriceDate: '',
  metals: [
    // pricePerGram = metal price of the day (update daily); casting/finishing = PMT fee per gram
    { key: 'silver', label: 'Sterling Silver', pricePerGram: 0,      casting: 30, finishing: 85 },
    { key: '9ct',    label: '9ct Gold',        pricePerGram: 665.17, casting: 35, finishing: 125 },
    { key: '14ct',   label: '14ct Gold',       pricePerGram: 1030.18,casting: 40, finishing: 135 },
    { key: '18ct',   label: '18ct Gold',       pricePerGram: 0,      casting: 45, finishing: 170 },
    { key: 'pt',     label: 'Platinum',        pricePerGram: 0,      casting: 65, finishing: 185 }
  ],
  resins: [
    { key: 'standard', label: 'Standard Resin',  bottleMl: 1000, bottlePrice: 650 },
    { key: 'abs',      label: 'ABS-like Resin',  bottleMl: 1000, bottlePrice: 850 },
    { key: 'castable', label: 'Castable Resin',  bottleMl: 1000, bottlePrice: 1200 },
    { key: 'flexible', label: 'Flexible Resin',  bottleMl: 1000, bottlePrice: 1400 }
  ],
  printer: { label: 'Elegoo Mars', watts: 60, electricityPerKwh: 3.5, wearPerHour: 5, postProcessing: 20 },
  labourRate: 700,
  catalog: [
    // CAD (PMT)
    { key: 'cad1', group: 'CAD design (PMT)', label: 'Type 1: Plain wedding band', price: 280, unit: 'design' },
    { key: 'cad2', group: 'CAD design (PMT)', label: 'Type 2: Solitaire / eternity band', price: 480, unit: 'design' },
    { key: 'cad3', group: 'CAD design (PMT)', label: 'Type 3: Halo ring / matching bands', price: 600, unit: 'design' },
    { key: 'cad4', group: 'CAD design (PMT)', label: 'Type 4: Engagement + wedding ring set', price: 750, unit: 'design' },
    { key: 'cad5', group: 'CAD design (PMT)', label: 'Type 5: Intricate designer piece', price: 750, unit: 'design' },
    { key: 'cad5c', group: 'CAD design (PMT)', label: 'Type 5: Family crest', price: 2100, unit: 'design' },
    { key: 'cad6', group: 'CAD design (PMT)', label: 'Type 6: Changes (per ½ hour)', price: 150, unit: '½ hr' },
    // Printing / casting prep (PMT)
    { key: 'projet', group: 'Printing & casting (PMT)', label: 'Projet MJP 2500 print', price: 0.78, unit: 'mm³' },
    { key: 'tree', group: 'Printing & casting (PMT)', label: 'Tree building (own wax/resin print)', price: 15, unit: 'item' },
    { key: 'waxinj', group: 'Printing & casting (PMT)', label: 'Wax injection', price: 15, unit: 'wax' },
    { key: 'urgentcast', group: 'Printing & casting (PMT)', label: 'Urgent cast surcharge', price: 400, unit: 'item' },
    // Finishing (PMT)
    { key: 'basicfin', group: 'Finishing (PMT)', label: 'Basic finishing (no full finish)', price: 50, unit: 'item' },
    { key: 'urgentfin', group: 'Finishing (PMT)', label: 'Urgent finishing surcharge', price: 400, unit: 'item' },
    { key: 'matt', group: 'Finishing (PMT)', label: 'Matt finish / sandblasting', price: 150, unit: 'item' },
    // Setting (PMT, per stone)
    { key: 'set_prepave', group: 'Stone setting (PMT)', label: 'Pre-set pavé', price: 35, unit: 'stone' },
    { key: 'set_star', group: 'Stone setting (PMT)', label: 'Star pavé', price: 35, unit: 'stone' },
    { key: 'set_handpave', group: 'Stone setting (PMT)', label: 'Hand-set pavé', price: 50, unit: 'stone' },
    { key: 'set_gypsyr', group: 'Stone setting (PMT)', label: 'Gypsy round', price: 35, unit: 'stone' },
    { key: 'set_gypsyf', group: 'Stone setting (PMT)', label: 'Gypsy fancy', price: 45, unit: 'stone' },
    { key: 'set_chanr', group: 'Stone setting (PMT)', label: 'Channel round', price: 40, unit: 'stone' },
    { key: 'set_chanf', group: 'Stone setting (PMT)', label: 'Channel fancy', price: 50, unit: 'stone' },
    { key: 'set_tuberS', group: 'Stone setting (PMT)', label: 'Tube round 0.5–2.9mm', price: 35, unit: 'stone' },
    { key: 'set_tuberL', group: 'Stone setting (PMT)', label: 'Tube round 3mm+', price: 40, unit: 'stone' },
    { key: 'set_tubefS', group: 'Stone setting (PMT)', label: 'Tube fancy 0.5–2.9mm', price: 60, unit: 'stone' },
    { key: 'set_tubefL', group: 'Stone setting (PMT)', label: 'Tube fancy 3mm+', price: 65, unit: 'stone' },
    { key: 'set_centre', group: 'Stone setting (PMT)', label: 'Centre claw (round & cat claw)', price: 120, unit: 'stone' },
    { key: 'set_clawL', group: 'Stone setting (PMT)', label: 'Large claw 3mm+', price: 80, unit: 'stone' },
    { key: 'set_clawM', group: 'Stone setting (PMT)', label: 'Medium claw 2–2.9mm', price: 60, unit: 'stone' },
    { key: 'set_clawS', group: 'Stone setting (PMT)', label: 'Small claw 0.5–1.9mm', price: 30, unit: 'stone' },
    { key: 'set_tension', group: 'Stone setting (PMT)', label: 'Tension', price: 100, unit: 'stone' },
    { key: 'set_mill', group: 'Stone setting (PMT)', label: 'Millgrain border', price: 40, unit: 'item' },
    { key: 'set_tight', group: 'Stone setting (PMT)', label: 'Stone tightening', price: 10, unit: 'stone' },
    { key: 'set_remove', group: 'Stone setting (PMT)', label: 'Stone removal', price: 8, unit: 'stone' },
    { key: 'set_tbXS', group: 'Stone setting (PMT)', label: 'Tennis bracelet XS 1.9–2.2mm', price: 20, unit: 'stone' },
    { key: 'set_tbS', group: 'Stone setting (PMT)', label: 'Tennis bracelet S 2.5–2.7mm', price: 25, unit: 'stone' },
    { key: 'set_tbM', group: 'Stone setting (PMT)', label: 'Tennis bracelet M 3–3.5mm', price: 30, unit: 'stone' },
    { key: 'set_tbL', group: 'Stone setting (PMT)', label: 'Tennis bracelet L 3.7mm+', price: 35, unit: 'stone' },
    { key: 'set_clean', group: 'Stone setting (PMT)', label: 'Clean second-hand stones', price: 20, unit: 'job' },
    // Extras (PMT)
    { key: 'asmS', group: 'Assembly & extras (PMT)', label: 'Assembly small', price: 350, unit: 'item' },
    { key: 'asmM', group: 'Assembly & extras (PMT)', label: 'Assembly medium', price: 700, unit: 'item' },
    { key: 'asmL', group: 'Assembly & extras (PMT)', label: 'Assembly large', price: 1400, unit: 'item' },
    { key: 'rhodium', group: 'Assembly & extras (PMT)', label: 'Rhodium plating', price: 400, unit: 'item' },
    { key: 'goldplate', group: 'Assembly & extras (PMT)', label: 'Gold / rose gold plating', price: 300, unit: 'item' },
    { key: 'engrave', group: 'Assembly & extras (PMT)', label: 'Laser engraving text', price: 20, unit: 'letter' },
    { key: 'crest1', group: 'Assembly & extras (PMT)', label: 'Family crest on ring (design supplied)', price: 750, unit: 'item' },
    { key: 'crest2', group: 'Assembly & extras (PMT)', label: 'Family crest on ring (PMT design)', price: 1500, unit: 'item' },
    { key: 'stamp', group: 'Assembly & extras (PMT)', label: 'Stamp (logo / metal / ZA)', price: 30, unit: 'stamp' },
    { key: 'weld', group: 'Assembly & extras (PMT)', label: 'Laser weld items together', price: 220, unit: 'joint' },
    { key: 'weldtb', group: 'Assembly & extras (PMT)', label: 'Tennis bracelet assembly', price: 65, unit: 'joint' },
    { key: 'shorttb', group: 'Assembly & extras (PMT)', label: 'Shorten tennis bracelet', price: 250, unit: 'item' },
    { key: 'valuation', group: 'Assembly & extras (PMT)', label: 'Valuation', price: 550, unit: 'item' },
    { key: 'scan', group: 'Assembly & extras (PMT)', label: 'Scanning of metal', price: 155, unit: 'item' },
    { key: 'delivery', group: 'Assembly & extras (PMT)', label: 'Local delivery', price: 150, unit: 'trip' }
  ],
  pricing: {
    overheadsPct: 15,
    riskPct: 15,
    shadowPct: 15,      // shadow price: buffer in case supplier/metal prices rise before the price book is updated
    shadowBase: 'all',   // 'all' = on all costs, 'metal' = on metal value only
    markup: 2.5,
    vatRegistered: false,
    vatPct: 15,
    depositPct: 50,
    roundTo: 10
  }
};

const STAGES = [
  { key: 'design',  label: 'Design / CAD',        hint: 'CAD fee or your own design hours' },
  { key: 'print',   label: '3D print',            hint: 'In-house resin print or PMT Projet print' },
  { key: 'cast',    label: 'Casting',             hint: 'Metal grams × price of the day + casting fee' },
  { key: 'finish',  label: 'Finishing',           hint: 'Finishing fee per gram, or basic finishing' },
  { key: 'setting', label: 'Stones & setting',    hint: 'Stone cost + setting fee per stone' },
  { key: 'extras',  label: 'Plating & extras',    hint: 'Plating, engraving, welding, assembly, delivery' },
  { key: 'qc',      label: 'Final QC & packaging',hint: 'Packaging, chain, findings, your final labour' }
];

const Pricing = {
  metal(s, key) { return s.metals.find(m => m.key === key); },
  resin(s, key) { return s.resins.find(r => r.key === key); },
  item(s, key) { return s.catalog.find(c => c.key === key); },

  lineTotal(l) { return round2((+l.qty || 0) * (+l.unitCost || 0)); },

  stageTotal(stage) { return round2(stage.lines.reduce((a, l) => a + Pricing.lineTotal(l), 0)); },

  /* Full job calculation. Returns every step so the UI can show the working. */
  job(job, s) {
    const p = s.pricing;
    const stages = STAGES.map(st => {
      const data = job.stages[st.key] || { lines: [] };
      return { ...st, total: Pricing.stageTotal(data), status: data.status || 'todo' };
    });
    const cost = round2(stages.reduce((a, st) => a + st.total, 0));
    const metalValue = round2(Object.values(job.stages).flatMap(st => st.lines)
      .filter(l => l.kind === 'metal').reduce((a, l) => a + Pricing.lineTotal(l), 0));
    const overheads = round2(cost * p.overheadsPct / 100);
    const risk = round2(cost * p.riskPct / 100);
    const shadowBase = p.shadowBase === 'metal' ? metalValue : cost;
    const shadowPct = (job.shadowOverride !== '' && job.shadowOverride != null && !isNaN(+job.shadowOverride)) ? +job.shadowOverride : p.shadowPct;
    const shadow = round2(shadowBase * shadowPct / 100);
    const subtotal = round2(cost + overheads + risk + shadow);
    const markup = +job.markupOverride || p.markup;
    const rawRetail = subtotal * markup;
    const retail = p.roundTo ? Math.ceil(rawRetail / p.roundTo) * p.roundTo : round2(rawRetail);
    const vat = p.vatRegistered ? round2(retail * p.vatPct / 100) : 0;
    const total = round2(retail + vat);
    const deposit = round2(total * p.depositPct / 100);
    const profit = round2(retail - subtotal);
    const warnings = [];
    Object.values(job.stages).flatMap(st => st.lines).forEach(l => {
      if ((+l.unitCost || 0) === 0) warnings.push(`"${l.desc}" has a zero price — check the Price Book.`);
    });
    return { stages, cost, metalValue, overheads, risk, shadow, shadowPct, shadowBase: p.shadowBase, subtotal,
             markup, retail, vat, total, deposit, profit, warnings };
  },

  /* ---- line builders used by the quick-add forms (snapshot prices at the moment of adding) ---- */
  metalLines(s, metalKey, grams, { includeCasting = true } = {}) {
    const m = Pricing.metal(s, metalKey); if (!m) return [];
    const out = [{ kind: 'metal', desc: `${m.label} metal (price of the day)`, qty: grams, unit: 'g', unitCost: m.pricePerGram }];
    if (includeCasting) out.push({ kind: 'fee', desc: `${m.label} casting fee`, qty: grams, unit: 'g', unitCost: m.casting });
    return out;
  },
  finishingLine(s, metalKey, grams) {
    const m = Pricing.metal(s, metalKey); if (!m) return [];
    return [{ kind: 'fee', desc: `${m.label} full finishing`, qty: grams, unit: 'g', unitCost: m.finishing }];
  },
  resinPrintLines(s, resinKey, ml, hours) {
    const r = Pricing.resin(s, resinKey); const pr = s.printer; if (!r) return [];
    const perMl = r.bottlePrice / r.bottleMl;
    const elecPerHour = pr.watts / 1000 * pr.electricityPerKwh;
    return [
      { kind: 'material', desc: `${r.label}`, qty: ml, unit: 'mL', unitCost: round4(perMl) },
      { kind: 'machine', desc: `${pr.label} electricity (${pr.watts}W)`, qty: hours, unit: 'hr', unitCost: round4(elecPerHour) },
      { kind: 'machine', desc: `${pr.label} wear & tear`, qty: hours, unit: 'hr', unitCost: pr.wearPerHour },
      { kind: 'material', desc: 'Post-processing (IPA, gloves, curing)', qty: 1, unit: 'print', unitCost: pr.postProcessing }
    ];
  },
  labourLine(s, hours, desc) {
    return [{ kind: 'labour', desc: desc || 'Studio labour', qty: hours, unit: 'hr', unitCost: s.labourRate }];
  },
  catalogLine(s, key, qty) {
    const c = Pricing.item(s, key); if (!c) return [];
    return [{ kind: 'fee', desc: c.label, qty, unit: c.unit, unitCost: c.price }];
  },
  stoneLines(s, { stoneDesc, qty, costEach, settingKey }) {
    const out = [];
    if (stoneDesc || costEach) out.push({ kind: 'material', desc: stoneDesc || 'Stones', qty, unit: 'stone', unitCost: +costEach || 0 });
    if (settingKey) out.push(...Pricing.catalogLine(s, settingKey, qty));
    return out;
  }
};

function round2(n) { return Math.round((+n || 0) * 100) / 100; }
function round4(n) { return Math.round((+n || 0) * 10000) / 10000; }
function rand(n) {
  return 'R ' + (+n || 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function randWhole(n) {
  return 'R ' + Math.round(+n || 0).toLocaleString('en-ZA');
}

if (typeof module !== 'undefined') module.exports = { DEFAULT_SETTINGS, STAGES, Pricing, rand, round2 };
