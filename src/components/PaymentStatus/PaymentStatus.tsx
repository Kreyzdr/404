import { useI18n } from "@/i18n"
import TransactionIcon from "@/components/TransactionIcon/TransactionIcon"
import { SITE_URL } from "@/lib/site"

interface PaymentStatusProps {
  variant: "success" | "error"
}

export default function PaymentStatus({ variant }: PaymentStatusProps) {
  const { t, localizeHref } = useI18n()
  const isSuccess = variant === "success"

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-ink px-6 py-16 text-center text-cream">
      <TransactionIcon
        variant={variant}
        className="text-cream"
        width={72}
        height={72}
      />
      <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        {isSuccess ? t("payment.successKicker") : t("payment.errorKicker")}
      </p>
      <h1 className="mt-4 font-display uppercase headline text-[clamp(40px,8vw,72px)]">
        {isSuccess ? t("payment.successTitle") : t("payment.errorTitle")}
      </h1>
      <a
        href={isSuccess ? `${SITE_URL}/` : localizeHref("/")}
        className="btn-accent mt-10 px-8 py-4 font-label text-base font-semibold uppercase tracking-[0.15em]"
      >
        {t("payment.back")}
      </a>
      <button
        type="button"
        onClick={() => window.openCookieSettings()}
        className="mt-8 cursor-pointer border-0 bg-transparent p-0 font-label text-xs uppercase tracking-[0.16em] text-cream/55 underline-offset-4 hover:text-cream hover:underline"
      >
        {t("footer.cookieSettings")}
      </button>
    </div>
  )
}
