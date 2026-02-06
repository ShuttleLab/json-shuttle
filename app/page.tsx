"use client";

import { useI18n } from "@/lib/i18n";
import { JsonValidator, JsonRepair, JsonEscape } from "@/components";

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="mb-12 text-center sm:mb-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium sm:text-xl">
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
