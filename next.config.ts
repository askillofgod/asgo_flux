import type { NextConfig } from "next";

/**
 * 정적보내기 → `npm run build` 시 `out/` 생성 (Cloudflare Pages 출력 디렉터리: out)
 *
 * - Cloudflare Pages(pages.dev 루트): `GITHUB_ACTIONS`를 설정하지 말 것. `basePath`는 빈 문자열.
 * - GitHub Pages(서브경로): CI에서 `GITHUB_ACTIONS=true` + `NEXT_PUBLIC_BASE_PATH` 로 서브경로 맞춤.
 */
const isGitHubPagesDeploy = process.env.GITHUB_ACTIONS === "true";
const githubPagesBasePath =
  (process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "/asgoflux");

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPagesDeploy ? githubPagesBasePath : "",
  assetPrefix: isGitHubPagesDeploy ? `${githubPagesBasePath}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
