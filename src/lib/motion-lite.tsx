/* eslint-disable react-refresh/only-export-components */
import {
  createElement,
  forwardRef,
  type CSSProperties,
  type PropsWithChildren,
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
      initial: _initial,
      exit: _exit,
      transition: _transition,
      viewport: _viewport,
      whileHover: _whileHover,
      whileInView,
      style,
      ...props
    },
    ref,
  ) {
    const target = (animate ?? whileInView) as MotionTarget | undefined;

    return createElement(tag, {
      ...props,
      ref,
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
