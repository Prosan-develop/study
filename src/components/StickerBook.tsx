import React, { useState } from 'react';
import { Lock, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { STICKER_REWARDS, StickerReward } from '../data/learningData';
import { VirtualCoinIcon, StreakFlameIcon } from './CuteIcons';
import { sound } from '../utils/audio';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface StickerBookProps {
  totalStars: number;
  virtualCoins: number;
  language: Language;
  unlockedStickerIds?: string[];
  onUnlockWithCoins?: (stickerId: string, cost: number) => void;
}

interface PlacedSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
}

export const StickerBook: React.FC<StickerBookProps> = ({
  totalStars,
  virtualCoins,
  language,
  unlockedStickerIds = [],
  onUnlockWithCoins,
}) => {
  const isKm = language === 'km';
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    { id: 'initial-1', emoji: '🐘', x: 25, y: 35, size: 48 },
    { id: 'initial-2', emoji: '⭐', x: 65, y: 20, size: 40 },
    { id: 'initial-3', emoji: '🔥', x: 45, y: 55, size: 44 },
  ]);

  // Extended rewards including Streak flame stickers
  const allStickers: (StickerReward & { coinCost?: number })[] = [
    ...STICKER_REWARDS,
    {
      id: 'stk-flame',
      nameKm: 'អណ្តាតភ្លើងឈ្លាសវៃ',
      nameEn: 'Streak Flame',
      emoji: '🔥',
      starsRequired: 2,
      coinCost: 30,
    },
    {
      id: 'stk-crown-gold',
      nameKm: 'ម្កុដអគ្គីប្រចាំសប្តាហ៍',
      nameEn: 'Weekly Flame Crown',
      emoji: '👑',
      starsRequired: 5,
      coinCost: 50,
    },
  ];

  const isStickerUnlocked = (stk: StickerReward & { coinCost?: number }) => {
    return (
      totalStars >= stk.starsRequired ||
      unlockedStickerIds.includes(stk.id)
    );
  };

  const handleAddStickerToScene = (sticker: StickerReward & { coinCost?: number }) => {
    const unlocked = isStickerUnlocked(sticker);

    if (!unlocked) {
      if (sticker.coinCost && virtualCoins >= sticker.coinCost && onUnlockWithCoins) {
        onUnlockWithCoins(sticker.id, sticker.coinCost);
        triggerParticleExplosion({
          type: 'mixed',
          particleCount: 50,
          origin: { x: 0.5, y: 0.5 },
        });
        popFloatingReward({
          icon: sticker.emoji,
          text: isKm ? 'ដោះសោស្ទីគ័រថ្មី!' : 'New Sticker Unlocked!',
          x: 50,
          y: 44,
          color: '#10B981',
        });
        return;
      }
      sound.playWrong();
      return;
    }

    sound.playStarCollect();
    sound.speak(isKm ? sticker.nameKm : sticker.nameEn, isKm ? 'km' : 'en');
    
    triggerParticleExplosion({
      type: 'stars',
      particleCount: 20,
      origin: { x: 0.5, y: 0.4 },
    });

    // Add in a random spot on the scene
    const randomX = Math.floor(Math.random() * 70) + 15;
    const randomY = Math.floor(Math.random() * 60) + 15;

    setPlacedStickers((prev) => [
      ...prev,
      {
        id: `placed-${Date.now()}-${Math.random()}`,
        emoji: sticker.emoji,
        x: randomX,
        y: randomY,
        size: 52,
      },
    ]);
  };

  const handleTapPlacedSticker = () => {
    sound.playPop();
  };

  const handleClearScene = () => {
    sound.playClick();
    setPlacedStickers([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-kids text-slate-900">
            {isKm ? 'សៀវភៅស្ទីគ័រ និងរង្វាន់' : 'Sticker Book & Playground'}
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-amber-700">
              <span>⭐</span>
              <span className="font-bold tabular-nums">{totalStars}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-amber-800">
              <VirtualCoinIcon size={15} />
              <span className="font-bold tabular-nums">{virtualCoins}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{isKm ? 'ចុចស្ទីគ័រដើម្បីដាក់លើឆាកលេង!' : 'Tap unlocked stickers to add to playground!'}</span>
          </div>
        </div>

        {placedStickers.length > 0 && (
          <button
            onClick={handleClearScene}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-kids text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isKm ? 'សម្អាតឆាក' : 'Clear Scene'}</span>
          </button>
        )}
      </div>

      {/* Interactive Sticker Playground Scene */}
      <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 border-2 border-sky-300 shadow-sm overflow-hidden p-6 select-none">
        
        {/* Clouds & Sun */}
        <div className="absolute top-4 right-8 text-4xl animate-pulse-subtle">☀️</div>
        <div className="absolute top-6 left-12 text-3xl opacity-80 animate-float">☁️</div>
        <div className="absolute top-12 right-28 text-2xl opacity-70 animate-float" style={{ animationDelay: '2s' }}>☁️</div>

        {/* Rolling hill background in bottom */}
        <div className="absolute -bottom-8 -left-10 -right-10 h-32 bg-emerald-200/70 rounded-[100%] pointer-events-none" />
        <div className="absolute -bottom-4 -left-6 -right-6 h-20 bg-emerald-300/80 rounded-[100%] pointer-events-none" />

        {/* Placed Stickers */}
        {placedStickers.map((item) => (
          <button
            key={item.id}
            onClick={handleTapPlacedSticker}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 active:scale-95 transition-transform cursor-pointer drop-shadow-md"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              fontSize: `${item.size}px`,
            }}
          >
            {item.emoji}
          </button>
        ))}

        {placedStickers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-kids text-sm">
            {isKm ? 'ចុចលើស្ទីគ័រខាងក្រោមដើម្បីដាក់លើឆាកលេងនេះ!' : 'Tap on stickers below to place them here!'}
          </div>
        )}
      </div>

      {/* Available Stickers Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-kids text-slate-800">
          {isKm ? 'ស្ទីគ័រដែលអាចដោះសោរបាន' : 'Unlockable Stickers'}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {allStickers.map((stk) => {
            const unlocked = isStickerUnlocked(stk);
            const canAffordWithCoins = stk.coinCost && virtualCoins >= stk.coinCost;

            return (
              <button
                key={stk.id}
                onClick={() => handleAddStickerToScene(stk)}
                className={`btn-chunky p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  unlocked
                    ? 'bg-white hover:bg-amber-50/70 border-2 border-amber-200 shadow-xs'
                    : 'bg-slate-100 border border-slate-200 opacity-70'
                }`}
              >
                <span className={`text-4xl mb-1 ${!unlocked ? 'grayscale opacity-75' : ''}`}>
                  {stk.emoji}
                </span>
                <span className="text-xs font-bold font-kids text-slate-900 leading-tight">
                  {isKm ? stk.nameKm : stk.nameEn}
                </span>

                <div className="mt-2 text-[11px] font-semibold">
                  {unlocked ? (
                    <span className="text-emerald-600 font-kids">
                      {isKm ? 'ដោះសោររួច ✓' : 'Unlocked ✓'}
                    </span>
                  ) : canAffordWithCoins && onUnlockWithCoins ? (
                    <span className="text-amber-800 font-bold flex items-center gap-1 justify-center bg-amber-100 px-2 py-0.5 rounded-lg">
                      <VirtualCoinIcon size={12} />
                      <span>{stk.coinCost}</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1 justify-center">
                      <Lock className="w-3 h-3" />
                      <span>⭐ {stk.starsRequired}</span>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
