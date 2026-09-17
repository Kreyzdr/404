import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

/**
 * Renders an imported Figma frame (natively authored at `baseWidth` px wide)
 * verbatim, scaling the whole baseWidth x `height` canvas proportionally to
 * fill the available width. This preserves every original SVG path, viewBox,
 * and internal composition exactly — only the overall scale changes, never the
 * artwork. `maxScale` caps upscaling (used by the 1440px desktop canvas so it
 * renders at native size on large screens and only scales down below that).
 */
export default function FrameScaler({
  height,
  children,
  baseWidth = 390,
  maxScale = Infinity,
}: {
  height: number
  children: ReactNode
  baseWidth?: number
  maxScale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
    })
    ro.observe(el)
    setWidth(el.clientWidth)
    return () => ro.disconnect()
  }, [])

  const scale = width > 0 ? Math.min(width / baseWidth, maxScale) : 0

  // Once `maxScale` caps the scale, the canvas is narrower than the container,
  // so it is offset to sit in the middle instead of hugging the left edge. The
  // offset is measured against the scaled width, since `origin-top-left` keeps
  // the untransformed box at `baseWidth`.
  const offsetX = Math.max(0, (width - baseWidth * scale) / 2)

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        height: scale > 0 ? height * scale : "auto",
        aspectRatio: scale > 0 ? undefined : `${baseWidth} / ${height}`,
      }}
    >
      <div
        className="absolute top-0 origin-top-left"
        style={{
          width: baseWidth,
          height,
          transform: `scale(${scale})`,
          left: offsetX,
        }}
      >
        {children}
      </div>
    </div>
  )
}
