import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artHero from "@/assets/artwork/mobile-hero.svg"

export default function Component1V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="1v2">
      <Artwork
        src={artHero}
        alt={alts.hero}
        className="absolute inset-0 block size-full object-fill"
      />
    </div>
  )
}
