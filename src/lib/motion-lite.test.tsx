// @vitest-environment jsdom
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { motion } from "./motion-lite";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it("keeps prerendered content visible before JavaScript runs", () => {
  const html = renderToString(<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>Content</motion.div>);
  expect(html).toContain("opacity:1");
  expect(html).not.toContain("opacity:0");
});

it("executes native entrance animations with the requested timing", () => {
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  const animate = vi.fn().mockReturnValue({ cancel: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "animate", { value: animate, configurable: true });
  render(<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>Content</motion.div>);
  expect(animate).toHaveBeenCalledWith(
    [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0px)" }],
    { duration: 500, delay: 100, easing: "ease-out", fill: "backwards" },
  );
});
