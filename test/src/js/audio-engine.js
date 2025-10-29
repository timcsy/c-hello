// 音頻引擎模組 - Web Audio API 封裝
export class AudioEngine {
  constructor() {
    // 嘗試初始化 Web Audio API
    const audioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioContext) {
      console.warn('Web Audio API 不支援，將使用視覺回饋模式');
      this.ctx = null;
      return;
    }

    this.ctx = new audioContext();
    this.isSupported = true;
    this.isMuted = false;
    this.volume = 0.5; // 0-1 音量級別

    // 參數 (毫秒)
    this.ditDuration = 100;
    this.dahDuration = 300;
  }

  /**
   * 設定音頻參數
   * @param {Object} params - 參數對象
   */
  setParams({ ditDuration, dahDuration }) {
    if (ditDuration !== undefined) this.ditDuration = ditDuration;
    if (dahDuration !== undefined) this.dahDuration = dahDuration;
  }

  /**
   * 播放「點」音
   */
  playDit() {
    if (this.isMuted || !this.ctx) return;

    try {
      this._playTone(this.ditDuration);
    } catch (e) {
      console.error('播放點音頻失敗:', e);
    }
  }

  /**
   * 播放「劃」音
   */
  playDah() {
    if (this.isMuted || !this.ctx) return;

    try {
      this._playTone(this.dahDuration);
    } catch (e) {
      console.error('播放劃音頻失敗:', e);
    }
  }

  /**
   * 內部方法 - 播放單音
   * @private
   */
  _playTone(duration) {
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.frequency.value = 600; // 600 Hz 摩斯標準音
    gain.gain.setValueAtTime(this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration / 1000);

    osc.start(now);
    osc.stop(now + duration / 1000);
  }

  /**
   * 設定音量
   * @param {number} vol - 音量 (0-1)
   */
  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  /**
   * 切換靜音
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * 檢查 Web Audio API 是否支援
   */
  isAudioSupported() {
    return this.isSupported && this.ctx !== null;
  }
}

export default AudioEngine;
