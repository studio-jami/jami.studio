"use client";

import { useEffect, useRef } from "react";

/**
 * Synk's hero atmosphere: a swirling dotted-particle vortex, drawn on canvas
 * (authored code — no template assets). Particles ride logarithmic spiral
 * bands that sweep from the edges toward a calm center where the copy sits.
 *
 * Honors prefers-reduced-motion (renders one static frame), pauses when the
 * tab is hidden or the hero leaves the viewport, and re-tints itself when the
 * theme attribute flips (dot color derives from the computed --foreground).
 */

type Particle = {
  arm: number;
  t: number; // position along the spiral (0..1, 1 = outer edge)
  speed: number;
  size: number;
  alpha: number;
  wobble: number;
};

const ARMS = 7;
const COUNT = 1500;

function createParticles(): Particle[] {
  // Deterministic LCG so SSR/CSR and reduced-motion frames are stable.
  let seed = 990917;
  const rand = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: COUNT }, () => ({
    arm: Math.floor(rand() * ARMS),
    t: Math.pow(rand(), 0.62), // bias outward — dense at the rim, calm center
    speed: 0.012 + rand() * 0.02,
    size: 0.8 + rand() * 1.4,
    alpha: 0.25 + rand() * 0.75,
    wobble: rand() * Math.PI * 2
  }));
}

function readDotColor(el: HTMLElement): string {
  const fg = getComputedStyle(el).color;
  return fg || "rgb(255,255,255)";
}

export function DotVortex() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = createParticles();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let phase = 0;
    let visible = true;
    let dotColor = readDotColor(canvas);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height * 0.52;
      const maxR = Math.hypot(cx, cy) * 1.05;
      const minR = Math.min(width, height) * 0.1;

      ctx.fillStyle = dotColor;
      for (const p of particles) {
        // particles drift inward; wrap back to the rim
        const t = ((p.t - phase * p.speed) % 1 + 1) % 1;
        const r = minR + (maxR - minR) * Math.pow(t, 1.35);
        const armAngle = (p.arm / ARMS) * Math.PI * 2;
        // logarithmic spiral: angle advances as radius shrinks
        const angle =
          armAngle + (1 - t) * 4.2 + Math.sin(p.wobble + phase * 0.18) * 0.05;
        const x = cx + Math.cos(angle) * r * 1.18; // slight horizontal stretch
        const y = cy + Math.sin(angle) * r * 0.78; // squash vertically (tunnel)
        if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;
        // fade dots toward the calm center and slightly at the far rim
        const centerFade = Math.min(1, (r - minR) / (maxR * 0.22));
        ctx.globalAlpha = p.alpha * centerFade;
        const s = p.size * (0.5 + t * 0.8);
        ctx.fillRect(x, y, s, s);
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      phase += 1 / 60;
      draw();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (media.matches) {
        draw(); // static frame
      } else if (visible && !document.hidden) {
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    start();

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => start();
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        start();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onMotionChange = () => start();
    media.addEventListener("change", onMotionChange);

    // re-tint when the theme flips
    const themeObserver = new MutationObserver(() => {
      dotColor = readDotColor(canvas);
      if (media.matches) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotionChange);
      io.disconnect();
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} className="vortex" aria-hidden="true" />;
}
