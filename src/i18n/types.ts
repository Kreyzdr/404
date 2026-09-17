export type Locale = "en" | "de" | "es" | "ru" | "zh";

export const LOCALES: readonly Locale[] = ["en", "de", "es", "ru", "zh"];

export const DEFAULT_LOCALE: Locale = "en";

export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  de: "de",
  es: "es",
  ru: "ru",
  zh: "zh-CN",
};

/** Open Graph locale codes, which use a region suffix `HTML_LANG` does not. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  ru: "ru_RU",
  zh: "zh_CN",
};

export type DeepString<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends readonly string[]
      ? readonly string[]
      : T[K] extends readonly (infer U)[]
        ? readonly DeepString<U>[]
        : T[K] extends object
          ? DeepString<T[K]>
          : T[K];
};
