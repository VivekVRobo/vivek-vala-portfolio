# Deep Audit — v2 → v3

## What was weak in v2

The v2 foundation had the correct multi-page idea, but several parts still behaved like a polished template rather than a bespoke engineering portfolio:

- only six projects had true case-study data;
- project pages reused a generic evidence layout without enough domain-specific differentiation;
- four credible GitHub projects were compressed into one-line Lab entries;
- related projects were selected by array order, not relevance;
- the project index had filters but no search despite a large project set;
- Content Studio could edit surface copy but not most deep architecture/evidence fields;
- non-flagship 3D routes leaned too heavily on one quiet architectural scene;
- public navigation exposed the owner-facing Studio;
- metadata/accessibility/error/fallback behavior needed production hardening;
- some case-study wording was more optimistic than the source repositories' evidence gates.

## What v3 changes

### Recruiter / engineering content

- Promotes Line Following Robot, CV Object Sorter, Gesture-Controlled Robotic Arm, and Robotic Character Interface into full case studies.
- Rewrites the flagship evidence language to match repository maturity more carefully.
- Upgrades HTTP Server From Scratch to reflect the current C++20 parser/framing/static-file/thread-pool/epoll/evidence scope.
- Adds structured status text directly to project cards.
- Uses relevance scoring for related projects.

### 3D / visual system

- Keeps the warm natural palette rather than introducing neon AI colors.
- Adds domain-specific procedural environments for the expanded case-study set.
- Adds low-power/save-data static spatial fallbacks.
- Preserves scroll-linked project camera movement without requiring game-style navigation.

### Content management

- Deep project fields are editable: architecture, decisions, evidence arrays, media, links, testing, lessons and future work.
- Experience, education and Lab entries are editable directly.
- Media supports image/video/placeholder rows.
- v2 local content is migrated into the v3 data shape.

### Product quality

- Project search + keyboard shortcut.
- Route-level lazy loading.
- Dynamic SEO/OpenGraph/canonical metadata and Person JSON-LD.
- Studio/404 noindex handling.
- Error recovery view.
- Route focus restoration and stronger focus-visible treatment.
- Public Studio navigation removed.
- Nested-main semantic issue removed.
- Content integrity validation added to the build pipeline.

## Honest remaining limitation

This environment could not finish downloading npm dependencies, so the source is structurally validated but not claimed as a locally bundled or browser-rendered Vite build here. That final check must be performed on a normal internet-connected machine before deployment.
