# ASGO Flux 배포 가이드

이 저장소는 계정별 SSH Host 별칭으로 배포합니다.

## 현재 원격 저장소

- `origin`: `git@github-askillofgod:askillofgod/asgo_flux.git`

## 배포 명령어

```bash
git add .
git commit -m "docs: add deployment guide"
git push -u origin main
```

## 계정별 원격 예시

- 개인 계정: `git@github-askillofgod:askillofgod/asgo_flux.git`
- 회사 계정: `git@github-momopick:momopick-global/asgoflux.git`

## Cloudflare Pages (정적 `out/` 배포)

이 프로젝트는 `next.config.ts`의 `output: "export"`로 빌드 시 **`out/`** 에 `index.html`이 생성됩니다.

대시보드에서 다음을 맞추세요.

| 항목 | 값 |
|------|-----|
| Framework preset | **None** (또는 Static) — **Next.js 프리셋 사용 금지** (서버/어댑터용이라 `out` 정적 배포와 다름) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | 저장소 루트 (기본) |
| Node version | 20 (권장, `.nvmrc` 참고) |

환경 변수:

- **설정하지 않음**: `GITHUB_ACTIONS`, `NEXT_PUBLIC_BASE_PATH` — 이 둘이 켜지면 GitHub Pages용 서브경로(`basePath`)가 적용되어 루트 도메인에서 자산 경로가 어긋날 수 있음.
- 선택: `NEXT_PUBLIC_SITE_URL` = `https://asgo-flux.pages.dev` (메타데이터·사이트맵용)

로컬에서 출력 확인:

```bash
npm ci
npm run build
ls out/index.html
```
