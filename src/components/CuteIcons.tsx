import React from 'react';

// Friendly Baby Elephant mascot - SVG Vector
export const MascotElephant: React.FC<{ className?: string; mood?: 'happy' | 'cheering' | 'thinking' }> = ({
  className = 'w-24 h-24',
  mood = 'happy'
}) => {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Soft Glow Shadow */}
      <ellipse cx="80" cy="148" rx="55" ry="10" fill="#E2E8F0" />
      
      {/* Ears */}
      {/* Left Ear */}
      <circle cx="42" cy="74" r="32" fill="#93C5FD" />
      <circle cx="42" cy="74" r="22" fill="#F472B6" opacity="0.65" />
      
      {/* Right Ear */}
      <circle cx="118" cy="74" r="32" fill="#93C5FD" />
      <circle cx="118" cy="74" r="22" fill="#F472B6" opacity="0.65" />
      
      {/* Body */}
      <ellipse cx="80" cy="112" rx="44" ry="34" fill="#60A5FA" />
      
      {/* Belly */}
      <ellipse cx="80" cy="116" rx="28" ry="22" fill="#BAE6FD" />
      
      {/* Head */}
      <circle cx="80" cy="72" r="40" fill="#60A5FA" />
      
      {/* Cheerful Safari Hat */}
      <path d="M52 45 C52 32, 108 32, 108 45 Z" fill="#F59E0B" />
      <path d="M42 45 C42 41, 118 41, 118 45 C118 48, 42 48, 42 45 Z" fill="#D97706" />
      {/* Star on Hat */}
      <polygon points="80,34 83,40 90,40 84,44 86,50 80,46 74,50 76,44 70,40 77,40" fill="#FDE047" />

      {/* Eyes */}
      <ellipse cx="66" cy="68" rx="6" ry="8" fill="#1E293B" />
      <circle cx="68" cy="65" r="2.5" fill="white" />
      <circle cx="64" cy="70" r="1.2" fill="white" />

      <ellipse cx="94" cy="68" rx="6" ry="8" fill="#1E293B" />
      <circle cx="96" cy="65" r="2.5" fill="white" />
      <circle cx="92" cy="70" r="1.2" fill="white" />

      {/* Rosy Cheeks */}
      <ellipse cx="54" cy="79" rx="7" ry="4" fill="#FB7185" opacity="0.75" />
      <ellipse cx="106" cy="79" rx="7" ry="4" fill="#FB7185" opacity="0.75" />

      {/* Cute Elephant Trunk */}
      {mood === 'cheering' ? (
        // Trunk up in joyful cheer
        <path
          d="M74 80 C74 95, 84 98, 86 92 C88 84, 94 82, 94 72 C94 66, 88 66, 88 74"
          stroke="#3B82F6"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        // Trunk curled happily
        <path
          d="M75 78 C75 92, 80 102, 88 102 C96 102, 98 94, 93 90"
          stroke="#3B82F6"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* Smile */}
      <path d="M72 87 Q80 92 88 87" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Hands holding a friendly star */}
      <circle cx="56" cy="116" r="9" fill="#93C5FD" />
      <circle cx="104" cy="116" r="9" fill="#93C5FD" />

      {mood === 'cheering' && (
        <g transform="translate(112, 40) scale(0.9)">
          <polygon points="12,0 15,8 24,8 17,13 19,22 12,17 5,22 7,13 0,8 9,8" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
};

// Shiny Animated Golden Star
export const StarReward: React.FC<{ filled?: boolean; size?: number; className?: string }> = ({
  filled = true,
  size = 32,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-all duration-300 drop-shadow-sm ${className}`}
    >
      {filled ? (
        <>
          <defs>
            <linearGradient id="starGrad" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE047" />
              <stop offset="1" stopColor="#EAB308" />
            </linearGradient>
            <filter id="glow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.4" />
            </filter>
          </defs>
          <polygon
            points="32,4 40.5,21.5 60,24.5 45.8,38.3 49.2,57.5 32,48.5 14.8,57.5 18.2,38.3 4,24.5 23.5,21.5"
            fill="url(#starGrad)"
            stroke="#CA8A04"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Cute Face on star */}
          <circle cx="26" cy="32" r="2.5" fill="#713F12" />
          <circle cx="38" cy="32" r="2.5" fill="#713F12" />
          <path d="M28 38 Q32 42 36 38" stroke="#713F12" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Sparkle highlight */}
          <polygon points="20,16 22,22 26,22 23,24 24,28 20,25 16,28 17,24 14,22 18,22" fill="white" opacity="0.8" />
        </>
      ) : (
        <polygon
          points="32,4 40.5,21.5 60,24.5 45.8,38.3 49.2,57.5 32,48.5 14.8,57.5 18.2,38.3 4,24.5 23.5,21.5"
          fill="#CBD5E1"
          stroke="#94A3B8"
          strokeWidth="2"
          strokeLinejoin="round"
          opacity="0.6"
        />
      )}
    </svg>
  );
};

// Cheerful Sun illustration
export const SmilingSun: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 100" fill="none" className={className}>
    {/* Sun Rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <rect
        key={angle}
        x="47"
        y="6"
        width="6"
        height="14"
        rx="3"
        fill="#FBBF24"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
    {/* Sun Body */}
    <circle cx="50" cy="50" r="28" fill="#FDE047" stroke="#F59E0B" strokeWidth="3" />
    {/* Face */}
    <circle cx="41" cy="46" r="3" fill="#B45309" />
    <circle cx="59" cy="46" r="3" fill="#B45309" />
    {/* Cheeks */}
    <circle cx="34" cy="53" r="3.5" fill="#FB7185" opacity="0.7" />
    <circle cx="66" cy="53" r="3.5" fill="#FB7185" opacity="0.7" />
    {/* Smile */}
    <path d="M42 56 Q50 64 58 56" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// High-Fidelity Streak Flame SVG
export const StreakFlameIcon: React.FC<{ size?: number; className?: string; animated?: boolean }> = ({
  size = 24,
  className = '',
  animated = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${animated ? 'animate-pulse-subtle' : ''} ${className}`}
    >
      <defs>
        <linearGradient id="flameOuter" x1="24" y1="2" x2="24" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF1E56" />
          <stop offset="0.5" stopColor="#FF6B00" />
          <stop offset="1" stopColor="#FFB300" />
        </linearGradient>
        <linearGradient id="flameInner" x1="24" y1="18" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF176" />
          <stop offset="1" stopColor="#FF9100" />
        </linearGradient>
        <filter id="flameGlow" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#FF6B00" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Main Outer Flame Body */}
      <path
        d="M24 3 C27 10, 37 15, 37 28 C37 36.8, 30.8 44, 24 44 C17.2 44, 11 36.8, 11 28 C11 18, 19 12, 21 6 C22 4.5, 23 3.5, 24 3 Z"
        fill="url(#flameOuter)"
        filter="url(#flameGlow)"
      />

      {/* Outer Side Tongues */}
      <path
        d="M27 15 C33 20, 36 24, 34 31 C33 27, 30 25, 28 23"
        fill="#FF3D00"
        opacity="0.8"
      />

      {/* Core Glowing Flame Center */}
      <path
        d="M24 22 C27 27, 30 30, 30 35 C30 39.5, 27.3 42, 24 42 C20.7 42, 18 39.5, 18 35 C18 31, 21 27, 24 22 Z"
        fill="url(#flameInner)"
      />

      {/* Cute happy eyes on flame */}
      <circle cx="21.5" cy="33" r="1.5" fill="#713F12" />
      <circle cx="26.5" cy="33" r="1.5" fill="#713F12" />
      <path d="M22.5 36 Q24 37.5 25.5 36" stroke="#713F12" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Small floating spark */}
      <circle cx="33" cy="11" r="1.5" fill="#FFE082" />
    </svg>
  );
};

// Shiny Gold Virtual Coin SVG
export const VirtualCoinIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-xs ${className}`}
    >
      <defs>
        <linearGradient id="coinBorder" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="coinFace" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#coinBorder)" />
      <circle cx="16" cy="16" r="12" fill="url(#coinFace)" />
      {/* Coin Emboss Star */}
      <polygon points="16,8 18.5,13.5 24,14 19.8,18 21.2,23.5 16,20.5 10.8,23.5 12.2,18 8,14 13.5,13.5" fill="#CA8A04" />
      {/* Glint */}
      <circle cx="11" cy="10" r="1.8" fill="white" opacity="0.7" />
    </svg>
  );
};

