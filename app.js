/* ---------- State ---------- */
const STORAGE_KEY = "pykurs_v1";
const state = {
  currentLesson: 0,
  completed: new Set(),
  pyodide: null,
  pyReady: false,
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.currentLesson = data.currentLesson || 0;
    state.completed = new Set(data.completed || []);
  } catch (e) {}
}
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currentLesson: state.currentLesson,
    completed: [...state.completed],
  }));
}

/* ---------- Pyodide ---------- */
const outputEl = document.getElementById("output");
const codeEl = document.getElementById("code");
const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");

async function initPyodide() {
  outputEl.textContent = "Laster Python (kan ta noen sekunder første gang) ...";
  try {
    state.pyodide = await loadPyodide();
    state.pyReady = true;
    runBtn.disabled = false;
    outputEl.textContent = "Python er klar! Skriv kode over og trykk Kjør ▶";
  } catch (err) {
    outputEl.textContent = "Kunne ikke laste Python. Sjekk internett-tilkoblingen.\n" + err;
    outputEl.classList.add("error");
  }
}

async function runCode(code) {
  if (!state.pyReady) return { output: "", error: "Python er ikke klar enda." };
  // Capture stdout via Pyodide
  state.pyodide.runPython(`
import sys, io
_stdout = io.StringIO()
sys.stdout = _stdout
sys.stderr = _stdout
`);
  let error = null;
  try {
    await state.pyodide.runPythonAsync(code);
  } catch (err) {
    error = String(err);
  }
  const out = state.pyodide.runPython("_stdout.getvalue()");
  state.pyodide.runPython("sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__");
  return { output: out || "", error };
}

runBtn.addEventListener("click", async () => {
  outputEl.classList.remove("error");
  outputEl.textContent = "Kjører ...";
  const { output, error } = await runCode(codeEl.value);
  if (error) {
    outputEl.classList.add("error");
    outputEl.textContent = (output ? output + "\n" : "") + error;
  } else {
    outputEl.textContent = output.length ? output : "(ingen utskrift)";
  }
});

resetBtn.addEventListener("click", () => {
  codeEl.value = "";
  outputEl.textContent = "";
});

/* ---------- Font size control ---------- */
const FONT_KEY = "pykurs_fontsize";
const FONT_MIN = 12, FONT_MAX = 28, FONT_STEP = 2;
let fontSize = parseInt(localStorage.getItem(FONT_KEY)) || 14;
function applyFontSize() {
  codeEl.style.fontSize = fontSize + "px";
  outputEl.style.fontSize = (fontSize - 1) + "px";
  localStorage.setItem(FONT_KEY, String(fontSize));
}
document.getElementById("fontUp").addEventListener("click", () => {
  fontSize = Math.min(FONT_MAX, fontSize + FONT_STEP);
  applyFontSize();
});
document.getElementById("fontDown").addEventListener("click", () => {
  fontSize = Math.max(FONT_MIN, fontSize - FONT_STEP);
  applyFontSize();
});
applyFontSize();

/* Kjør med Ctrl+Enter */
codeEl.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    runBtn.click();
  }
  // Tab = 4 spaces
  if (e.key === "Tab") {
    e.preventDefault();
    const s = codeEl.selectionStart, en = codeEl.selectionEnd;
    codeEl.value = codeEl.value.substring(0, s) + "    " + codeEl.value.substring(en);
    codeEl.selectionStart = codeEl.selectionEnd = s + 4;
  }
});

/* ---------- Navigation ---------- */
const lessonListEl = document.getElementById("lessonList");
const contentEl = document.getElementById("content");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

function renderSidebar() {
  lessonListEl.innerHTML = "";
  LESSONS.forEach((lsn, i) => {
    const li = document.createElement("li");
    li.textContent = lsn.title;
    if (i === state.currentLesson) li.classList.add("active");
    if (state.completed.has(i)) li.classList.add("done");
    li.addEventListener("click", () => {
      state.currentLesson = i;
      saveState();
      renderAll();
    });
    lessonListEl.appendChild(li);
  });
}

function updateProgress() {
  const total = LESSONS.length;
  const done = state.completed.size;
  progressFill.style.width = (done / total * 100) + "%";
  progressText.textContent = `${done} / ${total}`;
}

