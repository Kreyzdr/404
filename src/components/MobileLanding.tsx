import type { CSSProperties, ReactNode } from "react"
import FrameScaler from "@/components/FrameScaler"
import FaqChat from "@/components/FaqChat"
import Section10 from "@/components/Section10"

import Frame1 from "@/imports/1V2"
import Frame2 from "@/imports/2V2-1"
import Frame3 from "@/imports/3V2"
import Frame4 from "@/imports/4V2"
import Frame5 from "@/imports/5V2"
import Frame6 from "@/imports/6V2"
import Frame7 from "@/imports/7V2"
import Frame8 from "@/imports/8V2"
import Frame9 from "@/imports/9V2"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artFaq from "@/assets/artwork/mobile-faq.svg"

// The mobile / tablet composition: a full-bleed poster sequence of 390px-wide
// frames. Headlines are vector artwork served as images; their transcribed
// copy is the `alt`. Each frame scales with the column width and keeps its
// own height, so the page scrolls continuously.

// One coherent page system: a single content column shared by every section.
// v2 frames bake their own text gutters + full-frame-width imagery in, so the
// frame itself reaches the column edges (full-bleed on mobile).
function Section({
  children,
  label,
  id,
  className = "",
}: {
  children: ReactNode
  label: string
  id?: string
  className?: string
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={className + (id ? " scroll-mt-6" : "")}
    >
      <div className="mx-auto w-full max-w-[600px]">{children}</div>
    </section>
  )
}

// Interactive overlay placed over original SVG button artwork. The artwork is
// never modified — interaction states live on the container only.
function CtaOverlay({
  href,
  onClick,
  label,
  style,
}: {
  href?: string
  onClick?: () => void
  label: string
  style: CSSProperties
}) {
  const className = "group absolute block outline-none"
  const states = (
    <>
      <span className="absolute inset-0 bg-white opacity-0 transition-opacity duration-100 group-hover:opacity-10 group-active:opacity-20" />
      <span className="absolute inset-0 ring-[#fbf9f6] ring-offset-2 ring-offset-black group-focus-visible:ring-2" />
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={className}
        style={style}
      >
        {states}
      </button>
    )
  }

  return (
    <a href={href} aria-label={label} className={className} style={style}>
      {states}
    </a>
  )
}

// Shared button geometry (red rect) as % of each frame, matching the v2 source.
const CTA_LEFT = "10.77%"
const CTA_WIDTH = "78.46%"

function Screen({
  height,
  children,
  overlay,
}: {
  height: number
  children: ReactNode
  overlay?: ReactNode
}) {
  return (
    <div className="relative">
      <FrameScaler height={height}>{children}</FrameScaler>
      {overlay}
    </div>
  )
}

export default function MobileLanding({
  onOpenPaywall,
}: {
  onOpenPaywall: () => void
}) {
  const alts = useArtworkAlts()

  return (
    <>
      <div>
        {/* 1 — 404 hero */}
        <Section label="Not found">
          <Screen height={844}>
            <Frame1 />
          </Screen>
        </Section>

        {/* 2 — Finally, a challenge for your brain */}
        <Section id="story" label="A challenge for your brain">
          <Screen height={788}>
            <Frame2 />
          </Screen>
        </Section>

        {/* 3 — What if big tech is hiding something? */}
        <Section label="What if big tech is hiding something">
          <Screen height={790}>
            <Frame3 />
          </Screen>
        </Section>

        {/* 4 — AI-developer is gone missing (+ START THE SEARCH → pricing) */}
        <Section label="An AI developer is gone missing">
          <Screen
            height={844}
            overlay={
              <CtaOverlay
                href="#pricing"
                label={alts.ctaSearch}
                style={{
                  left: CTA_LEFT,
                  top: "88.74%",
                  width: CTA_WIDTH,
                  height: "7.47%",
                }}
              />
            }
          >
            <Frame4 />
          </Screen>
        </Section>

        {/* 5 — Get to the bottom of it (hack / media / chat). */}
        <Section label="Get to the bottom of it">
          <FrameScaler height={1718}>
            <Frame5 />
          </FrameScaler>
        </Section>

        {/* 6 — This is not for you if you */}
        <Section label="This is not for you if you">
          <Screen height={881}>
            <Frame6 />
          </Screen>
        </Section>

        {/* 7 — Complex characters and tough decisions (+ I'M READY → pricing) */}
        <Section id="characters" label="Complex characters and tough decisions">
          <Screen
            height={902}
            overlay={
              <CtaOverlay
                href="#pricing"
                label={alts.ctaReady}
                style={{
                  left: CTA_LEFT,
                  top: "88.91%",
                  width: CTA_WIDTH,
                  height: "6.99%",
                }}
              />
            }
          >
            <Frame7 />
          </Screen>
        </Section>

        {/* 8 — Challenging and rewarding quests */}
        <Section label="Challenging and rewarding quests">
          <Screen height={817}>
            <Frame8 />
          </Screen>
        </Section>

        {/* 9 — 3+ hours of deep immersion */}
        <Section label="Hours of deep immersion">
          <Screen height={770}>
            <Frame9 />
          </Screen>
        </Section>

        {/* 10 — The full case. $15. + timed bullet reveal + paywall CTA */}
        <Section id="pricing" label="The full case pricing">
          <Section10
            overlay={
              <CtaOverlay
                onClick={onOpenPaywall}
                label={alts.ctaBuy}
                style={{
                  left: "10.51%",
                  top: "82.58%",
                  width: CTA_WIDTH,
                  height: "7.47%",
                }}
              />
            }
          />
        </Section>

        {/* 11 — Got questions? Ask them here + FAQ chat */}
        <Section
          label="Got questions? Ask them here"
          className="px-5 py-16 sm:px-8"
        >
          <Artwork
            src={artFaq}
            alt={alts.faq}
            className="mx-auto block h-auto w-[78.46%] max-w-[471px]"
          />
          <div className="mt-10">
            <FaqChat />
          </div>
        </Section>
      </div>
    </>
  )
}
