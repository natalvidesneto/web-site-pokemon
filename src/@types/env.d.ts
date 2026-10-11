/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POKEAPI_URL: string;
  readonly VITE_POKEAPI_PAGE_SIZE: string;
  readonly VITE_POKEAPI_FEATURED_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}