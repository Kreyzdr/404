import imgChatGptImageSep112026033802Pm1 from "@/assets/scenes/missing.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artYetAnother from "@/assets/artwork/mobile-missing-yet-another.svg"
import artGenius from "@/assets/artwork/mobile-missing-genius.svg"
import artAiDeveloper from "@/assets/artwork/mobile-missing-ai-developer.svg"
import artGone from "@/assets/artwork/mobile-missing-gone.svg"
import artSubtitle from "@/assets/artwork/mobile-missing-subtitle.svg"
import artCta from "@/assets/artwork/mobile-cta-search.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component4V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="4v2">
      <div className="absolute bg-black h-[844px] left-0 top-0 w-[390px]" />
      <div
        className="absolute inset-[8.41%_20.61%_84.38%_10.77%]"
        data-name="yet-another"
      >
        <Artwork src={artYetAnother} alt={alts.missing} className={FILL} />
      </div>
      <div
        className="absolute inset-[15.88%_51.54%_76.83%_10.92%]"
        data-name="genius"
      >
        <Artwork src={artGenius} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[23.48%_17.79%_69.17%_10.8%]"
        data-name="ai-developer"
      >
        <Artwork src={artAiDeveloper} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[31.19%_10.77%_61.9%_10.89%]"
        data-name="is-gone-missing"
      >
        <Artwork src={artGone} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[38.94%_42.14%_59.46%_11.02%]"
        data-name="subtitle"
      >
        <Artwork src={artSubtitle} alt={alts.missingBody} className={FILL} />
      </div>
      <div
        className="absolute left-0 size-[390px] top-[343px]"
        data-name="ChatGPT Image Sep 11, 2026, 03_38_02 PM 1"
      >
        <SceneImage
          scene="missing"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep112026033802Pm1}
        />
      </div>
      <div className="absolute bg-[#bd3133] h-[63.027px] left-[42px] top-[749px] w-[306px]" />
      <div
        className="absolute inset-[90.88%_24.35%_5.81%_24.36%]"
        data-name="start-the-search"
      >
        <Artwork src={artCta} alt={alts.ctaSearch} className={FILL} />
      </div>
    </div>
  )
}
