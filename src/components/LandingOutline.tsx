import { useI18n } from "@/i18n"
import { landingOutline } from "@/lib/landingOutline"

// The visible landing is vector artwork, so this block is the page's text: it
// carries the transcribed copy of the current locale for crawlers and screen
// readers without touching the composition. Hidden with `sr-only`, so it stays
// in the document instead of being removed from it like `display: none` would.
export default function LandingOutline() {
  const { messages } = useI18n()
  const outline = landingOutline(messages)

  return (
    <div className="sr-only">
      <h1>{outline.heading}</h1>
      <p>{outline.tagline}</p>
      {outline.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items?.length ? (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  )
}
