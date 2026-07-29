import "./lib/trustedTypes";
import "./index.css";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AppRoutes from "./AppRoutes";
import { initializeConsentMode } from "./lib/analytics";
import { loadInitialRoute } from "./routePreload";

initializeConsentMode();

const startApplication = async () => {
  const initialPath = window.location.pathname;
  const InitialComponent = await loadInitialRoute(initialPath);

  const rootElement = document.getElementById("root")!;
  const application = (
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <AppRoutes
              initialPath={initialPath}
              InitialComponent={InitialComponent}
            />
          </ErrorBoundary>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, application);
  } else {
    createRoot(rootElement).render(application);
  }
};

void startApplication();
