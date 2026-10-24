import { DailyStreakState, StreakDayReward } from '../types';

export const STREAK_STORAGE_KEY = 'khmer_kids_daily_streak_v1';

export const SEVEN_DAY_STREAK_REWARDS: StreakDayReward[] = [
  {
    day: 1,
    coins: 15,
    bonusTitleKm: 'ចាប់ផ្តើមថ្ងៃទី ១',
    bonusTitleEn: 'Day 1 Spark',
    icon: '🪙',
  },
  {
    day: 2,
    coins: 25,
    bonusTitleKm: 'ស្វាហាប់ថ្ងៃទី ២',
    bonusTitleEn: 'Day 2 Power',
    icon: '🪙',
  },
  {
    day: 3,
    coins: 40,
    bonusTitleKm: 'អណ្តាតភ្លើងទី ៣',
    bonusTitleEn: 'Day 3 Flame',
    icon: '🔥',
    specialStickerId: 'stk-flame',
  },
  {
    day: 4,
    coins: 55,
    bonusTitleKm: 'ឆ្លាតវៃថ្ងៃទី ៤',
    bonusTitleEn: 'Day 4 Streak',
    icon: '🪙',
  },
  {
    day: 5,
    coins: 70,
    bonusTitleKm: 'តារារះថ្ងៃទី ៥',
    bonusTitleEn: 'Day 5 Star',
    icon: '⭐',
  },
  {
    day: 6,
    coins: 90,
    bonusTitleKm: 'ជិតដល់កំពូល ថ្ងៃទី ៦',
    bonusTitleEn: 'Day 6 Ultra',
    icon: '💎',
  },
  {
    day: 7,
    coins: 150,
    bonusTitleKm: 'ជើងឯកអគ្គីប្រចាំសប្តាហ៍!',
    bonusTitleEn: 'Grand Champion Week!',
    icon: '👑',
    specialStickerId: 'stk-crown-gold',
  },
];

export const getTodayDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDaysDifference = (dateStr1: string, dateStr2: string): number => {
  if (!dateStr1 || !dateStr2) return 999;
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

export const initDailyStreak = (): { state: DailyStreakState; isNewDayLogin: boolean } => {
  const todayStr = getTodayDateString();
  const defaultState: DailyStreakState = {
    currentStreak: 1,
    longestStreak: 1,
    lastLoginDate: todayStr,
    lastClaimDate: '',
    virtualCoins: 50, // Welcome bonus coins!
    hasClaimedToday: false,
  };

  if (typeof window === 'undefined') {
    return { state: defaultState, isNewDayLogin: false };
  }

  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(defaultState));
      return { state: defaultState, isNewDayLogin: true };
    }

    const state: DailyStreakState = JSON.parse(raw);
    const diff = getDaysDifference(state.lastLoginDate, todayStr);

    let updatedStreak = state.currentStreak || 1;
    let isNewDay = false;

    if (diff === 0) {
      // Same day login
      isNewDay = false;
    } else if (diff === 1) {
      // Consecutive day login!
      updatedStreak += 1;
      isNewDay = true;
    } else if (diff > 1) {
      // Missed one or more days, reset streak to 1
      updatedStreak = 1;
      isNewDay = true;
    }

    const hasClaimed = state.lastClaimDate === todayStr;

    const nextState: DailyStreakState = {
      ...state,
      currentStreak: updatedStreak,
      longestStreak: Math.max(state.longestStreak || 1, updatedStreak),
      lastLoginDate: todayStr,
      hasClaimedToday: hasClaimed,
      virtualCoins: typeof state.virtualCoins === 'number' ? state.virtualCoins : 50,
    };

    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(nextState));
    return { state: nextState, isNewDayLogin: isNewDay || !hasClaimed };
  } catch {
    return { state: defaultState, isNewDayLogin: false };
  }
};

export const saveStreakState = (state: DailyStreakState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(state));
  } catch {}
};
