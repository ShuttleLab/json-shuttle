"use client";

import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  escapeJsonString,
  unescapeJsonString,
} from "@/lib/json-validator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
    <Card
      className="border-chart-3/40 bg-chart-3/5"
      aria-labelledby="json-escape-title"
    >
      <CardHeader>
        <h2
          id="json-escape-title"
          className="text-xl font-bold text-foreground sm:text-2xl"
        >
          {t("jsonEscape.title")}
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="json-escape-input" className="sr-only">
            {t("jsonEscape.ariaLabelInput")}
          </label>
          <Textarea
            id="json-escape-input"
            aria-label={t("jsonEscape.ariaLabelInput")}
            className="min-h-[120px] resize-y"
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
          <Button
            type="button"
            size="lg"
            className="bg-chart-2 text-white hover:bg-chart-2/90"
            aria-label={t("jsonEscape.ariaLabelEscape")}
            onClick={handleEscape}
          >
            {t("jsonEscape.escape")}
          </Button>
          <Button
            type="button"
            size="lg"
            className="bg-chart-1 text-white hover:bg-chart-1/90"
            aria-label={t("jsonEscape.ariaLabelUnescape")}
            onClick={handleUnescape}
          >
            {t("jsonEscape.unescape")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleCopyOutput}
            disabled={!output}
          >
            {copyLabel ?? t("jsonEscape.copyOutput")}
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

        <div>
          <label htmlFor="json-escape-output" className="sr-only">
            {t("jsonEscape.ariaLabelOutput")}
          </label>
          <Textarea
            id="json-escape-output"
            readOnly
            aria-label={t("jsonEscape.ariaLabelOutput")}
            className="min-h-[120px] resize-y bg-muted/80"
            placeholder={t("jsonEscape.outputPlaceholder")}
            value={output}
          />
        </div>

        {error !== null && (
          <div
            className="rounded-lg border-2 border-destructive/50 bg-destructive/10 p-4"
            role="alert"
          >
            <p className="text-base font-semibold text-destructive">
              {t("jsonEscape.unescapeError")}: {error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
