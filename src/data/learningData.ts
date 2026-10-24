import { LetterItem, NumberItem, LevelStage } from '../types';

export const KHMER_CONSONANTS: LetterItem[] = [
  { id: 'km-1', char: 'ក', name: 'ក (កា)', phonetic: 'Kâ', word: 'កង្កែប', wordTranslation: 'Frog', emoji: '🐸', category: 'khmer-consonant', color: '#10B981' },
  { id: 'km-2', char: 'ខ', name: 'ខ (ខា)', phonetic: 'Khâ', word: 'ខ្លា', wordTranslation: 'Tiger', emoji: '🐯', category: 'khmer-consonant', color: '#F59E0B' },
  { id: 'km-3', char: 'គ', name: 'គ (គូ)', phonetic: 'Kô', word: 'គោ', wordTranslation: 'Cow', emoji: '🐮', category: 'khmer-consonant', color: '#3B82F6' },
  { id: 'km-4', char: 'ឃ', name: 'ឃ (ឃូ)', phonetic: 'Khô', word: 'ឃ្មុំ', wordTranslation: 'Bee', emoji: '🐝', category: 'khmer-consonant', color: '#EAB308' },
  { id: 'km-5', char: 'ង', name: 'ង (ងូ)', phonetic: 'Ngô', word: 'ងាវ', wordTranslation: 'Clam', emoji: '🐚', category: 'khmer-consonant', color: '#EC4899' },
  { id: 'km-6', char: 'ច', name: 'ច (ចា)', phonetic: 'Châ', word: 'ចាប', wordTranslation: 'Bird', emoji: '🐦', category: 'khmer-consonant', color: '#8B5CF6' },
  { id: 'km-7', char: 'ឆ', name: 'ឆ (ឆា)', phonetic: 'Chhâ', word: 'ឆ្មា', wordTranslation: 'Cat', emoji: '🐱', category: 'khmer-consonant', color: '#F97316' },
  { id: 'km-8', char: 'ជ', name: 'ជ (ជូ)', phonetic: 'Chô', word: 'ជើង', wordTranslation: 'Foot', emoji: '🦶', category: 'khmer-consonant', color: '#06B6D4' },
  { id: 'km-9', char: 'ឈ', name: 'ឈ (ឈូ)', phonetic: 'Chhô', word: 'ឈើ', wordTranslation: 'Tree', emoji: '🌳', category: 'khmer-consonant', color: '#22C55E' },
  { id: 'km-10', char: 'ញ', name: 'ញ (ញូ)', phonetic: 'Nhô', word: 'ញញួរ', wordTranslation: 'Hammer', emoji: '🔨', category: 'khmer-consonant', color: '#6366F1' },
  { id: 'km-11', char: 'ដ', name: 'ដ (ដា)', phonetic: 'Dâ', word: 'ដំរី', wordTranslation: 'Elephant', emoji: '🐘', category: 'khmer-consonant', color: '#64748B' },
  { id: 'km-12', char: 'ឋ', name: 'ឋ (ឋា)', phonetic: 'Thâ', word: 'ឋានសួគ៌', wordTranslation: 'Paradise', emoji: '☁️', category: 'khmer-consonant', color: '#38BDF8' },
  { id: 'km-13', char: 'ឌ', name: 'ឌ (ឌូ)', phonetic: 'Dô', word: 'ឌុក', wordTranslation: 'Duke', emoji: '🤴', category: 'khmer-consonant', color: '#A855F7' },
  { id: 'km-14', char: 'ឍ', name: 'ឍ (ឍូ)', phonetic: 'Thô', word: 'ឍាមរ៉ា', wordTranslation: 'Chariot', emoji: '🛞', category: 'khmer-consonant', color: '#14B8A6' },
  { id: 'km-15', char: 'ណ', name: 'ណ (ណា)', phonetic: 'Nâ', word: 'ណែនាំ', wordTranslation: 'Guide', emoji: '🧭', category: 'khmer-consonant', color: '#F43F5E' },
  { id: 'km-16', char: 'ត', name: 'ត (តា)', phonetic: 'Tâ', word: 'តោ', wordTranslation: 'Lion', emoji: '🦁', category: 'khmer-consonant', color: '#EAB308' },
  { id: 'km-17', char: 'ថ', name: 'ថ (ថា)', phonetic: 'Thâ', word: 'ថង់', wordTranslation: 'Bag', emoji: '🎒', category: 'khmer-consonant', color: '#FB923C' },
  { id: 'km-18', char: 'ទ', name: 'ទ (ទូ)', phonetic: 'Tô', word: 'ទា', wordTranslation: 'Duck', emoji: '🦆', category: 'khmer-consonant', color: '#FBBF24' },
  { id: 'km-19', char: 'ធ', name: 'ធ (ធូ)', phonetic: 'Thô', word: 'ធុង', wordTranslation: 'Bucket', emoji: '🪣', category: 'khmer-consonant', color: '#0EA5E9' },
  { id: 'km-20', char: 'ន', name: 'ន (នូ)', phonetic: 'Nô', word: 'នាគ', wordTranslation: 'Dragon', emoji: '🐉', category: 'khmer-consonant', color: '#10B981' },
  { id: 'km-21', char: 'ប', name: 'ប (បា)', phonetic: 'Bâ', word: 'បាល់', wordTranslation: 'Ball', emoji: '⚽', category: 'khmer-consonant', color: '#3B82F6' },
  { id: 'km-22', char: 'ផ', name: 'ផ (ផា)', phonetic: 'Phâ', word: 'ផ្កា', wordTranslation: 'Flower', emoji: '🌸', category: 'khmer-consonant', color: '#F472B6' },
  { id: 'km-23', char: 'ព', name: 'ព (ពូ)', phonetic: 'Pô', word: 'ពពែ', wordTranslation: 'Goat', emoji: '🐐', category: 'khmer-consonant', color: '#A3E635' },
  { id: 'km-24', char: 'ភ', name: 'ភ (ភូ)', phonetic: 'Phô', word: 'ភ្នំ', wordTranslation: 'Mountain', emoji: '🏔️', category: 'khmer-consonant', color: '#94A3B8' },
  { id: 'km-25', char: 'ម', name: 'ម (មូ)', phonetic: 'Mô', word: 'មាន់', wordTranslation: 'Chicken', emoji: '🐔', category: 'khmer-consonant', color: '#FB7185' },
  { id: 'km-26', char: 'យ', name: 'យ (យូ)', phonetic: 'Yô', word: 'យន្តហោះ', wordTranslation: 'Airplane', emoji: '✈️', category: 'khmer-consonant', color: '#38BDF8' },
  { id: 'km-27', char: 'រ', name: 'រ (រូ)', phonetic: 'Rô', word: 'រថយន្ត', wordTranslation: 'Car', emoji: '🚗', category: 'khmer-consonant', color: '#EF4444' },
  { id: 'km-28', char: 'ល', name: 'ល (លូ)', phonetic: 'Lô', word: 'លា', wordTranslation: 'Donkey', emoji: '🫏', category: 'khmer-consonant', color: '#84CC16' },
  { id: 'km-29', char: 'វ', name: 'វ (វូ)', phonetic: 'Vô', word: 'វ៉ែនតា', wordTranslation: 'Glasses', emoji: '👓', category: 'khmer-consonant', color: '#8B5CF6' },
  { id: 'km-30', char: 'ស', name: 'ស (សា)', phonetic: 'Sâ', word: 'សេះ', wordTranslation: 'Horse', emoji: '🐴', category: 'khmer-consonant', color: '#F59E0B' },
  { id: 'km-31', char: 'ហ', name: 'ហ (ហា)', phonetic: 'Hâ', word: 'ហង្ស', wordTranslation: 'Swan', emoji: '🦢', category: 'khmer-consonant', color: '#06B6D4' },
  { id: 'km-32', char: 'ឡ', name: 'ឡ (ឡា)', phonetic: 'Lâ', word: 'ឡាន', wordTranslation: 'Truck', emoji: '🚙', category: 'khmer-consonant', color: '#6366F1' },
  { id: 'km-33', char: 'អ', name: 'អ (អា)', phonetic: 'Â', word: 'អណ្ដើក', wordTranslation: 'Turtle', emoji: '🐢', category: 'khmer-consonant', color: '#10B981' },
];

