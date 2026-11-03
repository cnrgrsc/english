export const PHRASE_CATEGORIES = [
  { id: 'all', label: 'Tümü', emoji: '🌟' },
  { id: 'greeting', label: 'Tanışma & Hal Hatır', emoji: '👋' },
  { id: 'cafe', label: 'Kafe & Restoran', emoji: '☕' },
  { id: 'travel', label: 'Seyahat & Yön', emoji: '✈️' },
  { id: 'shopping', label: 'Alışveriş & Mağaza', emoji: '🛍️' },
  { id: 'work', label: 'İş İngilizcesi (Business)', emoji: '💼' },
  { id: 'emergency', label: 'Sağlık, Tavsiye & Rica', emoji: '🚑' },
  { id: 'idioms', label: 'Deyimler, Slang & C1-C2', emoji: '🔥' }
];

export const PHRASE_PATTERNS = [
  {
    id: 'p1',
    category: 'greeting',
    en: "How's it going?",
    trRead: 'Hauz it gouing?',
    trMeaning: 'Nasıl gidiyor? / Ne var ne yok?',
    literalTr: 'O nasıl gidiyor?',
    memoryHook: '"How are you?" robot gibidir; sokakta herkes "How\'s it going?" der. Cevap: "Pretty good!" (Oldukça iyi).',
    usageContext: 'Günlük samimi karşılaşmalarda',
    level: 'A1'
  },
  {
    id: 'p2',
    category: 'greeting',
    en: 'Long time no see!',
    trRead: 'Long taym nou si:!',
    trMeaning: 'Görüşmeyeli uzun zaman oldu!',
    literalTr: 'Uzun zaman yok görmek!',
    memoryHook: 'Uzun (Long) Zaman (Time) Yok (No) Görmek (See). En doğal özlem kalıbıdır.',
    usageContext: 'Uzun süredir görmediğin biriyle karşılaştığında',
    level: 'A2'
  },
  {
    id: 'p3',
    category: 'greeting',
    en: 'I really appreciate your help!',
    trRead: 'Ay ri:li apri:şieyt yo:r help!',
    trMeaning: 'Yardımın için gerçekten çok minnettarım (Çok makbule geçti)!',
    literalTr: 'Yardımını gerçekten takdir ediyorum.',
    memoryHook: 'Ders 87 (Ways to Say Thank You): "Thank you"dan çok daha güçlü ve kibar bir teşekkürdür.',
    usageContext: 'Teşekkür etme / Minnet bildirme',
    level: 'B1'
  },
  {
    id: 'p19',
    category: 'greeting',
    en: "I'm afraid I can't make it tonight. Maybe another time?",
    trRead: 'Aym ıfreyd ay kent meyk it tınayt. Meybi ınađır taym?',
    trMeaning: 'Korkarım bu akşam gelemeyeceğim (yetişemeyeceğim). Belki başka sefere?',
    literalTr: 'Korkarım bu gece onu yapamam. Belki başka bir zaman?',
    memoryHook: 'Ders 86 (Ways to Say NO): Kırmadan "Hayır, gelemem" demenin en kibar yolu: "I can\'t make it" (Yetişemem/Katılamam)!',
    usageContext: 'Daveti kibarca reddetme (Saying No)',
    level: 'B1'
  },
  {
    id: 'p4',
    category: 'cafe',
    en: 'Can I get a medium latte to go, please?',
    trRead: 'Ken ay get ı mi:diım latey tı gou, pli:z?',
    trMeaning: 'Orta boy paket (al-götür) bir latte alabilir miyim lütfen?',
    literalTr: 'Gitmek için orta bir latte alabilir miyim?',
    memoryHook: 'Asla "Give me" deme! Sipariş verirken "Can I get..." veya "I\'d like...", paket için "to go" kullanılır.',
    usageContext: 'Kahvecide veya restoranda sipariş',
    level: 'A1'
  },
  {
    id: 'p5',
    category: 'cafe',
    en: 'Could we have the check, please?',
    trRead: 'Kud vi: hev đı çek, pli:z?',
    trMeaning: 'Hesabı alabilir miyiz lütfen?',
    literalTr: 'Kontrolü/Adisyonu alabilir miydik lütfen?',
    memoryHook: 'ABD\'de hesap "Check", İngiltere\'de "Bill" olarak istenir.',
    usageContext: 'Yemek sonunda hesap isterken',
    level: 'A2'
  },
  {
    id: 'p6',
    category: 'cafe',
    en: "Keep the change! It's on me today.",
    trRead: 'Ki:p đı çeync! İts on mi: tıdey.',
    trMeaning: 'Üstü kalsın! Bugün benden (Ben ısmarlıyorum).',
    literalTr: 'Bozukluğu tut! Bugün benim üzerimde.',
    memoryHook: 'Hesap senin "üzerindeyse" (On me), yani yükü sen üstleniyorsan "It\'s on me!" dersin.',
    usageContext: 'Ödeme ve ısmarlama',
    level: 'A2'
  },
  {
    id: 'p7',
    category: 'travel',
    en: 'Excuse me, how do I get to the nearest metro station?',
    trRead: 'İkskyu:z mi, hau du ay get tı đı niırıst metrou steyşın?',
    trMeaning: 'Affedersiniz, en yakın metro istasyonuna nasıl gidebilirim?',
    literalTr: 'Beni affedin, en yakın metro istasyonuna nasıl ulaşırım?',
    memoryHook: 'Ders 202 (Giving Directions): "Get to" = Bir yere ulaşmak. Yön sorarken her kapıyı açar.',
    usageContext: 'Adres ve yön sorma',
    level: 'A1'
  },
  {
    id: 'p8',
    category: 'travel',
    en: 'I have a reservation under the name of...',
    trRead: 'Ay hev ı rezırveyşın andır đı neym ov...',
    trMeaning: '... adına bir rezervasyonum var.',
    literalTr: '... isminin altında bir rezervasyonum var.',
    memoryHook: 'Rezervasyon listede isminin "altında" kayıtlı olduğu için "UNDER the name" kullanılır!',
    usageContext: 'Otel Check-in ve Restoran',
    level: 'A2'
  },
  {
    id: 'p9',
    category: 'shopping',
    en: "I'm just looking, thank you. Can I try this on?",
    trRead: 'Aym cast luking, θenk yu. Ken ay tray đis on?',
    trMeaning: 'Sadece bakıyorum, teşekkürler. Bunu (üzerimde) deneyebilir miyim?',
    literalTr: 'Sadece bakıyorum. Bunu üstüme deneyebilir miyim?',
    memoryHook: 'Ders 62-63 (In a Clothes Shop): Kıyafet denemek her zaman "Try ON" (üzerine denemek) ile söylenir!',
    usageContext: 'Giyim mağazasında alışveriş',
    level: 'A1'
  },
  {
    id: 'p10',
    category: 'shopping',
    en: 'Do you have this in a medium / in black?',
    trRead: 'Du yu hev đis in ı mi:diım / in blek?',
    trMeaning: 'Bunun orta bedeni / siyah rengi var mı?',
    literalTr: 'Buna orta boyutta / siyahta sahip misiniz?',
    memoryHook: 'Kıyafet bedenleri ve renkleri sorulurken her zaman "IN" edatı kullanılır (in a medium, in black)!',
    usageContext: 'Beden ve renk sorma',
    level: 'A2'
  },
  {
    id: 'p11',
    category: 'work',
    en: "Let's get straight to the point.",
    trRead: 'Lets get streyt tı đı poynt.',
    trMeaning: 'Doğrudan sadede (asıl konuya) gelelim.',
    literalTr: 'Noktaya dümdüz ulaşalım.',
    memoryHook: 'Ders 195 (Business Meeting): Toplantıda lafı dolandırmadan ana gündeme girmek için kullanılır.',
    usageContext: 'İş toplantıları ve sunumlar',
    level: 'B1'
  },
  {
    id: 'p12',
    category: 'work',
    en: "I'll get back to you on that as soon as possible.",
    trRead: 'Ayl get bek tı yu on đet ez su:n ez pasıbıl.',
    trMeaning: 'O konuda size en kısa sürede geri dönüş yapacağım.',
    literalTr: 'Mümkün olduğu kadar yakında o konuda size geri geleceğim.',
    memoryHook: 'Ders 193 & 280 (Business Email & Phone): İş dünyasının en çok kullanılan profesyonel cümlesidir.',
    usageContext: 'İş e-postaları ve telefon görüşmeleri',
    level: 'B2'
  },
  {
    id: 'p20',
    category: 'work',
    en: 'I am writing to inquire about... / I look forward to hearing from you.',
    trRead: 'Ay em rayting tı inkvayır ıbaut... / Ay luk fo:rvırd tı hiıring from yu.',
    trMeaning: '... hakkında bilgi almak için yazıyorum. / Sizden haber almayı dört gözle bekliyorum.',
    literalTr: '... hakkında sormak için yazıyorum. / Sizden duymayı ileriye bakıyorum.',
    memoryHook: 'Ders 192-193 (Business Letter/Email): Resmi bir e-postanın en kusursuz açılış ve kapanış cümlesidir!',
    usageContext: 'Resmi İş E-postası (Formal Register)',
    level: 'C1'
  },
  {
    id: 'p13',
    category: 'emergency',
    en: 'Could you speak a bit slower, please?',
    trRead: 'Kud yu spi:k ı bit slouır, pli:z?',
    trMeaning: 'Biraz daha yavaş konuşabilir misiniz lütfen?',
    literalTr: 'Bir parça daha yavaş konuşabilir miydiniz lütfen?',
    memoryHook: 'Karşındaki çok hızlı konuştuğunda panik yapma! "A bit slower" dediğinde herkes hızını yarıya indirir.',
    usageContext: 'İletişim kurtarıcı',
    level: 'A1'
  },
  {
    id: 'p14',
    category: 'emergency',
    en: 'If I were you, I would see a doctor right away.',
    trRead: 'İf ay vör yu, ay vud si: ı doktır rayt ıvey.',
    trMeaning: 'Senin yerinde olsaydım derhal bir doktora görünürdüm.',
    literalTr: 'Eğer ben sen olsaydım, hemen bir doktor görürdüm.',
    memoryHook: 'Ders 109 & 166 (Health & Giving Advice): Tavsiye verirken "You should..." yanındaki en doğal kalıp "If I were you..."dur!',
    usageContext: 'Sağlık ve tavsiye verme (Giving Advice)',
    level: 'B1'
  },
  {
    id: 'p15',
    category: 'idioms',
    en: 'I wanna grab a bite, cause I\'m kinda hungry.',
    trRead: 'Ay vana greb ı bayt, koz aym kaynda hangri.',
    trMeaning: 'Bir şeyler atıştırmak istiyorum çünkü biraz açım.',
    literalTr: 'Bir ısırık kapmak istiyorum (want to), çünkü (because) bir çeşit (kind of) açım.',
    memoryHook: 'Ders 118 (Contracted Forms): Wanna = Want to | Gonna = Going to | Kinda = Kind of (biraz) | Outta = Out of!',
    usageContext: 'Günlük Hızlı Konuşma Kısaltmaları',
    level: 'B1'
  },
  {
    id: 'p16',
    category: 'idioms',
    en: "She's ready to travel at the drop of a hat!",
    trRead: 'Şi:z redi tı trevıl et đı drop ov ı het!',
    trMeaning: 'Hiç tereddüt etmeden, anında (şapkayı yere atar atmaz) seyahat etmeye hazırdır!',
    literalTr: 'Bir şapkanın düşüşünde seyahat etmeye hazır!',
    memoryHook: 'Ders 220 ("At the drop of a hat"): Eskiden yarışlar şapka yere düşürülerek başlatılırdı; "anında, hemen, bahane aramadan" demektir!',
    usageContext: 'İleri Seviye Deyim (C1-C2 Idiom)',
    level: 'C1'
  },
  {
    id: 'p17',
    category: 'idioms',
    en: "It's time to face the music / That rings a bell!",
    trRead: 'İts taym tı feys đı myu:zik / Đet ringz ı bel!',
    trMeaning: 'Yaptığımızın sonuçlarıyla yüzleşme vakti! / Bu bana bir yerden tanıdık geldi (zil çaldırdı)!',
    literalTr: 'Müzikle yüzleşme zamanı / O bir zil çalıyor!',
    memoryHook: 'Ders 275 (Music Idioms): "Face the music" = Acı gerçekle/sonuçla yüzleşmek. "Ring a bell" = Tanıdık gelmek, çağrışım yapmak!',
    usageContext: 'Kültürel & Müzik Deyimleri (C2)',
    level: 'C2'
  }
];

