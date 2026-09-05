# 手付(tetsuke)

能楽の囃子の楽譜「手付」を作成するアプリ。まずは小鼓1楽器に絞り、「手組トラック」+「謡トラック」だけの最小構成で、入力→データ→縦書き描画の流れを実装している。

設計の詳細は `docs/design.md` を参照。

## 構成

- React + TypeScript + Vite
- `src/types.ts` — データモデルの型定義
- `src/logic/position.ts` — クサリ列→グローバル拍位置への変換ロジック
- `src/data/` — 手組マスタ・サンプル曲データ
- `src/state/songReducer.ts` — 曲データ全体を管理するreducer
- `src/components/ScoreView.tsx` — SVGによる縦書き描画ビュー
- `src/components/TimelineGrid.tsx` / `TePalette.tsx` / `KusariEditor.tsx` — 編集UI

## 開発

```bash
npm install
npm run dev      # 開発サーバ起動
npm run build    # 型チェック + 本番ビルド
npm run lint     # oxlint
```
