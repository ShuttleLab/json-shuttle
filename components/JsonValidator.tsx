"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  validateJson,
  beautifyJson,
  minifyJson,
  type JsonValidateResult,
} from "@/lib/json-validator";
import { InputWithLineNumbers, OutputWithLineNumbers } from "./CodeWithLineNumbers";

export default function JsonValidator() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<JsonValidateResult | null>(null);
  const [formattedResult, setFormattedResult] = useState<string | null>(null);
  const [copyLabel, setCopyLabel] = useState<string | null>(null);

  const handleValidate = useCallback(() => {
    setFormattedResult(null);
    setResult(validateJson(input));
  }, [input]);

  const handleBeautify = useCallback(() => {
    const format = beautifyJson(input);
    if (format.ok) {
      setFormattedResult(format.text);
      setResult(null);
    } else {
      setFormattedResult(null);
      setResult(validateJson(input));
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    const format = minifyJson(input);
    if (format.ok) {
      setFormattedResult(format.text);
      setResult(null);
    } else {
      setFormattedResult(null);
      setResult(validateJson(input));
    }
  }, [input]);

  const handleCopyResult = useCallback(async () => {
    if (!formattedResult) return;
    try {
      await navigator.clipboard.writeText(formattedResult);
      setCopyLabel(t("jsonValidator.copied"));
      setTimeout(() => setCopyLabel(null), 2000);
    } catch {
      setCopyLabel(null);
    }
  }, [formattedResult, t]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult(null);
    setFormattedResult(null);
    setCopyLabel(null);
  }, []);

  return (
    <section
      className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/30 sm:p-8"
      aria-labelledby="json-validator-title"
    >
      <h2
        id="json-validator-title"
        className="mb-4 text-lg font-medium text-foreground sm:text-xl"
      >
        {t("jsonValidator.title")}
      </h2>

      <div className="space-y-4">
        <InputWithLineNumbers
          aria-label={t("jsonValidator.ariaLabelInput")}
          placeholder={t("jsonValidator.placeholder")}
          value={input}
          onChange={setInput}
          errorLine={
            result !== null && !result.ok && "line" in result ? result.line : null
          }
          minHeight={200}
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label={t("jsonValidator.ariaLabelValidate")}
            onClick={handleValidate}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonValidator.validate")}
          </button>
          <button
            type="button"
            aria-label={t("jsonValidator.ariaLabelBeautify")}
            onClick={handleBeautify}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus:ring-emerald-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonValidator.beautify")}
          </button>
          <button
            type="button"
            aria-label={t("jsonValidator.ariaLabelMinify")}
            onClick={handleMinify}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-500 dark:hover:bg-amber-400 dark:focus:ring-amber-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonValidator.minify")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
          >
            {t("jsonValidator.clear")}
          </button>
        </div>

        {formattedResult !== null && (
          <div
            className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/50"
            role="region"
            aria-label={t("jsonValidator.formatResult")}
          >
            <div className="flex items-center justify-between gap-2 border-b border-zinc-200 px-3 py-2 dark:border-zinc-700">
              <span className="text-sm font-medium text-foreground">
                {t("jsonValidator.formatResult")}
              </span>
              <button
                type="button"
                onClick={handleCopyResult}
                className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-foreground hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:focus:ring-zinc-400 dark:focus:ring-offset-zinc-900"
              >
                {copyLabel ?? t("jsonValidator.copyResult")}
              </button>
            </div>
            <OutputWithLineNumbers
              aria-label={t("jsonValidator.formatResult")}
              value={formattedResult}
              minHeight={180}
            />
          </div>
        )}

        {result !== null && (
          <div
            className={`rounded-lg border p-4 ${
              result.ok
                ? "border-green-500/50 bg-green-500/10 dark:border-green-400/40 dark:bg-green-500/10"
                : "border-red-500/50 bg-red-500/10 dark:border-red-400/40 dark:bg-red-500/10"
            }`}
            role="status"
            aria-live="polite"
            data-valid={result.ok}
          >
            {result.ok ? (
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                {t("jsonValidator.valid")}
              </p>
            ) : (
              <div className="space-y-3 text-sm">
                <p className="font-medium text-red-700 dark:text-red-400">
                  {t("jsonValidator.invalid")}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {t("jsonValidator.errorLineHint")}
                </p>
                <dl className="grid gap-1.5 sm:grid-cols-[auto_1fr]">
                  <dt className="text-zinc-500 dark:text-zinc-400">
                    {t("jsonValidator.line")}:
                  </dt>
                  <dd className="font-mono">{result.line}</dd>
                  <dt className="text-zinc-500 dark:text-zinc-400">
                    {t("jsonValidator.column")}:
                  </dt>
                  <dd className="font-mono">{result.column}</dd>
                  <dt className="text-zinc-500 dark:text-zinc-400">
                    {t("jsonValidator.errorMessage")}:
                  </dt>
                  <dd className="break-all font-mono text-red-700 dark:text-red-400">
                    {result.message}
                  </dd>
                </dl>
                {(result.snippet !== undefined || result.pointer !== undefined) && (
                  <div className="mt-2 overflow-x-auto rounded border border-zinc-200 bg-zinc-100/80 p-3 font-mono dark:border-zinc-700 dark:bg-zinc-800/80">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      {t("jsonValidator.errorSnippet")}
                    </p>
                    <pre className="mt-1 whitespace-pre text-foreground">
                      {result.snippet || " "}
                    </pre>
                    {result.pointer !== undefined && (
                      <pre className="text-red-600 dark:text-red-400" aria-hidden>
                        {result.pointer}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
