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

const conversationState = { turn: 0, lastTopic: null };

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// ── DETEKCE TÉMATU ──────────────────────────────────────────────
const topicMap = [
  { id: 'lez',       keys: ['lhal', 'lhala', 'lez', 'podvod', 'podvedl', 'podvedla', 'klam', 'zatajil', 'zatajila', 'nepravda'] },
  { id: 'hnev',      keys: ['zlost', 'vztek', 'hnev', 'krici', 'uderil', 'uderila', 'zranil', 'zranila', 'agrese', 'napadl'] },
  { id: 'pycha',     keys: ['pycha', 'pysny', 'pysna', 'namysleny', 'arogan', 'nadrazen', 'lepsi nez', 'pohlizim'] },
  { id: 'zavist',    keys: ['zavist', 'zavidim', 'zavidet', 'zarlimost', 'zarli', 'proc on', 'proc ona', 'ma vic'] },
  { id: 'odpusteni', keys: ['odpustit', 'neodpustim', 'neodpoustim', 'zradil', 'zradila', 'ubliži', 'ukrivdil', 'odpusteni', 'brigna', 'krivda'] },
  { id: 'samota',    keys: ['samota', 'sam ', 'sama ', 'osamel', 'nikdo mi', 'nezalezi jim', 'nerozumi mi', 'ztracen', 'izolovan'] },
  { id: 'strach',    keys: ['strach', 'bojim', 'uzkost', 'panika', 'nevim co bude', 'budoucnost', 'nevim jak dal', 'nevim co delat'] },
  { id: 'hrich',     keys: ['hrich', 'hresim', 'hresil', 'hresila', 'spatne jsem', 'udelal jsem', 'udelala jsem', 'spatny clovek', 'spatna'] },
  { id: 'smysl',     keys: ['smysl', 'proc ziji', 'nema cenu', 'k nicemu', 'prazdnota', 'nic necitim', 'vyhoren', 'unaveny', 'unavena', 'ztratil jsem', 'ztratila jsem', 'deprese'] },
  { id: 'vztah',     keys: ['manzel', 'manzelka', 'partner', 'partnerka', 'rozchod', 'rozvod', 'nevera', 'vztah', 'laska skonc', 'odsel', 'odesla'] },
  { id: 'zavislost', keys: ['alkohol', 'drogy', 'porno', 'gambl', 'hazard', 'nemohu prestat', 'nemohu se ovladat', 'zavislost', 'navyk'] },
  { id: 'vira',      keys: ['neveri', 'pochybuji', 'pochybnosti', 'buh neexist', 'kde je buh', 'ztratil jsem viru', 'ztratila jsem viru', 'prestal jsem verit'] },
];

function detectTopic(text) {
  const t = norm(text);
  for (const topic of topicMap) {
    if (topic.keys.some(k => t.includes(norm(k)))) return topic.id;
  }
  return null;
}

// ── PRVNÍ VRSTVA: čisté naslouchání, žádná moudrost, žádné citáty ──
const firstLayerByTopic = {
  lez:       'To chce odvahu — říct to takhle rovnou. A já to slyším. Kdy to vlastně začalo? Byl to jeden konkrétní moment, nebo se to nějak vrstvilo postupně?',
  hnev:      'Slyším tě. Hněv bývá jedna z nejosamělejších věcí — uvnitř hoříš a okolí většinou netuší. Stalo se něco konkrétního, nebo to bylo dlouho pod povrchem?',
  pycha:     'To, že to vůbec vidíš na sobě — to není málo. Pýcha se pojmenovává těžko. V čem konkrétně to cítíš? Kdy sis toho naposledy všiml/a?',
  zavist:    'To bolí, viď. Vidět u druhého něco, co chceš, a pak ten ošklivý pocit v sobě. Čeho se to vlastně týká — věcí, vztahů, uznání? Co ti ten člověk připomíná, že chybí?',
  odpusteni: 'Odpuštění je asi jedna z nejtvrdších věcí, co existují. Ne proto, že jsme špatní — ale proto, že ta bolest je reálná. Co se ti stalo? Řekni mi víc, pokud chceš.',
  samota:    'To je opravdová bolest. Samota uprostřed lidí je jiná než být sám v tichu — ta první bývá mnohem hlubší. Jak dlouho to trvá?',
  strach:    'Rozumím. Strach dokáže být zároveň tichý i hlasitý — a hrozně vyčerpávající. Z čeho konkrétně? Co se ti honí hlavou, když se zastavíš?',
  hrich:     'Jsem rád/a, že jsi to řekl/a. Tady není žádný soud. Že to neseš, znamená, že ti záleží — a to je důležité. Co se stalo?',
  smysl:     'To je těžké. Taková prázdnota nebo pocit, že to nemá cenu — to není slabost, to je signál. Kdy naposledy jsi věděl/a, že tvůj den má smysl? Co se tehdy dělo?',
  vztah:     'Vztahy jsou místo, kde jsme nejvíc živí — a zároveň nejvíc zranitelní. Co se děje? Chceš mi říct víc?',
  zavislost: 'Díky, že to říkáš. Tohle se říká těžko. Závislost není selhání charakteru — je to past. Jak dlouho s tím zápasíš?',
  vira:      'Pochybovat není selhat. Je to poctivé. Co se stalo s tou vírou? Kdy jsi začal/a cítit, že mizí?',
};

