/* eslint-disable react-refresh/only-export-components */
import {
  createElement,
  forwardRef,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PropsWithChildren,
  type RefObject,
} from "react";

type MotionTarget = Record<string, unknown>;

interface LiteMotionProps {
  animate?: MotionTarget;
  initial?: MotionTarget;
  exit?: MotionTarget;
  transition?: MotionTarget;
  viewport?: MotionTarget;
  whileHover?: MotionTarget;
  whileInView?: MotionTarget;
  style?: CSSProperties;
  [key: string]: unknown;
}

const finalStyle = (
  style: CSSProperties | undefined,
  target: MotionTarget | undefined,
): CSSProperties => {
  if (!target) return style ?? {};

  const { x, y, scale, ...properties } = target;
  const transforms: string[] = [];

  if (typeof x === "number") transforms.push(`translateX(${x}px)`);
  if (typeof y === "number") transforms.push(`translateY(${y}px)`);
  if (typeof scale === "number") transforms.push(`scale(${scale})`);

  return {
    ...style,
    ...properties,
    ...(transforms.length > 0 ? { transform: transforms.join(" ") } : {}),
  };
};

const createMotionElement = (tag: "article" | "div" | "form" | "span") =>
  forwardRef<HTMLElement, LiteMotionProps>(function MotionLite(
    {
      animate,
      initial,
      exit: _exit,
      transition,
      viewport,
      whileHover,
      whileInView,
      style,
      ...props
    },
    ref,
  ) {
    const elementRef = useRef<HTMLElement | null>(null);
    const reduced = useReducedMotion();
    const target = (animate ?? whileInView) as MotionTarget | undefined;
    const initialKey = JSON.stringify(initial);
    const targetKey = JSON.stringify(target);
    const transitionKey = JSON.stringify(transition);
    const viewportKey = JSON.stringify(viewport);
    const hoverKey = JSON.stringify(whileHover);
    const observesViewport = whileInView !== undefined;

    useEffect(() => {
      const element = elementRef.current;
      if (!element || reduced || !element.animate) return;
      const from = initialKey ? JSON.parse(initialKey) : undefined;
      const to = targetKey ? JSON.parse(targetKey) : undefined;
      const timing = transitionKey ? JSON.parse(transitionKey) : {};
      const view = viewportKey ? JSON.parse(viewportKey) : {};
      let animation: Animation | undefined;
      const play = () => {
        if (!from || !to) return;
        animation?.cancel();
        animation = element.animate(
          [finalStyle(undefined, from), finalStyle(undefined, to)] as Keyframe[],
          { duration: (timing.duration ?? 0.4) * 1000, delay: (timing.delay ?? 0) * 1000, easing: "ease-out", fill: "backwards" },
        );
      };
      if (!observesViewport || !("IntersectionObserver" in window)) {
        play();
        return () => animation?.cancel();
      }
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          play();
          if (view.once !== false) observer.disconnect();
        }
      }, { rootMargin: view.margin ?? "0px", threshold: view.amount ?? 0.1 });
      observer.observe(element);
      return () => { observer.disconnect(); animation?.cancel(); };
    }, [initialKey, targetKey, transitionKey, viewportKey, reduced, observesViewport]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || reduced || !hoverKey || !element.animate) return;
      let animation: Animation | undefined;
      const enter = () => {
        animation?.cancel();
        const base = targetKey ? JSON.parse(targetKey) : {};
        animation = element.animate([finalStyle(style, base), finalStyle(style, { ...base, ...JSON.parse(hoverKey) })] as Keyframe[], { duration: 200, fill: "forwards", easing: "ease-out" });
      };
      const leave = () => animation?.cancel();
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
      return () => { leave(); element.removeEventListener("mouseenter", enter); element.removeEventListener("mouseleave", leave); };
    }, [hoverKey, targetKey, reduced, style]);

    return createElement(tag, {
      ...props,
      ref: (element: HTMLElement | null) => {
        elementRef.current = element;
        if (typeof ref === "function") ref(element);
        else if (ref) ref.current = element;
      },
      style: finalStyle(style, target),
    });
  });

export const motion = {
  article: createMotionElement("article"),
  div: createMotionElement("div"),
  form: createMotionElement("form"),
  span: createMotionElement("span"),
};

export function AnimatePresence({
  children,
}: PropsWithChildren<{ mode?: "sync" | "wait" | "popLayout" }>) {
  return children;
}

interface InViewOptions {
  amount?: number;
  margin?: string;
  once?: boolean;
}

export function useInView(
  ref: RefObject<Element | null>,
  { amount = 0, margin = "0px", once = false }: InViewOptions = {},
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin: margin, threshold: amount },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount, margin, once, ref]);

  return isInView;
}

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}
