const DATASETS = {
  tokens: "tokens/collibra.tokens.json",
  ui: "ui/components.json",
  ux: "ux/patterns.json",
  visual: "visual/visual.json",
  content: "content/voice.json",
};

const state = {
  tokens: null,
  ui: null,
  ux: null,
  visual: null,
  content: null,
  records: [],
  selectedId: null,
};

const $ = (selector) => document.querySelector(selector);
const DATA_ROOT = document.documentElement.dataset.sourceRoot || "../";

function node(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function setText(selector, text) {
  const element = $(selector);
  if (element) element.textContent = text;
  return element;
}

function tokenEntries(value, result = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => tokenEntries(item, result));
  } else if (value && typeof value === "object") {
    if (typeof value.id === "string" && Object.prototype.hasOwnProperty.call(value, "value")) {
      result.push(value);
    }
    Object.values(value).forEach((item) => tokenEntries(item, result));
  }
  return result;
}

function token(id) {
  return tokenEntries(state.tokens).find((entry) => entry.id === id)?.value;
}

function tokenVariable(id) {
  return `--token-${id.replaceAll(".", "-")}`;
}

function applyTokenVariables() {
  const root = document.documentElement;
  tokenEntries(state.tokens).forEach((entry) => {
    if (typeof entry.value === "string" && entry.value !== "") {
      root.style.setProperty(tokenVariable(entry.id), entry.value);
    }
  });
  const display = token("brand.type.family.display");
  const mono = token("brand.type.family.mono");
  if (display) root.style.setProperty("--font-display", `"${display}", system-ui, sans-serif`);
  if (mono) root.style.setProperty("--font-mono", `"${mono}", ui-monospace, monospace`);
  const body = token("brand.type.scale.web.body");
  if (body && typeof body === "object") {
    root.style.setProperty("--type-body-size", `${body.size_px}px`);
    root.style.setProperty("--type-body-line", `${body.line_height_px}px`);
  }
}

function statusPill(maturity) {
  return node("span", `status-pill status-pill--${maturity}`, maturity);
}

function addTags(parent, tags) {
  if (!tags?.length) return;
  const list = node("div", "tag-list");
  tags.slice(0, 6).forEach((tag) => list.append(node("span", "tag", tag)));
  parent.append(list);
}

function addList(parent, title, items, className = "detail-list") {
  if (!Array.isArray(items) || !items.length) return;
  const wrapper = node("div", className);
  wrapper.append(node("h4", null, title));
  const list = node("ul");
  items.forEach((item) => list.append(node("li", null, typeof item === "string" ? item : JSON.stringify(item))));
  wrapper.append(list);
  parent.append(wrapper);
}

function renderSummary() {
  const grid = $("#summary-grid");
  if (!grid) return;
  grid.replaceChildren();
  const metrics = [
    [tokenEntries(state.tokens).length, "foundation tokens", "foundation"],
    [state.ui.components.length, "UI contracts", "ui"],
    [state.ux.patterns.length, "UX patterns", "ux"],
    [state.visual.capabilities.length, "visual capabilities", "visual"],
    [state.content.style_rules.length + state.content.ui_content_rules.length, "content rules", "content"],
  ];
  metrics.forEach(([count, label, kind]) => {
    const card = node("div", `summary-card summary-card--${kind}`);
    card.append(node("span", "summary-card__count", String(count)));
    card.append(node("span", "summary-card__label", label));
    grid.append(card);
  });

  const maturity = ["defined", "proposed", "open", "deferred"].map((value) => [
    value,
    state.visual.foundations.concat(state.visual.capabilities).filter((record) => record.maturity === value).length
      + state.ui.components.filter((record) => record.maturity === value).length
      + state.ux.patterns.filter((record) => record.maturity === value).length
      + (value === "defined" ? state.content.voice_pillars.length + state.content.writing_goals.length + state.content.style_rules.length + state.content.ui_content_rules.length + state.content.content_gates.length : 0),
  ]);
  const total = maturity.reduce((sum, [, count]) => sum + count, 0);
  const rail = $("#maturity-rail");
  rail.replaceChildren();
  maturity.forEach(([label, count]) => {
    const item = node("div", "maturity-bar");
    const header = node("div", "maturity-bar__header");
    header.append(node("span", "maturity-bar__label", label));
    header.append(node("span", "maturity-bar__count", `${count} · ${total ? Math.round((count / total) * 100) : 0}%`));
    const track = node("div", "maturity-bar__track");
    const fill = node("span", `maturity-bar__fill maturity-bar__fill--${label}`);
    fill.style.width = `${total ? (count / total) * 100 : 0}%`;
    track.append(fill);
    item.append(header, track);
    rail.append(item);
  });
}

