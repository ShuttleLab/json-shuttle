"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function TermsPage() {
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
        {zh ? "服务条款" : "Terms of Service"}
      </h1>
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        <p>{zh ? "最后更新：2026 年 5 月" : "Last updated: May 2026"}</p>

        <h2 className="text-foreground">
          {zh ? "1. 服务说明" : "1. Service description"}
        </h2>
        <p>
          {zh
            ? "JSON 穿梭机是一个免费的浏览器端 JSON 工具，提供 JSON 验证、格式化、修复和转义功能。本工具按「现状」提供，不对结果的完整性或正确性作出保证；最终的 JSON 处理结果应由用户自行核对。"
            : "JSON Shuttle is a free, browser-based JSON tool providing validation, formatting, repair, and escaping. The service is provided \"as is\" without warranties of completeness or correctness; the user is responsible for verifying the final JSON output."}
        </p>

        <h2 className="text-foreground">
          {zh ? "2. 用户责任" : "2. User responsibilities"}
        </h2>
        <p>
          {zh
            ? "请仅处理你拥有合法权利的数据。本工具不会上传或转发你的 JSON 数据，但你仍需对所提供的数据内容负责。"
            : "Only process data you have the legal right to handle. The tool never uploads or forwards your JSON data, but you remain responsible for the content you choose to process."}
        </p>

        <h2 className="text-foreground">
          {zh ? "3. 免责声明" : "3. Disclaimer"}
        </h2>
        <p>
          {zh
            ? "本工具不对因使用本服务而产生的任何直接或间接损失负责，包括但不限于因 JSON 处理结果不完全准确而产生的数据错误或应用故障。"
            : "We are not liable for any direct or indirect damages arising from the use of the service, including but not limited to data errors or application failures caused by imperfect JSON processing."}
        </p>

        <h2 className="text-foreground">
          {zh ? "4. 条款变更" : "4. Changes"}
        </h2>
        <p>
          {zh
            ? "我们保留随时更新本条款的权利。继续使用本服务即视为接受更新后的条款。"
            : "We reserve the right to update these terms. Continued use of the service constitutes acceptance of the updated terms."}
        </p>

        <h2 className="text-foreground">
          {zh ? "5. 联系我们" : "5. Contact"}
        </h2>
        <p>
          <a href="mailto:support@shuttlelab.org" className="text-primary">
            support@shuttlelab.org
          </a>
        </p>
      </div>
    </div>
  );
}