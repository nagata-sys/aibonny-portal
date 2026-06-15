/* =====================================================================
 * AIBONNY ポータル ｜ Supabase 接続設定
 * ---------------------------------------------------------------------
 * この url / key は「公開鍵（publishable key）」です。フロントに置いてOKで、
 * データはSupabase側のRLS（行レベルセキュリティ）で保護されています。
 * 別プロジェクトに切り替える場合はここだけ書き換えてください。
 * ===================================================================== */
const AIBONNY_CONFIG = {
  url: "https://dncrrancsdoyvnfgatll.supabase.co",
  key: "sb_publishable_0EXnnF-4HFGYrijgx6kSzg_yF3G9Ixx",
  // ログイン時、会員番号にこのドメインを付けてSupabase Authのメールにマッピングします
  emailDomain: "aibonny.portal",
};
