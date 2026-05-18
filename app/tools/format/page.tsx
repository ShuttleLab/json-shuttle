import type { Metadata } from "next";
import Link from "next/link";
import { JsonValidator } from "@/components";

export const metadata: Metadata = {
  title: "Format JSON Online — Free Browser-Based JSON Formatter | JSON Shuttle",
  description:
    "Paste your JSON and get a clean, indented version instantly. Runs entirely in your browser — your data never leaves your device. Free, no signup, works offline.",
  alternates: { canonical: "/tools/format" },
  openGraph: {
    title: "Format JSON Online — Free, Private, Instant",
    description:
      "Paste minified or messy JSON and get a clean, indented version. All processing happens locally in your browser.",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to format JSON online with JSON Shuttle",
  description:
    "Format minified or messy JSON into a clean, indented version that's easy to read.",
  totalTime: "PT10S",
  tool: { "@type": "HowToTool", name: "Web browser" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Paste JSON", text: "Paste your JSON into the input box on JSON Shuttle." },
    { "@type": "HowToStep", position: 2, name: "Click Beautify", text: "Click the 'Beautify' button to format with 2-space indentation." },
    { "@type": "HowToStep", position: 3, name: "Copy result", text: "Copy the formatted JSON from the output area." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the JSON formatter free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. JSON Shuttle's formatter is completely free with no signup or ads. The entire tool runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does the formatter send my JSON to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Formatting happens entirely client-side. Your JSON is processed by JavaScript running in your browser and never sent to any server. This makes JSON Shuttle suitable for sensitive data like API responses with PII or internal configuration.",
      },
    },
    {
      "@type": "Question",
      name: "What indentation does the formatter use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JSON Shuttle defaults to 2-space indentation, which is the most common style in JavaScript and Python ecosystems. Output is RFC 8259-compliant standard JSON.",
      },
    },
    {
      "@type": "Question",
      name: "Can the formatter handle large JSON files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For best performance, keep input under ~5 MB. Modern browsers can handle larger but the UI may slow down. For multi-gigabyte JSON, consider streaming tools like jq instead.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. After the page loads once, you can disconnect and the formatter still works. Bookmark the page for offline use.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Format JSON Online — Free Browser-Based JSON Formatter",
  description:
    "Complete guide to formatting JSON in your browser: what JSON formatting means, when you need it, and how to do it safely without uploading sensitive data.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  url: "https://json.shuttlelab.org/tools/format",
};

export default function FormatJsonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Format JSON Online — Free, Private, Instant
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Paste minified or messy JSON below and get a clean, indented version
            instantly. Runs entirely in your browser — your data never leaves
            your device.
          </p>
        </header>

        {/* Embedded tool */}
        <section className="mb-12">
          <JsonValidator />
        </section>

        <section className="prose prose-base max-w-none space-y-12 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-3">What is JSON formatting?</h2>
            <p className="text-muted-foreground leading-relaxed">
              JSON formatting (also called <em>pretty-printing</em> or{" "}
              <em>beautifying</em>) rewrites a JSON document with consistent
              indentation, line breaks, and spacing so it is readable by
              humans. The data itself does not change — only the whitespace.
              Minified JSON like{" "}
              <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                {`{"name":"Ada","skills":["math","logic"]}`}
              </code>{" "}
              becomes:
            </p>
            <pre className="bg-muted p-4 rounded mt-3 text-sm overflow-x-auto">
              {`{
  "name": "Ada",
  "skills": ["math", "logic"]
}`}
            </pre>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">When do you need to format JSON?</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <strong>Reading API responses</strong> — most APIs return
                minified JSON to save bandwidth, but it&apos;s unreadable until
                formatted.
              </li>
              <li>
                <strong>Debugging configuration files</strong> — a 200-line JSON
                config dumped on one line is impossible to scan for the field
                you need.
              </li>
              <li>
                <strong>Comparing two payloads</strong> — formatted JSON diffs
                cleanly in git or any diff tool.
              </li>
              <li>
                <strong>Code reviews and documentation</strong> — example
                payloads pasted in docs should be indented for readability.
              </li>
              <li>
                <strong>Spotting structural bugs</strong> — formatted JSON makes
                missing commas, mismatched brackets, and extra trailing data
                visible at a glance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              How to format JSON with JSON Shuttle
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li>
                <strong>Paste your JSON</strong> into the input box at the top
                of this page.
              </li>
              <li>
                <strong>Click &ldquo;Beautify&rdquo;</strong>. JSON Shuttle
                parses your input and re-emits it with 2-space indentation.
              </li>
              <li>
                <strong>Copy the result</strong> from the output area. The
                formatted version is valid RFC 8259 JSON, byte-for-byte
                equivalent in meaning to your input.
              </li>
            </ol>
            <p className="mt-3 text-muted-foreground leading-relaxed text-sm">
              If your JSON has syntax errors, the formatter will show the line
              and column of the first error. Use the{" "}
              <Link href="/" className="text-primary underline">
                repair mode
              </Link>{" "}
              to auto-fix common issues like trailing commas or unquoted keys
              first.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Common JSON formatting issues
            </h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold mb-1">
                  &ldquo;Unexpected token &apos;&#125;&apos; at position X&rdquo;
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Usually means a trailing comma after the last item in an
                  object or array. JSON (unlike JavaScript) does not allow
                  trailing commas.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">
                  &ldquo;Unexpected token N in JSON&rdquo;
                </dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  Often a key without quotes, like{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    {`{name: "Ada"}`}
                  </code>
                  . JSON requires keys to be double-quoted strings.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">Single quotes</dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  JSON spec only allows double quotes. Single-quoted strings
                  are valid JavaScript but invalid JSON.
                </dd>
              </div>
              <div>
                <dt className="font-semibold mb-1">Comments</dt>
                <dd className="text-muted-foreground leading-relaxed text-sm">
                  JSON does not support <code>//</code> or <code>/* */</code>{" "}
                  comments. Strip them before formatting, or use JSON Shuttle&apos;s
                  repair mode.
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name}>
                  <dt className="font-semibold mb-2">{q.name}</dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {q.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-bold mb-3">Related JSON tools</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary underline">
                  JSON Validator
                </Link>{" "}
                — check if your JSON is well-formed
              </li>
              <li>
                <Link href="/" className="text-primary underline">
                  JSON Repair
                </Link>{" "}
                — auto-fix common syntax errors
              </li>
              <li>
                <Link href="/" className="text-primary underline">
                  JSON Escape / Unescape
                </Link>{" "}
                — escape strings for embedding inside other JSON
              </li>
              <li>
                <Link href="/about" className="text-primary underline">
                  About JSON Shuttle
                </Link>{" "}
                — privacy, use cases, full FAQ
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
