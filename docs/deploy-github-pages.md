# Deploy To GitHub Pages

このテンプレートはビルド不要の静的サイトです。GitHub Pagesでは `main` branch の root `/` を公開します。

## Create A Repository From The Template

GitHub UIの場合:

1. テンプレートリポジトリで `Use this template` を押す。
2. 新しい `Owner` と `Repository name` を選ぶ。
3. `Public` を選ぶ。
4. リポジトリを作成する。

GitHub CLIの場合:

```bash
gh repo create OWNER/REPOSITORY --template acy05/fictional-ad-recruit-site --public --clone
```

## Enable Pages

GitHub UIの場合:

1. `Settings` を開く。
2. `Pages` を開く。
3. `Build and deployment` で `Deploy from a branch` を選ぶ。
4. Branchを `main`、folderを `/` にする。
5. 保存する。

GitHub CLIの場合:

```bash
gh api -X POST repos/OWNER/REPOSITORY/pages -f source[branch]=main -f source[path]=/
```

すでにPagesが有効な場合は、次で状態を確認します。

```bash
gh api repos/OWNER/REPOSITORY/pages
```

## Verify

公開URLは通常、次の形式です。

```text
https://OWNER.github.io/REPOSITORY/
```

主要ファイルが返ることを確認します。

```bash
curl -L -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://OWNER.github.io/REPOSITORY/
curl -L -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://OWNER.github.io/REPOSITORY/styles.css
curl -L -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://OWNER.github.io/REPOSITORY/script.js
curl -L -s -o /dev/null -w '%{http_code} %{url_effective}\n' https://OWNER.github.io/REPOSITORY/assets/generated/hero/hero-01.png
```

## Troubleshooting

- 404になる場合は、Pages sourceが `main` と `/` になっているか確認する。
- 画像だけ404になる場合は、ファイル名の大文字小文字と保存場所を確認する。
- CSSやJSが読めない場合は、HTML内の参照が `./styles.css`、`./script.js` のような相対パスになっているか確認する。
- 公開直後は反映に数分かかることがあるため、Pagesのbuild状態を確認してから再読込する。
