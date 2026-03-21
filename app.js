const STORAGE_KEY = "sora_json_prompt_history_v1_3";
const API_KEY_STORAGE = "sora_gemini_api_key";
const SAMPLE_SCRIPT_STORAGE = "sora_script_sample_v1";
const SAMPLE_LYRICS_STORAGE = "sora_musicvideo_sample_lyrics_v1";
const STYLE_SAMPLE_STORAGE = "sora_musicvideo_style_samples_v1";
const STYLE_PROMPT_STORAGE = "sora_musicvideo_style_prompts_v1";
const COLUMN_RATIO_STORAGE = "sora_layout_left_col_ratio_v1";
const SCRIPT_FONT_SIZE_STORAGE = "sora_script_font_size_v1";
const SCRIPT_HEIGHT_STORAGE = "sora_script_input_height_v1";
const SCRIPT_HEIGHT_STEPS = [280, 360, 460, 580, 720];
const GLOBAL_FONT_STORAGE = "sora_global_font_v1";
const APP_VERSION = "1.8";
const OPEN_SOURCE_REPO = "redbear7/sora-json-prompt-app";
const OSS_VERSION_CACHE_KEY = "sora_oss_latest_version_cache_v1";
const OSS_VERSION_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const GEMINI_TEXT_MODEL = "gemini-3.0-flash";
const GEMINI_MODEL_STORAGE = "sora_gemini_active_model_v1";
const GEMINI_FALLBACK_MODELS = [
  GEMINI_TEXT_MODEL,
  "gemini-2.5-flash",
  "gemini-2.0-flash"
];
const IMAGE_MODEL_NAME = "nanobanana2";
const volatileStorage = {};
const GOOGLE_KR_FONT_MAP = {
  noto_sans_kr: "\"Noto Sans KR\", \"Pretendard Variable\", \"SUIT\", sans-serif",
  nanum_gothic: "\"Nanum Gothic\", \"Noto Sans KR\", sans-serif",
  nanum_myeongjo: "\"Nanum Myeongjo\", \"Noto Serif KR\", serif",
  do_hyeon: "\"Do Hyeon\", \"Noto Sans KR\", sans-serif",
  jua: "\"Jua\", \"Noto Sans KR\", sans-serif",
  gothic_a1: "\"Gothic A1\", \"Noto Sans KR\", sans-serif",
  ibm_plex_sans_kr: "\"IBM Plex Sans KR\", \"Noto Sans KR\", sans-serif",
  sunflower: "\"Sunflower\", \"Noto Sans KR\", sans-serif",
  hi_melody: "\"Hi Melody\", \"Noto Sans KR\", cursive"
};

const el = {
  appTitle: document.getElementById("appTitle"),
  accessPathInfo: document.getElementById("accessPathInfo"),
  scriptTab: document.getElementById("scriptTab"),
  referenceTab: document.getElementById("referenceTab"),
  musicVideoTab: document.getElementById("musicVideoTab"),
  scriptInputArea: document.getElementById("scriptInputArea"),
  referenceInputArea: document.getElementById("referenceInputArea"),
  musicVideoInputArea: document.getElementById("musicVideoInputArea"),
  scriptInput: document.getElementById("scriptInput"),
  memoInput: document.getElementById("memoInput"),
  soraLinkInput: document.getElementById("soraLinkInput"),
  saveMemoBtn: document.getElementById("saveMemoBtn"),
  memoStatus: document.getElementById("memoStatus"),
  saveSampleScriptBtn: document.getElementById("saveSampleScriptBtn"),
  loadSampleScriptBtn: document.getElementById("loadSampleScriptBtn"),
  scriptFontSizeRange: document.getElementById("scriptFontSizeRange"),
  scriptFontSizeLabel: document.getElementById("scriptFontSizeLabel"),
  scriptHeightRange: document.getElementById("scriptHeightRange"),
  scriptHeightLabel: document.getElementById("scriptHeightLabel"),
  globalFontSelect: document.getElementById("globalFontSelect"),
  sampleScriptStatus: document.getElementById("sampleScriptStatus"),
  musicLyricsInput: document.getElementById("musicLyricsInput"),
  musicSynopsisInput: document.getElementById("musicSynopsisInput"),
  musicStyleSelect: document.getElementById("musicStyleSelect"),
  musicStorySelect: document.getElementById("musicStorySelect"),
  musicStoryCustomInput: document.getElementById("musicStoryCustomInput"),
  musicStyleGallery: document.getElementById("musicStyleGallery"),
  selectedStyleThumb: document.getElementById("selectedStyleThumb"),
  selectedStyleThumbPlaceholder: document.getElementById("selectedStyleThumbPlaceholder"),
  selectedStylePromptInput: document.getElementById("selectedStylePromptInput"),
  uploadStyleThumbBtn: document.getElementById("uploadStyleThumbBtn"),
  saveStylePromptBtn: document.getElementById("saveStylePromptBtn"),
  removeStyleThumbBtn: document.getElementById("removeStyleThumbBtn"),
  saveSampleLyricsBtn: document.getElementById("saveSampleLyricsBtn"),
  loadSampleLyricsBtn: document.getElementById("loadSampleLyricsBtn"),
  referenceFile: document.getElementById("referenceFile"),
  referencePreview: document.getElementById("referencePreview"),
  referencePrompt: document.getElementById("referencePrompt"),
  kfStyleInput: document.getElementById("kfStyleInput"),
  charCount: document.getElementById("charCount"),
  lyricsLineCount: document.getElementById("lyricsLineCount"),
  lyricsKfCount: document.getElementById("lyricsKfCount"),
  runtimeLockHint: document.getElementById("runtimeLockHint"),
  runtimeSelect: document.getElementById("runtimeSelect"),
  bgmToggle: document.getElementById("bgmToggle"),
  vfxToggle: document.getElementById("vfxToggle"),
  sfxToggle: document.getElementById("sfxToggle"),
  keyframesToggle: document.getElementById("keyframesToggle"),
  contactSheetToggle: document.getElementById("contactSheetToggle"),
  generateBtn: document.getElementById("generateBtn"),
  generateMusicKfBtn: document.getElementById("generateMusicKfBtn"),
  generateMusicJsonBtn: document.getElementById("generateMusicJsonBtn"),
  progressPanel: document.getElementById("progressPanel"),
  statusMessage: document.getElementById("statusMessage"),
  progressBar: document.getElementById("progressBar"),
  terminalLog: document.getElementById("terminalLog"),
  resultSection: document.getElementById("resultSection"),
  mvSynopsisPanel: document.getElementById("mvSynopsisPanel"),
  mvSynopsisText: document.getElementById("mvSynopsisText"),
  liveScriptEditor: document.getElementById("liveScriptEditor"),
  keyframePanel: document.getElementById("keyframePanel"),
  jsonPanel: document.getElementById("jsonPanel"),
  kframeMeta: document.getElementById("kframeMeta"),
  keyframeList: document.getElementById("keyframeList"),
  copyJsonBtn: document.getElementById("copyJsonBtn"),
  copyJsonBtnInline: document.getElementById("copyJsonBtnInline"),
  copyAllKfPromptsBtn: document.getElementById("copyAllKfPromptsBtn"),
  jsonOutput: document.getElementById("jsonOutput"),
  historyList: document.getElementById("historyList"),
  appTwoCol: document.getElementById("appTwoCol"),
  historyPanel: document.getElementById("historyPanel"),
  colResizer: document.getElementById("colResizer"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  geminiLamp: document.getElementById("geminiLamp"),
  geminiStatusText: document.getElementById("geminiStatusText"),
  modelNamesText: document.getElementById("modelNamesText"),
  saveApiKeyBtn: document.getElementById("saveApiKeyBtn")
};

const appState = {
  inputMode: "script",
  lastResult: null,
  isGenerating: false,
  scriptCollapsed: false,
  referenceImageDataUrl: "",
  referenceImagePrompt: "",
  tabStates: createInitialTabStates(),
  styleSampleImages: loadStyleSampleImages(),
  styleSamplePrompts: loadStyleSamplePrompts(),
  sampleScriptMemory: safeStorageGet(SAMPLE_SCRIPT_STORAGE) || "",
  leftColRatio: loadColumnRatio(),
  scriptFontSize: loadScriptFontSize(),
  scriptInputHeight: loadScriptInputHeight(),
  globalFontKey: loadGlobalFontKey(),
  activeGeminiModel: loadGeminiActiveModel(),
  terminalLogs: [],
  lastGeminiStatusText: ""
};

function safeStorageGet(key) {
  let value = null;
  try {
    value = localStorage.getItem(key);
    if (value !== null) return value;
  } catch (_e) {
    // Ignore and fallback.
  }
  try {
    value = sessionStorage.getItem(key);
    if (value !== null) return value;
  } catch (_e) {
    // Ignore and fallback.
  }
  if (Object.prototype.hasOwnProperty.call(volatileStorage, key)) {
    return volatileStorage[key];
  }
  return null;
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (_e) {
    // Ignore and fallback.
  }
  try {
    sessionStorage.setItem(key, value);
    return true;
  } catch (_e) {
    // Ignore and fallback.
  }
  volatileStorage[key] = String(value ?? "");
  return true;
}

function loadColumnRatio() {
  const raw = Number(safeStorageGet(COLUMN_RATIO_STORAGE));
  if (Number.isFinite(raw) && raw >= 18 && raw <= 55) return raw;
  return 28;
}

function saveColumnRatio(value) {
  appState.leftColRatio = Math.max(18, Math.min(55, Number(value) || 28));
  safeStorageSet(COLUMN_RATIO_STORAGE, String(appState.leftColRatio));
}

function applyColumnRatio(value, persist = true) {
  const ratio = Math.max(18, Math.min(55, Number(value) || 28));
  document.documentElement.style.setProperty("--left-col-pct", `${ratio}%`);
  if (persist) saveColumnRatio(ratio);
}

function setupColumnResizer() {
  if (!el.colResizer || !el.appTwoCol) return;
  let dragging = false;
  let startX = 0;
  let startRatio = appState.leftColRatio || 28;

  const onMove = (event) => {
    if (!dragging) return;
    const rect = el.appTwoCol.getBoundingClientRect();
    const deltaX = event.clientX - startX;
    const deltaRatio = (deltaX / Math.max(rect.width, 1)) * 100;
    applyColumnRatio(startRatio + deltaRatio, false);
  };

  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    saveColumnRatio(appState.leftColRatio);
    document.body.style.cursor = "";
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };

  el.colResizer.addEventListener("mousedown", (event) => {
    if (window.matchMedia("(max-width: 900px)").matches) return;
    dragging = true;
    startX = event.clientX;
    startRatio = appState.leftColRatio || 28;
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  });
}

function loadScriptFontSize() {
  const raw = Number(safeStorageGet(SCRIPT_FONT_SIZE_STORAGE));
  if (Number.isFinite(raw) && raw >= 12 && raw <= 28) return raw;
  return 16;
}

function loadScriptInputHeight() {
  const raw = Number(safeStorageGet(SCRIPT_HEIGHT_STORAGE));
  if (Number.isFinite(raw)) {
    // New format: 1..5 step index
    if (raw >= 1 && raw <= SCRIPT_HEIGHT_STEPS.length) return Math.round(raw);
    // Legacy format: pixel value
    if (raw >= 220 && raw <= 1000) {
      let nearest = 1;
      let minDiff = Number.POSITIVE_INFINITY;
      SCRIPT_HEIGHT_STEPS.forEach((px, idx) => {
        const diff = Math.abs(px - raw);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = idx + 1;
        }
      });
      return nearest;
    }
  }
  return 2;
}

function loadGlobalFontKey() {
  const raw = String(safeStorageGet(GLOBAL_FONT_STORAGE) || "").trim();
  if (raw && GOOGLE_KR_FONT_MAP[raw]) return raw;
  return "noto_sans_kr";
}

function loadGeminiActiveModel() {
  const raw = String(safeStorageGet(GEMINI_MODEL_STORAGE) || "").trim();
  if (!raw) return "";
  return raw;
}

function saveGeminiActiveModel(modelName) {
  const value = String(modelName || "").trim();
  appState.activeGeminiModel = value;
  safeStorageSet(GEMINI_MODEL_STORAGE, value);
}

function applyScriptFontSize(size, persist = true) {
  const px = Math.max(12, Math.min(28, Number(size) || 16));
  if (el.scriptInput) el.scriptInput.style.fontSize = `${px}px`;
  if (el.liveScriptEditor) el.liveScriptEditor.style.fontSize = `${px}px`;
  if (el.scriptFontSizeRange) el.scriptFontSizeRange.value = String(px);
  if (el.scriptFontSizeLabel) el.scriptFontSizeLabel.textContent = `${px}px`;
  appState.scriptFontSize = px;
  if (persist) safeStorageSet(SCRIPT_FONT_SIZE_STORAGE, String(px));
}

function applyScriptInputHeight(step, persist = true) {
  const numeric = Number(step);
  const level = Math.max(1, Math.min(SCRIPT_HEIGHT_STEPS.length, Number.isFinite(numeric) ? Math.round(numeric) : 2));
  const px = SCRIPT_HEIGHT_STEPS[level - 1];
  if (el.scriptInput) el.scriptInput.style.height = `${px}px`;
  if (el.scriptHeightRange) el.scriptHeightRange.value = String(level);
  if (el.scriptHeightLabel) el.scriptHeightLabel.textContent = `${px}px (${level}/5)`;
  appState.scriptInputHeight = level;
  if (persist) safeStorageSet(SCRIPT_HEIGHT_STORAGE, String(level));
}

function applyGlobalFont(fontKey, persist = true) {
  const key = GOOGLE_KR_FONT_MAP[fontKey] ? fontKey : "noto_sans_kr";
  const family = GOOGLE_KR_FONT_MAP[key];
  document.documentElement.style.setProperty("--app-font-family", family);
  if (document.body) {
    document.body.style.fontFamily = family;
  }
  appState.globalFontKey = key;
  if (el.globalFontSelect) el.globalFontSelect.value = key;
  if (persist) safeStorageSet(GLOBAL_FONT_STORAGE, key);
}

function appendTerminalLog(level, message) {
  if (!el.terminalLog) return;
  const lv = String(level || "INFO").toUpperCase();
  const msg = String(message || "").trim();
  if (!msg) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const line = `[${hh}:${mm}:${ss}] [${lv}] ${msg}`;
  appState.terminalLogs.push(line);
  if (appState.terminalLogs.length > 120) {
    appState.terminalLogs = appState.terminalLogs.slice(-120);
  }
  el.terminalLog.textContent = appState.terminalLogs.join("\n");
  el.terminalLog.scrollTop = el.terminalLog.scrollHeight;
}

function setStatusMessage(message, { level = "INFO", resetProgress = false } = {}) {
  const text = String(message || "");
  if (el.statusMessage) el.statusMessage.textContent = text;
  if (resetProgress && el.progressBar) el.progressBar.style.width = "0%";
  appendTerminalLog(level, text);
}

function parseVersionParts(versionRaw) {
  const clean = String(versionRaw || "").trim().replace(/^v/i, "");
  const parts = clean.split(".").map((p) => Number(p.replace(/[^\d]/g, ""))).filter((n) => Number.isFinite(n));
  if (!parts.length) return [0];
  return parts;
}

function compareVersions(aRaw, bRaw) {
  const a = parseVersionParts(aRaw);
  const b = parseVersionParts(bRaw);
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i += 1) {
    const av = a[i] || 0;
    const bv = b[i] || 0;
    if (av > bv) return 1;
    if (av < bv) return -1;
  }
  return 0;
}

