// 主應用邏輯 - 整合所有模組
import AudioEngine from './audio-engine.js';
import { decodeMorseChar } from './morse-decoder.js';
import { textToMorse } from './morse-encoder.js';
import UIController from './ui-controller.js';
import InputHandler from './input-handler.js';
import { getPreferences, savePreferences, setPreference } from './storage.js';

class MorseTrainerApp {
  constructor() {
    this.audioEngine = new AudioEngine();
    this.ui = new UIController();
    this.prefs = getPreferences();

    // 狀態管理
    this.currentMode = this.prefs.mode || 'free'; // 'free' 或 'challenge'
    this.currentMorse = ''; // 當前摩斯碼序列
    this.decodedText = ''; // 已解碼文字
    this.charCount = 0;
    this.startTime = null;

    // 挑戰模式特定
    this.challengeChar = 'A';
    this.correctCount = 0;
    this.challengeCount = 0;

    // 字符間隔計時器
    this.charEndTimer = null;

    this.init();
  }

  /**
   * 應用初始化
   */
  init() {
    this._setupAudio();
    this._setupInputHandler();
    this._setupUIListeners();
    this._setupParamListeners();
    this._loadPreferences();
    this._updateDisplay();

    console.log('摩斯密碼練習應用已初始化');
  }

  /**
   * 設置音頻引擎
   * @private
   */
  _setupAudio() {
    this.audioEngine.setParams({
      ditDuration: this.prefs.ditDuration,
      dahDuration: this.prefs.dahDuration,
    });
    this.audioEngine.setVolume(this.prefs.volume);
    this.audioEngine.isMuted = this.prefs.isMuted;
  }

  /**
   * 設置輸入處理器
   * @private
   */
  _setupInputHandler() {
    this.inputHandler = new InputHandler(
      () => this._onDit(),
      () => this._onDah(),
      () => this._onCharEnd()
    );

    this.inputHandler.setParams({
      ditDuration: this.prefs.ditDuration,
      charInterval: this.prefs.charInterval,
    });

    this.inputHandler.init();
  }

