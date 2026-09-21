import { lazy, Suspense } from "react"
import useIsDesktop from "@/hooks/useIsDesktop"

// The landing's headlines are vector artwork served as images. The transcribed
// copy lives in each image's `alt`, localized from `page.*`. Desktop and mobile
// are two distinct compositions; only the matching one is loaded.
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
