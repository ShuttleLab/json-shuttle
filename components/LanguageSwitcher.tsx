"use client";

import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50/80 p-0.5 dark:border-zinc-700 dark:bg-zinc-800/80"
      role="group"
      aria-label={t("lang.switcherAria")}
    >
      {(["zh", "en"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLocale(lang as Locale)}
          className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
            locale === lang
              ? "bg-background text-foreground shadow-sm dark:bg-zinc-700 dark:text-foreground"
              : "text-zinc-500 hover:text-foreground dark:text-zinc-400 dark:hover:text-foreground"
          }`}
          aria-pressed={locale === lang}
          aria-label={t(`lang.${lang}`)}
        >
          {t(`lang.${lang}`)}
        </button>
      ))}
    </div>
  );
}
