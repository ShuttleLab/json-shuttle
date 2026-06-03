"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t, locale } = useI18n();
  const zh = locale === "zh";
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="size-4" />
        {zh ? "返回首页" : "Back to Home"}
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        {zh ? "隐私政策" : "Privacy Policy"}
      </h1>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        <p>{zh ? "最后更新：2026 年 5 月" : "Last updated: May 2026"}</p>

        <h2 className="text-foreground">
          {zh ? "1. 我们不收集你的 JSON 数据" : "1. We don't collect your JSON data"}
        </h2>
        <p>
          {zh
            ? "JSON 穿梭机是一个纯前端工具。所有 JSON 的验证、格式化、修复和转义操作均在你的浏览器内存中完成，数据不会发送到任何服务器。"
            : "JSON Shuttle is a client-only tool. All JSON validation, formatting, repair, and escaping operations happen in your browser memory. Data is never sent to any server."}
        </p>

        <h2 className="text-foreground">
          {zh ? "2. 本地存储" : "2. Local storage"}
        </h2>
        <p>
          {zh
            ? "我们使用浏览器的 localStorage 存储你的语言偏好与主题设置。这些数据仅存在于你的设备上，可随时通过浏览器清除。"
            : "We use localStorage to remember your language and theme preferences. All this data lives only on your device and can be cleared at any time."}
        </p>

        <h2 className="text-foreground">
          {zh ? "3. 无追踪、无 Cookie" : "3. No tracking, no cookies"}
        </h2>
        <p>
          {zh
            ? "我们不使用 Cookie，不嵌入第三方分析或追踪脚本。"
            : "We don't use cookies and don't embed any third-party analytics or tracking scripts."}
        </p>

        <h2 className="text-foreground">
          {zh ? "4. 第三方服务" : "4. Third-party services"}
        </h2>
        <p>
          {zh
            ? "网站托管在 Cloudflare Pages 上，Cloudflare 会按其隐私政策记录基础的访问日志（如 IP、UA），用于安全与可用性保护。"
            : "The site is hosted on Cloudflare Pages. Cloudflare records basic access logs (IP, UA) per its own privacy policy, used for security and reliability."}
        </p>

        <h2 className="text-foreground">
          {zh ? "5. 联系我们" : "5. Contact"}
        </h2>
        <p>
          {zh ? "隐私相关问题请联系：" : "For privacy inquiries, contact:"}{" "}
          <a href="mailto:support@shuttlelab.org" className="text-primary">
            support@shuttlelab.org
          </a>
        </p>
      </div>
    </div>
  );
}