// 摩斯編碼模組 - 文字轉摩斯碼
import { morseDictionary } from './morse-dictionary.js';

/**
 * 將文字轉換為摩斯碼序列
 * @param {string} text - 待轉換文字
 * @returns {string} 摩斯碼序列 (以空格分隔字符)
 */
export function textToMorse(text) {
  return text
    .toUpperCase()
    .split('')
    .map((char) => morseDictionary[char] || '?')
    .join(' ');
}

/**
 * 將文字轉換為摩斯碼陣列 (用於逐字符處理)
 * @param {string} text - 待轉換文字
 * @returns {string[]} 摩斯碼陣列
 */
export function textToMorseArray(text) {
  return text
    .toUpperCase()
    .split('')
    .map((char) => morseDictionary[char] || '?');
}
