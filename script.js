'use strict';

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ===== PARTICLES ===== */
(function spawnParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = window.innerWidth < 600 ? 18 : 36;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 2.5 + 0.8;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 16 + 10}s;
      animation-delay: ${Math.random() * -20}s;
    `;
    container.appendChild(p);
  }
})();

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== CHAPEL PRAYER ===== */
document.getElementById('chapelBtn').addEventListener('click', function () {
  const prayer = document.getElementById('chapelPrayer');
  prayer.classList.toggle('visible');
  this.textContent = prayer.classList.contains('visible') ? 'Zavřít modlitbu' : 'Ztišit se';
});

/* ===== GOSPEL DATE ===== */
const gospelDateEl = document.getElementById('gospelDate');
if (gospelDateEl) {
  gospelDateEl.textContent = new Date().toLocaleDateString('cs-CZ', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

/* ===== THOUGHTS OF THE DAY ===== */
const thoughts = [
  {
    quote: '„Máme víc spojení než kdykoli v dějinách. Proč jsme tedy tak sami?"',
    question: 'Komu dnes skutečně nasloucháš?',
    challenge: 'Dnes někomu zavolej. Ne zpráva. Hlas.'
  },
  {
    quote: '„Odpuštění není slabost. Je to jediná věc, která nás dokáže osvobodit."',
    question: 'Koho se bojíš odpustit — a proč?',
    challenge: 'Napiš jméno člověka, kterému chceš odpustit. Jen pro sebe.'
  },
  {
    quote: '„Bůh se neptá na tvou minulost. Ptá se, kde jsi teď."',
    question: 'Kde se právě nacházíš — vnitřně?',
    challenge: 'Dnes 5 minut ticha. Bez telefonu. Jen přítomnost.'
  },
  {
    quote: '„Není nebezpečí v pochybách. Nebezpečí je přestat hledat."',
    question: 'Jaká otázka v tobě dlouho hledá odpověď?',
    challenge: 'Zapiš jednu otázku, na kterou ještě nemáš odvahu hledat odpověď.'
  },
  {
    quote: '„Technologie nás může propojit. Ale láska nás musí usmířit."',
    question: 'Kde ve svém životě vidíš propojení, ale ne skutečný vztah?',
    challenge: 'Dnes sejdi z telefonu a mluv s někým tváří v tvář.'
  },
  {
    quote: '„Modlitba není přesvědčování Boha. Je to připomínání si, kdo opravdu jsi."',
    question: 'Kdy jsi naposledy byl/a zcela upřímný/á — i sám/sama se sebou?',
    challenge: 'Zkus 3 minuty mluvit s Bohem jako s přítelem. Bez liturgie.'
  },
  {
    quote: '„Svědomí není cenzor. Je to kompas."',
    question: 'Co ti tvé svědomí říká, co zatím ignoruješ?',
    challenge: 'Udělej dnes jednu věc, o které víš, že je správná, ale odkládáš ji.'
  },
  {
    quote: '„Evangelium není historická zpráva. Je to živé pozvání."',
    question: 'Co by pro tebe dnes znamenalo žít podle evangelia?',
    challenge: 'Přečti si jedno podobenství a polož si: Co to říká o mém životě dnes?'
  },
  {
    quote: '„Hřích nás od Boha neodděluje. Přesvědčení, že jsme neodpustitelní — ano."',
    question: 'V co nebo v koho nevěříš, že ti dokáže odpustit?',
    challenge: 'Řekni si nahlas: „Zasluhuji si odpuštění." Třikrát.'
  },
  {
    quote: '„Církev není budova. Je to tělo žijících lidí, kteří se navzájem nesou."',
    question: 'Koho ve svém životě neseš? A kdo nese tebe?',
    challenge: 'Dnešní den vědomě nenos sám. Zeptej se o pomoc.'
  },
  {
    quote: '„AI může simulovat empatii. Ale skutečná přítomnost nemá alternativu."',
    question: 'Kdy jsi naposledy byl/a opravdu přítomný/á — u druhého člověka?',
    challenge: 'Sejdi s komentářem. Zeptej se na skutečný příběh.'
  },
  {
    quote: '„Naděje není optimismus. Je to odhodlání věřit, i když důvody nestačí."',
    question: 'V čem dnes potřebuješ naději — ne důkaz, ale naději?',
    challenge: 'Zapiš jednu věc, ve kterou věříš, i když to zatím nedává smysl.'
  }
];

let currentThought = 0;

function renderThought(idx) {
  const t = thoughts[idx];
  const quoteEl = document.getElementById('thoughtQuote');
  const questionEl = document.getElementById('thoughtQuestion');
  const challengeEl = document.getElementById('thoughtChallenge');

  [quoteEl, questionEl, challengeEl].forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
  });

  setTimeout(() => {
    quoteEl.textContent = t.quote;
    questionEl.innerHTML = `Otázka dne: <em>${t.question}</em>`;
    challengeEl.textContent = `Výzva dne: ${t.challenge}`;
    [quoteEl, questionEl, challengeEl].forEach(el => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 200);
}

document.getElementById('nextThought').addEventListener('click', () => {
  currentThought = (currentThought + 1) % thoughts.length;
  renderThought(currentThought);
});

// Random start
currentThought = Math.floor(Math.random() * thoughts.length);
renderThought(currentThought);

/* ===== HOMILY TOGGLE ===== */
const homilyToggle = document.getElementById('homilyToggle');
const homilyFull = document.getElementById('homilyFull');

homilyToggle.addEventListener('click', () => {
  const open = homilyFull.classList.toggle('visible');
  homilyToggle.textContent = open ? 'Skrýt ↑' : 'Přečíst celou homilii ↓';
});

/* ===== TTS AUDIO PLAYER ===== */
const homilyText = `Byl jednou člověk, který měl všechno. Rychlý internet. Plnou lednici. Tisíce přátel na sociální síti. Každý den nové zážitky, nový obsah, nové podněty. A přesto — nebo možná právě proto — každý večer ležel v posteli s pocitem, že mu chybí něco zásadního, co neumí pojmenovat.

