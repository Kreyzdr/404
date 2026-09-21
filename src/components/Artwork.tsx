import type { CSSProperties } from "react"

// Landing lettering is vector artwork served as an image. The `alt` is the
// transcribed copy of that picture, which is what crawlers and screen readers
// read. Accent overlays that complete a headline already named on a sibling
// image pass `alt=""`.
export default function Artwork({
  src,
  alt,
  className,
  style,
}: {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      draggable={false}
    />
  )
}