export const ENGLISH_LETTERS: LetterItem[] = [
  { id: 'en-a', char: 'A', name: 'A a', phonetic: 'Ay', word: 'Apple', wordTranslation: 'ផ្លែប៉ោម', emoji: '🍎', category: 'english-alpha', color: '#EF4444' },
  { id: 'en-b', char: 'B', name: 'B b', phonetic: 'Bee', word: 'Butterfly', wordTranslation: 'មេអំបៅ', emoji: '🦋', category: 'english-alpha', color: '#3B82F6' },
  { id: 'en-c', char: 'C', name: 'C c', phonetic: 'See', word: 'Cat', wordTranslation: 'ឆ្មា', emoji: '🐱', category: 'english-alpha', color: '#F59E0B' },
  { id: 'en-d', char: 'D', name: 'D d', phonetic: 'Dee', word: 'Dolphin', wordTranslation: 'ផ្សោត', emoji: '🐬', category: 'english-alpha', color: '#06B6D4' },
  { id: 'en-e', char: 'E', name: 'E e', phonetic: 'Ee', word: 'Elephant', wordTranslation: 'ដំរី', emoji: '🐘', category: 'english-alpha', color: '#64748B' },
  { id: 'en-f', char: 'F', name: 'F f', phonetic: 'Ef', word: 'Fish', wordTranslation: 'ត្រី', emoji: '🐟', category: 'english-alpha', color: '#10B981' },
  { id: 'en-g', char: 'G', name: 'G g', phonetic: 'Jee', word: 'Giraffe', wordTranslation: 'សត្វហ្សីរ៉ាហ្វ', emoji: '🦒', category: 'english-alpha', color: '#F59E0B' },
  { id: 'en-h', char: 'H', name: 'H h', phonetic: 'Aytch', word: 'House', wordTranslation: 'ផ្ទះ', emoji: '🏠', category: 'english-alpha', color: '#EC4899' },
  { id: 'en-i', char: 'I', name: 'I i', phonetic: 'Eye', word: 'Ice Cream', wordTranslation: 'ការ៉េម', emoji: '🍦', category: 'english-alpha', color: '#8B5CF6' },
  { id: 'en-j', char: 'J', name: 'J j', phonetic: 'Jay', word: 'Jellyfish', wordTranslation: 'ចាហួយសមុទ្រ', emoji: '🪼', category: 'english-alpha', color: '#F43F5E' },
  { id: 'en-k', char: 'K', name: 'K k', phonetic: 'Kay', word: 'Kite', wordTranslation: 'ខ្លែង', emoji: '🪁', category: 'english-alpha', color: '#14B8A6' },
  { id: 'en-l', char: 'L', name: 'L l', phonetic: 'El', word: 'Lion', wordTranslation: 'តោ', emoji: '🦁', category: 'english-alpha', color: '#EAB308' },
  { id: 'en-m', char: 'M', name: 'M m', phonetic: 'Em', word: 'Monkey', wordTranslation: 'ស្វា', emoji: '🐵', category: 'english-alpha', color: '#D97706' },
  { id: 'en-n', char: 'N', name: 'N n', phonetic: 'En', word: 'Nest', wordTranslation: 'សំបុកបក្សី', emoji: '🪺', category: 'english-alpha', color: '#84CC16' },
  { id: 'en-o', char: 'O', name: 'O o', phonetic: 'Oh', word: 'Owl', wordTranslation: 'សត្វទីទុយ', emoji: '🦉', category: 'english-alpha', color: '#A855F7' },
  { id: 'en-p', char: 'P', name: 'P p', phonetic: 'Pee', word: 'Panda', wordTranslation: 'ខ្លាឃ្មុំផេនដា', emoji: '🐼', category: 'english-alpha', color: '#334155' },
  { id: 'en-q', char: 'Q', name: 'Q q', phonetic: 'Kyoo', word: 'Queen', wordTranslation: 'ម្ចាស់ក្សត្រី', emoji: '👑', category: 'english-alpha', color: '#EAB308' },
  { id: 'en-r', char: 'R', name: 'R r', phonetic: 'Ar', word: 'Rainbow', wordTranslation: 'ឥន្ទធនូ', emoji: '🌈', category: 'english-alpha', color: '#FB7185' },
  { id: 'en-s', char: 'S', name: 'S s', phonetic: 'Es', word: 'Sun', wordTranslation: 'ព្រះអាទិត្យ', emoji: '☀️', category: 'english-alpha', color: '#F59E0B' },
  { id: 'en-t', char: 'T', name: 'T t', phonetic: 'Tee', word: 'Turtle', wordTranslation: 'អណ្ដើក', emoji: '🐢', category: 'english-alpha', color: '#10B981' },
  { id: 'en-u', char: 'U', name: 'U u', phonetic: 'You', word: 'Umbrella', wordTranslation: 'ឆត្រ', emoji: '☂️', category: 'english-alpha', color: '#8B5CF6' },
  { id: 'en-v', char: 'V', name: 'V v', phonetic: 'Vee', word: 'Violin', wordTranslation: 'វីយូឡុង', emoji: '🎻', category: 'english-alpha', color: '#B45309' },
  { id: 'en-w', char: 'W', name: 'W w', phonetic: 'Double-U', word: 'Whale', wordTranslation: 'ត្រីបាឡែន', emoji: '🐳', category: 'english-alpha', color: '#0284C7' },
  { id: 'en-x', char: 'X', name: 'X x', phonetic: 'Ex', word: 'Xylophone', wordTranslation: 'រនាតឈើ', emoji: '🪵', category: 'english-alpha', color: '#14B8A6' },
  { id: 'en-y', char: 'Y', name: 'Y y', phonetic: 'Wye', word: 'Yacht', wordTranslation: 'ទូកកម្សាន្ត', emoji: '⛵', category: 'english-alpha', color: '#0284C7' },
  { id: 'en-z', char: 'Z', name: 'Z z', phonetic: 'Zed', word: 'Zebra', wordTranslation: 'សេះបង្កង់', emoji: '🦓', category: 'english-alpha', color: '#475569' },
];

