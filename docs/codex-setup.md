# Codex Setup

このテンプレートを別アカウントで使う前に、Codex と周辺ツールの状態を確認します。

## Required

- Codex Desktop または Codex CLI
- GitHub CLI `gh`
- Git
- 静的サイトを確認できるブラウザ
- Stitch を使えるMCPまたは同等のデザイン生成環境
- 画像生成ツール
- ブラウザ操作またはPlaywrightで表示確認できる環境

## Check GitHub CLI

```bash
gh --version
gh auth status
```

認証されていない場合は、次を実行してGitHubアカウントに接続します。

```bash
gh auth login
```

## Check Codex Tools

Codexで新しいリポジトリを開き、次の能力が使える状態にします。

- ファイル編集
- シェル実行
- Stitchまたはデザイン生成MCP
- 画像生成
- ブラウザ確認
- GitHub操作

MCPやプラグイン名は環境によって異なります。Codex内で利用可能なツール一覧を確認し、Stitch、画像生成、GitHub、ブラウザ確認に相当する機能を有効化してください。

## Local Preview

リポジトリルートで静的サーバーを起動します。

```bash
python3 -m http.server 4174
```

ターミナルに表示されたプレビューURLをブラウザで開きます。

## Recommended Codex Prompt Order

1. `prompts/site-build.ja.md`
2. `prompts/image-assets.ja.md`
3. `prompts/final-qa.ja.md`

最初から完全一致を狙うより、レイアウト、画像差し替え、アニメーション、QAの順に分けると安定します。
