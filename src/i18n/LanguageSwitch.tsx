import { localizeHref as prefixHref } from "./localePath";
import { LOCALES } from "./types";
import { useI18n } from "./LocaleContext";

export function LanguageSwitch({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      className={`flex shrink-0 flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted ${className}`}
    >
      {LOCALES.map((code, index) => (
        <span key={code} className="inline-flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="text-muted/40">
              /
            </span>
          )}
          <a
            href={prefixHref("/", code)}
            aria-current={locale === code ? "true" : undefined}
            onClick={(event) => {
              if (
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }
              event.preventDefault();
              setLocale(code);
            }}
            className={`py-1 transition-colors duration-200 ${
              locale === code ? "text-cream" : "hover:text-cream"
            }`}
          >
            {code}
          </a>
        </span>
      ))}
    </div>
  );
}
