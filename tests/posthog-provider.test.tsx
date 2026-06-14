import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const posthogMock = vi.hoisted(() => ({
  __loaded: false,
  capture: vi.fn(),
  debug: vi.fn(),
  init: vi.fn()
}));

vi.mock("posthog-js", () => ({
  default: posthogMock
}));

vi.mock("@posthog/react", () => ({
  PostHogProvider: ({ children }: { children: React.ReactNode }) => children
}));

describe("PostHogProvider explicit-event queue", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.useFakeTimers();
    vi.stubGlobal("window", {
      setInterval,
      clearInterval
    });
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "phc_test");
    vi.stubEnv("NEXT_PUBLIC_POSTHOG_HOST", "https://us.posthog.com");
    posthogMock.__loaded = false;
    posthogMock.capture.mockReset();
    posthogMock.debug.mockReset();
    posthogMock.init.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("queues first-load events until posthog-js reports loaded", async () => {
    const { captureMarketingEvent } = await import("@/components/analytics/posthog-provider");

    expect(posthogMock.init).toHaveBeenCalledOnce();

    captureMarketingEvent("$pageview", { $current_url: "https://www.jami.studio/" });
    captureMarketingEvent("page_view", { pathname: "/", path: "/" });
    expect(posthogMock.capture).not.toHaveBeenCalled();

    const initOptions = posthogMock.init.mock.calls[0]?.[1];
    posthogMock.__loaded = true;
    initOptions.loaded(posthogMock);

    expect(posthogMock.capture).toHaveBeenNthCalledWith(1, "$pageview", {
      $current_url: "https://www.jami.studio/"
    });
    expect(posthogMock.capture).toHaveBeenNthCalledWith(2, "page_view", {
      pathname: "/",
      path: "/"
    });

    captureMarketingEvent("project_index_view");
    expect(posthogMock.capture).toHaveBeenNthCalledWith(3, "project_index_view", undefined);
  });

  it("flushes queued events when posthog-js loads after the callback window", async () => {
    const { captureMarketingEvent } = await import("@/components/analytics/posthog-provider");

    captureMarketingEvent("$pageview", { $current_url: "https://www.jami.studio/projects" });
    expect(posthogMock.capture).not.toHaveBeenCalled();

    posthogMock.__loaded = true;
    await vi.advanceTimersByTimeAsync(250);

    expect(posthogMock.capture).toHaveBeenCalledWith("$pageview", {
      $current_url: "https://www.jami.studio/projects"
    });
  });
});
