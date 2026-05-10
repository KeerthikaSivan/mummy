/* ============================================================
   AMMA TRIBUTE — main.js
   ============================================================ */

/* ---------- Falling Petals ---------- */
(function () {
  var bg = document.getElementById('petalsBg');
  var colors = ['#ff9eb5','#ffd1dc','#ffb347','#ff85a1','#ffeaa7','#ff6b9d'];
  for (var i = 0; i < 30; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDuration = (4 + Math.random() * 6) + 's';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.width  = (10 + Math.random() * 14) + 'px';
    p.style.height = (14 + Math.random() * 18) + 'px';
    bg.appendChild(p);
  }
})();

/* ---------- Finale sparkles ---------- */
(function () {
  var s = document.getElementById('sparkles');
  var emojis = ['✨','🌸','💫','⭐','💛','🌺'];
  for (var i = 0; i < 14; i++) {
    var sp = document.createElement('div');
    sp.className = 'sparkle';
    sp.style.left = Math.random() * 100 + '%';
    sp.style.top  = Math.random() * 100 + '%';
    sp.style.animationDelay    = (Math.random() * 3) + 's';
    sp.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    sp.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.appendChild(sp);
  }
  var hearts = ['💛','🩷','🌸','💕'];
  for (var j = 0; j < 12; j++) {
    var h = document.createElement('div');
    h.className = 'confetti-heart';
    h.style.left = Math.random() * 100 + '%';
    h.style.top  = '-20px';
    h.style.animationDelay    = (Math.random() * 4) + 's';
    h.style.animationDuration = (2 + Math.random() * 3) + 's';
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    s.appendChild(h);
  }
})();

/* ---------- Lightbox ---------- */
function openLightbox(card) {
  var img = card.querySelector('img');
  document.getElementById('lbImg').src = img.src;
  document.getElementById('lightbox').classList.add('open');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}

/* ---------- Tamil poems text ---------- */
var poems = [
  'அன்னையின் கண்களில் காண்கிறேன் உலகை, அவள் புன்னகையில் மலர்கிறது வாழ்க்கை; பத்து மாதம் சுமந்தாள் என் நிறையை, பல்லாண்டும் சுமப்பாள் என் வாழ்க்கையை.',
  'தாயின் கைகள் வெண்மையான தாமரை, தளர்ந்த போதும் தாங்கும் என்னை; அலைகடல் போல் அன்பு பொழியும், அவள் ஒரு தெய்வம் என் வீட்டில் வாழும்.',
  'நெஞ்சில் தாயின் படம் வைத்திருப்பேன், நினைத்தாலே நெகிழ்ந்துவிடுவேன்; அவள் சொன்ன வார்த்தைகள் தாலாட்டு, அது இன்னும் என் காதில் ஒலிக்கும்.',
  'குழந்தையாய் இருந்தேன் தூக்கி வைத்தாள், கண்ணீரில் துடைத்து ஆறுதல் சொன்னாள்; வளர்ந்தாலும் அவள் கண்ணில் நான் குழந்தை, வாழ்க்கை முழுக்க அம்மா என் கோட்டை.',
  'ஆயிரம் சொல்லால் போற்றிடுவேன் அம்மாவை, அன்பின் கடவுளே நீ என் ஜீவனே; சொர்க்கமும் வேண்டாம் வைகுந்தமும் வேண்டாம், உன் நிழலில் வாழ்வது பேரின்பம் ஆமே.',
  'திருக்குறள் சொல்கிறது தாயின் மடியே பிள்ளைக்கு முதல் பள்ளி என்று; அந்த பள்ளி கிட்டியது எனக்கு, அன்னையே நன்றி உன் அன்புக்கு.',
  'மழை பெய்யும் போது குடை பிடித்தாள், மனம் வலிக்கும் போது மருந்தாய் நின்றாள்; இரவு தூங்காமல் காத்திருந்தாள், என் வாழ்வின் விடியல் என் அம்மா.'
];

var fullText = 'அன்பான அம்மாவிற்கு... ' + poems.join(' ... ');

/* ---------- Voice Player ---------- */
var speaking = false;

