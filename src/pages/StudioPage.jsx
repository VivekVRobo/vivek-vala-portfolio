import React, { useRef, useState } from 'react';
import { Link } from '../router';
import { defaultContent, loadContent, resetContent, saveContent } from '../content/store';

const clone = (value) => JSON.parse(JSON.stringify(value));
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `project-${Date.now()}`;
const lines = (value = []) => value.join('\n');
const fromLines = (value) => value.split('\n').map((x) => x.trim()).filter(Boolean);
const pairs = (value = []) => value.map(([a, b]) => `${a} :: ${b}`).join('\n');
const fromPairs = (value) => fromLines(value).map((row) => { const [a, ...rest] = row.split('::'); return [a.trim(), rest.join('::').trim()]; }).filter(([a, b]) => a && b);
const mediaText = (value = []) => value.map((m) => `${m.type || 'placeholder'} :: ${m.url || m.label || ''} :: ${m.caption || ''}`).join('\n');
const fromMedia = (value) => fromLines(value).map((row) => { const [typeRaw, sourceRaw, ...captionRaw] = row.split('::'); const type = typeRaw.trim() || 'placeholder'; const source = (sourceRaw || '').trim(); const caption = captionRaw.join('::').trim(); return type === 'placeholder' ? { type, label: source, caption } : { type, url: source, caption }; });
const projectChecks = (project) => [project?.title, project?.slug, project?.summary, project?.status, project?.role, project?.problem, project?.approach, project?.github, project?.architecture?.length >= 3, project?.decisions?.length >= 2, project?.implemented?.length >= 1, project?.testing, project?.lessons, project?.future];
const completeness = (project) => { const checks = projectChecks(project); return Math.round((checks.filter(Boolean).length / checks.length) * 100); };

function Field({ label, value = '', onChange, rows = 0, hint = '' }) {
  return <label>{label}{rows ? <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} /> : <input value={value} onChange={(e) => onChange(e.target.value)} />}{hint && <small>{hint}</small>}</label>;
}

function CollectionEditor({ title, items, setItems }) {
  const update = (i, field, value) => setItems(items.map((item, index) => index === i ? { ...item, [field]: value } : item));
  return <section className="studio-form studio-form--single"><div className="studio-subhead"><h2>{title}</h2><button className="pill-button" onClick={() => setItems([...items, { period: 'New', role: 'Untitled', org: '', detail: '' }])}>＋ Add entry</button></div>{items.map((item, i) => <div className="studio-nested" key={`${item.role}-${i}`}><Field label="Period" value={item.period} onChange={(v) => update(i, 'period', v)} /><Field label="Role / title" value={item.role} onChange={(v) => update(i, 'role', v)} /><Field label="Organization" value={item.org} onChange={(v) => update(i, 'org', v)} /><Field label="Detail" rows={3} value={item.detail} onChange={(v) => update(i, 'detail', v)} /><button className="text-button danger-link" onClick={() => setItems(items.filter((_, index) => index !== i))}>Remove</button></div>)}</section>;
}

