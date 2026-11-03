// LinguaMaster — Akıllı Çalışma Planlayıcısı, "Nerede Kaldım?" Takipçisi ve Aktivite Geçmişi
import { LEVEL_ROADMAP, REFERENCE_TABLES, LEVEL_EXAMS } from './levelCurriculumData.js';
import { ALPHABET_DATA, PHONETIC_RULES } from './alphabetData.js';
import { GRAMMAR_TENSES } from './grammarData.js';
import { PHRASE_PATTERNS, CONVERSATION_SCENARIOS } from './conversationsData.js';
import { MNEMONIC_VOCAB_DATA } from './vocabularyData.js';

export const STUDY_PLANS = [
  {
    id: 'light',
    label: 'Hafif Tempo',
    minutes: 15,
    dailyTarget: 3,
    desc: 'Günde 15 dk • 1 Müfredat Dersi + 1 Tablo + 1 Ses/Kelime Pratiği',
    badge: '🌱 15 dk/gün'
  },
  {
    id: 'standard',
    label: 'Standart Tempo',
    minutes: 30,
    dailyTarget: 4,
    desc: 'Günde 30 dk • 2 Müfredat Dersi + 1 Tablo + Kelime & Sohbet Pratiği',
    badge: '⚡ 30 dk/gün'
  },
  {
    id: 'intensive',
    label: 'Yoğun Tempo',
    minutes: 60,
    dailyTarget: 6,
    desc: 'Günde 60 dk • Hızlı Seviye Atlama, Gramer, Diyalog ve Bölüm Sınavları',
    badge: '🔥 60 dk/gün'
  }
];

export const DEFAULT_DAILY_TASKS = [
  {
    id: 'dt-lesson',
    title: 'Sıradaki Müfredat Dersini Çalış & Bitir',
    subtitle: 'A1 → C2 ders haritasında kaldığın üniteyi incele ve tamamla olarak işaretle',
    category: 'Müfredat',
    xp: 20,
    actionLabel: 'Derse Git →',
    actionType: 'nextLesson'
  },
  {
    id: 'dt-table',
    title: '1 Konu / Zamir Tablosunu Sesli İncele',
    subtitle: 'Tablodaki kuralları oku ve en az 2 canlı örnek cümleyi sesli dinle',
    category: 'Tablo & Gramer',
    xp: 15,
    actionLabel: 'Tabloları Aç →',
    actionType: 'openTables'
  },
  {
    id: 'dt-speech',
    title: 'Harf veya Günlük Kalıp Telaffuz Pratiği Yap',
    subtitle: 'Alfabe veya günlük sohbet kalıplarında mikrofonla sesli okuma yap',
    category: 'Telaffuz & Ses',
    xp: 15,
    actionLabel: 'Telaffuza Git →',
    actionType: 'openAlphabet'
  },
  {
    id: 'dt-srs',
    title: '3 Kelime Kartı (SRS) veya Cümle Kurma Çöz',
    subtitle: 'Görsel hafıza çivileriyle kelimeleri tekrar et ve cümle kur',
    category: 'Hafıza & Test',
    xp: 20,
    actionLabel: 'Kartları Aç →',
    actionType: 'openSrs'
  }
];

// Kullanıcının müfredatta sıradaki tamamlamadığı ilk dersi bulur
export function getNextRecommendedUnit(progress, preferredLevel = 'ALL') {
  const completed = progress.completedChecklist || [];
  const pools =
    preferredLevel !== 'ALL'
      ? [
          ...LEVEL_ROADMAP.filter((l) => l.level === preferredLevel),
          ...LEVEL_ROADMAP.filter((l) => l.level !== preferredLevel)
        ]
      : LEVEL_ROADMAP;

  for (const lvlObj of pools) {
    for (const unit of lvlObj.units) {
      if (!completed.includes(unit.code)) {
        return {
          level: lvlObj.level,
          levelTitle: lvlObj.title,
          unit
        };
      }
    }
  }
  const firstLvl = LEVEL_ROADMAP[0];
  return {
    level: firstLvl.level,
    levelTitle: firstLvl.title,
    unit: firstLvl.units[0]
  };
}

