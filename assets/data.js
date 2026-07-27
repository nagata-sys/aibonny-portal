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
    plan: "スクール0期（2ヶ月講義＋4ヶ月実践）",
  },

  /* ---------------- 公式リンク（差し替え推奨） ---------------- */
  links: {
    line: "",                 // 公式LINE / グループのURL
    dashboard: "",            // 進捗ダッシュボード(スプレッドシート)のURL
    zoom: "",                 // 1on1 / セミナーの常設ZoomのURL
    notion: "https://app.notion.com/p/AIBONNY-37f75b94082c81a99be9f807500078cf",
  },

  /* ---------------- デモデータ（表示専用・DBには保存されない） ---------------- */
  /* Supabase移行が未適用の間、進捗グラフをプレビューするための表示専用データ。
   * DBには保存されない。本番運用開始時は enabled: false にする */
  demo: {
    enabled: true,  // 本番運用開始時に false にするとデモ補完が全て無効になる
    weeklyReports: [
      { weeksAgo: 3, sales_amount: 0, deals_text: "既存顧客A社にAI業務効率化を無料提案。まず効果を見せる方針", sales_activity_count: 1, note: "無料導入の範囲と期限を決めて提案した" },
      { weeksAgo: 2, sales_amount: 30000, deals_text: "A社の無料導入で削減効果が出始める／B社から問い合わせ1件", sales_activity_count: 2, note: "Before/Afterの数字が揃ってきた" },
      { weeksAgo: 1, sales_amount: 50000, deals_text: "A社: 月3万円で有償化決定／新規C社と商談中（見積提出済み）", sales_activity_count: 3, note: "初の有償化。ROIの数字を見せたのが効いた" },
    ],
    nextActions: [
      "L08の業務棚卸しシートを50件書き出す",
      "無料提案先の候補を3件リストアップして面談に持参",
      "MCP連携で詰まったエラーを面談で質問する",
    ],
  },

  /* ---------------- 3つのゲート（最終収束先） ---------------- */
  gates: [
    { id: "g1", label: "ゲート①", title: "内製化完成：自分の業務をAIで代替できる状態", target: "〜W4", moduleId: 9 },
    { id: "g2", label: "ゲート②", title: "提案書・営業導線を完成", target: "〜W6", moduleId: 13 },
    { id: "g3", label: "ゲート③", title: "無料導入→有償化で受注", target: "〜W8", moduleId: 16 },
  ],

  /* ---------------- 動画モジュール（L01〜L16） ---------------- */
  /* type: concept=概念 / hands=操作                                    */
  /* ★ L01〜L07 の module.id / video.id は 101〜107 系に採番しています。
   *   理由: 旧カリキュラム（Module1〜7, 動画ID "1-1"〜"7-1"）と番号が衝突すると、
   *   旧カリキュラムを視聴済み/提出済みだった既存受講生に、内容が全く別の
   *   新L01〜L07が「視聴済み」「提出済み」として誤表示されてしまうため。   */
  modules: [
    {
      id: 101, badge: "L01", week: "W1", title: "Claude Codeの初期セットアップ（インストールと基本操作）",
      goal: "インストールからアカウント作成、初回起動から最初の対話まで。入会直後に技術的な手応えを得る最初の1本",
      deliverable: "Claude Codeをセットアップし、最初の対話で自己紹介.mdを作成する",
      gate: null,
      videos: [
        { id: "101-1", title: "Claude Codeの初期セットアップ（インストールと基本操作）", min: 20, type: "hands", url: "https://www.youtube.com/embed/Y7ZGLz2XgsU" },
      ],
    },
    {
      id: 102, badge: "L02", week: "W1", title: "将来を本気で考えるワーク（Claude Code活用）",
      goal: "自分の限界を問い直し、6ヶ月目標と事業の現状数値（月商・客数・客単価・稼働時間）を言語化する",
      deliverable: "6ヶ月目標シート＋事業の現状シートを.mdで完成させ、オリエンテーション面談に持参",
      gate: null,
      videos: [
        { id: "102-1", title: "将来を本気で考えるワーク（Claude Code活用）", min: 90, type: "concept", url: "" },
      ],
    },
    {
      id: 103, badge: "L03", week: "W1", title: "AI概論：LLMの違いとAI活用の4step",
      goal: "ChatGPT・Claude・Geminiの違い・強み弱みとAI活用の4step。正解探しではなく仮説検証で動く姿勢を身につける",
      deliverable: "自分の事業の課題を3つのLLMに投げて比較メモを作る（業務ログ開始）",
      gate: null,
      videos: [
        { id: "103-1", title: "AI概論：LLMの違いとAI活用の4step", min: 60, type: "concept", url: "" },
      ],
    },
    {
      id: 104, badge: "L04", week: "W2", title: "Claude Code講義①：基本操作と.mdファイル",
      goal: "ファイルを読ませて指示する基本操作と、.mdファイルでの情報整理。目標シートを.md化して将来設計を壁打ちする",
      deliverable: "目標シートv2（Claude Codeとの壁打ちで更新版）を作る",
      gate: null,
      videos: [
        { id: "104-1", title: "Claude Code講義①：基本操作と.mdファイル", min: 20, type: "hands", url: "" },
      ],
    },
    {
      id: 105, badge: "L05", week: "W2", title: "Claude Code講義②：Skillsの読み込み方",
      goal: "Skillsの導入・読み込み方と、自分の定型業務のSkill化",
      deliverable: "自分の定型業務をSkill化して1つ動かす",
      gate: null,
      videos: [
        { id: "105-1", title: "Claude Code講義②：Skillsの読み込み方", min: 20, type: "hands", url: "" },
      ],
    },
    {
      id: 106, badge: "L06", week: "W3", title: "Claude Code講義③：MCPの使い方（Google系サービス）",
      goal: "MCPの繋ぎ方と実践。Google Drive・スプレッドシート・Gmail・Notion連携で日報・請求まわりを効率化",
      deliverable: "自分の事業にMCPを1つ繋いで動かす",
      gate: null,
      videos: [
        { id: "106-1", title: "Claude Code講義③：MCPの使い方（Google系サービス）", min: 20, type: "hands", url: "" },
      ],
    },
    {
      id: 107, badge: "L07", week: "W3", title: "Claude Code講義④：ウェブサイト・アプリの作り方",
      goal: "LP・サービスサイト・フォーム付きページの制作。業務効率化とクライアント提案の上級編",
      deliverable: "自分の事業のLPまたは業務用ミニアプリを1つ作る",
      gate: null,
      videos: [
        { id: "107-1", title: "Claude Code講義④：ウェブサイト・アプリの作り方", min: 20, type: "hands", url: "" },
      ],
    },
    {
      id: 8, badge: "L08", week: "W3〜W4", title: "自身の業務の棚卸し・ワーク",
      goal: "業務を入力・判断・出力の単位に分解し、「自分の事業に効く」×「顧客に売れそう」の2軸で内製化テーマを選定",
      deliverable: "業務棚卸しシート50件以上＋内製化テーマ1〜3個を決定",
      gate: null,
      videos: [
        { id: "8-1", title: "自身の業務の棚卸し・ワーク", min: 20, type: "hands", url: "" },
      ],
    },
    {
      id: 9, badge: "L09", week: "W4", title: "内製化の完成と効果測定",
      goal: "Before/After測定・削減時間の記録・手順書化・ROIメモ。AIで回る自分の事業がそのまま商品デモになる",
      deliverable: "内製化成果物＋手順書＋ROIメモを完成",
      gate: "g1",
      videos: [
        { id: "9-1", title: "内製化の完成と効果測定", min: 20, type: "hands", url: "" },
      ],
    },
    {
      id: 10, badge: "L10", week: "W5", title: "ROIの提案",
      goal: "既存の人件費・工数をいくら削減するかというROI起点の価格設定・提案の型を実例で学ぶ",
      deliverable: "自分の内製化実績を同じ型で1枚にまとめる",
      gate: null,
      videos: [
        { id: "10-1", title: "ROIの提案", min: 20, type: "concept", url: "" },
      ],
    },
    {
      id: 11, badge: "L11", week: "W5", title: "既存サービスの代替提案と商品化",
      goal: "クライアントが今払っているコストより安く同等以上の品質を出す提案。相場比較表とクロスセル設計",
      deliverable: "代替提案できるサービス案3つ＋価格比較表＋既存顧客に出せる新メニュー案",
      gate: null,
      videos: [
        { id: "11-1", title: "既存サービスの代替提案と商品化", min: 20, type: "concept", url: "" },
      ],
    },
    {
      id: 12, badge: "L12", week: "W6", title: "無料導入→有償化のステップ",
      goal: "無料で信頼を得て、効果を感じてもらってから報酬化。導入先はまず既存顧客から。無料の範囲・期限の決め方",
      deliverable: "既存顧客・SNSから無料導入先の候補リスト10件",
      gate: null,
      videos: [
        { id: "12-1", title: "無料導入→有償化のステップ", min: 20, type: "concept", url: "" },
      ],
    },
    {
      id: 13, badge: "L13", week: "W6", title: "提案書・営業文面とSNS販路",
      goal: "1ページ提案書・DM・紹介依頼文。SNS発信で事例を見せて引き合いを作る導線設計",
      deliverable: "提案書1枚＋営業文面3パターン＋事例投稿の下書き1本",
      gate: "g2",
      videos: [
        { id: "13-1", title: "提案書・営業文面とSNS販路", min: 20, type: "concept", url: "" },
      ],
    },
    {
      id: 14, badge: "L14", week: "W7", title: "ヒアリングと商談",
      goal: "売り込まずに課題を聞く。業務フローの聞き方、相手の言葉を提案に使う。営業ロールプレイ",
      deliverable: "質問リスト作成＋模擬商談1回",
      gate: null,
      videos: [
        { id: "14-1", title: "ヒアリングと商談", min: 20, type: "concept", url: "" },
      ],
    },
    {
      id: 15, badge: "L15", week: "W7", title: "見積・PoC・納品・継続提案",
      goal: "小さく試す提案、価格、修正回数、納品チェック、保守・月額運用への導線",
      deliverable: "PoC提案書＋見積案＋納品チェックリスト",
      gate: null,
      videos: [
        { id: "15-1", title: "見積・PoC・納品・継続提案", min: 20, type: "concept", url: "" },
      ],
    },
    {
      id: 16, badge: "L16", week: "W8", title: "事例化・ポートフォリオ・実践期の歩き方",
      goal: "Before/Afterの事例記事化とSNS・商品ページへの反映。実践期（3〜6ヶ月目）の90日行動計画",
      deliverable: "事例ドラフト＋ポートフォリオ骨子＋90日行動計画",
      gate: "g3",
      videos: [
        { id: "16-1", title: "事例化・ポートフォリオ・実践期の歩き方", min: 20, type: "concept", url: "" },
      ],
    },
  ],

  /* ---------------- AIツール（AIツールの使い方解説・常時公開） ---------------- */
  /* メイン講義（L01〜L16）とは別に、いつでも見られるツール別の解説教材。
   * ここに追加すれば「動画レッスン」→「AIツール」タブにカテゴリ別で表示されます。
   * 例: { id: "tool-xxx", title: "ツール名", cat: "カテゴリ名", required: true, min: 15, url: "" },       */
  extraVideos: [
    { id: "tool-chatgpt", title: "ChatGPT", cat: "LLM", required: true, min: 15, url: "" },
    { id: "tool-claude", title: "Claude", cat: "LLM", required: true, min: 15, url: "" },
    { id: "tool-gemini", title: "Gemini", cat: "LLM", required: true, min: 15, url: "" },
    { id: "tool-claude-code", title: "Claude Code", cat: "AIコーディング", required: true, min: 15, url: "" },
    { id: "tool-codex", title: "Codex", cat: "AIコーディング", required: true, min: 15, url: "" },
    { id: "tool-git-github", title: "Git・GitHub", cat: "AIコーディング", required: false, min: 15, url: "" },
    { id: "tool-cursor-vscode", title: "Cursor・VS Code", cat: "AIコーディング", required: false, min: 15, url: "" },
    { id: "tool-n8n", title: "n8n", cat: "AI自動化", required: true, min: 15, url: "" },
    { id: "tool-dify", title: "Dify", cat: "AI自動化", required: false, min: 15, url: "" },
    { id: "tool-copilot", title: "Copilot", cat: "AIエージェント", required: true, min: 15, url: "" },
    { id: "tool-genspark", title: "Genspark", cat: "AIエージェント", required: false, min: 15, url: "" },
    { id: "tool-manus", title: "Manus", cat: "AIエージェント", required: false, min: 15, url: "" },
    { id: "tool-notebooklm", title: "NotebookLM", cat: "AIクリエイティブ", required: true, min: 15, url: "" },
    { id: "tool-higgsfield", title: "Higgsfield", cat: "AIクリエイティブ", required: true, min: 15, url: "" },
    { id: "tool-midjourney", title: "Midjourney", cat: "AIクリエイティブ", required: false, min: 15, url: "" },
    { id: "tool-suno", title: "Suno AI", cat: "AIクリエイティブ", required: false, min: 15, url: "" },
    { id: "tool-typeless-aquavoice", title: "Typeless・AquaVoice", cat: "音声入力", required: true, min: 15, url: "" },
    { id: "tool-notion", title: "Notion", cat: "情報管理", required: true, min: 15, url: "" },
  ],

  /* ---------------- 過去セミナーアーカイブ（開催済みセミナーの録画） ---------------- */
  /* ここに追加すれば「動画レッスン」→「過去セミナーアーカイブ」タブに一覧表示されます。
   * 例: { id: "sem-20260801", title: "セミナータイトル", date: "2026-08-01", min: 60, url: "" },       */
  seminarArchive: [],

  /* ---------------- テンプレ / リソース棚 ---------------- */
  templates: [
    { icon: "file",   title: "提案書テンプレート", desc: "ROIで語る提案の型", link: "" },
    { icon: "rocket", title: "自走計画シート", desc: "2件目以降を自力で回す", link: "" },
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
