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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-zinc-800">
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
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-foreground dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-foreground sm:px-4"
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
