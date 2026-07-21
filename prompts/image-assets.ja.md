# Codex Prompt: Image Assets

既存サイトの画像を、すべて新規生成画像で差し替えてください。外部サイト画像、添付画像の切り抜き、実在企業ロゴ、読める既存広告は使わないでください。

## Common Style

- 手描き広告イラスト風。
- 白背景に黒アウトライン。
- コーラル、シアン、アンバー、ミント、淡い紫をアクセントにする。
- 背景透過または白背景で、HTML/CSSに配置しやすい余白を残す。
- 文字は画像内に入れない。必要な文字はHTMLで実装する。

## Output Paths

### Hero Fragments

16点を生成し、次の名前で保存する。

- `assets/generated/hero/hero-01.png`
- `assets/generated/hero/hero-02.png`
- `assets/generated/hero/hero-03.png`
- `assets/generated/hero/hero-04.png`
- `assets/generated/hero/hero-05.png`
- `assets/generated/hero/hero-06.png`
- `assets/generated/hero/hero-07.png`
- `assets/generated/hero/hero-08.png`
- `assets/generated/hero/hero-09.png`
- `assets/generated/hero/hero-10.png`
- `assets/generated/hero/hero-11.png`
- `assets/generated/hero/hero-12.png`
- `assets/generated/hero/hero-13.png`
- `assets/generated/hero/hero-14.png`
- `assets/generated/hero/hero-15.png`
- `assets/generated/hero/hero-16.png`

題材:

- 広告企画会議
- Web広告画面
- 地域イベント
- 取材
- 動画撮影
- 屋外広告
- 新聞レイアウト
- 商店街キャンペーン
- ラジオ収録
- SNS分析
- 電車広告
- プレゼン
- 子育てイベント
- 観光PR
- 制作デスク
- まち歩き

### Process

6点を生成する。

- `assets/generated/process/process-01.png`: 気づく
- `assets/generated/process/process-02.png`: 考える
- `assets/generated/process/process-03.png`: つくる
- `assets/generated/process/process-04.png`: 伝える
- `assets/generated/process/process-05.png`: 広がる
- `assets/generated/process/process-06.png`: 変わる

### People

5点を生成する。

- `assets/generated/people/person-01.png`: 企画職の人物
- `assets/generated/people/person-02.png`: 編集職の人物
- `assets/generated/people/person-03.png`: コンテンツ職の人物
- `assets/generated/people/person-04.png`: イベント職の人物
- `assets/generated/people/person-05.png`: デザイン職の人物

顔写真風ではなく、採用サイトに合う架空社員イラストにする。

### Projects

4点を生成する。

- `assets/generated/projects/project-01.png`: 地域活性キャンペーン
- `assets/generated/projects/project-02.png`: 交通マナー啓発
- `assets/generated/projects/project-03.png`: 採用サイト制作
- `assets/generated/projects/project-04.png`: 地域イベント設計

### Numbers

5点を生成する。表示で使うのは主に3点だが、差し替え互換のため5点残す。

- `assets/generated/numbers/number-01.png`: 年間プロジェクト
- `assets/generated/numbers/number-02.png`: 取引社数
- `assets/generated/numbers/number-03.png`: 平均年齢
- `assets/generated/numbers/number-04.png`: 女性比率
- `assets/generated/numbers/number-05.png`: 年間休日

### Entry

2点を生成する。

- `assets/generated/entry/new-graduate-runner.png`: 新卒向けの走る人物
- `assets/generated/entry/career-runner.png`: 中途向けの走る人物

## QA

- すべての画像が指定パスに存在する。
- HTMLで参照される画像が404にならない。
- 画像内に読める企業名、既存ブランド、実在広告、UIスクリーンショットがない。
- FVで画像が重なりすぎない。
