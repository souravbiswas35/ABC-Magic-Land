/* voice.js — Cross-platform consistent TTS */

const VoiceEngine = (() => {
  let voices = [];
  let selectedVoice = 0;
  let langMode = 'en';
  const synth = window.speechSynthesis;

  const PROFILES = [
    { label:'🌸 Sweetie', labelBn:'🌸 সুইটি', rate:.72, pitch:1.0, volume:1,
      preferKw:['samantha','victoria','karen','moira','tessa','fiona','allison','ava','susan'],
      fallbackKw:['female','woman','girl'] },
    { label:'🦋 Bubbly',  labelBn:'🦋 বাবলি',  rate:.78, pitch:1.0, volume:1,
      preferKw:['alice','emma','amy','joanna','salli','kendra','kimberly','ivy'],
      fallbackKw:['female','woman'] },
    { label:'🐻 Teddy',   labelBn:'🐻 টেডি',   rate:.74, pitch:1.0, volume:1,
      preferKw:['daniel','matthew','joey','justin','oliver','thomas','arthur'],
      fallbackKw:['male','man'] },
  ];

  function loadVoices() { voices = synth.getVoices(); }
  loadVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  [100, 400, 900, 2000, 4000].forEach(t => setTimeout(loadVoices, t));

  /* Resume after screen lock (iOS) */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { try { synth.resume(); } catch(e) {} }
  });

  function findBnVoice() {
    if (!voices.length) return null;
    return (
      voices.find(v => v.lang === 'bn-BD') ||
      voices.find(v => v.lang === 'bn-IN') ||
      voices.find(v => v.lang.startsWith('bn')) ||
      voices.find(v => v.lang === 'hi-IN') ||
      voices.find(v => v.lang.startsWith('hi')) ||
      null
    );
  }

  function hasBnVoice() { return !!findBnVoice(); }

  /* Core speak — works consistently on iOS, Android, Desktop */
  function speak(text, options = {}) {
    try { synth.cancel(); } catch(e) {}

    return new Promise(resolve => {
      const txt = String(text || '').trim();
      if (!txt) { resolve(); return; }

      setTimeout(() => {
        try {
          try { synth.resume(); } catch(e) {}

          const utt = new SpeechSynthesisUtterance(txt);
          const prof = PROFILES[selectedVoice];

          // Only set voice for Bangla — let browser pick best English voice naturally
          if (options.voice) utt.voice = options.voice;

          utt.rate   = options.rate  ?? prof.rate;
          utt.pitch  = 1.0;  // Always 1.0 — pitch manipulation sounds weird on mobile
          utt.volume = 1;
          utt.lang   = options.lang === 'bn' ? 'bn-BD' : 'en-US';

          const guard = setTimeout(resolve, 5000);
          utt.onend   = () => { clearTimeout(guard); resolve(); };
          utt.onerror = () => { clearTimeout(guard); resolve(); };
          synth.speak(utt);

          // iOS: if speech never starts within 800ms, move on
          setTimeout(() => {
            if (!synth.speaking && !synth.pending) resolve();
          }, 800);

        } catch(e) { resolve(); }
      }, 180);
    });
  }

  async function speakLetter(letter) {
    const prof = PROFILES[selectedVoice];
    await speak(`The letter ${letter}`, { rate: 0.6 });
  }

  async function speakWord(word, bangla = false) {
    if (!bangla) {
      await speak(word, { rate: PROFILES[selectedVoice].rate });
      return;
    }
    const bnVoice = findBnVoice();
    await speak(word, {
      voice: bnVoice || undefined,
      lang: 'bn',
      rate: 0.72,
    });
  }

  async function speakFull(letter) {
    const d = ALPHA_DATA[letter];
    await speakLetter(letter);
    await pause(280);
    if (d?.words?.[0]) await speak(d.words[0].en, { rate: PROFILES[selectedVoice].rate });
  }

  function speakPraise() {
    const raw = PRAISE_EN[Math.floor(Math.random() * PRAISE_EN.length)].replace(/[^\w\s!]/g, '');
    return speak(raw, { rate: PROFILES[selectedVoice].rate });
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
})();/* voice.js — Cross-platform consistent TTS */

