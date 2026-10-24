import React, { useState, useEffect } from 'react';

export interface FloatingReward {
  id: string;
  text: string;
  icon: string;
  x: number; // percentage
  y: number; // percentage
  color: string;
}

let emitRewardCallback: ((reward: Omit<FloatingReward, 'id'>) => void) | null = null;

export const popFloatingReward = (reward: Omit<FloatingReward, 'id'>) => {
  if (emitRewardCallback) {
    emitRewardCallback(reward);
  }
};

export const RewardParticlePop: React.FC = () => {
  const [items, setItems] = useState<FloatingReward[]>([]);

  useEffect(() => {
    emitRewardCallback = (reward) => {
      const newItem: FloatingReward = {
        ...reward,
        id: `pop-${Date.now()}-${Math.random()}`,
      };
      setItems((prev) => [...prev, newItem]);

      // Remove after animation completes (1000ms)
      setTimeout(() => {
        setItems((current) => current.filter((item) => item.id !== newItem.id));
      }, 950);
    };

    return () => {
      emitRewardCallback = null;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-particle-burst flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/95 shadow-lg border-2 border-amber-300 font-kids font-extrabold text-base sm:text-lg backdrop-blur-xs select-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            color: item.color,
          }}
        >
          <span className="text-xl sm:text-2xl filter drop-shadow-xs">{item.icon}</span>
          <span className="tabular-nums tracking-tight">{item.text}</span>
        </div>
      ))}
    </div>
  );
};
