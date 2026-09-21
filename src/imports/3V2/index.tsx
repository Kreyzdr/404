import imgChatGptImageSep92026122440Pm1 from "@/assets/scenes/bigtech-mobile.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artRed from "@/assets/artwork/mobile-bigtech-red.svg"
import artLettering from "@/assets/artwork/mobile-bigtech.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component3V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="3v2">
      <div className="absolute contents left-[-2px] top-0">
        <div className="absolute bg-black h-[790px] left-[-2px] top-0 w-[390px]" />
        <div
          className="absolute h-[520px] left-[-2px] top-[270px] w-[390px]"
          data-name="ChatGPT Image Sep 9, 2026, 12_24_40 PM 1"
        >
          <SceneImage
            scene="corporation"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgChatGptImageSep92026122440Pm1}
          />
        </div>
      </div>
      <div
        className="absolute inset-[16.4%_26.81%_68.73%_10.67%]"
        data-name="hiding-something"
      >
        <Artwork src={artRed} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[8.99%_11.28%_65.84%_10.26%]"
        data-name="lettering"
      >
        <Artwork src={artLettering} alt={alts.bigTechFrame} className={FILL} />
      </div>
    </div>
  )
}
