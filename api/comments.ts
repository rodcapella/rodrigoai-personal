import { list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

type Comment = {
  id: string;
  slug: string;
  name: string;
  message: string;
  createdAt: string;
};

type RequestWithBody = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string | string[]>;
};

const SLUG_PATTERN = /^[a-z0-9-]{3,160}$/;

const sendJson = (response: ServerResponse, status: number, value: unknown) => {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(value));
};

const getSlug = (request: RequestWithBody) => {
  const url = new URL(request.url || "/", "http://localhost");
  const value = request.query?.slug ?? url.searchParams.get("slug") ?? "";
  return Array.isArray(value) ? value[0] : value;
};

const parseBody = (body: unknown): Record<string, unknown> => {
  if (typeof body === "string") return JSON.parse(body);
  if (body && typeof body === "object") return body as Record<string, unknown>;
  return {};
};

const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.trim().replace(/\s{3,}/g, "  ") : "";

const readComments = async (slug: string) => {
  const result = await list({ prefix: `comments/${slug}/`, limit: 100 });
  const comments = await Promise.all(
    result.blobs.map(async (blob) => {
      const response = await fetch(blob.url, { cache: "no-store" });
      if (!response.ok) return null;
      return (await response.json()) as Comment;
    }),
  );

  return comments
    .filter((comment): comment is Comment => Boolean(comment))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};

export default async function handler(
  request: RequestWithBody,
  response: ServerResponse,
) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("Comments API: BLOB_READ_WRITE_TOKEN is not configured");
      return sendJson(response, 503, {
        error: "Comments are temporarily unavailable.",
      });
    }

    if (request.method === "GET") {
      const slug = getSlug(request);
      if (!SLUG_PATTERN.test(slug)) {
        return sendJson(response, 400, { error: "Invalid article." });
      }

      const comments = await readComments(slug);
      return sendJson(response, 200, { comments });
    }

    if (request.method === "POST") {
      const body = parseBody(request.body);
      const slug = normalizeText(body.slug);
      const name = normalizeText(body.name);
      const message = normalizeText(body.message);
      const website = normalizeText(body.website);

      if (website) return sendJson(response, 201, { ok: true });
      if (!SLUG_PATTERN.test(slug)) {
        return sendJson(response, 400, { error: "Invalid article." });
      }
      if (name.length < 2 || name.length > 60) {
        return sendJson(response, 400, {
          error: "The name must be between 2 and 60 characters.",
        });
      }
      if (message.length < 3 || message.length > 1200) {
        return sendJson(response, 400, {
          error: "The comment must be between 3 and 1,200 characters.",
        });
      }
      if ((message.match(/https?:\/\//gi) || []).length > 2) {
        return sendJson(response, 400, {
          error: "The comment contains too many links.",
        });
      }

      const comment: Comment = {
        id: randomUUID(),
        slug,
        name,
        message,
        createdAt: new Date().toISOString(),
      };

      await put(
        `comments/${slug}/${comment.createdAt}-${comment.id}.json`,
        JSON.stringify(comment),
        {
          access: "public",
          addRandomSuffix: false,
          contentType: "application/json; charset=utf-8",
        },
      );

      return sendJson(response, 201, { comment });
    }

    response.setHeader("Allow", "GET, POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    console.error("Comments API error", error);
    return sendJson(response, 503, {
      error: "Comments are temporarily unavailable.",
    });
  }
}
