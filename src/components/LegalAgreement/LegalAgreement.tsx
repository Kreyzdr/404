import type { ChangeEvent } from "react";

import { useI18n } from "@/i18n";

interface LegalAgreementProps {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  errorId?: string;
}

export default function LegalAgreement({
  checked,
  onChange,
  disabled,
  error,
  errorId,
}: LegalAgreementProps) {
  const { t, localizeHref } = useI18n();

  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          name="agreement"
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="sr-only"
        />
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-cream"
        >
          {checked && <span className="h-2.5 w-2.5 bg-accent" />}
        </span>
        <span className="font-label text-xs uppercase tracking-[0.08em] text-muted">
          {t("legal.agreeLead")}{" "}
          <a
            href={localizeHref("/terms")}
            className="text-cream underline underline-offset-2 transition-colors hover:text-muted"
          >
            {t("legal.terms")}
          </a>{" "}
          {t("legal.agreeMid")}{" "}
          <a
            href={localizeHref("/privacy-policy")}
            className="text-cream underline underline-offset-2 transition-colors hover:text-muted"
          >
            {t("legal.privacy")}
          </a>
          .
        </span>
      </label>
      {error && (
        <p id={errorId} className="mt-2 font-body text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
