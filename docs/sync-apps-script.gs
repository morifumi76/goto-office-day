/**
 * 出社カレンダー 同期用 Apps Script
 * --------------------------------------------------
 * Googleスプレッドシートに紐づくスクリプトとして使う。
 * シートの1列目=日付(YYYY-MM-DD)、2列目=種類(office/home) を1行ずつ保存する。
 * 設定手順は docs/sync-setup.md を参照。
 */

// データを書き込むシート名（自動で作られる）
const SHEET_NAME = "data";

// データ用シートを取得（無ければ作る）。日付列は文字列扱いにして自動変換を防ぐ。
function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["date", "type"]);
  }
  sh.getRange("A:A").setNumberFormat("@"); // A列を「書式なしテキスト」にして日付の自動変換を防ぐ
  return sh;
}

// 値を "YYYY-MM-DD" 文字列に正規化（万一Date型で入っていても揃える）
function ymd_(v) {
  if (v instanceof Date) {
    return Utilities.formatDate(v, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return String(v).trim();
}

// 全データを読み出す → { office: [...], home: [...], gray: [...] }
function readAll_() {
  const sh = getSheet_();
  const last = sh.getLastRow();
  const office = [], home = [], gray = [];
  if (last >= 2) {
    const rows = sh.getRange(2, 1, last - 1, 2).getValues();
    rows.forEach(r => {
      const date = ymd_(r[0]);
      const type = String(r[1]).trim();
      if (!date) return;
      if (type === "office") office.push(date);
      else if (type === "home") home.push(date);
      else if (type === "gray") gray.push(date);
    });
  }
  return { office: office, home: home, gray: gray };
}

// JSONを返す共通処理
function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// 読み込み（ウィジェット起動時・タブ復帰時に呼ばれる）
function doGet(e) {
  return json_(readAll_());
}

// 保存（1日分の変更。type は "office" / "home" / "none"）
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // 同時書き込みの衝突を防ぐ
  try {
    const body = JSON.parse(e.postData.contents);
    const date = String(body.date || "").trim();
    const type = String(body.type || "").trim();
    if (date) {
      const sh = getSheet_();
      const last = sh.getLastRow();
      // 既存の同じ日付の行を削除（下から消すと行番号がずれない）
      if (last >= 2) {
        const dates = sh.getRange(2, 1, last - 1, 1).getValues();
        for (let i = dates.length - 1; i >= 0; i--) {
          if (ymd_(dates[i][0]) === date) sh.deleteRow(i + 2);
        }
      }
      // none 以外なら新しい行を追加
      if (type === "office" || type === "home" || type === "gray") {
        sh.appendRow([date, type]);
      }
    }
    return json_(readAll_());
  } finally {
    lock.releaseLock();
  }
}
