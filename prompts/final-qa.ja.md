# Codex Prompt: Final QA

この採用サイトを公開前に最終確認してください。UI本体を大きく作り替えず、壊れている箇所だけ修正してください。

## Checks

1. 静的チェック
   - `node --check script.js`
   - 個人の絶対パス、固定ローカルURL、inline画像データ、添付画像名が混入していないか確認。

2. アセット確認
   - CSS、JS、主要画像が404になっていない。
   - `assets/generated/` の画像だけを使っている。
   - 画像内に実在企業名、実在ロゴ、読める既存広告がない。

3. Desktop確認
   - 1440 x 1100。
   - FV初回表示、スクロール分解、固定ヘッダー、PEOPLE、PROJECT、NUMBERS、ENTRYを確認。

4. Small desktop確認
   - 1024 x 900。
   - 見出し、カード、矢印、CTAが重ならない。

5. Mobile確認
   - 430 x 932。
   - FV画像が少なすぎず多すぎず、タイトルと重ならない。
   - PEOPLEの中央人物と左右見切れが自然。
   - ENTRYカードで画像、文章、矢印が重ならない。
   - 横スクロールが出ない。

6. Interaction確認
   - メニュー開閉。
   - PEOPLEの自動送り、前後ボタン、hover停止。
   - NUMBERSのスクロール展開。
   - ENTRYのPC hoverとモバイル表示アニメーション。

## Output

- 修正したファイル。
- 実行した確認コマンド。
- 残っているリスク。
- 公開URLでの確認結果。
