import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, MessageCircle, Send } from "lucide-react";

type Comment = {
  id: string;
  slug: string;
  name: string;
  message: string;
  createdAt: string;
};

type CommentSectionProps = {
  slug: string;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = (await response.json()) as {
          comments?: Comment[];
          error?: string;
        };
        if (!response.ok || !data.comments) {
          throw new Error(data.error || "Comments are unavailable");
        }
        return data.comments;
      })
      .then(setComments)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError(
          reason instanceof Error
            ? reason.message
            : "Comments could not be loaded right now.",
        );
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [slug]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2 || cleanName.length > 60) {
      setError("Enter a name between 2 and 60 characters.");
      return;
    }
    if (cleanMessage.length < 3 || cleanMessage.length > 1200) {
      setError("Your comment must be between 3 and 1,200 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name: cleanName, message: cleanMessage, website }),
      });
      const data = (await response.json()) as { comment?: Comment; error?: string };
      if (!response.ok || !data.comment) {
        throw new Error(data.error || "Your comment could not be published.");
      }

      setComments((current) => [...current, data.comment as Comment]);
      setMessage("");
      setWebsite("");
      setSuccess(true);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Your comment could not be published.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="comentarios" className="mt-16 border-t border-primary/15 pt-12">
      <div className="mb-8 flex items-center gap-3">
        <span className="rounded-lg bg-primary/10 p-2.5 text-primary">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold">Comments</h2>
          <p className="text-sm text-muted-foreground">
            {comments.length === 0
              ? "Share your thoughts on this article."
              : `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-primary/15 bg-card/60 p-5 sm:p-7">
        <label htmlFor="comment-name" className="mb-2 block text-sm font-semibold">
          Name
        </label>
        <input
          id="comment-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={60}
          autoComplete="name"
          placeholder="How would you like to be identified?"
          className="w-full rounded-xl border border-primary/15 bg-background/60 px-4 py-3 outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />

        <label htmlFor="comment-message" className="mb-2 mt-5 block text-sm font-semibold">
          Comment
        </label>
        <textarea
          id="comment-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          maxLength={1200}
          rows={5}
          placeholder="Write your comment..."
          className="w-full resize-y rounded-xl border border-primary/15 bg-background/60 px-4 py-3 leading-relaxed outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/15"
        />
        <div className="mt-1 flex justify-between gap-4 text-xs text-muted-foreground">
          <span>Your comment will be public. Do not include personal information.</span>
          <span className="shrink-0">{message.length}/1200</span>
        </div>

        <div className="absolute -left-[10000px]" aria-hidden="true">
          <label htmlFor="comment-website">Website</label>
          <input
            id="comment-website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error && (
          <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </p>
        )}
        {success && (
          <p role="status" className="mt-4 flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4 shrink-0" /> Comment published.
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {submitting ? "Publishing..." : "Publish comment"}
        </button>
      </form>

      <div className="mt-10 space-y-5" aria-live="polite">
        {loading && <p className="text-sm text-muted-foreground">Loading comments...</p>}
        {!loading && comments.map((comment) => (
          <article key={comment.id} className="rounded-xl border border-primary/10 bg-card/40 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{comment.name}</h3>
              <time dateTime={comment.createdAt} className="text-xs text-muted-foreground">
                {formatDate(comment.createdAt)}
              </time>
            </div>
            <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-muted-foreground">
              {comment.message}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
