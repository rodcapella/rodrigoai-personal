import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import { AlertTriangle } from "@/lib/icons";

const NotFound = ({ theme, onToggleTheme }: any) => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <PageSection>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <div className="mb-6">
            <AlertTriangle className="w-12 h-12 text-primary opacity-80" />
          </div>

          <h1 className="text-6xl font-bold mb-4">404</h1>

          <p className="text-xl text-muted-foreground mb-6">
            This page doesn’t exist… or maybe it was never built.
          </p>

          <p className="text-sm text-muted-foreground mb-10 max-w-md">
            The route{" "}
            <span className="text-primary font-semibold">
              {location.pathname}
            </span>{" "}
            could not be found.
          </p>

          <div className="flex gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all"
            >
              Go Home
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 rounded-lg border border-border hover:border-primary transition-all"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </PageSection>
    </MainLayout>
  );
};

export default NotFound;
