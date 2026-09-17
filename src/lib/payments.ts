import {
  LANDING_ANALYTICS_HOST,
  resolvePaymentCreateLinkUrl,
  resolveWebVisitorId,
} from "@/lib/landingAnalytics";
import { getPaymentAttribution } from "@/lib/paymentAttribution";

/** Backend game record: price, currency and return URLs are resolved from it. */
export const PAYMENT_GAME_ID = "db7a4e9e-ca44-4dc9-abdb-f42d5c46cc8b";

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
