/* ═══════════════════════════════════════════════
   app.js — Core engine: XP, grid, modal, nav
   ═══════════════════════════════════════════════ */

/* ── State ──────────────────────────────────────── */
const State = {
  xp:       0,
  lang:     'en',  // 'en' | 'bn'
  learned:  new Set(),
  voice:    0,
};

/* ── XP System (silent — no bar shown) ─────────── */
let _prevLevel = 0;
function addXP(n, x, y) {
  State.xp += n;
  // Level bar removed — XP tracked silently
}

function getCurrentLevel() {
  let idx = 0;
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (State.xp >= LEVELS[i].min) { idx = i; break; }
  }
  return { ...LEVELS[idx], idx };
}

/* ── Praise ─────────────────────────────────────── */
function praise(withConfetti = true) {
  if (withConfetti) Animations.confetti({ count: 65 });
  VoiceEngine.speakPraise();
  Animations.emojiRain(['⭐','🌟','💫','✨','🎉'], 12);
  // Random chance of shooting star
  if (Math.random() > 0.4) setTimeout(() => Animations.shootingStar(), 100);
  if (Math.random() > 0.6) setTimeout(() => Animations.shootingStar(), 350);
  addXP(10);
}

/* ── Bangla show / hide toggle ───────────────────── */
/* ── Dark / Light Mode ───────────────────────────── */
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  const btn = document.getElementById('themeToggle');
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  // Remember preference
  try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch(e) {}
}

// Apply saved theme on load
(function() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById('themeToggle');
        if (btn) { btn.textContent = '☀️'; btn.title = 'Switch to Light Mode'; }
      });
    }
  } catch(e) {}
})();

function toggleBangla() {
  const isOn = document.body.classList.toggle('show-bn');
  State.lang = isOn ? 'bn' : 'en';
  VoiceEngine.setLang(State.lang);

  const btn = document.getElementById('bnToggleBtn');
  if (isOn) {
    btn.textContent = '🇧🇩 বাংলা লুকাও';
    btn.classList.add('on');
    Animations.banglaReveal();
    Animations.emojiRain(['🇧🇩','✨','🌟'], 6);
  } else {
    btn.textContent = '🇧🇩 বাংলা দেখাও';
    btn.classList.remove('on');
  }
}

// Keep old setLang for internal use (voice engine etc.)
function setLang(lang) {
  State.lang = lang;
  VoiceEngine.setLang(lang);
}

/* ── Voice selector ──────────────────────────────── */
function setVoice(idx) {
  State.voice = idx;
  VoiceEngine.setVoice(idx);
  document.querySelectorAll('.v-btn').forEach((b, i) =>
    b.classList.toggle('on', i === idx)
  );
}

/* ── Section nav ─────────────────────────────────── */
function goTo(id) {
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  document.querySelector(`.tab[data-s="${id}"]`).classList.add('on');

  // Section-specific init
  if (id === 'quiz')  initQuiz();
  if (id === 'match') initMatch();
  if (id === 'flash') updateFlash();
}

