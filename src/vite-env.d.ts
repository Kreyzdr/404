/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROMO_API_HTTP?: string;
  readonly VITE_PROMO_API_WS?: string;
  readonly VITE_BOT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*?raw" {
  const content: string;
  export default content;
}
