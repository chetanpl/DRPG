import { Component } from "react";
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {

    }

    render() {
        const { hasError, error } = this.state;
        if (hasError) {
            return (
                <div>
                    <p>Something went wrong 😭</p>
                    {error.message && <span>Here's the error: {error.message}</span>}
                </div>);
        }
        return this.props.children;
    }
}
export default ErrorBoundary;