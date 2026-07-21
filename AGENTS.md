# Codex Agent Instructions

このリポジトリは、架空採用サイトを Codex と MCP で再生成するためのテンプレートです。作業時は以下を守ってください。

## Goal

- 架空会社の採用サイトとして成立する完成度まで実装する。
- レイアウト、アニメーション、画像生成、QA、GitHub Pages公開まで一貫して扱う。
- サンプルの `MADO CREATIVE NETWORK` は差し替え可能な初期ブランドとして扱う。

## Design And Build Flow

- Stitch は最初のレイアウト、余白、セクション順、デザインシステム作成に使う。
- 最終実装は静的サイトにする。基本構成は `index.html`、`styles.css`、`script.js`、`assets/generated/`。
- UI本体はコードネイティブで作る。ロゴ、見出し、ナビ、ボタン、本文、数値は画像化しない。
- 外部サイトの画像、SVG、動画、CSS、JSをコピーしない。参考にするのは構造、タイミング、密度だけにする。
- 画像はすべて新規生成または既存サンプルの差し替えで用意する。

## Asset Policy

- 画像差し替え時は `prompts/image-assets.ja.md` を使う。
- 既存HTMLの参照を壊さないため、同じファイル名で `assets/generated/` に保存する。
- 生成画像には実在企業名、実在人物、第三者ロゴ、読める新聞紙面、既存広告を入れない。
- 添付画像や外部サイト画像の切り抜き、スクリーンショット、トレース画像を最終成果物に残さない。

## Motion Requirements

- FVは、複数のイラスト断片が中央起点でポップし、展開後にタイトルが描画される流れにする。
- スクロール時のFV分解、マウスパララックス、PEOPLEスライダー、NUMBERS stickyカード、ENTRYモバイル演出を崩さない。
- `prefers-reduced-motion: reduce` では主要アニメーションを抑え、最終配置を即表示する。
- モバイルではPC版の演出をそのまま縮小せず、重なりと横スクロールを必ず確認する。

## QA Before Finish

- `node --check script.js`
- 主要画像、CSS、JSの404確認。
- desktop、small desktop、mobileでスクリーンショット確認。
- FV、メニュー開閉、PEOPLE自動送りと前後ボタン、NUMBERSスクロール、ENTRY hoverまたはmobile表示を操作確認。
- file URL、個人の絶対パス、固定ローカルURL、inline画像データが成果物に混入していないことを確認。

## GitHub Pages

- 公開元は `main` branch root `/`。
- `.nojekyll` を維持する。
- 公開後は Pages API と実URLのHTTP応答で確認する。
