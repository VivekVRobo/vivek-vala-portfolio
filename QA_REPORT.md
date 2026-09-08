# QA Report — v6

## Passed in this environment

- `node scripts/validate-content.mjs`
  - 10 case studies
  - 7 Lab entries
  - 10 unique project routes
- JS/JSX syntax/transpile audit using the available TypeScript compiler
  - 33 files
  - 0 syntax/transpile errors
- Relative/local import resolution
  - 0 failures
- CSS parse audit with `tinycss2`
  - 0 top-level parse errors

## Runtime build status

This environment does not contain the project's npm dependency tree. A dependency-backed `vite build` and real-browser WebGL visual QA therefore still need to be run after `npm install` on a normal development machine.

Recommended final commands:

```bash
npm install
npm run build
npm run preview
```

Then inspect desktop wheel feel, trackpad behavior, mobile fallback, project scene framing, and the `/studio` editor in Chrome/Edge/Firefox.
