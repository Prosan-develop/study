import React from 'react';
import { Target, Gift, Clock, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { WeeklyChallenge, Language } from '../types';
import { VirtualCoinIcon } from './CuteIcons';
import { sound } from '../utils/audio';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface WeeklyChallengePanelProps {
  challenge: WeeklyChallenge;
  language: Language;
  onClaimReward: () => void;
  onStartChallenge: () => void;
}

export const WeeklyChallengePanel: React.FC<WeeklyChallengePanelProps> = ({
  challenge,
  language,
  onClaimReward,
  onStartChallenge,
}) => {
  const isKm = language === 'km';
  const isCompleted = challenge.currentProgress >= challenge.targetCount;
  const progressPercent = Math.min(100, Math.round((challenge.currentProgress / challenge.targetCount) * 100));

  const handleClaim = () => {
    if (!isCompleted || challenge.isClaimed) return;
    sound.playVictoryFanfare();
    
    // Large Mixed Particle Explosion (Stars & Coins)
    triggerParticleExplosion({
      type: 'mixed',
      particleCount: 110,
      origin: { x: 0.5, y: 0.45 },
    });

    popFloatingReward({
      icon: '🪙',
      text: `+${challenge.rewardCoins} ${isKm ? 'កាក់' : 'Coins'}`,
      x: 45,
      y: 40,
      color: '#D97706',
    });

    popFloatingReward({
      icon: '⭐',
      text: `+${challenge.rewardStars} ${isKm ? 'ផ្កាយ' : 'Stars'}`,
      x: 55,
      y: 48,
      color: '#CA8A04',
    });

    onClaimReward();
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-1 shadow-md">
      <div className="rounded-[22px] bg-white p-5 sm:p-6">
        
        {/* Top Header: Badge, Title & Countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xl shrink-0 shadow-xs">
              🎯
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wide font-kids">
                <span>{isKm ? 'បេសកកម្មប្រចាំសប្តាហ៍' : 'Weekly Challenge'}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-slate-500 font-medium lowercase">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isKm ? `នៅសល់ ${challenge.expiresInDays} ថ្ងៃ` : `${challenge.expiresInDays} days left`}</span>
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-kids text-slate-900 leading-tight">
                {isKm ? challenge.titleKm : challenge.titleEn}
              </h3>
            </div>
          </div>

          {/* Big Coin Reward Badge */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-tr from-amber-50 to-orange-50 border border-amber-300 shadow-2xs">
            <VirtualCoinIcon size={26} />
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-amber-700 leading-none">
                {isKm ? 'រង្វាន់ធំ' : 'Grand Reward'}
              </span>
              <span className="text-lg font-black font-kids text-amber-900 leading-tight tabular-nums">
                +{challenge.rewardCoins} <span className="text-xs font-bold">{isKm ? 'កាក់' : 'Coins'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
          {isKm ? challenge.descriptionKm : challenge.descriptionEn}
        </p>

        {/* Progress Tracker Strip */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between text-xs font-bold font-kids">
            <span className="text-slate-700 flex items-center gap-1">
              <span>{isKm ? 'វឌ្ឍនភាពបេសកកម្ម:' : 'Quest Progress:'}</span>
              <span className="text-amber-600 tabular-nums">
                {challenge.currentProgress} / {challenge.targetCount} {isKm ? 'កម្រិត' : 'Levels'}
              </span>
            </span>
            <span className="text-amber-700 tabular-nums">{progressPercent}%</span>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full h-4 rounded-full bg-slate-100 p-0.5 border border-slate-200 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 transition-all duration-500 ease-out shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Step checkmarks */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {Array.from({ length: challenge.targetCount }).map((_, idx) => {
              const stepNumber = idx + 1;
              const isStepDone = challenge.currentProgress >= stepNumber;

              return (
                <div
                  key={idx}
                  className={`py-1.5 px-2 rounded-xl text-center flex items-center justify-center gap-1 text-xs font-bold font-kids transition-all border ${
                    isStepDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400'
                  }`}
                >
                  {isStepDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="hidden sm:inline">{isKm ? `កម្រិត ${stepNumber}` : `Lvl ${stepNumber}`}</span>
                    </>
                  ) : (
                    <span>{isKm ? `កម្រិត ${stepNumber}` : `Lvl ${stepNumber}`}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA / Claim Section */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              {isCompleted
                ? isKm ? 'អបអរសាទរ! អ្នកបានសម្រេចគោលដៅហើយ 🎉' : 'Awesome! Goal achieved, ready to claim 🎉'
                : isKm ? 'បញ្ចប់កម្រិតគណិតវិទ្យាដើម្បីទទួលកាក់!' : 'Complete math levels to collect your big reward!'}
            </span>
          </div>

          {/* Interactive Button */}
          {challenge.isClaimed ? (
            <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold font-kids">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isKm ? 'បានទទួលរួចរាល់ ✓' : 'Reward Claimed ✓'}</span>
            </div>
          ) : isCompleted ? (
            <button
              onClick={handleClaim}
              className="btn-chunky w-full sm:w-auto px-6 py-2.5 rounded-xl font-kids text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 flex items-center justify-center gap-2 cursor-pointer shadow-md animate-pulse-subtle"
            >
              <Gift className="w-4 h-4" />
              <span>{isKm ? `បើកទទួល ${challenge.rewardCoins} កាក់ឥឡូវនេះ!` : `Claim ${challenge.rewardCoins} Coins!`}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onStartChallenge();
              }}
              className="btn-chunky w-full sm:w-auto px-5 py-2.5 rounded-xl font-kids text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{isKm ? 'ចូលលេងកម្រិតគណិតវិទ្យា' : 'Play Math Level Now'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
