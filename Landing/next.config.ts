import type { NextConfig } from "next";
import path from "node:path";

/**
 * 기본은 정적 export.
 *
 * - GitHub Pages 서브경로 배포: CI에서 `GITHUB_ACTIONS=true` 와
 *   `NEXT_PUBLIC_BASE_PATH=/asgoflux/landing` 을 함께 설정하면
 *   해당 경로 prefix 로 빌드됩니다.
 * - Cloudflare Pages 등 루트 배포에서는 환경변수를 비워두면 됩니다.
 */
const isGitHubPagesDeploy = process.env.GITHUB_ACTIONS === "true";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPagesDeploy && basePath ? basePath : "",
  assetPrefix: isGitHubPagesDeploy && basePath ? `${basePath}/` : "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
