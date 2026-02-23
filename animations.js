/* ═══════════════════════════════════════════════
   animations.js — SUPER Enhanced particle engine
   ═══════════════════════════════════════════════ */

const Animations = (() => {

  // ── Confetti burst — bigger & more colorful ──
  function confetti(options = {}) {
    const count  = options.count  || 80;
    const x      = options.x      || window.innerWidth  * 0.5;
    const y      = options.y      || window.innerHeight * 0.3;
    const spread = options.spread || 1;
    const colors = options.colors || CONFETTI_COLORS;
    for (let i = 0; i < count; i++) {
      const bit   = document.createElement('div');
      const angle = (Math.random() * 360) * Math.PI / 180;
      const dist  = (70 + Math.random() * 180) * spread;
      const size  = 7 + Math.random() * 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const dur   = 1000 + Math.random() * 1000;
      const delay = Math.random() * 500;
      const shapes = ['50%', '3px', '0%'];
      bit.style.cssText = `
        position:fixed; left:${x}px; top:${y}px;
        width:${size}px; height:${size * (Math.random() > .5 ? 1 : .4)}px;
        background:${color};
        border-radius:${shapes[Math.floor(Math.random()*shapes.length)]};
        pointer-events:none; z-index:9999;
        animation:confettiFly ${dur}ms ${delay}ms cubic-bezier(.25,.46,.45,.94) forwards;
        --tx:${Math.cos(angle)*dist}px; --ty:${Math.sin(angle)*dist-120}px;
        --rot:${Math.random()*900-450}deg;
      `;
      document.body.appendChild(bit);
      setTimeout(() => bit.remove(), dur + delay + 100);
    }
  }

  // ── Star burst from element ──────────────────
  function starBurst(el, count = 10) {
    const rect = el && el.getBoundingClientRect ? el.getBoundingClientRect()
      : { left: window.innerWidth/2, top: window.innerHeight/2, width:0, height:0 };
    const cx = rect.left + rect.width/2, cy = rect.top + rect.height/2;
    const stars = ['⭐','✨','💫','🌟','⭐','💥','🎇'];
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const angle = (i / count) * Math.PI * 2;
      const dist  = 50 + Math.random() * 80;
      star.style.cssText = `
        position:fixed; left:${cx}px; top:${cy}px;
        font-size:${.9+Math.random()*1.2}rem; pointer-events:none; z-index:9998;
        animation:starFly 900ms ${i*45}ms ease-out forwards;
        --tx:${Math.cos(angle)*dist}px; --ty:${Math.sin(angle)*dist}px;
      `;
      star.textContent = stars[i % stars.length];
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 1000 + i*45);
    }
  }

  // ── Floating XP toast ─────────────────────────
  function xpToast(amount, x, y) {
    const t = document.createElement('div');
    t.innerHTML = `+${amount} XP! ⭐`;
    t.style.cssText = `
      position:fixed; left:${x||window.innerWidth/2}px; top:${y||window.innerHeight*.45}px;
      transform:translate(-50%,-50%); z-index:9997; pointer-events:none;
      font-family:'Fredoka',cursive; font-weight:700; font-size:1.5rem;
      background:linear-gradient(135deg,#FFD93D,#FF8C42);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text;
      filter:drop-shadow(0 2px 8px rgba(255,183,3,.5));
      animation:xpFloat 1.5s ease forwards;
    `;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1600);
  }

  // ── Word pop ─────────────────────────────────
  function wordPop(el) {
    el.style.animation = 'none'; void el.offsetHeight;
    el.style.animation = 'wordBounce 0.5s cubic-bezier(.34,1.56,.64,1)';
    setTimeout(() => { el.style.animation = ''; }, 600);
  }

  // ── Letter wiggle ────────────────────────────
  function letterWiggle(el) {
    el.style.animation = 'none'; void el.offsetHeight;
    el.style.animation = 'wiggleAnim 0.5s ease';
    setTimeout(() => { el.style.animation = ''; }, 600);
  }

  // ── Speak glow ────────────────────────────────
  function speakGlow(el, duration = 800) {
    el.classList.add('speaking-glow');
    setTimeout(() => el.classList.remove('speaking-glow'), duration);
  }

  // ── Screen flash ─────────────────────────────
  function flashScreen(color = 'rgba(34,201,138,0.15)') {
    const f = document.createElement('div');
    f.style.cssText = `position:fixed;inset:0;background:${color};pointer-events:none;z-index:9990;animation:screenFlash 600ms ease forwards;`;
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 700);
  }

  // ── Emoji rain ────────────────────────────────
  function emojiRain(emojis = ['⭐','🌟','💫'], count = 18) {
    for (let i = 0; i < count; i++) {
      const em  = document.createElement('div');
      const dur = 1200 + Math.random() * 1200;
      const dly = Math.random() * 900;
      em.style.cssText = `
        position:fixed; left:${3+Math.random()*94}vw; top:-60px;
        font-size:${1.2+Math.random()*1.6}rem; pointer-events:none; z-index:9995;
        animation:emojiDrop ${dur}ms ${dly}ms ease-in forwards;
      `;
      em.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      document.body.appendChild(em);
      setTimeout(() => em.remove(), dur+dly+100);
    }
  }

  // ── Ripple from element ───────────────────────
  function ripple(el) {
    const rect = el.getBoundingClientRect();
    const colors = ['rgba(255,77,142,.5)','rgba(155,89,245,.5)','rgba(0,212,200,.5)'];
    const color = colors[Math.floor(Math.random()*colors.length)];
    const r = document.createElement('div');
    r.style.cssText = `
      position:fixed; left:${rect.left+rect.width/2}px; top:${rect.top+rect.height/2}px;
      width:10px; height:10px; border-radius:50%;
      background:${color}; transform:translate(-50%,-50%) scale(0);
      pointer-events:none; z-index:9996; animation:rippleOut 600ms ease-out forwards;
    `;
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 700);
  }

  // ── Shooting star ─────────────────────────────
  function shootingStar() {
    const s = document.createElement('div');
    const colors = [
      'linear-gradient(90deg,transparent,#FFD700,#fff,transparent)',
      'linear-gradient(90deg,transparent,#FF4D8E,#fff,transparent)',
      'linear-gradient(90deg,transparent,#00D4C8,#fff,transparent)',
      'linear-gradient(90deg,transparent,#9B59F5,#fff,transparent)',
    ];
    const grad = colors[Math.floor(Math.random()*colors.length)];
    s.style.cssText = `
      position:fixed; top:${3+Math.random()*45}vh; left:-100px;
      width:${90+Math.random()*60}px; height:${2+Math.random()*2}px; border-radius:3px;
      background:${grad}; pointer-events:none; z-index:9994;
      animation:shootAcross ${600+Math.random()*500}ms ease-in forwards;
    `;
    document.body.appendChild(s);
    // Sparkle trail
    setTimeout(() => {
      const spark = document.createElement('div');
      const r2 = s.getBoundingClientRect();
      spark.style.cssText = `
        position:fixed; left:${r2.left+40}px; top:${r2.top}px;
        font-size:.8rem; pointer-events:none; z-index:9993;
        animation:sparkleAnim 500ms ease forwards;
      `;
      spark.textContent = '✨';
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }, 200);
    setTimeout(() => s.remove(), 1300);
  }

  // ── Bangla toggle reveal splash ───────────────
  function banglaReveal() {
    const s = document.createElement('div');
    s.textContent = '🇧🇩 বাংলা!';
    s.style.cssText = `
      position:fixed; top:50%; left:50%;
      font-family:'Hind Siliguri',sans-serif; font-weight:700;
      font-size:clamp(1.8rem,7vw,2.8rem); color:#006A4E;
      background:linear-gradient(135deg,rgba(255,255,255,.98),rgba(240,255,248,.98));
      padding:.7rem 2rem; border-radius:50px;
      box-shadow:0 12px 40px rgba(0,106,78,.35), 0 0 0 3px rgba(0,106,78,.2);
      pointer-events:none; z-index:9993;
      animation:splashPop 1s cubic-bezier(.34,1.56,.64,1) forwards;
    `;
    document.body.appendChild(s);
    emojiRain(['🇧🇩','✨','🌿','💚'], 8);
    setTimeout(() => s.remove(), 1100);
  }

  // ── Level-up burst ─────────────────────────────
  function levelUp(lv) {
    confetti({ count: 120 });
    emojiRain(['🏆','⭐','🌟','💫','🎉','🎊','🔥','✨'], 25);
    for (let i = 0; i < 5; i++) setTimeout(shootingStar, i*180);
    const msg = document.createElement('div');
    msg.innerHTML = `🏆 Level ${lv}!`;
    msg.style.cssText = `
      position:fixed; top:35%; left:50%;
      font-family:'Fredoka',cursive; font-weight:700;
      font-size:clamp(2rem,9vw,4rem); color:#fff;
      background:linear-gradient(135deg,#FF4D8E,#9B59F5,#00D4C8);
      padding:.6rem 2.2rem; border-radius:50px;
      box-shadow:0 14px 50px rgba(155,89,245,.55), 0 0 0 3px rgba(255,255,255,.3);
      pointer-events:none; z-index:9993;
      animation:splashPop 1.2s cubic-bezier(.34,1.56,.64,1) forwards;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 1400);
  }

  // ── Pulse rings from element ──────────────────
  function pulseRing(el, color = '#9B59F5') {
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
      const ring = document.createElement('div');
      ring.style.cssText = `
        position:fixed; left:${rect.left+rect.width/2}px; top:${rect.top+rect.height/2}px;
        width:${rect.width}px; height:${rect.height}px; border-radius:50%;
        border:3px solid ${color}; transform:translate(-50%,-50%) scale(1);
        pointer-events:none; z-index:9995; opacity:.85;
        animation:pulseRingOut 750ms ${i*160}ms ease-out forwards;
      `;
      document.body.appendChild(ring);
      setTimeout(() => ring.remove(), 950+i*160);
    }
  }

  // ── Magic sparkles around element ────────────
  function magicSparkles(el, count = 12) {
    const rect = el.getBoundingClientRect();
    const particles = ['✨','💫','⭐','🌟','🔥','💥'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const angle = (i/count)*Math.PI*2;
      const r = 40 + Math.random()*50;
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      p.style.cssText = `
        position:fixed; left:${cx}px; top:${cy}px;
        font-size:${.8+Math.random()*.9}rem; pointer-events:none; z-index:9997;
        animation:magicSpark ${600+i*50}ms ${i*40}ms ease-out forwards;
        --sx:${Math.cos(angle)*r}px; --sy:${Math.sin(angle)*r}px;
      `;
      p.textContent = particles[Math.floor(Math.random()*particles.length)];
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700+i*90);
    }
  }

  // ── Rainbow burst ─────────────────────────────
  function rainbowBurst(x, y) {
    const colors = ['#FF4D8E','#FF8C42','#FFD93D','#2EDB78','#00D4C8','#3B82F6','#9B59F5'];
    colors.forEach((c, i) => {
      const arc = document.createElement('div');
      const angle = (i/colors.length)*360;
      const dist = 80 + Math.random()*60;
      arc.style.cssText = `
        position:fixed; left:${x||window.innerWidth/2}px; top:${y||window.innerHeight/3}px;
        width:14px; height:14px; border-radius:50%;
        background:${c}; pointer-events:none; z-index:9996;
        filter:blur(.5px);
        animation:rainbowArc 700ms ${i*50}ms cubic-bezier(.25,.46,.45,.94) forwards;
        --tx:${Math.cos(angle*Math.PI/180)*dist}px;
        --ty:${Math.sin(angle*Math.PI/180)*dist-60}px;
      `;
      document.body.appendChild(arc);
      setTimeout(() => arc.remove(), 800+i*50);
    });
  }

  // ── Inject all keyframes ──────────────────────
  function injectKeyframes() {
    if (document.getElementById('anim-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'anim-keyframes';
    style.textContent = `
      @keyframes confettiFly {
        0%   { transform:translate(0,0) rotate(0) scale(1); opacity:1; }
        80%  { opacity:.9; }
        100% { transform:translate(var(--tx),var(--ty)) rotate(var(--rot)) scale(.2); opacity:0; }
      }
      @keyframes starFly {
        0%   { transform:translate(0,0) scale(0); opacity:0; }
        25%  { transform:translate(calc(var(--tx)*.35),calc(var(--ty)*.35)) scale(1.3); opacity:1; }
        100% { transform:translate(var(--tx),var(--ty)) scale(0); opacity:0; }
      }
      @keyframes xpFloat {
        0%   { transform:translate(-50%,-50%) scale(.7); opacity:0; }
        12%  { transform:translate(-50%,-60%) scale(1.3); opacity:1; }
        65%  { opacity:1; }
        100% { transform:translate(-50%,-150%) scale(1.05); opacity:0; }
      }
      @keyframes wordBounce {
        0%   { transform:scale(1); }
        35%  { transform:scale(1.3) rotate(-4deg); }
        60%  { transform:scale(.92) rotate(2deg); }
        100% { transform:scale(1); }
      }
      @keyframes wiggleAnim {
        0%,100% { transform:rotate(0) translateX(0); }
        20%     { transform:rotate(-8deg) translateX(-8px); }
        40%     { transform:rotate(8deg) translateX(8px); }
        60%     { transform:rotate(-5deg) translateX(-4px); }
        80%     { transform:rotate(4deg) translateX(3px); }
      }
      @keyframes screenFlash {
        0%{opacity:0} 20%{opacity:1} 100%{opacity:0}
      }
      @keyframes emojiDrop {
        0%   { transform:translateY(0) rotate(0) scale(0); opacity:0; }
        8%   { opacity:1; transform:scale(1.1); }
        100% { transform:translateY(108vh) rotate(380deg) scale(.6); opacity:0; }
      }
      .speaking-glow { animation:speakPulse .6s ease infinite alternate !important; }
      @keyframes speakPulse {
        from { filter:drop-shadow(0 0 8px rgba(155,89,245,.5)); }
        to   { filter:drop-shadow(0 0 32px rgba(0,212,200,.9)) drop-shadow(0 0 60px rgba(155,89,245,.5)); }
      }
      @keyframes cardEntrance {
        from { opacity:0; transform:translateY(20px) scale(.92); }
        to   { opacity:1; transform:translateY(0) scale(1); }
      }
      @keyframes letterBounceIn {
        0%   { transform:scale(0) rotate(-18deg); opacity:0; }
        55%  { transform:scale(1.18) rotate(4deg); opacity:1; }
        80%  { transform:scale(.95) rotate(-2deg); }
        100% { transform:scale(1) rotate(0); opacity:1; }
      }
      @keyframes floatSway {
        0%,100% { transform:translateY(0) rotate(0); }
        33%     { transform:translateY(-10px) rotate(2deg); }
        66%     { transform:translateY(-5px) rotate(-1deg); }
      }
      @keyframes shimmerSlide {
        0%   { background-position:200% center; }
        100% { background-position:-200% center; }
      }
      @keyframes bgBlob {
        0%,100% { transform:translate(0,0) scale(1); }
        33%     { transform:translate(40px,-30px) scale(1.08); }
        66%     { transform:translate(-20px,35px) scale(.95); }
      }
      @keyframes bounceIn {
        0%   { transform:scale(0); opacity:0; }
        55%  { transform:scale(1.22); opacity:1; }
        75%  { transform:scale(.92); }
        100% { transform:scale(1); }
      }
      @keyframes slideUp {
        from { transform:translateY(24px); opacity:0; }
        to   { transform:translateY(0); opacity:1; }
      }
      @keyframes fadeIn {
        from { opacity:0; } to { opacity:1; }
      }
      @keyframes rippleOut {
        to { transform:translate(-50%,-50%) scale(22); opacity:0; }
      }
      @keyframes shootAcross {
        0%   { transform:translateX(0) scaleX(1); opacity:1; }
        80%  { opacity:.8; }
        100% { transform:translateX(130vw) scaleX(.5); opacity:0; }
      }
      @keyframes splashPop {
        0%   { transform:translate(-50%,-50%) scale(0) rotate(-10deg); opacity:0; }
        50%  { transform:translate(-50%,-50%) scale(1.18) rotate(2deg); opacity:1; }
        80%  { transform:translate(-50%,-50%) scale(.97) rotate(0); opacity:1; }
        90%  { transform:translate(-50%,-50%) scale(1.02); opacity:1; }
        100% { transform:translate(-50%,-50%) scale(1.05); opacity:0; }
      }
      @keyframes pulseRingOut {
        to { transform:translate(-50%,-50%) scale(3.2); opacity:0; }
      }
      @keyframes bgFloatLetter {
        0%   { transform:translateY(108vh) rotate(0); opacity:0; }
        5%   { opacity:.12; }
        95%  { opacity:.12; }
        100% { transform:translateY(-130px) rotate(360deg); opacity:0; }
      }
      @keyframes ringFloat {
        0%   { transform:translate(0,0) scale(1) rotate(0); opacity:.06; }
        50%  { transform:translate(20px,-25px) scale(1.18) rotate(180deg); opacity:.14; }
        100% { transform:translate(0,0) scale(1) rotate(360deg); opacity:.06; }
      }
      @keyframes diamondSpin {
        0%   { transform:rotate(0deg) scale(1); opacity:.06; }
        50%  { opacity:.12; transform:rotate(180deg) scale(1.25); }
        100% { transform:rotate(360deg) scale(1); opacity:.06; }
      }
      @keyframes floaterRise {
        0%   { transform:translateY(0) rotate(0) scale(.7); opacity:0; }
        8%   { opacity:.2; transform:scale(1); }
        90%  { opacity:.15; }
        100% { transform:translateY(-120vh) rotate(360deg) scale(.5); opacity:0; }
      }
      @keyframes magicSpark {
        0%   { transform:translate(0,0) scale(0); opacity:0; }
        25%  { transform:translate(calc(var(--sx)*.4),calc(var(--sy)*.4)) scale(1.2); opacity:1; }
        100% { transform:translate(var(--sx),var(--sy)) scale(0); opacity:0; }
      }
      @keyframes rainbowArc {
        0%   { transform:translate(0,0) scale(1); opacity:1; }
        100% { transform:translate(var(--tx),var(--ty)) scale(0); opacity:0; }
      }
      @keyframes sparkleAnim {
        0%   { transform:scale(0) rotate(0); opacity:0; }
        40%  { transform:scale(1.3) rotate(180deg); opacity:1; }
        100% { transform:scale(0) rotate(360deg); opacity:0; }
      }
      @keyframes cardPop {
        0%   { transform:translateY(-8px) scale(1.06); }
        50%  { transform:translateY(-12px) scale(1.1); }
        100% { transform:translateY(-8px) scale(1.06); }
      }
      @keyframes heroFloat {
        0%,100% { transform:translateY(0) rotate(0); }
        30%     { transform:translateY(-14px) rotate(3deg); }
        70%     { transform:translateY(-7px) rotate(-2deg); }
      }

      /* ── Bangla system ── */
      .bn-text { display: none !important; }
      body.show-bn .bn-text {
        display: block !important;
        animation: bnReveal .4s cubic-bezier(.34,1.56,.64,1) forwards;
      }
      body.show-bn span.bn-text,
      body.show-bn div.bn-text.wc-bn { display: inline-block !important; }
      @keyframes bnReveal {
        0%   { opacity:0; transform:translateY(-8px) scale(.88); }
        55%  { opacity:1; transform:translateY(2px) scale(1.05); }
        100% { opacity:1; transform:translateY(0) scale(1); }
      }

      /* ── Bangla toggle button ── */
      .bn-toggle-btn {
        display:inline-flex; align-items:center; gap:.4rem;
        padding:.38rem 1.2rem; border-radius:50px;
        border:2.5px solid #006A4E; background:#fff;
        font-family:'Hind Siliguri',sans-serif; font-size:.85rem; font-weight:700;
        color:#006A4E; cursor:pointer;
        transition:all .28s cubic-bezier(.34,1.56,.64,1);
        -webkit-tap-highlight-color:transparent;
        box-shadow:0 3px 14px rgba(0,106,78,.14);
      }
      .bn-toggle-btn:hover {
        background:linear-gradient(135deg,#006A4E,#008A60); color:#fff;
        transform:translateY(-3px) scale(1.05);
        box-shadow:0 8px 22px rgba(0,106,78,.35);
      }
      .bn-toggle-btn.on {
        background:linear-gradient(135deg,#006A4E,#008A60); color:#fff;
        box-shadow:0 5px 18px rgba(0,106,78,.4);
      }

      /* ── Floating bg letters ── */
      .bg-float-letter {
        position:absolute; font-family:'Fredoka',cursive; font-weight:700;
        opacity:0; pointer-events:none; user-select:none;
        animation:bgFloatLetter linear infinite;
      }

      /* ── Rainbow border on modal when speaking ── */
      @keyframes rainbowBorder {
        0%,100% { border-color:rgba(155,89,245,.3); }
        25%     { border-color:rgba(255,77,142,.5); }
        50%     { border-color:rgba(0,212,200,.5); }
        75%     { border-color:rgba(255,183,3,.5); }
      }

      /* ── Glow pulse for XP ── */
      @keyframes xpGlow {
        0%,100% { box-shadow:0 0 8px rgba(155,89,245,.3); }
        50%     { box-shadow:0 0 25px rgba(155,89,245,.6); }
      }
    `;
    document.head.appendChild(style);
  }

  return {
    confetti, starBurst, xpToast, wordPop,
    letterWiggle, speakGlow, flashScreen, emojiRain,
    ripple, shootingStar, banglaReveal, levelUp, pulseRing,
    magicSparkles, rainbowBurst,
    injectKeyframes,
  };

})();
