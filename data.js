/* ═══════════════════════════════════════════════
   data.js — All alphabet data with Bangla meanings
   ═══════════════════════════════════════════════ */

const ALPHA_DATA = {
  A: {
    ph: 'eɪ',
    spellOut: 'AY',
    color1: '#FF2D7A', color2: '#FF6B00',
    words: [
      { en: 'Apple',     bn: 'আপেল',      em: '🍎' },
      { en: 'Ant',       bn: 'পিঁপড়া',    em: '🐜' },
      { en: 'Airplane',  bn: 'উড়োজাহাজ', em: '✈️' },
      { en: 'Alligator', bn: 'কুমির',     em: '🐊' },
    ],
    fact: 'A is the very first letter — the king of the alphabet! 👑',
    factBn: 'A হল প্রথম অক্ষর — বর্ণমালার রাজা! 👑',
  },
  B: {
    ph: 'biː',
    spellOut: 'BEE',
    color1: '#00BFA5', color2: '#0091EA',
    words: [
      { en: 'Ball',      bn: 'বল',       em: '⚽' },
      { en: 'Bear',      bn: 'ভালুক',    em: '🐻' },
      { en: 'Butterfly', bn: 'প্রজাপতি', em: '🦋' },
      { en: 'Balloon',   bn: 'বেলুন',    em: '🎈' },
    ],
    fact: 'B has two big bumps on its belly! Count them!',
    factBn: 'B-এর পেটে দুটো বড় ফোলা আছে! গুনে দেখো!',
  },
  C: {
    ph: 'siː',
    spellOut: 'SEE',
    color1: '#FFD600', color2: '#FF8F00',
    words: [
      { en: 'Cat',   bn: 'বিড়াল', em: '🐱' },
      { en: 'Car',   bn: 'গাড়ি',  em: '🚗' },
      { en: 'Cake',  bn: 'কেক',   em: '🎂' },
      { en: 'Cloud', bn: 'মেঘ',   em: '☁️' },
    ],
    fact: 'C looks like a mouth ready to eat a cookie! 🍪',
    factBn: 'C দেখতে একটি মুখের মতো যা কুকি খেতে চায়!',
  },
  D: {
    ph: 'diː',
    spellOut: 'DEE',
    color1: '#76FF03', color2: '#1B5E20',
    words: [
      { en: 'Dog',     bn: 'কুকুর',   em: '🐶' },
      { en: 'Duck',    bn: 'হাঁস',    em: '🦆' },
      { en: 'Dolphin', bn: 'ডলফিন',  em: '🐬' },
      { en: 'Diamond', bn: 'হীরা',    em: '💎' },
    ],
    fact: 'D looks like a door — open it for adventure! 🚪',
    factBn: 'D দেখতে একটি দরজার মতো — খুলে দেখো কী আছে!',
  },
  E: {
    ph: 'iː',
    spellOut: 'EEE',
    color1: '#FF4081', color2: '#D500F9',
    words: [
      { en: 'Elephant', bn: 'হাতি',  em: '🐘' },
      { en: 'Eagle',    bn: 'ঈগল',   em: '🦅' },
      { en: 'Earth',    bn: 'পৃথিবী', em: '🌍' },
      { en: 'Egg',      bn: 'ডিম',   em: '🥚' },
    ],
    fact: 'Elephants start with E and never forget! 🐘',
    factBn: 'হাতি শুরু হয় E দিয়ে এবং কখনো ভোলে না!',
  },
  F: {
    ph: 'ɛf',
    spellOut: 'EFF',
    color1: '#FF9100', color2: '#DD2C00',
    words: [
      { en: 'Fish',   bn: 'মাছ',      em: '🐟' },
      { en: 'Flower', bn: 'ফুল',      em: '🌸' },
      { en: 'Frog',   bn: 'ব্যাঙ',    em: '🐸' },
      { en: 'Fire',   bn: 'আগুন',     em: '🔥' },
    ],
    fact: 'Frogs say ribbit — only YOU can say F! 🐸',
    factBn: 'ব্যাঙ ডাকে কিন্তু F বলতে পারো শুধু তুমি!',
  },
  G: {
    ph: 'dʒiː',
    spellOut: 'JEE',
    color1: '#7C4DFF', color2: '#E040FB',
    words: [
      { en: 'Giraffe', bn: 'জিরাফ',  em: '🦒' },
      { en: 'Grape',   bn: 'আঙুর',   em: '🍇' },
      { en: 'Guitar',  bn: 'গিটার',  em: '🎸' },
      { en: 'Globe',   bn: 'গোলক',   em: '🌐' },
    ],
    fact: 'G has a little shelf inside it — fancy! 🦒',
    factBn: 'G-এর ভেতরে একটি ছোট্ট তাক আছে — বেশ চমৎকার!',
  },
  H: {
    ph: 'eɪtʃ',
    spellOut: 'AY-CH',
    color1: '#00E676', color2: '#00E5FF',
    words: [
      { en: 'Horse',  bn: 'ঘোড়া',  em: '🐴' },
      { en: 'House',  bn: 'বাড়ি',  em: '🏠' },
      { en: 'Heart',  bn: 'হৃদয়',  em: '❤️' },
      { en: 'Hat',    bn: 'টুপি',   em: '🎩' },
    ],
    fact: 'H looks like a ladder — let\'s climb up! 🪜',
    factBn: 'H দেখতে একটি মই-এর মতো — উঠে যাও উপরে!',
  },
  I: {
    ph: 'aɪ',
    spellOut: 'EYE',
    color1: '#FF5252', color2: '#FF6D00',
    words: [
      { en: 'Ice Cream', bn: 'আইসক্রিম',  em: '🍦' },
      { en: 'Island',    bn: 'দ্বীপ',      em: '🏝️' },
      { en: 'Insect',    bn: 'পোকামাকড়', em: '🐛' },
      { en: 'Igloo',     bn: 'ইগলু',       em: '🏔️' },
    ],
    fact: 'I stands tall and straight — just like you! 🧍',
    factBn: 'I লম্বা হয়ে দাঁড়ায় — ঠিক তোমার মতো!',
  },
  J: {
    ph: 'dʒeɪ',
    spellOut: 'JAY',
    color1: '#00BCD4', color2: '#311B92',
    words: [
      { en: 'Jaguar',   bn: 'জাগুয়ার',  em: '🐆' },
      { en: 'Jellyfish',bn: 'জেলিফিশ',  em: '🪼' },
      { en: 'Jar',      bn: 'বয়াম',     em: '🫙' },
      { en: 'Juice',    bn: 'জুস',       em: '🧃' },
    ],
    fact: 'J has a little hook — like a fishing rod! 🎣',
    factBn: 'J-এর একটি ছোট্ট বাঁক আছে — মাছ ধরার ছিপের মতো!',
  },
  K: {
    ph: 'keɪ',
    spellOut: 'KAY',
    color1: '#AA00FF', color2: '#FF1744',
    words: [
      { en: 'Kangaroo', bn: 'ক্যাঙারু', em: '🦘' },
      { en: 'Kite',     bn: 'ঘুড়ি',    em: '🪁' },
      { en: 'Koala',    bn: 'কোয়ালা',  em: '🐨' },
      { en: 'Key',      bn: 'চাবি',     em: '🔑' },
    ],
    fact: 'Kangaroos carry their babies in a pocket! 🦘',
    factBn: 'ক্যাঙারু তার বাচ্চাকে পেটের থলিতে বহন করে!',
  },
  L: {
    ph: 'ɛl',
    spellOut: 'ELL',
    color1: '#2979FF', color2: '#00B0FF',
    words: [
      { en: 'Lion',   bn: 'সিংহ',  em: '🦁' },
      { en: 'Lemon',  bn: 'লেবু',  em: '🍋' },
      { en: 'Lamp',   bn: 'বাতি',  em: '💡' },
      { en: 'Leaf',   bn: 'পাতা',  em: '🍃' },
    ],
    fact: 'L looks like someone sitting on the floor! 🧘',
    factBn: 'L দেখতে মাটিতে বসে থাকা কারো মতো!',
  },
  M: {
    ph: 'ɛm',
    spellOut: 'EMM',
    color1: '#FF3D00', color2: '#E040FB',
    words: [
      { en: 'Moon',     bn: 'চাঁদ',      em: '🌙' },
      { en: 'Monkey',   bn: 'বানর',      em: '🐒' },
      { en: 'Mango',    bn: 'আম',        em: '🥭' },
      { en: 'Mushroom', bn: 'মাশরুম',   em: '🍄' },
    ],
    fact: 'M looks like two mountains! Can you see them? 🏔️🏔️',
    factBn: 'M দেখতে দুটো পাহাড়ের মতো! দেখতে পাচ্ছো?',
  },
  N: {
    ph: 'ɛn',
    spellOut: 'ENN',
    color1: '#00C853', color2: '#AEEA00',
    words: [
      { en: 'Nest',    bn: 'বাসা',   em: '🪹' },
      { en: 'Nose',    bn: 'নাক',    em: '👃' },
      { en: 'Night',   bn: 'রাত',    em: '🌃' },
      { en: 'Narwhal', bn: 'নারহোয়াল', em: '🐋' },
    ],
    fact: 'N has a diagonal slide between two poles! Wheee! 🎢',
    factBn: 'N-এ দুটো খুঁটির মাঝে একটি পিচ্ছিল পথ আছে!',
  },
  O: {
    ph: 'oʊ',
    spellOut: 'OH',
    color1: '#FF6D00', color2: '#FFAB40',
    words: [
      { en: 'Owl',     bn: 'পেঁচা',   em: '🦉' },
      { en: 'Orange',  bn: 'কমলা',    em: '🍊' },
      { en: 'Ocean',   bn: 'সমুদ্র',  em: '🌊' },
      { en: 'Octopus', bn: 'অক্টোপাস',em: '🐙' },
    ],
    fact: 'O is a perfect circle — like the sun and moon! 🌕',
    factBn: 'O একটি নিখুঁত বৃত্ত — সূর্য ও চাঁদের মতো!',
  },
  P: {
    ph: 'piː',
    spellOut: 'PEE',
    color1: '#00B0FF', color2: '#3D5AFE',
    words: [
      { en: 'Penguin', bn: 'পেঙ্গুইন', em: '🐧' },
      { en: 'Pizza',   bn: 'পিৎজা',   em: '🍕' },
      { en: 'Parrot',  bn: 'টিয়া',    em: '🦜' },
      { en: 'Panda',   bn: 'পান্ডা',  em: '🐼' },
    ],
    fact: 'P has one belly — B has two! Spot the difference! 👀',
    factBn: 'P-এর একটি পেট আছে — B-এর দুটো! পার্থক্য দেখো!',
  },
  Q: {
    ph: 'kjuː',
    spellOut: 'KYOO',
    color1: '#FFD740', color2: '#FF6E40',
    words: [
      { en: 'Queen',   bn: 'রানী',    em: '👸' },
      { en: 'Quail',   bn: 'কোয়েল', em: '🐦' },
      { en: 'Quarter', bn: 'চতুর্থাংশ',em: '🪙' },
      { en: 'Quiz',    bn: 'প্রশ্নোত্তর',em: '❓' },
    ],
    fact: 'Q always brings its best friend U along! 👯',
    factBn: 'Q সবসময় তার বন্ধু U-কে সাথে নিয়ে আসে!',
  },
  R: {
    ph: 'ɑːr',
    spellOut: 'AR',
    color1: '#FF1744', color2: '#F50057',
    words: [
      { en: 'Rainbow', bn: 'রংধনু',  em: '🌈' },
      { en: 'Rabbit',  bn: 'খরগোশ', em: '🐰' },
      { en: 'Rocket',  bn: 'রকেট',  em: '🚀' },
      { en: 'Robot',   bn: 'রোবট',  em: '🤖' },
    ],
    fact: 'Rainbows start with R — nature\'s colorful painting! 🌈',
    factBn: 'রংধনু শুরু হয় R দিয়ে — প্রকৃতির রঙিন ছবি!',
  },
  S: {
    ph: 'ɛs',
    spellOut: 'ESS',
    color1: '#448AFF', color2: '#651FFF',
    words: [
      { en: 'Sun',        bn: 'সূর্য',     em: '☀️' },
      { en: 'Star',       bn: 'তারা',      em: '⭐' },
      { en: 'Snake',      bn: 'সাপ',       em: '🐍' },
      { en: 'Strawberry', bn: 'স্ট্রবেরি', em: '🍓' },
    ],
    fact: 'S wiggles like a snake — ssssss! 🐍',
    factBn: 'S সাপের মতো আঁকাবাঁকা — সসসস!',
  },
  T: {
    ph: 'tiː',
    spellOut: 'TEE',
    color1: '#FF4081', color2: '#7C4DFF',
    words: [
      { en: 'Tiger', bn: 'বাঘ',   em: '🐯' },
      { en: 'Train', bn: 'ট্রেন', em: '🚂' },
      { en: 'Turtle',bn: 'কচ্ছপ',em: '🐢' },
      { en: 'Tree',  bn: 'গাছ',   em: '🌳' },
    ],
    fact: 'T stands with arms wide open — ready for a hug! 🙆',
    factBn: 'T দুই বাহু ছড়িয়ে দাঁড়ায় — জড়িয়ে ধরতে চায়!',
  },
  U: {
    ph: 'juː',
    spellOut: 'YOU',
    color1: '#69F0AE', color2: '#00BFA5',
    words: [
      { en: 'Umbrella', bn: 'ছাতা',      em: '☂️' },
      { en: 'Unicorn',  bn: 'এককর্ণ',   em: '🦄' },
      { en: 'Universe', bn: 'মহাবিশ্ব', em: '🌌' },
      { en: 'Urchin',   bn: 'আর্চিন',   em: '🦔' },
    ],
    fact: 'U is shaped like a cup — what would you put in it? 🥤',
    factBn: 'U দেখতে একটি কাপের মতো — এতে কী রাখবে?',
  },
  V: {
    ph: 'viː',
    spellOut: 'VEE',
    color1: '#FF5722', color2: '#FF9800',
    words: [
      { en: 'Volcano', bn: 'আগ্নেয়গিরি',em: '🌋' },
      { en: 'Violin',  bn: 'বেহালা',     em: '🎻' },
      { en: 'Violet',  bn: 'বেগুনি',     em: '💜' },
      { en: 'Viking',  bn: 'ভাইকিং',    em: '⚔️' },
    ],
    fact: 'V is shaped like a valley between two mountains! 🏔️',
    factBn: 'V দুটো পাহাড়ের মাঝের উপত্যকার মতো দেখতে!',
  },
  W: {
    ph: 'dʌbljuː',
    spellOut: 'DUB-UL-YOO',
    color1: '#00E676', color2: '#FF4081',
    words: [
      { en: 'Whale',      bn: 'তিমি',      em: '🐋' },
      { en: 'Wolf',       bn: 'নেকড়া',    em: '🐺' },
      { en: 'Watermelon', bn: 'তরমুজ',     em: '🍉' },
      { en: 'Worm',       bn: 'কেঁচো',    em: '🪱' },
    ],
    fact: 'W is two V\'s joined — a super double V! 💪',
    factBn: 'W হলো দুটো V জোড়া লাগানো — সুপার ডবল V!',
  },
  X: {
    ph: 'ɛks',
    spellOut: 'EX',
    color1: '#FF6E40', color2: '#FF3D00',
    words: [
      { en: 'Xylophone', bn: 'জাইলোফোন', em: '🎵' },
      { en: 'X-Ray',     bn: 'এক্স-রে',  em: '🩻' },
      { en: 'Fox',       bn: 'শেয়াল',    em: '🦊' },
      { en: 'Box',       bn: 'বাক্স',     em: '📦' },
    ],
    fact: 'X marks the spot on a treasure map! 🗺️💰',
    factBn: 'X চিহ্ন মানেই গুপ্তধনের জায়গা!',
  },
  Y: {
    ph: 'waɪ',
    spellOut: 'WHY',
    color1: '#1DE9B6', color2: '#FF4081',
    words: [
      { en: 'Yak',   bn: 'ইয়াক',  em: '🦬' },
      { en: 'Yacht', bn: 'ইয়ট',   em: '⛵' },
      { en: 'Yarn',  bn: 'সুতা',   em: '🧶' },
      { en: 'Yo-Yo', bn: 'ইয়ো-ইয়ো',em: '🪀' },
    ],
    fact: 'Y always asks Why, why, why? Curious like you! 🤔',
    factBn: 'Y সবসময় জিজ্ঞেস করে কেন, কেন, কেন? তোমার মতো কৌতূহলী!',
  },
  Z: {
    ph: 'ziː',
    spellOut: 'ZEE',
    color1: '#FF9100', color2: '#AA00FF',
    words: [
      { en: 'Zebra',   bn: 'জেব্রা',  em: '🦓' },
      { en: 'Zoo',     bn: 'চিড়িয়াখানা',em: '🏛️' },
      { en: 'Zigzag',  bn: 'জিগজাগ', em: '⚡' },
      { en: 'Zero',    bn: 'শূন্য',   em: '0️⃣' },
    ],
    fact: 'Z is last but zebras are wonderfully unique! 🦓',
    factBn: 'Z শেষে আসে কিন্তু জেব্রা অসাধারণ অনন্য!',
  },
};

