// LinguaMaster — Profesyonel Dil Öğrenme Platformu, Çalışma Planlayıcısı, Görsel Hafıza & A1-C2 Müfredat
import { ALPHABET_DATA, PHONETIC_RULES } from './src/data/alphabetData.js';
import { PHRASE_CATEGORIES, PHRASE_PATTERNS, CONVERSATION_SCENARIOS } from './src/data/conversationsData.js';
import { CORE_STRUCTURE_RULES, GRAMMAR_TENSES } from './src/data/grammarData.js';
import { MNEMONIC_VOCAB_DATA, SENTENCE_CHALLENGES } from './src/data/vocabularyData.js';
import { LEVEL_ROADMAP, REFERENCE_TABLES, LEVEL_EXAMS } from './src/data/levelCurriculumData.js';
import {
  LETTER_VISUAL_ANCHORS,
  VOCAB_VISUAL_SCENES,
  renderVisualInfographicsSection,
  renderTenseTimelineSVG
} from './src/data/visualAssets.js';
import {
  DEFAULT_DAILY_TASKS,
  getNextRecommendedUnit,
  getUpcomingUnitsList,
  renderResumeAndDailyCockpit,
  renderStudyPlannerPage
} from './src/data/studyPlanner.js';
import { icon } from './src/ui/icons.js';
import {
  buildInteractiveSessionQuestions,
  renderInteractivePlayerModal,
  renderSearchModal
} from './src/ui/lessonPlayer.js';

// Eski önbellekleri (linguamaster-v1 vb.) otomatik temizle ve #boot ekranını kaldır
(function clearLegacyCacheAndBoot() {
  const bootEl = document.getElementById('boot');
  if (bootEl) bootEl.remove();
  if ('caches' in window) {
    caches.keys().then((keys) => {
      keys.forEach((k) => {
        if (k !== 'linguamaster-v5') caches.delete(k);
      });
    });
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.update());
    });
  }
})();

