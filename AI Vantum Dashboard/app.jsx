/* AIVC Spectrum Dashboard — main app */

const { useState } = React;
const {
  AIVC_DATA, Sidebar, Header,
  FamilyScorePanel, TrendPanel, MemberTile,
  HeatmapPanel, InitiativesPanel,
  SignalsPanel, BenchmarkPanel, ReviewPanel,
  TweaksPanel, useTweaks,
  TweakSection, TweakRadio, TweakSelect, TweakToggle,
} = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tile_style": "bars",
  "sort": "default",
  "show_heatmap": true,
  "show_initiatives": true
}/*EDITMODE-END*/;

function App() {
  const [active, setActive] = useState("dashboard");
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const { Period, PrevPeriod, Facetten, CrossAxes, FamilyScore, FamilyDelta,
          FamilyTrend, TopHebel, Signals, NextReview } = AIVC_DATA;

  const sortedFacetten = (() => {
    const arr = [...Facetten];
    if (t.sort === "score-desc") arr.sort((a, b) => b.score - a.score);
    else if (t.sort === "score-asc") arr.sort((a, b) => a.score - b.score);
    else if (t.sort === "delta") arr.sort((a, b) => b.delta - a.delta);
    return arr;
  })();

  return (
    <div className="shell">
      <Sidebar active={active} onNav={setActive} />
      <main className="main">
        <Header period={Period} />

        <div className="grid grid--row-a">
          <FamilyScorePanel
            score={FamilyScore}
            delta={FamilyDelta}
            period={Period}
            prev={PrevPeriod}
            facetten={Facetten}
          />
          <TrendPanel data={FamilyTrend} />
        </div>

        <div className="grid grid--hero">
          {sortedFacetten.map((g, i) => (
            <MemberTile key={g.id} g={g} idx={Facetten.indexOf(g)} style={t.tile_style} />
          ))}
        </div>

        {(t.show_heatmap || t.show_initiatives) && (
          <div className="grid grid--row-c">
            {t.show_heatmap && <HeatmapPanel facetten={Facetten} axes={CrossAxes} />}
            {t.show_initiatives && <InitiativesPanel items={TopHebel} />}
          </div>
        )}

        <div className="grid grid--footer">
          <SignalsPanel signals={Signals} />
          <BenchmarkPanel facetten={Facetten} />
          <ReviewPanel review={NextReview} />
        </div>
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Kachel-Stil">
          <TweakRadio
            label="Visualisierung D1–D6"
            value={t.tile_style}
            onChange={v => setTweak("tile_style", v)}
            options={[
              { value: "bars",  label: "Balken" },
              { value: "radar", label: "Radar" },
              { value: "dots",  label: "Punkte" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Sortierung">
          <TweakSelect
            label="Facetten sortieren nach"
            value={t.sort}
            onChange={v => setTweak("sort", v)}
            options={[
              { value: "default",    label: "Spectrum (Standard)" },
              { value: "score-desc", label: "Reife absteigend" },
              { value: "score-asc",  label: "Reife aufsteigend" },
              { value: "delta",      label: "Trend (stärkste Bewegung)" },
            ]}
          />
        </TweakSection>

        <TweakSection label="Sektionen">
          <TweakToggle label="Querschnitts-Heatmap" value={t.show_heatmap} onChange={v => setTweak("show_heatmap", v)} />
          <TweakToggle label="Top-Hebel" value={t.show_initiatives} onChange={v => setTweak("show_initiatives", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
