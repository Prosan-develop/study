import React from 'react';
import { Lock, Play, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { LevelStage, Language, WeeklyChallenge } from '../types';
import { ADVENTURE_STAGES } from '../data/learningData';
import { MascotElephant, StarReward } from './CuteIcons';
import { WeeklyChallengePanel } from './WeeklyChallengePanel';
import { sound } from '../utils/audio';

interface AdventureMapProps {
  completedStages: Record<number, number>;
  totalStars: number;
  language: Language;
  onSelectStage: (stage: LevelStage) => void;
  weeklyChallenge?: WeeklyChallenge;
  onClaimWeeklyChallenge?: () => void;
  onStartWeeklyChallenge?: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  completedStages,
  totalStars,
  language,
  onSelectStage,
  weeklyChallenge,
  onClaimWeeklyChallenge,
  onStartWeeklyChallenge,
}) => {
  const isKm = language === 'km';

  // Group stages by world
  const worlds = [
    {
      id: 1,
      titleKm: 'ពិភពទី ១: កោះលេខរីករាយ',
      titleEn: 'World 1: Fun Number Island',
      descriptionKm: 'ចាប់ផ្តើមដំណើររៀនរាប់លេខពី ១ ដល់ ១០ និងបូកលេខងាយៗ',
      descriptionEn: 'Begin your journey counting numbers 1-10 and fun addition',
      bgGradient: 'from-amber-100/90 via-emerald-100/60 to-sky-100/80',
      bannerColor: 'bg-emerald-600',
      badgeColor: 'text-emerald-800 bg-emerald-100',
      stages: ADVENTURE_STAGES.filter((s) => s.world === 1),
    },
    {
      id: 2,
      titleKm: 'ពិភពទី ២: ព្រៃអក្សរវេទមន្ត',
      titleEn: 'World 2: Magic Letter Jungle',
      descriptionKm: 'រៀនអក្សរខ្មែរនិងអង់គ្លេស បំបែកប៉េងប៉ោង និងផ្គូផ្គងពាក្យ',
      descriptionEn: 'Discover letters, pop balloons, and match pictures with phonics',
      bgGradient: 'from-sky-100/90 via-indigo-100/60 to-purple-100/80',
      bannerColor: 'bg-indigo-600',
      badgeColor: 'text-indigo-800 bg-indigo-100',
      stages: ADVENTURE_STAGES.filter((s) => s.world === 2),
    },
    {
      id: 3,
      titleKm: 'ពិភពទី ៣: ពិភពគណិតនិងពាក្យជើងឯក',
      titleEn: 'World 3: Grand Champion Kingdom',
      descriptionKm: 'ប្រកួតប្រជែងដកលេខ ប្រៀបធៀប និងឆ្លើយសំណួរចម្រុះកម្រិតខ្ពស់',
      descriptionEn: 'Challenge advanced math, rapid speed quizzes and earn the grand cup',
      bgGradient: 'from-purple-100/90 via-rose-100/60 to-amber-100/80',
      bannerColor: 'bg-purple-600',
      badgeColor: 'text-purple-800 bg-purple-100',
      stages: ADVENTURE_STAGES.filter((s) => s.world === 3),
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-6 sm:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold mb-3 text-white">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>{isKm ? 'ដំណើរផ្សងព្រេងកម្រិតលំបាកកើនឡើងជាបន្តបន្ទាប់' : 'Progressive Level Adventure Map'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-kids tracking-tight text-white mb-2 leading-tight">
            {isKm ? 'តោះរៀនលេខ និងអក្សរជាមួយគ្នា!' : "Let's Learn Numbers & Letters Together!"}
          </h1>

          <p className="text-amber-50 text-sm sm:text-base leading-relaxed mb-5">
            {isKm
              ? 'លេងឆ្លងកាត់កម្រិតនីមួយៗ ដើម្បីប្រមូលផ្កាយមាស ដោះសោរស្ទីគ័រស្អាតៗ និងឈ្នះពានរង្វាន់!'
              : 'Conquer each progressive level to collect golden stars, unlock cute rewards, and become a champion!'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-1.5 bg-black/15 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <span>⭐</span>
              <span>
                {isKm ? 'ផ្កាយសរុប:' : 'Total Stars:'} {totalStars}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/15 px-3 py-1.5 rounded-xl backdrop-blur-xs">
              <span>🏆</span>
              <span>
                {isKm ? 'កម្រិតបានជោគជ័យ:' : 'Levels Completed:'}{' '}
                {Object.keys(completedStages).length} / {ADVENTURE_STAGES.length}
              </span>
            </div>
          </div>
        </div>

        {/* Mascot Mascot illustration in banner */}
        <div className="absolute -bottom-4 -right-4 sm:right-6 sm:bottom-0 pointer-events-none opacity-90 sm:opacity-100">
          <MascotElephant className="w-36 h-36 sm:w-48 sm:h-48 drop-shadow-lg" mood="cheering" />
        </div>
      </div>

      {/* Prominent Weekly Challenge Panel */}
      {weeklyChallenge && onClaimWeeklyChallenge && onStartWeeklyChallenge && (
        <WeeklyChallengePanel
          challenge={weeklyChallenge}
          language={language}
          onClaimReward={onClaimWeeklyChallenge}
          onStartChallenge={onStartWeeklyChallenge}
        />
      )}

      {/* Worlds and Stages */}
      {worlds.map((world) => (
        <section key={world.id} className="space-y-4">
          {/* World Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-kids text-slate-900">
                {isKm ? world.titleKm : world.titleEn}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isKm ? world.descriptionKm : world.descriptionEn}
              </p>
            </div>
          </div>

          {/* Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {world.stages.map((stage) => {
              const starsEarned = completedStages[stage.id] || 0;
              const isUnlocked = totalStars >= stage.targetStarsToUnlock;
              const isCompleted = starsEarned > 0;

              return (
                <div
                  key={stage.id}
                  className={`relative rounded-2xl border transition-all duration-200 flex flex-col justify-between p-4 ${
                    isUnlocked
                      ? 'bg-white border-amber-200 shadow-xs hover:shadow-md hover:-translate-y-1'
                      : 'bg-slate-100/70 border-slate-200 opacity-75'
                  }`}
                >
                  {/* Top info */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-slate-500">
                        {isKm ? `កម្រិតទី ${stage.id}` : `Stage ${stage.id}`}
                      </span>

                      {/* Stars badge */}
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3].map((starIdx) => (
                          <StarReward
                            key={starIdx}
                            size={18}
                            filled={starsEarned >= starIdx}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Stage Icon & Title */}
                    <div className="flex items-start gap-3 mb-2">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-xs"
                        style={{ backgroundColor: `${stage.color}20`, border: `2px solid ${stage.color}40` }}
                      >
                        {stage.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug font-kids">
                          {isKm ? stage.titleKm : stage.titleEn}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {isKm ? stage.descriptionKm : stage.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    {isUnlocked ? (
                      <>
                        <span className="text-xs text-slate-600 font-medium">
                          {isCompleted
                            ? isKm ? 'បានសម្រេច ✓' : 'Completed ✓'
                            : isKm ? 'រួចរាល់លេង' : 'Ready to Play'}
                        </span>
                        <button
                          onClick={() => {
                            sound.playClick();
                            onSelectStage(stage);
                          }}
                          className="btn-chunky flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-kids text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 active:bg-amber-700 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isKm ? 'លេងឥឡូវ' : 'Play'}</span>
                        </button>
                      </>
                    ) : (
                      <div className="w-full flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1 font-medium">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{isKm ? 'ត្រូវការពិន្ទុផ្កាយ:' : 'Needs Stars:'}</span>
                        </span>
                        <span className="font-bold text-amber-700 tabular-nums">
                          ⭐ {stage.targetStarsToUnlock}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
