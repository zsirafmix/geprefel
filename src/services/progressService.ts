import { LessonId, UserProgress, AppSettings } from '../types';

const PROGRESS_KEY = 'gepre_fel_progress_v1';
const SETTINGS_KEY = 'gepre_fel_settings_v1';

export const ALL_LESSONS: { id: LessonId; title: string; subtitle: string; icon: string; description: string }[] = [
  {
    id: 'intro',
    title: 'Ismerkedés a számítógéppel',
    subtitle: 'Monitor, egér, billentyűzet és a bekapcsolás',
    icon: '🖥️',
    description: 'Nézzük meg egyszerűen a számítógép legfontosabb részeit és működésüket.'
  },
  {
    id: 'mouse',
    title: 'Egér használata',
    subtitle: 'Mozgatás, sima kattintás és dupla kattintás',
    icon: '🖱️',
    description: 'Tanuld meg biztonságosan irányítani a nyilat és megnyitni a dolgokat.'
  },
  {
    id: 'keyboard',
    title: 'Billentyűzet és gépelés',
    subtitle: 'Betűk, szóköz, Enter, Backspace és Shift',
    icon: '⌨️',
    description: 'Írd be a neved, tanulj meg javítani és egyszerű mondatokat írni.'
  },
  {
    id: 'desktop',
    title: 'Virtuális számítógép',
    subtitle: 'Asztal, ikonok, mappák és jegyzetek',
    icon: '💻',
    description: 'Biztonságos próbaterület az asztali ikonok és programok megnyitásához.'
  },
  {
    id: 'internet',
    title: 'Internet használata',
    subtitle: 'Keresés, időjárás, receptek és a Vissza gomb',
    icon: '🌐',
    description: 'Tanuld meg, hogyan tudsz keresni az interneten és hogyan léphetsz vissza.'
  },
  {
    id: 'safety',
    title: 'Biztonság a számítógépen',
    subtitle: 'Csalások felismerése és aranyszabályok',
    icon: '🛡️',
    description: 'Hogyan maradj mindig biztonságban a kéretlen levelektől és furcsa üzenetektől.'
  }
];

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  currentLesson: 'intro',
  currentStepIndex: 0,
  unlockedLessons: ['intro'],
  starsCount: 0,
  lastActive: new Date().toISOString()
};

const DEFAULT_SETTINGS: AppSettings = {
  textSize: 'large', // default large font for senior readability
  highContrast: false,
  soundEnabled: true,
  speechRate: 0.88
};

export const progressService = {
  getProgress(): UserProgress {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_PROGRESS;
  },

  saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        ...progress,
        lastActive: new Date().toISOString()
      }));
    } catch {
      // Ignore
    }
  },

  completeLesson(lessonId: LessonId): UserProgress {
    const p = this.getProgress();
    const completed = new Set(p.completedLessons);
    completed.add(lessonId);

    // Unlock next lesson
    const currentIndex = ALL_LESSONS.findIndex(l => l.id === lessonId);
    const unlocked = new Set(p.unlockedLessons);
    unlocked.add(lessonId);
    if (currentIndex + 1 < ALL_LESSONS.length) {
      unlocked.add(ALL_LESSONS[currentIndex + 1].id);
    }

    const updated: UserProgress = {
      ...p,
      completedLessons: Array.from(completed),
      unlockedLessons: Array.from(unlocked),
      starsCount: p.starsCount + 3,
      currentStepIndex: 0
    };

    this.saveProgress(updated);
    return updated;
  },

  resetProgress(): UserProgress {
    this.saveProgress(DEFAULT_PROGRESS);
    return DEFAULT_PROGRESS;
  },

  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }
};
