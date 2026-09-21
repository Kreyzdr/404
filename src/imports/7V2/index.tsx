import imgChatGptImageSep112026011046Pm1 from "@/assets/scenes/characters.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artWhite from "@/assets/artwork/mobile-characters.svg"
import artRed from "@/assets/artwork/mobile-characters-red.svg"
import artCta from "@/assets/artwork/mobile-cta-ready.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component7V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="7v2">
      <div className="absolute bg-black h-[902px] left-0 top-0 w-[390px]" />
      <div
        className="absolute inset-[7.87%_10.77%_55.63%_10.77%]"
        data-name="white-lettering"
      >
        <Artwork src={artWhite} alt={alts.charactersFrame} className={FILL} />
      </div>
      <div
        className="absolute inset-[24.34%_22.79%_59.88%_11%]"
        data-name="red-lettering"
      >
        <Artwork src={artRed} alt="" className={FILL} />
      </div>
      <div
        className="absolute left-0 size-[390px] top-[406px]"
        data-name="ChatGPT Image Sep 11, 2026, 01_10_46 PM 1"
      >
        <SceneImage
          scene="characters"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep112026011046Pm1}
        />
      </div>
      <div className="absolute bg-[#bd3133] h-[63.027px] left-[42px] top-[802px] w-[306px]" />
      <div
        className="absolute inset-[90.91%_36.14%_5.99%_36.15%]"
        data-name="im-ready"
      >
        <Artwork src={artCta} alt={alts.ctaReady} className={FILL} />
      </div>
    </div>
  )
}
