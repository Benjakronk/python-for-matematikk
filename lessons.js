// Hver leksjon: { title, html, exercises: [{ task, hint, starter, expectedOutput | check, solution }] }
// "expectedOutput" sammenligner elevens output (etter trim) med fasit.
// "check" er en funksjon (output, code) => true/false hvis vi trenger mer fleksibilitet.

const LESSONS = [
  /* ============================================================ */
  {
    title: "Velkommen",
    html: `
      <p class="lesson-intro">Kort introduksjon til hva programmering er, og hvordan dette kurset fungerer.</p>
      <h1>Velkommen til Python 🐍</h1>
      <p>I dette kurset skal du lære <strong>programmering</strong> — å gi en datamaskin presise instruksjoner. Vi bruker språket <strong>Python</strong>, som er kjent for å være lett å lese.</p>

      <h2>Hva du lærer</h2>
      <ul>
        <li><strong>Print</strong> — å skrive ut svar på skjermen</li>
        <li><strong>Variabler</strong> — å lagre tall og tekst</li>
        <li><strong>Løkker</strong> — å gjenta noe mange ganger</li>
        <li><strong>Algoritmer og flytdiagram</strong> — å lese, forklare og programmere oppskrifter med <code>if/else</code></li>
      </ul>
      <p>På slutten løser du <strong>to eksamensoppgaver i matematikk for 10. trinn</strong>: én om sparing (tallregning og løkker) og én om et flytdiagram (algoritme), som speiler oppgave 5 i UDIRs eksempeleksamen.</p>

      <div class="vocab">
        <div class="vocab-title">📘 Vokabular</div>
        <dl>
          <dt>Kode</dt><dd>Instruksjoner skrevet i et programmeringsspråk.</dd>
          <dt>Kjøre (engelsk: <em>run</em>)</dt><dd>Å starte programmet slik at datamaskinen utfører instruksjonene.</dd>
          <dt>Terminal</dt><dd>Vinduet hvor utskriften (resultatet) vises.</dd>
          <dt>Syntaks</dt><dd>Reglene for hvordan koden må skrives for at den skal fungere.</dd>
        </dl>
      </div>

      <h2>Slik bruker du kurset</h2>
      <ol>
        <li>Les forklaringen i hver leksjon.</li>
        <li>Prøv eksemplene i <strong>Python-terminalen til høyre</strong> — trykk <span class="kbd">Kjør ▶</span>.</li>
        <li>Løs oppgavene og trykk <strong>Sjekk svar</strong>. Du får tilbakemelding med en gang.</li>
      </ol>

      <div class="note"><strong>Tips:</strong> Du kan justere tekststørrelsen i terminalen med <span class="kbd">A−</span> / <span class="kbd">A+</span>. Trykk også <em>"Last inn i terminal"</em> for å få oppgaveteksten over som startkode.</div>

      <p>Klar? Klikk på <strong>Leksjon 1: Print</strong> i menyen til venstre.</p>
    `,
    exercises: []
  },

  /* ============================================================ */
  {
    title: "Leksjon 1: Print",
    html: `
      <p class="lesson-intro">Lær å vise tekst og tall på skjermen med <code>print()</code>.</p>
      <h1>Leksjon 1 — Print</h1>
      <p>Det aller første du må kunne i programmering er å få datamaskinen til å <strong>vise noe</strong>. I Python bruker vi <code>print()</code>.</p>

      <h3>Eksempel</h3>
      <pre>print("Hei!")</pre>
      <p>Når du kjører denne koden, skriver datamaskinen <code>Hei!</code> i terminalen.</p>

      <div class="vocab">
        <div class="vocab-title">📘 Vokabular</div>
        <dl>
          <dt>Funksjon</dt><dd>En "kommando" datamaskinen kan utføre. <code>print</code> er en funksjon.</dd>
          <dt>Argument</dt><dd>Det vi gir til funksjonen — det som står inni parentesen. I <code>print("Hei!")</code> er <code>"Hei!"</code> argumentet.</dd>
          <dt>Streng (<em>string</em>)</dt><dd>Tekst i kode. Må stå mellom anførselstegn: <code>"slik"</code>.</dd>
          <dt>Tall</dt><dd>Tall skrives <strong>uten</strong> anførselstegn: <code>print(7)</code>.</dd>
        </dl>
      </div>

      <h2>Regne med print</h2>
      <p>Python kan også regne. Prøv:</p>
      <pre>print(2 + 3)
print(10 * 4)
print(20 / 5)</pre>
      <p>Symbolene betyr:</p>
      <ul>
        <li><code>+</code> pluss</li>
        <li><code>-</code> minus</li>
        <li><code>*</code> ganger</li>
        <li><code>/</code> dele</li>
        <li><code>**</code> opphøyd i (potens), f.eks. <code>2 ** 3</code> = 8</li>
      </ul>
      <div class="note"><strong>Merk:</strong> Når Python deler med <code>/</code>, får du alltid et desimaltall — for eksempel <code>20 / 5</code> blir <code>4.0</code>, ikke <code>4</code>.</div>
    `,
    exercises: [
      {
        task: "Skriv kode som skriver ut teksten: Hei, verden!",
        hint: "Bruk print() med teksten i anførselstegn.",
        starter: `# Skriv koden din her\n`,
        expectedOutput: "Hei, verden!",
        solution: `print("Hei, verden!")`
      },
      {
        task: "Skriv ut teksten: Jeg lærer Python",
        hint: "Husk anførselstegn rundt teksten.",
        starter: `# Skriv koden din her\n`,
        expectedOutput: "Jeg lærer Python",
        solution: `print("Jeg lærer Python")`
      },
      {
        task: "Skriv ut svaret på regnestykket 47 + 58.",
        hint: "Du kan skrive print(47 + 58) — Python regner selv.",
        starter: `# Regn ut og skriv svaret\n`,
        expectedOutput: "105",
        solution: `print(47 + 58)`
      },
      {
        task: "Skriv ut svaret på 100 − 37.",
        hint: "Minus er bare -.",
        starter: `# Skriv svaret\n`,
        expectedOutput: "63",
        solution: `print(100 - 37)`
      },
      {
        task: "Skriv ut svaret på 25 · 4 (ganger).",
        hint: "Gange er * i Python.",
        starter: `# Skriv svaret\n`,
        expectedOutput: "100",
        solution: `print(25 * 4)`
      },
      {
        task: "Skriv ut svaret på 81 / 9.",
        hint: "Husk: division med / gir desimaltall i Python.",
        starter: `# Skriv svaret\n`,
        expectedOutput: "9.0",
        solution: `print(81 / 9)`
      },
      {
        task: "Skriv ut 2 opphøyd i 10 (altså 2¹⁰).",
        hint: "Bruk ** for potens: 2 ** 10.",
        starter: `# Skriv svaret\n`,
        expectedOutput: "1024",
        solution: `print(2 ** 10)`
      },
      {
        task: "Et kvadrat har side 7 cm. Skriv ut omkretsen (omkrets = 4 · side).",
        hint: "print(4 * 7)",
        starter: `# Omkrets av kvadrat\n`,
        expectedOutput: "28",
        solution: `print(4 * 7)`
      },
      {
        task: "En sirkel har radius 5. Skriv ut arealet (bruk π ≈ 3.14). Formel: A = π · r².",
        hint: "Du kan skrive print(3.14 * 5 * 5) eller print(3.14 * 5 ** 2).",
        starter: `# Areal av sirkel: A = pi * r * r\n`,
        expectedOutput: "78.5",
        solution: `print(3.14 * 5 ** 2)`
      },
      {
        task: "Et rektangel har lengde 15 og bredde 8. Skriv ut omkretsen (omkrets = 2 · (lengde + bredde)).",
        hint: "Husk parentes: print(2 * (15 + 8)).",
        starter: `# Omkrets av rektangel\n`,
        expectedOutput: "46",
        solution: `print(2 * (15 + 8))`
      }
    ]
  },

  /* ============================================================ */
  {
    title: "Leksjon 2: Variabler",
    html: `
      <p class="lesson-intro">Lær å lagre verdier i <strong>variabler</strong> slik at vi kan bruke dem flere ganger.</p>
      <h1>Leksjon 2 — Variabler</h1>
      <p>En <strong>variabel</strong> er som en boks med et navn. Vi legger en verdi i boksen, og kan bruke den senere ved å skrive navnet.</p>

      <h3>Eksempel</h3>
      <pre>alder = 15
print(alder)</pre>
      <p>Her lager vi en variabel <code>alder</code> som lagrer tallet 15. Når vi printer <code>alder</code>, viser terminalen <code>15</code>.</p>

      <div class="vocab">
        <div class="vocab-title">📘 Vokabular</div>
        <dl>
          <dt>Variabel</dt><dd>Et navn som peker på en verdi.</dd>
          <dt>Tilordning</dt><dd><code>=</code>-tegnet legger en verdi inn i variabelen. <strong>Det er ikke et likhetstegn som i matematikk</strong>.</dd>
          <dt>Datatype</dt><dd>Slags verdi det er: <em>tall</em> (<code>int</code>, <code>float</code>) eller <em>tekst</em> (<code>str</code>).</dd>
          <dt>Uttrykk</dt><dd>Noe som regnes ut, f.eks. <code>pris * antall</code>.</dd>
        </dl>
      </div>

      <h2>Regne med variabler</h2>
      <pre>pris = 49
antall = 3
sum = pris * antall
print(sum)</pre>
      <p>Først lager vi <code>pris</code> og <code>antall</code>. Så regner vi ut <code>pris * antall</code> og lagrer i <code>sum</code>. Til slutt printer vi <code>sum</code> — som er <code>147</code>.</p>

      <h2>Slå sammen tekst og tall</h2>
      <p>For å skrive ut tekst og tall sammen, bruker vi komma inni <code>print()</code>:</p>
      <pre>navn = "Lisa"
alder = 15
print("Navn:", navn, "Alder:", alder)</pre>

      <div class="note"><strong>Regler for variabelnavn:</strong> Bare bokstaver, tall og <code>_</code>. Må starte med en bokstav. Ikke æ, ø, å.</div>
    `,
    exercises: [
      {
        task: "Lag en variabel som heter timer og sett den til 24. Skriv den ut.",
        hint: "Tilordne med =, deretter print(timer).",
        starter: `# Lag variabelen og skriv den ut\n`,
        expectedOutput: "24",
        solution: `timer = 24\nprint(timer)`
      },
      {
        task: "Lag en variabel som heter navn og sett den til ditt navn (i anførselstegn). Skriv variabelen ut. (Bruk navnet 'Kari'.)",
        hint: "navn = \"Kari\" og print(navn).",
        starter: `# Lag variabel og skriv ut\n`,
        expectedOutput: "Kari",
        solution: `navn = "Kari"\nprint(navn)`
      },
      {
        task: "Du kjøper 7 bøker som koster 89 kr per stk. Bruk variabler for pris og antall, og skriv ut totalprisen.",
        hint: "totalpris = pris * antall, så print(totalpris).",
        starter: `pris = 89\nantall = 7\n# Regn ut og skriv ut totalprisen\n`,
        expectedOutput: "623",
        solution: `pris = 89\nantall = 7\ntotalpris = pris * antall\nprint(totalpris)`
      },
      {
        task: "Et rektangel har lengde 12 cm og bredde 8 cm. Bruk variabler og skriv ut arealet.",
        hint: "Areal = lengde · bredde.",
        starter: `lengde = 12\nbredde = 8\n# Skriv ut arealet\n`,
        expectedOutput: "96",
        solution: `lengde = 12\nbredde = 8\nareal = lengde * bredde\nprint(areal)`
      },
      {
        task: "Lag variabler pris = 120 og antall = 5. Skriv ut totalprisen.",
        hint: "Totalpris = pris * antall.",
        starter: `pris = 120\nantall = 5\n# Skriv ut totalprisen\n`,
        expectedOutput: "600",
        solution: `pris = 120\nantall = 5\nprint(pris * antall)`
      },
      {
        task: "Temperaturen ute er 18 grader. Det stiger 5 grader. Bruk en variabel og skriv ut ny temperatur.",
        hint: "ny_temp = temp + 5.",
        starter: `temp = 18\n# Skriv ut ny temperatur\n`,
        expectedOutput: "23",
        solution: `temp = 18\nprint(temp + 5)`
      },
      {
        task: "Lag variabler a = 14 og b = 6. Skriv ut differansen a − b.",
        hint: "print(a - b).",
        starter: `a = 14\nb = 6\n# Skriv ut a - b\n`,
        expectedOutput: "8",
        solution: `a = 14\nb = 6\nprint(a - b)`
      },
      {
        task: "Tre venner deler 360 kr likt. Bruk variabler og skriv ut hvor mye hver får.",
        hint: "Per person = total / antall venner.",
        starter: `total = 360\nantall = 3\n# Skriv ut per person\n`,
        check: (out) => {
          const t = out.trim();
          return t === "120.0" || t === "120";
        },
        solution: `total = 360\nantall = 3\nprint(total / antall)`
      },
      {
        task: "En vare koster 250 kr. Den får 20 % avslag. Skriv ut den nye prisen.",
        hint: "Avslaget er pris * 0.20. Ny pris = pris - avslag. (Eller: pris * 0.80.)",
        starter: `pris = 250\nprosent = 20\n# Regn ut og skriv ut ny pris\n`,
        check: (out) => out.trim() === "200" || out.trim() === "200.0",
        solution: `pris = 250\nprosent = 20\navslag = pris * prosent / 100\nny_pris = pris - avslag\nprint(ny_pris)`
      },
      {
        task: "En bil bruker 0.6 liter drivstoff per mil. Den kjører 25 mil. Bruk variabler og skriv ut totalt forbruk i liter.",
        hint: "forbruk = liter_per_mil * antall_mil.",
        starter: `liter_per_mil = 0.6\nantall_mil = 25\n# Skriv ut totalforbruk\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 15) < 0.001;
        },
        solution: `liter_per_mil = 0.6\nantall_mil = 25\nprint(liter_per_mil * antall_mil)`
      }
    ]
  },

  /* ============================================================ */
  {
    title: "Leksjon 3: Løkker",
    html: `
      <p class="lesson-intro">Lær å gjenta kode mange ganger — uten å skrive det mange ganger.</p>
      <h1>Leksjon 3 — Løkker</h1>
      <p>Tenk deg at du skal skrive 7-gangen. Du <em>kan</em> skrive 10 print-linjer ... men det er <strong>løkker</strong> som er smart.</p>

      <h3>For-løkke</h3>
      <pre>for i in range(5):
    print(i)</pre>
      <p>Dette skriver ut: 0, 1, 2, 3, 4. Hver gang løkken kjører, får <code>i</code> en ny verdi.</p>

      <div class="vocab">
        <div class="vocab-title">📘 Vokabular</div>
        <dl>
          <dt>Løkke (<em>loop</em>)</dt><dd>Kode som gjentas flere ganger.</dd>
          <dt>Iterasjon</dt><dd>Én runde i løkken.</dd>
          <dt><code>range(n)</code></dt><dd>Lager tallene 0, 1, 2, ... opp til (men ikke med) <code>n</code>.</dd>
          <dt><code>range(a, b)</code></dt><dd>Lager tallene fra <code>a</code> til (men ikke med) <code>b</code>.</dd>
          <dt><code>range(a, b, steg)</code></dt><dd>Som over, men hopper med <code>steg</code> hver gang.</dd>
          <dt>Innrykk</dt><dd>De fire mellomrommene foran linjene som hører til løkken. <strong>Veldig viktig i Python!</strong></dd>
        </dl>
      </div>

      <h2>Eksempel: 7-gangen</h2>
      <pre>for i in range(1, 11):
    print(7 * i)</pre>
      <p>Dette skriver ut 7, 14, 21, ... opp til 70.</p>

      <h2>Samle opp en sum</h2>
      <p>Vi kan kombinere variabler og løkker. Her summerer vi alle tall fra 1 til 10:</p>
      <pre>sum = 0
for i in range(1, 11):
    sum = sum + i
print(sum)</pre>
      <p>Variabelen <code>sum</code> starter på 0. I hver runde legger vi til <code>i</code>. Til slutt printes <code>55</code>.</p>

      <div class="note"><strong>Husk innrykket!</strong> Linjene som skal være <em>inni</em> løkken må ha fire mellomrom foran seg. Linjer uten innrykk er <em>utenfor</em> løkken.</div>
    `,
    exercises: [
      {
        task: "Skriv ut tallene fra 0 til og med 4 (på hver sin linje) med en løkke.",
        hint: "for i in range(5): print(i)",
        starter: `# Lag en løkke som skriver 0, 1, 2, 3, 4\n`,
        expectedOutput: "0\n1\n2\n3\n4",
        solution: `for i in range(5):\n    print(i)`
      },
      {
        task: "Skriv ut tallene fra 1 til og med 5 (på hver sin linje).",
        hint: "Bruk range(1, 6).",
        starter: `# 1, 2, 3, 4, 5\n`,
        expectedOutput: "1\n2\n3\n4\n5",
        solution: `for i in range(1, 6):\n    print(i)`
      },
      {
        task: "Skriv ut 3-gangen fra 3 til 30 (3, 6, 9, ..., 30).",
        hint: "for i in range(1, 11): print(3 * i)",
        starter: `# 3-gangen\n`,
        expectedOutput: "3\n6\n9\n12\n15\n18\n21\n24\n27\n30",
        solution: `for i in range(1, 11):\n    print(3 * i)`
      },
      {
        task: "Skriv ut 8-gangen fra 8 til 80 (altså 8, 16, 24, ... 80).",
        hint: "Bruk range(1, 11) og print(8 * i).",
        starter: `# 8-gangen\n`,
        expectedOutput: "8\n16\n24\n32\n40\n48\n56\n64\n72\n80",
        solution: `for i in range(1, 11):\n    print(8 * i)`
      },
      {
        task: "Skriv 'Hei' 5 ganger (på hver sin linje) ved hjelp av en løkke.",
        hint: 'for i in range(5): print("Hei")',
        starter: `# Skriv Hei fem ganger\n`,
        expectedOutput: "Hei\nHei\nHei\nHei\nHei",
        solution: `for i in range(5):\n    print("Hei")`
      },
      {
        task: "Bruk en løkke til å regne ut summen 1 + 2 + 3 + ... + 10. Skriv ut summen.",
        hint: "Start sum = 0. Bruk range(1, 11). Legg til i hver runde.",
        starter: `sum = 0\n# Løkke som legger sammen 1 til 10\n`,
        expectedOutput: "55",
        solution: `sum = 0\nfor i in range(1, 11):\n    sum = sum + i\nprint(sum)`
      },
      {
        task: "Bruk en løkke til å regne ut summen 1 + 2 + ... + 100. Skriv ut summen.",
        hint: "Bruk range(1, 101).",
        starter: `sum = 0\n# Sum av 1 til 100\n`,
        expectedOutput: "5050",
        solution: `sum = 0\nfor i in range(1, 101):\n    sum = sum + i\nprint(sum)`
      },
      {
        task: "Regn ut summen av alle partall fra 2 til og med 20. Skriv ut summen.",
        hint: "range(2, 21, 2) gir 2, 4, 6, ..., 20.",
        starter: `sum = 0\n# Sum av partall 2 til 20\n`,
        expectedOutput: "110",
        solution: `sum = 0\nfor i in range(2, 21, 2):\n    sum = sum + i\nprint(sum)`
      },
      {
        task: "Regn ut summen av 11-gangen (11 + 22 + 33 + ... + 110). Skriv ut summen.",
        hint: "Sum av 11*i for i fra 1 til 10.",
        starter: `sum = 0\n# Sum av 11-gangen\n`,
        expectedOutput: "605",
        solution: `sum = 0\nfor i in range(1, 11):\n    sum = sum + 11 * i\nprint(sum)`
      },
      {
        task: "Tell hvor mange partall det er fra 1 til og med 100. Skriv ut antallet.",
        hint: "Start antall = 0. Løkke fra 1 til 100. Bruk range(2, 101, 2) og tell.",
        starter: `antall = 0\n# Tell partall fra 1 til 100\n`,
        expectedOutput: "50",
        solution: `antall = 0\nfor i in range(2, 101, 2):\n    antall = antall + 1\nprint(antall)`
      }
    ]
  },

  /* ============================================================ */
  {
    title: "Leksjon 4: Algoritmer og flytdiagram",
    html: `
      <p class="lesson-intro">Lær å lese flytdiagram, bruke if/else, og programmere algoritmer — sentralt på eksamen i 10. trinn.</p>
      <h1>Leksjon 4 — Algoritmer og flytdiagram</h1>
      <p>På eksamen i matematikk får du ofte vist et <strong>flytdiagram</strong> som beskriver en algoritme. Du må kunne:</p>
      <ul>
        <li><strong>Forklare</strong> hva algoritmen undersøker</li>
        <li><strong>Gi eksempler</strong> på verdier som gir et bestemt resultat</li>
        <li><strong>Skrive</strong> algoritmen som Python-kode</li>
      </ul>

      <h2>Hva er en algoritme?</h2>
      <p>En <strong>algoritme</strong> er en oppskrift — en presis liste med steg som løser et problem. Det å løse en likning steg for steg er en algoritme. Det å sjekke om et tall er partall er en algoritme.</p>

      <h2>Symbolene i et flytdiagram</h2>
      <table class="symbol-table">
        <tr>
          <td><svg width="70" height="40" viewBox="0 0 70 40"><ellipse cx="35" cy="20" rx="28" ry="15" fill="#232858" stroke="#ffd166" stroke-width="2"/></svg></td>
          <td><strong>Oval</strong> — markerer <em>Start</em> eller <em>Slutt</em>.</td>
        </tr>
        <tr>
          <td><svg width="70" height="40" viewBox="0 0 70 40"><polygon points="12,8 62,8 58,32 8,32" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/></svg></td>
          <td><strong>Parallellogram</strong> — <em>Input</em> (data inn) eller <em>Output</em> (skriv ut).</td>
        </tr>
        <tr>
          <td><svg width="70" height="40" viewBox="0 0 70 40"><rect x="10" y="8" width="50" height="24" fill="#1c2046" stroke="#9aa0c7" stroke-width="2"/></svg></td>
          <td><strong>Rektangel</strong> — en <em>operasjon</em> (regning eller tilordning).</td>
        </tr>
        <tr>
          <td><svg width="70" height="40" viewBox="0 0 70 40"><polygon points="35,4 64,20 35,36 6,20" fill="#232858" stroke="#ef476f" stroke-width="2"/></svg></td>
          <td><strong>Romb</strong> — en <em>beslutning</em> (svar Ja eller Nei).</td>
        </tr>
      </table>

      <h2>Eksempel: Er tallet partall eller oddetall?</h2>
      <svg viewBox="0 0 600 560" class="flowchart-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#9aa0c7"/>
          </marker>
        </defs>
        <ellipse cx="300" cy="30" rx="50" ry="20" fill="#232858" stroke="#ffd166" stroke-width="2"/>
        <text x="300" y="35" text-anchor="middle" fill="#e8ebff" font-size="14" font-weight="600">Start</text>
        <line x1="300" y1="50" x2="300" y2="78" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrA)"/>
        <polygon points="180,82 420,82 400,128 160,128" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="290" y="111" text-anchor="middle" fill="#e8ebff" font-size="13" font-family="monospace">tall = 7</text>
        <line x1="300" y1="128" x2="300" y2="158" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrA)"/>
        <polygon points="300,160 440,235 300,310 160,235" fill="#232858" stroke="#ef476f" stroke-width="2"/>
        <text x="300" y="240" text-anchor="middle" fill="#e8ebff" font-size="13" font-family="monospace">tall % 2 == 0?</text>
        <text x="312" y="330" fill="#06d6a0" font-size="13" font-weight="700">Ja</text>
        <line x1="300" y1="310" x2="300" y2="358" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrA)"/>
        <text x="445" y="227" fill="#ef476f" font-size="13" font-weight="700">Nei</text>
        <line x1="440" y1="235" x2="510" y2="235" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="510" y1="235" x2="510" y2="358" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrA)"/>
        <polygon points="195,360 395,360 375,406 175,406" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="285" y="388" text-anchor="middle" fill="#e8ebff" font-size="13" font-family="monospace">"Partall"</text>
        <polygon points="430,360 590,360 570,406 410,406" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="500" y="388" text-anchor="middle" fill="#e8ebff" font-size="13" font-family="monospace">"Oddetall"</text>
        <line x1="285" y1="406" x2="285" y2="450" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="500" y1="406" x2="500" y2="450" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="285" y1="450" x2="500" y2="450" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="392" y1="450" x2="392" y2="498" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrA)"/>
        <ellipse cx="392" cy="525" rx="50" ry="20" fill="#232858" stroke="#ffd166" stroke-width="2"/>
        <text x="392" y="530" text-anchor="middle" fill="#e8ebff" font-size="14" font-weight="600">Slutt</text>
      </svg>
      <div class="flowchart-caption">Flytdiagram for å avgjøre om et tall er partall eller oddetall.</div>

      <p>I Python skriver vi dette med en <strong>if/else</strong>-setning ("hvis/ellers"):</p>
      <pre>tall = 7
if tall % 2 == 0:
    print("Partall")
else:
    print("Oddetall")</pre>
      <p>Når koden kjører, sjekker den om resten ved deling med 2 er 0. For 7 er det <em>ikke</em> 0, så Python hopper til <code>else</code>-grenen og skriver <code>Oddetall</code>.</p>

      <div class="vocab">
        <div class="vocab-title">📘 Vokabular</div>
        <dl>
          <dt>Algoritme</dt><dd>Steg-for-steg oppskrift for å løse et problem.</dd>
          <dt>Flytdiagram (<em>flowchart</em>)</dt><dd>Visuell tegning av en algoritme.</dd>
          <dt>Input</dt><dd>Data som kommer inn — verdier algoritmen får.</dd>
          <dt>Output</dt><dd>Resultatet — det som blir skrevet ut.</dd>
          <dt>Beslutning / Betingelse</dt><dd>Et spørsmål med svar Ja eller Nei.</dd>
          <dt><code>if</code> / <code>else</code></dt><dd>Norsk: "hvis" / "ellers". Slik velger vi mellom to muligheter i Python.</dd>
          <dt>Modulo (<code>%</code>)</dt><dd>Gir <em>resten</em> ved deling. <code>7 % 2 = 1</code> (rest 1). <code>10 % 5 = 0</code> (ingen rest, altså delelig).</dd>
        </dl>
      </div>

      <h2>Sammenligningsoperatorer</h2>
      <ul>
        <li><code>==</code> er lik (HUSK: <em>to</em> likhetstegn — ett er tilordning!)</li>
        <li><code>!=</code> er ikke lik</li>
        <li><code>&lt;</code> mindre enn — <code>&gt;</code> større enn</li>
        <li><code>&lt;=</code> mindre eller lik — <code>&gt;=</code> større eller lik</li>
      </ul>

      <h2>Kombinere betingelser med <code>and</code> og <code>or</code></h2>
      <ul>
        <li><code>and</code> — <strong>begge</strong> må være sanne. <br><code>a &gt; 0 and a &lt; 10</code> betyr at a er mellom 0 og 10.</li>
        <li><code>or</code> — <strong>minst én</strong> må være sann. <br><code>a == b or a == c</code> betyr at a er lik en av dem.</li>
      </ul>

      <h2>Når flytdiagrammet sier "Skriv inn ..."</h2>
      <p>I et flytdiagram betyr "Skriv inn x" at brukeren oppgir en verdi. I Python heter funksjonen <code>input()</code>:</p>
      <pre>c = float(input("Skriv inn c: "))</pre>
      <p>I kursoppgavene våre setter vi verdiene rett i koden i stedet (f.eks. <code>c = 5</code>), men du må kjenne igjen <code>input()</code> dersom du ser det på eksamen.</p>

      <div class="note"><strong>Innrykk igjen:</strong> Linjene <em>under</em> <code>if:</code> og <code>else:</code> må ha 4 mellomrom foran. Det er Pythons måte å si "dette hører til if-en".</div>
    `,
    exercises: [
      {
        task: "Sett tall = 7. Skriv ut \"Stor\" hvis tall > 5, ellers skriv ut \"Liten\".",
        hint: "Bruk if tall > 5: print(\"Stor\") og else: print(\"Liten\").",
        starter: `tall = 7\n# Skriv if/else\n`,
        expectedOutput: "Stor",
        solution: `tall = 7\nif tall > 5:\n    print("Stor")\nelse:\n    print("Liten")`
      },
      {
        task: "Sett tall = 12. Skriv \"Partall\" hvis tall % 2 == 0, ellers \"Oddetall\".",
        hint: "Modulo-operatoren % gir resten. 12 % 2 er 0.",
        starter: `tall = 12\n# Partall eller oddetall?\n`,
        expectedOutput: "Partall",
        solution: `tall = 12\nif tall % 2 == 0:\n    print("Partall")\nelse:\n    print("Oddetall")`
      },
      {
        task: "Sett tall = 15. Bruk samme test som forrige oppgave. Riktig svar denne gangen?",
        hint: "15 % 2 = 1, altså ikke 0.",
        starter: `tall = 15\n# Partall eller oddetall?\n`,
        expectedOutput: "Oddetall",
        solution: `tall = 15\nif tall % 2 == 0:\n    print("Partall")\nelse:\n    print("Oddetall")`
      },
      {
        task: "Sett alder = 17. Skriv \"Voksen\" hvis alder >= 18, ellers \"Mindreårig\".",
        hint: ">= betyr større enn eller lik.",
        starter: `alder = 17\n# Voksen eller mindreårig?\n`,
        expectedOutput: "Mindreårig",
        solution: `alder = 17\nif alder >= 18:\n    print("Voksen")\nelse:\n    print("Mindreårig")`
      },
      {
        task: "Sett a = 5 og b = 5. Skriv \"Like\" hvis a == b, ellers \"Ulike\".",
        hint: "Husk dobbelt likhetstegn: ==.",
        starter: `a = 5\nb = 5\n# Like eller ulike?\n`,
        expectedOutput: "Like",
        solution: `a = 5\nb = 5\nif a == b:\n    print("Like")\nelse:\n    print("Ulike")`
      },
      {
        task: "Sett a = 7 og b = 4. Bruk samme test som forrige oppgave.",
        hint: "Samme kode, andre verdier.",
        starter: `a = 7\nb = 4\n# Like eller ulike?\n`,
        expectedOutput: "Ulike",
        solution: `a = 7\nb = 4\nif a == b:\n    print("Like")\nelse:\n    print("Ulike")`
      },
      {
        task: "Tre sider i en trekant: a = 4, b = 4, c = 4. Skriv \"Likesidet\" hvis alle er like, ellers \"Ikke likesidet\". (Tips: bruk and.)",
        hint: "if a == b and b == c: ...",
        starter: `a = 4\nb = 4\nc = 4\n# Likesidet trekant?\n`,
        expectedOutput: "Likesidet",
        solution: `a = 4\nb = 4\nc = 4\nif a == b and b == c:\n    print("Likesidet")\nelse:\n    print("Ikke likesidet")`
      },
      {
        task: "Tre sider: a = 5, b = 5, c = 7. Skriv \"Likebeint\" hvis minst to sider er like, ellers \"Ikke likebeint\". (Tips: bruk or.)",
        hint: "if a == b or a == c or b == c: ...",
        starter: `a = 5\nb = 5\nc = 7\n# Likebeint trekant?\n`,
        expectedOutput: "Likebeint",
        solution: `a = 5\nb = 5\nc = 7\nif a == b or a == c or b == c:\n    print("Likebeint")\nelse:\n    print("Ikke likebeint")`
      },
      {
        task: "Tre tall: a = 12, b = 7, c = 9. Skriv ut det største av tallene.",
        hint: "Start storst = a. Hvis b > storst, oppdater. Hvis c > storst, oppdater. Print til slutt.",
        starter: `a = 12\nb = 7\nc = 9\n# Skriv ut det største\n`,
        expectedOutput: "12",
        solution: `a = 12\nb = 7\nc = 9\nstorst = a\nif b > storst:\n    storst = b\nif c > storst:\n    storst = c\nprint(storst)`
      },
      {
        task: "Sjekk om tre sider kan danne en trekant. Reglen: hver side må være mindre enn summen av de to andre (a+b>c og a+c>b og b+c>a). Sett a = 3, b = 4, c = 5. Skriv \"Mulig\" eller \"Ikke mulig\".",
        hint: "if a + b > c and a + c > b and b + c > a: ...",
        starter: `a = 3\nb = 4\nc = 5\n# Mulig trekant?\n`,
        expectedOutput: "Mulig",
        solution: `a = 3\nb = 4\nc = 5\nif a + b > c and a + c > b and b + c > a:\n    print("Mulig")\nelse:\n    print("Ikke mulig")`
      }
    ]
  },

  /* ============================================================ */
  {
    title: "Anvendelse: Matematikk",
    html: `
      <p class="lesson-intro">Vi setter sammen <strong>print</strong>, <strong>variabler</strong> og <strong>løkker</strong> for å løse matematikk fra 10. trinn.</p>
      <h1>Programmering møter matematikk</h1>
      <p>Læreplanen i matematikk for 10. trinn (LK20) sier at elevene skal kunne <em>"utforske matematiske egenskapar og samanhengar ved å bruke programmering"</em>. Det er akkurat det vi gjør her.</p>

      <h2>Verdiøkning (renter)</h2>
      <p>Hvis du setter 1000 kr i banken med 5 % rente per år, vokser pengene slik:</p>
      <pre>belop = 1000
for ar in range(5):
    belop = belop * 1.05
print(belop)</pre>
      <p>Etter 5 år har du ca. <code>1276.28</code> kr. Hvert år ganges beløpet med <code>1.05</code> (det er det samme som å legge til 5 %).</p>

      <div class="vocab">
        <div class="vocab-title">📘 Vokabular</div>
        <dl>
          <dt>Vekstfaktor</dt><dd>Tallet vi ganger med for å øke eller minke en verdi i prosent. 5 % økning = vekstfaktor 1,05. 20 % nedgang = 0,80.</dd>
          <dt>Tabell</dt><dd>Oversikt over verdier — vi lager dem ofte med en løkke.</dd>
          <dt>Funksjonsverdi</dt><dd>Resultatet av en funksjon for en bestemt <em>x</em>.</dd>
          <dt><code>round(tall, 2)</code></dt><dd>Avrunder et tall til 2 desimaler.</dd>
        </dl>
      </div>

      <h2>Lage en verditabell</h2>
      <p>Funksjonen <em>f(x) = 2x + 3</em>. Tabell for x fra 0 til 5:</p>
      <pre>for x in range(6):
    y = 2 * x + 3
    print("x =", x, " y =", y)</pre>

      <h2>Finne et tall som passer</h2>
      <p>Hvor mange år tar det før 1000 kr blir mer enn 2000 kr med 5 % rente?</p>
      <pre>belop = 1000
ar = 0
for i in range(100):
    if belop >= 2000:
        break
    belop = belop * 1.05
    ar = ar + 1
print(ar)</pre>
      <p><em>(Ikke vær redd for <code>if</code> og <code>break</code> — bare se at vi kan gjenta og stoppe når et mål er nådd.)</em></p>
    `,
    exercises: [
      {
        task: "Lag en verditabell for f(x) = 3x − 1, for x = 0, 1, 2, 3, 4, 5. Skriv ut bare y-verdiene, én per linje.",
        hint: "for x in range(6): print(3 * x - 1)",
        starter: `# Verditabell for f(x) = 3x - 1\n`,
        expectedOutput: "-1\n2\n5\n8\n11\n14",
        solution: `for x in range(6):\n    print(3 * x - 1)`
      },
      {
        task: "Lag en verditabell for f(x) = x², for x = 0, 1, 2, 3, 4, 5. Skriv ut bare y-verdiene.",
        hint: "x ** 2 er x kvadrert.",
        starter: `# Verditabell for f(x) = x*x\n`,
        expectedOutput: "0\n1\n4\n9\n16\n25",
        solution: `for x in range(6):\n    print(x ** 2)`
      },
      {
        task: "Lag en verditabell for f(x) = 5x + 2, for x = 0, 1, 2, ..., 10. Skriv ut bare y-verdiene.",
        hint: "range(11) gir 0 til 10.",
        starter: `# Verditabell for f(x) = 5x + 2\n`,
        expectedOutput: "2\n7\n12\n17\n22\n27\n32\n37\n42\n47\n52",
        solution: `for x in range(11):\n    print(5 * x + 2)`
      },
      {
        task: "Du sparer 500 kr i banken med 4 % rente per år. Hvor mye har du etter 10 år? Skriv ut beløpet (avrundet til 2 desimaler).",
        hint: "Bruk en løkke. Gang med 1.04 ti ganger. Bruk round(belop, 2).",
        starter: `belop = 500\n# Løkke 10 ganger med 4% rente\n# Skriv ut avrundet beløp\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 740.12) < 0.05;
        },
        solution: `belop = 500\nfor ar in range(10):\n    belop = belop * 1.04\nprint(round(belop, 2))`
      },
      {
        task: "Du sparer 2000 kr med 6 % rente per år. Hvor mye har du etter 5 år? Skriv ut beløpet avrundet til 2 desimaler.",
        hint: "Vekstfaktor 1.06, løkke 5 ganger.",
        starter: `belop = 2000\n# 5 år med 6% rente\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 2676.45) < 0.1;
        },
        solution: `belop = 2000\nfor ar in range(5):\n    belop = belop * 1.06\nprint(round(belop, 2))`
      },
      {
        task: "I en kommune bor det 10 000 personer. Folketallet øker med 2 % hvert år. Hvor mange bor det etter 10 år? Skriv ut svaret avrundet til 2 desimaler.",
        hint: "Vekstfaktor 1.02, løkke 10 ganger.",
        starter: `folk = 10000\n# 10 år med 2% vekst\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 12189.94) < 0.5;
        },
        solution: `folk = 10000\nfor ar in range(10):\n    folk = folk * 1.02\nprint(round(folk, 2))`
      },
      {
        task: "En bil koster 200 000 kr ny. Verdien synker med 15 % hvert år. Hvor mye er bilen verdt etter 5 år? Skriv ut avrundet til 2 desimaler.",
        hint: "15% nedgang = vekstfaktor 0.85.",
        starter: `verdi = 200000\n# 5 år med 15% verdifall\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 88741.06) < 1.0;
        },
        solution: `verdi = 200000\nfor ar in range(5):\n    verdi = verdi * 0.85\nprint(round(verdi, 2))`
      },
      {
        task: "Regn ut summen 1² + 2² + 3² + ... + 10². Skriv ut summen.",
        hint: "Bruk en løkke og i ** 2.",
        starter: `sum = 0\n# Sum av kvadrater\n`,
        expectedOutput: "385",
        solution: `sum = 0\nfor i in range(1, 11):\n    sum = sum + i ** 2\nprint(sum)`
      },
      {
        task: "Regn ut summen av alle oddetall fra 1 til 99 (1 + 3 + 5 + ... + 99). Skriv ut summen.",
        hint: "range(1, 100, 2) gir alle oddetall.",
        starter: `sum = 0\n# Sum av oddetall opp til 99\n`,
        expectedOutput: "2500",
        solution: `sum = 0\nfor i in range(1, 100, 2):\n    sum = sum + i\nprint(sum)`
      },
      {
        task: "Regn ut summen 2 + 4 + 6 + ... + 50 (alle partall opp til og med 50). Skriv ut summen.",
        hint: "Bruk range(2, 51, 2) — det tredje tallet er steget.",
        starter: `sum = 0\n# Legg sammen partallene\n`,
        expectedOutput: "650",
        solution: `sum = 0\nfor i in range(2, 51, 2):\n    sum = sum + i\nprint(sum)`
      }
    ]
  },

  /* ============================================================ */
  {
    title: "Eksamensoppgave 1: Sparing",
    html: `
      <p class="lesson-intro">Eksamensoppgave i sparing — bruk print, variabler og løkker.</p>
      <h1>📝 Eksamensoppgave 1: Sparing i banken</h1>

      <div class="note">
        <strong>Oppgavetekst:</strong><br><br>
        Ola fyller 15 år og får <strong>5 000 kr</strong> i bursdagsgave av besteforeldrene sine. Han setter pengene i en sparekonto med <strong>3,5 % rente per år</strong>. Renten legges til beløpet én gang i året.
        <br><br>
        Løs deloppgavene under. Hver del sjekkes automatisk.
      </div>

      <h2>Slik bør du tenke</h2>
      <ul>
        <li><strong>Variabler:</strong> Lag en variabel for beløpet, f.eks. <code>belop = 5000</code>. Vekstfaktoren er <code>1.035</code> (3,5 % økning).</li>
        <li><strong>Print:</strong> Bruk <code>print()</code> til å vise svaret.</li>
        <li><strong>Løkke:</strong> Bruk <code>for</code>-løkke for å gjenta renten flere år. For "hvor mange år" kan du bruke en løkke som teller år.</li>
        <li>Bruk gjerne <code>round(belop, 2)</code> for å avrunde til 2 desimaler.</li>
      </ul>

      <p class="lesson-intro">Lykke til! 🚀</p>
    `,
    exercises: [
      {
        task: "Del a) Skriv ut hvor mye Ola har på kontoen etter 1 år (avrundet til 2 desimaler).",
        hint: "Gang 5000 med 1.035. Bruk print(round(..., 2)).",
        starter: `belop = 5000\nrente = 0.035\n# Skriv ut beløpet etter 1 år\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 5175) < 0.01;
        },
        solution: `belop = 5000\nrente = 0.035\nbelop = belop * (1 + rente)\nprint(round(belop, 2))`
      },
      {
        task: "Del b) Bruk en løkke til å regne ut beløpet etter 8 år. Skriv ut svaret avrundet til 2 desimaler.",
        hint: "for ar in range(8): belop = belop * 1.035",
        starter: `belop = 5000\nrente = 0.035\n# Løkke 8 ganger\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 6584.04) < 1.0;
        },
        solution: `belop = 5000\nrente = 0.035\nfor ar in range(8):\n    belop = belop * (1 + rente)\nprint(round(belop, 2))`
      },
      {
        task: "Del c) Finn hvor mange hele år som må gå før beløpet er minst 10 000 kr. Skriv ut antall år.",
        hint: "Tell antall år i en variabel. Legg på rente i hver runde. Stopp når belop >= 10000.",
        starter: `belop = 5000\nrente = 0.035\nar = 0\n# Tell år til beløpet er minst 10 000\n`,
        expectedOutput: "21",
        solution: `belop = 5000\nrente = 0.035\nar = 0\nwhile belop < 10000:\n    belop = belop * (1 + rente)\n    ar = ar + 1\nprint(ar)`
      },
      {
        task: "Del d) Hvor mange kroner har Ola tjent i renter etter 1 år? Skriv ut differansen (nytt beløp − startbeløp), avrundet til 2 desimaler.",
        hint: "Trekk 5000 fra beløpet etter 1 år.",
        starter: `belop = 5000\nrente = 0.035\n# Renter tjent etter 1 år\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 175) < 0.01;
        },
        solution: `belop = 5000\nrente = 0.035\nnytt = belop * (1 + rente)\nprint(round(nytt - belop, 2))`
      },
      {
        task: "Del e) Hvor mange kroner har Ola tjent i renter etter 8 år? Skriv ut avrundet til 2 desimaler.",
        hint: "Kjør løkken 8 ganger og trekk fra 5000.",
        starter: `belop = 5000\nrente = 0.035\nstart = 5000\n# Renter tjent etter 8 år\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 1584.04) < 1.0;
        },
        solution: `belop = 5000\nrente = 0.035\nstart = 5000\nfor ar in range(8):\n    belop = belop * (1 + rente)\nprint(round(belop - start, 2))`
      },
      {
        task: "Del f) Hvor mye har Ola på kontoen etter 2 år? Skriv ut avrundet til 2 desimaler.",
        hint: "Løkke 2 ganger, eller bare gang to ganger.",
        starter: `belop = 5000\nrente = 0.035\n# Etter 2 år\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 5356.125) < 0.05;
        },
        solution: `belop = 5000\nrente = 0.035\nfor ar in range(2):\n    belop = belop * (1 + rente)\nprint(round(belop, 2))`
      },
      {
        task: "Del g) Hvis Ola hadde fått 5 % rente i stedet — hvor mye ville han hatt etter 8 år? Skriv ut avrundet til 2 desimaler.",
        hint: "Endre rentesatsen til 0.05.",
        starter: `belop = 5000\nrente = 0.05\n# 8 år med 5% rente\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 7387.28) < 1.0;
        },
        solution: `belop = 5000\nrente = 0.05\nfor ar in range(8):\n    belop = belop * (1 + rente)\nprint(round(belop, 2))`
      },
      {
        task: "Del h) Hvor mange hele år må gå før beløpet blir minst 15 000 kr (med 3,5 % rente)? Skriv ut antall år.",
        hint: "Samme teknikk som c), men med 15000.",
        starter: `belop = 5000\nrente = 0.035\nar = 0\n# Tell år til beløpet er minst 15 000\n`,
        expectedOutput: "32",
        solution: `belop = 5000\nrente = 0.035\nar = 0\nwhile belop < 15000:\n    belop = belop * (1 + rente)\n    ar = ar + 1\nprint(ar)`
      },
      {
        task: "Del i) Hvor mye har Ola på kontoen etter 20 år (med 3,5 % rente)? Skriv ut avrundet til 2 desimaler.",
        hint: "Løkke 20 ganger.",
        starter: `belop = 5000\nrente = 0.035\n# 20 år\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 9948.94) < 1.0;
        },
        solution: `belop = 5000\nrente = 0.035\nfor ar in range(20):\n    belop = belop * (1 + rente)\nprint(round(belop, 2))`
      },
      {
        task: "Del j) Olas lillesøster Lise får også 5 000 kr, men setter dem inn med bare 2 % rente. Hvor mye har hun etter 8 år? Skriv ut avrundet til 2 desimaler.",
        hint: "Vekstfaktor 1.02, løkke 8 ganger.",
        starter: `belop = 5000\nrente = 0.02\n# 8 år med 2% rente\n`,
        check: (out) => {
          const v = parseFloat(out.trim());
          return !isNaN(v) && Math.abs(v - 5858.30) < 1.0;
        },
        solution: `belop = 5000\nrente = 0.02\nfor ar in range(8):\n    belop = belop * (1 + rente)\nprint(round(belop, 2))`
      }
    ]
  },

  /* ============================================================ */
  {
    title: "Eksamensoppgave 2: Algoritme",
    html: `
      <p class="lesson-intro">Eksamensoppgave i algoritme-stil (flytdiagram + Pytagoras) — slik du kan møte den på MAT0010.</p>
      <h1>📝 Eksamensoppgave 2: Flytdiagram</h1>

      <div class="note">
        <strong>Oppgavetekst (eksamensstil, etter UDIRs eksempeloppgave 14.01.2022):</strong><br><br>
        Bildet under viser en algoritme som kan programmeres. Algoritmen tar tre tall — <code>c</code> er lengden på den lengste siden, mens <code>a</code> og <code>b</code> er de to andre sidene i en trekant.
        <br><br>
        <strong>a)</strong> Forklar hva algoritmen undersøker. <br>
        <strong>b)</strong> Gi eksempler på tallverdier for <em>a</em>, <em>b</em> og <em>c</em> som gir Output_1. <br>
        <strong>c)</strong> Gi eksempler på tallverdier som gir Output_2.
      </div>

      <svg viewBox="0 0 620 760" class="flowchart-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrE" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#9aa0c7"/>
          </marker>
        </defs>
        <ellipse cx="300" cy="30" rx="55" ry="22" fill="#232858" stroke="#ffd166" stroke-width="2"/>
        <text x="300" y="36" text-anchor="middle" fill="#e8ebff" font-size="14" font-weight="600">Start</text>
        <line x1="300" y1="52" x2="300" y2="78" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <polygon points="80,82 520,82 500,128 100,128" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="295" y="111" text-anchor="middle" fill="#e8ebff" font-size="12">c = "Skriv inn lengden til den lengste siden i trekanten"</text>
        <line x1="300" y1="128" x2="300" y2="158" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <polygon points="80,162 520,162 500,208 100,208" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="295" y="191" text-anchor="middle" fill="#e8ebff" font-size="12">a = "Skriv inn lengden til en annen side i trekanten"</text>
        <line x1="300" y1="208" x2="300" y2="238" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <polygon points="80,242 520,242 500,288 100,288" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="295" y="271" text-anchor="middle" fill="#e8ebff" font-size="12">b = "Skriv inn lengden til den siste siden i trekanten"</text>
        <line x1="300" y1="288" x2="300" y2="320" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <polygon points="300,322 450,410 300,498 150,410" fill="#232858" stroke="#ef476f" stroke-width="2"/>
        <text x="300" y="415" text-anchor="middle" fill="#e8ebff" font-size="15" font-family="monospace">a² + b² = c²</text>

        <text x="312" y="518" fill="#06d6a0" font-size="13" font-weight="700">Ja</text>
        <line x1="300" y1="498" x2="300" y2="546" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <text x="455" y="402" fill="#ef476f" font-size="13" font-weight="700">Nei</text>
        <line x1="450" y1="410" x2="525" y2="410" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="525" y1="410" x2="525" y2="546" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <polygon points="195,548 395,548 375,594 175,594" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="285" y="577" text-anchor="middle" fill="#e8ebff" font-size="14" font-weight="600">Output_1:</text>

        <polygon points="440,548 610,548 590,594 420,594" fill="#1c2046" stroke="#06d6a0" stroke-width="2"/>
        <text x="515" y="577" text-anchor="middle" fill="#e8ebff" font-size="14" font-weight="600">Output_2:</text>

        <line x1="285" y1="594" x2="285" y2="640" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="515" y1="594" x2="515" y2="640" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="285" y1="640" x2="515" y2="640" stroke="#9aa0c7" stroke-width="2"/>
        <line x1="400" y1="640" x2="400" y2="688" stroke="#9aa0c7" stroke-width="2" marker-end="url(#arrE)"/>

        <ellipse cx="400" cy="715" rx="55" ry="22" fill="#232858" stroke="#ffd166" stroke-width="2"/>
        <text x="400" y="721" text-anchor="middle" fill="#e8ebff" font-size="14" font-weight="600">Slutt</text>
      </svg>
      <div class="flowchart-caption">Eksamensflytdiagrammet fra UDIR — algoritmen sjekker om en trekant er rettvinklet (Pytagoras' setning).</div>

      <h2>Slik bør du tenke</h2>
      <ul>
        <li>Algoritmen leser inn tre sider (<code>a</code>, <code>b</code>, <code>c</code>) og sjekker om <code>a² + b² = c²</code> — altså om trekanten er <strong>rettvinklet</strong>.</li>
        <li>Hvis ja, skriver den Output_1 (f.eks. "Rettvinklet"). Hvis nei, Output_2 ("Ikke rettvinklet").</li>
        <li>I Python skriver vi sjekken slik: <code>if a**2 + b**2 == c**2:</code></li>
      </ul>

      <p class="lesson-intro">Hver deloppgave nedenfor sjekker svaret ditt automatisk. Lykke til! 🎯</p>
    `,
    exercises: [
      {
        task: "Del a) Programmer algoritmen fra flytdiagrammet. Sett a = 3, b = 4, c = 5. Bruk Output_1 = \"Output_1\" og Output_2 = \"Output_2\". Hva blir utskriften?",
        hint: "if a**2 + b**2 == c**2: print(\"Output_1\") else: print(\"Output_2\")",
        starter: `a = 3\nb = 4\nc = 5\n# Sjekk om a*a + b*b == c*c\n`,
        expectedOutput: "Output_1",
        solution: `a = 3\nb = 4\nc = 5\nif a**2 + b**2 == c**2:\n    print("Output_1")\nelse:\n    print("Output_2")`
      },
      {
        task: "Del b) Test samme algoritme med a = 5, b = 12, c = 13.",
        hint: "25 + 144 = 169. Stemmer det med 13²?",
        starter: `a = 5\nb = 12\nc = 13\n# Samme test\n`,
        expectedOutput: "Output_1",
        solution: `a = 5\nb = 12\nc = 13\nif a**2 + b**2 == c**2:\n    print("Output_1")\nelse:\n    print("Output_2")`
      },
      {
        task: "Del c) Test med a = 8, b = 15, c = 17.",
        hint: "Pytagoreisk trippel.",
        starter: `a = 8\nb = 15\nc = 17\n# Samme test\n`,
        expectedOutput: "Output_1",
        solution: `a = 8\nb = 15\nc = 17\nif a**2 + b**2 == c**2:\n    print("Output_1")\nelse:\n    print("Output_2")`
      },
      {
        task: "Del d) Test med a = 2, b = 3, c = 4 — verdier som ikke gir rettvinklet trekant.",
        hint: "4 + 9 = 13, men 4² = 16. Ikke likt.",
        starter: `a = 2\nb = 3\nc = 4\n# Samme test\n`,
        expectedOutput: "Output_2",
        solution: `a = 2\nb = 3\nc = 4\nif a**2 + b**2 == c**2:\n    print("Output_1")\nelse:\n    print("Output_2")`
      },
      {
        task: "Del e) Test med a = 5, b = 6, c = 7.",
        hint: "Sjekk om 25 + 36 = 49.",
        starter: `a = 5\nb = 6\nc = 7\n# Samme test\n`,
        expectedOutput: "Output_2",
        solution: `a = 5\nb = 6\nc = 7\nif a**2 + b**2 == c**2:\n    print("Output_1")\nelse:\n    print("Output_2")`
      },
      {
        task: "Del f) På eksamen skal du gjerne foreslå hva Output_1 og Output_2 BØR si. Bytt teksten til \"Rettvinklet trekant\" og \"Ikke rettvinklet\". Test med a = 9, b = 12, c = 15.",
        hint: "9² + 12² = 81 + 144 = 225 = 15². Rettvinklet!",
        starter: `a = 9\nb = 12\nc = 15\n# Bruk ny tekst i begge greinene\n`,
        expectedOutput: "Rettvinklet trekant",
        solution: `a = 9\nb = 12\nc = 15\nif a**2 + b**2 == c**2:\n    print("Rettvinklet trekant")\nelse:\n    print("Ikke rettvinklet")`
      },
      {
        task: "Del g) Med samme kode (Rettvinklet/Ikke rettvinklet), test a = 4, b = 5, c = 6.",
        hint: "Ikke en Pytagoreisk trippel.",
        starter: `a = 4\nb = 5\nc = 6\n# Samme tekst som forrige\n`,
        expectedOutput: "Ikke rettvinklet",
        solution: `a = 4\nb = 5\nc = 6\nif a**2 + b**2 == c**2:\n    print("Rettvinklet trekant")\nelse:\n    print("Ikke rettvinklet")`
      },
      {
        task: "Del h) Skriv en ny algoritme som sjekker om trekanten er LIKESIDET (alle tre sider like). Sett a = 5, b = 5, c = 5. Skriv \"Likesidet\" eller \"Ikke likesidet\".",
        hint: "Bruk and: if a == b and b == c: ...",
        starter: `a = 5\nb = 5\nc = 5\n# Likesidet trekant?\n`,
        expectedOutput: "Likesidet",
        solution: `a = 5\nb = 5\nc = 5\nif a == b and b == c:\n    print("Likesidet")\nelse:\n    print("Ikke likesidet")`
      },
      {
        task: "Del i) Skriv en algoritme som sjekker om tre lengder kan danne en trekant: hver side må være mindre enn summen av de andre to. Test med a = 3, b = 4, c = 5. Skriv \"Mulig\" eller \"Ikke mulig\".",
        hint: "if a + b > c and a + c > b and b + c > a: ...",
        starter: `a = 3\nb = 4\nc = 5\n# Mulig trekant?\n`,
        expectedOutput: "Mulig",
        solution: `a = 3\nb = 4\nc = 5\nif a + b > c and a + c > b and b + c > a:\n    print("Mulig")\nelse:\n    print("Ikke mulig")`
      },
      {
        task: "Del j) Test samme trekant-sjekk med a = 1, b = 2, c = 10. Kan dette være en trekant?",
        hint: "1 + 2 = 3. Er 3 > 10?",
        starter: `a = 1\nb = 2\nc = 10\n# Mulig trekant?\n`,
        expectedOutput: "Ikke mulig",
        solution: `a = 1\nb = 2\nc = 10\nif a + b > c and a + c > b and b + c > a:\n    print("Mulig")\nelse:\n    print("Ikke mulig")`
      }
    ]
  }
];
