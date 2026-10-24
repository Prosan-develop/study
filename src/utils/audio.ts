// Enhanced SoundEngine with independent BGM, SFX, Voice toggles, and Master Volume control

export interface AudioSettings {
  sfxEnabled: boolean;
  musicEnabled: boolean;
  voiceEnabled: boolean;
  volume: number; // 0 to 1
}

const AUDIO_SETTINGS_KEY = 'khmer_kids_audio_settings_v1';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled: boolean = true;
  private musicEnabled: boolean = false;
  private voiceEnabled: boolean = true;
  private volume: number = 0.8;

  // Background music scheduling
  private bgmIntervalId: number | null = null;
  private bgmNoteIndex: number = 0;
  private isBgmPlaying: boolean = false;

  constructor() {
    this.loadSettings();
  }

  private loadSettings() {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (raw) {
        const parsed: AudioSettings = JSON.parse(raw);
        if (typeof parsed.sfxEnabled === 'boolean') this.sfxEnabled = parsed.sfxEnabled;
        if (typeof parsed.musicEnabled === 'boolean') this.musicEnabled = parsed.musicEnabled;
        if (typeof parsed.voiceEnabled === 'boolean') this.voiceEnabled = parsed.voiceEnabled;
        if (typeof parsed.volume === 'number') this.volume = Math.max(0, Math.min(1, parsed.volume));
      }
    } catch {}
  }

  private saveSettings() {
    if (typeof window === 'undefined') return;
    try {
      const settings: AudioSettings = {
        sfxEnabled: this.sfxEnabled,
        musicEnabled: this.musicEnabled,
        voiceEnabled: this.voiceEnabled,
        volume: this.volume,
      };
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  }

  public getSettings(): AudioSettings {
    return {
      sfxEnabled: this.sfxEnabled,
      musicEnabled: this.musicEnabled,
      voiceEnabled: this.voiceEnabled,
      volume: this.volume,
    };
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    this.saveSettings();
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    this.saveSettings();
    if (enabled) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
  }

  public setVoiceEnabled(enabled: boolean) {
    this.voiceEnabled = enabled;
    this.saveSettings();
  }

  public setMasterVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.saveSettings();
  }

  // Legacy compatibility helpers
  public setMuted(muted: boolean) {
    this.sfxEnabled = !muted;
    this.musicEnabled = !muted;
    this.saveSettings();
    if (muted) {
      this.stopBGM();
    }
  }

  public setVoiceMuted(muted: boolean) {
    this.voiceEnabled = !muted;
    this.saveSettings();
  }

  public getMuted() {
    return !this.sfxEnabled && !this.musicEnabled;
  }

  public getVoiceMuted() {
    return !this.voiceEnabled;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // ==========================================
  // BACKGROUND MUSIC (BGM) SYNTHESIZER
  // Peaceful, cheerful music-box melody loop for kids
  // ==========================================
  private bgmNotes = [
    261.63, // C4
    329.63, // E4
    392.00, // G4
    523.25, // C5
    440.00, // A4
    392.00, // G4
    329.63, // E4
    293.66, // D4
    261.63, // C4
    349.23, // F4
    440.00, // A4
    523.25, // C5
    392.00, // G4
    329.63, // E4
    293.66, // D4
    261.63, // C4
  ];

  public startBGM() {
    if (this.isBgmPlaying) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.bgmNoteIndex = 0;

    // Step every 450ms for a gentle soothing tempo
    this.bgmIntervalId = window.setInterval(() => {
      if (!this.musicEnabled || this.volume <= 0) return;
      this.playBgmNote();
    }, 450);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmIntervalId !== null) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }
  }

  private playBgmNote() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freq = this.bgmNotes[this.bgmNoteIndex % this.bgmNotes.length];
      this.bgmNoteIndex++;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // Soft, pure soothing music-box tone
      osc.frequency.setValueAtTime(freq, now);

      // Low, gentle background gain scaled by master volume (0.05 max)
      const noteGain = 0.05 * this.volume;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(noteGain, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {}
  }

  // ==========================================
  // SOUND EFFECTS (SFX)
  // ==========================================

  // Play a simple pop bubble sound
  public playPop() {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      const targetGain = 0.3 * this.volume;
      gain.gain.setValueAtTime(targetGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }

  // Tactile click for buttons
  public playClick() {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.05);

      const targetGain = 0.2 * this.volume;
      gain.gain.setValueAtTime(targetGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  // Cheerful chime when an answer is correct
  public playCorrect() {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [659.25, 987.77];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        const targetGain = 0.25 * this.volume;
        gain.gain.setValueAtTime(targetGain, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } catch {}
  }

  // Gentle, encouraging "try again" sound
  public playWrong() {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.2);

      const targetGain = 0.18 * this.volume;
      gain.gain.setValueAtTime(targetGain, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Melodic count beep when clicking items 1, 2, 3...
  public playCountBeep(count: number) {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const baseFreq = 300;
      const freq = baseFreq + (count % 10) * 45;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const targetGain = 0.2 * this.volume;
      gain.gain.setValueAtTime(targetGain, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch {}
  }

  // Star collection sparkle
  public playStarCollect() {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        const targetGain = 0.2 * this.volume;
        gain.gain.setValueAtTime(targetGain, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {}
  }

  // Big fanfare for level completion / victory
  public playVictoryFanfare() {
    if (!this.sfxEnabled || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const sequence = [
        { freq: 392.00, delay: 0.0, dur: 0.15 },
        { freq: 523.25, delay: 0.15, dur: 0.15 },
        { freq: 659.25, delay: 0.30, dur: 0.15 },
        { freq: 783.99, delay: 0.45, dur: 0.6 }
      ];

      sequence.forEach(({ freq, delay, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);

        const targetGain = 0.25 * this.volume;
        gain.gain.setValueAtTime(targetGain, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });
    } catch {}
  }

  // Voice narration using Web Speech API
  public speak(text: string, lang: 'km' | 'en' = 'km') {
    if (!this.voiceEnabled || this.volume <= 0 || typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = this.volume;

      if (lang === 'km') {
        utterance.lang = 'km-KH';
      } else {
        utterance.lang = 'en-US';
      }

      window.speechSynthesis.speak(utterance);
    } catch {}
  }
}

export const sound = new SoundEngine();
