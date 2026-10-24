export type Language = 'km' | 'en';

export type GameCategory = 
  | 'adventure'  // Progressive level adventure map
  | 'numbers'    // Counting, sequences, math
  | 'letters'    // Alphabet, sound match, balloon pop, word builder
  | 'memory'     // Card matching
  | 'tracing'    // Draw and trace letters/numbers
  | 'stickers'   // Rewards sticker book
  | 'progress';  // Progress dashboard

export type DifficultyLevel = 1 | 2 | 3 | 4;

export interface LetterItem {
  id: string;
  char: string;
  name: string;
  phonetic: string;
  word: string;
  wordTranslation: string;
  emoji: string;
  category: 'khmer-consonant' | 'khmer-vowel' | 'english-alpha';
  color: string;
}

export interface NumberItem {
  value: number;
  khmerChar: string;
  khmerWord: string;
  englishWord: string;
  emoji: string;
  color: string;
}

export interface LevelStage {
  id: number;
  world: 1 | 2 | 3;
  worldNameKm: string;
  worldNameEn: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  gameType: 'count' | 'sequence' | 'math' | 'letter_find' | 'letter_match' | 'balloon_pop' | 'word_build';
  targetStarsToUnlock: number;
  icon: string;
  color: string;
}

export interface DailyStreakState {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string; // 'YYYY-MM-DD'
  lastClaimDate: string; // 'YYYY-MM-DD'
  virtualCoins: number;
  hasClaimedToday: boolean;
}

export interface StreakDayReward {
  day: number;
  coins: number;
  bonusTitleKm: string;
  bonusTitleEn: string;
  icon: string;
  specialStickerId?: string;
}

export interface WeeklyChallenge {
  id: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  goalType: 'math_levels' | 'letter_levels' | 'total_stars';
  targetCount: number;
  currentProgress: number;
  rewardCoins: number;
  rewardStars: number;
  isClaimed: boolean;
  expiresInDays: number;
  icon: string;
}

export interface UserProgress {
  totalStars: number;
  completedStages: Record<number, number>; // stageId -> stars earned (1-3)
  unlockedStickers: string[];
  numbersMastery: number; // 0-100%
  lettersMastery: number; // 0-100%
  highestDifficulty: Record<string, number>;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  language: Language;
}
