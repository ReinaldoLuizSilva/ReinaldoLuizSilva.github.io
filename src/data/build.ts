// Build metadata for the versioned footer. deploy.yml injects these variables;
// local and PR builds have none, and the footer then shows "local build".

export const repoUrl = 'https://github.com/ReinaldoLuizSilva/ReinaldoLuizSilva.github.io';

const sha = import.meta.env.PUBLIC_BUILD_SHA;
const runUrl = import.meta.env.PUBLIC_BUILD_RUN_URL;
const builtAt = new Date();

export interface BuildInfo {
  shortSha: string;
  commitUrl: string;
  runUrl: string;
}

export const build: BuildInfo | undefined =
  sha && runUrl
    ? { shortSha: sha.slice(0, 7), commitUrl: `${repoUrl}/commit/${sha}`, runUrl }
    : undefined;

/** Build date in UTC, ISO format (YYYY-MM-DD). */
export const buildDate = builtAt.toISOString().slice(0, 10);
export const buildYear = builtAt.getUTCFullYear();
