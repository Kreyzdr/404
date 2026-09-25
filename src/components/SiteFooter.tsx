import { useI18n } from "@/i18n"
import { LANDING_FOOTER_ID } from "@/lib/landingReturn"
import { STUDIO_URL } from "@/lib/site"

interface SiteFooterProps {
  onOpenContact: () => void
}

const linkClass =
  "text-sm font-medium uppercase tracking-wide text-cream/80 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"

const columnClass = "flex flex-col gap-2"

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="font-label text-xs uppercase tracking-[0.18em] text-muted">
      {children}
    </h2>
  )
}

export default function SiteFooter({ onOpenContact }: SiteFooterProps) {
  const { t, messages, localizeHref } = useI18n()
  const { main, legal, studio } = messages.footer

  return (
    <footer
      id={LANDING_FOOTER_ID}
      className="border-t border-hair bg-ink px-6 py-16 text-cream sm:px-10 md:py-24"
    >
      {/* The landing typography is English-only vector artwork, so the language
          switch stays out of the footer; the other locales remain reachable by
          their URL prefix. */}
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-10">
          <nav
            aria-label={t("footer.legalLabel")}
            className="grid gap-8 sm:grid-cols-3"
          >
            <div className={columnClass}>
              <ColumnHeading>{t("footer.headings.explore")}</ColumnHeading>
              {main.map((item) => (
                <a
                  key={item.href}
                  href={localizeHref(item.href)}
                  className={linkClass}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className={columnClass}>
              <ColumnHeading>{t("footer.headings.legal")}</ColumnHeading>
              {legal.map((item) => (
                <a
                  key={item.href}
                  href={localizeHref(item.href)}
                  className={linkClass}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => window.openCookieSettings()}
                className={`${linkClass} text-left`}
              >
                {t("footer.cookieSettings")}
              </button>
            </div>

            <div className={columnClass}>
              <ColumnHeading>{t("footer.headings.studio")}</ColumnHeading>
              {studio.map((item) => (
                <a
                  key={item.label}
                  href={STUDIO_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={onOpenContact}
                className={`${linkClass} text-left`}
              >
                {t("footer.contact")}
              </button>
            </div>
          </nav>
        </div>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-cream/55 md:max-w-xs md:text-right">
          <a
            href={STUDIO_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold uppercase tracking-wide text-cream/80 transition-colors hover:text-accent"
          >
            {t("footer.copyright")}
          </a>
          <address className="not-italic whitespace-pre-line">
            {t("footer.address")}
          </address>
        </div>
      </div>
    </footer>
  )
}