async function fetchLatestOpenSourceVersion() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const releaseRes = await fetch(`https://api.github.com/repos/${OPEN_SOURCE_REPO}/releases/latest`, {
      signal: controller.signal
    });
    if (releaseRes.ok) {
      const releaseJson = await releaseRes.json();
      const tagName = String(releaseJson?.tag_name || "").trim();
      if (tagName) return tagName;
    }

    const tagsRes = await fetch(`https://api.github.com/repos/${OPEN_SOURCE_REPO}/tags?per_page=1`, {
      signal: controller.signal
    });
    if (!tagsRes.ok) return "";
    const tagsJson = await tagsRes.json();
    const firstTag = Array.isArray(tagsJson) ? tagsJson[0] : null;
    return String(firstTag?.name || "").trim();
  } catch (_e) {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

function loadOssVersionCache() {
  try {
    const raw = safeStorageGet(OSS_VERSION_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const version = String(parsed.version || "").trim();
    const checkedAt = Number(parsed.checkedAt || 0);
    if (!version || !Number.isFinite(checkedAt)) return null;
    return { version, checkedAt };
  } catch (_e) {
    return null;
  }
}

function saveOssVersionCache(version) {
  const payload = {
    version: String(version || "").trim(),
    checkedAt: Date.now()
  };
  safeStorageSet(OSS_VERSION_CACHE_KEY, JSON.stringify(payload));
}

async function checkOpenSourceLatestVersion() {
  if (!isLocalExecution()) return;
  const cached = loadOssVersionCache();
  if (cached && Date.now() - cached.checkedAt <= OSS_VERSION_CACHE_TTL_MS) {
    const cmpCached = compareVersions(APP_VERSION, cached.version);
    if (cmpCached < 0) {
      appendTerminalLog("WARN", `업데이트 가능(캐시): 현재 v${APP_VERSION} / 최신 ${cached.version}`);
    } else {
      appendTerminalLog("INFO", `최신 버전 확인(캐시): v${APP_VERSION}`);
    }
    return;
  }

  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    appendTerminalLog("INFO", "오프라인 상태로 최신 버전 확인을 건너뜀");
    return;
  }

  appendTerminalLog("INFO", `오픈소스 최신 버전 확인 중... (${OPEN_SOURCE_REPO})`);
  const latest = await fetchLatestOpenSourceVersion();
  if (!latest) {
    appendTerminalLog("INFO", "최신 버전 확인 실패 (네트워크/레이트리밋 가능)");
    return;
  }
  saveOssVersionCache(latest);
  const cmp = compareVersions(APP_VERSION, latest);
  if (cmp < 0) {
    appendTerminalLog("WARN", `업데이트 가능: 현재 v${APP_VERSION} / 최신 ${latest}`);
    return;
  }
  appendTerminalLog("OK", `최신 버전 사용 중: v${APP_VERSION} (원격 ${latest})`);
}

window.addEventListener("error", (event) => {
  setStatusMessage(`오류: ${event.message || "알 수 없는 오류"}`, { level: "ERROR" });
  appState.isGenerating = false;
  if (el.generateBtn) el.generateBtn.disabled = false;
});

window.addEventListener("unhandledrejection", (event) => {
  const message = event?.reason?.message || String(event?.reason || "알 수 없는 오류");
  setStatusMessage(`오류: ${message}`, { level: "ERROR" });
  appState.isGenerating = false;
  if (el.generateBtn) el.generateBtn.disabled = false;
});

function init() {
  try {
    if (el.scriptTab) el.scriptTab.addEventListener("click", resetToIdleMode);
    if (el.referenceTab) el.referenceTab.addEventListener("click", () => onTabClick("reference"));
    if (el.appTitle) el.appTitle.addEventListener("click", resetToIdleMode);
    window.addEventListener("keydown", onGlobalShortcut);
    if (el.scriptInput) {
      el.scriptInput.addEventListener("input", () => {
        sanitizeScriptInputInPlace();
        updateScriptMetrics();
      });
      el.scriptInput.addEventListener("focus", expandScriptInputPreserveViewport);
    }
    if (el.memoInput) {
      el.memoInput.addEventListener("input", saveCurrentTabState);
    }
    if (el.soraLinkInput) {
      el.soraLinkInput.addEventListener("input", saveCurrentTabState);
    }
    if (el.saveMemoBtn) {
      el.saveMemoBtn.addEventListener("click", onSaveMemoToHistory);
    }
    if (el.scriptFontSizeRange) {
      el.scriptFontSizeRange.addEventListener("input", () => {
        applyScriptFontSize(Number(el.scriptFontSizeRange.value || 16), true);
      });
    }
    if (el.scriptHeightRange) {
      el.scriptHeightRange.addEventListener("input", () => {
        applyScriptInputHeight(Number(el.scriptHeightRange.value || 2), true);
      });
    }
    if (el.globalFontSelect) {
      el.globalFontSelect.addEventListener("change", () => {
        applyGlobalFont(el.globalFontSelect.value, true);
      });
    }
    if (el.saveSampleScriptBtn) el.saveSampleScriptBtn.addEventListener("click", saveSampleScript);
    if (el.loadSampleScriptBtn) el.loadSampleScriptBtn.addEventListener("click", loadSampleScript);
    if (el.musicLyricsInput) el.musicLyricsInput.addEventListener("input", updateScriptMetrics);
    if (el.musicSynopsisInput) el.musicSynopsisInput.addEventListener("input", saveCurrentTabState);
    if (el.musicStyleSelect) {
      el.musicStyleSelect.addEventListener("change", () => {
        syncMusicStyleGallerySelection();
        renderSelectedStyleThumbnail();
        saveCurrentTabState();
      });
    }
    if (el.selectedStylePromptInput) {
      el.selectedStylePromptInput.addEventListener("blur", saveSelectedStylePrompt);
    }
    if (el.musicStorySelect) {
      el.musicStorySelect.addEventListener("change", () => {
        toggleMusicStoryCustomInput();
        updateScriptMetrics();
        saveCurrentTabState();
      });
    }
    if (el.musicStoryCustomInput) {
      el.musicStoryCustomInput.addEventListener("input", () => {
        saveCurrentTabState();
      });
    }
    if (el.uploadStyleThumbBtn) {
      el.uploadStyleThumbBtn.addEventListener("click", onUploadSelectedStyleThumb);
    }
    if (el.saveStylePromptBtn) {
      el.saveStylePromptBtn.addEventListener("click", () => {
        saveSelectedStylePrompt();
        flashButtonCopied(el.saveStylePromptBtn, "선택 스타일 프롬프트 저장");
      });
    }
    if (el.removeStyleThumbBtn) {
      el.removeStyleThumbBtn.addEventListener("click", onRemoveSelectedStyleThumb);
    }
    if (el.saveSampleLyricsBtn) el.saveSampleLyricsBtn.addEventListener("click", saveSampleLyrics);
    if (el.loadSampleLyricsBtn) el.loadSampleLyricsBtn.addEventListener("click", loadSampleLyrics);
    if (el.generateBtn) el.generateBtn.addEventListener("click", onGenerate);
    if (el.generateMusicKfBtn) el.generateMusicKfBtn.addEventListener("click", onGenerateMusicKf);
    if (el.generateMusicJsonBtn) el.generateMusicJsonBtn.addEventListener("click", onGenerateMusicJson);
    if (el.copyJsonBtn) el.copyJsonBtn.addEventListener("click", onCopyJson);
    if (el.copyJsonBtnInline) el.copyJsonBtnInline.addEventListener("click", onCopyJson);
    if (el.copyAllKfPromptsBtn) el.copyAllKfPromptsBtn.addEventListener("click", onCopyAllKfPrompts);
    if (el.referenceFile) el.referenceFile.addEventListener("change", onReferenceFileChange);
    if (el.saveApiKeyBtn) {
      el.saveApiKeyBtn.addEventListener("click", () => {
        void saveApiKey();
      });
    }
    if (el.liveScriptEditor) {
      el.liveScriptEditor.addEventListener("input", () => {
        autoGrowTextarea();
        syncLiveScriptEditorToJson();
      });
    }
    setupColumnResizer();
    const savedKey = safeStorageGet(API_KEY_STORAGE);
    if (savedKey && el.apiKeyInput) el.apiKeyInput.value = savedKey;
    renderCurrentGeminiModelLabel();
    renderAccessPathInfo();

    setInputMode("script");
    updateScriptMetrics();
    autoGrowScriptInput();
    updateSampleScriptButtons();
    updateSampleLyricsButtons();
    updateSampleScriptButtons();
    renderMusicStyleGallery();
    syncMusicStyleGallerySelection();
    renderSelectedStyleThumbnail();
    toggleMusicStoryCustomInput();
    applyColumnRatio(appState.leftColRatio, false);
    applyScriptFontSize(appState.scriptFontSize, false);
    applyScriptInputHeight(appState.scriptInputHeight, false);
    applyGlobalFont(appState.globalFontKey, false);
    notifyGenerateBlocked("대기 중");
    appendTerminalLog("INFO", "앱 초기화 완료");
  } catch (e) {
    notifyGenerateBlocked(`초기화 오류: ${e?.message || "알 수 없음"}`);
  } finally {
    // Keep history panel visible even if another UI initializer fails.
    try {
      renderHistory();
    } catch (_e) {
      if (el.historyList) {
        el.historyList.innerHTML = "<p>히스토리 표시 중 오류가 발생했습니다.</p>";
      }
    }
  }
}

function onGlobalShortcut(event) {
  if (!event) return;
  if (event.ctrlKey && !event.metaKey && !event.altKey && String(event.key || "") === "1") {
    event.preventDefault();
    resetToIdleMode();
    appendTerminalLog("INFO", "단축키 실행 | Script 초기화 (Ctrl+1)");
  }
}

function setInputMode(mode) {
  appState.inputMode = mode;
  const isScript = mode === "script";
  const isReference = mode === "reference";
  const isMusicVideo = mode === "musicvideo";

  if (el.scriptTab) el.scriptTab.classList.toggle("active", isScript);
  if (el.referenceTab) el.referenceTab.classList.toggle("active", isReference);
  if (el.musicVideoTab) el.musicVideoTab.classList.toggle("active", isMusicVideo);
  el.scriptInputArea.classList.toggle("hidden", !isScript);
  el.referenceInputArea.classList.toggle("hidden", !isReference);
  if (el.musicVideoInputArea) el.musicVideoInputArea.classList.toggle("hidden", !isMusicVideo);

  // Script mode always uses Sora2 15s runtime.
  if (isScript) {
    el.runtimeSelect.value = "15s";
    el.runtimeSelect.disabled = true;
    el.runtimeLockHint.textContent = "15s (자동 고정)";
    setScriptInputCollapsed(false);
  } else if (isMusicVideo) {
    el.runtimeSelect.disabled = false;
    el.runtimeLockHint.textContent = "뮤직비디오 기본: Director's Cut (KF당 6초)";
    setScriptInputCollapsed(false);
  } else {
    el.runtimeSelect.disabled = false;
    el.runtimeLockHint.textContent = "Reference 기본: Director's Cut (KF당 6초)";
    setScriptInputCollapsed(false);
  }
  if (el.generateMusicKfBtn) el.generateMusicKfBtn.classList.toggle("hidden", !isMusicVideo);
  if (el.generateMusicJsonBtn) el.generateMusicJsonBtn.classList.toggle("hidden", !isMusicVideo);
}

function onTabClick(mode) {
  if (mode === appState.inputMode) return;
  saveCurrentTabState();
  setInputMode(mode);
  loadTabState(mode);
  if (
    mode === "reference" &&
    el.referenceFile &&
    !appState.referenceImageDataUrl &&
    !(el.referencePrompt?.value || "").trim()
  ) {
    el.referenceFile.click();
  }
}

function updateScriptMetrics() {
  const text = el.scriptInput.value || "";
  const charCount = text.replace(/\s+/g, "").length;
  el.charCount.textContent = String(charCount);

  if (el.musicLyricsInput && el.lyricsLineCount && el.lyricsKfCount) {
    const mv = analyzeMusicLyrics(el.musicLyricsInput.value || "");
    el.lyricsLineCount.textContent = String(mv.lineCount);
    el.lyricsKfCount.textContent = String(mv.kfCount);
  }
}

function analyzeScript(text) {
  const segments = splitScriptSegments(text);
  const estimatedContentSec = Number(
    segments.reduce((sum, seg) => sum + estimateSegmentSeconds(seg), 0).toFixed(2)
  );

  // Script 모드 규칙: KF 수 = ACTOR로 시작하는 유효 라인 수
  const kfCount = segments.length;

  return { segments, estimatedContentSec, kfCount };
}

function analyzeMusicLyrics(text, forcedStoryOption = "", forcedStoryCustom = "") {
  const storyOption = String(forcedStoryOption || el.musicStorySelect?.value || "1").trim();
  const storyCustom = String(forcedStoryCustom || el.musicStoryCustomInput?.value || "").trim();
  const storyConfig = getMusicStoryConfig(storyOption, storyCustom);
  const displayLyrics = String(text || "").replace(/\r\n/g, "\n").trim();
  const { lyricLines, commentLines } = normalizeLyricsLines(text || "");

  const pairs = [];
  for (let i = 0; i < lyricLines.length; i += 2) {
    const line1 = lyricLines[i] || "";
    const line2 = lyricLines[i + 1] || "";
    const merged = [line1, line2].filter(Boolean).join(" / ");
    if (!merged) continue;
    const actorPack = getMusicLyricActorPack(storyConfig, line1, line2, Math.floor(i / 2));
    pairs.push({
      raw: merged,
      type: "lyric_pair",
      actor_id: actorPack.actorIds[0] || "",
      actor_profile: actorPack.actorProfiles[0] || null,
      actor_ids: actorPack.actorIds,
      actor_profiles: actorPack.actorProfiles,
      lyric_line_1: line1,
      lyric_line_2: line2,
      story_option: storyConfig.option,
      story_label_ko: storyConfig.labelKo
    });
  }

  const introSegments = createMusicExtraSegments("intro", 2, storyConfig);
  const preludeSegments = createMusicExtraSegments("prelude", 2, storyConfig);
  const endingSegments = createMusicExtraSegments("ending", 2, storyConfig);
  const sequenceSegments = [...introSegments, ...preludeSegments, ...pairs, ...endingSegments];
  const kfCount = sequenceSegments.length;
  const fullText = lyricLines.join(" ");
  const moodKo = inferLyricsMood(fullText);
  const themeKo = inferLyricsTheme(fullText);

  return {
    lines: lyricLines,
    lineCount: lyricLines.length,
    commentLines,
    pairs,
    introCount: introSegments.length,
    preludeCount: preludeSegments.length,
    endingCount: endingSegments.length,
    lyricKfCount: pairs.length,
    sequenceSegments,
    kfCount,
    moodKo,
    themeKo,
    normalizedLyrics: lyricLines.join("\n"),
    displayLyrics,
    storyOption: storyConfig.option,
    storyLabelKo: storyConfig.labelKo,
    storyCustomKo: storyConfig.customKo,
    storyHintEn: storyConfig.hintEn
  };
}

async function onGenerate() {
  if (appState.isGenerating) return;
  saveSelectedStylePrompt();

  const inputMode = appState.inputMode;
  let scriptText = sanitizeScriptNoise(String(el.scriptInput.value || "")).trim();
  const memoText = (el.memoInput?.value || "").trim();
  const soraLinkText = (el.soraLinkInput?.value || "").trim();
  const musicLyricsText = (el.musicLyricsInput?.value || "").trim();
  const musicSynopsisInputText = (el.musicSynopsisInput?.value || "").trim();
  const musicStyleKey = (el.musicStyleSelect?.value || "ja_anime_cinematic").trim();
  const musicStoryOption = (el.musicStorySelect?.value || "1").trim();
  const musicStoryCustom = (el.musicStoryCustomInput?.value || "").trim();
  const musicStylePreset = getMusicStylePreset(musicStyleKey);
  const referenceImageDataUrl = appState.referenceImageDataUrl;
  const kfStyleNote = (el.kfStyleInput?.value || "").trim();

  if (inputMode === "script" && !scriptText) {
    notifyGenerateBlocked("Script 모드에서는 대본 입력이 필요합니다.");
    return;
  }

  if (inputMode === "reference" && !referenceImageDataUrl) {
    notifyGenerateBlocked("Reference 모드에서는 이미지 파일 업로드가 필요합니다.");
    return;
  }

  if (inputMode === "musicvideo" && !musicLyricsText) {
    notifyGenerateBlocked("뮤직비디오 모드에서는 노래 가사 입력이 필요합니다.");
    return;
  }
  if (inputMode === "musicvideo" && Array.from(musicSynopsisInputText).length >= 300) {
    notifyGenerateBlocked("시놉시스는 300자 미만으로 입력하세요.");
    return;
  }
  if (inputMode === "musicvideo" && musicStoryOption === "0" && !musicStoryCustom) {
    notifyGenerateBlocked("스토리 옵션이 직접 입력(0)일 때는 스토리 내용을 입력하세요.");
    return;
  }

  if (inputMode === "musicvideo") {
    const musicAnalysis = analyzeMusicLyrics(musicLyricsText, musicStoryOption, musicStoryCustom);
    let synopsis = musicSynopsisInputText;
    if (!synopsis) {
      synopsis = await generateMusicSynopsisWithGemini(
        musicAnalysis,
        getMusicStylePreset(musicStyleKey).label
      ) || buildMusicVideoSynopsis(musicAnalysis, getMusicStylePreset(musicStyleKey).label);
      if (el.musicSynopsisInput) el.musicSynopsisInput.value = synopsis;
    }
    renderMusicSynopsisOnly(synopsis, musicAnalysis.displayLyrics || musicLyricsText);
    saveCurrentTabState();
    notifyGenerateBlocked("시놉시스 생성 완료. KF/JSON은 전용 생성 버튼으로 생성하세요.");
    return;
  }

  const ratio = "9:16";
  const runtime = inputMode === "script" ? "15s" : el.runtimeSelect.value;
  const scriptAnalysis = analyzeScript(scriptText);
  const musicAnalysis = analyzeMusicLyrics(musicLyricsText, musicStoryOption, musicStoryCustom);
  const kfCount = inputMode === "script" ? scriptAnalysis.kfCount : inputMode === "musicvideo" ? musicAnalysis.kfCount : 12;
  let referenceImagePrompt = "";

  if (inputMode === "script" && kfCount === 0) {
    notifyGenerateBlocked("ACTOR로 시작하는 대사/지문 라인을 1줄 이상 입력하세요.");
    return;
  }

  const settings = {
    ratio,
    runtime,
    effects: {
      bgm: el.bgmToggle.checked,
      vfx: el.vfxToggle.checked,
      sfx: el.sfxToggle.checked
    },
    generate_keyframes: !!el.keyframesToggle?.checked,
    generate_contact_sheet: el.contactSheetToggle.checked
  };

  if (inputMode === "script") {
    setScriptInputCollapsed(false);
  }

  appState.isGenerating = true;
  el.generateBtn.disabled = true;
  appendTerminalLog("INFO", `생성 시작 | mode=${inputMode} | runtime=${runtime} | KF=${kfCount}`);

  try {
    el.progressBar.style.width = "0%";
    await simulateProgress(settings.generate_contact_sheet, settings.generate_keyframes);
    if (inputMode === "reference") {
      referenceImagePrompt = await refreshReferencePrompt();
    }

    const result = buildResult({
      inputMode,
      scriptText,
      memoText,
      soraLinkText,
      musicLyricsText,
      musicStyleKey,
      musicStyleLabel: musicStylePreset.label,
      musicStoryOption,
      musicStoryCustom,
      musicSynopsisInputText,
      referenceImageDataUrl,
      referenceImagePrompt,
      kfStyleNote,
      settings,
      kfCount,
      scriptAnalysis,
      musicAnalysis
    });
    setStatusMessage("JSON 출력 중...", { level: "STEP" });
    const enriched = await maybeEnhanceResultTextWithGemini(result);
    appState.lastResult = enriched;

    renderResult(enriched, { showKf: settings.generate_keyframes });
    saveHistory(enriched);
    saveCurrentTabState();
    renderHistory();
    try {
      await copyJsonToClipboard(enriched, { logSource: "자동 복사" });
    } catch (_e) {
      appendTerminalLog("WARN", "자동 복사 실패 | 브라우저 클립보드 권한 확인 필요");
    }
    setStatusMessage("생성 완료", { level: "OK" });
    appendTerminalLog("OK", `생성 완료 | project=${enriched?.meta?.project_id || "-"}`);
  } catch (e) {
    const message = e?.message || "알 수 없는 생성 오류";
    notifyGenerateBlocked(`생성 오류: ${message}`);
  } finally {
    appState.isGenerating = false;
    el.generateBtn.disabled = false;
  }
}

async function onGenerateMusicKf() {
  await generateMusicVideoCode({ generateKf: true, generateJson: false });
}

async function onGenerateMusicJson() {
  await generateMusicVideoCode({ generateKf: false, generateJson: true });
}

async function generateMusicVideoCode({ generateKf, generateJson }) {
  if (appState.inputMode !== "musicvideo") {
    notifyGenerateBlocked("뮤직비디오 탭에서만 사용 가능합니다.");
    return;
  }
  if (appState.isGenerating) return;
  saveSelectedStylePrompt();

  const musicLyricsText = (el.musicLyricsInput?.value || "").trim();
  const musicSynopsisInputText = (el.musicSynopsisInput?.value || "").trim();
  const musicStyleKey = (el.musicStyleSelect?.value || "ja_anime_cinematic").trim();
  const musicStylePreset = getMusicStylePreset(musicStyleKey);
  const musicStoryOption = (el.musicStorySelect?.value || "1").trim();
  const musicStoryCustom = (el.musicStoryCustomInput?.value || "").trim();
  const kfStyleNote = (el.kfStyleInput?.value || "").trim();
  const memoText = (el.memoInput?.value || "").trim();
  const soraLinkText = (el.soraLinkInput?.value || "").trim();
  const runtime = el.runtimeSelect.value;

  if (!musicLyricsText) {
    notifyGenerateBlocked("뮤직비디오 모드에서는 노래 가사 입력이 필요합니다.");
    return;
  }
  if (Array.from(musicSynopsisInputText).length >= 300) {
    notifyGenerateBlocked("시놉시스는 300자 미만으로 입력하세요.");
    return;
  }
  if (musicStoryOption === "0" && !musicStoryCustom) {
    notifyGenerateBlocked("스토리 옵션이 직접 입력(0)일 때는 스토리 내용을 입력하세요.");
    return;
  }

  const settings = {
    ratio: "9:16",
    runtime,
    effects: {
      bgm: el.bgmToggle.checked,
      vfx: el.vfxToggle.checked,
      sfx: el.sfxToggle.checked
    },
    generate_keyframes: !!el.keyframesToggle?.checked,
    generate_contact_sheet: el.contactSheetToggle.checked
  };

  const scriptAnalysis = analyzeScript("");
  const musicAnalysis = analyzeMusicLyrics(musicLyricsText, musicStoryOption, musicStoryCustom);
  const kfCount = musicAnalysis.kfCount;
  const synopsisFinal = musicSynopsisInputText
    || await generateMusicSynopsisWithGemini(musicAnalysis, musicStylePreset.label)
    || buildMusicVideoSynopsis(musicAnalysis, musicStylePreset.label);
  if (el.musicSynopsisInput && !musicSynopsisInputText) el.musicSynopsisInput.value = synopsisFinal;

  appState.isGenerating = true;
  if (el.generateMusicKfBtn) el.generateMusicKfBtn.disabled = true;
  if (el.generateMusicJsonBtn) el.generateMusicJsonBtn.disabled = true;
  appendTerminalLog("INFO", `뮤직비디오 생성 시작 | KF=${generateKf ? "on" : "off"} | JSON=${generateJson ? "on" : "off"}`);
  try {
    el.progressBar.style.width = "0%";
    await simulateProgress(settings.generate_contact_sheet, settings.generate_keyframes);
    const result = buildResult({
      inputMode: "musicvideo",
      scriptText: "",
      memoText,
      soraLinkText,
      musicLyricsText,
      musicStyleKey,
      musicStyleLabel: musicStylePreset.label,
      musicStoryOption,
      musicStoryCustom,
      musicSynopsisInputText: synopsisFinal,
      referenceImageDataUrl: "",
      referenceImagePrompt: "",
      kfStyleNote,
      settings,
      kfCount,
      scriptAnalysis,
      musicAnalysis
    });
    setStatusMessage("JSON 출력 중...", { level: "STEP" });
    const enriched = await maybeEnhanceResultTextWithGemini(result);
    appState.lastResult = enriched;
    renderResult(enriched, { showKf: !!generateKf, showJson: !!generateJson });
    saveHistory(enriched);
    saveCurrentTabState();
    renderHistory();
    try {
      await copyJsonToClipboard(enriched, { logSource: "자동 복사" });
    } catch (_e) {
      appendTerminalLog("WARN", "자동 복사 실패 | 브라우저 클립보드 권한 확인 필요");
    }
    setStatusMessage("생성 완료", { level: "OK" });
    appendTerminalLog("OK", `뮤직비디오 생성 완료 | project=${enriched?.meta?.project_id || "-"}`);
  } catch (e) {
    notifyGenerateBlocked(`생성 오류: ${e?.message || "알 수 없는 오류"}`);
  } finally {
    appState.isGenerating = false;
    if (el.generateMusicKfBtn) el.generateMusicKfBtn.disabled = false;
    if (el.generateMusicJsonBtn) el.generateMusicJsonBtn.disabled = false;
  }
}

function notifyGenerateBlocked(message) {
  const level = /오류|실패/i.test(String(message || "")) ? "ERROR" : "INFO";
  setStatusMessage(message, { level, resetProgress: true });
}

async function simulateProgress(withContactSheet, withKeyframes = true) {
  const stages = [
    { label: "입력 검증 중...", target: 8 },
    { label: "시퀀스 아키텍처 설계 중...", target: 24 },
    { label: "시나리오/연출 노트 작성 중...", target: 72 },
    { label: "프롬프트 생성 중...", target: 87 }
  ];
  if (withKeyframes) {
    stages.splice(2, 0, { label: "키프레임 생성 중...", target: 48 });
  }

  if (withContactSheet) {
    stages.push({ label: "마스터 콘택트 시트 생성 중...", target: 96 });
  }

  stages.push({ label: "완료", target: 100 });

  let current = 0;
  for (const stage of stages) {
    setStatusMessage(stage.label, { level: "STEP" });
    while (current < stage.target) {
      current += 2;
      el.progressBar.style.width = `${Math.min(current, 100)}%`;
      await wait(60);
    }
    await wait(120);
  }
}

function buildResult({ inputMode, scriptText, memoText, soraLinkText, musicLyricsText, musicStyleKey, musicStyleLabel, musicStoryOption, musicStoryCustom, musicSynopsisInputText, referenceImageDataUrl, referenceImagePrompt, kfStyleNote, settings, kfCount, scriptAnalysis, musicAnalysis }) {
  const now = new Date();
  const charCount = scriptText.replace(/\s+/g, "").length;
  const totalSec = settings.runtime === "15s"
    ? 15
    : settings.runtime === "10s"
      ? 10
      : settings.runtime === "60s"
        ? 60
        : inputMode !== "script"
          ? kfCount * 6
          : 24;
  const scriptSegments = inputMode === "musicvideo" ? (musicAnalysis?.sequenceSegments || []) : (scriptAnalysis?.segments || []);
  const characters = buildCharacterMap(scriptSegments);
  const stylePreset = getMusicStylePreset(musicStyleKey || "ja_anime_cinematic");
  const customStylePrompt = getStylePromptByKey(musicStyleKey || "ja_anime_cinematic");
  const effectiveKfCount = settings.generate_keyframes ? kfCount : 0;
  const durations = effectiveKfCount > 0
    ? (inputMode === "script"
      ? splitDurationsBySegments(totalSec, effectiveKfCount, scriptSegments)
      : splitDurations(totalSec, effectiveKfCount))
    : [];

  const musicSynopsisKo = inputMode === "musicvideo"
    ? (musicSynopsisInputText
      ? truncateKorean(musicSynopsisInputText.replace(/\s+/g, " ").trim(), 299)
      : buildMusicVideoSynopsis(musicAnalysis, musicStyleLabel || stylePreset.label))
    : "";

  const keyframes = Array.from({ length: effectiveKfCount }, (_, i) =>
    makeFrame(
      i + 1,
      effectiveKfCount,
      durations[i],
      scriptSegments[i % Math.max(scriptSegments.length, 1)] || null,
      {
        basePrompt: referenceImagePrompt || "high detail, coherent composition, professional quality",
        kfStyleNote: inputMode === "musicvideo"
          ? [stylePreset.prompt, customStylePrompt, kfStyleNote].filter(Boolean).join(", ")
          : kfStyleNote,
        storyHintEn: inputMode === "musicvideo" ? (musicAnalysis?.storyHintEn || "") : "",
        storySynopsisKo: inputMode === "musicvideo" ? musicSynopsisKo : ""
      }
    )
  );
  const mainLine = inputMode === "script"
    ? "말의 밀도에 맞춰 장면의 호흡을 재배치한다."
    : inputMode === "musicvideo"
      ? `${musicAnalysis?.moodKo || "감성적"} 무드로 가사 흐름을 시각화한다.`
      : "이미지의 분위기를 중심으로 서사의 리듬을 설계한다.";

  const logline = inputMode === "script"
    ? "A text-driven sequence recalibrates pacing into a 15-second cinematic beat map."
    : inputMode === "musicvideo"
      ? "A lyric-driven music video sequence translates each two-line verse into one cinematic keyframe."
      : "A reference-driven sequence translates visual mood into a coherent directorial timeline.";

  const scriptKo = inputMode === "script"
    ? formatScriptForEditor(scriptText)
    : inputMode === "musicvideo"
      ? (musicAnalysis?.displayLyrics || musicLyricsText)
      : "참고 이미지 기반으로 생성된 무대/감정선 중심 시나리오 초안";

  const result = {
    meta: {
      version: "1.8",
      project_id: `proj_${now.getTime()}`,
      created_at: now.toISOString(),
      text_model: getSavedGeminiApiKey() ? getCurrentGeminiModel() : "local-fallback",
      image_model: IMAGE_MODEL_NAME
    },
    input: {
      input_mode: inputMode,
      memo_text: memoText || "",
      sora2_link: normalizeHttpUrl(soraLinkText || ""),
      ...(inputMode === "script"
        ? { script_text: scriptText }
        : inputMode === "musicvideo"
          ? {
              lyrics_text: musicAnalysis?.displayLyrics || musicLyricsText,
              lyrics_pure_text: musicAnalysis?.normalizedLyrics || "",
              lyrics_comment_lines: musicAnalysis?.commentLines || [],
              lyrics_kf_count: musicAnalysis?.lyricKfCount || 0,
              intro_kf_count: musicAnalysis?.introCount || 2,
              prelude_kf_count: musicAnalysis?.preludeCount || 2,
              ending_kf_count: musicAnalysis?.endingCount || 2,
              lyrics_mood_ko: musicAnalysis?.moodKo || "",
              lyrics_theme_ko: musicAnalysis?.themeKo || "",
              music_style_key: musicStyleKey || "ja_anime_cinematic",
              music_style_label: musicStyleLabel || stylePreset.label,
              music_style_prompt_custom_en: customStylePrompt || "",
              music_story_option: musicAnalysis?.storyOption || musicStoryOption || "1",
              music_story_label_ko: musicAnalysis?.storyLabelKo || "",
              music_story_custom_ko: musicAnalysis?.storyCustomKo || musicStoryCustom || "",
              music_synopsis_input_ko: musicSynopsisInputText || ""
            }
        : {
            ...(referenceImageDataUrl ? { reference_image_base64: referenceImageDataUrl } : {}),
            ...(referenceImagePrompt ? { reference_prompt_en: referenceImagePrompt } : {}),
            ...(kfStyleNote ? { kf_style_note: kfStyleNote } : {})
          })
    },
    settings: {
      effects: settings.effects,
      generate_keyframes: settings.generate_keyframes,
      generate_contact_sheet: settings.generate_contact_sheet
    },
    keyframe_plan: {
      mode: inputMode === "script" ? "auto_by_script_length" : "fixed_12",
      script_char_count: inputMode === "script" ? charCount : 0,
      kf_count: effectiveKfCount,
      timeline_sec: totalSec,
      estimated_content_sec: inputMode === "script" ? scriptAnalysis?.estimatedContentSec || 0 : 0,
      rule_version: inputMode === "script"
        ? "sora2-15s-kf-v1"
        : inputMode === "musicvideo"
          ? "musicvideo-lyrics-2lines-1kf-v1"
          : "reference-fixed-12-v1"
    },
    production: {
      status: "DONE",
      progress_percent: 100,
      status_message: "완료"
    },
    directors_view: {
      main_line_ko: mainLine,
      logline_en: logline,
      script_ko: scriptKo,
      music_video_synopsis_ko: musicSynopsisKo
    },
    characters,
    keyframes,
    prompts: {
      visual_prompt_en: buildVisualPrompt(settings, inputMode),
      music_prompt_en: buildMusicPrompt(settings)
    },
    contact_sheet: {
      enabled: settings.generate_contact_sheet && settings.generate_keyframes,
      image_url: ""
    },
    ui_state: {
      copy_button: "COPY",
      copy_success: false
    },
    json_data: {
      export_ready: true
    }
  };

  if (settings.generate_contact_sheet && keyframes.length > 0) {
    result.contact_sheet.image_url = makeContactSheetDataUrl(keyframes, settings.ratio);
  }

  return result;
}

function splitDurations(totalSec, count) {
  const base = Math.floor((totalSec / count) * 100) / 100;
  const arr = Array.from({ length: count }, () => base);
  const used = base * count;
  const diff = Number((totalSec - used).toFixed(2));
  arr[count - 1] = Number((arr[count - 1] + diff).toFixed(2));
  return arr;
}

function splitDurationsBySegments(totalSec, kfCount, segments) {
  if (!segments.length) return splitDurations(totalSec, kfCount);

  const baseWeights = Array.from({ length: kfCount }, (_, i) => {
    const seg = segments[i % segments.length];
    return Math.max(0.6, estimateSegmentSeconds(seg));
  });

  const sumWeights = baseWeights.reduce((a, b) => a + b, 0);
  const scaled = baseWeights.map((w) => (w / sumWeights) * totalSec);
  let clamped = scaled.map((v) => Math.min(4.0, Math.max(0.8, Number(v.toFixed(2)))));
  let diff = Number((totalSec - clamped.reduce((a, b) => a + b, 0)).toFixed(2));
  clamped[clamped.length - 1] = Number((clamped[clamped.length - 1] + diff).toFixed(2));
  return clamped;
}

function makeFrame(n, total, durationSec, sourceSegment, refContext = {}) {
  const shotTypes = ["Wide", "Medium", "Close-up", "Over-shoulder", "Insert", "Two-shot"];
  const cameras = ["Slow push-in", "Static hold", "Handheld drift", "Tracking lateral", "Rack focus", "Crane rise"];
  const lenses = ["24mm", "35mm", "50mm", "85mm", "100mm macro"];

  const beat = n <= Math.ceil(total * 0.33) ? "setup" : n <= Math.ceil(total * 0.75) ? "confrontation" : "resolution";
  const shotType = shotTypes[(n - 1) % shotTypes.length];
  const cameraWork = cameras[(n - 1) % cameras.length];
  const lens = lenses[(n - 1) % lenses.length];
  const imagePromptEn = buildKfImagePrompt({
    frameNumber: n,
    total,
    shotType,
    cameraWork,
    lens,
    basePrompt: refContext.basePrompt || "cinematic storyboard frame",
    kfStyleNote: refContext.kfStyleNote || "",
    sourceText: sourceSegment?.type === "lyric_pair" ? "" : (sourceSegment?.raw || "")
  });

  const actorIds = Array.isArray(sourceSegment?.actor_ids)
    ? sourceSegment.actor_ids.filter(Boolean)
    : sourceSegment?.actor_id
      ? [sourceSegment.actor_id]
      : [];
  const actorProfiles = Array.isArray(sourceSegment?.actor_profiles)
    ? sourceSegment.actor_profiles.filter(Boolean)
    : sourceSegment?.actor_profile
      ? [sourceSegment.actor_profile]
      : [];

  return {
    frame_number: n,
    shot_type: shotType,
    duration_sec: durationSec,
    actor_ids: actorIds,
    actor_profiles: actorProfiles,
    actor_action_en: buildActionDirectionText(
      sourceSegment,
      beat,
      refContext.storyHintEn || "",
      refContext.storySynopsisKo || ""
    ),
    source_text: sourceSegment
      ? normalizeSourceTextByType(sourceSegment.raw, sourceSegment.type)
      : "",
    source_type: sourceSegment ? sourceSegment.type : "generated",
    lyric_text_ko: sourceSegment?.type === "lyric_pair"
      ? [sourceSegment?.lyric_line_1, sourceSegment?.lyric_line_2].filter(Boolean).join("\n")
      : "",
    image_prompt_en: imagePromptEn,
    camera_work_en: cameraWork,
    lens_en: lens,
    lighting_en: "Contrasty practical lights with soft fill and directional highlights.",
    sound_en: "Layered ambience, emotional underscore, and timed Foley accents."
  };
}

function normalizeSourceTextByType(sourceText, sourceType) {
  const raw = String(sourceText || "").trim();
  if (!raw) return "";
  if (sourceType !== "dialogue") return raw;

  const quotes = raw.match(/"[^"]+"|'[^']+'|“[^”]+”|‘[^’]+’/g) || [];
  if (quotes.length) return quotes.join(" ").trim();

  return raw.replace(/\([^)]*\)|\[[^\]]*\]/g, "").replace(/\s+/g, " ").trim();
}

