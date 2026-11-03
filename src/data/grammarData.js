export const CORE_STRUCTURE_RULES = [
  {
    id: 'svo-order',
    title: 'Altın Kural 1: Ters Cümle Mantığı (Özne + Yüklem + Nesne)',
    badge: 'A1 • Temel Mimari',
    problemTr: 'Türkçede asıl eylem (yüklem) cümlenin EN SONUNDADIR ("Ben her sabah kahve İÇERİM"). Bu yüzden son kelimeye kadar ne yaptığımız belli olmaz.',
    solutionEn: 'İngilizcede ise Özneden hemen sonra EYLEM (Fiil) söylenir! Yani önce "Ben İÇERİM", sonra ne içtiğini, en son nerede ve ne zaman içtiğini söylersin.',
    comparison: {
      trOrder: '🇹🇷 [Ben] + [her sabah] + [sıcak kahve] + [İÇERİM].',
      enOrder: '🇬🇧 [I] (Ben) + [DRINK] (İçerim) + [hot coffee] (sıcak kahve) + [every morning] (her sabah).',
      exampleEn: 'I drink hot coffee every morning.',
      exampleRead: 'Ay drink hat kofi evri mo:ning.'
    },
    goldenRule: '💡 Aklında Tut: İngilizce konuşurken "Kim?" dedikten hemen sonra "Ne yapıyor?" sorusunun cevabını yapıştır!'
  },
  {
    id: 'be-vs-do',
    title: 'Altın Kural 2: "Am / Is / Are" mı, "Do / Does" mı?',
    badge: 'A1 • En Çok Karıştırılan',
    problemTr: 'Türklerin %90\'ı "I am go to work" gibi hem "am" hem "go" (fiil) kullanarak hata yapar.',
    solutionEn: 'Cümlede HAREKET / EYLEM (gitmek, yemek, çalışmak) YOKSA, sadece durum/isim/sıfat varsa (Mutluyum, Doktorum, Evdeyim) -> AM / IS / ARE kullanılır. Eylem varsa Geniş Zamanda -> DO / DOES devreye girer!',
    comparison: {
      trOrder: 'Durum (Hareket Yok): I am tired (Yorgunum) | Are you tired? (Yorgun musun?)',
      enOrder: 'Eylem (Hareket Var): I work hard (Çok çalışırım) | Do you work hard? (Çok çalışır mısın?)',
      exampleEn: 'I am ready, so I go now.',
      exampleRead: 'Ay em redi, sou ay gou nau.'
    },
    goldenRule: '💡 Aklında Tut: Yalın bir fiil (go, like, want) varken yanına ASLA am/is/are gelmez (Sonuna -ing almadığı sürece)!'
  },
  {
    id: 'prepositions-in-on-at',
    title: 'Altın Kural 3: IN • ON • AT Piramidi (Zaman ve Mekan)',
    badge: 'A1 • Edat Şifresi',
    problemTr: 'Türkçede hepsine "-de / -da" (Saat 5\'te, Pazartesi\'de, Temmuz\'da) diyoruz ama İngilizcede 3 farklı kelime var.',
    solutionEn: 'Büyükten küçüğe piramit mantığı: Çok geniş/kapalı sınırlar için IN, orta/yüzey ve günler için ON, en küçük nokta ve saatler için AT!',
    comparison: {
      trOrder: '🔺 GENİŞ (IN): Aylar, Yıllar, Ülkeler, Şehirler, Odalar -> in July, in 2026, in London',
      enOrder: '🔸 ORTA (ON): Günler, Cadde/Yüzeyler -> on Monday, on the table | 📍 NOKTA (AT): Saatler, Tam Konum -> at 7:00, at home',
      exampleEn: 'I will meet you at 5 PM on Friday in Istanbul.',
      exampleRead: 'Ay vil mi:t yu et fayv pi-em on Fraydey in İstanbul.'
    },
    goldenRule: '💡 Hafıza Çivisi: Saatler NOKTA atışıdır (AT 5:00), Günler takvim yaprağı YÜZEYİDİR (ON Monday), Aylar/Yıllar geniş KUTUDUR (IN May)!'
  },
  {
    id: 'modals-power',
    title: 'Altın Kural 4: Joker Güç Kelimeleri (Modals: Can, Should, Must, Would)',
    badge: 'A2 • Hızlı Konuşma',
    problemTr: 'Özneye göre fiil çekimlemekle (-s takısı, geçmiş zaman eki) uğraşmak konuşurken yavaşlatır.',
    solutionEn: 'Can (-ebilmek), Should (-meli/tavsiye), Must (-meli/zorunlu), Would (-ecekti/kibar istek) kelimelerinden sonra fiil HER ZAMAN DÜMDÜZ (ek almamış) gelir!',
    comparison: {
      trOrder: 'I / You / He / She / We / They -> Hepsinde aynı kalır!',
      enOrder: 'She CAN speak (Konuşabilir) | You SHOULD see (Görmelisin) | I WOULD like (İsterim)',
      exampleEn: 'She can speak English, and you should practice every day.',
      exampleRead: 'Şi: ken spi:k İngliş, end yu şud prektis evri dey.'
    },
    goldenRule: '💡 Aklında Tut: Modal kelimelerinden sonra asla "to" veya "-s / -ing" gelmez! (She can speaks ❌ -> She can speak ✅).'
  }
];

