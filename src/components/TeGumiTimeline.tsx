// 手組1つ分の編集用タイムライン。
//
// 手付のタイムラインと同じ発想で、拍数・掛け声・手のレーンを横に並べる。
// 枠は半拍ごとで、手組の頭からの相対位置(rel_pos)がそのまま枠の番号になる。
//   rel_pos 0 = 0拍の表 / 1 = 0拍の裏 / 2 = 1拍の表 / …
//
// 枠の数は「長さ×2 + 1」。長さ×2 が最後の表拍(= 長さ拍の表)にあたり、
// 既存の手組はそこに手を置いているため、その1枠を含める。
import {
  TIMINGS,
  TIMING_LABEL,
  TIMING_SIGN,
  type HitEntry,
  type InternalPattern,
  type TeGlyph,
  type Timing,
} from "../types";

interface Props {
  pattern: InternalPattern;
  /** その楽器で使える手(プ/ポ/チ/タ など) */
  teNames: TeGlyph[];
  onChange: (patch: Partial<InternalPattern>) => void;
}

/** 枠の番号(= rel_pos)の列。0拍の表から、長さ拍の表まで */
function slotsOf(length: number): number[] {
  return Array.from({ length: length * 2 + 1 }, (_, i) => i);
}

export function TeGumiTimeline({ pattern, teNames, onChange }: Props) {
  const slots = slotsOf(pattern.length);
  const lastSlot = slots[slots.length - 1];

  const kakegoeAt = new Map(pattern.kakegoe.map((k) => [k.rel_pos, k]));
  const hitAt = new Map(pattern.hits.map((h) => [h.rel_pos, h]));

  /** 枠に収まらない位置のものは、ここでは編集できない */
  const outside =
    pattern.kakegoe.filter((k) => k.rel_pos < 0 || k.rel_pos > lastSlot).length +
    pattern.hits.filter((h) => h.rel_pos < 0 || h.rel_pos > lastSlot).length;

  function setKakegoe(relPos: number, text: string) {
    const rest = pattern.kakegoe.filter((k) => k.rel_pos !== relPos);
    const next = text === "" ? rest : [...rest, { rel_pos: relPos, text }];
    onChange({ kakegoe: next.sort((a, b) => a.rel_pos - b.rel_pos) });
  }

  function setHit(relPos: number, te: string) {
    const rest = pattern.hits.filter((h) => h.rel_pos !== relPos);
    // 既にあるものは打ち方(timing)を引き継ぐ
    const before = hitAt.get(relPos);
    const next: HitEntry[] =
      te === ""
        ? rest
        : [...rest, { rel_pos: relPos, timing: before?.timing ?? "on", te }];
    onChange({ hits: next.sort((a, b) => a.rel_pos - b.rel_pos) });
  }

  /** 手を少し前・少し後にずらして描くかどうか */
  function setTiming(relPos: number, timing: Timing) {
    onChange({
      hits: pattern.hits.map((h) =>
        h.rel_pos === relPos ? { ...h, timing } : h,
      ),
    });
  }

  return (
    <div className="te-timeline-wrap">
      <table className="te-timeline">
        <thead>
          <tr>
            <th className="row-label"></th>
            {/* 拍数。表の枠にだけ数字を出す */}
            {slots.map((slot) => (
              <th
                key={slot}
                className={"te-timeline-beat" + (slot % 2 === 0 ? " omote" : "")}
              >
                {slot % 2 === 0 ? slot / 2 : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="row-label">手</th>
            {slots.map((slot) => (
              <td key={slot} className="te-timeline-cell">
                <select
                  className="te-timeline-select"
                  value={hitAt.get(slot)?.te ?? ""}
                  onChange={(e) => setHit(slot, e.target.value)}
                >
                  <option value="">-</option>
                  {teNames.map((g) => (
                    <option key={g.te} value={g.te}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </td>
            ))}
          </tr>
          <tr>
            <th className="row-label">打ち方</th>
            {slots.map((slot) => {
              const hit = hitAt.get(slot);
              return (
                <td key={slot} className="te-timeline-cell">
                  {hit && (
                    <select
                      className="te-timeline-select"
                      value={hit.timing}
                      title={`打ち方: ${TIMING_LABEL[hit.timing]}`}
                      onChange={(e) =>
                        setTiming(slot, e.target.value as Timing)
                      }
                    >
                      {TIMINGS.map((t) => (
                        <option key={t} value={t} title={TIMING_LABEL[t]}>
                          {TIMING_SIGN[t]}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              );
            })}
          </tr>
          <tr>
            <th className="row-label">掛け声</th>
            {slots.map((slot) => (
              <td key={slot} className="te-timeline-cell">
                <input
                  className="te-timeline-input"
                  value={kakegoeAt.get(slot)?.text ?? ""}
                  onChange={(e) => setKakegoe(slot, e.target.value)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="te-timeline-note hint">
        打ち方は {TIMING_SIGN.slightly_early} が{" "}
        {TIMING_LABEL.slightly_early}、{TIMING_SIGN.on} が {TIMING_LABEL.on}、
        {TIMING_SIGN.slightly_late} が {TIMING_LABEL.slightly_late}
        (手を少し上下にずらして描きます)。
      </p>
      {outside > 0 && (
        <p className="te-timeline-note">
          この表に収まらない位置のものが{outside}件あります。長さを伸ばすと編集できます。
        </p>
      )}
    </div>
  );
}
