import React from 'react';
import { AvatarConfig } from '../types';

interface CustomAvatarProps {
  config: AvatarConfig;
  size?: number;
  className?: string;
  mood?: 'happy' | 'cheering';
}

export const CustomAvatar: React.FC<CustomAvatarProps> = ({
  config,
  size = 64,
  className = '',
  mood = 'happy',
}) => {
  // Skin color palettes
  const skins: Record<string, { body: string; ear: string; belly: string; earInner: string; trunk: string }> = {
    blue: {
      body: '#60A5FA',
      ear: '#93C5FD',
      belly: '#BAE6FD',
      earInner: '#F472B6',
      trunk: '#3B82F6',
    },
    pink: {
      body: '#F472B6',
      ear: '#FBCFE8',
      belly: '#FDF2F8',
      earInner: '#FB7185',
      trunk: '#EC4899',
    },
    golden: {
      body: '#FBBF24',
      ear: '#FDE68A',
      belly: '#FEF3C7',
      earInner: '#FB923C',
      trunk: '#F59E0B',
    },
    green: {
      body: '#34D399',
      ear: '#A7F3D0',
      belly: '#ECFDF5',
      earInner: '#F472B6',
      trunk: '#10B981',
    },
    purple: {
      body: '#A78BFA',
      ear: '#DDD6FE',
      belly: '#F5F3FF',
      earInner: '#F472B6',
      trunk: '#8B5CF6',
    },
    orange: {
      body: '#FB923C',
      ear: '#FED7AA',
      belly: '#FFF7ED',
      earInner: '#F472B6',
      trunk: '#F97316',
    },
  };

  const skin = skins[config.skinColor] || skins.blue;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm transition-transform duration-200 select-none ${className}`}
    >
      {/* Soft Glow Shadow */}
      <ellipse cx="80" cy="148" rx="55" ry="10" fill="#E2E8F0" />

      {/* Ears */}
      {/* Left Ear */}
      <circle cx="42" cy="74" r="32" fill={skin.ear} />
      <circle cx="42" cy="74" r="22" fill={skin.earInner} opacity="0.6" />

      {/* Right Ear */}
      <circle cx="118" cy="74" r="32" fill={skin.ear} />
      <circle cx="118" cy="74" r="22" fill={skin.earInner} opacity="0.6" />

      {/* Body */}
      <ellipse cx="80" cy="112" rx="44" ry="34" fill={skin.body} />

      {/* Belly */}
      <ellipse cx="80" cy="116" rx="28" ry="22" fill={skin.belly} />

      {/* Head */}
      <circle cx="80" cy="72" r="40" fill={skin.body} />

      {/* Eyes (only if eyewear is not covering completely) */}
      <ellipse cx="66" cy="68" rx="6" ry="8" fill="#1E293B" />
      <circle cx="68" cy="65" r="2.5" fill="white" />
      <circle cx="64" cy="70" r="1.2" fill="white" />

      <ellipse cx="94" cy="68" rx="6" ry="8" fill="#1E293B" />
      <circle cx="96" cy="65" r="2.5" fill="white" />
      <circle cx="92" cy="70" r="1.2" fill="white" />

      {/* Blushes & Badges */}
      {config.badge === 'rosy_cheeks' && (
        <>
          <ellipse cx="54" cy="79" rx="7" ry="4" fill="#FB7185" opacity="0.75" />
          <ellipse cx="106" cy="79" rx="7" ry="4" fill="#FB7185" opacity="0.75" />
        </>
      )}

      {config.badge === 'sparkle_stars' && (
        <>
          <polygon points="54,75 56,79 60,79 57,82 58,86 54,83 50,86 51,82 48,79 52,79" fill="#FACC15" />
          <polygon points="106,75 108,79 112,79 109,82 110,86 106,83 102,86 103,82 100,79 104,79" fill="#FACC15" />
        </>
      )}

      {config.badge === 'heart' && (
        <>
          <path d="M54 77 C52 74, 48 75, 48 78 C48 81, 54 84, 54 84 C54 84, 60 81, 60 78 C60 75, 56 74, 54 77 Z" fill="#F43F5E" />
          <path d="M106 77 C104 74, 100 75, 100 78 C100 81, 106 84, 106 84 C106 84, 112 81, 112 78 C112 75, 108 74, 106 77 Z" fill="#F43F5E" />
        </>
      )}

      {/* Trunk */}
      <path
        d="M75 78 C75 92, 80 102, 88 102 C96 102, 98 94, 93 90"
        stroke={skin.trunk}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Smile */}
      <path d="M72 87 Q80 92 88 87" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Eyewear Accessories */}
      {config.eyewear === 'cool_glasses' && (
        <g id="eyewear_cool">
          {/* Bridge */}
          <rect x="74" y="65" width="12" height="3" rx="1.5" fill="#1E293B" />
          {/* Left Lens */}
          <rect x="56" y="60" width="22" height="15" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="62" x2="68" y2="73" stroke="white" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          {/* Right Lens */}
          <rect x="82" y="60" width="22" height="15" rx="5" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
          <line x1="86" y1="62" x2="94" y2="73" stroke="white" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        </g>
      )}

      {config.eyewear === 'star_glasses' && (
        <g id="eyewear_star">
          <line x1="74" y1="68" x2="86" y2="68" stroke="#EAB308" strokeWidth="3" />
          <g transform="translate(67, 68) scale(0.9)">
            <polygon points="0,-14 4,-4 14,-4 6,2 9,12 0,6 -9,12 -6,2 -14,-4 -4,-4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
          <g transform="translate(93, 68) scale(0.9)">
            <polygon points="0,-14 4,-4 14,-4 6,2 9,12 0,6 -9,12 -6,2 -14,-4 -4,-4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          </g>
        </g>
      )}

      {config.eyewear === 'smart_glasses' && (
        <g id="eyewear_smart">
          <line x1="74" y1="68" x2="86" y2="68" stroke="#475569" strokeWidth="2.5" />
          <circle cx="67" cy="68" r="11" fill="none" stroke="#334155" strokeWidth="3" />
          <circle cx="93" cy="68" r="11" fill="none" stroke="#334155" strokeWidth="3" />
        </g>
      )}

      {/* Headwear Accessories */}
      {config.headwear === 'safari_hat' && (
        <g id="headwear_safari">
          <path d="M52 45 C52 32, 108 32, 108 45 Z" fill="#F59E0B" />
          <path d="M42 45 C42 41, 118 41, 118 45 C118 48, 42 48, 42 45 Z" fill="#D97706" />
          <polygon points="80,34 83,40 90,40 84,44 86,50 80,46 74,50 76,44 70,40 77,40" fill="#FDE047" />
        </g>
      )}

      {config.headwear === 'crown' && (
        <g id="headwear_crown">
          <polygon points="56,46 60,25 70,36 80,20 90,36 100,25 104,46" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
          <rect x="56" y="44" width="48" height="6" rx="2" fill="#EAB308" />
          {/* Jewels */}
          <circle cx="80" cy="24" r="2.5" fill="#EF4444" />
          <circle cx="61" cy="28" r="2" fill="#3B82F6" />
          <circle cx="99" cy="28" r="2" fill="#3B82F6" />
        </g>
      )}

      {config.headwear === 'wizard_hat' && (
        <g id="headwear_wizard">
          <polygon points="50,46 76,6 108,46" fill="#4F46E5" stroke="#3730A3" strokeWidth="2" />
          <ellipse cx="80" cy="46" rx="36" ry="7" fill="#3730A3" />
          <polygon points="76,22 78,26 83,26 79,29 81,34 76,31 72,34 74,29 70,26 75,26" fill="#FDE047" />
          <circle cx="86" cy="38" r="2" fill="#FDE047" />
        </g>
      )}

      {config.headwear === 'party_hat' && (
        <g id="headwear_party">
          <polygon points="62,45 80,10 98,45" fill="#EC4899" stroke="#DB2777" strokeWidth="2" />
          <circle cx="80" cy="10" r="4.5" fill="#FDE047" />
          {/* Stripes */}
          <line x1="68" y1="36" x2="92" y2="36" stroke="#38BDF8" strokeWidth="3" />
          <line x1="72" y1="26" x2="88" y2="26" stroke="#FBBF24" strokeWidth="3" />
        </g>
      )}

      {config.headwear === 'flower' && (
        <g id="headwear_flower" transform="translate(100, 42)">
          <circle cx="-6" cy="-4" r="6" fill="#F472B6" />
          <circle cx="6" cy="-4" r="6" fill="#F472B6" />
          <circle cx="-6" cy="6" r="6" fill="#F472B6" />
          <circle cx="6" cy="6" r="6" fill="#F472B6" />
          <circle cx="0" cy="1" r="5" fill="#FDE047" />
        </g>
      )}

      {/* Gold Medal Badge on chest */}
      {config.badge === 'gold_medal' && (
        <g id="badge_medal" transform="translate(80, 114)">
          <polygon points="-6,-10 0,-2 6,-10 0,-4" fill="#3B82F6" />
          <circle cx="0" cy="2" r="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <text x="0" y="5" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#713F12">1</text>
        </g>
      )}

      {/* Hands holding friendly star */}
      <circle cx="56" cy="116" r="9" fill={skin.ear} />
      <circle cx="104" cy="116" r="9" fill={skin.ear} />
    </svg>
  );
};
