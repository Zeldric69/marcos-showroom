import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './main/theme.css';
import './main/shared.css';
import App from './app.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <main className="container min-vh-100 d-flex flex-column align-items-center justify-content-center text-center"><h1>Something went wrong</h1><button className="btn btn-brand" onClick={() => window.location.reload()}>Reload</button></main>;
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary><App /></ErrorBoundary>
  </React.StrictMode>
);