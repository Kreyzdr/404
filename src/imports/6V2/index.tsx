import svgPaths from "./svg-1oppkiw3ux"
import imgChatGptImageSep102026120458Pm1 from "@/assets/scenes/not-for-you.webp"
import { imgTypography, imgTypography1 } from "./svg-1zo9f"
import SceneImage from "@/components/SceneImage"

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-black h-[881px] left-0 top-0 w-[390px]" />
    </div>
  )
}

function Typography() {
  return (
    <div
      className="absolute inset-[14.04%_28.65%_42.41%_10.01%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[2.951px_192.97px] mask-size-[236.903px_197.419px]"
      style={{ maskImage: `url("${imgTypography}")` }}
      data-name="typography"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="383.678"
        preserveAspectRatio="none"
        viewBox="0 0 239.215 383.678"
        width="239.215"
      >
        <g id="typography">
          <path
            clipRule="evenodd"
            d={svgPaths.p1f427500}
            fill="#FBF9F5"
            fillRule="evenodd"
            id="Vector"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p364f0100}
            fill="#BC3034"
            fillRule="evenodd"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  )
}

function MaskGroup() {
  return (
    <div
      className="absolute contents left-[42px] top-[316.68px]"
      data-name="Mask group"
    >
      <Typography />
    </div>
  )
}

function Typography1() {
  return (
    <div
      className="absolute inset-[8.04%_10.74%_36.24%_10.79%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.076px_0.189px] mask-size-[306px_245.677px]"
      style={{ maskImage: `url("${imgTypography1}")` }}
      data-name="typography"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="490.882"
        preserveAspectRatio="none"
        viewBox="0 0 306.055 490.882"
        width="306.055"
      >
        <g id="typography">
          <path
            clipRule="evenodd"
            d={svgPaths.p34cba700}
            fill="#FBF9F5"
            fillRule="evenodd"
            id="Vector"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.pd74df00}
            fill="#BC3034"
            fillRule="evenodd"
            id="Vector_2"
          />
        </g>
      </svg>
    </div>
  )
}

function MaskGroup1() {
  return (
    <div
      className="absolute contents left-[42px] top-[71px]"
      data-name="Mask group"
    >
      <Typography1 />
    </div>
  )
}

export default function Component6V() {
  return (
    <div className="relative size-full" data-name="6v2">
      <Group />
      <div
        className="absolute left-0 size-[390px] top-[491px]"
        data-name="ChatGPT Image Sep 10, 2026, 12_04_58 PM 1"
      >
        <SceneImage
          scene="notForYou"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src={imgChatGptImageSep102026120458Pm1}
        />
      </div>
      <MaskGroup />
      <MaskGroup1 />
    </div>
  )
}
