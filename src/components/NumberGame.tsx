import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, Award, ArrowLeft, Volume2, Sparkles } from 'lucide-react';
import { Language, DifficultyLevel } from '../types';
import { NUMBERS_DATA } from '../data/learningData';
import { sound } from '../utils/audio';
import { StarReward } from './CuteIcons';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface NumberGameProps {
  language: Language;
  onFinishStage?: (stars: number) => void;
  initialLevel?: DifficultyLevel;
  onBackToMap?: () => void;
}

interface Question {
  type: 'count' | 'sequence' | 'math' | 'compare';
  items?: string[];
  promptKm: string;
  promptEn: string;
  targetAnswer: number | string;
  options: (number | string)[];
  mathEquation?: { num1: number; op: '+' | '-'; num2: number; emoji: string };
  sequence?: (number | string)[];
  compareData?: { leftCount: number; rightCount: number; emoji: string };
}

export const NumberGame: React.FC<NumberGameProps> = ({
  language,
  onFinishStage,
  initialLevel = 1,
  onBackToMap,
}) => {
  const isKm = language === 'km';
  const [level, setLevel] = useState<DifficultyLevel>(initialLevel);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [numeralMode, setNumeralMode] = useState<'khmer' | 'arabic'>('khmer');
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  // Emojis for fun counting
  const fruitEmojis = ['🍎', '🍓', '🍌', '⭐', '🎈', '🚗', '🐱', '🌸', '🧁', '⚽'];

  // Generate 5 questions based on current difficulty level
  const generateQuestions = (lvl: DifficultyLevel): Question[] => {
    const qs: Question[] = [];
    const countLimit = lvl === 1 ? 5 : lvl === 2 ? 10 : 15;

    for (let i = 0; i < 5; i++) {
      if (lvl === 1) {
        // Level 1: Counting 1-5 items
        const count = Math.floor(Math.random() * 5) + 1;
        const emoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];
        const items = Array(count).fill(emoji);

        // Generate 3 choices
        const choices = new Set<number>([count]);
        while (choices.size < 3) {
          const fake = Math.floor(Math.random() * 5) + 1;
          choices.add(fake);
        }

        qs.push({
          type: 'count',
          items,
          promptKm: `តើមានចំនួនប៉ុន្មាន? ចុចរាប់វត្ថុទាំងអស់!`,
          promptEn: `How many items are there? Tap to count them!`,
          targetAnswer: count,
          options: Array.from(choices).sort(() => Math.random() - 0.5),
        });
      } else if (lvl === 2) {
        // Level 2: Sequence & Missing number 1-10
        const start = Math.floor(Math.random() * 6) + 1; // e.g. 3
        const fullSeq = [start, start + 1, start + 2, start + 3];
        const missingIndex = Math.floor(Math.random() * 4);
        const missingValue = fullSeq[missingIndex];
        const displaySeq = fullSeq.map((v, idx) => (idx === missingIndex ? '?' : v));

        const choices = new Set<number>([missingValue]);
        while (choices.size < 4) {
          const fake = Math.max(1, missingValue + (Math.floor(Math.random() * 5) - 2));
          choices.add(fake);
        }

        qs.push({
          type: 'sequence',
          sequence: displaySeq,
          promptKm: 'ស្វែងរកលេខដែលបាត់នៅក្នុងជួរលេខនេះ?',
          promptEn: 'Find the missing number in this sequence!',
          targetAnswer: missingValue,
          options: Array.from(choices).sort((a, b) => a - b),
        });
      } else if (lvl === 3) {
        // Level 3: Visual addition / subtraction
        const isAddition = Math.random() > 0.3;
        const emoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

        if (isAddition) {
          const n1 = Math.floor(Math.random() * 5) + 1;
          const n2 = Math.floor(Math.random() * 5) + 1;
          const sum = n1 + n2;
          const choices = new Set<number>([sum]);
          while (choices.size < 4) {
            choices.add(Math.max(1, sum + Math.floor(Math.random() * 5) - 2));
          }

          qs.push({
            type: 'math',
            mathEquation: { num1: n1, op: '+', num2: n2, emoji },
            promptKm: `បូកចំនួនទាំងអស់ជាមួយគ្នា!`,
            promptEn: `Add the numbers together!`,
            targetAnswer: sum,
            options: Array.from(choices).sort(() => Math.random() - 0.5),
          });
        } else {
          const n1 = Math.floor(Math.random() * 5) + 4; // 4 to 8
          const n2 = Math.floor(Math.random() * 3) + 1; // 1 to 3
          const diff = n1 - n2;
          const choices = new Set<number>([diff]);
          while (choices.size < 4) {
            choices.add(Math.max(1, diff + Math.floor(Math.random() * 5) - 2));
          }

          qs.push({
            type: 'math',
            mathEquation: { num1: n1, op: '-', num2: n2, emoji },
            promptKm: `ដកចំនួនចេញ ហើយរកចម្លើយដែលនៅសល់!`,
            promptEn: `Subtract and find how many are left!`,
            targetAnswer: diff,
            options: Array.from(choices).sort(() => Math.random() - 0.5),
          });
        }
      } else {
        // Level 4: Comparison (> , < , =) or higher addition up to 20
        const leftCount = Math.floor(Math.random() * 9) + 1;
        let rightCount = Math.floor(Math.random() * 9) + 1;
        if (Math.random() < 0.25) rightCount = leftCount; // Sometimes equal

        const correctSymbol =
          leftCount > rightCount ? '>' : leftCount < rightCount ? '<' : '=';

        const emoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];

        qs.push({
          type: 'compare',
          compareData: { leftCount, rightCount, emoji },
          promptKm: 'ប្រៀបធៀបបរិមាណ ជ្រើសរើសសញ្ញា (> , < , =)',
          promptEn: 'Compare quantities! Choose the right sign (> , < , =)',
          targetAnswer: correctSymbol,
          options: ['>', '<', '='],
        });
      }
    }
    return qs;
  };

  useEffect(() => {
    const newQs = generateQuestions(level);
    setQuestions(newQs);
    setCurrentQuestionIdx(0);
    setScore(0);
    setTappedItems([]);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setIsRoundFinished(false);
  }, [level]);

  const currentQ = questions[currentQuestionIdx];

  const formatNumberDisplay = (num: number | string): string => {
    if (typeof num === 'string') return num;
    if (numeralMode === 'khmer') {
      const found = NUMBERS_DATA.find((n) => n.value === num);
      return found ? found.khmerChar : `${num}`;
    }
    return `${num}`;
  };

  const getNumberWord = (num: number): string => {
    const found = NUMBERS_DATA.find((n) => n.value === num);
    if (!found) return '';
    return isKm ? found.khmerWord : found.englishWord;
  };

  const handleItemTap = (idx: number) => {
    if (tappedItems.includes(idx)) return;
    const nextCount = tappedItems.length + 1;
    sound.playCountBeep(nextCount);
    setTappedItems([...tappedItems, idx]);
  };

  const handleSelectAnswer = (ans: number | string) => {
    if (selectedAnswer !== null) return; // Prevent double taps

    setSelectedAnswer(ans);
    const correct = ans === currentQ.targetAnswer;
    setIsAnswerCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
      triggerParticleExplosion({
        type: 'stars',
        particleCount: 22,
        origin: { x: 0.5, y: 0.4 },
      });
      if (typeof ans === 'number') {
        const textToSay = isKm
          ? getNumberWord(ans)
          : `${ans}`;
        sound.speak(textToSay, isKm ? 'km' : 'en');
      }
    } else {
      sound.playWrong();
    }

    // Auto advance after 1.2s
    setTimeout(() => {
      if (currentQuestionIdx + 1 < questions.length) {
        setCurrentQuestionIdx((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setTappedItems([]);
      } else {
        // Round Finished!
        setIsRoundFinished(true);
        const finalScore = score + (correct ? 1 : 0);
        const earnedStars = finalScore >= 5 ? 3 : finalScore >= 3 ? 2 : 1;
        sound.playVictoryFanfare();
        
        triggerParticleExplosion({
          type: 'stars',
          particleCount: 90,
          origin: { x: 0.5, y: 0.5 },
        });

        popFloatingReward({
          icon: '⭐',
          text: `+${earnedStars} ${isKm ? 'ផ្កាយ' : 'Stars'}!`,
          x: 50,
          y: 44,
          color: '#CA8A04',
        });

        if (onFinishStage) {
          onFinishStage(earnedStars);
        }
      }
    }, 1200);
  };

  const handleRestart = () => {
    sound.playClick();
    const newQs = generateQuestions(level);
    setQuestions(newQs);
    setCurrentQuestionIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setTappedItems([]);
    setIsRoundFinished(false);
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
              {isKm ? 'រាប់លេខ & គណនា' : 'Numbers & Counting'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{isKm ? `កម្រិតទី ${level}` : `Level ${level}`}</span>
              <span aria-hidden="true">·</span>
              <span>
                {level === 1
                  ? isKm ? 'រាប់វត្ថុ (១-៥)' : 'Count Items (1-5)'
                  : level === 2
                  ? isKm ? 'លំដាប់លេខ' : 'Number Sequences'
                  : level === 3
                  ? isKm ? 'បូកដកលេខ' : 'Math Addition & Subtraction'
                  : isKm ? 'ប្រៀបធៀបចំនួន' : 'Number Comparisons'}
              </span>
            </div>
          </div>
        </div>

        {/* Level Selector & Khmer/Arabic Numerals toggle */}
        <div className="flex items-center gap-2">
          {/* Numerals Format Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setNumeralMode(numeralMode === 'khmer' ? 'arabic' : 'khmer');
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-100/70 hover:bg-amber-200 text-amber-900 transition-colors"
            title="ប្តូរប្រភេទលេខ (Khmer / Arabic numerals)"
          >
            {numeralMode === 'khmer' ? 'លេខខ្មែរ (១, ២)' : 'Arabic (1, 2)'}
          </button>

          {/* Level Switcher (1-4) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {([1, 2, 3, 4] as DifficultyLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  sound.playClick();
                  setLevel(lvl);
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors font-kids ${
                  level === lvl
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Game Content Card */}
      {!isRoundFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm text-center relative overflow-hidden">
          {/* Progress dots */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-slate-500">
              {isKm ? `សំណួរ ${currentQuestionIdx + 1} នៃ ៥` : `Question ${currentQuestionIdx + 1} of 5`}
            </span>
            <div className="flex items-center gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentQuestionIdx
                      ? 'w-7 bg-amber-500'
                      : i < currentQuestionIdx
                      ? 'w-2.5 bg-emerald-500'
                      : 'w-2.5 bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-700">
              ⭐ {score} / 5
            </span>
          </div>

          {/* Question Prompt */}
          <h3 className="text-lg sm:text-2xl font-bold font-kids text-slate-900 mb-6 leading-snug">
            {isKm ? currentQ.promptKm : currentQ.promptEn}
          </h3>

          {/* Visual Display based on question type */}
          <div className="min-h-[160px] flex items-center justify-center mb-8 bg-amber-50/40 rounded-2xl p-6 border border-dashed border-amber-200">
            {/* TYPE 1: Counting Items */}
            {currentQ.type === 'count' && currentQ.items && (
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 max-w-lg">
                {currentQ.items.map((emoji, idx) => {
                  const isTapped = tappedItems.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleItemTap(idx)}
                      className={`relative text-4xl sm:text-6xl p-3 rounded-2xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer ${
                        isTapped
                          ? 'bg-amber-200/80 shadow-md ring-3 ring-amber-400 scale-105'
                          : 'bg-white shadow-xs hover:shadow-md'
                      }`}
                    >
                      <span>{emoji}</span>
                      {isTapped && (
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                          {formatNumberDisplay(tappedItems.indexOf(idx) + 1)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* TYPE 2: Sequence */}
            {currentQ.type === 'sequence' && currentQ.sequence && (
              <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
                {currentQ.sequence.map((val, idx) => {
                  const isBlank = val === '?';
                  return (
                    <div
                      key={idx}
                      className={`w-16 h-20 sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-bold font-kids shadow-sm ${
                        isBlank
                          ? 'border-3 border-dashed border-amber-400 bg-amber-100/60 text-amber-700 animate-pulse-subtle'
                          : 'bg-white border-2 border-slate-200 text-slate-800'
                      }`}
                    >
                      {isBlank ? '?' : formatNumberDisplay(val)}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TYPE 3: Math Addition & Subtraction */}
            {currentQ.type === 'math' && currentQ.mathEquation && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                {/* Num 1 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-wrap justify-center gap-1.5 max-w-[140px]">
                    {Array.from({ length: currentQ.mathEquation.num1 }).map((_, i) => (
                      <span key={i} className="text-2xl sm:text-3xl">
                        {currentQ.mathEquation?.emoji}
                      </span>
                    ))}
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold font-kids text-slate-800">
                    {formatNumberDisplay(currentQ.mathEquation.num1)}
                  </span>
                </div>

                {/* Operator */}
                <span className="text-3xl sm:text-5xl font-black text-amber-600 font-kids">
                  {currentQ.mathEquation.op}
                </span>

                {/* Num 2 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex flex-wrap justify-center gap-1.5 max-w-[140px]">
                    {Array.from({ length: currentQ.mathEquation.num2 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl sm:text-3xl ${
                          currentQ.mathEquation?.op === '-' ? 'opacity-40 line-through' : ''
                        }`}
                      >
                        {currentQ.mathEquation?.emoji}
                      </span>
                    ))}
                  </div>
                  <span className="text-2xl sm:text-3xl font-bold font-kids text-slate-800">
                    {formatNumberDisplay(currentQ.mathEquation.num2)}
                  </span>
                </div>

                {/* Equal */}
                <span className="text-3xl sm:text-5xl font-black text-slate-400 font-kids">
                  =
                </span>

                {/* Target placeholder */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-3 border-dashed border-amber-400 bg-amber-100/50 flex items-center justify-center text-3xl font-bold text-amber-600 font-kids">
                  ?
                </div>
              </div>
            )}

            {/* TYPE 4: Comparison */}
            {currentQ.type === 'compare' && currentQ.compareData && (
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                {/* Left group */}
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
                  <div className="flex flex-wrap justify-center gap-1 max-w-[120px] mb-2 min-h-[60px] items-center">
                    {Array.from({ length: currentQ.compareData.leftCount }).map((_, i) => (
                      <span key={i} className="text-2xl">
                        {currentQ.compareData?.emoji}
                      </span>
                    ))}
                  </div>
                  <span className="text-2xl font-bold font-kids text-slate-800">
                    {formatNumberDisplay(currentQ.compareData.leftCount)}
                  </span>
                </div>

                {/* Center placeholder */}
                <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 flex items-center justify-center text-2xl font-bold text-amber-600">
                  ?
                </div>

                {/* Right group */}
                <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-xs border border-slate-200">
                  <div className="flex flex-wrap justify-center gap-1 max-w-[120px] mb-2 min-h-[60px] items-center">
                    {Array.from({ length: currentQ.compareData.rightCount }).map((_, i) => (
                      <span key={i} className="text-2xl">
                        {currentQ.compareData?.emoji}
                      </span>
                    ))}
                  </div>
                  <span className="text-2xl font-bold font-kids text-slate-800">
                    {formatNumberDisplay(currentQ.compareData.rightCount)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isThisCorrect = option === currentQ.targetAnswer;

              let btnStyle = 'bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-200 shadow-sm';
              if (isSelected) {
                if (isAnswerCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105';
                } else {
                  btnStyle = 'bg-rose-500 text-white border-2 border-rose-600 animate-wobble';
                }
              } else if (selectedAnswer !== null && isThisCorrect) {
                btnStyle = 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400';
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectAnswer(option)}
                  className={`btn-chunky py-4 sm:py-5 px-3 rounded-2xl font-kids text-2xl sm:text-3xl font-bold flex flex-col items-center justify-center cursor-pointer ${btnStyle}`}
                >
                  <span>{formatNumberDisplay(option)}</span>
                  {typeof option === 'number' && (
                    <span className="text-xs font-normal mt-1 opacity-75">
                      {getNumberWord(option)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Encouragement message banner */}
          {selectedAnswer !== null && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {isAnswerCorrect ? (
                <div className="inline-flex items-center gap-2 text-emerald-700 font-bold font-kids text-base sm:text-lg bg-emerald-100 px-4 py-2 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isKm ? 'ពូកែណាស់! ត្រឹមត្រូវហើយ 🎉' : 'Awesome! That is correct 🎉'}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-amber-800 font-bold font-kids text-base sm:text-lg bg-amber-100 px-4 py-2 rounded-2xl">
                  <span>{isKm ? 'មិនអីទេ! សាកល្បងម្ដងទៀតនៅសំណួរបន្ទាប់ ✨' : 'Nice try! Keep going on the next one ✨'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Round Summary Card */
        <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm text-center max-w-md mx-auto space-y-6">
          <div className="text-5xl">🏆</div>
          <h3 className="text-2xl font-bold font-kids text-slate-900">
            {isKm ? 'អបអរសាទរ! សម្រេចកម្រិតនេះហើយ!' : 'Hooray! Round Completed!'}
          </h3>

          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3].map((starIdx) => {
              const isEarned = (score >= 5 ? 3 : score >= 3 ? 2 : 1) >= starIdx;
              return <StarReward key={starIdx} size={44} filled={isEarned} />;
            })}
          </div>

          <p className="text-slate-600 text-sm">
            {isKm
              ? `អ្នកឆ្លើយត្រូវ ${score} ក្នុងចំណោម ៥ សំណួរ!`
              : `You scored ${score} out of 5 questions correctly!`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
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
