# v6 Luxury / Multi-Page Rebuild

## Why v6 exists

The previous build had strong routing and engineering content, but the public experience still felt too much like a long portfolio landing page. The opening 3D also used recognizable procedural robot/vehicle forms before they were visually strong enough to deserve that role.

## What changed

### Landing

The homepage now contains only three narrative stages:

1. **Introduction** — a precision kinetic engineering installation with stone, metal, glass and restrained motion.
2. **Selected work** — three project entry points, not full duplicated case-study content.
3. **Directory** — links into dedicated Projects, Skills, Experience, Lab, About, Notes, Contact and Résumé pages.

This keeps the homepage cinematic without turning it into a single-page application disguised as a website.

### 3D quality direction

The landing no longer tries to represent the SLAM robot, robotic arm or PCB literally. Those visuals are now used only where they are semantically relevant: the dedicated case-study routes. The homepage uses abstract precision engineering objects because they can be rendered consistently and elegantly without pretending to be photorealistic hardware.

### Scrolling

The desktop wheel layer now:

- normalizes wheel delta modes;
- clamps extreme wheel spikes;
- dampens large and small distances differently;
- ignores horizontal-dominant gestures;
- bypasses nested scroll containers and form fields;
- disables itself on coarse/touch pointers and reduced-motion preferences;
- disables CSS smooth-scroll while active, preventing double interpolation.

### Dedicated pages

A new `/skills` route separates technical capability from About. The homepage no longer contains a full capabilities matrix. About now focuses on thinking/philosophy; Experience focuses on timeline/context; Projects owns case studies; Lab owns unfinished experiments.

### Visual system

The grading was narrowed to a smaller material palette:

- warm ivory / limestone
- smoked bronze / sand
- eucalyptus sage
- fog blue
- graphite

Shadows, hairlines, card surfaces, page heroes, case studies and footer were refined so the site feels closer to an industrial-design exhibition than an AI startup template.
