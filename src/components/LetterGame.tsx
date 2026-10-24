import React, { useState, useEffect } from 'react';
import { Volume2, RefreshCw, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Language, DifficultyLevel, LetterItem } from '../types';
import { KHMER_CONSONANTS, ENGLISH_LETTERS, SIMPLE_WORDS } from '../data/learningData';
import { sound } from '../utils/audio';
import { StarReward } from './CuteIcons';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface LetterGameProps {
  language: Language;
  onFinishStage?: (stars: number) => void;
  initialLevel?: DifficultyLevel;
  onBackToMap?: () => void;
}

export const LetterGame: React.FC<LetterGameProps> = ({
  language,
  onFinishStage,
  initialLevel = 1,
  onBackToMap,
}) => {
  const isKm = language === 'km';
  const [level, setLevel] = useState<DifficultyLevel>(initialLevel);
  const [alphabetMode, setAlphabetMode] = useState<'khmer' | 'english'>('khmer');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  // For Word builder mode
  const [assembledLetters, setAssembledLetters] = useState<string[]>([]);

  // Balloons color palette
  const balloonColors = [
    'from-rose-400 to-red-500',
    'from-amber-400 to-orange-500',
    'from-emerald-400 to-green-600',
    'from-sky-400 to-blue-600',
    'from-purple-400 to-indigo-600',
    'from-pink-400 to-rose-500',
  ];

  const currentDataset = alphabetMode === 'khmer' ? KHMER_CONSONANTS : ENGLISH_LETTERS;

  // Generate 5 questions for the selected level
  const [questions, setQuestions] = useState<any[]>([]);

  const setupQuestions = (lvl: DifficultyLevel, mode: 'khmer' | 'english') => {
    const dataset = mode === 'khmer' ? KHMER_CONSONANTS : ENGLISH_LETTERS;
    const qs: any[] = [];

    if (lvl === 1) {
      // Find letter
      const shuffled = [...dataset].sort(() => Math.random() - 0.5).slice(0, 5);
      shuffled.forEach((target) => {
        const otherOptions = dataset
          .filter((item) => item.id !== target.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        const options = [target, ...otherOptions].sort(() => Math.random() - 0.5);

        qs.push({
          target,
          options,
          promptKm: `ស្វែងរកអក្សរ "${target.char}"`,
          promptEn: `Find the letter "${target.char}"`,
        });
      });
    } else if (lvl === 2) {
      // Balloon pop: Floating target letter among decoys
      const shuffled = [...dataset].sort(() => Math.random() - 0.5).slice(0, 5);
      shuffled.forEach((target) => {
        const decoys = dataset
          .filter((item) => item.id !== target.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        const balloons = [target, ...decoys].sort(() => Math.random() - 0.5);

        qs.push({
          target,
          balloons,
          promptKm: `បំបែកប៉េងប៉ោងអក្សរ "${target.char}" (${target.word})!`,
          promptEn: `Pop the balloon with letter "${target.char}" (${target.word})!`,
        });
      });
    } else if (lvl === 3) {
      // Match letter to object picture
      const shuffled = [...dataset].sort(() => Math.random() - 0.5).slice(0, 5);
      shuffled.forEach((target) => {
        const decoys = dataset
          .filter((item) => item.id !== target.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        const options = [target, ...decoys].sort(() => Math.random() - 0.5);

        qs.push({
          target,
          options,
          promptKm: `តើអក្សរ "${target.char}" ត្រូវនឹងរូបភាពណា?`,
          promptEn: `Which picture starts with letter "${target.char}"?`,
        });
      });
    } else {
      // Word Builder
      const words = SIMPLE_WORDS.slice(0, 5);
      words.forEach((w) => {
        const letters = mode === 'khmer' ? w.lettersKm : w.lettersEn;
        const targetWord = mode === 'khmer' ? w.khmer : w.english;
        // Scrambled letters + 1 decoy
        const decoy = dataset[Math.floor(Math.random() * dataset.length)].char;
        const scrambled = [...letters, decoy].sort(() => Math.random() - 0.5);

        qs.push({
          targetWord,
          letters,
          scrambled,
          wordObj: w,
          promptKm: `តម្រៀបអក្សរដើម្បីសរសេរពាក្យ "${targetWord}"`,
          promptEn: `Assemble letters to spell "${targetWord}"`,
        });
      });
    }

    setQuestions(qs);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setAssembledLetters([]);
    setIsRoundFinished(false);
  };

  useEffect(() => {
    setupQuestions(level, alphabetMode);
  }, [level, alphabetMode]);

  const currentQ = questions[currentIdx];

  const handleSpeak = (text: string) => {
    sound.speak(text, alphabetMode === 'khmer' ? 'km' : 'en');
  };

  // Play letter pronunciation automatically when question changes
  useEffect(() => {
    if (currentQ && currentQ.target) {
      handleSpeak(currentQ.target.char);
    }
  }, [currentIdx, currentQ]);

  const handleSelectOption = (item: LetterItem) => {
    if (selectedOption !== null) return;
    setSelectedOption(item.id);

    const correct = item.id === currentQ.target.id;
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setScore((s) => s + 1);
      triggerParticleExplosion({
        type: 'stars',
        particleCount: 22,
        origin: { x: 0.5, y: 0.4 },
      });
      handleSpeak(item.word);
    } else {
      sound.playWrong();
    }

    setTimeout(() => {
      advanceNext(correct);
    }, 1200);
  };

  const handlePopBalloon = (item: LetterItem) => {
    sound.playPop();
    if (selectedOption !== null) return;

    const correct = item.id === currentQ.target.id;
    setSelectedOption(item.id);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      setScore((s) => s + 1);
      triggerParticleExplosion({
        type: 'stars',
        particleCount: 22,
        origin: { x: 0.5, y: 0.4 },
      });
      handleSpeak(item.word);
    } else {
      sound.playWrong();
    }

    setTimeout(() => {
      advanceNext(correct);
    }, 1000);
  };

  const handleLetterTapWordBuilder = (char: string) => {
    sound.playPop();
    const updated = [...assembledLetters, char];
    setAssembledLetters(updated);

    const targetWordLetters = currentQ.letters as string[];

    // Check if finished
    if (updated.length === targetWordLetters.length) {
      const isWordCorrect = updated.join('') === targetWordLetters.join('');
      setIsCorrect(isWordCorrect);
      setSelectedOption('done');

      if (isWordCorrect) {
        sound.playCorrect();
        setScore((s) => s + 1);
        triggerParticleExplosion({
          type: 'stars',
          particleCount: 30,
          origin: { x: 0.5, y: 0.4 },
        });
        handleSpeak(currentQ.targetWord);
      } else {
        sound.playWrong();
      }

      setTimeout(() => {
        advanceNext(isWordCorrect);
      }, 1400);
    }
  };

  const advanceNext = (lastWasCorrect: boolean) => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setAssembledLetters([]);
    } else {
      setIsRoundFinished(true);
      const finalScore = score + (lastWasCorrect ? 1 : 0);
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
  };

  const handleRestart = () => {
    sound.playClick();
    setupQuestions(level, alphabetMode);
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
              {isKm ? 'ស្វែងរកអក្សរ & ពាក្យ' : 'Letters & Phonics'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{isKm ? `កម្រិតទី ${level}` : `Level ${level}`}</span>
              <span aria-hidden="true">·</span>
              <span>
                {level === 1
                  ? isKm ? 'ស្វែងរកអក្សរ' : 'Find Letter'
                  : level === 2
                  ? isKm ? 'បំបែកប៉េងប៉ោង' : 'Balloon Pop'
                  : level === 3
                  ? isKm ? 'ផ្គូផ្គងអក្សរនិងរូបភាព' : 'Picture Match'
                  : isKm ? 'តម្រៀបពាក្យ' : 'Word Builder'}
              </span>
            </div>
          </div>
        </div>

        {/* Alphabet Toggle & Level Switcher */}
        <div className="flex items-center gap-2">
          {/* Alphabet Mode Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setAlphabetMode(alphabetMode === 'khmer' ? 'english' : 'khmer');
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-100/70 hover:bg-amber-200 text-amber-900 transition-colors"
          >
            {alphabetMode === 'khmer' ? 'ព្យញ្ជនៈខ្មែរ (ក ខ គ)' : 'English ABC'}
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

      {/* Main Game Interface */}
      {!isRoundFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm text-center relative overflow-hidden">
          {/* Progress dots & score */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold text-slate-500">
              {isKm ? `សំណួរ ${currentIdx + 1} នៃ ៥` : `Question ${currentIdx + 1} of 5`}
            </span>
            <div className="flex items-center gap-1.5">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${
                    i === currentIdx
                      ? 'w-7 bg-amber-500'
                      : i < currentIdx
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

          {/* Question Prompt with Speaker Audio Button */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <h3 className="text-lg sm:text-2xl font-bold font-kids text-slate-900 leading-snug">
              {isKm ? currentQ.promptKm : currentQ.promptEn}
            </h3>
            {currentQ.target && (
              <button
                onClick={() => handleSpeak(currentQ.target.char)}
                className="p-2 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors shadow-xs"
                title="ស្ដាប់សំឡេងអាន"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* LEVEL 1: Find Letter Cards */}
          {level === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto my-6">
              {currentQ.options.map((item: LetterItem) => {
                const isSelected = selectedOption === item.id;
                const isThisCorrect = item.id === currentQ.target.id;

                let cardStyle = 'bg-white hover:bg-amber-50/70 border-2 border-slate-200 text-slate-800';
                if (isSelected) {
                  cardStyle = isCorrect
                    ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105'
                    : 'bg-rose-500 text-white border-2 border-rose-600 animate-wobble';
                } else if (selectedOption !== null && isThisCorrect) {
                  cardStyle = 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400';
                }

                return (
                  <button
                    key={item.id}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(item)}
                    className={`btn-chunky py-6 px-4 rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${cardStyle}`}
                  >
                    <span className="text-4xl sm:text-5xl font-bold font-kids">{item.char}</span>
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs font-semibold opacity-80">{item.word}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* LEVEL 2: Balloon Pop Challenge */}
          {level === 2 && (
            <div className="relative min-h-[300px] bg-gradient-to-b from-sky-100/80 via-sky-50/50 to-amber-50/30 rounded-3xl p-6 border border-sky-200 overflow-hidden my-4 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {currentQ.balloons.map((item: LetterItem, bIdx: number) => {
                const isPopped = selectedOption === item.id;
                const colorGradient = balloonColors[bIdx % balloonColors.length];

                return (
                  <button
                    key={item.id}
                    disabled={selectedOption !== null}
                    onClick={() => handlePopBalloon(item)}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 animate-float`}
                    style={{ animationDelay: `${(bIdx * 0.4) % 2}s` }}
                  >
                    {/* Balloon Body */}
                    <div
                      className={`w-20 h-24 sm:w-24 sm:h-28 rounded-full bg-gradient-to-b ${colorGradient} shadow-md flex items-center justify-center text-white relative transition-transform ${
                        isPopped ? 'scale-0 opacity-0' : ''
                      }`}
                    >
                      {/* Shine reflection */}
                      <div className="absolute top-2 left-3 w-4 h-6 rounded-full bg-white/40 transform -rotate-20" />
                      <span className="text-3xl sm:text-4xl font-black font-kids drop-shadow-xs">
                        {item.char}
                      </span>
                    </div>
                    {/* Balloon knot and string */}
                    <div
                      className={`w-2 h-2 bg-amber-700/60 rounded-xs -mt-0.5 ${
                        isPopped ? 'opacity-0' : ''
                      }`}
                    />
                    <div
                      className={`w-0.5 h-6 bg-slate-400/50 ${
                        isPopped ? 'opacity-0' : ''
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* LEVEL 3: Picture Match */}
          {level === 3 && (
            <div className="my-6 space-y-6">
              {/* Target Letter Display */}
              <div className="inline-flex flex-col items-center justify-center p-6 bg-amber-100 rounded-3xl border-2 border-amber-300 shadow-sm animate-pulse-subtle">
                <span className="text-5xl sm:text-6xl font-black text-amber-800 font-kids">
                  {currentQ.target.char}
                </span>
                <span className="text-xs font-semibold text-amber-700 mt-1">
                  {currentQ.target.phonetic}
                </span>
              </div>

              {/* Picture Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
                {currentQ.options.map((item: LetterItem) => {
                  const isSelected = selectedOption === item.id;
                  const isThisCorrect = item.id === currentQ.target.id;

                  let style = 'bg-white hover:bg-amber-50/70 border-2 border-slate-200';
                  if (isSelected) {
                    style = isCorrect
                      ? 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105'
                      : 'bg-rose-500 text-white border-2 border-rose-600 animate-wobble';
                  } else if (selectedOption !== null && isThisCorrect) {
                    style = 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400';
                  }

                  return (
                    <button
                      key={item.id}
                      disabled={selectedOption !== null}
                      onClick={() => handleSelectOption(item)}
                      className={`btn-chunky py-5 px-3 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${style}`}
                    >
                      <span className="text-4xl sm:text-5xl">{item.emoji}</span>
                      <span className="text-sm font-bold font-kids">{item.word}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEVEL 4: Word Builder */}
          {level === 4 && (
            <div className="my-6 space-y-6 max-w-lg mx-auto">
              {/* Picture and Hint */}
              <div className="flex flex-col items-center">
                <span className="text-6xl sm:text-7xl mb-2">{currentQ.wordObj.emoji}</span>
                <p className="text-xs text-slate-500">
                  {isKm ? currentQ.wordObj.hintKm : currentQ.wordObj.hintEn}
                </p>
              </div>

              {/* Assembled Slots */}
              <div className="flex items-center justify-center gap-3">
                {currentQ.letters.map((_: any, sIdx: number) => {
                  const filledChar = assembledLetters[sIdx];
                  return (
                    <div
                      key={sIdx}
                      className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl font-bold font-kids shadow-sm ${
                        filledChar
                          ? 'bg-amber-100 border-2 border-amber-400 text-amber-900'
                          : 'border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400'
                      }`}
                    >
                      {filledChar || '_'}
                    </div>
                  );
                })}
              </div>

              {/* Scrambled Letters to choose */}
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {currentQ.scrambled.map((char: string, cIdx: number) => {
                  return (
                    <button
                      key={cIdx}
                      onClick={() => handleLetterTapWordBuilder(char)}
                      disabled={assembledLetters.length >= currentQ.letters.length}
                      className="btn-chunky w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 border-2 border-amber-300 text-2xl sm:text-3xl font-bold font-kids flex items-center justify-center"
                    >
                      {char}
                    </button>
                  );
                })}
              </div>

              {/* Clear assembled letters button */}
              {assembledLetters.length > 0 && selectedOption === null && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setAssembledLetters([]);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                >
                  {isKm ? 'លុបសរសេរឡើងវិញ (Clear)' : 'Clear and try again'}
                </button>
              )}
            </div>
          )}

          {/* Feedback message banner */}
          {selectedOption !== null && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {isCorrect ? (
                <div className="inline-flex items-center gap-2 text-emerald-700 font-bold font-kids text-base sm:text-lg bg-emerald-100 px-4 py-2 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isKm ? 'ឆ្លើយត្រូវហើយ! ពូកែណាស់ 🎉' : 'Awesome! Correct answer 🎉'}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-amber-800 font-bold font-kids text-base sm:text-lg bg-amber-100 px-4 py-2 rounded-2xl">
                  <span>{isKm ? 'ខិតខំបន្ថែមទៀតណា! ជិតត្រូវហើយ ✨' : 'Nice try! Keep it up ✨'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Round Summary Card */
        <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm text-center max-w-md mx-auto space-y-6">
          <div className="text-5xl">🎉</div>
          <h3 className="text-2xl font-bold font-kids text-slate-900">
            {isKm ? 'អបអរសាទរ! បញ្ចប់កម្រិតអក្សរហើយ!' : 'Hooray! Letters Round Finished!'}
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
                className="btn-chunky w-full sm:w-auto px-5 py-2.5 rounded-xl font-kids text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
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