document.getElementById('voiceBtn').addEventListener('click', function () {
  if (!('speechSynthesis' in window)) {
    alert('உங்கள் browser Tamil voice-ஐ support செய்யவில்லை.');
    return;
  }

  if (speaking) {
    window.speechSynthesis.cancel();
    speaking = false;
    this.textContent = '▶';
    document.getElementById('speakDot').style.display  = 'none';
    document.getElementById('voiceFill').style.width   = '0%';
    return;
  }

  var utt = new SpeechSynthesisUtterance(fullText);
  utt.lang  = 'ta-IN';
  utt.rate  = 0.88;
  utt.pitch = 1.1;

  function applyVoice() {
    var voices   = window.speechSynthesis.getVoices();
    var taFemale = voices.find(function (v) {
      return v.lang.startsWith('ta') && v.name.toLowerCase().includes('female');
    });
    if (!taFemale) taFemale = voices.find(function (v) { return v.lang.startsWith('ta'); });
    if (!taFemale) taFemale = voices.find(function (v) {
      return v.lang.startsWith('hi') && v.name.toLowerCase().includes('female');
    });
    if (taFemale) utt.voice = taFemale;
  }

  applyVoice();

  var btn = this;
  utt.onstart = function () {
    speaking = true;
    btn.textContent = '⏹';
    document.getElementById('speakDot').style.display = 'inline-block';
    animVoiceFill();
  };
  utt.onend = utt.onerror = function () {
    speaking = false;
    btn.textContent = '▶';
    document.getElementById('speakDot').style.display = 'none';
    document.getElementById('voiceFill').style.width  = '100%';
    setTimeout(function () { document.getElementById('voiceFill').style.width = '0%'; }, 800);
  };

  window.speechSynthesis.speak(utt);
});

function animVoiceFill() {
  var start = Date.now();
  var dur   = (fullText.length / 5) * 1000 / 0.88;
  var iv = setInterval(function () {
    if (!speaking) { clearInterval(iv); return; }
    var pct = Math.min(100, (Date.now() - start) / dur * 100);
    document.getElementById('voiceFill').style.width = pct + '%';
    if (pct >= 100) clearInterval(iv);
  }, 200);
}

/* Read individual poem */
function readPoem(idx) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(poems[idx]);
  u.lang  = 'ta-IN';
  u.rate  = 0.85;
  u.pitch = 1.1;
  var voices = window.speechSynthesis.getVoices();
  var v = voices.find(function (x) { return x.lang.startsWith('ta'); })
       || voices.find(function (x) { return x.lang.startsWith('hi'); });
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

window.speechSynthesis.onvoiceschanged = function () {};

/* ============================================================
   ANIMATION SCENES
   ============================================================ */
var scenes = {
  birth:  buildBirth,
  love:   buildLove,
  fight:  buildFight,
  gossip: buildGossip,
  care:   buildCare,
  teen:   buildTeen,
  dance:  buildDance,
  temple: buildTemple,
  beach:  buildBeach
};

function showScene(name) {
  document.querySelectorAll('.anim-tab').forEach(function (t) { t.classList.remove('active'); });
  event.target.classList.add('active');
  var canvas = document.getElementById('animCanvas');
  canvas.innerHTML = '';
  scenes[name](canvas);
}

function momHTML() {
  return '<div class="char">'
    + '<div class="mom-head"></div>'
    + '<div class="mom-saree"></div>'
    + '<div class="mom-legs"><div class="mom-leg"></div><div class="mom-leg"></div></div>'
    + '<div class="char-label">அம்மா</div>'
    + '</div>';
}

function teenHTML() {
  return '<div class="char">'
    + '<div class="teen-head"></div>'
    + '<div class="teen-dress"></div>'
    + '<div class="teen-legs"><div class="teen-leg"></div><div class="teen-leg"></div></div>'
    + '<div class="char-label">மகள்</div>'
    + '</div>';
}

function babyHTML() {
  return '<div class="char">'
    + '<div class="baby-head"></div>'
    + '<div class="baby-body"></div>'
    + '<div class="baby-legs"><div class="baby-leg"></div><div class="baby-leg"></div></div>'
    + '<div class="char-label">குழந்தை</div>'
    + '</div>';
}

function label(text, color) {
  color = color || '#888';
  return '<div style="text-align:center;margin-top:12px;font-family:\'Noto Serif Tamil\',serif;font-size:13px;color:' + color + '">' + text + '</div>';
}

