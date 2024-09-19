/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
    readonly BASE_PATH: string;
    readonly SITE_URL: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
  }