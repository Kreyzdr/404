import svgPaths from "./svg-we3evo8zed"

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-black h-[844px] left-0 top-0 w-[390px]" />
    </div>
  )
}

function Lettering() {
  return (
    <div
      className="absolute inset-[8.41%_10.77%_57.74%_10.77%]"
      data-name="lettering"
    >
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="285.635"
        preserveAspectRatio="none"
        viewBox="0 0 306 285.635"
        width="306"
      >
        <g id="lettering">
          <path
            clipRule="evenodd"
            d={svgPaths.p5a5800}
            fill="#FBF9F6"
            fillRule="evenodd"
            id="white-lettering"
          />
          <path
            clipRule="evenodd"
            d={svgPaths.p233700}
            fill="#BD3133"
            fillRule="evenodd"
            id="red-lettering"
          />
        </g>
      </svg>
    </div>
  )
}

export default function Component11V() {
  return (
    <div className="relative size-full" data-name="11v2">
      <Group />
      <Lettering />
    </div>
  )
}
