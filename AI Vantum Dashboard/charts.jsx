/* Small SVG visualization atoms — donut, sparkline, line chart, radar, bars. */

const { useMemo } = React;

// ── Donut ───────────────────────────────────────────────────────────────
function Donut({ value, size = 168, stroke = 14, fg = "#3ED8C3", track = "#E8E8E4" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = c * (value / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={fg}
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${c - filled}`}
        strokeDashoffset={c / 4}
        strokeLinecap="butt"
        transform={`scale(-1, 1) translate(-${size}, 0)`}
      />
    </svg>
  );
}

// ── Sparkline ───────────────────────────────────────────────────────────
function Sparkline({ values, color = "#005E65", width = 100, height = 28 }) {
  if (!values || values.length === 0) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - 4 - ((v - min) / range) * (height - 8);
    return [x, y];
  });
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const areaD = `${d} L${width},${height} L0,${height} Z`;
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <path d={areaD} fill={color} opacity="0.08" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={last[0]} cy={last[1]} r="2.5" fill={color} />
    </svg>
  );
}

// ── Line chart with forecast ────────────────────────────────────────────
function TrendChart({ data, width = 520, height = 200 }) {
  const padL = 38, padR = 16, padT = 14, padB = 28;
  const w = width - padL - padR, h = height - padT - padB;
  const max = 100, min = 0;
  const xStep = w / (data.length - 1);
  const y = v => padT + h - ((v - min) / (max - min)) * h;

  const realPts = [];
  const fcPts = [];
  data.forEach((d, i) => {
    const point = [padL + i * xStep, y(d.score)];
    if (d.forecast) fcPts.push(point);
    else realPts.push(point);
  });
  // Bridge: last real → first forecast
  if (realPts.length && fcPts.length) {
    fcPts.unshift(realPts[realPts.length - 1]);
  }
  const path = pts => pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  const yTicks = [0, 25, 50, 75, 100];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} preserveAspectRatio="none" style={{ display: "block" }}>
      {/* Grid + Y ticks */}
      {yTicks.map(t => (
        <g key={t}>
          <line x1={padL} x2={width - padR} y1={y(t)} y2={y(t)} stroke="#E8E8E4" strokeWidth="1" />
          <text x={padL - 8} y={y(t) + 3} fontSize="9" fill="#ADAFB1" textAnchor="end">{t}</text>
        </g>
      ))}
      {/* X labels */}
      {data.map((d, i) => (
        <text
          key={i}
          x={padL + i * xStep}
          y={height - 8}
          fontSize="9"
          fill="#ADAFB1"
          textAnchor="middle"
        >
          {d.period}
        </text>
      ))}
      {/* Real line */}
      <path d={path(realPts)} fill="none" stroke="#1D4477" strokeWidth="2" />
      {realPts.map((p, i) => (
        <circle key={`r-${i}`} cx={p[0]} cy={p[1]} r="3" fill="#1D4477" />
      ))}
      {/* Forecast line */}
      <path d={path(fcPts)} fill="none" stroke="#00A19F" strokeWidth="2" strokeDasharray="4 4" />
      {fcPts.slice(1).map((p, i) => (
        <circle key={`f-${i}`} cx={p[0]} cy={p[1]} r="3" fill="#fff" stroke="#00A19F" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ── Mini radar (hexagonal) ──────────────────────────────────────────────
function MiniRadar({ values, color = "#005E65", fill = "#3ED8C3", size = 130 }) {
  const cx = size / 2, cy = size / 2;
  const radius = size / 2 - 14;
  const n = values.length;
  const point = (i, v) => {
    const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
    const r = radius * (v / 100);
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };
  const ringPoints = (frac) => {
    return Array.from({ length: n }).map((_, i) => {
      const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
      const r = radius * frac;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    }).map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
  };
  const dataPts = values.map((v, i) => point(i, v.score ?? v));
  const dPath = dataPts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ") + " Z";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map(f => (
        <path key={f} d={ringPoints(f)} fill="none" stroke="#E8E8E4" strokeWidth="1" />
      ))}
      {Array.from({ length: n }).map((_, i) => {
        const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E8E8E4" strokeWidth="1" />;
      })}
      <path d={dPath} fill={fill} fillOpacity="0.25" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {dataPts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill={color} />
      ))}
      {/* D labels */}
      {values.map((_, i) => {
        const angle = (-Math.PI / 2) + (i * 2 * Math.PI) / n;
        const lx = cx + (radius + 8) * Math.cos(angle);
        const ly = cy + (radius + 8) * Math.sin(angle);
        return (
          <text
            key={`l-${i}`}
            x={lx} y={ly + 3}
            fontSize="9"
            fontWeight="700"
            fill="#52555C"
            textAnchor="middle"
          >
            D{i + 1}
          </text>
        );
      })}
    </svg>
  );
}

// ── Heatmap cell color ──────────────────────────────────────────────────
function heatColor(v) {
  // 0 → off-white, 100 → teal-dark
  if (v >= 80) return { bg: "#005E65", fg: "#fff" };
  if (v >= 65) return { bg: "#3ED8C3", fg: "#1D4477" };
  if (v >= 50) return { bg: "#B9E8DF", fg: "#005E65" };
  if (v >= 35) return { bg: "#EFE9DD", fg: "#52555C" };
  return { bg: "#F4F1EC", fg: "#ADAFB1" };
}

Object.assign(window, { Donut, Sparkline, TrendChart, MiniRadar, heatColor });
