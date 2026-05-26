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

/* ---------- In-app input-dialog ---------- */
const inputModal = document.getElementById("inputModal");
const inputForm = document.getElementById("inputForm");
const inputField = document.getElementById("inputField");
const inputPromptText = document.getElementById("inputPromptText");
const inputCancel = document.getElementById("inputCancel");

let _pendingInput = null; // { resolve, reject }

function showInputDialog(promptText) {
  return new Promise((resolve, reject) => {
    _pendingInput = { resolve, reject };
    inputPromptText.textContent = promptText || "(skriv et svar)";
    inputField.value = "";
    inputModal.classList.add("show");
    inputModal.setAttribute("aria-hidden", "false");
    // Vent litt så modal får lagt seg før vi fokuserer
    setTimeout(() => inputField.focus(), 0);
  });
}
function closeInputDialog() {
  inputModal.classList.remove("show");
  inputModal.setAttribute("aria-hidden", "true");
  _pendingInput = null;
}
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!_pendingInput) return;
  const value = inputField.value;
  const { resolve } = _pendingInput;
  closeInputDialog();
  resolve(value);
});
inputCancel.addEventListener("click", () => {
  if (!_pendingInput) return;
  const { reject } = _pendingInput;
  closeInputDialog();
  reject(new Error("Inntasting avbrutt"));
});
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    e.preventDefault();
    inputCancel.click();
  }
});

async function runCode(code) {
  if (!state.pyReady) return { output: "", error: "Python er ikke klar enda." };
  // Eksponer dialog-funksjonen til Python
  state.pyodide.globals.set("_js_show_input", showInputDialog);

  // Sett opp stdout-capture og en async input()-erstatning.
  // Vi transformerer brukerkoden med Pythons ast slik at input(...) blir
  // await _ainput(...), og alle funksjoner definert av brukeren blir async
  // (og deres kall blir await). Hele brukerkoden pakkes inn i en async
  // wrapper og kjøres med top-level await via runPythonAsync.
  state.pyodide.runPython(`
import sys, io, builtins, ast, textwrap

_stdout = io.StringIO()
sys.stdout = _stdout
sys.stderr = _stdout

async def _ainput(prompt=""):
    text = str(prompt)
    if text:
        print(text, end="", flush=True)
    answer = await _js_show_input(text)
    answer = str(answer)
    print(answer)
    return answer

# Hvis input() kalles utenom vår transformerte kode (f.eks. fra importert modul),
# kast en tydelig feil i stedet for OSError fra Pyodide.
def _sync_input_blocked(prompt=""):
    raise RuntimeError("input() kan ikke brukes her — bruk den direkte i koden din.")
builtins.input = _sync_input_blocked


def _transform_user_code(src: str) -> str:
    tree = ast.parse(src)

    # Finn navn på alle brukerdefinerte funksjoner (på toppnivå og nested)
    user_funcs = set()
    class _Collect(ast.NodeVisitor):
        def visit_FunctionDef(self, node):
            user_funcs.add(node.name)
            self.generic_visit(node)
        def visit_AsyncFunctionDef(self, node):
            user_funcs.add(node.name)
            self.generic_visit(node)
    _Collect().visit(tree)

    class _Rewrite(ast.NodeTransformer):
        def visit_FunctionDef(self, node):
            self.generic_visit(node)
            new = ast.AsyncFunctionDef(
                name=node.name,
                args=node.args,
                body=node.body,
                decorator_list=node.decorator_list,
                returns=node.returns,
                type_comment=node.type_comment,
            )
            return ast.copy_location(new, node)

        def visit_Call(self, node):
            self.generic_visit(node)
            f = node.func
            if isinstance(f, ast.Name):
                if f.id == "input":
                    new_call = ast.Call(
                        func=ast.Name(id="_ainput", ctx=ast.Load()),
                        args=node.args,
                        keywords=node.keywords,
                    )
                    ast.copy_location(new_call, node)
                    aw = ast.Await(value=new_call)
                    return ast.copy_location(aw, node)
                if f.id in user_funcs:
                    aw = ast.Await(value=node)
                    return ast.copy_location(aw, node)
            return node

    new_tree = _Rewrite().visit(tree)
    ast.fix_missing_locations(new_tree)

    body_src = ast.unparse(new_tree)
    indented = textwrap.indent(body_src, "    ")
    wrapper = "async def __user_main():\\n" + (indented if indented.strip() else "    pass\\n")
    return wrapper + "\\nawait __user_main()\\n"

builtins._transform_user_code = _transform_user_code
`);

  let error = null;
  let transformed = null;
  try {
    state.pyodide.globals.set("_user_src", code);
    transformed = state.pyodide.runPython("_transform_user_code(_user_src)");
  } catch (err) {
    // Hvis transformasjonen feiler (f.eks. syntaksfeil), kjør koden direkte
    // så Python selv gir riktig feilmelding til eleven.
    transformed = null;
  }

  try {
    if (transformed) {
      await state.pyodide.runPythonAsync(transformed);
    } else {
      await state.pyodide.runPythonAsync(code);
    }
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
