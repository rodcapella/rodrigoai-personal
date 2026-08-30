import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc';
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "path";
import { fileURLToPath } from 'url';
import { resolvePageLastModified } from "./scripts/lastmod.mjs";

const strictCspBootstrap =
  'const k="rpovoa-analytics-consent";let p;try{p=localStorage.getItem(k)}catch{}document.documentElement.dataset.privacyView=p==="granted"||p==="denied"?"launcher":"dialog";const c=document.currentScript,u=c&&c.dataset.appEntry;if(!u)throw new Error("Missing app entry");const s=document.createElement("script");s.type="module";s.src=globalThis.trustedTypes?trustedTypes.createPolicy("bootstrap",{createScriptURL:v=>{if(v!==u)throw new TypeError("Blocked script URL");return v}}).createScriptURL(u):u;document.head.append(s);';
const strictCspHash = `sha256-${createHash("sha256")
  .update(strictCspBootstrap)
  .digest("base64")}`;
const vercelConfig = readFileSync(
  new URL("./vercel.json", import.meta.url),
  "utf8",
);

if (!vercelConfig.includes(`'${strictCspHash}'`)) {
  throw new Error("The CSP bootstrap hash in vercel.json is out of date.");
}

// Se o __dirname der erro em ESM, usamos isto:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pageLastModified = resolvePageLastModified(__dirname);
const vercelObservabilityClientConfig =
  process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG ??
  process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG ??
  "";

export default defineConfig({
  define: {
    __PAGE_LAST_MODIFIED__: JSON.stringify(pageLastModified),
    __VERCEL_OBSERVABILITY_CLIENT_CONFIG__: JSON.stringify(
      vercelObservabilityClientConfig,
    ),
  },
  plugins: [
    react(),
    {
      name: "strict-csp-bootstrap",
      apply: "build",
      enforce: "post",
      transformIndexHtml: {
        order: "post",
        handler(html, context) {
          const entryScript =
            '<script type="module" crossorigin src="/assets/app.js"></script>';

          if (!html.includes(entryScript)) {
            throw new Error("The production entry script could not be secured.");
          }

          const entryChunk = context.bundle?.["assets/app.js"];

          if (!entryChunk || entryChunk.type !== "chunk") {
            throw new Error("The production entry chunk could not be versioned.");
          }

          const appVersion = createHash("sha256")
            .update(entryChunk.code)
            .digest("hex")
            .slice(0, 12);
          const appEntry = `/assets/app.js?v=${appVersion}`;
          const stylesheetLinks =
            html.match(/<link rel="stylesheet"[^>]*>/g) ?? [];
          const htmlWithPrioritizedStyles = stylesheetLinks.reduce(
            (result, stylesheet) => result.replace(stylesheet, ""),
            html,
          );

          return htmlWithPrioritizedStyles.replace(
            entryScript,
            `${stylesheetLinks.join("\n")}\n<script data-app-entry="${appEntry}">${strictCspBootstrap}</script>`,
          );
        },
      },
    },
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "framer-motion": path.resolve(__dirname, "./src/lib/motion-lite.tsx"),
    }
  },

  build: {
    modulePreload: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        entryFileNames: "assets/app.js",
        manualChunks: (id) => {
          const moduleId = id.replace(/\\/g, "/");
          if (!moduleId.includes("/node_modules/")) return;

          if (
            /\/node_modules\/(?:react|react-dom|react-router|react-router-dom|scheduler|@remix-run)\//.test(
              moduleId,
            )
          ) {
            return "react-core";
          }

          if (
            moduleId.includes("/node_modules/framer-motion/") ||
            moduleId.includes("/node_modules/motion-dom/") ||
            moduleId.includes("/node_modules/motion-utils/")
          ) {
            return "motion";
          }

          if (moduleId.includes("/node_modules/react-helmet-async/")) {
            return "seo";
          }
        },
      },
    },
  }
});
