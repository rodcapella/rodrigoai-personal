import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import {
  HelmetProvider,
  type HelmetServerState,
} from "react-helmet-async";
import { ErrorBoundary } from "./components/ErrorBoundary";
import AppRoutes from "./AppRoutes";
import { loadInitialRoute } from "./routePreload";

export async function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const initialPath = new URL(url, "https://www.rpovoadata.tech").pathname;
  const InitialComponent = await loadInitialRoute(initialPath);
  const application = (
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ErrorBoundary>
          <AppRoutes
            initialPath={initialPath}
            InitialComponent={InitialComponent}
          />
        </ErrorBoundary>
      </StaticRouter>
    </HelmetProvider>
  );

  return new Promise<{
    appHtml: string;
    htmlAttributes: string;
    head: string;
  }>((resolve, reject) => {
    const { pipe } = renderToPipeableStream(application, {
      onAllReady() {
        const output = new PassThrough();
        let appHtml = "";

        output.setEncoding("utf8");
        output.on("data", (chunk: string) => {
          appHtml += chunk;
        });
        output.on("error", reject);
        output.on("end", () => {
          const helmet = helmetContext.helmet;

          resolve({
            appHtml,
            htmlAttributes:
              helmet?.htmlAttributes.toString() || 'lang="en"',
            head: helmet
              ? [
                  helmet.title,
                  helmet.priority,
                  helmet.meta,
                  helmet.link,
                  helmet.script,
                ]
                  .map((fragment) => fragment.toString())
                  .join("\n")
              : "",
          });
        });

        pipe(output);
      },
      onShellError: reject,
      onError(error) {
        console.error(error);
      },
    });
  });
}
