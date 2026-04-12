import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ORIGEN] Error capturado:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-fallback">
          <div className="error-boundary-card">
            <i className="bi bi-exclamation-triangle-fill error-boundary-icon" aria-hidden="true" />
            <h2>Algo salió mal</h2>
            <p>Ocurrió un error inesperado. Podés intentar recargar la sección.</p>
            <button className="btn-primary-custom" onClick={this.handleRetry}>
              <i className="bi bi-arrow-clockwise" aria-hidden="true" />
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