/* ── Background animated blobs + floating emojis ─── */
function buildBackground() {
  const layer = document.getElementById('bgMesh');
  const clrs = ['#FF6B9D','#FFB347','#4ECDC4','#A18CD1','#A8E063','#F7DC6F','#43E97B'];

  // Blobs
  for (let i = 0; i < 7; i++) {
    const b = document.createElement('div');
    b.className = 'blob';
    const s = 160 + Math.random() * 360;
    b.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}vw;top:${Math.random()*100}vh;background:${clrs[i%clrs.length]};animation-duration:${14+Math.random()*14}s;animation-delay:${Math.random()*8}s;`;
    layer.appendChild(b);
  }

  // Floating alphabet letters
  const bgLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 0; i < 10; i++) {
    const fl = document.createElement('div');
    fl.className = 'bg-float-letter';
    fl.textContent = bgLetters[Math.floor(Math.random() * 26)];
    const size = 1.4 + Math.random() * 2.2;
    fl.style.cssText = `left:${Math.random()*95}vw;font-size:${size}rem;animation-duration:${18+Math.random()*20}s;animation-delay:${Math.random()*15}s;color:${clrs[i%clrs.length]};`;
    layer.appendChild(fl);
  }

  // ⭐ Stars, sparkles, lights rising from bottom
  const starEmojis = ['⭐','🌟','✨','💫','🌠','💥','🎇','🎆','🌙','☀️','🌈','💡','🔆','🕯️','🌸','❄️','🦋','🎀'];
  for (let i = 0; i < 18; i++) {
    const em = document.createElement('div');
    em.className = 'bg-star-floater';
    em.textContent = starEmojis[Math.floor(Math.random() * starEmojis.length)];
    em.style.cssText = `
      position:absolute;
      left:${2+Math.random()*96}vw;
      bottom:-60px;
      font-size:${0.9+Math.random()*1.4}rem;
      animation: starRise ${14+Math.random()*18}s ${Math.random()*20}s linear infinite;
      opacity:0;
      pointer-events:none;
      user-select:none;
    `;
    layer.appendChild(em);
  }

  // Twinkling fixed stars at random positions
  for (let i = 0; i < 14; i++) {
    const tw = document.createElement('div');
    tw.className = 'bg-twinkle';
    tw.textContent = ['⭐','✨','🌟','💫'][Math.floor(Math.random()*4)];
    tw.style.cssText = `
      position:absolute;
      left:${Math.random()*98}vw;
      top:${Math.random()*80}vh;
      font-size:${0.7+Math.random()*1.1}rem;
      animation: twinkleAnim ${2+Math.random()*3}s ${Math.random()*4}s ease-in-out infinite;
      opacity:0;
      pointer-events:none;
      user-select:none;
    `;
    layer.appendChild(tw);
  }
}

/* ── Build alphabet grid ─────────────────────────── */
function buildGrid() {
  const grid = document.getElementById('aGrid');
  LETTER_LIST.forEach((L, i) => {
    const d = ALPHA_DATA[L];
    const card = document.createElement('div');
    card.className = 'a-card';
    card.id = 'ac' + L;
    card.style.cssText = `--c1:${d.color1};--c2:${d.color2};--i:${i};`;
    card.innerHTML = `
      <div class="lbg"></div>
      <div class="a-up">${L}</div>
      <div class="a-lo">${L.toLowerCase()}</div>
      <span class="a-em">${d.words[0].em}</span>
    `;
    card.addEventListener('click', () => {
      Animations.ripple(card);
      openModal(L);
    });
    grid.appendChild(card);
  });
}

/* ── Modal ───────────────────────────────────────── */
let modalLetter = 'A';

function openModal(L) {
  modalLetter = L;
  const d = ALPHA_DATA[L];
  const grad = getGrad(L);

  // Hero letter with gradient
  const hero = document.getElementById('mHero');
  hero.style.background = grad;
  hero.style.webkitBackgroundClip = 'text';
  hero.style.webkitTextFillColor  = 'transparent';
  hero.style.backgroundClip = 'text';
  hero.textContent = L;

  document.getElementById('mCases').textContent = `${L}   ${L.toLowerCase()}`;
  document.getElementById('mPhon').textContent  = `🔉 /${d.ph}/`;
  document.getElementById('mFact').textContent  = d.fact;
  document.getElementById('mFactBn').textContent = d.factBn;

  // Word chips — tap any word to hear it spoken
  document.getElementById('mChips').innerHTML = d.words.map(w => `
    <div class="word-chip" onclick="speakWord('${w.en}', '${w.bn}')">
      <span class="wc-emoji">${w.em}</span>
      <span class="wc-en">${w.en}</span>
      <span class="wc-bn bn-text">${w.bn}</span>
      <span class="wc-tap">👆 tap to hear</span>
    </div>
  `).join('');

  document.getElementById('modalOverlay').classList.add('on');

  // Mark as learned
  State.learned.add(L);
  const card = document.getElementById('ac' + L);
  if (card) {
    card.classList.add('done');
    Animations.starBurst(card, 6);
  }

  addXP(5);

  // Auto-speak + pulse ring on speak button
  setTimeout(() => {
    speakModalLetter();
    const spkBtn = document.getElementById('mSpkBtn');
    if (spkBtn) Animations.pulseRing(spkBtn, '#4ECDC4');
  }, 400);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('on');
  VoiceEngine.cancel();
  setSpeakIdle();
}

function onOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function speakModalLetter() {
  setSpeakActive();
  VoiceEngine.speakLetter(modalLetter).then(setSpeakIdle);
}

async function speakWord(en, bn) {
  if (State.lang === 'bn') {
    await VoiceEngine.speakWord(bn, true);
  } else {
    await VoiceEngine.speakWord(en, false);
  }
}

function setSpeakActive() {
  document.getElementById('mWave').classList.add('on');
  document.getElementById('mSpkTxt').style.display = 'none';
  document.getElementById('mSpkBtn').classList.add('on');
  document.getElementById('mHero').classList.add('glow');
}
function setSpeakIdle() {
  document.getElementById('mWave').classList.remove('on');
  document.getElementById('mSpkTxt').style.display = 'inline';
  document.getElementById('mSpkBtn').classList.remove('on');
  if (document.getElementById('mHero'))
    document.getElementById('mHero').classList.remove('glow');
}

/* ── Init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Animations.injectKeyframes();
  buildBackground();
  buildGrid();

  // CSS touch-action:manipulation handles double-tap zoom — no JS needed
  // (the old touchend+preventDefault was blocking all onclick handlers on mobile)

  // Periodic shooting stars — whimsical background delight
  setInterval(() => {
    if (Math.random() > 0.5) Animations.shootingStar();
  }, 4500);

  // Welcome shooting stars on load
  setTimeout(() => Animations.shootingStar(), 800);
  setTimeout(() => Animations.shootingStar(), 1400);
});