import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

interface ContentCarouselProps {
  children: ReactNode;
  ariaLabel: string;
  itemClassName?: string;
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        d={
          direction === "left"
            ? "M19 12H5m7-7-7 7 7 7"
            : "M5 12h14m-7-7 7 7-7 7"
        }
      />
    </svg>
  );
}

export default function ContentCarousel({
  children,
  ariaLabel,
  itemClassName = "",
}: ContentCarouselProps) {
  const items = Children.toArray(children);
  const viewportRef = useRef<HTMLDivElement>(null);
  const positionsRef = useRef<number[]>([0]);
  const pointerRef = useRef<{ id: number; x: number; scrollLeft: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slides = [...viewport.children] as HTMLElement[];
    const origin = slides[0]?.offsetLeft ?? 0;
    positionsRef.current = slides.map((item) => item.offsetLeft - origin);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [items.length, measure]);

  const goTo = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport || !items.length) return;
    const nextIndex = (index + items.length) % items.length;
    setActiveIndex(nextIndex);
    viewport.scrollTo({
      left: positionsRef.current[nextIndex] ?? 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [items.length]);

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerRef.current?.id !== event.pointerId) return;
    pointerRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (!items.length) return null;

  return (
    <section aria-label={ariaLabel} aria-roledescription="carousel">
      <div
        ref={viewportRef}
        tabIndex={0}
        aria-label={ariaLabel}
        className={`flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${dragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          goTo(activeIndex + (event.key === "ArrowLeft" ? -1 : 1));
        }}
        onScroll={(event) => {
          const current = event.currentTarget.scrollLeft;
          const closestIndex = positionsRef.current.reduce(
            (closest, position, index) =>
              Math.abs(position - current) <
              Math.abs((positionsRef.current[closest] ?? 0) - current)
                ? index
                : closest,
            0,
          );
          setActiveIndex(closestIndex);
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          pointerRef.current = {
            id: event.pointerId,
            x: event.clientX,
            scrollLeft: event.currentTarget.scrollLeft,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
        }}
        onPointerMove={(event) => {
          if (pointerRef.current?.id !== event.pointerId) return;
          event.currentTarget.scrollLeft =
            pointerRef.current.scrollLeft - (event.clientX - pointerRef.current.x);
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {items.map((item, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${items.length}`}
            className={`w-[88%] max-w-[500px] shrink-0 snap-start sm:w-[68%] lg:w-[46%] xl:w-[40%] ${itemClassName}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous article"
          onClick={() => goTo(activeIndex - 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-card text-primary shadow-sm transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          aria-label="Next article"
          onClick={() => goTo(activeIndex + 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-card text-primary shadow-sm transition-colors hover:border-primary/60 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Arrow direction="right" />
        </button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Article {activeIndex + 1} of {items.length}
      </p>
    </section>
  );
}
