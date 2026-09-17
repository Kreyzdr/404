function trimSlash(value: string) {
  return value.replace(/\/$/, "");
}

const DEFAULT_HTTP = "https://dev-games.epilogic.studio";
const DEFAULT_WS = "wss://dev-games.epilogic.studio";
const DEFAULT_BOT_ID = "812e1c5b-4609-4fa5-bb64-f3a2e05bca12";

const httpFromEnv = (import.meta.env.VITE_PROMO_API_HTTP || "").trim();
const wsFromEnv = (import.meta.env.VITE_PROMO_API_WS || "").trim();
const botIdFromEnv = (import.meta.env.VITE_BOT_ID || "").trim();

export const chatConfig = {
  httpBase: trimSlash(httpFromEnv || DEFAULT_HTTP),
  wsBase: trimSlash(
    wsFromEnv ||
      (httpFromEnv ? httpFromEnv.replace(/^http/, "ws") : "") ||
      DEFAULT_WS,
  ),
  botId: botIdFromEnv || DEFAULT_BOT_ID,
  messageLimit: 10,
};

export function simpleBotsHttpBase() {
  return `${chatConfig.httpBase}/api/v1/simple-bots`;
}

export function simpleBotsWsUrl(threadId: string) {
  return `${chatConfig.wsBase}/api/v1/simple-bots/threads/${encodeURIComponent(threadId)}/chat`;
}
