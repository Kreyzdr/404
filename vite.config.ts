import fs from "node:fs"
import { defineConfig, type HtmlTagDescriptor, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

import siteConfiguration from "./.figma/make/site.json" with { type: "json" }
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  OG_LOCALE,
  type DeepString,
  type Locale,
} from "./src/i18n/types.ts"
import { de } from "./src/i18n/de/ui.ts"
import { en } from "./src/i18n/en/ui.ts"
import { es } from "./src/i18n/es/ui.ts"
import { ru } from "./src/i18n/ru/ui.ts"
import { zh } from "./src/i18n/zh/ui.ts"
type LandingMessages = DeepString<typeof en>

const SITE_ORIGIN = "https://developer-not-found-404.epilogic.studio"

/** Routes a visitor can land on directly and that belong in the sitemap. */
const INDEXABLE_ROUTES = ["terms", "privacy-policy", "refund-policy"]

/** Reached only by redirect from the payment provider, so kept out of the sitemap. */
const PAYMENT_ROUTES = ["payment-success", "payment-error"]

const SPA_ROUTES = [...INDEXABLE_ROUTES, ...PAYMENT_ROUTES]

/** Absolute URL for a route under a locale. The default locale stays unprefixed. */
function routeUrl(lang: string, route: string): string {
  const prefix = lang === DEFAULT_LOCALE ? "" : `/${lang}`
  const path = `${prefix}${route ? `/${route}` : ""}`
  return `${SITE_ORIGIN}${path || "/"}`
}

const CATALOGS: Record<Locale, LandingMessages> = { en, de, es, ru, zh }

/** The document title each route carries, mirroring `TITLE_PATHS` at runtime. */
const ROUTE_TITLES: Record<string, (messages: LandingMessages) => string> = {
  "": (m) => m.meta.landingTitle,
  terms: (m) => m.meta.termsTitle,
  "privacy-policy": (m) => m.meta.privacyTitle,
  "refund-policy": (m) => m.meta.refundTitle,
  "payment-success": (m) => m.meta.paymentSuccessTitle,
  "payment-error": (m) => m.meta.paymentErrorTitle,
}

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
}

/** Rewrites the `content` of a meta tag already present in the shell. */
function setMetaContent(
  html: string,
  selector: string,
  content: string,
): string {
  const pattern = new RegExp(`(<meta[^>]*${selector}[^>]*content=")[^"]*`)
  return html.replace(pattern, `$1${escapeAttribute(content)}`)
}

/**
 * Share previews and crawlers read the document that was served, and this app
 * localizes its tags only after the bundle runs. So every prebuilt shell is
 * rewritten for the locale and the route it is served from.
 */
