import { lazy, Suspense } from "react"
import useIsDesktop from "@/hooks/useIsDesktop"
import LandingOutline from "@/components/LandingOutline"

// The landing's headlines and body copy are vector artwork, not live text: the
// typography is authored in Figma and exported as SVG outlines, so it renders
// exactly as designed. Desktop and mobile are two distinct compositions with
// their own artwork, and only the matching one is loaded. Because the artwork
// carries no text, `LandingOutline` states the same copy in markup, outside the
// lazily loaded compositions so it is there from the first paint.
const DesktopLanding = lazy(() => import("@/components/DesktopLanding"))
const MobileLanding = lazy(() => import("@/components/MobileLanding"))

export default function Landing({
  onOpenPaywall,
}: {
  onOpenPaywall: () => void
}) {
  const isDesktop = useIsDesktop()

  return (
    <>
      <LandingOutline />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        {isDesktop ? (
          <DesktopLanding onOpenPaywall={onOpenPaywall} />
        ) : (
          <MobileLanding onOpenPaywall={onOpenPaywall} />
        )}
      </Suspense>
    </>
  )
}
