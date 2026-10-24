export interface DayActivityLog {
  dateStr: string; // 'YYYY-MM-DD'
  dayLabelKm: string; // 'ចន្ទ', 'អង្គារ', ...
  dayLabelEn: string; // 'Mon', 'Tue', ...
  mathCount: number;
  lettersCount: number;
  starsEarned: number;
}

const STATS_STORAGE_KEY = 'khmer_kids_learning_stats_v1';

const KHMER_DAYS = ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍'];
const ENGLISH_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Generate clean 7 days template ending today
export const getInitialSevenDays = (): DayActivityLog[] => {
  const result: DayActivityLog[] = [];
  const today = new Date();

  // Baseline sample data for past days so parents immediately see a helpful chart
  const sampleMath = [2, 3, 4, 2, 5, 3, 4];
  const sampleLetters = [3, 2, 3, 4, 3, 5, 2];
  const sampleStars = [6, 7, 10, 8, 12, 11, 9];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay();
    const idx = 6 - i;

    result.push({
      dateStr,
      dayLabelKm: KHMER_DAYS[dayOfWeek],
      dayLabelEn: ENGLISH_DAYS[dayOfWeek],
      mathCount: sampleMath[idx],
      lettersCount: sampleLetters[idx],
      starsEarned: sampleStars[idx],
    });
  }

  return result;
};

export const loadLearningStats = (): DayActivityLog[] => {
  if (typeof window === 'undefined') return getInitialSevenDays();
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) {
      const init = getInitialSevenDays();
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    const parsed: DayActivityLog[] = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return getInitialSevenDays();
  } catch {
    return getInitialSevenDays();
  }
};

export const saveLearningStats = (stats: DayActivityLog[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {}
};

export const recordGameCompletion = (type: 'math' | 'letters', stars: number = 3) => {
  const currentLogs = loadLearningStats();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const dayOfWeek = today.getDay();

  let todayRecord = currentLogs.find((l) => l.dateStr === todayStr);

  if (todayRecord) {
    if (type === 'math') todayRecord.mathCount += 1;
    else todayRecord.lettersCount += 1;
    todayRecord.starsEarned += stars;
  } else {
    // Add today and keep last 7 days
    const newRecord: DayActivityLog = {
      dateStr: todayStr,
      dayLabelKm: KHMER_DAYS[dayOfWeek],
      dayLabelEn: ENGLISH_DAYS[dayOfWeek],
      mathCount: type === 'math' ? 1 : 0,
      lettersCount: type === 'letters' ? 1 : 0,
      starsEarned: stars,
    };
    currentLogs.push(newRecord);
    if (currentLogs.length > 7) {
      currentLogs.shift();
    }
  }

  saveLearningStats(currentLogs);
  return currentLogs;
};
