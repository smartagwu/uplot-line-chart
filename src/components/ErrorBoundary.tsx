import { Component, PropsWithChildren } from "react";

const PAGE_BROKEN_ERROR = "Something went wrong. Please reload this page";

class ErrorBoundary extends Component<PropsWithChildren, { error?: string }> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError() {
    return {
      error: PAGE_BROKEN_ERROR,
    };
  }

  componentDidCatch(error: Error | string): void {
    this.setState({ error: typeof error === "object" ? error.message : error });
  }

  render() {
    if (this.state.error) {
      return <p className="error">{this.state.error}</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
