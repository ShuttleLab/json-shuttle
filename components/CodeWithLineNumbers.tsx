"use client";

import { useRef, useEffect, useMemo } from "react";

// 与 textarea 行高严格一致，便于行号与内容对齐；必须带单位 px，否则会被当作倍数导致错行
const LINE_HEIGHT = "18px";
const GUTTER_MIN_WIDTH_REM = 2.5;
const PADDING_TOP_BOTTOM_PX = 8;
const FONT_SIZE_PX = 14;

function getLineCount(text: string): number {
  if (!text) return 1;
  const n = text.split("\n").length;
  return n;
}

type InputWithLineNumbersProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  "aria-label"?: string;
  errorLine?: number | null;
  className?: string;
  minHeight?: number;
};

export function InputWithLineNumbers({
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  errorLine = null,
  className = "",
  minHeight = 200,
}: InputWithLineNumbersProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const lineCount = useMemo(() => getLineCount(value), [value]);

  useEffect(() => {
    const ta = textareaRef.current;
    const gutter = gutterRef.current;
    if (!ta || !gutter) return;
    const sync = () => {
      gutter.scrollTop = ta.scrollTop;
    };
    ta.addEventListener("scroll", sync);
    return () => ta.removeEventListener("scroll", sync);
  }, []);

  return (
    <div
      className={`flex overflow-hidden rounded-lg border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900 ${className}`}
      style={{ minHeight }}
    >
      <div
        ref={gutterRef}
        className="flex-shrink-0 overflow-y-auto overflow-x-hidden border-r border-zinc-200 bg-zinc-100/80 text-right font-mono text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          width: `${GUTTER_MIN_WIDTH_REM}rem`,
          minHeight,
          paddingTop: PADDING_TOP_BOTTOM_PX,
          paddingBottom: PADDING_TOP_BOTTOM_PX,
          paddingRight: 8,
          fontSize: FONT_SIZE_PX,
        }}
        aria-hidden
      >
        <div
          className="pl-1"
          style={{
            lineHeight: LINE_HEIGHT,
            minHeight: `max(calc(${lineCount} * ${LINE_HEIGHT}), ${minHeight - 2 * PADDING_TOP_BOTTOM_PX}px)`,
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const num = i + 1;
            const isError = errorLine !== null && errorLine !== undefined && num === errorLine;
            return (
              <div
                key={num}
                className={isError ? "font-medium text-red-600 dark:text-red-400" : ""}
                style={{ height: LINE_HEIGHT, lineHeight: LINE_HEIGHT }}
                data-line={num}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        aria-label={ariaLabel}
        className="min-w-0 flex-1 resize-none overflow-y-auto rounded-r-lg border-0 bg-transparent text-foreground placeholder-zinc-500 focus:outline-none focus:ring-0 dark:placeholder-zinc-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        style={{
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: FONT_SIZE_PX,
          lineHeight: LINE_HEIGHT,
          minHeight,
          paddingTop: PADDING_TOP_BOTTOM_PX,
          paddingBottom: PADDING_TOP_BOTTOM_PX,
          paddingLeft: 12,
          paddingRight: 12,
        }}
      />
    </div>
  );
}

type OutputWithLineNumbersProps = {
  value: string;
  highlightLines?: number[];
  "aria-label"?: string;
  className?: string;
  minHeight?: number;
};

export function OutputWithLineNumbers({
  value,
  highlightLines = [],
  "aria-label": ariaLabel,
  className = "",
  minHeight = 180,
}: OutputWithLineNumbersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lines = useMemo(() => value.split("\n"), [value]);
  const highlightSet = useMemo(
    () => new Set(highlightLines),
    [highlightLines]
  );

  return (
    <div
      ref={containerRef}
      className={`overflow-auto rounded-b-lg font-mono text-foreground ${className}`}
      style={{ minHeight, fontSize: FONT_SIZE_PX }}
      role="region"
      aria-label={ariaLabel}
    >
      <div style={{ lineHeight: LINE_HEIGHT }}>
        {lines.map((line, i) => {
          const lineNum = i + 1;
          const highlighted = highlightSet.has(lineNum);
          return (
            <div
              key={lineNum}
              className="flex border-b border-zinc-100/50 dark:border-zinc-800/50"
              style={{ height: LINE_HEIGHT, lineHeight: LINE_HEIGHT }}
              data-line={lineNum}
            >
              <div
                className="flex-shrink-0 select-none border-r border-zinc-200 bg-zinc-100/80 pr-2 text-right text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-400"
                style={{
                  width: `${GUTTER_MIN_WIDTH_REM}rem`,
                  height: LINE_HEIGHT,
                  lineHeight: LINE_HEIGHT,
                }}
                aria-hidden
              >
                {lineNum}
              </div>
              <div
                className={`min-w-0 flex-1 whitespace-pre break-all px-3 ${
                  highlighted
                    ? "bg-amber-100 dark:bg-amber-900/30"
                    : ""
                }`}
                style={{ height: LINE_HEIGHT, lineHeight: LINE_HEIGHT }}
              >
                {line || "\u00A0"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
