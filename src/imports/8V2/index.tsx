import imgChatGptImageSep102026013853Pm1 from "@/assets/scenes/quests-mobile.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artWhite from "@/assets/artwork/mobile-quests.svg"
import artRed from "@/assets/artwork/mobile-quests-red.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component8V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="8v2">
      <div className="absolute bg-black h-[817px] left-0 top-0 w-[390px]" />
      <div
        className="absolute h-[487px] left-px top-[330px] w-[390px]"
        data-name="ChatGPT Image Sep 10, 2026, 01_38_53 PM 1"
      >
        <SceneImage
          scene="quests"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep102026013853Pm1}
        />
      </div>
      <div
        className="absolute inset-[8.69%_27.01%_61.01%_10.77%]"
        data-name="white-lettering"
      >
        <Artwork src={artWhite} alt={alts.questsFrame} className={FILL} />
      </div>
      <div
        className="absolute inset-[15.38%_10.77%_61.3%_10.95%]"
        data-name="red-lettering"
      >
        <Artwork src={artRed} alt="" className={FILL} />
      </div>
    </div>
  )
}