export const CONVERSATION_SCENARIOS = [
  {
    id: 'sc-cafe',
    title: '1. Kafe & Restoranda Sipariş (A1)',
    subtitle: 'Ders 58: Barista/Garson ile doğal sipariş, boyut seçimi ve ödeme diyaloğu',
    iconName: 'Coffee',
    level: 'A1',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Barista',
        en: 'Hi there! What can I get for you today?',
        trRead: 'Hay đeır! Vat ken ay get for yu tıdey?',
        trMeaning: 'Merhabalar! Bugün size ne hazırlayabilirim?',
        tip: '"What do you want?" kaba olduğu için hizmet sektöründe hep "What can I get for you?" duyarsın.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: 'Hi! Can I get an iced Americano, please?',
        trRead: 'Hay! Ken ay get en ayst Amerikanou, pli:z?',
        trMeaning: 'Merhaba! Buzlu bir Americano alabilir miyim lütfen?',
        tip: 'Iced sesli harfle (Ay) başladığı için "a" değil "an iced" dedik.'
      },
      {
        speaker: 'A',
        speakerName: 'Barista',
        en: 'Sure! What size would you like? And is that for here or to go?',
        trRead: 'Şuır! Vat sayz vud yu layk? End iz đet for hiır or tı gou?',
        trMeaning: 'Tabii! Hangi boy istersiniz? Ve burada mı içeceksiniz yoksa paket mi?',
        tip: '"For here" = Burada içmek için, "To go" (Takeaway) = Paket.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: 'Medium, please. And to go. Can I pay by card?',
        trRead: 'Mi:diım, pli:z. End tı gou. Ken ay pey bay ka:rd?',
        trMeaning: 'Orta boy lütfen. Ve paket olsun. Kartla ödeyebilir miyim?',
        tip: 'Ödeme yöntemlerinde "by card" ama nakitte "in cash" kullanılır!'
      }
    ]
  },
  {
    id: 'sc-clothes',
    title: '2. Giyim Mağazasında Alışveriş (A1-A2)',
    subtitle: 'Ders 61-63: Beden sorma, deneme kabini (fitting room) ve fiyat diyaloğu',
    iconName: 'ShoppingBag',
    level: 'A2',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Satış Danışmanı',
        en: 'Hello! May I help you find anything?',
        trRead: 'Helou! Mey ay help yu faynd eniθing?',
        trMeaning: 'Merhaba! Bir şey bulmanıza yardımcı olabilir miyim?',
        tip: 'Sadece bakıyorsan "I\'m just looking, thanks" diyebilirsin.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: 'Yes, please. Do you have this jacket in a medium?',
        trRead: 'Yes, pli:z. Du yu hev đis cekıt in ı mi:diım?',
        trMeaning: 'Evet lütfen. Bu ceketin orta (medium) bedeni var mı?',
        tip: 'Beden ve renk sorarken her zaman "IN" edatı kullanılır: in a medium, in blue.'
      },
      {
        speaker: 'A',
        speakerName: 'Satış Danışmanı',
        en: 'Here you are. The fitting rooms are over there on the left.',
        trRead: 'Hiır yu a:r. Đı fiting ru:mz a:r ouvır đeır on đı left.',
        trMeaning: 'Buyurun. Deneme kabinleri şurada solda.',
        tip: 'Fitting room / Changing room = Deneme kabini.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: "It fits perfectly! I'll take it.",
        trRead: 'İt fits pörfıktli! Ayl teyk it.',
        trMeaning: 'Tam üstüme oturdu! Bunu alacağım.',
        tip: 'Bir ürünü satın almaya o an karar verdiğinde "I will buy it" yerine doğal olarak "I\'ll take it!" denir.'
      }
    ]
  },
  {
    id: 'sc-airport',
    title: '3. Havalimanı & Pasaport Kontrolü (A2)',
    subtitle: 'Ders 75-76: Yurt dışına girişte memurun sorduğu klasik sorular ve net cevaplar',
    iconName: 'Plane',
    level: 'A2',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Pasaport Memuru',
        en: 'Good morning. May I see your passport and boarding pass?',
        trRead: 'Gud mo:ning. Mey ay si: yo:r paspo:rt end bo:rding pes?',
        trMeaning: 'Günaydın. Pasaportunuzu ve biniş kartınızı görebilir miyim?',
        tip: 'Boarding pass = Uçak biniş kartı.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: 'Good morning. Here you go.',
        trRead: 'Gud mo:ning. Hiır yu gou.',
        trMeaning: 'Günaydın. Buyurun.',
        tip: 'Bir eşyayı uzatırken "Buyurun" demek için "Here you go" kullanılır.'
      },
      {
        speaker: 'A',
        speakerName: 'Pasaport Memuru',
        en: 'What is the purpose of your visit? Business or pleasure?',
        trRead: 'Vat iz đı pörpıs ov yo:r vizit? Biznıs or plejır?',
        trMeaning: 'Ziyaretinizin amacı nedir? İş mi yoksa turistik (gezi) mi?',
        tip: 'Pasaport kontrolünün %100 sorulan sorusudur! Purpose = Amaç.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: "I'm here on vacation. I'll be staying for five days.",
        trRead: 'Aym hiır on vekeyşın. Ayl bi: steying for fayv deyz.',
        trMeaning: 'Tatil için buradayım. Beş gün kalacağım.',
        tip: 'Süre belirtirken (5 gün boyunca) her zaman "FOR five days" kullanılır.'
      }
    ]
  },
  {
    id: 'sc-business',
    title: '4. İş İngilizcesi: Toplantı & Randevu (B2-C1)',
    subtitle: 'Ders 195, 223 & 277: Profesyonel toplantı açılışı, görüş bildirme ve randevu planlama',
    iconName: 'Briefcase',
    level: 'B2',
    lines: [
      {
        speaker: 'A',
        speakerName: 'Proje Yöneticisi',
        en: "Thank you all for joining. Let's get straight to the point.",
        trRead: 'Θenk yu o:l for coyning. Lets get streyt tı đı poynt.',
        trMeaning: 'Katıldığınız için hepinize teşekkürler. Doğrudan asıl konuya gelelim.',
        tip: 'Toplantıyı profesyonelce başlatma kalıbı.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: 'We have already completed the first phase, and we are on track for the deadline.',
        trRead: 'Vi: hev olredi kımpli:tıd đı först feyz, end vi: a:r on trek for đı dedlayn.',
        trMeaning: 'İlk aşamayı çoktan tamamladık ve teslim tarihi (deadline) için planlandığı gibi ilerliyoruz.',
        tip: '"On track" = Rayında, programa uygun ilerliyor. "Deadline" = Son teslim tarihi.'
      },
      {
        speaker: 'A',
        speakerName: 'Proje Yöneticisi',
        en: 'Could we schedule a follow-up meeting for Thursday at 2 PM?',
        trRead: 'Kud vi: skecul ı folou-ap mi:ting for Θörzdey et tu: pi-em?',
        trMeaning: 'Perşembe günü saat 14:00 için bir takip toplantısı planlayabilir miyiz?',
        tip: 'Follow-up meeting = Takip/değerlendirme toplantısı.'
      },
      {
        speaker: 'B',
        speakerName: 'Sen',
        en: "Thursday at 2 PM works for me. I'll send out the calendar invite.",
        trRead: 'Θörzdey et tu: pi-em vörks for mi:. Ayl send aut đı kelındır invayt.',
        trMeaning: 'Perşembe saat 14:00 benim için uygun. Takvim davetini göndereceğim.',
        tip: '"That works for me" = Bu saat/gün bana uyar, benim için uygundur!'
      }
    ]
  }
];
