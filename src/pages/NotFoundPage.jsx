import React from 'react';
import { Link } from '../router';
export default function NotFoundPage(){return <div className="inner-page"><header className="page-hero"><span className="eyebrow">404</span><h1>This path doesn’t lead anywhere.</h1><p>The project may have moved, or the route may never have existed.</p><Link className="pill-button dark" to="/">Return home</Link></header></div>}
