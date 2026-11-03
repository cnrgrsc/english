// A1'den C2'ye Eksiksiz Akademik Müfredat, 16+ Detaylı Referans Tablosu ve Bölüm Sonu Sınavları

export const LEVEL_ROADMAP = [
  {
    level: 'A1',
    title: 'A1 — Başlangıç (Beginner): Sıfırdan Temel İnşa',
    badgeColor: 'from-emerald-500 to-teal-600',
    description: 'Alfabe, fonetik sesler (B, C, Ch, Sh, Gh, Wh, K, H), sayılar, saatler, günler, aylar, renkler, tüm temel zamirler, To Be, To Have, A/An/The, çoğullar ve Geniş/Şimdiki Zaman.',
    units: [
      { code: 'A1.1', title: 'İngiliz Alfabesi (26 Harf: A → Ey) & Harflerin Telaffuzları', tag: 'Fonetik', targetTab: 'alphabet' },
      { code: 'A1.2', title: 'Fonetik Kuralları: B, C, Ch, G, Sh, Ss, Gh, K, H, Wh & Sessiz Harfler (Silent Letters)', tag: 'Fonetik', targetTab: 'alphabet' },
      { code: 'A1.3', title: 'Sayılar (Sayma & Sıra Sayıları), Günler, Aylar, Mevsimler, Renkler ve Saatler (Telling the Time)', tag: 'Temel Kavramlar', targetTab: 'grammar', tableId: 'a1-fundamentals-time-numbers' },
      { code: 'A1.4', title: 'Şahıs Zamirleri (Subject Pronouns: I, you, he, she, it, we, they)', tag: 'Zamirler', targetTab: 'grammar', tableId: 'pronouns-master' },
      { code: 'A1.5', title: 'To Be Yüklemi (Am / Is / Are) — Olumlu, Olumsuz ve Soru Halleri', tag: 'Temel Gramer', targetTab: 'grammar', tableId: 'to-be-pronouns' },
      { code: 'A1.6', title: 'Sahiplik: To Have & Have got / Has got (Olumlu, Olumsuz, Soru)', tag: 'Temel Gramer', targetTab: 'grammar', tableId: 'articles-plurals-saxon' },
      { code: 'A1.7', title: 'Belirsiz ve Belirli Artikeller (A, An, The) & İsimleri Çoğullaştırma Kuralları (Plurals)', tag: 'İsimler', targetTab: 'grammar', tableId: 'articles-plurals-saxon' },
      { code: 'A1.8', title: 'İşaret Zamirleri ve Sıfatları (This, That, These, Those) & Var Olma (There is / There are)', tag: 'Zamirler', targetTab: 'grammar', tableId: 'demonstratives-articles' },
      { code: 'A1.9', title: 'İyelik Sıfatları (My, your, his...) & Saxon Genitive (Ali\'s car - İyelik \'s Eki)', tag: 'Zamirler', targetTab: 'grammar', tableId: 'pronouns-master' },
      { code: 'A1.10', title: 'Geniş Zaman (Simple Present Tense: Do / Does, Olumlu, Olumsuz, Soru) & Günlük Rutinler', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'present-simple' },
      { code: 'A1.11', title: 'Sıklık Zarfları (Adverbs of Frequency: Always, usually, often, sometimes, rarely, never)', tag: 'Zarflar', targetTab: 'grammar', tableId: 'adverbs-frequency-manner' },
      { code: 'A1.12', title: 'İngilizcede Cümle Yapısı (SVO) & "To Do, Make vs. Do, Like, Want" Fiilleri', tag: 'Cümle Yapısı', targetTab: 'grammar', tableId: 'make-vs-do-collocations' },
      { code: 'A1.13', title: 'Soru Kelimeleri (Wh- Questions: What, Where, When, Who, Why, Which, Whose, How, How much/many)', tag: 'Sorular', targetTab: 'grammar', tableId: 'question-words-5w1h' },
      { code: 'A1.14', title: 'Şimdiki Zaman (Present Continuous: Am/Is/Are + V-ing) & -ing Almayan Fiiller (Non-progressive)', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'present-continuous' },
      { code: 'A1.15', title: 'Present Simple vs. Present Continuous Karşılaştırması', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'present-continuous' },
      { code: 'A1.16', title: 'Yetenek ve İzin (Can / Can\'t) & Zaman ve Yer Edatları (In, On, At, Under, Next to, Between)', tag: 'Edatlar & Modals', targetTab: 'grammar', tableId: 'prepositions-place-time' },
      { code: 'A1.17', title: 'Kelime Paketleri: Aile & Unvanlar (Mr, Mrs, Ms), Vücut, Yiyecek & Mutfak, Meslekler, Kıyafetler, Ev & Odalar', tag: 'Kelime & Diyalog', targetTab: 'conversations' }
    ]
  },
  {
    level: 'A2',
    title: 'A2 — Temel (Elementary): Geçmiş, Gelecek, Kıyaslama & Modallar',
    badgeColor: 'from-sky-500 to-blue-600',
    description: 'Nesne ve İyelik Zamirleri, Sıfat/Zarf farkı, Comparative/Superlative (Eşitlik/Azlık dahil), Tüm Modallar, Sayılabilen/Sayılamayan & Miktar, Geçmiş/Gelecek Zaman ve Tag Questions.',
    units: [
      { code: 'A2.1', title: 'Nesne Zamirleri (Me, you, him, her, it, us, them) & İyelik Zamirleri (Mine, yours, his, hers, ours, theirs)', tag: 'Zamirler', targetTab: 'grammar', tableId: 'pronouns-master' },
      { code: 'A2.2', title: 'Nitelik Sıfatları (Adjectives) ve Zarflar (Adverbs: -ly eki, good vs. well, fast, hard)', tag: 'Sıfat & Zarf', targetTab: 'grammar', tableId: 'adverbs-frequency-manner' },
      { code: 'A2.3', title: 'Karşılaştırma (Comparatives: -er/more), Eşitlik (as...as), Azlık (less) & En Üstünlük (Superlatives: -est/most)', tag: 'Kıyaslama', targetTab: 'grammar', tableId: 'comparatives-superlatives' },
      { code: 'A2.4', title: 'Modal Verbs Tam Tablo: Can, Could, May, Might, Should, Ought to, Must, Have to, Need, Would', tag: 'Modals', targetTab: 'grammar', tableId: 'modals-complete-matrix' },
      { code: 'A2.5', title: 'Sayılabilen & Sayılamayan İsimler (Countable/Uncountable) & Quantifiers (Some, any, much, many, a lot of, a few, few, a little, little)', tag: 'Miktar', targetTab: 'grammar', tableId: 'indefinite-quantifiers' },
      { code: 'A2.6', title: 'Geçmiş Zaman (Simple Past Tense: Was/Were, Düzenli -ed ve En Sık Kullanılan 100 Düzensiz Fiil - V2)', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'past-simple' },
      { code: 'A2.7', title: 'Geçmişte Devam Eden Zaman (Past Continuous Tense: Was/Were + V-ing & When/While)', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'past-continuous' },
      { code: 'A2.8', title: 'Gelecek Zaman: Simple Future (Will vs. Shall) ve Be Going To Arasındaki Farklar', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'future-will-goingto' },
      { code: 'A2.9', title: 'Değil mi? Soruları (Tag Questions: isn\'t it?, don\'t you?, didn\'t he?)', tag: 'Sorular', targetTab: 'grammar', tableId: 'tag-questions-so-neither' },
      { code: 'A2.10', title: 'Temel Bağlaçlar (And, but, so, because, or) & Günlük 100 Pratik İfade (10 Ways to Say No / Thank You)', tag: 'Konuşma', targetTab: 'conversations' },
      { code: 'A2.11', title: 'Diyalog & Kelime: Restoran, Mağaza, Havalimanı, Seyahat, Sağlık/Hastalık, Duygular, Ülkeler/Milletler', tag: 'Senaryolar', targetTab: 'conversations' }
    ]
  },
  {
    level: 'B1',
    title: 'B1 — Orta (Intermediate): Deneyimler, Koşullar, Edilgen & Bağlaçlı Yapılar',
    badgeColor: 'from-indigo-500 to-violet-600',
    description: 'Present Perfect & Continuous, For/Since/Just/Already/Yet, Used to/Be used to, Gerunds & Infinitives, Conditionals (0, 1, 2), Passive Voice, Relative Clauses ve Reported Speech.',
    units: [
      { code: 'B1.1', title: 'Present Perfect Tense (Have/Has + V3) & Past Participle (V3) Düzensiz Fiiller', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'present-perfect' },
      { code: 'B1.2', title: 'Present Perfect Zarfları (Just, already, yet, ever, never, recently) & For vs. Since + How Long', tag: 'Zamanlar', targetTab: 'grammar', tableId: 'perfect-adverbs-for-since' },
      { code: 'B1.3', title: 'Past Simple vs. Present Perfect Tense Farkı (Belirli Geçmiş vs. Deneyim/Sonuç)', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'present-perfect' },
      { code: 'B1.4', title: 'Present Perfect Continuous (Have/Has been + V-ing — Geçmişten Şu Ana Kesintisiz Süreç)', tag: 'Zamanlar', targetTab: 'grammar', tenseId: 'present-perfect-continuous' },
      { code: 'B1.5', title: 'Alışkanlıklar: Used to vs. Be used to vs. Get used to & Tercihler (Prefer, Would rather, Had better)', tag: 'Yapılar', targetTab: 'grammar', tableId: 'used-to-preferences-other' },
      { code: 'B1.6', title: 'Belirteçler: Another, Other, Others, The other & Each other vs. One another', tag: 'Zamir & Belirteç', targetTab: 'grammar', tableId: 'used-to-preferences-other' },
      { code: 'B1.7', title: 'Fiilimsiler (Gerunds V-ing vs. Infinitives To + V1) & Anlam Değiştiren Fiiller (Stop, Remember, Forget, Try)', tag: 'Fiilimsiler', targetTab: 'grammar', tableId: 'gerunds-infinitives-table' },
      { code: 'B1.8', title: 'Zaman Cümlecikleri (Time Clauses: When, while, as soon as, until, before, after) & Linking Verbs', tag: 'Bağlaçlar', targetTab: 'grammar', tableId: 'relative-clauses-connectors' },
      { code: 'B1.9', title: 'Koşul Cümleleri (Conditionals): Zero, First (Type 1) ve Second Conditional (Type 2 - Hayali Durumlar)', tag: 'If Clauses', targetTab: 'grammar', tenseId: 'conditionals-if' },
      { code: 'B1.10', title: 'Edilgen Çatı (Passive Voice: Be + V3) — Geniş, Şimdiki, Geçmiş ve Gelecek Zamanda Edilgen', tag: 'Passive', targetTab: 'grammar', tenseId: 'passive-voice' },
      { code: 'B1.11', title: 'İlgi Zamirleri ve Cümlecikleri (Relative Clauses: Who, which, that, where, whose, whom)', tag: 'Relative', targetTab: 'grammar', tableId: 'relative-clauses-connectors' },
      { code: 'B1.12', title: 'Çıkarım Modalları (Modals of Deduction: Must be, Can\'t be, May/Might/Could be)', tag: 'Modals', targetTab: 'grammar', tableId: 'modals-complete-matrix' },
      { code: 'B1.13', title: 'Dolaylı Anlatım (Reported Speech: Direct & Indirect Speech — Zaman ve Zamir Kaymaları)', tag: 'Reported Speech', targetTab: 'grammar', tableId: 'reported-speech-causatives' },
      { code: 'B1.14', title: 'Konuşma Kısaltmaları (Wanna, Gonna, Outta, Kinda) & "Both, Either, Neither / So do I, Neither do I"', tag: 'Doğal Konuşma', targetTab: 'grammar', tableId: 'tag-questions-so-neither' }
    ]
  },
  {
    level: 'B2',
    title: 'B2 — Orta Üstü (Upper-Intermediate): İleri Zamanlar, Pişmanlıklar & İş İngilizcesi',
    badgeColor: 'from-amber-500 to-orange-600',
    description: 'Past Perfect & Continuous, Future Continuous & Future Perfect, Type 3 & Mixed Conditionals, Wish/If Only, Past Modals (Should/Must/Could have V3), Causatives, Sıfat Sıralaması ve İş İngilizcesi.',
    units: [
      { code: 'B2.1', title: 'Past Perfect (Had + V3) & Past Perfect Continuous (Had been + V-ing — Geçmişin Geçmişi)', tag: 'İleri Zamanlar', targetTab: 'grammar', tenseId: 'past-perfect-modals' },
      { code: 'B2.2', title: 'Gelecekte Devam Eden ve Biten Zamanlar: Future Continuous (Will be V-ing) & Future Perfect (Will have V3)', tag: 'İleri Zamanlar', targetTab: 'grammar', tenseId: 'future-continuous-perfect' },
      { code: 'B2.3', title: 'Third Conditional (Type 3 — Geçmişteki Hayali Durumlar) & Mixed Conditionals + Unless, As long as', tag: 'If Clauses', targetTab: 'grammar', tenseId: 'conditionals-type3-wish' },
      { code: 'B2.4', title: 'Dilek ve Pişmanlık Cümleleri (Wish Clauses: I wish / If only + Past / Past Perfect / Would)', tag: 'Wish Clauses', targetTab: 'grammar', tenseId: 'conditionals-type3-wish' },
      { code: 'B2.5', title: 'Geçmiş Zaman Modalları (Past Modals: Should have V3, Could have V3, Must have V3, Might have V3) & Had to vs. Must have', tag: 'Past Modals', targetTab: 'grammar', tableId: 'modals-complete-matrix' },
      { code: 'B2.6', title: 'Ettirgen Çatı (Causatives: Have/Get something done, Have someone do, Get someone to do, Make, Let)', tag: 'Causatives', targetTab: 'grammar', tableId: 'reported-speech-causatives' },
      { code: 'B2.7', title: 'Detaylı Dolaylı Anlatım & Dolaylı Sorular (Indirect Questions: Could you tell me where...?)', tag: 'Reported Speech', targetTab: 'grammar', tableId: 'reported-speech-causatives' },
      { code: 'B2.8', title: 'Detaylı Relative Clauses (Defining vs. Non-defining) & Sıfat Sıralaması (Order of Adjectives: OSASCOMP)', tag: 'Sıfat & Relative', targetTab: 'grammar', tableId: 'order-of-adjectives-intensifiers' },
      { code: 'B2.9', title: 'İleri Bağlaçlar (Although, Even though, Despite, In spite of, Due to, However, Nevertheless, Therefore)', tag: 'Bağlaçlar', targetTab: 'grammar', tableId: 'relative-clauses-connectors' },
      { code: 'B2.10', title: 'Edatlara Göre Phrasal Verbs Sistemi (TO, FOR, FROM, AT, ON, ABOUT, WITH, IN) & Collocations', tag: 'Phrasal Verbs', targetTab: 'grammar', tableId: 'phrasal-verbs-by-preposition' },
      { code: 'B2.11', title: 'İş İngilizcesi (Business English): Toplantı, Resmi E-posta/Mektup, Telefon Görüşmesi ve İş Terimleri', tag: 'İş İngilizcesi', targetTab: 'conversations' }
    ]
  },
  {
    level: 'C1',
    title: 'C1 — İleri (Advanced): Devrik Cümleler, İndirgemeler & Akademik Hakimiyet',
    badgeColor: 'from-rose-500 to-pink-600',
    description: 'Inversion (Devrik Vurgu), Cleft Sentences (Ayrık Odak), Participle/Reduced Clauses (İndirgemeler), Subjunctive (İstek Kipi), Noun/Adverbial Clauses ve Tartışma/Essay Dili.',
    units: [
      { code: 'C1.1', title: 'Devrik Cümleler (Inversion: Rarely do I..., Never have I seen..., Not only did he..., Hardly... when)', tag: 'C1 Gramer', targetTab: 'grammar', tableId: 'c1-c2-advanced-structures' },
      { code: 'C1.2', title: 'Ayrık Vurgu Cümleleri (Cleft Sentences: It was X that..., What I really need is...)', tag: 'C1 Gramer', targetTab: 'grammar', tableId: 'c1-c2-advanced-structures' },
      { code: 'C1.3', title: 'İndirgemeler (Reduced Relative Clauses & Participle Clauses: V-ing / V3 / Having V3)', tag: 'C1 Gramer', targetTab: 'grammar', tableId: 'c1-c2-advanced-structures' },
      { code: 'C1.4', title: 'Subjunctive Mood (Dilek-Şart Kipi: It is essential/vital that he BE here)', tag: 'C1 Gramer', targetTab: 'grammar', tableId: 'c1-c2-advanced-structures' },
      { code: 'C1.5', title: 'Karmaşık İsim ve Zarf Cümlecikleri (Noun Clauses: Whether/If, The fact that & Adverbial: Lest, For fear that)', tag: 'C1 Gramer', targetTab: 'grammar', tableId: 'c1-c2-advanced-structures' },
      { code: 'C1.6', title: 'Akademik Makale Yazımı (Discussion Essay), Tartışma (Debate) Terimleri ve Sık Yapılan Yazım Hataları', tag: 'Akademik', targetTab: 'conversations' }
    ]
  },
  {
    level: 'C2',
    title: 'C2 — Ana Dil Seviyesi (Proficient): Deyimler, Üslup & İnce Nüanslar',
    badgeColor: 'from-purple-600 to-fuchsia-700',
    description: 'Kültürel deyimler ve atasözleri (At the drop of a hat, Music idioms), resmi/gayriresmi üslup dönüşümü, eşdizimlilik (Collocations) ve en çok karıştırılan kelimeler.',
    units: [
      { code: 'C2.1', title: 'Kültürel Deyimler & Atasözleri (Idioms: At the drop of a hat, Face the music, Bite the bullet)', tag: 'C2 Deyimler', targetTab: 'conversations' },
      { code: 'C2.2', title: 'Resmi ve Günlük Dil Dönüşümü (Formal vs. Informal Register) & Akademik Raporlama Üslubu', tag: 'C2 Üslup', targetTab: 'grammar', tableId: 'c1-c2-advanced-structures' },
      { code: 'C2.3', title: 'İngilizcede En Çok Karıştırılan Kelimeler & Sık Yanlış Telaffuz Edilen (Mispronounced) Kelimeler', tag: 'C2 Nüans', targetTab: 'grammar', tableId: 'make-vs-do-collocations' }
    ]
  }
];

