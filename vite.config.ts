import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc';
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "path";
import { fileURLToPath } from 'url';

const strictCspBootstrap =
  'const s=document.createElement("script"),u="/assets/app.js";s.type="module";s.src=globalThis.trustedTypes?trustedTypes.createPolicy("bootstrap",{createScriptURL:v=>{if(v!==u)throw new TypeError("Blocked script URL");return v}}).createScriptURL(u):u;document.head.append(s);';
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

export default defineConfig({
  plugins: [
    react(),
    {
      name: "strict-csp-bootstrap",
      apply: "build",
      enforce: "post",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          const entryScript =
            '<script type="module" crossorigin src="/assets/app.js"></script>';

          if (!html.includes(entryScript)) {
            throw new Error("The production entry script could not be secured.");
          }

          return html.replace(
            entryScript,
            `<script>${strictCspBootstrap}</script>`,
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
