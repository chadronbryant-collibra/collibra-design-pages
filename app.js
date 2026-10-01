const DATASETS = { tokens: "tokens/collibra.tokens.json", ui: "ui/components.json", ux: "ux/patterns.json", visual: "visual/visual.json", content: "content/voice.json" };
export const CATALOG_PAGE_SIZE = 6;
export const TASKS = [
  { id: "deck", name: "Slide decks", title: "Give your update a story.", description: "A team update, a leadership decision, or a workshop. Put the takeaway in the headline and give each slide a job.", card: "Tell a story people can follow.", skill: "collibra-create", format: "five-slide outline with a suggested layout and visual for each slide", guides: ["medium.slide-deck", "visual.slide-grammar-suite", "visual.typography"], lessons: ["Use a conclusion as the headline, so the point survives a quick scan.", "Turn a sequence into a visual flow instead of another list of bullets.", "Give supporting detail a place in the appendix. Use your approved slide template for the final deck."] },
  { id: "document", name: "Documents", title: "Make a guide people return to.", description: "A team guide, process note, or project brief. Create a clear path through the answer, the detail, and the next step.", card: "Style the answer, not just the page.", skill: "collibra-create", format: "document structure with an opening summary, descriptive headings, a short checklist, and a help section", guides: ["medium.google-doc", "visual.document-composition", "visual.accessibility"], lessons: ["Open with what the reader can do, then use headings they can navigate.", "Group related steps together. Use a table only when readers need to compare.", "Apply native heading styles in your document editor. Keep links descriptive and add image descriptions."] },
  { id: "speech", name: "Speeches", title: "Write for ears, not just eyes.", description: "A town-hall opening, a team introduction, or a short talk. Keep the meaning, find a natural rhythm, and leave room to breathe.", card: "Find a rhythm you can say aloud.", skill: "collibra-refine", format: "two-minute spoken script with short paragraphs, light pause cues, and a clear closing invitation", guides: ["voice.respectfully-direct", "voice.wise", "visual.medium-translation"], lessons: ["Use the suite’s voice and cross-medium guidance as a starting point. Speech cues here are an illustrative adaptation, not a published speech-format contract.", "Give each spoken paragraph one thought. Read it aloud to find sentences that need a breath.", "Keep facts and commitments intact. Separate delivery cues from the words you intend to say."] },
  { id: "message", name: "Messages & voice", title: "Say what changed. Make the next step clear.", description: "An email, a chat post, or a change announcement. Be specific, considerate, and useful in the time the reader has.", card: "Sound human. Keep the facts.", skill: "collibra-refine", format: "short email with a clear subject, the change, why it matters, an action, and a help route", guides: ["persona.collibrian", "tone.action-oriented", "tone.inclusive-approachable", "medium.email"], lessons: ["Put the change before the backstory. The reader shouldn’t have to decode the impact.", "Keep a stable voice; shift the tone for the moment. Warmth doesn’t need extra promises.", "Name the action and help route. Don’t invent a deadline, owner, or benefit your source doesn’t support."] },
  { id: "dashboard", name: "Dashboards", title: "Show the decision behind the numbers.", description: "A project snapshot or a data story. Name the question, label the evidence, and keep the limits in view.", card: "Help the reader see what matters.", skill: "collibra-create", format: "self-contained HTML/CSS/JavaScript Claude Artifact dashboard with no external packages or remote assets", guides: ["visual.data-visualization", "visual.accessibility", "ui.data.table", "ux.inspect.list-detail"], lessons: ["Start with the question the numbers answer. Keep the source and reporting period near the data.", "Label values directly and show an accessible table or text equivalent. Color is supporting detail.", "Use only supplied data. Test empty states, keyboard access, small screens, and missing information before sharing."] },
];

