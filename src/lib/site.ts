/** Canonical origin. Used for canonical / og:url, which must point at the
    public site even when the app is served from a preview host. */
export const SITE_URL = "https://developer-not-found-404.epilogic.studio";

export const CONTACT_URL = import.meta.env.DEV
  ? "/api/v1/callback"
  : "https://epilogic.studio/api/v1/callback";
export const CONTACT_FORM_SUBJECT = "404: Creator Not Found contact form inquiry";
/** The callback API validates this against a fixed allowlist, so it stays
    "404-creator-not-found.epilogic.studio" regardless of the public domain. */
export const CONTACT_FORM_SOURCE = "404-creator-not-found.epilogic.studio";
export const STUDIO_URL = "https://epilogic.studio/";