export const NUMBERS_DATA: NumberItem[] = [
  { value: 0, khmerChar: '០', khmerWord: 'សូន្យ', englishWord: 'Zero', emoji: '⚪', color: '#94A3B8' },
  { value: 1, khmerChar: '១', khmerWord: 'មួយ', englishWord: 'One', emoji: '🍎', color: '#EF4444' },
  { value: 2, khmerChar: '២', khmerWord: 'ពីរ', englishWord: 'Two', emoji: '⭐', color: '#F59E0B' },
  { value: 3, khmerChar: '៣', khmerWord: 'បី', englishWord: 'Three', emoji: '🎈', color: '#10B981' },
  { value: 4, khmerChar: '៤', khmerWord: 'បួន', englishWord: 'Four', emoji: '🚗', color: '#3B82F6' },
  { value: 5, khmerChar: '៥', khmerWord: 'ប្រាំ', englishWord: 'Five', emoji: '🌸', color: '#EC4899' },
  { value: 6, khmerChar: '៦', khmerWord: 'ប្រាំមួយ', englishWord: 'Six', emoji: '🍓', color: '#F43F5E' },
  { value: 7, khmerChar: '៧', khmerWord: 'ប្រាំពីរ', englishWord: 'Seven', emoji: '🐸', color: '#22C55E' },
  { value: 8, khmerChar: '៨', khmerWord: 'ប្រាំបី', englishWord: 'Eight', emoji: '🧁', color: '#A855F7' },
  { value: 9, khmerChar: '៩', khmerWord: 'ប្រាំបួន', englishWord: 'Nine', emoji: '🐱', color: '#F97316' },
  { value: 10, khmerChar: '១០', khmerWord: 'ដប់', englishWord: 'Ten', emoji: '👑', color: '#EAB308' },
  { value: 11, khmerChar: '១១', khmerWord: 'ដប់មួយ', englishWord: 'Eleven', emoji: '🚀', color: '#3B82F6' },
  { value: 12, khmerChar: '១២', khmerWord: 'ដប់ពីរ', englishWord: 'Twelve', emoji: '🦋', color: '#06B6D4' },
  { value: 13, khmerChar: '១៣', khmerWord: 'ដប់បី', englishWord: 'Thirteen', emoji: '🐤', color: '#FACC15' },
  { value: 14, khmerChar: '១៤', khmerWord: 'ដប់បួន', englishWord: 'Fourteen', emoji: '💎', color: '#6366F1' },
  { value: 15, khmerChar: '១៥', khmerWord: 'ដប់ប្រាំ', englishWord: 'Fifteen', emoji: '🎨', color: '#FB7185' },
  { value: 16, khmerChar: '១៦', khmerWord: 'ដប់ប្រាំមួយ', englishWord: 'Sixteen', emoji: '⛵', color: '#0EA5E9' },
  { value: 17, khmerChar: '១៧', khmerWord: 'ដប់ប្រាំពីរ', englishWord: 'Seventeen', emoji: '🍉', color: '#10B981' },
  { value: 18, khmerChar: '១៨', khmerWord: 'ដប់ប្រាំបី', englishWord: 'Eighteen', emoji: '🍦', color: '#D946EF' },
  { value: 19, khmerChar: '១៩', khmerWord: 'ដប់ប្រាំបួន', englishWord: 'Nineteen', emoji: '🍩', color: '#F97316' },
  { value: 20, khmerChar: '២០', khmerWord: 'ម្ភៃ', englishWord: 'Twenty', emoji: '🏆', color: '#F59E0B' },
];

