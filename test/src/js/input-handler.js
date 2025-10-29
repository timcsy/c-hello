// 輸入處理器模組 - 鍵盤和觸控事件
export class InputHandler {
  constructor(onDit, onDah, onCharEnd) {
    this.onDit = onDit; // 短按回調
    this.onDah = onDah; // 長按回調
    this.onCharEnd = onCharEnd; // 字符結束回調

    this.isPressed = false;
    this.pressStartTime = null;
    this.touchId = null; // 首個觸控點 ID

    // 參數 (毫秒)
    this.ditThreshold = 100; // Dit 與 Dah 的閾值
    this.charEndTimeout = 300; // 字符結束延遲

    this.charEndTimer = null;
  }

  /**
   * 設定時間參數
   */
  setParams({ ditDuration, charInterval }) {
    if (ditDuration !== undefined) this.ditThreshold = ditDuration;
    if (charInterval !== undefined) this.charEndTimeout = charInterval;
  }

  /**
   * 初始化事件監聽
   */
  init(keyCode = ' ') {
    // 鍵盤事件
    document.addEventListener('keydown', (e) => {
      if (e.code === `Space` || e.key === ' ') {
        e.preventDefault();
        this._onPressStart();
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.code === `Space` || e.key === ' ') {
        e.preventDefault();
        this._onPressEnd();
      }
    });

    // 觸控事件
    const inputArea = document.getElementById('input-area');
    if (inputArea) {
      inputArea.addEventListener('touchstart', (e) => this._onTouchStart(e), false);
      inputArea.addEventListener('touchend', (e) => this._onTouchEnd(e), false);
    }
  }

  /**
   * 按鍵/觸控開始
   * @private
   */
  _onPressStart() {
    if (this.isPressed) return; // 已在按下狀態

    this.isPressed = true;
    this.pressStartTime = Date.now();

    // 清除上一個字符結束計時器
    if (this.charEndTimer) {
      clearTimeout(this.charEndTimer);
      this.charEndTimer = null;
    }
  }

  /**
   * 按鍵/觸控結束
   * @private
   */
  _onPressEnd() {
    if (!this.isPressed) return;

    this.isPressed = false;
    const duration = Date.now() - this.pressStartTime;

    // 判斷 Dit 或 Dah
    if (duration <= this.ditThreshold) {
      this.onDit();
    } else {
      this.onDah();
    }

    // 設定字符結束計時器
    if (this.charEndTimer) clearTimeout(this.charEndTimer);
    this.charEndTimer = setTimeout(() => {
      this.onCharEnd();
      this.charEndTimer = null;
    }, this.charEndTimeout);
  }

  /**
   * 觸控開始
   * @private
   */
  _onTouchStart(e) {
    if (this.touchId !== null) return; // 已有首個觸控點

    // 記錄首個觸控點 ID
    if (e.touches.length > 0) {
      this.touchId = e.touches[0].identifier;
      this._onPressStart();
    }
  }

  /**
   * 觸控結束
   * @private
   */
  _onTouchEnd(e) {
    if (this.touchId === null) return;

    // 檢查首個觸控點是否已釋放
    let touchFound = false;
    for (let i = 0; i < e.touches.length; i++) {
      if (e.touches[i].identifier === this.touchId) {
        touchFound = true;
        break;
      }
    }

    // 首個觸控點已釋放
    if (!touchFound) {
      this._onPressEnd();
      this.touchId = null;
    }
  }
}

export default InputHandler;
