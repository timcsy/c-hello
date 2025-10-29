// UI 控制器模組 - DOM 操作與更新
export class UIController {
  constructor() {
    this.morseDisplay = document.getElementById('morse-display');
    this.textDisplay = document.getElementById('text-display');
    this.stats = document.getElementById('stats');
    this.inputArea = document.getElementById('input-area');
    this.visualFeedback = document.getElementById('visual-feedback');
  }

  /**
   * 更新摩斯碼顯示 (符號版)
   */
  updateMorseSymbols(morse) {
    if (this.morseDisplay) {
      this.morseDisplay.textContent = morse || '待輸入...';
    }
  }

  /**
   * 更新已解碼文字顯示
   */
  updateDecodedText(text) {
    if (this.textDisplay) {
      this.textDisplay.textContent = text || '';
    }
  }

  /**
   * 更新統計數據
   */
  updateStats(charCount, correctCount = null, accuracy = null, duration = null) {
    if (!this.stats) return;

    let html = `<p>字元數: ${charCount}</p>`;
    if (correctCount !== null) {
      html += `<p>正確數: ${correctCount}</p>`;
    }
    if (accuracy !== null) {
      html += `<p>準確率: ${accuracy}%</p>`;
    }
    if (duration !== null) {
      html += `<p>練習時長: ${duration}s</p>`;
    }
    this.stats.innerHTML = html;
  }

  /**
   * 視覺反饋 (點或劃)
   */
  showVisualFeedback(type) {
    if (!this.visualFeedback) return;

    const className = type === 'dit' ? 'feedback-dit' : 'feedback-dah';
    this.visualFeedback.classList.add(className);

    setTimeout(() => {
      this.visualFeedback.classList.remove(className);
    }, type === 'dit' ? 100 : 300);
  }

  /**
   * 顯示挑戰字母
   */
  showChallengeChar(char) {
    const challengeDisplay = document.getElementById('challenge-char');
    if (challengeDisplay) {
      challengeDisplay.textContent = char;
    }
  }

  /**
   * 顯示正確/錯誤反饋
   */
  showCorrectness(isCorrect) {
    const feedbackEl = document.getElementById('correctness-feedback');
    if (!feedbackEl) return;

    feedbackEl.textContent = isCorrect ? '✓ 正確!' : '✗ 錯誤!';
    feedbackEl.className = isCorrect ? 'correct' : 'incorrect';
  }

  /**
   * 清空所有顯示
   */
  clear() {
    this.updateMorseSymbols('');
    this.updateDecodedText('');
    this.updateStats(0);
  }
}

export default UIController;
