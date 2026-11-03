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
    { id: 'ALL', label: 'Tüm Seviyeler' },
    { id: 'A1', label: 'A1 Başlangıç' },
    { id: 'A2', label: 'A2 Temel' },
    { id: 'B1', label: 'B1 Orta' },
    { id: 'B2', label: 'B2 Orta Üstü' },
    { id: 'C1', label: 'C1 İleri' },
    { id: 'C2', label: 'C2 Ana Dil' }
  ];
  return `
    <div class="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-200/90 dark:border-slate-800 modern-card flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
      <div class="flex items-center gap-1 shrink-0">
        <span class="text-[11px] font-bold text-slate-400 px-2 hidden sm:inline">SEVİYE:</span>
        ${levels.map((l) => `
          <button onclick="setGlobalLevel('${l.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
            state.selectedLevel === l.id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }">${l.label}</button>
        `).join('')}
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button onclick="setTab('planner')" class="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition">
          📅 Çalışma Planım
        </button>
        <button onclick="setTab('roadmap')" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-blue-600 hover:text-white transition">
          🗺️ A1 → C2 Ders Haritası →
        </button>
      </div>
    </div>
  `;
}

// --- 1. ANA MERKEZ (MODERN SAAS PALETİ + PLANLAMA KOKPİTİ + GÖRSEL ŞEMALAR) ---
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

  return `
    <div class="space-y-6 pb-8 animate-fadeIn">
      ${renderLevelFilterBar()}

      <!-- Modern Kurumsal/SaaS Hero Banner -->
      <div class="modern-hero rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 relative overflow-hidden">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div class="space-y-3 max-w-2xl">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold">
              ✨ AKILLI ÇALIŞMA PLANLAYICISI & GÖRSEL HAFIZA SİSTEMİ
            </span>
            <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              İngilizceyi <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-300">Planlı, Görsel Şemalarla ve Sesle</span> Öğren!
            </h1>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
              Nerede kaldığını ve neler yaptığını otomatik takip eden çalışma planlayıcısı, her harfin görsel çapası (<strong>A → 🍎 Apple / Ey</strong>), 21 gramer tablosu ve 289 derslik A1→C2 müfredatı.
            </p>
            <div class="flex flex-wrap gap-2.5 pt-2">
              <button onclick="resumeLastActivity()" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition active:scale-95">
                ▶️ Kaldığım Yerden Devam Et
              </button>
              <button onclick="openPronounsTable()" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition">
                📊 21 Gramer & Zamir Tablosu
              </button>
              <button onclick="setTab('alphabet')" class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition">
                🔤 Resimli 26 Harf & Fonetik (A → Ey)
              </button>
              <button onclick="setTab('planner')" class="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 font-semibold text-xs transition">
                📅 Çalışma Planım & Geçmişim
              </button>
            </div>
          </div>

          <!-- Sağ İstatistik & SVG Halka -->
          <div class="flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-700/80 shrink-0">
            <div class="relative w-20 h-20 flex items-center justify-center">
              <svg class="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" stroke="rgba(255,255,255,0.1)" stroke-width="7" fill="none"/>
                <circle cx="40" cy="40" r="32" stroke="#3b82f6" stroke-width="7" fill="none" stroke-linecap="round"
                  stroke-dasharray="201" stroke-dashoffset="${201 - (201 * pct) / 100}"/>
              </svg>
              <span class="absolute text-base font-extrabold text-white">%${pct}</span>
            </div>
            <div class="space-y-1.5 pr-2">
              <div class="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <span>🔥 ${p.streakDays} Günlük Çalışma Serisi</span>
              </div>
              <div class="flex items-center gap-2 text-xs font-bold text-blue-300">
                <span>🏆 ${p.xp} Toplam XP Puanı</span>
              </div>
              <div class="text-[11px] text-slate-400 font-medium">
                ${done} / ${total} Adım Tamamlandı
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- KİŞİSEL ÇALIŞMA PLANLAYICISI & KALDIĞIM YERDEN DEVAM ET KOKPİTİ -->
      ${renderResumeAndDailyCockpit(state)}

      <!-- 3'lü Görsel Hafıza İnfografikleri (Zamir Şeması, IN-ON-AT Piramidi, Kedi-Kutu Konumları) -->
      ${renderVisualInfographicsSection()}

      <!-- 6 Seviye Görsel Yol Haritası Kartları (A1 -> C2) -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🗺️ Seviyelere Göre Öğrenim Haritası (A1 → C2)</span>
          </h2>
          <button onclick="setTab('roadmap')" class="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">Tüm Dersleri Aç →</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${LEVEL_ROADMAP.map((item, idx) => {
            const icons = ['🌱', '🚀', '⚡', '💼', '🎓', '👑'];
            const completedCount = item.units.filter((u) => (p.completedChecklist || []).includes(u.code)).length;
            const unitPct = Math.round((completedCount / item.units.length) * 100);
            return `
              <div onclick="setGlobalLevel('${item.level}'); setTab('roadmap')" class="cursor-pointer group bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 modern-card transition-all flex flex-col justify-between gap-3">
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-extrabold text-xs">
                      ${icons[idx] || '🌟'} ${item.level} SEVİYESİ
                    </span>
                    <span class="text-xs font-bold text-slate-400">${completedCount}/${item.units.length} Ünite</span>
                  </div>
                  <h3 class="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition">${item.title.split('—')[1] || item.title}</h3>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
                </div>
                <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div class="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-600 rounded-full" style="width: ${unitPct}%"></div>
                  </div>
                  <div class="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
                    <span>Üniteleri ve Tabloları Gör (%${unitPct})</span>
                    <span class="group-hover:translate-x-1 transition">→</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 4 Ana Görsel Modül Kartı -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div onclick="setTab('grammar')" class="cursor-pointer group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 modern-card transition flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-sm">📊</div>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">${REFERENCE_TABLES.length} Tablo • ${GRAMMAR_TENSES.length} Zaman</span>
            </div>
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition">1. Görsel Zamir, Edat, Modal & C1-C2 Tabloları</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Şahıs/Nesne/İyelik zamirleri, Sayılar/Saatler, Artikeller, Modals, Phrasal Verbs ve Zaman Çizelgesi (Timeline) şemaları.</p>
          </div>
          <div class="text-xs font-bold text-blue-600 dark:text-blue-400 pt-3 border-t border-slate-100 dark:border-slate-800">Tabloları ve Zamanları Aç →</div>
        </div>

        <div onclick="setTab('alphabet')" class="cursor-pointer group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500 modern-card transition flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-sm">🔤</div>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300">${p.masteredLetters.length}/26 Harf • ${p.masteredRules.length}/${PHONETIC_RULES.length} Kural</span>
            </div>
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">2. Resimli Alfabe (A → Ey) & Fonetik Laboratuvarı</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Her harf için görsel ikon (A=🍎 Apple, K=🔪 Knife), Türkçe okunuşu, ağız/dil pozisyonu ve peltek TH/SH/CH kuralları.</p>
          </div>
          <div class="text-xs font-bold text-indigo-600 dark:text-indigo-400 pt-3 border-t border-slate-100 dark:border-slate-800">Harfleri ve Sesleri Aç →</div>
        </div>

        <div onclick="setTab('conversations')" class="cursor-pointer group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 modern-card transition flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl shadow-sm">💬</div>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">${PHRASE_PATTERNS.length} Kalıp • ${CONVERSATION_SCENARIOS.length} Rol Canlandırma</span>
            </div>
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">3. Günlük Sohbetler, İş İngilizcesi & Rol Canlandırma</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Kafe, Giyim Mağazası, Havalimanı ve İş Toplantısı senaryoları; konuşma kısaltmaları (Wanna, Gonna) ve C1-C2 deyimler.</p>
          </div>
          <div class="text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-slate-100 dark:border-slate-800">Kalıplara ve Diyaloglara Gir →</div>
        </div>

        <div onclick="setTab('srs')" class="cursor-pointer group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800 hover:border-sky-500 modern-card transition flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center text-xl shadow-sm">🧠</div>
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300">Görsel Hafıza Kartları • 4 Seviye Sınavı</span>
            </div>
            <h2 class="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 transition">4. Görsel Hafıza Çivileri (SRS) & Bölüm Sonu Sınavları</h2>
            <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">Resimli sahnelerle kodlanmış kelime hikayeleri, SM-2 aralıklı tekrar kartları ve A1-A2 / B1-B2 / C1-C2 çözümlü sınavlar.</p>
          </div>
          <div class="text-xs font-bold text-sky-600 dark:text-sky-400 pt-3 border-t border-slate-100 dark:border-slate-800">Görsel Kartları ve Sınavları Aç →</div>
        </div>
      </div>
    </div>
  `;
}

// --- 2. SEVİYE YOL HARİTASI ---
function renderRoadmap() {
  const filteredLevels =
    state.selectedLevel === 'ALL'
      ? LEVEL_ROADMAP
      : LEVEL_ROADMAP.filter((l) => l.level === state.selectedLevel);

  return `
    <div class="space-y-6 pb-8 animate-fadeIn">
      ${renderLevelFilterBar()}

      <div class="modern-hero rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-slate-800">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-400/30 text-blue-300 mb-2">🗺️ A1'DEN C2'YE EKSİKSİZ AKADEMİK MÜFREDAT</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold">Hangi Seviyede Ne Öğrenilecek? (A1 → C2)</h1>
        <p class="text-slate-300 text-sm mt-1">
          İstediğin dersin yanındaki <strong>"📖 Konuyu Aç →"</strong> butonuna basarak doğrudan o konunun tablosuna gidebilir (sistem kaldığın yeri otomatik kaydeder) veya tamamladığında işaretleyebilirsin (+15 XP)!
        </p>
      </div>

      <div class="space-y-5">
        ${filteredLevels.map((lvl) => {
          const completedInLevel = lvl.units.filter((u) =>
            state.progress.completedChecklist.includes(u.code)
          ).length;

          return `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden modern-card">
              <div class="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
                <div>
                  <span class="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-xs font-extrabold mb-1.5">SEVİYE ${lvl.level}</span>
                  <h2 class="text-lg sm:text-xl font-extrabold">${lvl.title}</h2>
                  <p class="text-slate-300 text-xs sm:text-sm mt-1">${lvl.description}</p>
                </div>
                <div class="shrink-0 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-center">
                  <div class="text-lg font-extrabold text-blue-400">${completedInLevel} / ${lvl.units.length}</div>
                  <div class="text-[11px] font-semibold text-slate-300">Ünite Tamamlandı</div>
                </div>
              </div>

              <div class="p-5 sm:p-6 space-y-2">
                ${lvl.units.map((u) => {
                  const checked = state.progress.completedChecklist.includes(u.code);
                  return `
                    <div class="p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      checked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/25 border-emerald-200 dark:border-emerald-900/60'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-700/70 hover:border-blue-400'
                    }">
                      <div onclick="toggleChecklistItem('${u.code}')" class="cursor-pointer flex items-center gap-3 flex-1">
                        <div class="w-11 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                          checked ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'
                        }">
                          ${checked ? '✓' : u.code}
                        </div>
                        <div>
                          <span class="text-sm font-bold block ${checked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}">${u.title}</span>
                          <span class="text-[11px] font-bold text-blue-600 dark:text-blue-400">${u.tag}</span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button onclick="goToUnitLesson('${u.targetTab || 'grammar'}', '${u.tableId || ''}', '${u.tenseId || ''}', '${u.code}')" class="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 hover:bg-blue-600 hover:text-white text-blue-700 dark:text-blue-300 text-xs font-bold transition">
                          📖 Konuyu Aç →
                        </button>
                        <button onclick="toggleChecklistItem('${u.code}')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                          checked ? 'bg-emerald-600 text-white' : 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-emerald-600 hover:text-white'
                        } transition">${checked ? 'Tamam ✓' : 'Bitir'}</button>
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

