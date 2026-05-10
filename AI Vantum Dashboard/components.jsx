/* Sidebar, member tiles, heatmap, initiatives, footer panels. */

const { Donut: DonutAtom, Sparkline: SparkAtom, TrendChart: TrendAtom, MiniRadar: RadarAtom, heatColor: heatColorFn } = window;

// ── Icons (lucide-style hairline) ───────────────────────────────────────
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);
const I = {
  dashboard: <><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><polygon points="16,8 13,13 8,16 11,11" /></>,
  map: <><polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" /></>,
  trends: <><polyline points="3,17 9,11 13,15 21,7" /><polyline points="14,7 21,7 21,14" /></>,
  bench: <><line x1="3" y1="20" x2="21" y2="20" /><rect x="5" y="10" width="3" height="10" /><rect x="11" y="6" width="3" height="14" /><rect x="17" y="13" width="3" height="7" /></>,
  init: <><circle cx="12" cy="12" r="9" /><polyline points="9,12 11,14 15,10" /></>,
  insight: <><circle cx="11" cy="11" r="7" /><line x1="16" y1="16" x2="21" y2="21" /></>,
  report: <><rect x="5" y="3" width="14" height="18" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" /></>,
  data: <><ellipse cx="12" cy="5" rx="8" ry="2.5" /><path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" /><path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
  chevron: <polyline points="6,9 12,15 18,9" />,
  filter: <polygon points="3,4 21,4 14,12 14,20 10,18 10,12" />,
  calendar: <><rect x="3" y="5" width="18" height="16" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="16" y1="3" x2="16" y2="7" /></>,
  download: <><line x1="12" y1="3" x2="12" y2="15" /><polyline points="7,10 12,15 17,10" /><line x1="4" y1="20" x2="20" y2="20" /></>,
  arrow: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13,6 19,12 13,18" /></>,
  up: <><polyline points="6,15 12,9 18,15" /></>,
  down: <><polyline points="6,9 12,15 18,9" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  external: <><path d="M14 4h6v6" /><line x1="20" y1="4" x2="11" y2="13" /><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" /></>,
  alert: <><path d="M12 3l10 18H2z" /><line x1="12" y1="10" x2="12" y2="14" /><circle cx="12" cy="17" r="0.6" fill="currentColor" /></>,
};

