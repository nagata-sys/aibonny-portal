/* =====================================================================
 * AIBONNY スクールポータル ｜ コンテンツデータ
 * ---------------------------------------------------------------------
 * ★ ここを編集すれば、サイトの中身（動画URL・タイトル・課題・予定）が
 *   そのまま更新されます。ロジック(app.js)は触らなくてOKです。
 *
 *  動画URL …… 各 video の url に YouTube / Vimeo の「埋め込みURL」を入れる
 *              例: "https://www.youtube.com/embed/xxxxxxxxxxx"
 *              空文字 "" の場合は「準備中」と表示されます。
 *  リンク   …… テンプレ等の link に Notion / Google Drive のURLを入れる
 * ===================================================================== */

const AIBONNY = {
  /* ---------------- 受講生 / 期の基本情報 ---------------- */
  student: {
    name: "受講生",          // 受講生のお名前（ホームに表示）
    cohort: "1期（ファウンディングメンバー）",
    startDate: "2026-06-19", // 開講日（この日からW1。直近の予定の日付計算に使用）
    plan: "個別伴走プラン（3ヶ月・全12回）",
  },

  /* ---------------- 公式リンク（差し替え推奨） ---------------- */
  links: {
    line: "",                 // 公式LINE / グループのURL
    dashboard: "",            // 進捗ダッシュボード(スプレッドシート)のURL
    zoom: "",                 // 1on1 / セミナーの常設ZoomのURL
    notion: "https://app.notion.com/p/AIBONNY-37f75b94082c81a99be9f807500078cf",
  },

  /* ---------------- 3つのゲート（最終収束先） ---------------- */
  gates: [
    { id: "g1", label: "ゲート①", title: "本番稼働する自分専用AIシステムを1つ完成", target: "〜Week8", moduleId: 4 },
    { id: "g2", label: "ゲート②", title: "ROIで語れる提案書を1本", target: "〜Week10", moduleId: 5 },
    { id: "g3", label: "ゲート③", title: "有償案件を受注 or 月10万円相当の効果", target: "〜Week12", moduleId: 6 },
  ],

  /* ---------------- 動画モジュール（8） ---------------- */
  /* type: concept=概念 / hands=操作 / qa=つまずきQ&A / goal=ゴール宣言   */
  modules: [
    {
      id: 0, badge: "Module 0", title: "着地点設計（北極星）",
      goal: "誰の課題をROIいくらで解く案件で受注するかを1枚で言語化する",
      deliverable: "マイゴール×ターゲット案件シート＋13ステップ進捗マップ",
      gate: null,
      videos: [
        { id: "0-1", title: "オリエン: 3ヶ月で“稼げる状態”までの地図", min: 8, type: "concept", url: "" },
        { id: "0-2", title: "北極星の決め方 — 誰の/どんな課題を/ROIいくらで", min: 10, type: "concept", url: "" },
        { id: "0-3", title: "ターゲット案件シートの書き方（実演）", min: 9, type: "hands", url: "" },
        { id: "0-4", title: "13ステップ進捗マップの使い方", min: 7, type: "hands", url: "" },
        { id: "0-Q", title: "つまずきQ&A: 案件が思いつかないとき", min: 6, type: "qa", url: "" },
        { id: "0-G", title: "1分ゴール宣言: Module0完了の状態", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 1, badge: "Module 1", title: "AI地力（最小限）",
      goal: "業務を棚卸しし、自動化候補をROI順に特定する",
      deliverable: "自動化候補リスト（ROI上位3件）＋プロンプト集",
      gate: null,
      videos: [
        { id: "1-1", title: "AI時代の生き方と“AIの地力”", min: 11, type: "concept", url: "" },
        { id: "1-2", title: "業務棚卸しの実演 — 自動化候補をROI順に", min: 10, type: "hands", url: "" },
        { id: "1-3", title: "そのまま使えるプロンプト集の使い方", min: 8, type: "hands", url: "" },
        { id: "1-4", title: "ROI上位3件の選び方", min: 7, type: "hands", url: "" },
        { id: "1-Q", title: "つまずきQ&A: 棚卸しが進まない", min: 6, type: "qa", url: "" },
        { id: "1-G", title: "1分ゴール宣言: Module1完了の状態", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 2, badge: "Module 2", title: "カスタムAI（最初の動く成果物）",
      goal: "GPTs/Gemで業務に効くAIを1つ完成・デモ化する",
      deliverable: "マイカスタムAI＋1分デモ台本",
      gate: null,
      videos: [
        { id: "2-1", title: "GPTs / Gem の基礎", min: 9, type: "concept", url: "" },
        { id: "2-2", title: "業務に効くカスタムAIを作る（実演）", min: 12, type: "hands", url: "" },
        { id: "2-3", title: "1分デモ台本の作り方", min: 8, type: "hands", url: "" },
        { id: "2-4", title: "デモを“見せられる”形にする", min: 7, type: "hands", url: "" },
        { id: "2-Q", title: "つまずきQ&A: 思った精度が出ない", min: 6, type: "qa", url: "" },
        { id: "2-G", title: "1分ゴール宣言: Module2完了の状態", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 3, badge: "Module 3", title: "n8n土台（真似れば動く）",
      goal: "環境構築から最小ワークフロー1本を稼働させる",
      deliverable: "構築済み環境＋最小ワークフロー",
      gate: null,
      videos: [
        { id: "3-1", title: "n8nとは / 環境構築", min: 10, type: "hands", url: "" },
        { id: "3-2", title: "最小ワークフロー1本を真似て動かす", min: 12, type: "hands", url: "" },
        { id: "3-3", title: "ノードの基本とデバッグ", min: 9, type: "hands", url: "" },
        { id: "3-4", title: "認証・APIキーの安全な扱い", min: 8, type: "hands", url: "" },
        { id: "3-Q", title: "つまずきQ&A: 環境が壊れた / 動かない", min: 7, type: "qa", url: "" },
        { id: "3-G", title: "1分ゴール宣言: Module3完了の状態", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 4, badge: "Module 4", title: "【ゲート①】本番システム完成",
      goal: "自分専用の自動化を本番稼働させる（Claude MCP連携）",
      deliverable: "本番稼働ワークフロー＋要件定義書＋運用手順書（＝納品ドキュメント）",
      gate: "g1",
      videos: [
        { id: "4-1", title: "本番要件定義の作り方", min: 10, type: "concept", url: "" },
        { id: "4-2", title: "Claude MCP連携の実装", min: 12, type: "hands", url: "" },
        { id: "4-3", title: "本番稼働ワークフローを構築する", min: 12, type: "hands", url: "" },
        { id: "4-4", title: "運用手順書＝そのまま納品ドキュメント", min: 9, type: "hands", url: "" },
        { id: "4-5", title: "エラー処理と監視の入れ方", min: 8, type: "hands", url: "" },
        { id: "4-Q", title: "つまずきQ&A: 本番で落ちる", min: 7, type: "qa", url: "" },
        { id: "4-G", title: "ゲート①宣言: 本番システム完成", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 5, badge: "Module 5", title: "【ゲート②】ROI提案に変換",
      goal: "成果物を「誰の課題×ROIいくら」の提案書にする",
      deliverable: "提案書1本＋ROI試算＋実績デモ資料",
      gate: "g2",
      videos: [
        { id: "5-1", title: "提案書の構造 — 誰の課題×ROIいくら", min: 10, type: "concept", url: "" },
        { id: "5-2", title: "ROI試算の作り方", min: 9, type: "hands", url: "" },
        { id: "5-3", title: "実績デモ資料に仕立てる", min: 8, type: "hands", url: "" },
        { id: "5-4", title: "提案書テンプレートの埋め方", min: 7, type: "hands", url: "" },
        { id: "5-Q", title: "つまずきQ&A: 価格が決められない", min: 6, type: "qa", url: "" },
        { id: "5-G", title: "ゲート②宣言: 提案書1本完成", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 6, badge: "Module 6", title: "【ゲート③】受注を取りに行く",
      goal: "営業アクションを実行し、有償案件 or 月10万円相当へ",
      deliverable: "営業記録＋受注 / 効果の証明",
      gate: "g3",
      videos: [
        { id: "6-1", title: "営業アクション設計 — 無料提供→有償", min: 10, type: "concept", url: "" },
        { id: "6-2", title: "アプローチ先リストの作り方", min: 8, type: "hands", url: "" },
        { id: "6-3", title: "ROI営業ロールプレイの型", min: 11, type: "hands", url: "" },
        { id: "6-4", title: "クロージングと見積もり", min: 9, type: "hands", url: "" },
        { id: "6-Q", title: "つまずきQ&A: 手が止まった / 断られた", min: 7, type: "qa", url: "" },
        { id: "6-G", title: "ゲート③宣言: 受注 or 月10万円相当", min: 1, type: "goal", url: "" },
      ],
    },
    {
      id: 7, badge: "Module 7", title: "自走・留学後の非同期運用",
      goal: "2件目以降を自力で回す",
      deliverable: "自走計画シート",
      gate: null,
      videos: [
        { id: "7-1", title: "2件目以降を自力で回す仕組み", min: 9, type: "concept", url: "" },
        { id: "7-2", title: "自走計画シートの作り方", min: 8, type: "hands", url: "" },
        { id: "7-3", title: "非同期での質問の解決術", min: 7, type: "hands", url: "" },
        { id: "7-G", title: "卒業宣言: 自走フェーズへ", min: 1, type: "goal", url: "" },
      ],
    },
  ],

  /* ---------------- 3ヶ月カレンダー（週次ライブ） ---------------- */
  /* kind: oneonone=1on1 / group=グループセミナー / demo=成果発表会      */
  /* offset: 開講日からの日数（直近の予定の日付を自動計算）              */
  schedule: [
    { week: "W1",  kind: "oneonone", offset: 0,  title: "1on1 オリエン / 目標設定",           theme: "Deal-First: ターゲット案件を仮確定", moduleId: 0 },
    { week: "W2",  kind: "group",    offset: 7,  title: "グループ① ハンズオン (GPTs/Gem)",     theme: "カスタムAIを全員で作る",            moduleId: 2 },
    { week: "W3",  kind: "oneonone", offset: 14, title: "1on1 n8nセットアップ",                theme: "環境構築の詰まりを解消",            moduleId: 3 },
    { week: "W4",  kind: "group",    offset: 21, title: "グループ② 壊れたワークフロー診療所",  theme: "1人の詰まりを全員の学びに",          moduleId: 3 },
    { week: "M1",  kind: "demo",     offset: 28, title: "成果発表会（ミニ）",                  theme: "ROI言語化の初回ピッチ",            moduleId: null },
    { week: "W5",  kind: "group",    offset: 35, title: "グループ③ ハンズオン (AIノード連携)", theme: "本番ワークフローの骨子",            moduleId: 4 },
    { week: "W6",  kind: "oneonone", offset: 42, title: "1on1 ワークフロー / Claude MCP",       theme: "本番要件と実装の詰まり",            moduleId: 4 },
    { week: "W7",  kind: "group",    offset: 49, title: "グループ④ ROI営業ロールプレイ",       theme: "模擬商談 = 営業アクション駆動",      moduleId: 6 },
    { week: "W8",  kind: "oneonone", offset: 56, title: "1on1 本番稼働",                       theme: "ゲート①の最終確認",                moduleId: 4 },
    { week: "M2",  kind: "demo",     offset: 63, title: "成果発表会（本番）＋ゲスト/卒業生ライブ", theme: "本番システムをデモ",             moduleId: null },
    { week: "W9",  kind: "group",    offset: 70, title: "グループ⑤ ハンズオン (案件獲得導線)",  theme: "無料提供→有償の導線",              moduleId: 6 },
    { week: "W10", kind: "oneonone", offset: 77, title: "1on1 実践案件",                       theme: "提案書ドラフトのレビュー",          moduleId: 5 },
    { week: "W11", kind: "group",    offset: 84, title: "グループ⑥ ROI営業ロールプレイ②",      theme: "クロージングの精度を上げる",        moduleId: 6 },
    { week: "W12", kind: "oneonone", offset: 91, title: "1on1 成果確認 / 自走計画",            theme: "結果判定レビュー",                  moduleId: 7 },
    { week: "M3",  kind: "demo",     offset: 98, title: "卒業成果発表会（最大）",              theme: "次期見込客も招待",                  moduleId: null },
  ],

  /* ---------------- 週ごとの「やること」（宿題） ---------------- */
  /* week: 0=開講前準備 / 1..12=各週。done状態はブラウザに保存されます  */
  tasks: [
    { id: "t0-1", week: 0,  text: "公式LINEに参加し、自己紹介を投稿する" },
    { id: "t0-2", week: 0,  text: "Module 0「着地点設計」の動画を視聴する" },
    { id: "t1-1", week: 1,  text: "ターゲット案件シートを記入（誰の/どんな課題を/ROIいくら）" },
    { id: "t1-2", week: 1,  text: "13ステップ進捗マップに現在地を記入する" },
    { id: "t2-1", week: 2,  text: "業務棚卸し → 自動化候補リスト（ROI上位3件）を作る" },
    { id: "t2-2", week: 2,  text: "GPTs/GemでカスタムAIを1つ作り、1分デモ台本を書く" },
    { id: "t3-1", week: 3,  text: "n8n環境を構築し、最小ワークフローを1本動かす" },
    { id: "t4-1", week: 4,  text: "詰まったワークフローを診療所(グループ②)に持ち込む" },
    { id: "t4-2", week: 4,  text: "成果発表会(ミニ)用に1分ピッチを準備する" },
    { id: "t5-1", week: 5,  text: "本番システムの要件定義書を書き始める" },
    { id: "t6-1", week: 6,  text: "Claude MCP連携を実装し、本番ワークフローを構築" },
    { id: "t7-1", week: 7,  text: "【営業アクション】無料提供先を1件リストアップしてアプローチ" },
    { id: "t8-1", week: 8,  text: "【ゲート①】本番システムを稼働させ、運用手順書を完成" },
    { id: "t9-1", week: 9,  text: "案件獲得導線を設計し、提案先を3件決める" },
    { id: "t10-1", week: 10, text: "【ゲート②】ROI提案書を1本仕上げる" },
    { id: "t11-1", week: 11, text: "【営業アクション】ROI提案を実際に提示する（ロープレ反映）" },
    { id: "t12-1", week: 12, text: "【ゲート③】受注 or 月10万円相当の効果を確定し、自走計画シートを完成" },
  ],

  /* 毎日のルーティン（チェックは日付ごとに保存） */
  daily: [
    { id: "d-1", text: "朝: 1日1AI発信（運営のAI Tips）を読む" },
    { id: "d-2", text: "日中: 進捗マップの「次の1本」を見て案件の部品を1つ作る" },
    { id: "d-3", text: "夜23:59まで: 日報3行＋Winを投稿し、仲間に1リアクション" },
  ],

  /* ---------------- レスキュー動線（困ったらこの3本） ---------------- */
  rescue: [
    { icon: "wrench",  title: "環境が壊れた", desc: "n8n / 認証まわりが動かなくなったとき", url: "" },
    { icon: "compass", title: "案件が無い", desc: "ターゲット案件が決まらない・止まったとき", url: "" },
    { icon: "pause",   title: "手が止まった", desc: "何から手をつけるか分からなくなったとき", url: "" },
  ],

  /* ---------------- テンプレ / リソース棚 ---------------- */
  templates: [
    { icon: "target",     title: "ターゲット案件シート", desc: "誰の課題をROIいくらで解くか", link: "" },
    { icon: "map",        title: "13ステップ進捗マップ", desc: "一本道の現在地を可視化", link: "" },
    { icon: "cpu",        title: "プロンプト集", desc: "そのまま使える業務プロンプト", link: "" },
    { icon: "file",       title: "提案書テンプレート", desc: "ROIで語る提案の型", link: "" },
    { icon: "calculator", title: "ROI試算シート", desc: "効果額を数字で示す", link: "" },
    { icon: "book",       title: "運用手順書テンプレ", desc: "そのまま納品ドキュメントに", link: "" },
    { icon: "rocket",     title: "自走計画シート", desc: "2件目以降を自力で回す", link: "" },
  ],

  /* ---------------- 称号バッジ（進捗で自動解除） ---------------- */
  /* unlock: 達成条件。app.js が進捗から自動判定します                */
  badges: [
    { id: "b-found", icon: "users", title: "ファウンディングメンバー", desc: "1期生として参加", unlock: "always" },
    { id: "b-first-run", icon: "bolt", title: "初・本番稼働", desc: "ゲート①を達成", unlock: "gate:g1" },
    { id: "b-first-proposal", icon: "file", title: "初・提案", desc: "ゲート②を達成", unlock: "gate:g2" },
    { id: "b-first-cash", icon: "trending", title: "ファーストキャッシュ", desc: "ゲート③を達成", unlock: "gate:g3" },
    { id: "b-streak", icon: "flame", title: "日報7日連続", desc: "日報ストリーク7日", unlock: "streak:7" },
    { id: "b-graduate", icon: "award", title: "卒業", desc: "全モジュール完了", unlock: "all" },
  ],

  /* ---------------- 返金 / 保証の参加要件（自己チェック） ---------------- */
  guarantee: {
    note: "下記の本気度要件をすべて満たした上で結果未達の場合のみ、延長伴走 or 全額返金の対象になります。",
    items: [
      { id: "ga-1", label: "週1回MTGの出席率 90%以上（無断欠席なし）" },
      { id: "ga-2", label: "課題・成果物・日報の提出率 80%以上" },
      { id: "ga-3", label: "Month2以降、規定回数の営業アクションを実施" },
    ],
  },
};
