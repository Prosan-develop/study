import React from 'react';
import {
  X,
  Volume2,
  Volume1,
  VolumeX,
  Music,
  Bell,
  Mic,
  Sparkles,
  Check,
} from 'lucide-react';
import { Language } from '../types';
import { AudioSettings, sound } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  audioSettings: AudioSettings;
  onUpdateSettings: (newSettings: Partial<AudioSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  audioSettings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const isKm = language === 'km';
  const volumePercent = Math.round(audioSettings.volume * 100);

  const handleTestSound = () => {
    sound.playCorrect();
    sound.speak(isKm ? 'ជំរាបសួរ' : 'Hello', isKm ? 'km' : 'en');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
              ⚙️
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-kids tracking-tight">
                {isKm ? 'ការកំណត់សំឡេង' : 'Audio & Sound Settings'}
              </h3>
              <p className="text-amber-100 text-xs">
                {isKm ? 'កែសម្រួលតន្ត្រី សំឡេងបែបផែន និងកម្រិតសំឡេង' : 'Adjust music, sound effects, and volume'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-black/15 hover:bg-black/25 text-white transition-colors cursor-pointer"
            title={isKm ? 'បិទ' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-6 space-y-6">
          
          {/* 1. Master Volume Slider */}
          <div className="space-y-2 p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80">
            <div className="flex items-center justify-between text-xs font-bold font-kids">
              <span className="flex items-center gap-2 text-slate-800">
                {volumePercent === 0 ? (
                  <VolumeX className="w-4 h-4 text-slate-400" />
                ) : volumePercent < 50 ? (
                  <Volume1 className="w-4 h-4 text-amber-600" />
                ) : (
                  <Volume2 className="w-4 h-4 text-amber-600" />
                )}
                <span>{isKm ? 'កម្រិតសំឡេងរួម' : 'Master Volume'}</span>
              </span>
              <span className="text-amber-800 font-extrabold tabular-nums text-sm">
                {volumePercent}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={volumePercent}
                onChange={(e) => {
                  const val = Number(e.target.value) / 100;
                  onUpdateSettings({ volume: val });
                  sound.setMasterVolume(val);
                }}
                className="w-full h-2.5 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          {/* 2. Independent Toggles */}
          <div className="space-y-3">
            
            {/* Toggle A: Background Music (BGM) */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 transition-colors hover:bg-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-kids">
                    {isKm ? 'តន្ត្រីផ្ទៃខាងក្រោយ' : 'Background Music'}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {isKm ? 'បទភ្លេងពិរោះស្រទន់ពេលកំពុងលេង' : 'Gentle soothing music box melody'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !audioSettings.musicEnabled;
                  onUpdateSettings({ musicEnabled: nextState });
                  sound.setMusicEnabled(nextState);
                  sound.playClick();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  audioSettings.musicEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={audioSettings.musicEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    audioSettings.musicEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle B: Sound Effects (SFX) */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 transition-colors hover:bg-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-kids">
                    {isKm ? 'សំឡេងបែបផែន (SFX)' : 'Sound Effects (SFX)'}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {isKm ? 'សំឡេងចុច ផ្ទុះប៉េងប៉ោង និងឆ្លើយត្រូវ' : 'Pops, clicks, beeps and chimes'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !audioSettings.sfxEnabled;
                  onUpdateSettings({ sfxEnabled: nextState });
                  sound.setSfxEnabled(nextState);
                  if (nextState) sound.playCorrect();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  audioSettings.sfxEnabled ? 'bg-amber-500' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={audioSettings.sfxEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    audioSettings.sfxEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle C: Voice Pronunciation */}
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 transition-colors hover:bg-amber-50/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-kids">
                    {isKm ? 'សំឡេងអានបញ្ចេញសំឡេង' : 'Voice Pronunciation'}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {isKm ? 'អានអក្សរ និងលេខជាភាសាខ្មែរ/អង់គ្លេស' : 'Read letters & words aloud'}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => {
                  const nextState = !audioSettings.voiceEnabled;
                  onUpdateSettings({ voiceEnabled: nextState });
                  sound.setVoiceEnabled(nextState);
                  if (nextState) sound.speak(isKm ? 'ក' : 'A', isKm ? 'km' : 'en');
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  audioSettings.voiceEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
                role="switch"
                aria-checked={audioSettings.voiceEnabled}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    audioSettings.voiceEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Test Sound Button */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleTestSound}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-900 font-kids text-xs font-semibold transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{isKm ? 'សាកល្បងសំឡេង' : 'Test Sound'}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="btn-chunky px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-kids text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>{isKm ? 'រួចរាល់' : 'Done'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
