/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly BASE_PATH: string;
    readonly SITE_URL: string;
    readonly API_KEY: string;
    readonly CRYPTO_KEY: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
  }