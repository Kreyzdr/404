import type { CSSProperties, ReactNode } from "react";

const URL_PATTERN = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;

const LINK_STYLE: CSSProperties = {
  color: "inherit",
  fontWeight: 500,
  textDecoration: "underline",
  textUnderlineOffset: "2px",
};

function formatLinkLabel(href: string): string {
  try {
    const hasScheme = /^https?:\/\//i.test(href);
    const url = new URL(hasScheme ? href : `https://${href}`);
    if (hasScheme) {
      return `${url.protocol}//${url.host}${url.pathname}`;
    }
    return `${url.host}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return href.replace(/[?#].*$/, "");
  }
}

function toHref(raw: string): string {
  return raw.startsWith("www.") ? `https://${raw}` : raw;
}

export function linkifyText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(URL_PATTERN.source, URL_PATTERN.flags);

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const raw = match[0];
    const trailing = raw.match(/[.,;:!?)\]}>]+$/)?.[0] ?? "";
    const hrefText = trailing ? raw.slice(0, -trailing.length) : raw;
    const href = toHref(hrefText);
    nodes.push(
      <a
        key={`link-${match.index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={LINK_STYLE}
      >
        {formatLinkLabel(hrefText)}
      </a>,
    );
    if (trailing) {
      nodes.push(trailing);
    }
    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}
