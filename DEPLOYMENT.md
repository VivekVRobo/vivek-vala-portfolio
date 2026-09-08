# Deployment

## Vercel

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

`vercel.json` already rewrites deep URLs such as `/projects/slam-robot-ros2` to the SPA entry point.

## Netlify

The included `netlify.toml` defines:

- build command: `npm run build`
- publish directory: `dist`
- SPA fallback to `/index.html`

Connect the GitHub repository and deploy.

## Cloudflare Pages

Use:

- Build command: `npm run build`
- Build output: `dist`
- Node.js: 20+

For SPA fallback, configure Cloudflare Pages so unknown paths serve `index.html` (or add an appropriate `_redirects` file if using the Pages static-assets flow).

## Custom domain

After the first successful deployment, attach your domain through the hosting provider dashboard and enable HTTPS. Do not hardcode the deployment hostname into components.

## Before production

- add final LinkedIn URL
- add final résumé asset if desired
- replace media placeholders with original project evidence
- run `npm run build`
- test all deep routes by opening them directly in a new tab
- test Chrome, Edge, Firefox and Safari
- test at least one Android and one iPhone-size viewport
- test reduced-motion mode
