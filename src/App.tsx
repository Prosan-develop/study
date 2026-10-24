import React, { useState, useEffect } from 'react';
import {
  GameCategory,
  Language,
  LevelStage,
  DifficultyLevel,
  DailyStreakState,
  WeeklyChallenge,
  AvatarConfig,
} from './types';
import { Header } from './components/Header';
import { AdventureMap } from './components/AdventureMap';
import { NumberGame } from './components/NumberGame';
import { LetterGame } from './components/LetterGame';
import { MemoryGame } from './components/MemoryGame';
import { TracingCanvas } from './components/TracingCanvas';
import { StickerBook } from './components/StickerBook';
import { DailyStreakModal } from './components/DailyStreakModal';
import { SettingsModal } from './components/SettingsModal';
import { AvatarShopModal } from './components/AvatarShopModal';
import { LearningStatsModal } from './components/LearningStatsModal';
import { CelebrationModal, CelebrationData } from './components/CelebrationModal';
import { RewardParticlePop } from './components/RewardParticlePop';
import { sound, AudioSettings } from './utils/audio';
import { triggerParticleExplosion } from './utils/particles';
import {
  initDailyStreak,
  saveStreakState,
  getTodayDateString,
} from './utils/streak';
import {
  loadWeeklyChallenge,
  saveWeeklyChallenge,
  recordChallengeProgress,
  DEFAULT_WEEKLY_CHALLENGE,
} from './utils/weeklyChallenge';
import {
  loadAvatarConfig,
  saveAvatarConfig,
  loadOwnedItems,
  saveOwnedItems,
  DEFAULT_AVATAR_CONFIG,
  DEFAULT_OWNED_ITEMS,
} from './utils/avatarShop';
import {
  loadLearningStats,
  recordGameCompletion,
  DayActivityLog,
} from './utils/learningStats';