export const GRAMMAR_TENSES = [
  {
    id: 'present-simple',
    nameEn: 'Present Simple Tense',
    nameTr: 'Geniş Zaman (Alışkanlıklar & Gerçekler)',
    level: 'A1',
    trSuffix: '-ar / -er / -ır / -ir (Yaparım, Giderim)',
    coreLogic: 'Şu an yaptığın şeyi değil; genel olarak her gün yaptığın rutinleri, alışkanlıkları, sevdiğin şeyleri ve değişmeyen gerçekleri anlatır.',
    memoryCode: '🔑 ŞİFRE: Olumlu cümlede "He / She / It" (O) tek başına üşüdüğü için fiilin sonuna bir "-S" atkısı takar (He works). Soru ve olumsuzda ise "DOES" yardımına koşup "-s"yi kendi üstüne alır (He doesn\'t work)!',
    formula: {
      positive: 'I/You/We/They + V1  |  He/She/It + V1-s',
      negative: "I/You/We/They + don't + V1  |  He/She/It + doesn't + V1",
      question: 'Do + I/you/we/they + V1?  |  Does + he/she/it + V1?'
    },
    examples: [
      {
        type: 'positive',
        en: 'I work in a tech company, and she works at a hospital.',
        trRead: 'Ay vörk in ı tek kampıni, end şi: vörks et ı haspitıl.',
        tr: 'Ben bir teknoloji şirketinde çalışırım, o ise bir hastanede çalışır.',
        highlight: 'I work / she works'
      },
      {
        type: 'negative',
        en: "I don't drink coffee at night, and he doesn't like tea.",
        trRead: 'Ay dont drink kofi et nayt, end hi: dazınt layk ti:.',
        tr: 'Ben gece kahve içmem ve o çayı sevmez.',
        highlight: "don't drink / doesn't like"
      },
      {
        type: 'question',
        en: 'Do you speak English every day?',
        trRead: 'Du yu spi:k İngliş evri dey?',
        tr: 'Her gün İngilizce konuşur musun?',
        highlight: 'Do you speak'
      }
    ],
    timeKeywords: ['every day (her gün)', 'usually (genellikle)', 'always (her zaman)', 'often (sık sık)', 'never (asla)']
  },
  {
    id: 'present-continuous',
    nameEn: 'Present Continuous (& Non-Progressive)',
    nameTr: 'Şimdiki Zaman (-yor) & -ing Almayan Fiiller',
    level: 'A1',
    trSuffix: '-ıyor / -iyor / -uyor (Yapıyorum)',
    coreLogic: 'Konuştuğun tam şu saniyede devam eden eylemleri anlatır. DİKKAT (Ders 68): Duygu, düşünce ve sahiplik bildiren durum fiilleri (know, like, love, want, need, understand, believe, belong) "-ing" ALMAZ ("I am knowing" ❌ -> "I know" ✅)!',
    memoryCode: '🔑 ŞİFRE: "-ING" takısı Türkçedeki "-YOR" ekidir. Ama "-ing" tek başına ayakta duramaz, önünde mutlaka "am / is / are" koltuk değneği olmalıdır!',
    formula: {
      positive: 'I am / He,She,It is / You,We,They are + V-ing',
      negative: "I'm not / isn't / aren't + V-ing",
      question: 'Am / Is / Are + Özne + V-ing?'
    },
    examples: [
      {
        type: 'positive',
        en: 'I am learning English right now, and I understand this rule.',
        trRead: 'Ay em lörning İngliş rayt nau, end ay andırstend đis ru:l.',
        tr: 'Tam şu anda İngilizce öğreniyorum ve bu kuralı anlıyorum (understand -ing almaz!).',
        highlight: 'am learning / understand'
      },
      {
        type: 'negative',
        en: "She isn't sleeping; she is reading a book.",
        trRead: 'Şi: izınt sli:ping; şi: iz ri:ding ı buk.',
        tr: 'O uyumuyor; kitap okuyor.',
        highlight: "isn't sleeping / is reading"
      },
      {
        type: 'question',
        en: 'What are you doing tonight?',
        trRead: 'Vat a:r yu du:ing tınayt?',
        tr: 'Bu akşam ne yapıyorsun?',
        highlight: 'are you doing'
      }
    ],
    timeKeywords: ['now (şimdi)', 'right now (tam şu an)', 'at the moment (şu anda)', 'currently (şu sıralar)', 'tonight (bu gece)']
  },
  {
    id: 'past-simple',
    nameEn: 'Past Simple Tense',
    nameTr: 'Geçmiş Zaman (-di\'li Geçmiş)',
    level: 'A2',
    trSuffix: '-dı / -di / -du / -tü (Yaptım, Gittim)',
    coreLogic: 'Geçmişte belirli bir zamanda (dün, geçen hafta, 2 yıl önce) başlamış ve BİTMİŞ olayları anlatır. Tüm şahıslarda (I, He, They) aynıdır!',
    memoryCode: '🔑 ŞİFRE: Sadece OLUMLU cümlede fiilin 2. hali (-ed veya düzensiz hali: go -> went, see -> saw, buy -> bought) kullanılır. İşin içine DID veya DIDN\'T girdiği an fiil mıknatıs gibi eski 1. haline (go, see, buy) geri döner!',
    formula: {
      positive: 'Tüm Özneler + Fiil-ed (veya 2. Hali - V2)',
      negative: "Tüm Özneler + didn't + Fiil (1. Yalın Hali)",
      question: 'Did + Tüm Özneler + Fiil (1. Yalın Hali)?'
    },
    examples: [
      {
        type: 'positive',
        en: 'I called you yesterday, and we went to the cinema.',
        trRead: 'Ay ko:ld yu yestırdey, end vi: vent tı đı sinıma.',
        tr: 'Dün seni aradım ve sinemaya gittik.',
        highlight: 'called / went (go -> went)'
      },
      {
        type: 'negative',
        en: "I didn't see your message last night.",
        trRead: 'Ay didınt si: yo:r mesıc last nayt.',
        tr: 'Dün gece mesajını görmedim.',
        highlight: "didn't see (saw değil!)"
      },
      {
        type: 'question',
        en: 'Where did you stay in London?',
        trRead: 'Veır did yu stey in Landın?',
        tr: 'Londra\'da nerede kaldın?',
        highlight: 'did you stay'
      }
    ],
    timeKeywords: ['yesterday (dün)', 'last week/year (geçen hafta/yıl)', 'two days ago (2 gün önce)', 'in 2020 (2020\'de)']
  },
  {
    id: 'past-continuous',
    nameEn: 'Past Continuous Tense',
    nameTr: 'Şimdiki Zamanın Hikayesi (Yapıyordum)',
    level: 'A2',
    trSuffix: '-ıyordu / -iyordu (Yapıyordum)',
    coreLogic: 'Geçmişte belirli bir anda devam etmekte olan eylemleri ("Dün saat 8\'de uyuyordum") veya başka bir olay olduğunda (when) yarıda kesilen eylemleri anlatır.',
    memoryCode: '🔑 ŞİFRE: WHEN + Kısa Olay (V2), WHILE + Uzun Süren Olay (Was/Were V-ing)! ("While I was walking, it started to rain").',
    formula: {
      positive: 'I/He/She/It + was + V-ing  |  You/We/They + were + V-ing',
      negative: "wasn't / weren't + V-ing",
      question: 'Was / Were + Özne + V-ing?'
    },
    examples: [
      {
        type: 'positive',
        en: 'While I was sleeping, you called me.',
        trRead: 'Vayl ay voz sli:ping, yu ko:ld mi.',
        tr: 'Ben uyuyorken sen beni aradın.',
        highlight: 'While was sleeping ... called'
      },
      {
        type: 'negative',
        en: "They weren't listening to the teacher.",
        trRead: 'Đey vörnt lisıning tı đı ti:çır.',
        tr: 'Öğretmeni dinlemiyorlardı.',
        highlight: "weren't listening"
      }
    ],
    timeKeywords: ['when (-dığında)', 'while / as (-iken)', 'at 8 PM yesterday (dün saat 8\'de)', 'all day yesterday (dün bütün gün)']
  },
  {
    id: 'future-will-goingto',
    nameEn: 'Future Tense (Will / Shall vs. Going to)',
    nameTr: 'Gelecek Zaman (-ecek / -acak)',
    level: 'A2',
    trSuffix: '-ecek / -acak (Yapacağım)',
    coreLogic: 'Konuşma anında verdiğin ani kararlar, sözler ve tahminler için "WILL"; önceden planladığın niyetler ve kanıtlı tahminler için "BE GOING TO"; resmi teklif/öneriler için "SHALL I / SHALL WE" (Ders 194) kullanılır.',
    memoryCode: '🔑 ŞİFRE: Kapı çaldı "Ben bakarım!" diyorsan o an karar verdin -> "I\'ll get it!" (WILL). Ama "Haftaya tatile çıkacağım (planlı)" diyorsan -> "I\'m going to travel" (GOING TO)!',
    formula: {
      positive: 'Özne + will + V1  |  Özne + am/is/are going to + V1',
      negative: "Özne + won't + V1  |  Özne + am/is/are not going to + V1",
      question: 'Will + Özne + V1?  |  Shall we + V1? (Öneri)'
    },
    examples: [
      {
        type: 'positive',
        en: "Wait a second, I'll help you with those bags!",
        trRead: 'Veyt ı sekınd, ayl help yu viđ đouz begz!',
        tr: 'Bir saniye bekle, o çantalar için sana yardım edeceğim! (O anki karar)',
        highlight: "I'll help"
      },
      {
        type: 'positive',
        en: 'We are going to move to a new apartment next month.',
        trRead: 'Vi: a:r gouing tı mu:v tı ı nyu: ıpa:rtmınt nekst manθ.',
        tr: 'Gelecek ay yeni bir daireye taşınacağız. (Planlanmış)',
        highlight: 'are going to move'
      },
      {
        type: 'question',
        en: 'Shall we drink some coffee outside?',
        trRead: 'Şel vi: drink sam kofi autsayd?',
        tr: 'Dışarıda biraz kahve içelim mi? (Shall we = Teklif)',
        highlight: 'Shall we drink'
      }
    ],
    timeKeywords: ['tomorrow (yarın)', 'next week (gelecek hafta)', 'soon (yakında)', 'in the future (gelecekte)']
  },
  {
    id: 'present-perfect',
    nameEn: 'Present Perfect Tense',
    nameTr: 'Geçmişle Bugünü Bağlayan Zaman (Deneyim & Sonuç)',
    level: 'B1',
    trSuffix: 'Ne Zaman Olduğu Değil, Şu Anki Etkisi/Deneyimi Önemli!',
    coreLogic: 'Olayın NE ZAMAN olduğu söylenmez (yesterday, in 2020 DENMEZ!); önemli olan hayatında o deneyimi yaşayıp yaşamadığın veya sonucunun şu ana etkisidir. Zamanı belli olan geçmişte Past Simple (V2) kullanılır!',
    memoryCode: '🔑 ŞİFRE: "Anahtarımı kaybettim" derken önemli olan dün saat kaçta düştüğü değil, ŞU AN kapıda kalmış olmandır -> "I HAVE lost my key!".',
    formula: {
      positive: 'I/You/We/They + have + V3  |  He/She/It + has + V3',
      negative: "haven't + V3  |  hasn't + V3",
      question: 'Have / Has + Özne + V3?'
    },
    examples: [
      {
        type: 'question',
        en: 'Have you ever been to Paris? Yes, I went there in 2022.',
        trRead: 'Hev yu evır bi:n tı Peris? Yes, ay vent đeır in tventi tventi-tu:.',
        tr: 'Hiç Paris\'te bulundun mu (Deneyim: Perfect)? Evet, oraya 2022\'de gittim (Tarih belli: Past Simple!).',
        highlight: 'Have you ever been vs. went in 2022'
      },
      {
        type: 'positive',
        en: 'I have already finished my project.',
        trRead: 'Ay hev olredi finişt may procekt.',
        tr: 'Projemi çoktan bitirdim (Sonuç: Şu an hazırım!).',
        highlight: 'have already finished'
      }
    ],
    timeKeywords: ['ever / never (hiç / asla)', 'just (az önce)', 'already (çoktan)', 'yet (henüz)', 'for / since (-dir / -den beri)', 'recently / lately (son zamanlarda)']
  },
  {
    id: 'present-perfect-continuous',
    nameEn: 'Present Perfect Continuous Tense',
    nameTr: 'Geçmişte Başlayıp Şu Ana Kadar Kesintisiz Süren Zaman',
    level: 'B1',
    trSuffix: '...-dir yapıyorum / yapmaktayım (Have/Has been + V-ing)',
    coreLogic: 'Ders 151: Geçmişte başlamış, şu ana kadar HİÇ DURMADAN devam etmiş ve şu anda da devam eden (veya belirtisi göz önünde olan) eylemleri anlatır.',
    memoryCode: '🔑 ŞİFRE: "3 saattir ders çalışıyorum (ve hâlâ masadayım)" diyorsan SÜREÇ vurgusu vardır: HAVE / HAS BEEN + V-ING!',
    formula: {
      positive: 'I/You/We/They + have been + V-ing  |  He/She/It + has been + V-ing',
      negative: "haven't / hasn't been + V-ing",
      question: 'How long + have / has + Özne + been + V-ing?'
    },
    examples: [
      {
        type: 'positive',
        en: 'I have been learning English for six months.',
        trRead: 'Ay hev bi:n lörning İngliş for siks manθs.',
        tr: 'Altı aydır (kesintisiz) İngilizce öğreniyorum.',
        highlight: 'have been learning'
      },
      {
        type: 'question',
        en: 'How long have you been waiting here?',
        trRead: 'Hau long hev yu bi:n veyting hiır?',
        tr: 'Ne kadar süredir burada bekliyorsun?',
        highlight: 'have you been waiting'
      }
    ],
    timeKeywords: ['for ... hours/years', 'since morning', 'all day / all week (bütün gün/hafta)', 'how long (ne kadar süredir)']
  },
  {
    id: 'conditionals-if',
    nameEn: 'Conditionals: Zero, First (Type 1) & Second (Type 2)',
    nameTr: 'Koşul Cümleleri (Genel Doğru, Gerçek İhtimal & Şu Anki Hayali Durum)',
    level: 'B1',
    trSuffix: '-se / -sa (Yaparsam ... olur / Yapsaydım ... olurdu)',
    coreLogic: 'Ders 152 & 168-169: Type 0: Bilimsel doğrular (If + V1, V1). Type 1: Gelecekteki gerçek ihtimaller (If + V1, will V1). Type 2: Şu an gerçek olmayan hayali durumlar (If + V2, would V1).',
    memoryCode: '🔑 ŞİFRE: IF kelimesinin olduğu yan cümlede (özel ricalar hariç) ASLA "will" veya "would" kullanılmaz! Will/Would her zaman virgülden sonraki ana cümlede durur!',
    formula: {
      positive: 'Type 1: If + Present (V1), ... will + V1  |  Type 2: If + Past (V2), ... would / could + V1',
      negative: "If + don't/didn't..., ... won't/wouldn't + V1",
      question: 'What would you do if you won the lottery?'
    },
    examples: [
      {
        type: 'positive',
        en: 'If you study regularly, you will speak fluently.',
        trRead: 'İf yu stadi regyulırli, yu vil spi:k flu:ıntli.',
        tr: 'Düzenli çalışırsan akıcı konuşacaksın. (Type 1 - Gerçek ihtimal)',
        highlight: 'If study ... will speak'
      },
      {
        type: 'positive',
        en: 'If I were you, I would accept that job offer.',
        trRead: 'İf ay vör yu, ay vud eksept đet cab ofır.',
        tr: 'Senin yerinde olsaydım o iş teklifini kabul ederdim. (Type 2 - Hayali)',
        highlight: 'If I were you ... would accept'
      }
    ],
    timeKeywords: ['if (eğer)', 'unless (-medikçe)', 'as long as (-dığı sürece)', 'provided that (şartıyla)']
  },
  {
    id: 'passive-voice',
    nameEn: 'Passive Voice (Tüm Zamanlarda Edilgen Çatı)',
    nameTr: 'İşi Yapanın Değil, Yapılan İşin Önemli Olduğu Cümleler',
    level: 'B1',
    trSuffix: '-ıldı / -ildi / -nır (Yapıldı, Konuşulur, Üretilecek)',
    coreLogic: 'Ders 198 & 224: İşi kimin yaptığı belli değilse veya önemli değilse nesne başa alınır. Tüm zamanlarda formül aynıdır: O zamanın "TO BE" çekimi + V3!',
    memoryCode: '🔑 ŞİFRE: Geniş: am/is/are V3 | Şimdiki: am/is/are BEING V3 | Geçmiş: was/were V3 | Perfect: have/has BEEN V3 | Gelecek/Modal: will be / can be / must be V3!',
    formula: {
      positive: 'Nesne + [am/is/are | is being | was/were | has been | will be | must be] + V3',
      negative: "Nesne + [isn't / wasn't / hasn't been / won't be] + V3",
      question: 'Is / Was / Has / Will + Nesne + (been/be) + V3?'
    },
    examples: [
      {
        type: 'positive',
        en: 'English is spoken all over the world, and a new bridge is being built.',
        trRead: 'İngliş iz spoukın o:l ouvır đı vörld, end ı nyu: bric iz bi:ing bilt.',
        tr: 'İngilizce tüm dünyada konuşulur ve yeni bir köprü inşa ediliyor (is being V3).',
        highlight: 'is spoken / is being built'
      },
      {
        type: 'positive',
        en: 'The problem has already been solved by our team.',
        trRead: 'Đı prablım hez olredi bi:n solvd bay auır ti:m.',
        tr: 'Sorun ekibimiz tarafından çoktan çözüldü (has been V3).',
        highlight: 'has been solved'
      }
    ],
    timeKeywords: ['by ... (tarafından)', 'is made of/in', 'was invented', 'has been completed']
  },
  {
    id: 'past-perfect-modals',
    nameEn: 'Past Perfect & Past Perfect Continuous',
    nameTr: 'Geçmişin Geçmişi (Had + V3 & Had been + V-ing)',
    level: 'B2',
    trSuffix: '-mıştı / -mişti (Had V3)  |  ...-dir yapmaktaydı (Had been V-ing)',
    coreLogic: 'Ders 160 & 213: Geçmişteki iki olaydan DAHA ÖNCE olanı anlatmak için "Had + V3", geçmişteki bir olaydan önce belli bir süre devam etmiş eylemi anlatmak için "Had been + V-ing" kullanılır.',
    memoryCode: '🔑 ŞİFRE: "Ben istasyona vardığımda (V2 - Sonra olan), tren çoktan GİTMİŞTİ (Had left - Daha önce olan)!"',
    formula: {
      positive: 'Özne + had + V3  |  Özne + had been + V-ing',
      negative: "Özne + hadn't + V3  |  Özne + hadn't been + V-ing",
      question: 'Had + Özne + V3 / been V-ing?'
    },
    examples: [
      {
        type: 'positive',
        en: 'When I arrived at the airport, the plane had already taken off.',
        trRead: 'Ven ay ırayvd et đi eırpo:rt, đı pleyn hed olredi teykın of.',
        tr: 'Havalimanına vardığımda uçak çoktan kalkmıştı.',
        highlight: 'arrived (sonra) / had taken off (daha önce)'
      },
      {
        type: 'positive',
        en: 'He was exhausted because he had been working for 12 hours.',
        trRead: 'Hi: voz igzo:stıd bikoz hi: hed bi:n vörking for tvelv auırz.',
        tr: 'Bitkindi çünkü 12 saattir çalışmaktaydı (had been V-ing).',
        highlight: 'had been working'
      }
    ],
    timeKeywords: ['by the time (-dığında çoktan)', 'before (önce)', 'after (sonra)', 'until then (o zamana dek)']
  },
  {
    id: 'future-continuous-perfect',
    nameEn: 'Future Continuous, Future Perfect & Continuous',
    nameTr: 'Gelecekte Devam Edecek (Will be V-ing) & Bitmiş Olacak (Will have V3)',
    level: 'B2',
    trSuffix: 'Yapıyor olacağım (Will be V-ing)  |  Yapmış olacağım (Will have V3)',
    coreLogic: 'Ders 144-145 & 211-212: Gelecekte belirli bir saatte devam ediyor olacak işler için "Will be V-ing"; gelecekte belirli bir tarihe kadar TAMAMLANMIŞ/BİTMİŞ olacak işler için "Will have V3" kullanılır.',
    memoryCode: '🔑 ŞİFRE: Cümlede "At this time tomorrow (Yarın bu saatte)" varsa -> WILL BE V-ING. "By 2030 / By next month (Gelecek aya kadar)" varsa -> WILL HAVE V3!',
    formula: {
      positive: 'Will be + V-ing  |  Will have + V3  |  Will have been + V-ing',
      negative: "Won't be + V-ing  |  Won't have + V3",
      question: 'Will + Özne + be V-ing / have V3?'
    },
    examples: [
      {
        type: 'positive',
        en: 'At this time tomorrow, I will be flying to London.',
        trRead: 'Et đis taym tımorou, ay vil bi: flaying tı Landın.',
        tr: 'Yarın tam bu saatte Londra\'ya uçuyor olacağım.',
        highlight: 'will be flying'
      },
      {
        type: 'positive',
        en: 'By the end of this year, we will have completed all levels.',
        trRead: 'Bay đi end ov đis yiır, vi: vil hev kımpli:tıd o:l levılz.',
        tr: 'Bu yılın sonuna kadar tüm seviyeleri tamamlamış olacağız.',
        highlight: 'By ... will have completed'
      }
    ],
    timeKeywords: ['at this time tomorrow (yarın bu saatte)', 'by tomorrow (yarına kadar)', 'by 2030 (2030\'a kadar)', 'by the time + V1']
  },
  {
    id: 'conditionals-type3-wish',
    nameEn: 'Third Conditional (Type 3) & Wish / If Only Clauses',
    nameTr: 'Geçmişteki Hayali Durumlar ve Keşke / Pişmanlık Cümleleri',
    level: 'B2',
    trSuffix: 'Yapsaydım ... olurdu (Geçmiş)  |  Keşke ... olsaydı (I wish)',
    coreLogic: 'Ders 171 & 246-248: Type 3 tamamen GEÇMİŞTE kalmış, değiştirilemez olayların hayalini/pişmanlığını anlatır ("Bilseydim gelirdim — ama bilmiyordum ve gelmedim"). Wish Clauses ise "Keşke" demektir.',
    memoryCode: '🔑 ŞİFRE: Şu an için "Keşke" derken bir derece geçmiş (I wish I KNEW = Keşke şu an bilsem); Geçmişteki pişmanlık için "Keşke" derken Past Perfect (I wish I HAD KNOWN = Keşke o zaman bilseydim) kullanılır!',
    formula: {
      positive: 'Type 3: If + Had V3, ... would / could have + V3',
      negative: 'Şimdiki Keşke: I wish + V2 (were)  |  Geçmiş Keşke: I wish + Had V3',
      question: 'Şikayet / İstek Keşkesi: I wish + would + V1 (Keşke şunu yapsan!)'
    },
    examples: [
      {
        type: 'positive',
        en: 'If I had seen your email earlier, I would have replied immediately.',
        trRead: 'İf ay hed si:n yo:r i:meyl örliır, ay vud hev riplayd imi:diıtli.',
        tr: 'E-postanı daha erken görmüş olsaydım (görmedim), hemen cevap verirdim (Type 3).',
        highlight: 'If had seen ... would have replied'
      },
      {
        type: 'negative',
        en: 'I wish I spoke Spanish now, and I wish I had studied harder at school.',
        trRead: 'Ay viş ay spouk Speniş nau, end ay viş ay hed stadid ha:rdır et sku:l.',
        tr: 'Keşke şu an İspanyolca konuşabilsem (spoke) ve keşke okuldayken daha sıkı çalışsaydım (had studied).',
        highlight: 'wish spoke (şimdi) / wish had studied (geçmiş)'
      }
    ],
    timeKeywords: ['if only (keşke)', 'I wish (keşke)', 'unless (-medikçe)', 'but for (olmasaydı)']
  }
];
