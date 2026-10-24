import React from 'react';
import { Star, Trophy, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { StarReward, VirtualCoinIcon } from './CuteIcons';
import { sound } from '../utils/audio';

export interface CelebrationData {
  stageId?: number;
  stageTitleKm?: string;
  stageTitleEn?: string;
  worldNumber?: number;
  levelDifficulty?: number;
  starsEarned: number;
  bonusCoins: number;
}

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  data: CelebrationData | null;
  onContinue: () => void;
  onReplay?: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  language,
  data,
  onContinue,
  onReplay,
}) => {
  if (!isOpen || !data) return null;

  const isKm = language === 'km';

  // Dynamic custom congratulatory message
  const getCongratulatoryMessage = () => {
    if (data.worldNumber === 3 || (data.levelDifficulty && data.levelDifficulty >= 3)) {
      return {
        titleKm: 'ជើងឯកពូកែអស្ចារ្យ! ឆ្លងកាត់កម្រិតលំបាកហើយ! 🏆',
        titleEn: 'Grand Champion! Conquered a Difficult Challenge! 🏆',
        subKm: 'អ្នកឆ្លើយត្រូវ និងមានភាពក្លាហានខ្ពស់ក្នុងការដោះស្រាយលំហាត់ពិបាកៗ!',
        subEn: 'You showed brilliant problem-solving and courage in this tough quest!',
      };
    } else if (data.worldNumber === 2) {
      return {
        titleKm: 'ពូកែអក្សរ និងពាក្យណាស់! សម្រេចកម្រិតជោគជ័យ! 🎉',
        titleEn: 'Letter & Phonics Master! Quest Completed! 🎉',
        subKm: 'ការចងចាំ និងការបញ្ចេញសំឡេងរបស់អ្នកកាន់តែល្អប្រសើរឡើងជាលំដាប់!',
        subEn: 'Your vocabulary and reading speed are improving tremendously!',
      };
    } else {
      return {
        titleKm: 'ឆ្លាតវៃអស្ចារ្យ! សម្រេចកម្រិតគណិតវិទ្យាហើយ! ⭐',
        titleEn: 'Math Genius! Level Completed! ⭐',
        subKm: 'ការរាប់លេខ និងការគណនារបស់អ្នករហ័សរហួន និងត្រឹមត្រូវបំផុត!',
        subEn: 'Your number counting and logic skills are outstanding!',
      };
    }
  };

  const congrats = getCongratulatoryMessage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-3 border-amber-400 overflow-hidden text-center p-6 sm:p-8 space-y-6 animate-scale-in">
        
        {/* Animated Grand Trophy Illustration */}
        <div className="relative flex justify-center pt-2">
          {/* Radiant background glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-36 h-36 rounded-full bg-amber-300/50 blur-2xl animate-pulse-subtle" />
          </div>

          {/* 3D-feel Animated Trophy SVG */}
          <div className="relative z-10 animate-coin-bounce">
            <svg
              width="110"
              height="110"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <defs>
                <linearGradient id="goldCup" x1="60" y1="10" x2="60" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE047" />
                  <stop offset="0.6" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="cupBase" x1="60" y1="80" x2="60" y2="110" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#78350F" />
                  <stop offset="1" stopColor="#451A03" />
                </linearGradient>
              </defs>

              {/* Handles */}
              <path
                d="M32 30 C18 30, 16 55, 36 60"
                stroke="#D97706"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M88 30 C102 30, 104 55, 84 60"
                stroke="#D97706"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />

              {/* Main Cup Body */}
              <path
                d="M30 20 H90 V45 C90 68, 75 75, 60 75 C45 75, 30 68, 30 45 Z"
                fill="url(#goldCup)"
              />

              {/* Star Emblem on Cup */}
              <polygon points="60,35 63,42 70,42 64,46 66,53 60,49 54,53 56,46 50,42 57,42" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />

              {/* Cup Stem */}
              <rect x="54" y="75" width="12" height="15" rx="3" fill="#D97706" />

              {/* Pedestal Base */}
              <path d="M40 90 H80 L86 106 H34 Z" fill="url(#cupBase)" />
              <rect x="42" y="93" width="36" height="10" rx="2" fill="#D97706" opacity="0.6" />
              <text x="60" y="101" fill="#FEF08A" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="Fredoka">
                LEVEL UP!
              </text>

              {/* Sparkle glints */}
              <polygon points="36,25 38,29 42,29 39,32 40,36 36,33 32,36 33,32 30,29 34,29" fill="white" opacity="0.9" />
              <polygon points="82,22 83,25 86,25 84,27 85,30 82,28 79,30 80,27 78,25 81,25" fill="white" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Custom Congratulatory Headings */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-kids">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{isKm ? 'សម្រេចកម្រិតជោគជ័យ' : 'Level Complete'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-kids text-slate-900 leading-snug">
            {isKm ? congrats.titleKm : congrats.titleEn}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            {isKm ? congrats.subKm : congrats.subEn}
          </p>
        </div>

        {/* Stars Earned */}
        <div className="flex items-center justify-center gap-2 py-1">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className="transform hover:scale-110 transition-transform"
              style={{ animationDelay: `${starIdx * 0.15}s` }}
            >
              <StarReward size={48} filled={data.starsEarned >= starIdx} />
            </div>
          ))}
        </div>

        {/* Coin Rewards Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-300 shadow-2xs">
          <VirtualCoinIcon size={22} />
          <span className="text-sm font-extrabold font-kids text-amber-900 tabular-nums">
            +{data.bonusCoins} {isKm ? 'កាក់មាសនិម្មិត!' : 'Virtual Coins!'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onReplay && (
            <button
              onClick={() => {
                sound.playClick();
                onReplay();
              }}
              className="btn-chunky w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-kids text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isKm ? 'លេងឡើងវិញ' : 'Replay'}</span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onContinue();
            }}
            className="btn-chunky w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-kids text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>{isKm ? 'បន្តទៅមុខទៀត' : 'Continue Journey'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