// ── DRUHÁ VRSTVA: moudrost vetkána přirozeně do řeči, bez oznamování zdrojů ──
const secondLayerByTopic = {
  lez: [
    'Víš, co mi na lži přijde zajímavé? Bývá to pokus o klid — jenže ten klid nepřijde, protože uvnitř to víme. Říká se, že pravda není zákon, je to setkání. Kdybys mohl/a říct pravdu bez trestu — co by to bylo?',
    'A co tě k tomu vedlo? Strach z reakce? Snaha ochránit sebe nebo druhého? Protože to je jiné — jedno volání o pomoc, druhé akt péče. Je důležité vědět, čeho to bylo.',
  ],
  hnev: [
    'Za každým hlubokým hněvem bývá buď strach, nebo bolest. Hněv sám o sobě není špatný — je to signál. Co je u tebe pod tím? Co ti ten člověk nebo ta situace vlastně vzali?',
    'Ovládat se nestačí — je třeba pochopit. Dokud nevíme, co nás rozpaluje, tak to přijde znovu a znovu. Bezpečí? Důstojnost? Pocit, že nejsi slyšen/a? Co to bylo?',
  ],
  pycha: [
    'Je tam jedna věc, co mi na pýše přijde zajímavá — bývá křehká. Chováme se povýšeně nejvíc v oblastech, kde se vnitřně cítíme nejistí. Kde tě to v životě trápí nejvíc?',
    'Kdo tě v životě zná i tam, kde nejsi nejlepší? Kdo vidí i tu stínovou stránku — a zůstane? Pýcha bývá pokus pochopit se bez toho vztahu. Máš takového člověka?',
  ],
  zavist: [
    'Pod závistí bývá oprávněný hlad — po uznání, lásce, úspěchu. Závist sama o sobě říká: tohle mi chybí. To není odsouzení, to je informace. Co konkrétně ti chybí?',
    'Každý z nás má jinou cestu a jinou rychlost. Snadno srovnáváme svůj vnitřní zmatek s vnější fasádou druhých — a to je přirovnání, které vždy prohrajeme. Co je hodnotné na tvé vlastní cestě, i když to teď nevidíš?',
  ],
  odpusteni: [
    'Odpustit neznamená říct, že nezáleželo na tom, co se stalo. Znamená to rozhodnout se nenechat to řídit svůj život dál. Kolik energie ti to teď bere? Jak dlouho to s sebou neseš?',
    'Je v evangeliu jeden příběh — otec vidí syna zdaleka a běží mu naproti. Nečeká na omluvu. To je obraz, jak Bůh funguje — ne soudce s čekacím listem, ale někdo, kdo sleduje horizont. Kde jsi ty v tom příběhu?',
  ],
  samota: [
    'Říká se, že největší nemocí dnešní doby není nemoc těla — je to pocit, že o nás nikomu nezáleží. Tenhle pocit je reálný. A zároveň — i ten pocit může být začátek otevření. Je někdo, komu bys dnes mohl/a zavolat?',
    'I v hluboké samotě platí jedno — Bůh neodchází, i když ho necítíme. Ale samota je zároveň zpráva: potřebuješ společenství. Co ti brání udělat první krok k někomu blízkému?',
  ],
  strach: [
    'Jsou slova z Izaiáše: „Neboj se, povolal jsem tě jménem tvým, ty jsi můj." Nebyla řečena lidem bez problémů — byla řečena lidem v exilu, v rozpadlém světě. Zkusil/a jsi někdy říct ten strach Bohu přímo? Ne zbožně — jen tak, jak to je?',
    'Víra někdy není pocit. Je to rozhodnutí. Udělat jeden krok, i když nevíme, co bude dál. Jaký by byl pro tebe ten jeden krok dnes — malý, ale reálný?',
  ],
  hrich: [
    'Bůh je ochotnější odpustit, než my jsme ochotni prosit. Největší překážka odpuštění nejsme naše skutky — je to přesvědčení, že nejsme hodni. Cítíš se hoden/hodna toho, aby ti bylo odpuštěno?',
    'Ježíš neříkal: přijdu ke spravedlivým. Říkal: přišel jsem k těm, kdo vědí, že selžou. Není to výtka — je to pozvání. Kde se teď nacházíš ty? Jak blízko nebo daleko od toho pozvání?',
  ],
  smysl: [
    'Přežít cokoliv jde, pokud víme proč. To řekl člověk, který prošel koncentrákem a vyšel z toho s myšlenkami, co platí dodnes. Co bylo tvoje proč — dřív? A kdy to začalo ztrácet sílu?',
    'Je jedna otázka, která mi přijde důležitá: co tě pohybuje? Ne co tě nutí — co tě pohybuje zevnitř, dobrovolně. Co tě osvobozuje a co tě svírá. Když to poznáš, je tam stopa ke smyslu.',
  ],
  vztah: [
    'Pravá láska není stav, je to pohyb — volba, která se každý den obnovuje. Kde cítíš, že se ten pohyb zastavil? Co chybí — přítomnost, bezpečí, respekt, nebo jen prosté: být viděn/a?',
    'Bible neidealizuje vztahy. Zná jejich krásu i bolest. Co ve tvém vztahu nebo v té ztrátě tě bolí úplně nejvíc? Pojmenuj to — třeba jen pro sebe.',
  ],
  zavislost: [
    'Naše srdce je neklidné, dokud nenajde pokoj. Závislost je hodně o tom — snaha uklidnit to neklidné rychle, spolehlivě, bez čekání. Co cítíš těsně předtím, než po té věci sáhneš? Co tě k tomu spouští?',
    'Závislost není morální výpadek — je to nemoc. A stejně jako každá nemoc, potřebuje pomoc zvenku. Sám se z toho silou vůle nevypleteš — to potvrdí každý, kdo to zažil. Víš, kde takovou pomoc hledat?',
  ],
  vira: [
    'Tomáš říká Ježíšovi: dokud neuvidím, neuvěřím. A Ježíš přijde a ukáže — bez výčitky, bez řeči. Pochybovat není hřích. Je to poctivost. Co konkrétně tě přivedlo k pochybnostem — byl to zážitek, nebo postupné vyčerpání?',
    'Víra se neobnoví argumenty. Obnovuje se setkáním — s lidmi, s tichem, s příběhem. Je ve tvém životě ještě někdo nebo něco, co tě k víře táhne — i slabě, i nejistě?',
  ],
};

