import { getMarketingAttribution } from "@/lib/marketingAttribution";

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
  return "https://games.epilogic.studio";
}

export function resolvePaymentCreateLinkUrl(): string {
  return `${resolveApiBase()}/api/v1/payments/create-link`;
}

function resolveStatisticsActionsUrl(): string {
  return `${resolveApiBase()}/api/v1/statistics/actions`;
}

export function resolveWebVisitorId(): string {
  return getMarketingAttribution().vid;
}

function trackLandingAction(
  actionName: "landing_visit" | "landing_buy_click",
): void {
  if (typeof window === "undefined") return;

  const attribution = getMarketingAttribution();
  const url = resolveStatisticsActionsUrl();
  const body = JSON.stringify({
    action_name: actionName,
    web_visitor_id: attribution.vid,
    from: attribution.src,
    utm_source: attribution.utm_source,
    utm_campaign: attribution.utm_campaign,
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

export function trackLandingVisit(): void {
  trackLandingAction("landing_visit");
}

export function trackLandingBuyClick(): void {
  trackLandingAction("landing_buy_click");
}
