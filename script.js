'use strict';

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const open = navLinksEl.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksEl.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

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

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ===== ACTIVE NAV LINK ===== */
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
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

/* ===== HERO → CHAT FLOW ===== */
const heroInput = document.getElementById('heroInput');
const heroStart = document.getElementById('heroStart');

function scrollToChat() {
  const target = document.getElementById('svedomi');
  const top = target.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}

heroStart.addEventListener('click', () => {
  const text = heroInput.value.trim();
  scrollToChat();
  if (text) {
    setTimeout(() => {
      chatInputEl.value = text;
      chatInputEl.focus();
      setTimeout(sendMessage, 350);
    }, 750);
  }
});

heroInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    heroStart.click();
  }
});

/* ===== CONSCIENCE CHAT — AI LOGIKA ===== */

const conversationState = { turn: 0, lastTopic: null };

function norm(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

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
  { id: 'selhal',    keys: ['selhal', 'selhala', 'zklamal', 'zklamala', 'nepovedlo', 'nedokazal', 'nedokazala', 'chyba', 'pokazil'] },
];

function detectTopic(text) {
  const t = norm(text);
  for (const topic of topicMap) {
    if (topic.keys.some(k => t.includes(norm(k)))) return topic.id;
  }
  return null;
}

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
  selhal:    'To nesete asi hodně sami. Co se vlastně stalo — co je to selhání, o kterém mluvíte? A komu na tom nejvíc záleží — vám, nebo někomu jinému?',
};

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
    'Jsou slova z Izaiáše: Neboj se, povolal jsem tě jménem tvým, ty jsi můj. Nebyla řečena lidem bez problémů — byla řečena lidem v exilu, v rozpadlém světě. Zkusil/a jsi někdy říct ten strach Bohu přímo? Ne zbožně — jen tak, jak to je?',
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
  selhal: [
    'Selhání nás překvapí tím, jak dlouho zůstane. Ale je v tom jedna věc — kdokoli, komu záleží na tom, zda selhal nebo ne, je někdo, kdo si zakládá na tom, co dělá. To není bezvýznamné. Co přesně se stalo?',
    'V evangeliu se opakuje jeden vzor: pád, přijetí, nový začátek. Ne protože pád nevadí — ale protože přijetí je silnější než pád. Říkáte si, že to půjde napravit? Nebo máte pocit, že je pozdě?',
  ],
};

const thirdLayer = [
  'Musím být upřímný/á — jsem AI. Neumím tě rozhřešit, ani obejmout, ani být skutečně přítomný/á. Ale tohle, co jsi dnes pojmenoval/a, je víc, než si myslíš. Přemýšlíš, že bys to jednou probral/a s živým člověkem — knězem, terapeutem, nebo přítelem?',
  'Tenhle rozhovor má své hranice — a je dobré to říct rovně. Jsi ale na správné stopě. Je ve tvém životě někdo, komu bys to mohl/a svěřit? Kněz, duchovní průvodce, terapeut — někdo, kdo tě zná nebo tě chce poznat?',
  'Víš, co mě na tom, co říkáš, dojímá? Že jsi sem vůbec přišel/přišla. To není náhoda. Je to touha něco změnit. Bůh se té touze neposmívá. Co by byl tvůj první malý krok — ne velký hrdinský čin, jen jeden krok?',
  'Tady se náš rozhovor začíná dotýkat hranic toho, co AI dokáže. A to je správně — protože ty potřebuješ víc než text na obrazovce. Potřebuješ člověka. Napadá tě, kdo by to mohl být?',
];

const fallbacks = [
  'Jsem tady. Nemusíš to formulovat dokonale — řekni to tak, jak to je. Co se děje?',
  'Těžko se to pojmenovává, vím. Zkus začít od toho, co tě teď tíží nejvíc — třeba jen jednou větou.',
  'Co tě sem dnes přivedlo? Ne co bys měl/a říct — co skutečně cítíš?',
  'Jsi tady, a to něco znamená. Co neseš?',
  'Neposuzuji tě. Jsem tady. Co se děje?',
];

