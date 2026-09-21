import type { ReactNode } from "react"
import ViewportFrame from "@/components/ViewportFrame"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import usePricingReveal, { revealClass } from "@/hooks/usePricingReveal"
import { imgHeadline, imgPrice } from "@/imports/10V2State2-1/svg-rcuro"
import artCta from "@/assets/artwork/mobile-pricing-cta.svg"
import artHeadline from "@/assets/artwork/mobile-pricing-headline.svg"
import artPrice from "@/assets/artwork/mobile-price.svg"
import artBenefit1 from "@/assets/artwork/mobile-benefit-1.svg"
import artBenefit2 from "@/assets/artwork/mobile-benefit-2.svg"
import artBenefit3 from "@/assets/artwork/mobile-benefit-3.svg"
import artBenefit4 from "@/assets/artwork/mobile-benefit-4.svg"
import artBenefit5 from "@/assets/artwork/mobile-benefit-5.svg"
import artBenefit6 from "@/assets/artwork/mobile-benefit-6.svg"

const FILL = "absolute inset-0 block size-full object-fill"

// Reproduces the corrected 10v2_state2 frame faithfully (paths referenced from
// the import), with the three new bullet groups (benefit-4/5/6) revealed on a
// once-only timed sequence after the section is first meaningfully viewed.

function bulletClass(shown: boolean) {
  return "absolute " + revealClass(shown)
}

export default function Section10({ overlay }: { overlay?: ReactNode }) {
  const alts = useArtworkAlts()
  const { ref, revealed } = usePricingReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <ViewportFrame height={844} overlay={overlay}>
        <div className="relative size-full" data-name="10v2_state2">
          {/* black background */}
          <div className="absolute left-0 top-0 h-[844px] w-[390px] bg-black" />
          {/* CTA red rect (artwork; interactive overlay lives in App) */}
          <div
            className="absolute h-[63.027px] w-[306px] bg-[#bd3133]"
            style={{ left: 41, top: 696.99 }}
          />

          {/* button-text */}
          <div className="absolute inset-[84.64%_16.07%_11.96%_15.67%]">
            <Artwork src={artCta} alt={alts.ctaBuy} className={FILL} />
          </div>

          {/* headline (masked vector — periods corrected) */}
          <div
            className="absolute inset-[7.91%_8.35%_84.23%_10.51%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[306px_66.387px]"
            style={{ maskImage: `url("${imgHeadline}")` }}
          >
            <Artwork src={artHeadline} alt={alts.pricing} className={FILL} />
          </div>

          {/* price (masked vector) */}
          <div
            className="absolute inset-[16.88%_30.85%_64.23%_10.51%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-size-[202.271px_159.742px]"
            style={{ maskImage: `url("${imgPrice}")` }}
          >
            <Artwork src={artPrice} alt={alts.price} className={FILL} />
          </div>

          {/* benefit-1 */}
          <div className="absolute inset-[37.88%_48.98%_59.92%_10.8%]">
            <Artwork src={artBenefit1} alt={alts.benefits[0]} className={FILL} />
          </div>

          {/* benefit-2 */}
          <div className="absolute inset-[41.88%_42.7%_55.92%_10.8%]">
            <Artwork src={artBenefit2} alt={alts.benefits[1]} className={FILL} />
          </div>

          {/* benefit-3 */}
          <div className="absolute inset-[45.79%_27.23%_52.06%_10.8%]">
            <Artwork src={artBenefit3} alt={alts.benefits[2]} className={FILL} />
          </div>

          {/* benefit-4 (new, animated) */}
          <div
            className={
              bulletClass(revealed >= 1) +
              " inset-[49.76%_24.12%_48.05%_10.77%]"
            }
          >
            <Artwork src={artBenefit4} alt={alts.benefits[3]} className={FILL} />
          </div>

          {/* benefit-5 (new, animated) */}
          <div
            className={
              bulletClass(revealed >= 2) +
              " inset-[53.79%_44.12%_44.02%_10.77%]"
            }
          >
            <Artwork src={artBenefit5} alt={alts.benefits[4]} className={FILL} />
          </div>

          {/* benefit-6 (new, animated) */}
          <div
            className={
              bulletClass(revealed >= 3) +
              " inset-[57.82%_36.95%_39.99%_10.77%]"
            }
          >
            <Artwork src={artBenefit6} alt={alts.benefits[5]} className={FILL} />
          </div>
        </div>
      </ViewportFrame>
    </div>
  )
}