// Profesyonel Bildirim (Toast) Sistemi
window.showToast = (message, badge = '✓') => {
  const container = document.getElementById('toasts');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-lift border border-slate-700/60 anim-pop';
  el.innerHTML = `<span class="px-2 py-0.5 rounded-md bg-brand-600 text-white text-[11px] font-extrabold">${badge}</span><span>${message}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.25s ease';
    setTimeout(() => el.remove(), 260);
  }, 2600);
};

// --- SESLENDİRME (TTS) VE MİKROFONLA TELAFFUZ ÖLÇÜMÜ (STT) ---
let currentAccent = 'en-US';

window.speakText = (text, rate = 0.95) => {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = currentAccent;
  u.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.lang.replace('_', '-') === currentAccent && (v.name.includes('Natural') || v.name.includes('Google'))) ||
    voices.find((v) => v.lang.replace('_', '-') === currentAccent) ||
    voices.find((v) => v.lang.startsWith('en'));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
};

function calcSimilarity(expected, actual) {
  const clean = (s) => s.toLowerCase().replace(/[^\w\s]/g, '').trim();
  const a = clean(expected);
  const b = clean(actual);
  if (!a || !b) return 0;
  if (a === b) return 100;
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  const maxLen = Math.max(a.length, b.length);
  return Math.max(0, Math.round(((maxLen - matrix[b.length][a.length]) / maxLen) * 100));
}

window.practiceSpeech = (targetText, resultElementId) => {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const el = document.getElementById(resultElementId);
  if (!SR) {
    if (el) el.innerHTML = `<span class="text-rose-600 font-bold text-xs">Tarayıcınız mikrofonla ses tanımayı desteklemiyor (Chrome/Safari önerilir).</span>`;
    return;
  }
  const rec = new SR();
  rec.lang = currentAccent;
  rec.interimResults = false;
  if (el) el.innerHTML = `<span class="text-indigo-600 font-bold text-xs animate-pulse">🎙️ Dinleniyor... Lütfen yüksek sesle "${targetText}" deyin...</span>`;
  rec.onresult = (e) => {
    const heard = e.results[0][0].transcript;
    const score = calcSimilarity(targetText, heard);
    const badgeColor = score >= 75 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300';
    if (el) {
      el.innerHTML = `
        <div class="mt-2 p-2.5 rounded-xl border ${badgeColor} flex items-center justify-between text-xs font-bold">
          <span>🎙️ Duyulan: "${heard}"</span>
          <span class="px-2 py-0.5 rounded-lg bg-white/80 font-black">Doğruluk: %${score}</span>
        </div>`;
    }
    if (score >= 75) addXp(10);
  };
  rec.onerror = () => {
    if (el) el.innerHTML = `<span class="text-rose-600 text-xs font-bold">Ses algılanamadı veya mikrofon izni verilmedi.</span>`;
  };
  rec.start();
};

// --- LOCALSTORAGE İLERLEME, ÇALIŞMA PLANI VE SM-2 ARALIKLI TEKRAR ---
const STORAGE_KEY = 'linguamaster_progress_v4';
function formatNowTime() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `Bugün ${hh}:${mm}`;
}

function loadProgress() {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ||
      localStorage.getItem('linguamaster_progress_v3') ||
      localStorage.getItem('linguamaster_progress_v2') ||
      localStorage.getItem('linguamaster_progress_v1');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        xp: parsed.xp || 50,
        streakDays: parsed.streakDays || 1,
        masteredLetters: parsed.masteredLetters || ['A'],
        masteredRules: parsed.masteredRules || [],
        masteredPhrases: parsed.masteredPhrases || [],
        masteredTenses: parsed.masteredTenses || [],
        masteredTables: parsed.masteredTables || [],
        completedChecklist: parsed.completedChecklist || [],
        completedScenarios: parsed.completedScenarios || [],
        srsMap: parsed.srsMap || {},
        studyPlanId: parsed.studyPlanId || 'standard',
        dailyCompleted: parsed.dailyCompleted || {},
        customStudyNotes: parsed.customStudyNotes || [],
        lastVisited: parsed.lastVisited || {
          title: 'Ders 9-10: İngiliz Alfabesi ve Harflerin Telaffuzları (A → Ey)',
          category: 'A1 Başlangıç • Alfabe & Ses',
          level: 'A1',
          timeLabel: 'Başlangıç noktası',
          tab: 'alphabet',
          tableId: '',
          tenseId: ''
        },
        activityLog: parsed.activityLog || []
      };
    }
  } catch {}
  return {
    xp: 50,
    streakDays: 1,
    masteredLetters: ['A'],
    masteredRules: [],
    masteredPhrases: [],
    masteredTenses: [],
    masteredTables: [],
    completedChecklist: [],
    completedScenarios: [],
    srsMap: {},
    studyPlanId: 'standard',
    dailyCompleted: {},
    customStudyNotes: [],
    lastVisited: {
      title: 'Ders 9-10: İngiliz Alfabesi ve Harflerin Telaffuzları (A → Ey)',
      category: 'A1 Başlangıç • Alfabe & Ses',
      level: 'A1',
      timeLabel: 'Başlangıç noktası',
      tab: 'alphabet',
      tableId: '',
      tenseId: ''
    },
    activityLog: []
  };
}
function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  } catch {}
}
function addXp(amount) {
  state.progress.xp += amount;
  saveProgress();
  renderHeaderStats();
}
function recordLastVisited(info) {
  state.progress.lastVisited = {
    ...state.progress.lastVisited,
    ...info,
    timeLabel: formatNowTime()
  };
  saveProgress();
}
function recordActivity(badge, title, category) {
  if (!state.progress.activityLog) state.progress.activityLog = [];
  state.progress.activityLog.unshift({
    id: Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    badge,
    title,
    category,
    time: formatNowTime()
  });
  state.progress.activityLog = state.progress.activityLog.slice(0, 35);
  saveProgress();
  if (window.showToast) window.showToast(title, badge);
}

// --- UYGULAMA DURUMU (STATE) ---
const state = {
  tab: 'home',
  darkMode: document.documentElement.classList.contains('dark'),
  selectedLevel: 'ALL',
  progress: loadProgress(),
  // İnteraktif Ders Oturumu & Arama Modalı
  practiceSession: { active: false, questions: [], currentIdx: 0, selectedOpt: null, correctCount: 0, earnedXp: 0, finished: false },
  searchModal: { open: false, query: '' },
  // Alfabe state
  alphaSub: 'letters',
  alphaFilter: 'all',
  selectedLetter: ALPHABET_DATA[0],
  // Sohbet state
  convSub: 'patterns',
  phraseCat: 'all',
  scenarioId: CONVERSATION_SCENARIOS[0].id,
  // Gramer & Tablolar state
  gramSub: 'tables',
  tableId: REFERENCE_TABLES[0].id,
  tenseId: GRAMMAR_TENSES[0].id,
  // SRS & Sınav state
  srsSub: 'flashcards',
  cardIdx: 0,
  cardFlipped: false,
  challengeIdx: 0,
  selectedWords: [],
  builderResult: null,
  examId: LEVEL_EXAMS[0].id,
  examAnswers: {}
};

// İnteraktif Pratik Oturumu & Arama Aksiyonları
window.startPracticeSession = () => {
  const qs = buildInteractiveSessionQuestions(state.selectedLevel);
  state.practiceSession = {
    active: true,
    questions: qs,
    currentIdx: 0,
    selectedOpt: null,
    correctCount: 0,
    earnedXp: 0,
    finished: false
  };
  renderApp();
};
window.answerPracticeQuestion = (optIdx) => {
  const s = state.practiceSession;
  if (!s.active || s.selectedOpt !== null) return;
  s.selectedOpt = optIdx;
  const q = s.questions[s.currentIdx];
  if (optIdx === q.answerIdx) {
    s.correctCount += 1;
    s.earnedXp += 15;
    state.progress.xp += 15;
    saveProgress();
  }
  renderApp();
};
window.nextPracticeQuestion = () => {
  const s = state.practiceSession;
  if (!s.active) return;
  if (s.currentIdx + 1 >= s.questions.length) {
    s.finished = true;
    recordActivity(`+${s.earnedXp} XP`, `Günlük İnteraktif Pratik (${s.correctCount}/${s.questions.length} Doğru)`, 'İnteraktif Ders Oturumu');
  } else {
    s.currentIdx += 1;
    s.selectedOpt = null;
  }
  renderApp();
};
window.closePracticeSession = () => {
  state.practiceSession.active = false;
  renderApp();
};

window.openSearchModal = () => {
  state.searchModal = { open: true, query: '' };
  renderApp();
  setTimeout(() => {
    const inp = document.getElementById('global-search-input');
    if (inp) inp.focus();
  }, 50);
};
window.closeSearchModal = () => {
  state.searchModal.open = false;
  renderApp();
};
window.updateSearchQuery = (val) => {
  state.searchModal.query = val;
  renderApp();
  const inp = document.getElementById('global-search-input');
  if (inp) {
    inp.focus();
    inp.setSelectionRange(val.length, val.length);
  }
};

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    window.openSearchModal();
  } else if (e.key === 'Escape') {
    if (state.searchModal.open) window.closeSearchModal();
    else if (state.practiceSession.active) window.closePracticeSession();
  }
});

// Global Event Handlers
window.setTab = (tab) => {
  state.tab = tab;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
};
window.setGlobalLevel = (lvl) => {
  state.selectedLevel = lvl;
  renderApp();
};
window.toggleDark = () => {
  state.darkMode = !state.darkMode;
  document.documentElement.classList.toggle('dark', state.darkMode);
  renderApp();
};
window.toggleAccent = () => {
  currentAccent = currentAccent === 'en-US' ? 'en-GB' : 'en-US';
  renderApp();
};

// Çalışma Planlayıcısı & Kaldığım Yerden Devam Et Aksiyonları
window.resumeLastActivity = () => {
  const last = state.progress.lastVisited;
  if (!last) {
    state.tab = 'roadmap';
    renderApp();
    return;
  }
  if (last.tableId) {
    state.tab = 'grammar';
    state.gramSub = 'tables';
    state.tableId = last.tableId;
  } else if (last.tenseId) {
    state.tab = 'grammar';
    state.gramSub = 'tenses';
    state.tenseId = last.tenseId;
  } else if (last.letter) {
    state.tab = 'alphabet';
    state.alphaSub = 'letters';
    const f = ALPHABET_DATA.find((a) => a.letter === last.letter);
    if (f) state.selectedLetter = f;
  } else {
    state.tab = last.tab || 'roadmap';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
};

window.startRecommendedUnit = (code, targetTab, tableId, tenseId, level) => {
  let unitTitle = code;
  for (const l of LEVEL_ROADMAP) {
    const u = l.units.find((x) => x.code === code);
    if (u) unitTitle = `${u.code}: ${u.title}`;
  }
  recordLastVisited({
    title: unitTitle,
    category: `Seviye ${level || 'A1'} Müfredat Dersi`,
    level: level || 'A1',
    tab: targetTab || 'grammar',
    tableId: tableId || '',
    tenseId: tenseId || ''
  });
  window.goToUnitLesson(targetTab, tableId, tenseId);
};

window.selectStudyPlan = (planId) => {
  state.progress.studyPlanId = planId;
  saveProgress();
  renderApp();
};

window.toggleDailyTask = (taskId) => {
  const todayStr = new Date().toISOString().slice(0, 10);
  if (!state.progress.dailyCompleted) state.progress.dailyCompleted = {};
  const list = state.progress.dailyCompleted[todayStr] || [];
  const taskObj = DEFAULT_DAILY_TASKS.find((t) => t.id === taskId);
  if (list.includes(taskId)) {
    state.progress.dailyCompleted[todayStr] = list.filter((id) => id !== taskId);
  } else {
    state.progress.dailyCompleted[todayStr] = [...list, taskId];
    state.progress.xp += taskObj ? taskObj.xp : 15;
    if (taskObj) {
      recordActivity(`+${taskObj.xp} XP`, `Günlük Hedef: ${taskObj.title}`, 'Günlük Çalışma Planı');
    }
  }
  saveProgress();
  renderApp();
};

window.runDailyTaskAction = (actionType) => {
  if (actionType === 'nextLesson') {
    const rec = getNextRecommendedUnit(state.progress, state.selectedLevel);
    window.startRecommendedUnit(rec.unit.code, rec.unit.targetTab || 'grammar', rec.unit.tableId || '', rec.unit.tenseId || '', rec.level);
  } else if (actionType === 'openTables') {
    state.tab = 'grammar';
    state.gramSub = 'tables';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  } else if (actionType === 'openAlphabet') {
    state.tab = 'alphabet';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  } else if (actionType === 'openSrs') {
    state.tab = 'srs';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderApp();
  }
};

window.addCustomStudyNote = () => {
  const input = document.getElementById('custom-note-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  if (!state.progress.customStudyNotes) state.progress.customStudyNotes = [];
  state.progress.customStudyNotes.unshift({
    id: 'note-' + Date.now(),
    text,
    done: false,
    date: formatNowTime()
  });
  saveProgress();
  renderApp();
};

window.toggleCustomStudyNote = (id) => {
  const notes = state.progress.customStudyNotes || [];
  const found = notes.find((n) => n.id === id);
  if (found) {
    found.done = !found.done;
    if (found.done) {
      state.progress.xp += 10;
      recordActivity('+10 XP', `Kişisel Hedef Tamamlandı: ${found.text}`, 'Kişisel Çalışma Notu');
    }
    saveProgress();
    renderApp();
  }
};

window.deleteCustomStudyNote = (id) => {
  state.progress.customStudyNotes = (state.progress.customStudyNotes || []).filter((n) => n.id !== id);
  saveProgress();
  renderApp();
};

window.goToUnitLesson = (targetTab, tableId, tenseId, unitCode = '') => {
  if (unitCode) {
    for (const l of LEVEL_ROADMAP) {
      const u = l.units.find((x) => x.code === unitCode);
      if (u) {
        recordLastVisited({
          title: `${u.code}: ${u.title}`,
          category: `Seviye ${l.level} • ${u.tag}`,
          level: l.level,
          tab: targetTab || 'grammar',
          tableId: tableId || '',
          tenseId: tenseId || ''
        });
      }
    }
  }
  state.tab = targetTab || 'grammar';
  if (tableId) {
    state.gramSub = 'tables';
    state.tableId = tableId;
  } else if (tenseId) {
    state.gramSub = 'tenses';
    state.tenseId = tenseId;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
};

window.toggleChecklistItem = (key) => {
  const arr = state.progress.completedChecklist;
  let unitTitle = key;
  let unitLevel = 'A1';
  for (const l of LEVEL_ROADMAP) {
    const u = l.units.find((x) => x.code === key);
    if (u) {
      unitTitle = `${u.code}: ${u.title}`;
      unitLevel = l.level;
    }
  }
  if (arr.includes(key)) {
    state.progress.completedChecklist = arr.filter((x) => x !== key);
  } else {
    state.progress.completedChecklist.push(key);
    state.progress.xp += 15;
    recordActivity(`${unitLevel} ✓`, unitTitle, `Seviye ${unitLevel} Müfredat Dersi Tamamlandı`);
  }
  saveProgress();
  renderApp();
};

// Alfabe Aksiyonları
window.setAlphaSub = (sub) => { state.alphaSub = sub; renderApp(); };
window.setAlphaFilter = (f) => { state.alphaFilter = f; renderApp(); };
window.selectLetter = (letterStr) => {
  const found = ALPHABET_DATA.find((l) => l.letter === letterStr);
  if (found) {
    state.selectedLetter = found;
    recordLastVisited({
      title: `Harf ${found.letter} (${found.nameTr}) — ${found.examples[0].word}`,
      category: 'A1 Başlangıç • Alfabe & Ses',
      level: 'A1',
      tab: 'alphabet',
      letter: found.letter,
      tableId: '',
      tenseId: ''
    });
    window.speakText(found.letter.toLowerCase(), 0.85);
    renderApp();
  }
};
window.toggleMasterLetter = (letterStr) => {
  const arr = state.progress.masteredLetters;
  if (arr.includes(letterStr)) {
    state.progress.masteredLetters = arr.filter((x) => x !== letterStr);
  } else {
    state.progress.masteredLetters.push(letterStr);
    state.progress.xp += 10;
    recordActivity('Harf ✓', `${letterStr} Harfi ve Telaffuzu Öğrenildi`, 'Alfabe & Fonetik');
  }
  saveProgress();
  renderApp();
};
window.toggleMasterRule = (ruleId) => {
  const arr = state.progress.masteredRules;
  const rObj = PHONETIC_RULES.find((r) => r.id === ruleId);
  if (arr.includes(ruleId)) {
    state.progress.masteredRules = arr.filter((x) => x !== ruleId);
  } else {
    state.progress.masteredRules.push(ruleId);
    state.progress.xp += 15;
    recordActivity('Fonetik ✓', rObj ? `${rObj.combo} — ${rObj.title}` : ruleId, 'Altın Okunuş Kuralları');
  }
  saveProgress();
  renderApp();
};
window.playAllLetters = () => {
  window.speakText(ALPHABET_DATA.map((a) => a.letter).join(', '), 0.8);
};

// Sohbet Aksiyonları
window.setConvSub = (sub) => { state.convSub = sub; renderApp(); };
window.setPhraseCat = (cat) => { state.phraseCat = cat; renderApp(); };
window.toggleMasterPhrase = (id) => {
  const arr = state.progress.masteredPhrases;
  const pObj = PHRASE_PATTERNS.find((p) => p.id === id);
  if (arr.includes(id)) {
    state.progress.masteredPhrases = arr.filter((x) => x !== id);
  } else {
    state.progress.masteredPhrases.push(id);
    state.progress.xp += 15;
    recordActivity('Kalıp ✓', pObj ? `"${pObj.en}" (${pObj.trMeaning})` : id, 'Günlük Sohbet Kalıpları');
  }
  saveProgress();
  renderApp();
};
window.selectScenario = (id) => {
  state.scenarioId = id;
  const sc = CONVERSATION_SCENARIOS.find((s) => s.id === id);
  if (sc) {
    recordLastVisited({
      title: `Diyalog: ${sc.title}`,
      category: `Seviye ${sc.level} • Rol Canlandırma`,
      level: sc.level,
      tab: 'conversations',
      tableId: '',
      tenseId: ''
    });
  }
  renderApp();
};
window.completeScenario = (id) => {
  if (!state.progress.completedScenarios.includes(id)) {
    state.progress.completedScenarios.push(id);
    state.progress.xp += 25;
    const sc = CONVERSATION_SCENARIOS.find((s) => s.id === id);
    recordActivity('+25 XP', sc ? `Rol Canlandırma: ${sc.title}` : id, 'Diyalog Simülasyonu');
    saveProgress();
    renderApp();
  }
};

// Gramer & Tablolar Aksiyonları
window.setGramSub = (sub) => { state.gramSub = sub; renderApp(); };
window.selectTable = (id) => {
  state.tab = 'grammar';
  state.gramSub = 'tables';
  state.tableId = id;
  const tbl = REFERENCE_TABLES.find((t) => t.id === id);
  if (tbl) {
    recordLastVisited({
      title: tbl.title,
      category: `Seviye ${tbl.level} • ${tbl.category}`,
      level: tbl.level,
      tab: 'grammar',
      tableId: tbl.id,
      tenseId: ''
    });
  }
  renderApp();
};
window.toggleMasterTable = (id) => {
  const arr = state.progress.masteredTables;
  const tbl = REFERENCE_TABLES.find((t) => t.id === id);
  if (arr.includes(id)) {
    state.progress.masteredTables = arr.filter((x) => x !== id);
  } else {
    state.progress.masteredTables.push(id);
    state.progress.xp += 25;
    recordActivity('Tablo ✓', tbl ? tbl.title : id, 'Gramer & Zamir Tabloları');
  }
  saveProgress();
  renderApp();
};
window.selectTense = (id) => {
  state.tenseId = id;
  const t = GRAMMAR_TENSES.find((x) => x.id === id);
  if (t) {
    recordLastVisited({
      title: `${t.nameEn} (${t.nameTr})`,
      category: `Seviye ${t.level} • Zamanlar`,
      level: t.level,
      tab: 'grammar',
      tableId: '',
      tenseId: t.id
    });
  }
  renderApp();
};
window.toggleMasterTense = (id) => {
  const arr = state.progress.masteredTenses;
  const t = GRAMMAR_TENSES.find((x) => x.id === id);
  if (arr.includes(id)) {
    state.progress.masteredTenses = arr.filter((x) => x !== id);
  } else {
    state.progress.masteredTenses.push(id);
    state.progress.xp += 20;
    recordActivity('Zaman ✓', t ? `${t.nameEn} — ${t.nameTr}` : id, 'Zamanlar (Tenses)');
  }
  saveProgress();
  renderApp();
};

window.openPronounsTable = () => {
  window.selectTable('pronouns-master');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// SRS, Cümle Kurma & Sınav Aksiyonları
window.setSrsSub = (sub) => { state.srsSub = sub; renderApp(); };
window.selectCardIdx = (idx) => {
  state.cardIdx = idx;
  state.cardFlipped = false;
  const card = MNEMONIC_VOCAB_DATA[idx];
  if (card) {
    recordLastVisited({
      title: `Kelime Kartı: ${card.word} (${card.meaning})`,
      category: `Seviye ${card.level} • Görsel Hafıza (SRS)`,
      level: card.level,
      tab: 'srs',
      tableId: '',
      tenseId: ''
    });
  }
  renderApp();
};
window.flipCard = () => { state.cardFlipped = true; renderApp(); };
window.rateCard = (rating) => {
  const card = MNEMONIC_VOCAB_DATA[state.cardIdx];
  const prev = state.progress.srsMap[card.id] || { interval: 0, repetition: 0, efactor: 2.5 };
  let { interval, repetition, efactor } = prev;
  const q = rating === 'again' ? 1 : rating === 'hard' ? 3 : rating === 'good' ? 4 : 5;
  if (q < 3) {
    repetition = 0;
    interval = 0;
  } else {
    interval = repetition === 0 ? 1 : repetition === 1 ? 3 : Math.round(interval * efactor);
    repetition += 1;
  }
  state.progress.srsMap[card.id] = { cardId: card.id, interval, repetition, efactor, lastRating: rating };
  state.progress.xp += q * 4;
  recordActivity('SRS ✓', `Kelime Tekrarı: ${card.word} (${card.meaning})`, 'Görsel Hafıza Kartları');
  saveProgress();
  state.cardFlipped = false;
  state.cardIdx = (state.cardIdx + 1) % MNEMONIC_VOCAB_DATA.length;
  renderApp();
};
window.toggleBuilderWord = (word) => {
  state.builderResult = null;
  if (state.selectedWords.includes(word)) {
    state.selectedWords = state.selectedWords.filter((w) => w !== word);
  } else {
    state.selectedWords.push(word);
  }
  renderApp();
};
window.resetBuilder = () => { state.selectedWords = []; state.builderResult = null; renderApp(); };
window.checkBuilder = () => {
  const ch = SENTENCE_CHALLENGES[state.challengeIdx];
  if (state.selectedWords.join(' ').toLowerCase() === ch.correctWords.join(' ').toLowerCase()) {
    state.builderResult = 'correct';
    window.speakText(ch.correctWords.join(' '), 0.95);
    state.progress.xp += 20;
    recordActivity('+20 XP', `Cümle İnşası: "${ch.correctWords.join(' ')}"`, 'Cümle Kurma Egzersizi');
    saveProgress();
  } else {
    state.builderResult = 'wrong';
  }
  renderApp();
};
window.nextChallenge = () => {
  state.selectedWords = [];
  state.builderResult = null;
  state.challengeIdx = (state.challengeIdx + 1) % SENTENCE_CHALLENGES.length;
  renderApp();
};

// Sınav Aksiyonları
window.selectExam = (id) => {
  state.examId = id;
  state.examAnswers = {};
  renderApp();
};
window.answerExamQuestion = (qIdx, optIdx) => {
  const exam = LEVEL_EXAMS.find((e) => e.id === state.examId) || LEVEL_EXAMS[0];
  if (state.examAnswers[qIdx] === undefined) {
    if (exam.questions[qIdx].answer === optIdx) {
      state.progress.xp += 15;
      recordActivity('Sınav ✓', `${exam.title} — Soru ${qIdx + 1} Doğru`, 'Bölüm Sonu Sınavı');
      saveProgress();
    }
  }
  state.examAnswers[qIdx] = optIdx;
  renderApp();
};

function renderHeaderStats() {
  const xpEl = document.getElementById('header-xp');
  if (xpEl) xpEl.textContent = `🏆 ${state.progress.xp} XP`;
}

// --- SEVİYE FİLTRESİ BARI (A1 -> C2) ---
function renderLevelFilterBar() {
  const levels = [
    { id: 'ALL', label: 'Tümü' },
    { id: 'A1', label: 'A1 Başlangıç' },
    { id: 'A2', label: 'A2 Temel' },
    { id: 'B1', label: 'B1 Orta' },
    { id: 'B2', label: 'B2 Orta Üstü' },
    { id: 'C1', label: 'C1 İleri' },
    { id: 'C2', label: 'C2 Ana Dil' }
  ];
  return `
    <div class="card p-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
      <div class="flex items-center gap-1 shrink-0">
        <span class="text-[11px] font-bold text-slate-400 px-2.5 hidden sm:inline">SEVİYE:</span>
        ${levels.map((l) => `
          <button onclick="setGlobalLevel('${l.id}')" class="px-3 h-8 rounded-xl text-xs font-semibold transition shrink-0 ${
            state.selectedLevel === l.id
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }">${l.label}</button>
        `).join('')}
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button onclick="startPracticeSession()" class="btn btn-primary btn-sm">
          ${icon('zap', 'w-3.5 h-3.5')}
          <span>5 Soruluk Pratik</span>
        </button>
        <button onclick="setTab('roadmap')" class="btn btn-secondary btn-sm">
          <span>A1 → C2 Müfredat</span>
          ${icon('chevronRight', 'w-3.5 h-3.5')}
        </button>
      </div>
    </div>
  `;
}

// --- 1. ANA MERKEZ (PROFESYONEL 2 SÜTUNLU DİL ÖĞRENME PANELİ) ---
function renderHome() {
  const p = state.progress;
  const totalCurriculumUnits = LEVEL_ROADMAP.reduce((acc, l) => acc + l.units.length, 0);
  const total =
    totalCurriculumUnits +
    ALPHABET_DATA.length +
    PHONETIC_RULES.length +
    PHRASE_PATTERNS.length +
    GRAMMAR_TENSES.length +
    REFERENCE_TABLES.length +
    MNEMONIC_VOCAB_DATA.length;
  const done =
    (p.completedChecklist || []).length +
    p.masteredLetters.length +
    p.masteredRules.length +
    p.masteredPhrases.length +
    p.masteredTenses.length +
    p.masteredTables.length +
    Object.keys(p.srsMap).length;
  const pct = Math.min(100, Math.round((done / total) * 100));

  const last = p.lastVisited || {
    title: 'Ders 9-10: İngiliz Alfabesi ve Harflerin Telaffuzları (A → Ey)',
    category: 'A1 Başlangıç • Alfabe & Ses',
    timeLabel: 'Başlangıç noktası'
  };
  const upcoming = getUpcomingUnitsList(p, state.selectedLevel, 4);
  const wordOfDay = MNEMONIC_VOCAB_DATA[p.masteredLetters.length % MNEMONIC_VOCAB_DATA.length] || MNEMONIC_VOCAB_DATA[0];
  const recentLogs = (p.activityLog || []).slice(0, 4);

  return `
    <div class="space-y-6 pb-8 anim-in">
      ${renderLevelFilterBar()}

      <!-- Üst Aktif Ders & Devam Et Kokpiti -->
      <div class="card p-6 sm:p-7 relative overflow-hidden border-l-4 border-l-brand-600">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <div class="flex flex-wrap items-center gap-2">
              <span class="chip chip-brand">
                ${icon('sparkles', 'w-3.5 h-3.5')}
                <span>KALDIĞIN YERDEN DEVAM ET</span>
              </span>
              <span class="text-xs muted">${last.category || 'A1 Başlangıç'} • ${last.timeLabel || 'Az önce'}</span>
            </div>
            <h1 class="h1">${last.title}</h1>
            <p class="text-sm muted leading-relaxed">
              Son çalıştığın dersten tek tıkla devam edebilir veya 5 soruluk günlük interaktif pratik oturumuyla öğrendiklerini hemen test edebilirsin.
            </p>
            <div class="flex flex-wrap items-center gap-2.5 pt-1">
              <button onclick="resumeLastActivity()" class="btn btn-primary btn-md">
                ${icon('play', 'w-4 h-4')}
                <span>Kaldığım Yerden Devam Et</span>
              </button>
              <button onclick="startPracticeSession()" class="btn btn-secondary btn-md">
                ${icon('zap', 'w-4 h-4 text-brand-600')}
                <span>Günlük Pratik Yap (5 Soru)</span>
              </button>
              <button onclick="openPronounsTable()" class="btn btn-outline btn-md">
                ${icon('table', 'w-4 h-4')}
                <span>21 Konu & Zamir Tablosu</span>
              </button>
            </div>
          </div>

          <!-- Sağ İlerleme Halkası -->
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 shrink-0">
            <div class="relative w-16 h-16 flex items-center justify-center">
              <svg class="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" stroke="currentColor" class="text-slate-200 dark:text-slate-700" stroke-width="7" fill="none"/>
                <circle cx="40" cy="40" r="32" stroke="#2554eb" stroke-width="7" fill="none" stroke-linecap="round"
                  stroke-dasharray="201" stroke-dashoffset="${201 - (201 * pct) / 100}"/>
              </svg>
              <span class="absolute text-sm font-extrabold text-slate-900 dark:text-white">%${pct}</span>
            </div>
            <div class="space-y-1 pr-2">
              <div class="text-xs font-bold text-slate-900 dark:text-white">Genel Müfredat İlerlemesi</div>
              <div class="text-xs font-semibold text-brand-600 dark:text-brand-400">${done} / ${total} Adım Tamamlandı</div>
              <div class="text-[11px] muted">🔥 ${p.streakDays} Gün Seri • 🏆 ${p.xp} XP</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ANA 2 SÜTUNLU PANEL (Sol 8 Sütun: Ders Yolu & Modüller | Sağ 4 Sütun: Günlük Plan & Günün Kelimesi) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- SOL ANA SÜTUN (8 Sütun) -->
        <div class="lg:col-span-8 space-y-6">
          
          <!-- 1. Adım Adım Aktif Ders Yolu (Learning Path) -->
          <div class="card p-5 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div class="flex items-center gap-2">
                  <span class="chip chip-brand">SEVİYE ${upcoming.level} DERS YOLU</span>
                  <span class="text-xs font-semibold muted">${upcoming.doneInLevel}/${upcoming.totalInLevel} Ünite Tamamlandı</span>
                </div>
                <h2 class="h2 mt-1">${upcoming.levelTitle}</h2>
              </div>
              <button onclick="setTab('roadmap')" class="btn btn-secondary btn-sm self-start sm:self-auto">
                <span>Tüm Üniteler (62)</span>
                ${icon('chevronRight', 'w-3.5 h-3.5')}
              </button>
            </div>

            <div class="space-y-2.5">
              ${upcoming.units.map((u, idx) => {
                const isDone = (p.completedChecklist || []).includes(u.code);
                const isCurrent = !isDone && idx === upcoming.units.findIndex((x) => !(p.completedChecklist || []).includes(x.code));
                return `
                  <div class="p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-brand-50/50 dark:bg-brand-950/30 border-brand-500 ring-1 ring-brand-500/30'
                      : isDone
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                      : 'bg-white dark:bg-ink-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }">
                    <div class="flex items-start sm:items-center gap-3.5 flex-1">
                      <div class="w-11 h-10 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        isDone
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }">
                        ${isDone ? icon('check', 'w-4 h-4') : u.code}
                      </div>
                      <div class="min-w-0">
                        <div class="flex flex-wrap items-center gap-1.5 mb-0.5">
                          ${isCurrent ? `<span class="chip chip-brand">ŞU ANKİ DERSİN</span>` : ''}
                          ${isDone ? `<span class="chip chip-green">Tamamlandı</span>` : ''}
                          <span class="chip chip-slate">${u.tag}</span>
                        </div>
                        <h3 class="text-sm font-bold ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'} leading-snug">
                          ${u.title}
                        </h3>
                      </div>
                    </div>

                    <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button onclick="goToUnitLesson('${u.targetTab || 'grammar'}', '${u.tableId || ''}', '${u.tenseId || ''}', '${u.code}')" class="btn ${isCurrent ? 'btn-primary' : 'btn-secondary'} btn-sm">
                        <span>Dersi Aç</span>
                        ${icon('arrowRight', 'w-3.5 h-3.5')}
                      </button>
                      <button onclick="toggleChecklistItem('${u.code}')" class="btn ${isDone ? 'btn-success' : 'btn-outline'} btn-sm">
                        ${isDone ? 'Tamam ✓' : 'Bitir'}
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 2. 4 Ana Öğrenim Stüdyosu (2x2 Kartlar) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div onclick="setTab('grammar')" class="card card-hover p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                    ${icon('table', 'w-5 h-5')}
                  </div>
                  <span class="chip chip-brand">${p.masteredTables.length}/${REFERENCE_TABLES.length} Tablo</span>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Zamir, Edat, Modal & C1-C2 Tabloları</h3>
                <p class="text-xs muted leading-relaxed">Şahıs/Nesne/İyelik zamirleri, Sayılar, Artikeller, Modals, Phrasal Verbs ve 12 Zaman Çizelgesi.</p>
              </div>
              <div class="space-y-2">
                <div class="progress"><span style="width: ${Math.round((p.masteredTables.length / REFERENCE_TABLES.length) * 100)}%"></span></div>
                <div class="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                  <span>Tabloları & Zamanları Aç</span>
                  ${icon('arrowRight', 'w-3.5 h-3.5')}
                </div>
              </div>
            </div>

            <div onclick="setTab('alphabet')" class="card card-hover p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    ${icon('type', 'w-5 h-5')}
                  </div>
                  <span class="chip chip-brand">${p.masteredLetters.length}/26 Harf</span>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Alfabe (A → Ey) & Fonetik Stüdyosu</h3>
                <p class="text-xs muted leading-relaxed">26 harfin görsel çapası, Türkçe okunuşu, ağız/dil pozisyonu ve TH, SH, CH, GH ses kuralları.</p>
              </div>
              <div class="space-y-2">
                <div class="progress"><span style="width: ${Math.round((p.masteredLetters.length / 26) * 100)}%"></span></div>
                <div class="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                  <span>Harfleri & Sesleri Aç</span>
                  ${icon('arrowRight', 'w-3.5 h-3.5')}
                </div>
              </div>
            </div>

            <div onclick="setTab('conversations')" class="card card-hover p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    ${icon('message', 'w-5 h-5')}
                  </div>
                  <span class="chip chip-green">${PHRASE_PATTERNS.length} Kalıp • 4 Diyalog</span>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Günlük Sohbet & Rol Canlandırma</h3>
                <p class="text-xs muted leading-relaxed">Kafe, Mağaza, Havalimanı ve İş Toplantısı simülasyonları; mikrofonlu telaffuz testi.</p>
              </div>
              <div class="space-y-2">
                <div class="progress"><span style="width: ${Math.round((p.masteredPhrases.length / PHRASE_PATTERNS.length) * 100)}%"></span></div>
                <div class="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                  <span>Kalıplara & Diyaloglara Gir</span>
                  ${icon('arrowRight', 'w-3.5 h-3.5')}
                </div>
              </div>
            </div>

            <div onclick="setTab('srs')" class="card card-hover p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2.5">
                <div class="flex items-center justify-between">
                  <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    ${icon('trophy', 'w-5 h-5')}
                  </div>
                  <span class="chip chip-amber">${Object.keys(p.srsMap).length}/${MNEMONIC_VOCAB_DATA.length} Kart • 3 Sınav</span>
                </div>
                <h3 class="text-base font-bold text-slate-900 dark:text-white">Görsel Hafıza (SRS) & Seviye Sınavları</h3>
                <p class="text-xs muted leading-relaxed">Ses çağrışımlı kelime kartları, kelime dizerek cümle kurma ve çözümlü seviye sınavları.</p>
              </div>
              <div class="space-y-2">
                <div class="progress"><span style="width: ${Math.round((Object.keys(p.srsMap).length / MNEMONIC_VOCAB_DATA.length) * 100)}%"></span></div>
                <div class="text-xs font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-between">
                  <span>Kartları & Sınavları Aç</span>
                  ${icon('arrowRight', 'w-3.5 h-3.5')}
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Görsel Hafıza Şemaları -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <h2 class="h2">Görsel Hafıza & Dilbilgisi Şemaları</h2>
              <button onclick="setTab('grammar')" class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Tüm Tablolar →</button>
            </div>
            ${renderVisualInfographicsSection()}
          </div>
        </div>

        <!-- SAĞ YAN SÜTUN (4 Sütun: Günlük Plan + Günün Kelimesi + Son Yaptıklarım) -->
        <div class="lg:col-span-4 space-y-5">
          ${renderResumeAndDailyCockpit(state)}

          <!-- Günün Hafıza Çivisi (Word of the Day Mini Kart) -->
          <div class="card p-5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="chip chip-amber">🔑 GÜNÜN HAFIZA KARTI (${wordOfDay.level})</span>
              <button onclick="speakText('${wordOfDay.word}', 0.9)" class="speak-btn speak-btn-sm" title="Sesli Dinle">
                ${icon('volume', 'w-4 h-4')}
              </button>
            </div>
            <div>
              <div class="flex items-baseline gap-2">
                <h3 class="text-xl font-extrabold text-slate-900 dark:text-white">${wordOfDay.word}</h3>
                <span class="text-xs font-semibold text-brand-600 dark:text-brand-400">[${wordOfDay.trRead}]</span>
              </div>
              <div class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">= ${wordOfDay.meaning}</div>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs space-y-1">
              <div class="font-bold text-slate-800 dark:text-slate-200">Çağrışım: ${wordOfDay.soundAlikeTr}</div>
              <p class="muted leading-relaxed">${wordOfDay.mnemonicStory}</p>
            </div>
            <button onclick="setTab('srs'); setSrsSub('flashcards')" class="btn btn-secondary btn-sm w-full">
              <span>Tüm Hafıza Kartlarını Çalış</span>
              ${icon('arrowRight', 'w-3.5 h-3.5')}
            </button>
          </div>

          <!-- Son Yaptıklarım (Activity Feed) -->
          <div class="card p-5 space-y-3">
            <div class="flex items-center justify-between">
              <h3 class="h3">Son Yaptıklarım</h3>
              <button onclick="setTab('planner')" class="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">Tümü →</button>
            </div>
            ${recentLogs.length === 0 ? `
              <p class="text-xs muted py-3 text-center">Tamamladığın dersler ve tablolar burada listelenir.</p>
            ` : `
              <div class="space-y-2">
                ${recentLogs.map((log) => `
                  <div class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="chip chip-green shrink-0">${log.badge || '✓'}</span>
                      <span class="font-semibold text-slate-700 dark:text-slate-200 truncate">${log.title}</span>
                    </div>
                    <span class="text-[10px] muted shrink-0">${log.time}</span>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>

      </div>
    </div>
  `;
}

// --- 2. SEVİYE YOL HARİTASI (A1 -> C2 MÜFREDAT) ---
function renderRoadmap() {
  const filteredLevels =
    state.selectedLevel === 'ALL'
      ? LEVEL_ROADMAP
      : LEVEL_ROADMAP.filter((l) => l.level === state.selectedLevel);

  return `
    <div class="space-y-6 pb-8 anim-in">
      ${renderLevelFilterBar()}

      <div class="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <span class="chip chip-brand">A1'DEN C2'YE AKADEMİK MÜFREDAT</span>
          <h1 class="h1">Hangi Seviyede Ne Öğrenilecek? (A1 → C2)</h1>
          <p class="text-sm muted">
            İstediğin dersin yanındaki <strong>"Konuyu Aç"</strong> butonuna basarak doğrudan o konunun tablosuna gidebilir veya tamamladığında işaretleyebilirsin (+15 XP).
          </p>
        </div>
        <button onclick="openSearchModal()" class="btn btn-secondary btn-md shrink-0">
          ${icon('search', 'w-4 h-4')}
          <span>Müfredatta Ara</span>
        </button>
      </div>

      <div class="space-y-5">
        ${filteredLevels.map((lvl) => {
          const completedInLevel = lvl.units.filter((u) =>
            state.progress.completedChecklist.includes(u.code)
          ).length;
          const pct = Math.round((completedInLevel / lvl.units.length) * 100);

          return `
            <div class="card overflow-hidden">
              <div class="p-5 sm:p-6 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="chip chip-brand">SEVİYE ${lvl.level}</span>
                    <span class="text-xs font-semibold muted">%${pct} Tamamlandı</span>
                  </div>
                  <h2 class="h2">${lvl.title}</h2>
                  <p class="text-xs sm:text-sm muted">${lvl.description}</p>
                </div>
                <div class="shrink-0 bg-white dark:bg-ink-900 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-center">
                  <div class="text-lg font-extrabold text-brand-600 dark:text-brand-400">${completedInLevel} / ${lvl.units.length}</div>
                  <div class="text-[11px] font-semibold muted">Ünite Bitti</div>
                </div>
              </div>

              <div class="p-4 sm:p-6 space-y-2">
                ${lvl.units.map((u) => {
                  const checked = state.progress.completedChecklist.includes(u.code);
                  return `
                    <div class="p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      checked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                        : 'bg-white dark:bg-ink-900 border-slate-200/80 dark:border-slate-800 hover:border-brand-400'
                    }">
                      <div onclick="toggleChecklistItem('${u.code}')" class="cursor-pointer flex items-center gap-3 flex-1">
                        <div class="w-11 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                          checked ? 'bg-emerald-600 text-white' : 'bg-brand-600 text-white'
                        }">
                          ${checked ? '✓' : u.code}
                        </div>
                        <div>
                          <span class="text-sm font-semibold block ${checked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}">${u.title}</span>
                          <span class="text-[11px] font-semibold text-brand-600 dark:text-brand-400">${u.tag}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button onclick="goToUnitLesson('${u.targetTab || 'grammar'}', '${u.tableId || ''}', '${u.tenseId || ''}', '${u.code}')" class="btn btn-secondary btn-sm">
                          <span>Konuyu Aç</span>
                          ${icon('arrowRight', 'w-3.5 h-3.5')}
                        </button>
                        <button onclick="toggleChecklistItem('${u.code}')" class="btn ${checked ? 'btn-success' : 'btn-outline'} btn-sm">
                          ${checked ? 'Tamam ✓' : 'Bitir'}
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// --- 3. RESİMLİ ALFABE VE FONETİK STÜDYOSU (SPLIT-PANE STUDIO) ---
function renderAlphabet() {
  const letters = ALPHABET_DATA.filter((item) => state.alphaFilter === 'all' ? true : item.type === state.alphaFilter);
  const sel = state.selectedLetter;
  const selAnchor = LETTER_VISUAL_ANCHORS[sel.letter] || { emoji: '🔤', keyword: sel.examples[0].word, color: 'from-brand-600 to-indigo-600' };
  const isMastered = state.progress.masteredLetters.includes(sel.letter);

  return `
    <div class="space-y-6 pb-8 anim-in">
      <!-- Üst Başlık & Alt Sekme Seçici -->
      <div class="card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="chip chip-brand">FONETİK & SES LABORATUVARI</span>
          <h1 class="h1">26 Harf Görsel Hafıza Kartları & Okunuş Şifreleri</h1>
          <p class="text-sm muted">Her harfin görsel çapası (A → 🍎 Apple / Ey), ağız pozisyonu ve kelime içi ses değişimleri.</p>
        </div>
        <div class="flex flex-wrap items-center gap-2 shrink-0">
          <div class="seg">
            <button onclick="setAlphaSub('letters')" class="seg-item ${state.alphaSub === 'letters' ? 'seg-active' : ''}">
              26 Harf (${state.progress.masteredLetters.length}/26)
            </button>
            <button onclick="setAlphaSub('rules')" class="seg-item ${state.alphaSub === 'rules' ? 'seg-active' : ''}">
              Okunuş Kuralları (${state.progress.masteredRules.length}/${PHONETIC_RULES.length})
            </button>
          </div>
          <button onclick="playAllLetters()" class="btn btn-primary btn-sm">
            ${icon('volume', 'w-4 h-4')}
            <span>26 Harfi Dinle</span>
          </button>
        </div>
      </div>

      ${state.alphaSub === 'letters' ? `
        <!-- Filtre Çubuğu -->
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="seg">
            <button onclick="setAlphaFilter('all')" class="seg-item ${state.alphaFilter === 'all' ? 'seg-active' : ''}">Tümü (26)</button>
            <button onclick="setAlphaFilter('vowel')" class="seg-item ${state.alphaFilter === 'vowel' ? 'seg-active' : ''}">Sesli Harfler (5 Ünlü)</button>
            <button onclick="setAlphaFilter('consonant')" class="seg-item ${state.alphaFilter === 'consonant' ? 'seg-active' : ''}">Sessiz Harfler (21 Ünsüz)</button>
          </div>
          <span class="text-xs muted">Harfe tıkladığında sağ panelde seslendirilir ve detayları açılır</span>
        </div>

        <!-- Split-Pane: Sol 26 Harf Klavyesi (7 Sütun) + Sağ Detay Stüdyosu (5 Sütun) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- Sol: 26 Harf Klavye Izgarası -->
          <div class="lg:col-span-7 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2.5">
            ${letters.map((item) => {
              const active = sel.letter === item.letter;
              const done = state.progress.masteredLetters.includes(item.letter);
              const anchor = LETTER_VISUAL_ANCHORS[item.letter] || { emoji: '🔤', keyword: '' };
              return `
                <button onclick="selectLetter('${item.letter}')" class="relative flex flex-col items-center justify-between p-3 rounded-2xl border transition active:scale-95 ${
                  active
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/50 ring-2 ring-brand-500/30 shadow-sm'
                    : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-ink-900 hover:border-brand-400'
                }">
                  ${done ? `<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500"></span>` : ''}
                  <div class="flex items-center justify-between w-full">
                    <span class="text-sm">${anchor.emoji}</span>
                    <span class="text-[10px] font-mono muted">${item.ipa}</span>
                  </div>
                  <div class="text-2xl font-extrabold my-1 text-slate-900 dark:text-white">${item.letter}<span class="text-sm font-semibold text-slate-400 ml-0.5">${item.lower}</span></div>
                  <div class="w-full py-0.5 rounded-md bg-brand-600 text-white text-[11px] font-bold">${item.nameTr}</div>
                  <span class="text-[10px] font-medium muted mt-1 truncate max-w-full">${anchor.keyword}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Sağ: Seçili Harf İnceleme Stüdyosu -->
          <div class="lg:col-span-5 card overflow-hidden lg:sticky lg:top-20">
            <div class="p-5 bg-slate-900 text-white flex items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-16 h-16 rounded-2xl bg-brand-600 flex flex-col items-center justify-center shrink-0 shadow-md">
                  <span class="text-2xl font-extrabold leading-none">${sel.letter}${sel.lower}</span>
                  <span class="text-[11px] font-bold text-blue-100 mt-1">${sel.nameTr}</span>
                </div>
                <div>
                  <span class="chip chip-brand">Okunuşu: "${sel.nameTr.toUpperCase()}" (${sel.ipa})</span>
                  <div class="text-sm font-bold text-white mt-1.5">${selAnchor.emoji} Görsel Çapa: ${selAnchor.keyword}</div>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button onclick="speakText('${sel.letter.toLowerCase()}', 0.9)" class="speak-btn" title="Harfi Dinle">
                  ${icon('volume', 'w-4 h-4')}
                </button>
                <button onclick="speakText('${sel.letter.toLowerCase()}', 0.55)" class="speak-btn" title="Yavaş Dinle">
                  🐢
                </button>
              </div>
            </div>

            <div class="p-5 space-y-4">
              <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 text-xs space-y-1">
                <div class="font-bold text-slate-900 dark:text-white">👄 Ağız & Dil Pozisyonu:</div>
                <p class="muted leading-relaxed">${sel.mouthTip}</p>
              </div>

              <div class="p-3.5 rounded-xl bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-900/50 text-xs space-y-1">
                <div class="font-bold text-brand-700 dark:text-brand-300">📖 Kelime İçinde Nasıl Okunur?</div>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${sel.soundVariations}</p>
              </div>

              ${sel.turkishTrap ? `
                <div class="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-900/50 text-xs space-y-1">
                  <div class="font-bold text-amber-800 dark:text-amber-300">⚠️ Sık Yapılan Telaffuz Hatası:</div>
                  <p class="text-slate-700 dark:text-slate-300 leading-relaxed">${sel.turkishTrap}</p>
                </div>
              ` : ''}

              <div class="space-y-2">
                <div class="eyebrow">${sel.letter} HARFİ CANLI KELİME ÖRNEKLERİ</div>
                ${sel.examples.map((ex, idx) => `
                  <div class="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2">
                    <div class="flex items-center justify-between gap-2">
                      <div>
                        <span class="font-extrabold text-sm text-slate-900 dark:text-white">${ex.word}</span>
                        <span class="ml-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">[${ex.trRead}]</span>
                        <span class="text-xs muted ml-1">= ${ex.meaning}</span>
                      </div>
                      <div class="flex items-center gap-1 shrink-0">
                        <button onclick="speakText('${ex.word}', 0.95)" class="btn btn-primary btn-sm">Dinle</button>
                        <button onclick="practiceSpeech('${ex.word}', 'alpha-speech-${idx}')" class="btn btn-secondary btn-sm" title="Mikrofonla Söyle">🎙️</button>
                      </div>
                    </div>
                    <p class="text-[11px] muted">${ex.soundNote}</p>
                    <div id="alpha-speech-${idx}"></div>
                  </div>
                `).join('')}
              </div>

              <button onclick="toggleMasterLetter('${sel.letter}')" class="btn ${isMastered ? 'btn-success' : 'btn-outline'} btn-md w-full">
                ${isMastered ? '✓ Bu Harf Tamamlandı' : 'Harfi Öğrendim Olarak İşaretle (+10 XP)'}
              </button>
            </div>
          </div>

        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${PHONETIC_RULES.map((rule) => {
            const done = state.progress.masteredRules.includes(rule.id);
            return `
              <div class="card p-5 flex flex-col justify-between gap-4">
                <div class="space-y-3">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <span class="chip chip-brand">${rule.combo} • IPA: ${rule.ipa}</span>
                      <h3 class="text-base font-bold text-slate-900 dark:text-white mt-1.5">${rule.title}</h3>
                    </div>
                    <button onclick="toggleMasterRule('${rule.id}')" class="btn ${done ? 'btn-success' : 'btn-secondary'} btn-sm">
                      ${done ? '✓ Öğrenildi' : 'Tamamla'}
                    </button>
                  </div>
                  <div class="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 text-xs font-semibold text-amber-900 dark:text-amber-300">
                    🎯 Türkçe Karşılığı: ${rule.trApprox}
                  </div>
                  <p class="text-xs sm:text-sm muted leading-relaxed">${rule.howToProduce}</p>
                  <div class="p-3 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 text-xs text-brand-900 dark:text-brand-200">${rule.mnemonicTip}</div>
                </div>
                <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  ${rule.examples.map((ex) => `
                    <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <div>
                        <span class="font-bold text-sm text-slate-900 dark:text-white">${ex.word}</span>
                        <span class="ml-2 text-xs font-semibold text-brand-600 dark:text-brand-400">[${ex.trRead}]</span>
                        <span class="block text-xs muted">${ex.meaning}</span>
                      </div>
                      <div class="flex gap-1.5">
                        <button onclick="speakText('${ex.word.replace(/'/g, "\\'")}', 0.9)" class="speak-btn speak-btn-sm">${icon('volume', 'w-4 h-4')}</button>
                        <button onclick="speakText('${ex.word.replace(/'/g, "\\'")}', 0.55)" class="speak-btn speak-btn-sm">🐢</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}

// --- 4. SOHBET & DİYALOG SİMÜLATÖRÜ ---
function renderConversations() {
  const phrases = PHRASE_PATTERNS.filter((p) => {
    const catOk = state.phraseCat === 'all' ? true : p.category === state.phraseCat;
    const lvlOk = state.selectedLevel === 'ALL' ? true : p.level === state.selectedLevel;
    return catOk && lvlOk;
  });
  const activeSc = CONVERSATION_SCENARIOS.find((s) => s.id === state.scenarioId) || CONVERSATION_SCENARIOS[0];

  return `
    <div class="space-y-6 pb-8 anim-in">
      ${renderLevelFilterBar()}

      <div class="card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="chip chip-green">GERÇEK HAYAT & İŞ İNGİLİZCESİ</span>
          <h1 class="h1">Günlük Konuşma Kalıpları & Diyalog Simülatörü</h1>
          <p class="text-sm muted">Seviyene göre günlük kalıplar, birebir mantık karşılaştırması ve mikrofonlu rol canlandırma.</p>
        </div>
        <div class="seg shrink-0">
          <button onclick="setConvSub('patterns')" class="seg-item ${state.convSub === 'patterns' ? 'seg-active' : ''}">
            Günlük Kalıplar (${phrases.length})
          </button>
          <button onclick="setConvSub('dialogues')" class="seg-item ${state.convSub === 'dialogues' ? 'seg-active' : ''}">
            Rol Canlandırma (${state.progress.completedScenarios.length}/${CONVERSATION_SCENARIOS.length})
          </button>
        </div>
      </div>

      ${state.convSub === 'patterns' ? `
        <div class="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          ${PHRASE_CATEGORIES.map((c) => `
            <button onclick="setPhraseCat('${c.id}')" class="shrink-0 px-3.5 h-9 rounded-xl text-xs font-semibold border transition ${
              state.phraseCat === c.id
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white dark:bg-ink-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }">${c.emoji} ${c.label}</button>
          `).join('')}
        </div>

        ${phrases.length === 0 ? `
          <div class="card p-8 text-center space-y-3">
            <p class="text-sm font-semibold muted">Seçili seviye (${state.selectedLevel}) ve kategoride kalıp bulunamadı.</p>
            <button onclick="setGlobalLevel('ALL'); setPhraseCat('all')" class="btn btn-primary btn-sm">Tüm Seviyeleri Göster</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${phrases.map((item) => {
              const done = state.progress.masteredPhrases.includes(item.id);
              const safeEn = item.en.replace(/'/g, "\\'");
              return `
                <div class="card p-5 flex flex-col justify-between gap-4">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between gap-2">
                      <span class="chip chip-brand">Seviye ${item.level} • ${item.usageContext}</span>
                      <button onclick="toggleMasterPhrase('${item.id}')" class="btn ${done ? 'btn-success' : 'btn-secondary'} btn-sm">
                        ${done ? '✓ Öğrenildi' : 'Öğrendim'}
                      </button>
                    </div>
                    <div>
                      <h3 class="text-lg font-extrabold text-slate-900 dark:text-white">"${item.en}"</h3>
                      <div class="mt-1 inline-block px-2.5 py-0.5 rounded-md bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 text-xs font-semibold">
                        🗣️ Okunuşu: ${item.trRead}
                      </div>
                    </div>
                    <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <div class="text-sm font-bold text-slate-900 dark:text-white">🇹🇷 Doğal Anlamı: ${item.trMeaning}</div>
                      <div class="text-xs muted">🔍 Kelime Mantığı: "${item.literalTr}"</div>
                    </div>
                    <div class="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                      <strong>🧠 Hafıza İpucu:</strong> ${item.memoryHook}
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button onclick="speakText('${safeEn}', 0.95)" class="btn btn-primary btn-sm flex-1">
                        ${icon('volume', 'w-4 h-4')}
                        <span>Dinle</span>
                      </button>
                      <button onclick="speakText('${safeEn}', 0.6)" class="btn btn-secondary btn-sm">🐢 Yavaş</button>
                      <button onclick="practiceSpeech('${safeEn}', 'phrase-sp-${item.id}')" class="btn btn-outline btn-sm">🎙️ Söyle</button>
                    </div>
                    <div id="phrase-sp-${item.id}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      ` : `
        <div class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            ${CONVERSATION_SCENARIOS.map((sc) => `
              <button onclick="selectScenario('${sc.id}')" class="card p-4 text-left transition ${
                activeSc.id === sc.id ? 'border-brand-600 ring-2 ring-brand-500/20' : 'hover:border-slate-300'
              }">
                <div class="flex items-center justify-between mb-1">
                  <span class="chip chip-brand">${sc.level}</span>
                  ${state.progress.completedScenarios.includes(sc.id) ? `<span class="chip chip-green">✓ Bitti</span>` : ''}
                </div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white mt-1">${sc.title}</h3>
                <p class="text-xs muted mt-0.5">${sc.subtitle}</p>
              </button>
            `).join('')}
          </div>

          <div class="card p-5 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 class="h2">${activeSc.title}</h2>
                <p class="text-xs muted">Her satırı dinle ve mikrofon butonuna basarak telaffuzunu test et.</p>
              </div>
              <button onclick="completeScenario('${activeSc.id}')" class="btn ${
                state.progress.completedScenarios.includes(activeSc.id) ? 'btn-success' : 'btn-primary'
              } btn-sm">
                ${state.progress.completedScenarios.includes(activeSc.id) ? '✓ Senaryo Tamamlandı' : 'Senaryoyu Bitirdim (+25 XP)'}
              </button>
            </div>
            <div class="space-y-3.5">
              ${activeSc.lines.map((line, idx) => {
                const isUser = line.speaker === 'B';
                const safeLine = line.en.replace(/'/g, "\\'");
                return `
                  <div class="flex flex-col ${isUser ? 'items-end' : 'items-start'}">
                    <div class="max-w-xl w-full rounded-2xl p-4 border ${
                      isUser
                        ? 'bg-brand-50/60 dark:bg-brand-950/30 border-brand-200 dark:border-brand-900/60'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700'
                    }">
                      <div class="flex items-center justify-between gap-2 mb-1.5">
                        <span class="chip ${isUser ? 'chip-brand' : 'chip-slate'}">
                          ${isUser ? '🎙️ SENİN SIRAN' : `👤 ${line.speakerName}`}
                        </span>
                        <div class="flex items-center gap-1.5">
                          <button onclick="speakText('${safeLine}', 0.95)" class="speak-btn speak-btn-sm">${icon('volume', 'w-3.5 h-3.5')}</button>
                          <button onclick="speakText('${safeLine}', 0.6)" class="speak-btn speak-btn-sm">🐢</button>
                          <button onclick="practiceSpeech('${safeLine}', 'dlg-sp-${idx}')" class="btn btn-primary btn-sm">🎙️ Söyle</button>
                        </div>
                      </div>
                      <p class="text-base font-bold text-slate-900 dark:text-white">${line.en}</p>
                      <p class="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-1">🗣️ Okunuşu: ${line.trRead}</p>
                      <p class="text-xs sm:text-sm muted mt-0.5">🇹🇷 ${line.trMeaning}</p>
                      ${line.tip ? `<div class="mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700 text-xs text-amber-800 dark:text-amber-300">💡 ${line.tip}</div>` : ''}
                      <div id="dlg-sp-${idx}"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

// --- 5. ZAMİRLER, GÖRSEL ŞEMALAR & 21 TABLO STÜDYOSU ---
function renderGrammar() {
  const filteredTables =
    state.selectedLevel === 'ALL'
      ? REFERENCE_TABLES
      : REFERENCE_TABLES.filter((t) => t.level === state.selectedLevel);
  const activeTable =
    filteredTables.find((t) => t.id === state.tableId) ||
    REFERENCE_TABLES.find((t) => t.id === state.tableId) ||
    filteredTables[0] ||
    REFERENCE_TABLES[0];
  const isTableDone = state.progress.masteredTables.includes(activeTable.id);

  const selTense =
    GRAMMAR_TENSES.find((t) => t.id === state.tenseId) ||
    GRAMMAR_TENSES[0];
  const isTenseDone = state.progress.masteredTenses.includes(selTense.id);

  return `
    <div class="space-y-6 pb-8 anim-in">
      ${renderLevelFilterBar()}

      <!-- Üst Başlık & Sekme Seçici -->
      <div class="card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="chip chip-brand">ZAMİR TABLOLARI & GÖRSEL ZAMANLAR</span>
          <h1 class="h1">Şahıs/Kişi Zamirleri, Yapı Tabloları & Zaman Çizelgeleri</h1>
          <p class="text-sm muted">
            Zamirlerin cümledeki renkli konum şeması, IN-ON-AT görsel piramidi, ${REFERENCE_TABLES.length} detaylı tablo ve SVG zaman çizelgeleri.
          </p>
        </div>
        <div class="seg shrink-0">
          <button onclick="setGramSub('tables')" class="seg-item ${state.gramSub === 'tables' ? 'seg-active' : ''}">
            Konu & Zamir Tabloları (${REFERENCE_TABLES.length})
          </button>
          <button onclick="setGramSub('tenses')" class="seg-item ${state.gramSub === 'tenses' ? 'seg-active' : ''}">
            Görsel Zamanlar (${GRAMMAR_TENSES.length})
          </button>
          <button onclick="setGramSub('rules')" class="seg-item ${state.gramSub === 'rules' ? 'seg-active' : ''}">
            Altın Kurallar (4)
          </button>
        </div>
      </div>

      <!-- Görsel İnfografik Şemalar -->
      ${renderVisualInfographicsSection()}

      ${state.gramSub === 'tables' ? `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          ${(filteredTables.length > 0 ? filteredTables : REFERENCE_TABLES).map((tbl) => {
            const active = activeTable.id === tbl.id;
            const done = state.progress.masteredTables.includes(tbl.id);
            return `
              <button onclick="selectTable('${tbl.id}')" class="p-3.5 rounded-2xl border text-left transition ${
                active
                  ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-ink-900 hover:border-brand-400'
              }">
                <div class="flex items-center justify-between mb-1">
                  <span class="chip chip-brand">Seviye ${tbl.level} • ${tbl.category}</span>
                  ${done ? `<span class="chip chip-green">✓</span>` : ''}
                </div>
                <div class="font-bold text-xs sm:text-sm leading-snug mt-1.5 text-slate-900 dark:text-white">${tbl.title}</div>
              </button>
            `;
          }).join('')}
        </div>

        <div class="card overflow-hidden">
          <div class="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="space-y-1">
              <span class="chip chip-brand">SEVİYE ${activeTable.level} • ${activeTable.category.toUpperCase()}</span>
              <h2 class="text-xl sm:text-2xl font-extrabold text-white pt-1">${activeTable.title}</h2>
              <p class="text-slate-300 text-xs sm:text-sm">${activeTable.subtitle}</p>
            </div>
            <button onclick="toggleMasterTable('${activeTable.id}')" class="btn ${isTableDone ? 'btn-success' : 'btn-primary'} btn-sm self-start sm:self-auto shrink-0">
              ${isTableDone ? '✓ Bu Tabloyu Öğrendim' : 'Tabloyu Öğrendim (+25 XP)'}
            </button>
          </div>

          <div class="p-5 sm:p-6 space-y-6">
            <div class="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-900/50 space-y-2">
              <div class="text-xs font-extrabold uppercase text-brand-800 dark:text-brand-300">📌 BU TABLODAKİ YAPILAR CÜMLEDE NASIL KULLANILIR?</div>
              <ul class="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                ${activeTable.howToUse.map((tip) => `<li>${tip}</li>`).join('')}
              </ul>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table class="data-table min-w-[680px]">
                <thead>
                  <tr>
                    ${activeTable.headers.map((h) => `<th class="whitespace-pre-line">${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${activeTable.rows.map((row) => `
                    <tr>
                      ${row.map((cell, cIdx) => `
                        <td class="whitespace-pre-line ${
                          cIdx === 0
                            ? 'font-extrabold text-brand-700 dark:text-brand-300 bg-brand-50/40 dark:bg-brand-950/20'
                            : 'font-medium text-slate-800 dark:text-slate-200'
                        }">${cell}</td>
                      `).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="space-y-3">
              <div class="eyebrow">TABLONUN CANLI CÜMLE İÇİNDE KULLANIMI (DİNLE & SÖYLE)</div>
              <div class="grid grid-cols-1 gap-2.5">
                ${activeTable.liveExamples.map((ex, idx) => {
                  const safeEn = ex.en.replace(/'/g, "\\'");
                  return `
                    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p class="text-base font-bold text-slate-900 dark:text-white">${ex.en}</p>
                        <p class="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">🗣️ Okunuşu: ${ex.trRead}</p>
                        <p class="text-xs muted mt-0.5">🇹🇷 ${ex.tr}</p>
                        <div id="tbl-sp-${idx}"></div>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        <button onclick="speakText('${safeEn}', 0.95)" class="btn btn-primary btn-sm">
                          ${icon('volume', 'w-4 h-4')}
                          <span>Dinle</span>
                        </button>
                        <button onclick="speakText('${safeEn}', 0.6)" class="btn btn-secondary btn-sm">🐢</button>
                        <button onclick="practiceSpeech('${safeEn}', 'tbl-sp-${idx}')" class="btn btn-outline btn-sm">🎙️ Söyle</button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        </div>
      ` : state.gramSub === 'tenses' ? `
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          ${GRAMMAR_TENSES.map((t) => `
            <button onclick="selectTense('${t.id}')" class="p-3.5 rounded-2xl border text-left transition ${
              selTense.id === t.id
                ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-ink-900 hover:border-brand-400'
            }">
              <div class="flex items-center justify-between mb-1">
                <span class="chip chip-brand">Seviye ${t.level}</span>
                ${state.progress.masteredTenses.includes(t.id) ? `<span class="chip chip-green">✓</span>` : ''}
              </div>
              <div class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-1">${t.nameEn}</div>
              <div class="text-[11px] muted mt-0.5">${t.nameTr}</div>
            </button>
          `).join('')}
        </div>

        <div class="card p-5 sm:p-6 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div class="space-y-1">
              <span class="chip chip-brand">Seviye ${selTense.level} • 🇹🇷 Türkçe Karşılığı: ${selTense.trSuffix}</span>
              <h2 class="h1 pt-1">${selTense.nameEn} — ${selTense.nameTr}</h2>
              <p class="text-sm muted">${selTense.coreLogic}</p>
            </div>
            <button onclick="toggleMasterTense('${selTense.id}')" class="btn ${isTenseDone ? 'btn-success' : 'btn-secondary'} btn-sm shrink-0">
              ${isTenseDone ? '✓ Bu Zamanı Öğrendim' : 'Öğrendim İşaretle'}
            </button>
          </div>

          <!-- Görsel Zaman Çizelgesi (SVG Timeline) -->
          ${renderTenseTimelineSVG(selTense.id)}

          <div class="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-900/50 text-sm text-slate-800 dark:text-slate-200 font-medium">
            ${selTense.memoryCode}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50">
              <div class="text-emerald-700 dark:text-emerald-300 font-extrabold text-xs uppercase mb-1">➕ Olumlu Cümle (+)</div>
              <div class="font-mono text-sm font-bold">${selTense.formula.positive}</div>
            </div>
            <div class="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50">
              <div class="text-rose-700 dark:text-rose-300 font-extrabold text-xs uppercase mb-1">➖ Olumsuz Cümle (-)</div>
              <div class="font-mono text-sm font-bold">${selTense.formula.negative}</div>
            </div>
            <div class="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-900/50">
              <div class="text-brand-700 dark:text-brand-300 font-extrabold text-xs uppercase mb-1">❓ Soru Cümlesi (?)</div>
              <div class="font-mono text-sm font-bold">${selTense.formula.question}</div>
            </div>
          </div>

          <div class="space-y-2.5">
            ${selTense.examples.map((ex) => {
              const safeEn = ex.en.replace(/'/g, "\\'");
              return `
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="space-y-0.5">
                    <span class="text-xs font-bold text-brand-600 dark:text-brand-400">Odak: ${ex.highlight}</span>
                    <p class="text-base font-bold text-slate-900 dark:text-white">${ex.en}</p>
                    <p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">🗣️ Okunuşu: ${ex.trRead}</p>
                    <p class="text-xs muted">🇹🇷 ${ex.tr}</p>
                  </div>
                  <div class="flex gap-2 shrink-0">
                    <button onclick="speakText('${safeEn}', 0.95)" class="btn btn-primary btn-sm">Dinle</button>
                    <button onclick="speakText('${safeEn}', 0.6)" class="btn btn-secondary btn-sm">🐢</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : `
        <div class="grid grid-cols-1 gap-4">
          ${CORE_STRUCTURE_RULES.map((rule) => `
            <div class="card p-5 sm:p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="chip chip-brand">${rule.badge}</span>
                <button onclick="speakText('${rule.comparison.exampleEn.replace(/'/g, "\\'")}', 0.9)" class="btn btn-primary btn-sm">Örneği Dinle</button>
              </div>
              <h3 class="h2">${rule.title}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/50">
                  <strong class="text-rose-700 dark:text-rose-300 block mb-1">❌ Neden Zorlanıyoruz?</strong>${rule.problemTr}
                </div>
                <div class="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/50">
                  <strong class="text-emerald-700 dark:text-emerald-300 block mb-1">✅ İngilizcenin Çözümü:</strong>${rule.solutionEn}
                </div>
              </div>
              <div class="p-4 rounded-xl bg-slate-900 text-white space-y-2 font-mono text-xs sm:text-sm">
                <div class="text-slate-300">${rule.comparison.trOrder}</div>
                <div class="text-sky-300 font-bold">${rule.comparison.enOrder}</div>
                <div class="pt-2 border-t border-slate-700 text-emerald-300">🎯 Canlı Örnek: "${rule.comparison.exampleEn}" (${rule.comparison.exampleRead})</div>
              </div>
              <div class="p-3 rounded-xl bg-brand-50/70 dark:bg-brand-950/40 text-xs font-bold text-brand-900 dark:text-brand-200">${rule.goldenRule}</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// --- 6. RESİMLİ HAFIZA KARTLARI (SRS), CÜMLE KURMA & SEVİYE SINAVLARI ---
function renderSRS() {
  const card = MNEMONIC_VOCAB_DATA[state.cardIdx];
  const scene = VOCAB_VISUAL_SCENES[card.id] || {
    emojis: '🧠 ✨ 💡',
    badge: card.soundAlikeTr,
    bgGrad: 'from-slate-800 to-slate-900',
    caption: card.mnemonicStory
  };
  const srs = state.progress.srsMap[card.id];
  const ch = SENTENCE_CHALLENGES[state.challengeIdx];
  const pool = [...ch.correctWords, ...ch.distractors].sort((a, b) => a.localeCompare(b));
  const activeExam = LEVEL_EXAMS.find((e) => e.id === state.examId) || LEVEL_EXAMS[0];

  return `
    <div class="space-y-6 pb-8 anim-in">
      ${renderLevelFilterBar()}

      <!-- Üst Başlık & Alt Sekme Seçici -->
      <div class="card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div class="space-y-1">
          <span class="chip chip-amber">ARALIKLI TEKRAR (SRS) & SEVİYE SINAVLARI</span>
          <h1 class="h1">Görsel Hafıza Çivileri, Cümle İnşası & Bölüm Sınavları</h1>
          <p class="text-sm muted">Kelimeleri ses çağrışımlı hikayelerle hafızana kazı, cümle kur ve bölüm sonu sınavlarıyla seviyeni ölç.</p>
        </div>
        <div class="seg shrink-0">
          <button onclick="setSrsSub('flashcards')" class="seg-item ${state.srsSub === 'flashcards' ? 'seg-active' : ''}">
            Hafıza Kartları (${MNEMONIC_VOCAB_DATA.length})
          </button>
          <button onclick="setSrsSub('builder')" class="seg-item ${state.srsSub === 'builder' ? 'seg-active' : ''}">
            Cümle Kurma (${SENTENCE_CHALLENGES.length})
          </button>
          <button onclick="setSrsSub('exams')" class="seg-item ${state.srsSub === 'exams' ? 'seg-active' : ''}">
            Seviye Sınavları (${LEVEL_EXAMS.length})
          </button>
        </div>
      </div>

      ${state.srsSub === 'flashcards' ? `
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          ${MNEMONIC_VOCAB_DATA.map((item, idx) => `
            <button onclick="selectCardIdx(${idx})" class="shrink-0 px-3 h-9 rounded-xl text-xs font-bold border transition ${
              state.cardIdx === idx
                ? 'bg-brand-600 text-white border-brand-600'
                : state.progress.srsMap[item.id]
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-ink-900 border-slate-200 dark:border-slate-800'
            }">${idx + 1}. ${item.word} (${item.level})</button>
          `).join('')}
        </div>

        <div class="card overflow-hidden">
          <div class="p-6 bg-slate-900 text-white text-center space-y-2">
            <div class="flex items-center justify-between">
              <span class="chip chip-brand">Seviye ${card.level} • ${card.partOfSpeech}</span>
              ${srs ? `<span class="chip chip-green">✓ Sonraki Tekrar: ${srs.interval === 0 ? 'Bugün' : srs.interval + ' gün sonra'}</span>` : ''}
            </div>
            <div class="text-4xl py-1">${scene.emojis}</div>
            <div class="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wide">
              🔑 SES ÇAĞRIŞIMI: ${scene.badge}
            </div>
          </div>

          <div class="p-6 sm:p-8">
            <div class="text-center space-y-3">
              <h2 class="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">${card.word}</h2>
              <div class="flex items-center justify-center gap-2">
                <span class="text-sm font-mono muted">${card.ipa}</span>
                <span class="chip chip-brand text-xs">🗣️ Okunuşu: ${card.trRead}</span>
              </div>
              <div class="flex items-center justify-center gap-2 pt-2">
                <button onclick="speakText('${card.word}', 0.9)" class="btn btn-primary btn-sm">
                  ${icon('volume', 'w-4 h-4')}
                  <span>Kelimeyi Dinle</span>
                </button>
                <button onclick="speakText('${card.word}', 0.55)" class="btn btn-secondary btn-sm">🐢 Yavaş</button>
              </div>
            </div>

            ${!state.cardFlipped ? `
              <div class="mt-6 text-center">
                <button onclick="flipCard()" class="btn btn-primary btn-lg w-full sm:w-auto">
                  Görsel Hafıza Hikayesini & Anlamını Göster
                </button>
              </div>
            ` : `
              <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 anim-in">
                <div class="text-center">
                  <div class="eyebrow">TÜRKÇE ANLAMI</div>
                  <div class="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">${card.meaning}</div>
                </div>
                <div class="p-4 rounded-xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200/70 dark:border-brand-900/50 space-y-1">
                  <div class="text-xs font-extrabold text-brand-800 dark:text-brand-300 uppercase">🎬 HAFIZA HİKAYESİ (${card.soundAlikeTr})</div>
                  <p class="text-sm font-medium text-slate-700 dark:text-slate-200">${card.mnemonicStory}</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-bold text-slate-900 dark:text-white">"${card.exampleEn}"</p>
                    <p class="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">🗣️ ${card.exampleRead}</p>
                    <p class="text-xs muted mt-0.5">🇹🇷 ${card.exampleTr}</p>
                  </div>
                  <button onclick="speakText('${card.exampleEn.replace(/'/g, "\\'")}', 0.9)" class="speak-btn">${icon('volume', 'w-4 h-4')}</button>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <button onclick="rateCard('again')" class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900">😓 Zorlandım<span class="block text-[10px] font-normal mt-0.5">5 dk sonra</span></button>
                  <button onclick="rateCard('hard')" class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-900">🤔 Biraz Zor<span class="block text-[10px] font-normal mt-0.5">1 gün sonra</span></button>
                  <button onclick="rateCard('good')" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900">😊 İyi Hatırladım<span class="block text-[10px] font-normal mt-0.5">3 gün sonra</span></button>
                  <button onclick="rateCard('easy')" class="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-bold text-xs border border-brand-200 dark:border-brand-900">🚀 Çok Kolay!<span class="block text-[10px] font-normal mt-0.5">7+ gün sonra</span></button>
                </div>
              </div>
            `}
          </div>
        </div>
      ` : state.srsSub === 'builder' ? `
        <div class="card p-5 sm:p-6 space-y-5">
          <div class="flex items-center justify-between">
            <span class="chip chip-brand">Görev ${state.challengeIdx + 1} / ${SENTENCE_CHALLENGES.length}</span>
            <button onclick="resetBuilder()" class="btn btn-ghost btn-sm">Sıfırla</button>
          </div>
          <div>
            <div class="eyebrow">BU CÜMLEYİ İNGİLİZCE KUR</div>
            <h3 class="h1 mt-1">"${ch.trPrompt}"</h3>
          </div>
          <div class="min-h-[72px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
            ${state.selectedWords.length === 0
              ? `<span class="text-xs muted">Aşağıdaki kelimelere sırayla dokunarak cümleyi buraya diz...</span>`
              : state.selectedWords.map((w) => `<button onclick="toggleBuilderWord('${w.replace(/'/g, "\\'")}')" class="tile tile-selected">${w}</button>`).join('')
            }
          </div>
          <div class="flex flex-wrap gap-2">
            ${pool.map((w) => {
              const used = state.selectedWords.includes(w);
              const safeW = w.replace(/'/g, "\\'");
              return `<button ${used ? 'disabled' : ''} onclick="toggleBuilderWord('${safeW}')" class="tile ${used ? 'tile-used' : ''}">${w}</button>`;
            }).join('')}
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span class="text-xs muted">💡 ${ch.grammarTip}</span>
            <div class="flex gap-2">
              <button onclick="checkBuilder()" class="btn btn-success btn-sm">Cümleyi Kontrol Et</button>
              <button onclick="nextChallenge()" class="btn btn-secondary btn-sm">Sonraki Soru →</button>
            </div>
          </div>
          ${state.builderResult === 'correct' ? `<div class="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 text-xs font-bold">🏆 Harika! Doğru Cümle (+20 XP) — Okunuşu: ${ch.trRead}</div>` : ''}
          ${state.builderResult === 'wrong' ? `<div class="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 text-xs font-bold">❌ Doğru sıra: "${ch.correctWords.join(' ')}"</div>` : ''}
        </div>
      ` : `
        <div class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${LEVEL_EXAMS.map((ex) => `
              <button onclick="selectExam('${ex.id}')" class="card p-4 text-left transition ${
                activeExam.id === ex.id ? 'border-brand-600 ring-2 ring-brand-500/20' : 'hover:border-slate-300'
              }">
                <span class="chip chip-brand mb-1.5">${ex.level}</span>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">${ex.title}</h3>
                <p class="text-xs muted mt-0.5">${ex.description}</p>
              </button>
            `).join('')}
          </div>

          <div class="card p-5 sm:p-6 space-y-5">
            <div>
              <h2 class="h2">${activeExam.title}</h2>
              <p class="text-xs muted mt-0.5">Her soruda doğru şıkkı seç; anında detaylı Türkçe çözüm açıklamasını gör (+15 XP).</p>
            </div>

            <div class="space-y-4">
              ${activeExam.questions.map((qItem, qIdx) => {
                const chosen = state.examAnswers[qIdx];
                return `
                  <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-3">
                    <p class="font-bold text-sm sm:text-base text-slate-900 dark:text-white">${qItem.q}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      ${qItem.options.map((opt, optIdx) => {
                        let cls = 'option';
                        if (chosen !== undefined) {
                          if (optIdx === qItem.answer) {
                            cls = 'option option-correct';
                          } else if (optIdx === chosen) {
                            cls = 'option option-wrong';
                          }
                        }
                        return `
                          <button onclick="answerExamQuestion(${qIdx}, ${optIdx})" class="${cls}">
                            <span>${opt}</span>
                          </button>
                        `;
                      }).join('')}
                    </div>
                    ${chosen !== undefined ? `
                      <div class="p-3 rounded-xl ${chosen === qItem.answer ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200' : 'bg-brand-100/80 text-brand-900 dark:bg-brand-950/60 dark:text-brand-200'} text-xs font-semibold">
                        ${chosen === qItem.answer ? '✅ Doğru!' : '💡 Çözüm Açıklaması:'} ${qItem.explanation}
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

// --- ANA UYGULAMA ÇERÇEVESİ (PROFESYONEL DİL PLATFORMU MİMARİSİ) ---
function renderApp() {
  const root = document.getElementById('root');
  if (!root) return;

  const navItems = [
    { id: 'home', label: 'Ana Merkez', short: 'Merkez', iconName: 'home', badge: '' },
    { id: 'planner', label: 'Çalışma Planım', short: 'Planım', iconName: 'calendar', badge: 'Yeni' },
    { id: 'roadmap', label: 'A1 → C2 Müfredat', short: 'Müfredat', iconName: 'map', badge: '62 Ünite' },
    { id: 'grammar', label: 'Zamir & Tablolar', short: 'Tablolar', iconName: 'table', badge: '21 Tablo' },
    { id: 'alphabet', label: 'Alfabe & Ses Lab', short: 'Alfabe', iconName: 'type', badge: '26 Harf' },
    { id: 'conversations', label: 'Sohbet & Diyalog', short: 'Sohbet', iconName: 'message', badge: '' },
    { id: 'srs', label: 'Hafıza & Sınavlar', short: 'Sınav/SRS', iconName: 'trophy', badge: '' }
  ];

  const todayStr = new Date().toISOString().slice(0, 10);
  const completedDailyIds = (state.progress.dailyCompleted && state.progress.dailyCompleted[todayStr]) || [];
  const dailyPct = Math.min(100, Math.round((completedDailyIds.length / DEFAULT_DAILY_TASKS.length) * 100));
  const last = state.progress.lastVisited || {
    title: 'Ders 9-10: İngiliz Alfabesi (A → Ey)',
    category: 'A1 Başlangıç'
  };

  root.innerHTML = `
    <div class="min-h-screen flex bg-slate-50 dark:bg-ink-950 text-slate-900 dark:text-slate-100">
      
      <!-- SOL YAN MENÜ (Desktop Sidebar — Profesyonel Dil Uygulaması Düzeni) -->
      <aside class="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-ink-900 sticky top-0 h-screen justify-between p-4">
        <div class="space-y-5">
          <!-- Marka & Logo -->
          <button onclick="setTab('home')" class="flex items-center gap-3 px-2 py-1 text-left w-full group">
            <div class="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-display font-extrabold text-lg shadow-sm group-hover:scale-105 transition">
              Aa
            </div>
            <div>
              <span class="font-display font-extrabold text-lg block leading-none text-slate-900 dark:text-white">
                Lingua<span class="text-brand-600 dark:text-brand-400">Master</span>
              </span>
              <span class="text-[11px] font-semibold text-slate-400 block mt-1">A1 → C2 Akademik Sistem</span>
            </div>
          </button>

          <!-- Hızlı Günlük Pratik Başlat Butonu -->
          <button onclick="startPracticeSession()" class="btn btn-primary btn-md w-full shadow-md">
            ${icon('play', 'w-4 h-4')}
            <span>Günlük Pratik Başlat</span>
          </button>

          <!-- Ana Navigasyon Menüsü -->
          <nav class="space-y-1">
            <div class="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">ÖĞRENİM MODÜLLERİ</div>
            ${navItems.map((n) => {
              const active = state.tab === n.id;
              return `
                <button onclick="setTab('${n.id}')" class="nav-item w-full justify-between ${active ? 'nav-active' : ''}">
                  <span class="flex items-center gap-3">
                    ${icon(n.iconName, 'w-5 h-5')}
                    <span>${n.label}</span>
                  </span>
                  ${n.badge ? `<span class="chip ${active ? 'chip-brand' : 'chip-slate'}">${n.badge}</span>` : ''}
                </button>
              `;
            }).join('')}
          </nav>
        </div>

        <!-- Alt Kaldığım Yer & Günlük Hedef Özeti -->
        <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2">
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                ${icon('target', 'w-4 h-4 text-brand-600')}
                <span>Günlük Hedef</span>
              </span>
              <span class="text-brand-600 dark:text-brand-400">${completedDailyIds.length}/${DEFAULT_DAILY_TASKS.length}</span>
            </div>
            <div class="progress">
              <span style="width: ${dailyPct}%"></span>
            </div>
          </div>

          <button onclick="resumeLastActivity()" class="w-full p-3 rounded-xl bg-brand-50/70 hover:bg-brand-100/70 dark:bg-brand-950/40 dark:hover:bg-brand-950/70 border border-brand-200/70 dark:border-brand-900/60 text-left transition space-y-1">
            <div class="flex items-center justify-between text-[10px] font-extrabold uppercase text-brand-700 dark:text-brand-300">
              <span>📌 KALDIĞIN YER</span>
              <span>Devam Et →</span>
            </div>
            <div class="text-xs font-bold text-slate-900 dark:text-white truncate">${last.title}</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400 truncate">${last.category || ''}</div>
          </button>
        </div>
      </aside>

      <!-- SAĞ ANA İÇERİK SÜTUNU -->
      <div class="flex-1 flex flex-col min-w-0">
        <!-- Üst Bar: Arama (Ctrl+K), Günlük Seri, XP, Aksan & Tema -->
        <header class="sticky top-0 z-30 bg-white/90 dark:bg-ink-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
          <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
            <!-- Mobil Logo -->
            <button onclick="setTab('home')" class="lg:hidden flex items-center gap-2 text-left shrink-0">
              <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center text-white font-display font-extrabold text-sm">Aa</div>
              <span class="font-display font-extrabold text-base text-slate-900 dark:text-white">Lingua<span class="text-brand-600">Master</span></span>
            </button>

            <!-- Akıllı Arama Çubuğu -->
            <button onclick="openSearchModal()" class="flex-1 max-w-md h-10 px-3.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/70 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/70 flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 transition">
              <span class="flex items-center gap-2 truncate">
                ${icon('search', 'w-4 h-4 text-slate-400')}
                <span class="truncate">Konu, tablo, zaman veya kelime ara...</span>
              </span>
              <span class="kbd hidden sm:inline-flex">Ctrl K</span>
            </button>

            <!-- Sağ Durum Rozetleri -->
            <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button onclick="startPracticeSession()" class="hidden sm:inline-flex btn btn-primary btn-sm">
                ${icon('zap', 'w-3.5 h-3.5')}
                <span>Hızlı Test</span>
              </button>

              <div class="hidden sm:flex items-center gap-1 px-2.5 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200/60 dark:border-amber-900/50" title="Günlük Seri">
                <span>🔥 ${state.progress.streakDays} Gün</span>
              </div>

              <div class="flex items-center gap-1 px-2.5 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 text-xs font-extrabold border border-brand-200/60 dark:border-brand-900" id="header-xp">
                <span>🏆 ${state.progress.xp} XP</span>
              </div>

              <button onclick="toggleAccent()" class="px-2.5 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700" title="Telaffuz Aksanı">
                ${currentAccent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}
              </button>

              <button onclick="toggleDark()" class="icon-btn border border-slate-200 dark:border-slate-700" title="Gece / Gündüz Modu">
                ${state.darkMode ? icon('sun', 'w-4 h-4 text-amber-400') : icon('moon', 'w-4 h-4')}
              </button>
            </div>
          </div>
        </header>

        <!-- Sayfa İçeriği -->
        <main class="flex-1 max-w-6xl w-full mx-auto px-4 pt-5 pb-24 lg:pb-12">
          ${state.tab === 'home' ? renderHome() : ''}
          ${state.tab === 'planner' ? renderStudyPlannerPage(state) : ''}
          ${state.tab === 'roadmap' ? renderRoadmap() : ''}
          ${state.tab === 'alphabet' ? renderAlphabet() : ''}
          ${state.tab === 'conversations' ? renderConversations() : ''}
          ${state.tab === 'grammar' ? renderGrammar() : ''}
          ${state.tab === 'srs' ? renderSRS() : ''}
        </main>
      </div>

      <!-- MOBİL ALT NAVİGASYON (Bottom Tab Bar) -->
      <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-ink-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-1 py-1 pb-safe">
        <div class="grid grid-cols-7 gap-0.5">
          ${navItems.map((n) => {
            const active = state.tab === n.id;
            return `
              <button onclick="setTab('${n.id}')" class="flex flex-col items-center justify-center py-1.5 rounded-xl transition ${
                active ? 'text-brand-600 dark:text-brand-400 bg-brand-50/80 dark:bg-brand-950/60 font-bold' : 'text-slate-500 font-medium'
              }">
                ${icon(n.iconName, 'w-4 h-4')}
                <span class="text-[9px] mt-1 tracking-tight">${n.short}</span>
              </button>
            `;
          }).join('')}
        </div>
      </nav>

      <!-- İNTERAKTİF PRATİK OTURUMU VE ARAMA MODALLARI -->
      ${renderInteractivePlayerModal(state.practiceSession)}
      ${renderSearchModal(state.searchModal)}
    </div>
  `;
}

renderApp();
