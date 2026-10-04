/// <reference types="vite/client" />

/** Google tag (gtag.js) — carregado após load/idle via src/lib/gtag.ts */
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  requestIdleCallback?: (
    callback: (deadline: { didTimeout: boolean; timeRemaining: () => number }) => void,
    opts?: { timeout?: number },
  ) => number;
}

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
