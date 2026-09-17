import { useEffect, useRef, useState } from "react";

import { TITLE_PATHS, useI18n } from "@/i18n";
import { stripLocalePrefix } from "@/i18n/localePath";
import {
  isDocumentPathname,
  isLandingPathname,
  readLandingReturnState,
  restoreLandingScroll,
  saveLandingReturnState,
} from "@/lib/landingReturn";
import { SITE_URL } from "@/lib/site";

export interface AppLocation {
  pathname: string;
  hash: string;
}

function readLocation(): AppLocation {
  return {
    pathname: window.location.pathname,
    hash: window.location.hash,
  };
}

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname || "/";
}

function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function useAppLocation() {
  const { t, localizeHref } = useI18n();
  const [location, setLocation] = useState<AppLocation>(readLocation);
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setLocation(readLocation());
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }
      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("mailto:")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      const currentPath = stripLocalePrefix(
        normalizePathname(window.location.pathname),
      ).pathname;
      const next = localizeHref(`${url.pathname}${url.search}${url.hash}`);
      const parsed = new URL(next, window.location.origin);
      const nextPath = stripLocalePrefix(
        normalizePathname(parsed.pathname),
      ).pathname;
      if (isLandingPathname(currentPath) && !isLandingPathname(nextPath)) {
        saveLandingReturnState();
      }
      window.history.pushState(null, "", next);
      setLocation({ pathname: parsed.pathname, hash: parsed.hash });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [localizeHref]);

  useEffect(() => {
    const previousPath = stripLocalePrefix(
      normalizePathname(previousPathRef.current),
    ).pathname;
    const currentPath = stripLocalePrefix(
      normalizePathname(location.pathname),
    ).pathname;

    const frame = window.requestAnimationFrame(() => {
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ block: "start" });
          previousPathRef.current = location.pathname;
          return;
        }
      }

      if (
        isLandingPathname(currentPath) &&
        !location.hash &&
        (readLandingReturnState() || isDocumentPathname(previousPath))
      ) {
        restoreLandingScroll({
          fromDocumentPage: isDocumentPathname(previousPath),
        });
        previousPathRef.current = location.pathname;
        return;
      }

      window.scrollTo(0, 0);
      previousPathRef.current = location.pathname;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  // Client-side routing swaps the page without a document load, so the tags a
  // crawler or a share preview reads have to be kept in step with the route.
  useEffect(() => {
    const normalized = normalizePathname(location.pathname);
    const titleKey = TITLE_PATHS[stripLocalePrefix(normalized).pathname];
    document.title = titleKey ? t(titleKey) : t("meta.landingTitle");

    const url = `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  }, [location.pathname, t]);

  return {
    location,
    pathname: stripLocalePrefix(normalizePathname(location.pathname)).pathname,
  };
}
