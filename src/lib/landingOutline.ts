// Loaded by `vite.config.ts` as well as by the app, so the imports carry their
// file extensions for the native config loader.
import type { DeepString } from "../i18n/types.ts"

type En = typeof import("../i18n/en/ui.ts").en

/**
 * The landing headlines are vector artwork, so the copy transcribed into the
 * `page.*` catalogs is the only machine-readable version of the page. This
 * module turns that catalog into one document outline that both the rendered
 * screen-reader / crawler block and the static HTML shells emitted at build
 * time read from, so the two can never describe different pages.
 */
export type LandingMessages = DeepString<En>

export interface OutlineSection {
  heading: string
  paragraphs?: readonly string[]
  items?: readonly string[]
}

export interface LandingOutline {
  heading: string
  tagline: string
  sections: readonly OutlineSection[]
}

/** In the transcription, asterisks mark the words painted in the accent red. */
function plain(text: string): string {
  return text.replace(/\*/g, "")
}

export function landingOutline(messages: LandingMessages): LandingOutline {
  const page = messages.page

  return {
    heading: `${plain(page.heroKicker)} ${plain(page.heroTitle)}`,
    tagline: page.heroTagline,
    sections: [
      { heading: plain(page.challengeTitle), paragraphs: page.challengeBody },
      { heading: plain(page.bigTechTitle), paragraphs: page.bigTechBody },
      { heading: plain(page.missingTitle), paragraphs: [page.missingBody] },
      { heading: plain(page.investigateTitle), items: page.investigate },
      { heading: plain(page.notForYouTitle), items: page.notForYouItems },
      { heading: plain(page.charactersTitle), paragraphs: page.charactersBody },
      { heading: plain(page.questsTitle), items: page.questsItems },
      { heading: plain(page.immersionTitle), paragraphs: page.immersionBody },
      {
        heading: `${plain(page.pricingTitle)} ${plain(page.price)}`,
        items: page.pricingBenefits,
      },
      { heading: plain(page.faqTitle) },
    ],
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

/** Visually hidden the same way Tailwind's `sr-only` is, without a stylesheet. */
const HIDDEN_STYLE =
  "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0"

/**
 * The outline as a standalone HTML fragment for the prebuilt shells, so a
 * crawler that never runs the bundle still reads the whole page. `main.tsx`
 * drops the element before React renders its own copy.
 */
export function landingOutlineHtml(outline: LandingOutline): string {
  const parts = [
    `<h1>${escapeHtml(outline.heading)}</h1>`,
    `<p>${escapeHtml(outline.tagline)}</p>`,
  ]

  for (const section of outline.sections) {
    const sectionParts = [`<h2>${escapeHtml(section.heading)}</h2>`]
    for (const paragraph of section.paragraphs ?? []) {
      sectionParts.push(`<p>${escapeHtml(paragraph)}</p>`)
    }
    if (section.items?.length) {
      const items = section.items
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("")
      sectionParts.push(`<ul>${items}</ul>`)
    }
    parts.push(`<section>${sectionParts.join("")}</section>`)
  }

  return `<div id="seo-outline" style="${HIDDEN_STYLE}">${parts.join("")}</div>`
}
