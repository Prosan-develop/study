import React, { useState } from 'react';
import { X, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { AvatarConfig, ShopItem, Language } from '../types';
import { SHOP_CATALOG } from '../utils/avatarShop';
import { CustomAvatar } from './CustomAvatar';
import { VirtualCoinIcon } from './CuteIcons';
import { sound } from '../utils/audio';
import { triggerParticleExplosion } from '../utils/particles';
import { popFloatingReward } from './RewardParticlePop';

interface AvatarShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarConfig: AvatarConfig;
  onUpdateAvatarConfig: (config: AvatarConfig) => void;
  virtualCoins: number;
  onDeductCoins: (amount: number) => void;
  ownedItemIds: string[];
  onAddOwnedItem: (itemId: string) => void;
  language: Language;
}

export const AvatarShopModal: React.FC<AvatarShopModalProps> = ({
  isOpen,
  onClose,
  avatarConfig,
  onUpdateAvatarConfig,
  virtualCoins,
  onDeductCoins,
  ownedItemIds,
  onAddOwnedItem,
  language,
}) => {
  if (!isOpen) return null;

  const isKm = language === 'km';
  const [activeCategory, setActiveCategory] = useState<'skin' | 'headwear' | 'eyewear' | 'badge'>('skin');

  const categories = [
    { key: 'skin', labelKm: '🎨 ពណ៌តួអង្គ', labelEn: '🎨 Colors' },
    { key: 'headwear', labelKm: '🧢 មួក & ម្កុដ', labelEn: '🧢 Hats' },
    { key: 'eyewear', labelKm: '👓 វ៉ែនតា', labelEn: '👓 Glasses' },
    { key: 'badge', labelKm: '🏅 ផ្លាកសញ្ញា', labelEn: '🏅 Badges' },
  ] as const;

  const filteredItems = SHOP_CATALOG.filter((item) => item.category === activeCategory);

  const isItemEquipped = (item: ShopItem): boolean => {
    if (item.category === 'skin') return avatarConfig.skinColor === item.key;
    if (item.category === 'headwear') return avatarConfig.headwear === item.key;
    if (item.category === 'eyewear') return avatarConfig.eyewear === item.key;
    if (item.category === 'badge') return avatarConfig.badge === item.key;
    return false;
  };

  const handleEquip = (item: ShopItem) => {
    sound.playPop();
    const updated: AvatarConfig = { ...avatarConfig };
    if (item.category === 'skin') updated.skinColor = item.key as any;
    if (item.category === 'headwear') updated.headwear = item.key as any;
    if (item.category === 'eyewear') updated.eyewear = item.key as any;
    if (item.category === 'badge') updated.badge = item.key as any;

    onUpdateAvatarConfig(updated);
  };

  const handlePurchase = (item: ShopItem) => {
    if (virtualCoins < item.cost) {
      sound.playWrong();
      return;
    }

    sound.playVictoryFanfare();
    onDeductCoins(item.cost);
    onAddOwnedItem(item.id);

    // Particle explosion
    triggerParticleExplosion({
      type: 'coins',
      particleCount: 70,
      origin: { x: 0.5, y: 0.35 },
    });

    popFloatingReward({
      icon: item.icon,
      text: isKm ? 'បានទិញជោគជ័យ!' : 'Unlocked!',
      x: 50,
      y: 40,
      color: '#10B981',
    });

    // Auto-equip the new item
    handleEquip(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
              🛍️
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-kids tracking-tight">
                {isKm ? 'ហាងតុបតែងតួអង្គ' : 'Avatar Boutique & Shop'}
              </h3>
              <p className="text-amber-100 text-xs">
                {isKm ? 'ប្រើប្រាស់កាក់មាសរបស់អ្នកដើម្បីតុបតែងតួអង្គ!' : 'Use your coins to dress up your character!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Wallet in modal header */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/20 backdrop-blur-xs text-amber-200 font-bold text-xs sm:text-sm tabular-nums">
              <VirtualCoinIcon size={16} />
              <span>{virtualCoins}</span>
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
        </div>

        {/* Live Avatar Preview Podium */}
        <div className="relative bg-gradient-to-b from-amber-100/70 via-sky-50/50 to-white py-5 px-6 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div className="relative">
            {/* Soft decorative glow ring behind character */}
            <div className="absolute inset-0 rounded-full bg-amber-300/40 blur-xl transform scale-110 pointer-events-none" />
            
            <div className="p-3 bg-white/80 backdrop-blur-xs rounded-full border-2 border-amber-300/80 shadow-md">
              <CustomAvatar config={avatarConfig} size={110} />
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isKm ? 'តួអង្គរបស់អ្នក' : 'Your Live Avatar'}</span>
            </div>
            <h4 className="text-base font-bold font-kids text-slate-900">
              {isKm ? 'កូនដំរីឆ្លាតវៃ' : 'Smart Baby Elephant'}
            </h4>
            <p className="text-xs text-slate-500">
              {isKm ? 'តួអង្គនេះនឹងបង្ហាញនៅលើ Header កម្មវិធី' : 'This avatar will appear in your Header profile!'}
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-100 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.key);
              }}
              className={`px-3 py-1.5 rounded-xl font-kids text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-white text-slate-900 shadow-xs border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isKm ? cat.labelKm : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Shop Items Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[340px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredItems.map((item) => {
              const isOwned = ownedItemIds.includes(item.id) || item.cost === 0;
              const isEquipped = isItemEquipped(item);
              const canAfford = virtualCoins >= item.cost;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl p-3.5 border transition-all flex flex-col justify-between text-center relative ${
                    isEquipped
                      ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/50 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-xs'
                  }`}
                >
                  {/* Top Item Visual */}
                  <div>
                    <div className="h-16 flex items-center justify-center mb-2">
                      {item.previewColor ? (
                        <div
                          className="w-12 h-12 rounded-full border-3 border-white shadow-md flex items-center justify-center text-xl"
                          style={{ backgroundColor: item.previewColor }}
                        >
                          🐘
                        </div>
                      ) : (
                        <span className="text-4xl filter drop-shadow-xs">{item.icon}</span>
                      )}
                    </div>

                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm font-kids leading-tight">
                      {isKm ? item.nameKm : item.nameEn}
                    </h5>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="mt-3 pt-2 border-t border-slate-100">
                    {isEquipped ? (
                      <div className="w-full py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-[11px] font-bold font-kids flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>{isKm ? 'កំពុងពាក់ ✓' : 'Equipped ✓'}</span>
                      </div>
                    ) : isOwned ? (
                      <button
                        onClick={() => handleEquip(item)}
                        className="btn-chunky w-full py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold font-kids cursor-pointer shadow-2xs"
                      >
                        {isKm ? 'ពាក់ (Equip)' : 'Equip'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford}
                        className={`w-full py-1.5 rounded-xl text-[11px] font-bold font-kids flex items-center justify-center gap-1 transition-all ${
                          canAfford
                            ? 'btn-chunky bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-2xs cursor-pointer'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        <VirtualCoinIcon size={13} />
                        <span>{item.cost} {isKm ? 'កាក់' : 'Coins'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isKm ? `បានដោះសោ: ${ownedItemIds.length} គ្រឿងតុបតែង` : `Unlocked: ${ownedItemIds.length} Accessories`}
          </span>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-chunky px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-kids text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>{isKm ? 'រួចរាល់' : 'Done'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
