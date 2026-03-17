import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import { AlertTriangle } from "@/lib/icons";

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <MainLayout>
          <PageSection>
            <div className="flex flex-col items-center text-center py-20">
              <AlertTriangle className="w-12 h-12 text-primary mb-6" />

              <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>

              <p className="text-muted-foreground mb-6 max-w-md">
                An unexpected error occurred while rendering this page.
              </p>

              {/* DEV INFO */}
              {import.meta.env.DEV && this.state.error && (
                <pre className="text-left text-xs bg-muted p-4 rounded-lg mb-6 max-w-xl overflow-auto">
                  {this.state.error.message}
                </pre>
              )}

              <div className="flex gap-4">
                <button
                  onClick={this.handleReload}
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Reload Page
                </button>

                <a
                  href="/"
                  className="px-6 py-3 rounded-lg border border-border hover:border-primary transition-all"
                >
                  Go Home
                </a>
              </div>
            </div>
          </PageSection>
        </MainLayout>
      );
    }

    return this.props.children;
  }
}