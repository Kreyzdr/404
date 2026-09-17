import { DEFAULT_LOCALE, LOCALES, type Locale } from "./types";

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value));
}

function relativePathname(pathname = window.location.pathname): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  if (base && pathname.startsWith(base)) {
    const sliced = pathname.slice(base.length);
    return sliced.startsWith("/") ? sliced : `/${sliced}`;
  }
  return pathname;
}

export function stripLocalePrefix(pathname: string): {
  locale: Locale | null;
  pathname: string;
} {
  const clean =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname || "/";
  const parts = clean.split("/").filter(Boolean);
  const first = parts[0];

  if (isLocale(first)) {
    const rest = parts.slice(1).join("/");
    return { locale: first, pathname: rest ? `/${rest}` : "/" };
  }

  return { locale: null, pathname: clean || "/" };
}

export function withLocalePrefix(pathname: string, locale: Locale): string {
  const { pathname: bare } = stripLocalePrefix(pathname);
  const path = bare === "/" ? "" : bare;
  return locale === DEFAULT_LOCALE ? path || "/" : `/${locale}${path}`;
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const searchIndex = withoutHash.indexOf("?");
  const search = searchIndex >= 0 ? withoutHash.slice(searchIndex) : "";
  const path = searchIndex >= 0 ? withoutHash.slice(0, searchIndex) : withoutHash;

  return `${withLocalePrefix(path || "/", locale)}${search}${hash}`;
}

export function readPathLocale(): Locale | null {
  return stripLocalePrefix(relativePathname()).locale;
}

export function readQueryLocale(): Locale | null {
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  return isLocale(fromQuery) ? fromQuery : null;
}

export function readLocaleFromLocation(): Locale {
  return readPathLocale() ?? readQueryLocale() ?? DEFAULT_LOCALE;
}

export function buildLocaleUrl(locale: Locale): string {
  const url = new URL(window.location.href);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const { pathname: bare } = stripLocalePrefix(relativePathname(url.pathname));
  const prefixed = withLocalePrefix(bare, locale);
  url.pathname = `${base}${prefixed}`.replace(/\/{2,}/g, "/") || "/";
  url.searchParams.delete("lang");
  const search = url.searchParams.toString();
  return `${url.pathname}${search ? `?${search}` : ""}${url.hash}`;
}

export function writeLocaleToUrl(locale: Locale) {
  const next = buildLocaleUrl(locale);
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current) return;
  window.history.replaceState(window.history.state, "", next);
}
