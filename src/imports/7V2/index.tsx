import svgPaths from "./svg-bxgtjz1iuf"
import imgChatGptImageSep112026011046Pm1 from "@/assets/scenes/characters.webp"
import SceneImage from "@/components/SceneImage"

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-black h-[902px] left-0 top-0 w-[390px]" />
    </div>
  )
}

function ImReady() {
  return (
    <div
      className="absolute inset-[90.91%_36.14%_5.99%_36.15%]"
      data-name="im-ready"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="28"
        preserveAspectRatio="none"
        viewBox="0 0 108.036 28"
        width="108.036"
      >
        <g id="im-ready">
          <path
            clipRule="evenodd"
            d={svgPaths.p282a0300}
            fill="#FBF9F6"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  )
}

export default function Component7V() {
  return (
    <div className="relative size-full" data-name="7v2">
      <Group />
      <div
        className="absolute inset-[7.87%_10.77%_55.63%_10.77%]"
        data-name="white-lettering"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="329.25"
          preserveAspectRatio="none"
          viewBox="0 0 306 329.25"
          width="306"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p21c7d840}
            fill="#FBF9F6"
            fillRule="evenodd"
            id="white-lettering"
          />
        </svg>
      </div>
      <div
        className="absolute inset-[24.34%_22.79%_59.88%_11%]"
        data-name="red-lettering"
      >
        <svg
          className="absolute block inset-0 size-full"
          fill="none"
          height="142.298"
          preserveAspectRatio="none"
          viewBox="0 0 258.215 142.298"
          width="258.215"
        >
          <path
            clipRule="evenodd"
            d={svgPaths.p255d2800}
            fill="#BD3133"
            fillRule="evenodd"
            id="red-lettering"
          />
        </svg>
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
      <ImReady />
    </div>
  )
}
