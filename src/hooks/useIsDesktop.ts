import { useEffect, useState } from "react"

// The landing exists as two separate compositions — a 1440px editorial desktop
// canvas and a 390px poster sequence — and each one carries its own SVG
// typography. Only the matching one is mounted, so the in-page anchors stay
// unique and the other composition's vector data is never loaded.
const DESKTOP_QUERY = "(min-width: 1024px)"

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isDesktop
}
