// LinguaMaster — Akıllı Seviye Tespit Sınavı (Placement Test), Sesli Hikayeler (Graded Readers) ve Başarım Rozetleri
import { icon } from './icons.js';

// 1. AKILLI SEVİYE TESPİT SINAVI SORULARI (A1 -> C2 Kademeli 10 Soru)
export const PLACEMENT_QUESTIONS = [
  {
    level: 'A1',
    q: '1. "_____ name is Sarah and _____ is an architect." boşluklarına sırasıyla hangisi gelmelidir?',
    options: ['Her / she', 'She / her', 'Hers / she', 'His / her'],
    answer: 0,
    explanation: '"Name" bir isim olduğu için önüne İyelik Sıfatı (Her), ikinci cümlede özne koltuğuna Şahıs Zamiri (she) gelir.'
  },
  {
    level: 'A1',
    q: '2. "Where _____ your brother work?" sorusunda boşluğa hangisi gelir?',
    options: ['is', 'do', 'does', 'are'],
    answer: 2,
    explanation: 'Geniş zamanda (Simple Present) "your brother" (He) tekil özne olduğu için ve fiil (work) bulunduğu için "does" kullanılır.'
  },
  {
    level: 'A2',
    q: '3. "While I _____ dinner last night, the phone suddenly _____."',
    options: ['cooked / was ringing', 'was cooking / rang', 'cook / rings', 'have cooked / rang'],
    answer: 1,
    explanation: 'Geçmişte devam eden uzun eylem Past Continuous (was cooking), onu bölen anlık olay Simple Past (rang) ile anlatılır.'
  },
  {
    level: 'A2',
    q: '4. "This laptop is much _____ than my old one, but it isn\'t the _____ in the store."',
    options: ['fast / fastest', 'faster / most fast', 'faster / fastest', 'more fast / fastest'],
    answer: 2,
    explanation: 'Tek heceli sıfatlarda karşılaştırma "-er" (faster), en üstünlük "the -est" (the fastest) ile yapılır.'
  },
  {
    level: 'B1',
    q: '5. "I _____ my keys! I can\'t open the door right now." (Etkisi şu an devam eden olay)',
    options: ['lost', 'have lost', 'was losing', 'had lost'],
    answer: 1,
    explanation: 'Geçmişte gerçekleşip sonucu şu anı doğrudan etkileyen (kapıyı şu an açamıyorum) durumlarda Present Perfect (have lost) kullanılır.'
  },
  {
    level: 'B1',
    q: '6. "If I _____ more free time tomorrow, I _____ help you with the project."',
    options: ['have / will', 'will have / will', 'had / wouldhave', 'have / would'],
    answer: 0,
    explanation: 'Type 1 (gerçekleşmesi muhtemel gelecek koşulu): If cümlesinde Geniş Zaman (have), ana cümlede "will" kullanılır.'
  },
  {
    level: 'B2',
    q: '7. "If I _____ harder at university, I _____ a different career today." (Geçmiş koşul -> Şu anki sonuç)',
    options: ['studied / would have', 'had studied / would have', 'had studied / would have had', 'studied / will have'],
    answer: 1,
    explanation: 'Mixed Conditional: Geçmişteki pişmanlığın (If + Past Perfect: had studied) bugünkü sonucunu (would + V1: would have) anlatır.'
  },
  {
    level: 'B2',
    q: '8. "The manager had the quarterly report _____ before the board meeting."',
    options: ['prepare', 'to prepare', 'prepared', 'preparing'],
    answer: 2,
    explanation: 'Causative (Ettirgen yapı): "Have something done (V3)" kalıbında nesneden sonra fiilin 3. hali (prepared) gelir.'
  },
  {
    level: 'C1',
    q: '9. "Rarely _____ such a well-structured presentation in my entire career."',
    options: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
    answer: 1,
    explanation: 'C1 Inversion (Devrik Yapı): "Rarely, Seldom, Never" cümle başına geldiğinde soru dizilimi (have I seen) kullanılır.'
  },
  {
    level: 'C2',
    q: '10. "It is vital that every applicant _____ the confidentiality agreement before the interview."',
    options: ['signs', 'sign', 'signed', 'will sign'],
    answer: 1,
    explanation: 'Subjunctive Mood (Dilek-Şart Kipi): "It is vital/essential that..." yapılarından sonra tüm öznelerle fiilin yalın hali (sign) kullanılır.'
  }
];

