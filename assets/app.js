/* =====================================================================
 * AIBONNY スクールポータル ｜ アプリ本体
 * 認証(会員番号/パスワード)・学習進捗・日報・セミナー予約は Supabase 管理。
 * ===================================================================== */
(function () {
  "use strict";
  const D = AIBONNY; // 静的コンテンツ（動画/カレンダー/タスク等）

  /* ---------------- 線アイコン ---------------- */
  const ICONS = {
    play: `<path d="M8 5.5 18 12 8 18.5Z" fill="currentColor" stroke="none"/>`,
    check: `<path d="m5 12.5 4.5 4.5L19 7"/>`,
    chevron: `<path d="m6 9 6 6 6-6"/>`,
    arrow: `<path d="M5 12h13M12 6l6 6-6 6"/>`,
    clock: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
    target: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r=".7" fill="currentColor" stroke="none"/>`,
    package: `<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/>`,
    video: `<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10 5-3v10l-5-3z"/>`,
    calendar: `<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 3v4M16 3v4"/>`,
    chat: `<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>`,
    flame: `<path d="M12 3c.6 2.5 2.5 3.8 3.4 5.3A5 5 0 1 1 7 12c0-1.3.5-2.3 1-3 .2 1 .7 1.6 1.4 2C10 8.5 11.2 5.6 12 3z"/>`,
    award: `<circle cx="12" cy="9" r="5.3"/><path d="M8.6 13.2 7 21l5-2.4L17 21l-1.6-7.8"/>`,
    bolt: `<path d="M13 2 4.5 13.5H10l-1 8.5L19.5 10H14z" fill="currentColor" stroke="none"/>`,
    file: `<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12.5h5M10 16h5"/>`,
    trending: `<path d="M3 16.5 9.5 10l4 4L21 6.5"/><path d="M15 6.5h6v6"/>`,
    wrench: `<path d="M15.5 6.3a4 4 0 0 0-5 5L4 17.8 6.2 20l6.5-6.5a4 4 0 0 0 5-5l-2.3 2.3-2-.5-.5-2z"/>`,
    compass: `<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z" fill="currentColor" stroke="none"/>`,
    pause: `<rect x="7" y="5" width="3.4" height="14" rx="1.2"/><rect x="13.6" y="5" width="3.4" height="14" rx="1.2"/>`,
    map: `<path d="M9 4 3.5 6.2v14L9 18l6 2 5.5-2.2V3.8L15 6 9 4z"/><path d="M9 4v14M15 6v14"/>`,
    cpu: `<rect x="6.5" y="6.5" width="11" height="11" rx="2.4"/><rect x="10" y="10" width="4" height="4" rx="1"/><path d="M9.5 3v2M14.5 3v2M9.5 19v2M14.5 19v2M3 9.5h2M3 14.5h2M19 9.5h2M19 14.5h2"/>`,
    calculator: `<rect x="5" y="3" width="14" height="18" rx="2.4"/><path d="M8.5 7h7"/><path d="M9 11h.01M12 11h.01M15 11h.01M9 14.5h.01M12 14.5h.01M15 14.5h.01M9 18h3.5"/>`,
    book: `<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19"/>`,
    rocket: `<path d="M9 13c5.5-7.5 10-7.5 10-7.5s0 4.5-7.5 10z"/><path d="M9 13l-3.5.8L4 17.5 6.5 20l2.7-1.5L10 15"/><circle cx="14.5" cy="9.5" r="1.2"/>`,
    lock: `<rect x="5" y="11" width="14" height="9" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`,
    users: `<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3 3 0 0 1 0 5.6M16.5 19a5.6 5.6 0 0 0-2.4-4.6"/>`,
    user: `<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/>`,
    dot: `<circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none"/>`,
  };
  const icon = (name, cls = "icn") =>
    `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ICONS.dot}</svg>`;

  /* ---------------- アプリ状態（Supabaseから読み込む） ---------------- */
  let uid = null;
  let progress = { watched: {}, tasks: {}, daily: {}, guarantee: {} };
  let reports = [];
  let student = { name: "受講生", cohort: "1期", start_date: "2026-06-01", member_no: "", plan: D.student.plan };
  let seminars = [];
  let myBookings = new Set();

  /* ---------------- 日付ヘルパー ---------------- */
  const DOW = ["日", "月", "火", "水", "木", "金", "土"];
  const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const TODAY = midnight(new Date());
  const HOUR = new Date().getHours();
  const parse = (s) => { const [y, m, d] = String(s).split("-").map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
  const diffDays = (a, b) => Math.round((midnight(a) - midnight(b)) / 86400000);
  const keyOf = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmt = (d) => `${d.getMonth() + 1}/${d.getDate()}（${DOW[d.getDay()]}）`;
  const hhmm = (d) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- 進捗計算 ---------------- */
  const allVideos = () => D.modules.flatMap((m) => m.videos.map((v) => ({ ...v, moduleId: m.id })));
  const isWatched = (id) => !!progress.watched[id];
  const moduleById = (id) => D.modules.find((m) => m.id === id);
  const moduleStat = (m) => {
    const total = m.videos.length, done = m.videos.filter((v) => isWatched(v.id)).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0, complete: done === total };
  };
  const overall = () => {
    const v = allVideos(), done = v.filter((x) => isWatched(x.id)).length;
    return { done, total: v.length, pct: v.length ? Math.round((done / v.length) * 100) : 0 };
  };
  const gateDone = (gid) => { const m = D.modules.find((x) => x.gate === gid); return m ? moduleStat(m).complete : false; };
  const nextVideo = () => { for (const v of allVideos()) if (!isWatched(v.id)) return v; return null; };

  const startDate = () => parse(student.start_date);
  const currentWeek = () => Math.min(12, Math.max(1, Math.floor(diffDays(TODAY, startDate()) / 7) + 1));
  const eventDate = (ev) => addDays(startDate(), ev.offset);
  const nextEvent = () => D.schedule.find((ev) => diffDays(eventDate(ev), TODAY) >= 0) || null;
  const weekTasksOf = (w) => D.tasks.filter((t) => t.week === w);
  const openTaskCount = () => weekTasksOf(currentWeek()).filter((t) => !progress.tasks[t.id]).length;

  const reportStreak = () => {
    const has = (d) => reports.some((r) => r.date === keyOf(d));
    let cur = TODAY, n = 0;
    if (!has(cur)) cur = addDays(cur, -1);
    while (has(cur)) { n++; cur = addDays(cur, -1); }
    return n;
  };

  const JOURNEY = [
    { label: "着地点・基礎", mods: [0, 1, 2, 3] },
    { label: "ゲート① 本番システム", mods: [4] },
    { label: "ゲート② ROI提案", mods: [5] },
    { label: "ゲート③ 受注", mods: [6] },
    { label: "自走・卒業", mods: [7] },
  ];
  const stepDone = (s) => s.mods.every((id) => moduleStat(moduleById(id)).complete);

  /* ---------------- 部品 ---------------- */
  const typeLabel = { concept: "概念", hands: "操作", qa: "Q&A", goal: "宣言" };
  const dateChip = (d, orange) =>
    `<div class="datechip ${orange ? "orange" : ""}"><div class="m">${d.getMonth() + 1}月</div><div class="d">${d.getDate()}</div><div class="w">${DOW[d.getDay()]}曜</div></div>`;

  function taskRow(t) {
    const done = !!progress.tasks[t.id];
    return `<div class="checkrow ${done ? "done" : ""}"><div class="cbox" data-task="${t.id}">${icon("check", "icn-sm")}</div><div class="ctext">${esc(t.text)}</div></div>`;
  }

  // Googleカレンダー「追加」リンク
  function gcalUrl(s) {
    const start = new Date(s.starts_at);
    const end = new Date(start.getTime() + (s.duration_min || 90) * 60000);
    const z = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const p = new URLSearchParams({
      action: "TEMPLATE",
      text: "【AIBONNY】" + s.title,
      dates: `${z(start)}/${z(end)}`,
      details: `${s.description || ""}\n講師: ${s.instructor || ""}\nテーマ: ${s.theme || ""}`,
      location: s.location || "",
    });
    return "https://calendar.google.com/calendar/render?" + p.toString();
  }

  /* ================= ホーム ================= */
  function renderHome() {
    const o = overall(), cw = currentWeek(), nv = nextVideo(), now = Date.now();
    const greet = HOUR < 5 ? "おそくまでお疲れさまです" : HOUR < 11 ? "おはようございます" : HOUR < 18 ? "こんにちは" : "こんばんは";

    const hero = `<div class="hero">
      <div class="htext">
        <div class="hello">${greet}、今日も一歩ずつ進めましょう</div>
        <h2>${esc(student.name)} さん</h2>
        <div class="meta">
          <span class="pill">${esc(student.plan)}</span>
          <span class="pill">${esc(student.cohort)}</span>
          <span class="pill">Week ${cw} / 12</span>
        </div>
      </div>
      <div class="hbox"><div class="lbl">全体の進捗</div><div class="num">${o.pct}<small>%</small></div><div class="dt">${o.done} / ${o.total} 本 視聴</div></div>
    </div>`;

    let firstOpen = JOURNEY.findIndex((s) => !stepDone(s));
    const steps = JOURNEY.map((s, i) => {
      const done = stepDone(s), current = !done && i === firstOpen;
      return `<div class="step ${done ? "done" : current ? "current" : ""}"><div class="sdot">${done ? icon("check", "icn-sm") : i + 1}</div><div class="slabel">${esc(s.label)}</div></div>`;
    }).join("");

    // 直近の予定（予約済みセミナー）
    const upBooked = seminars.filter((s) => myBookings.has(s.id) && new Date(s.starts_at).getTime() >= now)
      .sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at)).slice(0, 3);
    const evHtml = upBooked.length ? `<div class="evlist">${upBooked.map((s) => {
      const d = new Date(s.starts_at);
      return `<div class="evrow"><div class="kindline group"></div>${dateChip(d)}
        <div class="einfo"><div class="et">${esc(s.title)}</div><div class="em">${icon("clock", "icn-sm")} ${hhmm(d)}・${esc(s.instructor || "")}</div></div>
        <a class="gcal" href="${gcalUrl(s)}" target="_blank">${icon("calendar", "icn-sm")} 追加</a></div>`;
    }).join("")}</div>` : `<div class="empty">まだ予約したセミナーがありません<div style="margin-top:10px"><button class="btn sm" data-nav="seminars">セミナーを予約する</button></div></div>`;
    const predCard = `<div class="card">
      <div class="card-head"><h4>直近の予定（予約済み）</h4><a class="act btn ghost sm" data-nav="seminars">セミナー予約 ${icon("arrow", "icn-sm")}</a></div>
      ${evHtml}</div>`;

    // 次にやること
    const nextVidHtml = nv ? `<div class="nextvid" data-open-video="${nv.id}">
      <div class="play">${icon("play")}</div>
      <div class="nv-info"><div class="nv-k">次に見る動画</div><div class="nv-t">${esc(nv.title)}</div><div class="nv-m">${moduleById(nv.moduleId).badge}・${nv.min}分・${typeLabel[nv.type]}</div></div>
      ${icon("chevron", "icn")}</div>`
      : `<div class="nextvid" style="background:var(--green-soft);border-color:var(--line)"><div class="play" style="background:var(--green)">${icon("check")}</div><div class="nv-info"><div class="nv-k" style="color:var(--green-d)">完了</div><div class="nv-t">全モジュールを視聴し終えました</div></div></div>`;
    const wt = weekTasksOf(cw);
    const taskCard = `<div class="card">
      <div class="card-head"><h4>今週のやること</h4><a class="act btn ghost sm" data-nav="tasks">すべて見る ${icon("arrow", "icn-sm")}</a></div>
      ${nextVidHtml}
      <div class="tasklist" style="margin-top:6px">${wt.length ? wt.map(taskRow).join("") : `<div class="empty">この週のタスクはありません</div>`}</div></div>`;

    const tiles = [
      { label: "動画レッスン", ic: "video", t: "t-green", nav: "curriculum" },
      { label: "セミナー予約", ic: "calendar", t: "t-orange", nav: "seminars" },
      { label: "やること", ic: "check", t: "t-indigo", nav: "tasks" },
      { label: "スケジュール", ic: "map", t: "t-sky", nav: "schedule" },
      { label: "コミュニティ", ic: "users", t: "t-green", nav: "community" },
      { label: "公式LINE", ic: "chat", t: "t-rose", href: D.links.line },
      { label: "リソース", ic: "package", t: "t-slate", nav: "resources" },
      { label: "設計（Notion）", ic: "book", t: "t-indigo", href: D.links.notion },
    ];
    const tileHtml = tiles.map((q) => {
      const attr = q.nav ? `data-nav="${q.nav}"` : q.href ? `href="${q.href}" target="_blank"` : `data-noop title="data.js の links に設定してください"`;
      return `<a class="qtile" ${attr}><div class="itile ${q.t}">${icon(q.ic)}</div><div class="ql">${esc(q.label)}</div></a>`;
    }).join("");

    return `${hero}
      <div class="sec-title"><h3>進捗ステータス</h3></div>
      <div class="card"><div class="stepper">${steps}</div></div>
      <div class="sec-title"><h3>今日のフォーカス</h3></div>
      <div class="row2">${predCard}${taskCard}</div>
      <div class="sec-title"><h3>クイックリンク</h3></div>
      <div class="card"><div class="qgrid">${tileHtml}</div></div>`;
  }

  /* ================= カリキュラム ================= */
  const openModules = new Set();
  function renderCurriculum() {
    const o = overall();
    const mods = D.modules.map((m) => {
      const st = moduleStat(m);
      const cls = `mod card ${openModules.has(m.id) ? "open" : ""} ${m.gate ? "gate" : ""} ${st.complete ? "mod-done" : ""}`;
      const vids = m.videos.map((v) => {
        const w = isWatched(v.id);
        return `<div class="vid ${w ? "watched" : ""}">
          <div class="vcbox" data-watch="${v.id}" title="視聴済みにする">${icon("check", "icn-sm")}</div>
          <div class="vmain" data-open-video="${v.id}">
            <div class="vplay">${icon(w ? "check" : "play", "icn-sm")}</div>
            <div><div class="vt">${esc(v.title)}</div><div class="vm"><span class="vtype ${v.type}">${typeLabel[v.type]}</span> ${v.min}分${v.url ? "" : "・<span>準備中</span>"}</div></div>
          </div>
          <span class="pill ${w ? "green" : "gray"}">${w ? "視聴済" : "未視聴"}</span></div>`;
      }).join("");
      return `<div class="${cls}">
        <div class="mhead" data-toggle-module="${m.id}">
          <div class="mnum">${st.complete ? icon("check") : m.id}</div>
          <div class="minfo"><div class="mt">${esc(m.title)} ${m.gate ? `<span class="pill orange">${D.gates.find((g) => g.id === m.gate).label}</span>` : ""}</div><div class="mg">${esc(m.goal)}</div></div>
          <div class="mright"><div class="mbarwrap"><div class="mbar"><i style="width:${st.pct}%"></i></div><div class="mfrac">${st.done}/${st.total} 本</div></div>${icon("chevron", "caret icn")}</div>
        </div>
        <div class="mbody"><div class="mdeliver">${icon("package", "icn-sm")}<span><b>この章の成果物：</b>${esc(m.deliverable)}</span></div>${vids}</div>
      </div>`;
    }).join("");
    return `<div class="card curhead">
        <div class="ci"><div class="t">一本道カリキュラム（8モジュール → 3ゲート）</div><div class="note" style="margin-top:4px">1本＝1成果物＝1前進。迷ったら「次の1本」だけ進めればOKです。</div></div>
        <div class="cp"><div class="big">${o.pct}%</div><div class="note">${o.done} / ${o.total} 本 視聴済み</div></div>
      </div>${mods}`;
  }

  /* ================= セミナー予約 ================= */
  function renderSeminars() {
    const now = Date.now();
    const up = seminars.filter((s) => new Date(s.starts_at).getTime() >= now);
    const cards = up.map((s) => {
      const d = new Date(s.starts_at);
      const booked = myBookings.has(s.id);
      const left = s.capacity != null ? Math.max(s.capacity - s.booked_count, 0) : null;
      const full = s.capacity != null && s.booked_count >= s.capacity;
      let action;
      if (booked) {
        action = `<div class="booked-tag">${icon("check", "icn-sm")} 予約済み</div>
          <a class="gcal" href="${gcalUrl(s)}" target="_blank">${icon("calendar", "icn-sm")} カレンダーに追加</a>
          <button class="btn ghost sm" data-cancel="${s.id}">キャンセル</button>`;
      } else if (full) {
        action = `<button class="btn sm" disabled>満席</button>`;
      } else {
        action = `<button class="btn sm" data-book="${s.id}">応募する</button>`;
      }
      const seats = s.capacity != null ? (full && !booked ? "満席" : `残り <b>${left}</b> / ${s.capacity} 席`) : "定員なし";
      return `<div class="card sem">
        <div class="when"><div class="m">${d.getMonth() + 1}月</div><div class="d">${d.getDate()}</div><div class="w">${DOW[d.getDay()]}曜</div><div class="hm">${hhmm(d)}</div></div>
        <div class="sbody">
          <div class="st">${esc(s.title)}</div>
          <div class="smeta"><span class="pill green">${icon("user", "icn-sm")} ${esc(s.instructor || "")}</span>${s.theme ? `<span class="pill orange">${esc(s.theme)}</span>` : ""}<span class="pill gray">${s.duration_min || 90}分</span>${s.location ? `<span class="pill gray">${esc(s.location)}</span>` : ""}</div>
          <div class="sdesc">${esc(s.description || "")}</div>
        </div>
        <div class="sside"><div class="seats ${full && !booked ? "full" : ""}">${seats}</div>${action}</div>
      </div>`;
    }).join("");
    return `<div class="card sem-head"><div class="si"><div class="t">セミナー予約</div><div class="note" style="margin-top:4px">講師ごとの各テーマ枠に応募できます。応募後「カレンダーに追加」でGoogleカレンダーに登録できます。</div></div></div>
      ${up.length ? cards : `<div class="card"><div class="empty">現在予約できるセミナーはありません。新しい枠が追加されるとここに表示されます。</div></div>`}`;
  }

  /* ================= やること ================= */
  function renderTasks() {
    const cw = currentWeek();
    const wt = weekTasksOf(cw);
    const today = progress.daily[keyOf(TODAY)] || {};
    const dailyHtml = D.daily.map((d) => {
      const done = !!today[d.id];
      return `<div class="checkrow ${done ? "done" : ""}"><div class="cbox" data-daily="${d.id}">${icon("check", "icn-sm")}</div><div class="ctext">${esc(d.text)}</div></div>`;
    }).join("");
    const weeks = [...new Set(D.tasks.map((t) => t.week))].sort((a, b) => a - b);
    const allHtml = weeks.map((w) => {
      const ts = weekTasksOf(w), doneN = ts.filter((t) => progress.tasks[t.id]).length;
      const label = w === 0 ? "オンボーディング" : `Week ${w}`, isNow = w === cw;
      return `<div class="card pad-sm" style="margin-bottom:12px;${isNow ? "border-color:var(--green)" : ""}">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px"><b style="font-size:14px">${label}</b>${isNow ? `<span class="pill green">今週</span>` : ""}<span class="pill ${doneN === ts.length ? "green" : "gray"}" style="margin-left:auto">${doneN}/${ts.length} 完了</span></div>
        <div class="tasklist">${ts.map(taskRow).join("")}</div></div>`;
    }).join("");
    return `<div class="card" style="margin-bottom:18px;border-color:var(--green)">
        <div class="card-head"><h4>今週のやること（Week ${cw}）</h4><span class="act pill green">Week ${cw}</span></div>
        <div class="tasklist">${wt.length ? wt.map(taskRow).join("") : `<div class="empty">この週のタスクはありません</div>`}</div></div>
      <div class="sec-title"><h3>毎日のルーティン（${fmt(TODAY)}）</h3></div>
      <div class="card"><div class="tasklist">${dailyHtml}</div><div class="note" style="margin-top:10px">チェックは日付ごとに保存されます。毎日この3つを回すのが基本リズムです。</div></div>
      <div class="sec-title"><h3>すべてのやること（3ヶ月）</h3></div>${allHtml}`;
  }

  /* ================= スケジュール ================= */
  function renderSchedule() {
    const ne = nextEvent();
    const rows = D.schedule.map((ev) => {
      const d = eventDate(ev), past = diffDays(d, TODAY) < 0, isNext = ev === ne;
      const ic = ev.kind === "oneonone" ? "user" : ev.kind === "group" ? "users" : "award";
      return `<div class="ev ${ev.kind} ${isNext ? "next" : ""}" style="${past ? "opacity:.5" : ""}">
        <div class="dot">${icon(ic, "icn-sm")}</div>
        <div class="ebody"><div class="etop"><span class="ew">${ev.week}</span>${isNext ? `<span class="pill green">次回</span>` : past ? `<span class="pill gray">終了</span>` : ""}<span class="edate">${fmt(d)}</span></div>
          <div class="etitle">${esc(ev.title)}</div><div class="etheme">${esc(ev.theme)}</div></div></div>`;
    }).join("");
    return `<div class="card" style="margin-bottom:18px;display:flex;gap:14px;flex-wrap:wrap;align-items:center">
        <div style="flex:1 1 240px"><div style="font-weight:800;font-size:16px">3ヶ月カレンダー（週1ライブ × 全12回 ＋ 月1発表会）</div><div class="note" style="margin-top:4px">開講日：${fmt(startDate())}。毎週かならずライブ接点が1つ以上あります。</div></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><span class="pill green">1on1 MTG</span><span class="pill" style="background:#dbf4fb;color:#1487ad">グループセミナー</span><span class="pill orange">成果発表会</span></div></div>
      <div class="card"><div class="tl">${rows}</div></div>`;
  }

  /* ================= コミュニティ ================= */
  function renderCommunity() {
    const streak = reportStreak(), recent = reports.slice(0, 3);
    const linkBtn = (url, label, ic) => url
      ? `<a class="btn ghost sm" href="${url}" target="_blank">${icon(ic, "icn-sm")} ${label}</a>`
      : `<button class="btn ghost sm" data-noop title="data.js の links に URL を設定してください">${icon(ic, "icn-sm")} ${label}（未設定）</button>`;
    const recentHtml = recent.length ? recent.map((r) => `<div class="card pad-sm" style="margin-bottom:10px">
        <div style="font-size:12px;color:var(--faint);font-weight:700;margin-bottom:5px">${r.date}</div>
        <div style="font-size:13px"><b>やった：</b>${esc(r.did || "—")}</div><div style="font-size:13px"><b>詰まり：</b>${esc(r.stuck || "—")}</div>
        <div style="font-size:13px"><b>明日：</b>${esc(r.next || "—")}</div>${r.win ? `<div style="font-size:13px;color:var(--green-d)"><b>Win：</b>${esc(r.win)}</div>` : ""}</div>`).join("")
      : `<div class="empty">まだ日報がありません。今日の3行を書いてみましょう。</div>`;
    const badgesHtml = D.badges.map((b) => {
      let on = false;
      if (b.unlock === "always") on = true;
      else if (b.unlock === "all") on = overall().pct === 100;
      else if (b.unlock.startsWith("gate:")) on = gateDone(b.unlock.split(":")[1]);
      else if (b.unlock.startsWith("streak:")) on = streak >= Number(b.unlock.split(":")[1]);
      return `<div class="badge ${on ? "on" : "off"}">${on ? "" : `<span class="lk">${icon("lock", "icn-sm")}</span>`}<div class="bic">${icon(b.icon)}</div><div class="bt">${esc(b.title)}</div><div class="bd">${esc(b.desc)}</div></div>`;
    }).join("");
    const gHtml = D.guarantee.items.map((it) => {
      const done = !!progress.guarantee[it.id];
      return `<div class="checkrow ${done ? "done" : ""}"><div class="cbox" data-guarantee="${it.id}">${icon("check", "icn-sm")}</div><div class="ctext">${esc(it.label)}</div></div>`;
    }).join("");
    return `<div class="card" style="margin-bottom:18px"><div class="card-head"><h4>コミュニティ（LINE中心）</h4></div>
        <div class="linkrow">${linkBtn(D.links.line, "公式LINEを開く", "chat")}${linkBtn(D.links.dashboard, "進捗ダッシュボード", "trending")}${linkBtn(D.links.zoom, "ライブ用Zoom", "video")}</div></div>
      <div class="sec-title"><h3>今日の日報（3行＋Win）</h3></div>
      <div class="card report">
        <div class="streak"><div class="sbig">${icon("flame", "icn")}<span class="num">${streak}</span></div><div><div style="font-weight:800">日連続ストリーク</div><div class="note">締切は毎日23:59。提出率80%が返金要件です。</div></div></div>
        <div class="fld"><label>① やったこと</label><textarea id="r-did" rows="2" placeholder="例: n8nの最小ワークフローを1本動かした"></textarea></div>
        <div class="fld"><label>② 詰まり / 質問</label><textarea id="r-stuck" rows="2" placeholder="例: Webhookの認証でエラーが出る"></textarea></div>
        <div class="fld"><label>③ 明日の最小1アクション</label><textarea id="r-next" rows="2" placeholder="例: 提案先リストを3件書き出す"></textarea></div>
        <div class="fld"><label>Win <small>（任意・小さな勝ちを1つ）</small></label><input id="r-win" placeholder="例: クライアント候補から返信が来た" /></div>
        <div class="linkrow"><button class="btn" id="saveReport">日報を保存</button><button class="btn ghost" id="copyReport">${icon("chat", "icn-sm")} LINE用にコピー</button></div></div>
      <div class="sec-title"><h3>最近の日報</h3></div><div>${recentHtml}</div>
      <div class="sec-title"><h3>称号バッジ</h3></div><div class="badges">${badgesHtml}</div>
      <div class="sec-title"><h3>返金・延長伴走の参加要件（自己チェック）</h3></div>
      <div class="card"><div class="note" style="margin-bottom:10px">${esc(D.guarantee.note)}</div><div class="tasklist">${gHtml}</div></div>`;
  }

  /* ================= リソース ================= */
  function renderResources() {
    const tpl = D.templates.map((t) => `<a class="res" ${t.link ? `href="${t.link}" target="_blank"` : "data-noop"}><div class="itile t-green">${icon(t.icon)}</div><div><div class="rt">${esc(t.title)}</div><div class="rd">${esc(t.desc)}</div></div><div class="arrow">${t.link ? icon("arrow", "icn-sm") : ""}</div></a>`).join("");
    const rescueHtml = D.rescue.map((r) => `<a class="res" ${r.url ? `href="${r.url}" target="_blank"` : "data-noop"}><div class="itile t-rose">${icon(r.icon)}</div><div><div class="rt">${esc(r.title)}</div><div class="rd">${esc(r.desc)}</div></div></a>`).join("");
    return `<div class="sec-title"><h3>困ったらこの3本（レスキュー動線）</h3></div><div class="rescue">${rescueHtml}</div>
      <div class="sec-title"><h3>テンプレート / リソース棚</h3></div><div class="rgrid">${tpl}</div>
      <div class="sec-title"><h3>リンク</h3></div>
      <div class="card"><a class="res" href="${D.links.notion}" target="_blank" style="box-shadow:none;border:none;padding:8px"><div class="itile t-slate">${icon("book")}</div><div><div class="rt">スクール全体設計（Notion）</div><div class="rd">設計の原本。最新の方針はこちら</div></div><div class="arrow">${icon("arrow", "icn-sm")}</div></a><div class="note" style="margin-top:6px">テンプレやレスキュー動画のURLは <code>assets/data.js</code> で設定できます。</div></div>`;
  }

  /* ================= 描画 & ルーティング ================= */
  const VIEWS = {
    home: { title: "ホーム", render: renderHome },
    curriculum: { title: "動画レッスン", render: renderCurriculum },
    seminars: { title: "セミナー予約", render: renderSeminars },
    tasks: { title: "やること", render: renderTasks },
    schedule: { title: "スケジュール", render: renderSchedule },
    community: { title: "コミュニティ", render: renderCommunity },
    resources: { title: "リソース", render: renderResources },
  };

  function render() {
    for (const id in VIEWS) document.getElementById("view-" + id).innerHTML = VIEWS[id].render();
    const o = overall();
    document.getElementById("sideProgPct").textContent = o.pct + "%";
    document.getElementById("sideProgBar").style.width = o.pct + "%";
    document.getElementById("chipWho").textContent = student.name + " さん";
    document.getElementById("chipNo").textContent = student.member_no ? "会員 " + student.member_no : student.cohort;
    document.getElementById("chipAv").textContent = (student.name || "受")[0];
    const oc = openTaskCount(), badge = document.getElementById("taskBadge");
    badge.textContent = oc; badge.style.display = oc > 0 ? "grid" : "none";
  }
  function applyActive() {
    const v = location.hash.replace("#", "") || "home";
    const view = VIEWS[v] ? v : "home";
    for (const id in VIEWS) document.getElementById("view-" + id).classList.toggle("active", id === view);
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.view === view));
  }
  function route() { applyActive(); document.getElementById("app").classList.remove("menu-open"); window.scrollTo(0, 0); }

  // 進捗のSupabase保存（デバウンス）
  let saveT;
  function scheduleSave() { clearTimeout(saveT); saveT = setTimeout(() => { if (uid) DB.saveProgress(uid, progress); }, 700); }
  function refresh() { render(); applyActive(); scheduleSave(); }

  /* ================= 動画モーダル ================= */
  let currentVid = null;
  function openVideo(id) {
    const v = allVideos().find((x) => x.id === id);
    if (!v) return;
    currentVid = v;
    const m = moduleById(v.moduleId);
    document.getElementById("modalTitle").textContent = `${m.badge}｜${v.title}`;
    const frame = document.getElementById("modalFrame");
    frame.innerHTML = v.url
      ? `<iframe src="${v.url}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      : `<div class="ph"><div class="pic">${icon("video")}</div><div>この動画はまだ準備中です</div><div class="note" style="color:#9fb4af">data.js の <b>${v.id}</b> に動画URLを設定すると、ここで再生できます。</div></div>`;
    document.getElementById("modalNote").textContent = `${typeLabel[v.type]}・${v.min}分`;
    updateModalBtn();
    document.getElementById("modal").classList.add("open");
  }
  function updateModalBtn() {
    const b = document.getElementById("modalDone"), w = currentVid && isWatched(currentVid.id);
    b.textContent = w ? "視聴済み（取り消す）" : "視聴済みにする";
    b.className = w ? "btn ghost" : "btn";
  }
  function closeModal() { document.getElementById("modal").classList.remove("open"); document.getElementById("modalFrame").innerHTML = ""; currentVid = null; }

  /* ================= トースト ================= */
  let toastT;
  function toast(msg) { const el = document.getElementById("toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("show"), 2400); }

  /* ================= セミナー予約処理 ================= */
  async function bookSeminar(id) {
    const s = seminars.find((x) => x.id === id);
    const { error } = await DB.book(uid, id);
    if (error) { toast(/満席/.test(error.message) ? "満席です" : "予約に失敗しました"); return; }
    myBookings.add(id); if (s) s.booked_count++;
    render(); applyActive();
    toast("予約しました。カレンダーに追加できます");
    if (s) window.open(gcalUrl(s), "_blank");
  }
  async function cancelSeminar(id) {
    if (!confirm("このセミナーの予約をキャンセルしますか？")) return;
    const s = seminars.find((x) => x.id === id);
    const { error } = await DB.cancel(uid, id);
    if (error) { toast("キャンセルに失敗しました"); return; }
    myBookings.delete(id); if (s && s.booked_count > 0) s.booked_count--;
    render(); applyActive(); toast("予約をキャンセルしました");
  }

  /* ================= 認証 ================= */
  async function enterPortal(user) {
    uid = user.id;
    const [prof, prog, reps, sems, books] = await Promise.all([
      DB.getProfile(uid), DB.getProgress(uid), DB.getReports(uid), DB.getSeminars(), DB.getMyBookings(uid),
    ]);
    if (prof.data) {
      student = { name: prof.data.name || "受講生", cohort: prof.data.cohort || "1期", start_date: prof.data.start_date || "2026-06-01", member_no: prof.data.member_no || "", plan: D.student.plan };
    }
    progress = Object.assign({ watched: {}, tasks: {}, daily: {}, guarantee: {} }, (prog.data && prog.data.data) || {});
    reports = (reps.data || []).map((r) => ({ date: r.report_date, did: r.did, stuck: r.stuck, next: r.next, win: r.win }));
    seminars = sems.data || [];
    myBookings = new Set((books.data || []).map((b) => b.seminar_id));
    const nv = nextVideo(); openModules.clear(); openModules.add(nv ? nv.moduleId : 0);
    document.body.classList.add("authed");
    render(); route();
  }
  function showLogin() { document.body.classList.remove("authed"); setTimeout(() => document.getElementById("li-no").focus(), 50); }

  async function doLogin(e) {
    e.preventDefault();
    const no = document.getElementById("li-no").value.trim();
    const pw = document.getElementById("li-pw").value;
    const btn = document.getElementById("loginBtn"), err = document.getElementById("loginErr");
    err.classList.remove("show");
    if (!no || !pw) { err.textContent = "会員番号とパスワードを入力してください"; err.classList.add("show"); return; }
    btn.disabled = true; btn.textContent = "ログイン中…";
    const { data, error } = await DB.login(no, pw);
    if (error || !data.session) { err.textContent = "会員番号またはパスワードが違います"; err.classList.add("show"); btn.disabled = false; btn.textContent = "ログイン"; return; }
    document.getElementById("li-pw").value = "";
    await enterPortal(data.user);
    btn.disabled = false; btn.textContent = "ログイン";
  }
  async function doLogout() { await DB.logout(); location.reload(); }

  /* ================= イベント ================= */
  const val = (id) => (document.getElementById(id)?.value || "").trim();
  function bind() {
    document.getElementById("loginForm").addEventListener("submit", doLogin);
    document.getElementById("logoutBtn").addEventListener("click", doLogout);
    window.addEventListener("hashchange", route);
    document.getElementById("hamburger").addEventListener("click", () => document.getElementById("app").classList.toggle("menu-open"));
    document.getElementById("backdrop").addEventListener("click", () => document.getElementById("app").classList.remove("menu-open"));

    document.body.addEventListener("click", async (e) => {
      const t = e.target.closest("[data-watch],[data-open-video],[data-toggle-module],[data-task],[data-daily],[data-guarantee],[data-nav],[data-close],[data-noop],[data-book],[data-cancel]");
      if (t) {
        if (t.dataset.noop !== undefined) { e.preventDefault(); return; }
        if (t.dataset.close !== undefined) { closeModal(); return; }
        if (t.dataset.nav) { e.preventDefault(); location.hash = t.dataset.nav; return; }
        if (t.dataset.openVideo) { e.preventDefault(); openVideo(t.dataset.openVideo); return; }
        if (t.dataset.book) { e.preventDefault(); bookSeminar(t.dataset.book); return; }
        if (t.dataset.cancel) { e.preventDefault(); cancelSeminar(t.dataset.cancel); return; }
        if (t.dataset.watch) { progress.watched[t.dataset.watch] = !progress.watched[t.dataset.watch]; refresh(); return; }
        if (t.dataset.toggleModule) { const id = Number(t.dataset.toggleModule); openModules.has(id) ? openModules.delete(id) : openModules.add(id); render(); applyActive(); return; }
        if (t.dataset.task) { progress.tasks[t.dataset.task] = !progress.tasks[t.dataset.task]; refresh(); return; }
        if (t.dataset.daily) { const k = keyOf(TODAY); progress.daily[k] = progress.daily[k] || {}; progress.daily[k][t.dataset.daily] = !progress.daily[k][t.dataset.daily]; refresh(); return; }
        if (t.dataset.guarantee) { progress.guarantee[t.dataset.guarantee] = !progress.guarantee[t.dataset.guarantee]; refresh(); return; }
      }
      if (e.target.closest("#saveReport")) {
        const r = { date: keyOf(TODAY), did: val("r-did"), stuck: val("r-stuck"), next: val("r-next"), win: val("r-win") };
        if (!r.did && !r.stuck && !r.next) { toast("最低1つは記入してください"); return; }
        const btn = e.target.closest("#saveReport"); btn.disabled = true;
        const { error } = await DB.saveReport(uid, r);
        if (error) { toast("保存に失敗しました"); btn.disabled = false; return; }
        const { data } = await DB.getReports(uid);
        reports = (data || []).map((x) => ({ date: x.report_date, did: x.did, stuck: x.stuck, next: x.next, win: x.win }));
        render(); applyActive(); toast("日報を保存しました");
      }
      if (e.target.closest("#copyReport")) {
        const txt = `【日報 ${keyOf(TODAY)}】\n①やったこと: ${val("r-did")}\n②詰まり/質問: ${val("r-stuck")}\n③明日の最小1アクション: ${val("r-next")}\n${val("r-win") ? "Win: " + val("r-win") : ""}`.trim();
        navigator.clipboard?.writeText(txt).then(() => toast("LINE用にコピーしました"), () => toast("コピーに失敗しました"));
      }
    });

    document.getElementById("modalDone").addEventListener("click", () => {
      if (!currentVid) return;
      progress.watched[currentVid.id] = !progress.watched[currentVid.id];
      render(); applyActive(); scheduleSave(); updateModalBtn();
      toast(isWatched(currentVid.id) ? "視聴済みにしました" : "視聴済みを取り消しました");
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
  }

  /* ================= 初期化 ================= */
  async function init() {
    bind();
    try {
      const user = await DB.currentUser();
      if (user) await enterPortal(user);
      else showLogin();
    } catch (err) {
      console.error(err); showLogin();
    }
    document.body.classList.remove("booting");
  }
  init();
})();
