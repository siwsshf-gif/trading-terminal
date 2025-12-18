/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRICE_HTTP_URL: string;
  readonly VITE_PRICE_WS_URL: string;
  // agrega aquí otras variables VITE_ que uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
