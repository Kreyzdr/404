import type { ReactNode } from "react"
import ViewportFrame from "@/components/ViewportFrame"
import FaqChat from "@/components/FaqChat"
import SceneImage, { type SceneName } from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import { useI18n } from "@/i18n"
import usePricingReveal, { revealClass } from "@/hooks/usePricingReveal"

import {
  imgTypography,
  imgHeadline,
} from "@/imports/404DesktopRefined1441/svg-q2bvx"
import imgDominic from "@/assets/scenes/dominic.webp"
import imgCorporation from "@/assets/scenes/corporation.webp"
import imgMissing from "@/assets/scenes/missing.webp"
import imgExternal from "@/assets/scenes/external-systems.webp"
import imgMedia from "@/assets/scenes/media-files.webp"
import imgChatImg from "@/assets/scenes/chat.webp"
import imgNotForYou from "@/assets/scenes/not-for-you.webp"
import imgCharacters from "@/assets/scenes/characters.webp"
import imgQuests from "@/assets/scenes/quests.webp"
import imgImmersion from "@/assets/scenes/immersion.webp"
import artHero from "@/assets/artwork/desktop-hero.svg"
import artChallenge from "@/assets/artwork/desktop-challenge.svg"
import artBigtech from "@/assets/artwork/desktop-bigtech.svg"
import artMissing from "@/assets/artwork/desktop-missing.svg"
import artCtaSearch from "@/assets/artwork/desktop-cta-search.svg"
import artInvestigate from "@/assets/artwork/desktop-investigate.svg"
import artExternalSystems from "@/assets/artwork/desktop-external-systems.svg"
import artMediaFiles from "@/assets/artwork/desktop-media-files.svg"
import artChat from "@/assets/artwork/desktop-chat.svg"
import artNotForYou from "@/assets/artwork/desktop-not-for-you.svg"
import artNotForYouItems from "@/assets/artwork/desktop-not-for-you-items.svg"
import artCharactersHeadline from "@/assets/artwork/desktop-characters.svg"
import artCtaReady from "@/assets/artwork/desktop-cta-ready.svg"
import artQuests from "@/assets/artwork/desktop-quests.svg"
import artQuestsItems from "@/assets/artwork/desktop-quests-items.svg"
import artImmersion from "@/assets/artwork/desktop-immersion.svg"
import artPricingHeadline from "@/assets/artwork/desktop-pricing-headline.svg"
import artPrice from "@/assets/artwork/desktop-price.svg"
import artCtaBuy from "@/assets/artwork/desktop-cta-buy.svg"
import artBenefit1 from "@/assets/artwork/desktop-benefit-1.svg"
import artBenefit2 from "@/assets/artwork/desktop-benefit-2.svg"
import artBenefit3 from "@/assets/artwork/desktop-benefit-3.svg"
import artBenefit4 from "@/assets/artwork/desktop-benefit-4.svg"
import artBenefit5 from "@/assets/artwork/desktop-benefit-5.svg"
import artBenefit6 from "@/assets/artwork/desktop-benefit-6.svg"
import artFaq from "@/assets/artwork/desktop-faq.svg"

const FILL = "absolute inset-0 block size-full object-fill"

// The desktop layout is the imported 1440px editorial composition. Headlines
// are vector artwork served as images; their transcribed copy is the `alt`.
// Supporting body lines stay live HTML. Three pieces are adapted: the two
// scroll-to-pricing CTAs, the external pricing CTA, and the FAQ form — which
// is replaced by the working chat component. Each screen is contained in
// its own viewport-tall slot, scaled down to fit narrower or shorter viewports
// (never scaled up past native size).

// Interactive CTA that visually matches the imported red button but is a real
// anchor (scroll targets) or button (paywall) with hover / active / focus
// states. The label artwork stays the original SVG.
const CTA_CLASS =
  "group relative flex h-[64px] items-center justify-center overflow-hidden bg-[#b8292e] outline-none transition-colors hover:bg-[#a3242a] active:bg-[#8f2025]"

