import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

/**
 * Fits one imported Figma frame (natively authored at `baseWidth` x `height`)
 * into a single viewport-tall slot, so exactly one screen is in view at a time.
 * The frame is scaled with a "contain" fit — `min(widthScale, heightScale)`,
 * capped by `maxScale` — and centred in the slot, so the artwork is never
 * cropped, never distorted, and never upscaled past its native size: taller
 * viewports get black bands above and below instead of stretched vectors.
 * Every screen uses the same slot, which is what keeps the vertical rhythm
 * identical across the whole page.
 *
 * `overlay` is rendered inside the scaled box (not the slot), so interactive
 * elements positioned in percentages of the frame still line up.
 */
export default function ViewportFrame({
  height,
  children,
  overlay,
  id,
  baseWidth = 390,
  maxScale = Infinity,
}: {
  height: number
  children: ReactNode
  overlay?: ReactNode
  id?: string
  baseWidth?: number
  maxScale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height: slotHeight } = entries[0].contentRect
      setSize({ width, height: slotHeight })
    })
    ro.observe(el)
    setSize({ width: el.clientWidth, height: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  const scale =
    size.width > 0 && size.height > 0
      ? Math.min(size.width / baseWidth, size.height / height, maxScale)
      : 0

  return (
    <div
      ref={ref}
      id={id}
      className="relative flex w-full items-center justify-center overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      <div
        className="relative"
        style={{
          width: scale > 0 ? baseWidth * scale : baseWidth,
          height: scale > 0 ? height * scale : height,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: baseWidth,
            height,
            transform: `scale(${scale})`,
            visibility: scale > 0 ? undefined : "hidden",
          }}
        >
          {children}
        </div>
        {overlay}
      </div>
    </div>
  )
}
