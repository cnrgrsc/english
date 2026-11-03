// LinguaMaster — İnteraktif Ders Oturumu (Guided Practice Player) & Akıllı Global Arama Motoru
import { icon } from './icons.js';
import { LEVEL_ROADMAP, REFERENCE_TABLES, LEVEL_EXAMS } from '../data/levelCurriculumData.js';
import { ALPHABET_DATA, PHONETIC_RULES } from '../data/alphabetData.js';
import { PHRASE_PATTERNS, CONVERSATION_SCENARIOS } from '../data/conversationsData.js';
import { GRAMMAR_TENSES } from '../data/grammarData.js';
import { MNEMONIC_VOCAB_DATA, SENTENCE_CHALLENGES } from '../data/vocabularyData.js';

// Global Arama Motoru: Tüm müfredat, tablolar, zamanlar, kalıplar ve kelimeler içinde arar
export function searchAllContent(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q || q.length < 2) return [];
  const results = [];

  // 1. Müfredat Üniteleri
  for (const lvl of LEVEL_ROADMAP) {
    for (const u of lvl.units) {
      if (u.title.toLowerCase().includes(q) || u.code.toLowerCase().includes(q) || u.tag.toLowerCase().includes(q)) {
        results.push({
          type: 'Müfredat Dersi',
          level: lvl.level,
          title: `${u.code}: ${u.title}`,
          subtitle: `${lvl.level} Seviyesi • ${u.tag}`,
          onclick: `goToUnitLesson('${u.targetTab || 'grammar'}', '${u.tableId || ''}', '${u.tenseId || ''}', '${u.code}'); closeSearchModal();`
        });
      }
    }
  }

  // 2. Gramer & Zamir Tabloları
  for (const t of REFERENCE_TABLES) {
    if (t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
      results.push({
        type: 'Konu Tablosu',
        level: t.level,
        title: t.title,
        subtitle: `Seviye ${t.level} • ${t.category}`,
        onclick: `selectTable('${t.id}'); closeSearchModal();`
      });
    }
  }

  // 3. Zamanlar (Tenses)
  for (const ts of GRAMMAR_TENSES) {
    if (ts.nameEn.toLowerCase().includes(q) || ts.nameTr.toLowerCase().includes(q) || ts.coreLogic.toLowerCase().includes(q)) {
      results.push({
        type: 'Zaman (Tense)',
        level: ts.level,
        title: `${ts.nameEn} — ${ts.nameTr}`,
        subtitle: `Seviye ${ts.level} • ${ts.trSuffix}`,
        onclick: `setTab('grammar'); setGramSub('tenses'); selectTense('${ts.id}'); closeSearchModal();`
      });
    }
  }

  // 4. Günlük Konuşma Kalıpları
  for (const p of PHRASE_PATTERNS) {
    if (p.en.toLowerCase().includes(q) || p.trMeaning.toLowerCase().includes(q) || p.trRead.toLowerCase().includes(q)) {
      results.push({
        type: 'Konuşma Kalıbı',
        level: p.level,
        title: `"${p.en}"`,
        subtitle: `${p.trMeaning} • Okunuşu: ${p.trRead}`,
        onclick: `setTab('conversations'); setConvSub('patterns'); setPhraseCat('all'); closeSearchModal();`
      });
    }
  }

  // 5. Kelime Kartları (SRS)
  MNEMONIC_VOCAB_DATA.forEach((v, idx) => {
    if (v.word.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q) || v.soundAlikeTr.toLowerCase().includes(q)) {
      results.push({
        type: 'Hafıza Kartı',
        level: v.level,
        title: `${v.word} (${v.meaning})`,
        subtitle: `İpucu: ${v.soundAlikeTr} • Okunuşu: ${v.trRead}`,
        onclick: `setTab('srs'); setSrsSub('flashcards'); selectCardIdx(${idx}); closeSearchModal();`
      });
    }
  });

  return results.slice(0, 12);
}