// 2. ÇİFT DİLLİ SESLİ HİKAYELER (GRADED READERS — A1 -> C1)
export const GRADED_STORIES = [
  {
    id: 'story-a1-coffee',
    level: 'A1',
    title: 'First Morning in London (Londra\'da İlk Sabah)',
    duration: '2 dk okuma',
    topic: 'Günlük Hayat & Tanışma • To Be & Simple Present',
    summary: 'Emre\'nin Londra\'daki ilk gününde bir kafede sipariş vermesi ve baristayla tanışması.',
    lines: [
      {
        en: 'Good morning! It is a sunny Monday in London.',
        trRead: 'Gud morning! İt iz e sani Mandey in Landın.',
        tr: 'Günaydın! Londra\'da güneşli bir Pazartesi günü.',
        note: 'Günlerden önce "on", şehirlerden önce "in" edatı kullanılır.'
      },
      {
        en: 'My name is Emre, and I am a software engineer from Istanbul.',
        trRead: 'May neym iz Emre, end Ay em e softveyr enciniır from İstanbul.',
        tr: 'Benim adım Emre ve İstanbul\'dan bir yazılım mühendisiyim.',
        note: 'Mesleklerden önce mutlaka "a / an" (an engineer / a software engineer) gelir.'
      },
      {
        en: 'I walk into a small cafe near the station.',
        trRead: 'Ay volk intu e smol kafe niır dı steyşın.',
        tr: 'İstasyonun yanındaki küçük bir kafeye giriyorum.',
        note: '"Walk" kelimesindeki L harfi okunmaz [volk].'
      },
      {
        en: 'Can I have a hot filter coffee without sugar, please?',
        trRead: 'Ken Ay hev e hat filtır kofi vidaut şugır, pliz?',
        tr: 'Şekersiz sıcak bir filtre kahve alabilir miyim lütfen?',
        note: 'Sipariş verirken en doğal kalıp: "Can I have ..., please?"'
      },
      {
        en: 'The barista smiles and says, "Sure! Here you are."',
        trRead: 'Dı barista smayls end seyz, "Şuur! Hiır yu ar."',
        tr: 'Barista gülümser ve "Tabii! Buyurun." der.',
        note: 'Üçüncü tekil şahısta (The barista = He/She) fiiller -s takısı alır (smiles, says).'
      }
    ],
    vocab: [
      { word: 'Sunny', read: 'sani', meaning: 'Güneşli' },
      { word: 'Near', read: 'niır', meaning: 'Yakınında / yanında' },
      { word: 'Without', read: 'vidaut', meaning: '-sız / olmadan' },
      { word: 'Here you are', read: 'hiır yu ar', meaning: 'Buyurun (bir şey uzatırken)' }
    ],
    quiz: [
      {
        q: 'Emre kahvesini nasıl sipariş ediyor?',
        options: ['Sütlü ve şekerli', 'Şekersiz sıcak filtre kahve', 'Soğuk buzlu kahve'],
        answer: 1
      },
      {
        q: '"I am ___ engineer" cümlesinde meslekten önce neden belgisiz artikel kullanılır?',
        options: ['İngilizcede tekil meslek isimlerinden önce a/an zorunludur', 'Sadece çoğul cümlelerde kullanılır', 'İsteğe bağlıdır'],
        answer: 0
      }
    ]
  },
  {
    id: 'story-a2-airport',
    level: 'A2',
    title: 'The Missing Suitcase (Kayıp Bavul Macerası)',
    duration: '3 dk okuma',
    topic: 'Seyahat & Geçmiş Zaman • Simple Past & Past Continuous',
    summary: 'Selin\'in Amsterdam uçuşu sonrası bagaj bandında bavulunu bulamaması ve görevliyle diyaloğu.',
    lines: [
      {
        en: 'Last Friday, I flew to Amsterdam for an international conference.',
        trRead: 'Last Fraydey, Ay fluu tu Amsterdam for en intırneşınıl kanfırıns.',
        tr: 'Geçen Cuma uluslararası bir konferans için Amsterdam\'a uçtum.',
        note: '"Fly" (uçmak) düzensiz fiilinin geçmiş hali (V2) "flew" [fluu] şeklindedir.'
      },
      {
        en: 'While everyone was taking their bags, I waited patiently by the belt.',
        trRead: 'Vayl evrivan voz teyking deir begs, Ay veytid peyşıntli bay dı belt.',
        tr: 'Herkes çantalarını alırken ben bantın kenarında sabırla bekledim.',
        note: '"Patiently" (-ly eki) zarftır ve eylemin nasıl yapıldığını (sabırla) anlatır.'
      },
      {
        en: 'Unfortunately, my blue suitcase did not arrive on that flight.',
        trRead: 'Anforçınıtli, may blu sutkeys did nat erayv on det flayt.',
        tr: 'Maalesef mavi bavulum o uçuşla gelmedi.',
        note: 'Olumsuz geçmiş zamanda "did not (didn\'t)" sonrasında fiil yalın (arrive) kalır.'
      },
      {
        en: 'I immediately went to the Lost Property desk and filled out a form.',
        trRead: 'Ay imidiıtli vent tu dı Lost Propırti desk end fild aut e form.',
        tr: 'Hemen Kayıp Eşya bankosuna gittim ve bir form doldurdum.',
        note: '"Fill out" = bir formu eksiksiz doldurmak (Phrasal Verb).'
      },
      {
        en: 'The airline delivered my suitcase to my hotel the next morning!',
        trRead: 'Dı eyrlayn dilivırd may sutkeys tu may hotel dı nekst morning!',
        tr: 'Havayolu şirketi ertesi sabah bavulumu otelime teslim etti!',
        note: '"Deliver" = teslim etmek / ulaştırmak.'
      }
    ],
    vocab: [
      { word: 'Suitcase', read: 'sutkeys', meaning: 'Bavul / Valiz' },
      { word: 'Patiently', read: 'peyşıntli', meaning: 'Sabırla' },
      { word: 'Fill out', read: 'fil aut', meaning: 'Form doldurmak' },
      { word: 'Deliver', read: 'dilivır', meaning: 'Teslim etmek' }
    ],
    quiz: [
      {
        q: '"My blue suitcase did not _____." boşluğuna hangi fiil formu gelir?',
        options: ['arrived (V2)', 'arrive (V1 yalın)', 'arriving (V-ing)'],
        answer: 1
      },
      {
        q: 'Havayolu şirketi bavulu nereye teslim etti?',
        options: ['Havalimanı kapısına', 'Ertesi sabah oteline', 'Bir hafta sonra evine'],
        answer: 1
      }
    ]
  },
  {
    id: 'story-b1-remote',
    level: 'B1',
    title: 'Working From Anywhere (Her Yerden Çalışmak)',
    duration: '3 dk okuma',
    topic: 'Modern İş Hayatı • Present Perfect & Relative Clauses',
    summary: 'Son üç yıldır uzaktan çalışan bir tasarımcının iş-yaşam dengesi deneyimleri.',
    lines: [
      {
        en: 'I have worked as a remote product designer since 2023.',
        trRead: 'Ay hev vörkt ez e rimout prodakt dizaynır sins tu tauzınd tventi-tri.',
        tr: '2023 yılından beri uzaktan ürün tasarımcısı olarak çalışıyorum.',
        note: 'Geçmişte başlayıp hala devam eden süreçlerde Present Perfect + "since" (başlangıç noktası) kullanılır.'
      },
      {
        en: 'Companies that offer flexible hours attract talented professionals.',
        trRead: 'Kampıniz det ofır fleksıbıl auırs etrekt telıntıd profeşınıls.',
        tr: 'Esnek saatler sunan şirketler yetenekli profesyonelleri cezbeder.',
        note: '"That offer flexible hours" bir Relative Clause (İlgi Cümleciği) olup "Companies" ismini niteler.'
      },
      {
        en: 'Although working from home saves time, it requires strong self-discipline.',
        trRead: 'Oldou vörking from houm seyvs taym, it rikvayırs strong self-disiplin.',
        tr: 'Evden çalışmak zaman kazandırsa da güçlü bir öz disiplin gerektirir.',
        note: '"Although" (-e rağmen) zıtlık bağlacıdır ve arkasından tam cümle alır.'
      },
      {
        en: 'To stay productive, I always turn off notifications while I am designing.',
        trRead: 'Tu stey prodaktiv, Ay olveyz törn of notifikeşınz vayl Ay em dizayning.',
        tr: 'Verimli kalmak için tasarım yaparken bildirimleri her zaman kapatırım.',
        note: '"Turn off" = kapatmak (cihaz, ışık veya bildirim).'
      }
    ],
    vocab: [
      { word: 'Remote', read: 'rimout', meaning: 'Uzaktan' },
      { word: 'Flexible', read: 'fleksıbıl', meaning: 'Esnek' },
      { word: 'Require', read: 'rikvayır', meaning: 'Gerektirmek' },
      { word: 'Productive', read: 'prodaktiv', meaning: 'Verimli / Üretken' }
    ],
    quiz: [
      {
        q: '"Since 2023" ifadesi hangi zaman yapısıyla birlikte kullanılmıştır?',
        options: ['Simple Past (worked)', 'Present Perfect (have worked)', 'Future (will work)'],
        answer: 1
      },
      {
        q: 'Yazar verimli kalmak için tasarım yaparken ne yapıyor?',
        options: ['Bildirimleri kapatıyor (turn off notifications)', 'Müzik açıyor', 'Toplantıya giriyor'],
        answer: 0
      }
    ]
  },
  {
    id: 'story-c1-ai',
    level: 'C1',
    title: 'The Art of Clear Communication (Etkili İletişim Sanatı)',
    duration: '4 dk okuma',
    topic: 'Akademik & İleri Düzey • Inversion & Cleft Sentences',
    summary: 'Küresel ekiplerde sadece kelime bilmenin değil, kültürel nüansları ve vurguyu anlamanın önemi.',
    lines: [
      {
        en: 'Not only does language shape our thoughts, but it also builds trust across cultures.',
        trRead: 'Nat onli daz lengvic şeyp auır tots, bat it olso bildz trast ekros kalçırs.',
        tr: 'Dil yalnızca düşüncelerimizi şekillendirmekle kalmaz, aynı zamanda kültürler arası güven inşa eder.',
        note: 'C1 Inversion: "Not only" cümle başına geldiğinde "does language shape" şeklinde devrik yapı kurulur.'
      },
      {
        en: 'What truly distinguishes a fluent speaker is the ability to express nuance effortlessly.',
        trRead: 'Vat truli distingvişız e fluınt spikır iz dı ebiliti tu ekspres nüans efırtlısli.',
        tr: 'Akıcı bir konuşmacıyı gerçekten ayıran şey, ince anlam farklarını zahmetsizce ifade edebilme yeteneğidir.',
        note: 'Wh- Cleft Sentence: "What truly distinguishes ... is ..." yapısı cümleye güçlü bir vurgu katar.'
      },
      {
        en: 'Had we invested in communication training earlier, we would have avoided many misunderstandings.',
        trRead: 'Hed vi investid in komünikeyşın treyning örliır, vi vuld hev evoydid meni misandırstendings.',
        tr: 'İletişim eğitimine daha erken yatırım yapmış olsaydık, pek çok yanlış anlaşılmayı önlemiş olurduk.',
        note: '"If we had invested" yerine "If" atılarak "Had we invested..." şeklinde C1 koşul devrik yapısı kurulmuştur.'
      }
    ],
    vocab: [
      { word: 'Distinguish', read: 'distingviş', meaning: 'Ayırt etmek / Farklı kılmak' },
      { word: 'Effortlessly', read: 'efırtlısli', meaning: 'Zahmetsizce / Akıcı şekilde' },
      { word: 'Avoid', read: 'evoyd', meaning: 'Kaçınmak / Önlemek' },
      { word: 'Misunderstanding', read: 'misandırstending', meaning: 'Yanlış anlaşılma' }
    ],
    quiz: [
      {
        q: '"Not only _____ language shape our thoughts..." cümlesinde neden "does" özneden önce gelmiştir?',
        options: ['Soru cümlesi olduğu için', 'Olumsuz/kısıtlayıcı zarf cümle başına geldiğinde Inversion (devrik yapı) yapıldığı için', 'Geçmiş zaman olduğu için'],
        answer: 1
      },
      {
        q: '"Had we invested..." ifadesinin açılımı nedir?',
        options: ['If we had invested (Type 3 Koşul)', 'When we invest', 'Because we invested'],
        answer: 0
      }
    ]
  }
];

