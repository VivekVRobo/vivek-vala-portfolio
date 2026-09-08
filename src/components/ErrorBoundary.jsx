import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error('Portfolio route error', error, info); }
  componentDidUpdate(prevProps) { if (prevProps.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null }); }
  render() {
    if (!this.state.error) return this.props.children;
    return <div className="route-error" role="alert"><span className="eyebrow">Interface recovery</span><h1>This view hit an unexpected error.</h1><p>The rest of the portfolio is still available. Reload this route or return to the project index.</p><div className="hero-actions"><button className="pill-button dark" onClick={() => window.location.reload()}>Reload route</button><a className="pill-button" href="/projects">Project index</a></div></div>;
  }
}
