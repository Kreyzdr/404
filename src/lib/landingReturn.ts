const STORAGE_KEY = "c404-landing-return";

export const LANDING_FOOTER_ID = "site-footer";

const DOCUMENT_PATHS = new Set([
  "/terms",
  "/privacy-policy",
  "/refund-policy",
]);

export interface LandingReturnState {
  scrollY: number;
  hash: string;
}

export function isLandingPathname(pathname: string): boolean {
  return pathname === "/";
}

export function isDocumentPathname(pathname: string): boolean {
  return DOCUMENT_PATHS.has(pathname);
}

export function saveLandingReturnState(): void {
  try {
    const state: LandingReturnState = {
      scrollY: window.scrollY,
      hash: window.location.hash,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sessionStorage may be unavailable
  }
}

export function readLandingReturnState(): LandingReturnState | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LandingReturnState;
    if (typeof parsed.scrollY !== "number") return null;
    return {
      scrollY: parsed.scrollY,
      hash: typeof parsed.hash === "string" ? parsed.hash : "",
    };
  } catch {
    return null;
  }
}

export function clearLandingReturnState(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function scrollToElementId(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) return false;
  element.scrollIntoView({ block: "start" });
  return true;
}

function scrollToY(targetY: number, attempt = 0): void {
  const maxAttempts = 40;
  const docHeight = document.documentElement.scrollHeight;
  const canReach =
    targetY <= 0 ||
    docHeight >= targetY + window.innerHeight * 0.5 ||
    attempt >= maxAttempts;

  if (canReach) {
    window.scrollTo(0, targetY);
    return;
  }

  requestAnimationFrame(() => scrollToY(targetY, attempt + 1));
}

/** Restore landing scroll after client navigation back from legal pages. */
export function restoreLandingScroll(options: {
  fromDocumentPage: boolean;
}): void {
  const saved = readLandingReturnState();
  if (saved) {
    clearLandingReturnState();
    if (saved.hash) {
      const id = decodeURIComponent(saved.hash.slice(1));
      if (scrollToElementId(id)) return;
    }
    if (saved.scrollY > 0) {
      scrollToY(saved.scrollY);
      return;
    }
  }

  if (options.fromDocumentPage) {
    scrollToElementId(LANDING_FOOTER_ID);
  }
}
