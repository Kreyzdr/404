import imgChatGptImageSep112026024428Pm1 from "@/assets/scenes/external-systems.webp"
import imgChatGptImageSep112026025430Pm1 from "@/assets/scenes/media-files.webp"
import imgChatGptImageSep112026031558Pm1 from "@/assets/scenes/chat.webp"
import SceneImage from "@/components/SceneImage"
import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artNumber03 from "@/assets/artwork/mobile-investigate-03.svg"
import artChat from "@/assets/artwork/mobile-chat.svg"
import artNumber02 from "@/assets/artwork/mobile-investigate-02.svg"
import artMediaFiles from "@/assets/artwork/mobile-media-files.svg"
import artNumber01 from "@/assets/artwork/mobile-investigate-01.svg"
import artExternalSystems from "@/assets/artwork/mobile-external-systems.svg"
import artHeadline from "@/assets/artwork/mobile-investigate.svg"
import artHeadlineRed from "@/assets/artwork/mobile-investigate-red.svg"

const FILL = "absolute inset-0 block size-full object-fill"

export default function Component5V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="5v2">
      <div className="absolute bg-black h-[1718px] left-0 top-0 w-[390px]" />
      <div
        className="absolute inset-[72.41%_84.6%_26.61%_10.77%]"
        data-name="number-03"
      >
        <Artwork src={artNumber03} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[73.62%_21.53%_22.71%_10.84%]"
        data-name="chat"
      >
        <Artwork src={artChat} alt={alts.investigate3} className={FILL} />
      </div>
      <div
        className="absolute inset-[42.61%_84.46%_56.37%_10.77%]"
        data-name="number-02"
      >
        <Artwork src={artNumber02} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[43.87%_46.43%_52.43%_10.82%]"
        data-name="media-files"
      >
        <Artwork src={artMediaFiles} alt={alts.investigate2} className={FILL} />
      </div>
      <div
        className="absolute inset-[13.74%_85.35%_85.24%_10.77%]"
        data-name="number-01"
      >
        <Artwork src={artNumber01} alt="" className={FILL} />
      </div>
      <div
        className="absolute inset-[14.99%_34.59%_81.25%_10.86%]"
        data-name="external-systems"
      >
        <Artwork src={artExternalSystems} alt={alts.investigate1} className={FILL} />
      </div>
      <div
        className="absolute inset-[4.13%_10.77%_88.15%_10.77%]"
        data-name="headline-white"
      >
        <Artwork src={artHeadline} alt={alts.investigate} className={FILL} />
      </div>
      <div
        className="absolute inset-[8.21%_39.91%_88.14%_11.1%]"
        data-name="headline-red"
      >
        <Artwork src={artHeadlineRed} alt="" className={FILL} />
      </div>
      <div
        className="absolute left-0 size-[390px] top-[329px]"
        data-name="ChatGPT Image Sep 11, 2026, 02_44_28 PM 1"
      >
        <SceneImage
          scene="externalSystems"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep112026024428Pm1}
        />
      </div>
      <div
        className="absolute left-0 size-[390px] top-[841px]"
        data-name="ChatGPT Image Sep 11, 2026, 02_54_30 PM 1"
      >
        <SceneImage
          scene="mediaFiles"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep112026025430Pm1}
        />
      </div>
      <div
        className="absolute left-0 size-[390px] top-[1328px]"
        data-name="ChatGPT Image Sep 11, 2026, 03_15_58 PM 1"
      >
        <SceneImage
          scene="chat"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep112026031558Pm1}
        />
      </div>
    </div>
  )
}