function renderLesson() {
  const lsn = LESSONS[state.currentLesson];
  contentEl.innerHTML = lsn.html;

  // Render exercises
  lsn.exercises.forEach((ex, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "exercise";
    wrap.innerHTML = `
      <div class="exercise-header">📝 Oppgave ${idx + 1}</div>
      <div class="exercise-task">${escapeHtml(ex.task)}</div>
      ${ex.hint ? `<div class="exercise-hint">💡 ${escapeHtml(ex.hint)}</div>` : ""}
      <div class="exercise-controls">
        <button class="btn btn-primary" data-action="check">Sjekk svar</button>
        <button class="btn btn-load" data-action="load">Last inn i terminal</button>
        <button class="btn btn-load" data-action="show-solution">Vis fasit</button>
      </div>
      <div class="feedback" data-feedback></div>
      <div class="solution" data-solution><pre>${escapeHtml(ex.solution)}</pre></div>
    `;
    const feedback = wrap.querySelector("[data-feedback]");
    const solution = wrap.querySelector("[data-solution]");

    wrap.querySelector('[data-action="load"]').addEventListener("click", () => {
      codeEl.value = ex.starter || "";
      codeEl.focus();
    });
    wrap.querySelector('[data-action="show-solution"]').addEventListener("click", () => {
      solution.classList.toggle("show");
    });
    wrap.querySelector('[data-action="check"]').addEventListener("click", async () => {
      feedback.className = "feedback";
      feedback.textContent = "Kjører koden din ...";
      feedback.classList.add("good");
      feedback.style.background = "rgba(255,209,102,.10)";
      feedback.style.borderColor = "var(--accent)";
      feedback.style.color = "var(--accent)";

      const { output, error } = await runCode(codeEl.value);
      feedback.style.cssText = "";

      if (error) {
        feedback.className = "feedback bad";
        feedback.textContent = "❌ Det er en feil i koden: " + error.split("\n").slice(-2)[0];
        return;
      }
      const correct = checkAnswer(ex, output, codeEl.value);
      if (correct) {
        feedback.className = "feedback good";
        feedback.textContent = "✅ Riktig! Bra jobba.";
        markExerciseDone(state.currentLesson, idx, lsn.exercises.length);
      } else {
        feedback.className = "feedback bad";
        const cleaned = output.trim() || "(ingen utskrift)";
        feedback.textContent = `❌ Ikke helt. Utskriften din var: "${cleaned}". Prøv igjen — eller trykk "Vis fasit" hvis du står fast.`;
      }
    });

    contentEl.appendChild(wrap);
  });

  // Navigation buttons
  const nav = document.createElement("div");
  nav.className = "lesson-nav";
  const prevBtn = document.createElement("button");
  prevBtn.className = "btn";
  prevBtn.textContent = "← Forrige";
  prevBtn.disabled = state.currentLesson === 0;
  if (prevBtn.disabled) prevBtn.style.visibility = "hidden";
  prevBtn.addEventListener("click", () => {
    state.currentLesson--;
    saveState(); renderAll();
    window.scrollTo({ top: 0 });
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn btn-primary";
  nextBtn.textContent = state.currentLesson === LESSONS.length - 1 ? "Ferdig 🎉" : "Neste →";
  nextBtn.addEventListener("click", () => {
    // Leksjoner uten oppgaver markeres som ferdig ved "Neste"
    if (LESSONS[state.currentLesson].exercises.length === 0) {
      state.completed.add(state.currentLesson);
    }
    if (state.currentLesson < LESSONS.length - 1) {
      state.currentLesson++;
    }
    saveState(); renderAll();
    window.scrollTo({ top: 0 });
  });

  nav.appendChild(prevBtn);
  nav.appendChild(nextBtn);
  contentEl.appendChild(nav);
}

/* Sjekker etter at alle oppgaver i en leksjon er løst */
const exerciseProgress = {}; // { lessonIdx: Set(exerciseIdx) }
function markExerciseDone(lessonIdx, exIdx, total) {
  if (!exerciseProgress[lessonIdx]) exerciseProgress[lessonIdx] = new Set();
  exerciseProgress[lessonIdx].add(exIdx);
  if (exerciseProgress[lessonIdx].size >= total) {
    state.completed.add(lessonIdx);
    saveState();
    renderSidebar();
    updateProgress();
  }
}

function checkAnswer(ex, output, code) {
  if (typeof ex.check === "function") {
    return ex.check(output, code);
  }
  if (ex.expectedOutput !== undefined) {
    const normalize = (s) => s.replace(/\r\n/g, "\n").replace(/\s+$/g, "").trim();
    return normalize(output) === normalize(ex.expectedOutput);
  }
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderAll() {
  renderSidebar();
  renderLesson();
  updateProgress();
}

/* ---------- Boot ---------- */
loadState();
renderAll();
initPyodide();
