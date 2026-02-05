"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  escapeJsonString,
  unescapeJsonString,
} from "@/lib/json-validator";

export default function JsonEscape() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyLabel, setCopyLabel] = useState<string | null>(null);

  const handleEscape = useCallback(() => {
    setError(null);
    setOutput(escapeJsonString(input));
  }, [input]);

  const handleUnescape = useCallback(() => {
    setError(null);
    const result = unescapeJsonString(input);
    if (result.ok) {
      setOutput(result.text);
    } else {
      setOutput("");
      setError(result.message);
    }
  }, [input]);

  const handleCopyOutput = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyLabel(t("jsonEscape.copied"));
      setTimeout(() => setCopyLabel(null), 2000);
    } catch {
      setCopyLabel(null);
    }
  }, [output, t]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setCopyLabel(null);
  }, []);

  return (
    <section
      className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-8"
      aria-labelledby="json-escape-title"
    >
      <h2
        id="json-escape-title"
        className="mb-4 text-lg font-medium text-foreground sm:text-xl"
      >
        {t("jsonEscape.title")}
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="json-escape-input" className="sr-only">
            {t("jsonEscape.ariaLabelInput")}
          </label>
          <textarea
            id="json-escape-input"
            aria-label={t("jsonEscape.ariaLabelInput")}
            className="min-h-[120px] w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2 font-mono text-sm text-foreground placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-600 dark:bg-zinc-900 dark:placeholder-zinc-400 dark:focus:border-zinc-400 dark:focus:ring-zinc-400/20"
            placeholder={t("jsonEscape.inputPlaceholder")}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(null);
            }}
            spellCheck={false}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label={t("jsonEscape.ariaLabelEscape")}
            onClick={handleEscape}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus:ring-violet-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonEscape.escape")}
          </button>
          <button
            type="button"
            aria-label={t("jsonEscape.ariaLabelUnescape")}
            onClick={handleUnescape}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-400 dark:focus:ring-sky-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonEscape.unescape")}
          </button>
          <button
            type="button"
            onClick={handleCopyOutput}
            disabled={!output}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
          >
            {copyLabel ?? t("jsonEscape.copyOutput")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonValidator.clear")}
          </button>
        </div>

        <div>
          <label htmlFor="json-escape-output" className="sr-only">
            {t("jsonEscape.ariaLabelOutput")}
          </label>
          <textarea
            id="json-escape-output"
            readOnly
            aria-label={t("jsonEscape.ariaLabelOutput")}
            className="min-h-[120px] w-full resize-y rounded-lg border border-zinc-300 bg-zinc-100/80 px-3 py-2 font-mono text-sm text-foreground placeholder-zinc-500 dark:border-zinc-600 dark:bg-zinc-800/80 dark:placeholder-zinc-400"
            placeholder={t("jsonEscape.outputPlaceholder")}
            value={output}
          />
        </div>

        {error !== null && (
          <div
            className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 dark:border-red-400/40 dark:bg-red-500/10"
            role="alert"
          >
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {t("jsonEscape.unescapeError")}: {error}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
