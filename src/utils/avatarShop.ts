import { AvatarConfig, ShopItem } from '../types';

export const AVATAR_CONFIG_KEY = 'khmer_kids_avatar_config_v1';
export const AVATAR_OWNED_ITEMS_KEY = 'khmer_kids_avatar_owned_v1';

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  skinColor: 'blue',
  headwear: 'safari_hat',
  eyewear: 'none',
  badge: 'rosy_cheeks',
};

export const DEFAULT_OWNED_ITEMS = [
  'skin_blue',
  'headwear_safari',
  'headwear_none',
  'eyewear_none',
  'badge_rosy',
];

export const SHOP_CATALOG: ShopItem[] = [
  // 1. SKIN COLORS
  {
    id: 'skin_blue',
    category: 'skin',
    key: 'blue',
    nameKm: 'ផ្ទៃមេឃ (ខៀវ)',
    nameEn: 'Sky Blue',
    icon: '🎨',
    cost: 0,
    previewColor: '#60A5FA',
  },
  {
    id: 'skin_pink',
    category: 'skin',
    key: 'pink',
    nameKm: 'ស្ករគ្រាប់ (ផ្កាឈូក)',
    nameEn: 'Bubblegum Pink',
    icon: '🎨',
    cost: 40,
    previewColor: '#F472B6',
  },
  {
    id: 'skin_golden',
    category: 'skin',
    key: 'golden',
    nameKm: 'ទឹកឃ្មុំ (មាស)',
    nameEn: 'Sun Gold',
    icon: '🎨',
    cost: 60,
    previewColor: '#FBBF24',
  },
  {
    id: 'skin_green',
    category: 'skin',
    key: 'green',
    nameKm: 'ដាយណូស័រ (បៃតង)',
    nameEn: 'Dino Green',
    icon: '🎨',
    cost: 80,
    previewColor: '#34D399',
  },
  {
    id: 'skin_purple',
    category: 'skin',
    key: 'purple',
    nameKm: 'វេទមន្ត (ស្វាយ)',
    nameEn: 'Magic Purple',
    icon: '🎨',
    cost: 100,
    previewColor: '#A78BFA',
  },
  {
    id: 'skin_orange',
    category: 'skin',
    key: 'orange',
    nameKm: 'កូនខ្លា (ទឹកក្រូច)',
    nameEn: 'Tiger Orange',
    icon: '🎨',
    cost: 120,
    previewColor: '#FB923C',
  },

  // 2. HEADWEAR
  {
    id: 'headwear_safari',
    category: 'headwear',
    key: 'safari_hat',
    nameKm: 'មួកដើរព្រៃសាហ្វារី',
    nameEn: 'Safari Cap',
    icon: '🧢',
    cost: 0,
  },
  {
    id: 'headwear_crown',
    category: 'headwear',
    key: 'crown',
    nameKm: 'ម្កុដមាសរាជវង្ស',
    nameEn: 'Golden Crown',
    icon: '👑',
    cost: 150,
  },
  {
    id: 'headwear_wizard',
    category: 'headwear',
    key: 'wizard_hat',
    nameKm: 'មួកគ្រូមន្តអាគម',
    nameEn: 'Wizard Hat',
    icon: '🧙',
    cost: 90,
  },
  {
    id: 'headwear_party',
    category: 'headwear',
    key: 'party_hat',
    nameKm: 'មួកខួបកំណើតរីករាយ',
    nameEn: 'Party Cone Hat',
    icon: '🥳',
    cost: 50,
  },
  {
    id: 'headwear_flower',
    category: 'headwear',
    key: 'flower',
    nameKm: 'កម្រងផ្កាស្រស់',
    nameEn: 'Blossom Flower',
    icon: '🌸',
    cost: 40,
  },
  {
    id: 'headwear_none',
    category: 'headwear',
    key: 'none',
    nameKm: 'មិនពាក់មួក',
    nameEn: 'No Hat',
    icon: '🚫',
    cost: 0,
  },

  // 3. EYEWEAR
  {
    id: 'eyewear_none',
    category: 'eyewear',
    key: 'none',
    nameKm: 'ភ្នែកធម្មជាតិ',
    nameEn: 'No Glasses',
    icon: '👀',
    cost: 0,
  },
  {
    id: 'eyewear_cool',
    category: 'eyewear',
    key: 'cool_glasses',
    nameKm: 'វ៉ែនតាខ្មៅទាន់សម័យ',
    nameEn: 'Cool Sunglasses',
    icon: '🕶️',
    cost: 60,
  },
  {
    id: 'eyewear_star',
    category: 'eyewear',
    key: 'star_glasses',
    nameKm: 'វ៉ែនតារាងផ្កាយ',
    nameEn: 'Star Party Shades',
    icon: '⭐',
    cost: 80,
  },
  {
    id: 'eyewear_smart',
    category: 'eyewear',
    key: 'smart_glasses',
    nameKm: 'វ៉ែនតាឆ្លាតវៃរាងមូល',
    nameEn: 'Scholar Glasses',
    icon: '🤓',
    cost: 50,
  },

  // 4. BADGES & BLUSHES
  {
    id: 'badge_rosy',
    category: 'badge',
    key: 'rosy_cheeks',
    nameKm: 'ថ្ពាល់ក្រហមស្រាល',
    nameEn: 'Rosy Cheeks',
    icon: '😊',
    cost: 0,
  },
  {
    id: 'badge_sparkle',
    category: 'badge',
    key: 'sparkle_stars',
    nameKm: 'ពន្លឺផ្កាយលើថ្ពាល់',
    nameEn: 'Star Sparkles',
    icon: '✨',
    cost: 40,
  },
  {
    id: 'badge_heart',
    category: 'badge',
    key: 'heart',
    nameKm: 'បេះដូងផ្អែមល្ហែម',
    nameEn: 'Sweet Hearts',
    icon: '💖',
    cost: 40,
  },
  {
    id: 'badge_medal',
    category: 'badge',
    key: 'gold_medal',
    nameKm: 'មេដាយជើងឯកលេខ១',
    nameEn: 'Champion Medal',
    icon: '🥇',
    cost: 100,
  },
];

export const loadAvatarConfig = (): AvatarConfig => {
  if (typeof window === 'undefined') return DEFAULT_AVATAR_CONFIG;
  try {
    const raw = localStorage.getItem(AVATAR_CONFIG_KEY);
    if (!raw) return DEFAULT_AVATAR_CONFIG;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_AVATAR_CONFIG;
  }
};

export const saveAvatarConfig = (config: AvatarConfig) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AVATAR_CONFIG_KEY, JSON.stringify(config));
  } catch {}
};

export const loadOwnedItems = (): string[] => {
  if (typeof window === 'undefined') return DEFAULT_OWNED_ITEMS;
  try {
    const raw = localStorage.getItem(AVATAR_OWNED_ITEMS_KEY);
    if (!raw) return DEFAULT_OWNED_ITEMS;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_OWNED_ITEMS;
  }
};

export const saveOwnedItems = (items: string[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AVATAR_OWNED_ITEMS_KEY, JSON.stringify(items));
  } catch {}
};