function buildActionDirectionText(sourceSegment, beat, storyHintEn, storySynopsisKo = "") {
  const synopsisHint = storySynopsisKo ? truncateKorean(storySynopsisKo, 60) : "";
  if (!sourceSegment) {
    return "장면의 호흡에 맞춰 감정 전환이 자연스럽게 보이도록 최소 동작 중심으로 연기.";
  }

  if (sourceSegment.type === "lyric_pair") {
    const l1 = String(sourceSegment.lyric_line_1 || "").trim();
    const l2 = String(sourceSegment.lyric_line_2 || "").trim();
    const actorCount = Array.isArray(sourceSegment.actor_ids)
      ? sourceSegment.actor_ids.filter(Boolean).length
      : sourceSegment.actor_id
        ? 1
        : 0;
    const cue = [l1, l2].filter(Boolean).join(" / ");
    const mood = inferLyricDirectionMood(`${l1} ${l2}`);
    if (actorCount >= 2) {
      return `가사 "${cue}"의 정서(${mood})를 따라 두 인물의 거리감 변화, 교차 시선, 감정 호흡으로 ${beat} 비트를 연출.${synopsisHint ? ` 시놉시스 반영: ${synopsisHint}` : ""}`;
    }
    if (actorCount === 1) {
      return `가사 "${cue}"의 정서(${mood})를 따라 표정 변화와 시선 이동을 중심으로 ${beat} 비트를 연기.${synopsisHint ? ` 시놉시스 반영: ${synopsisHint}` : ""}`;
    }
    return `가사 "${cue}"의 정서(${mood})를 배경 변화와 소품/환경 움직임으로 표현하는 ${beat} 비주얼 지문.${synopsisHint ? ` 시놉시스 반영: ${synopsisHint}` : ""}`;
  }

  if (/^mv_/.test(sourceSegment.type || "")) {
    const actorCount = Array.isArray(sourceSegment.actor_ids)
      ? sourceSegment.actor_ids.filter(Boolean).length
      : sourceSegment.actor_id
        ? 1
        : 0;
    if (actorCount >= 2) {
      return `${sourceSegment.raw} 분위기에 맞춰 두 인물의 동선 교차와 감정 반응 컷으로 ${beat} 비트를 구성.`;
    }
    if (actorCount === 1) {
      return `${sourceSegment.raw} 분위기에 맞춰 리듬감 있는 동선과 짧은 제스처로 ${beat} 비트를 구성.`;
    }
    return `${sourceSegment.raw} 콘셉트를 중심으로 인물 없이 풍경, 오브젝트, 빛의 변화로 ${beat} 비트를 구성.`;
  }

  const cueText = String(sourceSegment.raw || "").trim();
  return cueText
    ? `원문 지문 "${cueText}"의 의도를 유지하며 ${beat} 비트로 동작을 정리.`
    : `스토리 흐름에 맞춰 ${beat} 비트 동작을 수행.`;
}

