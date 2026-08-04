import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const pageLastModifiedSources = {
  "/": [
    "src/pages/Index.tsx",
    "src/components/HeroSection.tsx",
    "src/components/AboutSection.tsx",
    "src/components/ExpertiseSection.tsx",
    "src/components/ProjectsSection.tsx",
    "src/components/ContactSection.tsx",
    "src/data/profile.ts",
  ],
  "/why-me": [
    "src/pages/WhyMe.tsx",
    "src/components/WhatDrivesMe.tsx",
    "src/components/layout/DirectAnswersSection.tsx",
    "src/components/seo/ProfilePageSchema.tsx",
    "src/data/personSchema.ts",
  ],
  "/professional": [
    "src/pages/Professional.tsx",
    "src/components/AboutMyCareer.tsx",
    "src/components/CoreCompetencesSection.tsx",
    "src/components/layout/DirectAnswersSection.tsx",
    "src/components/layout/professional",
    "src/components/seo/ProfilePageSchema.tsx",
    "src/data/personSchema.ts",
    "src/data/profile.ts",
  ],
  "/personal": [
    "src/pages/Personal.tsx",
    "src/components/layout/personal",
  ],
  "/side-projects": ["src/pages/SideProjects.tsx"],
  "/blog": ["src/pages/Blog.tsx", "src/data/blogPosts.ts"],
  "/blog/:slug": ["src/pages/BlogPost.tsx"],
  "/privacy": ["src/pages/Privacy.tsx"],
  "/contact": [
    "src/pages/Contact.tsx",
    "src/components/ui/FormField.tsx",
    "src/components/ui/TurnstileWidget.tsx",
  ],
};

const listFiles = (root, entry) => {
  const absolutePath = path.join(root, entry);
  if (!fs.existsSync(absolutePath)) return [];
  if (!fs.statSync(absolutePath).isDirectory()) return [absolutePath];

  return fs.readdirSync(absolutePath, { withFileTypes: true }).flatMap((item) =>
    listFiles(root, path.join(entry, item.name)),
  );
};

const latestFileTimestamp = (root, sources) => {
  const timestamps = sources
    .flatMap((source) => listFiles(root, source))
    .map((file) => fs.statSync(file).mtimeMs);

  return timestamps.length
    ? new Date(Math.max(...timestamps)).toISOString()
    : new Date().toISOString();
};

const gitOutput = (root, args) =>
  execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();

export const resolvePageLastModified = (root = process.cwd()) => {
  const buildTimestamp = new Date().toISOString();

  return Object.fromEntries(
    Object.entries(pageLastModifiedSources).map(([route, sources]) => {
      try {
        const dirty = gitOutput(root, [
          "status",
          "--porcelain",
          "--untracked-files=all",
          "--",
          ...sources,
        ]);

        if (dirty) return [route, buildTimestamp];

        const committedAt = gitOutput(root, [
          "log",
          "-1",
          "--format=%cI",
          "--",
          ...sources,
        ]);

        return [
          route,
          committedAt || latestFileTimestamp(root, sources),
        ];
      } catch {
        return [route, latestFileTimestamp(root, sources)];
      }
    }),
  );
};