const LETTER_LIST = Object.keys(ALPHA_DATA);

const PRAISE_EN = [
  'Amazing! 🌟', 'Brilliant! 💫', 'Super! 🚀', 'Fantastic! 🎉',
  'Great job! 🌈', 'You rock! 🎸', 'Wonderful! ✨', 'Excellent! 🏆',
  'Outstanding! 🌠', 'Superstar! ⭐',
];
const PRAISE_BN = [
  'অসাধারণ! 🌟', 'চমৎকার! 💫', 'দারুণ! 🚀', 'অভূতপূর্ব! 🎉',
  'বাহ! 🌈', 'তুমি রাজা! 🎸', 'অপূর্ব! ✨', 'খুব ভালো! 🏆',
];

const LEVELS = [
  { name: 'Explorer',   nameBn: 'অভিযাত্রী',  min: 0   },
  { name: 'Learner',    nameBn: 'শিক্ষার্থী', min: 100 },
  { name: 'Reader',     nameBn: 'পাঠক',        min: 250 },
  { name: 'Star',       nameBn: 'তারা',         min: 450 },
  { name: 'Champion',   nameBn: 'চ্যাম্পিয়ন', min: 700 },
  { name: 'Genius',     nameBn: 'প্রতিভাবান',  min: 1000},
  { name: 'Master',     nameBn: 'ওস্তাদ',       min: 1400},
];

const CONFETTI_COLORS = [
  '#FF6B9D','#FFB347','#4ECDC4','#45B7D1','#A8E063',
  '#F7DC6F','#A18CD1','#43E97B','#FA709A','#FEE140',
];

// Utility: get letter gradient CSS
function getGrad(L) {
  const d = ALPHA_DATA[L];
  return `linear-gradient(135deg, ${d.color1}, ${d.color2})`;
}