function localizeShell(html: string, lang: Locale, route: string): string {
  const messages = CATALOGS[lang]
  const title = (ROUTE_TITLES[route] ?? ROUTE_TITLES[""])!(messages)
  const description = messages.meta.landingDescription
  const url = routeUrl(lang, route)

  let result = html.replace(
    /<html lang="[^"]*"/,
    `<html lang="${HTML_LANG[lang]}"`,
  )
  result = result.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttribute(title)}</title>`,
  )
  result = result.replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
  result = setMetaContent(result, 'name="description"', description)
  result = setMetaContent(result, 'property="og:title"', title)
  result = setMetaContent(result, 'property="og:description"', description)
  result = setMetaContent(result, 'property="og:locale"', OG_LOCALE[lang])
  result = setMetaContent(result, 'property="og:url"', url)
  result = setMetaContent(result, 'name="twitter:title"', title)
  result = setMetaContent(result, 'name="twitter:description"', description)

  return result
}

/**
 * The app is a client-routed SPA, so every deep route needs its own
 * `index.html` to survive a hard refresh. The same route list also drives the
 * sitemap and robots.txt, which keeps them from drifting out of sync.
 */
function emitStaticRoutes(): Plugin {
  return {
    name: "emit-static-routes",
    writeBundle: {
      sequential: true,
      order: "post",
      handler() {
        const dist = path.resolve(import.meta.dirname, "dist")
        const index = path.join(dist, "index.html")
        if (!fs.existsSync(index)) return
        const html = fs.readFileSync(index, "utf8")

        const write = (dir: string, lang: Locale, route: string) => {
          fs.mkdirSync(dir, { recursive: true })
          fs.writeFileSync(
            path.join(dir, "index.html"),
            localizeShell(html, lang, route),
          )
        }

        fs.writeFileSync(index, localizeShell(html, DEFAULT_LOCALE, ""))
        for (const route of SPA_ROUTES) {
          write(path.join(dist, route), DEFAULT_LOCALE, route)
        }

        for (const lang of LOCALES) {
          write(path.join(dist, lang), lang, "")
          for (const route of SPA_ROUTES) {
            write(path.join(dist, lang, route), lang, route)
          }
        }

        // Every locale of a route is an alternate of every other, so each entry
        // carries the full hreflang set plus the default locale as x-default.
        const entries = ["", ...INDEXABLE_ROUTES].flatMap((route) =>
          LOCALES.map((lang) => {
            const alternates = LOCALES.map(
              (alt) =>
                `    <xhtml:link rel="alternate" hreflang="${alt}" href="${routeUrl(alt, route)}"/>`,
            ).join("\n")

            return [
              "  <url>",
              `    <loc>${routeUrl(lang, route)}</loc>`,
              alternates,
              `    <xhtml:link rel="alternate" hreflang="x-default" href="${routeUrl("en", route)}"/>`,
              `    <priority>${route ? "0.5" : "1.0"}</priority>`,
              "  </url>",
            ].join("\n")
          }),
        )

        fs.writeFileSync(
          path.join(dist, "sitemap.xml"),
          [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
            ...entries,
            "</urlset>",
            "",
          ].join("\n"),
        )

        fs.writeFileSync(
          path.join(dist, "robots.txt"),
          [
            "User-agent: *",
            "Allow: /",
            ...PAYMENT_ROUTES.map((route) => `Disallow: /${route}`),
            "",
            `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
            "",
          ].join("\n"),
        )
      },
    },
  }
}