export const ADVENTURE_STAGES: LevelStage[] = [
  // World 1: កោះលេខរីករាយ (Fun Number Island)
  {
    id: 1,
    world: 1,
    worldNameKm: 'កោះលេខរីករាយ',
    worldNameEn: 'Fun Number Island',
    titleKm: 'រាប់ផ្លែឈើរីករាយ (១ ដល់ ៥)',
    titleEn: 'Fruit Counting (1 to 5)',
    descriptionKm: 'រាប់ផ្លែឈើពណ៌ស្រស់ស្អាត ហើយជ្រើសរើសលេខត្រឹមត្រូវ!',
    descriptionEn: 'Count the juicy fruits and pick the right number!',
    gameType: 'count',
    targetStarsToUnlock: 0,
    icon: '🍎',
    color: '#EF4444'
  },
  {
    id: 2,
    world: 1,
    worldNameKm: 'កោះលេខរីករាយ',
    worldNameEn: 'Fun Number Island',
    titleKm: 'រាប់វត្ថុនិងសត្វគួរឱ្យស្រឡាញ់ (១ ដល់ ១០)',
    titleEn: 'Animal & Object Count (1 to 10)',
    descriptionKm: 'រាប់ចំនួនសត្វតូចៗ និងតារាភ្លឺផ្លេក!',
    descriptionEn: 'Count the friendly animals and shiny stars!',
    gameType: 'count',
    targetStarsToUnlock: 2,
    icon: '⭐',
    color: '#F59E0B'
  },
  {
    id: 3,
    world: 1,
    worldNameKm: 'កោះលេខរីករាយ',
    worldNameEn: 'Fun Number Island',
    titleKm: 'ស្វែងរកលេខដែលបាត់ (លំដាប់លេខ)',
    titleEn: 'Find Missing Numbers (Sequence)',
    descriptionKm: 'តើលេខណាដែលបាត់ក្នុងជួរលេខ? (ឧ. ១, ២, _, ៤)',
    descriptionEn: 'Which number is missing in the line? (e.g., 1, 2, _, 4)',
    gameType: 'sequence',
    targetStarsToUnlock: 5,
    icon: '🔢',
    color: '#10B981'
  },
  {
    id: 4,
    world: 1,
    worldNameKm: 'កោះលេខរីករាយ',
    worldNameEn: 'Fun Number Island',
    titleKm: 'បូកលេខរូបភាពងាយៗ (+)',
    titleEn: 'Picture Addition (+)',
    descriptionKm: 'បូកផ្លែប៉ោមនិងតារាជាមួយគ្នា ដើម្បីស្វែងរកផលបូក!',
    descriptionEn: 'Add the items together to find the sum!',
    gameType: 'math',
    targetStarsToUnlock: 8,
    icon: '➕',
    color: '#3B82F6'
  },

  // World 2: ព្រៃអក្សរវេទមន្ត (Magic Letter Jungle)
  {
    id: 5,
    world: 2,
    worldNameKm: 'ព្រៃអក្សរវេទមន្ត',
    worldNameEn: 'Magic Letter Jungle',
    titleKm: 'ស្វែងរកអក្សរដំបូង (ក ខ គ ...)',
    titleEn: 'Find the Letter (First Consonants)',
    descriptionKm: 'ស្ដាប់សម្លេង ហើយចុចលើអក្សរដែលត្រូវនឹងរូបភាព!',
    descriptionEn: 'Listen to the sound and tap the matching letter!',
    gameType: 'letter_find',
    targetStarsToUnlock: 11,
    icon: '🔤',
    color: '#8B5CF6'
  },
  {
    id: 6,
    world: 2,
    worldNameKm: 'ព្រៃអក្សរវេទមន្ត',
    worldNameEn: 'Magic Letter Jungle',
    titleKm: 'បំបែកប៉េងប៉ោងអក្សរហោះ (Pop Balloons)',
    titleEn: 'Letter Balloon Pop',
    descriptionKm: 'ចុចបំបែកប៉េងប៉ោងអក្សរតាមបញ្ជារបស់មិត្តដំរី!',
    descriptionEn: 'Pop the correct letter balloon as called out by baby elephant!',
    gameType: 'balloon_pop',
    targetStarsToUnlock: 14,
    icon: '🎈',
    color: '#EC4899'
  },
  {
    id: 7,
    world: 2,
    worldNameKm: 'ព្រៃអក្សរវេទមន្ត',
    worldNameEn: 'Magic Letter Jungle',
    titleKm: 'ផ្គូផ្គងអក្សរជាមួយសត្វនិងវត្ថុ',
    titleEn: 'Match Letter & Picture',
    descriptionKm: 'តើអក្សរ "ក" ត្រូវនឹងអ្វី? (កង្កែប 🐸)',
    descriptionEn: 'Match the letters with their picture friend!',
    gameType: 'letter_match',
    targetStarsToUnlock: 17,
    icon: '🐸',
    color: '#22C55E'
  },
  {
    id: 8,
    world: 2,
    worldNameKm: 'ព្រៃអក្សរវេទមន្ត',
    worldNameEn: 'Magic Letter Jungle',
    titleKm: 'តម្រៀបអក្សរជាពាក្យ (Word Builder)',
    titleEn: 'Build Simple Words',
    descriptionKm: 'តម្រៀបអក្សរឱ្យត្រូវតាមពាក្យ ដូចជា "ឆ្មា" ឬ "CAT"!',
    descriptionEn: 'Assemble letters to build words like "CAT" or "គោ"!',
    gameType: 'word_build',
    targetStarsToUnlock: 20,
    icon: '🧩',
    color: '#06B6D4'
  },

  // World 3: ពិភពគណិតនិងពាក្យ (Master Math & Word Kingdom)
  {
    id: 9,
    world: 3,
    worldNameKm: 'ពិភពគណិតនិងពាក្យ',
    worldNameEn: 'Master Math & Word Kingdom',
    titleKm: 'ដកលេខជាមួយផ្លែឈើ (-)',
    titleEn: 'Fruit Subtraction (-)',
    descriptionKm: 'យកផ្លែឈើចេញដើម្បីរៀនដកលេខយ៉ាងងាយស្រួល!',
    descriptionEn: 'Take away fruits to learn subtraction with visual fun!',
    gameType: 'math',
    targetStarsToUnlock: 23,
    icon: '➖',
    color: '#F97316'
  },
  {
    id: 10,
    world: 3,
    worldNameKm: 'ពិភពគណិតនិងពាក្យ',
    worldNameEn: 'Master Math & Word Kingdom',
    titleKm: 'ប្រៀបធៀបចំនួន (ធំជាង > , តូចជាង <)',
    titleEn: 'Number Comparison (> , < , =)',
    descriptionKm: 'តើខាងណាមានចំនួនច្រើនជាង? រៀនសញ្ញាធំជាងតូចជាង!',
    descriptionEn: 'Which side has more tasty treats? Learn comparison!',
    gameType: 'count',
    targetStarsToUnlock: 26,
    icon: '⚖️',
    color: '#14B8A6'
  },
  {
    id: 11,
    world: 3,
    worldNameKm: 'ពិភពគណិតនិងពាក្យ',
    worldNameEn: 'Master Math & Word Kingdom',
    titleKm: 'ប្រកួតប្រជែងប៉េងប៉ោងអក្សរល្បឿនលឿន',
    titleEn: 'Speed Balloon Pop Challenge',
    descriptionKm: 'បំបែកប៉េងប៉ោងអក្សរឱ្យបានលឿនមុនពេលហោះផុត!',
    descriptionEn: 'Pop the correct letter balloons quickly to earn gold stars!',
    gameType: 'balloon_pop',
    targetStarsToUnlock: 29,
    icon: '⚡',
    color: '#EAB308'
  },
  {
    id: 12,
    world: 3,
    worldNameKm: 'ពិភពគណិតនិងពាក្យ',
    worldNameEn: 'Master Math & Word Kingdom',
    titleKm: 'មហាសេដ្ឋីចំណេះដឹង (The Grand Champion)',
    titleEn: 'Grand Champion Quest',
    descriptionKm: 'ឆ្លើយសំណួរចម្រុះទាំងលេខនិងអក្សរ ដើម្បីឈ្នះពានរង្វាន់ធំ!',
    descriptionEn: 'Answer combined numbers and letters quests to win the grand trophy!',
    gameType: 'math',
    targetStarsToUnlock: 32,
    icon: '🏆',
    color: '#A855F7'
  }
];

