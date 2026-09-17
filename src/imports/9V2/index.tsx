import svgPaths from "./svg-ezw7h45yix"
import imgChatGptImageSep102026021623Pm1 from "@/assets/scenes/immersion.webp"
import SceneImage from "@/components/SceneImage"

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-black h-[770px] left-0 top-0 w-[390px]" />
    </div>
  )
}

export default function Component9V() {
  return (
    <div className="relative size-full" data-name="9v2">
      <Group />
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
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="284.285"
          preserveAspectRatio="none"
          viewBox="0 0 258.111 284.285"
          width="258.111"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.pea0a000}
            fill="#FBF9F6"
            fillRule="evenodd"
            id="white-lettering"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[19.66%_10.77%_59.44%_10.88%]"
        data-name="red-lettering"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="160.916"
          preserveAspectRatio="none"
          viewBox="0 0 305.575 160.916"
          width="305.575"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p35155200}
            fill="#BD3133"
            fillRule="evenodd"
            id="red-lettering"
          />
        </svg>
      </div>
    </div>
  )
}
