/**
 * Bilingual content data for AboutFaq.
 * Separated from the client component so server components can import it
 * without crossing the "use client" boundary.
 */

export type Bilingual = { zh: string; en: string };
export type Step = Bilingual;
export type FaqItem = { q: Bilingual; a: Bilingual };
export type HowTo = { id: string; name: Bilingual; steps: Step[] };

export const WHO_FOR: Bilingual[] = [
  { zh: "排查 API 响应的后端开发者", en: "Backend developers debugging API responses" },
  { zh: "处理配置文件的前端开发者", en: "Frontend developers handling configuration files" },
  { zh: "清理 JSON 导出的数据工程师", en: "Data engineers cleaning up JSON exports" },
  { zh: "学习 JSON 语法的初学者", en: "Anyone learning JSON syntax" },
];

export const WHEN_USE: Bilingual[] = [
  { zh: "API 返回 'unexpected token' 但定位不到出错的字段", en: "Your API returns 'unexpected token' but you can't tell which key is broken" },
  { zh: "JSON 字符串里嵌了 JSON 字符串，需要反转义", en: "You have stringified JSON inside JSON and need to unescape it" },
  { zh: "配置文件看起来正确但解析器拒绝接受", en: "A config file looks valid but the parser refuses it" },
  { zh: "压缩的 JSON 需要格式化才能读", en: "You need to format a minified JSON to read it" },
  { zh: "需要把格式化后的 JSON 压缩成一行嵌入代码", en: "You need to minify formatted JSON to embed in code" },
];

export const HOWTOS: HowTo[] = [
  {
    id: "validate",
    name: { zh: "如何校验 JSON", en: "How to validate JSON" },
    steps: [
      { zh: "把 JSON 粘贴到校验框", en: "Paste your JSON into the validator box" },
      { zh: "点击「校验」", en: "Click 'Validate'" },
      { zh: "错误会标出行号与列号", en: "Errors show line and column with a hint" },
    ],
  },
  {
    id: "repair",
    name: { zh: "如何修复损坏的 JSON", en: "How to fix broken JSON" },
    steps: [
      { zh: "粘贴损坏的 JSON", en: "Paste broken JSON" },
      { zh: "点击「修补」", en: "Click 'Repair'" },
      { zh: "工具自动修复缺失逗号、尾随逗号、未加引号的键名", en: "Tool fixes missing commas, trailing commas, unquoted keys" },
      { zh: "复制修复后的结果", en: "Review and copy the fixed output" },
    ],
  },
  {
    id: "escape",
    name: { zh: "如何转义 / 反转义 JSON 字符串", en: "How to escape or unescape JSON strings" },
    steps: [
      { zh: "粘贴字符串", en: "Paste a string" },
      { zh: "选择「转义」或「反转义」", en: "Choose Escape or Unescape mode" },
      { zh: "复制结果", en: "Copy the result" },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: { zh: "JSON Shuttle 免费吗？", en: "Is JSON Shuttle free?" },
    a: { zh: "完全免费。无需注册账号，无广告，不追踪数据。", en: "Yes — completely free. No account, no ads, no data tracking." },
  },
  {
    q: { zh: "我的 JSON 数据会上传到服务器吗？", en: "Does my JSON data leave my browser?" },
    a: { zh: "不会。所有校验、格式化、修补逻辑均在浏览器本地运行。我们的服务器不会接收你的数据，也不会做行为分析。", en: "No. All validation, formatting, and repair logic runs in your browser. Your data never reaches our servers, and we don't run analytics on it." },
  },
  {
    q: { zh: "支持多大的 JSON 文件？", en: "How large a JSON file can I paste?" },
    a: { zh: "建议在 5 MB 以内以获得最佳性能。浏览器引擎能处理更大数据，但 UI 响应会下降。", en: "For best performance, keep payloads under ~5 MB. The browser engine can technically handle larger, but UI responsiveness drops." },
  },
  {
    q: { zh: "能修复哪些 JSON 错误？", en: "What kinds of JSON errors can it repair?" },
    a: { zh: "包括缺失逗号、尾随逗号、键名用单引号、注释（// 或 /* */）、未加引号的键、错配的括号等常见问题。", en: "Common issues like missing commas, trailing commas, single quotes around keys, comments (// or /* */), unquoted keys, and incorrect bracket pairing." },
  },
  {
    q: { zh: "为什么校验提示 'Unexpected token N in JSON at position X'？", en: "Why does the validator show 'Unexpected token N in JSON at position X'?" },
    a: { zh: "Position X 是解析失败的字符偏移量，通常出现在缺失逗号之前，或未转义引号之后。JSON Shuttle 会高亮具体行列号。", en: "Position X is the character offset where parsing failed. Often this is just before a missing comma or after an unescaped quote. JSON Shuttle highlights the exact line/column." },
  },
  {
    q: { zh: "可以离线使用吗？", en: "Can I use JSON Shuttle offline?" },
    a: { zh: "可以。首次加载后整个应用可离线运行。把页面加书签即可在飞机上工作。", en: "Yes — after the first load, the entire app runs offline. Bookmark the page and you can work on a plane." },
  },
  {
    q: { zh: "JSON Shuttle 和 JSONLint 有什么不同？", en: "How is this different from JSONLint?" },
    a: { zh: "两者都是浏览器端校验工具。JSON Shuttle 额外提供修补模式（修复损坏 JSON）和转义 / 反转义模式，是 JSONLint 没有的。", en: "Both are browser-based validators. JSON Shuttle adds a repair mode for broken JSON and an escape/unescape mode that JSONLint lacks." },
  },
  {
    q: { zh: "JSON Shuttle 是开源的吗？", en: "Is JSON Shuttle open source?" },
    a: { zh: "核心校验与修补逻辑开源。如需访问代码仓库请联系 support@shuttlelab.org。", en: "The validation and repair logic is open. Contact support@shuttlelab.org for repo access." },
  },
];

export const COMPARISON = {
  zh: {
    heading: "JSON Shuttle 与同类工具对比",
    columns: ["工具", "校验", "格式化", "修补", "本地处理", "免费"],
    rows: [
      ["JSON Shuttle", "✓", "✓", "✓", "✓", "✓"],
      ["JSONLint", "✓", "✓", "—", "✓", "✓"],
      ["jq", "✓", "✓", "—", "命令行", "✓"],
      ["Online JSON Viewer", "✓", "✓", "—", "混合", "含广告"],
    ],
  },
  en: {
    heading: "JSON Shuttle vs alternatives",
    columns: ["Tool", "Validate", "Format", "Repair", "Local-Only", "Free"],
    rows: [
      ["JSON Shuttle", "✓", "✓", "✓", "✓", "✓"],
      ["JSONLint", "✓", "✓", "—", "✓", "✓"],
      ["jq", "✓", "✓", "—", "CLI", "✓"],
      ["Online JSON Viewer", "✓", "✓", "—", "Mixed", "with ads"],
    ],
  },
};

export const HEADINGS = {
  whoFor: { zh: "JSON Shuttle 适合谁？", en: "Who is JSON Shuttle for?" },
  whenUse: { zh: "什么时候用 JSON Shuttle？", en: "When should I use JSON Shuttle?" },
  howTo: { zh: "操作步骤", en: "How to use" },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
