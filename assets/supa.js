/* =====================================================================
 * AIBONNY ポータル ｜ Supabase データアクセス層
 * 認証（会員番号＋パスワード）・進捗・日報・セミナー予約をまとめて扱う。
 * ===================================================================== */
(function () {
  "use strict";
  const SB = window.supabase.createClient(AIBONNY_CONFIG.url, AIBONNY_CONFIG.key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });

  const emailOf = (memberNo) =>
    String(memberNo).trim().toLowerCase() + "@" + AIBONNY_CONFIG.emailDomain;

  window.DB = {
    client: SB,

    /* ---- 認証 ---- */
    async currentUser() {
      const { data } = await SB.auth.getSession();
      return data.session ? data.session.user : null;
    },
    async login(memberNo, password) {
      return SB.auth.signInWithPassword({ email: emailOf(memberNo), password });
    },
    async logout() { return SB.auth.signOut(); },

    /* ---- プロフィール / 進捗 / 日報 ---- */
    async getProfile(uid) {
      return SB.from("profiles").select("*").eq("id", uid).single();
    },
    async getProgress(uid) {
      return SB.from("user_progress").select("data").eq("user_id", uid).maybeSingle();
    },
    async saveProgress(uid, data) {
      return SB.from("user_progress").upsert(
        { user_id: uid, data, updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
    },
    async getReports(uid) {
      return SB.from("reports").select("*").eq("user_id", uid).order("report_date", { ascending: false });
    },
    async saveReport(uid, r) {
      return SB.from("reports").upsert(
        { user_id: uid, report_date: r.date, did: r.did, stuck: r.stuck, next: r.next, win: r.win, hours: r.hours },
        { onConflict: "user_id,report_date" }
      );
    },
    async getWeeklyReports(uid) {
      return SB.from("weekly_reports").select("*").eq("user_id", uid).order("week_start", { ascending: false });
    },
    async saveWeeklyReport(uid, r) {
      return SB.from("weekly_reports").insert({
        user_id: uid,
        week_start: r.week_start,
        sales_amount: r.sales_amount,
        deals_text: r.deals_text,
        sales_activity_count: r.sales_activity_count,
        note: r.note,
      });
    },
    async getSubmissions(uid) {
      return SB.from("submissions").select("*").eq("user_id", uid).order("created_at", { ascending: false });
    },
    async saveSubmission(uid, s) {
      return SB.from("submissions").insert({
        user_id: uid,
        module_id: s.module_id,
        title: s.title,
        url: s.url,
        memo: s.memo,
      });
    },

    /* ---- セミナー / 予約 ---- */
    async getSeminars() {
      return SB.from("seminars").select("*").order("starts_at", { ascending: true });
    },
    async getMyBookings(uid) {
      return SB.from("seminar_bookings").select("seminar_id").eq("user_id", uid);
    },
    async book(uid, seminarId) {
      return SB.from("seminar_bookings").insert({ user_id: uid, seminar_id: seminarId });
    },
    async cancel(uid, seminarId) {
      return SB.from("seminar_bookings").delete().eq("user_id", uid).eq("seminar_id", seminarId);
    },
  };
})();
