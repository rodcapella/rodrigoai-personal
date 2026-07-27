import { describe, expect, it } from "vitest";
import {
  isDisposableDomain,
  isDisposableEmail,
} from "@rodcapella/common-resources";

describe("disposable email blacklist", () => {
  it("blocks a domain listed in the public blacklist", () => {
    expect(isDisposableDomain("10minutemail.com")).toBe(true);
    expect(isDisposableEmail("user@10minutemail.com")).toBe(true);
  });

  it("allows a regular email domain", () => {
    expect(isDisposableDomain("example.com")).toBe(false);
    expect(isDisposableEmail("user@example.com")).toBe(false);
  });
});
