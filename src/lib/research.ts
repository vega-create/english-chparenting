/**
 * 研究相關的固定資訊（同意書與隱私權政策共用）。
 *
 * 這兩個值會**公開顯示**在 /privacy 和家長中心的同意書上。
 * 研究倫理要求參與者隨時能找到研究者提問或要求退出，
 * IRB 送審時同意書上沒有聯絡方式會被退件。
 *
 * 信箱用公司信箱不要用私人 Gmail —— 公開頁面上的地址會被爬蟲抓去發垃圾信，
 * 而且貼出去就撤不回來了。要換的話改這裡就好，兩個頁面會一起更新。
 */
export const RESEARCH_CONTACT = 'hello@chparenting.com';

/** 研究主持人（對外顯示用） */
export const RESEARCH_PI = '林央珽';

/** 資料保存期限（年）。IRB 一定會問，先講死比事後補好。 */
export const RETENTION_YEARS = 5;

/** 網站正式名稱 */
export const SITE_NAME = '冒險英語 Adventure English';
