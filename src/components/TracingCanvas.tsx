import React, { useRef, useState, useEffect } from 'react';
import { Eraser, RotateCcw, Check, Sparkles, Volume2, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/audio';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface TracingCanvasProps {
  language: Language;
  onBackToMap?: () => void;
  onFinishStage?: (stars: number) => void;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  language,
  onBackToMap,
  onFinishStage,
}) => {
  const isKm = language === 'km';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColor, setActiveColor] = useState('#F59E0B');
  const [brushSize, setBrushSize] = useState(14);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Available characters for tracing
  const traceItems = [
    { char: 'ក', type: 'khmer-letter', nameKm: 'ក (កង្កែប)', nameEn: 'Ka (Frog)', soundText: 'ក' },
    { char: 'ខ', type: 'khmer-letter', nameKm: 'ខ (ខ្លា)', nameEn: 'Kha (Tiger)', soundText: 'ខ' },
    { char: 'គ', type: 'khmer-letter', nameKm: 'គ (គោ)', nameEn: 'Ko (Cow)', soundText: 'គ' },
    { char: '១', type: 'khmer-number', nameKm: 'លេខ ១ (មួយ)', nameEn: 'Khmer 1 (One)', soundText: 'មួយ' },
    { char: '២', type: 'khmer-number', nameKm: 'លេខ ២ (ពីរ)', nameEn: 'Khmer 2 (Two)', soundText: 'ពីរ' },
    { char: '៣', type: 'khmer-number', nameKm: 'លេខ ៣ (បី)', nameEn: 'Khmer 3 (Three)', soundText: 'បី' },
    { char: 'A', type: 'english-letter', nameKm: 'អក្សរ A', nameEn: 'Letter A', soundText: 'A' },
    { char: 'B', type: 'english-letter', nameKm: 'អក្សរ B', nameEn: 'Letter B', soundText: 'B' },
    { char: '1', type: 'english-number', nameKm: 'លេខ 1', nameEn: 'Number 1', soundText: 'One' },
    { char: '2', type: 'english-number', nameKm: 'លេខ 2', nameEn: 'Number 2', soundText: 'Two' },
  ];

  const [selectedCharIdx, setSelectedCharIdx] = useState(0);
  const currentChar = traceItems[selectedCharIdx];

  const colors = [
    { label: 'Amber', hex: '#F59E0B' },
    { label: 'Emerald', hex: '#10B981' },
    { label: 'Sky', hex: '#0EA5E9' },
    { label: 'Rose', hex: '#F43F5E' },
    { label: 'Purple', hex: '#8B5CF6' },
  ];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    clearCanvas();
  }, [selectedCharIdx]);

  // Touch & Mouse Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    sound.playPop();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = brushSize;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
    }
  };

  const handleFinish = () => {
    sound.playVictoryFanfare();
    triggerParticleExplosion({
      type: 'stars',
      particleCount: 80,
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
  };

  const handleSpeakChar = () => {
    sound.speak(currentChar.soundText, currentChar.type.startsWith('khmer') ? 'km' : 'en');
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
              {isKm ? 'ហាត់គូរ និងសរសេរអក្សរ/លេខ' : 'Trace & Draw Letters / Numbers'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{isKm ? currentChar.nameKm : currentChar.nameEn}</span>
              <span aria-hidden="true">·</span>
              <span>{isKm ? 'គូសតាមបន្ទាត់ចំនុច' : 'Follow the dotted guides'}</span>
            </div>
          </div>
        </div>

        {/* Audio speaker */}
        <button
          onClick={handleSpeakChar}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-kids text-xs font-semibold transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isKm ? 'ស្ដាប់សម្លេង' : 'Listen'}</span>
        </button>
      </div>

      {/* Character Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {traceItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setSelectedCharIdx(idx);
            }}
            className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl shrink-0 font-kids font-bold text-2xl sm:text-3xl flex items-center justify-center transition-all cursor-pointer ${
              selectedCharIdx === idx
                ? 'bg-amber-500 text-white shadow-md scale-105 border-2 border-amber-600'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
            }`}
          >
            {item.char}
          </button>
        ))}
      </div>

      {/* Tracing Canvas Area */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-sm flex flex-col items-center">
        {/* Drawing Canvas Container */}
        <div className="relative w-full max-w-sm h-80 sm:h-96 rounded-3xl bg-amber-50/40 border-2 border-amber-300/80 shadow-inner overflow-hidden flex items-center justify-center">
          
          {/* Background Dotted Character Template */}
          <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-25">
            <span
              className="text-[180px] sm:text-[230px] font-black text-slate-800 font-kids leading-none tracking-normal"
              style={{
                WebkitTextStroke: '3px #475569',
                color: 'transparent',
              }}
            >
              {currentChar.char}
            </span>
          </div>

          {/* Guide grid lines */}
          <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-amber-300/50 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 border-r border-dashed border-amber-300/50 pointer-events-none" />

          {/* Interactive Drawing Canvas */}
          <canvas
            ref={canvasRef}
            width={380}
            height={380}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair touch-none relative z-10"
          />
        </div>

        {/* Toolbar: Color pickers & Brush controls */}
        <div className="w-full max-w-sm mt-5 flex flex-wrap items-center justify-between gap-3">
          {/* Color Palettes */}
          <div className="flex items-center gap-2">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => {
                  sound.playClick();
                  setActiveColor(c.hex);
                }}
                className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                  activeColor === c.hex ? 'scale-125 border-slate-800 shadow-xs' : 'border-white'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                clearCanvas();
              }}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
              title={isKm ? 'លុបសម្អាត' : 'Clear Canvas'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handleFinish}
              disabled={!hasDrawn}
              className={`btn-chunky flex items-center gap-1.5 px-4 py-2 rounded-xl font-kids text-xs font-bold text-white transition-all ${
                hasDrawn
                  ? 'bg-emerald-600 hover:bg-emerald-700 cursor-pointer shadow-xs'
                  : 'bg-slate-300 cursor-not-allowed opacity-60'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>{isKm ? 'ខ្ញុំគូរចប់ហើយ!' : 'Done Tracing!'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
