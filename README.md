# 🌈 ABC Magic Land

<div align="center">

### A baby-friendly bilingual alphabet learning app

**English + বাংলা · Sweet Voices · Sparkle Drawing · XP Rewards**

<br>

[![Live Demo](https://img.shields.io/badge/🚀%20Open%20Live%20App-abc--magic--land-FF6B9D?style=for-the-badge)](https://abc-magic-land-souravbiswas35.vercel.app/)

<br>

</div>

---

## ✨ Features

| Section | Description |
|---|---|
| 🔤 **Alphabet** | 26 animated letter cards — tap to hear, see words & fun facts |
| 🃏 **Flashcards** | 3D flip cards that reveal picture + word and auto-speak |
| ✏️ **Draw** | Notebook canvas with ruled grid, ghost guide, sparkle trail & rainbow ink |
| ⌨️ **Type** | Keyboard practice with real-time dot feedback per character |
| 🎯 **Quiz** | 4-option picture quiz with streak counter & confetti rewards |
| 🧩 **Match** | Match 5 letters to pictures in randomised rounds |

---

## 🇧🇩 Bangla Support

Tap **বাংলা দেখাও** to reveal Bengali translations across every section. Tap again to hide. All Bangla text animates in with a spring bounce and the voice engine switches to `bn-BD` locale automatically.

---

## 🎙️ Voice Profiles

| Voice | Character | Pitch | Rate |
|---|---|---|---|
| 🌸 **Sweetie** | Very high, gentle, slow | 1.8 | 0.65 |
| 🦋 **Bubbly** | Warm and cheerful | 1.55 | 0.70 |
| 🐻 **Teddy** | Soft deep, cosy storyteller | 1.1 | 0.68 |

> Uses the Web Speech API with graceful system voice fallback.

---

## 🗂️ File Structure

```
abc-magic-land/
├── index.html       # App shell, all sections, modal, SVG mouths
├── style.css        # Design system, animations, responsive layout
├── data.js          # 26 letters — words, বাংলা, colours, fun facts
├── voice.js         # TTS engine — 3 profiles, locale switching
├── animations.js    # Confetti, sparkles, mouth lip-sync, keyframes
├── app.js           # XP system, grid builder, modal, navigation
├── draw.js          # Canvas — bezier curves, sparkle trail, grid
└── games.js         # Flashcard, Type, Quiz, Match logic
```

---

## 🚀 Run Locally

```bash
git clone https://github.com/your-username/abc-magic-land
cd abc-magic-land
npx serve .
```

> ⚠️ Must be served over `http://` — Web Speech API is blocked on `file://`

---

## 🌐 Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

---


## 🎨 Drawing Features

- 📓 Ruled notebook grid with red margin line and dotted center baseline
- 👻 Dotted ghost letter outline for tracing
- ✨ Sparkle emoji trail floats up from the brush as you draw
- 🌈 Rainbow ink mode — colour shifts continuously
- ✍️ Animated hand guide showing direction
- 🎉 Confetti celebration after 8+ strokes

---

## 🛠️ Tech Stack

`Vanilla JS` · `Web Speech API` · `Canvas 2D` · `CSS Animations` · `Google Fonts` · `No build step`

---

<div align="center">

Made with ❤️ for little learners everywhere 🌍

</div>
