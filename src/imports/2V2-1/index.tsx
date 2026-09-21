import imgChatGptImageSep112026033526Pm1 from "@/assets/scenes/dominic.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artChallenge from "@/assets/artwork/mobile-challenge.svg"

export default function Component2V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="2v2">
      <div className="absolute h-[788px] left-0 top-0 w-[390px]">
        <Artwork
          src={artChallenge}
          alt={alts.challengeFrame}
          className="absolute inset-0 block size-full object-fill"
        />
      </div>
      <div
        className="absolute left-0 size-[390px] top-[358px]"
        data-name="ChatGPT Image Sep 11, 2026, 03_35_26 PM 1"
      >
        <SceneImage
          scene="dominic"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep112026033526Pm1}
        />
      </div>
    </div>
  )
}
