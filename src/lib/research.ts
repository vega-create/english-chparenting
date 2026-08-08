/**
 * 研究相關的固定資訊（同意書與隱私權政策共用）。
 *
 * ⚠️ RESEARCH_CONTACT 目前是空的 —— 填一個「願意公開在網站上」的信箱。
 *    不要填私人 Gmail，建議另開一個像 research@chparenting.com 之類的。
 *    IRB 送審時一定會要求同意書上有聯絡方式，讓家長能提問或要求撤回。
 *    空值時介面會自動隱藏那一行，不會出現「聯絡：」後面沒東西的狀況。
 */
export const RESEARCH_CONTACT = '';

/**
 * 研究主持人（對外顯示用）。
 * ⚠️ 也是空的 —— 填你要對外用的姓名，例如「林○○」或直接寫本名。
 *    我不知道你想怎麼署名，所以留空給你填，空值時介面會隱藏這一行。
 */
export const RESEARCH_PI = '';

/** 資料保存期限（年）。IRB 一定會問，先講死比事後補好。 */
export const RETENTION_YEARS = 5;

/** 網站正式名稱 */
export const SITE_NAME = '冒險英語 Adventure English';
