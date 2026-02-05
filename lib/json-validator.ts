/**
 * JSON 校验：解析并提取错误位置（行、列、信息）
 */

export type JsonValidateSuccess = {
  ok: true;
  value: unknown;
};

export type JsonValidateError = {
  ok: false;
  message: string;
  line: number;
  column: number;
  position: number;
  snippet?: string;
  pointer?: string;
};

export type JsonValidateResult = JsonValidateSuccess | JsonValidateError;

/** 从字符串 offset 计算行号、列号（1-based），并截取该行作为 snippet */
function offsetToLineColumn(
  text: string,
  position: number
): { line: number; column: number; snippet: string } {
  const lines = text.slice(0, position).split("\n");
  const line = lines.length;
  const column = (lines[lines.length - 1] ?? "").length + 1;
  const allLines = text.split("\n");
  const snippet = allLines[line - 1] ?? "";
  return { line, column, snippet };
}

/** 从 SyntaxError 消息中解析 "position N" 或 "line N column M" */
function parseErrorPosition(message: string): number | null {
  const atPosition = /at position (\d+)/i.exec(message);
  if (atPosition) return parseInt(atPosition[1], 10);
  return null;
}

/**
 * 校验 JSON 文本。成功返回 { ok: true, value }；失败返回行、列、错误信息及错误行片段。
 */
export function validateJson(input: string): JsonValidateResult {
  const trimmed = input.trim();
  if (trimmed === "") {
    return {
      ok: false,
      message: "请输入 JSON 文本",
      line: 1,
      column: 1,
      position: 0,
    };
  }

  try {
    const value = JSON.parse(input);
    return { ok: true, value };
  } catch (e) {
    if (!(e instanceof SyntaxError)) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : String(e),
        line: 1,
        column: 1,
        position: 0,
      };
    }

    const message = e.message;
    const position = parseErrorPosition(message) ?? 0;
    const { line, column, snippet } = offsetToLineColumn(input, position);
    const pointer =
      column > 0 && column <= snippet.length + 1
        ? " ".repeat(Math.max(0, column - 1)) + "^"
        : undefined;

    return {
      ok: false,
      message,
      line,
      column,
      position,
      snippet: snippet || undefined,
      pointer,
    };
  }
}

export type JsonFormatResult =
  | { ok: true; text: string }
  | { ok: false; message: string };

const DEFAULT_INDENT = 2;

/**
 * 将 JSON 美化为标准格式（带缩进）。无效 JSON 返回 { ok: false, message }。
 */
export function beautifyJson(
  input: string,
  space: number = DEFAULT_INDENT
): JsonFormatResult {
  const parsed = validateJson(input);
  if (!parsed.ok) {
    return { ok: false, message: parsed.message };
  }
  try {
    const text = JSON.stringify(parsed.value, null, space);
    return { ok: true, text };
  } catch {
    return { ok: false, message: "序列化失败" };
  }
}

/**
 * 将 JSON 压缩为最短内容（去除多余空白与换行）。无效 JSON 返回 { ok: false, message }。
 */
export function minifyJson(input: string): JsonFormatResult {
  const parsed = validateJson(input);
  if (!parsed.ok) {
    return { ok: false, message: parsed.message };
  }
  try {
    const text = JSON.stringify(parsed.value);
    return { ok: true, text };
  } catch {
    return { ok: false, message: "序列化失败" };
  }
}

export type JsonUnescapeResult =
  | { ok: true; text: string }
  | { ok: false; message: string };

/**
 * 将字符串按 JSON 规则转义（如 " → \", 换行 → \n），便于嵌入 JSON 字符串。
 */
export function escapeJsonString(input: string): string {
  return JSON.stringify(input).slice(1, -1);
}

/**
 * 将已转义的字符串按 JSON 规则去除转义（如 \" → ", \n → 换行）。
 * 输入应为 JSON 字符串内容形式（可含 \" \\ \n \t 等），不含两侧引号。
 */
export function unescapeJsonString(input: string): JsonUnescapeResult {
  try {
    const text = JSON.parse('"' + input + '"');
    return { ok: true, text: String(text) };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : String(e),
    };
  }
}
