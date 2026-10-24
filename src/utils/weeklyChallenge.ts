import { WeeklyChallenge } from '../types';

export const WEEKLY_CHALLENGE_STORAGE_KEY = 'khmer_kids_weekly_challenge_v1';

export const DEFAULT_WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: 'week-math-quest-1',
  titleKm: 'បេសកកម្មប្រចាំសប្តាហ៍: ឆ្លងកាត់ ៥ កម្រិតគណិតវិទ្យា & រាប់លេខ',
  titleEn: 'Weekly Quest: Finish 5 Math & Number Levels',
  descriptionKm: 'លេងឆ្លងកាត់ ៥ កម្រិតរាប់លេខ បូកដក ឬលំដាប់លេខ ដើម្បីទទួលបានរង្វាន់មហាសាល!',
  descriptionEn: 'Conquer 5 counting, sequence or math levels to claim a massive reward!',
  goalType: 'math_levels',
  targetCount: 5,
  currentProgress: 1, // Start with 1 to encourage kids immediately!
  rewardCoins: 200,
  rewardStars: 5,
  isClaimed: false,
  expiresInDays: 4,
  icon: '🎯',
};

export const loadWeeklyChallenge = (): WeeklyChallenge => {
  if (typeof window === 'undefined') return DEFAULT_WEEKLY_CHALLENGE;
  try {
    const raw = localStorage.getItem(WEEKLY_CHALLENGE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WEEKLY_CHALLENGE_STORAGE_KEY, JSON.stringify(DEFAULT_WEEKLY_CHALLENGE));
      return DEFAULT_WEEKLY_CHALLENGE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_WEEKLY_CHALLENGE;
  }
};

export const saveWeeklyChallenge = (challenge: WeeklyChallenge) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WEEKLY_CHALLENGE_STORAGE_KEY, JSON.stringify(challenge));
  } catch {}
};

export const recordChallengeProgress = (
  current: WeeklyChallenge,
  goalType: 'math_levels' | 'letter_levels' | 'total_stars',
  amount: number = 1
): { updated: WeeklyChallenge; newlyCompleted: boolean } => {
  if (current.goalType !== goalType || current.isClaimed) {
    return { updated: current, newlyCompleted: false };
  }

  const prevProgress = current.currentProgress;
  const newProgress = Math.min(current.targetCount, prevProgress + amount);
  const newlyCompleted = prevProgress < current.targetCount && newProgress >= current.targetCount;

  const updated: WeeklyChallenge = {
    ...current,
    currentProgress: newProgress,
  };

  saveWeeklyChallenge(updated);
  return { updated, newlyCompleted };
};
