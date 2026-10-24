import React from 'react';
import confetti from 'canvas-confetti';
import { X, Check, Gift, Sparkles, Flame, Calendar, Award } from 'lucide-react';
import { DailyStreakState, Language } from '../types';
import { SEVEN_DAY_STREAK_REWARDS, getTodayDateString, saveStreakState } from '../utils/streak';
import { StreakFlameIcon, VirtualCoinIcon } from './CuteIcons';
import { sound } from '../utils/audio';

import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface DailyStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakState: DailyStreakState;
  onClaimReward: (dayRewardCoins: number, specialStickerId?: string) => void;
  language: Language;
  onSimulateNextDay?: () => void;
}

export const DailyStreakModal: React.FC<DailyStreakModalProps> = ({
  isOpen,
  onClose,
  streakState,
  onClaimReward,
  language,
  onSimulateNextDay,
}) => {
  if (!isOpen) return null;

  const isKm = language === 'km';
  const todayStr = getTodayDateString();
  const currentDayIndex = ((streakState.currentStreak - 1) % 7) + 1; // 1 to 7
  const currentDayReward = SEVEN_DAY_STREAK_REWARDS.find((r) => r.day === currentDayIndex) || SEVEN_DAY_STREAK_REWARDS[0];
  const canClaimToday = !streakState.hasClaimedToday;

  const handleClaim = () => {
    if (!canClaimToday) return;

    sound.playVictoryFanfare();
    triggerParticleExplosion({
      type: 'coins',
      particleCount: 80,
      origin: { x: 0.5, y: 0.45 },
    });

    popFloatingReward({
      icon: '🪙',
      text: `+${currentDayReward.coins} ${isKm ? 'កាក់' : 'Coins'}`,
      x: 50,
      y: 42,
      color: '#D97706',
    });

    onClaimReward(currentDayReward.coins, currentDayReward.specialStickerId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 p-6 text-white text-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
            title={isKm ? 'បិទ' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Glowing Streak Flame */}
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-xs">
              <StreakFlameIcon size={56} animated={true} />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-kids tracking-tight">
            {isKm ? `ថ្ងៃជាប់គ្នា ${streakState.currentStreak} ថ្ងៃ!` : `${streakState.currentStreak} Day Streak!`}
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm mt-1">
            {isKm
              ? 'ចូលរៀនជារៀងរាល់ថ្ងៃដើម្បីទទួលបានកាក់ និងស្ទីគ័រពិសេស!'
              : 'Log in every consecutive day to keep the flame alive and earn coins!'}
          </p>
        </div>

        {/* 7-Day Reward Grid */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>{isKm ? 'តារាងរង្វាន់ ៧ ថ្ងៃ' : '7-Day Streak Rewards'}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-700">
              <VirtualCoinIcon size={16} />
              <span className="tabular-nums font-bold">{streakState.virtualCoins} {isKm ? 'កាក់' : 'Coins'}</span>
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {SEVEN_DAY_STREAK_REWARDS.map((item) => {
              const isPastClaimed = item.day < currentDayIndex || (item.day === currentDayIndex && !canClaimToday);
              const isCurrentActive = item.day === currentDayIndex;
              const isFuture = item.day > currentDayIndex;

              return (
                <div
                  key={item.day}
                  className={`relative rounded-2xl p-2.5 text-center flex flex-col items-center justify-between min-h-[96px] transition-all border ${
                    isCurrentActive
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-400/50 shadow-sm scale-105'
                      : isPastClaimed
                      ? 'bg-emerald-50/70 border-emerald-300 opacity-90'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <span className="text-[10px] font-bold text-slate-500 font-kids">
                    {isKm ? `ថ្ងៃ ${item.day}` : `Day ${item.day}`}
                  </span>

                  <div className="my-1 text-2xl flex items-center justify-center">
                    {isPastClaimed ? (
                      <span className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                        ✓
                      </span>
                    ) : (
                      <span>{item.icon}</span>
                    )}
                  </div>

                  <div className="text-[11px] font-bold text-amber-900 flex items-center gap-0.5 justify-center">
                    <span>+{item.coins}</span>
                  </div>

                  {isCurrentActive && canClaimToday && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Today's Reward Action Box */}
          <div className="rounded-2xl p-4 bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-300 flex items-center justify-center text-2xl shrink-0">
                {currentDayReward.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 font-kids text-sm">
                  {isKm ? currentDayReward.bonusTitleKm : currentDayReward.bonusTitleEn}
                </h4>
                <p className="text-xs text-amber-800 font-medium mt-0.5">
                  +{currentDayReward.coins} {isKm ? 'កាក់ប្រាក់និម្មិត' : 'Virtual Coins'}
                  {currentDayReward.specialStickerId && (
                    <span> · {isKm ? '+ ស្ទីគ័រពិសេស 🎁' : '+ Special Sticker 🎁'}</span>
                  )}
                </p>
              </div>
            </div>

            {canClaimToday ? (
              <button
                onClick={handleClaim}
                className="btn-chunky w-full sm:w-auto px-5 py-2.5 rounded-xl font-kids text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Gift className="w-4 h-4" />
                <span>{isKm ? 'ទទួលយករង្វាន់ថ្ងៃនេះ!' : 'Claim Today!'}</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>{isKm ? 'បានទទួលរួចរាល់' : 'Claimed for Today'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer with testing/simulation helper */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            {isKm
              ? `កំណត់ត្រាខ្ពស់បំផុត: 🔥 ${streakState.longestStreak} ថ្ងៃ`
              : `Best Record: 🔥 ${streakState.longestStreak} Days`}
          </span>

          {onSimulateNextDay && (
            <button
              onClick={() => {
                sound.playClick();
                onSimulateNextDay();
              }}
              className="text-[11px] text-amber-700 hover:text-amber-900 underline font-medium"
              title="សម្រាប់សាកល្បងថ្ងៃបន្ទាប់ (Test consecutive day streak)"
            >
              {isKm ? '⚡ សាកល្បងថ្ងៃបន្ទាប់' : '⚡ Simulate Next Day'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
