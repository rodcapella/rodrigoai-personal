import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import {
  HelmetProvider,
  type HelmetServerState,
} from "react-helmet-async";
import { routes } from "./routes";

export async function render(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] });
  const helmetContext: { helmet?: HelmetServerState } = {};
  const application = (
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
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