function inferLyricDirectionMood(text) {
  const t = String(text || "").toLowerCase();
  if (/(사랑|좋아|입맞춤|kiss|love|heart)/.test(t)) return "로맨틱";
  if (/(이별|눈물|떠나|그리워|lonely|tears|goodbye)/.test(t)) return "서정적";
  if (/(달려|불꽃|심장|폭발|run|fire|burn)/.test(t)) return "강렬함";
  if (/(봄|여름|가을|겨울|바람|비|눈|season)/.test(t)) return "계절감";
  return "감성적";
}

function buildVisualPrompt(settings, inputMode) {
  return `Cinematic ${settings.ratio} master sequence, ${inputMode} driven narrative, realistic skin texture, controlled film grain, dynamic blocking, coherent visual continuity, production-ready storyboard keyframes`;
}

function buildMusicPrompt(settings) {
  const fx = [];
  if (settings.effects.bgm) fx.push("melodic underscore");
  if (settings.effects.sfx) fx.push("detailed foley cues");
  if (settings.effects.vfx) fx.push("cinematic transition hits");
  return `Build a professional score with ${fx.join(", ") || "minimal ambience"}, clear emotional arc, and precise timing for a ${settings.runtime} sequence.`;
}

function renderResult(result, options = {}) {
  const showKf = options.showKf !== undefined
    ? options.showKf !== false
    : !!(result?.settings?.generate_keyframes ?? (result?.keyframes?.length > 0));
  const showJson = options.showJson !== false;
  el.resultSection.classList.remove("hidden");
  el.liveScriptEditor.value = buildEditorText(result);
  autoGrowTextarea();
  const synopsis = result?.directors_view?.music_video_synopsis_ko || "";
  if (el.mvSynopsisPanel && el.mvSynopsisText) {
    const isMusic = result?.input?.input_mode === "musicvideo";
    el.mvSynopsisPanel.classList.toggle("hidden", !isMusic);
    el.mvSynopsisText.textContent = synopsis;
  }
  if (el.keyframePanel) el.keyframePanel.classList.toggle("hidden", !showKf);
  if (el.jsonPanel) el.jsonPanel.classList.toggle("hidden", !showJson);

  if (showKf) {
    el.kframeMeta.textContent = `Mode: ${result.keyframe_plan.mode} | KF: ${result.keyframe_plan.kf_count} | Timeline: ${result.keyframe_plan.timeline_sec}s | Est: ${result.keyframe_plan.estimated_content_sec || 0}s`;
    renderKeyframeCards(result);
  } else {
    el.kframeMeta.textContent = "";
    el.keyframeList.innerHTML = "";
  }

  el.jsonOutput.textContent = showJson ? JSON.stringify(result, null, 2) : "";
  if (el.copyJsonBtn) el.copyJsonBtn.disabled = !showJson;
  if (el.copyJsonBtnInline) el.copyJsonBtnInline.disabled = !showJson;

  setCopyButtonState(false);
}

function renderMusicSynopsisOnly(synopsis, lyricsText) {
  el.resultSection.classList.remove("hidden");
  if (el.liveScriptEditor) {
    el.liveScriptEditor.value = lyricsText || "";
    autoGrowTextarea();
  }
  if (el.mvSynopsisPanel && el.mvSynopsisText) {
    el.mvSynopsisPanel.classList.remove("hidden");
    el.mvSynopsisText.textContent = synopsis || "";
  }
  if (el.keyframePanel) el.keyframePanel.classList.add("hidden");
  if (el.jsonPanel) el.jsonPanel.classList.add("hidden");
  if (el.copyJsonBtn) el.copyJsonBtn.disabled = true;
  if (el.copyJsonBtnInline) el.copyJsonBtnInline.disabled = true;
}

async function onCopyJson() {
  if (!appState.lastResult) return;
  try {
    await copyJsonToClipboard(appState.lastResult, { logSource: "수동 복사" });
  } catch (_e) {
    alert("복사에 실패했습니다. 브라우저 권한을 확인하세요.");
  }
}

async function copyJsonToClipboard(result, { logSource = "자동 복사" } = {}) {
  if (!result) return false;
  await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  setCopyButtonState(true);
  if (!result.ui_state) result.ui_state = {};
  result.ui_state.copy_button = "COPIED!";
  result.ui_state.copy_success = true;
  appendTerminalLog("OK", `${logSource} | JSON 클립보드 복사 완료`);
  setTimeout(() => setCopyButtonState(false), 1000);
  return true;
}

async function onCopyAllKfPrompts() {
  if (!appState.lastResult?.keyframes?.length) return;
  const blocks = appState.lastResult.keyframes
    .map((kf, idx) => {
      const body = buildKfPromptCopyText(kf).trim();
      if (!body) return "";
      return `KF#${idx + 1}\n${body}`;
    })
    .filter(Boolean);
  if (!blocks.length) return;

  const bundleText = blocks.join("\n\n");
  try {
    await navigator.clipboard.writeText(bundleText);
    flashButtonCopied(el.copyAllKfPromptsBtn, "KF Prompt ALL COPY");
  } catch (_e) {
    alert("KF 프롬프트 묶음 복사에 실패했습니다.");
  }
}

function setCopyButtonState(copied) {
  const label = copied ? "COPIED!" : "JSON COPY";
  [el.copyJsonBtn, el.copyJsonBtnInline].forEach((btn) => {
    if (!btn) return;
    btn.textContent = label;
    btn.classList.toggle("copied", copied);
  });
}

function saveHistory(result) {
  const list = loadHistory();
  const title = makeHistoryTitle(result);
  const memoText = String(result?.input?.memo_text || "").trim();
  const sora2Link = String(result?.input?.sora2_link || "").trim();
  list.unshift({
    project_id: result.meta.project_id,
    title,
    memo_text: memoText,
    sora2_link: sora2Link,
    created_at: result.meta.created_at,
    input_mode: result.input.input_mode,
    runtime: `${result.keyframe_plan?.timeline_sec || 0}s`,
    kf_count: result.keyframe_plan.kf_count,
    payload: result
  });

  safeStorageSet(STORAGE_KEY, JSON.stringify(list.slice(0, 30)));
}

function loadHistory() {
  const raw = safeStorageGet(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_e) {
    return [];
  }
}

