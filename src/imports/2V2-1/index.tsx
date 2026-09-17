import svgPaths from "./svg-gfwgngoxnt"
import imgChatGptImageSep112026033526Pm1 from "@/assets/scenes/dominic.webp"
import SceneImage from "@/components/SceneImage"

function Group() {
  return (
    <div className="absolute h-[788px] left-0 top-0 w-[390px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="788"
        preserveAspectRatio="none"
        viewBox="0 0 390 788"
        width="390"
      >
        <g id="Group 1">
          <rect fill="black" height="788" id="Rectangle 15" width="390" />
          <path
            clipRule="evenodd"
            d={svgPaths.p3a82f7b0}
            fill="#BD3133"
            fillRule="evenodd"
            id="a-challenge"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p10aabc00}
            fill="#FBF9F6"
            fillRule="evenodd"
            id="lettering"
          />
        </g>
      </svg>
    </div>
  )
}

export default function Component2V() {
  return (
    <div className="relative size-full" data-name="2v2">
      <Group />
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
