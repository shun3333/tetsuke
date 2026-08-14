import { useEffect, useReducer, useState } from "react";
import { songReducer } from "./state/songReducer";
import { sampleSong } from "./data/sampleSong";
import { TE_MASTER } from "./data/teMaster";
import { KusariEditor } from "./components/KusariEditor";
import { TePalette } from "./components/TePalette";
import { TimelineGrid, type SelectedTe } from "./components/TimelineGrid";
import { ScoreView } from "./components/ScoreView";
import { SplitPane } from "./components/SplitPane";
import { ScoreToolbar } from "./components/ScoreToolbar";
import { loadStoredSong, storeSong } from "./logic/songStorage";

/** 保存が1文字ごとに走らないよう、少し待ってからまとめて書く */
const SAVE_DELAY_MS = 300;

function App() {
  // 前回の続きから編集できるよう、保存してあれば復元する
  const [song, dispatch] = useReducer(
    songReducer,
    undefined,
    () => loadStoredSong() ?? sampleSong,
  );
  const [selectedTe, setSelectedTe] = useState<SelectedTe | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => storeSong(song), SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [song]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>能楽 手付アプリ</h1>
        <p className="app-subtitle">大鼓 × 小鼓 × 謡 — {song.song_id}</p>
      </header>

      <SplitPane
        left={
          <section className="editor-pane">
            <KusariEditor song={song} teMaster={TE_MASTER} dispatch={dispatch} />
            <TePalette
              teMaster={TE_MASTER}
              selectedTe={selectedTe}
              onSelect={setSelectedTe}
            />
            <TimelineGrid
              song={song}
              teMaster={TE_MASTER}
              selectedTe={selectedTe}
              onPlaced={() => setSelectedTe(null)}
              dispatch={dispatch}
            />
          </section>
        }
        right={
          <section className="score-pane">
            <div className="score-pane-header">
              <h2>手付譜(縦書き)</h2>
              <ScoreToolbar song={song} dispatch={dispatch} />
            </div>
            <div className="score-scroll">
              <ScoreView song={song} teMaster={TE_MASTER} />
            </div>
          </section>
        }
      />
    </div>
  );
}

export default App;
