export type LessonId = 
  | 'intro'
  | 'mouse'
  | 'keyboard'
  | 'desktop'
  | 'internet'
  | 'safety';

export type ViewMode = 
  | 'home'
  | 'roadmap'
  | 'lesson'
  | 'practice'
  | 'progress';

export interface LessonMeta {
  id: LessonId;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  stepsCount: number;
}

export interface UserProgress {
  completedLessons: LessonId[];
  currentLesson: LessonId;
  currentStepIndex: number;
  unlockedLessons: LessonId[];
  starsCount: number;
  lastActive: string;
}

export type TextSize = 'normal' | 'large' | 'huge';

export interface AppSettings {
  textSize: TextSize;
  highContrast: boolean;
  soundEnabled: boolean;
  speechRate: number; // 0.8 to 1.0 for calm comprehension
}
