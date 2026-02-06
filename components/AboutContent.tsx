"use client";

import { useState, useRef, useCallback } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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

const CHART_CLASSES = [
  "border-chart-1/40 bg-chart-1/10",
  "border-chart-2/40 bg-chart-2/10",
  "border-chart-3/40 bg-chart-3/10",
  "border-chart-4/40 bg-chart-4/10",
];

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
        <Card className="border-2 border-border shadow-md">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {t("about.intro.title")}
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("about.intro.body")}
            </p>
          </CardContent>
        </Card>

        {/* 安全特性 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {t("about.security.title")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY_KEYS.map((key, i) => (
              <Card
                key={key}
                className={`border-2 shadow-md ${CHART_CLASSES[i] ?? "border-border bg-card"}`}
              >
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-foreground">
                    {t(`about.security.${key}.title`)}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {t(`about.security.${key}.desc`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 使用场景 */}
        <Card className="border-2 border-border shadow-md">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {t("about.useCases.title")}
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t("about.useCases.items")}
            </p>
          </CardContent>
        </Card>

        {/* 支持我们 */}
        <Card className="border-2 border-primary/30 bg-primary/10 shadow-md">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {t("about.support.title")}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={handleSupport}>
                {t("about.support.supportBtn")}
              </Button>
              <Button variant="outline" size="lg" onClick={handleShare}>
                {t("about.support.shareBtn")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 联系方式 */}
        <Card className="border-2 border-border shadow-md">
          <CardHeader>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {t("about.contact.title")}
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-lg">
              <span className="font-semibold text-foreground">
                {t("about.contact.email")}
              </span>{" "}
              <a
                href={`mailto:${t("about.contact.emailValue")}`}
                className="text-primary underline hover:no-underline"
              >
                {t("about.contact.emailValue")}
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 复制成功提示 */}
      {showCopiedHint && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border-2 border-border bg-card px-6 py-3 text-base font-semibold text-foreground shadow-lg"
        >
          {t("about.support.copiedHint")}
        </div>
      )}

      {/* 请支持我 - 收款码弹窗 */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-2xl border-2 border-border">
          <DialogHeader>
            <DialogTitle id="payment-modal-title" className="text-xl sm:text-2xl">
              {t("about.support.paymentModalTitle")}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {PAYMENT_QR.map(({ key, src }) => (
              <div
                key={key}
                className="flex flex-col items-center gap-3"
              >
                <span className="text-base font-semibold text-foreground">
                  {t(`about.support.${key}`)}
                </span>
                <img
                  src={src}
                  alt={t(`about.support.${key}`)}
                  className="h-48 w-48 max-w-full rounded-lg border-2 border-border object-contain sm:h-52 sm:w-52"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
              className="w-full"
            >
              {t("about.support.paymentModalClose")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
