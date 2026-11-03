# 🚀 LinguaMaster — Kapsamlı Ürün, Geliştirme ve Mobil Ticari Yol Haritası

Bu doküman, **LinguaMaster (A1 → C2 Görsel, Fonetik ve Akılda Kalıcı İngilizce Öğrenim Platformu)** projesinin mevcut mimarisini, tamamlanan kapsamlı web özelliklerini, gelir modelini (Monetization) ve **iOS / Android** mağazalarına çıkış adımlarını içerir.

---

## 📌 FAZ 1: Kapsamlı Web Uygulaması (Tamamlanan & Aktif Sistem)

### 1.1. Çekirdek Öğrenim Modülleri
1. **A1 → C2 Akademik Müfredat Haritası (`src/data/levelCurriculumData.js`):**
   - **62 Ana Ünite & 289 Alt Ders:** A1 Başlangıçtan C2 Ana Dil seviyesine kadar tüm konular.
   - Her üniteden tek tıkla ilgili gramer tablosuna, zaman çizelgesine veya fonetik laboratuvarına doğrudan geçiş (`goToUnitLesson`).
2. **26 Harf & Fonetik Ses Laboratuvarı (`src/data/alphabetData.js`):**
   - Her harfin Türkçe okunuş şifresi (`A → Ey`, `B → Bi`, `W → Dabılyu`), IPA sembolü, görsel çapası (`🍎 Apple`) ve ağız/dil pozisyonu.
   - `TH`, `SH`, `CH`, `GH`, `PH`, `TION`, `Silent Letters (K, W, B)` okunuş kuralları.
   - **Web Speech API (TTS & STT):** Amerikan (`🇺🇸 US`) ve İngiliz (`🇬🇧 UK`) aksanlarında normal/yavaş dinleme ve mikrofonla telaffuz doğruluğu ölçümü (`%` skor).
3. **21+ Kapsamlı Zamir, Gramer & C1–C2 Akademik Tablo:**
   - Şahıs, Nesne, İyelik Sıfatı, İyelik Zamiri ve Dönüşlü Zamirlerin tek tabloda karşılaştırması.
   - `To Be`, `Have Got`, `A/An/The`, Çoğul Kuralları, `Some/Any/Much/Many`, `Can/Must/Should`, `Comparative/Superlative`, `Passive Voice`, `Conditionals (Type 0-1-2-3)`, `Relative Clauses`, `Reported Speech`, `Causatives`, `Inversion`, `Cleft Sentences`, `Phrasal Verbs` ve `C2 Idioms`.
4. **Görsel Hafıza İnfografikleri & SVG Zaman Çizelgeleri (`src/data/visualAssets.js`):**
   - Cümle içi 5 zamir türünün renkli konum şeması.
   - `IN / ON / AT` Zaman ve Mekan Görsel Piramidi.
   - Yer edatları (`in, on, under, next to, between, opposite`) görsel kutu şeması.
   - 12 İngilizce zaman için özel **SVG Zaman Çizelgesi (Timeline)**.
5. **Sesli Hikayeler (Graded Readers) & Akıllı Seviye Tespit Sınavı (`src/ui/placementAndStory.js`):**
   - **10 Soruluk Akıllı Seviye Tespit Sınavı (Placement Test):** Kullanıcının A1–C2 arasındaki gerçek seviyesini ölçer ve kişisel çalışma rotası oluşturur.
   - **Çift Dilli Sesli Hikaye Stüdyosu (A1 → C1):** Cümle cümle seslendirme, Türkçe okunuş rehberi, hikaye içi anahtar kelimeler ve okuduğunu anlama soruları.
   - **Rozet & Başarım Sistemi (Achievements):** Öğrenme motivasyonunu artıran oyunlaştırılmış rozetler.
6. **Kişisel Çalışma Planlayıcısı & "Nerede Kaldım?" Kokpiti (`src/data/studyPlanner.js`):**
   - Son çalışılan dersi otomatik kaydeden ve tek tıkla devam ettiren sistem.
   - Günlük çalışma hedefi (`10 / 15 / 30 / 45 dk`), günlük 4 görev checklist'i, not defteri ve JSON yedekleme.
7. **5 Soruluk İnteraktif Pratik Motoru & Global Arama (`src/ui/lessonPlayer.js`):**
   - Sesten harf bulma, kelime dizerek cümle kurma, zamir boşluk doldurma ve diyalog tamamlama sorularından oluşan odaklanmış ders oturumu.
   - `Ctrl + K` ile tüm müfredat, tablo ve kelimeler içinde anlık arama.