function renderHistory() {
  const history = loadHistory();
  if (!history.length) {
    el.historyList.innerHTML = "<p>저장된 프로젝트가 없습니다.</p>";
    return;
  }

  const modes = [
    { key: "script", label: "Script" },
    { key: "reference", label: "Reference" },
    { key: "musicvideo", label: "뮤직비디오" }
  ];

  const sections = modes.map((mode) => {
    const items = history.filter((item) => item.input_mode === mode.key);
    const renderItems = (list) => list.map((item) => {
      const memo = String(item.memo_text || item.payload?.input?.memo_text || "").trim();
      const sora2Link = normalizeHttpUrl(String(item.sora2_link || item.payload?.input?.sora2_link || "").trim());
      const memoLink = extractFirstHttpUrl(memo);
      const displayTitle = makeHistoryTitle(item.payload || item) || item.title || item.project_id;
        return `
          <div class="history-item">
            <div class="history-main">
              <button data-project-id="${item.project_id}" class="history-title-btn">${escapeHtml(displayTitle)}</button>
              <div>${new Date(item.created_at).toLocaleString()} | ${item.runtime} | KF ${item.kf_count}</div>
              ${sora2Link ? `<div class="history-memo">소라2: <a href="${escapeHtml(sora2Link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sora2Link)}</a></div>` : ""}
              ${memo ? `<div class="history-memo">${renderMemoWithHyperlinks(memo)}</div>` : ""}
            </div>
            <div class="history-actions">
              ${sora2Link ? `<button class="btn ghost history-link-btn" data-open-url="${escapeHtml(sora2Link)}">소라2 열기</button>` : ""}
              ${memoLink ? `<button class="btn ghost history-link-btn" data-open-url="${escapeHtml(memoLink)}">열기</button>` : ""}
              <button class="btn ghost danger history-delete-btn" data-delete-project-id="${item.project_id}">삭제</button>
            </div>
          </div>
        `;
    }).join("");

    let body = "";
    if (!items.length) {
      body = `<p>${mode.label} 저장 내역이 없습니다.</p>`;
    } else if (mode.key === "script") {
      const today = new Date();
      const isToday = (value) => {
        const d = new Date(value);
        return d.getFullYear() === today.getFullYear()
          && d.getMonth() === today.getMonth()
          && d.getDate() === today.getDate();
      };
      const todayItems = items.filter((item) => isToday(item.created_at));
      const olderItems = items.filter((item) => !isToday(item.created_at));

      body = [
        `<div class="history-subtitle">오늘 생성한 스크립트 (${todayItems.length})</div>`,
        todayItems.length ? renderItems(todayItems) : `<p>오늘 생성한 스크립트가 없습니다.</p>`,
        olderItems.length
          ? `<div class="history-subtitle">이전 생성 스크립트 (${olderItems.length})</div>${renderItems(olderItems)}`
          : ""
      ].join("");
    } else {
      body = renderItems(items);
    }

    return `
      <section class="history-group">
        <h3>${mode.label}</h3>
        ${body}
      </section>
    `;
  });

  el.historyList.innerHTML = sections.join("");

  el.historyList.querySelectorAll(".history-title-btn[data-project-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      saveCurrentTabState();
      const found = history.find((h) => h.project_id === btn.dataset.projectId);
      if (!found) return;
      appState.lastResult = found.payload;
      applyLoadedResultToInputs(found.payload);
      renderResult(found.payload);
      saveCurrentTabState();
    });
  });

  el.historyList.querySelectorAll(".history-link-btn[data-open-url]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const url = btn.dataset.openUrl || "";
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  el.historyList.querySelectorAll(".history-delete-btn[data-delete-project-id]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      const projectId = btn.dataset.deleteProjectId;
      if (!projectId) return;
      deleteHistoryItem(projectId);
    });
  });
}

function deleteHistoryItem(projectId) {
  const list = loadHistory();
  const next = list.filter((item) => item.project_id !== projectId);
  safeStorageSet(STORAGE_KEY, JSON.stringify(next));
  renderHistory();
}

function onSaveMemoToHistory() {
  const memo = (el.memoInput?.value || "").trim();
  const sora2Link = normalizeHttpUrl((el.soraLinkInput?.value || "").trim());
  saveCurrentTabState();

  if (!appState.lastResult?.meta?.project_id) {
    setMemoStatus("메모 저장됨. 다음 생성 시 히스토리에 반영됩니다.", "ok");
    return;
  }

  const projectId = appState.lastResult.meta.project_id;
  appState.lastResult.input = appState.lastResult.input || {};
  appState.lastResult.input.memo_text = memo;
  appState.lastResult.input.sora2_link = sora2Link;

  const list = loadHistory();
  const next = list.map((item) => {
    if (item.project_id !== projectId) return item;
    const payload = item.payload ? JSON.parse(JSON.stringify(item.payload)) : {};
    payload.input = payload.input || {};
    payload.input.memo_text = memo;
    payload.input.sora2_link = sora2Link;
    return { ...item, memo_text: memo, sora2_link: sora2Link, payload };
  });
  safeStorageSet(STORAGE_KEY, JSON.stringify(next));
  renderHistory();
  setMemoStatus("메모가 히스토리에 적용되었습니다.", "ok");
}

async function saveApiKey() {
  const key = el.apiKeyInput.value.trim();
  const ok = safeStorageSet(API_KEY_STORAGE, key);
  if (!ok) {
    alert("브라우저 저장소 접근이 차단되어 API Key 저장에 실패했습니다.");
    return;
  }

  if (!key) {
    saveGeminiActiveModel("");
    renderCurrentGeminiModelLabel();
    alert("API Key가 비워진 상태로 저장되었습니다.");
    return;
  }

  setGeminiLampStatus("checking");
  notifyGenerateBlocked("Gemini API Key 점검 중...");
  const check = await validateGeminiApiKey(key);
  if (!check.ok) {
    setGeminiLampStatus("error", String(check.message || ""));
    notifyGenerateBlocked(`Gemini API 오류: ${check.message}`);
    alert(`API Key 저장됨. Gemini API 오류: ${check.message}`);
    return;
  }
  saveGeminiActiveModel(check.model || GEMINI_TEXT_MODEL);
  renderCurrentGeminiModelLabel();
  setGeminiLampStatus("ok", check.model || GEMINI_TEXT_MODEL);
  notifyGenerateBlocked("Gemini API 연결 정상");
  alert(`API Key 저장 및 Gemini API 연결 확인 완료. 사용 모델: ${check.model || GEMINI_TEXT_MODEL}`);
}

async function validateGeminiApiKey(apiKey) {
  if (!apiKey) {
    return { ok: false, message: "API Key가 비어 있습니다." };
  }

  const listedModels = await fetchGeminiGenerateModels(apiKey);
  const listedSet = new Set(listedModels);
  const prioritizedListed = GEMINI_FALLBACK_MODELS.filter((m) => listedSet.has(m));
  const flashListed = listedModels.filter((m) => /flash/i.test(m) && !prioritizedListed.includes(m));
  const othersListed = listedModels.filter((m) => !prioritizedListed.includes(m) && !flashListed.includes(m));
  const candidateModels = listedModels.length
    ? [...prioritizedListed, ...flashListed, ...othersListed]
    : [...GEMINI_FALLBACK_MODELS];

  let lastError = "";
  for (const model of candidateModels) {
    const check = await probeGeminiModel(apiKey, model);
    if (check.ok) {
      return { ok: true, message: "OK", model };
    }
    lastError = check.message || lastError;
  }
  return { ok: false, message: lastError || "지원되는 Gemini Flash 모델을 찾지 못했습니다." };
}

async function fetchGeminiGenerateModels(apiKey) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) return [];
    const payload = await response.json();
    const models = Array.isArray(payload?.models) ? payload.models : [];
    return models
      .filter((m) => Array.isArray(m?.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent"))
      .map((m) => String(m?.name || "").replace(/^models\//, "").trim())
      .filter(Boolean);
  } catch (_e) {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function probeGeminiModel(apiKey, modelName) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "health check" }] }]
      }),
      signal: controller.signal
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_e) {
      payload = null;
    }
    if (!response.ok) {
      return { ok: false, message: payload?.error?.message || `HTTP ${response.status}` };
    }
    return { ok: true, message: "OK" };
  } catch (e) {
    if (e?.name === "AbortError") {
      return { ok: false, message: "요청 시간 초과(네트워크/응답 지연)" };
    }
    return { ok: false, message: e?.message || "네트워크 오류" };
  } finally {
    clearTimeout(timer);
  }
}

function getSavedGeminiApiKey() {
  return (el.apiKeyInput?.value || safeStorageGet(API_KEY_STORAGE) || "").trim();
}

function getCurrentGeminiModel() {
  const saved = String(appState.activeGeminiModel || "").trim();
  return saved || GEMINI_TEXT_MODEL;
}

function renderCurrentGeminiModelLabel() {
  const currentModel = getCurrentGeminiModel();
  if (el.modelNamesText) {
    el.modelNamesText.textContent = `Text Model: ${currentModel} | Image Model: ${IMAGE_MODEL_NAME}`;
  }
  const hasKey = !!getSavedGeminiApiKey();
  setGeminiLampStatus(hasKey ? "configured" : "off");
}

function renderAccessPathInfo() {
  if (!el.accessPathInfo) return;
  const proto = window.location.protocol || "";
  const host = window.location.host || "";
  const href = window.location.href || "";
  const isLocal = proto === "file:" || /^localhost(?::\d+)?$/i.test(host) || /^127\.0\.0\.1(?::\d+)?$/.test(host);
  const mode = isLocal ? "로컬(Local)" : "홈페이지(Web)";
  el.accessPathInfo.textContent = `접속: ${mode} | ${href}`;
}

function isLocalExecution() {
  const proto = window.location.protocol || "";
  const host = window.location.host || "";
  return proto === "file:" || /^localhost(?::\d+)?$/i.test(host) || /^127\.0\.0\.1(?::\d+)?$/.test(host);
}

function setGeminiLampStatus(status, detail = "") {
  if (!el.geminiLamp || !el.geminiStatusText) return;
  el.geminiLamp.classList.remove("checking", "ok", "error", "off");

  let lampClass = "off";
  let statusText = "Gemini Status: Off";
  if (status === "checking") {
    lampClass = "checking";
    statusText = "Gemini Status: Checking";
  } else if (status === "ok") {
    lampClass = "ok";
    statusText = `Gemini Status: Active${detail ? ` (${detail})` : ""}`;
  } else if (status === "error") {
    lampClass = "error";
    statusText = `Gemini Status: Error${detail ? ` (${detail})` : ""}`;
  } else if (status === "configured") {
    lampClass = "checking";
    statusText = `Gemini Status: Configured (${getCurrentGeminiModel()})`;
  }

  el.geminiLamp.classList.add(lampClass);
  el.geminiStatusText.textContent = statusText;
  if (appState.lastGeminiStatusText !== statusText) {
    appState.lastGeminiStatusText = statusText;
    appendTerminalLog(status === "error" ? "ERROR" : status === "ok" ? "OK" : "INFO", statusText);
  }
}

async function geminiGenerateText({ prompt, inlineImageDataUrl = "" }) {
  const apiKey = getSavedGeminiApiKey();
  if (!apiKey) return "";

  const models = [getCurrentGeminiModel(), ...GEMINI_FALLBACK_MODELS].filter((v, i, arr) => v && arr.indexOf(v) === i);
  for (const model of models) {
    const text = await geminiGenerateTextWithModel({
      apiKey,
      modelName: model,
      prompt,
      inlineImageDataUrl
    });
    if (text) {
      if (model !== appState.activeGeminiModel) {
        saveGeminiActiveModel(model);
        renderCurrentGeminiModelLabel();
      }
      return text;
    }
  }
  return "";
}

async function geminiGenerateTextWithModel({ apiKey, modelName, prompt, inlineImageDataUrl = "" }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const parts = [{ text: prompt }];
    const inline = parseDataUrl(inlineImageDataUrl);
    if (inline) {
      parts.push({
        inline_data: {
          mime_type: inline.mimeType,
          data: inline.base64
        }
      });
    }
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.35
        }
      }),
      signal: controller.signal
    });
    if (!response.ok) return "";
    const payload = await response.json();
    const text = payload?.candidates?.[0]?.content?.parts
      ?.map((p) => p?.text || "")
      .join("\n")
      .trim();
    return text || "";
  } catch (_e) {
    return "";
  } finally {
    clearTimeout(timer);
  }
}

function parseDataUrl(dataUrl) {
  const raw = String(dataUrl || "").trim();
  const match = raw.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/i);
  if (!match) return null;
  return {
    mimeType: match[1].toLowerCase(),
    base64: match[2]
  };
}

function extractJsonObjectFromText(text) {
  const src = String(text || "").trim();
  if (!src) return null;
  const fenced = src.match(/```json\s*([\s\S]*?)```/i) || src.match(/```\s*([\s\S]*?)```/i);
  const target = fenced ? fenced[1].trim() : src;
  const first = target.indexOf("{");
  const last = target.lastIndexOf("}");
  if (first < 0 || last <= first) return null;
  try {
    return JSON.parse(target.slice(first, last + 1));
  } catch (_e) {
    return null;
  }
}

async function generateMusicSynopsisWithGemini(musicAnalysis, styleLabel) {
  if (!getSavedGeminiApiKey()) return "";
  const prompt = [
    "당신은 뮤직비디오 감독이다.",
    "한국어로 300자 미만 시놉시스를 1개 작성하라.",
    "옵션과 가사를 반영하고, 구성 설명보다 스토리 중심으로 작성하라.",
    `스타일: ${styleLabel || "-"}`,
    `스토리옵션: ${musicAnalysis?.storyLabelKo || "-"}`,
    `직접입력스토리: ${musicAnalysis?.storyCustomKo || "-"}`,
    "가사:",
    musicAnalysis?.displayLyrics || ""
  ].join("\n");
  const text = await geminiGenerateText({ prompt });
  return truncateKorean(String(text || "").replace(/\s+/g, " ").trim(), 299);
}

async function maybeEnhanceResultTextWithGemini(result) {
  if (!result || !getSavedGeminiApiKey()) {
    return applyImageModelTag(result);
  }

  const promptPayload = {
    mode: result?.input?.input_mode || "script",
    script_ko: result?.directors_view?.script_ko || "",
    synopsis_ko: result?.directors_view?.music_video_synopsis_ko || "",
    story_option: result?.input?.music_story_option || "",
    keyframes: (result?.keyframes || []).map((kf) => ({
      frame_number: kf.frame_number,
      source_text: kf.source_text || "",
      lyric_text_ko: kf.lyric_text_ko || "",
      actor_ids: kf.actor_ids || [],
      shot_type: kf.shot_type || "",
      camera_work_en: kf.camera_work_en || "",
      lens_en: kf.lens_en || ""
    }))
  };

  const prompt = [
    "You are a film direction writer.",
    "Return JSON only with this schema:",
    "{\"main_line_ko\":\"...\",\"logline_en\":\"...\",\"music_video_synopsis_ko\":\"...\",\"keyframes\":[{\"frame_number\":1,\"actor_action_en\":\"...\",\"lighting_en\":\"...\",\"sound_en\":\"...\",\"image_prompt_en\":\"...\"}]}",
    "Rules:",
    "- Keep Korean fields in Korean.",
    "- Keep technical fields in English.",
    `- image_prompt_en must be pure image-generation prompt for model ${IMAGE_MODEL_NAME}.`,
    "- Do not include storyboard words.",
    "- Keep frame_number as-is.",
    `Input JSON: ${JSON.stringify(promptPayload)}`
  ].join("\n");

  const text = await geminiGenerateText({ prompt });
  const parsed = extractJsonObjectFromText(text);
  if (!parsed || typeof parsed !== "object") {
    return applyImageModelTag(result);
  }

  const next = JSON.parse(JSON.stringify(result));
  next.directors_view = next.directors_view || {};
  if (parsed.main_line_ko) next.directors_view.main_line_ko = String(parsed.main_line_ko).trim();
  if (parsed.logline_en) next.directors_view.logline_en = String(parsed.logline_en).trim();
  if (parsed.music_video_synopsis_ko && next.input?.input_mode === "musicvideo") {
    next.directors_view.music_video_synopsis_ko = truncateKorean(String(parsed.music_video_synopsis_ko).replace(/\s+/g, " ").trim(), 299);
  }

  const map = new Map((parsed.keyframes || []).map((it) => [Number(it.frame_number), it]));
  next.keyframes = (next.keyframes || []).map((kf) => {
    const patch = map.get(Number(kf.frame_number));
    if (!patch) return kf;
    return {
      ...kf,
      actor_action_en: patch.actor_action_en ? String(patch.actor_action_en).trim() : kf.actor_action_en,
      lighting_en: patch.lighting_en ? String(patch.lighting_en).trim() : kf.lighting_en,
      sound_en: patch.sound_en ? String(patch.sound_en).trim() : kf.sound_en,
      image_prompt_en: patch.image_prompt_en ? String(patch.image_prompt_en).trim() : kf.image_prompt_en
    };
  });

  next.meta = next.meta || {};
  next.meta.text_model = getCurrentGeminiModel();
  next.meta.image_model = IMAGE_MODEL_NAME;
  return applyImageModelTag(next);
}

function applyImageModelTag(result) {
  if (!result) return result;
  const next = result;
  next.meta = next.meta || {};
  if (!next.meta.image_model) next.meta.image_model = IMAGE_MODEL_NAME;
  if (!next.meta.text_model) next.meta.text_model = getSavedGeminiApiKey() ? getCurrentGeminiModel() : "local-fallback";
  return next;
}

function resetAll() {
  el.scriptInput.value = "";
  if (el.memoInput) el.memoInput.value = "";
  if (el.soraLinkInput) el.soraLinkInput.value = "";
  if (el.memoStatus) el.memoStatus.textContent = "";
  if (el.musicLyricsInput) el.musicLyricsInput.value = "";
  if (el.musicSynopsisInput) el.musicSynopsisInput.value = "";
  if (el.musicStyleSelect) el.musicStyleSelect.value = "ja_anime_cinematic";
  if (el.musicStorySelect) el.musicStorySelect.value = "1";
  if (el.musicStoryCustomInput) el.musicStoryCustomInput.value = "";
  if (el.referenceFile) el.referenceFile.value = "";
  appState.referenceImageDataUrl = "";
  appState.referenceImagePrompt = "";
  if (el.referencePrompt) el.referencePrompt.value = "";
  if (el.kfStyleInput) el.kfStyleInput.value = "";
  if (el.apiKeyInput) el.apiKeyInput.value = safeStorageGet(API_KEY_STORAGE) || "";
  renderCurrentGeminiModelLabel();
  updateReferencePreview();
  el.runtimeSelect.value = "15s";
  el.bgmToggle.checked = false;
  el.vfxToggle.checked = false;
  el.sfxToggle.checked = false;
  if (el.keyframesToggle) el.keyframesToggle.checked = false;
  el.contactSheetToggle.checked = false;
  el.progressBar.style.width = "0%";
  setStatusMessage("대기 중", { level: "INFO" });
  el.resultSection.classList.add("hidden");
  appState.lastResult = null;
  appState.tabStates = createInitialTabStates();
  setInputMode("script");
  setScriptInputCollapsed(false);
  updateScriptMetrics();
  autoGrowScriptInput();
  toggleMusicStoryCustomInput();
}

function resetResultState() {
  appState.lastResult = null;
  appState.isGenerating = false;
  el.generateBtn.disabled = false;
  el.resultSection.classList.add("hidden");
  el.progressBar.style.width = "0%";
  setStatusMessage("대기 중", { level: "INFO" });
  el.kframeMeta.textContent = "";
  el.keyframeList.innerHTML = "";
  el.liveScriptEditor.value = "";
  el.jsonOutput.textContent = "";
  setCopyButtonState(false);
}

function clearInputFieldsOnly() {
  el.scriptInput.value = "";
  if (el.musicLyricsInput) el.musicLyricsInput.value = "";
  if (el.musicSynopsisInput) el.musicSynopsisInput.value = "";
  if (el.musicStyleSelect) el.musicStyleSelect.value = "ja_anime_cinematic";
  if (el.musicStorySelect) el.musicStorySelect.value = "1";
  if (el.musicStoryCustomInput) el.musicStoryCustomInput.value = "";
  if (el.referenceFile) el.referenceFile.value = "";
  appState.referenceImageDataUrl = "";
  appState.referenceImagePrompt = "";
  if (el.referencePrompt) el.referencePrompt.value = "";
  if (el.kfStyleInput) el.kfStyleInput.value = "";
  updateReferencePreview();
  updateScriptMetrics();
  autoGrowScriptInput();
  setScriptInputCollapsed(false);
  toggleMusicStoryCustomInput();
}

function resetToIdleMode() {
  resetAll();
  if (el.scriptInput) el.scriptInput.focus();
}

function createInitialTabStates() {
  return {
    script: {
      scriptText: "",
      memoText: "",
      soraLinkText: "",
      runtime: "15s",
      bgm: false,
      vfx: false,
      sfx: false,
      keyframes: false,
      contactSheet: false,
      lastResult: null
    },
    reference: {
      referenceImageDataUrl: "",
      referencePrompt: "",
      kfStyleNote: "",
      memoText: "",
      soraLinkText: "",
      runtime: "directors_cut",
      bgm: false,
      vfx: false,
      sfx: false,
      keyframes: false,
      contactSheet: false,
      lastResult: null
    },
    musicvideo: {
      lyricsText: "",
      synopsisText: "",
      memoText: "",
      soraLinkText: "",
      styleKey: "ja_anime_cinematic",
      storyOption: "1",
      storyCustom: "",
      runtime: "directors_cut",
      bgm: false,
      vfx: false,
      sfx: false,
      keyframes: false,
      contactSheet: false,
      lastResult: null
    }
  };
}

function saveCurrentTabState() {
  const mode = appState.inputMode;
  const state = appState.tabStates[mode];
  if (!state) return;

  state.runtime = el.runtimeSelect.value;
  state.memoText = el.memoInput?.value || "";
  state.soraLinkText = el.soraLinkInput?.value || "";
  state.bgm = el.bgmToggle.checked;
  state.vfx = el.vfxToggle.checked;
  state.sfx = el.sfxToggle.checked;
  state.keyframes = !!el.keyframesToggle?.checked;
  state.contactSheet = el.contactSheetToggle.checked;
  state.lastResult = appState.lastResult ? JSON.parse(JSON.stringify(appState.lastResult)) : null;

  if (mode === "script") {
    state.scriptText = el.scriptInput.value;
  } else if (mode === "reference") {
    state.referenceImageDataUrl = appState.referenceImageDataUrl;
    state.referencePrompt = el.referencePrompt?.value || "";
    state.kfStyleNote = el.kfStyleInput?.value || "";
  } else if (mode === "musicvideo") {
    state.lyricsText = el.musicLyricsInput?.value || "";
    state.synopsisText = el.musicSynopsisInput?.value || "";
    state.styleKey = el.musicStyleSelect?.value || "ja_anime_cinematic";
    state.storyOption = el.musicStorySelect?.value || "1";
    state.storyCustom = el.musicStoryCustomInput?.value || "";
  }
}

function loadTabState(mode) {
  const state = appState.tabStates[mode];
  if (!state) return;

  const defaultRuntime = mode === "script" ? "15s" : "directors_cut";
  el.runtimeSelect.value = state.runtime || defaultRuntime;
  if (el.memoInput) el.memoInput.value = state.memoText || "";
  if (el.soraLinkInput) el.soraLinkInput.value = state.soraLinkText || "";
  el.bgmToggle.checked = !!state.bgm;
  el.vfxToggle.checked = !!state.vfx;
  el.sfxToggle.checked = !!state.sfx;
  if (el.keyframesToggle) el.keyframesToggle.checked = state.keyframes !== false;
  el.contactSheetToggle.checked = !!state.contactSheet;

  if (mode === "script") {
    el.scriptInput.value = state.scriptText || "";
    updateScriptMetrics();
    autoGrowScriptInput();
    setScriptInputCollapsed(false);
  } else if (mode === "reference") {
    appState.referenceImageDataUrl = state.referenceImageDataUrl || "";
    appState.referenceImagePrompt = state.referencePrompt || "";
    if (el.referencePrompt) el.referencePrompt.value = appState.referenceImagePrompt;
    if (el.kfStyleInput) el.kfStyleInput.value = state.kfStyleNote || "";
    if (el.referenceFile) el.referenceFile.value = "";
    updateReferencePreview();
    updateScriptMetrics();
  } else if (mode === "musicvideo") {
    if (el.musicLyricsInput) el.musicLyricsInput.value = state.lyricsText || "";
    if (el.musicSynopsisInput) el.musicSynopsisInput.value = state.synopsisText || "";
    if (el.musicStyleSelect) el.musicStyleSelect.value = state.styleKey || "ja_anime_cinematic";
    if (el.musicStorySelect) el.musicStorySelect.value = state.storyOption || "1";
    if (el.musicStoryCustomInput) el.musicStoryCustomInput.value = state.storyCustom || "";
    syncMusicStyleGallerySelection();
    toggleMusicStoryCustomInput();
    updateScriptMetrics();
  }

  appState.lastResult = state.lastResult ? JSON.parse(JSON.stringify(state.lastResult)) : null;
  if (appState.lastResult) {
    renderResult(appState.lastResult);
  } else {
    resetResultState();
  }
}

function applyLoadedResultToInputs(result) {
  const mode = result?.input?.input_mode === "reference"
    ? "reference"
    : result?.input?.input_mode === "musicvideo"
      ? "musicvideo"
      : "script";
  setInputMode(mode);
  if (el.memoInput) el.memoInput.value = result?.input?.memo_text || "";
  if (el.soraLinkInput) el.soraLinkInput.value = result?.input?.sora2_link || "";

  if (el.bgmToggle) el.bgmToggle.checked = !!result?.settings?.effects?.bgm;
  if (el.vfxToggle) el.vfxToggle.checked = !!result?.settings?.effects?.vfx;
  if (el.sfxToggle) el.sfxToggle.checked = !!result?.settings?.effects?.sfx;
  if (el.keyframesToggle) el.keyframesToggle.checked = result?.settings?.generate_keyframes !== false;
  if (el.contactSheetToggle) el.contactSheetToggle.checked = !!result?.settings?.generate_contact_sheet;

  if (mode === "script") {
    el.scriptInput.value = result?.input?.script_text || "";
    appState.referenceImageDataUrl = "";
    appState.referenceImagePrompt = "";
    if (el.referencePrompt) el.referencePrompt.value = "";
    if (el.kfStyleInput) el.kfStyleInput.value = "";
    updateReferencePreview();
    updateScriptMetrics();
    autoGrowScriptInput();
    saveCurrentTabState();
    return;
  }

  if (mode === "musicvideo") {
    if (el.musicLyricsInput) el.musicLyricsInput.value = result?.input?.lyrics_text || "";
    if (el.musicSynopsisInput) {
      el.musicSynopsisInput.value =
        result?.input?.music_synopsis_input_ko ||
        result?.directors_view?.music_video_synopsis_ko ||
        "";
    }
    if (el.musicStyleSelect) el.musicStyleSelect.value = result?.input?.music_style_key || "ja_anime_cinematic";
    const restoredStyleKey = el.musicStyleSelect?.value || "ja_anime_cinematic";
    const restoredCustomPrompt = (result?.input?.music_style_prompt_custom_en || "").trim();
    if (restoredCustomPrompt) {
      appState.styleSamplePrompts[restoredStyleKey] = restoredCustomPrompt;
      saveStyleSamplePrompts();
    }
    if (el.musicStorySelect) el.musicStorySelect.value = result?.input?.music_story_option || "1";
    if (el.musicStoryCustomInput) el.musicStoryCustomInput.value = result?.input?.music_story_custom_ko || "";
    syncMusicStyleGallerySelection();
    toggleMusicStoryCustomInput();
    appState.referenceImageDataUrl = "";
    appState.referenceImagePrompt = "";
    if (el.referencePrompt) el.referencePrompt.value = "";
    if (el.kfStyleInput) el.kfStyleInput.value = "";
    updateReferencePreview();
    updateScriptMetrics();
    saveCurrentTabState();
    return;
  }

  appState.referenceImageDataUrl = result?.input?.reference_image_base64 || "";
  appState.referenceImagePrompt = result?.input?.reference_prompt_en || "";
  if (el.referencePrompt) el.referencePrompt.value = appState.referenceImagePrompt;
  if (el.kfStyleInput) el.kfStyleInput.value = result?.input?.kf_style_note || "";
  if (el.referenceFile) el.referenceFile.value = "";
  updateReferencePreview();
  saveCurrentTabState();
}

function inferLyricsMood(text) {
  const t = (text || "").toLowerCase();
  const sad = ["눈물", "이별", "외로", "그리워", "울", "lonely", "tears"];
  const hopeful = ["희망", "빛", "다시", "꿈", "새벽", "shine", "rise"];
  const intense = ["불", "폭발", "질주", "심장", "burn", "fire", "run"];

  const sadScore = sad.filter((k) => t.includes(k)).length;
  const hopefulScore = hopeful.filter((k) => t.includes(k)).length;
  const intenseScore = intense.filter((k) => t.includes(k)).length;

  if (intenseScore > sadScore && intenseScore > hopefulScore) return "강렬한";
  if (sadScore > hopefulScore) return "서정적인";
  if (hopefulScore > 0) return "희망적인";
  return "감성적인";
}

function inferLyricsTheme(text) {
  const t = (text || "").toLowerCase();
  if (/(사랑|연인|키스|love|heart)/.test(t)) return "사랑";
  if (/(이별|끝|goodbye|miss)/.test(t)) return "이별";
  if (/(꿈|미래|희망|rise|shine)/.test(t)) return "성장";
  if (/(밤|도시|거리|city|night)/.test(t)) return "도시의 밤";
  return "감정 서사";
}

function createMusicExtraSegments(kind, count, storyConfig = getMusicStoryConfig("1", "")) {
  const labels = {
    intro: "인트로 비주얼 시퀀스",
    prelude: "전주 리듬 시퀀스",
    ending: "엔딩 아웃트로 시퀀스"
  };
  const label = labels[kind] || "뮤직비디오 추가 시퀀스";
  return Array.from({ length: count }, (_, idx) => {
    const actorPack = getMusicExtraActorPack(storyConfig, kind, idx);
    return {
      raw: `${label} ${idx + 1}`,
      type: `mv_${kind}`,
      actor_id: actorPack.actorIds[0] || "",
      actor_profile: actorPack.actorProfiles[0] || null,
      actor_ids: actorPack.actorIds,
      actor_profiles: actorPack.actorProfiles,
      story_option: storyConfig.option,
      story_label_ko: storyConfig.labelKo
    };
  });
}

function getMusicStoryConfig(optionRaw, customRaw) {
  const option = String(optionRaw || "1").trim();
  const customKo = String(customRaw || "").trim();
  if (option === "2") {
    return {
      option: "2",
      labelKo: "계절 풍경",
      customKo: "",
      hintEn: "seasonal landscape visual narrative",
      noActors: true
    };
  }
  if (option === "0") {
    return {
      option: "0",
      labelKo: "직접 입력",
      customKo,
      hintEn: customKo ? `custom story concept: ${customKo}` : "custom story concept",
      noActors: false
    };
  }
  return {
    option: "1",
    labelKo: "남여 사랑이야기",
    customKo: "",
    hintEn: "romantic male-female love story arc",
    noActors: false
  };
}

function getMusicDefaultActorProfiles(storyConfig) {
  if (storyConfig.option === "1") {
    return {
      ACTOR1: {
        actor_id: "ACTOR1",
        name_ko: "남자 주인공",
        role_ko: "남자 주인공",
        gender_ko: "남성",
        age_ko: "20대"
      },
      ACTOR2: {
        actor_id: "ACTOR2",
        name_ko: "여자 주인공",
        role_ko: "여자 주인공",
        gender_ko: "여성",
        age_ko: "20대"
      }
    };
  }
  return {
    ACTOR1: {
      actor_id: "ACTOR1",
      name_ko: "보컬",
      role_ko: "뮤직비디오 주인공",
      gender_ko: "",
      age_ko: ""
    }
  };
}

function buildActorPackFromIds(ids, profileMap) {
  const actorIds = (ids || []).filter(Boolean);
  const actorProfiles = actorIds.map((id) => profileMap[id]).filter(Boolean);
  return { actorIds, actorProfiles };
}

function getMusicLyricActorPack(storyConfig, line1, line2, pairIndex) {
  if (storyConfig.noActors) return { actorIds: [], actorProfiles: [] };
  const profileMap = getMusicDefaultActorProfiles(storyConfig);
  if (storyConfig.option !== "1") {
    return buildActorPackFromIds(["ACTOR1"], profileMap);
  }

  const text = `${line1 || ""} ${line2 || ""}`;
  const togetherKeywords = /(우리|함께|둘이|너와 나|같이|포옹|손을 잡|키스|사랑해|입맞춤)/;
  const distantKeywords = /(혼자|외로|이별|떠나|그리워|눈물|기다려|멀어져|헤어)/;

  if (togetherKeywords.test(text)) {
    return buildActorPackFromIds(["ACTOR1", "ACTOR2"], profileMap);
  }
  if (distantKeywords.test(text)) {
    return buildActorPackFromIds(pairIndex % 2 === 0 ? ["ACTOR1"] : ["ACTOR2"], profileMap);
  }
  if (pairIndex === 0) return buildActorPackFromIds(["ACTOR1"], profileMap);
  return buildActorPackFromIds(pairIndex % 3 === 0 ? ["ACTOR1", "ACTOR2"] : (pairIndex % 2 === 0 ? ["ACTOR1"] : ["ACTOR2"]), profileMap);
}

function getMusicExtraActorPack(storyConfig, kind, idx) {
  if (storyConfig.noActors) return { actorIds: [], actorProfiles: [] };
  const profileMap = getMusicDefaultActorProfiles(storyConfig);
  if (storyConfig.option !== "1") {
    return buildActorPackFromIds(["ACTOR1"], profileMap);
  }

  if (kind === "intro") {
    return buildActorPackFromIds(idx === 0 ? ["ACTOR1"] : ["ACTOR2"], profileMap);
  }
  if (kind === "prelude") {
    return buildActorPackFromIds(["ACTOR1", "ACTOR2"], profileMap);
  }
  if (kind === "ending") {
    return buildActorPackFromIds(["ACTOR1", "ACTOR2"], profileMap);
  }
  return buildActorPackFromIds(["ACTOR1", "ACTOR2"], profileMap);
}

function toggleMusicStoryCustomInput() {
  if (!el.musicStorySelect || !el.musicStoryCustomInput) return;
  const show = el.musicStorySelect.value === "0";
  el.musicStoryCustomInput.classList.toggle("hidden", !show);
}

function normalizeLyricsLines(rawText) {
  const lines = String(rawText || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const commentLines = [];
  const lyricLines = [];

  lines.forEach((line) => {
    // Section tags and symbol-prefixed lines are treated as comments.
    const isCommentLine =
      /^\[.*\]$/.test(line) ||
      /^\(.*\)$/.test(line) ||
      /^\{.*\}$/.test(line) ||
      /^(#|\/\/|;|::|\*+|-{2,}|▶|▷|※|♪|♬)/.test(line);

    if (isCommentLine) {
      commentLines.push(line);
      return;
    }

    // Remove wrapping quotes/symbols to keep pure lyric text.
    const cleaned = line
      .replace(/^[\"'“”‘’`~!@#$%^&*_=+<>|\\/:;.,?()\[\]{}-]+/, "")
      .replace(/[\"'“”‘’`~!@#$%^&*_=+<>|\\/:;.,?()\[\]{}-]+$/, "")
      .trim();

    if (!cleaned) {
      commentLines.push(line);
      return;
    }

    // If no meaningful language/number tokens remain, treat as comment.
    if (!/[가-힣a-zA-Z0-9]/.test(cleaned)) {
      commentLines.push(line);
      return;
    }

    lyricLines.push(cleaned);
  });

  return { lyricLines, commentLines };
}

const MUSIC_STYLE_PRESETS = {
  ja_anime_cinematic: {
    label: "일본 애니 시네마틱",
    prompt: "semi-realistic japanese anime cinematic style, expressive lighting, detailed line art"
  },
  ja_anime_ghibli: {
    label: "일본 지브리 스타일",
    prompt: "ghibli-inspired hand-painted animation style, warm natural light, whimsical atmosphere, rich background detail"
  },
  ja_anime_shonen_action: {
    label: "일본 애니 소년액션",
    prompt: "dynamic shonen anime action style, dramatic motion, bold contrast, kinetic framing"
  },
  ja_anime_shojo_romance: {
    label: "일본 애니 소녀로맨스",
    prompt: "shoujo anime romance style, soft highlights, dreamy bokeh, delicate emotional framing"
  },
  ja_anime_slice_of_life: {
    label: "일본 애니 일상감성",
    prompt: "slice-of-life anime style, natural ambience, gentle colors, intimate everyday composition"
  },
  ja_anime_fantasy: {
    label: "일본 애니 판타지",
    prompt: "fantasy anime illustration style, rich atmosphere, magical accents, cinematic depth"
  },
  joseon_yadam_ink: {
    label: "야담 웹툰 수묵풍",
    prompt: "joseon yadam webtoon style, ink-wash brush texture, period costume detail, dramatic shadows"
  },
  joseon_yadam_color_webtoon: {
    label: "야담 웹툰 채색풍",
    prompt: "joseon yadam color webtoon style, painterly textures, historical mood, vivid storytelling panels"
  },
  joseon_yadam_noir_webtoon: {
    label: "야담 웹툰 느와르풍",
    prompt: "joseon noir webtoon style, moody low-key lighting, mystery tone, high-contrast composition"
  },
  retro_bw_1950: {
    label: "1950년대 레트로 흑백",
    prompt: "1950s retro black-and-white photography style, classic film grain, high tonal contrast"
  },
  retro_color_1970: {
    label: "1970년대 복고풍 컬러사진",
    prompt: "1970s retro color photo style, warm vintage tones, analog texture, nostalgic mood"
  },
  modern_photo: {
    label: "현대 사진",
    prompt: "modern photography style, realistic texture, clean color science, contemporary cinematic composition"
  }
};

function getMusicStylePreset(key) {
  return MUSIC_STYLE_PRESETS[key] || MUSIC_STYLE_PRESETS.ja_anime_cinematic;
}

function getMusicStyleEntries() {
  return Object.entries(MUSIC_STYLE_PRESETS);
}

function onReferenceFileChange(event) {
  const file = event.target?.files?.[0];
  if (!file) {
    appState.referenceImageDataUrl = "";
    updateReferencePreview();
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("이미지 파일만 업로드할 수 있습니다.");
    event.target.value = "";
    appState.referenceImageDataUrl = "";
    updateReferencePreview();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    appState.referenceImageDataUrl = typeof reader.result === "string" ? reader.result : "";
    updateReferencePreview();
    void refreshReferencePrompt();
  };
  reader.readAsDataURL(file);
}

function updateReferencePreview() {
  if (!el.referencePreview) return;
  if (appState.referenceImageDataUrl) {
    el.referencePreview.src = appState.referenceImageDataUrl;
    el.referencePreview.classList.remove("hidden");
  } else {
    el.referencePreview.removeAttribute("src");
    el.referencePreview.classList.add("hidden");
  }
}

function saveSampleLyrics() {
  const lyrics = (el.musicLyricsInput?.value || "").trim();
  if (!lyrics) {
    alert("등록할 가사를 먼저 입력하세요.");
    return;
  }

  safeStorageSet(SAMPLE_LYRICS_STORAGE, lyrics);
  updateSampleLyricsButtons();
  flashButtonCopied(el.saveSampleLyricsBtn, "샘플가사 등록");
}

function saveSampleScript() {
  const script = (el.scriptInput?.value || "").trim();
  if (!script) {
    alert("저장할 대본을 먼저 입력하세요.");
    setSampleScriptStatus("저장 실패: 대본이 비어 있습니다.", "warn");
    return;
  }

  const stored = safeStorageSet(SAMPLE_SCRIPT_STORAGE, script);
  appState.sampleScriptMemory = script;
  updateSampleScriptButtons();
  if (!stored) {
    alert("브라우저 저장소 접근이 제한되어 메모리에만 임시 저장했습니다.");
    setSampleScriptStatus("임시 저장됨(브라우저 저장소 제한).", "warn");
  } else {
    setSampleScriptStatus("샘플 대본 저장 완료.", "ok");
  }
  flashButtonCopied(el.saveSampleScriptBtn, "샘플 대본 저장");
}

function loadSampleScript() {
  const saved = safeStorageGet(SAMPLE_SCRIPT_STORAGE) || appState.sampleScriptMemory || "";
  if (!saved) {
    alert("저장된 샘플 대본이 없습니다.");
    setSampleScriptStatus("불러오기 실패: 저장된 샘플 대본이 없습니다.", "warn");
    return;
  }

  if (el.scriptInput) {
    el.scriptInput.value = saved;
  }
  updateScriptMetrics();
  autoGrowScriptInput();
  setSampleScriptStatus("샘플 대본 불러오기 완료.", "ok");
}

function updateSampleScriptButtons() {
  const hasSample = !!(safeStorageGet(SAMPLE_SCRIPT_STORAGE) || appState.sampleScriptMemory);
  if (el.loadSampleScriptBtn) {
    el.loadSampleScriptBtn.disabled = !hasSample;
  }
}

function setSampleScriptStatus(message, tone = "") {
  if (!el.sampleScriptStatus) return;
  el.sampleScriptStatus.textContent = String(message || "");
  el.sampleScriptStatus.classList.remove("ok", "warn");
  if (tone === "ok" || tone === "warn") {
    el.sampleScriptStatus.classList.add(tone);
  }
}

function setMemoStatus(message, tone = "") {
  if (!el.memoStatus) return;
  el.memoStatus.textContent = String(message || "");
  el.memoStatus.classList.remove("ok", "warn");
  if (tone === "ok" || tone === "warn") {
    el.memoStatus.classList.add(tone);
  }
}

function loadSampleLyrics() {
  const saved = safeStorageGet(SAMPLE_LYRICS_STORAGE);
  if (!saved) {
    alert("등록된 샘플가사가 없습니다.");
    return;
  }

  if (el.musicLyricsInput) {
    el.musicLyricsInput.value = saved;
  }
  updateScriptMetrics();
}

function updateSampleLyricsButtons() {
  const hasSample = !!safeStorageGet(SAMPLE_LYRICS_STORAGE);
  if (el.loadSampleLyricsBtn) {
    el.loadSampleLyricsBtn.disabled = !hasSample;
  }
}

function updateSampleScriptButtons() {
  const hasSample = !!safeStorageGet(SAMPLE_SCRIPT_STORAGE);
  if (el.loadSampleScriptBtn) {
    el.loadSampleScriptBtn.disabled = !hasSample;
  }
}

function loadStyleSampleImages() {
  const raw = safeStorageGet(STYLE_SAMPLE_STORAGE);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_e) {
    return {};
  }
}

function saveStyleSampleImages() {
  safeStorageSet(STYLE_SAMPLE_STORAGE, JSON.stringify(appState.styleSampleImages || {}));
}

function loadStyleSamplePrompts() {
  const raw = safeStorageGet(STYLE_PROMPT_STORAGE);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_e) {
    return {};
  }
}

function saveStyleSamplePrompts() {
  safeStorageSet(STYLE_PROMPT_STORAGE, JSON.stringify(appState.styleSamplePrompts || {}));
}

function getStylePromptByKey(styleKey) {
  return (appState.styleSamplePrompts?.[styleKey] || "").trim();
}

function renderMusicStyleGallery() {
  if (!el.musicStyleGallery) return;
  const selectedKey = el.musicStyleSelect?.value || "ja_anime_cinematic";
  const entries = getMusicStyleEntries();

  el.musicStyleGallery.innerHTML = entries
    .map(([key, preset]) => {
      const img = appState.styleSampleImages?.[key] || "";
      const active = key === selectedKey ? "active" : "";
      return `
        <article class="style-card ${active}" data-style-key="${key}">
          <button class="style-pick-btn" data-style-key="${key}">
            ${
              img
                ? `<img src="${img}" alt="${escapeHtml(preset.label)}" class="style-sample-img" />`
                : `<div class="style-sample-placeholder">샘플 이미지 없음</div>`
            }
            <span class="style-sample-label">${escapeHtml(preset.label)}</span>
          </button>
          <div class="panel-head-actions">
            <button class="btn ghost style-upload-btn" data-style-key="${key}">샘플 등록</button>
            <button class="btn ghost style-remove-btn" data-style-key="${key}" ${img ? "" : "disabled"}>삭제</button>
          </div>
        </article>
      `;
    })
    .join("");

  el.musicStyleGallery.querySelectorAll(".style-pick-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-style-key");
      if (!key || !el.musicStyleSelect) return;
      el.musicStyleSelect.value = key;
      syncMusicStyleGallerySelection();
      saveCurrentTabState();
    });
  });

  el.musicStyleGallery.querySelectorAll(".style-upload-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-style-key");
      if (!key) return;
      openStyleSamplePicker(key);
    });
  });

  el.musicStyleGallery.querySelectorAll(".style-remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-style-key");
      if (!key) return;
      delete appState.styleSampleImages[key];
      saveStyleSampleImages();
      renderMusicStyleGallery();
      renderSelectedStyleThumbnail();
    });
  });
}

