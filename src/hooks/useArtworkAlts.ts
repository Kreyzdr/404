import { useI18n } from "@/i18n"

function plain(text: string) {
  return text.replace(/\*/g, "")
}

function join(parts: readonly string[]) {
  return parts.join(" ")
}

// Alt copy for landing artwork. The headlines are images, so this is the
// machine-readable text of each picture, localized from `page.*`.
export default function useArtworkAlts() {
  const { messages } = useI18n()
  const page = messages.page

  const challenge = plain(page.challengeTitle)
  const bigTech = plain(page.bigTechTitle)
  const characters = plain(page.charactersTitle)
  const quests = plain(page.questsTitle)
  const immersion = plain(page.immersionTitle)

  return {
    hero: `${plain(page.heroKicker)} ${plain(page.heroTitle)}. ${page.heroTagline}`,
    challenge,
    challengeFrame: `${challenge}. ${join(page.challengeBody)}`,
    bigTech,
    bigTechFrame: `${bigTech}. ${join(page.bigTechBody)}`,
    missing: plain(page.missingTitle),
    missingBody: page.missingBody,
    investigate: plain(page.investigateTitle),
    investigate1: page.investigate[0],
    investigate2: page.investigate[1],
    investigate3: page.investigate[2],
    notForYou: plain(page.notForYouTitle),
    notForYouItems: page.notForYouItems.join(". "),
    characters,
    charactersFrame: `${characters}. ${join(page.charactersBody)}`,
    quests,
    questsItems: page.questsItems.join(", "),
    questsFrame: `${quests}. ${page.questsItems.join(", ")}`,
    immersion,
    immersionFrame: `${immersion}. ${join(page.immersionBody)}`,
    pricing: plain(page.pricingTitle),
    price: plain(page.price),
    benefits: page.pricingBenefits,
    faq: plain(page.faqTitle),
    ctaSearch: page.ctaSearch,
    ctaReady: page.ctaReady,
    ctaBuy: page.ctaBuy,
  }
}
