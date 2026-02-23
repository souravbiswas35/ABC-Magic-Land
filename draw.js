/* ═══════════════════════════════════════════════
   draw.js — Free practice drawing section
   Canvas ALWAYS visible on all devices!
   ═══════════════════════════════════════════════ */

const DrawSection = (() => {
  let idx     = 0;
  let drawing = false;
  let strokes = [];
  let curPts  = [];
  let color   = '#9B59F5';
  let brushSz = 6;
  let strokeCount = 0;

  const cvs = document.getElementById('cvs');
  const ctx = cvs.getContext('2d');

  /* ── Resize canvas — always ensure visible height ── */
  function resize() {
    const par = cvs.parentElement;
    const parW = par.offsetWidth;

    // Ensure canvas is always tall enough to draw on all devices
    // Use at least 220px height, scale up with wider screens
    const minH = 220;
    const calcH = Math.round(parW * 0.5);
    const maxH  = 360;

    cvs.width  = parW;
    cvs.height = Math.max(minH, Math.min(calcH, maxH));

    // Also set the CSS height to match so it's always visible
    cvs.style.height = cvs.height + 'px';
    par.style.minHeight = cvs.height + 'px';

    redraw();
  }

  function redraw() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.lineCap = ctx.lineJoin = 'round';
    strokes.forEach(s => {
      if (!s.pts.length) return;
      ctx.strokeStyle = s.c; ctx.lineWidth = s.sz;
      ctx.beginPath();
      if (s.pts.length === 1) {
        ctx.arc(s.pts[0].x, s.pts[0].y, s.sz / 2, 0, Math.PI * 2);
        ctx.fillStyle = s.c; ctx.fill(); return;
      }
      ctx.moveTo(s.pts[0].x, s.pts[0].y);
      for (let i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i].x, s.pts[i].y);
      ctx.stroke();
    });
  }

  /* ── Input helpers ───────────────────────────── */
  function getPos(e) {
    const r = cvs.getBoundingClientRect();
    const src = e.changedTouches
      ? e.changedTouches[0]
      : e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }

  /* ── Draw events ─────────────────────────────── */
  function onStart(e) {
    e.preventDefault();
    drawing = true;
    curPts  = [getPos(e)];
    document.getElementById('canvasWrap').classList.add('inked');
    updateEncourage();
  }

  function onMove(e) {
    if (!drawing) return;
    e.preventDefault();
    const pt = getPos(e);
    curPts.push(pt);
    ctx.strokeStyle = color; ctx.lineWidth = brushSz;
    ctx.lineCap = ctx.lineJoin = 'round';
    if (curPts.length > 1) {
      ctx.beginPath();
      ctx.moveTo(curPts[curPts.length - 2].x, curPts[curPts.length - 2].y);
      ctx.lineTo(pt.x, pt.y);
      ctx.stroke();
    }
  }

  function onEnd(e) {
    if (!drawing) return;
    e.preventDefault();
    drawing = false;
    if (e.changedTouches && e.changedTouches.length) curPts.push(getPos(e));
    strokes.push({ pts: [...curPts], c: color, sz: brushSz });
    strokeCount++;
    curPts = [];
    updateEncourage();

    // Award XP + magic sparkles on 5th stroke milestone
    if (strokeCount === 5) {
      addXP(5);
      Animations.starBurst(cvs);
      Animations.magicSparkles(cvs, 10);
    }
    // Bonus XP milestones
    if (strokeCount === 10) {
      addXP(8);
      Animations.rainbowBurst(window.innerWidth/2, window.innerHeight/2);
    }
  }

  cvs.addEventListener('mousedown',  onStart);
  cvs.addEventListener('mousemove',  onMove);
  cvs.addEventListener('mouseup',    onEnd);
  cvs.addEventListener('mouseleave', e => { if (drawing) onEnd(e); });
  cvs.addEventListener('touchstart', onStart,  { passive: false });
  cvs.addEventListener('touchmove',  onMove,   { passive: false });
  cvs.addEventListener('touchend',   onEnd,    { passive: false });
  cvs.addEventListener('touchcancel',onEnd,    { passive: false });

  /* ── Encouragement messages ──────────────────── */
  const ENC = [
    { en: 'Start drawing above! ✏️',         bn: 'উপরে আঁকা শুরু করো! ✏️',      color: 'var(--purple)' },
    { en: 'Great start! Keep going! ✨',      bn: 'দারুণ শুরু! চালিয়ে যাও! ✨',   color: '#00D4C8'      },
    { en: 'Looking good! Add more! 🎨',       bn: 'সুন্দর হচ্ছে! আরও আঁকো! 🎨',  color: '#3B82F6'      },
    { en: 'Wow, great strokes! 🌟',           bn: 'বাহ, কী সুন্দর! 🌟',            color: '#9B59F5'      },
    { en: 'Almost done! You\'re amazing! 🚀', bn: 'প্রায় হয়ে গেছে! তুমি অসাধারণ!',color: '#FF4D8E'      },
    { en: 'What a beautiful letter! 🏆',      bn: 'কী সুন্দর অক্ষর! 🏆',          color: '#FF8C42'      },
    { en: 'You\'re a star artist! ⭐',        bn: 'তুমি একজন তারকা শিল্পী! ⭐',   color: '#FFD93D'      },
    { en: 'Incredible drawing! 🌈',           bn: 'অবিশ্বাস্য! 🌈',               color: '#2EDB78'      },
  ];

  function updateEncourage() {
    const el  = document.getElementById('drawEnc');
    const n   = Math.min(strokeCount, ENC.length - 1);
    const msg = ENC[n];
    el.style.color = msg.color;
    el.style.transition = 'color .4s ease, transform .3s ease';
    el.textContent = State.lang === 'bn' ? msg.bn : msg.en;
    // Little pop animation on update
    el.style.transform = 'scale(1.08)';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 300);
  }

  /* ── Controls ────────────────────────────────── */
  function clear() {
    strokes = []; curPts = []; strokeCount = 0;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    document.getElementById('canvasWrap').classList.remove('inked');
    updateEncourage();
  }

  function setColor(c, el) {
    color = c;
    document.querySelectorAll('.cswatch').forEach(d => d.classList.remove('on'));
    el.classList.add('on');
    // Color change sparkle
    Animations.ripple(el);
  }

  function setBrush(s, el) {
    brushSz = s;
    document.querySelectorAll('.bdot').forEach(d => d.classList.remove('on'));
    el.classList.add('on');
  }

  function speakLetter() {
    VoiceEngine.speakLetter(LETTER_LIST[idx]);
  }

  /* ── Letter navigation ────────────────────────── */
  function change(dir) {
    idx = (idx + dir + 26) % 26;
    updateUI();
    // Small animation on change
    const ghost = document.getElementById('ghost');
    ghost.style.animation = 'none';
    void ghost.offsetHeight;
    ghost.style.animation = 'letterBounceIn .45s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { ghost.style.animation = ''; }, 500);
  }

  function updateUI() {
    const L = LETTER_LIST[idx];
    const d = ALPHA_DATA[L];
    const w = d.words[0];

    document.getElementById('dNavBig').textContent   = L;
    document.getElementById('dNavCnt').textContent   = `${idx + 1} of 26`;
    document.getElementById('ghost').textContent     = L;

    // Gradient on preview letter
    const prev = document.getElementById('dLetPrev');
    prev.textContent = L + ' / ' + L.toLowerCase();
    prev.style.background = getGrad(L);
    prev.style.webkitBackgroundClip = 'text';
    prev.style.webkitTextFillColor  = 'transparent';
    prev.style.backgroundClip = 'text';

    document.getElementById('dWordEn').textContent = `${w.em} ${w.en}`;
    document.getElementById('dWordBn').textContent = w.bn;
    document.getElementById('dTip').innerHTML =
      `💡 Trace the ghost <b>${L}</b> — follow its shape!`;

    strokeCount = 0;
    clear();
    updateEncourage();
  }

  // Expose to global
  window.drawChange = change;
  window.drawClear  = clear;
  window.drawSetColor = setColor;
  window.drawSetBrush = setBrush;
  window.drawSpeak  = speakLetter;

  window.addEventListener('resize', () => {
    resize();
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Run resize multiple times to ensure the canvas gets its dimensions
    resize();
    setTimeout(resize, 100);
    setTimeout(resize, 400);
    updateUI();
  });

  // Also resize whenever the draw section becomes visible
  document.addEventListener('click', e => {
    if (e.target && e.target.dataset && e.target.dataset.s === 'draw') {
      setTimeout(resize, 50);
    }
  });

})();