// 3. BAŞARIM & ROZETLER SİSTEMİ (ACHIEVEMENTS)
export function getAchievementsList(progress) {
  const p = progress || {};
  return [
    {
      id: 'first-step',
      icon: '🌱',
      title: 'İlk Adım',
      desc: 'İlk dersini veya pratiğini tamamladın',
      unlocked: (p.xp || 0) >= 15
    },
    {
      id: 'alpha-pro',
      icon: '🔤',
      title: 'Alfabe & Ses Ustası',
      desc: 'En az 10 harfin okunuşunu tamamladın',
      unlocked: (p.masteredLetters || []).length >= 10
    },
    {
      id: 'table-hunter',
      icon: '📊',
      title: 'Zamir & Tablo Uzmanı',
      desc: 'En az 5 gramer/zamir tablosunu bitirdin',
      unlocked: (p.masteredTables || []).length >= 5
    },
    {
      id: 'placement-done',
      icon: '🎯',
      title: 'Seviye Belirlendi',
      desc: 'Akıllı Seviye Tespit Sınavını tamamladın',
      unlocked: Boolean(p.detectedLevel)
    },
    {
      id: 'story-reader',
      icon: '📖',
      title: 'Hikaye Okuru',
      desc: 'İlk İngilizce sesli hikayeni bitirdin',
      unlocked: (p.completedStories || []).length >= 1
    },
    {
      id: 'xp-500',
      icon: '👑',
      title: '500 XP Kulübü',
      desc: 'Toplam 500 XP puana ulaştın',
      unlocked: (p.xp || 0) >= 500
    }
  ];
}

