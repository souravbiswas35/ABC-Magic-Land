/* ═══════════════════════════════════════════════
   games.js — Flashcard, Type, Quiz, Match
   ═══════════════════════════════════════════════ */

/* ══════════════════════════════════
   FLASHCARD
══════════════════════════════════ */
let flashIdx     = 0;
let flashFlipped = false;

function updateFlash() {
  const L = LETTER_LIST[flashIdx];
  const d = ALPHA_DATA[L];
  const w = d.words[0]; // always word[0] — consistent with what we show and speak

  document.getElementById('fcL').textContent   = L;
  document.getElementById('fcLo').textContent  = L.toLowerCase();
  document.getElementById('fcEm').textContent  = w.em;
  document.getElementById('fcWen').textContent = w.en;
  document.getElementById('fcWbn').textContent = w.bn;
  document.getElementById('fcPh').textContent  = `/${d.ph}/`;
  document.getElementById('fcCnt').textContent = `${flashIdx + 1} of 26`;

  // Back face keeps dark base — just update border color to letter color
  const back = document.getElementById('fcBack');
  back.style.borderColor = d.color1 + '80';

  flashFlipped = false;
  document.getElementById('fcScene').classList.remove('flipped');
}

function flipCard() {
  flashFlipped = !flashFlipped;
  document.getElementById('fcScene').classList.toggle('flipped', flashFlipped);
  if (flashFlipped) {
    const L = LETTER_LIST[flashIdx];
    const d = ALPHA_DATA[L];
    const w = d.words[0]; // MUST match what's shown on back face
    // Speak word that matches what's displayed
    if (State.lang === 'bn') {
      VoiceEngine.speakWord(w.bn, true);
    } else {
      VoiceEngine.speakWord(w.en, false);
    }
    addXP(2);
  }
}

function flashNav(dir) {
  flashIdx = (flashIdx + dir + 26) % 26;
  updateFlash();
}

function speakFlashLetter() { VoiceEngine.speakLetter(LETTER_LIST[flashIdx]); }
function speakFlashWord() {
  const L = LETTER_LIST[flashIdx];
  const d = ALPHA_DATA[L];
  const w = d.words[flashIdx % d.words.length];
  if (State.lang === 'bn') {
    VoiceEngine.speakWord(w.bn, true);
  } else {
    VoiceEngine.speakWord(w.en, false);
  }
}

// Keyboard: spacebar flips card
document.addEventListener('keydown', e => {
  if (e.code === 'Space' && document.getElementById('flash').classList.contains('on')) {
    e.preventDefault(); flipCard();
  }
});

/* ══════════════════════════════════
   TYPE SECTION
══════════════════════════════════ */
let typeIdx = 0;

function updateTypeUI() {
  const L = LETTER_LIST[typeIdx];
  const d = ALPHA_DATA[L];
  const w = d.words[0];

  document.getElementById('typeNavBig').textContent = L;
  document.getElementById('typeNavCnt').textContent = `${typeIdx + 1} of 26`;

  // Big letter display with gradient
  const bigEl = document.getElementById('typeBigL');
  bigEl.textContent = `${L} ${L.toLowerCase()}`;
  bigEl.style.background = getGrad(L);
  bigEl.style.webkitBackgroundClip = 'text';
  bigEl.style.webkitTextFillColor  = 'transparent';
  bigEl.style.backgroundClip = 'text';

  document.getElementById('typeHintEm').textContent = w.em;
  document.getElementById('typeHintEn').textContent = w.en;
  document.getElementById('typeHintBn').textContent = w.bn;
  clearType();
}

function changeType(dir) {
  typeIdx = (typeIdx + dir + 26) % 26;
  updateTypeUI();
}

function clearType() {
  const inp = document.getElementById('typeInp');
  inp.value = ''; inp.className = 'type-input';
  document.getElementById('typeRes').className = 'result';
  buildCharDots('');
}

function buildCharDots(val) {
  const L   = LETTER_LIST[typeIdx];
  const tgt = L + L.toLowerCase();
  document.getElementById('charRow').innerHTML = tgt.split('').map((ch, i) => {
    const t = val[i];
    let cls = 'idle';
    if (t !== undefined) cls = (t === ch) ? 'hit' : 'miss';
    return `<div class="ch ${cls}">${t || ch}</div>`;
  }).join('');
}

