/* Subpage views for sidebar items. Each is a React component rendered into #root. */
const { AIVC_DATA, SubpageShell, HeatmapPanel, TrendPanel, InitiativesPanel, BenchmarkPanel } = window;
const { Glieder, CrossAxes, FamilyTrend, TopHebel, FamilyScore } = AIVC_DATA;

// ── Facetten overview ───────────────────────────────────────────────────
function FacettenPage() {
  return (
    <SubpageShell active="compass" title="Facetten" breadcrumb="Facetten"
      sub="Alle fünf AIVC-Facetten in der Übersicht. Klick öffnet die jeweilige Reifegrad-Diagnostik.">
      <div className="facette-grid">
        {Glieder.map(g => (
          <a key={g.id} href={"facette.html?id=" + g.id} className="facette-grid__card" style={{ borderTopColor: g.color.fg }}>
            <div className="facette-grid__card-head">
              <div>
                <div className="facette-grid__code" style={{ color: g.color.fg }}>{g.code}</div>
                <div className="facette-grid__title">{g.title}</div>
                <div className="facette-grid__purpose">{g.purpose}</div>
              </div>
              <div className="facette-grid__score" style={{ color: g.color.fg }}>{g.score}</div>
            </div>
            <div className="facette-grid__dims">
              {g.dimensions.map(d => (
                <div className="facette-grid__dim" key={d.id}>
                  <div className="facette-grid__dim-id">{d.id}</div>
                  <div className="facette-grid__dim-score" style={{ color: g.color.fg }}>{d.score}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, fontSize: 11, color: "var(--fg-muted)" }}>{g.lastUpdate}</div>
          </a>
        ))}
      </div>
    </SubpageShell>
  );
}

// ── Heatmap ─────────────────────────────────────────────────────────────
function HeatmapPage() {
  return (
    <SubpageShell active="map" title="Reife-Heatmap" breadcrumb="Reife-Heatmap"
      sub="Querschnittsdimensionen über alle fünf Facetten. Der gemeinsame Nenner über das Spectrum.">
      <HeatmapPanel facetten={Glieder} axes={CrossAxes} />
      <div style={{ marginTop: 16, fontSize: 12, color: "var(--fg-muted)" }}>
        Hinweis: Werte sind aggregierte Mappings der Facetten-D1–D6 auf die fünf Querschnittsachsen
        (Strategie, Daten, Technologie, Menschen, Governance). Für die volle D1–D6-Tiefe einer Facette
        ist die jeweilige Detailseite die kanonische Quelle.
      </div>
    </SubpageShell>
  );
}

// ── Trends ──────────────────────────────────────────────────────────────
function TrendsPage() {
  return (
    <SubpageShell active="trends" title="Trends & Forecast" breadcrumb="Trends"
      sub="Spectrum-Score über die letzten Monate mit 3-Monats-Projektion.">
      <TrendPanel data={FamilyTrend} />
      <div className="dim-grid" style={{ marginTop: 24 }}>
        {Glieder.map(g => (
          <div className="dim-card" key={g.id} style={{ borderTopColor: g.color.fg }}>
            <div className="dim-card__id" style={{ color: g.color.fg }}>{g.code}</div>
            <div className="dim-card__label">{g.title}</div>
            <div className="dim-card__score-row">
              <div className="dim-card__score" style={{ color: g.color.fg }}>{g.score}</div>
              <div className="dim-card__denom">{g.delta >= 0 ? "+" : ""}{g.delta} vs. Vormonat</div>
            </div>
            <div className="dim-card__cat">Letzte 7 Erhebungen: {g.sparkline.join(" · ")}</div>
          </div>
        ))}
      </div>
    </SubpageShell>
  );
}

// ── Benchmark ───────────────────────────────────────────────────────────
function BenchmarkPage() {
  return (
    <SubpageShell active="bench" title="Benchmark" breadcrumb="Benchmark"
      sub="AIVC Spectrum gegen Best-in-class-Schwellen (70/100).">
      <BenchmarkPanel facetten={Glieder} />
      <div style={{ marginTop: 24, fontSize: 13, color: "var(--fg-primary)", maxWidth: 720, lineHeight: 1.6 }}>
        <strong style={{ color: "var(--color-navy)" }}>Lesehilfe:</strong> Werte unter 50/100 markieren eine
        Foundational-Gap-Zone — typisch für die Infrastruktur- und Hardware-Facetten in frühen
        Transformationsphasen. Werte ≥ 70/100 entsprechen Best-in-class und werden im Spectrum aktuell
        nur von AIVCIO (Individual Operations) erreicht.
      </div>
    </SubpageShell>
  );
}

// ── Hebel ───────────────────────────────────────────────────────────────
function HebelPage() {
  return (
    <SubpageShell active="init" title="Top-Hebel" breadcrumb="Hebel"
      sub="Größter Reifegrad-Effekt bei kleinstem Aufwand. Priorisiert über alle Facetten.">
      <InitiativesPanel items={TopHebel} />
      <div style={{ marginTop: 24 }}>
        <h2 className="subpage-section-title">Hebel pro Facette</h2>
        <div className="dim-grid">
          {Glieder.map(g => {
            const weakest = [...g.dimensions].sort((a, b) => a.score - b.score)[0];
            return (
              <div className="dim-card" key={g.id} style={{ borderTopColor: g.color.fg }}>
                <div className="dim-card__id" style={{ color: g.color.fg }}>{g.code}</div>
                <div className="dim-card__label">Schwächster Dim: {weakest.label}</div>
                <div className="dim-card__score-row">
                  <div className="dim-card__score" style={{ color: g.color.fg }}>{weakest.score}</div>
                  <div className="dim-card__denom">/ 100</div>
                </div>
                <a href={"facette.html?id=" + g.id} style={{ display: "inline-block", marginTop: 10, fontSize: 11, color: g.color.fg, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Maßnahmen ansehen →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </SubpageShell>
  );
}

// ── Insights ────────────────────────────────────────────────────────────
function InsightsPage() {
  const sorted = [...Glieder].sort((a, b) => b.score - a.score);
  const top = sorted[0]; const bottom = sorted[sorted.length - 1];
  const insights = [
    { title: "Spannweite", body: `${top.code} (${top.score}) führt — ${bottom.code} (${bottom.score}) braucht Fokus. Spannweite: ${top.score - bottom.score} Punkte.` },
    { title: "Hardware kritisch", body: "AIVCHW liegt mit 5 von 6 Dimensionen unter Target — Investment-Window aktiv." },
    { title: "Individual Operations zieht", body: "AIVCIO Self-Pilot mit 13,5 Hot-Stunden/Woche Potenzial. Skalierung auf 5 Personen würde die Aggregate-Maturity des Spectrums um geschätzt 4 Punkte heben." },
    { title: "Infra-ML-Gap", body: "AIVCIR D5 (AI/ML Platform & Tooling) bei 38/100 — Foundational Gap. Solange offen, sind Operations-Initiativen aus AIVCO durch Tooling-Reibung gebremst." },
    { title: "Konsistente Aufwärtsbewegung", body: `Spectrum-Score steigt seit Nov '25 von 44 auf ${FamilyScore} (Mai '26) — +${FamilyScore - 44} Punkte in 6 Monaten.` },
  ];
  return (
    <SubpageShell active="insight" title="Insights" breadcrumb="Insights"
      sub="Generierte Schlussfolgerungen aus den aktuellen Spectrum-Daten.">
      <div className="dim-grid">
        {insights.map((i, idx) => (
          <div className="dim-card" key={idx} style={{ borderTopColor: "var(--color-teal-mid)", gridColumn: idx === 0 ? "span 2" : "span 1" }}>
            <div className="dim-card__id" style={{ color: "var(--color-teal-dark)" }}>INSIGHT {String(idx + 1).padStart(2, "0")}</div>
            <div className="dim-card__label">{i.title}</div>
            <div style={{ fontSize: 13, color: "var(--fg-primary)", marginTop: 10, lineHeight: 1.55 }}>{i.body}</div>
          </div>
        ))}
      </div>
    </SubpageShell>
  );
}

// ── Reports ─────────────────────────────────────────────────────────────
function ReportsPage() {
  const reports = Glieder.map(g => ({
    code: g.code, title: g.title + " · Freeze",
    sub: g.lastUpdate, status: "Live",
    href: "facette.html?id=" + g.id,
    color: g.color.fg,
  }));
  reports.push(
    { code: "SPEC", title: "Spectrum Monthly Report · Mai 2026", sub: "Aggregat über alle Facetten · n = 35", status: "Draft", href: "#", color: "#1D4477" },
    { code: "EXEC", title: "Executive Briefing · Q2 2026", sub: "Top-3-Hebel, Forecast 3 Mon., Budget-Asks", status: "Scheduled", href: "#", color: "#00A19F" },
  );
  return (
    <SubpageShell active="report" title="Reports" breadcrumb="Reports"
      sub="Alle Facetten-Freezes und übergreifenden Reports im Spectrum.">
      <div className="report-list">
        {reports.map((r, i) => (
          <div className="report-row" key={i}>
            <div className="report-row__code" style={{ color: r.color }}>{r.code}</div>
            <div>
              <div className="report-row__title">{r.title}</div>
              <div className="report-row__sub">{r.sub}</div>
            </div>
            <div className="report-row__chip">{r.status}</div>
            <a className="report-row__btn" href={r.href}>Öffnen</a>
            <a className="report-row__btn" href="#" onClick={e => e.preventDefault()}>Export</a>
          </div>
        ))}
      </div>
    </SubpageShell>
  );
}

// ── Datenquellen ────────────────────────────────────────────────────────
function DatenquellenPage() {
  const sources = Glieder.map(g => ({
    code: g.code, title: g.title, owner: g.owner, lastUpdate: g.lastUpdate, color: g.color.fg,
    n: g.lastUpdate.match(/n\s*=\s*([\d]+)/i)?.[1] || "—",
    href: "https://github.com/jaymanuzon/vantum",
  }));
  return (
    <SubpageShell active="data" title="Datenquellen" breadcrumb="Datenquellen"
      sub="Herkunft, Owner und Aktualität der Reifegrad-Daten je Facette.">
      <div className="ds-grid">
        {sources.map(s => (
          <div className="ds-card" key={s.code}>
            <div className="ds-card__head">
              <div className="ds-card__code" style={{ color: s.color }}>{s.code}</div>
              <div className="ds-card__status ds-card__status--live">Live</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-navy)", marginBottom: 8 }}>{s.title}</div>
            <div className="ds-card__row"><span>Owner</span><span>{s.owner}</span></div>
            <div className="ds-card__row"><span>Letzte Erhebung</span><span>{s.lastUpdate}</span></div>
            <div className="ds-card__row"><span>Stichprobe</span><span>n = {s.n}</span></div>
            <div className="ds-card__row"><span>Repository</span><span>jaymanuzon/vantum</span></div>
            <a className="ds-card__link" href={s.href} target="_blank" rel="noopener">Auf GitHub öffnen →</a>
          </div>
        ))}
      </div>
    </SubpageShell>
  );
}

// ── Settings ────────────────────────────────────────────────────────────
function SettingsPage() {
  return (
    <SubpageShell active="settings" title="Einstellungen" breadcrumb="Einstellungen"
      sub="Konfiguration des Spectrum-Cockpits.">
      <div className="dim-grid">
        <div className="dim-card" style={{ borderTopColor: "var(--color-navy)" }}>
          <div className="dim-card__id" style={{ color: "var(--color-navy)" }}>BENUTZER</div>
          <div className="dim-card__label">Jay Manuzon</div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>Spectrum Steward · Leverkusen</div>
        </div>
        <div className="dim-card" style={{ borderTopColor: "var(--color-teal-mid)" }}>
          <div className="dim-card__id" style={{ color: "var(--color-teal-dark)" }}>SPRACHE</div>
          <div className="dim-card__label">Deutsch (DE)</div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>Sekundär: English (EN)</div>
        </div>
        <div className="dim-card" style={{ borderTopColor: "var(--color-teal-bright)" }}>
          <div className="dim-card__id" style={{ color: "var(--color-teal-dark)" }}>ERHEBUNGS-RHYTHMUS</div>
          <div className="dim-card__label">Monatlich</div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>Nächste Erhebung: Juni 2026</div>
        </div>
        <div className="dim-card" style={{ borderTopColor: "var(--color-sky)" }}>
          <div className="dim-card__id" style={{ color: "var(--color-sky)" }}>BENACHRICHTIGUNGEN</div>
          <div className="dim-card__label">E-Mail · wöchentlich</div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>Slack: bei Score-Änderung ≥ 5</div>
        </div>
        <div className="dim-card" style={{ borderTopColor: "var(--color-charcoal)" }}>
          <div className="dim-card__id" style={{ color: "var(--color-charcoal)" }}>EXPORT</div>
          <div className="dim-card__label">PDF · PPTX · CSV</div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>Auto-Export: jeden 1. des Monats</div>
        </div>
        <div className="dim-card" style={{ borderTopColor: "var(--color-navy)" }}>
          <div className="dim-card__id" style={{ color: "var(--color-navy)" }}>BRAND</div>
          <div className="dim-card__label">Vantum · AIVC Spectrum</div>
          <div style={{ fontSize: 12, color: "var(--fg-muted)", marginTop: 8 }}>Design System v1.0 · Mai 2026</div>
        </div>
      </div>
    </SubpageShell>
  );
}

Object.assign(window, {
  FacettenPage, HeatmapPage, TrendsPage, BenchmarkPage,
  HebelPage, InsightsPage, ReportsPage, DatenquellenPage, SettingsPage,
});