// Günlük 5 Adımlı İnteraktif Pratik Oturumu Sorularını Oluşturur
export function buildInteractiveSessionQuestions(levelFilter = 'ALL') {
  const questions = [];

  // Adım 1: Kelime & Sesli Dinleme Sorusu
  const vocabPool = levelFilter === 'ALL' ? MNEMONIC_VOCAB_DATA : MNEMONIC_VOCAB_DATA.filter((v) => v.level === levelFilter);
  const vCard = vocabPool[0] || MNEMONIC_VOCAB_DATA[0];
  const vDistractors = MNEMONIC_VOCAB_DATA.filter((x) => x.id !== vCard.id).slice(0, 3).map((x) => x.meaning);
  const vOptions = [vCard.meaning, ...vDistractors].sort((a, b) => a.localeCompare(b));
  questions.push({
    type: 'Kelime & Hafıza Çivisi',
    level: vCard.level,
    prompt: `"${vCard.word}" kelimesinin Türkçe anlamı nedir?`,
    audioText: vCard.word,
    subHint: `🗣️ Okunuşu: ${vCard.trRead}  |  🔑 Hafıza Şifresi: ${vCard.soundAlikeTr}`,
    options: vOptions,
    answerIdx: vOptions.indexOf(vCard.meaning),
    explanation: `${vCard.word} (${vCard.trRead}) = "${vCard.meaning}". Hikaye: ${vCard.mnemonicStory}`
  });

  // Adım 2: Günlük Konuşma Kalıbı Sorusu
  const phrasePool = levelFilter === 'ALL' ? PHRASE_PATTERNS : PHRASE_PATTERNS.filter((p) => p.level === levelFilter);
  const pItem = phrasePool[0] || PHRASE_PATTERNS[0];
  const pDistractors = PHRASE_PATTERNS.filter((x) => x.id !== pItem.id).slice(0, 3).map((x) => x.trMeaning);
  const pOptions = [pItem.trMeaning, ...pDistractors].sort((a, b) => a.localeCompare(b));
  questions.push({
    type: 'Günlük Konuşma & Kalıp',
    level: pItem.level,
    prompt: `"${pItem.en}" ifadesi günlük hayatta ne anlama gelir?`,
    audioText: pItem.en,
    subHint: `🗣️ Okunuşu: ${pItem.trRead}  |  Kullanım: ${pItem.usageContext}`,
    options: pOptions,
    answerIdx: pOptions.indexOf(pItem.trMeaning),
    explanation: `"${pItem.en}" = ${pItem.trMeaning}. (${pItem.memoryHook})`
  });

  // Adım 3 & 4: Seviye Sınavlarından Gramer & Yapı Soruları
  const allExamQs = LEVEL_EXAMS.flatMap((ex) =>
    ex.questions.map((q) => ({ ...q, examLevel: ex.level, examTitle: ex.title }))
  );
  allExamQs.slice(0, 3).forEach((eq) => {
    questions.push({
      type: `Gramer & Yapı (${eq.examLevel})`,
      level: eq.examLevel,
      prompt: eq.q,
      audioText: '',
      subHint: eq.examTitle,
      options: eq.options,
      answerIdx: eq.answer,
      explanation: eq.explanation
    });
  });

  return questions;
}