function onTypeInput() {
  const L   = LETTER_LIST[typeIdx];
  const inp = document.getElementById('typeInp');
  const val = inp.value;
  buildCharDots(val);

  const res   = document.getElementById('typeRes');
  const hasUp = val.includes(L);
  const hasLo = val.includes(L.toLowerCase());

  if (hasUp && hasLo) {
    inp.className = 'type-input ok';
    res.innerHTML = `
      ✅ Perfect! You typed <b>${L}</b> and <b>${L.toLowerCase()}</b>!
      <span class="r-bn bn-text">তুমি "${L}" এবং "${L.toLowerCase()}" লিখেছ — অসাধারণ!</span>
    `;
    res.className = 'result ok';
    praise();
    State.learned.add(L);
    const ac = document.getElementById('ac' + L);
    if (ac) ac.classList.add('done');
  } else if (val.length >= 3 && !hasUp && !hasLo) {
    inp.className = 'type-input bad';
    res.innerHTML = `
      Try typing <b>${L}</b> then <b>${L.toLowerCase()}</b>
      <span class="r-bn bn-text">"${L}" তারপর "${L.toLowerCase()}" লেখার চেষ্টা করো</span>
    `;
    res.className = 'result err';
    Animations.letterWiggle(inp);
    VoiceEngine.speak('Try again!');
  } else {
    inp.className = 'type-input';
    res.className = 'result';
  }
}

function speakTypeLetter() { VoiceEngine.speakLetter(LETTER_LIST[typeIdx]); }
function speakTypeWord() {
  const d = ALPHA_DATA[LETTER_LIST[typeIdx]];
  const w = d.words[0];
  if (State.lang === 'bn') VoiceEngine.speakWord(w.bn, true);
  else VoiceEngine.speakWord(w.en, false);
}

/* ══════════════════════════════════
   QUIZ
══════════════════════════════════ */
let qCorrect = 0, qWrong = 0, qStreak = 0, qDone = 0;
let qAnswered = false, qCurL = 'A';

const Q_LABELS = [
  L => `Which word starts with "${L}"?`,
  L => `Find a word beginning with "${L}":`,
  L => `"${L}" is for... which one?`,
  L => `Tap the picture that matches "${L}"!`,
];
const Q_LABELS_BN = [
  L => `"${L}" দিয়ে কোন শব্দ শুরু হয়?`,
  L => `"${L}" দিয়ে শুরু হওয়া শব্দ খোঁজো:`,
  L => `"${L}" দিয়ে কোনটি শুরু হয়?`,
  L => `"${L}" অক্ষরের ছবিটি ট্যাপ করো!`,
];

function initQuiz() {
  qCorrect = qWrong = qStreak = qDone = 0;
  ['qC','qW','qStr'].forEach(id => { document.getElementById(id).textContent = 0; });
  document.getElementById('qFill').style.width = '0%';
  nextQ();
}

function nextQ() {
  qAnswered = false;
  document.getElementById('nxtQ').style.display = 'none';
  document.getElementById('qExpl').className = 'q-explain';

  qCurL = LETTER_LIST[Math.floor(Math.random() * 26)];
  const d = ALPHA_DATA[qCurL];
  const correct = d.words[Math.floor(Math.random() * d.words.length)];

  // 3 wrong distractors
  let pool = [];
  LETTER_LIST.filter(l => l !== qCurL).forEach(l =>
    ALPHA_DATA[l].words.forEach(w => pool.push(w))
  );
  pool = pool.sort(() => Math.random() - .5).slice(0, 3);
  const opts = [correct, ...pool].sort(() => Math.random() - .5);

  // Big letter — with gradient
  const bigEl = document.getElementById('qBigL');
  bigEl.textContent = qCurL;
  bigEl.style.background = getGrad(qCurL);
  bigEl.style.webkitBackgroundClip = 'text';
  bigEl.style.webkitTextFillColor  = 'transparent';
  bigEl.style.backgroundClip = 'text';

  // Label
  const labelFn = State.lang === 'bn' ? Q_LABELS_BN : Q_LABELS;
  document.getElementById('qLabel').textContent = labelFn[qDone % labelFn.length](qCurL);

  // Options — big emoji + word + Bangla (hidden until toggled)
  const optsEl = document.getElementById('qOpts');
  optsEl.innerHTML = opts.map((o, i) => `
    <button class="q-opt" data-i="${i}" onclick="answerQ(this)">
      <span class="qem">${o.em}</span>
      <span class="qen">${o.en}</span>
      <span class="qbn bn-text">${o.bn}</span>
    </button>
  `).join('');
  optsEl._opts    = opts;
  optsEl._correct = correct;

  qDone++;
  document.getElementById('qFill').style.width = (Math.min(qDone / 26, 1) * 100) + '%';

  // Auto-speak the letter
  setTimeout(() => VoiceEngine.speakLetter(qCurL), 300);
}

function speakQzLetter() { VoiceEngine.speakLetter(qCurL); }

