# Build Workflow

このドキュメントは、今回の制作手順を別ブランド向けに再実行するための流れです。

## 1. Brand Setup

架空または自社用のブランド情報を決めます。

- 会社名
- 採用サイトの主コピー
- セクション名
- 人物5名の職種と名前
- 案件4件
- 数字で見せる指標3から5件
- ENTRYの対象区分

実在企業を扱う場合でも、外部サイト由来の画像やコードは使わず、許諾済み素材または新規生成素材だけを使ってください。

## 2. Stitch Layout

Stitchでは、完成コードではなく設計の土台を作ります。

- 白背景
- 黒アウトライン
- コーラル、シアン、アンバー、ミントを中心にした配色
- 大きい英字見出し
- 手描き風の装飾密度
- FV、マニフェスト、PEOPLE、PROJECT、NUMBERS、ENTRY、footerの順番

Stitchが生成した画像や外部サイト画像は最終成果物に残しません。

## 3. Static Implementation

HTML/CSS/JSだけで実装します。

- `index.html` に文言とセクション構造を置く。
- `styles.css` にレイアウト、レスポンシブ、アニメーションを置く。
- `script.js` にFV、スライダー、スクロール演出、メニュー開閉を置く。
- アセットは `assets/generated/` に保存する。

## 4. Image Replacement

`prompts/image-assets.ja.md` を使って画像を生成し、既存ファイル名で差し替えます。

- `assets/generated/hero/hero-01.png` から `hero-16.png`
- `assets/generated/process/process-01.png` から `process-06.png`
- `assets/generated/people/person-01.png` から `person-05.png`
- `assets/generated/projects/project-01.png` から `project-04.png`
- `assets/generated/numbers/number-01.png` から `number-05.png`
- `assets/generated/entry/new-graduate-runner.png`
- `assets/generated/entry/career-runner.png`

## 5. Animation Pass

静止画の一致よりも、動きの順序と気持ちよさを優先します。

- FVの初回展開。
- FV通過後の固定ヘッダー表示。
- PEOPLEの中央基準スライダー。
- NUMBERSのstickyカード展開。
- ENTRYのPC hoverとモバイル表示。

## 6. QA And Publish

`docs/qa-checklist.md` で確認してから、`docs/deploy-github-pages.md` で公開します。
