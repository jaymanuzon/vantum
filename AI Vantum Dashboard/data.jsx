/* AIVC Spectrum — real data extracted from cowork freezes (Mai 2026)
   Sources: 2026-05-05-aivch / aivco / aivcir / aivchw / 2026-05-11-aivcio.
   Likert 1–5 converted to 0–100 (× 20). Each Facette carries its own D1–D6. */

const Period = "Mai 2026";
const PrevPeriod = "Apr 2026";

const FacetteColors = {
  aivch:  { fg: "#1D4477", bg: "#EEF2F8" },
  aivco:  { fg: "#00A19F", bg: "#E1F4F3" },
  aivcir: { fg: "#005E65", bg: "#E6F2F2" },
  aivchw: { fg: "#52555C", bg: "#EFEFEC" },
  aivcio: { fg: "#00B1EB", bg: "#E0F2FA" },
};

const L = v => Math.round(v * 20); // Likert → 0–100

const Facetten = [
  {
    id: "aivch",
    code: "AIVCH",
    title: "Health Check",
    purpose: "Organisations-Readiness",
    description: "Wie reif ist die Organisation für AI Value Capture? 6 Dimensionen, 18 Sub-Dim, 60 Items.",
    owner: "Jay Manuzon",
    lastUpdate: "5. Mai 2026 · n = 10",
    score: L((3.35+2.60+2.67+3.57+2.44+3.18)/6),
    delta: +4,
    band: "Moderate",
    color: FacetteColors.aivch,
    sparkline: [48, 52, 54, 56, 57, 58, 59],
    dimensions: [
      { id: "D1", label: "AI Strategy & Vision",        score: L(3.35), cat: "Foundation" },
      { id: "D2", label: "AI Literacy & Skills",        score: L(2.60), cat: "Foundation" },
      { id: "D3", label: "Process & Workflow Readiness",score: L(2.67), cat: "Foundation" },
      { id: "D4", label: "Leadership & Culture",        score: L(3.57), cat: "Enabler" },
      { id: "D5", label: "Organizational Support",      score: L(2.44), cat: "Enabler" },
      { id: "D6", label: "Human-Centric Integration",   score: L(3.18), cat: "Enabler" },
    ],
    cross: { Strategie: 60, Daten: 50, Technologie: 49, Menschen: 67, Governance: 49 },
  },
  {
    id: "aivco",
    code: "AIVCO",
    title: "Operations Potential",
    purpose: "Abteilungs-Automatisierungs-Potenzial",
    description: "Pro Abteilung: Automatisierung vs. Augmentation. 6 Dim · 18 Sub · 54 Items.",
    owner: "Jay Manuzon",
    lastUpdate: "5. Mai 2026 · n = 18 · 6 Depts",
    score: L((3.42+3.13+3.33+3.18+3.38+3.10)/6),
    delta: +5,
    band: "Significant",
    color: FacetteColors.aivco,
    sparkline: [58, 60, 61, 62, 63, 64, 65],
    dimensions: [
      { id: "D1", label: "Task Profile & Repetitiveness", score: L(3.42), cat: "Potential" },
      { id: "D2", label: "Data & Information Quality",    score: L(3.13), cat: "Potential" },
      { id: "D3", label: "Process Standardization",       score: L(3.33), cat: "Potential" },
      { id: "D4", label: "Decision Complexity",           score: L(3.18), cat: "Potential" },
      { id: "D5", label: "Digital Maturity & Tools",      score: L(3.38), cat: "Readiness" },
      { id: "D6", label: "Human Interaction Intensity",   score: L(3.10), cat: "Augmentation" },
    ],
    cross: { Strategie: 67, Daten: 63, Technologie: 68, Menschen: 62, Governance: 64 },
  },
  {
    id: "aivcir",
    code: "AIVCIR",
    title: "Infrastructure ROI",
    purpose: "IT-Infrastruktur-Reife",
    description: "Cloud, Daten, API, Security, ML-Platform, IT-Organisation. 6 Dim · 42 Items · Hybrid ROI.",
    owner: "Jay Manuzon",
    lastUpdate: "5. Mai 2026 · n = 8",
    score: L((2.8+2.3+2.5+3.1+1.9+2.6)/6),
    delta: +2,
    band: "Foundational gaps",
    color: FacetteColors.aivcir,
    sparkline: [43, 45, 47, 48, 49, 50, 51],
    dimensions: [
      { id: "D1", label: "Cloud & Compute Infrastructure", score: L(2.8), target: L(4.0) },
      { id: "D2", label: "Data Infrastructure & Arch.",    score: L(2.3), target: L(4.0) },
      { id: "D3", label: "Integration & API Landscape",    score: L(2.5), target: L(3.5) },
      { id: "D4", label: "Security, Compliance & Gov.",    score: L(3.1), target: L(4.0) },
      { id: "D5", label: "AI/ML Platform & Tooling",       score: L(1.9), target: L(3.5) },
      { id: "D6", label: "IT Organization & Competence",   score: L(2.6), target: L(3.5) },
    ],
    cross: { Strategie: 50, Daten: 46, Technologie: 48, Menschen: 52, Governance: 62 },
  },
  {
    id: "aivchw",
    code: "AIVCHW",
    title: "Hardware ROI",
    purpose: "Endgeräte & Compute-Hardware",
    description: "Workstations, Server, Mobile/Edge, Netzwerk, Specialized HW, Procurement. 6 Dim · 42 Items.",
    owner: "Jay Manuzon",
    lastUpdate: "5. Mai 2026 · n = 8",
    score: L((2.4+2.1+1.8+2.9+1.6+2.3)/6),
    delta: +1,
    band: "Critical gaps",
    color: FacetteColors.aivchw,
    sparkline: [38, 39, 41, 42, 43, 43, 44],
    dimensions: [
      { id: "D1", label: "Workstation & End Devices",       score: L(2.4), target: L(4.0) },
      { id: "D2", label: "Server & Compute Infrastructure", score: L(2.1), target: L(3.5) },
      { id: "D3", label: "Mobile Devices & Edge Computing", score: L(1.8), target: L(3.0) },
      { id: "D4", label: "Network & Connectivity",          score: L(2.9), target: L(4.0) },
      { id: "D5", label: "Peripherals & Specialized HW",    score: L(1.6), target: L(3.0) },
      { id: "D6", label: "Procurement, Lifecycle & TCO",    score: L(2.3), target: L(3.5) },
    ],
    cross: { Strategie: 40, Daten: 42, Technologie: 44, Menschen: 35, Governance: 46 },
  },
  {
    id: "aivcio",
    code: "AIVCIO",
    title: "Individual Operations",
    purpose: "Task-Readiness pro Person (Self-Pilot)",
    description: "8 Tasks · Hot / Worth / Not Yet · 13,5 Hot-Stunden/Woche Potenzial. N = 1, provisional.",
    owner: "Jay Manuzon (Self-Pilot)",
    lastUpdate: "11. Mai 2026 · N = 1 · 8 Tasks",
    score: L((3.7+3.6+4.0+3.8+3.8+3.2)/6),
    delta: 0,
    band: "2 Hot · 3 Worth · 3 Not Yet",
    color: FacetteColors.aivcio,
    sparkline: [72, 72, 73, 73, 73, 73, 74],
    dimensions: [
      { id: "D1", label: "Format & Quelle",      score: L(3.7), cat: "Input-Klarheit" },
      { id: "D2", label: "Regeln & Ausnahmen",   score: L(3.6), cat: "Input-Klarheit" },
      { id: "D3", label: "Format & Ergebnis",    score: L(4.0), cat: "Output-Klarheit" },
      { id: "D4", label: "Qualität & Akzeptanz", score: L(3.8), cat: "Output-Klarheit" },
      { id: "D5", label: "Frequenz",             score: L(3.8), cat: "Zeitlast" },
      { id: "D6", label: "Dauer pro Instanz",    score: L(3.2), cat: "Zeitlast" },
    ],
    cross: { Strategie: 70, Daten: 75, Technologie: 65, Menschen: 78, Governance: 72 },
  },
];