// --- 3. RESİMLİ ALFABE VE FONETİK LABORATUVARI ---
function renderAlphabet() {
  const letters = ALPHABET_DATA.filter((item) => state.alphaFilter === 'all' ? true : item.type === state.alphaFilter);
  const sel = state.selectedLetter;
  const selAnchor = LETTER_VISUAL_ANCHORS[sel.letter] || { emoji: '🔤', keyword: sel.examples[0].word, color: 'from-indigo-500 to-purple-600' };
  const isMastered = state.progress.masteredLetters.includes(sel.letter);

  return `
    <div class="space-y-6 pb-8 animate-fadeIn">
      <div class="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 mb-2">🔤 RESİMLİ & SESLİ FONETİK LABORATUVARI</span>
            <h1 class="text-2xl sm:text-3xl font-extrabold">26 Harf Görsel Hafıza Kartları & Okunuş Şifreleri</h1>
            <p class="text-indigo-100 text-sm mt-1">Her harfin görsel çapası (A → 🍎 Apple / Ey), ağız pozisyonu ve kelime içi ses değişimleri.</p>
          </div>
          <button onclick="playAllLetters()" class="self-start sm:self-auto bg-white text-indigo-700 font-bold px-4 py-2.5 rounded-2xl shadow text-sm hover:bg-indigo-50">
            ▶️ 26 Harfi Sırayla Dinle
          </button>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-5 bg-black/20 p-1.5 rounded-2xl">
          <button onclick="setAlphaSub('letters')" class="py-2.5 px-4 rounded-xl font-bold text-sm transition ${state.alphaSub === 'letters' ? 'bg-white text-indigo-700 shadow' : 'text-white/80'}">
            🔤 Resimli 26 Harf (${state.progress.masteredLetters.length}/26)
          </button>
          <button onclick="setAlphaSub('rules')" class="py-2.5 px-4 rounded-xl font-bold text-sm transition ${state.alphaSub === 'rules' ? 'bg-white text-indigo-700 shadow' : 'text-white/80'}">
            🔥 Altın Okunuş Kuralları (${state.progress.masteredRules.length}/${PHONETIC_RULES.length})
          </button>
        </div>
      </div>

      ${state.alphaSub === 'letters' ? `
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button onclick="setAlphaFilter('all')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${state.alphaFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}">Tümü (26)</button>
            <button onclick="setAlphaFilter('vowel')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${state.alphaFilter === 'vowel' ? 'bg-amber-500 text-white' : 'text-slate-600 dark:text-slate-400'}">Sesli Harfler (5 Ünlü)</button>
            <button onclick="setAlphaFilter('consonant')" class="px-3 py-1.5 rounded-lg text-xs font-bold ${state.alphaFilter === 'consonant' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400'}">Sessiz Harfler (21 Ünsüz)</button>
          </div>
          <span class="text-xs text-slate-500 font-medium">💡 Harfe dokun: Görsel çapasını ve sesini hemen aç!</span>
        </div>

        <!-- Görsel İkonlu 26 Harf Grid -->
        <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-2.5">
          ${letters.map((item) => {
            const active = sel.letter === item.letter;
            const done = state.progress.masteredLetters.includes(item.letter);
            const anchor = LETTER_VISUAL_ANCHORS[item.letter] || { emoji: '🔤', keyword: '' };
            return `
              <button onclick="selectLetter('${item.letter}')" class="relative flex flex-col items-center justify-between p-2.5 rounded-2xl border-2 transition-all active:scale-95 ${
                active
                  ? 'border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/70 ring-4 ring-indigo-500/20 shadow-lg -translate-y-0.5'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
              }">
                ${done ? `<span class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>` : ''}
                <div class="flex items-center justify-between w-full px-0.5">
                  <span class="text-base">${anchor.emoji}</span>
                  <span class="text-[10px] font-bold px-1 rounded ${item.type === 'vowel' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}">${item.ipa}</span>
                </div>
                <div class="text-2xl sm:text-3xl font-black my-0.5">${item.letter}<span class="text-base font-bold text-slate-400 ml-0.5">${item.lower}</span></div>
                <div class="w-full py-0.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold shadow-sm">${item.nameTr}</div>
                <span class="text-[9px] font-bold text-slate-400 mt-1 truncate max-w-full">${anchor.keyword}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Seçili Harfin Görsel & Sesli Detay Kartı -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-500/30 shadow-xl overflow-hidden">
          <div class="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br ${selAnchor.color} flex flex-col items-center justify-center shadow-xl border-2 border-white/25 shrink-0">
                  <span class="text-2xl mb-0.5">${selAnchor.emoji}</span>
                  <span class="text-3xl sm:text-4xl font-black leading-none">${sel.letter}${sel.lower}</span>
                  <span class="text-[11px] font-extrabold text-amber-200 mt-1">${sel.nameTr} (${sel.ipa})</span>
                </div>
                <div>
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950">
                      TÜRKÇE OKUNUŞU: "${sel.nameTr.toUpperCase()}"
                    </span>
                    <span class="px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white">
                      ${selAnchor.emoji} Görsel Çapa: ${selAnchor.keyword}
                    </span>
                  </div>
                  <p class="text-sm sm:text-base text-slate-200 mt-2.5 leading-relaxed">
                    <strong class="text-amber-300">👄 Ağız & Dil Pozisyonu:</strong> ${sel.mouthTip}
                  </p>
                </div>
              </div>
              <div class="flex flex-wrap sm:flex-col gap-2 shrink-0">
                <div class="flex gap-2">
                  <button onclick="speakText('${sel.letter.toLowerCase()}', 0.9)" class="flex-1 bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-4 py-2.5 rounded-xl text-sm shadow">🔊 Harfi Dinle</button>
                  <button onclick="speakText('${sel.letter.toLowerCase()}', 0.55)" class="bg-white/15 hover:bg-white/25 text-white font-bold px-3 py-2.5 rounded-xl text-sm">🐢 Yavaş</button>
                </div>
                <button onclick="toggleMasterLetter('${sel.letter}')" class="px-4 py-2 rounded-xl font-bold text-xs ${isMastered ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-300'}">
                  ${isMastered ? '✓ Bu Harfi Öğrendim' : 'Öğrendim Olarak İşaretle'}
                </button>
              </div>
            </div>
          </div>

          <div class="p-5 sm:p-6 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/50">
                <div class="text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-1">📖 Kelime İçinde Nasıl Okunur?</div>
                <p class="text-sm text-slate-700 dark:text-slate-300">${sel.soundVariations}</p>
              </div>
              ${sel.turkishTrap ? `
                <div class="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/50">
                  <div class="text-amber-800 dark:text-amber-300 font-bold text-sm mb-1">⚠️ Türklerin En Sık Düştüğü Tuzak!</div>
                  <p class="text-sm text-slate-700 dark:text-slate-300">${sel.turkishTrap}</p>
                </div>
              ` : ''}
            </div>

            <div>
              <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">${sel.letter} Harfinin Kelime İçindeki Canlı Örnekleri (Dinle & Mikrofonla Söyle)</h3>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                ${sel.examples.map((ex, idx) => `
                  <div class="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col justify-between gap-3">
                    <div>
                      <div class="flex items-center justify-between">
                        <span class="text-lg font-black">${ex.word}</span>
                        <span class="text-xs font-mono text-slate-400">${ex.ipa}</span>
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <span class="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">Okunuşu: ${ex.trRead}</span>
                        <span class="text-xs font-semibold">= ${ex.meaning}</span>
                      </div>
                      <p class="text-xs text-slate-500 mt-2">💡 ${ex.soundNote}</p>
                    </div>
                    <div>
                      <div class="flex items-center gap-1.5 pt-2 border-t border-slate-200/70 dark:border-slate-700/60">
                        <button onclick="speakText('${ex.word}', 0.95)" class="flex-1 py-2 px-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold">🔊 Dinle</button>
                        <button onclick="speakText('${ex.word}', 0.55)" class="py-2 px-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold">🐢</button>
                        <button onclick="practiceSpeech('${ex.word}', 'alpha-speech-${idx}')" class="py-2 px-2.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">🎙️ Söyle</button>
                      </div>
                      <div id="alpha-speech-${idx}"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${PHONETIC_RULES.map((rule) => {
            const done = state.progress.masteredRules.includes(rule.id);
            return `
              <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between gap-4">
                <div class="space-y-3">
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <span class="inline-block px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm">${rule.combo}</span>
                      <span class="ml-2 text-xs font-mono text-slate-400">IPA: ${rule.ipa}</span>
                      <h3 class="text-lg font-extrabold mt-2">${rule.title}</h3>
                    </div>
                    <button onclick="toggleMasterRule('${rule.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold ${done ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}">
                      ${done ? '✓ Öğrenildi' : 'Tamamla'}
                    </button>
                  </div>
                  <div class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-xs font-bold text-amber-900 dark:text-amber-300">🎯 Türkçe Karşılığı: ${rule.trApprox}</div>
                  <p class="text-sm text-slate-600 dark:text-slate-300">${rule.howToProduce}</p>
                  <div class="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200">${rule.mnemonicTip}</div>
                </div>
                <div class="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  ${rule.examples.map((ex) => `
                    <div class="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                      <div>
                        <span class="font-extrabold text-sm">${ex.word}</span>
                        <span class="ml-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">[${ex.trRead}]</span>
                        <span class="block text-xs text-slate-500">${ex.meaning}</span>
                      </div>
                      <div class="flex gap-1.5">
                        <button onclick="speakText('${ex.word.replace(/'/g, "\\'")}', 0.9)" class="p-2 rounded-xl bg-indigo-600 text-white text-xs">🔊</button>
                        <button onclick="speakText('${ex.word.replace(/'/g, "\\'")}', 0.55)" class="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs">🐢</button>
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

// --- 4. SOHBET & KALIPLAR ---
function renderConversations() {
  const phrases = PHRASE_PATTERNS.filter((p) => {
    const catOk = state.phraseCat === 'all' ? true : p.category === state.phraseCat;
    const lvlOk = state.selectedLevel === 'ALL' ? true : p.level === state.selectedLevel;
    return catOk && lvlOk;
  });
  const activeSc = CONVERSATION_SCENARIOS.find((s) => s.id === state.scenarioId) || CONVERSATION_SCENARIOS[0];

  return `
    <div class="space-y-6 pb-8 animate-fadeIn">
      ${renderLevelFilterBar()}

      <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 mb-2">💬 GERÇEK HAYAT & İŞ İNGİLİZCESİ</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold">Günlük Sohbetler, İş İngilizcesi & Rol Canlandırma</h1>
        <p class="text-emerald-100 text-sm mt-1">Seviyene göre günlük kalıplar, birebir mantık karşılaştırması ve mikrofonlu diyalog simülasyonu.</p>
        <div class="grid grid-cols-2 gap-2 mt-5 bg-black/20 p-1.5 rounded-2xl">
          <button onclick="setConvSub('patterns')" class="py-2.5 px-4 rounded-xl font-bold text-sm transition ${state.convSub === 'patterns' ? 'bg-white text-emerald-800 shadow' : 'text-white/80'}">
            ⚡ Hayat Kurtaran Kalıplar (${phrases.length} Kalıp)
          </button>
          <button onclick="setConvSub('dialogues')" class="py-2.5 px-4 rounded-xl font-bold text-sm transition ${state.convSub === 'dialogues' ? 'bg-white text-emerald-800 shadow' : 'text-white/80'}">
            🎭 Rol Canlandırma (${state.progress.completedScenarios.length}/${CONVERSATION_SCENARIOS.length})
          </button>
        </div>
      </div>

      ${state.convSub === 'patterns' ? `
        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          ${PHRASE_CATEGORIES.map((c) => `
            <button onclick="setPhraseCat('${c.id}')" class="shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold border transition ${
              state.phraseCat === c.id ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }">${c.emoji} ${c.label}</button>
          `).join('')}
        </div>

        ${phrases.length === 0 ? `
          <div class="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
            <p class="text-sm font-bold text-slate-500">Seçili seviye (${state.selectedLevel}) ve kategoride kalıp bulunamadı.</p>
            <button onclick="setGlobalLevel('ALL'); setPhraseCat('all')" class="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold">Tüm Seviyeleri Göster</button>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${phrases.map((item) => {
              const done = state.progress.masteredPhrases.includes(item.id);
              const safeEn = item.en.replace(/'/g, "\\'");
              return `
                <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between gap-4">
                  <div class="space-y-3">
                    <div class="flex items-center justify-between gap-2">
                      <span class="px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold">Seviye ${item.level} • ${item.usageContext}</span>
                      <button onclick="toggleMasterPhrase('${item.id}')" class="px-2.5 py-1 rounded-xl text-xs font-bold ${done ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}">
                        ${done ? '✓ Ezberlendi' : 'Öğrendim'}
                      </button>
                    </div>
                    <div>
                      <h3 class="text-xl font-black">"${item.en}"</h3>
                      <div class="mt-1.5 inline-block px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">🗣️ Okunuşu: ${item.trRead}</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <div class="text-sm font-extrabold">🇹🇷 Doğal Anlamı: ${item.trMeaning}</div>
                      <div class="text-xs text-slate-500">🔍 Birebir Mantığı: "${item.literalTr}"</div>
                    </div>
                    <div class="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 text-xs text-amber-900 dark:text-amber-200">
                      <strong>🧠 Akılda Tutma Şifresi:</strong> ${item.memoryHook}
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <button onclick="speakText('${safeEn}', 0.95)" class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold">🔊 Dinle</button>
                      <button onclick="speakText('${safeEn}', 0.6)" class="py-2.5 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">🐢 Yavaş</button>
                      <button onclick="practiceSpeech('${safeEn}', 'phrase-sp-${item.id}')" class="py-2.5 px-3 rounded-xl bg-rose-600 text-white text-xs font-bold">🎙️ Söyle</button>
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
              <button onclick="selectScenario('${sc.id}')" class="p-4 rounded-2xl border-2 text-left transition ${
                activeSc.id === sc.id ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/50' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-600 text-white">${sc.level}</span>
                  ${state.progress.completedScenarios.includes(sc.id) ? `<span class="text-xs font-bold text-emerald-600">✓ Tamamlandı</span>` : ''}
                </div>
                <h3 class="font-extrabold text-sm mt-1">${sc.title}</h3>
                <p class="text-xs text-slate-500 mt-0.5">${sc.subtitle}</p>
              </button>
            `).join('')}
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 class="text-xl font-black">${activeSc.title}</h2>
                <p class="text-xs text-slate-500">Her satırı dinle ve mikrofon butonuna basarak telaffuzunu test et!</p>
              </div>
              <button onclick="completeScenario('${activeSc.id}')" class="px-4 py-2 rounded-xl text-xs font-bold ${
                state.progress.completedScenarios.includes(activeSc.id) ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white'
              }">
                ${state.progress.completedScenarios.includes(activeSc.id) ? '✓ Senaryo Tamamlandı' : 'Senaryoyu Bitirdim (+25 XP)'}
              </button>
            </div>
            <div class="space-y-4">
              ${activeSc.lines.map((line, idx) => {
                const isUser = line.speaker === 'B';
                const safeLine = line.en.replace(/'/g, "\\'");
                return `
                  <div class="flex flex-col ${isUser ? 'items-end' : 'items-start'}">
                    <div class="max-w-xl w-full rounded-3xl p-4 sm:p-5 border ${
                      isUser ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
                    }">
                      <div class="flex items-center justify-between gap-2 mb-1.5">
                        <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full ${isUser ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'}">
                          ${isUser ? '🎙️ SENİN SIRAN' : `👤 ${line.speakerName}`}
                        </span>
                        <div class="flex items-center gap-1.5">
                          <button onclick="speakText('${safeLine}', 0.95)" class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 text-xs font-bold shadow-sm">🔊</button>
                          <button onclick="speakText('${safeLine}', 0.6)" class="px-2 py-1 rounded-lg bg-white dark:bg-slate-900 text-xs font-bold shadow-sm">🐢</button>
                          <button onclick="practiceSpeech('${safeLine}', 'dlg-sp-${idx}')" class="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold shadow-sm">🎙️ Sesli Söyle</button>
                        </div>
                      </div>
                      <p class="text-base sm:text-lg font-extrabold">${line.en}</p>
                      <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1">🗣️ Okunuşu: ${line.trRead}</p>
                      <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">🇹🇷 ${line.trMeaning}</p>
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

// --- 5. ZAMİRLER, GÖRSEL ŞEMALAR & 15+ TABLOLAR ---
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
    <div class="space-y-6 pb-8 animate-fadeIn">
      ${renderLevelFilterBar()}

      <div class="modern-hero rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-slate-800">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-400/30 text-blue-300 mb-2">📊 GÖRSEL ZAMİR TABLOLARI & ZAMAN ÇİZELGELERİ</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold">Şahıs/Kişi Zamirleri, Yapı Tabloları & Görsel Zamanlar</h1>
        <p class="text-slate-300 text-sm mt-1">
          Zamirlerin cümledeki renkli konum şeması, IN-ON-AT görsel piramidi, ${REFERENCE_TABLES.length} detaylı tablo ve zaman çizelgeleri (Timelines).
        </p>
        <div class="grid grid-cols-3 gap-2 mt-5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80">
          <button onclick="setGramSub('tables')" class="py-2.5 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition ${state.gramSub === 'tables' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}">
            📊 Konu & Zamir Tabloları (${REFERENCE_TABLES.length})
          </button>
          <button onclick="setGramSub('tenses')" class="py-2.5 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition ${state.gramSub === 'tenses' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}">
            ⏳ Görsel Zamanlar (${GRAMMAR_TENSES.length})
          </button>
          <button onclick="setGramSub('rules')" class="py-2.5 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition ${state.gramSub === 'rules' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}">
            🧱 Altın Kurallar (4)
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
              <button onclick="selectTable('${tbl.id}')" class="p-3.5 rounded-xl border text-left transition ${
                active
                  ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 shadow-sm ring-1 ring-blue-600'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400'
              }">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">Seviye ${tbl.level} • ${tbl.category}</span>
                  ${done ? `<span class="text-emerald-500 text-xs font-black">✓</span>` : ''}
                </div>
                <div class="font-extrabold text-xs sm:text-sm leading-snug mt-1 text-slate-900 dark:text-white">${tbl.title}</div>
              </button>
            `;
          }).join('')}
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 modern-card overflow-hidden">
          <div class="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-bold mb-2">
                SEVİYE ${activeTable.level} • ${activeTable.category.toUpperCase()}
              </span>
              <h2 class="text-xl sm:text-2xl font-extrabold">${activeTable.title}</h2>
              <p class="text-slate-300 text-xs sm:text-sm mt-1">${activeTable.subtitle}</p>
            </div>
            <button onclick="toggleMasterTable('${activeTable.id}')" class="self-start sm:self-auto px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition ${
              isTableDone ? 'bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
            }">
              ${isTableDone ? '✓ Bu Tabloyu Öğrendim' : 'Tabloyu Öğrendim İşaretle (+25 XP)'}
            </button>
          </div>

          <div class="p-5 sm:p-6 space-y-6">
            <div class="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 space-y-2">
              <div class="text-xs font-extrabold uppercase text-blue-800 dark:text-blue-300">📌 BU TABLODAKİ YAPILAR CÜMLEDE NASIL KULLANILIR?</div>
              <ul class="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                ${activeTable.howToUse.map((tip) => `<li>${tip}</li>`).join('')}
              </ul>
            </div>

            <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <table class="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr class="bg-slate-900 text-white text-xs uppercase">
                    ${activeTable.headers.map((h) => `<th class="p-3.5 font-extrabold border-r border-slate-700 last:border-0 whitespace-pre-line">${h}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                  ${activeTable.rows.map((row, rIdx) => `
                    <tr class="${rIdx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/80 dark:bg-slate-800/40'} hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition">
                      ${row.map((cell, cIdx) => `
                        <td class="p-3.5 border-r border-slate-100 dark:border-slate-800 last:border-0 whitespace-pre-line ${
                          cIdx === 0
                            ? 'font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/20'
                            : 'font-semibold text-slate-800 dark:text-slate-200'
                        }">${cell}</td>
                      `).join('')}
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="space-y-3">
              <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-400">🔊 Tablonun Canlı Cümle İçinde Kullanımı (Dinle & Söyle)</h3>
              <div class="grid grid-cols-1 gap-3">
                ${activeTable.liveExamples.map((ex, idx) => {
                  const safeEn = ex.en.replace(/'/g, "\\'");
                  return `
                    <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p class="text-base font-extrabold text-slate-900 dark:text-white">${ex.en}</p>
                        <p class="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">🗣️ Okunuşu: ${ex.trRead}</p>
                        <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">🇹🇷 ${ex.tr}</p>
                        <div id="tbl-sp-${idx}"></div>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        <button onclick="speakText('${safeEn}', 0.95)" class="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition">🔊 Dinle</button>
                        <button onclick="speakText('${safeEn}', 0.6)" class="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-bold">🐢</button>
                        <button onclick="practiceSpeech('${safeEn}', 'tbl-sp-${idx}')" class="px-3 py-2 rounded-lg bg-slate-900 dark:bg-slate-700 text-white text-xs font-bold">🎙️ Söyle</button>
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
            <button onclick="selectTense('${t.id}')" class="p-3.5 rounded-xl border text-left transition ${
              selTense.id === t.id ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-600' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }">
              <div class="flex items-center justify-between mb-1">
                <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">Seviye ${t.level}</span>
                ${state.progress.masteredTenses.includes(t.id) ? `<span class="text-emerald-500 text-xs font-bold">✓</span>` : ''}
              </div>
              <div class="font-extrabold text-xs sm:text-sm">${t.nameEn}</div>
              <div class="text-[11px] text-slate-500 mt-0.5">${t.nameTr}</div>
            </button>
          `).join('')}
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 modern-card p-5 sm:p-6 space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div class="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold mb-2">
                Seviye ${selTense.level} • 🇹🇷 Türkçe Karşılığı: ${selTense.trSuffix}
              </div>
              <h2 class="text-2xl font-extrabold">${selTense.nameEn} — ${selTense.nameTr}</h2>
              <p class="text-sm text-slate-600 dark:text-slate-300 mt-1">${selTense.coreLogic}</p>
            </div>
            <button onclick="toggleMasterTense('${selTense.id}')" class="px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 ${isTenseDone ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800'}">
              ${isTenseDone ? '✓ Bu Zamanı Öğrendim' : 'Öğrendim Olarak İşaretle'}
            </button>
          </div>

          <!-- Görsel Zaman Çizelgesi (SVG Timeline) -->
          ${renderTenseTimelineSVG(selTense.id)}

          <div class="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-sm text-slate-800 dark:text-slate-200 font-medium">
            ${selTense.memoryCode}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div class="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
              <div class="text-emerald-700 dark:text-emerald-300 font-extrabold text-xs uppercase mb-1">➕ Olumlu Cümle (+)</div>
              <div class="font-mono text-sm font-bold">${selTense.formula.positive}</div>
            </div>
            <div class="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
              <div class="text-rose-700 dark:text-rose-300 font-extrabold text-xs uppercase mb-1">➖ Olumsuz Cümle (-)</div>
              <div class="font-mono text-sm font-bold">${selTense.formula.negative}</div>
            </div>
            <div class="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
              <div class="text-blue-700 dark:text-blue-300 font-extrabold text-xs uppercase mb-1">❓ Soru Cümlesi (?)</div>
              <div class="font-mono text-sm font-bold">${selTense.formula.question}</div>
            </div>
          </div>

          <div class="space-y-3">
            ${selTense.examples.map((ex) => {
              const safeEn = ex.en.replace(/'/g, "\\'");
              return `
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="space-y-1">
                    <span class="text-xs font-bold text-blue-600 dark:text-blue-400">Odak: ${ex.highlight}</span>
                    <p class="text-base font-extrabold">${ex.en}</p>
                    <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400">🗣️ Okunuşu: ${ex.trRead}</p>
                    <p class="text-xs text-slate-600 dark:text-slate-300">🇹🇷 ${ex.tr}</p>
                  </div>
                  <div class="flex gap-2 shrink-0">
                    <button onclick="speakText('${safeEn}', 0.95)" class="px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold">🔊 Dinle</button>
                    <button onclick="speakText('${safeEn}', 0.6)" class="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs">🐢</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : `
        <div class="grid grid-cols-1 gap-4">
          ${CORE_STRUCTURE_RULES.map((rule) => `
            <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 modern-card p-5 sm:p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold">✨ ${rule.badge}</span>
                <button onclick="speakText('${rule.comparison.exampleEn.replace(/'/g, "\\'")}', 0.9)" class="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold">🔊 Örneği Dinle</button>
              </div>
              <h3 class="text-xl font-extrabold">${rule.title}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div class="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60">
                  <strong class="text-rose-700 block mb-1">❌ Neden Zorlanıyoruz?</strong>${rule.problemTr}
                </div>
                <div class="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60">
                  <strong class="text-emerald-700 block mb-1">✅ İngilizcenin Çözümü:</strong>${rule.solutionEn}
                </div>
              </div>
              <div class="p-4 rounded-xl bg-slate-900 text-white space-y-2 font-mono text-xs sm:text-sm">
                <div class="text-slate-300">${rule.comparison.trOrder}</div>
                <div class="text-sky-300 font-bold">${rule.comparison.enOrder}</div>
                <div class="pt-2 border-t border-slate-700 text-emerald-300">🎯 Canlı Örnek: "${rule.comparison.exampleEn}" (${rule.comparison.exampleRead})</div>
              </div>
              <div class="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-xs font-bold text-blue-900 dark:text-blue-200">${rule.goldenRule}</div>
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
    <div class="space-y-6 pb-8 animate-fadeIn">
      ${renderLevelFilterBar()}

      <div class="modern-hero rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-slate-800">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-400/30 text-blue-300 mb-2">🧠 GÖRSEL SAHNELİ HAFIZA (SRS) & SEVİYE SINAVLARI</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold">Görsel Hafıza Çivileri, Cümle İnşası & Bölüm Sonu Sınavları</h1>
        <p class="text-slate-300 text-sm mt-1">Kelimeleri resimli hikayelerle beynine kazı, cümle kur ve A1-A2 / B1-B2 / C1-C2 bölüm sonu sınavlarıyla seviyeni ölç!</p>
        <div class="grid grid-cols-3 gap-2 mt-5 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80">
          <button onclick="setSrsSub('flashcards')" class="py-2.5 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition ${state.srsSub === 'flashcards' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}">
            🃏 Resimli Kartlar (${MNEMONIC_VOCAB_DATA.length})
          </button>
          <button onclick="setSrsSub('builder')" class="py-2.5 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition ${state.srsSub === 'builder' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}">
            🧩 Cümle Kurma (${SENTENCE_CHALLENGES.length})
          </button>
          <button onclick="setSrsSub('exams')" class="py-2.5 px-2 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition ${state.srsSub === 'exams' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}">
            📝 Bölüm Sonu Sınavları (${LEVEL_EXAMS.length})
          </button>
        </div>
      </div>

      ${state.srsSub === 'flashcards' ? `
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          ${MNEMONIC_VOCAB_DATA.map((item, idx) => `
            <button onclick="selectCardIdx(${idx})" class="shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              state.cardIdx === idx ? 'bg-blue-600 text-white border-blue-600' : state.progress.srsMap[item.id] ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            }">${idx + 1}. ${item.word} (${item.level})</button>
          `).join('')}
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 modern-card overflow-hidden">
          <!-- Görsel Hafıza Sahnesi Banner -->
          <div class="bg-gradient-to-r ${scene.bgGrad} p-6 text-white text-center relative overflow-hidden">
            <div class="flex items-center justify-between mb-3">
              <span class="px-3 py-1 rounded-full bg-white/10 text-xs font-extrabold">Seviye ${card.level} • ${card.partOfSpeech}</span>
              ${srs ? `<span class="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">✓ Sonraki Tekrar: ${srs.interval === 0 ? 'Bugün' : srs.interval + ' gün sonra'}</span>` : ''}
            </div>
            <div class="text-4xl sm:text-5xl my-2 animate-float">${scene.emojis}</div>
            <div class="inline-block px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold tracking-wide uppercase mt-1">
              🔑 SES ÇAĞRIŞIMI: ${scene.badge}
            </div>
          </div>

          <div class="p-6 sm:p-8">
            <div class="text-center space-y-3">
              <h2 class="text-4xl sm:text-5xl font-black">${card.word}</h2>
              <div class="flex items-center justify-center gap-2">
                <span class="text-sm font-mono text-slate-400">${card.ipa}</span>
                <span class="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-extrabold">🗣️ Okunuşu: ${card.trRead}</span>
              </div>
              <div class="flex items-center justify-center gap-2 pt-2">
                <button onclick="speakText('${card.word}', 0.9)" class="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm">🔊 Kelimeyi Dinle</button>
                <button onclick="speakText('${card.word}', 0.55)" class="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold">🐢 Yavaş</button>
              </div>
            </div>

            ${!state.cardFlipped ? `
              <div class="mt-6 text-center">
                <button onclick="flipCard()" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition">
                  🔍 Görsel Hafıza Hikayesini & Anlamını Aç
                </button>
              </div>
            ` : `
              <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
                <div class="text-center">
                  <div class="text-xs font-extrabold uppercase text-slate-400">TÜRKÇE ANLAMI</div>
                  <div class="text-2xl font-black text-emerald-600 mt-0.5">${card.meaning}</div>
                </div>
                <div class="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-1.5">
                  <div class="text-xs font-extrabold text-blue-800 dark:text-blue-300 uppercase">🎬 GÖRSEL HAFIZA HİKAYESİ (${card.soundAlikeTr})</div>
                  <p class="text-sm font-medium">${card.mnemonicStory}</p>
                </div>
                <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between gap-3">
                  <div>
                    <p class="text-sm font-extrabold">"${card.exampleEn}"</p>
                    <p class="text-xs font-bold text-blue-600 mt-0.5">🗣️ ${card.exampleRead}</p>
                    <p class="text-xs text-slate-500 mt-0.5">🇹🇷 ${card.exampleTr}</p>
                  </div>
                  <button onclick="speakText('${card.exampleEn.replace(/'/g, "\\'")}', 0.9)" class="p-2.5 rounded-xl bg-blue-600 text-white shrink-0">🔊</button>
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <button onclick="rateCard('again')" class="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-bold text-xs border border-rose-200 dark:border-rose-900">😓 Zorlandım<span class="block text-[10px] font-normal">5 dk sonra</span></button>
                  <button onclick="rateCard('hard')" class="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-900">🤔 Biraz Zor<span class="block text-[10px] font-normal">1 gün sonra</span></button>
                  <button onclick="rateCard('good')" class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900">😊 İyi Hatırladım<span class="block text-[10px] font-normal">3 gün sonra</span></button>
                  <button onclick="rateCard('easy')" class="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200 dark:border-blue-900">🚀 Çok Kolay!<span class="block text-[10px] font-normal">7+ gün sonra</span></button>
                </div>
              </div>
            `}
          </div>
        </div>
      ` : state.srsSub === 'builder' ? `
        <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 modern-card p-5 sm:p-6 space-y-5">
          <div class="flex items-center justify-between">
            <span class="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold">Görev ${state.challengeIdx + 1} / ${SENTENCE_CHALLENGES.length}</span>
            <button onclick="resetBuilder()" class="text-xs font-bold text-slate-500">🔄 Sıfırla</button>
          </div>
          <div>
            <p class="text-xs font-bold uppercase text-slate-400">BU CÜMLEYİ İNGİLİZCE KUR:</p>
            <h3 class="text-xl sm:text-2xl font-black mt-1">"${ch.trPrompt}"</h3>
          </div>
          <div class="min-h-[72px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap items-center gap-2">
            ${state.selectedWords.length === 0
              ? `<span class="text-xs text-slate-400">Aşağıdaki kelimelere sırayla dokunarak cümleyi buraya diz...</span>`
              : state.selectedWords.map((w) => `<button onclick="toggleBuilderWord('${w.replace(/'/g, "\\'")}')" class="px-3.5 py-2 rounded-lg bg-blue-600 text-white font-bold text-sm">${w}</button>`).join('')
            }
          </div>
          <div class="flex flex-wrap gap-2">
            ${pool.map((w) => {
              const used = state.selectedWords.includes(w);
              const safeW = w.replace(/'/g, "\\'");
              return `<button ${used ? 'disabled' : ''} onclick="toggleBuilderWord('${safeW}')" class="px-4 py-2.5 rounded-lg font-bold text-sm border ${used ? 'opacity-30' : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-blue-500'}">${w}</button>`;
            }).join('')}
          </div>
          <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span class="text-xs text-slate-500">💡 ${ch.grammarTip}</span>
            <div class="flex gap-2">
              <button onclick="checkBuilder()" class="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-extrabold text-xs">Cümleyi Kontrol Et</button>
              <button onclick="nextChallenge()" class="px-4 py-2.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold">Sonraki Soru →</button>
            </div>
          </div>
          ${state.builderResult === 'correct' ? `<div class="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-extrabold">🏆 Harika! Doğru Cümle (+20 XP) — Okunuşu: ${ch.trRead}</div>` : ''}
          ${state.builderResult === 'wrong' ? `<div class="p-4 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold">❌ Doğru sıra: "${ch.correctWords.join(' ')}"</div>` : ''}
        </div>
      ` : `
        <div class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${LEVEL_EXAMS.map((ex) => `
              <button onclick="selectExam('${ex.id}')" class="p-4 rounded-xl border text-left transition ${
                activeExam.id === ex.id ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-600' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }">
                <span class="inline-block px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-xs font-bold mb-1">${ex.level}</span>
                <h3 class="font-extrabold text-sm">${ex.title}</h3>
                <p class="text-xs text-slate-500 mt-0.5">${ex.description}</p>
              </button>
            `).join('')}
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 modern-card p-5 sm:p-6 space-y-5">
            <div>
              <h2 class="text-xl font-extrabold">${activeExam.title}</h2>
              <p class="text-xs text-slate-500">Her soruda doğru şıkkı seç; anında detaylı Türkçe çözüm açıklamasını gör (+15 XP)!</p>
            </div>

            <div class="space-y-4">
              ${activeExam.questions.map((qItem, qIdx) => {
                const chosen = state.examAnswers[qIdx];
                return `
                  <div class="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                    <p class="font-extrabold text-sm sm:text-base">${qItem.q}</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      ${qItem.options.map((opt, optIdx) => {
                        let btnStyle = 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-blue-500';
                        if (chosen !== undefined) {
                          if (optIdx === qItem.answer) {
                            btnStyle = 'bg-emerald-600 text-white border-emerald-600';
                          } else if (optIdx === chosen) {
                            btnStyle = 'bg-rose-600 text-white border-rose-600';
                          }
                        }
                        return `
                          <button onclick="answerExamQuestion(${qIdx}, ${optIdx})" class="p-3 rounded-lg border text-left text-xs sm:text-sm font-bold transition ${btnStyle}">
                            ${opt}
                          </button>
                        `;
                      }).join('')}
                    </div>
                    ${chosen !== undefined ? `
                      <div class="p-3 rounded-lg ${chosen === qItem.answer ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200' : 'bg-blue-100/80 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200'} text-xs font-semibold">
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
