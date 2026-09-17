import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { de } from "./de/ui";
import { en } from "./en/ui";
import { es } from "./es/ui";
import { ru } from "./ru/ui";
import { zh } from "./zh/ui";
import {
  localizeHref as prefixHref,
  readLocaleFromLocation,
  readPathLocale,
  readQueryLocale,
  writeLocaleToUrl,
} from "./localePath";
import { DEFAULT_LOCALE, HTML_LANG, OG_LOCALE, type DeepString, type Locale } from "./types";

export type Messages = DeepString<typeof en>;
export type TranslateVars = Record<string, string | number>;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  localizeHref: (href: string) => string;
  messages: Messages;
  t: (path: string, vars?: TranslateVars) => string;
};

const catalogs: Record<Locale, Messages> = { en, de, es, ru, zh };

const LocaleContext = createContext<LocaleContextValue | null>(null);

function lookup(messages: Messages, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages);
}

function interpolate(template: string, vars?: TranslateVars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : `{${name}}`,
  );
}

function applyDocumentMeta(locale: Locale, messages: Messages) {
  document.documentElement.lang = HTML_LANG[locale];
  document.documentElement.dataset.locale = locale;

  const description = messages.meta.landingDescription;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", description);

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute("content", description);

  const ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute("content", OG_LOCALE[locale]);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocaleFromLocation);

  useEffect(() => {
    applyDocumentMeta(locale, catalogs[locale]);
    if (readQueryLocale() || readPathLocale() === DEFAULT_LOCALE) {
      writeLocaleToUrl(locale);
    }
  }, [locale]);

  useEffect(() => {
    const onPopState = () => {
      setLocaleState(readLocaleFromLocation());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeLocaleToUrl(next);
  }, []);

  const localizeHref = useCallback(
    (href: string) => prefixHref(href, locale),
    [locale],
  );

  const messages = catalogs[locale];

  const t = useCallback(
    (path: string, vars?: TranslateVars) => {
      const value = lookup(messages, path);
      if (typeof value !== "string") return path;
      return interpolate(value, vars);
    },
    [messages],
  );

  const value = useMemo(
    () => ({ locale, setLocale, localizeHref, messages, t }),
    [locale, setLocale, localizeHref, messages, t],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useI18n must be used inside LocaleProvider");
  return ctx;
}