/* --- individual scene builders --- */
function buildBirth(c) {
  c.innerHTML = '<div class="char-scene" style="flex-direction:column;align-items:center;gap:16px">'
    + '<div style="font-size:60px;animation:babyWiggle 2s ease infinite">🍼</div>'
    + '<div style="font-family:\'Noto Serif Tamil\',serif;text-align:center;color:#c0435e;font-size:1.1rem;line-height:2">ஒரு புதிய உயிர்... அம்மாவின் கண்களில்<br>சந்தோஷ கண்ணீர் ஓடுகிறது 😭💛</div>'
    + '<div style="display:flex;gap:12px;font-size:28px;animation:floatHeart 2s ease infinite">❤️ 🌸 💛</div>'
    + '</div>';
}

function buildLove(c) {
  c.innerHTML = '<div class="char-scene" style="position:relative;width:100%">'
    + momHTML()
    + '<div style="display:flex;flex-direction:column;align-items:center;gap:4px">'
    + '<span class="heart-float" style="animation-delay:0s">❤️</span>'
    + '<span class="heart-float" style="animation-delay:.5s">💛</span>'
    + '<span class="heart-float" style="animation-delay:1s">🌸</span>'
    + '</div>'
    + teenHTML()
    + '</div>'
    + label('அன்பு மட்டுமே – எப்போதும் என்றும் 💕', '#c0435e');
  var s = document.createElement('style');
  s.textContent = '@keyframes hug{from{transform:translateX(0)}to{transform:translateX(10px)}}';
  c.appendChild(s);
  c.querySelector('.char').style.animation = 'hug 1.5s ease infinite alternate';
}

function buildFight(c) {
  c.innerHTML = '<div class="char-scene" style="position:relative;width:100%">'
    + '<div class="char" style="transform:scaleX(-1)">'
    + '<div class="mom-head" style="background:#d4956a"></div>'
    + '<div class="mom-saree" style="background:linear-gradient(180deg,#c0435e,#7a2040)"></div>'
    + '<div class="mom-legs"><div class="mom-leg"></div><div class="mom-leg"></div></div>'
    + '<div class="char-label" style="transform:scaleX(-1)">அம்மா 😤</div>'
    + '</div>'
    + '<div style="position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;font-size:22px">'
    + '<span class="fight-star" style="top:-10px;left:0">💥</span>'
    + '<span class="fight-star" style="top:10px;right:0;animation-delay:.2s">⚡</span>'
    + '<span class="fight-star" style="bottom:0;animation-delay:.4s">😡</span>'
    + '</div>'
    + teenHTML()
    + '</div>'
    + label('சண்டையிட்டாலும் 10 நிமிடத்தில் சிரிப்போம்! 😂');
}

function buildGossip(c) {
  c.innerHTML = '<div class="char-scene" style="position:relative;width:100%">'
    + '<div style="position:relative">'
    + momHTML()
    + '<div class="gossip-bubble" style="left:60px;top:0;border-radius:20px 20px 20px 4px">அது தெரியுமா? 🤫</div>'
    + '</div>'
    + '<div style="position:relative">'
    + teenHTML()
    + '<div class="gossip-bubble" style="right:60px;top:0;animation-delay:.5s">என்ன சொன்னாங்க?! 😲</div>'
    + '</div>'
    + '</div>'
    + label('அம்மாவும் மகளும் – சிறந்த கதை சொல்லும் தோழிகள்! 🗣');
}

function buildCare(c) {
  c.innerHTML = '<div class="char-scene" style="flex-direction:column;align-items:center;gap:20px">'
    + '<div style="font-size:50px;animation:babyWiggle 2s ease infinite">🤱</div>'
    + '<div style="display:flex;gap:16px;align-items:center">'
    + momHTML()
    + '<div style="display:flex;flex-direction:column;align-items:center;gap:8px">'
    + '<span style="font-size:28px;animation:floatHeart 1.5s ease infinite">💊</span>'
    + '<span style="font-size:28px;animation:floatHeart 2s ease infinite .5s">🍲</span>'
    + '<span style="font-size:28px;animation:floatHeart 1.8s ease infinite 1s">🛏</span>'
    + '</div>'
    + babyHTML()
    + '</div>'
    + label('காய்ச்சலில் இரவு முழுக்க விழித்திருந்தாள் 🌙', '#c0435e');
}

