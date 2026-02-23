<script>
  const keyboard = [
    [
      { label: "`", code: "`" },
      { label: "1", code: "1" },
      { label: "2", code: "2" },
      { label: "3", code: "3" },
      { label: "4", code: "4" },
      { label: "5", code: "5" },
      { label: "6", code: "6" },
      { label: "7", code: "7" },
      { label: "8", code: "8" },
      { label: "9", code: "9" },
      { label: "0", code: "0" },
      { label: "-", code: "-" },
      { label: "=", code: "=" },
      { label: "⌫", code: "Backspace", w: 2 }
    ],
    [
      { label: "Tab", code: "Tab", w: 1.5 },
      ..."QWERTYUIOP".split("").map((k) => ({ label: k, code: k })),
      { label: "[", code: "[" },
      { label: "]", code: "]" },
      { label: "\\", code: "\\" }
    ],
    [
      { label: "Caps", code: "CapsLock", w: 1.75 },
      ..."ASDFGHJKL".split("").map((k) => ({ label: k, code: k })),
      { label: ";", code: ";" },
      { label: "'", code: "'" },
      { label: "Enter", code: "Enter", w: 2.25 }
    ],
    [
      { label: "Shift", code: "Shift", w: 2.25 },
      ..."ZXCVBNM".split("").map((k) => ({ label: k, code: k })),
      { label: ",", code: "," },
      { label: ".", code: "." },
      { label: "/", code: "/" },
      { label: "Shift", code: "Shift", w: 2.75 }
    ],
    [
      { label: "Ctrl", code: "Control", w: 1.5 },
      { label: "Alt", code: "Alt", w: 1.5 },
      { label: "Space", code: " ", w: 6 },
      { label: "Alt", code: "Alt", w: 1.5 },
      { label: "Ctrl", code: "Control", w: 1.5 }
    ]
  ];

  // ---------------- Monkeytype-ish word bank ----------------
  const WORDS = [
    "the","quick","brown","fox","jumps","over","lazy","dog","svelte","kit","tailwind",
    "keyboard","typing","speed","accuracy","focus","practice","layout","press","space",
    "shift","enter","backspace","monkey","type","clean","smooth","neon","dark","vibes",
    "grid","flex","reactive","store","component","route","page","script","style","cursor",
    "rhythm","steady","learn","build","ship","fast","sharp","calm","energy","signal"
  ];

  // ---------------- Modes ----------------
  let mode = "time";         // "time" | "words"
  let modeSeconds = 30;      // time mode duration
  let wordsGoal = 25;        // words mode target

  // ---------------- Test state ----------------
  let targetText = "";
  let input = "";

  let timeLeft = modeSeconds;
  let isRunning = false;
  let isFinished = false;

  /**
	 * @type {number | null}
	 */
  let startedAt = null; // ms
  /**
	 * @type {string | number | NodeJS.Timeout | null | undefined}
	 */
  let timerId = null;

  // keyboard animation state
  let pressed = new Set();

  // wrong-key flash state
  let wrongKeys = new Set();

  // ---------------- Helpers ----------------
  function makeText(wordCount = wordsGoal) {
    const out = [];
    for (let i = 0; i < wordCount; i++) {
      out.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    return out.join(" ");
  }

  /**
	 * @param {string | any[]} typed
	 * @param {string | any[]} target
	 */
  function countErrors(typed, target) {
    let e = 0;
    const n = Math.min(typed.length, target.length);
    for (let i = 0; i < n; i++) if (typed[i] !== target[i]) e++;
    if (typed.length > target.length) e += typed.length - target.length;
    return e;
  }

  /**
	 * @param {{ key: string; }} e
	 */
  function normalizeKey(e) {
    if (e.key === " ") return " ";
    if (e.key.length === 1) return e.key.toUpperCase();
    return e.key; // Backspace, Shift, Enter, etc.
  }

  /**
	 * @param {string} key
	 * @param {boolean} down
	 */
  function updatePressed(key, down) {
    if (down) pressed.add(key);
    else pressed.delete(key);
    pressed = new Set(pressed); // reactivity
  }

  /**
	 * @param {string} key
	 */
  function flashWrong(key) {
    if (!key) return;
    wrongKeys.add(key);
    wrongKeys = new Set(wrongKeys);

    setTimeout(() => {
      wrongKeys.delete(key);
      wrongKeys = new Set(wrongKeys);
    }, 180);
  }

  // ---------------- Stats (reactive) ----------------
  $: cursor = input.length;
  $: errors = countErrors(input, targetText);
  $: correctChars = Math.max(0, input.length - errors);
  $: acc = input.length ? (correctChars / input.length) * 100 : 100;

  $: elapsedMs = startedAt ? Date.now() - startedAt : 0;
  $: elapsedMinutes = Math.max(0.001, elapsedMs / 60000);

  // WPM using correct characters (Monkeytype-like core)
  $: wpm = isRunning || isFinished
    ? Math.max(0, Math.round((correctChars / 5) / elapsedMinutes))
    : 0;

  // ---------------- Init ----------------
  targetText = makeText(wordsGoal);

  // ---------------- Controls ----------------
  function start() {
    if (isRunning || isFinished) return;
    isRunning = true;
    startedAt = Date.now();

    if (mode === "time") {
      timerId = setInterval(() => {
        timeLeft -= 1;
        if (timeLeft <= 0) finish();
      }, 1000);
    }
  }

  function finish() {
    if (timerId) clearInterval(timerId);
    timerId = null;
    isRunning = false;
    isFinished = true;
    if (mode === "time") timeLeft = 0;
  }

  function restart() {
    if (timerId) clearInterval(timerId);
    timerId = null;

    targetText = makeText(mode === "words" ? wordsGoal : 35);
    input = "";

    isRunning = false;
    isFinished = false;
    startedAt = null;

    timeLeft = modeSeconds;
    pressed = new Set();
    wrongKeys = new Set();
  }

  /**
	 * @param {string} nextMode
	 */
  function setMode(nextMode) {
    mode = nextMode;
    restart();
  }

  /**
	 * @param {number} seconds
	 */
  function setTime(seconds) {
    modeSeconds = seconds;
    restart();
  }

  /**
	 * @param {number} n
	 */
  function setWords(n) {
    wordsGoal = n;
    restart();
  }

  // ---------------- Typing engine ----------------
  /**
	 * @param {{ target: any; key: string; ctrlKey: any; metaKey: any; altKey: any; preventDefault: () => void; }} e
	 */
  function handleTyping(e) {
    // don't steal typing from inputs/textareas/contenteditable
    const el = e.target;
    const typingField =
      el instanceof HTMLElement &&
      (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
    if (typingField) return;

    // Restart shortcut
    if (e.key === "Escape") {
      restart();
      return;
    }

    // ignore command combos
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (isFinished) return;

    // start on first meaningful key
    if (!isRunning) {
      if (e.key === "Backspace" || e.key === "Tab" || e.key === "Enter" || e.key === " ") start();
      else if (e.key.length === 1) start();
    }

    if (e.key === "Backspace") {
      input = input.slice(0, -1);
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const expected = targetText[input.length];
      input += "\t";
      if ("\t" !== expected) flashWrong("Tab");
      return;
    }

    if (e.key === "Enter") {
      const expected = targetText[input.length];
      input += "\n";
      if ("\n" !== expected) flashWrong("Enter");
      return;
    }

    if (e.key.length === 1) {
      const expected = targetText[input.length];
      input += e.key;

      if (e.key !== expected) {
        flashWrong(e.key.toUpperCase());
      }
    }

    // words mode: finish when you reach end of target text
    if (mode === "words" && input.length >= targetText.length) {
      finish();
    }
  }

  // @ts-ignore
  function onKeyDown(e) {
    const k = normalizeKey(e);
    if (!e.repeat) updatePressed(k, true);
    handleTyping(e);
  }

  /**
	 * @param {any} e
	 */
  function onKeyUp(e) {
    const k = normalizeKey(e);
    updatePressed(k, false);
  }

  // Click / touch on-screen keyboard
  /**
	 * @param {string} code
	 */
  function pressVirtual(code) {
    if (isFinished) return;

    // start on first click too
    if (!isRunning) start();

    if (code === "Backspace") {
      input = input.slice(0, -1);
      return;
    }

    if (code === "Tab") {
      const expected = targetText[input.length];
      input += "\t";
      if ("\t" !== expected) flashWrong("Tab");
      return;
    }

    if (code === "Enter") {
      const expected = targetText[input.length];
      input += "\n";
      if ("\n" !== expected) flashWrong("Enter");
      return;
    }

    if (code === " ") {
      const expected = targetText[input.length];
      input += " ";
      if (" " !== expected) flashWrong(" ");
      return;
    }

    if (typeof code === "string" && code.length === 1) {
      const expected = targetText[input.length];
      const typed = /[A-Z]/.test(code) ? code.toLowerCase() : code;

      input += typed;

      if (typed !== expected) {
        flashWrong(code); // highlight the key they clicked (A, 1, etc.)
      }
    }

    if (mode === "words" && input.length >= targetText.length) {
      finish();
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} on:keyup={onKeyUp} />

<div class="min-h-screen bg-zinc-950 text-zinc-100 p-6 flex items-center justify-center">
  <div class="w-full max-w-5xl">

    <!-- Mode switch -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-5">
      <div class="flex flex-wrap items-center gap-2">
        <button
          class={`px-4 py-2 rounded-xl transition ${
            mode === "time" ? "bg-yellow-500 text-black" : "bg-zinc-800/70 hover:bg-zinc-800"
          }`}
          on:click={() => setMode("time")}
        >
          time
        </button>
        <button
          class={`px-4 py-2 rounded-xl transition ${
            mode === "words" ? "bg-yellow-500 text-black" : "bg-zinc-800/70 hover:bg-zinc-800"
          }`}
          on:click={() => setMode("words")}
        >
          words
        </button>

        <div class="w-px h-8 bg-zinc-800 mx-1"></div>

        {#if mode === "time"}
          <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={() => setTime(15)}>15s</button>
          <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={() => setTime(30)}>30s</button>
          <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={() => setTime(60)}>60s</button>
        {:else}
          <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={() => setWords(10)}>10w</button>
          <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={() => setWords(25)}>25w</button>
          <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={() => setWords(50)}>50w</button>
        {/if}

        <button class="px-3 py-2 rounded-xl bg-zinc-800/70 hover:bg-zinc-800 transition" on:click={restart}>
          Restart (Esc)
        </button>
      </div>

      <!-- Stats -->
      <div class="flex flex-wrap gap-3 text-sm">
        {#if mode === "time"}
          <div class="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div class="text-zinc-400">Time</div>
            <div class="text-xl font-semibold">{timeLeft}s</div>
          </div>
        {:else}
          <div class="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div class="text-zinc-400">Progress</div>
            <div class="text-xl font-semibold">{Math.min(input.length, targetText.length)}/{targetText.length}</div>
          </div>
        {/if}

        <div class="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div class="text-zinc-400">WPM</div>
          <div class="text-xl font-semibold">{wpm}</div>
        </div>

        <div class="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div class="text-zinc-400">Accuracy</div>
          <div class="text-xl font-semibold">{Math.round(acc)}%</div>
        </div>

        <div class="px-3 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <div class="text-zinc-400">Errors</div>
          <div class="text-xl font-semibold">{errors}</div>
        </div>
      </div>
    </div>

    <!-- Monkeytype-style text area -->
    <div class="w-full select-none mb-10">
      <div class="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl p-7">
        <div class="text-xs text-zinc-500 mb-3">
          {#if !isRunning && !isFinished}
            start typing to begin
          {:else if isFinished}
            finished — press Esc or Restart
          {:else}
            keep going…
          {/if}
        </div>

        <div class="font-mono text-2xl leading-relaxed tracking-wide whitespace-pre-wrap">
          {#each targetText.split("") as ch, i}
            {@const typed = input[i]}
            {@const isTyped = i < input.length}
            {@const isCorrect = isTyped && typed === ch}
            {@const isWrong = isTyped && typed !== ch}

            <span
              class={`relative ${
                isCorrect ? "text-zinc-100" : isWrong ? "text-red-400" : "text-zinc-500"
              }`}
            >
              {ch}
              {#if i === cursor && !isFinished}
                <span class="caret" />
              {/if}
            </span>
          {/each}

          {#if cursor >= targetText.length && !isFinished}
            <span class="caret" />
          {/if}
        </div>
      </div>
    </div>

    <!-- Keyboard -->
    <div class="space-y-3">
      {#each keyboard as row}
        <div class="flex gap-3 justify-center">
          {#each row as key}
            <button
              type="button"
              class={`keycap ${pressed.has(key.code) ? "pressed" : ""} ${wrongKeys.has(key.code) ? "wrong" : ""}`}
              style={`width:${(key.w ?? 1) * 70}px`}
              on:pointerdown={() => {
                updatePressed(key.code, true);
                pressVirtual(key.code);
              }}
              on:pointerup={() => updatePressed(key.code, false)}
              on:pointerleave={() => updatePressed(key.code, false)}
              aria-label={`Key ${key.label}`}
            >
              <span class="letter">{key.label}</span>
            </button>
          {/each}
        </div>
      {/each}
    </div>

  </div>
</div>

<style>
  /* caret */
  .caret {
    position: absolute;
    left: 0;
    top: 0.08em;
    width: 2px;
    height: 1.1em;
    background: rgb(250 204 21); /* yellow-ish */
    animation: caretBlink 1s infinite;
  }
  @keyframes caretBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }

  /* keycaps (plain CSS, no nesting) */
  .keycap {
    position: relative;
    height: 70px;
    border-radius: 12px;
    background: linear-gradient(180deg, #282828, #202020);
    box-shadow:
      inset -8px 0 8px rgba(0,0,0,.15),
      inset 0 -8px 8px rgba(0,0,0,.25),
      0 0 0 2px rgba(0,0,0,.75),
      10px 20px 25px rgba(0,0,0,.4);
    overflow: hidden;
    transition: transform .08s ease, box-shadow .08s ease;
    border: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .letter {
    position: absolute;
    left: 12px;
    top: 10px;
    color: #e9e9e9;
    font-size: 14px;
    transition: transform .08s ease;
    z-index: 1;
    user-select: none;
  }

  .keycap::before {
    content: "";
    position: absolute;
    top: 3px;
    left: 4px;
    bottom: 12px;
    right: 10px;
    border-radius: 12px;
    background: linear-gradient(90deg,#232323,#4a4a4a);
    box-shadow:
      -10px -10px 10px rgba(255,255,255,.18),
      10px 5px 10px rgba(0,0,0,.15);
    transition: all .08s ease;
  }

  /* pressed */
  .keycap.pressed {
    transform: translateY(2px);
    box-shadow:
      inset -4px 0 4px rgba(0,0,0,.1),
      inset 0 -4px 4px rgba(0,0,0,.15),
      0 0 0 2px rgba(0,0,0,.5),
      5px 10px 15px rgba(0,0,0,.3);
  }

  .keycap.pressed::before {
    top: 5px;
    left: 5px;
    bottom: 10px;
    right: 9px;
  }

  .keycap.pressed .letter {
    transform: translateY(1px);
  }

  /* wrong key glow (subtle red) */
  .keycap.wrong {
    box-shadow:
      inset -6px 0 6px rgba(255, 70, 70, 0.18),
      inset 0 -6px 6px rgba(255, 70, 70, 0.28),
      0 0 14px rgba(255, 60, 60, 0.22),
      0 0 0 2px rgba(255, 80, 80, 0.35);
    transition: box-shadow 0.15s ease;
  }

  .keycap.wrong::before {
    background: linear-gradient(90deg, #2a1b1b, #5b2525);
  }
</style>