function layerDefinitions() {
  return [
    { id: "foundations", label: "Foundations", kicker: "Do not drift", count: tokenEntries(state.tokens).length, description: "Color, type, contrast, shape, and the deliberate gaps.", className: "foundation" },
    { id: "ui", label: "UI", kicker: "Make it operable", count: state.ui.components.length, description: "Components with states, semantics, accessibility, content, and safety.", className: "ui" },
    { id: "ux", label: "UX", kicker: "Make it make sense", count: state.ux.patterns.length, description: "Flows for orientation, review, recovery, AI, and durable decisions.", className: "ux" },
    { id: "visual", label: "Visual", kicker: "Make it recognizable", count: state.visual.capabilities.length, description: "Assets, composition, diagrams, data, motion, and cross-medium translation.", className: "visual" },
    { id: "content", label: "Content", kicker: "Make it understood", count: state.content.voice_pillars.length + state.content.style_rules.length + state.content.ui_content_rules.length + state.content.content_gates.length, description: "Voice, UI language, terminology, truth, and human-review gates.", className: "content" },
  ];
}

function chooseArea(area) {
  const areaControl = $("#catalog-area");
  const searchControl = $("#catalog-search");
  if (areaControl) areaControl.value = area;
  if (searchControl) searchControl.value = "";
  state.selectedId = null;
  renderCatalog();
  renderDetail();
  $("#catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSystemMap() {
  const canvas = $("#system-map-canvas");
  const list = $("#system-map-list");
  canvas.querySelectorAll(".map-node").forEach((element) => element.remove());
  list.replaceChildren();
  const layers = layerDefinitions();
  const positions = ["map-node--top", "map-node--right", "map-node--left", "map-node--bottom-right", "map-node--bottom-left"];
  layers.forEach((layer, index) => {
    const button = node("button", `map-node map-node--${layer.className} ${positions[index]}`);
    button.type = "button";
    button.setAttribute("aria-label", `Explore ${layer.label}, ${layer.count} contracts`);
    button.append(node("span", "map-node__kicker", layer.kicker));
    button.append(node("strong", "map-node__label", layer.label));
    button.append(node("span", "map-node__count", `${layer.count} signals`));
    button.addEventListener("click", () => chooseArea(layer.id));
    canvas.append(button);

    const item = node("article", `map-list-item map-list-item--${layer.className}`);
    const itemHeader = node("div", "map-list-item__header");
    itemHeader.append(node("span", "map-list-item__kicker", layer.kicker));
    itemHeader.append(node("span", "map-list-item__count", String(layer.count)));
    item.append(itemHeader);
    item.append(node("h3", null, layer.label));
    item.append(node("p", null, layer.description));
    const explore = node("button", "text-button", `Explore ${layer.label}`);
    explore.type = "button";
    explore.addEventListener("click", () => chooseArea(layer.id));
    item.append(explore);
    list.append(item);
  });
}

function renderFoundations() {
  const swatches = $("#swatch-grid");
  const palette = [
    ["Navy", "brand.color.primary.navy", false],
    ["Lime", "brand.color.primary.lime", true],
    ["Forest", "brand.color.accent.forest", false],
    ["Light forest", "brand.color.accent.light_forest", true],
    ["Cloud", "brand.color.neutral.cloud", true],
    ["Light cloud", "brand.color.neutral.light_cloud", true],
  ];
  swatches.replaceChildren();
  palette.forEach(([name, id, light]) => {
    const card = node("article", `swatch${light ? " swatch--light" : ""}`);
    card.style.backgroundColor = token(id) || "Canvas";
    card.append(node("strong", "swatch__name", name));
    card.append(node("span", "swatch__meta", id));
    swatches.append(card);
  });

  const typeList = $("#type-list");
  typeList.replaceChildren();
  const specimens = [
    ["Web hero", "brand.type.scale.web.hero", "The signal is clear."],
    ["Web body", "brand.type.scale.web.body", "Readable detail that helps a decision land."],
    ["Slide title", "brand.type.scale.slides.title", "A title for the room."],
    ["Mono eyebrow", "brand.type.scale.slides.eyebrow", "SOURCE / REVIEW"],
  ];
  specimens.forEach(([label, id, sample]) => {
    const value = token(id);
    const row = node("div", "type-specimen");
    row.append(node("span", "type-specimen__label", label));
    const sampleNode = node("p", "type-specimen__sample", sample);
    if (value && typeof value === "object") {
      sampleNode.style.setProperty("--specimen-size", `${value.size_px ?? value.size_pt ?? 16}${value.size_px ? "px" : "pt"}`);
      sampleNode.style.setProperty("--specimen-line", value.line_height_px ? `${value.line_height_px}px` : "1.05");
      const family = value.font || value.family;
      if (family) sampleNode.style.setProperty("--specimen-font", `"${family}", var(--font-display)`);
    }
    row.append(sampleNode);
    typeList.append(row);
  });

  const radius = token("brand.radius.scale");
  setText("#radius-status", `Radius: ${radius || "open"}`);
  const signalData = [
    ["Contrast", "defined", "Tokenized thresholds and measured examples"],
    ["Radius", "defined", "One published container treatment"],
    ["Spacing", "open", "No approved general scale yet"],
    ["Gradients", "open", "Stops are not published"],
  ];
  const signals = $("#foundation-signals");
  signals.replaceChildren();
  signalData.forEach(([label, maturity, description]) => {
    const card = node("article", `foundation-signal foundation-signal--${maturity}`);
    const header = node("div", "foundation-signal__header");
    header.append(node("strong", null, label), statusPill(maturity));
    card.append(header, node("p", null, description));
    signals.append(card);
  });
}

function contentRecords() {
  const records = [];
  state.content.voice_pillars.forEach((record) => records.push({
    area: "content", areaLabel: "Content · voice", id: record.id, name: record.name, maturity: "defined",
    purpose: record.contract, contract: record.avoid?.length ? `Avoid: ${record.avoid.join(", ")}.` : "",
    tags: ["voice pillar"], source: record.source, raw: record,
  }));
  state.content.writing_goals.forEach((record) => records.push({
    area: "content", areaLabel: "Content · goal", id: record.id, name: record.name, maturity: "defined",
    purpose: record.contract, contract: "A writing goal that keeps the reader moving.", tags: ["writing goal"], source: record.source, raw: record,
  }));
  state.content.style_rules.forEach((record) => records.push({
    area: "content", areaLabel: "Content · style", id: record.id, name: record.name, maturity: "defined",
    purpose: record.rule, contract: `${record.use_when} Avoid: ${record.avoid}`, tags: ["style rule"], source: record.source, raw: record,
  }));
  state.content.ui_content_rules.forEach((record) => records.push({
    area: "content", areaLabel: "Content · UI", id: record.id, name: record.name, maturity: "defined",
    purpose: record.contract, contract: record.examples?.length ? `Examples: ${record.examples.join(" · ")}` : "",
    tags: ["UI content"], source: record.source, raw: record,
  }));
  state.content.content_gates.forEach((record) => records.push({
    area: "content", areaLabel: "Content · gate", id: record.id, name: "Content gate", maturity: "defined",
    purpose: record.question, contract: record.failure_action, tags: ["gate"], source: record.source, raw: record,
  }));
  return records;
}

function makeRecords() {
  const records = [];
  state.visual.foundations.forEach((record) => records.push({
    area: "foundations", areaLabel: "Foundation · visual", id: record.id, name: record.name, maturity: record.maturity,
    purpose: record.purpose, contract: record.contract, tags: record.token_refs.slice(0, 4), source: "visual/visual.json", raw: record,
  }));
  state.ui.components.forEach((record) => records.push({
    area: "ui", areaLabel: `UI · ${record.category}`, id: record.id, name: record.name, maturity: record.maturity,
    purpose: record.purpose, contract: record.accessibility, tags: [...(record.states || []).slice(0, 3), ...(record.token_roles || []).slice(0, 2)], source: "ui/components.json", raw: record,
  }));
  state.ux.patterns.forEach((record) => records.push({
    area: "ux", areaLabel: "UX · pattern", id: record.id, name: record.name, maturity: record.maturity,
    purpose: record.goal, contract: record.success, tags: [...(record.states || []).slice(0, 3), ...(record.components || []).slice(0, 2)], source: "ux/patterns.json", raw: record,
  }));
  state.visual.capabilities.forEach((record) => records.push({
    area: "visual", areaLabel: "Visual · capability", id: record.id, name: record.name, maturity: record.maturity,
    purpose: record.purpose, contract: record.contract, tags: record.token_refs.slice(0, 4), source: "visual/visual.json", raw: record,
  }));
  records.push(...contentRecords());
  return records;
}

function renderDetail() {
  const panel = $("#detail-panel");
  if (!panel) return;
  panel.replaceChildren();
  const record = state.records.find((item) => item.id === state.selectedId);
  if (!record) {
    const empty = node("div", "detail-panel__empty");
    empty.append(node("div", "detail-panel__mark", "+"));
    empty.append(node("h3", null, "Choose a contract."));
    empty.append(node("p", null, "Select any card to open its purpose, behavior, maturity, and source trail here."));
    panel.append(empty);
    return;
  }
  const header = node("div", "detail-panel__header");
  header.append(node("span", "catalog-card__area", record.areaLabel), statusPill(record.maturity));
  panel.append(header);
  panel.append(node("span", "detail-panel__id", record.id));
  panel.append(node("h3", null, record.name));
  panel.append(node("p", "detail-panel__purpose", record.purpose));
  const contract = node("div", "detail-panel__contract");
  contract.append(node("h4", null, "Contract"), node("p", null, record.contract));
  panel.append(contract);
  addTags(panel, record.tags);
  const raw = record.raw || {};
  addList(panel, "States", raw.states);
  addList(panel, "Flow", raw.flow);
  addList(panel, "Accessibility", raw.accessibility);
  addList(panel, "Safety", raw.safety);
  addList(panel, "Open questions", raw.open_questions);
  panel.append(node("p", "detail-panel__source", `Source: ${record.source}`));
}

function renderCatalog() {
  state.records = state.records.length ? state.records : makeRecords();
  const query = $("#catalog-search").value.trim().toLowerCase();
  const area = $("#catalog-area").value;
  const maturity = $("#catalog-maturity").value;
  const filtered = state.records.filter((record) => {
    const searchable = [record.id, record.name, record.purpose, record.contract, record.areaLabel, ...(record.tags || [])].join(" ").toLowerCase();
    return (!query || searchable.includes(query)) && (area === "all" || record.area === area) && (maturity === "all" || record.maturity === maturity);
  });
  const grid = $("#catalog-grid");
  grid.replaceChildren();
  if (!filtered.length) {
    grid.append(node("div", "empty-card", "No capability matches those filters. Try a broader search or show all maturity."));
  } else {
    filtered.forEach((record) => {
      const card = node("article", `catalog-card${record.id === state.selectedId ? " catalog-card--selected" : ""}`);
      card.dataset.recordId = record.id;
      const top = node("div", "catalog-card__topline");
      top.append(node("span", "catalog-card__area", record.areaLabel), statusPill(record.maturity));
      card.append(top, node("span", "catalog-card__id", record.id), node("h3", null, record.name), node("p", null, record.purpose));
      if (record.contract) card.append(node("p", "catalog-card__contract", record.contract));
      card.append(node("span", "source-line", `Source: ${record.source}`));
      addTags(card, record.tags);
      const inspect = node("button", "card-link", record.id === state.selectedId ? "Inspected" : "Inspect contract");
      inspect.type = "button";
      inspect.setAttribute("aria-pressed", String(record.id === state.selectedId));
      inspect.addEventListener("click", () => {
        state.selectedId = record.id;
        renderCatalog();
        renderDetail();
      });
      card.append(inspect);
      grid.append(card);
    });
  }
  setText("#catalog-count", `${filtered.length} of ${state.records.length} contracts shown`);
}

function renderJourney() {
  const grid = $("#journey-grid");
  grid.replaceChildren();
  const steps = [
    ["01", "Name the task", "Audience, decision, action, scope, and consequence before the component."],
    ["02", "Choose the contract", "Resolve vocabulary, select the UI and UX pattern, then map visual and content rules."],
    ["03", "Make states visible", "Loading, empty, partial, error, review, confirmation, recovery, and completion all count."],
    ["04", "Test the real surface", "Keyboard, focus, contrast, type, responsive behavior, reduced motion, and provenance."],
    ["05", "Record the exception", "If a consumer decision differs, keep the reason, owner, version, and revisit path."],
  ];
  steps.forEach(([number, title, description]) => {
    const card = node("article", "journey-step");
    card.append(node("span", "journey-step__number", number), node("h3", null, title), node("p", null, description));
    grid.append(card);
  });
}

function renderPrinciples() {
  const grid = $("#principles-grid");
  grid.replaceChildren();
  const groups = [
    ["Visual", state.visual.principles],
    ["UX", state.ux.principles],
    ["Content", state.content.voice_pillars.map((pillar) => `${pillar.name}: ${pillar.contract}`)],
  ];
  groups.forEach(([title, items]) => {
    const card = node("article", "principle-group");
    card.append(node("h3", null, title));
    const list = node("ul");
    items.slice(0, 6).forEach((item) => list.append(node("li", null, item)));
    card.append(list);
    grid.append(card);
  });
}

function renderProvenance() {
  const grid = $("#provenance-grid");
  grid.replaceChildren();
  const cards = [
    ["Canonical source", "Tokens, UI, UX, visual, and content JSON files are the machine-readable contracts. Generated Markdown is a review surface.", ["No raw brand literals in downstream catalogs", "Area validators and generated-file checks run in CI"]],
    ["Maturity is visible", "Defined guidance is separated from proposed, open, and deferred work. Missing source is never filled with an invented default.", ["Open spacing scale", "Open gradient stops", "Open asset and theme decisions"]],
    ["Consumer boundary", "Products and document producers own runtime implementation, data, accessibility testing, localization, legal review, and release operations.", ["Framework-neutral contracts", "No tenant or credential access", "Pages deployment is a separate audience decision"]],
  ];
  cards.forEach(([title, description, bullets]) => {
    const card = node("article", "provenance-card");
    card.append(node("h3", null, title), node("p", null, description));
    const list = node("ul");
    bullets.forEach((bullet) => list.append(node("li", null, bullet)));
    card.append(list);
    grid.append(card);
  });
}

function renderError(error) {
  ["#summary-grid", "#maturity-rail", "#system-map-list", "#swatch-grid", "#type-list", "#foundation-signals", "#catalog-grid", "#journey-grid", "#principles-grid", "#provenance-grid"].forEach((selector) => {
    const target = $(selector);
    if (target) target.replaceChildren(node("div", selector.includes("provenance") || selector.includes("swatch") || selector.includes("type") || selector.includes("foundation") || selector.includes("system-map") ? "error-card error-card--dark" : "error-card", `The reference data could not load: ${error.message}`));
  });
  setText("#catalog-count", "Reference data unavailable");
}

async function load() {
  const entries = await Promise.all(Object.entries(DATASETS).map(async ([key, path]) => {
    const response = await fetch(new URL(`${DATA_ROOT}${path}`, document.baseURI), { cache: "no-store" });
    if (!response.ok) throw new Error(`${key} returned ${response.status}`);
    return [key, await response.json()];
  }));
  entries.forEach(([key, value]) => { state[key] = value; });
  applyTokenVariables();
  state.records = makeRecords();
  renderSummary();
  renderSystemMap();
  renderFoundations();
  renderCatalog();
  renderDetail();
  renderJourney();
  renderPrinciples();
  renderProvenance();
  ["#catalog-search", "#catalog-area", "#catalog-maturity"].forEach((selector) => {
    $(selector).addEventListener("input", renderCatalog);
    $(selector).addEventListener("change", renderCatalog);
  });
}

load().catch(renderError);
