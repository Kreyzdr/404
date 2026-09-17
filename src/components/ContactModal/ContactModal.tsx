import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import LegalAgreement from "@/components/LegalAgreement/LegalAgreement";
import Modal from "@/components/Modal/Modal";
import TransactionIcon from "@/components/TransactionIcon/TransactionIcon";
import { useI18n } from "@/i18n";
import { isValidEmail } from "@/lib/email";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
  agreement: boolean;
}

type AlertState = {
  type: "success" | "error";
  message: string;
} | null;

type FieldErrors = Partial<Record<keyof FormState, string>>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitUrl: string;
  subject: string;
  source: string;
}

interface ContactCallbackResponse {
  ok?: boolean;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
  agreement: false,
};

const inputClassName =
  "mt-2 w-full border-b border-hair bg-transparent py-2 font-body text-sm text-cream placeholder:text-muted focus:border-cream focus:outline-none";

const submitClassName =
  "btn-accent w-full px-8 py-4 font-label text-base font-semibold uppercase tracking-[0.15em]";

export default function ContactModal({
  isOpen,
  onClose,
  submitUrl,
  subject,
  source,
}: ContactModalProps) {
  const { t } = useI18n();
  const titleId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();
  const agreementErrorId = useId();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [alert, setAlert] = useState<AlertState>(null);
  const isOpenRef = useRef(isOpen);
  const hasOpenedRef = useRef(false);

  isOpenRef.current = isOpen;

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      return;
    }
    if (!hasOpenedRef.current) return;

    setForm(INITIAL_FORM);
    setFieldErrors({});
    setStatus("idle");
    setAlert(null);
  }, [isOpen]);

  const validateForm = (current: FormState): FieldErrors => {
    const errors: FieldErrors = {};

    if (!current.name.trim()) {
      errors.name = t("contact.errors.name");
    }

    if (!current.email.trim()) {
      errors.email = t("contact.errors.email");
    } else if (!isValidEmail(current.email)) {
      errors.email = t("contact.errors.emailInvalid");
    }

    if (!current.message.trim()) {
      errors.message = t("contact.errors.message");
    }

    if (!current.agreement) {
      errors.agreement = t("contact.errors.agreement");
    }

    return errors;
  };

  const handleTextChange =
    (field: "name" | "email" | "message") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setForm((current) => ({ ...current, [field]: value }));
      if (fieldErrors[field]) {
        setFieldErrors((current) => ({ ...current, [field]: undefined }));
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
    setAlert(null);

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method: "contact-us",
          subject,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          source,
        }),
      });

      const data = (await response
        .json()
        .catch(() => null)) as ContactCallbackResponse | null;

      if (!isOpenRef.current) return;

      if (data?.ok !== true) {
        setStatus("error");
        setAlert({
          type: "error",
          message: t("contact.error"),
        });
        return;
      }

      setStatus("success");
      setAlert({
        type: "success",
        message: t("contact.success"),
      });
    } catch {
      if (!isOpenRef.current) return;
      setStatus("error");
      setAlert({
        type: "error",
        message: t("contact.error"),
      });
    }
  };

  const isSubmitting = status === "submitting";
  const showSuccess = status === "success" && alert?.type === "success";

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId={titleId}>
      {showSuccess ? (
        <div className="flex flex-col items-center px-2 py-6 text-center">
          <TransactionIcon
            variant="success"
            className="text-cream"
            width={72}
            height={72}
          />
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            {t("contact.sentKicker")}
          </p>
          <h2
            id={titleId}
            className="mt-4 font-display uppercase headline text-[clamp(32px,6vw,48px)] text-cream"
          >
            {t("contact.sentTitle")}
          </h2>
          <p className="mt-4 max-w-sm font-body text-sm text-muted">
            {alert.message}
          </p>
          <button type="button" onClick={onClose} className={`${submitClassName} mt-8`}>
            {t("contact.close")}
          </button>
        </div>
      ) : (
        <>
          <h2
            id={titleId}
            className="pr-10 font-display uppercase headline text-[clamp(32px,6vw,48px)] text-cream"
          >
            {t("contact.title")}
          </h2>

          <form className="mt-8 flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
            <label className="block">
              <span className="font-label text-sm uppercase tracking-[0.12em] text-muted">
                {t("contact.name")}
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleTextChange("name")}
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? nameErrorId : undefined}
                className={inputClassName}
              />
              {fieldErrors.name && (
                <p id={nameErrorId} className="mt-2 font-body text-xs text-accent">
                  {fieldErrors.name}
                </p>
              )}
            </label>

            <label className="block">
              <span className="font-label text-sm uppercase tracking-[0.12em] text-muted">
                {t("contact.email")}
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleTextChange("email")}
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

            <label className="block">
              <span className="font-label text-sm uppercase tracking-[0.12em] text-muted">
                {t("contact.message")}
              </span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleTextChange("message")}
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? messageErrorId : undefined}
                className={`${inputClassName} resize-none`}
              />
              {fieldErrors.message && (
                <p id={messageErrorId} className="mt-2 font-body text-xs text-accent">
                  {fieldErrors.message}
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

            {alert?.type === "error" && (
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
                <p className="font-body text-sm text-cream">{alert.message}</p>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className={submitClassName}>
              {isSubmitting ? t("contact.sending") : t("contact.submit")}
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
