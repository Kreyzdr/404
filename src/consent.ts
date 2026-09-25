import { localizeHref, readLocaleFromLocation } from "./i18n/localePath"
import type { Locale } from "./i18n/types"

const CONSENT_COOKIE = "epilogic_consent"
const PIXEL_ID = "2225771411320162"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 183
const GEO_URL = "https://get.geojs.io/v1/ip/country.json"
const STRICT_COUNTRIES = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "GB",
])

type Consent = {
  necessary: true
  marketing: boolean
}

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  push: Fbq
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
    track: (name: string, params?: Record<string, unknown>, custom?: boolean) => void
    openCookieSettings: () => void
  }
}

function sharedDomain(): string {
  const host = location.hostname
  if (host === "epilogic.studio" || host.endsWith(".epilogic.studio")) {
    return "; Domain=.epilogic.studio"
  }
  return ""
}

function secureFlag(): string {
  return location.protocol === "https:" ? "; Secure" : ""
}

function getConsent(): Consent | null {
  const match = document.cookie.match(/(?:^|; )epilogic_consent=([^;]+)/)
  if (!match) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as Partial<Consent>
    if (typeof parsed.marketing !== "boolean") return null
    return { necessary: true, marketing: parsed.marketing }
  } catch {
    return null
  }
}

function setConsent(consent: Consent) {
  const value = encodeURIComponent(JSON.stringify(consent))
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/${sharedDomain()}; SameSite=Lax${secureFlag()}`
}

function clearMetaCookies() {
  for (const name of ["_fbp", "_fbc"]) {
    document.cookie = `${name}=; Max-Age=0; Path=/`
    document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.epilogic.studio`
  }
}

