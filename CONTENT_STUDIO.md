# Content Studio — v3

Open `/studio` directly. It is intentionally not linked from recruiter-facing navigation.

## Editing model

Studio edits are stored in browser localStorage under the v3 content key. Existing v2 local content is read as a migration fallback, then merged with the v3 defaults so newly added case studies are not lost.

Use **Save changes** to apply edits to the public routes in the same browser. Use **Export JSON** for backups. Importing a JSON backup loads it into the editor; press Save to persist it.

## Projects

Each project supports:

- title, short title, slug, category, status
- featured state and display order
- scene key
- summary and tags
- GitHub, live demo, and docs URL
- role, engineering question/problem, approach
- architecture layers (`Name :: detail` per line)
- engineering decisions
- implemented evidence
- simulated/reference evidence
- planned/evidence-gated work
- testing, lesson, future work
- media

### Media syntax

One item per line:

```text
image :: https://example.com/photo.jpg :: Robot on the physical test bench
video :: https://example.com/demo.mp4 :: Uncut motion test
placeholder :: Benchmark artifact :: Add after a verified benchmark run
```

Do not use placeholders to imply evidence that does not exist.

## Site

Edit name, role, contact details, GitHub/LinkedIn, résumé URL, strapline, introduction, location and availability.

## Notes

Create/edit field notes with title, slug, label/date, excerpt and paragraph body.

## Experience / education

Entries can be added, edited, and removed directly in Studio.

## Lab

Lab entries can be added, edited, linked to GitHub, or removed. Use Lab for experiments that do not yet justify a full case study.

## Limits

This Studio is intentionally local-first. It does not provide hosted authentication, server-side media uploads, collaborative editing, or database-backed publishing. If the site later needs a public admin CMS, migrate the same data shape to a headless CMS instead of rewriting the pages.

## v4 workflow additions

- **Published** controls whether a project appears on the public project index/homepage and whether its case-study route resolves publicly.
- New projects start as **Draft**.
- **Case-study completeness** is an owner-facing heuristic for required narrative/evidence fields; it does not certify project maturity.
- **Preview** opens the project route so you can review it before publishing.
- Homepage **stats** and **capabilities** can be edited in the Site tab using `Value :: label` / `Name :: detail` lines.
- The live 3D scene can be manually disabled from the public navigation; that preference is stored in the browser and does not alter project content.
