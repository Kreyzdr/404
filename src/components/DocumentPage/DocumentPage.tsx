import { Fragment } from "react"
import type { ReactNode } from "react"

import { useI18n } from "@/i18n"

interface DocumentPageProps {
  content: string
  pathname: string
  brandHref?: string
}

function cleanDocumentContent(content: string) {
  return content
    .replace(/^```(?:txt)?\s*$/gim, "")
    .replace(/^```\s*$/gim, "")
    .trim()
}

function stripMarkdown(value: string) {
  return value.replace(/\*\*/g, "").trim()
}

const COOKIE_HEADINGS = new Set(["cookies", "cookie", "файлы cookie"])

function createHeadingId(value: string) {
  const normalized = stripMarkdown(value).toLowerCase()

  if (COOKIE_HEADINGS.has(normalized)) return "cookie-policy"

  return (
    normalized
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9\u0400-\u04ff\u4e00-\u9fff]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "section"
  )
}

function renderInlineText(text: string): ReactNode[] {
  const parts = text.split(
    /(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g,
  )

  return parts.map((part, index) => {
    if (!part) return null

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>
    }

    if (/^https?:\/\//.test(part)) {
      const punctuation = part.match(/[.,;:!?]+$/)?.[0] ?? ""
      const url = punctuation ? part.slice(0, -punctuation.length) : part

      return (
        <Fragment key={index}>
          <a href={url} target="_blank" rel="noreferrer noopener">
            {url}
          </a>
          {punctuation}
        </Fragment>
      )
    }

    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) {
      return (
        <a key={index} href={`mailto:${part}`}>
          {part}
        </a>
      )
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

const headingClassName = "scroll-mt-28"

function renderDocument(content: string) {
  const lines = cleanDocumentContent(content).split(/\r?\n/)
  const blocks: ReactNode[] = []
  let index = 0
  let primaryHeadingRendered = false

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const heading = stripMarkdown(headingMatch[2])
      const id = createHeadingId(heading)

      if (level === 1 && !primaryHeadingRendered) {
        blocks.push(
          <h1
            id={id}
            className={`${headingClassName} font-display uppercase headline text-[clamp(36px,6vw,64px)]`}
            key={index}
          >
            {heading}
          </h1>,
        )
        primaryHeadingRendered = true
      } else if (level === 3) {
        blocks.push(
          <h3
            id={id}
            className={`${headingClassName} mt-8 font-label text-lg font-semibold uppercase tracking-[0.06em] text-cream`}
            key={index}
          >
            {heading}
          </h3>,
        )
      } else {
        blocks.push(
          <h2
            id={id}
            className={`${headingClassName} mt-12 font-label text-xl font-semibold uppercase tracking-[0.08em] text-cream sm:text-2xl`}
            key={index}
          >
            {heading}
          </h2>,
        )
      }

      index += 1
      continue
    }

    if (
      /^(Updated:|Aktualisiert:|Actualizado:|Обновлено:|更新：)/i.test(line)
    ) {
      blocks.push(
        <p
          className="mt-4 mb-8 inline-flex bg-hair px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted"
          key={index}
        >
          {line}
        </p>,
      )
      index += 1
      continue
    }

    if (/^-\s+/.test(line)) {
      const items: ReactNode[] = []
      const listKey = index

      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        const item = lines[index].trim().replace(/^-\s+/, "")
        items.push(
          <li key={index} className="pl-1">
            {renderInlineText(item)}
          </li>,
        )
        index += 1
      }

      blocks.push(
        <ul
          className="mt-4 mb-6 list-disc space-y-2 pl-5 font-body text-base leading-relaxed text-muted marker:text-accent"
          key={listKey}
        >
          {items}
        </ul>,
      )
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: ReactNode[] = []
      const listKey = index

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        const item = lines[index].trim().replace(/^\d+\.\s+/, "")
        items.push(
          <li key={index} className="pl-1">
            {renderInlineText(item)}
          </li>,
        )
        index += 1
      }

      blocks.push(
        <ol
          className="mt-4 mb-6 list-decimal space-y-2 pl-5 font-body text-base leading-relaxed text-muted marker:text-accent"
          key={listKey}
        >
          {items}
        </ol>,
      )
      continue
    }

    const paragraphLines = [line]
    const paragraphKey = index
    index += 1

    while (index < lines.length) {
      const nextLine = lines[index].trim()

      if (
        !nextLine ||
        /^(#{1,3})\s+/.test(nextLine) ||
        /^-\s+/.test(nextLine) ||
        /^\d+\.\s+/.test(nextLine)
      ) {
        break
      }

      paragraphLines.push(nextLine)
      index += 1
    }

    blocks.push(
      <p
        className="mt-4 font-body text-base leading-relaxed text-muted"
        key={paragraphKey}
      >
        {renderInlineText(paragraphLines.join(" "))}
      </p>,
    )
  }

  return blocks
}

export default function DocumentPage({
  content,
  pathname,
  brandHref = "/",
}: DocumentPageProps) {
  const { t, messages, localizeHref } = useI18n()

  return (
    <div className="min-h-full bg-ink text-cream">
      <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-hair bg-ink/95 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <a
            href={localizeHref(brandHref)}
            className="font-label text-sm font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:text-accent"
          >
            {t("brand")}
          </a>
        </div>

        <nav
          className="flex items-center gap-1 overflow-x-auto sm:justify-end"
          aria-label={t("docs.navLabel")}
        >
          {messages.docs.nav.map((link) => {
            const isActive = pathname === link.to
            return (
              <a
                className={`shrink-0 px-3 py-2 font-label text-xs uppercase tracking-[0.12em] transition-colors sm:text-sm ${
                  isActive
                    ? "bg-accent text-cream"
                    : "text-muted hover:bg-hair hover:text-cream"
                }`}
                href={localizeHref(link.to)}
                key={link.to}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[920px] px-5 py-10 sm:px-8 sm:py-14">
        <article className="border border-hair bg-panel px-5 py-8 sm:px-10 sm:py-12">
          {renderDocument(content)}
        </article>

        <footer className="mt-8 flex flex-col gap-3 font-body text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>{t("docs.copyright")}</span>
          <address className="max-w-md font-normal not-italic sm:text-center">
            {t("footer.address")}
          </address>
          <a
            href={localizeHref("/")}
            className="text-cream underline-offset-4 hover:underline"
          >
            {t("docs.back")}
          </a>
          <button
            type="button"
            onClick={() => window.openCookieSettings()}
            className="cursor-pointer border-0 bg-transparent p-0 text-left text-cream underline-offset-4 hover:underline"
          >
            {t("footer.cookieSettings")}
          </button>
        </footer>
      </main>
    </div>
  )
}