// İnteraktif Ders / Pratik Modalını Render Eder
export function renderInteractivePlayerModal(session) {
  if (!session || !session.active) return '';

  const total = session.questions.length;
  const idx = session.currentIdx;
  const pct = Math.round(((idx) / total) * 100);

  if (session.finished) {
    return `
      <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 anim-in">
        <div class="card max-w-lg w-full p-6 sm:p-8 text-center space-y-5 anim-pop">
          <div class="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            ${icon('trophy', 'w-9 h-9')}
          </div>
          <div class="space-y-1.5">
            <span class="chip chip-green">OTURUM TAMAMLANDI</span>
            <h2 class="h1">Harika İş Çıkardın!</h2>
            <p class="text-sm muted">Günlük interaktif pratik oturumunu başarıyla tamamladın.</p>
          </div>
          <div class="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
            <div>
              <div class="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">${session.correctCount}/${total}</div>
              <div class="text-[11px] font-semibold muted">Doğru Cevap</div>
            </div>
            <div>
              <div class="text-xl font-extrabold text-brand-600 dark:text-brand-400">+${session.earnedXp} XP</div>
              <div class="text-[11px] font-semibold muted">Kazanılan Puan</div>
            </div>
            <div>
              <div class="text-xl font-extrabold text-amber-500">%${Math.round((session.correctCount / total) * 100)}</div>
              <div class="text-[11px] font-semibold muted">Başarı Oranı</div>
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button onclick="closePracticeSession()" class="btn btn-primary btn-lg w-full">
              Çalışma Merkezine Dön
            </button>
          </div>
        </div>
      </div>
    `;
  }

  const q = session.questions[idx];
  const answered = session.selectedOpt !== null;
  const isCorrect = answered && session.selectedOpt === q.answerIdx;

  return `
    <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 anim-in">
      <div class="card max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        <!-- Üst İlerleme Çubuğu -->
        <div class="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-4">
          <button onclick="closePracticeSession()" class="icon-btn" title="Oturumu Kapat">
            ${icon('x', 'w-5 h-5')}
          </button>
          <div class="flex-1">
            <div class="flex items-center justify-between text-xs font-bold mb-1.5">
              <span class="text-brand-600 dark:text-brand-400">${q.type}</span>
              <span class="muted">Adım ${idx + 1} / ${total}</span>
            </div>
            <div class="progress">
              <span style="width: ${Math.max(10, pct)}%"></span>
            </div>
          </div>
        </div>

        <!-- Soru Gövdesi -->
        <div class="p-5 sm:p-7 overflow-y-auto space-y-5 flex-1">
          <div class="space-y-2">
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">${q.prompt}</h3>
              ${q.audioText ? `
                <button onclick="speakText('${q.audioText.replace(/'/g, "\\'")}', 0.9)" class="speak-btn shrink-0" title="Sesli Dinle">
                  ${icon('volume', 'w-5 h-5')}
                </button>
              ` : ''}
            </div>
            ${q.subHint ? `<p class="text-xs font-semibold text-brand-600 dark:text-brand-300">${q.subHint}</p>` : ''}
          </div>

          <div class="space-y-2.5">
            ${q.options.map((opt, oIdx) => {
              let cls = 'option';
              if (answered) {
                if (oIdx === q.answerIdx) cls = 'option option-correct';
                else if (oIdx === session.selectedOpt) cls = 'option option-wrong';
              }
              return `
                <button ${answered ? 'disabled' : ''} onclick="answerPracticeQuestion(${oIdx})" class="${cls}">
                  <span class="option-key">${String.fromCharCode(65 + oIdx)}</span>
                  <span class="flex-1 text-left">${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${answered ? `
            <div class="p-4 rounded-xl border ${
              isCorrect
                ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            } text-xs sm:text-sm font-medium space-y-1 anim-in">
              <div class="font-bold flex items-center gap-1.5">
                ${isCorrect ? '✅ Harika! Doğru Cevap (+15 XP)' : '💡 Doğru Cevap & Açıklama:'}
              </div>
              <p>${q.explanation}</p>
            </div>
          ` : ''}
        </div>

        <!-- Alt Aksiyon Barı -->
        <div class="px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <span class="text-xs font-semibold muted">Seviye: ${q.level}</span>
          ${answered ? `
            <button onclick="nextPracticeQuestion()" class="btn btn-primary btn-md">
              <span>${idx + 1 === total ? 'Sonucu Gör' : 'Sonraki Soru'}</span>
              ${icon('arrowRight', 'w-4 h-4')}
            </button>
          ` : `
            <span class="text-xs font-semibold muted">Devam etmek için bir şık seçin</span>
          `}
        </div>
      </div>
    </div>
  `;
}

// Global Arama Modalını Render Eder
export function renderSearchModal(searchState) {
  if (!searchState || !searchState.open) return '';
  const results = searchAllContent(searchState.query);

  return `
    <div class="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-14 sm:pt-20 p-4 anim-in" onclick="if(event.target===this) closeSearchModal()">
      <div class="card max-w-2xl w-full overflow-hidden shadow-2xl">
        <div class="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          ${icon('search', 'w-5 h-5 text-brand-600')}
          <input
            id="global-search-input"
            type="text"
            value="${(searchState.query || '').replace(/"/g, '&quot;')}"
            oninput="updateSearchQuery(this.value)"
            placeholder="Konu, gramer tablosu, zaman, kelime veya kalıp ara... (ör: zamir, present, in on at)"
            class="w-full bg-transparent text-sm sm:text-base font-medium focus:outline-none text-slate-900 dark:text-white"
            autofocus
          />
          <button onclick="closeSearchModal()" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold muted">ESC</button>
        </div>

        <div class="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800">
          ${!searchState.query || searchState.query.trim().length < 2 ? `
            <div class="p-6 text-center space-y-2">
              <div class="text-xs font-bold uppercase tracking-wider muted">HIZLI ERİŞİM ÖNERİLERİ</div>
              <div class="flex flex-wrap justify-center gap-2 pt-2">
                <button onclick="updateSearchQuery('zamir')" class="chip chip-brand cursor-pointer">Zamirler (Pronouns)</button>
                <button onclick="updateSearchQuery('present')" class="chip chip-brand cursor-pointer">Present Tense</button>
                <button onclick="updateSearchQuery('edat')" class="chip chip-brand cursor-pointer">IN / ON / AT Edatlar</button>
                <button onclick="updateSearchQuery('modal')" class="chip chip-brand cursor-pointer">Modals (Can, Must, Should)</button>
                <button onclick="updateSearchQuery('phrasal')" class="chip chip-brand cursor-pointer">Phrasal Verbs</button>
              </div>
            </div>
          ` : results.length === 0 ? `
            <div class="p-8 text-center text-sm muted">
              "${searchState.query}" için eşleşen ders veya tablo bulunamadı.
            </div>
          ` : results.map((r) => `
            <button onclick="${r.onclick}" class="w-full p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left flex items-center justify-between gap-3 transition">
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="chip chip-brand">${r.type}</span>
                  <span class="chip chip-slate">${r.level}</span>
                </div>
                <div class="font-bold text-sm text-slate-900 dark:text-white mt-1 truncate">${r.title}</div>
                <div class="text-xs muted truncate">${r.subtitle}</div>
              </div>
              ${icon('chevronRight', 'w-4 h-4 text-slate-400')}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

