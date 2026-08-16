import { useEffect, useReducer, useState } from "react";
import { songReducer } from "./state/songReducer";
import { sampleSong } from "./data/sampleSong";
import { TeMasterEditor } from "./components/TeMasterEditor";
import { TimelineGrid } from "./components/TimelineGrid";
import { ScoreView } from "./components/ScoreView";
import { SplitPane } from "./components/SplitPane";
import { ScoreToolbar } from "./components/ScoreToolbar";
import { loadStoredSong, storeSong } from "./logic/songStorage";
import {
  defaultTeMaster,
  loadStoredTeMaster,
  storeTeMaster,
} from "./logic/masterStorage";

/** 保存が1文字ごとに走らないよう、少し待ってからまとめて書く */
const SAVE_DELAY_MS = 300;

type View = "score" | "master";

function App() {
  const [view, setView] = useState<View>("score");
  // 前回の続きから編集できるよう、保存してあれば復元する
  const [song, dispatch] = useReducer(
    songReducer,
    undefined,
    () => loadStoredSong() ?? sampleSong,
  );
  // 手組マスタも画面から編集できるので、曲データと同じく保存・復元する
  const [teMaster, setTeMaster] = useState(
    () => loadStoredTeMaster() ?? defaultTeMaster(),
  );

  useEffect(() => {
    const timer = setTimeout(() => storeSong(song), SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [song]);

  useEffect(() => {
    const timer = setTimeout(() => storeTeMaster(teMaster), SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [teMaster]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>能楽 手付アプリ</h1>
        <p className="app-subtitle">大鼓 × 小鼓 × 謡 — {song.song_id}</p>
        <nav className="app-tabs">
          <button
            type="button"
            className={"tab-button" + (view === "score" ? " selected" : "")}
            onClick={() => setView("score")}
          >
            手付を編集
          </button>
          <button
            type="button"
            className={"tab-button" + (view === "master" ? " selected" : "")}
            onClick={() => setView("master")}
          >
            手組マスタを編集
          </button>
        </nav>
      </header>

      {view === "master" ? (
        <TeMasterEditor teMaster={teMaster} onChange={setTeMaster} />
      ) : (
        <SplitPane
          left={
            <section className="editor-pane">
              <TimelineGrid song={song} teMaster={teMaster} dispatch={dispatch} />
            </section>
          }
          right={
            <section className="score-pane">
              <div className="score-pane-header">
                <h2>手付譜(縦書き)</h2>
                <ScoreToolbar song={song} dispatch={dispatch} />
              </div>
              <div className="score-scroll">
                <ScoreView song={song} teMaster={teMaster} />
              </div>
            </section>
          }
        />
      )}
    </div>
  );
}

export default App;
