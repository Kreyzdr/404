import imgChatGptImageSep102026120458Pm1 from "@/assets/scenes/not-for-you.webp"
import { imgTypography, imgTypography1 } from "./svg-1zo9f"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artItems from "@/assets/artwork/mobile-not-for-you-items.svg"
import artHeadline from "@/assets/artwork/mobile-not-for-you.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component6V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="6v2">
      <div className="absolute bg-black h-[881px] left-0 top-0 w-[390px]" />
      <div
        className="absolute left-0 size-[390px] top-[491px]"
        data-name="ChatGPT Image Sep 10, 2026, 12_04_58 PM 1"
      >
        <SceneImage
          scene="notForYou"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep102026120458Pm1}
        />
      </div>
      <div
        className="absolute contents left-[42px] top-[316.68px]"
        data-name="Mask group"
      >
        <div
          className="absolute inset-[14.04%_28.65%_42.41%_10.01%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2.951px_192.97px] mask-size-[236.903px_197.419px]"
          style={{ maskImage: `url("${imgTypography}")` }}
          data-name="typography"
        >
          <Artwork src={artItems} alt={alts.notForYouItems} className={FILL} />
        </div>
      </div>
      <div
        className="absolute contents left-[42px] top-[71px]"
        data-name="Mask group"
      >
        <div
          className="absolute inset-[8.04%_10.74%_36.24%_10.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.076px_0.189px] mask-size-[306px_245.677px]"
          style={{ maskImage: `url("${imgTypography1}")` }}
          data-name="typography"
        >
          <Artwork src={artHeadline} alt={alts.notForYou} className={FILL} />
        </div>
      </div>
    </div>
  )
}