function CtaButton({
  href,
  onClick,
  label,
  width,
  children,
}: {
  href?: string
  onClick?: () => void
  label: string
  width: number
  children: ReactNode
}) {
  const ring = (
    <span className="pointer-events-none absolute inset-0 ring-[#fbf9f6] ring-offset-2 ring-offset-black group-focus-visible:ring-2" />
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={CTA_CLASS}
        style={{ width }}
      >
        {children}
        {ring}
      </button>
    )
  }

  return (
    <a href={href} aria-label={label} className={CTA_CLASS} style={{ width }}>
      {children}
      {ring}
    </a>
  )
}

// Each numbered screen owns one viewport-tall slot: the 1440 x `height` design
// frame is contained in it, so a single screen is in view at a time and every
// screen shares the same rhythm.
function Section({
  height,
  id,
  children,
}: {
  height: number
  id?: string
  children: ReactNode
}) {
  return (
    <ViewportFrame baseWidth={1440} maxScale={1} height={height} id={id}>
      <div
        className="flex w-[1440px] flex-col items-center justify-center overflow-clip bg-black"
        style={{ height }}
      >
        {children}
      </div>
    </ViewportFrame>
  )
}

function Copy({ children }: { children: ReactNode }) {
  return (
    <div
      className="relative flex w-[486px] shrink-0 flex-col items-start gap-[24px] overflow-clip"
      data-name="Copy / 486"
    >
      {children}
    </div>
  )
}

