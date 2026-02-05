"use client";

import { useI18n } from "@/lib/i18n";
import { JsonValidator, JsonRepair, JsonEscape } from "@/components";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="mb-12 text-center sm:mb-16">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-base text-zinc-600 dark:text-zinc-400 sm:text-lg">
          {t("home.subtitle")}
        </p>
      </section>

      <div className="space-y-10">
        <JsonValidator />
        <JsonRepair />
        <JsonEscape />
      </div>
    </div>
  );
}
