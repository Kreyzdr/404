import { useI18n } from "@/i18n"

// Every scene illustration on the landing goes through here, so its alternative
// text comes from the locale catalog instead of being left empty. The imported
// Figma frames render their imagery with this component for the same reason.
export type SceneName = "dominic" | "corporation" | "missing" | "externalSystems" | "mediaFiles" | "chat" | "notForYou" | "characters" | "quests" | "immersion"

export default function SceneImage({
  scene,
  src,
  className,
}: {
  scene: SceneName
  src: string
  className?: string
}) {
  const { messages } = useI18n()

  return <img alt={messages.scenes[scene]} className={className} src={src} />
}