function answerQ(btn) {
  if (qAnswered) return;
  qAnswered = true;

  const optsEl  = document.getElementById('qOpts');
  const opts    = optsEl._opts;
  const correct = optsEl._correct;
  const chosen  = opts[parseInt(btn.dataset.i)];

  // Reveal all correct buttons
  document.querySelectorAll('.q-opt').forEach((b, i) => {
    if (opts[i] === correct) b.classList.add('win');
    b.disabled = true;
  });

  const expl = document.getElementById('qExpl');

  if (chosen === correct) {
    qCorrect++; qStreak++;
    btn.classList.add('win');
    expl.innerHTML = `
      ✅ Correct! <b>${correct.en}</b> starts with <b>${qCurL}</b>! 🎉
      <span class="qe-bn bn-text">"${correct.en}" (${correct.bn}) শুরু হয় "${qCurL}" দিয়ে!</span>
    `;
    expl.className = 'q-explain on';
    Animations.flashScreen('rgba(67,233,123,0.13)');
    Animations.ripple(btn);
    Animations.starBurst(btn, 5);
    praise();
  } else {
    qWrong++; qStreak = 0;
    btn.classList.add('lose');
    expl.innerHTML = `
      ❌ The answer is <b>${correct.en}</b> — starts with <b>${qCurL}</b>!
      <span class="qe-bn bn-text">সঠিক উত্তর ছিল "${correct.en}" (${correct.bn})</span>
    `;
    expl.className = 'q-explain on';
    Animations.letterWiggle(btn);
    VoiceEngine.speak('The answer is ' + correct.en);
  }

  document.getElementById('qC').textContent   = qCorrect;
  document.getElementById('qW').textContent   = qWrong;
  document.getElementById('qStr').textContent = qStreak;
  document.getElementById('nxtQ').style.display = 'inline-flex';
}

/* ══════════════════════════════════
   MATCH GAME
══════════════════════════════════ */
let mSel = null, mSelType = null;
let mPairs = [], mScore = 0, mDone = 0;

function initMatch() {
  mSel = null; mSelType = null; mDone = 0;
  document.getElementById('matchRes').className = 'result';

  const picks = [...LETTER_LIST].sort(() => Math.random() - .5).slice(0, 5);
  mPairs = picks.map(L => ({ L, w: ALPHA_DATA[L].words[0] }));

  const sl = [...mPairs].sort(() => Math.random() - .5);
  const sw = [...mPairs].sort(() => Math.random() - .5);

  document.getElementById('mLCol').innerHTML = sl.map(p => `
    <div class="m-item" data-ltr="${p.L}" data-t="L" onclick="mClick(this)">${p.L}</div>
  `).join('');

  document.getElementById('mWCol').innerHTML = sw.map(p => `
    <div class="m-item" data-ltr="${p.L}" data-t="W" onclick="mClick(this)">
      <span class="mi-em">${p.w.em}</span>
      <span class="mi-en">${p.w.en}</span>
      <span class="mi-bn bn-text">${p.w.bn}</span>
    </div>
  `).join('');
}

function mClick(el) {
  if (el.classList.contains('done')) return;
  const type = el.dataset.t;

  if (!mSel) {
    mSel = el; mSelType = type; el.classList.add('sel');
    const txt = type === 'L' ? el.dataset.ltr : el.querySelector('.mi-en').textContent;
    VoiceEngine.speak(txt);
    return;
  }

  // Same column — move selection
  if (type === mSelType) {
    mSel.classList.remove('sel');
    mSel = el; mSelType = type; el.classList.add('sel');
    return;
  }

  // Check match
  const prev = mSel;
  const A = prev.dataset.ltr, B = el.dataset.ltr;
  mSel = null; mSelType = null;

  if (A === B) {
    prev.classList.remove('sel'); prev.classList.add('done');
    el.classList.add('done');
    mDone++;
    addXP(8);
    Animations.starBurst(el);
    Animations.ripple(el);

    if (mDone === mPairs.length) {
      mScore += 10;
      document.getElementById('mScoreEl').textContent =
        State.lang === 'bn' ? `স্কোর: ${mScore}` : `Score: ${mScore}`;
      const res = document.getElementById('matchRes');
      res.innerHTML = `
        🎉 All matched! You are amazing!
        <span class="r-bn bn-text">সবগুলো মিলিয়েছ! তুমি অসাধারণ! 🌟</span>
      `;
      res.className = 'result ok';
      praise();
    }
  } else {
    prev.classList.remove('sel'); prev.classList.add('wrong');
    el.classList.add('wrong');
    Animations.letterWiggle(prev);
    setTimeout(() => {
      prev.classList.remove('wrong');
      el.classList.remove('wrong');
    }, 500);
    VoiceEngine.speak('Try again!');
  }
}

/* ── Init all sections on load ───────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateFlash();
  updateTypeUI();
});
