class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private huVoice: SpeechSynthesisVoice | null = null;
  private isAvailable: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.isAvailable = true;
      this.initVoice();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize Hungarian voice
    const found = voices.find(v => v.lang.startsWith('hu') || v.lang.includes('HU'));
    if (found) {
      this.huVoice = found;
    }
  }

  public speak(text: string, onEnd?: () => void, rate: number = 0.88) {
    if (!this.synth || !this.isAvailable) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hu-HU';
    if (this.huVoice) {
      utterance.voice = this.huVoice;
    }
    utterance.rate = rate; // Gentle, clear speed for seniors
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return !!(this.synth && this.synth.speaking);
  }
}

export const speechService = new SpeechService();
