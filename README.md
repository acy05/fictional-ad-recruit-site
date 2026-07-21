# MADO Creative Recruit Site Template

架空の広告会社 `MADO CREATIVE NETWORK` の採用サイトを、Codex と MCP を使って再生成・公開するための静的サイトテンプレートです。

このリポジトリは完成サンプルを含みます。別アカウントでは GitHub の `Use this template` から複製し、社名、コピー、画像、配色を差し替えて同じ制作フローを再利用できます。

## What This Includes

- 静的サイト: `index.html`、`styles.css`、`script.js`
- サンプル画像: `assets/generated/`
- Codex向け制作ルール: `AGENTS.md`
- セットアップと公開手順: `docs/`
- AIへ渡す再生成プロンプト: `prompts/`

## Start From This Template

1. GitHub の `Use this template` で新しいリポジトリを作成する。
2. Codex で新しいリポジトリを開く。
3. `docs/codex-setup.md` に沿って Codex、Stitch、画像生成、GitHub CLI の前提を確認する。
4. `prompts/site-build.ja.md` を Codex に渡し、対象ブランド向けに再生成する。
5. 画像を差し替える場合は `prompts/image-assets.ja.md` を使い、同じファイル名で `assets/generated/` に保存する。
6. `docs/qa-checklist.md` に沿って表示と操作を確認する。
7. `docs/deploy-github-pages.md` に沿って GitHub Pages で公開する。

## Local Preview

このサイトはビルド不要の静的サイトです。任意の静的サーバーでリポジトリルートを配信してください。

```bash
python3 -m http.server 4174
```

ブラウザでは、ターミナルに表示されたプレビューURLを開いて確認します。

## Customize

- 社名、コピー、ナビ文言: `index.html`
- 配色、余白、レスポンシブ、アニメーション: `styles.css`
- FV、PEOPLE、NUMBERS、ENTRY の動き: `script.js`
- 画像: `assets/generated/`

画像ファイル名は既存の命名規則を維持してください。HTML側の参照を変えずに差し替えられます。

## Safety Rules

- 外部サイトの画像、SVG、動画、コードを流用しない。
- 架空会社、架空人物、架空案件として作る。
- ロゴ、ナビ、本文、数値は画像化せず、HTML/CSSのテキストとして実装する。
- 公開前に、404、console error、横スクロール、モバイル表示を確認する。

## Deployment

GitHub Pages では `main` branch の root `/` を公開元にします。`.nojekyll` は削除しないでください。

公開後のURLは通常、次の形式になります。

```text
https://OWNER.github.io/REPOSITORY/
```

詳しい手順は `docs/deploy-github-pages.md` を参照してください。
