import type { ReactNode } from "react"
import ViewportFrame from "@/components/ViewportFrame"
import FaqChat from "@/components/FaqChat"
import SceneImage, { type SceneName } from "@/components/SceneImage"
import usePricingReveal, { revealClass } from "@/hooks/usePricingReveal"

import svgPaths from "@/imports/404DesktopRefined1441/svg-63zx3hak77"
import {
  imgTypography,
  imgHeadline,
  imgPrice,
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

// The desktop layout is the imported 1440px editorial composition, reproduced
// faithfully with its original SVG headline artwork preserved and supporting
// copy / numeric markers kept as real HTML text. Three pieces are adapted:
// the two scroll-to-pricing CTAs, the external pricing CTA, and the FAQ form —
// which is replaced by the working chat component. Each screen is contained in
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

function Photo({ scene, src }: { scene: SceneName; src: string }) {
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
          <svg
            className="absolute inset-0 block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 865.369 268.188"
          >
            <g clipPath="url(#clip0_0_78)">
              <path
                clipRule="evenodd"
                d={svgPaths.p2503b500}
                fill="#BD3133"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p194ad280}
                fill="#FBF9F6"
                fillRule="evenodd"
              />
            </g>
            <defs>
              <clipPath id="clip0_0_78">
                <rect fill="white" height="268.188" width="865.369" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </Section>

      {/* 02 — Challenge (image right) */}
      <Section height={760} id="story">
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[342px] w-[486px] shrink-0">
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 342"
              >
                <g clipPath="url(#clip0_0_72)">
                  <g filter="url(#filter0_d_0_72)">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p37583900}
                      fill="#FBF9F6"
                      fillRule="evenodd"
                    />
                  </g>
                  <g filter="url(#filter1_d_0_72)">
                    <path
                      clipRule="evenodd"
                      d={svgPaths.p295bf200}
                      fill="#BD3133"
                      fillRule="evenodd"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="409.056"
                    id="filter0_d_0_72"
                    width="475.022"
                    x="-2.56805"
                    y="0"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="2.89405" />
                    <feGaussianBlur stdDeviation="1.44703" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="effect1_dropShadow_0_72"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_0_72"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                  <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="121.921"
                    id="filter1_d_0_72"
                    width="475.295"
                    x="-2.89405"
                    y="113.592"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      result="hardAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="2.89405" />
                    <feGaussianBlur stdDeviation="1.44703" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      in2="BackgroundImageFix"
                      mode="normal"
                      result="effect1_dropShadow_0_72"
                    />
                    <feBlend
                      in="SourceGraphic"
                      in2="effect1_dropShadow_0_72"
                      mode="normal"
                      result="shape"
                    />
                  </filter>
                  <clipPath id="clip0_0_72">
                    <rect fill="white" height="342" width="486" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="relative w-[486px] shrink-0 font-['Inter:Regular',sans-serif] text-[22px] leading-[0] text-[#c7c4bf] [word-break:break-word]">
              <p className="mb-0 leading-[31px]">Find yourself in the middle</p>
              <p className="leading-[31px]">of an interactive thriller.</p>
            </div>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 281"
              >
                <g clipPath="url(#clip0_0_59)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.pdda4d00}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.pa647b00}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_59">
                    <rect fill="white" height="281" width="486" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="relative w-[486px] shrink-0 font-['Inter:Regular',sans-serif] text-[22px] leading-[0] text-[#c7c4bf] [word-break:break-word]">
              <p className="mb-0 leading-[31px]">Will you dare to ask</p>
              <p className="leading-[31px]">the right questions?</p>
            </div>
          </Copy>
        </div>
      </Section>

      {/* 04 — Start the search (image right, CTA) */}
      <Section height={800}>
        <div className="relative flex shrink-0 items-center gap-[126px] overflow-clip">
          <Copy>
            <div className="relative h-[373.12px] w-[450.741px] shrink-0">
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 450.741 373.12"
              >
                <g clipPath="url(#clip0_0_64)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p34029700}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p228b2800}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p33ec5380}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p1232d400}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_64">
                    <rect fill="white" height="373.12" width="450.741" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="relative w-[486px] shrink-0 font-['Inter:Regular',sans-serif] text-[22px] leading-[31px] text-[#c7c4bf] [word-break:break-word]">
              Find him to learn the truth.
            </p>
            <CtaButton href="#pricing" label="Start the search" width={280}>
              <svg
                className="block h-[64px] w-[280px]"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 280 64"
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.p23772980}
                  fill="#FBF9F6"
                  fillRule="evenodd"
                />
              </svg>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 210.849"
              >
                <g clipPath="url(#clip0_0_56)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p27357c00}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p2cd9f400}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_56">
                    <rect fill="white" height="210.849" width="486" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="relative shrink-0 whitespace-nowrap font-['Inter:Medium',sans-serif] text-[28px] font-medium leading-[25px] text-[#bd3133]">
              01
            </p>
            <div className="relative h-[109.434px] w-[360px] shrink-0">
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 360 109.434"
              >
                <g clipPath="url(#clip0_0_51)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p27c200}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_51">
                    <rect fill="white" height="109.434" width="360" />
                  </clipPath>
                </defs>
              </svg>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 304.124 116"
              >
                <g clipPath="url(#clip0_0_48)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p1819a400}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_48">
                    <rect fill="white" height="116" width="304.124" />
                  </clipPath>
                </defs>
              </svg>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 116.179"
              >
                <g clipPath="url(#clip0_0_45)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p13a72a00}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_45">
                    <rect fill="white" height="116.179" width="486" />
                  </clipPath>
                </defs>
              </svg>
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
                <svg
                  className="absolute inset-0 block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 400.072 641.676"
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p3219ea00}
                    fill="#FBF9F5"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p3ef00900}
                    fill="#BC3034"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Bullet list only — the combined artwork's upper heading
                  portion is cropped away so the heading is not duplicated. */}
            <div className="relative h-[275px] w-[330px] shrink-0 overflow-hidden leading-[0]">
              <svg
                className="absolute block"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 333.221 534.454"
                style={{
                  top: -268.8,
                  left: -4.11,
                  width: 333.221,
                  height: 534.454,
                }}
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.p37e45900}
                  fill="#FBF9F5"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d={svgPaths.p196b3f40}
                  fill="#BC3034"
                  fillRule="evenodd"
                />
              </svg>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 450 427.455"
              >
                <g clipPath="url(#clip0_0_32)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.pd52c600}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p359eaa00}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_32">
                    <rect fill="white" height="427.455" width="450" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="absolute left-0 top-[451.45px] w-[486px] font-['Inter:Regular',sans-serif] text-[22px] leading-[0] text-[#e0e0e0] [word-break:break-word]">
              <p className="mb-0 leading-[31px]">No NPCs, no premade lines.</p>
              <p className="leading-[31px]">Every playthrough is unique.</p>
            </div>
            <div className="absolute left-0 top-[537.45px]">
              <CtaButton href="#pricing" label="I'm ready" width={280}>
                <svg
                  className="block h-[28.432px] w-[109.704px]"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 109.705 28.4324"
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p2eab2500}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                </svg>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 258.702"
              >
                <g clipPath="url(#clip0_0_26)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p351a8c00}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p37213300}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_26">
                    <rect fill="white" height="258.702" width="486" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="relative h-[124px] w-[238.11px] shrink-0">
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 238.11 124"
              >
                <mask
                  height="124"
                  id="mask0_0_22"
                  maskUnits="userSpaceOnUse"
                  style={{ maskType: "alpha" }}
                  width="239"
                  x="0"
                  y="0"
                >
                  <rect fill="#D9D9D9" height="124" width="238.11" />
                </mask>
                <g mask="url(#mask0_0_22)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p27e0f400}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p4605f00}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
              </svg>
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 383.566"
              >
                <g clipPath="url(#clip0_0_19)">
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p2f71bb00}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p11084f0}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_0_19">
                    <rect fill="white" height="383.566" width="486" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="relative w-[486px] shrink-0 font-['Inter:Regular',sans-serif] text-[22px] leading-[0] text-[#e0e0e0] [word-break:break-word]">
              <p className="mb-0 leading-[31px]">No downloadable content.</p>
              <p className="leading-[31px]">
                No microtransactions. No time limit.
              </p>
            </div>
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
                <svg
                  className="absolute inset-0 block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 502.579 105.379"
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p186b37f0}
                    fill="#FBF9F6"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="relative h-[236.924px] w-[300px] shrink-0 overflow-clip">
              <div
                className="absolute inset-[0_-13.05%_0.2%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[299.994px_236.918px]"
                style={{ maskImage: `url("${imgPrice}")` }}
              >
                <svg
                  className="absolute inset-0 block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 339.165 236.451"
                >
                  <path
                    clipRule="evenodd"
                    d={svgPaths.p1a82de80}
                    fill="#BD3133"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <CtaButton
              onClick={onOpenPaywall}
              label="Start the investigation"
              width={360}
            >
              <svg
                className="block h-[28px] w-[259.504px]"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 259.504 28"
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.pbb24180}
                  fill="#FBF9F5"
                  fillRule="evenodd"
                />
              </svg>
            </CtaButton>
          </Copy>
          {/* Space for all six rows is reserved from the start (rows 4-6 are
                only transparent), so nothing shifts when they reveal. */}
          <div
            ref={pricingRef}
            className="relative flex w-[588px] shrink-0 flex-col items-start gap-[32px] overflow-clip"
          >
            <BenefitRow
              width={363.256}
              height={42.916}
              viewBox="0 0 363.257 42.916"
              marker={svgPaths.p18d86300}
              text={svgPaths.p9df9a00}
            />
            <BenefitRow
              width={419.963}
              height={43.024}
              viewBox="0 0 419.963 43.0235"
              marker={svgPaths.p3a395780}
              text={svgPaths.p3248ea00}
            />
            <BenefitRow
              width={559.677}
              height={42.017}
              viewBox="0 0 559.677 42.0165"
              marker={svgPaths.p1226a20}
              text={svgPaths.p2ddb1480}
            />
            <BenefitRow
              width={588}
              height={42.837}
              viewBox="0 0 588 42.837"
              marker={svgPaths.p2aeb400}
              text={svgPaths.p3eca6600}
              markerNoRule
              reveal={revealed >= 1}
            />
            <BenefitRow
              width={407.4}
              height={42.837}
              viewBox="0 0 407.4 42.837"
              marker={svgPaths.p2aeb400}
              text={svgPaths.p1703a580}
              markerNoRule
              reveal={revealed >= 2}
            />
            <BenefitRow
              width={472.157}
              height={42.837}
              viewBox="0 0 472.156 42.837"
              marker={svgPaths.p1f14ac80}
              text={svgPaths.p2a4ea400}
              markerNoRule
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
              <svg
                className="absolute inset-0 block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 486 453.655"
              >
                <path
                  clipRule="evenodd"
                  d={svgPaths.p364c9000}
                  fill="#FBF9F6"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d={svgPaths.p1558f000}
                  fill="#BD3133"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

// Pricing "case benefit" row — red marker + off-white label, original vectors.
function BenefitRow({
  width,
  height,
  viewBox,
  marker,
  text,
  markerNoRule = false,
  reveal,
  // undefined → always-visible (benefits 1-3); boolean → animated (4-6).
}: {
  width: number
  height: number
  viewBox: string
  marker: string
  text: string
  markerNoRule?: boolean
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
      <svg
        className="absolute inset-0 block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox={viewBox}
      >
        {markerNoRule ? (
          <path d={marker} fill="#BD3133" />
        ) : (
          <path
            clipRule="evenodd"
            d={marker}
            fill="#BD3133"
            fillRule="evenodd"
          />
        )}
        <path clipRule="evenodd" d={text} fill="#FBF9F5" fillRule="evenodd" />
      </svg>
    </div>
  )
}
