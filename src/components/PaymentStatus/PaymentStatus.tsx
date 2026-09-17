import { useI18n } from "@/i18n"
import TransactionIcon from "@/components/TransactionIcon/TransactionIcon"

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
        href={localizeHref("/")}
        className="btn-accent mt-10 px-8 py-4 font-label text-base font-semibold uppercase tracking-[0.15em]"
      >
        {t("payment.back")}
      </a>
    </div>
  )
}
