/**
 * JSON 格式修补：将错误格式修复为合法 JSON
 * 使用 jsonrepair 处理：单引号、未加引号的 key、尾逗号、未闭合括号等
 */

import { jsonrepair } from "jsonrepair";
import { validateJson, beautifyJson } from "./json-validator";

export type JsonRepairResult =
  | { ok: true; text: string; changed: boolean }
  | { ok: false; message: string };

/**
 * 修补 JSON 文本。成功返回 { ok: true, text, changed }；
 * 若原本已合法则 changed 为 false，否则为 true。
 */
export function repairJson(input: string): JsonRepairResult {
  const trimmed = input.trim();
  if (trimmed === "") {
    return { ok: false, message: "请输入 JSON 文本" };
  }

  const valid = validateJson(trimmed);
  if (valid.ok) {
    const formatted = beautifyJson(trimmed);
    return {
      ok: true,
      text: formatted.ok ? formatted.text : trimmed,
      changed: false,
    };
  }

  try {
    const repaired = jsonrepair(trimmed);
    const formatted = beautifyJson(repaired);
    return {
      ok: true,
      text: formatted.ok ? formatted.text : repaired,
      changed: true,
    };
  } catch (e) {
    return {
      ok: false,
      message: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * 比较原始文本与修补后文本，返回修补结果中发生变化的行号（1-based）。
 * 用于在 UI 中高亮显示“被修补的行”。
 */
export function getRepairedChangedLines(original: string, repaired: string): number[] {
  const origLines = original.trim().split("\n");
  const repLines = repaired.split("\n");
  const changed: number[] = [];
  for (let i = 0; i < repLines.length; i++) {
    const lineNum = i + 1;
    if (i >= origLines.length || origLines[i] !== repLines[i]) {
      changed.push(lineNum);
    }
  }
  return changed;
}
