// LocalStorage 管理模組
const STORAGE_KEY = 'morse-trainer-prefs';

const defaultPrefs = {
  ditDuration: 100,
  dahDuration: 300,
  charInterval: 300,
  wordInterval: 700,
  volume: 0.5,
  isMuted: false,
  mode: 'free', // 'free' 或 'challenge'
};

/**
 * 取得所有偏好設定
 */
export function getPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return { ...defaultPrefs };
    }
    return { ...defaultPrefs, ...JSON.parse(stored) };
  } catch (e) {
    console.warn('讀取 LocalStorage 失敗:', e);
    return { ...defaultPrefs };
  }
}

/**
 * 保存偏好設定
 * @param {Object} prefs - 新的偏好設定
 */
export function savePreferences(prefs) {
  try {
    const current = getPreferences();
    const merged = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn('保存 LocalStorage 失敗:', e);
  }
}

/**
 * 取得特定偏好
 * @param {string} key - 偏好鍵值
 */
export function getPreference(key) {
  const prefs = getPreferences();
  return prefs[key] !== undefined ? prefs[key] : defaultPrefs[key];
}

/**
 * 設定特定偏好
 * @param {string} key - 偏好鍵值
 * @param {any} value - 偏好值
 */
export function setPreference(key, value) {
  const prefs = getPreferences();
  prefs[key] = value;
  savePreferences(prefs);
}

/**
 * 重設為預設值
 */
export function resetToDefaults() {
  localStorage.removeItem(STORAGE_KEY);
}
