# 能楽 手付アプリ 設計ドキュメント

## 概要
能楽の囃子の楽譜「手付」を作成するアプリ。まずは**小鼓1楽器**に絞り、
「手組トラック」+「謡トラック」だけの最小構成で、入力→データ→縦書き描画
の流れを一通り作ることを目標とする。笛の唱歌トラックは後回し。

## 用語
- **手付**: 能楽の囃子の楽譜。地謡の詞章・掛け声・手組記号・拍番号が
  縦書きで並行して配置される。
- **クサリ**: 拍子の単位。本地(8拍)・オクリ(2拍)・トリ(4拍)・片地(6拍)
  の4種類があり、typeが決まれば拍数は一意に決まる。
- **手組**: 小鼓・大鼓・太鼓など楽器ごとに異なる、掛け声と打つ手の
  定型パターン(例: 三地、ツヅケ、打切、打下など)。
- **唱歌**: 笛が吹く内容を文字で表現したもの(今回のスコープ外、将来対応)。

## データモデル

### 1. 拍子タイプの定数(コード側の固定値、曲データには持たない)
```json
{ "honji": 8, "okuri": 2, "tori": 4, "kataji": 6 }
```

### 2. 手組マスタ(te_master) — 楽器ごとの手組辞書
- 楽器(instrument)ごとに名前空間を分ける(同名の手組でも楽器が違えば別定義)。
- 掛け声(kakegoe)と手(hits)は独立した配列(セットとは限らないため)。
- `hits`の`timing`は質的タグ(`on` / `slightly_early` / `slightly_late` など)
  で裏拍・拍外の微妙なズレを表現する(float座標ではなくタグ方式を採用)。
- `length`(拍数)は手組ごとに固定。クサリをまたいでも内容・長さは変わらない
  (例: 打下は本地でもトリでも内容・長さ6拍は同じ。開始位置が違うだけ)。

```json
{
  "te_id": "uchioroshi",
  "instrument": "kotsuzumi",
  "internal_pattern": {
    "length": 6,
    "kakegoe": [
      { "rel_beat": 0, "text": "ヤ" },
      { "rel_beat": 1, "text": "ハ" }
    ],
    "hits": [
      { "rel_beat": 0, "timing": "on" },
      { "rel_beat": 3, "timing": "slightly_late" }
    ]
  }
}
```

### 3. 曲データ(手付本体)
```json
{
  "song_id": "keisei_tetsuke",
  "kusari_sequence": [
    { "index": 0, "type": "honji" },
    { "index": 1, "type": "tori" },
    { "index": 2, "type": "honji" }
  ],
  "tracks": {
    "kotsuzumi": {
      "instrument": "kotsuzumi",
      "te_instances": [
        { "te_id": "mitsuji", "start_ref": { "kusari_index": 0, "beat": 1 } },
        { "te_id": "uchioroshi", "start_ref": { "kusari_index": 1, "beat": 2 } }
      ]
    },
    "utai": {
      "track_type": "utai",
      "chars": [
        { "beat_ref": { "kusari_index": 0, "beat": 1 }, "sub": "omote", "content": { "type": "text", "value": "か" } },
        { "beat_ref": { "kusari_index": 0, "beat": 1 }, "sub": "ura",   "content": { "type": "text", "value": "の" } },
        { "beat_ref": { "kusari_index": 0, "beat": 3 }, "sub": "ura",   "content": null }
      ]
    }
  }
}
```

**kusari_sequence の注意点**
- `beat_count`は持たない(typeから導出するため冗長)。
- `global_start`も保存しない(typeマスタから読み込み時に都度計算する導出値。
  途中のクサリのtypeを編集したときの不整合を防ぐため)。
  ```
  global_start[0] = 0
  global_start[i] = global_start[i-1] + beatCountOf(type[i-1])
  ```

**te_instances の注意点**
- `end_ref`は持たない。`start_ref`のグローバル位置 + `internal_pattern.length`
  から自動算出できるため(クサリをまたいでも正しく求まる)。

**utai.chars の注意点**
- 謡は表(omote)/裏(ura)の2値グリッドに乗る(手組のような自由なズレはない)。
- 全ての枠に文字が当たるとは限らない → `content: null`で空白を表現。
- 拗音(ゃゅょ等)は前の文字と合わせて1枠1文字列として格納する
  (例: `"いふ"`のように1枠に複数文字入れてよい)。特別な構造は不要。
- 謡はフレーズの再利用(マスタ化)はしない想定。曲ごとにベタで持つ。

### 4. (将来) 唱歌トラック — 今回はスコープ外、参考として記載
- 表裏に当てはまらない自由な位置になることが多く、1拍に複数文字入ることもある。
- 一般的でない合字(例:「イ」+「ヤ」の合字)が使われることがある →
  `content: { "type": "glyph", "glyph_id": "..." }` でグリフマスタを参照する方式。
- 手組と同様、まとまった単位(フレーズ)が複数回出てくるためマスタ化して再利用したい
  → `shoga_master`(フレーズマスタ)+ 曲データ側は `phrase_ref` で参照、
  マスタ化しづらい一回性のものは `inline` で直接記述、の併用方式。

## フロント実装方針

### 全体構成
- 編集UI(グリッド/フォーム)と描画ビュー(縦書きレイアウト)を分離する。
- 曲データ(JSON)を単一の真実の情報源(single source of truth)とし、
  両者はそれを読み書きするだけにする。

### 状態管理
- 曲データ全体(kusari_sequence + tracks)を1つのstateとして持つ。
- React前提なら`useReducer`。操作をactionとして明確に定義するとundo/redoしやすい。

### 編集UI
- 縦書き直接入力ではなく、横方向のタイムライン表(グリッド)にする。
  - 列 = グローバル拍位置(クサリをまたいで連続)
  - 行 = トラック(地謡/小鼓手組など)
- 手組はマスタから選んでドラッグ&ドロップ or タップ挿入(te_idの入力ミス防止)。
- 謡のinline文字は該当セル(拍+表裏)を直接タップしてテキスト入力。

### 描画ビュー
- 座標計算レイヤー(kusari_sequenceから各拍のグローバル座標を計算)を独立させる。
- SVGで座標を直接計算して描く方式を推奨(精密な位置合わせのため)。
- 1拍=固定の高さ(縦書きなので上→下)を割り当て、sub(表裏)でオフセット計算。

### PDF/印刷出力
- 描画ビュー(SVG)をそのままPDF化する(印刷機能 or headless Chrome)。

## 実装順序(推奨)
1. データモデルをTypeScriptのinterfaceとして型定義する
2. クサリ列→グローバル位置への変換ロジックを実装する(全体の土台)
3. 描画ビュー(SVG)を作り、手入力のJSONで表示確認する
4. 編集UI(グリッド+パレット)を作り、描画ビューとつなぐ

## 今回のスコープ
- 対象楽器: 小鼓のみ
- トラック: 手組(kotsuzumi) + 謡(utai)
- 唱歌(笛)は対象外(将来拡張として設計だけ考慮済み)
