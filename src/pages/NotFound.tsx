import { useLocation, Link, useOutletContext } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";
import PageSection from "@/components/layout/PageSection";
import { AlertTriangle } from "@/lib/icons";

const NotFound = () => {
  const location = useLocation();
  const { theme, onToggleTheme } = useOutletContext<{
    theme: "dark" | "light";
    onToggleTheme: () => void;
  }>();

  return (
    <MainLayout theme={theme} onToggleTheme={onToggleTheme}>
      <Helmet>
        <title>Page Not Found | Rodrigo Póvoa</title>
        <meta
          name="description"
          content="The requested page could not be found. Return to Rodrigo Póvoa's website or use the main navigation."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PageSection>
        <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center md:py-20">
          <div className="mb-6">
            <AlertTriangle
              aria-hidden="true"
              className="h-12 w-12 text-primary opacity-80"
            />
          </div>

          <p className="mb-3 font-display text-sm font-bold tracking-[0.18em] text-primary uppercase">
            Page Not Found
          </p>
          <h1 className="mb-4 text-6xl font-bold">404</h1>

          <p className="mb-6 text-xl text-muted-foreground">
            This page doesn’t exist… or maybe it was never built.
          </p>

          <p className="mb-10 max-w-md text-sm text-muted-foreground">
            The route{" "}
            <span className="break-all font-semibold text-primary">
              {location.pathname}
            </span>{" "}
            could not be found.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="site-button bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Go Home
            </Link>

            <Link
              to="/contact"
              className="site-button border border-border text-foreground hover:border-primary"
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
