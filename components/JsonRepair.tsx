"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { repairJson, getRepairedChangedLines } from "@/lib/json-repair";
import { InputWithLineNumbers, OutputWithLineNumbers } from "./CodeWithLineNumbers";

export default function JsonRepair() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [repairedText, setRepairedText] = useState<string | null>(null);
  const [repairedChangedLines, setRepairedChangedLines] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copyLabel, setCopyLabel] = useState<string | null>(null);

  const handleRepair = useCallback(() => {
    setError(null);
    const result = repairJson(input);
    if (result.ok) {
      setRepairedText(result.text);
      setRepairedChangedLines(
        result.changed ? getRepairedChangedLines(input, result.text) : []
      );
    } else {
      setRepairedText(null);
      setRepairedChangedLines([]);
      setError(result.message);
    }
  }, [input]);

  const handleApply = useCallback(() => {
    if (repairedText !== null) {
      setInput(repairedText);
      setRepairedText(null);
      setError(null);
    }
  }, [repairedText]);

  const handleCopyResult = useCallback(async () => {
    if (!repairedText) return;
    try {
      await navigator.clipboard.writeText(repairedText);
      setCopyLabel(t("jsonRepair.copied"));
      setTimeout(() => setCopyLabel(null), 2000);
    } catch {
      setCopyLabel(null);
    }
  }, [repairedText, t]);

  const handleClear = useCallback(() => {
    setInput("");
    setRepairedText(null);
    setRepairedChangedLines([]);
    setError(null);
    setCopyLabel(null);
  }, []);

  return (
    <section
      className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-8"
      aria-labelledby="json-repair-title"
    >
      <h2
        id="json-repair-title"
        className="mb-4 text-lg font-medium text-foreground sm:text-xl"
      >
        {t("jsonRepair.title")}
      </h2>

      <div className="space-y-4">
        <InputWithLineNumbers
          aria-label={t("jsonRepair.ariaLabelInput")}
          placeholder={t("jsonRepair.placeholder")}
          value={input}
          onChange={(v) => {
            setInput(v);
            setError(null);
            setRepairedText(null);
            setRepairedChangedLines([]);
          }}
          minHeight={200}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label={t("jsonRepair.ariaLabelRepair")}
            onClick={handleRepair}
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus:ring-violet-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonRepair.repair")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonRepair.clear")}
          </button>
        </div>

        {repairedText !== null && (
          <div
            className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/50"
            role="region"
            aria-label={t("jsonRepair.repairResult")}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-700">
              <span className="text-sm font-medium text-foreground">
                {t("jsonRepair.repairResult")}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {repairedChangedLines.length > 0 && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t("jsonRepair.repairedLinesHint")}
                  </span>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label={t("jsonRepair.ariaLabelApply")}
                    onClick={handleApply}
                    className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:bg-violet-500 dark:hover:bg-violet-400 dark:focus:ring-violet-400 dark:focus:ring-offset-zinc-900"
                  >
                    {t("jsonRepair.apply")}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-foreground hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
                  >
                    {copyLabel ?? t("jsonRepair.copyResult")}
                  </button>
                </div>
              </div>
            </div>
            <OutputWithLineNumbers
              aria-label={t("jsonRepair.repairResult")}
              value={repairedText}
              highlightLines={repairedChangedLines}
              minHeight={180}
            />
          </div>
        )}

        {error !== null && (
          <div
            className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 dark:border-red-400/40 dark:bg-red-500/10"
            role="alert"
          >
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {t("jsonRepair.repairFailed")}
            </p>
            <p className="mt-1 font-mono text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
