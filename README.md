# Vivek Vala — Spatial Engineering Portfolio v6

A production-oriented, multi-page 3D engineering portfolio for Vivek Vala. v6 rebuilds the public experience around a restrained luxury visual system, smooth spatial scrolling, and dedicated pages instead of placing the whole portfolio on one homepage.

## Public architecture

The homepage is intentionally short and cinematic. Detailed content lives on dedicated routes:

- `/` — spatial landing + three selected projects + page directory
- `/projects` — searchable/filterable project index
- `/projects/:slug` — full engineering case studies
- `/skills` — dedicated engineering skills and technical stack page
- `/experience` — experience, education and proof-of-work context
- `/lab` — experiments and evolving systems
- `/about` — engineering philosophy and personal direction
- `/blog` + `/blog/:slug` — engineering notes
- `/resume` — printable résumé view / replaceable download target
- `/contact` — contact and opportunity page
- `/studio` — private-by-URL local content editor

## v6 design changes

- The landing no longer uses low-fidelity robot/vehicle objects as decoration.
- A new precision kinetic installation becomes the opening 3D focal point.
- The homepage scene progresses through three gallery spaces only: introduction, selected work, directory.
- Full robotics/arm/PCB/etc. scenes are reserved for their actual project case-study routes.
- The homepage no longer duplicates About, Skills, Experience, Lab or other full sections.
- `/skills` is now a complete dedicated page.
- Natural grading was tightened around warm ivory, limestone, smoked bronze, eucalyptus/sage, fog blue and graphite.
- Sitewide spacing, case-study typography, navigation, project surfaces and footer were refined to feel quieter and more premium.
- Desktop wheel scrolling uses damped interpolation; trackpads, nested scroll areas, form controls, reduced motion and touch devices are respected.
- CSS smooth scrolling is disabled while the custom desktop easing layer is active to avoid double-smoothing/jitter.

## 3D philosophy

The 3D layer is an enhancement, not the content source.

- Homepage: abstract precision/engineering gallery.
- Project routes: domain-specific spatial scenes.
- Quiet pages: restrained route-specific architecture.
- Low-power / save-data / small devices: static spatial fallback.
- Users can manually switch 3D off.

## Run locally

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
npm run preview
```

## Content Studio

Open `/studio` directly. It is intentionally excluded from recruiter-facing navigation and marked `noindex`. It supports project publishing state, ordering, deep case-study content, media, experience, education, Lab entries, notes, contact information and JSON backup/import.

## Evidence policy

The portfolio deliberately separates implemented, simulated/reference, and planned/evidence-gated claims. It does not invent benchmark results, physical validation, screenshots, awards or hardware evidence.

## Validation performed in this environment

- Content integrity gate: passed
- 10 case studies + 7 Lab entries: passed
- 33 JS/JSX files TypeScript-transpiled for syntax: 0 errors
- Relative/local imports: 0 broken imports
- CSS top-level parse errors: 0
- Dependency-backed Vite/WebGL runtime build: requires `npm install` on a normal development machine because this sandbox does not have the npm dependencies cached.

See `V6_LUXURY_REBUILD.md` and `QA_REPORT.md` for the current pass.
