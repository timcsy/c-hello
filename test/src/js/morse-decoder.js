// 摩斯解碼模組 - 摩斯碼轉文字
import { reverseMorseDictionary } from './morse-dictionary.js';

/**
 * 將摩斯碼轉換為文字
 * @param {string} morse - 摩斯碼序列 (以空格分隔字符)
 * @returns {string} 解碼後的文字
 */
export function morseToText(morse) {
  return morse
    .split(' ')
    .map((code) => reverseMorseDictionary[code] || '?')
    .join('');
}

/**
 * 解碼單個摩斯碼字符
 * @param {string} morse - 單個摩斯碼
 * @returns {string} 解碼後的字符
 */
export function decodeMorseChar(morse) {
  return reverseMorseDictionary[morse] || '?';
}

/**
 * 驗證摩斯碼是否有效 (僅包含 . 和 -)
 * @param {string} morse - 摩斯碼
 * @returns {boolean} 是否有效
 */
export function isValidMorse(morse) {
  return /^[.\-]+$/.test(morse);
}
