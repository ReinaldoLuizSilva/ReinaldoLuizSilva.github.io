interface ImportMetaEnv {
  /** Full commit SHA of the deployed build (set by deploy.yml). */
  readonly PUBLIC_BUILD_SHA?: string;
  /** URL of the CI run that verified the deployed commit (set by deploy.yml). */
  readonly PUBLIC_BUILD_RUN_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
