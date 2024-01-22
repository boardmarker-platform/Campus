import { Component, PropsWithChildren, ReactElement } from 'react';

import ErrorElement from 'pages/ErrorElement';

type Props = {
  onReset?: () => void;
  fallback?: ReactElement;
} & PropsWithChildren;

type Info = {
  componentStack: string;
};

type State = {
  hasError: boolean;
  error: Error | null;
  info: Info | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, info: Info) {
    this.setState({ error, info });
  }

  render() {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    const fallbackComponent = fallback ?? <ErrorElement status={error?.cause} />;

    return hasError ? fallbackComponent : children;
  }
}
