import { useReducer, useState } from "react";
import { songReducer } from "./state/songReducer";
import { sampleSong } from "./data/sampleSong";
import { kotsuzumiTeMaster } from "./data/teMaster";
import { KusariEditor } from "./components/KusariEditor";
import { TePalette } from "./components/TePalette";
import { TimelineGrid } from "./components/TimelineGrid";
import { ScoreView } from "./components/ScoreView";

function App() {
  const [song, dispatch] = useReducer(songReducer, sampleSong);
  const [selectedTeId, setSelectedTeId] = useState<string | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>能楽 手付アプリ</h1>
        <p className="app-subtitle">小鼓 × 謡 — {song.song_id}</p>
      </header>

      <main className="app-main">
        <section className="editor-pane">
          <KusariEditor song={song} dispatch={dispatch} />
          <TePalette
            teMaster={kotsuzumiTeMaster}
            selectedTeId={selectedTeId}
            onSelect={setSelectedTeId}
          />
          <TimelineGrid
            song={song}
            teMaster={kotsuzumiTeMaster}
            selectedTeId={selectedTeId}
            onPlaced={() => setSelectedTeId(null)}
            dispatch={dispatch}
          />
        </section>

        <section className="score-pane">
          <h2>手付譜(縦書き)</h2>
          <div className="score-scroll">
            <ScoreView song={song} teMaster={kotsuzumiTeMaster} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
