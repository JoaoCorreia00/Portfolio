"use client";

import { useEffect, useRef } from "react";

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
    const ROWS = 22;
    const WAVE_AMPLITUDE = 28;
    const WAVE_SPEED = 0.008;

    const CAMERA_FOV = 0.68;
    const HORIZON = 0.38;
    const GRID_SPREAD = 1.75;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = cv.offsetWidth;
      const height = cv.offsetHeight;

      cv.width = width * dpr;
      cv.height = height * dpr;
      cv.style.width = width + "px";
      cv.style.height = height + "px";

      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

      cx.clearRect(0, 0, w, h);

      const hueShift = Math.sin(time * 0.15) * 15;
      const baseHue = 195 + hueShift;
      const sat = 75;
      const light = 62;

      const pts: [number, number, number][][] = [];

      for (let c = 0; c <= COLS; c++) {
        pts[c] = [];
        const nx = (c / COLS) * 2 - 1;

        for (let r = 0; r <= ROWS; r++) {
          const nz = r / ROWS;

          const wave =
            Math.sin(nx * 3.5 + nz * 2.8 + time * 1.4) * WAVE_AMPLITUDE +
            Math.sin(nx * 1.8 - nz * 3.2 + time * 0.9) *
              WAVE_AMPLITUDE *
              0.45 +
            Math.sin(nx * 5.0 + nz * 1.5 - time * 1.1) *
              WAVE_AMPLITUDE *
              0.25;

          pts[c][r] = project(nx, nz, wave, w, h);
        }
      }

      // ── Horizontal lines ─────────────────────────────
      for (let r = ROWS; r >= 0; r--) {
        const nz = r / ROWS;
        const depthAlpha = Math.max(0, Math.min(0.28, nz * 0.3));

        if (depthAlpha < 0.01) continue;

        cx.beginPath();
        cx.moveTo(pts[0][r][0], pts[0][r][1]);

        for (let c = 1; c <= COLS; c++) {
          const [x0, y0] = pts[c - 1][r];
          const [x1, y1] = pts[c][r];
          cx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        }

        cx.strokeStyle = `hsla(${baseHue}, ${sat}%, ${
          light + nz * 15
        }%, ${depthAlpha})`;
        cx.lineWidth = 0.8 + nz * 0.4;
        cx.stroke();
      }

      // ── Vertical lines ───────────────────────────────
      for (let c = 0; c <= COLS; c++) {
        const nx = (c / COLS) * 2 - 1;
        const centreFade = 1 - Math.abs(nx) * 0.5;

        cx.beginPath();
        cx.moveTo(pts[c][0][0], pts[c][0][1]);

        for (let r = 1; r <= ROWS; r++) {
          const [x0, y0] = pts[c][r - 1];
          const [x1, y1] = pts[c][r];
          cx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        }

        cx.strokeStyle = `hsla(${baseHue + 10}, ${sat - 5}%, ${
          light - 5
        }%, ${0.12 * centreFade})`;
        cx.lineWidth = 0.55;
        cx.stroke();
      }

      // ── Glow dots ────────────────────────────────────
      for (let r = ROWS - 4; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          const [sx, sy, p] = pts[c][r];
          const rowIntensity = (r - (ROWS - 4)) / 4;
          const dotAlpha = rowIntensity * 0.3;

          if (dotAlpha < 0.02) continue;

          const glowRadius = 3 * p;
          const gradient = cx.createRadialGradient(
            sx,
            sy,
            0,
            sx,
            sy,
            glowRadius
          );

          gradient.addColorStop(
            0,
            `hsla(${baseHue + 5}, 90%, 75%, ${dotAlpha * 0.6})`
          );
          gradient.addColorStop(
            0.5,
            `hsla(${baseHue + 10}, 85%, 70%, ${dotAlpha * 0.3})`
          );
          gradient.addColorStop(1, `hsla(${baseHue + 15}, 80%, 65%, 0)`);

          cx.beginPath();
          cx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
          cx.fillStyle = gradient;
          cx.fill();

          cx.beginPath();
          cx.arc(sx, sy, 0.6 * p, 0, Math.PI * 2);
          cx.fillStyle = `hsla(${baseHue}, 95%, 85%, ${dotAlpha})`;
          cx.fill();
        }
      }

      // ── Horizon ambient glow (scaled to screen) ──────
      const glowHeight = h * 0.12;
      const horizonGradient = cx.createLinearGradient(
        0,
        HORIZON * h,
        0,
        HORIZON * h + glowHeight
      );

      horizonGradient.addColorStop(
        0,
        `hsla(${baseHue - 10}, 70%, 50%, 0.06)`
      );
      horizonGradient.addColorStop(1, "transparent");

      cx.fillStyle = horizonGradient;
      cx.fillRect(0, HORIZON * h, w, glowHeight);

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
        opacity: 0.85,
      }}
      aria-hidden="true"
    />
  );
}