// 4. AKILLI SEVİYE TESPİT SINAVI MODAL RENDERER
export function renderPlacementModal(placementState) {
  if (!placementState || !placementState.active) return '';

  const { idx, answers, finished } = placementState;
  const total = PLACEMENT_QUESTIONS.length;

  if (finished) {
    let correctCount = 0;
    PLACEMENT_QUESTIONS.forEach((q, i) => {
      if (answers[i] === q.answer) correctCount++;
    });

    let detected = 'A1';
    let desc = 'Sıfırdan sağlam bir temel atmak için A1 Başlangıç seviyesi ve 26 Harf Fonetik Stüdyosu senin için en ideal başlangıç!';
    if (correctCount >= 9) {
      detected = 'C1';
      desc = 'Tebrikler! Gramer ve yapı bilgin ileri düzeyde. C1 Devrik Yapılar (Inversion), Cleft Sentences ve C2 Deyimler modüllerine odaklanabilirsin.';
    } else if (correctCount >= 7) {
      detected = 'B2';
      desc = 'Çok iyi! Temel ve orta yapıları aşmışsın. B2 Mixed Conditionals, Causatives ve İleri Bağlaçlar ile akıcılığını zirveye taşıyabilirsin.';
    } else if (correctCount >= 5) {
      detected = 'B1';
      desc = 'Güzel bir temelin var! B1 Present Perfect, Relative Clauses ve Passive Voice konularıyla cümlelerini uzatmaya başlayabilirsin.';
    } else if (correctCount >= 3) {
      detected = 'A2';
      desc = 'Temel kavramları biliyorsun! A2 Geçmiş Zaman (Simple Past), Gelecek Zaman ve Karşılaştırma Sıfatları ile devam etmelisin.';
    }

    return `
      <div class="modal-backdrop anim-in" onclick="if(event.target===this) closePlacementTest()">
        <div class="card w-full max-w-lg p-6 sm:p-8 text-center space-y-5 anim-pop">
          <div class="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto text-3xl font-extrabold shadow-sm">
            ${detected}
          </div>
          <div class="space-y-1.5">
            <span class="chip chip-green">SEVİYE TESPİTİ TAMAMLANDI • +50 XP</span>
            <h2 class="h1">Önerilen Seviyen: ${detected}</h2>
            <p class="text-xs sm:text-sm muted leading-relaxed">${desc}</p>
          </div>
          <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
            <div>
              <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${correctCount} / ${total}</div>
              <div class="text-xs muted">Doğru Cevap</div>
            </div>
            <div>
              <div class="text-xl font-extrabold text-brand-600 dark:text-brand-400">Seviye ${detected}</div>
              <div class="text-xs muted">Kişisel Rotan</div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-2.5">
            <button onclick="applyPlacementLevel('${detected}')" class="btn btn-primary btn-lg flex-1">
              <span>${detected} Müfredatını Aç</span>
              ${icon('arrowRight', 'w-4 h-4')}
            </button>
            <button onclick="closePlacementTest()" class="btn btn-secondary btn-lg">Kapat</button>
          </div>
        </div>
      </div>
    `;
  }

  const q = PLACEMENT_QUESTIONS[idx];
  const chosen = answers[idx];
  const pct = Math.round(((idx + 1) / total) * 100);

  return `
    <div class="modal-backdrop anim-in" onclick="if(event.target===this) closePlacementTest()">
      <div class="card w-full max-w-xl overflow-hidden anim-pop">
        <div class="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4">
          <button onclick="closePlacementTest()" class="icon-btn">${icon('x', 'w-5 h-5')}</button>
          <div class="flex-1">
            <div class="flex items-center justify-between text-xs font-bold mb-1.5">
              <span class="text-brand-600 dark:text-brand-400">AKILLI SEVİYE TESPİT SINAVI (${q.level} Sorusu)</span>
              <span class="muted">${idx + 1} / ${total}</span>
            </div>
            <div class="progress"><span style="width: ${pct}%"></span></div>
          </div>
        </div>

        <div class="p-6 space-y-5">
          <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">${q.q}</h3>

          <div class="grid grid-cols-1 gap-2.5">
            ${q.options.map((opt, optIdx) => {
              let cls = 'option';
              if (chosen !== undefined) {
                if (optIdx === q.answer) cls = 'option option-correct';
                else if (optIdx === chosen) cls = 'option option-wrong';
              }
              return `
                <button ${chosen !== undefined ? 'disabled' : ''} onclick="answerPlacementQ(${optIdx})" class="${cls}">
                  <span>${opt}</span>
                  ${chosen !== undefined && optIdx === q.answer ? icon('check', 'w-4 h-4') : ''}
                </button>
              `;
            }).join('')}
          </div>

          ${chosen !== undefined ? `
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2 anim-in">
              <div class="text-xs font-extrabold ${chosen === q.answer ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}">
                ${chosen === q.answer ? '✅ Doğru Cevap!' : '💡 Kural Açıklaması:'}
              </div>
              <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-200">${q.explanation}</p>
              <div class="pt-1 flex justify-end">
                <button onclick="nextPlacementQ()" class="btn btn-primary btn-md">
                  <span>${idx + 1 === total ? 'Sonucu Gör' : 'Sonraki Soru'}</span>
                  ${icon('arrowRight', 'w-4 h-4')}
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// 5. ÇİFT DİLLİ SESLİ HİKAYE STÜDYOSU SAYFA RENDERER
export function renderStoriesSection(state) {
  const activeStory = GRADED_STORIES.find((s) => s.id === state.storyId) || GRADED_STORIES[0];
  const completedStories = state.progress.completedStories || [];
  const isDone = completedStories.includes(activeStory.id);
  const fullStoryText = activeStory.lines.map((l) => l.en).join(' ');
  const safeFullText = fullStoryText.replace(/'/g, "\\'");

  return `
    <div class="space-y-6 pb-8 anim-in">
      <!-- Hikaye Seçici Kartlar -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        ${GRADED_STORIES.map((st) => {
          const active = st.id === activeStory.id;
          const stDone = completedStories.includes(st.id);
          return `
            <button onclick="selectStory('${st.id}')" class="card p-4 text-left transition flex flex-col justify-between gap-2 ${
              active ? 'border-brand-600 ring-2 ring-brand-500/20' : 'hover:border-slate-300'
            }">
              <div class="flex items-center justify-between w-full">
                <span class="chip chip-brand">Seviye ${st.level}</span>
                ${stDone ? `<span class="chip chip-green">✓ Okundu</span>` : `<span class="text-[11px] muted">${st.duration}</span>`}
              </div>
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white leading-snug">${st.title}</h3>
                <p class="text-[11px] muted mt-1">${st.topic}</p>
              </div>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Aktif Hikaye Okuma & Dinleme Stüdyosu -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- Sol 8 Sütun: Cümle Cümle Sesli Hikaye -->
        <div class="lg:col-span-8 card overflow-hidden">
          <div class="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="chip chip-brand">SEVİYE ${activeStory.level} SESLİ HİKAYE</span>
                <span class="text-xs text-slate-300">${activeStory.duration}</span>
              </div>
              <h2 class="text-xl font-extrabold text-white pt-1">${activeStory.title}</h2>
              <p class="text-xs text-slate-300">${activeStory.summary}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <button onclick="speakText('${safeFullText}', 0.9)" class="btn btn-primary btn-sm">
                ${icon('volume', 'w-4 h-4')}
                <span>Tümünü Dinle</span>
              </button>
              <button onclick="completeStory('${activeStory.id}')" class="btn ${isDone ? 'btn-success' : 'btn-secondary'} btn-sm">
                ${isDone ? '✓ Tamamlandı' : 'Bitirdim (+30 XP)'}
              </button>
            </div>
          </div>

          <div class="p-5 sm:p-6 space-y-3">
            ${activeStory.lines.map((line, idx) => {
              const safeLine = line.en.replace(/'/g, "\\'");
              return `
                <div class="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-2 hover:border-brand-400 transition">
                  <div class="flex items-start justify-between gap-3">
                    <p class="text-base font-bold text-slate-900 dark:text-white leading-snug">${line.en}</p>
                    <div class="flex items-center gap-1.5 shrink-0">
                      <button onclick="speakText('${safeLine}', 0.92)" class="speak-btn speak-btn-sm" title="Cümleyi Dinle">${icon('volume', 'w-3.5 h-3.5')}</button>
                      <button onclick="speakText('${safeLine}', 0.58)" class="speak-btn speak-btn-sm" title="Yavaş Dinle">🐢</button>
                      <button onclick="practiceSpeech('${safeLine}', 'story-sp-${idx}')" class="btn btn-outline btn-sm">🎙️</button>
                    </div>
                  </div>
                  <p class="text-xs font-semibold text-brand-600 dark:text-brand-400">🗣️ Okunuşu: ${line.trRead}</p>
                  <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300">🇹🇷 ${line.tr}</p>
                  <div class="text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg inline-block">
                    💡 ${line.note}
                  </div>
                  <div id="story-sp-${idx}"></div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sağ 4 Sütun: Hikaye Kelimeleri & Anlama Testi -->
        <div class="lg:col-span-4 space-y-5">
          <div class="card p-5 space-y-3">
            <div class="eyebrow">HİKAYEDEKİ ANAHTAR KELİMELER</div>
            <div class="space-y-2">
              ${activeStory.vocab.map((v) => `
                <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between gap-2">
                  <div>
                    <span class="font-bold text-sm text-slate-900 dark:text-white">${v.word}</span>
                    <span class="text-xs text-brand-600 dark:text-brand-400 font-semibold ml-1">[${v.read}]</span>
                    <span class="block text-xs muted">${v.meaning}</span>
                  </div>
                  <button onclick="speakText('${v.word.replace(/'/g, "\\'")}', 0.9)" class="speak-btn speak-btn-sm">${icon('volume', 'w-3.5 h-3.5')}</button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="card p-5 space-y-3">
            <div class="eyebrow">OKUDUĞUNU ANLAMA TESTİ</div>
            <div class="space-y-4">
              ${activeStory.quiz.map((qItem, qIdx) => {
                const key = `${activeStory.id}-${qIdx}`;
                const chosen = (state.storyQuizAnswers || {})[key];
                return `
                  <div class="space-y-2">
                    <p class="text-xs font-bold text-slate-900 dark:text-white">${qIdx + 1}. ${qItem.q}</p>
                    <div class="space-y-1.5">
                      ${qItem.options.map((opt, oIdx) => {
                        let cls = 'option py-2 px-3 text-xs';
                        if (chosen !== undefined) {
                          if (oIdx === qItem.answer) cls = 'option option-correct py-2 px-3 text-xs';
                          else if (oIdx === chosen) cls = 'option option-wrong py-2 px-3 text-xs';
                        }
                        return `
                          <button onclick="answerStoryQuiz('${key}', ${oIdx}, ${qItem.answer})" class="${cls}">
                            <span>${opt}</span>
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}
