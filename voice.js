/* voice.js — Mobile-safe TTS with iOS fixes */

const VoiceEngine = (() => {
  let voices = [];
  let selectedVoice = 0;
  let langMode = 'en';
  let isSpeaking = false;
  const synth = window.speechSynthesis;

  const PROFILES = [
    { label:'🌸 Sweetie', labelBn:'🌸 সুইটি', rate:.65, pitch:1.8, volume:1,
      preferKw:['samantha','victoria','karen','moira','tessa','fiona','allison','ava','susan'],
      fallbackKw:['female','woman','girl'] },
    { label:'🦋 Bubbly', labelBn:'🦋 বাবলি', rate:.70, pitch:1.55, volume:1,
      preferKw:['alice','emma','amy','joanna','salli','kendra','kimberly','ivy'],
      fallbackKw:['female','woman'] },
    { label:'🐻 Teddy', labelBn:'🐻 টেডি', rate:.68, pitch:1.1, volume:1,
      preferKw:['daniel','matthew','joey','justin','oliver','thomas','arthur'],
      fallbackKw:['male','man'] },
  ];

  /* ── Load voices with retries ── */
  function loadVoices() { voices = synth.getVoices(); }
  loadVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  [100, 400, 900, 2000, 4000].forEach(t => setTimeout(loadVoices, t));

  /* ── iOS Safari fix: synth pauses after screen lock/tab switch ── */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && synth.paused) synth.resume();
  });

  /* ── Find best English voice ── */
  function findEnVoice() {
    if (!voices.length) return null;
    const p = PROFILES[selectedVoice];
    const en = v => v.lang.startsWith('en');
    for (const kw of p.preferKw) {
      const v = voices.find(x => x.name.toLowerCase().includes(kw) && en(x));
      if (v) return v;
    }
    for (const kw of p.fallbackKw) {
      const v = voices.find(x => x.name.toLowerCase().includes(kw) && en(x));
      if (v) return v;
    }
    return voices.find(en) || voices[0] || null;
  }

  /* ── Find best Bangla / South-Asian voice ── */
  function findBnVoice() {
    if (!voices.length) return null;
    return (
      voices.find(v => v.lang === 'bn-BD') ||
      voices.find(v => v.lang === 'bn-IN') ||
      voices.find(v => v.lang.startsWith('bn')) ||
      voices.find(v => v.lang === 'hi-IN') ||
      voices.find(v => v.lang.startsWith('hi')) ||
      voices.find(v => v.lang.includes('-IN')) ||
      null
    );
  }

  function hasBnVoice() { return !!findBnVoice(); }

  /* ── Core speak — iOS-safe ── */
  function speak(text, options = {}) {
    // iOS FIX: resume first if paused (happens after screen lock)
    try { if (synth.paused) synth.resume(); } catch(e) {}

    // Cancel any current speech
    try { synth.cancel(); } catch(e) {}

    return new Promise(resolve => {
      const txt = String(text || '').trim();
      if (!txt) { resolve(); return; }

      // iOS needs a longer settle time after cancel()
      // Using 250ms minimum — tested on iPhone Safari
      const delay = 250;

      const timer = setTimeout(() => {
        try {
          // iOS FIX: resume again inside timeout (state may change)
          if (synth.paused) synth.resume();

          const utt  = new SpeechSynthesisUtterance(txt);
          const prof = PROFILES[selectedVoice];

          // Only assign voice if we have one — null voice on iOS = crash/silence
          const voice = options.voice !== undefined ? options.voice : findEnVoice();
          if (voice) utt.voice = voice;

          utt.rate   = options.rate   ?? prof.rate;
          utt.pitch  = options.pitch  ?? prof.pitch;
          utt.volume = options.volume ?? 1;
          utt.lang   = options.lang === 'bn' ? 'bn-BD' : 'en-US';

          isSpeaking = true;
          // Safety guard: never leave UI stuck
          const guard = setTimeout(() => { isSpeaking = false; resolve(); }, 5000);
          utt.onend   = () => { clearTimeout(guard); isSpeaking = false; resolve(); };
          utt.onerror = () => { clearTimeout(guard); isSpeaking = false; resolve(); };

          synth.speak(utt);

          // iOS Safari bug: sometimes speak() is silently ignored
          // Workaround: if still not speaking after 600ms, resolve so UI doesn't freeze
          setTimeout(() => {
            if (!synth.speaking && !synth.pending) { clearTimeout(guard); resolve(); }
          }, 600);

        } catch(err) {
          isSpeaking = false;
          resolve();
        }
      }, delay);
    });
  }

  /* ── Speak letter ── */
  async function speakLetter(letter) {
    await speak(`${letter}`, {
      rate:  0.55,
      pitch: (PROFILES[selectedVoice].pitch ?? 1) + 0.15,
    });
  }

  /* ── Speak word — with Bangla fallback ── */
  async function speakWord(word, bangla = false) {
    if (!bangla) {
      await speak(word, {
        rate:  0.68,
        pitch: PROFILES[selectedVoice].pitch,
      });
      return;
    }
    const bnVoice = findBnVoice();
    if (bnVoice) {
      await speak(word, { voice: bnVoice, lang: 'bn', rate: 0.72, pitch: 1.15 });
    } else {
      // No Bangla TTS — attempt with lang tag, silent fail is OK
      await speak(word, { lang: 'bn', rate: 0.72, pitch: 1.15 });
    }
  }

  async function speakFull(letter) {
    const d = ALPHA_DATA[letter];
    await speakLetter(letter);
    await pause(300);
    if (d?.words?.[0]) await speak(d.words[0].en, { rate: 0.68 });
  }

  function speakPraise() {
    const raw = PRAISE_EN[Math.floor(Math.random() * PRAISE_EN.length)].replace(/[^\w\s!]/g, '');
    return speak(raw, {
      rate:  0.78,
      pitch: (PROFILES[selectedVoice].pitch ?? 1) + 0.2,
    });
  }

  function pause(ms) { return new Promise(r => setTimeout(r, ms)); }
  function cancel()  { try { synth.cancel(); } catch(e) {} }
  function setVoice(idx) { selectedVoice = idx; }
  function setLang(lang) { langMode = lang; }
  function getProfiles() { return PROFILES; }
  function getSelected() { return selectedVoice; }
  function getLang()     { return langMode; }
  function isReady()     { return voices.length > 0; }

  return {
    speak, speakLetter, speakWord, speakFull, speakPraise,
    setVoice, setLang, cancel, getProfiles, getSelected, getLang,
    isReady, pause, hasBnVoice,
  };
})();