function syncMusicStyleGallerySelection() {
  if (!el.musicStyleGallery || !el.musicStyleSelect) return;
  const selected = el.musicStyleSelect.value;
  el.musicStyleGallery.querySelectorAll(".style-card").forEach((card) => {
    card.classList.toggle("active", card.getAttribute("data-style-key") === selected);
  });
}

function renderSelectedStyleThumbnail() {
  if (!el.musicStyleSelect || !el.selectedStyleThumb || !el.selectedStyleThumbPlaceholder || !el.removeStyleThumbBtn) return;
  const key = el.musicStyleSelect.value || "ja_anime_cinematic";
  const img = appState.styleSampleImages?.[key] || "";
  const prompt = appState.styleSamplePrompts?.[key] || "";

  if (img) {
    el.selectedStyleThumb.src = img;
    el.selectedStyleThumb.classList.remove("hidden");
    el.selectedStyleThumbPlaceholder.classList.add("hidden");
    el.removeStyleThumbBtn.disabled = false;
  } else {
    el.selectedStyleThumb.removeAttribute("src");
    el.selectedStyleThumb.classList.add("hidden");
    el.selectedStyleThumbPlaceholder.classList.remove("hidden");
    el.removeStyleThumbBtn.disabled = true;
  }
  if (el.selectedStylePromptInput) {
    el.selectedStylePromptInput.value = prompt;
  }
}