const VoiceEngine = (() => {
  let voices = [];
  let selectedVoice = 0;
  let langMode = 'en';
  const synth = window.speechSynthesis;

  const PROFILES = [
    { label:'🌸 Sweetie', labelBn:'🌸 সুইটি', rate:.72, pitch:1.0, volume:1,
      preferKw:['samantha','victoria','karen','moira','tessa','fiona','allison','ava','susan'],
      fallbackKw:['female','woman','girl'] },
    { label:'🦋 Bubbly',  labelBn:'🦋 বাবলি',  rate:.78, pitch:1.0, volume:1,
      preferKw:['alice','emma','amy','joanna','salli','kendra','kimberly','ivy'],
      fallbackKw:['female','woman'] },
    { label:'🐻 Teddy',   labelBn:'🐻 টেডি',   rate:.74, pitch:1.0, volume:1,
      preferKw:['daniel','matthew','joey','justin','oliver','thomas','arthur'],
      fallbackKw:['male','man'] },
  ];

  function loadVoices() { voices = synth.getVoices(); }
  loadVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  [100, 400, 900, 2000, 4000].forEach(t => setTimeout(loadVoices, t));

  /* Resume after screen lock (iOS) */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { try { synth.resume(); } catch(e) {} }
  });

  function findBnVoice() {
    if (!voices.length) return null;
    return (
      voices.find(v => v.lang === 'bn-BD') ||
      voices.find(v => v.lang === 'bn-IN') ||
      voices.find(v => v.lang.startsWith('bn')) ||
      voices.find(v => v.lang === 'hi-IN') ||
      voices.find(v => v.lang.startsWith('hi')) ||
      null
    );
  }

  function hasBnVoice() { return !!findBnVoice(); }

  /* Core speak — works consistently on iOS, Android, Desktop */
  function speak(text, options = {}) {
    try { synth.cancel(); } catch(e) {}

    return new Promise(resolve => {
      const txt = String(text || '').trim();
      if (!txt) { resolve(); return; }

      setTimeout(() => {
        try {
          try { synth.resume(); } catch(e) {}

          const utt = new SpeechSynthesisUtterance(txt);
          const prof = PROFILES[selectedVoice];

          // Only set voice for Bangla — let browser pick best English voice naturally
          if (options.voice) utt.voice = options.voice;

          utt.rate   = options.rate  ?? prof.rate;
          utt.pitch  = 1.0;  // Always 1.0 — pitch manipulation sounds weird on mobile
          utt.volume = 1;
          utt.lang   = options.lang === 'bn' ? 'bn-BD' : 'en-US';

          const guard = setTimeout(resolve, 5000);
          utt.onend   = () => { clearTimeout(guard); resolve(); };
          utt.onerror = () => { clearTimeout(guard); resolve(); };
          synth.speak(utt);

          // iOS: if speech never starts within 800ms, move on
          setTimeout(() => {
            if (!synth.speaking && !synth.pending) resolve();
          }, 800);

        } catch(e) { resolve(); }
      }, 180);
    });
  }

  async function speakLetter(letter) {
    const prof = PROFILES[selectedVoice];
    await speak(`The letter ${letter}`, { rate: 0.6 });
  }

  async function speakWord(word, bangla = false) {
    if (!bangla) {
      await speak(word, { rate: PROFILES[selectedVoice].rate });
      return;
    }
    const bnVoice = findBnVoice();
    await speak(word, {
      voice: bnVoice || undefined,
      lang: 'bn',
      rate: 0.72,
    });
  }

  async function speakFull(letter) {
    const d = ALPHA_DATA[letter];
    await speakLetter(letter);
    await pause(280);
    if (d?.words?.[0]) await speak(d.words[0].en, { rate: PROFILES[selectedVoice].rate });
  }

  function speakPraise() {
    const raw = PRAISE_EN[Math.floor(Math.random() * PRAISE_EN.length)].replace(/[^\w\s!]/g, '');
    return speak(raw, { rate: PROFILES[selectedVoice].rate });
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