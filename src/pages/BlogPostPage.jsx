import React from 'react';
import { Link } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
export default function BlogPostPage({slug}){const{blogPosts}=usePortfolioContent();const post=blogPosts.find(p=>p.slug===slug);if(!post)return <div className="inner-page"><header className="page-hero"><h1>Note not found.</h1><Link className="pill-button" to="/blog">Back to notes</Link></header></div>;return <article className="note-page"><header><span className="eyebrow">{post.date}</span><h1>{post.title}</h1><p>{post.excerpt}</p></header><section>{post.body.map((p,i)=><p key={i}>{p}</p>)}</section><footer><Link to="/blog">← All engineering notes</Link></footer></article>}
