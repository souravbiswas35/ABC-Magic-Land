/* voice.js — Baby-friendly TTS with smart Bangla handling */

const VoiceEngine = (() => {
  let voices = [];
  let selectedVoice = 0;
  let langMode = 'en';
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

  function loadVoices() { voices = synth.getVoices(); }
  loadVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  [100, 300, 700, 1500, 3000].forEach(t => setTimeout(loadVoices, t));

  /* Find best English voice */
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
    return voices.find(en) || voices[0];
  }

  /* Find best Bangla / South-Asian voice — strict priority order */
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

  /* Core speak — single promise, cleans up properly */
  function speak(text, options = {}) {
    synth.cancel();
    return new Promise(resolve => {
      const txt = String(text || '').trim();
      if (!txt) { resolve(); return; }

      // Short text needs extra delay — browsers drop <3-char utterances
      const delay = txt.length <= 4 ? 220 : 100;

      setTimeout(() => {
        const utt  = new SpeechSynthesisUtterance(txt);
        const prof = PROFILES[selectedVoice];

        if (options.voice) utt.voice = options.voice;
        utt.rate   = options.rate   ?? prof.rate;
        utt.pitch  = options.pitch  ?? prof.pitch;
        utt.volume = options.volume ?? prof.volume ?? 1;
        utt.lang   = options.lang === 'bn' ? 'bn-BD' : 'en-US';

        // Guard: resolve after 4s max — never leave UI frozen
        const guard = setTimeout(resolve, 4000);
        utt.onend   = () => { clearTimeout(guard); resolve(); };
        utt.onerror = () => { clearTimeout(guard); resolve(); };
        synth.speak(utt);
      }, delay);
    });
  }

  /* Speak a letter — "A" always pronounced correctly */
  async function speakLetter(letter) {
    await speak(`${letter}`, {
      voice: findEnVoice(),
      rate:  0.55,
      pitch: (PROFILES[selectedVoice].pitch ?? 1) + 0.15,
    });
  }

  /* Speak a word — smart Bangla fallback */
  async function speakWord(word, bangla = false) {
    if (!bangla) {
      // English — always reliable
      await speak(word, {
        voice: findEnVoice(),
        rate:  0.68,
        pitch: PROFILES[selectedVoice].pitch,
      });
      return;
    }

    // Bangla mode
    const bnVoice = findBnVoice();
    if (bnVoice) {
      // Device has a proper South-Asian TTS — use it
      await speak(word, {
        voice:  bnVoice,
        lang:   'bn',
        rate:   0.72,
        pitch:  1.15,
        volume: 1,
      });
    } else {
      // No Bangla TTS installed — speak with lang tag set to bn-BD
      // The OS may still attempt it; if silent the app at least won't crash
      await speak(word, {
        lang:   'bn',
        rate:   0.72,
        pitch:  1.15,
      });
    }
  }

  /* Speak full (letter name + word) */
  async function speakFull(letter) {
    const d = ALPHA_DATA[letter];
    await speakLetter(letter);
    await pause(250);
    if (d?.words?.[0]) {
      await speak(d.words[0].en, { voice: findEnVoice(), rate: 0.68 });
    }
  }

  function speakPraise() {
    const raw = PRAISE_EN[Math.floor(Math.random() * PRAISE_EN.length)].replace(/[^\w\s!]/g, '');
    return speak(raw, {
      voice: findEnVoice(),
      rate:  0.78,
      pitch: (PROFILES[selectedVoice].pitch ?? 1) + 0.2,
    });
  }

  function pause(ms) { return new Promise(r => setTimeout(r, ms)); }
  function cancel()  { synth.cancel(); }
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
