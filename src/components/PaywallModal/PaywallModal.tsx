import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import LegalAgreement from "@/components/LegalAgreement/LegalAgreement";
import Modal from "@/components/Modal/Modal";
import TransactionIcon from "@/components/TransactionIcon/TransactionIcon";
import { useI18n } from "@/i18n";
import { isValidEmail } from "@/lib/email";
import { createPaymentLink } from "@/lib/payments";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  email: string;
  agreement: boolean;
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

type SubmissionStatus = "idle" | "submitting";

const INITIAL_FORM: FormState = {
  email: "",
  agreement: false,
};

const inputClassName =
  "mt-2 w-full border-b border-hair bg-transparent py-2 font-body text-sm text-cream placeholder:text-muted focus:border-cream focus:outline-none";

const submitClassName =
  "btn-accent w-full px-8 py-4 font-label text-base font-semibold uppercase tracking-[0.15em]";

export default function PaywallModal({ isOpen, onClose }: PaywallModalProps) {
  const { t, messages } = useI18n();
  const titleId = useId();
  const emailErrorId = useId();
  const agreementErrorId = useId();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [requestError, setRequestError] = useState<string | null>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      return;
    }
    if (!hasOpenedRef.current) return;

    setForm(INITIAL_FORM);
    setFieldErrors({});
    setStatus("idle");
    setRequestError(null);
  }, [isOpen]);

  const validateForm = (current: FormState): FieldErrors => {
    const errors: FieldErrors = {};

    if (!current.email.trim()) {
      errors.email = t("paywall.errors.email");
    } else if (!isValidEmail(current.email)) {
      errors.email = t("paywall.errors.emailInvalid");
    }

    if (!current.agreement) {
      errors.agreement = t("paywall.errors.agreement");
    }

    return errors;
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, email: value }));
    if (fieldErrors.email) {
      setFieldErrors((current) => ({ ...current, email: undefined }));
    }
  };

  const handleAgreementChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setForm((current) => ({ ...current, agreement: checked }));
    if (fieldErrors.agreement) {
      setFieldErrors((current) => ({ ...current, agreement: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const errors = validateForm(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("submitting");
    setRequestError(null);

    const result = await createPaymentLink(form.email);

    if (result.ok) {
      window.location.href = result.paymentUrl;
      return;
    }

    setStatus("idle");
    setRequestError(result.message ?? t(`paywall.errors.${result.error}`));
  };

  const isSubmitting = status === "submitting";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleId={titleId}
      canClose={!isSubmitting}
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
        {t("paywall.kicker")}
      </p>
      <h2
        id={titleId}
        className="mt-4 pr-10 font-display uppercase headline text-[clamp(28px,5vw,40px)] text-cream"
      >
        {t("paywall.title")}
      </h2>

      <div className="mt-6 border border-hair bg-panel p-4">
        <div className="flex items-start justify-between gap-4">
          <ul className="space-y-1 font-body text-sm text-muted">
            {messages.paywall.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p
            className="font-display text-[clamp(32px,6vw,48px)] leading-none text-accent"
            aria-label={t("paywall.priceLabel")}
          >
            $45
          </p>
        </div>
        <p className="mt-4 font-label text-xs uppercase tracking-[0.08em] text-cream">
          {t("paywall.terms")}
        </p>
        <p className="mt-2 font-body text-xs text-muted">
          {t("paywall.delivery")}
        </p>
      </div>

      <form className="mt-8 flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
        <label className="block">
          <span className="font-label text-sm uppercase tracking-[0.12em] text-muted">
            {t("paywall.email")}
          </span>
          <p className="mt-1 font-body text-xs text-muted">
            {t("paywall.emailHint")}
          </p>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? emailErrorId : undefined}
            className={inputClassName}
          />
          {fieldErrors.email && (
            <p id={emailErrorId} className="mt-2 font-body text-xs text-accent">
              {fieldErrors.email}
            </p>
          )}
        </label>

        <LegalAgreement
          checked={form.agreement}
          onChange={handleAgreementChange}
          disabled={isSubmitting}
          error={fieldErrors.agreement}
          errorId={agreementErrorId}
        />

        {requestError && (
          <div
            role="alert"
            className="flex items-start gap-3 border border-hair bg-panel p-4"
          >
            <TransactionIcon
              variant="error"
              className="shrink-0 text-cream"
              width={40}
              height={40}
            />
            <p className="font-body text-sm text-cream">{requestError}</p>
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className={submitClassName}>
          {isSubmitting ? t("paywall.processing") : t("paywall.submit")}
        </button>
      </form>

      <p className="mt-4 font-body text-xs text-muted">
        {t("paywall.privacy")}
      </p>
    </Modal>
  );
}
