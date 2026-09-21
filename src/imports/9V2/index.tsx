import imgChatGptImageSep102026021623Pm1 from "@/assets/scenes/immersion.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artWhite from "@/assets/artwork/mobile-immersion.svg"
import artRed from "@/assets/artwork/mobile-immersion-red.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component9V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="9v2">
      <div className="absolute bg-black h-[770px] left-0 top-0 w-[390px]" />
      <div
        className="absolute left-0 size-[390px] top-[380px]"
        data-name="ChatGPT Image Sep 10, 2026, 02_16_23 PM 1"
      >
        <SceneImage
          scene="immersion"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep102026021623Pm1}
        />
      </div>
      <div
        className="absolute inset-[9.22%_23.05%_53.86%_10.77%]"
        data-name="white-lettering"
      >
        <Artwork src={artWhite} alt={alts.immersionFrame} className={FILL} />
      </div>
      <div
        className="absolute inset-[19.66%_10.77%_59.44%_10.88%]"
        data-name="red-lettering"
      >
        <Artwork src={artRed} alt="" className={FILL} />
      </div>
    </div>
  )
}
