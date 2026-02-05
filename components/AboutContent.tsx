"use client";

import { useState, useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n";

const SECURITY_KEYS = [
  "local",
  "noUpload",
  "openSource",
  "privacy",
] as const;

const TOAST_DURATION_MS = 2500;

const PAYMENT_QR = [
  { key: "alipay", src: "/alipay-qr.png" },
  { key: "paypal", src: "/paypal-qr.png" },
  { key: "wechat", src: "/wechat-qr.png" },
] as const;

export function AboutContent() {
  const { t } = useI18n();
  const [showCopiedHint, setShowCopiedHint] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCopiedToast = useCallback(() => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setShowCopiedHint(true);
    toastTimerRef.current = setTimeout(() => {
      setShowCopiedHint(false);
      toastTimerRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  const handleSupport = () => {
    setShowPaymentModal(true);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator?.share === "function") {
      try {
        await navigator.share({
          title: t("common.appName"),
          text: t("home.subtitle"),
          url,
        });
      } catch {
        await navigator.clipboard?.writeText(url);
        showCopiedToast();
      }
    } else {
      await navigator.clipboard?.writeText(url);
      showCopiedToast();
    }
  };

  return (
    <>
      <div className="mx-auto w-full max-w-6xl space-y-12 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* 服务介绍 */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium text-foreground">
          {t("about.intro.title")}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t("about.intro.body")}
        </p>
      </section>

      {/* 安全特性 - 4 块卡片 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">
          {t("about.security.title")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY_KEYS.map((key) => (
            <div
              key={key}
              className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 dark:border-zinc-700 dark:bg-zinc-800/80"
            >
              <h3 className="mb-2 font-medium text-foreground">
                {t(`about.security.${key}.title`)}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t(`about.security.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 使用场景 */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium text-foreground">
          {t("about.useCases.title")}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {t("about.useCases.items")}
        </p>
      </section>

      {/* 支持我们 - 支持/分享按钮 */}
      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">
          {t("about.support.title")}
        </h2>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSupport}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 dark:bg-foreground dark:text-background"
          >
            {t("about.support.supportBtn")}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="rounded-lg border border-zinc-300 bg-transparent px-4 py-2 text-sm font-medium text-foreground hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            {t("about.support.shareBtn")}
          </button>
        </div>
      </section>

      {/* 联系方式 - 邮箱 */}
      <section className="space-y-3">
        <h2 className="text-lg font-medium text-foreground">
          {t("about.contact.title")}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-foreground">
            {t("about.contact.email")}
          </span>
          <a
            href={`mailto:${t("about.contact.emailValue")}`}
            className="text-zinc-700 underline hover:text-foreground dark:text-zinc-300 dark:hover:text-foreground"
          >
            {t("about.contact.emailValue")}
          </a>
        </p>
      </section>
      </div>

      {/* 复制成功提示 */}
      {showCopiedHint && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg dark:bg-foreground dark:text-background"
        >
          {t("about.support.copiedHint")}
        </div>
      )}

      {/* 请支持我 - 收款码弹窗 */}
      {showPaymentModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-modal-title"
        >
          <button
            type="button"
            aria-label={t("about.support.paymentModalClose")}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPaymentModal(false)}
          />
          <div className="relative w-full max-w-2xl rounded-xl border border-zinc-200 bg-background p-6 shadow-xl dark:border-zinc-700 sm:p-8">
            <h2
              id="payment-modal-title"
              className="mb-6 text-lg font-medium text-foreground sm:text-xl"
            >
              {t("about.support.paymentModalTitle")}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
              {PAYMENT_QR.map(({ key, src }) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-3"
                >
                  <span className="text-sm font-medium text-foreground">
                    {t(`about.support.${key}`)}
                  </span>
                  <img
                    src={src}
                    alt={t(`about.support.${key}`)}
                    className="h-48 w-48 max-w-full rounded-lg border border-zinc-200 object-contain dark:border-zinc-600 sm:h-52 sm:w-52"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="mt-8 w-full rounded-lg border border-zinc-300 bg-transparent py-2 text-sm font-medium text-foreground hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-600 dark:hover:bg-zinc-800"
            >
              {t("about.support.paymentModalClose")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
