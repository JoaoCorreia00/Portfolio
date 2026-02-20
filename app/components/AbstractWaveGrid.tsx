"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function AbstractWaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cv = canvas;
    const cx = ctx;

    let animationId: number;
    let time = 0;

    const COLS = 28;
    const ROWS = 28;
    const WAVE_AMPLITUDE = 30;
    const WAVE_SPEED = 0.012;

    const CAMERA_FOV = 0.72;
    const HORIZON = 0.54;
    const GRID_SPREAD = 1.75;

    // Particles for extra visual interest
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 400;

    function initParticles(w: number, h: number) {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.7,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.4 + 0.1,
        });
      }
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = cv.offsetWidth;
      const height = cv.offsetHeight;

      cv.width = width * dpr;
      cv.height = height * dpr;
      cv.style.width = width + "px";
      cv.style.height = height + "px";

      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();

    function project(
      nx: number,
      nz: number,
      waveY: number,
      w: number,
      h: number
    ): [number, number, number] {
      const p = 1 / (CAMERA_FOV * (1 - nz) + 0.28);
      const screenX = w / 2 + nx * GRID_SPREAD * (w / 2) * p;
      const baseY = HORIZON * h + nz * (1 - HORIZON) * h * p;
      const screenY = baseY - waveY * p;
      return [screenX, screenY, p];
    }

    function draw() {
      const w = cv.offsetWidth;
      const h = cv.offsetHeight;

      // Clear with slight fade for trail effect (optional, disabled for crisp rendering)
      cx.clearRect(0, 0, w, h);

      // Dynamic hue that shifts slowly - cooler blues/purples for dark background
      const hueShift = Math.sin(time * 0.38) * 255;
      const baseHue = 205 + hueShift; // Shifted to deeper blue range
      const sat = 70;
      const light = 58;

      const pts: [number, number, number][][] = [];

      // Calculate grid points with wave displacement
      for (let c = 0; c <= COLS; c++) {
        pts[c] = [];
        const nx = (c / COLS) * 2 - 1;

        for (let r = 0; r <= ROWS; r++) {
          const nz = r / ROWS;

          // Multi-layered wave for more organic movement
          const wave =
            Math.sin(nx * 3.5 + nz * 2.8 + time * 1.4) * WAVE_AMPLITUDE +
            Math.sin(nx * 1.8 - nz * 3.2 + time * 0.9) *
              WAVE_AMPLITUDE *
              0.45 +
            Math.sin(nx * 5.0 + nz * 1.5 - time * 1.1) *
              WAVE_AMPLITUDE *
              0.25 +
            Math.sin(nx * 2.2 + nz * 4.0 + time * 0.6) * WAVE_AMPLITUDE * 0.15;

          pts[c][r] = project(nx, nz, wave, w, h);
        }
      }

      // ── Enhanced background gradient ─────────────────
      const bgGradient = cx.createLinearGradient(0, 0, 0, h);
      bgGradient.addColorStop(0, `hsla(${baseHue - 15}, 60%, 8%, 0.03)`);
      bgGradient.addColorStop(0.5, `hsla(${baseHue}, 50%, 5%, 0.02)`);
      bgGradient.addColorStop(1, `hsla(${baseHue + 10}, 40%, 3%, 0.04)`);
      cx.fillStyle = bgGradient;
      cx.fillRect(0, 0, w, h);

      // ── Horizontal lines with enhanced glow ─────────
      for (let r = ROWS; r >= 0; r--) {
        const nz = r / ROWS;
        
        const depthAlpha = nz * 0.18;

        cx.beginPath();
        cx.moveTo(pts[0][r][0], pts[0][r][1]);

        for (let c = 1; c <= COLS; c++) {
          const [x0, y0] = pts[c - 1][r];
          const [x1, y1] = pts[c][r];
          cx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        }

        // Brighter lines in center, fading at edges
        const edgeFade = 1 - Math.abs((r / ROWS) - 0.5) * 0.5;
        cx.strokeStyle = `hsla(${baseHue}, ${sat}%, ${
          light + nz * 18
        }%, ${depthAlpha * edgeFade})`;
        cx.lineWidth = 0.8 + nz * 0.5;
        cx.stroke();
      }

      // ── Vertical lines with improved visibility ──────
      for (let c = 0; c <= COLS; c++) {
        const nx = (c / COLS) * 2 - 1;
        const centreFade = 1 - Math.abs(nx) * 0.4;

        cx.beginPath();
        cx.moveTo(pts[c][0][0], pts[c][0][1]);

        for (let r = 1; r <= ROWS; r++) {
          const [x0, y0] = pts[c][r - 1];
          const [x1, y1] = pts[c][r];
          cx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        }

        // Enhanced vertical lines with slight color variation
        cx.strokeStyle = `hsla(${baseHue + 15}, ${sat - 10}%, ${
          light - 8
        }%, ${0.15 * centreFade})`;
        cx.lineWidth = 0.5;
        cx.stroke();
      }

      // ── Horizon glow with enhanced effect ────────────
      const glowHeight = h * 0.18;
      const horizonGradient = cx.createLinearGradient(
        0,
        HORIZON * h - glowHeight * 0.5,
        0,
        HORIZON * h + glowHeight
      );

      horizonGradient.addColorStop(
        0,
        "transparent"
      );
      horizonGradient.addColorStop(
        0.4,
        `hsla(${baseHue - 10}, 55%, 25%, 0.08)`
      );
      horizonGradient.addColorStop(
        0.7,
        `hsla(${baseHue + 5}, 45%, 35%, 0.12)`
      );
      horizonGradient.addColorStop(1, "transparent");

      cx.fillStyle = horizonGradient;
      cx.fillRect(0, HORIZON * h - glowHeight * 0.5, w, glowHeight * 1.5);

      // ── Center focal glow ────────────────────────────
      const centerGlow = cx.createRadialGradient(
        w / 2,
        HORIZON * h - 20,
        0,
        w / 2,
        HORIZON * h,
        w * 0.4
      );
      centerGlow.addColorStop(0, `hsla(${baseHue + 20}, 60%, 40%, 0.06)`);
      centerGlow.addColorStop(0.5, `hsla(${baseHue}, 50%, 30%, 0.03)`);
      centerGlow.addColorStop(1, "transparent");
      
      cx.fillStyle = centerGlow;
      cx.fillRect(0, 0, w, h);

      // ── Subtle floating particles ─────────────────────
      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(time * 0.5 + p.y * 0.01) * 0.2;
        
        // Reset particle if it goes off screen
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }

        // Fade based on position (brighter near center)
        const fadeY = 1 - (p.y / h);
        const fadeX = 1 - Math.abs((p.x / w) - 0.5) * 0.5;
        
        cx.beginPath();
        cx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        cx.fillStyle = `hsla(${baseHue + 30}, 60%, 70%, ${p.opacity * fadeY * fadeX})`;
        cx.fill();
      }

      // ── Scanline effect for depth (subtle) ────────────
      cx.fillStyle = `rgba(0, 0, 0, 0.015)`;
      for (let i = 0; i < h; i += 3) {
        cx.fillRect(0, i, w, 1);
      }

      // ── Bottom fade gradient to hide grid cut-off ──────
      const bottomFadeHeight = h * 0.30;
      const bottomFade = cx.createLinearGradient(0, h - bottomFadeHeight, 0, h);
      bottomFade.addColorStop(0, "transparent");
      bottomFade.addColorStop(1, "#0b0f14");
      cx.fillStyle = bottomFade;
      cx.fillRect(0, h - bottomFadeHeight, w, bottomFadeHeight);

      time += WAVE_SPEED;
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full will-change-transform"
      style={{
        pointerEvents: "none",
        opacity: 0.9,
      }}
      aria-hidden="true"
    />
  );
}