// Tüm A1-C2 seviyelerindeki ünite tamamlanma istatistiklerini hesaplar
export function getLevelProgressSummary(progress) {
  const completed = progress.completedChecklist || [];
  return LEVEL_ROADMAP.map((lvl) => {
    const total = lvl.units.length;
    const done = lvl.units.filter((u) => completed.includes(u.code)).length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    return {
      level: lvl.level,
      title: lvl.title.split('—')[1]?.trim() || lvl.title,
      total,
      done,
      pct
    };
  });
}

// Ana Merkez (Home) üstünde yer alacak "Kaldığım Yerden Devam Et & Bugünün Planı" Kompakt Kokpiti
export function renderResumeAndDailyCockpit(state) {
  const p = state.progress;
  const last = p.lastVisited || {
    title: 'Ders 9-10: İngiliz Alfabesi ve Harflerin Telaffuzları (A → Ey)',
    category: 'A1 Başlangıç • Alfabe & Ses',
    level: 'A1',
    timeLabel: 'Henüz başlanmadı',
    tab: 'alphabet',
    tableId: '',
    tenseId: ''
  };
  const nextRec = getNextRecommendedUnit(p, state.selectedLevel);
  const todayStr = new Date().toISOString().slice(0, 10);
  const completedDailyIds = (p.dailyCompleted && p.dailyCompleted[todayStr]) || [];
  const activePlan = STUDY_PLANS.find((sp) => sp.id === (p.studyPlanId || 'standard')) || STUDY_PLANS[1];
  const recentLogs = (p.activityLog || []).slice(0, 4);

  return `
    <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 modern-card overflow-hidden">
      <!-- Üst Başlık Barı -->
      <div class="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span class="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            📌 KİŞİSEL ÇALIŞMA MERKEZİ — NEREDE KALDIM & NELER YAPTIM?
          </span>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-bold">
            ${activePlan.badge} • Bugün: ${completedDailyIds.length}/${DEFAULT_DAILY_TASKS.length} Görev
          </span>
          <button onclick="setTab('planner')" class="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
            📅 Tüm Planı & Geçmişi Aç →
          </button>
        </div>
      </div>

      <!-- 3 Sütunlu Kokpit: 1. Kaldığım Yer + Sıradaki Ders | 2. Bugünün Planı | 3. Son Yaptıklarım -->
      <div class="p-5 grid grid-cols-1 lg:grid-cols-3 gap-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/70 dark:divide-slate-800">
        
        <!-- Sütun 1: Nerede Kaldım & Sıradaki Müfredat Dersin -->
        <div class="space-y-3.5 lg:pr-3">
          <div class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">1. KALDIĞIN YERDEN DEVAM ET</div>
          
          <!-- Son Çalışılan Konu Kartı -->
          <div class="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 space-y-2">
            <div class="flex items-center justify-between gap-2">
              <span class="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-extrabold uppercase">SON ÇALIŞILAN</span>
              <span class="text-[11px] font-semibold text-slate-500 dark:text-slate-400">${last.timeLabel || 'Az önce'}</span>
            </div>
            <div class="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">${last.title}</div>
            <div class="text-xs text-slate-500 dark:text-slate-400 font-medium">${last.category}</div>
            <button onclick="resumeLastActivity()" class="w-full mt-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5">
              <span>▶️ Kaldığım Yerden Devam Et</span>
            </button>
          </div>

          <!-- Sıradaki Önerilen Müfredat Dersi -->
          <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/70 space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400">🎯 SIRADAKİ MÜFREDAT DERSİN (${nextRec.level})</span>
              <span class="text-[11px] font-bold text-slate-400">${nextRec.unit.code}</span>
            </div>
            <div class="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-snug">${nextRec.unit.title}</div>
            <div class="flex items-center gap-2 pt-1">
              <button onclick="startRecommendedUnit('${nextRec.unit.code}', '${nextRec.unit.targetTab || 'grammar'}', '${nextRec.unit.tableId || ''}', '${nextRec.unit.tenseId || ''}', '${nextRec.level}')" class="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-bold transition">
                📖 Dersi Aç
              </button>
              <button onclick="toggleChecklistItem('${nextRec.unit.code}')" class="py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
                ✓ Bitirdim (+15 XP)
              </button>
            </div>
          </div>
        </div>

        <!-- Sütun 2: Bugünün Çalışma Planı (Günlük Hedef Listesi) -->
        <div class="pt-4 lg:pt-0 lg:px-4 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">2. BUGÜNÜN ÇALIŞMA PLANI</span>
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">${completedDailyIds.length}/${DEFAULT_DAILY_TASKS.length} Tamamlandı</span>
          </div>

          <div class="space-y-2">
            ${DEFAULT_DAILY_TASKS.map((task) => {
              const isDone = completedDailyIds.includes(task.id);
              return `
                <div class="p-2.5 rounded-xl border transition flex items-center justify-between gap-2 ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-700/70'
                }">
                  <button onclick="toggleDailyTask('${task.id}')" class="flex items-center gap-2.5 text-left flex-1 min-w-0">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-transparent'
                    }">✓</span>
                    <div class="truncate">
                      <div class="text-xs font-bold truncate ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}">${task.title}</div>
                      <div class="text-[10px] text-slate-500 dark:text-slate-400">${task.category} • +${task.xp} XP</div>
                    </div>
                  </button>
                  <button onclick="runDailyTaskAction('${task.actionType}')" class="shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-blue-600 dark:text-blue-400 transition">
                    ${task.actionLabel}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sütun 3: Neler Yaptım? (Son Aktiviteler & Seviye Özeti) -->
        <div class="pt-4 lg:pt-0 lg:pl-4 space-y-3 flex flex-col justify-between">
          <div class="space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">3. SON YAPTIKLARIM (ÖZET)</span>
              <button onclick="setTab('planner')" class="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Tümünü Gör →</button>
            </div>

            ${recentLogs.length === 0 ? `
              <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-1">
                <div class="text-xs font-bold text-slate-600 dark:text-slate-300">Henüz tamamlanan ders kaydı yok</div>
                <p class="text-[11px] text-slate-400">Bir harf, tablo veya ders tamamladığında burada saat ve tarihiyle listelenir.</p>
              </div>
            ` : `
              <div class="space-y-1.5">
                ${recentLogs.map((log) => `
                  <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] shrink-0">${log.badge || '✓'}</span>
                      <span class="font-semibold text-slate-700 dark:text-slate-200 truncate">${log.title}</span>
                    </div>
                    <span class="text-[10px] text-slate-400 shrink-0">${log.time}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- Seviye Bazlı Mini İlerleme Çubukları -->
          <div class="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div class="text-[10px] font-bold text-slate-400 uppercase mb-1.5">SEVİYE İLERLEME DURUMUN (A1 → C2)</div>
            <div class="grid grid-cols-6 gap-1.5">
              ${getLevelProgressSummary(p).map((st) => `
                <div onclick="setGlobalLevel('${st.level}'); setTab('roadmap')" class="cursor-pointer p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-center transition">
                  <div class="text-[10px] font-extrabold text-slate-700 dark:text-slate-200">${st.level}</div>
                  <div class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden my-1">
                    <div class="h-full bg-blue-600 rounded-full" style="width: ${st.pct}%"></div>
                  </div>
                  <div class="text-[9px] font-bold text-slate-400">${st.done}/${st.total}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Tam Sayfa "📅 Çalışma Planım & İlerleme Geçmişim" Sekmesi
export function renderStudyPlannerPage(state) {
  const p = state.progress;
  const todayStr = new Date().toISOString().slice(0, 10);
  const completedDailyIds = (p.dailyCompleted && p.dailyCompleted[todayStr]) || [];
  const activePlanId = p.studyPlanId || 'standard';
  const nextRec = getNextRecommendedUnit(p, state.selectedLevel);
  const levelSummaries = getLevelProgressSummary(p);
  const customNotes = p.customStudyNotes || [];
  const logs = p.activityLog || [];

  const totalCurriculumUnits = LEVEL_ROADMAP.reduce((acc, l) => acc + l.units.length, 0);
  const doneCurriculumUnits = (p.completedChecklist || []).length;

  return `
    <div class="space-y-6 pb-8 animate-fadeIn">
      <!-- Üst Modern Banner -->
      <div class="modern-hero rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-slate-800">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
              📅 KİŞİSEL ÇALIŞMA PLANLAYICISI & İLERLEME TAKİBİ
            </span>
            <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Nerede Kaldım, Bugün Ne Çalışacağım ve Neler Yaptım?
            </h1>
            <p class="text-slate-300 text-sm leading-relaxed">
              Çalışma temponu seç, kaldığın dersten tek tıkla devam et, kendi çalışma notlarını ekle ve A1'den C2'ye kadar tamamladığın tüm konuları takip et.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-2.5 shrink-0">
            <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div class="text-xl font-black text-blue-400">${doneCurriculumUnits}/${totalCurriculumUnits}</div>
              <div class="text-[11px] text-slate-300 font-semibold mt-0.5">Müfredat Ünitesi</div>
            </div>
            <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div class="text-xl font-black text-emerald-400">${p.masteredTables.length}/${REFERENCE_TABLES.length}</div>
              <div class="text-[11px] text-slate-300 font-semibold mt-0.5">Gramer Tablosu</div>
            </div>
            <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div class="text-xl font-black text-sky-400">${p.masteredLetters.length}/26</div>
              <div class="text-[11px] text-slate-300 font-semibold mt-0.5">Alfabe & Ses</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 1. Çalışma Temposu Seçimi -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 modern-card space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">1. Günlük Çalışma Temponu Seç</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Sana uygun günlük hedefi belirle; her gün adım adım ilerle.</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          ${STUDY_PLANS.map((sp) => {
            const active = activePlanId === sp.id;
            return `
              <button onclick="selectStudyPlan('${sp.id}')" class="p-4 rounded-xl border-2 text-left transition flex flex-col justify-between gap-2 ${
                active
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-blue-300'
              }">
                <div class="flex items-center justify-between w-full">
                  <span class="px-2.5 py-0.5 rounded-md text-xs font-bold ${active ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}">${sp.badge}</span>
                  ${active ? `<span class="text-xs font-extrabold text-blue-600 dark:text-blue-400">✓ Aktif Plan</span>` : ''}
                </div>
                <div class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-1">${sp.label}</div>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">${sp.desc}</p>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 2. Kaldığım Yer & Bugünün Görevleri + Kişisel Çalışma Notlarım -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <!-- Sol: Bugünün Yapılacaklar Listesi -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 modern-card space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">2. Bugünün Adım Adım Ders Planı</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Bugün çalışmaya başladığında sırasıyla bu 4 adımı uygula:</p>
            </div>
            <span class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
              ${completedDailyIds.length}/${DEFAULT_DAILY_TASKS.length} Tamam
            </span>
          </div>

          <div class="space-y-2.5">
            ${DEFAULT_DAILY_TASKS.map((task, idx) => {
              const isDone = completedDailyIds.includes(task.id);
              return `
                <div class="p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/70'
                }">
                  <div onclick="toggleDailyTask('${task.id}')" class="cursor-pointer flex items-start gap-3 flex-1">
                    <span class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 ${
                      isDone ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                    }">${isDone ? '✓' : idx + 1}</span>
                    <div>
                      <div class="text-sm font-bold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}">${task.title}</div>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${task.subtitle}</p>
                    </div>
                  </div>
                  <button onclick="runDailyTaskAction('${task.actionType}')" class="self-end sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
                    ${task.actionLabel}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Sağ: Kendi Çalışma Hedeflerim & Notlarım ("Şu konuyu tekrar et" vb.) -->
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 modern-card flex flex-col justify-between space-y-4">
          <div class="space-y-4">
            <div>
              <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">3. Kişisel Çalışma Notlarım & Hedeflerim</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Kendine özel tekrar notları veya çalışma hedefleri ekle (ör. "Ders 24 soru cümlelerini tekrar et"):</p>
            </div>

            <div class="flex gap-2">
              <input id="custom-note-input" type="text" placeholder="Yeni çalışma hedefi veya ders notu yaz..." onkeydown="if(event.key==='Enter') addCustomStudyNote()" class="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium focus:outline-none focus:border-blue-600" />
              <button onclick="addCustomStudyNote()" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition">
                + Ekle
              </button>
            </div>

            <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
              ${customNotes.length === 0 ? `
                <div class="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-1">
                  <div class="text-xs font-bold text-slate-600 dark:text-slate-300">Henüz kişisel not eklemedin</div>
                  <p class="text-[11px] text-slate-400">Unutmak istemediğin bir gramer kuralını, kelimeyi veya yarın çalışacağın konuyu buraya not alabilirsin.</p>
                </div>
              ` : customNotes.map((note) => `
                <div class="p-3 rounded-xl border flex items-center justify-between gap-2 ${
                  note.done
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700'
                }">
                  <button onclick="toggleCustomStudyNote('${note.id}')" class="flex items-center gap-2.5 text-left flex-1">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      note.done ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-transparent'
                    }">✓</span>
                    <div>
                      <div class="text-xs sm:text-sm font-bold ${note.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}">${note.text}</div>
                      <div class="text-[10px] text-slate-400">${note.date}</div>
                    </div>
                  </button>
                  <button onclick="deleteCustomStudyNote('${note.id}')" class="px-2 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-rose-600 transition">Sil</button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/50 flex items-center justify-between gap-3">
            <div>
              <div class="text-[11px] font-extrabold text-blue-700 dark:text-blue-300 uppercase">SIRADAKİ ÖNERİLEN MÜFREDAT DERSİN</div>
              <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">${nextRec.unit.code} — ${nextRec.unit.title}</div>
            </div>
            <button onclick="startRecommendedUnit('${nextRec.unit.code}', '${nextRec.unit.targetTab || 'grammar'}', '${nextRec.unit.tableId || ''}', '${nextRec.unit.tenseId || ''}', '${nextRec.level}')" class="shrink-0 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">
              Derse Başla →
            </button>
          </div>
        </div>
      </div>

      <!-- 4. Seviye Bazlı Müfredat Tamamlanma Durumu (A1 -> C2) -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 modern-card space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">4. Seviyelere Göre Müfredat İlerlemen (A1 → C2)</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Hangi seviyede kaç ünite bitirdin, nerede eksiğin var tek bakışta gör:</p>
          </div>
          <button onclick="setTab('roadmap')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Tüm Müfredatı Aç →</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${levelSummaries.map((st) => `
            <div onclick="setGlobalLevel('${st.level}'); setTab('roadmap')" class="cursor-pointer p-4 rounded-xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-extrabold">Seviye ${st.level}</span>
                <span class="text-xs font-extrabold text-slate-700 dark:text-slate-200">%${st.pct} (${st.done}/${st.total} Ünite)</span>
              </div>
              <div class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">${st.title}</div>
              <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full transition-all" style="width: ${st.pct}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Neler Yaptım? (Kronolojik Çalışma ve Tamamlama Geçmişi) -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200/90 dark:border-slate-800 modern-card space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">5. Neler Yaptım? — Çalışma ve Tamamlama Geçmişim</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Tamamladığın dersler, öğrendiğin tablolar, harfler ve çözdüğün çalışmalar burada kronolojik olarak tutulur.</p>
          </div>
          ${logs.length > 0 ? `<span class="text-xs font-bold text-slate-400">Son ${logs.length} kayıt</span>` : ''}
        </div>

        ${logs.length === 0 ? `
          <div class="p-8 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-2">
            <div class="text-sm font-bold text-slate-700 dark:text-slate-200">Henüz kayıtlı bir çalışma geçmişin yok</div>
            <p class="text-xs text-slate-500 max-w-md mx-auto">Ders haritasından bir üniteyi "Bitir" olarak işaretlediğinde, bir tabloyu veya harfi öğrendiğinde tüm geçmişin burada listelenecek.</p>
          </div>
        ` : `
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            ${logs.map((item) => `
              <div class="py-3 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <span class="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold shrink-0">
                    ${item.badge || '✓ Tamamlandı'}
                  </span>
                  <div class="min-w-0">
                    <div class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">${item.title}</div>
                    <div class="text-[11px] text-slate-500 dark:text-slate-400">${item.category || 'Çalışma Kaydı'}</div>
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-xs font-bold text-slate-400 block">${item.time}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}