function getResponse(userText) {
  const topic = detectTopic(userText);
  const turn = conversationState.turn;
  conversationState.turn++;

  if (topic) conversationState.lastTopic = topic;
  const activeTopic = topic || conversationState.lastTopic;

  if (turn === 0) {
    if (activeTopic && firstLayerByTopic[activeTopic]) return firstLayerByTopic[activeTopic];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  if (turn <= 2 && activeTopic && secondLayerByTopic[activeTopic]) {
    const pool = secondLayerByTopic[activeTopic];
    return pool[(turn - 1) % pool.length];
  }

  if (turn >= 3) return thirdLayer[turn % thirdLayer.length];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

/* ===== CHAT DOM ===== */
const chatMessagesEl = document.getElementById('chatMessages');
const chatInputEl = document.getElementById('chatInput');
const chatSendEl = document.getElementById('chatSend');

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;

  if (type === 'ai') {
    const mark = document.createElement('div');
    mark.className = 'chat-mark';
    msg.appendChild(mark);
  }

  const bubble = document.createElement('span');
  bubble.className = 'chat-bubble';
  bubble.textContent = text;
  msg.appendChild(bubble);

  chatMessagesEl.appendChild(msg);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
}

function sendMessage() {
  const text = chatInputEl.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInputEl.value = '';
  chatSendEl.disabled = true;
  const delay = 900 + Math.random() * 700;
  setTimeout(() => {
    addMessage(getResponse(text), 'ai');
    chatSendEl.disabled = false;
    chatInputEl.focus();
  }, delay);
}

chatSendEl.addEventListener('click', sendMessage);
chatInputEl.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

/* ===== VOICE CARDS ===== */
const dialogCardEl = document.getElementById('dialogCard');
const chapelCardEl = document.getElementById('chapelCard');

document.querySelectorAll('.voice-card[data-dialog]').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.voice-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    chapelCardEl.style.display = 'none';
    dialogCardEl.style.display = '';
    renderDialog(parseInt(card.dataset.dialog));
  });
});

