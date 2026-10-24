import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { X, TrendingUp, BookOpen, Award, CheckCircle2, Heart } from 'lucide-react';
import { Language } from '../types';
import { DayActivityLog } from '../utils/learningStats';
import { sound } from '../utils/audio';

interface LearningStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  statsData: DayActivityLog[];
}

export const LearningStatsModal: React.FC<LearningStatsModalProps> = ({
  isOpen,
  onClose,
  language,
  statsData,
}) => {
  if (!isOpen) return null;

  const isKm = language === 'km';

  // Calculate weekly aggregates
  const totalMath = statsData.reduce((acc, curr) => acc + curr.mathCount, 0);
  const totalLetters = statsData.reduce((acc, curr) => acc + curr.lettersCount, 0);
  const totalGames = totalMath + totalLetters;
  const totalStars = statsData.reduce((acc, curr) => acc + curr.starsEarned, 0);

  // Chart data format
  const chartData = statsData.map((d) => ({
    name: isKm ? d.dayLabelKm : d.dayLabelEn,
    math: d.mathCount,
    letters: d.lettersCount,
    stars: d.starsEarned,
  }));

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xs p-3 rounded-2xl shadow-lg border border-amber-200 text-xs font-kids">
          <p className="font-bold text-slate-900 mb-1.5 border-b border-slate-100 pb-1">
            {label}
          </p>
          <div className="space-y-1">
            <p className="text-amber-700 font-semibold flex items-center gap-1.5">
              <span>🔢 {isKm ? 'គណិតវិទ្យា & លេខ:' : 'Math & Numbers:'}</span>
              <span className="font-bold tabular-nums">{payload[0]?.value}</span>
            </p>
            <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <span>🔤 {isKm ? 'អក្សរ & ពាក្យ:' : 'Letters & Phonics:'}</span>
              <span className="font-bold tabular-nums">{payload[1]?.value}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
              📊
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-kids tracking-tight">
                {isKm ? 'ស្ថិតិនៃការសិក្សា ៧ ថ្ងៃចុងក្រោយ' : '7-Day Learning Progress & Patterns'}
              </h3>
              <p className="text-amber-100 text-xs">
                {isKm
                  ? 'សម្រាប់អាណាព្យាបាលតាមដានការរីកចម្រើនរបស់កុមារ'
                  : 'Visual analytics helping parents track learning habits'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            title={isKm ? 'បិទ' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* KPI 1: Math */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-center">
              <span className="text-xl mb-1 inline-block">🔢</span>
              <p className="text-[11px] font-semibold text-slate-500 font-kids">
                {isKm ? 'ល្បែងគណិតវិទ្យា' : 'Math Completed'}
              </p>
              <p className="text-xl font-black text-amber-800 font-kids tabular-nums mt-0.5">
                {totalMath}
              </p>
            </div>

            {/* KPI 2: Letters */}
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-center">
              <span className="text-xl mb-1 inline-block">🔤</span>
              <p className="text-[11px] font-semibold text-slate-500 font-kids">
                {isKm ? 'ល្បែងអក្សរ & ពាក្យ' : 'Letters Completed'}
              </p>
              <p className="text-xl font-black text-emerald-800 font-kids tabular-nums mt-0.5">
                {totalLetters}
              </p>
            </div>

            {/* KPI 3: Total Games */}
            <div className="p-3.5 bg-sky-50/70 border border-sky-200 rounded-2xl text-center">
              <span className="text-xl mb-1 inline-block">🎮</span>
              <p className="text-[11px] font-semibold text-slate-500 font-kids">
                {isKm ? 'ល្បែងបានលេងសរុប' : 'Total Sessions'}
              </p>
              <p className="text-xl font-black text-sky-800 font-kids tabular-nums mt-0.5">
                {totalGames}
              </p>
            </div>

            {/* KPI 4: Stars */}
            <div className="p-3.5 bg-purple-50/70 border border-purple-200 rounded-2xl text-center">
              <span className="text-xl mb-1 inline-block">⭐</span>
              <p className="text-[11px] font-semibold text-slate-500 font-kids">
                {isKm ? 'ផ្កាយប្រមូលបាន' : 'Stars Earned'}
              </p>
              <p className="text-xl font-black text-purple-800 font-kids tabular-nums mt-0.5">
                {totalStars}
              </p>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold font-kids text-slate-800 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>{isKm ? 'គំនូសតាងល្បែងដែលបានលេងក្នុង ១ សប្តាហ៍' : 'Completed Games Comparison (Last 7 Days)'}</span>
              </h4>
            </div>

            <div className="w-full h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'Fredoka, Kantumruy Pro' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'Fredoka' }}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontFamily: 'Fredoka' }}
                    formatter={(val) => (val === 'math' ? (isKm ? 'គណិតវិទ្យា' : 'Math') : (isKm ? 'អក្សរ' : 'Letters'))}
                  />
                  <Bar
                    dataKey="math"
                    name="math"
                    fill="#F59E0B"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  />
                  <Bar
                    dataKey="letters"
                    name="letters"
                    fill="#10B981"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pedagogical Insights Box for Parents */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3">
            <div className="p-2 bg-amber-200/80 rounded-xl text-amber-800 shrink-0">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
            </div>
            <div className="space-y-1">
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm font-kids">
                {isKm ? 'ការវាយតម្លៃ និងគន្លឹះគរុកោសល្យសម្រាប់អាណាព្យាបាល' : 'Pedagogical Insights & Suggestions'}
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isKm
                  ? `កូនរបស់អ្នកបានលេងសរុប ${totalGames} កម្រិត ក្នុងរយៈពេល ៧ ថ្ងៃកន្លងមក! ការបន្តលេងជាប្រចាំ ១០ ទៅ ១៥ នាទីក្នុងមួយថ្ងៃ ជួយអភិវឌ្ឍការគិតឡូជីខល ជំនាញភាសា និងការចងចាំបានល្អឥតខ្ចោះ។`
                  : `Your child successfully tackled ${totalGames} learning activities this week! Short, joyful 10-15 minute daily sessions foster great phonics and numerical mastery.`}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-chunky px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-kids text-xs sm:text-sm font-bold cursor-pointer shadow-xs"
          >
            {isKm ? 'បិទផ្ទាំងស្ថិតិ' : 'Close Statistics'}
          </button>
        </div>

      </div>
    </div>
  );
};
