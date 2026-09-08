import { projects, labProjects } from '../src/content/site.js';

const errors = [];
const requiredText = ['slug', 'title', 'summary', 'status', 'role', 'problem', 'approach', 'testing', 'lessons', 'future', 'github'];
const requiredArrays = ['tags', 'architecture', 'decisions', 'implemented', 'simulated', 'planned', 'media'];
const seen = new Set();

for (const project of projects) {
  if (seen.has(project.slug)) errors.push(`Duplicate project slug: ${project.slug}`);
  seen.add(project.slug);
  for (const field of requiredText) if (typeof project[field] !== 'string' || !project[field].trim()) errors.push(`${project.slug}: missing ${field}`);
  for (const field of requiredArrays) if (!Array.isArray(project[field])) errors.push(`${project.slug}: ${field} must be an array`);
  if (!project.github.startsWith('https://github.com/')) errors.push(`${project.slug}: GitHub URL is not a github.com URL`);
  if (!project.architecture.length) errors.push(`${project.slug}: architecture is empty`);
  if (!project.decisions.length) errors.push(`${project.slug}: decisions are empty`);
}

if (projects.length < 10) errors.push(`Expected at least 10 deep case studies, found ${projects.length}`);
if (labProjects.length < 5) errors.push(`Expected at least 5 Lab entries, found ${labProjects.length}`);

if (errors.length) {
  console.error('Portfolio content validation failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`Portfolio content valid: ${projects.length} case studies, ${labProjects.length} Lab entries, ${seen.size} unique routes.`);
