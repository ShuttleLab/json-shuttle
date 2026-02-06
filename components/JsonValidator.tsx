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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card
      className="border-chart-1/40 bg-chart-1/5"
      aria-labelledby="json-validator-title"
    >
      <CardHeader>
        <h2
          id="json-validator-title"
          className="text-xl font-bold text-foreground sm:text-2xl"
        >
          {t("jsonValidator.title")}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Button
            type="button"
            size="lg"
            aria-label={t("jsonValidator.ariaLabelValidate")}
            onClick={handleValidate}
          >
            {t("jsonValidator.validate")}
          </Button>
          <Button
            type="button"
            variant="success"
            size="lg"
            aria-label={t("jsonValidator.ariaLabelBeautify")}
            onClick={handleBeautify}
          >
            {t("jsonValidator.beautify")}
          </Button>
          <Button
            type="button"
            className="bg-chart-4 text-white hover:bg-chart-4/90"
            size="lg"
            aria-label={t("jsonValidator.ariaLabelMinify")}
            onClick={handleMinify}
          >
            {t("jsonValidator.minify")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleClear}
          >
            {t("jsonValidator.clear")}
          </Button>
        </div>

        {formattedResult !== null && (
          <div
            className="rounded-lg border-2 border-border bg-card"
            role="region"
            aria-label={t("jsonValidator.formatResult")}
          >
            <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
              <span className="text-base font-semibold text-foreground">
                {t("jsonValidator.formatResult")}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyResult}
              >
                {copyLabel ?? t("jsonValidator.copyResult")}
              </Button>
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
            className={`rounded-lg border-2 p-4 ${
              result.ok
                ? "border-success/50 bg-success/10"
                : "border-destructive/50 bg-destructive/10"
            }`}
            role="status"
            aria-live="polite"
            data-valid={result.ok}
          >
            {result.ok ? (
              <p className="text-base font-semibold text-success">
                {t("jsonValidator.valid")}
              </p>
            ) : (
              <div className="space-y-3 text-base">
                <p className="font-semibold text-destructive">
                  {t("jsonValidator.invalid")}
                </p>
                <p className="text-muted-foreground">
                  {t("jsonValidator.errorLineHint")}
                </p>
                <dl className="grid gap-1.5 sm:grid-cols-[auto_1fr]">
                  <dt className="text-muted-foreground">
                    {t("jsonValidator.line")}:
                  </dt>
                  <dd className="font-mono">{result.line}</dd>
                  <dt className="text-muted-foreground">
                    {t("jsonValidator.column")}:
                  </dt>
                  <dd className="font-mono">{result.column}</dd>
                  <dt className="text-muted-foreground">
                    {t("jsonValidator.errorMessage")}:
                  </dt>
                  <dd className="break-all font-mono text-destructive">
                    {result.message}
                  </dd>
                </dl>
                {(result.snippet !== undefined ||
                  result.pointer !== undefined) && (
                  <div className="mt-2 overflow-x-auto rounded border border-border bg-muted/80 p-3 font-mono">
                    <p className="text-muted-foreground">
                      {t("jsonValidator.errorSnippet")}
                    </p>
                    <pre className="mt-1 whitespace-pre text-foreground">
                      {result.snippet || " "}
                    </pre>
                    {result.pointer !== undefined && (
                      <pre
                        className="text-destructive"
                        aria-hidden
                      >
                        {result.pointer}
                      </pre>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
