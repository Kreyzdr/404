export interface MarketingAttribution {
  vid: string;
  src: string;
  utm_source: string | null;
  utm_campaign: string | null;
}

const ATTRIBUTION_COOKIE = "marketing_attribution";
const VISITOR_COOKIE = "c404_landing_visitor_id";
const LEGACY_VISITOR_STORAGE_KEY = "c404-landing-visitor-id";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
const SHARED_COOKIE_DOMAIN = ".epilogic.studio";

let cachedAttribution: MarketingAttribution | undefined;

function readCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie?.slice(prefix.length);
}

function cookieDomain(hostname: string): string | undefined {
  const rootDomain = SHARED_COOKIE_DOMAIN.slice(1);
  return hostname === rootDomain || hostname.endsWith(SHARED_COOKIE_DOMAIN)
    ? SHARED_COOKIE_DOMAIN
    : undefined;
}

function writeCookie(name: string, value: string): void {
  const domain = cookieDomain(window.location.hostname);
  const attributes = [
    `${name}=${encodeURIComponent(value)}`,
    `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
    "Path=/",
    "SameSite=Lax",
    "Secure",
  ];

  if (domain) attributes.push(`Domain=${domain}`);
  document.cookie = attributes.join("; ");
}

function nonEmpty(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function nullableString(value: unknown): string | null {
  return nonEmpty(value) ?? null;
}

function parseAttribution(value: string | undefined): MarketingAttribution | undefined {
  if (!value) return undefined;

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(value));
    if (!parsed || typeof parsed !== "object") return undefined;

    const record = parsed as Record<string, unknown>;
    const vid = nonEmpty(record.vid);
    const src = nonEmpty(record.src);
    if (!vid || !src) return undefined;

    return {
      vid,
      src,
      utm_source: nullableString(record.utm_source),
      utm_campaign: nullableString(record.utm_campaign),
    };
  } catch {
    return undefined;
  }
}

function createVisitorId(): string {
  return crypto.randomUUID();
}

function existingVisitorId(): string | undefined {
  const fromCookie = readCookie(VISITOR_COOKIE);
  if (fromCookie) {
    try {
      return nonEmpty(decodeURIComponent(fromCookie));
    } catch {
      // Ignore a malformed visitor cookie and try the legacy storage value.
    }
  }

  try {
    return nonEmpty(window.localStorage.getItem(LEGACY_VISITOR_STORAGE_KEY));
  } catch {
    return undefined;
  }
}

function persistVisitorId(vid: string): void {
  writeCookie(VISITOR_COOKIE, vid);

  // Keep the previous landing identifier in sync for older deployed bundles.
  try {
    window.localStorage.setItem(LEGACY_VISITOR_STORAGE_KEY, vid);
  } catch {
    // Cookie persistence is the canonical storage.
  }
}

/**
 * Returns immutable first-touch attribution. Query parameters are read only
 * when no valid marketing_attribution cookie exists.
 */
export function getMarketingAttribution(): MarketingAttribution {
  if (cachedAttribution) return cachedAttribution;

  const stored = parseAttribution(readCookie(ATTRIBUTION_COOKIE));
  if (stored) {
    persistVisitorId(stored.vid);
    cachedAttribution = stored;
    return stored;
  }

  const query = new URLSearchParams(window.location.search);
  const vid = nonEmpty(query.get("vid")) ?? existingVisitorId() ?? createVisitorId();
  const attribution: MarketingAttribution = {
    vid,
    src: nonEmpty(query.get("src")) ?? window.location.hostname,
    utm_source: nullableString(query.get("utm_source")),
    utm_campaign: nullableString(query.get("utm_campaign")),
  };

  persistVisitorId(vid);
  writeCookie(ATTRIBUTION_COOKIE, JSON.stringify(attribution));
  cachedAttribution = attribution;
  return attribution;
}

/** Builds an application invite URL with all non-empty first-touch values. */
export function buildInviteUrl(inviteKey: string): string {
  const attribution = getMarketingAttribution();
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(attribution)) {
    if (value) query.set(key, value);
  }

  return `/play/${encodeURIComponent(inviteKey)}?${query.toString()}`;
}
