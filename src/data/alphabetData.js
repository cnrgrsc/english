


export const ALPHABET_DATA = [
  {
    letter: 'A',
    lower: 'a',
    nameTr: 'Ey',
    ipa: '/eɪ/',
    type: 'vowel',
    mouthTip: 'Ağzını hafifçe "E" der gibi aç ve çeneni yukarı kapatarak "Y" sesine doğru kaydır: E-y.',
    soundVariations: 'Tek başına harf adı "Ey"dir ama kelimelerde 4 farklı sese bürünür: Kısa "e/a" (Cat), Uzun "ey" (Cake), Kalın "a" (Car), Belirsiz "ı/ə" (About).',
    turkishTrap: 'Her gördüğün A harfini Türkçe "A" gibi düz okumak! Sonunda sessizE varsa (Make, Take) her zaman "Ey" diye okunur.',
    examples: [
      { word: 'Apple', ipa: '/ˈæp.əl/', trRead: 'Epıl', meaning: 'Elma', soundNote: 'Ağzı geniş açarak E-A arası ses (/æ/)' },
      { word: 'Make', ipa: '/meɪk/', trRead: 'Meyk', meaning: 'Yapmak', soundNote: 'Sonundaki E harfi A\'yı kendi adı olan "Ey" yapar' },
      { word: 'Water', ipa: '/ˈwɔː.tər/', trRead: 'Voğtır', meaning: 'Su', soundNote: 'W sonrası A harfi "O"ya yakın okunur' }
    ]
  },
  {
    letter: 'B',
    lower: 'b',
    nameTr: 'Bi:',
    ipa: '/biː/',
    type: 'consonant',
    mouthTip: 'İki dudağını birbirine bastırıp ses tellerini titreterek patlat ("Bi" uzatarak).',
    soundVariations: 'Kelime başında ve ortasında Türkçe B gibidir. Ancak "M" harfinden sonra gelirse (mb) tamamen SESSİZDİR!',
    turkishTrap: 'Climb (Klaym), Bomb (Bom), Plumber (Plamır) gibi kelimelerde sondaki B harfini okumaya çalışmak.',
    examples: [
      { word: 'Book', ipa: '/bʊk/', trRead: 'Buk', meaning: 'Kitap', soundNote: 'Net B sesi' },
      { word: 'Believe', ipa: '/bɪˈliːv/', trRead: 'Bili:v', meaning: 'İnanmak', soundNote: 'Vurgu ikinci hecede' },
      { word: 'Climb', ipa: '/klaɪm/', trRead: 'Klaym', meaning: 'Tırmanmak', soundNote: 'Sondaki B harfi okunmaz!' }
    ]
  },
  {
    letter: 'C',
    lower: 'c',
    nameTr: 'Si:',
    ipa: '/siː/',
    type: 'consonant',
    mouthTip: 'Harfin adı Türkçedeki "C" değil, dişlerin arasından tıslanan uzun "Si:" sesidir!',
    soundVariations: 'Kendisinden sonra E, I, Y gelirse "S" okunur (City, Center). A, O, U veya ünsüz gelirse "K" okunur (Cat, Cold).',
    turkishTrap: 'İngilizcedeki C harfini Türkçedeki "Cem"in C\'si sanmak! İngilizcede tek başına C asla "C" diye okunmaz, ya S ya K olur.',
    examples: [
      { word: 'City', ipa: '/ˈsɪt.i/', trRead: 'Siti', meaning: 'Şehir', soundNote: 'C + i geldiği için "S" okunur' },
      { word: 'Coffee', ipa: '/ˈkɒf.i/', trRead: 'Kofi', meaning: 'Kahve', soundNote: 'C + o geldiği için "K" okunur' },
      { word: 'Success', ipa: '/səkˈses/', trRead: 'Sıkses', meaning: 'Başarı', soundNote: 'İlk C "K", ikinci C (e geldiği için) "S" okunur!' }
    ]
  },
  {
    letter: 'D',
    lower: 'd',
    nameTr: 'Di:',
    ipa: '/diː/',
    type: 'consonant',
    mouthTip: 'Dil ucunu üst dişlerinin hemen arkasındaki damağa (dişlere değil!) dokundurup çek.',
    soundVariations: 'Genelde "D" okunur. Amerikan aksanında iki ünlü arasında (Water, Better) hızlı "R/D" karışımı çarpmalı okunur.',
    turkishTrap: 'Wednesday (Çarşamba) kelimesindeki ilk D harfi sessizdir: "Venzdey" diye okunur!',
    examples: [
      { word: 'Day', ipa: '/deɪ/', trRead: 'Dey', meaning: 'Gün', soundNote: 'Damaktan gelen net D' },
      { word: 'Door', ipa: '/dɔːr/', trRead: 'Do:r', meaning: 'Kapı', soundNote: 'Uzun o sesi ile' },
      { word: 'Wednesday', ipa: '/ˈwenz.deɪ/', trRead: 'Venzdey', meaning: 'Çarşamba', soundNote: 'Ortadaki D harfi okunmaz!' }
    ]
  },
  {
    letter: 'E',
    lower: 'e',
    nameTr: 'İ:',
    ipa: '/iː/',
    type: 'vowel',
    mouthTip: 'Gülümser gibi dudaklarını yana çek ve uzun bir "İ:" sesi çıkar.',
    soundVariations: 'Kısa kelimelerde "E" (Bed, Pen), uzun olduğunda "İ:" (Me, See) okunur. Kelime sonundaki tek E harfi (Make, Love) OKUNMAZ!',
    turkishTrap: 'Kelime sonundaki E harfini okumak (Örn: "Come" kelimesini "Kome" diye okumak; doğrusu "Kam").',
    examples: [
      { word: 'Bed', ipa: '/bed/', trRead: 'Bed', meaning: 'Yatak', soundNote: 'Kısa açık E sesi' },
      { word: 'Evening', ipa: '/ˈiːv.nɪŋ/', trRead: 'İ:vning', meaning: 'Akşam', soundNote: 'Başlangıçtaki E kendi adı gibi "İ:" okunur' },
      { word: 'Time', ipa: '/taɪm/', trRead: 'Taym', meaning: 'Zaman', soundNote: 'Sondaki E sessizdir, I harfini "Ay" yapar' }
    ]
  },
  {
    letter: 'F',
    lower: 'f',
    nameTr: 'Ef',
    ipa: '/ef/',
    type: 'consonant',
    mouthTip: 'Üst dişlerini alt dudağının iç kısmına hafifçe değdirip nefesi üfle.',
    soundVariations: 'Her zaman "F" okunur. Sadece tek F\'li "of" edatı "ov" (V sesiyle) okunur!',
    turkishTrap: '"Of" (nın/nin) kelimesini "Off" (kapalı) ile karıştırmak. "Of" -> "Ov" diye yumuşak okunur.',
    examples: [
      { word: 'Family', ipa: '/ˈfæm.əl.i/', trRead: 'Femili', meaning: 'Aile', soundNote: 'Net F sesi' },
      { word: 'Friend', ipa: '/frend/', trRead: 'Frend', meaning: 'Arkadaş', soundNote: 'Aradaki i harfi okunmaz' },
      { word: 'Of', ipa: '/əv/', trRead: 'Ov / Iv', meaning: '-nın, -nin', soundNote: 'İstisna: Tek F burada V gibi okunur!' }
    ]
  },
  {
    letter: 'G',
    lower: 'g',
    nameTr: 'Ci:',
    ipa: '/dʒiː/',
    type: 'consonant',
    mouthTip: 'Harfin adı "Ci:"dir! Türkçedeki C harfi gibidir ama biraz daha vurgulu.',
    soundVariations: 'A, O, U önünde sert "G" (Go, Game); E, I, Y önünde genellikle "C" (Gym, Giant, Age) okunur (Get ve Give istisnadır!).',
    turkishTrap: '"Foreign" (Forın), "Sign" (Sayn), "Design" (Dizayn) kelimelerindeki G harfi tamamen sessizdir.',
    examples: [
      { word: 'Game', ipa: '/ɡeɪm/', trRead: 'Geym', meaning: 'Oyun', soundNote: 'Sert G sesi' },
      { word: 'Change', ipa: '/tʃeɪndʒ/', trRead: 'Çeync', meaning: 'Değişmek', soundNote: 'G + e geldiği için "C" okunur' },
      { word: 'Sign', ipa: '/saɪn/', trRead: 'Sayn', meaning: 'İşaret / İmza', soundNote: 'N harfinden önceki G okunmaz!' }
    ]
  },
  {
    letter: 'H',
    lower: 'h',
    nameTr: 'Eyç',
    ipa: '/eɪtʃ/',
    type: 'consonant',
    mouthTip: 'Boğazı sıkmadan, göğüsten gelen yumuşak bir nefes verme sesi ("H"). Harf adı: "Eyç".',
    soundVariations: 'Tek başına "H" okunur. Ama C, S, T, P, G harfleriyle birleşince bambaşka sesler üretir (ch=ç, sh=ş, ph=f, th=peltek).',
    turkishTrap: 'Hour (Auır - Saat) ve Honest (Anıst - Dürüst) kelimelerinde baştaki H tamamen SESSİZDİR!',
    examples: [
      { word: 'House', ipa: '/haʊs/', trRead: 'Haus', meaning: 'Ev', soundNote: 'Ferah nefesli H' },
      { word: 'Hour', ipa: '/aʊər/', trRead: 'Auır', meaning: 'Saat (Süre)', soundNote: 'Baştaki H sessizdir!' },
      { word: 'Phone', ipa: '/fəʊn/', trRead: 'Foun', meaning: 'Telefon', soundNote: 'P + H birleşince "F" olur' }
    ]
  },
  {
    letter: 'I',
    lower: 'i',
    nameTr: 'Ay',
    ipa: '/aɪ/',
    type: 'vowel',
    mouthTip: 'Ağzını "A" için açıp hızla "Y" sesine daralt: "Ay". Tek başına yazıldığında "Ben" demektir.',
    soundVariations: 'Açık hecede ve sessiz E varsa "Ay" (Time, Like, I); kapalı kısa hecede ise kısa "İ" (Sit, Big, In) okunur.',
    turkishTrap: 'İngilizcede büyük "İ" (noktalı) ve küçük "ı" (noktasız) YOKTUR! Büyük harf her zaman "I", küçüğü her zaman "i"dir.',
    examples: [
      { word: 'Ice', ipa: '/aɪs/', trRead: 'Ays', meaning: 'Buz', soundNote: 'Harfin kendi adı olan "Ay" okunuşu' },
      { word: 'Sit', ipa: '/sɪt/', trRead: 'Sit', meaning: 'Oturmak', soundNote: 'Kısa ve gevşek İ sesi' },
      { word: 'First', ipa: '/fɜːst/', trRead: 'Först', meaning: 'Birinci / İlk', soundNote: 'I + R birleşince "Ö"ye yakın okunur' }
    ]
  },
  {
    letter: 'J',
    lower: 'j',
    nameTr: 'Cey',
    ipa: '/dʒeɪ/',
    type: 'consonant',
    mouthTip: 'Türkçedeki "Jale"nin J\'si DEĞİL, "Cemil"in "C" sesiyle başlar! Harf adı: "Cey".',
    soundVariations: 'Kelimelerde neredeyse her zaman güçlü bir "C" (/dʒ/) olarak okunur.',
    turkishTrap: 'Job (Meslek) kelimesini "Job" (J ile) okumak! Doğrusu "Cab / Cob" (C sesi ile).',
    examples: [
      { word: 'Job', ipa: '/dʒɒb/', trRead: 'Cab', meaning: 'İş / Meslek', soundNote: 'C sesi ile başlar' },
      { word: 'Just', ipa: '/dʒʌst/', trRead: 'Cast', meaning: 'Sadece / Az önce', soundNote: 'C + a sesi' },
      { word: 'Enjoy', ipa: '/ɪnˈdʒɔɪ/', trRead: 'İncoy', meaning: 'Keyif almak', soundNote: 'Ortada net C sesi' }
    ]
  },
  {
    letter: 'K',
    lower: 'k',
    nameTr: 'Key',
    ipa: '/keɪ/',
    type: 'consonant',
    mouthTip: 'Dil kökünü üst damağın arkasına vurarak hafif nefes patlamalı "K" sesi çıkar. Harf adı: "Key".',
    soundVariations: 'Normalde "K" okunur. ALTIN KURAL: Kelime başında "KN" yan yana gelirse "K" harfi HİÇ OKUNMAZ!',
    turkishTrap: 'Know (Bilmek) kelimesini "Kınow" veya Knife (Bıçak) kelimesini "Kınayf" diye okumak! Doğrusu: "Nou" ve "Nayf".',
    examples: [
      { word: 'Keep', ipa: '/kiːp/', trRead: 'Ki:p', meaning: 'Tutmak / Saklamak', soundNote: 'Net K sesi' },
      { word: 'Know', ipa: '/nəʊ/', trRead: 'Nou', meaning: 'Bilmek', soundNote: 'K+N kuralı: Baştaki K sessizdir!' },
      { word: 'Knife', ipa: '/naɪf/', trRead: 'Nayf', meaning: 'Bıçak', soundNote: 'Baştaki K okunmaz!' }
    ]
  },
  {
    letter: 'L',
    lower: 'l',
    nameTr: 'El',
    ipa: '/el/',
    type: 'consonant',
    mouthTip: 'Dil ucunu üst diş etine değdir: "El". Kelime sonunda biraz daha kalın (Dark L) çıkar.',
    soundVariations: 'Başta ince L (Light), sonda kalın L (Ball). "Could, Would, Should, Walk, Talk, Half" kelimelerinde L SESSİZDİR!',
    turkishTrap: 'Walk (Yürümek) ve Talk (Konuşmak) derken L harfini okumak! Doğrusu: "Vo:k" ve "To:k".',
    examples: [
      { word: 'Learn', ipa: '/lɜːn/', trRead: 'Lörn', meaning: 'Öğrenmek', soundNote: 'Net L başlangıcı' },
      { word: 'Talk', ipa: '/tɔːk/', trRead: 'To:k', meaning: 'Konuşmak', soundNote: 'L harfi sessizdir!' },
      { word: 'Would', ipa: '/wʊd/', trRead: 'Vud', meaning: '-ecekti / İsterdim', soundNote: 'L harfi hiç okunmaz!' }
    ]
  },
  {
    letter: 'M',
    lower: 'm',
    nameTr: 'Em',
    ipa: '/em/',
    type: 'consonant',
    mouthTip: 'Dudaklarını kapatıp sesi burnundan titreştirerek çıkar: "Em".',
    soundVariations: 'Türkçedeki M sesiyle birebir aynıdır, sürprizi yoktur.',
    examples: [
      { word: 'Mind', ipa: '/maɪnd/', trRead: 'Maynd', meaning: 'Zihin / Akıl', soundNote: 'Net M sesi' },
      { word: 'Money', ipa: '/ˈmʌn.i/', trRead: 'Mani', meaning: 'Para', soundNote: 'O harfi burada A gibi okunur' },
      { word: 'Time', ipa: '/taɪm/', trRead: 'Taym', meaning: 'Zaman', soundNote: 'Kelime sonunda dudaklar kapanır' }
    ]
  },
  {
    letter: 'N',
    lower: 'n',
    nameTr: 'En',
    ipa: '/en/',
    type: 'consonant',
    mouthTip: 'Dil ucunu üst diş etine bastırıp havayı burundan ver: "En".',
    soundVariations: 'Tek başına "N"dir. Ama sonunda "NG" olduğunda (Going, Sing) sondaki G patlatılmaz, genizden gelen tek bir "ŋ" sesi çıkar.',
    turkishTrap: '"Going" derken sonunda sert bir "G" veya "K" sesi ("Goingk") çıkarmak! Sadece genizden N sesi uzatılır.',
    examples: [
      { word: 'Need', ipa: '/niːd/', trRead: 'Ni:d', meaning: 'İhtiyaç duymak', soundNote: 'Uzun i ile' },
      { word: 'Morning', ipa: '/ˈmɔː.nɪŋ/', trRead: 'Mo:ning', meaning: 'Sabah', soundNote: 'Sondaki g yumuşak geniz sesidir' },
      { word: 'Autumn', ipa: '/ˈɔː.təm/', trRead: 'O:tım', meaning: 'Sonbahar', soundNote: 'M\'den sonra gelen N kelimenin sonunda okunmaz!' }
    ]
  },
  {
    letter: 'O',
    lower: 'o',
    nameTr: 'Ou',
    ipa: '/əʊ/',
    type: 'vowel',
    mouthTip: 'Türkçedeki gibi düz "O" değil! "O" diye başlayıp dudaklarını "U" der gibi büzerek bitir: "Ou".',
    soundVariations: 'Uzun okunuşu "Ou" (Go, No, Home), kısa okunuşu "A/O" arası (Hot, Not), bazen de doğrudan "A" (Love, Come, Money).',
    turkishTrap: '"Go" ve "No" kelimelerini dümdüz "Go" diye okumak. "Gou" ve "Nou" şeklinde yuvarlanmalıdır.',
    examples: [
      { word: 'Go', ipa: '/ɡəʊ/', trRead: 'Gou', meaning: 'Gitmek', soundNote: 'O-u şeklinde kayan ses' },
      { word: 'Love', ipa: '/lʌv/', trRead: 'Lav', meaning: 'Sevmek / Aşk', soundNote: 'Buradaki O harfi "A" diye okunur' },
      { word: 'Book', ipa: '/bʊk/', trRead: 'Buk', meaning: 'Kitap', soundNote: 'Çift O (oo) genellikle "U" sesi verir' }
    ]
  },
  {
    letter: 'P',
    lower: 'p',
    nameTr: 'Pi:',
    ipa: '/piː/',
    type: 'consonant',
    mouthTip: 'Dudaklarını birleştirip güçlü bir nefes patlamasıyla aç: "Pi:".',
    soundVariations: 'Normalde "P"dir. "PH" yan yana gelirse her zaman "F" okunur (Photo -> Foto). "PS" başında P sessizdir (Psychology -> Saykoloci).',
    examples: [
      { word: 'People', ipa: '/ˈpiː.pəl/', trRead: 'Pi:pıl', meaning: 'İnsanlar', soundNote: 'eo harfleri uzun i: okunur' },
      { word: 'Photo', ipa: '/ˈfəʊ.təʊ/', trRead: 'Foutou', meaning: 'Fotoğraf', soundNote: 'PH = F sesi verir' },
      { word: 'Psychology', ipa: '/saɪˈkɒl.ə.dʒi/', trRead: 'Saykalıci', meaning: 'Psikoloji', soundNote: 'Baştaki P okunmaz!' }
    ]
  },
  {
    letter: 'Q',
    lower: 'q',
    nameTr: 'Kyu:',
    ipa: '/kjuː/',
    type: 'consonant',
    mouthTip: 'K ve Yu seslerini birleştir: "Kyu:".',
    soundVariations: 'İngilizcede Q harfi neredeyse her zaman yanına "U" alarak ("QU") yazılır ve "Kv / Kw" diye okunur.',
    examples: [
      { word: 'Question', ipa: '/ˈkwes.tʃən/', trRead: 'Kvesçın', meaning: 'Soru', soundNote: 'Qu = Kw sesi' },
      { word: 'Quick', ipa: '/kwɪk/', trRead: 'Kvik', meaning: 'Hızlı / Çabuk', soundNote: 'Dudaklar büzülerek başlar' },
      { word: 'Quiet', ipa: '/ˈkwaɪ.ət/', trRead: 'Kvayıt', meaning: 'Sessiz / Sakin', soundNote: 'Kway-ıt' }
    ]
  },
  {
    letter: 'R',
    lower: 'r',
    nameTr: 'A:r',
    ipa: '/ɑːr/',
    type: 'consonant',
    mouthTip: 'ÇOK ÖNEMLİ: Dilin ucu damağa ASLA değmez ve titremez! Dilini hafifçe geriye kıvırıp boşlukta tutarak "R" sesi ver. Harf adı: "A:r".',
    soundVariations: 'Amerikan aksanında her R yuvarlanarak okunur (Car -> Ka:r). İngiliz aksanında ünlüden sonra gelen R okunmaz, sesi uzatır (Car -> Ka:).',
    turkishTrap: 'Türkçedeki gibi dili damağa çarptırıp "Trrr" diye sert R çıkarmak! İngilizce R çok yumuşak ve boşluktadır.',
    examples: [
      { word: 'Right', ipa: '/raɪt/', trRead: 'Rayt', meaning: 'Doğru / Sağ', soundNote: 'Dudakları hafif büzüp dili değdirmeden R' },
      { word: 'World', ipa: '/wɜːld/', trRead: 'Vörld', meaning: 'Dünya', soundNote: 'O+R birleşimi "Ör" sesi verir' },
      { word: 'Write', ipa: '/raɪt/', trRead: 'Rayt', meaning: 'Yazmak', soundNote: 'R\'den önceki W harfi sessizdir!' }
    ]
  },
  {
    letter: 'S',
    lower: 's',
    nameTr: 'Es',
    ipa: '/es/',
    type: 'consonant',
    mouthTip: 'Dişleri yaklaştırıp ince bir tıslama çıkar: "Es".',
    soundVariations: 'Başta "S" (Sun), iki ünlü arasında veya çoğul ekinde çoğu zaman "Z" (Easy -> İ:zi, Has -> Hez), "SH" veya "SION" içinde "Ş/J" olur.',
    turkishTrap: '"Island" (Ada) kelimesindeki S harfi tamamen SESSİZDİR! "Aylınd" diye okunur.',
    examples: [
      { word: 'Speak', ipa: '/spiːk/', trRead: 'Spi:k', meaning: 'Konuşmak', soundNote: 'Başına "İ" eklemeden doğrudan S-p' },
      { word: 'Easy', ipa: '/ˈiː.zi/', trRead: 'İ:zi', meaning: 'Kolay', soundNote: 'İki ünlü arasındaki S "Z" okunur' },
      { word: 'Island', ipa: '/ˈaɪ.lənd/', trRead: 'Aylınd', meaning: 'Ada', soundNote: 'S harfi kesinlikle okunmaz!' }
    ]
  },
  {
    letter: 'T',
    lower: 't',
    nameTr: 'Ti:',
    ipa: '/tiː/',
    type: 'consonant',
    mouthTip: 'Dil ucunu üst diş etine dokundurup nefesli bir patlama yap: "Ti:".',
    soundVariations: 'T+H peltek ses verir. T+ION her zaman "Şın" okunur (Station -> Steyşın). T+URE her zaman "Çır" okunur (Future -> Fyu:çır).',
    turkishTrap: '"Listen" (Lisın - Dinlemek), "Castle" (Kesıl - Kale) ve "Often" (Ofın - Sık sık) kelimelerinde T okunmaz!',
    examples: [
      { word: 'Time', ipa: '/taɪm/', trRead: 'Taym', meaning: 'Zaman', soundNote: 'Nefesli T başlangıcı' },
      { word: 'Listen', ipa: '/ˈlɪs.ən/', trRead: 'Lisın', meaning: 'Dinlemek', soundNote: 'Ortadaki T sessizdir!' },
      { word: 'Future', ipa: '/ˈfjuː.tʃər/', trRead: 'Fyu:çır', meaning: 'Gelecek', soundNote: '-ture eki "çır" diye okunur' }
    ]
  },
  {
    letter: 'U',
    lower: 'u',
    nameTr: 'Yu:',
    ipa: '/juː/',
    type: 'vowel',
    mouthTip: 'Harfin adı "U" değil, "Yu:"dur! Y sesiyle başlayıp U\'ya uzanır.',
    soundVariations: 'Uzun okunuşu "Yu:" (University, Use). Kısa kapalı hecede "A" (Up -> Ap, Sun -> San, But -> Bat). Bazense kısa "U" (Put).',
    turkishTrap: '"University" (Yunivörsiti) derken "Yu" (Y ünsüz sesi) ile başladığı için başına "an" değil "a university" gelir!',
    examples: [
      { word: 'Use', ipa: '/juːz/', trRead: 'Yu:z', meaning: 'Kullanmak', soundNote: 'Harfin kendi adı gibi "Yu:" okunur' },
      { word: 'Under', ipa: '/ˈʌn.dər/', trRead: 'Andır', meaning: 'Altında', soundNote: 'Kısa U harfi net bir "A" sesi verir' },
      { word: 'Put', ipa: '/pʊt/', trRead: 'Put', meaning: 'Koymak', soundNote: 'Burada gerçek Türkçe U gibi okunur' }
    ]
  },
  {
    letter: 'V',
    lower: 'v',
    nameTr: 'Vi:',
    ipa: '/viː/',
    type: 'consonant',
    mouthTip: 'Üst dişlerin alt dudağına MUTLAKA değmeli ve titremelidir: "Vi:". (W ile farkı budur!).',
    soundVariations: 'Her zaman diş-dudak temasıyla net bir "V" olarak okunur.',
    examples: [
      { word: 'Very', ipa: '/ˈver.i/', trRead: 'Veri', meaning: 'Çok', soundNote: 'Üst dişler alt dudağa değer' },
      { word: 'Voice', ipa: '/vɔɪs/', trRead: 'Voys', meaning: 'Ses (İnsan sesi)', soundNote: 'Net V başlangıcı' },
      { word: 'Have', ipa: '/hæv/', trRead: 'Hev', meaning: 'Sahip olmak', soundNote: 'Sondaki E okunmaz, V net duyulur' }
    ]
  },
  {
    letter: 'W',
    lower: 'w',
    nameTr: 'Dabılyu:',
    ipa: '/ˈdʌb.əl.juː/',
    type: 'consonant',
    mouthTip: 'Harf adı: "Dabılyu:" (Double U - Çift U). Okurken dişler dudağa DEĞMEZ! Dudakları öpücük verir gibi "U" şeklinde büzüp açarak "V/U" arası ses çıkar.',
    soundVariations: 'Kelime başında "WR" yan yana gelirse (Write, Wrong) W harfi HİÇ OKUNMAZ! "Who" ve "Whole" kelimelerinde de sessizdir.',
    turkishTrap: 'W harfini normal V gibi dişleri dudağa değdirerek okumak. "What" derken "U-at -> Vat" gibi dudak büzülmelidir.',
    examples: [
      { word: 'Water', ipa: '/ˈwɔː.tər/', trRead: 'Voğtır', meaning: 'Su', soundNote: 'Dudakları büzerek başla' },
      { word: 'Wrong', ipa: '/rɒŋ/', trRead: 'Rong', meaning: 'Yanlış', soundNote: 'W+R kuralı: Baştaki W okunmaz!' },
      { word: 'Who', ipa: '/huː/', trRead: 'Hu:', meaning: 'Kim', soundNote: 'Burada W sessizdir, H okunur!' }
    ]
  },
  {
    letter: 'X',
    lower: 'x',
    nameTr: 'Eks',
    ipa: '/eks/',
    type: 'consonant',
    mouthTip: 'K ve S seslerini hızla birleştir: "Eks".',
    soundVariations: 'Kelime ortasında ve sonunda "Ks" (Box -> Boks) veya "Gz" (Exam -> İgzem) okunur. Kelime en başındaysa "Z" okunur (Xylophone -> Zaylıfoun).',
    examples: [
      { word: 'Box', ipa: '/bɒks/', trRead: 'Boks', meaning: 'Kutu', soundNote: 'Ks sesi verir' },
      { word: 'Example', ipa: '/ɪɡˈzɑːm.pəl/', trRead: 'İgzempıl', meaning: 'Örnek', soundNote: 'İki ünlü arasında "Gz" okunur' },
      { word: 'Text', ipa: '/tekst/', trRead: 'Tekst', meaning: 'Metin / Mesaj', soundNote: 'Net Ks sesi' }
    ]
  },
  {
    letter: 'Y',
    lower: 'y',
    nameTr: 'Vay',
    ipa: '/waɪ/',
    type: 'consonant',
    mouthTip: 'Harfin adı: "Vay" (Dudak büzerek W-ay). Kelime başında Türkçe "Y" gibidir.',
    soundVariations: 'Kelime başında "Y" (Yes), kısa kelimenin sonunda "Ay" (My -> May, Fly -> Flay), uzun kelimenin sonunda ise kısa "İ" (Happy -> Hepi, City -> Siti) okunur.',
    turkishTrap: 'Harfin adı "Vay" olduğu için kelimelerde de V okunacağını sanmak. "Yes" her zaman "Yes"tir!',
    examples: [
      { word: 'Yesterday', ipa: '/ˈjes.tə.deɪ/', trRead: 'Yestırdey', meaning: 'Dün', soundNote: 'Kelime başında net Y sesi' },
      { word: 'Sky', ipa: '/skaɪ/', trRead: 'Skay', meaning: 'Gökyüzü', soundNote: 'Tek heceli sonda "Ay" okunur' },
      { word: 'Family', ipa: '/ˈfæm.əl.i/', trRead: 'Femili', meaning: 'Aile', soundNote: 'Çok heceli sonda "İ" okunur' }
    ]
  },
  {
    letter: 'Z',
    lower: 'z',
    nameTr: 'Zed / Zi:',
    ipa: '/zed/ • /ziː/',
    type: 'consonant',
    mouthTip: 'Dişlerini birleştirip arı vızıltısı gibi ses tellerini titreştir: Amerikan "Zi:", İngiliz "Zed".',
    soundVariations: 'Her zaman net ve titreşimli "Z" olarak okunur.',
    examples: [
      { word: 'Zero', ipa: '/ˈzɪə.rəʊ/', trRead: 'Zirou', meaning: 'Sıfır', soundNote: 'Titreşimli Z sesi' },
      { word: 'Zone', ipa: '/zəʊn/', trRead: 'Zoun', meaning: 'Bölge / Alan', soundNote: 'Sondaki E okunmaz' },
      { word: 'Amazing', ipa: '/əˈmeɪ.zɪŋ/', trRead: 'Imeyzing', meaning: 'Harika / Şaşırtıcı', soundNote: 'Akıcı Z geçişi' }
    ]
  }
];