function onUploadSelectedStyleThumb() {
  if (!el.musicStyleSelect) return;
  const key = el.musicStyleSelect.value || "ja_anime_cinematic";
  saveSelectedStylePrompt();
  openStyleSamplePicker(key);
}

function onRemoveSelectedStyleThumb() {
  if (!el.musicStyleSelect) return;
  const key = el.musicStyleSelect.value || "ja_anime_cinematic";
  const current = appState.styleSampleImages?.[key];
  if (!current) return;
  void deleteStyleImageFromSource(current);
  delete appState.styleSampleImages[key];
  saveStyleSampleImages();
  renderMusicStyleGallery();
  renderSelectedStyleThumbnail();
}

function saveSelectedStylePrompt() {
  if (!el.musicStyleSelect || !el.selectedStylePromptInput) return;
  const key = el.musicStyleSelect.value || "ja_anime_cinematic";
  const prompt = (el.selectedStylePromptInput.value || "").trim();
  if (prompt) {
    appState.styleSamplePrompts[key] = prompt;
  } else {
    delete appState.styleSamplePrompts[key];
  }
  saveStyleSamplePrompts();
}

function openStyleSamplePicker(styleKey) {
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/*";
  picker.addEventListener("change", () => {
    const file = picker.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      const savedUrl = await uploadStyleImageToSource(styleKey, dataUrl);
      appState.styleSampleImages[styleKey] = savedUrl || dataUrl;
      saveSelectedStylePrompt();
      saveStyleSampleImages();
      renderMusicStyleGallery();
      renderSelectedStyleThumbnail();
    };
    reader.readAsDataURL(file);
  });
  picker.click();
}

async function uploadStyleImageToSource(styleKey, dataUrl) {
  try {
    const res = await fetch("/api/style-asset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ styleKey, dataUrl })
    });
    const json = await res.json();
    if (!res.ok || !json?.ok || !json?.url) return "";
    return `${json.url}?t=${Date.now()}`;
  } catch (_e) {
    return "";
  }
}

async function deleteStyleImageFromSource(url) {
  if (!url || typeof url !== "string") return;
  const clean = url.split("?")[0];
  if (!clean.startsWith("/style_assets/")) return;
  try {
    await fetch("/api/style-asset-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: clean })
    });
  } catch (_e) {
    // Ignore delete failures; local state still updates.
  }
}

async function refreshReferencePrompt() {
  const prompt = await buildReferenceImagePrompt({
    referenceImageDataUrl: appState.referenceImageDataUrl
  });
  appState.referenceImagePrompt = prompt;
  if (el.referencePrompt) {
    el.referencePrompt.value = prompt;
  }
  return prompt;
}

async function buildReferenceImagePrompt({ referenceImageDataUrl }) {
  if (referenceImageDataUrl && getSavedGeminiApiKey()) {
    const geminiPrompt = await buildReferencePromptWithGemini(referenceImageDataUrl);
    if (geminiPrompt) return geminiPrompt;
  }
  if (referenceImageDataUrl) {
    const analyzed = await analyzeImageDataUrl(referenceImageDataUrl);
    if (analyzed) return analyzed;
  }
  return "";
}

async function buildReferencePromptWithGemini(referenceImageDataUrl) {
  const prompt = [
    "Analyze this reference image for image generation.",
    "Return one single-line prompt in English only.",
    `Format: style | subject | location | composition | lighting | mood | color palette | detail level | model hint (${IMAGE_MODEL_NAME})`,
    "No markdown. No numbering."
  ].join("\n");
  const text = await geminiGenerateText({
    prompt,
    inlineImageDataUrl: referenceImageDataUrl
  });
  return String(text || "").replace(/\s+/g, " ").trim();
}

async function analyzeImageDataUrl(dataUrl) {
  try {
    const img = await loadImageElement(dataUrl);
    const canvas = document.createElement("canvas");
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 48, 48);
    const { data } = ctx.getImageData(0, 0, 48, 48);

    let r = 0;
    let g = 0;
    let b = 0;
    let satSum = 0;
    const count = 48 * 48;
    for (let i = 0; i < data.length; i += 4) {
      const rr = data[i];
      const gg = data[i + 1];
      const bb = data[i + 2];
      r += rr;
      g += gg;
      b += bb;
      const max = Math.max(rr, gg, bb);
      const min = Math.min(rr, gg, bb);
      satSum += max === 0 ? 0 : (max - min) / max;
    }

    const avgR = r / count;
    const avgG = g / count;
    const avgB = b / count;
    const brightness = (avgR + avgG + avgB) / 3;
    const saturation = satSum / count;
    const tone = brightness < 90 ? "low-key moody" : brightness > 170 ? "high-key bright" : "balanced cinematic";
    const temp = avgR > avgB + 8 ? "warm color temperature" : avgB > avgR + 8 ? "cool color temperature" : "neutral color temperature";
    const sat = saturation > 0.55 ? "vivid color contrast" : saturation < 0.28 ? "muted desaturated palette" : "moderate saturation";
    const ratio = img.width >= img.height * 1.1 ? "landscape composition" : img.height >= img.width * 1.1 ? "portrait composition" : "square composition";

    return [
      "semi-realistic anime illustration",
      "reference subject",
      "reference location",
      ratio,
      `${tone} mood`,
      temp,
      sat,
      "cinematic lighting",
      "bokeh effect",
      "shallow depth of field",
      "nostalgic atmosphere",
      "high detail",
      "professional quality"
    ].join(" | ");
  } catch (_e) {
    return "";
  }
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function autoGrowTextarea() {
  const t = el.liveScriptEditor;
  t.style.height = "auto";
  t.style.height = `${Math.max(120, t.scrollHeight)}px`;
}

function autoGrowScriptInput() {
  const t = el.scriptInput;
  if (!t) return;
  applyScriptInputHeight(appState.scriptInputHeight || 2, false);
}

function setScriptInputCollapsed(collapsed) {
  const shouldCollapse = collapsed && appState.inputMode === "script";
  appState.scriptCollapsed = shouldCollapse;
  el.scriptInputArea.classList.toggle("collapsed", shouldCollapse);
}

function expandScriptInputPreserveViewport() {
  if (!el.scriptInputArea || !appState.scriptCollapsed) return;
  setScriptInputCollapsed(false);
  requestAnimationFrame(() => autoGrowScriptInput());
}

function buildEditorText(result) {
  return result?.directors_view?.script_ko || "";
}

function syncLiveScriptEditorToJson() {
  if (!el.liveScriptEditor || !appState.lastResult) return;

  const nextText = el.liveScriptEditor.value || "";
  const mode = appState.lastResult?.input?.input_mode || appState.inputMode || "script";

  if (!appState.lastResult.directors_view) appState.lastResult.directors_view = {};
  if (!appState.lastResult.input) appState.lastResult.input = {};

  appState.lastResult.directors_view.script_ko = nextText;
  if (mode === "musicvideo") {
    appState.lastResult.input.lyrics_text = nextText;
  } else {
    appState.lastResult.input.script_text = nextText;
  }

  syncLiveScriptEditorToKeyframes(nextText, mode);

  if (el.jsonOutput && el.jsonPanel && !el.jsonPanel.classList.contains("hidden")) {
    el.jsonOutput.textContent = JSON.stringify(appState.lastResult, null, 2);
  }

  // Any content edit invalidates previous "copied" state.
  setCopyButtonState(false);
  saveCurrentTabState();
}

function syncLiveScriptEditorToKeyframes(nextText, mode) {
  const prev = appState.lastResult;
  if (!prev) return;

  if (mode !== "script" && mode !== "musicvideo") return;

  const effects = {
    bgm: !!prev?.settings?.effects?.bgm,
    vfx: !!prev?.settings?.effects?.vfx,
    sfx: !!prev?.settings?.effects?.sfx
  };
  const runtime = mode === "script" ? "15s" : (el.runtimeSelect?.value || inferRuntimeFromTimeline(prev));
  const settings = {
    ratio: "9:16",
    runtime,
    effects,
    generate_keyframes: !!(prev?.settings?.generate_keyframes ?? (prev?.keyframes?.length > 0)),
    generate_contact_sheet: !!prev?.contact_sheet?.enabled
  };

  let rebuilt = null;
  if (mode === "script") {
    const scriptText = String(nextText || "").trim();
    const scriptAnalysis = analyzeScript(scriptText);
    rebuilt = buildResult({
      inputMode: "script",
      scriptText,
      memoText: prev?.input?.memo_text || "",
      soraLinkText: prev?.input?.sora2_link || "",
      musicLyricsText: "",
      musicStyleKey: "",
      musicStyleLabel: "",
      musicStoryOption: "",
      musicStoryCustom: "",
      musicSynopsisInputText: "",
      referenceImageDataUrl: "",
      referenceImagePrompt: "",
      kfStyleNote: prev?.input?.kf_style_note || "",
      settings,
      kfCount: scriptAnalysis.kfCount,
      scriptAnalysis,
      musicAnalysis: null
    });
  } else {
    const lyricsText = String(nextText || "").trim();
    const storyOption = prev?.input?.music_story_option || "1";
    const storyCustom = prev?.input?.music_story_custom_ko || "";
    const musicAnalysis = analyzeMusicLyrics(lyricsText, storyOption, storyCustom);
    const synopsisInput = prev?.input?.music_synopsis_input_ko || prev?.directors_view?.music_video_synopsis_ko || "";
    rebuilt = buildResult({
      inputMode: "musicvideo",
      scriptText: "",
      memoText: prev?.input?.memo_text || "",
      soraLinkText: prev?.input?.sora2_link || "",
      musicLyricsText: lyricsText,
      musicStyleKey: prev?.input?.music_style_key || "ja_anime_cinematic",
      musicStyleLabel: prev?.input?.music_style_label || getMusicStylePreset(prev?.input?.music_style_key || "ja_anime_cinematic").label,
      musicStoryOption: storyOption,
      musicStoryCustom: storyCustom,
      musicSynopsisInputText: synopsisInput,
      referenceImageDataUrl: "",
      referenceImagePrompt: "",
      kfStyleNote: prev?.input?.kf_style_note || "",
      settings,
      kfCount: musicAnalysis.kfCount,
      scriptAnalysis: null,
      musicAnalysis
    });
  }

  if (!rebuilt) return;

  rebuilt.meta = prev.meta || rebuilt.meta;
  appState.lastResult = rebuilt;

  if (el.keyframePanel && !el.keyframePanel.classList.contains("hidden")) {
    el.kframeMeta.textContent = `Mode: ${rebuilt.keyframe_plan.mode} | KF: ${rebuilt.keyframe_plan.kf_count} | Timeline: ${rebuilt.keyframe_plan.timeline_sec}s | Est: ${rebuilt.keyframe_plan.estimated_content_sec || 0}s`;
    renderKeyframeCards(rebuilt);
  }

  if (mode === "musicvideo" && el.mvSynopsisText) {
    el.mvSynopsisText.textContent = rebuilt?.directors_view?.music_video_synopsis_ko || "";
  }
}

function inferRuntimeFromTimeline(result) {
  const timeline = Number(result?.keyframe_plan?.timeline_sec || 0);
  if (timeline === 10) return "10s";
  if (timeline === 15) return "15s";
  if (timeline === 60) return "60s";
  return "directors_cut";
}

function buildMusicVideoSynopsis(musicAnalysis, styleLabel) {
  const mood = musicAnalysis?.moodKo || "감성적";
  const theme = musicAnalysis?.themeKo || "감정 서사";
  const storyLabel = musicAnalysis?.storyLabelKo || "뮤직비디오 스토리";
  const custom = (musicAnalysis?.storyCustomKo || "").trim();
  const lines = Array.isArray(musicAnalysis?.lines) ? musicAnalysis.lines : [];

  const motif = lines
    .slice(0, 4)
    .map((l) => String(l).replace(/[\"'“”‘’]/g, "").trim())
    .filter(Boolean)
    .map((l) => truncateKorean(l, 16))
    .slice(0, 2)
    .join(", ");

  const arc = inferLyricNarrativeArc(lines.join(" "));
  const customSentence = custom ? `핵심 설정은 ${custom}이며,` : "";
  const motifSentence = motif ? `가사의 핵심 장면(${motif})을 따라` : "가사의 핵심 정서를 따라";

  const text = `${storyLabel} 기반 서사로 ${customSentence} ${motifSentence} 인물의 감정이 ${arc} 흐름으로 확장된다. 전체적으로 ${mood} 결을 유지하며 ${theme} 주제를 선명하게 전달하는 뮤직비디오로 전개된다.`;
  return truncateKorean(text.replace(/\s+/g, " ").trim(), 299);
}

function inferLyricNarrativeArc(text) {
  const t = String(text || "").toLowerCase();
  if (/(만남|처음|설렘|사랑|함께|기다림|재회)/.test(t)) {
    return "만남-갈등-재회";
  }
  if (/(이별|눈물|외로움|그리움|떠나|헤어)/.test(t)) {
    return "밀착-균열-여운";
  }
  if (/(봄|여름|가을|겨울|바람|비|눈|새벽|노을)/.test(t)) {
    return "계절 변화와 함께 감정이 성숙되는";
  }
  return "상승-정점-잔향";
}

function renderKeyframeCards(result) {
  el.keyframeList.innerHTML = result.keyframes.map((kf) => `
    <article class="kframe-card">
      <h4>KF ${kf.frame_number}</h4>
      <p><strong>Shot:</strong> ${kf.shot_type}</p>
      <p><strong>Duration:</strong> ${kf.duration_sec}s</p>
      ${
        kf.source_type === "lyric_pair"
          ? `<p><strong>가사:</strong> ${escapeHtml(kf.lyric_text_ko || "-").replace(/\n/g, "<br>")}</p>`
          : `<p><strong>원문(${kf.source_type || "n/a"}):</strong> ${escapeHtml(kf.source_text || "-")}</p>`
      }
      ${
        formatActorDetails(kf)
          ? `<p><strong>Actors:</strong> ${escapeHtml(formatActorDetails(kf))}</p>`
          : ""
      }
      <p><strong>Action:</strong> ${kf.actor_action_en}</p>
      <p><strong>Camera:</strong> ${kf.camera_work_en}</p>
      <p><strong>Lens:</strong> ${kf.lens_en}</p>
      <p><strong>Lighting:</strong> ${kf.lighting_en}</p>
      <p><strong>Sound:</strong> ${kf.sound_en}</p>
      <p><strong>Image Prompt:</strong> ${escapeHtml(kf.image_prompt_en || "-")}</p>
      <div class="panel-head-actions">
        <button class="btn ghost copy-kf-prompt-btn" data-kf-index="${kf.frame_number - 1}">프롬프트 복사</button>
      </div>
    </article>
  `).join("");
  bindKfCopyButtons();
}

function buildKfImagePrompt({ frameNumber, total, shotType, cameraWork, lens, basePrompt, kfStyleNote, sourceText }) {
  const style = kfStyleNote ? `, style note: ${kfStyleNote}` : "";
  const source = sourceText ? `, scene cue: ${sourceText}` : "";
  return `${basePrompt}, ${shotType} shot, ${cameraWork}, ${lens} lens${style}${source}, pure image generation prompt for ${IMAGE_MODEL_NAME}, high detail`;
}

function bindKfCopyButtons() {
  el.keyframeList.querySelectorAll(".copy-kf-prompt-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const idx = Number(btn.getAttribute("data-kf-index"));
      const kf = appState.lastResult?.keyframes?.[idx];
      if (!kf) return;
      const promptCopyText = buildKfPromptCopyText(kf);
      try {
        await navigator.clipboard.writeText(promptCopyText);
        flashButtonCopied(btn, "프롬프트 복사");
      } catch (_e) {
        alert("KF 프롬프트 복사에 실패했습니다.");
      }
    });
  });
}

function buildKfPromptCopyText(kf) {
  const actorText = formatActorDetails(kf);
  return [
    "주의: 스토리보드 관련 표기 금지, 순수 이미지만 생성",
    ...(actorText ? [`Actors: ${actorText}`] : []),
    `Action: ${kf.actor_action_en || ""}`,
    `Camera: ${kf.camera_work_en || ""}`,
    `Lens: ${kf.lens_en || ""}`,
    `Lighting: ${kf.lighting_en || ""}`,
    `Sound: ${kf.sound_en || ""}`,
    `Image Prompt: ${kf.image_prompt_en || ""}`
  ].join("\n\n");
}

function formatActorDetails(kf) {
  const ids = Array.isArray(kf?.actor_ids) ? kf.actor_ids : [];
  const profiles = Array.isArray(kf?.actor_profiles) ? kf.actor_profiles : [];

  const detailed = ids.map((id) => {
    const profile = profiles.find((p) => p?.actor_id === id);
    if (!profile) return id;
    const rawParts = [profile.role_ko, profile.gender_ko, profile.age_ko].filter(Boolean);
    const parts = Array.from(new Set(rawParts));
    return parts.length ? `${id}(${parts.join("/")})` : id;
  });

  return detailed.filter(Boolean).join(", ");
}

function flashButtonCopied(button, resetLabel) {
  if (!button) return;
  button.textContent = "COPIED!";
  button.classList.add("copied");
  setTimeout(() => {
    button.textContent = resetLabel;
    button.classList.remove("copied");
  }, 1000);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeContactSheetDataUrl(keyframes, ratio) {
  const canvas = document.createElement("canvas");
  canvas.width = ratio === "9:16" ? 1080 : 1440;
  canvas.height = 810;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0a1220";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 4;
  const rows = 3;
  const pad = 16;
  const cellW = (canvas.width - pad * (cols + 1)) / cols;
  const cellH = (canvas.height - pad * (rows + 1)) / rows;

  keyframes.slice(0, 12).forEach((kf, i) => {
    const c = i % cols;
    const r = Math.floor(i / cols);
    const x = pad + c * (cellW + pad);
    const y = pad + r * (cellH + pad);

    ctx.fillStyle = i % 2 ? "#1a2941" : "#132238";
    ctx.fillRect(x, y, cellW, cellH);

    ctx.strokeStyle = "#355075";
    ctx.strokeRect(x, y, cellW, cellH);

    ctx.fillStyle = "#38d09b";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText(`KF ${kf.frame_number}`, x + 14, y + 34);

    ctx.fillStyle = "#e8edf4";
    ctx.font = "18px sans-serif";
    ctx.fillText(kf.shot_type, x + 14, y + 64);
    ctx.fillText(`${kf.duration_sec}s`, x + 14, y + 92);
  });

  return canvas.toDataURL("image/jpeg", 0.9);
}

function splitScriptSegments(text) {
  const actorLines = getValidActorLines(text);
  if (!actorLines.length) return [];

  return actorLines
    .map((line) => {
      const parsed = parseActorLine(line);
      const content = extractCueContent(line);
      if (!content) return null;
      return {
        raw: content,
        type: classifySegmentType(content),
        actor_id: parsed.actorId,
        actor_profile: {
          actor_id: parsed.actorId,
          name_ko: parsed.nameKo,
          role_ko: parsed.roleKo,
          gender_ko: parsed.genderKo,
          age_ko: parsed.ageKo
        },
        source_line: line
      };
    })
    .filter(Boolean);
}

function classifySegmentType(seg) {
  const s = seg.trim();
  if (/^\[.*\]$/.test(s) || /^\(.*\)$/.test(s)) return "direction";
  if (/^(지문|scene|sfx|fx)\s*[:：]/i.test(s)) return "direction";
  if (s.includes("지문")) return "direction";
  if (/^["'“‘].*["'”’]$/.test(s)) return "dialogue";
  return "dialogue";
}

function estimateSegmentSeconds(segment) {
  const chars = (segment.raw || "").replace(/\s+/g, "").length;
  const pauses = ((segment.raw || "").match(/[,.!?;:，。！？]/g) || []).length;
  if (segment.type === "direction") {
    return Math.max(0.8, chars / 9 + pauses * 0.08);
  }
  return Math.max(1.0, chars / 4.8 + pauses * 0.12);
}

function extractCueContent(line) {
  if (!line) return "";

  // Prefer text after the first colon: ACTOR meta before colon is ignored.
  const tail = line.includes(":") ? line.slice(line.indexOf(":") + 1).trim() : line.trim();
  if (!tail) return "";

  const directionMatches = tail.match(/\([^)]*\)|\[[^\]]*\]/g) || [];
  const dialogueMatches = tail.match(/"[^"]+"|'[^']+'|“[^”]+”|‘[^’]+’/g) || [];

  if (directionMatches.length || dialogueMatches.length) {
    return [...directionMatches, ...dialogueMatches].join(" ").trim();
  }

  return tail;
}

function sanitizeScriptNoise(text) {
  const lines = String(text || "").split("\n");
  const filtered = lines.filter((line) => !isScriptNoiseLine(line));
  return filtered.join("\n");
}

function sanitizeScriptInputInPlace() {
  if (!el.scriptInput) return;
  const prev = String(el.scriptInput.value || "");
  const next = sanitizeScriptNoise(prev);
  if (prev === next) return;

  const pos = Math.min(el.scriptInput.selectionStart ?? next.length, next.length);
  el.scriptInput.value = next;
  el.scriptInput.setSelectionRange(pos, pos);
}

function formatScriptForEditor(text) {
  const actorLines = getValidActorLines(text);
  if (actorLines.length) return actorLines.join("\n");
  return (text || "").trim();
}

function getValidActorLines(text) {
  const raw = (text || "").trim();
  if (!raw) return [];

  const lines = raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((line) => !isScriptNoiseLine(line));

  // Only keep strict ACTOR cue lines with actual content after ":".
  return lines.filter((line) => {
    if (!/^ACTOR\d*\b/i.test(line)) return false;
    const colonIdx = line.indexOf(":");
    if (colonIdx < 0) return false;
    return line.slice(colonIdx + 1).trim().length > 0;
  });
}

function isScriptNoiseLine(line) {
  const t = String(line || "").trim();
  if (!t) return false;
  if (/^대사\s*글자수\s*집계\s*:?\s*$/i.test(t)) return true;
  if (/^이\s*대본\s*따옴표\s*대사\s*총합\s*[:：].+$/i.test(t)) return true;
  if (/^ACTOR\d+\b.*대사\s*합\s*[:：].*$/i.test(t)) return true;
  return false;
}

function parseActorLine(line) {
  const actorIdMatch = line.match(/^(ACTOR\d*)\b/i);
  const actorId = actorIdMatch ? actorIdMatch[1].toUpperCase() : "ACTOR1";

  const infoMatch = line.match(/\(([^)]*)\)/);
  const info = infoMatch ? infoMatch[1] : "";
  const parts = info
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);

  let genderKo = "";
  let roleKo = "";
  let ageKo = "";
  let nameKo = "";

  for (const part of parts) {
    if (!genderKo && /(남성|여성|남자|여자)/.test(part)) {
      genderKo = part;
      continue;
    }
    if (!ageKo && /(대|살|초반|중반|후반)/.test(part)) {
      ageKo = part;
      continue;
    }
    if (!roleKo) {
      roleKo = part;
      continue;
    }
    if (!nameKo) {
      nameKo = part;
    }
  }

  return { actorId, nameKo, roleKo, genderKo, ageKo };
}

function buildCharacterMap(segments) {
  const map = {};
  segments.forEach((seg) => {
    const single = seg.actor_profile;
    const multi = Array.isArray(seg.actor_profiles) ? seg.actor_profiles : [];

    if (single?.actor_id && !map[single.actor_id]) {
      map[single.actor_id] = single;
    }
    multi.forEach((p) => {
      if (!p?.actor_id) return;
      if (!map[p.actor_id]) map[p.actor_id] = p;
    });
  });
  return map;
}

function makeHistoryTitle(result) {
  const base = (
    result?.input?.script_text
    || result?.directors_view?.script_ko
    || result?.input?.lyrics_text
    || result?.title
    || ""
  )
    .replace(/\s+/g, " ")
    .trim();

  if (!base) return "스토리보드";
  return base;
}

function truncateKorean(text, maxLen) {
  const chars = Array.from(text || "");
  if (chars.length <= maxLen) return text;
  return `${chars.slice(0, maxLen).join("")}...`;
}

function extractFirstHttpUrl(text) {
  const match = String(text || "").match(/https?:\/\/[^\s]+/i);
  if (!match) return "";
  return normalizeHttpUrl(match[0]);
}

function normalizeHttpUrl(raw) {
  try {
    const url = new URL(String(raw || "").trim());
    return /^https?:$/i.test(url.protocol) ? url.toString() : "";
  } catch (_e) {
    return "";
  }
}

function renderMemoWithHyperlinks(text) {
  const source = String(text || "");
  const parts = source.split(/(https?:\/\/[^\s]+)/gi);
  return parts.map((part) => {
    const normalized = normalizeHttpUrl(part);
    if (!normalized) return escapeHtml(part);
    const safeUrl = escapeHtml(normalized);
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a>`;
  }).join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