// Supporting copy under a headline: live localized text in the imported 22px
// Inter block. Lines are kept separate because the composition breaks them.
function Body({ lines, tone }: { lines: readonly string[], tone: string }) {
  return (
    <div
      className={`relative w-[486px] shrink-0 font-['Inter:Regular',sans-serif] text-[22px] leading-[0] ${tone} [word-break:break-word]`}
    >
      {lines.map((line, i) => (
        <p
          key={line}
          className={(i < lines.length - 1 ? "mb-0 " : "") + "leading-[31px]"}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

function Photo({ scene, src }: { scene: SceneName, src: string }) {
  return (
    <div className="relative size-[588px] shrink-0">
      <SceneImage
        scene={scene}
        src={src}
        className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
      />
    </div>
  )
}

export default function DesktopLanding({
  onOpenPaywall,
}: {
  onOpenPaywall: () => void
}) {
  const { messages } = useI18n()
  const page = messages.page
  const alts = useArtworkAlts()
  // Shared pricing reveal — same trigger/timing/once-only logic as mobile.
  const { ref: pricingRef, revealed } = usePricingReveal<HTMLDivElement>()

  return (
    <div
      className="relative flex w-full flex-col items-stretch bg-black"
      data-name="404 / Desktop refined"
    >
      {/* 01 — Title */}
      <Section height={800}>
        <div className="relative h-[268.188px] w-[865.369px] shrink-0">
          <Artwork src={artHero} alt={alts.hero} className={FILL} />
        </div>
      </Section>

      {/* 02 — Challenge (image right) */}
      <Section height={760} id="story">
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[342px] w-[486px] shrink-0">
              <Artwork
                src={artChallenge}
                alt={alts.challenge}
                className={FILL}
              />
            </div>
            <Body lines={page.challengeBody} tone="text-[#c7c4bf]" />
          </Copy>
          <Photo scene="dominic" src={imgDominic} />
        </div>
      </Section>

      {/* 03 — Big Tech (image left) */}
      <Section height={760}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Photo scene="corporation" src={imgCorporation} />
          <Copy>
            <div className="relative h-[281px] w-[486px] shrink-0">
              <Artwork src={artBigtech} alt={alts.bigTech} className={FILL} />
            </div>
            <Body lines={page.bigTechBody} tone="text-[#c7c4bf]" />
          </Copy>
        </div>
      </Section>

      {/* 04 — Start the search (image right, CTA) */}
      <Section height={800}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[373.12px] w-[450.741px] shrink-0">
              <Artwork src={artMissing} alt={alts.missing} className={FILL} />
            </div>
            <Body lines={[page.missingBody]} tone="text-[#c7c4bf]" />
            <CtaButton href="#pricing" label={alts.ctaSearch} width={280}>
              <Artwork
                src={artCtaSearch}
                alt={alts.ctaSearch}
                className="block h-[64px] w-[280px] object-fill"
              />
            </CtaButton>
          </Copy>
          <Photo scene="missing" src={imgMissing} />
        </div>
      </Section>

      {/* 05 — Investigate / External systems (image left) */}
      <Section height={760}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Photo scene="externalSystems" src={imgExternal} />
          <Copy>
            <div className="relative h-[210.849px] w-[486px] shrink-0">
              <Artwork
                src={artInvestigate}
                alt={alts.investigate}
                className={FILL}
              />
            </div>
            <p className="relative shrink-0 whitespace-nowrap font-['Inter:Medium',sans-serif] text-[28px] font-medium leading-[25px] text-[#bd3133]">
              01
            </p>
            <div className="relative h-[109.434px] w-[360px] shrink-0">
              <Artwork
                src={artExternalSystems}
                alt={alts.investigate1}
                className={FILL}
              />
            </div>
          </Copy>
        </div>
      </Section>

      {/* 06 — Investigate / Media files (image right) */}
      <Section height={680}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <p className="relative shrink-0 whitespace-nowrap font-['Inter:Medium',sans-serif] text-[28px] font-medium leading-[25px] text-[#bd3133]">
              02
            </p>
            <div className="relative h-[116px] w-[304.124px] shrink-0">
              <Artwork
                src={artMediaFiles}
                alt={alts.investigate2}
                className={FILL}
              />
            </div>
          </Copy>
          <Photo scene="mediaFiles" src={imgMedia} />
        </div>
      </Section>

      {/* 07 — Investigate / Chat (image left) */}
      <Section height={680}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Photo scene="chat" src={imgChatImg} />
          <Copy>
            <p className="relative shrink-0 whitespace-nowrap font-['Inter:Medium',sans-serif] text-[28px] font-medium leading-[25px] text-[#bd3133]">
              03
            </p>
            <div className="relative h-[116.179px] w-[486px] shrink-0">
              <Artwork src={artChat} alt={alts.investigate3} className={FILL} />
            </div>
          </Copy>
        </div>
      </Section>

      {/* 08 — Is this for you? (image right) */}
      <Section height={760}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[312px] w-[400px] shrink-0 overflow-clip">
              <div
                className="absolute inset-[-0.08%_-0.04%_-105.59%_0.02%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.099px_0.247px] mask-size-[400px_321.147px]"
                style={{ maskImage: `url("${imgTypography}")` }}
              >
                <Artwork
                  src={artNotForYou}
                  alt={alts.notForYou}
                  className={FILL}
                />
              </div>
            </div>
            {/* Bullet list only — the combined artwork's upper heading
                  portion is cropped away so the heading is not duplicated. */}
            <div className="relative h-[275px] w-[330px] shrink-0 overflow-hidden leading-[0]">
              <Artwork
                src={artNotForYouItems}
                alt={alts.notForYouItems}
                className="absolute block object-fill"
                style={{
                  top: -268.8,
                  left: -4.11,
                  width: 333.221,
                  height: 534.454,
                }}
              />
            </div>
          </Copy>
          <Photo scene="notForYou" src={imgNotForYou} />
        </div>
      </Section>

      {/* 09 — Characters and decisions (image left, CTA) */}
      <Section height={800} id="characters">
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Photo scene="characters" src={imgCharacters} />
          <div
            className="relative h-[601.455px] w-[486px] shrink-0 overflow-clip"
            data-name="Copy / 486"
          >
            <div className="absolute left-0 top-0 h-[427.455px] w-[450px]">
              <Artwork
                src={artCharactersHeadline}
                alt={alts.characters}
                className={FILL}
              />
            </div>
            <div className="absolute left-0 top-[451.45px]">
              <Body lines={page.charactersBody} tone="text-[#e0e0e0]" />
            </div>
            <div className="absolute left-0 top-[537.45px]">
              <CtaButton href="#pricing" label={alts.ctaReady} width={280}>
                <Artwork
                  src={artCtaReady}
                  alt={alts.ctaReady}
                  className="block h-[28.432px] w-[109.704px] object-fill"
                />
              </CtaButton>
            </div>
          </div>
        </div>
      </Section>

      {/* 10 — Challenging quests (image right) */}
      <Section height={760}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[258.702px] w-[486px] shrink-0">
              <Artwork src={artQuests} alt={alts.quests} className={FILL} />
            </div>
            <div className="relative h-[124px] w-[238.11px] shrink-0">
              <Artwork
                src={artQuestsItems}
                alt={alts.questsItems}
                className={FILL}
              />
            </div>
          </Copy>
          <Photo scene="quests" src={imgQuests} />
        </div>
      </Section>

      {/* 11 — Deep immersion (image left) */}
      <Section height={760}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Photo scene="immersion" src={imgImmersion} />
          <Copy>
            <div className="relative h-[383.566px] w-[486px] shrink-0">
              <Artwork
                src={artImmersion}
                alt={alts.immersion}
                className={FILL}
              />
            </div>
            <Body lines={page.immersionBody} tone="text-[#e0e0e0]" />
          </Copy>
        </div>
      </Section>

      {/* 12 — The full case (pricing, external CTA) */}
      <Section height={800} id="pricing">
        <div className="relative flex h-[588px] w-[1200px] shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[105.44px] w-[486px] shrink-0 overflow-clip">
              <div
                className="absolute inset-[0_-3.41%_0.06%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[486px_105.438px]"
                style={{ maskImage: `url("${imgHeadline}")` }}
              >
                <Artwork
                  src={artPricingHeadline}
                  alt={alts.pricing}
                  className={FILL}
                />
              </div>
            </div>
            <div className="relative h-[237px] w-[259px] shrink-0 overflow-clip">
              <Artwork src={artPrice} alt={alts.price} className={FILL} />
            </div>
            <CtaButton onClick={onOpenPaywall} label={alts.ctaBuy} width={360}>
              <Artwork
                src={artCtaBuy}
                alt={alts.ctaBuy}
                className="block h-[28px] w-[259.504px] object-fill"
              />
            </CtaButton>
          </Copy>
          {/* Space for all six rows is reserved from the start (rows 4-6 are
                only transparent), so nothing shifts when they reveal. */}
          <div
            ref={pricingRef}
            className="relative flex w-[588px] shrink-0 flex-col items-start gap-[32px] overflow-clip"
          >
            <BenefitRow
              src={artBenefit1}
              alt={alts.benefits[0]}
              width={363.256}
              height={42.916}
            />
            <BenefitRow
              src={artBenefit2}
              alt={alts.benefits[1]}
              width={419.963}
              height={43.024}
            />
            <BenefitRow
              src={artBenefit3}
              alt={alts.benefits[2]}
              width={559.677}
              height={42.017}
            />
            <BenefitRow
              src={artBenefit4}
              alt={alts.benefits[3]}
              width={588}
              height={42.837}
              reveal={revealed >= 1}
            />
            <BenefitRow
              src={artBenefit5}
              alt={alts.benefits[4]}
              width={407.4}
              height={42.837}
              reveal={revealed >= 2}
            />
            <BenefitRow
              src={artBenefit6}
              alt={alts.benefits[5]}
              width={472.157}
              height={42.837}
              reveal={revealed >= 3}
            />
          </div>
        </div>
      </Section>

      {/* 13 — Questions (working chat placed into the desktop FAQ layout) */}
      <Section height={760}>
        <div className="relative flex w-[1200px] shrink-0 items-center gap-[126px] overflow-clip">
          <div className="w-[588px] shrink-0">
            <FaqChat />
          </div>
          <div
            className="relative flex w-[486px] shrink-0 flex-col items-start overflow-clip"
            data-name="Copy / 486"
          >
            <div className="relative h-[453.655px] w-[486px] shrink-0 overflow-clip">
              <Artwork src={artFaq} alt={alts.faq} className={FILL} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

// Pricing "case benefit" row — red marker + off-white label, original vectors.
function BenefitRow({
  src,
  alt,
  width,
  height,
  reveal,
  // undefined → always-visible (benefits 1-3); boolean → animated (4-6).
}: {
  src: string
  alt: string
  width: number
  height: number
  reveal?: boolean
}) {
  return (
    <div
      className={
        "relative shrink-0" +
        (reveal === undefined ? "" : " " + revealClass(reveal))
      }
      style={{ width, height }}
    >
      <Artwork src={src} alt={alt} className={FILL} />
    </div>
  )
}