export default function StudioPage() {
  const [data, setData] = useState(() => clone(loadContent()));
  const [tab, setTab] = useState('projects');
  const [selected, setSelected] = useState(0);
  const [selectedNote, setSelectedNote] = useState(0);
  const [selectedLab, setSelectedLab] = useState(0);
  const [message, setMessage] = useState('');
  const fileRef = useRef();
  const project = data.projects[selected];
  const note = data.blogPosts[selectedNote];
  const lab = data.labProjects[selectedLab];

  const updateProject = (field, value) => setData((d) => ({ ...d, projects: d.projects.map((p, i) => i === selected ? { ...p, [field]: value } : p) }));
  const updateSite = (field, value) => setData((d) => ({ ...d, site: { ...d.site, [field]: value } }));
  const updateNote = (field, value) => setData((d) => ({ ...d, blogPosts: d.blogPosts.map((p, i) => i === selectedNote ? { ...p, [field]: value } : p) }));
  const updateLab = (field, value) => setData((d) => ({ ...d, labProjects: d.labProjects.map((p, i) => i === selectedLab ? { ...p, [field]: value } : p) }));
  const notify = (text) => { setMessage(text); window.setTimeout(() => setMessage(''), 2600); };

  const addProject = () => {
    const order = data.projects.length;
    const item = { slug: `new-project-${Date.now()}`, id: `new-project-${Date.now()}`, index: String(order + 1).padStart(2, '0'), eyebrow: 'Engineering', title: 'Untitled project', shortTitle: 'Untitled', summary: '', tags: [], github: '', live: '', docs: '', accent: 'sand', scene: 'generic', status: 'Draft', role: '', problem: '', approach: '', architecture: [], decisions: [], implemented: [], simulated: [], planned: [], testing: '', lessons: '', future: '', media: [], featured: false, published: false, order };
    setData((d) => ({ ...d, projects: [...d.projects, item] })); setSelected(order);
  };
  const deleteProject = () => { if (!project || !window.confirm(`Delete “${project.title}” from local content?`)) return; setData((d) => ({ ...d, projects: d.projects.filter((_, i) => i !== selected).map((p, i) => ({ ...p, order: i, index: String(i + 1).padStart(2, '0') })) })); setSelected((v) => Math.max(0, v - 1)); };
  const move = (direction) => { const next = selected + direction; if (next < 0 || next >= data.projects.length) return; const list = [...data.projects]; [list[selected], list[next]] = [list[next], list[selected]]; setData((d) => ({ ...d, projects: list.map((p, i) => ({ ...p, order: i, index: String(i + 1).padStart(2, '0') })) })); setSelected(next); };
  const addNote = () => { const item = { slug: `note-${Date.now()}`, date: 'Field note', title: 'Untitled note', excerpt: '', body: [] }; setData((d) => ({ ...d, blogPosts: [...d.blogPosts, item] })); setSelectedNote(data.blogPosts.length); };
  const addLab = () => { const item = { title: 'Untitled experiment', meta: '', status: 'Exploration', detail: '', github: '' }; setData((d) => ({ ...d, labProjects: [...d.labProjects, item] })); setSelectedLab(data.labProjects.length); };

  const save = () => { saveContent(data); notify('Saved locally. Public pages updated.'); };
  const exportJson = () => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'vivek-portfolio-content.json'; a.click(); URL.revokeObjectURL(url); };
  const importJson = (file) => { const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(reader.result); setData({ ...clone(defaultContent), ...parsed }); notify('JSON imported. Save to apply it.'); } catch { notify('Import failed: invalid JSON.'); } }; reader.readAsText(file); };

  return <div className="studio"><header className="studio-head"><div><span className="eyebrow">Owner workspace · /studio</span><h1>Content Studio</h1><p>Edit the real structured content behind the portfolio. This local-only editor stores data in your browser; export JSON backups whenever you make meaningful changes.</p></div><Link className="pill-button" to="/">View portfolio ↗</Link></header>
    <div className="studio-tabs" role="tablist">{['projects', 'site', 'notes', 'experience', 'lab'].map((item) => <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>)}</div>
    {message && <div className="studio-toast" role="status">{message}</div>}

    {tab === 'projects' && <div className="studio-grid"><aside><button className="studio-create" onClick={addProject}>＋ New project</button>{data.projects.map((p, i) => <button key={`${p.slug}-${i}`} className={i === selected ? 'active' : ''} onClick={() => setSelected(i)}><span className={`studio-dot ${p.published === false ? 'draft' : 'live'}`} />{p.index} · {p.title}</button>)}</aside>{project && <section className="studio-form"><div className="studio-order"><button onClick={() => move(-1)}>↑ Move up</button><button onClick={() => move(1)}>↓ Move down</button><label><input type="checkbox" checked={project.featured !== false} onChange={(e) => updateProject('featured', e.target.checked)} /> Featured</label><label><input type="checkbox" checked={project.published !== false} onChange={(e) => updateProject('published', e.target.checked)} /> Published</label><Link className="text-button" to={`/projects/${project.slug}`}>Preview ↗</Link><button className="studio-danger" onClick={deleteProject}>Delete</button></div><div className="studio-completeness"><span>Case-study completeness</span><div><i style={{width:`${completeness(project)}%`}} /></div><strong>{completeness(project)}%</strong></div>
      <div className="studio-two"><Field label="Title" value={project.title} onChange={(v) => updateProject('title', v)} /><Field label="Short title" value={project.shortTitle} onChange={(v) => updateProject('shortTitle', v)} /><Field label="Slug" value={project.slug} onChange={(v) => updateProject('slug', slugify(v))} /><Field label="Category" value={project.eyebrow} onChange={(v) => updateProject('eyebrow', v)} /><Field label="Status" value={project.status} onChange={(v) => updateProject('status', v)} /><Field label="Scene key" value={project.scene} onChange={(v) => updateProject('scene', v)} /></div>
      <Field label="Summary" rows={4} value={project.summary} onChange={(v) => updateProject('summary', v)} /><Field label="Tags · one per line" rows={5} value={lines(project.tags)} onChange={(v) => updateProject('tags', fromLines(v))} /><div className="studio-two"><Field label="GitHub URL" value={project.github} onChange={(v) => updateProject('github', v)} /><Field label="Live URL" value={project.live || ''} onChange={(v) => updateProject('live', v)} /><Field label="Docs URL" value={project.docs || ''} onChange={(v) => updateProject('docs', v)} /></div>
      <Field label="My role" rows={4} value={project.role} onChange={(v) => updateProject('role', v)} /><Field label="Engineering question / problem" rows={5} value={project.problem} onChange={(v) => updateProject('problem', v)} /><Field label="Approach" rows={5} value={project.approach} onChange={(v) => updateProject('approach', v)} />
      <Field label="Architecture · Name :: detail" rows={8} value={pairs(project.architecture)} onChange={(v) => updateProject('architecture', fromPairs(v))} hint="One layer per line. Example: Sensors :: five calibrated analog channels" /><Field label="Engineering decisions · one per line" rows={6} value={lines(project.decisions)} onChange={(v) => updateProject('decisions', fromLines(v))} />
      <div className="studio-three"><Field label="Implemented · one per line" rows={7} value={lines(project.implemented)} onChange={(v) => updateProject('implemented', fromLines(v))} /><Field label="Simulated / reference" rows={7} value={lines(project.simulated)} onChange={(v) => updateProject('simulated', fromLines(v))} /><Field label="Planned / gated" rows={7} value={lines(project.planned)} onChange={(v) => updateProject('planned', fromLines(v))} /></div>
      <Field label="Testing / validation" rows={5} value={project.testing} onChange={(v) => updateProject('testing', v)} /><Field label="Lesson" rows={4} value={project.lessons} onChange={(v) => updateProject('lessons', v)} /><Field label="Future work" rows={4} value={project.future} onChange={(v) => updateProject('future', v)} /><Field label="Media · type :: URL/label :: caption" rows={8} value={mediaText(project.media)} onChange={(v) => updateProject('media', fromMedia(v))} hint="Types: image, video, placeholder. Example: image :: https://... :: Robot on test bench" />
    </section>}</div>}

    {tab === 'site' && <section className="studio-form studio-form--single">
      <div className="studio-two">
        <Field label="Display name" value={data.site.name} onChange={(v) => updateSite('name', v)} />
        <Field label="Role" value={data.site.role} onChange={(v) => updateSite('role', v)} />
        <Field label="Email" value={data.site.email} onChange={(v) => updateSite('email', v)} />
        <Field label="Location" value={data.site.location} onChange={(v) => updateSite('location', v)} />
        <Field label="GitHub" value={data.site.github} onChange={(v) => updateSite('github', v)} />
        <Field label="LinkedIn" value={data.site.linkedin || ''} onChange={(v) => updateSite('linkedin', v)} />
        <Field label="Résumé URL" value={data.site.resumeUrl || ''} onChange={(v) => updateSite('resumeUrl', v)} />
      </div>
      <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#fffdf8', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 0.8rem 0', fontSize: '1rem' }}>Hero Cinema Assets (V7)</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={data.site.heroCinema?.enabled !== false}
            onChange={(e) => updateSite('heroCinema', { ...data.site.heroCinema, enabled: e.target.checked })}
          />
          <strong>Enable Video Layer (falls back to poster if disabled or missing)</strong>
        </label>
        <div className="studio-two">
          <Field
            label="Hero Poster Image URL"
            value={data.site.heroCinema?.poster || ''}
            onChange={(v) => updateSite('heroCinema', { ...data.site.heroCinema, poster: v })}
            hint="Example: /hero-cinema-poster.webp"
          />
          <Field
            label="Hero WebM Video URL"
            value={data.site.heroCinema?.webm || ''}
            onChange={(v) => updateSite('heroCinema', { ...data.site.heroCinema, webm: v })}
            hint="Example: /hero-cinema.webm"
          />
          <Field
            label="Hero MP4 Video URL"
            value={data.site.heroCinema?.mp4 || ''}
            onChange={(v) => updateSite('heroCinema', { ...data.site.heroCinema, mp4: v })}
            hint="Example: /hero-cinema.mp4"
          />
        </div>
      </div>
      <Field label="Strapline" rows={3} value={data.site.strapline} onChange={(v) => updateSite('strapline', v)} />
      <Field label="Introduction" rows={6} value={data.site.intro} onChange={(v) => updateSite('intro', v)} />
      <Field label="Availability" rows={4} value={data.site.availability} onChange={(v) => updateSite('availability', v)} />
      <Field label="Homepage stats · Value :: label" rows={5} value={pairs(data.site.stats || [])} onChange={(v) => updateSite('stats', fromPairs(v))} />
      <Field label="Capabilities · Name :: detail" rows={8} value={pairs(data.capabilities || [])} onChange={(v) => setData((d) => ({...d, capabilities: fromPairs(v)}))} />
    </section>}

    {tab === 'notes' && <div className="studio-grid"><aside><button className="studio-create" onClick={addNote}>＋ New note</button>{data.blogPosts.map((p, i) => <button key={`${p.slug}-${i}`} className={i === selectedNote ? 'active' : ''} onClick={() => setSelectedNote(i)}>{p.date} · {p.title}</button>)}</aside>{note && <section className="studio-form"><Field label="Title" value={note.title} onChange={(v) => updateNote('title', v)} /><Field label="Slug" value={note.slug} onChange={(v) => updateNote('slug', slugify(v))} /><Field label="Label / date" value={note.date} onChange={(v) => updateNote('date', v)} /><Field label="Excerpt" rows={4} value={note.excerpt} onChange={(v) => updateNote('excerpt', v)} /><Field label="Body paragraphs · blank line separates paragraphs" rows={14} value={(note.body || []).join('\n\n')} onChange={(v) => updateNote('body', v.split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean))} /></section>}</div>}

    {tab === 'experience' && <div className="studio-collections"><CollectionEditor title="Experience" items={data.experience} setItems={(experience) => setData((d) => ({ ...d, experience }))} /><CollectionEditor title="Education" items={data.education} setItems={(education) => setData((d) => ({ ...d, education }))} /></div>}

    {tab === 'lab' && <div className="studio-grid"><aside><button className="studio-create" onClick={addLab}>＋ New experiment</button>{data.labProjects.map((p, i) => <button key={`${p.title}-${i}`} className={i === selectedLab ? 'active' : ''} onClick={() => setSelectedLab(i)}>{p.title}</button>)}</aside>{lab && <section className="studio-form"><Field label="Title" value={lab.title} onChange={(v) => updateLab('title', v)} /><Field label="Meta" value={lab.meta} onChange={(v) => updateLab('meta', v)} /><Field label="Status" value={lab.status} onChange={(v) => updateLab('status', v)} /><Field label="GitHub URL" value={lab.github || ''} onChange={(v) => updateLab('github', v)} /><Field label="Detail" rows={6} value={lab.detail} onChange={(v) => updateLab('detail', v)} /><button className="text-button danger-link" onClick={() => { setData((d) => ({ ...d, labProjects: d.labProjects.filter((_, i) => i !== selectedLab) })); setSelectedLab((v) => Math.max(0, v - 1)); }}>Remove experiment</button></section>}</div>}

    <div className="studio-actions"><button className="pill-button dark" onClick={save}>Save changes</button><button className="pill-button" onClick={exportJson}>Export JSON</button><button className="pill-button" onClick={() => fileRef.current?.click()}>Import JSON</button><input ref={fileRef} type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && importJson(e.target.files[0])} /><button className="text-button" onClick={() => { if (window.confirm('Reset all locally edited content to the repository defaults?')) { resetContent(); setData(clone(defaultContent)); notify('Reset to defaults.'); } }}>Reset defaults</button></div>
  </div>;
}
