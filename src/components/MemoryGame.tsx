import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowLeft, Trophy } from 'lucide-react';
import { Language } from '../types';
import { KHMER_CONSONANTS, NUMBERS_DATA } from '../data/learningData';
import { sound } from '../utils/audio';
import { StarReward } from './CuteIcons';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface MemoryCard {
  uniqueId: string;
  pairId: string;
  display: string;
  subText: string;
  type: 'symbol' | 'visual';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  language: Language;
  onFinishStage?: (stars: number) => void;
  onBackToMap?: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({
  language,
  onFinishStage,
  onBackToMap,
}) => {
  const isKm = language === 'km';
  const [gridSize, setGridSize] = useState<4 | 6 | 8 | 12>(6);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize cards
  const setupGame = (pairsCount: number) => {
    // Pick pairs from both numbers and letters
    const numberPairs = [
      { id: 'p-1', symbol: '១', visual: '🍎', nameKm: 'មួយ', nameEn: 'One' },
      { id: 'p-2', symbol: '២', visual: '⭐⭐', nameKm: 'ពីរ', nameEn: 'Two' },
      { id: 'p-3', symbol: '៣', visual: '🎈🎈🎈', nameKm: 'បី', nameEn: 'Three' },
      { id: 'p-4', symbol: '៤', visual: '🚗🚗🚗🚗', nameKm: 'បួន', nameEn: 'Four' },
      { id: 'p-5', symbol: '៥', visual: '🌸🌸🌸🌸🌸', nameKm: 'ប្រាំ', nameEn: 'Five' },
    ];

    const letterPairs = [
      { id: 'l-1', symbol: 'ក', visual: '🐸', nameKm: 'កង្កែប', nameEn: 'Frog' },
      { id: 'l-2', symbol: 'ខ', visual: '🐯', nameKm: 'ខ្លា', nameEn: 'Tiger' },
      { id: 'l-3', symbol: 'គ', visual: '🐮', nameKm: 'គោ', nameEn: 'Cow' },
      { id: 'l-4', symbol: 'ឆ', visual: '🐱', nameKm: 'ឆ្មា', nameEn: 'Cat' },
      { id: 'l-5', symbol: 'ដ', visual: '🐘', nameKm: 'ដំរី', nameEn: 'Elephant' },
      { id: 'l-6', symbol: 'ច', visual: '🐦', nameKm: 'ចាប', nameEn: 'Bird' },
    ];

    const pool = [...numberPairs, ...letterPairs].sort(() => Math.random() - 0.5).slice(0, pairsCount);

    const generated: MemoryCard[] = [];
    pool.forEach((item, idx) => {
      // Card 1: Symbol (e.g. "ក" or "១")
      generated.push({
        uniqueId: `card-${idx}-sym`,
        pairId: item.id,
        display: item.symbol,
        subText: isKm ? item.nameKm : item.nameEn,
        type: 'symbol',
        isFlipped: false,
        isMatched: false,
      });

      // Card 2: Visual (e.g. 🐸 or 🍎🍎)
      generated.push({
        uniqueId: `card-${idx}-vis`,
        pairId: item.id,
        display: item.visual,
        subText: isKm ? item.nameKm : item.nameEn,
        type: 'visual',
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(generated.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
    setIsProcessing(false);
  };

  useEffect(() => {
    setupGame(gridSize / 2);
  }, [gridSize]);

  const handleCardClick = (card: MemoryCard) => {
    if (isProcessing || card.isFlipped || card.isMatched) return;

    sound.playPop();

    const updated = cards.map((c) =>
      c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c
    );
    setCards(updated);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsProcessing(true);

      const [first, second] = newFlipped;
      if (first.pairId === second.pairId) {
        // Matched!
        setTimeout(() => {
          sound.playCorrect();
          sound.speak(first.subText, isKm ? 'km' : 'en');
          triggerParticleExplosion({
            type: 'stars',
            particleCount: 20,
            origin: { x: 0.5, y: 0.4 },
          });
          const matchedState = updated.map((c) =>
            c.pairId === first.pairId ? { ...c, isMatched: true } : c
          );
          setCards(matchedState);
          setFlippedCards([]);
          setIsProcessing(false);

          // Check if all cards matched
          if (matchedState.every((c) => c.isMatched)) {
            setIsWon(true);
            sound.playVictoryFanfare();
            triggerParticleExplosion({
              type: 'stars',
              particleCount: 95,
              origin: { x: 0.5, y: 0.5 },
            });
            popFloatingReward({
              icon: '⭐',
              text: `+3 ${isKm ? 'ផ្កាយ' : 'Stars'}!`,
              x: 50,
              y: 44,
              color: '#CA8A04',
            });
            if (onFinishStage) {
              onFinishStage(3);
            }
          }
        }, 600);
      } else {
        // Not matched - flip back
        setTimeout(() => {
          sound.playWrong();
          const resetFlipped = updated.map((c) =>
            c.uniqueId === first.uniqueId || c.uniqueId === second.uniqueId
              ? { ...c, isFlipped: false }
              : c
          );
          setCards(resetFlipped);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1100);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          {onBackToMap && (
            <button
              onClick={onBackToMap}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-amber-100/60 transition-colors"
              title="ត្រឡប់ទៅផែនទី"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-kids text-slate-900">
              {isKm ? 'ផ្គូផ្គងការចងចាំ' : 'Memory Card Match'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>
                {isKm ? `បង្វិលសរុប: ${moves}` : `Moves: ${moves}`}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isKm ? 'ស្វែងរកគូដែលដូចគ្នា' : 'Find Matching Pairs'}</span>
            </div>
          </div>
        </div>

        {/* Card count selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {([4, 6, 8, 12] as const).map((size) => (
            <button
              key={size}
              onClick={() => {
                sound.playClick();
                setGridSize(size);
              }}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors font-kids ${
                gridSize === size
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {size} {isKm ? 'សន្លឹក' : 'Cards'}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Table */}
      {!isWon ? (
        <div
          className={`grid gap-3 sm:gap-4 max-w-2xl mx-auto p-4 bg-amber-50/50 rounded-3xl border border-amber-200/60 ${
            gridSize <= 6
              ? 'grid-cols-2 sm:grid-cols-3'
              : gridSize === 8
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-3 sm:grid-cols-4'
          }`}
        >
          {cards.map((card) => {
            const showFace = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.uniqueId}
                disabled={card.isMatched || isProcessing}
                onClick={() => handleCardClick(card)}
                className={`btn-chunky h-32 sm:h-36 rounded-2xl flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer ${
                  card.isMatched
                    ? 'bg-emerald-100 border-2 border-emerald-400 opacity-90'
                    : showFace
                    ? 'bg-white border-2 border-amber-400 shadow-md'
                    : 'bg-gradient-to-tr from-amber-400 to-orange-400 border-2 border-amber-500 text-white'
                }`}
              >
                {showFace ? (
                  <div className="flex flex-col items-center justify-center">
                    <span
                      className={`font-kids font-bold leading-tight ${
                        card.type === 'symbol'
                          ? 'text-4xl sm:text-5xl text-amber-900'
                          : 'text-2xl sm:text-3xl'
                      }`}
                    >
                      {card.display}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 mt-1">
                      {card.subText}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl sm:text-4xl">🌟</span>
                    <span className="text-[11px] font-bold tracking-wider opacity-80 mt-1 font-kids">
                      SMART
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Victory modal card */
        <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm text-center max-w-md mx-auto space-y-6">
          <div className="text-6xl animate-bounce">🏆</div>
          <h3 className="text-2xl font-bold font-kids text-slate-900">
            {isKm ? 'អស្ចារ្យណាស់! ការចងចាំល្អឥតខ្ចោះ!' : 'Brilliant Memory Master!'}
          </h3>

          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3].map((starIdx) => (
              <StarReward key={starIdx} size={44} filled={true} />
            ))}
          </div>

          <p className="text-slate-600 text-sm">
            {isKm
              ? `អ្នកបានផ្គូផ្គងសន្លឹកបៀទាំងអស់ ដោយប្រើត្រឹមតែ ${moves} ជំហាន!`
              : `You matched all cards successfully in just ${moves} moves!`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setupGame(gridSize / 2)}
              className="btn-chunky w-full sm:w-auto px-5 py-2.5 rounded-xl font-kids text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isKm ? 'លេងម្ដងទៀត' : 'Play Again'}</span>
            </button>

            {onBackToMap && (
              <button
                onClick={onBackToMap}
                className="btn-chunky w-full sm:w-auto px-5 py-2.5 rounded-xl font-kids text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2"
              >
                <span>{isKm ? 'ត្រឡប់ទៅផែនទី' : 'Back to Map'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
