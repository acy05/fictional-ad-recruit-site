# QA Checklist

公開前と公開後に同じ項目を確認します。

## Static Checks

```bash
node --check script.js
```

続けて、個人の絶対パス、固定ローカルURL、inline画像データ、添付クリップボード名が混入していないか検索します。一致なしが正常です。

## Asset Checks

- `index.html` が `./styles.css` と `./script.js` を参照している。
- 主要画像が `assets/generated/` 配下にある。
- 画像差し替え後もファイル名が変わっていない。
- 外部サイト画像やスクリーンショット由来の素材が残っていない。

## Viewports

次の幅で確認します。

- desktop: 1440 x 1100
- small desktop: 1024 x 900
- mobile: 430 x 932
- narrow mobile: 390 x 844

## Interaction Checks

- FV初回表示で、断片が中央起点から展開し、タイトルが遅れて表示される。
- FV通過後にヘッダーが表示される。
- メニューが開閉する。
- PEOPLEが自動送りし、前後ボタンでも途切れず循環する。
- PEOPLEのhover中は自動送りが止まり、離れると再開する。
- PROJECTカードのhoverが自然に動く。
- NUMBERSがスクロールに合わせて重なりカードから展開する。
- ENTRYはPCでhover演出、モバイルで表示アニメーションが働く。
- footerまで横スクロールが出ない。

## Browser Console

- console errorなし。
- console warningは必要なものだけに限定する。
- failed requestなし。

## Final Visual Review

- 文字がボタンやカードからはみ出していない。
- 固定ヘッダーが見出しに被っていない。
- モバイルでENTRY画像とテキストが重なっていない。
- 生成画像の中に実在ロゴや読める既存広告が入っていない。