// Vite config — https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // .figma/make/deploy-preview passes `--mode development` for cached-preview builds.
  const emitSourcemaps = mode === "development"

  return {
    appType: "spa",
    base: process.env.FIGMA_PUBLIC_URL
      ? `${process.env.FIGMA_PUBLIC_URL}/`
      : "/",
    build: {
      sourcemap: emitSourcemaps ? "inline" : false,
      minify: !emitSourcemaps,
    },
    plugins: [
      react(),
      tailwindcss(),
      emitStaticRoutes(),
      figmaSiteConfiguration(siteConfiguration),
      figmaErrorOverlayReplay(),
      figmaReactRefreshBoundaryFallback(),
      figmaMakeKitPlugin({ storiesGlob: "/src/**/*.stories.{ts,tsx,js,jsx}" }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
    server: {
      host: process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
      strictPort: true,
      watch: { ignored: ["**/.figma/**"] },
      proxy: {
        "/api": {
          target: "https://epilogic.studio",
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: process.env.FIGMA_DEV_SERVER_HOST || "0.0.0.0",
      port: parseInt(process.env.PORT || "8443"),
    },
  }
})

type FigmaSiteConfiguration = {
  title?: string
  description?: string
  language?: string
  robots?: {
    index?: boolean
  }
  icons?: {
    icon?: string
  }
  openGraph?: {
    image?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  customScripts?: {
    headStart?: string
    headEnd?: string
    bodyStart?: string
    bodyEnd?: string
  }
  accessibility?: {
    addBypassLinks?: boolean
  }
}

/** Applies /.figma/make/site.json to the generated document shell. */
function figmaSiteConfiguration(config: FigmaSiteConfiguration): Plugin {
  function sanitizeHtmlValue(value: string | undefined): string {
    return value?.replace(/[^a-zA-Z0-9_-]/g, "") || ""
  }
  function escapeHtmlText(value: string): string {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }
  function replaceHtmlCommentSlot(
    html: string,
    slotName: string,
    content: string,
  ): string {
    return html.replace(`<!-- ${slotName} -->`, content)
  }

  const title = config.title ?? "Figma Make App"
  const description = config.description ?? ""
  const favicon = config.icons?.icon ?? ""
  const socialImage = config.openGraph?.image ?? ""
  const language = sanitizeHtmlValue(config.language) || "en"
  const googleAnalyticsId = sanitizeHtmlValue(
    config.analytics?.googleAnalyticsId,
  )
  const headStart = config.customScripts?.headStart ?? ""
  const headEnd = config.customScripts?.headEnd ?? ""
  const bodyStart = config.customScripts?.bodyStart ?? ""
  const bodyEnd = config.customScripts?.bodyEnd ?? ""
  const robotsTxt =
    config.robots?.index === false ? "User-agent: *\nDisallow: /\n" : ""

  return {
    name: "figma-site-configuration",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!robotsTxt || req.url?.split("?")[0] !== "/robots.txt")
          return next()

        res.setHeader("Content-Type", "text/plain; charset=utf-8")
        res.end(robotsTxt)
      })
    },
    generateBundle() {
      if (!robotsTxt) return

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: robotsTxt,
      })
    },
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        let result = html
        result = replaceHtmlCommentSlot(result, "figma:lang", language)
        result = replaceHtmlCommentSlot(
          result,
          "figma:title",
          escapeHtmlText(title),
        )
        result = replaceHtmlCommentSlot(result, "figma:head-start", headStart)
        result = replaceHtmlCommentSlot(result, "figma:head-end", headEnd)
        result = replaceHtmlCommentSlot(result, "figma:body-start", bodyStart)
        result = replaceHtmlCommentSlot(result, "figma:body-end", bodyEnd)

        const tags: HtmlTagDescriptor[] = []
        if (description) {
          tags.push({
            tag: "meta",
            attrs: { name: "description", content: description },
            injectTo: "head",
          })
        }
        if (config.robots?.index === false) {
          tags.push({
            tag: "meta",
            attrs: { name: "robots", content: "noindex, nofollow" },
            injectTo: "head",
          })
        }
        if (favicon) {
          tags.push({
            tag: "link",
            attrs: { rel: "icon", href: favicon },
            injectTo: "head",
          })
        }
        if (title) {
          tags.push({
            tag: "meta",
            attrs: { property: "og:title", content: title },
            injectTo: "head",
          })
        }
        if (description) {
          tags.push({
            tag: "meta",
            attrs: { property: "og:description", content: description },
            injectTo: "head",
          })
        }
        // The shell declares its own share card, so a configured social image
        // is only injected when the document does not already carry one.
        if (socialImage && !result.includes('property="og:image"')) {
          tags.push(
            {
              tag: "meta",
              attrs: { property: "og:image", content: socialImage },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "twitter:card", content: "summary_large_image" },
              injectTo: "head",
            },
            {
              tag: "meta",
              attrs: { name: "twitter:image", content: socialImage },
              injectTo: "head",
            },
          )
        }

        if (googleAnalyticsId) {
          tags.push(
            {
              tag: "script",
              attrs: {
                async: true,
                src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
              },
              injectTo: "head",
            },
            {
              tag: "script",
              children: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', ${JSON.stringify(googleAnalyticsId)});
`,
              injectTo: "head",
            },
          )
        }

        if (config.accessibility?.addBypassLinks) {
          tags.push(
            {
              tag: "style",
              children: `
  .figma-bypass-link {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 2147483647;
    transform: translateY(-150%);
    border-radius: 6px;
    background: #111827;
    color: #fff;
    padding: 8px 12px;
    font: 600 14px/1.2 system-ui, sans-serif;
    text-decoration: none;
  }
  .figma-bypass-link:focus {
    transform: translateY(0);
  }
`,
              injectTo: "head",
            },
            {
              tag: "a",
              attrs: { class: "figma-bypass-link", href: "#root" },
              children: "Skip to content",
              injectTo: "body-prepend",
            },
          )
        }

        return {
          html: result,
          tags,
        }
      },
    },
  }
}

/**
 * Replay the most recent build error to clients that connect after
 * it was first broadcast. Vite buffers an error payload only while
 * no clients are connected and clears the buffer on the first
 * reconnect (see `bufferedMessage` in `createWebSocketServer`), so
 * if the preview iframe reloads after Vite already delivered an
 * error to a live socket, the new socket misses the payload and
 * the overlay stays hidden even though the build is still broken.
 * We intercept `ws.send` to remember the latest error and replay
 * it on every new connection; the cache clears on a successful
 * `update` or `full-reload` so a stale overlay can't survive a
 * fixed build.
 */
function figmaErrorOverlayReplay(): Plugin {
  return {
    name: "figma-error-overlay-replay",
    apply: "serve",
    configureServer(server) {
      let lastError: object | null = null

      const origSend = server.ws.send.bind(server.ws) as (
        ...args: any[]
      ) => void
      server.ws.send = (((...args: any[]) => {
        const payload = args[0]
        if (payload && typeof payload === "object" && !Array.isArray(payload)) {
          const type = (payload as { type?: string }).type
          if (type === "error") {
            lastError = (payload as object)
          } else if (type === "update" || type === "full-reload") {
            lastError = null
          }
        }
        return origSend(...args)
      }) as typeof server.ws.send)

      server.ws.on("connection", (socket) => {
        if (lastError !== null) {
          socket.send(JSON.stringify(lastError))
        }
      })
    },
  }
}

/**
 * Reload when a module that previously defined a React Refresh boundary stops
 * defining one. This happens when an agent moves a component into a new file
 * and replaces the old module with a re-export:
 *
 *   export { default } from './app/App'
 *
 * Vite otherwise accepts the update using the previous module's HMR boundary,
 * but the re-export-only transform no longer registers a replacement for the
 * mounted component family. React reports a successful refresh while leaving
 * the old tree mounted until the page is reloaded.
 */
function figmaReactRefreshBoundaryFallback(): Plugin {
  const hadRefreshBoundary = new Map<string, boolean>()
  let sendFullReload: (() => void) | null = null

  return {
    name: "figma-react-refresh-boundary-fallback",
    apply: "serve",
    enforce: "post",
    configureServer(server) {
      sendFullReload = () => server.ws.send({ type: "full-reload", path: "*" })
    },
    transform(code, id) {
      if (!/\.[jt]sx?(?:\?|$)/.test(id) || id.includes("/node_modules/"))
        return null

      const moduleId = id.split("?")[0] ?? id
      const hasRefreshBoundary = code.includes("registerExportsForReactRefresh")
      const previousHadRefreshBoundary = hadRefreshBoundary.get(moduleId)
      hadRefreshBoundary.set(moduleId, hasRefreshBoundary)

      if (previousHadRefreshBoundary && !hasRefreshBoundary) {
        queueMicrotask(() => sendFullReload?.())
      }

      return null
    },
  }
}

/**
 * Serves a blank render-target page at /.figma/make/kit.html that
 * the Figma preview script drives directly. The page exposes a
 * registry of every file matching `storiesGlob` on
 * window.__FIGMA__.stories so the design surface can dynamically
 * import + mount each entry into its own grid view.
 *
 * Dev-only: `apply: 'serve'` gates the plugin to `vite dev`. Prod
 * builds (`vite build`) skip it entirely so the route doesn't leak
 * into shipped bundles.
 */
function figmaMakeKitPlugin(options: {
  storiesGlob: string | string[]
}): Plugin {
  const storiesGlob = Array.isArray(options.storiesGlob)
    ? options.storiesGlob
    : [options.storiesGlob]
  const ROUTE = "/.figma/make/kit.html"
  const VIRTUAL_ID = "virtual:figma-stories"
  const RESOLVED_ID = "\0" + VIRTUAL_ID
  const STORIES_MODULE = `export const stories = import.meta.glob(${JSON.stringify(storiesGlob)})`
  const HTML_BOOTSTRAP = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
<div id="figma-make-kit-root"></div>
<script type="module">
  import { stories } from 'virtual:figma-stories'
  window.__FIGMA__ = Object.assign(window.__FIGMA__ ?? {}, { stories })
  window.dispatchEvent(new CustomEvent('figma.ready'))
</script>
</body>
</html>`

  return {
    name: "figma-make-kit",
    apply: "serve",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
      return null
    },
    load(id) {
      if (id !== RESOLVED_ID) return null
      return STORIES_MODULE
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ""
        if (url.split("?")[0] !== ROUTE) return next()

        try {
          res.setHeader("Content-Type", "text/html")
          res.end(await server.transformIndexHtml(url, HTML_BOOTSTRAP))
        } catch (err) {
          next(err as Error)
        }
      })
    },
  }
}
