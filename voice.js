/* voice.js — Works on Vercel/HTTPS deployed sites */

const VoiceEngine = (() => {
  let voices = [];
  let selectedVoice = 0;
  let langMode = 'en';
  const synth = window.speechSynthesis;

  const PROFILES = [
    { label:'🌸 Sweetie', labelBn:'🌸 সুইটি', rate:0.72,
      preferKw:['samantha','victoria','karen','moira','tessa','fiona','allison','ava','zira'],
      fallbackKw:['female','woman','girl'] },
    { label:'🦋 Bubbly',  labelBn:'🦋 বাবলি',  rate:0.85,
      preferKw:['alice','emma','amy','joanna','salli','kendra','kimberly','ivy'],
      fallbackKw:['female','woman'] },
    { label:'🐻 Teddy',   labelBn:'🐻 টেডি',   rate:0.68,
      preferKw:['daniel','matthew','joey','justin','oliver','thomas','arthur','alex'],
      fallbackKw:['male','man'] },
  ];

  function loadVoices() {
    const v = synth.getVoices();
    if (v.length) voices = v;
  }
  loadVoices();
  if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
  [100, 300, 700, 1500, 3000].forEach(t => setTimeout(loadVoices, t));

  /* iOS: resume after screen lock */
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) { try { if (synth.paused) synth.resume(); } catch(e) {} }
  });

  function findVoice(idx, lang) {
    if (!voices.length) return null;
    if (lang === 'bn') {
      return voices.find(v => v.lang === 'bn-BD') ||
             voices.find(v => v.lang === 'bn-IN') ||
             voices.find(v => v.lang.startsWith('bn')) ||
             voices.find(v => v.lang === 'hi-IN') ||
             voices.find(v => v.lang.startsWith('hi')) ||
             null;
    }
    const p = PROFILES[idx];
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

  function hasBnVoice() { return !!findVoice(0, 'bn'); }

  /* Core speak — NO setTimeout wrapper (required for HTTPS/Vercel) */
  function speak(text, options = {}) {
    try { synth.cancel(); } catch(e) {}

    return new Promise(resolve => {
      const txt = String(text || '').trim();
      if (!txt) { resolve(); return; }

      /* Must call synth.speak() synchronously inside user-gesture call stack.
         A tiny rAF keeps it in the same gesture frame without breaking the chain. */
      requestAnimationFrame(() => {
        try {
          if (synth.paused) synth.resume();

          const utt = new SpeechSynthesisUtterance(txt);
          const lang = options.lang === 'bn' ? 'bn' : 'en';
          const voice = options.voice !== undefined
            ? options.voice
            : findVoice(selectedVoice, lang);

          if (voice) utt.voice = voice;
          utt.rate   = options.rate ?? PROFILES[selectedVoice].rate;
          utt.pitch  = 1.0;
          utt.volume = 1.0;
          utt.lang   = options.lang === 'bn' ? 'bn-BD' : 'en-US';

          const guard = setTimeout(resolve, 6000);
          utt.onend   = () => { clearTimeout(guard); resolve(); };
          utt.onerror = () => { clearTimeout(guard); resolve(); };
          synth.speak(utt);
        } catch(e) { resolve(); }
      });
    });
  }

  async function speakLetter(letter) {
    await speak(`${letter}`, { rate: 0.60 });
  }

  async function speakWord(word, bangla = false) {
    if (!bangla) {
      await speak(word, { rate: PROFILES[selectedVoice].rate });
    } else {
      const bnVoice = findVoice(selectedVoice, 'bn');
      await speak(word, { voice: bnVoice || undefined, lang: 'bn', rate: 0.75 });
    }
  }

  async function speakFull(letter) {
    const d = ALPHA_DATA[letter];
    await speakLetter(letter);
    await pause(300);
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