export interface StickerReward {
  id: string;
  nameKm: string;
  nameEn: string;
  emoji: string;
  starsRequired: number;
}

export const STICKER_REWARDS: StickerReward[] = [
  { id: 'stk-1', nameKm: 'កូនដំរីឆ្លាត', nameEn: 'Smart Elephant', emoji: '🐘', starsRequired: 1 },
  { id: 'stk-2', nameKm: 'តារាមាស', nameEn: 'Gold Star', emoji: '⭐', starsRequired: 3 },
  { id: 'stk-3', nameKm: 'ឥន្ទធនូស្រស់ស្អាត', nameEn: 'Magic Rainbow', emoji: '🌈', starsRequired: 6 },
  { id: 'stk-4', nameKm: 'គ្រាប់រ៉ុក្កែត', nameEn: 'Space Rocket', emoji: '🚀', starsRequired: 9 },
  { id: 'stk-5', nameKm: 'កូនខ្លាឃ្មុំ', nameEn: 'Cute Bear', emoji: '🧸', starsRequired: 12 },
  { id: 'stk-6', nameKm: 'ម្កុដមាស', nameEn: 'Golden Crown', emoji: '👑', starsRequired: 15 },
  { id: 'stk-7', nameKm: 'សេះវេទមន្ត', nameEn: 'Unicorn', emoji: '🦄', starsRequired: 18 },
  { id: 'stk-8', nameKm: 'ដាយណូស័រគួរឱ្យស្រឡាញ់', nameEn: 'Friendly Dino', emoji: '🦖', starsRequired: 22 },
  { id: 'stk-9', nameKm: 'មេអំបៅពណ៌រស់រវើក', nameEn: 'Vibrant Butterfly', emoji: '🦋', starsRequired: 26 },
  { id: 'stk-10', nameKm: 'ពានរង្វាន់លេខ១', nameEn: 'Number 1 Trophy', emoji: '🏆', starsRequired: 30 }
];