const STORAGE_KEY = 'khmer_kids_learning_progress_v1';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<GameCategory>('adventure');
  const [language, setLanguage] = useState<Language>('km');
  
  // Audio Settings State
  const [audioSettings, setAudioSettings] = useState<AudioSettings>(sound.getSettings());
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  // Avatar Profile & Shop State
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(DEFAULT_AVATAR_CONFIG);
  const [ownedAvatarItems, setOwnedAvatarItems] = useState<string[]>(DEFAULT_OWNED_ITEMS);
  const [isAvatarShopOpen, setIsAvatarShopOpen] = useState(false);

  // Game progress state
  const [totalStars, setTotalStars] = useState(0);
  const [completedStages, setCompletedStages] = useState<Record<number, number>>({});
  const [activeStage, setActiveStage] = useState<LevelStage | null>(null);
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>(['stk-1']);

  // Daily Streak State
  const [streakState, setStreakState] = useState<DailyStreakState>({
    currentStreak: 1,
    longestStreak: 1,
    lastLoginDate: getTodayDateString(),
    lastClaimDate: '',
    virtualCoins: 50,
    hasClaimedToday: false,
  });
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);

  // Weekly Challenge State
  const [weeklyChallenge, setWeeklyChallenge] = useState<WeeklyChallenge>(DEFAULT_WEEKLY_CHALLENGE);

  // Learning Statistics State (7-Day Recharts data)
  const [statsData, setStatsData] = useState<DayActivityLog[]>([]);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  // Difficult Level Celebration Modal State
  const [celebrationData, setCelebrationData] = useState<CelebrationData | null>(null);
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false);

  // Initialize progress, daily streak, weekly challenge, avatar, and learning stats on app load
  useEffect(() => {
    // 1. Load general progress
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.totalStars !== undefined) setTotalStars(parsed.totalStars);
        if (parsed.completedStages) setCompletedStages(parsed.completedStages);
        if (parsed.unlockedStickers) setUnlockedStickers(parsed.unlockedStickers);
        if (parsed.language) setLanguage(parsed.language);
      }
    } catch {}

    // 2. Initialize Daily Streak
    const { state: initialStreak, isNewDayLogin } = initDailyStreak();
    setStreakState(initialStreak);

    // 3. Load Weekly Challenge
    const challenge = loadWeeklyChallenge();
    setWeeklyChallenge(challenge);

    // 4. Load Audio Settings
    setAudioSettings(sound.getSettings());

    // 5. Load Avatar Config & Owned Items
    setAvatarConfig(loadAvatarConfig());
    setOwnedAvatarItems(loadOwnedItems());

    // 6. Load 7-Day Learning Activity Stats
    setStatsData(loadLearningStats());

    // If logging in on a new day or haven't claimed today's reward, welcome them with the streak modal!
    if (isNewDayLogin && !initialStreak.hasClaimedToday) {
      setTimeout(() => {
        setIsStreakModalOpen(true);
      }, 500);
    }
  }, []);

  // Save progress helper
  const saveProgress = (
    newStars: number,
    newStages: Record<number, number>,
    newStickers: string[]
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          totalStars: newStars,
          completedStages: newStages,
          unlockedStickers: newStickers,
          language,
        })
      );
    } catch {}
  };

  const handleUpdateAudioSettings = (updated: Partial<AudioSettings>) => {
    setAudioSettings((prev) => ({ ...prev, ...updated }));
  };

  const handleToggleSoundQuick = () => {
    const isCurrentlyMuted = !audioSettings.sfxEnabled && !audioSettings.musicEnabled;
    const nextState = isCurrentlyMuted;
    sound.setMuted(!nextState);
    const newSettings = sound.getSettings();
    setAudioSettings(newSettings);
    if (nextState) {
      sound.playPop();
    }
  };

  const handleToggleLanguage = () => {
    const nextLang = language === 'km' ? 'en' : 'km';
    setLanguage(nextLang);
    sound.playClick();
  };

  // Avatar Shop Handlers
  const handleUpdateAvatarConfig = (newConfig: AvatarConfig) => {
    setAvatarConfig(newConfig);
    saveAvatarConfig(newConfig);
  };

  const handleDeductCoins = (amount: number) => {
    const updatedCoins = Math.max(0, streakState.virtualCoins - amount);
    const nextStreakState: DailyStreakState = {
      ...streakState,
      virtualCoins: updatedCoins,
    };
    setStreakState(nextStreakState);
    saveStreakState(nextStreakState);
  };

  const handleAddOwnedAvatarItem = (itemId: string) => {
    if (!ownedAvatarItems.includes(itemId)) {
      const updated = [...ownedAvatarItems, itemId];
      setOwnedAvatarItems(updated);
      saveOwnedItems(updated);
    }
  };

  // Claim Daily Streak Reward
  const handleClaimStreakReward = (dayRewardCoins: number, specialStickerId?: string) => {
    const todayStr = getTodayDateString();
    const updatedCoins = streakState.virtualCoins + dayRewardCoins;

    let updatedStickers = [...unlockedStickers];
    if (specialStickerId && !updatedStickers.includes(specialStickerId)) {
      updatedStickers.push(specialStickerId);
      setUnlockedStickers(updatedStickers);
    }

    const nextStreakState: DailyStreakState = {
      ...streakState,
      virtualCoins: updatedCoins,
      lastClaimDate: todayStr,
      hasClaimedToday: true,
    };

    setStreakState(nextStreakState);
    saveStreakState(nextStreakState);
    saveProgress(totalStars, completedStages, updatedStickers);
  };

  // Helper for parents/teachers to test consecutive day streaks
  const handleSimulateNextDay = () => {
    const nextStreak = streakState.currentStreak + 1;
    const nextStreakState: DailyStreakState = {
      ...streakState,
      currentStreak: nextStreak,
      longestStreak: Math.max(streakState.longestStreak, nextStreak),
      hasClaimedToday: false,
      lastClaimDate: 'simulated-yesterday',
    };
    setStreakState(nextStreakState);
    saveStreakState(nextStreakState);
    sound.playStarCollect();
  };

  // Claim Weekly Challenge Reward (+200 coins and +5 stars)
  const handleClaimWeeklyChallenge = () => {
    if (weeklyChallenge.isClaimed || weeklyChallenge.currentProgress < weeklyChallenge.targetCount) {
      return;
    }

    const updatedCoins = streakState.virtualCoins + weeklyChallenge.rewardCoins;
    const updatedStars = totalStars + weeklyChallenge.rewardStars;

    const nextStreakState: DailyStreakState = {
      ...streakState,
      virtualCoins: updatedCoins,
    };
    setStreakState(nextStreakState);
    saveStreakState(nextStreakState);

    const updatedChallenge: WeeklyChallenge = {
      ...weeklyChallenge,
      isClaimed: true,
    };
    setWeeklyChallenge(updatedChallenge);
    saveWeeklyChallenge(updatedChallenge);

    setTotalStars(updatedStars);
    saveProgress(updatedStars, completedStages, unlockedStickers);
  };

  // Jump straight to Math challenges
  const handleStartWeeklyChallenge = () => {
    setActiveStage(null);
    setCurrentCategory('numbers');
  };

  // Purchase/unlock sticker with coins
  const handleUnlockWithCoins = (stickerId: string, cost: number) => {
    if (streakState.virtualCoins < cost) return;

    sound.playStarCollect();
    const updatedCoins = streakState.virtualCoins - cost;
    const nextStreakState: DailyStreakState = {
      ...streakState,
      virtualCoins: updatedCoins,
    };
    const updatedStickers = [...unlockedStickers, stickerId];

    setStreakState(nextStreakState);
    saveStreakState(nextStreakState);
    setUnlockedStickers(updatedStickers);
    saveProgress(totalStars, completedStages, updatedStickers);
  };

  const handleSelectStageFromMap = (stage: LevelStage) => {
    setActiveStage(stage);

    if (stage.gameType === 'count' || stage.gameType === 'sequence' || stage.gameType === 'math') {
      setCurrentCategory('numbers');
    } else {
      setCurrentCategory('letters');
    }
  };

  const handleFinishStage = (starsEarned: number) => {
    // Reward bonus coins for finishing a game too! (+5 coins per star)
    const bonusCoins = starsEarned * 5;
    const updatedCoins = streakState.virtualCoins + bonusCoins;
    const nextStreak: DailyStreakState = {
      ...streakState,
      virtualCoins: updatedCoins,
    };
    setStreakState(nextStreak);
    saveStreakState(nextStreak);

    // Identify math vs letters
    const isMathStage =
      currentCategory === 'numbers' ||
      (activeStage &&
        (activeStage.gameType === 'count' ||
          activeStage.gameType === 'sequence' ||
          activeStage.gameType === 'math'));

    // 1. Log game completion to 7-Day Learning Activity Tracker
    const updatedStats = recordGameCompletion(isMathStage ? 'math' : 'letters', starsEarned);
    setStatsData([...updatedStats]);

    // 2. Track weekly challenge if playing math/number game or stage
    if (isMathStage) {
      const { updated, newlyCompleted } = recordChallengeProgress(weeklyChallenge, 'math_levels', 1);
      setWeeklyChallenge(updated);
      if (newlyCompleted) {
        sound.playVictoryFanfare();
      }
    }

    // 3. Update total stars and stage progression
    if (activeStage) {
      const prevStarsForStage = completedStages[activeStage.id] || 0;
      const stageId = activeStage.id;

      if (starsEarned > prevStarsForStage) {
        const diff = starsEarned - prevStarsForStage;
        const newTotalStars = totalStars + diff;
        const newStages = { ...completedStages, [stageId]: starsEarned };

        setTotalStars(newTotalStars);
        setCompletedStages(newStages);
        saveProgress(newTotalStars, newStages, unlockedStickers);
      }
    } else {
      const newTotalStars = totalStars + starsEarned;
      setTotalStars(newTotalStars);
      saveProgress(newTotalStars, completedStages, unlockedStickers);
    }

    // 4. Trigger Celebration Modal with custom congratulatory messages and animated trophy for difficult/milestone levels
    const stageDifficulty = activeStage
      ? activeStage.world === 3 ||
        activeStage.gameType === 'math' ||
        activeStage.gameType === 'word_build'
        ? 3
        : activeStage.world === 2 ||
          activeStage.gameType === 'sequence' ||
          activeStage.gameType === 'letter_match'
        ? 2
        : 1
      : 2;

    const isDifficult = Boolean(
      (activeStage &&
        (activeStage.world >= 2 ||
          activeStage.id >= 3 ||
          stageDifficulty >= 2)) ||
      starsEarned >= 2 ||
      currentCategory === 'memory' ||
      currentCategory === 'tracing'
    );

    if (isDifficult) {
      const celebrationPayload: CelebrationData = {
        stageId: activeStage?.id,
        stageTitleKm:
          activeStage?.titleKm ||
          (isMathStage ? 'កម្រិតគណិតវិទ្យា & រាប់លេខ' : 'កម្រិតអក្សរ & ពាក្យ'),
        stageTitleEn:
          activeStage?.titleEn ||
          (isMathStage ? 'Math & Numbers Challenge' : 'Phonics & Letters Quest'),
        worldNumber: activeStage?.world || (isMathStage ? 1 : 2),
        levelDifficulty: stageDifficulty,
        starsEarned,
        bonusCoins,
      };

      setCelebrationData(celebrationPayload);
      setIsCelebrationOpen(true);
      sound.playVictoryFanfare();

      triggerParticleExplosion({
        type: 'mixed',
        particleCount: 110,
        origin: { x: 0.5, y: 0.45 },
      });
    }
  };

  const handleBackToMap = () => {
    setActiveStage(null);
    setCurrentCategory('adventure');
    sound.playClick();
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40">
      {/* Top Header Contract with Custom Avatar, Streak Flame, Virtual Coins & Settings Modal trigger */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          sound.playClick();
          setActiveStage(null);
          setCurrentCategory(cat);
        }}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        audioSettings={audioSettings}
        onToggleSound={handleToggleSoundQuick}
        onOpenSettingsModal={() => {
          sound.playClick();
          setIsSettingsModalOpen(true);
        }}
        onOpenStatsModal={() => {
          sound.playClick();
          setStatsData(loadLearningStats());
          setIsStatsModalOpen(true);
        }}
        totalStars={totalStars}
        currentStreak={streakState.currentStreak}
        virtualCoins={streakState.virtualCoins}
        hasClaimedToday={streakState.hasClaimedToday}
        onOpenStreakModal={() => {
          sound.playClick();
          setIsStreakModalOpen(true);
        }}
        avatarConfig={avatarConfig}
        onOpenAvatarShop={() => {
          sound.playClick();
          setIsAvatarShopOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {currentCategory === 'adventure' && (
          <AdventureMap
            completedStages={completedStages}
            totalStars={totalStars}
            language={language}
            onSelectStage={handleSelectStageFromMap}
            weeklyChallenge={weeklyChallenge}
            onClaimWeeklyChallenge={handleClaimWeeklyChallenge}
            onStartWeeklyChallenge={handleStartWeeklyChallenge}
          />
        )}

        {currentCategory === 'numbers' && (
          <NumberGame
            language={language}
            initialLevel={
              activeStage?.gameType === 'count'
                ? 1
                : activeStage?.gameType === 'sequence'
                ? 2
                : activeStage?.gameType === 'math'
                ? 3
                : 1
            }
            onFinishStage={handleFinishStage}
            onBackToMap={activeStage ? handleBackToMap : undefined}
          />
        )}

        {currentCategory === 'letters' && (
          <LetterGame
            language={language}
            initialLevel={
              activeStage?.gameType === 'letter_find'
                ? 1
                : activeStage?.gameType === 'balloon_pop'
                ? 2
                : activeStage?.gameType === 'letter_match'
                ? 3
                : activeStage?.gameType === 'word_build'
                ? 4
                : 1
            }
            onFinishStage={handleFinishStage}
            onBackToMap={activeStage ? handleBackToMap : undefined}
          />
        )}

        {currentCategory === 'memory' && (
          <MemoryGame
            language={language}
            onFinishStage={handleFinishStage}
            onBackToMap={activeStage ? handleBackToMap : undefined}
          />
        )}

        {currentCategory === 'tracing' && (
          <TracingCanvas
            language={language}
            onFinishStage={handleFinishStage}
            onBackToMap={activeStage ? handleBackToMap : undefined}
          />
        )}

        {currentCategory === 'stickers' && (
          <StickerBook
            totalStars={totalStars}
            virtualCoins={streakState.virtualCoins}
            unlockedStickerIds={unlockedStickers}
            onUnlockWithCoins={handleUnlockWithCoins}
            language={language}
          />
        )}
      </main>

      {/* Daily Streak Modal Popup */}
      <DailyStreakModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streakState={streakState}
        onClaimReward={handleClaimStreakReward}
        language={language}
        onSimulateNextDay={handleSimulateNextDay}
      />

      {/* Audio & Music Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        language={language}
        audioSettings={audioSettings}
        onUpdateSettings={handleUpdateAudioSettings}
      />

      {/* Avatar Shop & Wardrobe Modal */}
      <AvatarShopModal
        isOpen={isAvatarShopOpen}
        onClose={() => setIsAvatarShopOpen(false)}
        avatarConfig={avatarConfig}
        onUpdateAvatarConfig={handleUpdateAvatarConfig}
        virtualCoins={streakState.virtualCoins}
        onDeductCoins={handleDeductCoins}
        ownedItemIds={ownedAvatarItems}
        onAddOwnedItem={handleAddOwnedAvatarItem}
        language={language}
      />

      {/* Floating Reward Particle Burst Overlay */}
      <RewardParticlePop />

      {/* 7-Day Learning Activity Progress & Recharts Analytics Modal for Parents */}
      <LearningStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        language={language}
        statsData={statsData}
      />

      {/* Level Complete / Difficult Stage Celebration Modal with Animated Trophy */}
      <CelebrationModal
        isOpen={isCelebrationOpen}
        onClose={() => setIsCelebrationOpen(false)}
        language={language}
        data={celebrationData}
        onContinue={() => {
          setIsCelebrationOpen(false);
          handleBackToMap();
        }}
        onReplay={() => {
          setIsCelebrationOpen(false);
        }}
      />

      {/* Footer */}
      <footer className="border-t border-amber-200/50 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium">
            {language === 'km'
              ? 'ល្បែងសិក្សាកុមាររីករាយ · រៀនអក្សរនិងលេខ'
              : 'SmartKids Learning Adventure · Letters & Numbers'}
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <button
              onClick={() => {
                sound.playClick();
                setStatsData(loadLearningStats());
                setIsStatsModalOpen(true);
              }}
              className="hover:text-amber-700 transition-colors cursor-pointer"
            >
              {language === 'km' ? 'ស្ថិតិនៃការសិក្សា 📊' : 'Learning Stats 📊'}
            </button>
            <span>·</span>
            <span>{language === 'km' ? 'ហាងតួអង្គ 🛍️' : 'Avatar Shop 🛍️'}</span>
            <span>·</span>
            <span>{language === 'km' ? 'បេសកកម្មប្រចាំសប្តាហ៍ 🎯' : 'Weekly Quest 🎯'}</span>
            <span>·</span>
            <span>{language === 'km' ? 'វត្តមានជាប់គ្នា 🔥' : 'Daily Streak 🔥'}</span>
            <span>·</span>
            <span>{language === 'km' ? '១២ កម្រិតបន្តបន្ទាប់' : '12 Progressive Levels'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