Don Bosco říkával, že hlad duše je hlubší než hlad těla. Dnešní svět umí nakrmit tělo. Ale duši? Na to nemá recept. Nebo spíš — ztratil kulinářskou knihu.

Ježíš v dnešním evangeliu mluví o chlebu. Ale nemluví o pšenici ani o pekárně. Mluví o hladu, který jídlo nenasytí. O žízni, kterou voda neuhasí. Kdo přijde ke mně, nebude hladovět. Kdo věří ve mě, nebude žíznit nikdy.

To zní jako reklama. Jenže Ježíš není influencer. Není guru. Není lifecoach. On ví, co chybí — protože on sám je tím, co chybí.

Papež František jednou řekl: Církev není celnice, která prověřuje, kdo je hoden vstoupit. Je to polní nemocnice pro raněné. Přijď takový, jaký jsi. Hladový. Unavený. Plný pochybností. To je správná adresa.

Výzva na tento týden: Jeden večer bez telefonu. Bez obsahu. Jen ticho a otázka: Co skutečně potřebuji? Ne co chci. Co potřebuji.`;

let ttsUtterance = null;
let ttsPlaying = false;

const audioBtn = document.getElementById('audioBtn');
const audioNote = audioBtn.nextElementSibling;

audioBtn.addEventListener('click', function () {
  if (!('speechSynthesis' in window)) {
    audioNote.textContent = 'Váš prohlížeč nepodporuje hlasové přehrávání.';
    return;
  }

  if (ttsPlaying) {
    window.speechSynthesis.cancel();
    ttsPlaying = false;
    audioBtn.innerHTML = '<span class="audio-icon">▶</span> Pustit jako audio';
    audioNote.textContent = 'Přehrávání zastaveno.';
    return;
  }

  window.speechSynthesis.cancel();
  ttsUtterance = new SpeechSynthesisUtterance(homilyText);
  ttsUtterance.lang = 'cs-CZ';
  ttsUtterance.rate = 0.92;
  ttsUtterance.pitch = 1;

  // Prefer Czech voice if available
  const voices = window.speechSynthesis.getVoices();
  const czVoice = voices.find(v => v.lang.startsWith('cs')) ||
                  voices.find(v => v.lang.startsWith('sk'));
  if (czVoice) ttsUtterance.voice = czVoice;

  ttsUtterance.onstart = () => {
    ttsPlaying = true;
    audioBtn.innerHTML = '<span class="audio-icon">■</span> Zastavit';
    audioNote.textContent = '🔊 Přehrávám homilii…';
  };
  ttsUtterance.onend = ttsUtterance.onerror = () => {
    ttsPlaying = false;
    audioBtn.innerHTML = '<span class="audio-icon">▶</span> Pustit jako audio';
    audioNote.textContent = 'Přehrávání dokončeno.';
  };

  // Voices may load asynchronously — retry once after load
  if (voices.length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      const v = window.speechSynthesis.getVoices();
      const cz = v.find(x => x.lang.startsWith('cs')) || v.find(x => x.lang.startsWith('sk'));
      if (cz) ttsUtterance.voice = cz;
      window.speechSynthesis.speak(ttsUtterance);
    };
  } else {
    window.speechSynthesis.speak(ttsUtterance);
  }
});

/* ===== LITURGY MODAL ===== */
const liturgyModal = document.getElementById('liturgyModal');
document.getElementById('liturgyBtn').addEventListener('click', () => {
  liturgyModal.classList.add('open');
  document.body.style.overflow = 'hidden';
});
document.getElementById('liturgyClose').addEventListener('click', closeModal);
liturgyModal.addEventListener('click', e => { if (e.target === liturgyModal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
function closeModal() {
  liturgyModal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== CONSCIENCE CHAT ===== */
const aiResponses = [
  'Zkusme začít bez strachu. Nejde o to se odsoudit. Jde o to vidět pravdu. Co je věc, kterou už dlouho neseš sám/sama?',
  'Děkuji, že jsi to řekl/a. To trvá odvahu. Jak dlouho to s tebou chodí?',
  'Slyším tě. Co si o tom říkáš sám/sama, když jsi v tichu?',
  'To zní jako opravdová tíha. Je někdo v tvém životě, kdo o tom ví?',
  'Jak by to vypadalo, kdybys to pustil/a? Jen si to představ — bez odpovědí.',
  'Víš, co tě na tom nejvíc bolí? Čin, nebo to, co si o sobě říkáš kvůli němu?',
  'Myslíš, že si zasluhuješ být vyslyšán/a? Odpověz upřímně.',
  'Co bys potřeboval/a od skutečného kněze nebo psychologa? Možná je čas udělat ten krok.',
];

let chatResponseIdx = 0;
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  const avatar = document.createElement('span');
  avatar.className = 'chat-avatar';
  avatar.textContent = type === 'ai' ? '✦' : '✎';
  const bubble = document.createElement('span');
  bubble.textContent = text;
  msg.appendChild(avatar);
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';
  chatSend.disabled = true;
  setTimeout(() => {
    const response = aiResponses[chatResponseIdx % aiResponses.length];
    chatResponseIdx++;
    addMessage(response, 'ai');
    chatSend.disabled = false;
    chatInput.focus();
  }, 900 + Math.random() * 700);
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

/* ===== APOSTLES DIALOG ===== */
const dialogs = [
  {
    topic: 'Téma: Samota v době sociálních sítí',
    lines: [
      { speaker: 'Petr', speech: '„Pane, lidé mají všechno. A přesto jsou nešťastní."' },
      { speaker: 'Tomáš', speech: '„Možná už nevěří ničemu, protože slyšeli příliš mnoho lží."' },
      { speaker: 'Jan', speech: '„Možná je nikdo dlouho opravdu neviděl."' },
      { speaker: 'Ježíš', speech: '„Nehledejte nejdřív odpověď. Najděte člověka, kterého jste přestali milovat."', jesus: true }
    ]
  },
  {
    topic: 'Téma: AI jako nový bůh',
    lines: [
      { speaker: 'Tomáš', speech: '„Pane, lidé se ptají stroje na smysl života. Je to špatně?"' },
      { speaker: 'Petr', speech: '„Stroj jim odpovídá rychle. My jsme jim nic neříkali."' },
      { speaker: 'Jan', speech: '„Možná je to naše selhání, ne selhání technologie."' },
      { speaker: 'Ježíš', speech: '„Každý bůh, jehož si člověk vytvoří, odráží jeho hlad. Kdo jim ukáže, po čem skutečně hladoví?"', jesus: true }
    ]
  },
  {
    topic: 'Téma: Válka a moc',
    lines: [
      { speaker: 'Šimon Horlivec', speech: '„Pane, na světě zuří válka. Kde jsi?"' },
      { speaker: 'Jakub', speech: '„Mocní se dělí o území. Slabí platí životem."' },
      { speaker: 'Petr', speech: '„Proč mlčíš, když padají bomby?"' },
      { speaker: 'Ježíš', speech: '„Já nemlčím. Mlčí ti, kteří mají moc zastavit a nevyužijí ji. Hledejte je. Pojmenujte je. A nebuďte jako oni."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Bohatství a prázdnota',
    lines: [
      { speaker: 'Jidáš', speech: '„Svět je bohatší než kdykoliv. Proč v něm tolik chudoby?"' },
      { speaker: 'Matouš', speech: '„Protože bohatství se nerozdává. Akumuluje."' },
      { speaker: 'Jan', speech: '„Viděl jsem lidi, kteří mají miliony — a zároveň neumí spát."' },
      { speaker: 'Ježíš', speech: '„Žaludek může být plný a srdce prázdné. Poklady na zemi rezaví. Ale člověk, kterému jsi pomohl, na tebe nezapomene nikdy."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Mladí a ztráta víry',
    lines: [
      { speaker: 'Jan', speech: '„Pane, mladí odcházejí. Kostely se vyprazdňují."' },
      { speaker: 'Ondřej', speech: '„Hledají smysl. Jen ho nenacházejí tam, kde jsme jim ukázali."' },
      { speaker: 'Petr', speech: '„Možná jsme jim dávali odpovědi, než se stačili zeptat."' },
      { speaker: 'Ježíš', speech: '„Nikdy jsem nenutil. Vždy jsem zval. Začněte jinak: naslouchejte jejich otázkám, než otevřete svá ústa. Víra, která přichází jako odpověď na skutečnou otázku, zůstane."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Klimatická úzkost',
    lines: [
      { speaker: 'Bartoloměj', speech: '„Pane, mladí se bojí, že planeta neumře přirozenou smrtí — ale naší."' },
      { speaker: 'Tomáš', speech: '„Já tomu nerozumím. To je věda, ne víra."' },
      { speaker: 'Jan', speech: '„Ale strach z konce světa — to znám z evangelia."' },
      { speaker: 'Ježíš', speech: '„Zahrada, kterou jsem svěřil člověku, nebyla jeho majetek. Byla jeho odpovědnost. Kdo nevidí stvořeného v každém stromě, nevidí mě. Péče o zemi není politika. Je to modlitba."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Krize kněží a prázdné kostely',
    lines: [
      { speaker: 'Petr', speech: '„Pane, kněží ubývá. Kdo povede stádo?"' },
      { speaker: 'Pavel', speech: '„Každý pokřtěný je povolán. Proč čekáme na jednoho?"' },
      { speaker: 'Maří Magdaléna', speech: '„Já první zvěstovala vzkříšení — a nebyla jsem kněz."' },
      { speaker: 'Ježíš', speech: '„Církev není hierarchie. Je to tělo. Když jedna část nefunguje, jiná se musí pohnout. Nezeptejte se: kde je kněz? Zeptejte se: kde jsem já — a co mohu udělat já?"', jesus: true }
    ]
  }
];

let currentDialog = 0;

function renderDialog(idx) {
  const d = dialogs[idx];
  const card = document.getElementById('dialogCard');
  card.style.opacity = '0';
  card.style.transform = 'translateY(12px)';

  setTimeout(() => {
    document.getElementById('dialogTopic').textContent = d.topic;
    const content = document.getElementById('dialogContent');
    content.innerHTML = '';
    d.lines.forEach(line => {
      const lineEl = document.createElement('div');
      lineEl.className = `dialog-line${line.jesus ? ' jesus' : ''}`;
      lineEl.innerHTML = `
        <span class="speaker${line.jesus ? ' gold' : ''}">${line.speaker}</span>
        <span class="speech${line.jesus ? ' gold-text' : ''}">${line.speech}</span>
      `;
      content.appendChild(lineEl);
    });
    card.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, 200);
}

document.getElementById('nextDialog').addEventListener('click', () => {
  currentDialog = (currentDialog + 1) % dialogs.length;
  renderDialog(currentDialog);
  document.getElementById('nextDialog').textContent =
    `Další dialog (${currentDialog + 1}/${dialogs.length}) →`;
});

// Random start for dialog
currentDialog = Math.floor(Math.random() * dialogs.length);
renderDialog(currentDialog);
document.getElementById('nextDialog').textContent =
  `Zobrazit další dialog →`;

/* ===== SMOOTH SCROLL for anchor links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== ACTIVE NAV LINK on scroll ===== */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.3 });

sections.forEach(s => sectionObserver.observe(s));