export const PHONETIC_RULES = [
  {
    id: 'th-unvoiced',
    combo: 'TH (Peltek S)',
    title: 'Nefesli Peltek TH (/θ/)',
    ipa: '/θ/',
    trApprox: 'Peltek S (Dil dişlerin arasında)',
    howToProduce: 'Dilinin ucunu üst ve alt ön dişlerinin arasına hafifçe çıkar ve sadece HAVA ÜFLE (S der gibi ama dil dışarıda). Asla T veya S deme!',
    mnemonicTip: '🧠 Hafıza Çivisi: Düşünürken (THINK) ve Teşekkür ederken (THANK) dilini dişlerinin arasına ısır!',
    examples: [
      { word: 'Think', trRead: 'θink (Peltek S-ink)', meaning: 'Düşünmek' },
      { word: 'Thank you', trRead: 'θenk yu:', meaning: 'Teşekkür ederim' },
      { word: 'Three', trRead: 'θri:', meaning: 'Üç (3) - "Tri" dersen Ağaç (Tree) olur!' }
    ]
  },
  {
    id: 'th-voiced',
    combo: 'TH (Peltek Z/D)',
    title: 'Titreşimli Peltek TH (/ð/)',
    ipa: '/ð/',
    trApprox: 'Peltek Z / D karışımı',
    howToProduce: 'Yine dilinin ucunu ön dişlerinin arasına koy ama bu kez boğazını TİTREŞTİREREK "Z / D" arası bir ses çıkar.',
    mnemonicTip: '🧠 Hafıza Çivisi: İşaret ettiğin kelimelerde (THIS, THAT, THE, THEY) ve ailede (MOTHER, FATHER, BROTHER) her zaman titreşimli peltek vardır!',
    examples: [
      { word: 'This / That', trRead: 'Đis / Đet', meaning: 'Bu / Şu' },
      { word: 'The', trRead: 'Đı / Đi', meaning: 'Belirli tanımlık eki' },
      { word: 'Brother', trRead: 'Brađır', meaning: 'Erkek kardeş' }
    ]
  },
  {
    id: 'magic-e',
    combo: 'Sessiz E (Magic E)',
    title: 'Kelime Sonundaki Sihirli "E" Kuralı',
    ipa: 'a_e / i_e / o_e',
    trApprox: 'Ortadaki Ünlüyü Kendi Alfabe Adıyla Okutur!',
    howToProduce: 'Bir kelimenin sonunda E varsa o E harfi HİÇ OKUNMAZ; ama bir önceki ünlü harfe sihirli değnek değdirip onu alfabedeki kendi adıyla (A=Ey, I=Ay, O=Ou, U=Yu) okutur!',
    mnemonicTip: '🧠 Hafıza Çivisi: Sonda E görürsen onu sustur, ortadaki ünlüyü alfabedeki adıyla bağır! (Hat=Het -> Hate=Heyt)',
    examples: [
      { word: 'Make / Take', trRead: 'Meyk / Teyk', meaning: 'Yapmak / Almak (A -> Ey oldu)' },
      { word: 'Time / Like', trRead: 'Taym / Layk', meaning: 'Zaman / Beğenmek (I -> Ay oldu)' },
      { word: 'Home / Note', trRead: 'Houm / Nout', meaning: 'Ev / Not (O -> Ou oldu)' }
    ]
  },
  {
    id: 'sh-ch-ph',
    combo: 'SH • CH • PH',
    title: 'Ünsüz İkilileri (Digraphs)',
    ipa: '/ʃ/ • /tʃ/ • /f/',
    trApprox: 'SH = Ş  |  CH = Ç  |  PH = F',
    howToProduce: 'İngilizcede çengelli Ş ve Ç harfleri olmadığı için yanlarına H harfi alarak bu sesleri üretirler.',
    mnemonicTip: '🧠 Hafıza Çivisi: S+H = Şşş sessiz ol (She)! C+H = Çay iç (Chair)! P+H = Fotoğraf çek (Photo)!',
    examples: [
      { word: 'She / Shop', trRead: 'Şi: / Şop', meaning: 'O (Kadın) / Mağaza' },
      { word: 'Chair / Watch', trRead: 'Çeır / Voç', meaning: 'Sandalye / İzlemek, Saat' },
      { word: 'Phone / Elephant', trRead: 'Foun / Elifınt', meaning: 'Telefon / Fil' }
    ]
  },
  {
    id: 'tion-sion',
    combo: '-TION / -SION',
    title: 'Binlerce Kelimeyi Çözen "-tion" Eki',
    ipa: '/ʃən/ • /ʒən/',
    trApprox: '-ŞIN veya -JIN',
    howToProduce: 'Kelime sonundaki "-tion" her zaman "-şın" diye okunur. "-sion" ise ünlüden sonra gelirse "-jın" (Decision), ünsüzden sonra gelirse "-şın" (Mission) okunur.',
    mnemonicTip: '🧠 Hafıza Çivisi: Türkçedeki "-syon" (İstasyon, Enflasyon, Televizyon) kelimelerinin tamamı İngilizcede "-tion/-sion" ile biter ve "-şın/-jın" okunur!',
    examples: [
      { word: 'Information', trRead: 'İnfırmeyşın', meaning: 'Bilgi' },
      { word: 'Situation', trRead: 'Siçueyşın', meaning: 'Durum' },
      { word: 'Decision', trRead: 'Disijın', meaning: 'Karar' }
    ]
  },
  {
    id: 'silent-letters',
    combo: 'KN • WR • MB • GH',
    title: 'Hayalet (Sessiz) Harfler Kuralı',
    ipa: 'Ø (Okunmaz)',
    trApprox: 'Yazılır Ama Asla Okunmaz!',
    howToProduce: 'Eski İngilizceden kalan bu harfler yazılışta durur ama konuşurken tamamen yutulur.',
    mnemonicTip: '🧠 Hafıza Çivisi: KNife (Bıçak) K\'yi keser atar! WRite (Yazmak) W\'yu siler! CliMB (Tırmanmak) B\'yi zirvede bırakır! NiGHt (Gece) GH karanlıkta görünmez!',
    examples: [
      { word: 'Know / Knee', trRead: 'Nou / Ni:', meaning: 'Bilmek / Diz (K okunmaz)' },
      { word: 'Write / Wrist', trRead: 'Rayt / Rist', meaning: 'Yazmak / Bilek (W okunmaz)' },
      { word: 'Night / Though', trRead: 'Nayt / Đou', meaning: 'Gece / Rağmen (GH okunmaz)' }
    ]
  },
  {
    id: 'schwa',
    combo: 'Schwa (/ə/)',
    title: 'İngilizcenin Sırrı: Tembel "I/E" Sesi (Schwa)',
    ipa: '/ə/',
    trApprox: 'Çok kısa, belirsiz "ı" sesi',
    howToProduce: 'Ağzını hiç kasmadan, dudaklarını ve dilini tamamen serbest bırakıp çıkardığın en kısa "ı/e" sesi. Vurgusuz hecelerdeki A, E, I, O, U harflerinin hepsi bu sese dönüşür!',
    mnemonicTip: '🧠 Hafıza Çivisi: Ana dili İngilizce olanlar vurgusuz heceleri okumaya üşenir ve hepsini "ı"ya çevirir: About -> Ibaut, Today -> Tıdey, Doctor -> Doktır!',
    examples: [
      { word: 'About / Again', trRead: 'Ibaut / Igen', meaning: 'Hakkında / Tekrar (Baştaki A -> ı oldu)' },
      { word: 'Today / Tomorrow', trRead: 'Tıdey / Tımorou', meaning: 'Bugün / Yarın (To -> Tı oldu)' },
      { word: 'Teacher / Doctor', trRead: 'Ti:çır / Doktır', meaning: 'Öğretmen / Doktor (Sondaki er/or -> ır oldu)' }
    ]
  }
];

