import confetti from 'canvas-confetti';

// Custom particle explosion helper for rewarding kids with stars and coins

interface ExplosionOptions {
  type?: 'stars' | 'coins' | 'mixed' | 'fireworks';
  origin?: { x: number; y: number };
  particleCount?: number;
}

// Generate text shape for canvas-confetti if supported
const createEmojiShape = (emoji: string) => {
  try {
    if (typeof confetti.shapeFromText === 'function') {
      return confetti.shapeFromText({ text: emoji, scalar: 1.8 });
    }
  } catch {}
  return 'circle';
};

export const triggerParticleExplosion = ({
  type = 'mixed',
  origin = { x: 0.5, y: 0.5 },
  particleCount = 50,
}: ExplosionOptions = {}) => {
  if (typeof window === 'undefined') return;

  try {
    // Color palettes for juicy bursts
    const goldColors = ['#F59E0B', '#FBBF24', '#FDE047', '#EAB308', '#FF8F00'];
    const vibrantColors = ['#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];

    if (type === 'stars') {
      const starShape = createEmojiShape('⭐');
      // Wave 1: Star emojis popping outwards
      confetti({
        particleCount: Math.round(particleCount * 0.6),
        spread: 80,
        startVelocity: 35,
        ticks: 200,
        gravity: 0.8,
        origin,
        shapes: [starShape, 'circle'],
        colors: goldColors,
        scalar: 1.4,
      });

      // Wave 2: Fine golden shimmer dust
      confetti({
        particleCount: Math.round(particleCount * 0.4),
        spread: 100,
        startVelocity: 45,
        ticks: 160,
        gravity: 0.9,
        origin,
        colors: ['#FFFFFF', '#FEF08A', '#FDE047'],
        shapes: ['circle'],
        scalar: 0.8,
      });
    } else if (type === 'coins') {
      const coinShape = createEmojiShape('🪙');
      // Wave 1: Rich golden coins
      confetti({
        particleCount: Math.round(particleCount * 0.6),
        spread: 85,
        startVelocity: 38,
        ticks: 220,
        gravity: 0.9,
        origin,
        shapes: [coinShape, 'circle'],
        colors: ['#F59E0B', '#D97706', '#FBBF24', '#CA8A04'],
        scalar: 1.5,
      });

      // Wave 2: Glinting sparks
      confetti({
        particleCount: Math.round(particleCount * 0.4),
        spread: 110,
        startVelocity: 48,
        ticks: 180,
        gravity: 0.85,
        origin,
        colors: ['#FFFBEB', '#FEF08A', '#F59E0B'],
        shapes: ['circle'],
        scalar: 0.7,
      });
    } else if (type === 'fireworks') {
      // Grand celebratory fireworks burst
      const end = Date.now() + 1200;
      const interval: any = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.5 + 0.1,
          },
          colors: vibrantColors,
          shapes: ['circle'],
        });
      }, 250);
    } else {
      // Mixed: Both Stars and Coins popping together
      const starShape = createEmojiShape('⭐');
      const coinShape = createEmojiShape('🪙');
      const sparkleShape = createEmojiShape('✨');

      confetti({
        particleCount: Math.round(particleCount * 0.7),
        spread: 90,
        startVelocity: 40,
        ticks: 220,
        gravity: 0.85,
        origin,
        shapes: [starShape, coinShape, sparkleShape, 'circle'],
        colors: [...goldColors, '#38BDF8', '#F472B6'],
        scalar: 1.4,
      });

      // Shimmer background burst
      confetti({
        particleCount: Math.round(particleCount * 0.3),
        spread: 120,
        startVelocity: 50,
        ticks: 160,
        gravity: 0.95,
        origin,
        colors: goldColors,
        shapes: ['circle'],
        scalar: 0.8,
      });
    }
  } catch {
    // Fallback to standard confetti if custom shape errors
    try {
      confetti({
        particleCount,
        spread: 70,
        origin,
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      });
    } catch {}
  }
};