// ── TŘETÍ VRSTVA: závěr, pozvání k živému člověku ──────────────
const thirdLayer = [
  'Musím být upřímný/á — jsem AI. Neumím tě rozhřešit, ani obejmout, ani být skutečně přítomný/á. Ale tohle, co jsi dnes pojmenoval/a, je víc, než si myslíš. Přemýšlíš, že bys to jednou probral/a s živým člověkem — knězem, terapeutem, nebo přítelem?',
  'Tenhle rozhovor má své hranice — a je dobré to říct rovně. Jsi ale na správné stopě. Je ve tvém životě někdo, komu bys to mohl/a svěřit? Kněz, duchovní průvodce, terapeut — někdo, kdo tě zná nebo tě chce poznat?',
  'Víš, co mě na tom, co říkáš, dojímá? Že jsi sem vůbec přišel/přišla. To není náhoda. Je to touha něco změnit. Bůh se té touze neposmívá. Co by byl tvůj první malý krok — ne velký hrdinský čin, jen jeden krok?',
  'Tady se náš rozhovor začíná dotýkat hranic toho, co AI dokáže. A to je správně — protože ty potřebuješ víc než text na obrazovce. Potřebuješ člověka. Napadá tě, kdo by to mohl být?',
];

// ── FALLBACKY: přirozené otevírání rozhovoru ───────────────────
const fallbacks = [
  'Jsem tady. Nemusíš to formulovat dokonale — řekni to tak, jak to je. Co se děje?',
  'Těžko se to pojmenovává, vím. Zkus začít od toho, co tě teď tíží nejvíc — třeba jen jednou větou.',
  'Co tě sem dnes přivedlo? Ne co bys měl/a říct — co skutečně cítíš?',
  'Jsi tady, a to něco znamená. Co neseš?',
  'Neposuzuji tě. Jsem tady. Co se děje?',
];

// ── HLAVNÍ LOGIKA ODPOVĚDI ───────────────────────────────────────
function getResponse(userText) {
  const topic = detectTopic(userText);
  const turn = conversationState.turn;
  conversationState.turn++;

  // Ulož téma, pokud nové
  if (topic) conversationState.lastTopic = topic;
  const activeTopic = topic || conversationState.lastTopic;

  // 1. zpráva — empatické přijetí, žádné citáty
  if (turn === 0) {
    if (activeTopic && firstLayerByTopic[activeTopic]) {
      return firstLayerByTopic[activeTopic];
    }
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // 2.–3. zpráva — prohloubení s moudrostí
  if (turn <= 2 && activeTopic && secondLayerByTopic[activeTopic]) {
    const pool = secondLayerByTopic[activeTopic];
    const idx = (turn - 1) % pool.length;
    return pool[idx];
  }

  // 4.+ zpráva — završení, pozvání k živému člověku
  if (turn >= 3) {
    return thirdLayer[turn % thirdLayer.length];
  }

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

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
  const delay = 1000 + Math.random() * 800;
  setTimeout(() => {
    addMessage(getResponse(text), 'ai');
    chatSend.disabled = false;
    chatInput.focus();
  }, delay);
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
