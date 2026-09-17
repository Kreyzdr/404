import { getPaymentAttribution } from "@/lib/paymentAttribution";

/** Canonical landing host used in backend statistics, never localhost. The
    backend keys existing stats on this value, so it is not the public domain. */
export const LANDING_ANALYTICS_HOST = "404-creator-not-found.epilogic.studio";

const PROD_WARMING_ID = "09d1afed-e972-4a7c-836a-3dee554e0bc2";
const LOCAL_WARMING_ID = "e281b3ca-e13f-4cdc-8d70-bb1bd0f0e639";

const VISITOR_STORAGE_KEY = "c404-landing-visitor-id";

function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

function isLocalEnvironment(): boolean {
  return typeof window !== "undefined" && isLocalHost(window.location.hostname);
}

function resolveApiBase(): string {
  if (isLocalEnvironment()) {
    return "http://127.0.0.1:3001";
  }
  return "https://dev-games.epilogic.studio";
}

export function resolvePaymentCreateLinkUrl(): string {
  return `${resolveApiBase()}/api/v1/payments/create-link`;
}

function resolveWarmingId(): string {
  return isLocalEnvironment() ? LOCAL_WARMING_ID : PROD_WARMING_ID;
}

function createVisitorId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `v-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Stable browser id: vid handed over by the chat, or a locally persisted one. */
export function resolveWebVisitorId(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const { vid } = getPaymentAttribution();
  if (vid) return vid;

  try {
    const stored = window.localStorage.getItem(VISITOR_STORAGE_KEY);
    if (stored) return stored;

    const created = createVisitorId();
    window.localStorage.setItem(VISITOR_STORAGE_KEY, created);
    return created;
  } catch {
    return undefined;
  }
}

export function trackLandingBuyClick(): void {
  if (typeof window === "undefined") return;

  const url = `${resolveApiBase()}/api/v1/warmings/actions`;
  const body = JSON.stringify({
    action_name: "landing_buy_click",
    warming_id: resolveWarmingId(),
    from: LANDING_ANALYTICS_HOST,
    web_visitor_id: resolveWebVisitorId(),
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      return;
    }
  } catch {
    // Fall through to fetch.
  }

  void fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {});
}