document.getElementById('silenceCard').addEventListener('click', () => {
  document.querySelectorAll('.voice-card').forEach(c => c.classList.remove('active'));
  document.getElementById('silenceCard').classList.add('active');
  dialogCardEl.style.display = 'none';
  chapelCardEl.style.display = 'block';
  setTimeout(() => chapelCardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
});

/* ===== CHAPEL ===== */
document.getElementById('chapelBtn').addEventListener('click', function () {
  const prayer = document.getElementById('chapelPrayer');
  prayer.classList.toggle('visible');
  this.textContent = prayer.classList.contains('visible') ? 'Skrýt modlitbu' : 'Zobrazit modlitbu';
});

document.getElementById('chapelBack').addEventListener('click', () => {
  chapelCardEl.style.display = 'none';
  dialogCardEl.style.display = '';
  document.querySelectorAll('.voice-card').forEach(c => c.classList.remove('active'));
});

/* ===== APOSTLES DIALOG ===== */
const dialogs = [
  {
    topic: 'Téma: Samota v době sociálních sítí',
    lines: [
      { speaker: 'Petr',   speech: '"Pane, lidé mají všechno. A přesto jsou nešťastní."' },
      { speaker: 'Tomáš',  speech: '"Možná už nevěří ničemu, protože slyšeli příliš mnoho lží."' },
      { speaker: 'Jan',    speech: '"Možná je nikdo dlouho opravdu neviděl."' },
      { speaker: 'Ježíš',  speech: '"Nehledejte nejdřív odpověď. Najděte člověka, kterého jste přestali milovat."', jesus: true }
    ]
  },
  {
    topic: 'Téma: AI jako nový bůh',
    lines: [
      { speaker: 'Tomáš',  speech: '"Pane, lidé se ptají stroje na smysl života. Je to špatně?"' },
      { speaker: 'Petr',   speech: '"Stroj jim odpovídá rychle. My jsme jim nic neříkali."' },
      { speaker: 'Jan',    speech: '"Možná je to naše selhání, ne selhání technologie."' },
      { speaker: 'Ježíš',  speech: '"Každý bůh, jehož si člověk vytvoří, odráží jeho hlad. Kdo jim ukáže, po čem skutečně hladoví?"', jesus: true }
    ]
  },
  {
    topic: 'Téma: Válka a moc',
    lines: [
      { speaker: 'Šimon',  speech: '"Pane, na světě zuří válka. Kde jsi?"' },
      { speaker: 'Jakub',  speech: '"Mocní se dělí o území. Slabí platí životem."' },
      { speaker: 'Petr',   speech: '"Proč mlčíš, když padají bomby?"' },
      { speaker: 'Ježíš',  speech: '"Já nemlčím. Mlčí ti, kteří mají moc zastavit a nevyužijí ji. Hledejte je. Pojmenujte je. A nebuďte jako oni."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Bohatství a prázdnota',
    lines: [
      { speaker: 'Jidáš',  speech: '"Svět je bohatší než kdykoliv. Proč v něm tolik chudoby?"' },
      { speaker: 'Matouš', speech: '"Protože bohatství se nerozdává. Akumuluje."' },
      { speaker: 'Jan',    speech: '"Viděl jsem lidi, kteří mají miliony — a zároveň neumí spát."' },
      { speaker: 'Ježíš',  speech: '"Žaludek může být plný a srdce prázdné. Poklady na zemi rezaví. Ale člověk, kterému jsi pomohl, na tebe nezapomene nikdy."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Mladí a ztráta víry',
    lines: [
      { speaker: 'Jan',    speech: '"Pane, mladí odcházejí. Kostely se vyprazdňují."' },
      { speaker: 'Ondřej', speech: '"Hledají smysl. Jen ho nenacházejí tam, kde jsme jim ukázali."' },
      { speaker: 'Petr',   speech: '"Možná jsme jim dávali odpovědi, než se stačili zeptat."' },
      { speaker: 'Ježíš',  speech: '"Nikdy jsem nenutil. Vždy jsem zval. Naslouchejte jejich otázkám, než otevřete svá ústa. Víra, která přichází jako odpověď na skutečnou otázku, zůstane."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Klimatická úzkost',
    lines: [
      { speaker: 'Bartoloměj', speech: '"Pane, mladí se bojí, že planeta neumře přirozenou smrtí — ale naší."' },
      { speaker: 'Tomáš',      speech: '"Já tomu nerozumím. To je věda, ne víra."' },
      { speaker: 'Jan',        speech: '"Ale strach z konce světa — to znám z evangelia."' },
      { speaker: 'Ježíš',      speech: '"Zahrada, kterou jsem svěřil člověku, nebyla jeho majetek. Byla jeho odpovědnost. Péče o zemi není politika. Je to modlitba."', jesus: true }
    ]
  },
  {
    topic: 'Téma: Krize kněží a prázdné kostely',
    lines: [
      { speaker: 'Petr',          speech: '"Pane, kněží ubývá. Kdo povede stádo?"' },
      { speaker: 'Pavel',         speech: '"Každý pokřtěný je povolán. Proč čekáme na jednoho?"' },
      { speaker: 'Maří Magdaléna', speech: '"Já první zvěstovala vzkříšení — a nebyla jsem kněz."' },
      { speaker: 'Ježíš',         speech: '"Církev není hierarchie. Je to tělo. Nezeptejte se: kde je kněz? Zeptejte se: kde jsem já — a co mohu udělat já?"', jesus: true }
    ]
  }
];

let currentDialog = 0;

function renderDialog(idx) {
  currentDialog = idx;
  const d = dialogs[idx];
  dialogCardEl.style.opacity = '0';
  dialogCardEl.style.transform = 'translateY(8px)';

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
    dialogCardEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    dialogCardEl.style.opacity = '1';
    dialogCardEl.style.transform = 'translateY(0)';
  }, 180);
}

document.getElementById('nextDialog').addEventListener('click', () => {
  chapelCardEl.style.display = 'none';
  dialogCardEl.style.display = '';
  document.querySelectorAll('.voice-card').forEach(c => c.classList.remove('active'));
  currentDialog = (currentDialog + 1) % dialogs.length;
  renderDialog(currentDialog);
});

currentDialog = Math.floor(Math.random() * dialogs.length);
renderDialog(currentDialog);
