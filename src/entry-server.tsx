import { renderToString } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./routes";

type HelmetFragment = { toString: () => string };
type HelmetState = {
  title: HelmetFragment;
  priority: HelmetFragment;
  meta: HelmetFragment;
  link: HelmetFragment;
  script: HelmetFragment;
  htmlAttributes: HelmetFragment;
};

export async function render(url: string) {
  const router = createMemoryRouter(routes, { initialEntries: [url] });
  const helmetContext: { helmet?: HelmetState } = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <RouterProvider router={router} />
    </HelmetProvider>,
  );
  const helmet = helmetContext.helmet;

  return {
    appHtml,
    htmlAttributes: helmet?.htmlAttributes.toString() || 'lang="en"',
    head: helmet
      ? [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
          .map((fragment) => fragment.toString())
          .join("\n")
      : "",
  };
}
