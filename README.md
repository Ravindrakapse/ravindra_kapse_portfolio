# Ravindra Kapse — Portfolio

Interactive portfolio. React + Vite + TypeScript + Three.js (react-three-fiber) + GSAP + Framer Motion + Tailwind.

Hero = procedural face point-cloud. Scatter-to-face morph on scroll + mouse parallax (KPIT-style).

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/
npm run preview
```

## Deploy → GitHub Pages

1. Create repo `ravindra_kapse_portfolio` on GitHub. Push this code.
2. Repo Settings → Pages → Source: **GitHub Actions**.
3. Push to `main`. Workflow `.github/workflows/deploy.yml` builds + deploys.
4. Live at: `https://<username>.github.io/ravindra_kapse_portfolio/`

If you use root site `<username>.github.io`, edit `vite.config.ts` → `base: '/'`.

## Edit content

All copy in [src/data/content.ts](src/data/content.ts).

## Hero face shape

Procedural — generated in [src/components/FaceParticles.tsx](src/components/FaceParticles.tsx) `generateHeadPoints()`. To use your real face: replace with mediapipe-468 landmark coords or sampled mesh from a head GLB.