---

## 💰 FAZ 2: Ticari Gelir Modeli (Monetization Stratejisi)

Uygulamayı gelir üreten bir SaaS / Mobil ürüne dönüştürürken uygulanacak **Freemium + Pro Abonelik** mimarisi:

### 2.1. Ücretsiz (Free) Katman — Kullanıcı Kazanımı & Viral Büyüme
- **Akıllı Seviye Tespit Sınavı** (Tamamen ücretsiz — kullanıcıyı içeri çeker).
- **A1 Seviyesi Tüm Üniteler** ve **26 Harf Fonetik Stüdyosu**.
- **Günde 1 Adet 5 Soruluk Pratik Oturumu** ve **1 Sesli Hikaye**.
- **Ödüllü Reklam (Google AdMob):** Ücretsiz kullanıcı *"1 Kısa Video İzle → Ekstra Pratik / Hikaye Aç"* seçeneğiyle reklam geliri üretir.

### 2.2. LinguaMaster PRO (Abonelik & Ömür Boyu Paket)
- **A2, B1, B2, C1 ve C2** seviyelerindeki tüm 62 ünite ve 21+ ileri düzey tablo.
- **Sınırsız Sesli Hikaye Stüdyosu** ve **Sınırsız Mikrofonlu Diyalog Simülatörü**.
- **Sınırsız Görsel Hafıza Kartları (SM-2 Aralıklı Tekrar)** ve **Çevrimdışı (Offline) Çalışma Modu**.
- **YDS / YÖKDİL / IELTS Akademik Kelime & Sınav Kampı**.
- **Önerilen Türkiye Fiyatlandırması:**
  - Aylık PRO: `129 TL / ay`
  - Yıllık PRO: `799 TL / yıl` (%48 indirimli ana satış paketi)
  - Ömür Boyu (Lifetime) PRO: `1.499 TL` (Tek seferlik nakit akışı paketi)

---

## 📱 FAZ 3: iOS ve Android Mobil Uygulamaya Geçiş Planı

Mevcut kod tabanımız (`src/data/*.js` ve `src/ui/*.js`) %100 modüler JavaScript olarak yazıldığı için **veri ve iş mantığının tamamı** mobilde sıfır kayıpla kullanılır.

### Aşama 3.1 — Hızlı Mağaza Çıkışı: CapacitorJS (1–3 Gün)
Mevcut web uygulamasını doğrudan App Store (`.ipa`) ve Google Play (`.aab`) paketine dönüştürme:
1. `npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android`
2. `npx cap init LinguaMaster com.linguamaster.app --web-dir .`
3. Native eklentilerin bağlanması:
   - `@capacitor-community/text-to-speech` (Telefonun yerleşik ses motoru)
   - `@capacitor-community/speech-recognition` (Native mikrofon tanıma)
   - `@capacitor/local-notifications` (Akşamları *"🔥 Serin bozulmasın!"* bildirimi)
   - `@revenuecat/purchases-capacitor` (App Store & Google Play abonelik tahsilatı)

### Aşama 3.2 — Bulut Senkronizasyon & Kullanıcı Hesapları (Supabase)
1. **Ücretsiz Supabase Projesi** oluşturulur.
2. **Google & Apple ile Tek Tıkla Giriş (Auth)** eklenir.
3. `localStorage` içindeki `state.progress` verisi (`xp`, `streakDays`, `completedChecklist`, `srsMap`, `lastVisited`) kullanıcının bulut hesabıyla senkronize edilir; böylece hem telefondan hem webden aynı ilerlemeyle devam edilir.

### Aşama 3.3 — Sosyal Medya & ASO (Mağaza Optimizasyonu) Büyüme Planı
- **TikTok / Instagram Reels / YouTube Shorts Formatı:**
  - *"İngilizcede 5 Zamir Tek Şemada Nasıl Çözülür?"*
  - *"Abandon kelimesini 'Abone' ile 5 saniyede ezberle!"*
  - *"TH sesini peltek S ve Z olarak 10 saniyede çıkar!"*
- Uygulama içindeki görsel şemalar ve hafıza çivileri doğrudan kısa video içeriği olarak paylaşıldığında sıfır reklam bütçesiyle organik indirme sağlar.
