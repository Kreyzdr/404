import {
  LANDING_ANALYTICS_HOST,
  resolvePaymentCreateLinkUrl,
  resolveWebVisitorId,
} from "@/lib/landingAnalytics";
import { getPaymentAttribution } from "@/lib/paymentAttribution";

/** Backend game record: price, currency and return URLs are resolved from it. */
export const PAYMENT_GAME_ID = "79a7471b-e72e-4458-8dd4-619581409477";

/** Captain Labs paywall for 404: Developer Not Found. */
export const PAYMENT_PAYWALL_ID = 879;

export type PaymentErrorCode = "generic" | "missingUrl" | "network";

export type PaymentLinkResult =
  | { ok: true; paymentUrl: string }
  | { ok: false; error: PaymentErrorCode; message?: string };

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value ? value : undefined;
}

function readObject(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : undefined;
}

export async function createPaymentLink(email: string): Promise<PaymentLinkResult> {
  const { vid, from } = getPaymentAttribution();

  try {
    const response = await fetch(resolvePaymentCreateLinkUrl(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        game_id: PAYMENT_GAME_ID,
        paywall_id: PAYMENT_PAYWALL_ID,
        vid: vid || resolveWebVisitorId(),
        from: from || LANDING_ANALYTICS_HOST,
      }),
    });

    const data = readObject(await response.json().catch(() => null));

    if (!response.ok || data?.status === false) {
      return {
        ok: false,
        error: "generic",
        message: readString(data?.message) ?? readString(data?.error),
      };
    }

    const nested = readObject(data?.data);

    const paymentUrl =
      readString(nested?.checkout_url) ??
      readString(nested?.url) ??
      readString(nested?.link) ??
      readString(data?.checkout_url) ??
      readString(data?.url) ??
      readString(data?.link) ??
      readString(data?.payment_url) ??
      readString(data?.paymentUrl);

    if (!paymentUrl) {
      return { ok: false, error: "missingUrl" };
    }

    return { ok: true, paymentUrl };
  } catch {
    return { ok: false, error: "network" };
  }
}
