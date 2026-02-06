"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const navItems = [
  { href: "/", key: "nav.home" },
  { href: "/about", key: "nav.about" },
] as const;

export default function Header() {
  const { t } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-foreground transition-opacity hover:opacity-80 sm:text-xl"
        >
          <span className="tracking-tight">{t("common.appName")}</span>
        </Link>

        <nav
          className="flex items-center gap-1 sm:gap-2"
          aria-label={t("nav.mainAria")}
        >
          {navItems.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:px-4"
            >
              {t(key)}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
