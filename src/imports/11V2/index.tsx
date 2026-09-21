import Artwork from "@/components/Artwork"
import useArtworkAlts from "@/hooks/useArtworkAlts"
import artFaq from "@/assets/artwork/mobile-faq.svg"

export default function Component11V() {
  const alts = useArtworkAlts()

  return (
    <div className="relative size-full" data-name="11v2">
      <div className="absolute bg-black h-[844px] left-0 top-0 w-[390px]" />
      <div
        className="absolute inset-[8.41%_10.77%_57.74%_10.77%]"
        data-name="lettering"
      >
        <Artwork
          src={artFaq}
          alt={alts.faq}
          className="absolute inset-0 block size-full object-fill"
        />
      </div>
    </div>
  )
}