// ── Sidebar ─────────────────────────────────────────────────────────────
function Sidebar({ active = "dashboard", onNav }) {
  const items = [
    { id: "dashboard", label: "Spectrum Cockpit", icon: I.dashboard, href: "AIVC Family Dashboard.html" },
    { id: "compass",   label: "Facetten",        icon: I.compass,   href: "facetten.html" },
    { id: "map",       label: "Reife-Heatmap",   icon: I.map,       href: "heatmap.html" },
    { id: "trends",    label: "Trends",          icon: I.trends,    href: "trends.html" },
    { id: "bench",     label: "Benchmark",       icon: I.bench,     href: "benchmark.html" },
    { id: "init",      label: "Hebel",           icon: I.init,      href: "hebel.html" },
    { id: "insight",   label: "Insights",        icon: I.insight,   href: "insights.html" },
    { id: "report",    label: "Reports",         icon: I.report,    href: "reports.html" },
    { id: "data",      label: "Datenquellen",    icon: I.data,      href: "datenquellen.html" },
    { id: "settings",  label: "Einstellungen",   icon: I.settings,  href: "settings.html" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logomark">A</div>
        <div>
          <div className="sidebar__brand">AIVC Spectrum</div>
          <div className="sidebar__brand-sub">Reifegrad-Cockpit</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {items.map(it => (
          <a
            key={it.id}
            href={it.href}
            className={"sidebar__item" + (active === it.id ? " sidebar__item--active" : "")}
          >
            <Icon d={it.icon} />
            <span>{it.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar__note">
        <h4>AIVC Spectrum</h4>
        <p>Sechs Facetten. Sechs Reifedimensionen je Facette. Ein gemeinsamer Wert-Hebel.</p>
      </div>
      <div className="sidebar__user">
        <div className="sidebar__avatar">JM</div>
        <div className="sidebar__user-meta">
          <div className="sidebar__user-name">Jay Manuzon</div>
          <div className="sidebar__user-role">Spectrum Steward</div>
        </div>
      </div>
    </aside>
  );
}

// ── Header ──────────────────────────────────────────────────────────────
function Header({ period }) {
  return (
    <div className="header">
      <div className="header__title">
        <div className="header__lockup">AIVC</div>
        <div className="header__name">
          <h1>AI VALUE CAPTURE SPECTRUM<sup>™</sup></h1>
          <p>Reifegrad-Cockpit über alle sechs Facetten. Stand: {period}.</p>
        </div>
      </div>
      <div className="header__controls">
        <button className="control">
          <Icon d={I.filter} />
          <span>Alle Geschäftseinheiten</span>
          <Icon d={I.chevron} size={12} />
        </button>
        <button className="control">
          <Icon d={I.calendar} />
          <span>{period}</span>
          <Icon d={I.chevron} size={12} />
        </button>
        <button className="control control--icon" title="Export">
          <Icon d={I.download} />
        </button>
      </div>
    </div>
  );
}

// ── Card wrapper ────────────────────────────────────────────────────────
function Card({ title, info, sub, children, className = "" }) {
  return (
    <div className={"card " + className}>
      <div className="card__head">
        <div className="card__title">
          {title}
          {info && <span className="info" title={info}>i</span>}
        </div>
        {sub && <div className="card__sub">{sub}</div>}
      </div>
      {children}
    </div>
  );
}

// ── Spectrum score donut ──────────────────────────────────────────────────
function FamilyScorePanel({ score, delta, period, prev, facetten }) {
  const sorted = [...(facetten || [])].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  return (
    <Card title="Spectrum-Reifegrad" info="Gewichteter Durchschnitt aller fünf Facetten" sub={`Stand ${period}`}>
      <div className="family-score">
        <div>
          <div className="donut-wrap">
            <DonutAtom value={score} size={168} stroke={14} fg="#3ED8C3" />
            <div className="donut-wrap__inner">
              <div className="donut-wrap__num">{score}</div>
              <div className="donut-wrap__denom">/ 100</div>
            </div>
          </div>
          <div className="score-label">
            <div className="score-label__band">Etablierte Reife</div>
            <div className="score-label__delta">
              <strong>↑ {Math.abs(delta)}</strong>&nbsp;vs. {prev}
            </div>
          </div>
        </div>
        <div className="score-prose">
          <p>
            {top && bottom ? (
              <>
                <strong>{top.code}</strong> zieht mit <strong>{top.score}</strong>,
                <strong> {bottom.code}</strong> braucht Fokus bei <strong>{bottom.score}</strong>.
                Spannweite im Spectrum: <strong>{top.score - bottom.score}</strong> Punkte.
              </>
            ) : "Spectrum-Übersicht wird geladen."}
          </p>
          <button className="score-prose__cta">
            Vollständige Analyse <Icon d={I.arrow} size={12} />
          </button>
        </div>
      </div>
    </Card>
  );
}

// ── Trend & forecast ────────────────────────────────────────────────────
function TrendPanel({ data }) {
  return (
    <Card title="Spectrum-Trend & Forecast" info="Realwerte + 3-Monats-Projektion" className="trend-card">
      <div className="trend-card__legend">
        <span><span className="legend-dash"></span>Spectrum-Score</span>
        <span><span className="legend-dash legend-dash--forecast"></span>Forecast (3&nbsp;Mon.)</span>
      </div>
      <div className="trend-card__chart">
        <TrendAtom data={data} />
      </div>
      <div className="trend-card__forecast-note">
        <Icon d={I.target} />
        <span>Bei aktueller Hebelgeschwindigkeit erreicht das Spectrum <strong>73+</strong> in 3 Monaten.</span>
      </div>
    </Card>
  );
}

// ── Facette tile ──────────────────────────────────────────────────────────
function MemberTile({ g, idx, style = "bars" }) {
  const deltaCls = g.delta > 0 ? "tile__delta--up" : g.delta < 0 ? "tile__delta--down" : "tile__delta--flat";
  const arrow = g.delta > 0 ? "↑" : g.delta < 0 ? "↓" : "→";
  return (
    <div className="tile" style={{ borderTop: `3px solid ${g.color.fg}` }}>
      <div className="tile__head">
        <div>
          <div className="tile__id">Facette 0{idx + 1}</div>
          <div className="tile__name" style={{ color: g.color.fg }}>{g.code}</div>
          <div className="tile__purpose">{g.purpose}</div>
        </div>
        <div className="tile__score-wrap">
          <div>
            <div className="tile__score" style={{ color: g.color.fg }}>{g.score}</div>
            <div className={"tile__delta " + deltaCls}>{arrow} {Math.abs(g.delta)}</div>
          </div>
          <div className="tile__score-denom">/100</div>
        </div>
      </div>

      <div className="tile__band-row">
        <div className="tile__sparkline">
          <SparkAtom values={g.sparkline} color={g.color.fg} />
        </div>
        <div className="tile__updated">{g.lastUpdate}</div>
      </div>

      <div className="tile__dims-label">
        <span>Reifedimensionen D1–D6</span>
        <span>{Math.min(...g.dimensions.map(d => d.score))}–{Math.max(...g.dimensions.map(d => d.score))}</span>
      </div>

      {style === "bars" && (
        <div className="dim-rows dim-rows--inline">
          {g.dimensions.map(d => (
            <div className="dim-row" key={d.id}>
              <div className="dim-row__id">{d.id}</div>
              <div className="dim-row__label" title={d.label}>{d.label}</div>
              <div className="dim-row__bar">
                <div className="dim-row__bar-fill" style={{ width: d.score + "%", background: g.color.fg }} />
              </div>
              <div className="dim-row__score">{d.score}</div>
            </div>
          ))}
        </div>
      )}

      {style === "radar" && (
        <div className="tile__radar">
          <RadarAtom values={g.dimensions} color={g.color.fg} fill={g.color.fg} size={170} />
        </div>
      )}

      {style === "dots" && (
        <div className="tile__dots">
          {g.dimensions.map(d => {
            const filled = Math.round(d.score / 20); // 0..5
            return (
              <div className="dot-col" key={d.id}>
                <div className="dot-col__pearls">
                  {[0,1,2,3,4].map(i => (
                    <span key={i} style={{ background: i < filled ? g.color.fg : "#E8E8E4" }} />
                  ))}
                </div>
                <div className="dot-col__score" style={{ color: g.color.fg }}>{d.score}</div>
                <div className="dot-col__id">{d.id}</div>
                <div className="dot-col__lab">{d.label.split(" ")[0]}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="tile__footer">
        <span className="tile__owner">Owner: <strong>{g.owner}</strong></span>
        <a className="tile__link" href={"facette.html?id=" + g.id}>
          Facette öffnen <Icon d={I.external} />
        </a>
      </div>
    </div>
  );
}

// ── Heatmap ─────────────────────────────────────────────────────────────
function HeatmapPanel({ facetten, axes }) {
  return (
    <Card title="Querschnitts-Heatmap" info="Gemeinsamer Nenner über alle Facetten" sub="Facette × Querschnittsdimension" className="heatmap-card">
      <div className="heatmap">
        <div className="heatmap__corner"></div>
        {axes.map(a => (
          <div key={a} className="heatmap__col-head">{a}</div>
        ))}
        {facetten.map(g => (
          <React.Fragment key={g.id}>
            <div className="heatmap__row-head">
              <span className="swatch" style={{ background: g.color.fg }}></span>
              {g.code}
            </div>
            {axes.map(a => {
              const v = g.cross[a];
              const c = heatColorFn(v);
              return (
                <div key={a} className="heatmap__cell" style={{ background: c.bg, color: c.fg }} title={`${g.code} · ${a}: ${v}`}>
                  {v}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="heatmap__legend">
        <span>niedrig</span>
        <div className="heatmap__bar"></div>
        <span>hoch</span>
      </div>
    </Card>
  );
}

// ── Initiatives / Hebel ─────────────────────────────────────────────────
function InitiativesPanel({ items }) {
  return (
    <Card title="Top-Hebel im Spectrum" info="Größter Reifegrad-Effekt bei kleinstem Aufwand" sub="Priorisiert">
      <div className="initiatives">
        {items.map((it, i) => (
          <div key={it.id} className="initiative" style={{ borderLeft: `2px solid ${it.color.fg}` }}>
            <div className="initiative__num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div className="initiative__head">
                <div>
                  <div className="initiative__title">{it.title}</div>
                  <div className="initiative__facette">{it.facette}</div>
                </div>
                <span className={"chip " + (it.impact === "Hoch" ? "chip--high" : it.impact === "Mittel" ? "chip--med" : "chip--low")}>
                  {it.impact}
                </span>
              </div>
              <p className="initiative__detail">{it.detail}</p>
              <div className="initiative__foot">
                <span className="initiative__potential">Potenzial · {it.potential}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ── Footer trio ─────────────────────────────────────────────────────────
function SignalsPanel({ signals }) {
  return (
    <Card title="Frühindikatoren" info="Letzte 30 Tage" sub="vs. Vormonat">
      <div className="signals">
        {signals.map(s => {
          const cls = s.alert ? "signal__val--alert" : s.direction === "down" ? "signal__val--down" : "signal__val--up";
          const arrow = s.direction === "down" ? "↓" : "↑";
          return (
            <div className="signal" key={s.label}>
              <div className="signal__label">{s.label}</div>
              <div className="signal__row">
                <div className={"signal__val " + cls}>{arrow} {s.value}</div>
              </div>
              <div className="signal__note">{s.note}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function BenchmarkPanel({ facetten }) {
  // Show top 5 by score with a benchmark mark at 70
  const rows = [...facetten].sort((a, b) => b.score - a.score);
  return (
    <Card title="Benchmark" info="Spectrum vs. Best-in-class (70)" sub="Reifegrad pro Facette">
      <div className="benchmark-list">
        {rows.map(g => (
          <div className="benchmark-row" key={g.id}>
            <div className="benchmark-row__label">{g.code.replace("AIVC ", "")}</div>
            <div className="benchmark-row__bar">
              <div className="benchmark-row__fill" style={{ width: g.score + "%", background: g.color.fg }} />
              <div className="benchmark-row__bench" style={{ left: "70%" }} title="Benchmark 70"></div>
            </div>
            <div className="benchmark-row__val">{g.score}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ReviewPanel({ review }) {
  return (
    <div className="review">
      <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
        Nächstes Spectrum Review
      </div>
      <h3>{review.title}</h3>
      <div className="review__meta">
        <strong>{review.date}</strong> · {review.time}
      </div>
      <div className="review__meta">
        {review.participants} Teilnehmer · alle Facetten-Owner
      </div>
      <button className="review__cta">Vorbereiten</button>
    </div>
  );
}

Object.assign(window, {
  Sidebar, Header, Card, FamilyScorePanel, TrendPanel,
  MemberTile, HeatmapPanel, InitiativesPanel,
  SignalsPanel, BenchmarkPanel, ReviewPanel,
});
