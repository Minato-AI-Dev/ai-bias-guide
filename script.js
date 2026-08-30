/* AI偏見図鑑 — ロジック */
(function () {
  "use strict";

  var app = document.getElementById("app");
  var globalNote = document.getElementById("global-count-note");

  var FIELD_LABELS = [
    ["bias", "あなたの偏見"],
    ["fatal", "致命傷"],
    ["phrase", "口癖"],
    ["enemy", "天敵"],
    ["match", "相性のいいAIユーザー"]
  ];

  /* ---------- storage ---------- */
  function getCount() {
    var v = parseInt(localStorage.getItem("aibias_diagnosis_count") || "0", 10);
    return isNaN(v) ? 0 : v;
  }
  function bumpCount() {
    var v = getCount() + 1;
    localStorage.setItem("aibias_diagnosis_count", String(v));
    return v;
  }

  /* ---------- parsing / matching ---------- */
  function parseInput(raw) {
    return raw
      .split(/[\n,、,・\/／]+/)
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  function normalize(s) {
    return s.trim().toLowerCase().replace(/\s+/g, " ");
  }

  function matchAiKey(token) {
    var n = normalize(token);
    var nCompact = n.replace(/[\s.\-_]/g, "");
    var key;
    for (key in AI_DB) {
      var aliases = AI_DB[key].aliases;
      for (var i = 0; i < aliases.length; i++) {
        var a = normalize(aliases[i]);
        if (a === n) return key;
      }
    }
    for (key in AI_DB) {
      var aliases2 = AI_DB[key].aliases;
      for (var j = 0; j < aliases2.length; j++) {
        var aCompact = normalize(aliases2[j]).replace(/[\s.\-_]/g, "");
        if (aCompact.length >= 3 && aCompact === nCompact) return key;
      }
    }
    return null;
  }

  function matchCategory(token) {
    var n = normalize(token);
    for (var i = 0; i < CATEGORY_DB.length; i++) {
      var cat = CATEGORY_DB[i];
      for (var k = 0; k < cat.keywords.length; k++) {
        if (n.indexOf(cat.keywords[k].toLowerCase()) !== -1) return cat;
      }
    }
    return null;
  }

  function resolveToken(token) {
    var aiKey = matchAiKey(token);
    if (aiKey) return { type: "ai", key: aiKey, raw: token };
    var cat = matchCategory(token);
    if (cat) return { type: "category", key: cat.key, raw: token };
    return { type: "unknown", raw: token };
  }

  /* ---------- objection state ---------- */
  var objectionIndex = 0;
  var evasive = false;
  var evasiveHandler = null;

  function resetObjection() {
    objectionIndex = 0;
    evasive = false;
    if (evasiveHandler) {
      window.removeEventListener("mousemove", evasiveHandler);
      evasiveHandler = null;
    }
  }

  function wireObjectionButton(btn) {
    btn.addEventListener("click", function () {
      if (objectionIndex >= OBJECTION_STEPS.length) return;
      var step = OBJECTION_STEPS[objectionIndex];
      objectionIndex++;

      if (step.text) {
        showToast(step.text);
        if (step.followUp) {
          setTimeout(function () { showToast(step.followUp); }, step.followUpDelay || 800);
        }
      }
      if (step.relabel) btn.textContent = step.relabel;
      if (step.shrink) { btn.textContent = step.shrink; btn.classList.add("tiny"); }
      if (step.evasive) startEvasion(btn);
      if (step.remove) {
        setTimeout(function () {
          if (evasiveHandler) window.removeEventListener("mousemove", evasiveHandler);
          btn.remove();
        }, 700);
      }
    });
  }

  function startEvasion(btn) {
    evasive = true;
    var rect = btn.getBoundingClientRect();
    btn.classList.add("evasive");
    btn.style.left = rect.left + "px";
    btn.style.top = rect.top + "px";
    requestAnimationFrame(function () {
      btn.style.left = (window.innerWidth - btn.offsetWidth - 24) + "px";
      btn.style.top = rect.top + "px";
    });

    evasiveHandler = function (e) {
      if (!document.body.contains(btn)) {
        window.removeEventListener("mousemove", evasiveHandler);
        return;
      }
      var r = btn.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        var margin = 16;
        var maxLeft = window.innerWidth - r.width - margin;
        var maxTop = window.innerHeight - r.height - margin;
        var nx = Math.random() * (maxLeft - margin) + margin;
        var ny = Math.random() * (maxTop - margin) + margin;
        btn.style.left = nx + "px";
        btn.style.top = ny + "px";
      }
    };
    window.addEventListener("mousemove", evasiveHandler);
  }

  /* ---------- toast ---------- */
  var toastTimer = null;
  function showToast(text) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = text;
    clearTimeout(toastTimer);
    requestAnimationFrame(function () { el.classList.add("show"); });
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  /* ---------- stats ---------- */
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function stars(n) {
    var full = "★".repeat(n), empty = "☆".repeat(5 - n);
    return full + empty;
  }

  function buildStats() {
    var confidence = rand(93, 99);
    var dependence = rand(70, 95);
    var kindred = rand(65, 90);
    var reentry = rand(2, 5);
    var tolerance = rand(5, 25);
    var reaction = (rand(3, 15) / 10).toFixed(1);
    var billing = rand(3, 5);
    var cancelCount = rand(3, 8);

    return {
      confidence: confidence,
      rows: [
        { label: "偏見信頼度", val: confidence + "%", note: "残り" + (100 - confidence) + "%はあなたのプライドに配慮しました。", bar: confidence },
        { label: "AI依存濃度", val: dependence + "%", note: "まだ電卓は自分で押しているのでセーフです。", bar: dependence },
        { label: "同類発見率", val: kindred + "%", note: "Xを開けば3分以内に見つかります。", bar: kindred },
        { label: "社会復帰難易度", val: stars(reentry), note: "まだExcelに戻れる可能性があります。" },
        { label: "手作業耐性", val: tolerance + "%", note: "コピペ2回目で自動化を検討します。", bar: tolerance },
        { label: "新作AI反応速度", val: reaction + "秒", note: "Product Huntより先に振り向く。" },
        { label: "月額課金危険度", val: stars(billing), note: "解約予定のAIが現在" + cancelCount + "個あります。" },
        { label: "おすすめの次のAI", val: "なし", note: "これ以上増やすと、AIを管理するAIが必要です。" }
      ]
    };
  }

  function renderStatsHtml(stats) {
    return stats.rows.map(function (r) {
      var barHtml = ("bar" in r)
        ? '<div class="stat-track"><span class="stat-fill" data-w="' + r.bar + '"></span></div>'
        : '<div class="stat-track"><span class="stat-fill stars-fill" style="width:100%;background:transparent;color:var(--accent)"></span></div>';
      return (
        '<div class="stat-row">' +
          '<div class="stat-top"><span class="stat-label">' + r.label + '</span><span class="stat-val mono">' + r.val + '</span></div>' +
          barHtml +
          '<div class="stat-note">' + r.note + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function animateBars(root) {
    requestAnimationFrame(function () {
      root.querySelectorAll(".stat-fill[data-w]").forEach(function (el) {
        el.style.width = el.getAttribute("data-w") + "%";
      });
    });
  }

  /* ---------- share ---------- */
  function shareText(name, bias, fatal, confidence) {
    return "私のAI偏見診断は『" + name + "』でした。\n\n偏見：\n『" + bias + "』\n\n致命傷：\n『" + fatal + "』\n\n偏見信頼度：" + confidence + "%\n\n#AI偏見図鑑";
  }

  function wireShareButton(btn, textFn) {
    btn.addEventListener("click", function () {
      var text = textFn();
      var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
      window.open(url, "_blank", "noopener");
      showToast("放流しました。");
      setTimeout(function () { showToast("これでフォロワーにもあなたのAI遍歴がバレます。"); }, 1000);
    });
  }

  /* ---------- action row (objection + share + retry) ---------- */
  function actionRowHtml() {
    return (
      '<div class="result-actions">' +
        '<button class="btn" id="objection-btn">異議あり</button>' +
        '<button class="btn ghost" id="share-btn">この偏見をXに放流する</button>' +
        '<button class="btn ghost" id="retry-btn">別のAIでも傷つく</button>' +
      '</div>'
    );
  }

  function wireActionRow(root, shareFn) {
    resetObjection();
    var objBtn = root.querySelector("#objection-btn");
    if (objBtn) wireObjectionButton(objBtn);
    var shareBtn = root.querySelector("#share-btn");
    if (shareBtn) wireShareButton(shareBtn, shareFn);
    var retryBtn = root.querySelector("#retry-btn");
    if (retryBtn) retryBtn.addEventListener("click", renderIntro);
  }

  /* ---------- global threshold check ---------- */
  function checkGlobal(count) {
    for (var i = 0; i < GLOBAL_MESSAGES.length; i++) {
      var m = GLOBAL_MESSAGES[i];
      if (count >= m.threshold) return m;
    }
    return null;
  }

  function applyGlobalFooter(count) {
    var m = checkGlobal(count);
    if (m && !m.takeover) globalNote.textContent = m.text;
    else globalNote.textContent = "";
  }

  function renderTakeover() {
    app.innerHTML =
      '<div class="takeover screen">' +
        '<div class="eyebrow">System Notice</div>' +
        '<h1>おめでとうございます</h1>' +
        '<p>あなたがAIです。</p>' +
      '</div>';
    app.querySelector(".takeover").addEventListener("click", renderIntro);
  }

  /* ---------- screens ---------- */
  function renderIntro() {
    resetObjection();
    app.innerHTML =
      '<section class="screen intro">' +
        '<div class="eyebrow">Bias Diagnostics</div>' +
        '<h1>好きなAIを入れるだけで、<br>あなたの性格を根拠なく、<br>しかし妙に解像度高く決めつけます。</h1>' +
        '<p class="lede">診断に<strong>科学的根拠は一切ありません。</strong>そのぶん、妙に刺さります。</p>' +
        '<div class="input-block">' +
          '<div class="input-label">最近、何に魂を売りましたか？</div>' +
          '<div class="input-row">' +
            '<input id="handle-input" type="text" placeholder="例：ChatGPT / Claude / Cursor / Midjourney" autocomplete="off">' +
          '</div>' +
          '<div class="examples"><b>複数可</b>：カンマや改行で区切って入力できます。</div>' +
          '<div class="hint" id="input-hint"></div>' +
        '</div>' +
        '<div class="action-row"><button class="btn" id="submit-btn">偏見を見る</button></div>' +
      '</section>';

    var input = document.getElementById("handle-input");
    var hint = document.getElementById("input-hint");
    function submit() {
      var raw = input.value;
      if (!raw.trim()) {
        hint.textContent = "何か入れてください。何もなければ診断のしようがありません。";
        input.focus();
        return;
      }
      runDiagnosis(raw);
    }
    document.getElementById("submit-btn").addEventListener("click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    input.focus();

    applyGlobalFooter(getCount());
  }

  function runDiagnosis(raw) {
    var count = bumpCount();
    var g = checkGlobal(count);
    if (g && g.takeover) { renderTakeover(); return; }
    applyGlobalFooter(count);

    var tokens = parseInput(raw);
    var total = tokens.length;

    if (total >= 10) { renderOverload(tokens); return; }
    if (total >= 5) { renderManySequence(tokens); return; }

    var resolved = tokens.map(resolveToken);
    var aiKeysAll = resolved.filter(function (r) { return r.type === "ai"; }).map(function (r) { return r.key; });
    var uniqueAiKeys = aiKeysAll.filter(function (k, i) { return aiKeysAll.indexOf(k) === i; });

    // duplicate: 2+ tokens, all the same resolved identity
    if (total >= 2) {
      var firstSig = tokenSignature(resolved[0]);
      var allSame = resolved.every(function (r) { return tokenSignature(r) === firstSig; });
      if (allSame) { renderDuplicate(resolved[0], total); return; }
    }

    // combos
    if (uniqueAiKeys.length >= 2) {
      for (var i = 0; i < COMBOS.length; i++) {
        var combo = COMBOS[i];
        var hasAll = combo.names.every(function (n) { return uniqueAiKeys.indexOf(n) !== -1; });
        if (hasAll) { renderCombo(combo); return; }
      }
    }

    if (total === 1) {
      renderSingleResult(resolved[0]);
      return;
    }

    renderMultiResult(tokens, resolved);
  }

  function tokenSignature(r) {
    if (r.type === "ai") return "ai:" + r.key;
    if (r.type === "category") return "cat:" + r.key;
    return "unk:" + normalize(r.raw);
  }

  function renderSingleResult(resolved) {
    if (resolved.type === "ai") renderAiCard(AI_DB[resolved.key]);
    else if (resolved.type === "category") renderCategoryCard(resolved.key);
    else renderUnknownCard(resolved.raw);
  }

  function fieldRowsHtml(entry) {
    var html = "";
    FIELD_LABELS.forEach(function (pair) {
      var key = pair[0], label = pair[1];
      if (entry[key]) {
        html += '<div class="field-row"><div class="field-tab">' + label + '</div><div class="field-text">' + entry[key] + '</div></div>';
      }
    });
    return html;
  }

  function renderAiCard(entry) {
    var stats = buildStats();
    app.innerHTML =
      '<section class="screen">' +
        '<div class="card">' +
          '<div class="stamp">判定済</div>' +
          '<div class="spec-label">SPECIMEN / AI</div>' +
          '<h2 class="ai-name">' + entry.name + '</h2>' +
          '<div class="field-list">' + fieldRowsHtml(entry) + '</div>' +
          (entry.extra ? '<div class="extra-note">' + entry.extra + '</div>' : "") +
          '<div class="stats"><h3>追撃ステータス</h3><div class="stat-grid">' + renderStatsHtml(stats) + '</div></div>' +
        '</div>' +
        actionRowHtml() +
      '</section>';
    animateBars(app);
    wireActionRow(app, function () { return shareText(entry.name, entry.bias, entry.fatal, stats.confidence); });
  }

  function renderCategoryCard(key) {
    var cat = CATEGORY_DB.filter(function (c) { return c.key === key; })[0];
    var stats = buildStats();
    app.innerHTML =
      '<section class="screen">' +
        '<div class="card">' +
          '<div class="stamp">分類</div>' +
          '<div class="spec-label">SPECIMEN / UNCATALOGUED</div>' +
          '<h2 class="ai-name">' + cat.name + '</h2>' +
          '<div class="field-list">' + fieldRowsHtml(cat) + '</div>' +
          '<div class="stats"><h3>追撃ステータス</h3><div class="stat-grid">' + renderStatsHtml(stats) + '</div></div>' +
        '</div>' +
        actionRowHtml() +
      '</section>';
    animateBars(app);
    wireActionRow(app, function () { return shareText(cat.name, cat.bias, cat.fatal || "", stats.confidence); });
  }

  function renderUnknownCard(raw) {
    var quote = UNKNOWN_QUOTES[rand(0, UNKNOWN_QUOTES.length - 1)];
    app.innerHTML =
      '<section class="screen">' +
        '<div class="plain-card">' +
          '<div class="spec-label">SPECIMEN / UNKNOWN</div>' +
          '<h2 class="ai-name" style="padding-right:0;margin-top:10px;">' + escapeHtml(raw) + '</h2>' +
          '<p class="quote" style="margin-top:20px;">' + quote + '</p>' +
        '</div>' +
        actionRowHtml() +
      '</section>';
    var root = app;
    root.querySelector("#objection-btn").remove();
    wireActionRow(root, function () { return shareText(raw, quote, "所在不明", 100); });
  }

  function renderCombo(combo) {
    app.innerHTML =
      '<section class="screen">' +
        '<div class="plain-card">' +
          (combo.title ? '<h2 class="ai-name" style="padding-right:0;">' + combo.title + '</h2>' : '<div class="spec-label">SPECIAL CASE</div>') +
          '<p class="quote" style="margin-top:16px;">' + combo.text + '</p>' +
          (combo.button ? '<div class="action-row" style="justify-content:center;"><button class="btn ghost" id="combo-reply-btn">' + combo.button + '</button></div>' : "") +
        '</div>' +
        actionRowHtml() +
      '</section>';
    var replyBtn = app.querySelector("#combo-reply-btn");
    if (replyBtn) {
      replyBtn.addEventListener("click", function () {
        showToast(combo.reply || "");
        replyBtn.disabled = true;
      });
    }
    var objBtn = app.querySelector("#objection-btn");
    if (objBtn) objBtn.remove();
    wireActionRow(app, function () { return shareText(combo.title || "特殊判定", combo.text, "", 100); });
  }

  function renderDuplicate(resolved, count) {
    var idx = Math.min(count, DUPLICATE_MESSAGES.length) - 1;
    var msg = DUPLICATE_MESSAGES[idx] || DUPLICATE_MESSAGES[DUPLICATE_MESSAGES.length - 1];
    var name = resolved.type === "ai" ? AI_DB[resolved.key].name
      : resolved.type === "category" ? CATEGORY_DB.filter(function (c) { return c.key === resolved.key; })[0].name
      : resolved.raw;
    app.innerHTML =
      '<section class="screen">' +
        '<div class="plain-card">' +
          '<div class="spec-label">DUPLICATE ENTRY ×' + count + '</div>' +
          '<h2 class="ai-name" style="padding-right:0;margin-top:10px;">' + escapeHtml(name) + '</h2>' +
          '<p class="quote" style="margin-top:20px;">' + msg + '</p>' +
        '</div>' +
        actionRowHtml() +
      '</section>';
    var objBtn = app.querySelector("#objection-btn");
    if (objBtn) objBtn.remove();
    wireActionRow(app, function () { return shareText(name, msg, "", 100); });
  }

  function renderManySequence(tokens) {
    resetObjection();
    app.innerHTML = '<section class="screen"><div class="beat-line mono" id="beat"></div></section>';
    var beat = document.getElementById("beat");
    var i = 0;
    function next() {
      if (i >= MANY_MESSAGES.length) {
        setTimeout(function () { renderMultiResult(tokens, tokens.map(resolveToken)); }, 500);
        return;
      }
      beat.textContent = MANY_MESSAGES[i];
      beat.style.opacity = 0;
      requestAnimationFrame(function () { beat.style.transition = "opacity .3s ease"; beat.style.opacity = 1; });
      i++;
      setTimeout(next, 1400);
    }
    next();
  }

  function renderMultiResult(tokens, resolved) {
    var stats = buildStats();
    var names = resolved.map(function (r) {
      if (r.type === "ai") return AI_DB[r.key].name;
      if (r.type === "category") return CATEGORY_DB.filter(function (c) { return c.key === r.key; })[0].name;
      return r.raw;
    });
    app.innerHTML =
      '<section class="screen">' +
        '<div class="card">' +
          '<div class="stamp">総合</div>' +
          '<div class="spec-label">MULTI SPECIMEN (' + tokens.length + ')</div>' +
          '<h2 class="ai-name">' + escapeHtml(names.join(" × ")) + '</h2>' +
          '<div class="field-list">' +
            '<div class="field-row"><div class="field-tab">総合偏見</div><div class="field-text">AIを使って仕事を減らしたかったのに、AIを使い分ける仕事が増えている。</div></div>' +
            '<div class="field-row"><div class="field-tab">重症度</div><div class="field-text">★★★★★</div></div>' +
            '<div class="field-row"><div class="field-tab">月額課金</div><div class="field-text">見ない方がいいです。</div></div>' +
            '<div class="field-row"><div class="field-tab">ブラウザのタブ</div><div class="field-text">閉じてください。</div></div>' +
            '<div class="field-row"><div class="field-tab">現在の状態</div><div class="field-text">AIツール比較表を作るためにAIを使っています。</div></div>' +
          '</div>' +
          '<div class="stats"><h3>追撃ステータス</h3><div class="stat-grid">' + renderStatsHtml(stats) + '</div></div>' +
        '</div>' +
        actionRowHtml() +
      '</section>';
    animateBars(app);
    wireActionRow(app, function () {
      return shareText(names.join(" × "), "AIを使って仕事を減らしたかったのに、AIを使い分ける仕事が増えている。", "月額課金を見ない方がいい", stats.confidence);
    });
  }

  function renderOverload(tokens) {
    resetObjection();
    app.innerHTML =
      '<section class="screen">' +
        '<div class="plain-card">' +
          '<div class="spec-label">OVERLOAD</div>' +
          '<h2 class="ai-name" style="padding-right:0;margin-top:10px;">AIではなく、あなたを整理する必要があります。</h2>' +
          '<div class="overload-grid">' +
            OVERLOAD_LABELS.map(function (o) {
              return '<div class="overload-item"><div class="k">' + o.label + '</div><div class="v mono">' + o.value + '</div></div>';
            }).join("") +
          '</div>' +
          '<div class="action-row" style="justify-content:center;"><button class="btn" id="overload-continue">それでも診断する</button></div>' +
        '</div>' +
      '</section>';
    document.getElementById("overload-continue").addEventListener("click", function () {
      app.innerHTML = '<section class="screen"><div class="plain-card"><p class="quote">その判断力で' + tokens.length + '個契約したんですね。</p></div>' + actionRowHtml() + '</section>';
      var objBtn = app.querySelector("#objection-btn");
      if (objBtn) objBtn.remove();
      wireActionRow(app, function () {
        return shareText("N=" + tokens.length, "その判断力で" + tokens.length + "個契約したんですね。", "", 100);
      });
    });
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  renderIntro();
})();