function loadMetaPixel() {
  if (window.fbq) return
  const loader = (f: Window, b: Document, e: string, v: string) => {
    if (f.fbq) return
    const n = function (this: Fbq, ...args: unknown[]) {
      if (n.callMethod) n.callMethod.apply(n, args)
      else n.queue.push(args)
    } as Fbq
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = "2.0"
    n.queue = []
    f.fbq = n
    const t = b.createElement(e) as HTMLScriptElement
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    s.parentNode?.insertBefore(t, s)
  }
  loader(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js")
  const fbq = window.fbq as ((...args: unknown[]) => void) | undefined
  if (!fbq) return
  fbq("init", PIXEL_ID)
  fbq("track", "PageView")
}

function applyConsent(consent: Consent | null) {
  if (consent?.marketing) {
    loadMetaPixel()
    return
  }
  if (window.fbq) {
    clearMetaCookies()
    location.reload()
  }
}

let strictRegion = true

function marketingAllowed(): boolean {
  const consent = getConsent()
  if (consent) return consent.marketing
  return !strictRegion
}

window.track = (name, params = {}, custom = false) => {
  const fbq = window.fbq as ((...args: unknown[]) => void) | undefined
  if (!marketingAllowed() || !fbq) return
  fbq(custom ? "trackCustom" : "track", name, params)
}

function regionOverride(): boolean | null {
  const value = new URLSearchParams(location.search).get("consentRegion")
  if (value === "eu") return true
  if (value === "other") return false
  return null
}

async function isStrictRegion(): Promise<boolean> {
  const override = regionOverride()
  if (override !== null) return override
  try {
    const response = await fetch(GEO_URL)
    if (!response.ok) return true
    const data = (await response.json()) as { country?: string }
    const code = data.country?.toUpperCase()
    if (!code) return true
    return STRICT_COUNTRIES.has(code)
  } catch {
    return true
  }
}

const BANNER_COPY: Record<
  Locale,
  {
    title: string
    body: string
    privacy: string
    reject: string
    accept: string
    settings: string
    close: string
    settingsTitle: string
    necessary: string
    necessaryDesc: string
    marketing: string
    marketingDesc: string
    save: string
  }
> = {
  en: {
    title: "Cookies & Privacy",
    body: "We use cookies to improve your experience and for marketing purposes. You can change your settings at any time.",
    privacy: "Privacy policy",
    reject: "Reject all",
    accept: "Accept all",
    settings: "Settings",
    close: "Close",
    settingsTitle: "Cookie settings",
    necessary: "Necessary",
    necessaryDesc: "Required for the site to work. Always on.",
    marketing: "Marketing",
    marketingDesc: "Used for advertising and to measure how well it works (Meta Pixel).",
    save: "Save choices",
  },
  de: {
    title: "Cookies & Datenschutz",
    body: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und für Marketingzwecke. Sie können Ihre Einstellungen jederzeit ändern.",
    privacy: "Datenschutz",
    reject: "Alle ablehnen",
    accept: "Alle akzeptieren",
    settings: "Einstellungen",
    close: "Schließen",
    settingsTitle: "Cookie-Einstellungen",
    necessary: "Notwendige",
    necessaryDesc: "Erforderlich, damit die Website funktioniert. Immer aktiv.",
    marketing: "Marketing",
    marketingDesc: "Für Werbung und um zu messen, wie gut sie funktioniert (Meta Pixel).",
    save: "Auswahl speichern",
  },
  es: {
    title: "Cookies y privacidad",
    body: "Usamos cookies para mejorar su experiencia y con fines de marketing. Puede cambiar la configuración en cualquier momento.",
    privacy: "Política de privacidad",
    reject: "Rechazar todo",
    accept: "Aceptar todo",
    settings: "Ajustes",
    close: "Cerrar",
    settingsTitle: "Configuración de cookies",
    necessary: "Necesarias",
    necessaryDesc: "Necesarias para que el sitio funcione. Siempre activas.",
    marketing: "Marketing",
    marketingDesc: "Se usan para publicidad y para medir su rendimiento (Meta Pixel).",
    save: "Guardar selección",
  },
  ru: {
    title: "Cookies и конфиденциальность",
    body: "Мы используем cookies, чтобы улучшать ваш опыт и в маркетинговых целях. Вы можете изменить настройки в любой момент.",
    privacy: "Политика конфиденциальности",
    reject: "Отклонить все",
    accept: "Принять все",
    settings: "Настройки",
    close: "Закрыть",
    settingsTitle: "Настройки cookies",
    necessary: "Необходимые",
    necessaryDesc: "Нужны для работы сайта. Всегда включены.",
    marketing: "Маркетинг",
    marketingDesc: "Используются для рекламы и оценки её эффективности (Meta Pixel).",
    save: "Сохранить выбор",
  },
  zh: {
    title: "Cookie 与隐私",
    body: "我们使用 Cookie 来改善您的体验并用于营销。您可以随时更改设置。",
    privacy: "隐私政策",
    reject: "全部拒绝",
    accept: "全部接受",
    settings: "设置",
    close: "关闭",
    settingsTitle: "Cookie 设置",
    necessary: "必要",
    necessaryDesc: "网站运行所必需。始终开启。",
    marketing: "营销",
    marketingDesc: "用于广告并衡量其效果（Meta Pixel）。",
    save: "保存选择",
  },
}

function localeFromLang(lang: string): Locale | null {
  if (lang === "zh-CN" || lang.startsWith("zh")) return "zh"
  if (lang === "ru" || lang === "de" || lang === "es" || lang === "en") return lang
  return null
}

function currentLocale(): Locale {
  const fromLang = localeFromLang(document.documentElement.lang)
  if (fromLang && fromLang !== "en") return fromLang
  return readLocaleFromLocation()
}

function privacyHref(): string {
  const path = localizeHref("/privacy-policy#cookie-policy", currentLocale())
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  return `${base}${path}`.replace(/([^:]\/)\/+/g, "$1")
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  node.className = className
  if (text) node.textContent = text
  return node
}

let root: HTMLElement | null = null
let layer: "notice" | "settings" | null = null

function hideBanner() {
  layer = null
  root?.remove()
  root = null
}

function saveAndApply(marketing: boolean) {
  const consent: Consent = { necessary: true, marketing }
  setConsent(consent)
  if (!marketing && !window.fbq) {
    hideBanner()
    return
  }
  applyConsent(consent)
  if (!marketing) return
  hideBanner()
}

function appendClose(label: string) {
  const close = el("button", "cookie-banner__close", "×")
  close.type = "button"
  close.setAttribute("aria-label", label)
  close.addEventListener("click", hideBanner)
  root?.append(close)
}

function render(next: "notice" | "settings") {
  layer = next
  const copy = BANNER_COPY[currentLocale()]
  if (!root) {
    root = el("div", "cookie-banner")
    root.setAttribute("role", "dialog")
    document.body.appendChild(root)
  }
  root.classList.toggle("cookie-banner--settings", next === "settings")
  root.classList.toggle("cookie-banner--relaxed", !strictRegion)
  root.setAttribute("aria-label", next === "settings" ? copy.settingsTitle : copy.title)
  root.replaceChildren()
  appendClose(copy.close)

  if (next === "notice") {
    const main = el("div", "cookie-banner__main")
    const text = el("div", "cookie-banner__text")
    text.append(el("p", "cookie-banner__title", copy.title))
    text.append(el("p", "cookie-banner__copy", copy.body))
    const privacy = el("a", "cookie-banner__link", copy.privacy)
    privacy.href = privacyHref()
    text.append(privacy)

    const actions = el("div", "cookie-banner__actions")
    const reject = el("button", "cookie-banner__btn", copy.reject)
    reject.type = "button"
    reject.addEventListener("click", () => saveAndApply(false))
    const accept = el("button", "cookie-banner__btn", copy.accept)
    accept.type = "button"
    accept.addEventListener("click", () => saveAndApply(true))
    const settings = el("button", "cookie-banner__text-btn", copy.settings)
    settings.type = "button"
    settings.addEventListener("click", () => render("settings"))
    actions.append(reject, accept, settings)
    main.append(text, actions)
    root.append(main)
    return
  }

  root.append(el("p", "cookie-banner__title", copy.settingsTitle))

  const necessary = el("label", "cookie-banner__row")
  const necessaryInput = document.createElement("input")
  necessaryInput.type = "checkbox"
  necessaryInput.checked = true
  necessaryInput.disabled = true
  necessary.append(necessaryInput, el("span", "cookie-banner__row-copy"))
  const necessaryCopy = necessary.querySelector("span")!
  necessaryCopy.append(el("span", "cookie-banner__row-name", copy.necessary))
  necessaryCopy.append(el("span", "cookie-banner__row-desc", copy.necessaryDesc))
  root.append(necessary)

  const marketing = el("label", "cookie-banner__row")
  const marketingInput = document.createElement("input")
  marketingInput.type = "checkbox"
  marketingInput.checked = getConsent()?.marketing ?? !strictRegion
  marketing.append(marketingInput, el("span", "cookie-banner__row-copy"))
  const marketingCopy = marketing.querySelector("span")!
  marketingCopy.append(el("span", "cookie-banner__row-name", copy.marketing))
  marketingCopy.append(el("span", "cookie-banner__row-desc", copy.marketingDesc))
  root.append(marketing)

  const actions = el("div", "cookie-banner__actions")
  const save = el("button", "cookie-banner__btn", copy.save)
  save.type = "button"
  save.addEventListener("click", () => saveAndApply(marketingInput.checked))
  const accept = el("button", "cookie-banner__btn", copy.accept)
  accept.type = "button"
  accept.addEventListener("click", () => saveAndApply(true))
  actions.append(save, accept)
  root.append(actions)
}

window.openCookieSettings = () => render("settings")

new MutationObserver(() => {
  if (root && layer) render(layer)
}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] })

const existing = getConsent()
if (existing) {
  applyConsent(existing)
} else {
  void isStrictRegion().then((strict) => {
    strictRegion = strict
    if (!strict) loadMetaPixel()
    render("notice")
  })
}