const CrossAxes = ["Strategie", "Daten", "Technologie", "Menschen", "Governance"];

const FamilyScore = Math.round(
  Facetten.reduce((s, g) => s + g.score, 0) / Facetten.length
);
const FamilyDelta = +3;

const FamilyTrend = [
  { period: "Nov '25", score: 44, forecast: false },
  { period: "Dez '25", score: 47, forecast: false },
  { period: "Jan '26", score: 50, forecast: false },
  { period: "Feb '26", score: 53, forecast: false },
  { period: "Mär '26", score: 55, forecast: false },
  { period: "Apr '26", score: 56, forecast: false },
  { period: "Mai '26", score: FamilyScore, forecast: false },
  { period: "Jun '26", score: FamilyScore + 3, forecast: true },
  { period: "Jul '26", score: FamilyScore + 5, forecast: true },
  { period: "Aug '26", score: FamilyScore + 7, forecast: true },
];

const TopHebel = [
  { id: "aivchw", facette: "AIVCHW", title: "Peripherals & Specialized HW", detail: "D5 = 32/100 — niedrigster Score im Spectrum. GPU-Workstations + Cooling priorisieren.", impact: "Hoch", potential: "+8 bis +12", color: FacetteColors.aivchw },
  { id: "aivcir", facette: "AIVCIR", title: "AI/ML Platform & Tooling", detail: "D5 = 38/100 — keine zentrale ML-Ops-Pipeline. Plattform + Model-Registry aufbauen.", impact: "Hoch", potential: "+6 bis +10", color: FacetteColors.aivcir },
  { id: "aivch",  facette: "AIVCH",  title: "Organizational Support", detail: "D5 = 49/100 — kein ring-fenced AI-Budget, EU AI Act Lücken.", impact: "Mittel", potential: "+4 bis +7", color: FacetteColors.aivch },
];

const Signals = [
  { label: "Hot-Stunden / Woche (AIVCIO)", value: "13.5", direction: "up",   note: "potenzielle Wochenersparnis" },
  { label: "Investment Gap (AIVCIR)",      value: "1.4",  direction: "down", note: "Punkte zu Target" },
  { label: "High-Pri Dim. (AIVCHW)",       value: "5/6",  direction: "up",   note: "Gap ≥ 1.0", alert: true },
  { label: "Spectrum Avg (Likert)",          value: "2.8",  direction: "up",   note: "+0.1 vs. Apr" },
];

const NextReview = {
  title: "AIVC Spectrum Strategy Sync",
  date: "21. Mai 2026",
  time: "09:00 – 11:00 CET",
  participants: 7,
};

Object.assign(window, {
  AIVC_DATA: { Period, PrevPeriod, Facetten, Glieder: Facetten, CrossAxes, FamilyScore, FamilyDelta, FamilyTrend, TopHebel, Signals, NextReview },
});
