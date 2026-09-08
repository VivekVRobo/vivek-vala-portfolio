import { blogPosts, capabilities, education, experience, labProjects, projects, site } from './site';

export const CONTENT_KEY = 'vivek-portfolio-content-v6-clean';
const LEGACY_KEYS = ['vivek-portfolio-content-v4', 'vivek-portfolio-content-v3', 'vivek-portfolio-content-v2'];
export const defaultContent = { site, projects, labProjects, experience, education, blogPosts, capabilities };

function mergeProjectDefaults(savedProjects = []) {
  const savedBySlug = new Map(savedProjects.map((p) => [p.slug, p]));
  return projects.map((base) => ({ ...base, ...(savedBySlug.get(base.slug) || {}) })).concat(savedProjects.filter((p) => !projects.some((base) => base.slug === p.slug)));
}

export function loadContent() {
  if (typeof window === 'undefined') return defaultContent;
  try {
    const raw = localStorage.getItem(CONTENT_KEY) || LEGACY_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    if (!raw) return defaultContent;
    const saved = JSON.parse(raw);
    return {
      ...defaultContent,
      ...saved,
      site: { ...site, ...(saved.site || {}) },
      projects: mergeProjectDefaults(saved.projects),
      labProjects: saved.labProjects || labProjects,
      experience: saved.experience || experience,
      education: saved.education || education,
      blogPosts: saved.blogPosts || blogPosts,
      capabilities: saved.capabilities || capabilities,
    };
  } catch { return defaultContent; }
}

export function saveContent(data) {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event('portfolio-content-change'));
}
export function resetContent() {
  localStorage.removeItem(CONTENT_KEY);
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
  window.dispatchEvent(new Event('portfolio-content-change'));
}
