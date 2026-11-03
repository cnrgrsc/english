// LinguaMaster — Kişisel Çalışma Planlayıcısı, "Nerede Kaldım?" Takipçisi ve Aktivite Geçmişi
import { LEVEL_ROADMAP, REFERENCE_TABLES } from './levelCurriculumData.js';
import { icon } from '../ui/icons.js';

export const STUDY_PLANS = [
  {
    id: 'light',
    label: 'Hafif Tempo',
    minutes: 15,
    dailyTarget: 3,
    desc: 'Günde 15 dk • 1 Müfredat Dersi + 1 Tablo + 1 Ses/Kelime Pratiği',
    badge: '15 dk / gün'
  },
  {
    id: 'standard',
    label: 'Standart Tempo',
    minutes: 30,
    dailyTarget: 4,
    desc: 'Günde 30 dk • 2 Müfredat Dersi + 1 Tablo + Kelime & Sohbet Pratiği',
    badge: '30 dk / gün'
  },
  {
    id: 'intensive',
    label: 'Yoğun Tempo',
    minutes: 60,
    dailyTarget: 6,
    desc: 'Günde 60 dk • Hızlı Seviye Atlama, Gramer, Diyalog ve Bölüm Sınavları',
    badge: '60 dk / gün'
  }
];

export const DEFAULT_DAILY_TASKS = [
  {
    id: 'dt-lesson',
    title: 'Sıradaki Müfredat Dersini Çalış',
    subtitle: 'A1 → C2 ders yolunda sıradaki üniteyi aç ve tamamla',
    category: 'Müfredat',
    xp: 20,
    actionLabel: 'Derse Git',
    actionType: 'nextLesson'
  },
  {
    id: 'dt-table',
    title: '1 Konu / Zamir Tablosunu İncele',
    subtitle: 'Tablodaki kuralları oku ve örnek cümleleri sesli dinle',
    category: 'Tablo & Gramer',
    xp: 15,
    actionLabel: 'Tabloyu Aç',
    actionType: 'openTables'
  },
  {
    id: 'dt-speech',
    title: 'Telaffuz & Ses Egzersizi Yap',
    subtitle: 'Alfabe veya günlük kalıplarda mikrofonla sesli okuma yap',
    category: 'Telaffuz',
    xp: 15,
    actionLabel: 'Pratik Yap',
    actionType: 'openAlphabet'
  },
  {
    id: 'dt-srs',
    title: 'Kelime Kartı (SRS) & Hızlı Test Çöz',
    subtitle: 'Görsel hafıza çivileriyle kelimeleri tekrar et',
    category: 'Hafıza & Test',
    xp: 20,
    actionLabel: 'Kartları Aç',
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

// Kullanıcının aktif seviyesindeki sıradaki 4 dersi döndürür (Dashboard Ders Yolu için)
export function getUpcomingUnitsList(progress, preferredLevel = 'ALL', count = 4) {
  const completed = progress.completedChecklist || [];
  const targetLvlObj =
    preferredLevel !== 'ALL'
      ? LEVEL_ROADMAP.find((l) => l.level === preferredLevel) || LEVEL_ROADMAP[0]
      : LEVEL_ROADMAP.find((l) => l.units.some((u) => !completed.includes(u.code))) || LEVEL_ROADMAP[0];

  const firstIncompleteIdx = targetLvlObj.units.findIndex((u) => !completed.includes(u.code));
  const startIdx = Math.max(0, firstIncompleteIdx === -1 ? 0 : firstIncompleteIdx - 1);
  return {
    level: targetLvlObj.level,
    levelTitle: targetLvlObj.title,
    totalInLevel: targetLvlObj.units.length,
    doneInLevel: targetLvlObj.units.filter((u) => completed.includes(u.code)).length,
    units: targetLvlObj.units.slice(startIdx, startIdx + count)
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

// Ana Merkez Sağ Sütun: Günlük Hedef & Görevler Widget'ı
export function renderResumeAndDailyCockpit(state) {
  const p = state.progress;
  const todayStr = new Date().toISOString().slice(0, 10);
  const completedDailyIds = (p.dailyCompleted && p.dailyCompleted[todayStr]) || [];
  const activePlan = STUDY_PLANS.find((sp) => sp.id === (p.studyPlanId || 'standard')) || STUDY_PLANS[1];
  const dailyPct = Math.round((completedDailyIds.length / DEFAULT_DAILY_TASKS.length) * 100);

  return `
    <div class="card p-5 space-y-4">
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            ${icon('target', 'w-5 h-5')}
          </div>
          <div>
            <h3 class="h3">Bugünün Çalışma Planı</h3>
            <p class="text-xs muted">${activePlan.label} (${activePlan.badge})</p>
          </div>
        </div>
        <span class="chip ${dailyPct === 100 ? 'chip-green' : 'chip-brand'}">
          ${completedDailyIds.length}/${DEFAULT_DAILY_TASKS.length} Görev
        </span>
      </div>

      <div class="progress">
        <span style="width: ${dailyPct}%"></span>
      </div>

      <div class="space-y-2">
        ${DEFAULT_DAILY_TASKS.map((task) => {
          const isDone = completedDailyIds.includes(task.id);
          return `
            <div class="p-3 rounded-xl border transition flex items-center justify-between gap-2.5 ${
              isDone
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/50'
                : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-slate-300'
            }">
              <button onclick="toggleDailyTask('${task.id}')" class="flex items-center gap-2.5 text-left flex-1 min-w-0">
                <span class="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 transition ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-ink-900 border border-slate-300 dark:border-slate-600 text-transparent hover:border-brand-500'
                }">✓</span>
                <div class="min-w-0">
                  <div class="text-xs font-semibold truncate ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}">${task.title}</div>
                  <div class="text-[11px] muted">${task.category} • +${task.xp} XP</div>
                </div>
              </button>
              <button onclick="runDailyTaskAction('${task.actionType}')" class="btn btn-secondary btn-sm shrink-0">
                <span>${task.actionLabel}</span>
                ${icon('chevronRight', 'w-3.5 h-3.5')}
              </button>
            </div>
          `;
        }).join('')}
      </div>

      <div class="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span class="text-xs muted">Kişisel notlar ve geçmiş</span>
        <button onclick="setTab('planner')" class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
          <span>Tüm Planı Aç</span>
          ${icon('arrowRight', 'w-3.5 h-3.5')}
        </button>
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
  const last = p.lastVisited || {
    title: 'Ders 9-10: İngiliz Alfabesi ve Harflerin Telaffuzları (A → Ey)',
    category: 'A1 Başlangıç • Alfabe & Ses',
    timeLabel: 'Başlangıç noktası'
  };

  const totalCurriculumUnits = LEVEL_ROADMAP.reduce((acc, l) => acc + l.units.length, 0);
  const doneCurriculumUnits = (p.completedChecklist || []).length;

  return `
    <div class="space-y-6 pb-8 anim-in">
      <!-- Üst Başlık & Özet İstatistikler -->
      <div class="card p-6 sm:p-7">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="space-y-2 max-w-2xl">
            <span class="chip chip-brand">
              ${icon('calendar', 'w-3.5 h-3.5')}
              <span>KİŞİSEL ÇALIŞMA PLANLAYICISI & İLERLEME RAPORU</span>
            </span>
            <h1 class="h1">Nerede Kaldım, Bugün Ne Çalışacağım ve Neler Yaptım?</h1>
            <p class="text-sm muted leading-relaxed">
              Son çalıştığın dersten tek tıkla devam et, günlük çalışma temponu ayarla, kendi ders notlarını ekle ve A1'den C2'ye kadar tamamladığın tüm adımları takip et.
            </p>
          </div>

          <div class="grid grid-cols-3 gap-3 shrink-0">
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-center">
              <div class="text-xl font-extrabold text-brand-600 dark:text-brand-400">${doneCurriculumUnits}/${totalCurriculumUnits}</div>
              <div class="text-[11px] font-semibold muted mt-0.5">Müfredat Ünitesi</div>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-center">
              <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${p.masteredTables.length}/${REFERENCE_TABLES.length}</div>
              <div class="text-[11px] font-semibold muted mt-0.5">Gramer Tablosu</div>
            </div>
            <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-center">
              <div class="text-xl font-extrabold text-amber-500">${p.masteredLetters.length}/26</div>
              <div class="text-[11px] font-semibold muted mt-0.5">Alfabe & Ses</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Kaldığım Yer & Sıradaki Önerilen Ders İkili Kartı -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="card p-5 border-l-4 border-l-brand-600 flex flex-col justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="chip chip-brand">SON ÇALIŞILAN KONU</span>
              <span class="text-xs muted">${last.timeLabel || 'Az önce'}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">${last.title}</h3>
            <p class="text-xs muted">${last.category || ''}</p>
          </div>
          <button onclick="resumeLastActivity()" class="btn btn-primary btn-md w-full">
            ${icon('play', 'w-4 h-4')}
            <span>Kaldığım Yerden Devam Et</span>
          </button>
        </div>

        <div class="card p-5 border-l-4 border-l-emerald-600 flex flex-col justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="chip chip-green">SIRADAKİ ÖNERİLEN MÜFREDAT DERSİN (${nextRec.level})</span>
              <span class="text-xs font-bold text-slate-400">${nextRec.unit.code}</span>
            </div>
            <h3 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">${nextRec.unit.title}</h3>
            <p class="text-xs muted">${nextRec.levelTitle}</p>
          </div>
          <div class="flex gap-2">
            <button onclick="startRecommendedUnit('${nextRec.unit.code}', '${nextRec.unit.targetTab || 'grammar'}', '${nextRec.unit.tableId || ''}', '${nextRec.unit.tenseId || ''}', '${nextRec.level}')" class="btn btn-secondary btn-md flex-1">
              ${icon('book', 'w-4 h-4')}
              <span>Dersi Aç</span>
            </button>
            <button onclick="toggleChecklistItem('${nextRec.unit.code}')" class="btn btn-success btn-md">
              ${icon('check', 'w-4 h-4')}
              <span>Bitirdim (+15 XP)</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 1. Çalışma Temposu Seçimi -->
      <div class="card p-5 sm:p-6 space-y-4">
        <div>
          <h2 class="h2">1. Günlük Çalışma Temponu Seç</h2>
          <p class="text-xs muted mt-0.5">Programına uygun günlük çalışma süresini belirle:</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          ${STUDY_PLANS.map((sp) => {
            const active = activePlanId === sp.id;
            return `
              <button onclick="selectStudyPlan('${sp.id}')" class="p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between gap-2 ${
                active
                  ? 'border-brand-600 bg-brand-50/40 dark:bg-brand-950/30'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }">
                <div class="flex items-center justify-between w-full">
                  <span class="chip ${active ? 'chip-brand' : 'chip-slate'}">${sp.badge}</span>
                  ${active ? `<span class="text-xs font-bold text-brand-600 dark:text-brand-400">✓ Seçili</span>` : ''}
                </div>
                <div class="font-bold text-base text-slate-900 dark:text-white mt-1">${sp.label}</div>
                <p class="text-xs muted leading-relaxed">${sp.desc}</p>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 2. Bugünün Görevleri & 3. Kişisel Çalışma Notlarım -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div class="card p-5 sm:p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="h2">2. Bugünün Adım Adım Görevleri</h2>
              <p class="text-xs muted mt-0.5">Her gün düzenli ilerlemek için bu 4 adımı tamamla:</p>
            </div>
            <span class="chip chip-green">${completedDailyIds.length}/${DEFAULT_DAILY_TASKS.length} Tamam</span>
          </div>

          <div class="space-y-2.5">
            ${DEFAULT_DAILY_TASKS.map((task, idx) => {
              const isDone = completedDailyIds.includes(task.id);
              return `
                <div class="p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                }">
                  <div onclick="toggleDailyTask('${task.id}')" class="cursor-pointer flex items-start gap-3 flex-1">
                    <span class="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isDone ? 'bg-emerald-600 text-white' : 'bg-brand-600 text-white'
                    }">${isDone ? '✓' : idx + 1}</span>
                    <div>
                      <div class="text-sm font-semibold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'}">${task.title}</div>
                      <p class="text-xs muted mt-0.5">${task.subtitle}</p>
                    </div>
                  </div>
                  <button onclick="runDailyTaskAction('${task.actionType}')" class="btn btn-primary btn-sm self-end sm:self-center shrink-0">
                    <span>${task.actionLabel}</span>
                    ${icon('arrowRight', 'w-3.5 h-3.5')}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Kişisel Çalışma Notlarım -->
        <div class="card p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div class="space-y-4">
            <div>
              <h2 class="h2">3. Kişisel Çalışma Notlarım & Hedeflerim</h2>
              <p class="text-xs muted mt-0.5">Tekrar etmek istediğin konuları veya kendine özel hedefleri buraya ekle:</p>
            </div>

            <div class="flex gap-2">
              <input id="custom-note-input" type="text" placeholder="Örn: Yarın Present Perfect tablosunu tekrar et..." onkeydown="if(event.key==='Enter') addCustomStudyNote()" class="input flex-1" />
              <button onclick="addCustomStudyNote()" class="btn btn-primary btn-md shrink-0">
                ${icon('plus', 'w-4 h-4')}
                <span>Ekle</span>
              </button>
            </div>

            <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
              ${customNotes.length === 0 ? `
                <div class="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-1">
                  <div class="text-xs font-semibold text-slate-600 dark:text-slate-300">Henüz kişisel not eklemedin</div>
                  <p class="text-[11px] muted">Unutmak istemediğin bir gramer kuralını veya yarın çalışacağın dersi buraya yazabilirsin.</p>
                </div>
              ` : customNotes.map((note) => `
                <div class="p-3 rounded-xl border flex items-center justify-between gap-2 ${
                  note.done
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700'
                }">
                  <button onclick="toggleCustomStudyNote('${note.id}')" class="flex items-center gap-2.5 text-left flex-1">
                    <span class="w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                      note.done ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-ink-900 border border-slate-300 dark:border-slate-600 text-transparent'
                    }">✓</span>
                    <div>
                      <div class="text-xs sm:text-sm font-semibold ${note.done ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}">${note.text}</div>
                      <div class="text-[10px] muted">${note.date}</div>
                    </div>
                  </button>
                  <button onclick="deleteCustomStudyNote('${note.id}')" class="icon-btn" title="Notu Sil">
                    ${icon('trash', 'w-4 h-4')}
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Seviye Bazlı Müfredat Tamamlanma Durumu (A1 -> C2) -->
      <div class="card p-5 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="h2">4. Seviyelere Göre Müfredat İlerlemen (A1 → C2)</h2>
            <p class="text-xs muted mt-0.5">Hangi seviyede kaç ünite tamamladığını takip et:</p>
          </div>
          <button onclick="setTab('roadmap')" class="btn btn-secondary btn-sm">Tüm Müfredatı Aç →</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${levelSummaries.map((st) => `
            <div onclick="setGlobalLevel('${st.level}'); setTab('roadmap')" class="card card-hover p-4 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="chip chip-brand">Seviye ${st.level}</span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-200">%${st.pct} (${st.done}/${st.total} Ünite)</span>
              </div>
              <div class="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">${st.title}</div>
              <div class="progress">
                <span style="width: ${st.pct}%"></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Neler Yaptım? (Kronolojik Çalışma ve Tamamlama Geçmişi) -->
      <div class="card p-5 sm:p-6 space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="h2">5. Neler Yaptım? — Çalışma ve Tamamlama Geçmişim</h2>
            <p class="text-xs muted mt-0.5">Tamamladığın dersler, öğrendiğin tablolar, harfler ve çözdüğün çalışmalar kronolojik olarak listelenir:</p>
          </div>
          ${logs.length > 0 ? `<span class="chip chip-slate">Son ${logs.length} kayıt</span>` : ''}
        </div>

        ${logs.length === 0 ? `
          <div class="p-8 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center space-y-1.5">
            <div class="text-sm font-semibold text-slate-700 dark:text-slate-200">Henüz kayıtlı bir çalışma geçmişin yok</div>
            <p class="text-xs muted max-w-md mx-auto">Ders haritasından bir üniteyi "Bitir" olarak işaretlediğinde, bir tabloyu veya harfi öğrendiğinde tüm geçmişin burada listelenecek.</p>
          </div>
        ` : `
          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            ${logs.map((item) => `
              <div class="py-3 flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <span class="chip chip-green shrink-0">${item.badge || '✓ Tamam'}</span>
                  <div class="min-w-0">
                    <div class="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">${item.title}</div>
                    <div class="text-[11px] muted">${item.category || 'Çalışma Kaydı'}</div>
                  </div>
                </div>
                <span class="text-xs font-medium muted shrink-0">${item.time}</span>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    </div>
  `;
}
