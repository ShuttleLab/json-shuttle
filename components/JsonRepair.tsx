"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { repairJson, getRepairedChangedLines } from "@/lib/json-repair";
import { InputWithLineNumbers, OutputWithLineNumbers } from "./CodeWithLineNumbers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    <Card
      className="border-chart-2/40 bg-chart-2/5"
      aria-labelledby="json-repair-title"
    >
      <CardHeader>
        <h2
          id="json-repair-title"
          className="text-xl font-bold text-foreground sm:text-2xl"
        >
          {t("jsonRepair.title")}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
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
          <Button
            type="button"
            size="lg"
            className="bg-chart-2 text-white hover:bg-chart-2/90"
            aria-label={t("jsonRepair.ariaLabelRepair")}
            onClick={handleRepair}
          >
            {t("jsonRepair.repair")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleClear}
          >
            {t("jsonRepair.clear")}
          </Button>
        </div>

        {repairedText !== null && (
          <div
            className="rounded-lg border-2 border-border bg-card"
            role="region"
            aria-label={t("jsonRepair.repairResult")}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-3 py-2">
              <span className="text-base font-semibold text-foreground">
                {t("jsonRepair.repairResult")}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {repairedChangedLines.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {t("jsonRepair.repairedLinesHint")}
                  </span>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    className="bg-chart-2 text-white hover:bg-chart-2/90"
                    aria-label={t("jsonRepair.ariaLabelApply")}
                    onClick={handleApply}
                  >
                    {t("jsonRepair.apply")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyResult}
                  >
                    {copyLabel ?? t("jsonRepair.copyResult")}
                  </Button>
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
            className="rounded-lg border-2 border-destructive/50 bg-destructive/10 p-4"
            role="alert"
          >
            <p className="text-base font-semibold text-destructive">
              {t("jsonRepair.repairFailed")}
            </p>
            <p className="mt-1 font-mono text-sm text-destructive">
              {error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