// ============================================================================
// 15+ KAPSAMLI GRAMER, ZAMİR, KELİME VE YAPI TABLOLARI (A1 -> C2)
// ============================================================================
export const REFERENCE_TABLES = [
  {
    id: 'pronouns-master',
    level: 'A1',
    category: 'Zamirler (A1-A2)',
    title: '1. Tüm Zamirler Ana Tablosu (Şahıs, Nesne, İyelik Sıfatı, İyelik Zamiri, Dönüşlü)',
    subtitle: 'İngilizcede cümlenin bel kemiği! "Ben, Beni/Bana, Benim, Benimki, Kendim" farkını ve cümlede nereye geleceğini gösteren eksiksiz tablo.',
    howToUse: [
      '🟢 1. Şahıs (Özne) Zamiri (I, You, He...): Cümlenin EN BAŞINA (fiilden önce) gelir. İşi yapan kişidir.',
      '🔵 2. Nesne Zamiri (Me, You, Him...): Fiilden veya edattan (to, for, with, at) SONRA gelir. İşten etkilenen kişidir ("Bana bak" -> Look at ME).',
      '🟣 3. İyelik Sıfatı (My, Your, His...): Tek başına KULLANILAMAZ, yanına mutlaka bir İSİM alır (My car = Benim arabam).',
      '🟠 4. İyelik Zamiri (Mine, Yours, His...): Tek başına kullanılır, yanına isim ALMAZ çünkü ismin yerini tutar (This is mine = Bu benimki).',
      '🔴 5. Dönüşlü Zamir (Myself, Yourself...): Öznenin yaptığı işten yine kendisinin etkilendiğini veya işi "tek başına" (by myself) yaptığını anlatır.'
    ],
    headers: [
      'Kişi (Türkçe)',
      '1. Şahıs (Özne)\n[Fiilden Önce]',
      '2. Nesne (Object)\n[Fiilden Sonra]',
      '3. İyelik Sıfatı\n[+ İsim Zorunlu]',
      '4. İyelik Zamiri\n[Tek Başına]',
      '5. Dönüşlü Zamir\n[Kendi Kendine]'
    ],
    rows: [
      ['1. Tekil (Ben)', 'I (Ay)\nBen', 'me (mi:)\nBeni / Bana', 'my (may)\nBenim (...ım)', 'mine (mayn)\nBenimki', 'myself (mayself)\nKendim'],
      ['2. Tekil (Sen)', 'you (yu:)\nSen', 'you (yu:)\nSeni / Sana', 'your (yo:r)\nSenin (...ın)', 'yours (yo:rz)\nSeninki', 'yourself (yo:rself)\nKendin'],
      ['3. Tekil (O - Erkek)', 'he (hi:)\nO (Erkek)', 'him (him)\nOnu / Ona', 'his (hiz)\nOnun (...ı)', 'his (hiz)\nOnunki', 'himself (himself)\nKendisi'],
      ['3. Tekil (O - Kadın)', 'she (şi:)\nO (Kadın)', 'her (hör)\nOnu / Ona', 'her (hör)\nOnun (...ı)', 'hers (hörz)\nOnunki', 'herself (hörself)\nKendisi'],
      ['3. Tekil (O - Cansız)', 'it (it)\nO (Cansız)', 'it (it)\nOnu / Ona', 'its (its)\nOnun (...ı)', '—\n(Kullanılmaz)', 'itself (itself)\nKendisi'],
      ['1. Çoğul (Biz)', 'we (vi:)\nBiz', 'us (as)\nBizi / Bize', 'our (auır)\nBizim (...ımız)', 'ours (auırz)\nBizimki', 'ourselves (auırselvz)\nKendimiz'],
      ['2. Çoğul (Siz)', 'you (yu:)\nSiz', 'you (yu:)\nSizi / Size', 'your (yo:r)\nSizin (...ınız)', 'yours (yo:rz)\nSizinki', 'yourselves (yo:rselvz)\nKendiniz'],
      ['3. Çoğul (Onlar)', 'they (đey)\nOnlar', 'them (đem)\nOnları / Onlara', 'their (đeır)\nOnların (...ları)', 'theirs (đeırz)\nOnlarınki', 'themselves (đemselvz)\nKendileri']
    ],
    liveExamples: [
      { en: 'I know her, and she knows me.', trRead: 'Ay nou hör, end şi: nouz mi:.', tr: 'Ben onu tanıyorum ve o da beni tanıyor.' },
      { en: 'This is my book, and that one is yours.', trRead: 'Đis iz may buk, end đet van iz yo:rz.', tr: 'Bu benim kitabım, şu ise seninki.' },
      { en: 'He learned English by himself.', trRead: 'Hi: lörnd İngliş bay himself.', tr: 'O, kendi başına İngilizce öğrendi.' }
    ]
  },
  {
    id: 'to-be-pronouns',
    level: 'A1',
    category: 'To Be (Am/Is/Are)',
    title: '2. Şahıs Zamirleri ile "To Be" (Am / Is / Are & Was / Were) Çekim Tablosu',
    subtitle: 'Cümlede hareket/eylem fiili YOKSA; durum, yaş, meslek, yer ve sıfat cümleleri nasıl kurulur?',
    howToUse: [
      '💡 Şimdiki Durumda: I → am | He, She, It → is | You, We, They → are alır.',
      '💡 Geçmiş Durumda (-dı/-di): I, He, She, It → was | You, We, They → were alır.',
      '💡 Soru yaparken Am/Is/Are veya Was/Were öznenin ÖNÜNE geçer (Are you ready? / Were they at home?).'
    ],
    headers: ['Şahıs Zamiri', 'Şimdiki Olumlu (+)', 'Şimdiki Olumsuz (-)', 'Şimdiki Soru (?)', 'Geçmiş (Was/Were)', 'Örnek Anlamı'],
    rows: [
      ['I (Ben)', "I am (I'm)\n(Aym)", "I am not\n(Aym nat)", 'Am I ...?\n(Em ay?)', "I was / wasn't\n(Ay voz)", 'I am happy (Mutluyum)\nI was tired (Yorgundum)'],
      ['You (Sen/Siz)', "You are (You're)\n(Yu a:r)", "You aren't\n(Yu a:rnt)", 'Are you ...?\n(A:r yu?)', "You were / weren't\n(Yu vör)", 'You are right (Haklısın)\nWere you busy? (Meşgul müydün?)'],
      ['He (O - Erkek)', "He is (He's)\n(Hi:z)", "He isn't\n(Hi: izınt)", 'Is he ...?\n(İz hi:?)', "He was / wasn't\n(Hi: voz)", 'He is at work (O işte)\nHe was late (Geç kaldı)'],
      ['She (O - Kadın)', "She is (She's)\n(Şi:z)", "She isn't\n(Şi: izınt)", 'Is she ...?\n(İz şi:?)', "She was / wasn't\n(Şi: voz)", 'She is a doctor (O doktor)\nShe wasn\'t here (Burada değildi)'],
      ['It (O - Cansız)', "It is (It's)\n(İts)", "It isn't\n(İt izınt)", 'Is it ...?\n(İz it?)', "It was / wasn't\n(İt voz)", 'It is cold (Hava soğuk)\nIt was easy (Kolaydı)'],
      ['We (Biz)', "We are (We're)\n(Vi: a:r)", "We aren't\n(Vi: a:rnt)", 'Are we ...?\n(A:r vi:?)', "We were / weren't\n(Vi: vör)", 'We are ready (Hazırız)\nWe were friends (Arkadaştık)'],
      ['They (Onlar)', "They are (They're)\n(Đey a:r)", "They aren't\n(Đey a:rnt)", 'Are they ...?\n(A:r đey?)', "They were / weren't\n(Đey vör)", 'They are students (Öğrenciler)\nThey were home (Evdeydiler)']
    ],
    liveExamples: [
      { en: 'Are you hungry? No, I am not hungry, but I am thirsty.', trRead: 'A:r yu hangri? Nou, aym nat hangri, bat aym θörsti.', tr: 'Aç mısın? Hayır aç değilim ama susadım.' }
    ]
  },
  {
    id: 'a1-fundamentals-time-numbers',
    level: 'A1',
    category: 'Temel Kavramlar (A1)',
    title: '3. Sayılar (Sayma & Sıra), Saatler (Telling Time), Günler, Aylar & Mevsimler',
    subtitle: 'Günlük hayatta saat sorma, tarih verme, sıralama yapma ve temel zaman kavramları.',
    howToUse: [
      '⏰ Saat Söylerken: Tam saatlerde "o\'clock", buçuklarda "half past", çeyrek geçiyorsa "quarter past", çeyrek varsa "quarter to" kullanılır!',
      '🔢 Sıra Sayıları (1st, 2nd, 3rd): İlk üç sayı özeldir (first, second, third), diğerlerinin sonuna peltek "-th" eklenir (fourth, fifth).',
      '📅 Edat Kuralı: Saatlerde AT (at 5 o\'clock), Günlerde ON (on Monday), Aylar ve Mevsimlerde IN (in July, in summer) kullanılır!'
    ],
    headers: ['Kategori', 'Temel Örnekler (İngilizce)', 'Türkçe Okunuşları', 'Türkçe Karşılığı', 'Nasıl Kullanılır / Altın Kural'],
    rows: [
      ['Sayma Sayıları (1-20)', '1 One, 2 Two, 3 Three, 4 Four, 5 Five, 8 Eight, 11 Eleven, 12 Twelve, 13 Thirteen, 20 Twenty', 'Van, Tu:, Θri:, Fo:r, Fayv, Eyt, İlevın, Tvelv, Θörti:n, Tventi', '1, 2, 3, 4, 5, 8, 11, 12, 13, 20', '13-19 arası "-teen" (uzun vurgulu), 20-90 onluklar "-ty" (kısa) ile biter.'],
      ['Sıra Sayıları (Ordinals)', '1st First, 2nd Second, 3rd Third, 4th Fourth, 5th Fifth, 21st Twenty-first', 'Först, Sekınd, Θörd, Fo:rθ, Fifθ, Tventi-först', 'Birinci, İkinci, Üçüncü, Dördüncü, Beşinci, 21.', 'Tarihlerde ve katlarda kullanılır: "on the first of May" (1 Mayıs\'ta).'],
      ['Saatler (Telling Time)', "It's 3 o'clock | It's half past 3 (3:30) | It's quarter past 3 (3:15) | It's quarter to 4 (3:45)", 'İts θri: oklok | Haf past θri: | Kvo:rtır past θri: | Kvo:rtır tı fo:r', 'Saat tam 3 | 3 buçuk | 3\'ü çeyrek geçiyor | 4\'e çeyrek var', 'Saat sorarken: "What time is it?" veya "Have you got the time?" denir.'],
      ['Haftanın Günleri (Days)', 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday', 'Mandey, Tyu:zdey, Venzdey, Θörzdey, Fraydey, Setırdey, Sandey', 'Pazartesi, Salı, Çarşamba, Perşembe, Cuma, Cumartesi, Pazar', 'Günlerin önüne her zaman ON gelir: "See you on Wednesday!" (Çarşamba D\'si okunmaz!).'],
      ['Aylar & Mevsimler', 'January, February, March, April, May, June, July, August... | Spring, Summer, Autumn/Fall, Winter', 'Cenyueri, Februeri, Ma:rç, Eyprıl... | Spring, Samır, O:tım, Vintır', 'Ocak, Şubat, Mart, Nisan... | İlkbahar, Yaz, Sonbahar, Kış', 'Aylar ve mevsimler geniş zaman dilimi olduğu için IN alır: "in Winter, in May".'],
      ['Temel Renkler (Colors)', 'Red, Blue, Green, Yellow, Black, White, Purple, Orange, Grey, Brown', 'Red, Blu:, Gri:n, Yelou, Blek, Vayt, Pörpıl, Orınc, Grey, Braun', 'Kırmızı, Mavi, Yeşil, Sarı, Siyah, Beyaz, Mor, Turuncu, Gri, Kahverengi', 'Sıfat oldukları için isimden önce gelirler: "a black car" (siyah bir araba).']
    ],
    liveExamples: [
      { en: 'What time is it? It is quarter to five, and my flight is on Monday.', trRead: 'Vat taym iz it? İt iz kvo:rtır tı fayv, end may flayt iz on Mandey.', tr: 'Saat kaç? Saat beşe çeyrek var ve uçuşum Pazartesi günü.' }
    ]
  },
  {
    id: 'articles-plurals-saxon',
    level: 'A1',
    category: 'İsimler & Artikeller (A1)',
    title: '4. Artikeller (A / An / The), Çoğullaştırma Kuralları, Saxon Genitive (\'s) & Have Got',
    subtitle: 'Ders 13-19 & 33: Bir ismin başına ne zaman A, An, The gelir? Düzensiz çoğullar nelerdir? İyelik eki (\'s) nasıl çalışır?',
    howToUse: [
      '🅰️ A vs. AN: Yazılışa değil OKUNUŞA (SESE) bakılır! Ünsüz sesle başlıyorsa A (a book, a university -> "yu" sesi), ünlü sesle başlıyorsa AN (an apple, an hour -> "au" sesi, h okunmaz!).',
      '🎯 THE: Hem konuşanın hem dinleyenin hangi nesneden bahsettiğini bildiği BELİRLİ şeylerde ve dünyada tek olanlarda (the sun, the moon, the internet) kullanılır.',
      '👥 Düzensiz Çoğullar: Bazı kelimeler "-s" almaz, kökten değişir: Man → Men, Woman → Women (Vimin!), Child → Children, Person → People, Tooth → Teeth, Foot → Feet.'
    ],
    headers: ['Konu / Kural', 'Formül / Yapı', 'Okunuş İpucu', 'Örnekler', 'Türkçe Mantığı & İstisnalar'],
    rows: [
      ['Belirsiz Artikel: A / An', 'a + ünsüz ses\nan + ünlü ses', 'ı / en', 'a car, a university (/juː/)\nan apple, an hour (/aʊ/)', 'Herhangi "bir" nesne. Çoğullarda ve sayılamayanlarda ASLA a/an kullanılmaz!'],
      ['Belirli Artikel: The', 'the + tüm isimler', 'đı (ünsüz önünde)\nđi (ünlü önünde)', 'Close the door!\nthe sun, the sky, the best', 'Belirli, bilinen nesne. Ülke, şehir ve kişi isimleriyle (istisnalar hariç: the USA, the UK) kullanılmaz.'],
      ['Düzenli Çoğullar (-s / -es / -ies)', 'Sonuna -s, -es (ch,sh,s,x,o) veya -ies (ünsüz+y)', '-s / -z / -iz', 'book → books, box → boxes\ncity → cities, knife → knives', 'Sonu -f/-fe ile bitenlerde f harfi v\'ye dönüşür: wife → wives, leaf → leaves.'],
      ['Düzensiz Çoğullar (Irregular)', '-s takısı ALMAZ!', 'Women = "Vimin" diye okunur!', 'man → men, woman → women\nchild → children, person → people\nmouse → mice, fish → fish', 'Bu kelimelerin sonuna asla -s eklenmez (childrens ❌ -> children ✅).'],
      ['Saxon Genitive (İyelik \'s)', "Canlı İsim + 's + Nesne\nCansızlarda: of the ...", "'s (-ın / -in)", "Ali's car (Ali'nin arabası)\nMy parents' house (Ailemin evi)\nThe door of the car (Arabanın kapısı)", 'Çoğul isim zaten -s ile bitiyorsa sadece kesme işareti (\') konur: students\' books.'],
      ['Sahiplik: Have / Has got', 'I/You/We/They have got\nHe/She/It has got', "I've got / He's got", "I have got a car. / Have you got time?\nShe hasn't got any brothers.", 'Do you have...? ile Have you got...? birebir aynı anlamdadır (Sahip misin / Var mı?).']
    ],
    liveExamples: [
      { en: 'Wait an hour! Those women are my sister\'s friends.', trRead: 'Veyt en auır! Đouz vimin a:r may sistırz frendz.', tr: 'Bir saat bekle! Şu kadınlar kız kardeşimin arkadaşları.' }
    ]
  },
  {
    id: 'demonstratives-articles',
    level: 'A1',
    category: 'İşaret & Varlık (A1)',
    title: '5. İşaret Zamirleri (This / That / These / Those) & Varlık (There is / There are)',
    subtitle: 'Ders 55-56: Yakındaki ve uzaktaki nesneleri tekil/çoğul olarak işaret etme ve "Var / Yok" deme kuralları.',
    howToUse: [
      '👉 Yakındakiler için: Tekilse THIS (Bu), Çoğulsa THESE (Bunlar).',
      '👉 Uzaktakiler için: Tekilse THAT (Şu/O), Çoğulsa THOSE (Şunlar/Onlar).',
      '👉 "Bir yerde ... var" demek için "Have" DEĞİL; tekillerde THERE IS, çoğullarda THERE ARE kullanılır!'
    ],
    headers: ['Yapı / Zamir', 'Okunuşu', 'Tekil mi Çoğul mu?', 'Mesafe / Kullanım', 'Örnek Cümle', 'Türkçe Karşılığı'],
    rows: [
      ['This', 'Đis (Kısa i)', 'Tekil (+ is)', 'Yakın (Elimin altında)', 'This is my phone.', 'Bu benim telefonum.'],
      ['That', 'Đet', 'Tekil (+ is)', 'Uzak (Orada / Şurada)', 'What is that over there?', 'Şuradaki şey nedir?'],
      ['These', 'Đi:z (Uzun i:z)', 'Çoğul (+ are)', 'Yakın (Elimdekiler)', 'These books are very good.', 'Bu kitaplar çok iyi.'],
      ['Those', 'Đouz', 'Çoğul (+ are)', 'Uzak (Oradakiler)', 'Those shoes are expensive.', 'Şu ayakkabılar pahalı.'],
      ['There is / isn\'t', 'Đeır iz / izınt', 'Tekil veya Sayılamayan', 'Bir yerde "... var / yok"', 'There is some water in the glass.', 'Bardakta biraz su var.'],
      ['There are / aren\'t', 'Đeır a:r / a:rnt', 'Çoğul İsimler', 'Bir yerde "...-lar var / yok"', 'Are there any messages for me?', 'Benim için hiç mesaj var mı?']
    ],
    liveExamples: [
      { en: 'This coffee is hot, but those drinks are cold.', trRead: 'Đis kofi iz hat, bat đouz drinks a:r kould.', tr: 'Bu kahve sıcak ama şu içecekler soğuk.' }
    ]
  },
  {
    id: 'question-words-5w1h',
    level: 'A1',
    category: 'Soru Kelimeleri (A1)',
    title: '6. Soru Zamirleri (Wh- Questions: 5N1K) ve Soru Kurma Şablonu',
    subtitle: 'Ders 77 & 142: Her türlü soruyu sormayı sağlayan altın formül: [Soru Kelimesi] + [Yardımcı Fiil] + [Özne] + [Fiil]?',
    howToUse: [
      '🔑 Altın Soru Kalıbı: Soru kelimesini en başa koy, hemen yanına zamanın yardımcı fiilini (do/does/did/am/is/are/can/will/have) getir, sonra özneyi söyle!'
    ],
    headers: ['Soru Kelimesi', 'Okunuşu', 'Türkçe Anlamı', 'Neyi Sorar?', 'Canlı Örnek Soru', 'Cevap Örneği'],
    rows: [
      ['What', 'Vat', 'Ne / Neyi?', 'Nesne, eylem, bilgi', 'What do you need?', 'I need some help.'],
      ['Where', 'Veır', 'Nerede / Nereye?', 'Mekan, konum, yön', 'Where do you live?', 'I live in Istanbul.'],
      ['When / What time', 'Ven / Vat taym', 'Ne zaman / Saat kaçta?', 'Zaman, gün, tam saat', 'When did he arrive?', 'He arrived yesterday at 5.'],
      ['Who', 'Hu:', 'Kim / Kimi?', 'Kişi, insan', 'Who called you?', 'My brother called me.'],
      ['Why', 'Vay', 'Neden / Niçin?', 'Sebep (Cevapta Because)', 'Why are you late?', 'Because the traffic was bad.'],
      ['Which', 'Viç', 'Hangisi?', 'Sınırlı seçenekler arası seçim', 'Which one do you prefer?', 'I prefer the black one.'],
      ['Whose', 'Hu:z', 'Kimin?', 'Sahiplik, aidiyet', 'Whose car is this?', "It's mine (Benimki)."],
      ['How', 'Hau', 'Nasıl?', 'Yöntem, durum, sağlık', 'How do you go to work?', 'By metro (Metroyla).'],
      ['How much / How many', 'Hau maç / Hau meni', 'Ne kadar / Kaç tane?', 'Fiyat/Sayılamayan vs. Adet', 'How much is this? / How many days?', 'It is $10. / For 3 days.'],
      ['How long / How often', 'Hau long / Hau ofın', 'Ne kadar süredir / Ne sıklıkla?', 'Süreç vs. Alışkanlık sıklığı', 'How long does it take?', 'It takes twenty minutes.']
    ],
    liveExamples: [
      { en: 'What time does the meeting start, and how long will it take?', trRead: 'Vat taym daz đı mi:ting sta:rt, end hau long vil it teyk?', tr: 'Toplantı saat kaçta başlıyor ve ne kadar sürecek?' }
    ]
  },
  {
    id: 'prepositions-place-time',
    level: 'A1',
    category: 'Edatlar (A1)',
    title: '7. Yer ve Zaman Edatları Tam Tablosu (In, On, At, Under, Next to, Between, Opposite)',
    subtitle: 'Ders 72-74 & 122: Zaman ve mekan anlatırken en çok kullanılan edatlar ve adres tarifi (Giving Directions) kalıpları.',
    howToUse: [
      '🔺 Zamanlarda: Saatler → AT (at 7:00, at night, at the weekend) | Günler ve Tam Tarihler → ON (on Monday, on May 5th) | Aylar, Mevsimler, Yıllar, Sabah/Akşam → IN (in July, in 2026, in the morning).',
      '📍 Mekanlarda: Nokta Konum → AT (at home, at work, at the bus stop) | Yüzey ve Caddeler → ON (on the table, on the wall, on the 2nd floor) | Kapalı Alan, Şehir, Ülke → IN (in the box, in London).'
    ],
    headers: ['Edat (Preposition)', 'Okunuşu', 'Türkçe Anlamı', 'Zaman / Mekan Kuralı', 'Canlı Örnek Cümle', 'Türkçe Çevirisi'],
    rows: [
      ['IN', 'İn', 'İçinde / -de, -da', 'Kapalı alanlar, şehirler, aylar, yıllar, mevsimler', 'My keys are in my pocket. / In summer.', 'Anahtarlarım cebimde. / Yazın.'],
      ['ON', 'On', 'Üzerinde (Temas var)', 'Yüzeyler, katlar, toplu taşıma, günler', 'The book is on the desk. / On the bus.', 'Kitap masanın üstünde. / Otobüste.'],
      ['AT', 'Et', '-de, -da (Nokta hedef)', 'Tam saatler, ortak noktalar (home, work, school)', 'Meet me at the entrance at 8 PM.', 'Saat 8\'de girişte benimle buluş.'],
      ['UNDER / BELOW', 'Andır / Bilou', 'Altında', 'Doğrudan altında (under) / Seviye olarak aşağıda (below)', 'The cat is under the table.', 'Kedi masanın altında.'],
      ['NEXT TO / BESIDE', 'Nekst tu / Bisayd', 'Bitişiğinde / Yanında', 'Hemen yan yana olan nesneler/binalar', 'The pharmacy is next to the bank.', 'Eczane bankanın hemen yanında.'],
      ['BETWEEN / AMONG', 'Bitvi:n / Imang', 'Arasında', 'İki şey arasında (between) / Kalabalık arasında (among)', 'I sit between Ali and Ayşe.', 'Ali ile Ayşe\'nin arasında oturuyorum.'],
      ['IN FRONT OF / BEHIND', 'İn frant ov / Bihaynd', 'Önünde / Arkasında', 'Konum olarak önünde veya arkasında', 'There is a garden behind the house.', 'Evin arkasında bir bahçe var.'],
      ['OPPOSITE / ACROSS FROM', 'Opızit / Ikros from', 'Karşısında', 'Yolun veya masanın tam karşısında', 'The cafe is opposite the station.', 'Kafe istasyonun tam karşısında.']
    ],
    liveExamples: [
      { en: 'Go straight ahead, turn left, and the bank is next to the hotel.', trRead: 'Gou streyt ıhed, törn left, end đı benk iz nekst tı đı houtel.', tr: 'Dümdüz ilerle, sola dön; banka otelin hemen yanında.' }
    ]
  },
  {
    id: 'adverbs-frequency-manner',
    level: 'A2',
    category: 'Sıfatlar & Zarflar (A1-A2)',
    title: '8. Sıklık Zarfları (Always → Never) & Durum Zarfları (Adjective vs. Adverb -ly)',
    subtitle: 'Ders 37, 64 & 150: Bir işin ne sıklıkla yapıldığını ve NASIL yapıldığını (hızlı vs. hızlıca) anlatma kuralları.',
    howToUse: [
      '⏱️ Sıklık Zarflarının Yeri: Normal fiillerden ÖNCE (I always drink water), ama Am/Is/Are\'dan SONRA gelir (He is always late)!',
      '⚡ Sıfat (Adjective) vs. Zarf (Adverb): Sıfatlar İSMİ niteler (a slow car), Zarflar FİİLİ niteler ve genelde "-ly" alır (He drives slowly).',
      '⚠️ Düzensiz Zarflar (-ly Almayanlar!): Good (İyi) → WELL (İyi bir şekilde), Fast → FAST, Hard → HARD, Late → LATE (Hardly = Neredeyse hiç demektir!).'
    ],
    headers: ['Zarf / Sıfat', 'Okunuşu', 'Sıklık Yüzdesi / Türü', 'Türkçe Anlamı', 'Cümle İçinde Doğru Konumu'],
    rows: [
      ['Always', 'O:lveyz', '%100 (Sıklık Zarfı)', 'Her zaman, daima', 'I always wake up early. / She is always kind.'],
      ['Usually / Generally', 'Yu:jıli / Cenırıli', '%80-%90 (Sıklık Zarfı)', 'Genellikle, çoğunlukla', 'We usually have breakfast at 8.'],
      ['Often / Frequently', 'Ofın / Fri:kvıntli', '%60-%70 (Sıklık Zarfı)', 'Sık sık', 'Do you often go to the cinema?'],
      ['Sometimes / Occasionally', 'Samtaymz / Okeyjınıli', '%30-%50 (Sıklık Zarfı)', 'Bazen, ara sıra', 'Sometimes I work from home.'],
      ['Rarely / Seldom / Hardly ever', 'Reırli / Seldım / Ha:rdli evır', '%5-%10 (Olumsuza yakın)', 'Nadiren, neredeyse hiç', 'He rarely eats fast food.'],
      ['Never', 'Nevır', '%0 (Olumlu fiille kullanılır!)', 'Asla, hiçbir zaman', 'I never lie. (Asla "I don\'t never" denmez!)'],
      ['Careful (Sıfat) → Carefully (Zarf)', 'Keırfıl → Keırfıli', 'Düzenli Zarf (+ly)', 'Dikkatli → Dikkatlice', 'She is a careful driver. → She drives carefully.'],
      ['Good (Sıfat) → Well (Zarf)', 'Gud → Vel', '🔥 Düzensiz Zarf', 'İyi (isim) → İyi (eylem)', 'Your English is good. → You speak English well!'],
      ['Fast → Fast | Hard → Hard', 'Fest | Ha:rd', '🔥 Değişmeyen Zarf', 'Hızlı/Hızlıca | Sıkı/Zor', 'He is a fast runner. → He runs fast. (Fastly YOKTUR!)']
    ],
    liveExamples: [
      { en: 'She speaks English very well because she always practices.', trRead: 'Şi: spi:ks İngliş veri vel bikoz şi: o:lveyz prektisız.', tr: 'İngilizceyi çok iyi konuşuyor çünkü her zaman pratik yapıyor.' }
    ]
  },
  {
    id: 'comparatives-superlatives',
    level: 'A2',
    category: 'Kıyaslama (A2)',
    title: '9. Sıfatlarda Karşılaştırma (Comparative), Eşitlik (as...as), Azlık (less) & En Üstünlük (Superlative)',
    subtitle: 'Ders 42-45 & 60: İki şeyi kıyaslama (daha büyük, kadar büyük, daha az) ve en üstünü seçme (en büyük) kuralları.',
    howToUse: [
      '📏 Kısa Sıfatlar (1 Hece): "Daha" için -ER than (faster than), "En" için THE -EST (the fastest).',
      '📏 Uzun Sıfatlar (2+ Hece): "Daha" için MORE ... than, "Daha az" için LESS ... than, "En" için THE MOST / THE LEAST.',
      '⚖️ Eşitlik (Comparative of Equality): İki şey eşitse "AS + yalın sıfat + AS" kullanılır (as fast as = ... kadar hızlı).'
    ],
    headers: ['Sıfat Türü', 'Yalın Hali', 'Daha ... (Comparative)', 'En ... (Superlative)', 'Canlı Örnek Cümle'],
    rows: [
      ['Kısa Sıfat (1 Hece)', 'Fast (Hızlı)\nBig (Büyük)', 'faster than (daha hızlı)\nbigger than (daha büyük)', 'the fastest (en hızlı)\nthe biggest (en büyük)', 'Planes are faster than trains.'],
      ['Sonu -Y ile Biten', 'Easy (Kolay)\nHappy (Mutlu)', 'easier than (daha kolay)\nhappier than (daha mutlu)', 'the easiest (en kolay)\nthe happiest (en mutlu)', 'This is the easiest way to learn.'],
      ['Uzun Sıfat (2+ Hece)', 'Expensive (Pahalı)\nImportant (Önemli)', 'more expensive than\nmore important than', 'the most expensive\nthe most important', 'Health is more important than money.'],
      ['Azlık Kıyaslaması (Minority)', 'Expensive / Difficult', 'less expensive than\n(daha az pahalı)', 'the least expensive\n(en az pahalı)', 'This hotel is less expensive than that one.'],
      ['Eşitlik Kıyaslaması (Equality)', 'as + Sıfat/Zarf + as', 'not as ... as\n(kadar ... değil)', 'the same as\n(... ile aynı)', 'Learning online is as effective as classroom lessons.'],
      ['🔥 DÜZENSİZLER', 'Good (İyi)\nBad (Kötü)\nFar (Uzak)', 'better than (daha iyi)\nworse than (daha kötü)\nfurther/farther than', 'the best (en iyi)\nthe worst (en kötü)\nthe furthest/farthest', 'Your pronunciation is getting better every day!']
    ],
    liveExamples: [
      { en: 'This phone is not as expensive as that one, and it works better.', trRead: 'Đis foun iz nat ez ikspensiv ez đet van, end it vörks betır.', tr: 'Bu telefon şunun kadar pahalı değil ve daha iyi çalışıyor.' }
    ]
  },
  {
    id: 'indefinite-quantifiers',
    level: 'A2',
    category: 'Miktar & Belgisiz (A2)',
    title: '10. Sayılabilen/Sayılamayan İsimler, Miktar (Quantifiers) & Belgisiz Zamirler Tablosu',
    subtitle: 'Ders 91-94: Some, Any, Much, Many, A lot of, A few vs. Few, A little vs. Little ve Someone/Anyone/Nobody kuralları.',
    howToUse: [
      '💧 Sayılamayan İsimler (Uncountable): Water, coffee, money, time, information, advice, furniture, bread, news, traffic -> Çoğul (-s) OLMAZ ve her zaman TEKİL fiil (is/was/has) alır!',
      '➕ A FEW vs. FEW (Sayılabilen): "A few" = Birkaç tane (Olumlu, bana yeter) | "Few" = Çok az, neredeyse yok (Olumsuz, yetersiz).',
      '➕ A LITTLE vs. LITTLE (Sayılamayan): "A little" = Biraz (Olumlu, yeterli) | "Little" = Çok az, yok denecek kadar (Olumsuz, yetersiz).'
    ],
    headers: ['Yapı / Quantifier', 'Okunuşu', 'Hangi İsimle Kullanılır?', 'Anlamı & Nüansı', 'Örnek Cümle', 'Türkçe Çevirisi'],
    rows: [
      ['Some', 'Sam', 'Sayılabilen (Çoğul) & Sayılamayan', 'Biraz / Birkaç (Olumlu & İkram/Rica ?)', 'I have some good news! / Would you like some tea?', 'Biraz güzel haberim var! / Biraz çay ister misin?'],
      ['Any', 'Eni', 'Sayılabilen (Çoğul) & Sayılamayan', 'Hiç (Olumsuz - ve Soru ?)', "I don't have any cash. / Do you have any questions?", 'Hiç nakitim yok. / Hiç sorunuz var mı?'],
      ['Much vs. Many', 'Maç vs. Meni', 'Much: Sayılamayan\nMany: Sayılabilen Çoğul', 'Çok (Genelde soru ve olumsuzda)', 'How much money/time? vs. How many people/days?', 'Ne kadar para/zaman? vs. Kaç kişi/gün?'],
      ['A lot of / Lots of', 'I lot ov', 'Her İkisiyle de (Joker!)', 'Çok, bir sürü (Olumlu cümlelerde en doğal seçim)', 'There are a lot of opportunities here.', 'Burada bir sürü fırsat var.'],
      ['A few vs. Few', 'I fyu: vs. Fyu:', 'Sadece Sayılabilen Çoğul (+s)', 'A few: Birkaç (Yeterli +)\nFew: Çok az (Yetersiz -)', 'I have a few friends (Mutluyum).\nI have few friends (Yalnızım).', 'Birkaç arkadaşım var. / Çok az arkadaşım var.'],
      ['A little vs. Little', 'I litıl vs. Litıl', 'Sadece Sayılamayan (Tekil)', 'A little: Biraz (Yeterli +)\nLittle: Çok az (Yetersiz -)', 'We have a little time (Yetişiriz).\nWe have little time (Geç kaldık).', 'Biraz vaktimiz var. / Çok az vaktimiz kaldı.'],
      ['Someone / Something / Somewhere', 'Samvan / Samθing', 'Olumlu (+) Cümleler', 'Birisi / Bir şey / Bir yer', 'Someone left a message for you.', 'Birisi senin için mesaj bıraktı.'],
      ['Anyone / Anything / Anywhere', 'Enivan / Eniθing', 'Olumsuz (-) ve Soru (?)', 'Hiç kimse / Hiçbir şey / Herhangi biri', "Did anyone call me? I didn't see anything.", 'Beni kimse aradı mı? Hiçbir şey görmedim.'],
      ['No one / Nothing / Nowhere', 'Nou van / Naθing', 'Olumlu Fiille Olumsuz Anlam!', 'Hiç kimse / Hiçbir şey / Hiçbir yer', 'Nothing is impossible. (Not eklenmez!)', 'Hiçbir şey imkansız değildir.']
    ],
    liveExamples: [
      { en: 'I need a little help and a few minutes to finish this.', trRead: 'Ay ni:d ı litıl help end ı fyu: minits tı finiş đis.', tr: 'Bunu bitirmek için biraz yardıma ve birkaç dakikaya ihtiyacım var.' }
    ]
  },
  {
    id: 'modals-complete-matrix',
    level: 'A2',
    category: 'Modals (A2-B2)',
    title: '11. Tüm Modal Fiiller Ana Tablosu (Yetenek, Tavsiye, Zorunluluk, Çıkarım & Past Modals)',
    subtitle: 'Ders 46-52, 139-141 & 172-174: Can, Could, May, Might, Should, Ought to, Must, Have to, Need, Would ve Geçmiş Halleri (Modal + Have V3).',
    howToUse: [
      '⚡ Şimdiki/Genel Modallar: Yanına her zaman FİİLİN YALIN HALİ (V1) gelir. He/She/It\'te "-s" takısı veya "to" ALMAZ (Have to ve Ought to hariç).',
      '🔥 Must vs. Have to: Must = Konuşmacının kendi içinden gelen zorunluluk | Have to = Dış kurallar, yasalar. Olumsuzları BAMBAŞKADIR: Mustn\'t = YASAK! | Don\'t have to = Gerek yok (İstersen yapma).',
      '🕰️ Past Modals (Modal + have + V3): Geçmişte olmuş bitmiş olaylar hakkında pişmanlık (should have V3 = yapmalıydım) veya çıkarım (must have V3 = yapmış olmalı) bildirir!'
    ],
    headers: ['Modal Yapısı', 'Okunuşu', 'Seviye & Görevi', 'Türkçe Karşılığı', 'Canlı Örnek Cümle', 'Önemli Fark / Tuzak'],
    rows: [
      ['Can / Could', 'Ken / Kud', 'A1-A2 • Yetenek, İzin, Kibar Rica', '-ebilir / -ebilirdi (Geçmiş yetenek)', 'Could you help me, please?', 'Ricalarda "Could" her zaman "Can"den daha kibardır.'],
      ['May / Might / Could', 'Mey / Mayt / Kud', 'A2-B1 • Olasılık & Resmi İzin', '-ebilir (Belki, %50 ihtimal)', 'It might rain later. / May I come in?', 'May I...? en resmi izin isteme kalıbıdır.'],
      ['Should / Ought to / Had better', 'Şud / O:t tu / Hed betır', 'A2-B1 • Tavsiye & Uyarı', '-meli / -malı (Yapsan iyi olur)', 'You should rest. / You had better hurry up!', '"Had better" daha güçlüdür; yapmazsan kötü sonuç olur uyarısı taşır!'],
      ['Must vs. Have to', 'Mast vs. Hev tu', 'A2-B1 • Zorunluluk', '-meli / zorunda olmak', 'I must study. / You have to wear a seatbelt.', 'Geçmiş zamanda "Must" yoktur, ikisinin de geçmişi "HAD TO" olur!'],
      ["Mustn't vs. Don't have to", 'Masınt vs. Dont hev tu', 'A2-B1 • Yasak vs. Gerek Yok', 'Yapmamalısın (Yasak!) vs. Yapmana gerek yok', "You mustn't smoke here! vs. You don't have to pay.", 'En çok sorulan sınav sorusudur! Don\'t have to yasak değildir.'],
      ['Must be vs. Can\'t be', 'Mast bi: vs. Kent bi:', 'B1 • Güçlü Çıkarım (Deduction)', '... olmalı (%95 emin) vs. ... olamaz!', "He worked 14 hours; he must be exhausted!", 'Tahmin yürütürken olumlu güçlü çıkarım Must be, olumsuzu Can\'t be\'dir!'],
      ['Should have + V3', 'Şud hev (Şudıv)', 'B2 • Geçmiş Eleştiri / Pişmanlık', '... yapmalıydın (ama yapmadın!)', 'You should have called me earlier.', 'Olumsuzu: Shouldn\'t have V3 (Yapmamalıydın ama yaptın!).'],
      ['Must have + V3 / Can\'t have + V3', 'Mast hev / Kent hev', 'B2 • Geçmiş Güçlü Çıkarım', '... yapmış olmalı / ... yapmış olamaz!', 'The streets are wet; it must have rained last night.', '"HAD TO" geçmiş zorunluluktur; "MUST HAVE V3" geçmiş tahminidir!'],
      ['Could have + V3 / Would have + V3', 'Kud hev / Vud hev', 'B2 • Geçmiş Kaçan İhtimal', '... yapabilirdim (imkan vardı ama yapmadım)', 'I could have bought that car, but I didn\'t.', 'Geçmişte elinde fırsat olup da gerçekleşmeyen durumları anlatır.']
    ],
    liveExamples: [
      { en: "You don't have to wait for me, and you shouldn't have worried.", trRead: 'Yu dont hev tı veyt for mi, end yu şudınt hev vörid.', tr: 'Beni beklemene gerek yok ve endişelenmemeliydin.' }
    ]
  },
  {
    id: 'tag-questions-so-neither',
    level: 'B1',
    category: 'Konuşma Yapıları (A2-B1)',
    title: '12. Tag Questions (Değil mi?), "So do I / Neither do I" & "Both / Either / Neither" Tablosu',
    subtitle: 'Ders 71, 118 & 203-206: Günlük sohbette onay alma, "Ben de / Ben de değil" deme ve iki seçenekten bahsetme.',
    howToUse: [
      '🔄 Tag Questions (Değil mi?): Cümle OLUMLU (+) ise kuyruk OLUMSUZ (-); cümle OLUMSUZ (-) ise kuyruk OLUMLU (+) olur! Cümlenin yardımcı fiili aynen kullanılır.',
      '🤝 Ben de / Ben de değil: Olumlu cümleye katılırken "SO + Yardımcı Fiil + I" (So am I / So do I). Olumsuz cümleye katılırken "NEITHER + Olumlu Yardımcı Fiil + I" (Neither am I / Neither do I).',
      '⚖️ 2 Şey İçin: BOTH = Her ikisi de (+) | EITHER = İkisinden biri | NEITHER = İkisinden hiçbiri (Tekil fiil alır ve cümleyi olumsuz yapar!).'
    ],
    headers: ['Yapı / Konu', 'Altın Kural / Formül', 'Canlı Örnek 1', 'Canlı Örnek 2', 'Türkçe Karşılığı & İpucu'],
    rows: [
      ['Tag Questions (+ → -)', 'Olumlu Cümle, olumsuz yardımcı fiil + zamir?', "You speak English, don't you?\nShe is a doctor, isn't she?", "They went home, didn't they?\nI am right, aren't I? (İstisna!)", '"I am" cümlesinin soru kuyruğu "am not I" değil, "AREN\'T I?" olur!'],
      ['Tag Questions (- → +)', 'Olumsuz Cümle, olumlu yardımcı fiil + zamir?', "You don't smoke, do you?\nHe hasn't called, has he?", "Let's go out, shall we?\nOpen the window, will you?", '"Let\'s" ile başlayan önerilerin kuyruğu her zaman "shall we?" olur.'],
      ['So do I / Neither do I', 'So + Aux + Özne (Ben de!)\nNeither + Aux + Özne (Ben de değil!)', 'A: I love coffee. → B: So do I!\nA: I am tired. → B: So am I!', "A: I don't like tea. → B: Neither do I!\nA: I can't swim. → B: Neither can I!", 'Yardımcı fiil neyse (am, do, did, can, have) cevaba da o taşınır!'],
      ['Both ... and ...', 'Her ikisi de (Çoğul fiil alır)', 'Both Ali and Ayşe are here.', 'I speak both English and Turkish.', 'Hem ... hem de ... anlamı verir, fiil çoğul (are/have) olur.'],
      ['Either ... or ...', 'Ya ... ya da ... (İkisinden biri)', 'You can have either tea or coffee.', 'Either you or he is wrong.', 'Olumsuz cümlede "I don\'t like it either" = Ben de sevmiyorum demektir.'],
      ['Neither ... nor ...', 'Ne ... ne de ... (İkisi de değil!)', 'Neither Ali nor Ayşe came.', 'Neither of the answers is correct.', 'Kendi içinde olumsuzdur, yanına tekrar "not" ALMAZ!']
    ],
    liveExamples: [
      { en: "You're coming to the meeting, aren't you? Neither of us wants to be late.", trRead: 'Yu a:r kaming tı đı mi:ting, a:rnt yu? Nayđır ov as vonts tı bi: leyt.', tr: 'Toplantıya geliyorsun, değil mi? İkimiz de geç kalmak istemiyoruz.' }
    ]
  },
  {
    id: 'perfect-adverbs-for-since',
    level: 'B1',
    category: 'Present Perfect (B1)',
    title: '13. Present Perfect Zarfları (Just, Already, Yet, Ever, Never) & For vs. Since Tablosu',
    subtitle: 'Ders 101-105 & 130-134: Geçmişle bugünü bağlayan zaman zarflarının cümledeki tam yeri ve anlamları.',
    howToUse: [
      '⏳ FOR vs. SINCE: FOR = Toplam SÜRE (for 3 hours, for 5 years, for a long time) | SINCE = Başlangıç NOKTASI (since Monday, since 2020, since I was a child).'
    ],
    headers: ['Zarf / Edat', 'Okunuşu', 'Anlamı', 'Cümledeki Yeri', 'Örnek Cümle ve Çevirisi'],
    rows: [
      ['Just', 'Cast', 'Az önce, henüz yeni', 'have/has ile V3 ARASINA (+)', 'I have just finished my lunch.\n(Öğle yemeğimi az önce bitirdim.)'],
      ['Already', 'Olredi', 'Çoktan, bile', 'have/has ile V3 ARASINA (+)', 'She has already sent the email.\n(E-postayı çoktan gönderdi.)'],
      ['Yet', 'Yet', 'Henüz (Olumsuz) / Şimdiye dek (?)', 'Cümlenin EN SONUNA (- ve ?)', "I haven't decided yet. / Have you eaten yet?\n(Henüz karar vermedim. / Yemek yedin mi?)"],
      ['Ever / Never', 'Evır / Nevır', 'Hiç (Hayatında) / Asla', 'have/has ile V3 ARASINA', 'Have you ever tried sushi? I have never tried it.\n(Hiç suşi denedin mi? Asla denemedim.)'],
      ['FOR (+ Süreç)', 'Fo:r', '...-dir / ... boyunca', 'Toplam zaman uzunluğu önünde', 'We have lived here for ten years.\n(10 yıldır burada yaşıyoruz.)'],
      ['SINCE (+ Başlangıç)', 'Sins', '...-den beri', 'Başlangıç tarihi veya Past Simple önünde', 'I have known him since 2018 (since we met).\n(Onu 2018\'den / tanıştığımızdan beri tanıyorum.)']
    ],
    liveExamples: [
      { en: "I have worked here since 2022, so I've been here for four years.", trRead: 'Ay hev vörkt hiır sins tventi tventi-tu:, sou ayv bi:n hiır for fo:r yiırz.', tr: '2022\'den beri (since) burada çalışıyorum, yani dört yıldır (for) buradayım.' }
    ]
  },
  {
    id: 'used-to-preferences-other',
    level: 'B1',
    category: 'Alışkanlık & Tercih (B1)',
    title: '14. Used to / Be used to / Get used to, Tercihler (Prefer/Would rather) & Another/Other Tablosu',
    subtitle: 'Ders 95, 119-120 & 156: Eskiden yapılan alışkanlıklar, bir şeye alışkın olmak, tercih bildirmek ve "diğer/başka" kelimeleri.',
    howToUse: [
      '⚠️ Dev Tuzak: "Used to + V1" = Eskiden yapardım (artık yapmıyorum). AMA önünde am/is/are veya get varsa: "Be/Get used to + V-ing / İsim" = Bir şeye alışkın olmak / alışmak demektir!',
      '🔄 Another vs. Other: Another = Tekil "bir başka/bir tane daha" (an + other) | Other = Çoğul isimlerle "diğer..." (other people) | The other = İki şeyden geri kalan "öteki".'
    ],
    headers: ['Yapı / Kalıp', 'Formül (Yanına Ne Alır?)', 'Türkçe Anlamı', 'Canlı Örnek Cümle', 'Türkçe Çevirisi'],
    rows: [
      ['Used to', 'used to + Yalın Fiil (V1)\n(Olumsuz: didn\'t use to)', 'Eskiden ... yapardım (Artık bitti)', 'I used to smoke, but I quit last year.', 'Eskiden sigara içerdim ama geçen yıl bıraktım.'],
      ['Be used to', 'am/is/are used to + V-ing / İsim', '...-ya alışkın olmak (Zor gelmemek)', 'I am used to waking up early.', 'Erken uyanmaya alışkınım.'],
      ['Get used to', 'get used to + V-ing / İsim', '...-ya alışmak (Süreç)', 'You will get used to living in London.', 'Londra\'da yaşamaya alışacaksın.'],
      ['Prefer', 'prefer + V-ing TO V-ing\nprefer to V1 rather than V1', '...-yı ...-ya tercih etmek (Genel)', 'I prefer drinking tea to drinking coffee.', 'Çay içmeyi kahve içmeye tercih ederim (arada TO!).'],
      ['Would rather', 'would rather + Yalın Fiil (V1) ... than', '... yapmayı tercih ederim (Anlık)', 'I would rather stay home tonight than go out.', 'Bu gece dışarı çıkmaktansa evde kalmayı tercih ederim.'],
      ['Another', 'another + Tekil İsim', 'Başka bir ... / Bir tane daha', 'Can I have another cup of coffee?', 'Bir fincan kahve daha alabilir miyim?'],
      ['Other / Others', 'other + Çoğul İsim\nothers (Tek başına zamir)', 'Diğer ...-lar / Diğerleri', 'Some people like summer; others prefer winter.', 'Bazı insanlar yazı sever; diğerleri kışı tercih eder.'],
      ['Each other / One another', 'İşteşlik Zamiri', 'Birbirini / Birbirine', 'We help each other every day.', 'Her gün birbirimize yardım ederiz.']
    ],
    liveExamples: [
      { en: 'I used to drink a lot of coffee, but now I prefer herbal tea.', trRead: 'Ay yu:st tı drink ı lot ov kofi, bat nau ay priför hörbıl ti:.', tr: 'Eskiden çok kahve içerdim ama şimdi bitki çayını tercih ediyorum.' }
    ]
  },
  {
    id: 'gerunds-infinitives-table',
    level: 'B1',
    category: 'Gerund & Infinitive (B1-B2)',
    title: '15. Fiilimsiler (Gerund V-ing vs. Infinitive To V1) & Anlam Değiştiren Fiiller Tablosu',
    subtitle: 'Ders 124: İki fiil yan yana geldiğinde ikincisi "-ing" mi alır yoksa "to" mu? Stop, Remember, Forget, Try nasıl anlam değiştirir?',
    howToUse: [
      '🟢 Edatlardan (in, on, at, of, for, about, without, before, after) sonra gelen her fiil %100 "-ING" alır! (Thank you for helping me / Good at speaking).',
      '🔵 Sıfatlardan (easy, hard, happy, important) sonra gelen fiil ve "Amaç (mek için)" bildiren fiil "TO + V1" alır! (It is easy to learn / I came here to help).'
    ],
    headers: ['Kategori', 'Kural / Fiil Grubu', 'Örnek Fiiller', 'Canlı Örnek Cümle', 'Türkçe Mantığı & Anlam Farkı'],
    rows: [
      ['Sadece V-ING Alanlar (Gerund)', 'Fiil + V-ing', 'enjoy, avoid, mind, suggest, finish, keep, admit, practice, miss', 'I enjoy learning new languages.\nWould you mind opening the window?', 'Keyif alma, kaçınma, bitirme ve devam etme fiilleri -ing sever.'],
      ['Sadece TO + V1 Alanlar (Infinitive)', 'Fiil + to V1', 'want, decide, hope, plan, promise, refuse, offer, manage, afford', 'We decided to move to another city.\nI promise to call you.', 'Geleceğe yönelik istek, plan, karar ve söz fiilleri "to" alır.'],
      ['🔥 STOP + V-ing vs. STOP + to V1', 'Anlam Tamamen Değişir!', 'stop doing (bırakmak)\nstop to do (yapmak için durmak)', 'He stopped smoking (Sigarayı bıraktı).\nHe stopped to smoke (Sigara içmek için durdu).', '-ing geçmişten gelen alışkanlığı bitirir; "to" ise amaç bildirir!'],
      ['🔥 REMEMBER / FORGET', 'Anlam Tamamen Değişir!', '+ V-ing (Yaptığını hatırlamak)\n+ to V1 (Yapmayı hatırlamak - görev)', 'I remember locking the door (Kilitlediğim an aklımda).\nRemember to lock the door! (Kilitlemeyi unutma!)', 'Önce yapıp sonra hatırlıyorsan -ing; önce hatırlayıp sonra yapacaksan to V1!'],
      ['🔥 TRY + V-ing vs. TRY + to V1', 'Anlam Değişir!', 'try doing (deneyip görmek)\ntry to do (çabalamak, uğraşmak)', 'Try restarting the PC (Yeniden başlatmayı bir dene).\nI tried to lift it (Kaldırmaya çabaladım).', 'Çözüm yöntemi denemek -ing; zor bir işe güç harcamak to V1.']
    ],
    liveExamples: [
      { en: 'Please remember to send the file before leaving the office.', trRead: 'Pli:z rimembır tı send đı fayl bifo:r li:ving đi ofis.', tr: 'Ofisten ayrılmadan önce dosyayı göndermeyi lütfen unutma.' }
    ]
  },
  {
    id: 'reported-speech-causatives',
    level: 'B2',
    category: 'Dolaylı Anlatım & Ettirgen (B1-B2)',
    title: '16. Dolaylı Anlatım (Reported Speech), Dolaylı Sorular & Ettirgen Çatı (Causatives)',
    subtitle: 'Ders 214-215, 232-234 & 244: Birinin sözünü aktarma (Zaman kayması tablosu) ve bir işi başkasına yaptırma (Have something done).',
    howToUse: [
      '🗣️ Reported Speech (Bir derece geçmişe kaydırma): Present Simple → Past Simple | Present Continuous → Past Continuous | Will → Would | Can → Could | Past / Present Perfect → Past Perfect (Had V3).',
      '❓ Indirect Questions (Dolaylı Kibar Sorular): Cümle ortasına giren soruda yardımcı fiil başa gelmez, DÜZ CÜMLE sırası kullanılır! (Where is the bank? → Could you tell me where the bank IS?).',
      '🛠️ Causatives (Ettirgen): İşi kendin değil ustaya/berbere yaptırıyorsan: "HAVE + Nesne + V3" (I had my hair cut = Saçımı kestirdim).'
    ],
    headers: ['Yapı / Konu', 'Doğrudan / Normal Hali', 'Dönüşmüş / İleri Hali', 'Türkçe Karşılığı ve Mantığı'],
    rows: [
      ['Reported Speech: Zaman Kayması', '"I am busy now," he said.\n"I will call you tomorrow," she said.', 'He said (that) he was busy then.\nShe told me she would call me the next day.', 'now → then | today → that day | tomorrow → the next day | yesterday → the day before.'],
      ['Reported Questions (Soru Aktarımı)', '"Where do you live?" he asked.\n"Are you ready?" she asked.', 'He asked me where I lived.\nShe asked if/whether I was ready.', 'Soru aktarılırken do/does/did kalkar, cümle düz olumlu sırasına döner! Evet/Hayır sorularında IF/WHETHER kullanılır.'],
      ['Indirect Questions (Kibar Soru)', 'What time does it start?\nWhere is the station?', 'Do you know what time it starts?\nCould you tell me where the station is?', '"Do you know / Could you tell me" eklendiğinde geri kalan kısım soru olmaktan çıkar, düz dizilir!'],
      ['Causative 1: Have/Get + Nesne + V3', 'Ustaya/Uzmana bir iş yaptırmak', 'I had my car repaired yesterday.\nI am going to get my hair cut.', 'Dün arabamı tamir ettirdim. / Saçımı kestireceğim.'],
      ['Causative 2: Kişi belirterek yaptırma', 'Have + Kişi + V1 (Görev vermek)\nGet + Kişi + to V1 (İkna etmek)\nMake + Kişi + V1 (Zorlamak) | Let + Kişi + V1 (İzin vermek)', 'The boss made us work late.\nMy father let me use his car.', 'Make ve Let yanına "to" ALMAZ (make him do / let him go)! Get ise "to" alır (get him to do).']
    ],
    liveExamples: [
      { en: 'Could you tell me where the manager is? I need to have this document signed.', trRead: 'Kud yu tel mi veır đı menıcır iz? Ay ni:d tı hev đis dokyumınt saynd.', tr: 'Müdürün nerede olduğunu söyleyebilir misiniz? Bu belgeyi imzalatmam gerekiyor.' }
    ]
  },
  {
    id: 'order-of-adjectives-intensifiers',
    level: 'B2',
    category: 'Sıfat Sıralaması & Pekiştirici (B2)',
    title: '17. Sıfat Sıralaması (Order of Adjectives: OSASCOMP) & Pekiştiriciler (Intensifiers)',
    subtitle: 'Ders 197 & 201: Bir ismin önüne birden fazla sıfat geldiğinde hangi sırayla dizilir? (Opinion → Size → Age → Shape → Color → Origin → Material → Purpose).',
    howToUse: [
      '🌈 OSASCOMP Şifresi: Önce Kişisel Fikir (beautiful), sonra Boyut (small), Yaş (old), Şekil (round), Renk (black), Köken/Ülke (Italian), Malzeme (wooden) ve en son Amaç (coffee table) gelir!'
    ],
    headers: ['Sıra No & Kodu', 'Sıfat Kategorisi', 'Örnek Sıfatlar', 'Birleşik Örnek Dizilim'],
    rows: [
      ['1. Opinion (Fikir)', 'Kişisel görüş, yorum', 'beautiful, nice, ugly, delicious, amazing', 'a beautiful (1)...'],
      ['2. Size (Boyut)', 'Büyüklük, uzunluk', 'big, small, large, tiny, tall, huge', '... small (2)...'],
      ['3. Age (Yaş)', 'Eskilik, yenilik, yaş', 'old, new, young, ancient, modern', '... old (3)...'],
      ['4. Shape (Şekil)', 'Biçim, geometri', 'round, square, flat, rectangular', '... round (4)...'],
      ['5. Color (Renk)', 'Renk tonları', 'black, red, white, dark blue', '... brown (5)...'],
      ['6. Origin (Köken)', 'Ülke, millet, bölge', 'Turkish, Italian, British, Japanese', '... Italian (6)...'],
      ['7. Material & 8. Purpose', 'Malzeme + Kullanım Amacı', 'wooden, metal, silk, leather + sleeping (bag), coffee (table)', '... wooden (7) coffee (8) table!'],
      ['🔥 Intensifiers (Pekiştiriciler)', 'Normal vs. Güçlü (Strong) Sıfatlar', 'very tired → absolutely exhausted\nvery cold → absolutely freezing\nvery good → absolutely fantastic', 'Güçlü sıfatlarla (exhausted, freezing, huge) "very" kullanılmaz; "absolutely / completely / totally" kullanılır!']
    ],
    liveExamples: [
      { en: 'She bought a beautiful small old round brown Italian wooden table.', trRead: 'Şi: bo:t ı byu:tifıl smo:l ould raund braun İtelyın vudın teybıl.', tr: 'Güzel, küçük, eski, yuvarlak, kahverengi, İtalyan ahşap bir masa satın aldı.' }
    ]
  },
  {
    id: 'phrasal-verbs-by-preposition',
    level: 'B2',
    category: 'Phrasal Verbs (B1-C1)',
    title: '18. Edatlara Göre Phrasal Verbs Ana Tablosu (TO, FOR, FROM, AT, ON, ABOUT, WITH, IN)',
    subtitle: 'Ders 88, 178-188 & 278: Edatlarına göre gruplanmış en sık kullanılan deyimsel fiiller ve iş İngilizcesi Phrasal Verb\'leri.',
    howToUse: [
      '💡 Edatların Gizli Mantığı: ON genelde "devam etme / giyme / açma", OFF "kesilme / ayrılma / iptal", UP "tamamlama / artış", OUT "dışarı çıkarma / çözme" anlamı katar!'
    ],
    headers: ['Edat Grubu', 'Phrasal Verb', 'Okunuşu', 'Türkçe Anlamı', 'Canlı Cümle Örneği'],
    rows: [
      ['TO Grubu', 'Look forward to (+ V-ing)\nGet back to / Lead to', 'Luk fo:rvırd tu\nGet bek tu / Li:d tu', 'Dört gözle beklemek\nGeri dönüş yapmak / Yol açmak', 'I look forward to hearing from you.\n(Sizden haber almayı dört gözle bekliyorum.)'],
      ['FOR Grubu', 'Look for / Apply for\nAccount for / Stand for', 'Luk fo:r / Iplay fo:r\nIkaunt fo:r / Stend fo:r', 'Aramak / Başvurmak\nAçıklamak, oluşturmak / Temsil etmek', 'She applied for a new job.\nWhat does "VIP" stand for?'],
      ['FROM Grubu', 'Suffer from / Recover from\nPrevent from / Tell apart from', 'Safır from / Rikavır from\nPrivent from', '-den muzdarip olmak / İyileşmek\nEngellemek / Ayırt etmek', 'He quickly recovered from the flu.'],
      ['AT & ON Grubu', 'Aim at / Look at\nCarry on / Keep on / Rely on / Put on', 'Eym et | Keri on\nKi:p on / Rilay on / Put on', 'Hedeflemek | Devam etmek\nGüvenmek, bel bağlamak / Giymek', 'Carry on with your good work!\nYou can always rely on me.'],
      ['ABOUT & WITH Grubu', 'Bring about / Care about\nDeal with / Put up with / Come up with', 'Bring ıbaut | Di:l viđ\nPut ap viđ / Kam ap viđ', 'Sebep olmak, getirmek | İlgilenmek, çözmek\nKatlanmak, tahammül etmek / Fikir bulmak', "I can't put up with this noise anymore.\nShe came up with a brilliant idea!"],
      ['IN, OUT & OFF Grubu', 'Give in / Hand in\nFigure out / Run out of\nPut off / Call off / Take off', 'Giv in | Figyır aut\nRan aut ov | Put of / Ko:l of', 'Pes etmek / Teslim etmek\nÇözmek, anlamak / Tüketmek\nErtelemek / İptal etmek / Havalanmak', "Don't put off until tomorrow what you can do today.\nWe ran out of milk."]
    ],
    liveExamples: [
      { en: 'We need to figure out this problem and come up with a solution.', trRead: 'Vi: ni:d tı figyır aut đis prablım end kam ap viđ ı sılu:şın.', tr: 'Bu sorunu çözmemiz ve yeni bir çözüm bulmamız gerekiyor.' }
    ]
  },
  {
    id: 'make-vs-do-collocations',
    level: 'B1',
    category: 'Make vs. Do & Collocations',
    title: '19. "Make vs. Do" Farkı, Eşdizimler (Collocations) & Sık Karıştırılan/Yanlış Okunan Kelimeler',
    subtitle: 'Ders 27, 129, 162-165, 175 & 227: İkisi de "yapmak" demek ama hangisi nerede kullanılır? En çok yanlış telaffuz edilen kelimeler nelerdir?',
    howToUse: [
      '🔨 MAKE = Ortaya yeni bir ürün çıkarmak, üretmek, yemek/içecek hazırlamak ve iletişim/karar eylemleri (make a cake, make a decision, make a mistake, make money).',
      '📋 DO = Genel iş, görev, ödev, temizlik ve rutin aktiviteler (do homework, do business, do a favor, do your best, do the dishes).'
    ],
    headers: ['Kategori', 'İngilizce İfadeler', 'Türkçe Karşılıkları', 'Neden Bu Fiil Kullanılır? / Okunuş Doğrusu'],
    rows: [
      ['MAKE ile Kalıplaşanlar', 'make a mistake | make a decision | make a phone call | make money | make friends | make sure | make an effort | make noise', 'hata yapmak | karar vermek | telefon etmek | para kazanmak | arkadaş edinmek | emin olmak | çaba göstermek | gürültü yapmak', 'Yeni bir sonuç, ses, karar veya ilişki "üretildiği" için MAKE kullanılır.'],
      ['DO ile Kalıplaşanlar', 'do homework | do business | do a favor | do your best | do the shopping/dishes | do exercise | do harm/good', 'ödev yapmak | iş yapmak | iyilik yapmak | elinden geleni yapmak | alışveriş/bulaşık yapmak | egzersiz yapmak', 'Mevcut bir görev veya eylem yerine getirildiği için DO kullanılır.'],
      ['Popüler Verb Collocations', 'take a break / take a risk | have a good time | pay attention | save time | catch a cold | keep a promise | break the rules', 'mola vermek / risk almak | iyi vakit geçirmek | dikkat vermek | zamandan tasarruf etmek | soğuk algınlığı kapmak | söz tutmak', 'Bu kelimeler Türkçeden birebir çevrilmez, kalıp (collocation) olarak birlikte yaşarlar.'],
      ['En Çok Karıştırılan Kelimeler', 'affect (etkilemek - fiil) vs. effect (etki - isim)\nadvice (tavsiye - isim) vs. advise (tavsiye etmek - fiil)\nborrow (ödünç almak) vs. lend (ödünç vermek)\nfun (eğlenceli) vs. funny (komik/tuhaf)', 'His words affected me (Fiil) vs. A positive effect (İsim).\nCan I borrow your pen? vs. Can you lend me your pen?', 'Accept (Kabul etmek) vs. Except (Hariç) | Lose (Kaybetmek) vs. Loose (Gevşek/Bol).'],
      ['Sık Yanlış Telaffuz Edilenler (Ders 175)', 'Comfortable | Vegetable | Wednesday | Receipt | Debt | Doubt | Subtle | Island | Colonel | Queue', 'Kamftıbıl (4 değil 3 hece!) | Vectıbıl | Venzdey | Risi:t (p okunmaz) | Det (b okunmaz) | Daut (b okunmaz) | Satıl | Aylınd | Körnıl | Kyu:', 'Bu kelimelerde ortadaki harfler tamamen yutularak okunur!']
    ],
    liveExamples: [
      { en: 'Everyone makes mistakes, so just do your best and pay attention.', trRead: 'Evrivan meyks misteyks, sou cast du yo:r best end pey ıtenşın.', tr: 'Herkes hata yapar (make), bu yüzden sadece elinden geleni yap (do) ve dikkatini ver.' }
    ]
  },
  {
    id: 'relative-clauses-connectors',
    level: 'B1',
    category: 'Relative & Bağlaçlar (B1-B2)',
    title: '20. İlgi Zamirleri (Who / Which / That / Where / Whose) & İleri Bağlaçlar Tablosu',
    subtitle: 'Ders 208, 229-231 & 235: Kısa cümleleri birleştirip Türkçedeki "-an / -en / -dığı" şeklinde uzun ve akıcı cümleler kurma anahtarı.',
    howToUse: [
      '🔗 İnsanı tanımlarken hemen arkasına WHO veya THAT getirilir (The man WHO called me = Beni arayan adam).',
      '🔗 Cansız nesneyi tanımlarken WHICH veya THAT getirilir. Virgüllü ek bilgi cümlelerinde (Non-defining) "THAT" kullanılmaz, sadece who/which kullanılır!'
    ],
    headers: ['Yapı / Bağlaç', 'Okunuşu', 'Görev & Anlamı', 'Kuralı / Yanına Ne Alır?', 'Örnek Cümle ve Türkçe Mantığı'],
    rows: [
      ['Who / That', 'Hu: / Đet', '...-an / -en (İnsanlar)', 'İnsan özneleri/nesneleri', 'The woman who lives next door is a doctor.\n(Yan dairede yaşayan kadın doktordur.)'],
      ['Which / That', 'Viç / Đet', '...-an / -en / -dığı (Cansız)', 'Eşya, kavram, hayvan', 'The computer which I bought yesterday is fast.\n(Dün satın aldığım bilgisayar hızlı.)'],
      ['Where / When / Whose', 'Veır / Ven / Hu:z', '...-dığı yer / zaman / ...-sı olan', 'Mekan / Zaman / Sahiplik', 'This is the cafe where we first met.\nI met a guy whose brother works at Google.'],
      ['Although / Even though', 'O:lđou / İ:vın đou', '-e rağmen', '+ Tam Cümle (Özne + Yüklem)', 'Although it rained heavily, we went out.\n(Şiddetli yağmur yağmasına rağmen dışarı çıktık.)'],
      ['Despite / In spite of', 'Dispayt / İn spayt ov', '-e rağmen', '+ İsim / V-ing (veya the fact that)', 'Despite the heavy rain, we went out.\n(Şiddetli yağmura rağmen dışarı çıktık.)'],
      ['Because of / Due to / Owing to', 'Bikoz ov / Dyu: tu', '-den dolayı, yüzünden', '+ İsim Grubu', 'The flight was delayed due to bad weather.\n(Uçuş kötü hava nedeniyle ertelendi.)'],
      ['However / Nevertheless', 'Hauevır / Nevırđıles', 'Ancak, bununla birlikte, yine de', 'İki cümle arası zıtlık geçişi', 'The test was hard; however, everyone passed.\n(Test zordu; ancak herkes geçti.)'],
      ['Therefore / Consequently', 'Đeırfo:r / Kansıkvıntli', 'Bu yüzden, dolayısıyla, sonuç olarak', 'Sebep → Sonuç bağlacı', 'He didn\'t study; therefore, he failed.\n(Çalışmadı; dolayısıyla başarısız oldu.)']
    ],
    liveExamples: [
      { en: 'Although the project was difficult, we finished it on time.', trRead: 'O:lđou đı procekt voz difikılt, vi: finişt it on taym.', tr: 'Proje zor olmasına rağmen zamanında bitirdik.' }
    ]
  },
  {
    id: 'c1-c2-advanced-structures',
    level: 'C1',
    category: 'C1-C2 İleri Yapılar',
    title: '21. C1-C2 İleri Gramer: Inversion (Devrik), Cleft (Vurgu), Reduced Clauses & Subjunctive',
    subtitle: 'Ders 237-243 & 264: IELTS, TOEFL, YDS ve üst düzey profesyonel iletişimde fark yaratan C1-C2 cümle yapıları.',
    howToUse: [
      '🔄 Inversion (Devrik Cümle): Olumsuz veya kısıtlayıcı zarflar (Never, Rarely, Seldom, Not only, Hardly, Little) vurgu için cümlenin EN BAŞINA alınırsa, cümle soruymuş gibi devrilir: [Zarf + Yardımcı Fiil + Özne + Fiil]!',
      '🎯 Cleft Sentences (Ayrık Odak): Cümledeki tek bir öğeyi spot ışığı altına almak için "It was [X] that..." veya "What I need is [X]" kullanılır.',
      '✂️ Reduced Relative Clauses (İndirgeme): "Who/Which + be" atılır; cümle aktifse V-ING ("The boy playing..."), pasifse V3 ("The car made in...") kalır!'
    ],
    headers: ['İleri Yapı (C1-C2)', 'Normal Cümle (B1-B2)', 'C1-C2 Dönüşmüş / Vurgulu Hali', 'Türkçe Anlamı & Kurulum Sırrı'],
    rows: [
      ['Inversion 1: Never / Rarely / Seldom', 'I have never seen such a great system.\nShe rarely goes out at night.', 'Never have I seen such a great system!\nRarely does she go out at night.', 'Böylesine harika bir sistemi hayatımda hiç görmedim! (Yardımcı fiil özneden önceye geçti).'],
      ['Inversion 2: Not only ... but also', 'He not only speaks English, but he also writes well.', 'Not only does he speak English, but he also writes well.', 'Sadece İngilizce konuşmakla kalmıyor, aynı zamanda iyi yazıyor.'],
      ['Cleft Sentence 1: It-Cleft', 'John broke the window yesterday.', 'It was John who broke the window yesterday.', 'Dün camı kıran kişi (başkası değil) John\'du!'],
      ['Cleft Sentence 2: What-Cleft', 'I really need a long vacation.', 'What I really need is a long vacation.', 'Gerçekten ihtiyacım olan şey uzun bir tatil.'],
      ['Reduced Clause (Aktif → V-ing)', 'The woman who is talking to the manager is my boss.', 'The woman talking to the manager is my boss.', 'Müdürle konuşan kadın benim patronum. (who is atıldı!).'],
      ['Reduced Clause (Pasif → V3)', 'The books which were written by him are famous.', 'The books written by him are famous.', 'Onun tarafından yazılan kitaplar ünlüdür. (which were atıldı!).'],
      ['Participle Clause (Having + V3)', 'After I had finished my work, I went home.', 'Having finished my work, I went home.', 'İşimi bitirdikten sonra eve gittim.'],
      ['Subjunctive Mood (İstek Kipi)', 'It is important that he comes on time.', 'It is essential that he BE on time. (be / come — ek almaz!)', 'Zamanında orada olması şarttır. (important, vital, suggest, insist sonrasında tüm öznelerle yalın fiil!).'],
      ['Formal vs. Informal Register (C2)', 'ask for → request | help → assist | tell → inform | get → obtain | think about → consider | start → commence', 'Please let us know if you need help. (Informal)\nPlease inform us should you require further assistance. (Formal C2)', 'Resmi yazışmalarda Phrasal Verb yerine tek kelimelik Latince kökenli fiiller tercih edilir.']
    ],
    liveExamples: [
      { en: 'Never have I seen such an effective method; what you need is daily practice.', trRead: 'Nevır hev ay si:n saç en ifektiv meθıd; vat yu ni:d iz deyli prektis.', tr: 'Böylesine etkili bir yöntemi hiç görmedim; ihtiyacın olan şey günlük pratik.' }
    ]
  }
];

// ============================================================================
// BÖLÜM SONU SINAVLARI (SINAV 1: A1-A2, SINAV 2: PAST MODALS, SINAV 3: B1-B2, SINAV 4: C1-C2)
// ============================================================================
export const LEVEL_EXAMS = [
  {
    id: 'exam-a1-a2',
    title: 'Sınav 1: A1-A2 Bölüm Sonu Kapsamlı Seviye Sınavı',
    level: 'A1-A2',
    description: 'Alfabe/Fonetik, Zamirler, To Be, Artikeller, Çoğullar, Miktar, Sıfat Kıyaslama, Modallar ve Temel Zamanlar.',
    questions: [
      {
        q: '1. "Wait _____ hour! My sister is _____ university student." boşluklarına sırasıyla hangisi gelmelidir?',
        options: ['a / an', 'an / a', 'an / an', 'the / an'],
        answer: 1,
        explanation: '"Hour" (/aʊər/) sessiz H ile başlar, ünlü ses çıktığı için "an hour" olur. "University" (/juː.../) Y ünsüz sesiyle okunduğu için "a university" olur!'
      },
      {
        q: '2. "This is _____ bag, and that one over there is _____." (Bu benim çantam, şuradaki ise seninki.)',
        options: ['mine / your', 'my / yours', 'me / yours', 'my / your'],
        answer: 1,
        explanation: 'İsimden önce İyelik Sıfatı (my bag), tek başına ismin yerine ise İyelik Zamiri (yours) kullanılır.'
      },
      {
        q: '3. "She _____ coffee at night because she _____ sleeping early." (Geniş Zaman)',
        options: ["don't drink / like", "doesn't drinks / likes", "doesn't drink / likes", "isn't drink / like"],
        answer: 2,
        explanation: 'He/She/It olumsuzda "doesn\'t + yalın fiil (drink)", olumluda ise "fiil + s (likes)" alır.'
      },
      {
        q: '4. "Where _____ you go yesterday? I _____ see you at the office."',
        options: ["did / didn't", "were / wasn't", "do / don't", "did / wasn't"],
        answer: 0,
        explanation: 'Geçmiş zamanda eylem fiilleri (go, see) ile soruda "did", olumsuzda "didn\'t + V1" kullanılır.'
      },
      {
        q: '5. "Health is _____ than money, and this is _____ day of my life!"',
        options: ['more important / the happiest', 'importanter / happier', 'most important / the most happy', 'as important / the happier'],
        answer: 0,
        explanation: 'Uzun sıfatta "more important than", sonu -y ile biten kısa üstünlük sıfatında "the happiest" kullanılır.'
      },
      {
        q: '6. "You _____ smoke at the hospital; it is forbidden! However, you _____ wear a suit; casual clothes are fine."',
        options: ["don't have to / mustn't", "mustn't / don't have to", "shouldn't / must", "can't / have to"],
        answer: 1,
        explanation: 'Yasak bildirmek için "mustn\'t", zorunluluk olmadığını (gerek yok) bildirmek için "don\'t have to" kullanılır.'
      }
    ]
  },
  {
    id: 'exam-b1-b2',
    title: 'Sınav 2 & 3: B1-B2 ve Past Modals Bölüm Sonu Sınavı',
    level: 'B1-B2',
    description: 'Present Perfect, For/Since, Used to, Gerund/Infinitive, Conditionals, Passive Voice, Relative Clauses, Past Modals ve Causatives.',
    questions: [
      {
        q: '1. "I _____ my keys! I _____ them anywhere since Monday."',
        options: ["lost / didn't see", "have lost / haven't seen", "had lost / don't see", "lose / haven't saw"],
        answer: 1,
        explanation: 'Şu anki sonucu devam eden olaylarda ve "since Monday" (Pazartesiden beri) ifadesiyle Present Perfect (have/has V3) kullanılır.'
      },
      {
        q: '2. "I _____ waking up early now, although I _____ sleep until noon when I was a student."',
        options: ['used to / am used to', 'am used to / used to', 'use to / was used to', 'get used to / use to'],
        answer: 1,
        explanation: 'Şu an alışkın olmak: "am used to + V-ing". Eskiden yapılan alışkanlık: "used to + V1".'
      },
      {
        q: '3. "If I _____ you, I _____ accept that offer immediately." (Type 2 - Hayali Durum)',
        options: ['am / will', 'was / would have', 'were / would', 'had been / would'],
        answer: 2,
        explanation: 'Second Conditional (Type 2) hayali durumda "If I were you, I would + V1" kalıbı kullanılır.'
      },
      {
        q: '4. "The streets are completely wet this morning; it _____ heavily last night." (Past Modals Çıkarım)',
        options: ['should have rained', 'must have rained', 'could rain', 'had to rain'],
        answer: 1,
        explanation: 'Geçmişteki güçlü bir kanıta dayanarak "kesin öyle olmuş olmalı" çıkarımı yaparken "must have + V3" kullanılır.'
      },
      {
        q: '5. "Could you tell me where _____? I need to _____ before 5 PM." (Indirect Question & Causative)',
        options: ['is the bank / have signed this', 'the bank is / have this document signed', 'the bank is / make this document sign', 'was the bank / get signed this'],
        answer: 1,
        explanation: 'Dolaylı soruda "where the bank is" düz sıra izler; ettirgen çatıda "have + nesne + V3 (have this document signed)" kullanılır.'
      }
    ]
  },
  {
    id: 'exam-c1-c2',
    title: 'Sınav 4: C1-C2 İleri Seviye & Uzmanlık Sınavı',
    level: 'C1-C2',
    description: 'Inversion (Devrik Yapılar), Cleft Sentences, Reduced Relative Clauses, Subjunctive Mood ve İleri Bağlaçlar.',
    questions: [
      {
        q: '1. "Never _____ such a comprehensive English platform before!" (Inversion - Devrik Vurgu)',
        options: ['I have seen', 'have I seen', 'did I saw', 'I had seen'],
        answer: 1,
        explanation: '"Never" vurgu için cümle başına geldiğinde yardımcı fiil özneden önceye geçer: "Never have I seen...".'
      },
      {
        q: '2. "It is vital that every team member _____ the meeting on time." (Subjunctive Mood)',
        options: ['attends', 'attend', 'attended', 'is attending'],
        answer: 1,
        explanation: '"It is vital/essential/important that..." (Subjunctive) yapısında özne tekil olsa bile fiil yalın (attend) kullanılır.'
      },
      {
        q: '3. "_____ his presentation, he answered all the questions from the audience." (Participle Clause)',
        options: ['Having finished', 'Finished', 'To finishing', 'Have finished'],
        answer: 0,
        explanation: 'Ana eylemden daha önce tamamlanmış aktif bir eylemi kısaltırken "Having + V3 (Having finished)" kullanılır.'
      },
      {
        q: '4. "_____ the heavy traffic, we managed to arrive at the airport on time."',
        options: ['Although', 'Even though', 'Despite', 'However'],
        answer: 2,
        explanation: '"The heavy traffic" bir tam cümle değil, isim grubudur. İsim gruplarından önce "-e rağmen" anlamında "Despite / In spite of" gelir.'
      }
    ]
  }
];
