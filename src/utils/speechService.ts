export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
}

class SpeechService {
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;
  private currentUtterance: any = null;
  private isPaused = false;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public getPolishVoice(): SpeechSynthesisVoice | null {
    if (!this.isSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith('pl') ||
          v.name.toLowerCase().includes('zosia') ||
          v.name.toLowerCase().includes('paulina') ||
          v.name.toLowerCase().includes('polish')
      ) || null
    );
  }

  public speak(text: string, options: SpeakOptions = {}) {
    this.stop();
    this.isPaused = false;

    const { rate = 1.0, pitch = 1.0, onStart, onEnd, onError } = options;

    if (this.isSupported()) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pl-PL';
        utterance.rate = rate;
        utterance.pitch = pitch;

        const polishVoice = this.getPolishVoice();
        if (polishVoice) {
          utterance.voice = polishVoice;
        }

        utterance.onstart = () => {
          onStart?.();
        };

        utterance.onend = () => {
          this.currentUtterance = null;
          onEnd?.();
        };

        utterance.onerror = (e) => {
          // If canceled intentionally, ignore
          if (e.error === 'canceled' || e.error === 'interrupted') {
            return;
          }
          this.currentUtterance = null;
          onError?.(e);
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
        return;
      } catch (err) {
        console.warn('SpeechSynthesis error, falling back to simulated playback:', err);
      }
    }

    // Fallback simulation for environments without Web Speech API or when disabled
    onStart?.();
    const wordCount = text.split(/\s+/).length;
    // Average 140 words per minute at 1.0x rate
    const estimatedDurationMs = Math.max(3000, ((wordCount / 140) * 60 * 1000) / rate);

    this.fallbackTimer = setTimeout(() => {
      onEnd?.();
    }, estimatedDurationMs);
  }

  public pause() {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.pause();
        this.isPaused = true;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  public resume() {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.resume();
        this.isPaused = false;
      } catch (e) {
        console.warn(e);
      }
    }
  }

  public stop() {
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }

    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn(e);
      }
    }

    this.currentUtterance = null;
    this.isPaused = false;
  }
}

export const speechService = new SpeechService();
