import React from 'react';
/**
 * ErrorBoundary Component catches the error which produces in its child nodes.
 * For Dev it console the errors and for PROD it sends the error report to
 * sentry.
 */

class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { error: false };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(error: any) {
        return { error: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo);
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;
        if (error) {
            return <h1>Something went wrong.</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;