function buildTeen(c) {
  c.innerHTML = '<div style="width:100%">'
    + '<div style="display:flex;justify-content:space-around;align-items:flex-end;padding:20px">'
    + '<div style="text-align:center"><div style="font-size:32px;margin-bottom:8px">👶</div><div style="font-size:12px;color:#888;font-family:\'Noto Serif Tamil\',serif">குழந்தை</div></div>'
    + '<div style="color:#ddd;font-size:24px;align-self:center">→</div>'
    + '<div style="text-align:center"><div style="font-size:38px;margin-bottom:8px">🧒</div><div style="font-size:12px;color:#888;font-family:\'Noto Serif Tamil\',serif">சிறுமி</div></div>'
    + '<div style="color:#ddd;font-size:24px;align-self:center">→</div>'
    + '<div style="text-align:center"><div style="font-size:42px;margin-bottom:8px;animation:babyWiggle 2s ease infinite">👧</div><div style="font-size:12px;color:#888;font-family:\'Noto Serif Tamil\',serif">இளைஞி</div></div>'
    + '</div>'
    + '<div style="text-align:center;font-family:\'Noto Serif Tamil\',serif;color:#c0435e;font-size:14px;padding:10px 20px;line-height:1.8">வளர்ந்தாலும் அம்மாவின் கண்ணில் நான் என்றும் குழந்தைதான்! 💛</div>'
    + '</div>';
}

function buildDance(c) {
  c.innerHTML = '<div class="char-scene" style="flex-direction:column;align-items:center;gap:16px">'
    + '<div style="font-size:16px;letter-spacing:4px;background:linear-gradient(90deg,#c8972a,#c0435e,#c8972a);background-size:200% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer 2s linear infinite">🎊 கொண்டாட்டம்! 🎊</div>'
    + '<div style="display:flex;gap:24px;align-items:flex-end">'
    + '<div class="char" style="animation:danceBob .5s ease infinite alternate">'
    + '<div class="mom-head"></div><div class="mom-saree"></div>'
    + '<div class="mom-legs"><div class="mom-leg"></div><div class="mom-leg"></div></div>'
    + '<div class="char-label">அம்மா 💃</div></div>'
    + '<div style="font-size:32px;animation:floatHeart 1s ease infinite">🎵</div>'
    + '<div class="char" style="animation:danceBob .5s ease infinite alternate .25s">'
    + '<div class="teen-head"></div><div class="teen-dress"></div>'
    + '<div class="teen-legs"><div class="teen-leg"></div><div class="teen-leg"></div></div>'
    + '<div class="char-label">மகள் 💃</div></div>'
    + '</div>'
    + '<div style="display:flex;gap:8px;font-size:22px;animation:floatHeart 1.5s ease infinite">🎉 🌸 💫 🌺 ⭐</div>'
    + '</div>';
  var s = document.createElement('style');
  s.textContent = '@keyframes danceBob{from{transform:translateY(0)rotate(-3deg)}to{transform:translateY(-12px)rotate(3deg)}}';
  c.appendChild(s);
}

function buildTemple(c) {
  c.innerHTML = '<div class="char-scene" style="flex-direction:column;align-items:center;gap:14px">'
    + '<div style="font-size:54px">🛕</div>'
    + '<div style="display:flex;gap:20px;align-items:flex-end">'
    + momHTML() + teenHTML()
    + '</div>'
    + '<div style="display:flex;gap:8px;font-size:22px;animation:floatHeart 2s ease infinite">🙏 🌺 🙏</div>'
    + label('கோயிலில் இறைவனை வணங்கி ஆசி பெற்றோம் 🌸', '#c0435e');
}

function buildBeach(c) {
  c.innerHTML = '<div class="char-scene" style="flex-direction:column;align-items:center;gap:14px">'
    + '<div style="font-size:50px">🌊</div>'
    + '<div style="display:flex;gap:20px;align-items:flex-end">'
    + momHTML() + teenHTML()
    + '</div>'
    + '<div style="display:flex;gap:8px;font-size:22px;animation:floatHeart 2s ease infinite">🐚 ✌️ 🌊</div>'
    + label('கடல் அலைகளில் அன்பான தருணங்கள் 🌊', '#c0435e');
}

/* Init first scene */
buildBirth(document.getElementById('animCanvas'));

/* ============================================================
   TIMELINE SCROLL REVEAL
   ============================================================ */
var tlItems = document.querySelectorAll('.tl-item');
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.3 });
tlItems.forEach(function (el) { io.observe(el); });
