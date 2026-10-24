import React from 'react';
import { Settings, BarChart2 } from 'lucide-react';
import { GameCategory, Language, AvatarConfig } from '../types';
import { StreakFlameIcon, VirtualCoinIcon } from './CuteIcons';
import { CustomAvatar } from './CustomAvatar';
import { AudioSettings } from '../utils/audio';

interface HeaderProps {
  currentCategory: GameCategory;
  onSelectCategory: (category: GameCategory) => void;
  language: Language;
  onToggleLanguage: () => void;
  audioSettings: AudioSettings;
  onToggleSound: () => void;
  onOpenSettingsModal: () => void;
  onOpenStatsModal?: () => void;
  totalStars: number;
  currentStreak: number;
  virtualCoins: number;
  hasClaimedToday: boolean;
  onOpenStreakModal: () => void;
  avatarConfig: AvatarConfig;
  onOpenAvatarShop: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  language,
  onToggleLanguage,
  audioSettings,
  onOpenSettingsModal,
  onOpenStatsModal,
  totalStars,
  currentStreak,
  virtualCoins,
  hasClaimedToday,
  onOpenStreakModal,
  avatarConfig,
  onOpenAvatarShop,
}) => {
  const isKm = language === 'km';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 md:gap-8">
        
        {/* Zone 1: Single text wordmark with mini logo */}
        <button
          onClick={() => onSelectCategory('adventure')}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-sm font-kids text-xl font-bold group-hover:scale-105 transition-transform">
            កA
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight font-kids">
              {isKm ? 'កុមារឆ្លាត' : 'SmartKids'}
            </span>
            <span className="text-[11px] font-medium text-amber-700/80 -mt-1 hidden sm:inline">
              {isKm ? 'រៀនលេខ & អក្សរ' : 'Learn Numbers & ABC'}
            </span>
          </div>
        </button>

        {/* Zone 2: Clean single-line nav tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 no-scrollbar text-sm font-medium">
          <button
            onClick={() => onSelectCategory('adventure')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentCategory === 'adventure'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {isKm ? '🗺️ ផ្សងព្រេង' : '🗺️ Adventure'}
          </button>

          <button
            onClick={() => onSelectCategory('numbers')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentCategory === 'numbers'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {isKm ? '🔢 រាប់លេខ' : '🔢 Numbers'}
          </button>

          <button
            onClick={() => onSelectCategory('letters')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentCategory === 'letters'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {isKm ? '🔤 រៀនអក្សរ' : '🔤 Letters'}
          </button>

          <button
            onClick={() => onSelectCategory('memory')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentCategory === 'memory'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {isKm ? '🧠 ចងចាំ' : '🧠 Memory'}
          </button>

          <button
            onClick={() => onSelectCategory('tracing')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentCategory === 'tracing'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {isKm ? '✍️ ហាត់គូរ' : '✍️ Tracing'}
          </button>

          <button
            onClick={() => onSelectCategory('stickers')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentCategory === 'stickers'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {isKm ? '🎁 រង្វាន់' : '🎁 Stickers'}
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls (Clean zero-pill design) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Daily Streak Flame Button */}
          <button
            onClick={onOpenStreakModal}
            className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200/80 text-orange-950 font-bold text-xs sm:text-sm font-kids transition-all cursor-pointer shadow-2xs group"
            title={isKm ? `វត្តមានជាប់គ្នា: ${currentStreak} ថ្ងៃ (ចុចមើលរង្វាន់)` : `Daily Streak: ${currentStreak} Days (View rewards)`}
          >
            <StreakFlameIcon size={20} animated={true} />
            <span className="tabular-nums font-extrabold text-orange-600 group-hover:scale-105 transition-transform">
              {currentStreak}
            </span>

            {/* Notification alert ping if not claimed today */}
            {!hasClaimedToday && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            )}
          </button>

          {/* Virtual Coins Counter */}
          <button
            onClick={onOpenAvatarShop}
            className="flex items-center gap-1 text-amber-800 font-bold text-xs sm:text-sm tabular-nums cursor-pointer hover:opacity-85 transition-opacity px-2 py-1 rounded-lg hover:bg-amber-100/60"
            title={isKm ? 'កាក់មាសរបស់អ្នក (ចុចទៅហាងតួអង្គ)' : 'Your Coins (Click for Avatar Shop)'}
          >
            <VirtualCoinIcon size={18} />
            <span>{virtualCoins}</span>
          </button>

          {/* Star counter */}
          <div className="flex items-center gap-1 text-amber-700 font-bold text-xs sm:text-sm tabular-nums hidden sm:flex">
            <span className="text-amber-500 text-base">⭐</span>
            <span>{totalStars}</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />

          {/* Custom Profile Avatar Button (Click to open Avatar Shop) */}
          <button
            onClick={onOpenAvatarShop}
            className="relative p-0.5 rounded-full ring-2 ring-amber-300 hover:ring-amber-500 bg-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
            title={isKm ? 'ហាងតុបតែងតួអង្គ (Avatar Shop)' : 'Avatar Shop & Wardrobe'}
          >
            <CustomAvatar config={avatarConfig} size={34} />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 border border-white flex items-center justify-center text-[9px] text-amber-950 font-bold shadow-2xs">
              🛍️
            </span>
          </button>

          {/* Learning Statistics for Parents & Kids */}
          {onOpenStatsModal && (
            <button
              onClick={onOpenStatsModal}
              aria-label="Learning Statistics"
              className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-amber-100/50 transition-colors cursor-pointer relative"
              title={isKm ? 'ស្ថិតិនៃការសិក្សា ៧ ថ្ងៃ (Learning Stats)' : '7-Day Learning Progress & Charts'}
            >
              <BarChart2 className="w-5 h-5 text-amber-700" />
            </button>
          )}

          {/* Settings Menu Trigger */}
          <button
            onClick={onOpenSettingsModal}
            aria-label="Settings"
            className="p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-amber-100/50 transition-colors cursor-pointer relative"
            title={isKm ? 'ការកំណត់សំឡេង និងតន្ត្រី (Settings)' : 'Audio & Music Settings'}
          >
            <Settings className="w-5 h-5" />
            {audioSettings.musicEnabled && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-1 ring-white" />
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 border border-amber-300/60 transition-colors whitespace-nowrap cursor-pointer"
            title="ប្តូរភាសា / Switch Language"
          >
            {isKm ? '🇰🇭 ខ្មែរ' : '🇬🇧 EN'}
          </button>
        </div>

      </div>
    </header>
  );
};