export function parseRoute(hash) {
  const [path, query = ""] = hash.replace(/^#/, "").split("?");
  const [rawPage, item] = path.split("/");
  const aliases = { overview: "home", "system-map": "home", foundations: "brand", voices: "brand", adoption: "start", principles: "brand" };
  const page = aliases[rawPage] || (["home", "examples", "brand", "catalog", "start"].includes(rawPage) ? rawPage : "home");
  const params = new URLSearchParams(query);
  const area = ["foundations", "content", "visual", "ui", "ux"].includes(params.get("area")) ? params.get("area") : "all";
  const number = Number(params.get("page"));
  return { page, item: rawPage === "voices" ? "voice" : item, area, query: params.get("q") || "", catalogPage: Number.isSafeInteger(number) && number > 0 ? number : 1, selectedId: params.get("id") || null };
}

export function pageSlice(records, requestedPage, size = CATALOG_PAGE_SIZE) {
  const count = Math.max(1, Math.ceil(records.length / size));
  const page = Math.min(Math.max(requestedPage, 1), count);
  const start = (page - 1) * size;
  return { page, count, start, records: records.slice(start, start + size) };
}

export function promptFor(task, audience) {
  return `Use ${task.skill} from the Collibra design suite.\n\nHelp me make a ${task.format} for ${audience === "leaders" ? "leaders making a decision" : "colleagues getting started"}.\n\nPurpose: [what people need to understand or do].\nSource: [paste authorized facts, draft, or data here].\n\nKeep names, numbers, dates, links, and commitments unchanged. Don’t invent evidence or approvals. Use Collibra’s reader-first voice, clear hierarchy, and accessible formatting. Ask up to two focused questions if a material input is missing.\n\nAfter the first version, suggest useful adjustments and offer a review. Label proposed content and anything I need to confirm.`;
}

const state = { records: [], selectedId: null, catalogPage: 1, route: null, ready: false };
const $ = (selector) => document.querySelector(selector);
function node(tag, className, text) { const e = document.createElement(tag); if (className) e.className = className; if (text !== undefined) e.textContent = text; return e; }
function link(text, href, className) { const e = node("a", className, text); e.href = href; return e; }
function textAt(selector, text) { const e = $(selector); if (e) e.textContent = text; }
function list(parent, items, ordered = false) { const e = node(ordered ? "ol" : "ul"); items.forEach(t => e.append(node("li", null, t))); parent.append(e); }
function tokenEntries(value, result = []) { if (Array.isArray(value)) value.forEach(v => tokenEntries(v, result)); else if (value && typeof value === "object") { if (value.id && Object.hasOwn(value, "value")) result.push(value); Object.values(value).forEach(v => tokenEntries(v, result)); } return result; }
function token(id) { return tokenEntries(state.tokens).find(t => t.id === id)?.value; }
function applyTokens() { tokenEntries(state.tokens).forEach(t => { if (typeof t.value === "string" && t.value) document.documentElement.style.setProperty(`--token-${t.id.replaceAll(".", "-").replaceAll("_", "-")}`, t.value); }); }
function statusPill(status) { return node("span", "status-pill", status); }

function makeRecords() {
  const out = [];
  const add = (area, areaLabel, records, purpose, contract, source) => records.forEach(r => out.push({ area, areaLabel, id: r.id, name: r.name || "Content check", maturity: r.maturity || "defined", purpose: r[purpose] || "", contract: r[contract] || "", source: source || r.source, raw: r }));
  add("foundations", "Brand foundations", state.visual.foundations, "purpose", "contract", "visual/visual.json");
  add("visual", "Layouts & visuals", state.visual.capabilities, "purpose", "contract", "visual/visual.json");
  add("ui", "Interface elements", state.ui.components, "purpose", "accessibility", "ui/components.json");
  add("ux", "User journeys", state.ux.patterns, "goal", "success", "ux/patterns.json");
  add("content", "Voice", state.content.voice_pillars, "contract", "contract");
  add("content", "Writing goals", state.content.writing_goals, "contract", "contract");
  add("content", "Writing style", state.content.style_rules, "rule", "use_when");
  add("content", "Interface copy", state.content.ui_content_rules, "contract", "contract");
  add("content", "Content checks", state.content.content_gates, "question", "failure_action");
  add("content", "Tone", state.content.tone_modes, "use_when", "sound");
  add("content", "Audience", state.content.audience_personas, "job_to_be_done", "voice_shift");
  add("content", "Format", state.content.mediums, "reader_need", "structure");
  add("content", "Plain language", [state.content.plain_language_lens], "contract", "contract");
  return out;
}

function renderHome() {
  const cards = $("#task-cards"); const nav = $("#example-nav");
  TASKS.forEach(t => {
    const card = link("", `#examples/${t.id}`, "task-card");
    const art = node("div", `task-art task-art--${t.id}`); art.setAttribute("aria-hidden", "true");
    for (let i = 0; i < 3; i++) art.append(node("span"));
    card.append(art, node("h3", null, t.name), node("p", null, t.card), node("span", "task-action", "Explore example →")); cards.append(card);
    nav.append(link(t.name, `#examples/${t.id}`));
  });
  const skills = [
    ["design", "Find the right guidance", "Choose the smallest useful set of design rules for your task.", "Which guidance should I use for a team onboarding guide?"],
    ["create", "Make a first version", "Build an Artifact, an outline, or a structure you can adjust.", "Make a dashboard from this synthetic data. Label its limits."],
    ["refine", "Make the writing ready", "Shape a draft for the audience. Keep its facts and meaning.", "Refine this announcement for colleagues new to the project."],
    ["simplify", "Explain it plainly", "Reduce technical complexity without losing important detail.", "Explain this process for a nontechnical reader. Keep the caveats."],
    ["review", "Check before sharing", "Get ranked, evidence-backed findings. No silent edits.", "Review this deck outline for clarity, brand, and accessibility."],
  ];
  skills.forEach(([id, title, description, example]) => { const card = node("article", "skill-card"); card.append(node("code", null, `collibra-${id}`), node("h3", null, title), node("p", null, description), node("p", "caption", `Try: “${example}”`)); $("#skill-cards").append(card); });
}

function sampleFacts(audience) {
  const leaders = audience === "leaders";
  return { headline: leaders ? "Choose a small pilot before a wider launch." : "A clearer start for every new joiner.", action: leaders ? "Proposed decision: test the guide with one team, then review feedback before expanding." : "Start with the guide. Your buddy can help with questions.", steps: leaders ? ["Test with one team", "Review feedback", "Decide what’s next"] : ["Find the guide", "Meet your buddy", "Ask a question"] };
}

function renderExample() {
  const task = TASKS.find(t => t.id === state.route.item) || TASKS[0];
  const audience = $("#example-audience").value;
  const before = $("input[name=example-version]:checked").value === "before";
  const facts = sampleFacts(audience);
  textAt("#example-title", task.title); textAt("#example-description", task.description);
  $("#example-nav").querySelectorAll("a").forEach(a => { if (a.hash === `#examples/${task.id}`) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  const preview = $("#example-preview"); preview.replaceChildren();
  const sample = node("article", before ? "rough-draft" : `sample-${task.id === "deck" ? "slide" : task.id}`);
  if (before) {
    sample.append(node("p", "eyebrow", "SYNTHETIC ROUGH DRAFT"), node("h3", null, task.id === "dashboard" ? "Project metrics" : "Onboarding process update"));
    sample.append(node("p", null, task.id === "dashboard" ? "Guide 24. Buddy 18. Questions 12. The figures are provided for informational purposes relating to the various onboarding workstreams." : "As part of our ongoing efforts regarding the onboarding experience, an onboarding guide and buddy arrangement are being considered for use. There are a number of steps and considerations that relate to the provision of information and the handling of questions in connection with this process."));
    sample.append(node("p", null, audience === "leaders" ? "A pilot with one team is proposed. Feedback would be reviewed before a decision on expansion." : "New joiners can find the guide, meet their buddy, and ask a question."));
    textAt("#example-caption", "The source idea is here, but the reader has to work to find the point. The before/after pair is illustrative, not measured research.");
  } else {
    sample.append(node("p", "eyebrow", task.id === "dashboard" ? "SYNTHETIC DATA · EXAMPLE SNAPSHOT" : "SYNTHETIC EXAMPLE · NOT A LIVE PROGRAM"));
    if (task.id === "deck") {
      sample.append(node("h3", null, facts.headline));
      const flow = node("div", "sequence"); facts.steps.forEach((s, i) => flow.append(node("span", null, `${i + 1}. ${s}`))); sample.append(flow, node("p", null, facts.action));
    } else if (task.id === "document") {
      sample.append(node("h3", null, audience === "leaders" ? "Onboarding guide: pilot proposal" : "Your first steps"), node("p", null, facts.action));
      sample.append(node("h4", null, audience === "leaders" ? "The proposed approach" : "Start here")); list(sample, facts.steps, true);
      sample.append(node("h4", null, audience === "leaders" ? "Before we expand" : "Need a hand?"), node("p", null, audience === "leaders" ? "Review feedback from the pilot. The wider launch is not confirmed." : "Ask your buddy about the guide or your next step."));
    } else if (task.id === "speech") {
      sample.append(node("h3", null, audience === "leaders" ? "A short proposal" : "A welcome, in your own words"));
      sample.append(node("span", "delivery-cue", "[OPEN · LOOK UP]"), node("p", null, audience === "leaders" ? "I’m proposing that we test the onboarding guide with one team before we take it further." : "Starting somewhere new brings questions. Where do I begin? Who can help?"));
      sample.append(node("span", "delivery-cue", "[PAUSE]"), node("p", null, audience === "leaders" ? "We’d review the feedback, then decide whether to expand. The wider launch isn’t confirmed." : "The guide gives you a place to start. Your buddy gives you someone to ask."));
      sample.append(node("span", "delivery-cue", "[CLOSE · LEAVE SPACE FOR QUESTIONS]"), node("p", null, facts.action));
    } else if (task.id === "message") {
      sample.append(node("h3", null, audience === "leaders" ? "Proposal: pilot the onboarding guide" : "New here? Start with the guide."), node("p", null, audience === "leaders" ? "We’re proposing a small pilot with one team. It would give us feedback before we decide on a wider launch." : "The onboarding guide brings your first steps together. Find the guide, meet your buddy, and ask about anything that’s unclear."), node("p", null, facts.action));
    } else {
      sample.append(node("h3", null, audience === "leaders" ? "Where might new joiners need support?" : "A quick view of onboarding steps"), node("p", "caption", "Made-up counts for learning only. Different steps may include the same people; these are not completion rates."));
      const metrics = node("div", "metric-row"); [[24, "Found the guide"], [18, "Met their buddy"], [12, "Asked a question"]].forEach(([n, label]) => { const m = node("div", "metric"); m.append(node("strong", null, String(n)), node("span", null, label)); metrics.append(m); }); sample.append(metrics);
      [["Guide", 24], ["Buddy", 18], ["Questions", 12]].forEach(([label, value]) => { const row = node("div", "bar-row"); const track = node("div", "bar-track"); track.setAttribute("aria-hidden", "true"); const fill = node("div", "bar-fill"); fill.style.width = `${value / 24 * 100}%`; track.append(fill); row.append(node("span", null, label), track, node("strong", null, String(value))); sample.append(row); });
      sample.append(node("p", "caption", "Source: synthetic example fixture. No reporting period or population is supplied. Don’t infer a trend or a cause."));
    }
    textAt("#example-caption", "A preview of the approach, not a downloadable native template. Use your approved source content and authoring tools for the final work.");
  }
  preview.append(sample);
  textAt("#lesson-title", task.id === "speech" ? "Meaning first. Delivery second." : "Make the reader’s job easier.");
  $("#example-lessons").replaceChildren(); list($("#example-lessons"), task.lessons, true);
  const guides = $("#example-guides"); guides.replaceChildren();
  task.guides.forEach(id => { const r = state.records.find(r => r.id === id); if (r) guides.append(link(`${r.name} →`, `#catalog?area=${r.area}&id=${encodeURIComponent(id)}`)); });
  if (!$("#example-prompt").value || $("#example-prompt").value === state.generatedPrompt) {
    state.generatedPrompt = promptFor(task, audience); $("#example-prompt").value = state.generatedPrompt;
    textAt("#copy-status", "");
  } else textAt("#copy-status", "Your prompt edits are kept. Reset prompt loads the suggestion for this example and audience.");
  const next = TASKS[(TASKS.indexOf(task) + 1) % TASKS.length]; $("#next-example").href = `#examples/${next.id}`; textAt("#next-example", `Next: ${next.name.toLowerCase()} →`);
}

function renderBrand() {
  const lesson = ["color", "type", "voice", "accessibility"].includes(state.route.item) ? state.route.item : "color";
  $("#brand .choice-nav").querySelectorAll("a").forEach(a => { if (a.hash === `#brand/${lesson}`) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  const layout = node("div", "brand-layout"); const demo = node("div", "brand-demo"); const copy = node("div");
  if (lesson === "color") {
    copy.append(node("h2", null, "Give color a job."), node("p", null, "Use navy for a strong anchor, lime for emphasis, and supporting colors when they help the content. A little emphasis is easier to spot than a page full of it."));
    list(copy, ["Use navy text on lime fills. Don’t use lime for small text on white.", "Forest can support links on light surfaces. Keep links recognizable without color alone.", "Check the actual text/background pairing. Approved colors don’t make every combination accessible.", "Use flat navy when approved gradient values aren’t available. Don’t make up brand stops."]);
    copy.append(link("Read color application →", "#catalog?area=visual&id=visual.color-application"));
    const swatches = node("div", "swatch-grid");
    [["Navy", "primary.navy", false], ["Lime", "primary.lime", true], ["Forest", "accent.forest", false], ["Light forest", "accent.light_forest", true], ["Cloud", "neutral.cloud", true], ["Light cloud", "neutral.light_cloud", true]].forEach(([name, id, light]) => { const value = token(`brand.color.${id}`); const swatch = node("div", `swatch${light ? " swatch--light" : ""}`); swatch.style.backgroundColor = value; swatch.append(node("strong", null, name), node("code", null, value)); swatches.append(swatch); });
    demo.append(swatches, node("p", "caption", "Values come from the canonical brand tokens. Click the guidance link for usage and limits."));
  } else if (lesson === "type") {
    copy.append(node("h2", null, "Let size and space do the organizing."), node("p", null, "Give the takeaway the strongest position. Put related detail together. Leave enough space for the reader to see the structure."));
    list(copy, ["Use your approved template’s type styles instead of shrinking everything to fit.", "Use Arial in Slides and Docs. Web brand fonts require the appropriate licensed assets; this site uses system fallbacks.", "Use real headings and lists, not just bold paragraphs. Keep the reading order meaningful.", "The suite doesn’t publish a shared spacing scale. The layout here is an example, not a new token standard."]);
    copy.append(link("Read typography guidance →", "#catalog?area=visual&id=visual.typography"));
    const specimen = node("div", "type-example"); specimen.append(node("p", "eyebrow", "A DOCUMENT SCAN PATH"), node("h2", null, "Start with the answer."), node("p", null, "Make the summary useful before you add the detail."), node("h3", null, "What happens next"), node("p", null, "A descriptive heading tells readers where to look.")); demo.append(specimen, node("p", "caption", "Illustrative hierarchy in Arial, not a measured native template preview."));
  } else if (lesson === "voice") {
    copy.append(node("h2", null, "Keep the voice. Match the moment."), node("p", null, "Collibra’s voice is respectfully direct, wise, and clever and punchy. That last part is a little spark when it helps, not a joke in every message."));
    const pillars = node("ul", "pillar-list"); state.content.voice_pillars.forEach(p => { const li = node("li"); li.append(node("strong", null, `${p.name}. `), document.createTextNode(p.contract)); pillars.append(li); }); copy.append(pillars);
    copy.append(link("Browse voice guidance →", "#catalog?area=content&q=voice"));
    const label = node("label", null, "What does the moment need?"); label.htmlFor = "brand-tone";
    const select = node("select"); select.id = "brand-tone";
    ["tone.action-oriented", "tone.inclusive-approachable", "tone.trust-building", "tone.teaching-wise"].forEach(id => { const t = state.content.tone_modes.find(t => t.id === id); const option = node("option", null, t.name); option.value = id; select.append(option); });
    const output = node("div", "voice-example"); output.setAttribute("role", "status");
    const update = () => { const tone = state.content.tone_modes.find(t => t.id === select.value); const examples = { "tone.action-oriented": "Open the guide, then talk through your first steps with your buddy.", "tone.inclusive-approachable": "New here? The guide is a good place to start. Your buddy can help with questions.", "tone.trust-building": "The guide covers the first steps. Some details may need a conversation with your buddy; it won’t answer every question.", "tone.teaching-wise": "The guide explains what to do first. Your buddy helps you understand how those steps fit your work." }; output.replaceChildren(node("p", "caption", tone.sound), node("blockquote", null, examples[tone.id]), node("p", "caption", "Synthetic wording, not an official announcement.")); };
    select.addEventListener("change", update); demo.append(label, select, output); update();
  } else {
    copy.append(node("h2", null, "Clarity includes who can use it."), node("p", null, "A readable screen isn’t the whole check. Think about the person using a keyboard, listening to a document, or viewing your chart without its colors."));
    list(copy, ["Check contrast: at least 4.5:1 for normal text and 3:1 for large text. Essential interface graphics also need adequate contrast.", "Write descriptive links and image descriptions. Use native headings for a useful reading order.", "Label chart values and status in words. Never make color the only explanation.", "Test keyboard focus, responsive layout, overflow, and reduced motion in the actual output."]);
    copy.append(link("Read accessibility guidance →", "#catalog?area=visual&id=visual.accessibility"));
    const accessible = node("div", "contrast-example"); accessible.append(node("h3", null, "Ready for review"), node("p", null, "The status is written out. You don’t need a green dot to know what it means.")); demo.append(accessible, node("p", "caption", "Try the page with Tab and Shift+Tab. Visible focus shows where you are. Review your own output separately."));
  }
  layout.append(demo, copy); $("#brand-lesson").replaceChildren(layout);
}

function catalogHash() { const p = new URLSearchParams(); if ($("#catalog-area").value !== "all") p.set("area", $("#catalog-area").value); if ($("#catalog-search").value) p.set("q", $("#catalog-search").value); if (state.catalogPage > 1) p.set("page", state.catalogPage); if (state.selectedId) p.set("id", state.selectedId); return `#catalog${p.size ? `?${p}` : ""}`; }
function rememberCatalog() { history.replaceState(null, "", catalogHash()); }
function renderPagination(total) {
  const nav = $("#catalog-pagination"); nav.replaceChildren(); $("#catalog-pagination-row").hidden = !total;
  const count = Math.max(1, Math.ceil(total / CATALOG_PAGE_SIZE)); textAt("#catalog-page-status", `Page ${state.catalogPage} of ${count}`);
  const button = (label, page, control = false) => { const b = node("button", "catalog-pagination__button", label); b.type = "button"; b.dataset.page = page; b.setAttribute("aria-label", control ? `${label} guidance page` : `Go to guidance page ${page}`); if (!control && page === state.catalogPage) b.setAttribute("aria-current", "page"); if (control && page === state.catalogPage) b.disabled = true; b.addEventListener("click", () => { state.catalogPage = page; state.selectedId = null; renderCatalog(); renderDetail(); rememberCatalog(); nav.querySelector('[aria-current="page"]')?.focus(); }); return b; };
  nav.append(button("Previous", Math.max(1, state.catalogPage - 1), true));
  const pages = node("span", "catalog-pagination__pages"); let prior = 0;
  [...new Set([1, count, state.catalogPage - 1, state.catalogPage, state.catalogPage + 1])].filter(p => p > 0 && p <= count).sort((a,b) => a-b).forEach(p => { if (p - prior > 1) { const e = node("span", "catalog-pagination__ellipsis", "…"); e.setAttribute("aria-hidden", "true"); pages.append(e); } pages.append(button(String(p), p)); prior = p; });
  nav.append(pages, button("Next", Math.min(count, state.catalogPage + 1), true));
}

function renderCatalog() {
  const query = $("#catalog-search").value.trim().toLowerCase(); const area = $("#catalog-area").value;
  const filtered = state.records.filter(r => (area === "all" || r.area === area) && (!query || [r.id, r.name, r.purpose, r.contract, r.areaLabel].join(" ").toLowerCase().includes(query)));
  const page = pageSlice(filtered, state.catalogPage); state.catalogPage = page.page;
  const grid = $("#catalog-grid"); grid.replaceChildren();
  if (!filtered.length) grid.append(node("p", null, "No guidance matches yet. Try another word or choose all guidance."));
  page.records.forEach(r => { const card = node("article", `catalog-card${r.id === state.selectedId ? " catalog-card--selected" : ""}`); const top = node("div", "catalog-card__topline"); top.append(node("span", "catalog-card__area", r.areaLabel), statusPill(r.maturity)); const b = node("button", "card-link", "Read guidance →"); b.type = "button"; b.setAttribute("aria-label", `Read guidance: ${r.name}`); b.setAttribute("aria-controls", "detail-panel"); b.setAttribute("aria-pressed", String(r.id === state.selectedId)); b.addEventListener("click", () => { state.selectedId = r.id; renderCatalog(); renderDetail(); rememberCatalog(); $("#detail-panel").focus(); }); card.append(top, node("h3", null, r.name), node("p", null, r.purpose.length > 200 ? `${r.purpose.slice(0, 197)}…` : r.purpose), b); grid.append(card); });
  textAt("#catalog-count", filtered.length ? `${area === "all" ? "All guidance" : $("#catalog-area").selectedOptions[0].textContent}: ${page.start + 1}–${Math.min(page.start + CATALOG_PAGE_SIZE, filtered.length)} of ${filtered.length}` : "0 guides found"); renderPagination(filtered.length);
}

function detailList(parent, title, value) { const items = Array.isArray(value) ? value : typeof value === "string" ? [value] : []; if (items.length) { parent.append(node("h4", null, title)); list(parent, items.map(i => typeof i === "string" ? i : JSON.stringify(i))); } }
function renderDetail() {
  const panel = $("#detail-panel"); panel.replaceChildren(); panel.tabIndex = -1;
  const r = state.records.find(r => r.id === state.selectedId);
  const title = node("h3", null, r ? r.name : "Choose a guide."); title.id = "detail-title";
  if (!r) { panel.append(title, node("p", null, "Open a card to read the guidance here. Technical details stay tucked away until you need them.")); return; }
  panel.append(statusPill(r.maturity), title, node("p", null, r.purpose));
  if (r.contract && r.contract !== r.purpose) { panel.append(node("h4", null, "How to use it")); if (Array.isArray(r.contract)) list(panel, r.contract); else if (r.contract.length > 260) { const d = node("details"); d.append(node("summary", null, "Show full contract"), node("p", null, r.contract)); panel.append(d); } else panel.append(node("p", null, r.contract)); }
  detailList(panel, "Good moves", r.raw.do); detailList(panel, "Avoid", r.raw.avoid);
  const more = node("details", "detail-panel__more"); more.append(node("summary", null, "Show implementation detail"));
  [["Accessibility", r.raw.accessibility], ["States", r.raw.states], ["Flow", r.raw.flow], ["Checks", r.raw.open_questions], ["Safety", r.raw.safety], ["Needs", r.raw.needs]].forEach(([t,v]) => detailList(more, t, v));
  more.append(node("code", "detail-panel__id", r.id), node("p", "detail-panel__source", `Source: ${r.source}`)); panel.append(more);
}

function route(focus = false) {
  const next = parseRoute(location.hash); const prior = state.route; state.route = next;
  document.querySelectorAll("[data-page]").forEach(e => { e.hidden = e.id !== next.page; });
  document.querySelectorAll(".site-nav a").forEach(a => { if (parseRoute(a.hash).page === next.page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  document.title = `Collibra design suite | ${{home: "Make it clear", examples: "Try examples", brand: "Learn the brand", catalog: "Guidance library", start: "Use in Claude"}[next.page]}`;
  if (state.ready) {
    if (next.page === "examples") renderExample();
    if (next.page === "brand") renderBrand();
    if (next.page === "catalog") {
      $("#catalog-area").value = next.area; $("#catalog-search").value = next.query;
      state.catalogPage = next.catalogPage; state.selectedId = next.selectedId;
      const selected = state.records.find(r => r.id === next.selectedId);
      if (selected) {
        const matching = r => [r.id, r.name, r.purpose, r.contract, r.areaLabel].join(" ").toLowerCase().includes(next.query.toLowerCase());
        if ((next.area !== "all" && selected.area !== next.area) || !matching(selected)) {
          $("#catalog-area").value = selected.area; $("#catalog-search").value = "";
        }
        const visible = state.records.filter(r => ($("#catalog-area").value === "all" || r.area === $("#catalog-area").value) && (!$("#catalog-search").value || matching(r)));
        state.catalogPage = Math.floor(visible.indexOf(selected) / CATALOG_PAGE_SIZE) + 1;
      }
      renderCatalog(); renderDetail();
    }
  }
  if (focus && (prior?.page !== next.page || prior?.item !== next.item)) { $(`#${next.page}-title`)?.focus(); window.scrollTo({ top: 0, behavior: "instant" }); }
}

async function load() {
  route();
  window.addEventListener("hashchange", () => route(true));
  $(".skip-link").addEventListener("click", e => { e.preventDefault(); $("#main").focus(); });
  const root = document.documentElement.dataset.sourceRoot || "../";
  await Promise.all(Object.entries(DATASETS).map(async ([key, path]) => { const response = await fetch(new URL(`${root}${path}`, document.baseURI)); if (!response.ok) throw new Error(`Guidance returned ${response.status}`); state[key] = await response.json(); }));
  applyTokens(); state.records = makeRecords(); state.ready = true; renderHome();
  const waiting = state.records.filter(r => r.maturity !== "defined").length; textAt("#maturity-summary", waiting ? `${waiting} library entries are proposed, open, or deferred. Check their status before adopting them.` : "All current library entries are defined within their stated boundaries.");
  $("#load-status").hidden = true; route();
  $("#example-audience").addEventListener("change", renderExample); document.querySelectorAll("input[name=example-version]").forEach(e => e.addEventListener("change", renderExample));
  ["#catalog-search", "#catalog-area"].forEach(s => $(s).addEventListener("input", () => { state.catalogPage = 1; state.selectedId = null; renderCatalog(); renderDetail(); rememberCatalog(); }));
  $("#copy-prompt").addEventListener("click", async () => { try { await navigator.clipboard.writeText($("#example-prompt").value); textAt("#copy-status", "Prompt copied. Paste it into your approved Claude session."); } catch { $("#example-prompt").focus(); $("#example-prompt").select(); textAt("#copy-status", "Clipboard access wasn’t available. The prompt is selected; copy it using your browser’s Copy command."); } });
  $("#reset-prompt").addEventListener("click", () => {
    const task = TASKS.find(t => t.id === state.route.item) || TASKS[0];
    state.generatedPrompt = promptFor(task, $("#example-audience").value);
    $("#example-prompt").value = state.generatedPrompt; textAt("#copy-status", "Prompt reset to the current example and audience.");
  });
}
if (typeof document !== "undefined") load().catch(() => { textAt("#load-status", "The guidance couldn’t load. Reload the page, or use the installation and reference links below. Examples are unavailable until the source data loads."); $("#load-status").append(link(" Open the public reference repository.", "https://github.com/chadronbryant-collibra/collibra-design-pages")); });