  /**
   * 設置 UI 事件監聽器
   * @private
   */
  _setupUIListeners() {
    // 標籤切換
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this._switchMode(e.target.dataset.mode);
      });
    });

    // 清空按鈕
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this._clear());
    }

    // 重設按鈕
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this._resetDefaults());
    }

    // 靜音按鈕
    const muteToggle = document.getElementById('mute-toggle');
    if (muteToggle) {
      muteToggle.checked = this.audioEngine.isMuted;
      muteToggle.addEventListener('change', (e) => {
        this.audioEngine.isMuted = e.target.checked;
        setPreference('isMuted', e.target.checked);
      });
    }
  }

  /**
   * 設置參數監聽器
   * @private
   */
  _setupParamListeners() {
    // Dit 時長
    const ditDurationSlider = document.getElementById('dit-duration');
    if (ditDurationSlider) {
      ditDurationSlider.value = this.prefs.ditDuration;
      ditDurationSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.prefs.ditDuration = value;
        this.audioEngine.ditDuration = value;
        this.inputHandler.ditThreshold = value;
        setPreference('ditDuration', value);
        document.getElementById('dit-value').textContent = value;
      });
      document.getElementById('dit-value').textContent = this.prefs.ditDuration;
    }

    // Dah 時長
    const dahDurationSlider = document.getElementById('dah-duration');
    if (dahDurationSlider) {
      dahDurationSlider.value = this.prefs.dahDuration;
      dahDurationSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.prefs.dahDuration = value;
        this.audioEngine.dahDuration = value;
        setPreference('dahDuration', value);
        document.getElementById('dah-value').textContent = value;
      });
      document.getElementById('dah-value').textContent = this.prefs.dahDuration;
    }

    // 字元間隔
    const charIntervalSlider = document.getElementById('char-interval');
    if (charIntervalSlider) {
      charIntervalSlider.value = this.prefs.charInterval;
      charIntervalSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.prefs.charInterval = value;
        this.inputHandler.charEndTimeout = value;
        setPreference('charInterval', value);
        document.getElementById('char-value').textContent = value;
      });
      document.getElementById('char-value').textContent = this.prefs.charInterval;
    }

    // 字組間隔 (預留，暫未使用)
    const wordIntervalSlider = document.getElementById('word-interval');
    if (wordIntervalSlider) {
      wordIntervalSlider.value = this.prefs.wordInterval;
      wordIntervalSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        this.prefs.wordInterval = value;
        setPreference('wordInterval', value);
        document.getElementById('word-value').textContent = value;
      });
      document.getElementById('word-value').textContent = this.prefs.wordInterval;
    }

    // 音量
    const volumeSlider = document.getElementById('volume');
    if (volumeSlider) {
      volumeSlider.value = this.prefs.volume * 100;
      volumeSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        const vol = value / 100;
        this.prefs.volume = vol;
        this.audioEngine.setVolume(vol);
        setPreference('volume', vol);
        document.getElementById('volume-value').textContent = value + '%';
      });
      document.getElementById('volume-value').textContent = Math.round(this.prefs.volume * 100) + '%';
    }
  }

  /**
   * 加載偏好設定
   * @private
   */
  _loadPreferences() {
    const muteToggle = document.getElementById('mute-toggle');
    if (muteToggle) {
      muteToggle.checked = this.prefs.isMuted;
    }
  }

  /**
   * 播放「點」- 回調
   * @private
   */
  _onDit() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    this.currentMorse += '.';
    this.audioEngine.playDit();
    this.ui.showVisualFeedback('dit');
    this._updateDisplay();
  }

  /**
   * 播放「劃」- 回調
   * @private
   */
  _onDah() {
    if (!this.startTime) {
      this.startTime = Date.now();
    }

    this.currentMorse += '-';
    this.audioEngine.playDah();
    this.ui.showVisualFeedback('dah');
    this._updateDisplay();
  }

  /**
   * 字符結束 - 回調
   * @private
   */
  _onCharEnd() {
    if (this.currentMorse === '') return;

    const char = decodeMorseChar(this.currentMorse);
    this.decodedText += char;
    this.charCount++;

    // 挑戰模式 - 驗證正確性
    if (this.currentMode === 'challenge') {
      this._validateChallenge(this.currentMorse, char);
    }

    // 重置當前摩斯碼，準備下一個字符
    this.currentMorse = '';
    this._updateDisplay();
  }

  /**
   * 驗證挑戰模式輸入
   * @private
   */
  _validateChallenge(morse, char) {
    const morse2 = textToMorse(this.challengeChar);
    const isCorrect = morse === morse2;

    this.ui.showCorrectness(isCorrect);
    if (isCorrect) {
      this.correctCount++;
    }

    this.challengeCount++;

    // 生成下一個待練習字母
    setTimeout(() => {
      this._generateChallenge();
    }, 800);
  }

  /**
   * 生成下一個挑戰字母
   * @private
   */
  _generateChallenge() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.challengeChar = chars[Math.floor(Math.random() * chars.length)];
    this.ui.showChallengeChar(this.challengeChar);
    this.decodedText = ''; // 清空文字用於下一個字母
  }

  /**
   * 切換練習模式
   * @private
   */
  _switchMode(mode) {
    if (mode === this.currentMode) return;

    this.currentMode = mode;
    setPreference('mode', mode);

    // 更新標籤按鈕狀態
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // 顯示/隱藏挑戰模式區域
    const challengeSection = document.getElementById('challenge-section');
    if (challengeSection) {
      challengeSection.classList.toggle('hidden', mode !== 'challenge');
    }

    // 清空並重置
    this._clear();

    if (mode === 'challenge') {
      this._generateChallenge();
    }
  }

  /**
   * 清空當前輸入與顯示
   * @private
   */
  _clear() {
    this.currentMorse = '';
    this.decodedText = '';
    this.charCount = 0;
    this.correctCount = 0;
    this.challengeCount = 0;
    this.startTime = null;
    this.ui.clear();
  }

  /**
   * 重設為預設值
   * @private
   */
  _resetDefaults() {
    if (confirm('確定要重設所有偏好設定為預設值嗎？')) {
      localStorage.removeItem('morse-trainer-prefs');
      location.reload();
    }
  }

  /**
   * 更新顯示
   * @private
   */
  _updateDisplay() {
    this.ui.updateMorseSymbols(this.currentMorse);
    this.ui.updateDecodedText(this.decodedText);

    // 更新統計數據
    let duration = null;
    if (this.startTime) {
      duration = Math.floor((Date.now() - this.startTime) / 1000);
    }

    if (this.currentMode === 'challenge') {
      const accuracy = this.challengeCount > 0
        ? Math.round((this.correctCount / this.challengeCount) * 100)
        : 0;
      this.ui.updateStats(this.charCount, this.correctCount, accuracy, duration);
    } else {
      this.ui.updateStats(this.charCount, null, null, duration);
    }
  }
}

// 應用啟動
document.addEventListener('DOMContentLoaded', () => {
  window.app = new MorseTrainerApp();
});