export const SIMPLE_WORDS = [
  { khmer: 'គោ', english: 'COW', lettersKm: ['គ', 'ោ'], lettersEn: ['C', 'O', 'W'], emoji: '🐮', hintKm: 'សត្វគោផ្តល់ទឹកដោះ', hintEn: 'Gentle farm cow' },
  { khmer: 'ឆ្មា', english: 'CAT', lettersKm: ['ឆ', '្ម', 'ា'], lettersEn: ['C', 'A', 'T'], emoji: '🐱', hintKm: 'សត្វឆ្មាស្រែកម៉េវៗ', hintEn: 'Playful little kitten' },
  { khmer: 'ទា', english: 'DUCK', lettersKm: ['ទ', 'ា'], lettersEn: ['D', 'U', 'C', 'K'], emoji: '🦆', hintKm: 'សត្វទាហែលទឹក', hintEn: 'Yellow pond duck' },
  { khmer: 'តោ', english: 'LION', lettersKm: ['ត', 'ោ'], lettersEn: ['L', 'I', 'O', 'N'], emoji: '🦁', hintKm: 'ស្ដេចតោក្នុងព្រៃ', hintEn: 'Brave king of the jungle' },
  { khmer: 'ចាប', english: 'BIRD', lettersKm: ['ច', 'ា', 'ប'], lettersEn: ['B', 'I', 'R', 'D'], emoji: '🐦', hintKm: 'សត្វចាបហោះលើមេឃ', hintEn: 'Singing little bird' },
  { khmer: 'មាន់', english: 'HEN', lettersKm: ['ម', 'ា', 'ន់'], lettersEn: ['H', 'E', 'N'], emoji: '🐔', hintKm: 'សត្វមាន់រងាវពេលព្រឹក', hintEn: 'Morning farm rooster/hen' }
];
