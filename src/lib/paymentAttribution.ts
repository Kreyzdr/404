export interface PaymentAttribution {
  vid?: string;
  from?: string;
}

const STORAGE_KEY = "payment-attribution";

function readStoredAttribution(): PaymentAttribution {
  try {
    const storedValue = window.sessionStorage.getItem(STORAGE_KEY);
    if (!storedValue) return {};

    const parsed: unknown = JSON.parse(storedValue);
    if (!parsed || typeof parsed !== "object") return {};

    const stored = parsed as Record<string, unknown>;

    return {
      vid: typeof stored.vid === "string" ? stored.vid : undefined,
      from: typeof stored.from === "string" ? stored.from : undefined,
    };
  } catch {
    return {};
  }
}

let attribution: PaymentAttribution =
  typeof window === "undefined" ? {} : readStoredAttribution();

export function capturePaymentAttribution(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const hasVid = url.searchParams.has("vid");
  const hasFrom = url.searchParams.has("from");

  if (!hasVid && !hasFrom) return;

  attribution = {
    vid: hasVid ? (url.searchParams.get("vid") ?? "") : undefined,
    from: hasFrom ? (url.searchParams.get("from") ?? "") : undefined,
  };

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Values stay in memory until the page is reloaded.
  }

  url.searchParams.delete("vid");
  url.searchParams.delete("from");
  window.history.replaceState(
    window.history.state,
    "",
    `${url.pathname}${url.search}${url.hash}`,
  );
}

export function getPaymentAttribution(): PaymentAttribution {
  return attribution;
}
