"use client";

import { useEffect, useRef, useState } from "react";

// Drag back from the ball and let go to shoot — like a slingshot.
// Simple physics: gravity, bounces off the rim and backboard, and a score when the ball drops through the hoop.

const W = 360, H = 480, R = 13, G = 0.32;
const RIM_L = 238, RIM_R = 298, RIM_Y = 170, BOARD_X = 306;

type Ball = { x: number; y: number; vx: number; vy: number; live: boolean; scored: boolean; t: number };

export default function Hoops() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(0);
  const [best, setBest] = useState(0);
  const [msg, setMsg] = useState("drag back from the ball, then let go");

  useEffect(() => {
    try { setBest(Number(localStorage.getItem("hoops-best") ?? 0)); } catch {}
  }, []);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    c.width = W * dpr; c.height = H * dpr;
    ctx.scale(dpr, dpr);

    const startX = () => 50 + Math.random() * 90;
    let ball: Ball = { x: startX(), y: 400, vx: 0, vy: 0, live: false, scored: false, t: 0 };
    let aim: { x: number; y: number } | null = null;
    let frame = 0, localScore = 0, localShots = 0, streak = 0;

    const toCanvas = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
    };
    const velocity = (p: { x: number; y: number }) => ({ vx: Math.max(-14, Math.min(14, (ball.x - p.x) * 0.13)), vy: Math.max(-17, Math.min(4, (ball.y - p.y) * 0.13)) });

    const down = (e: PointerEvent) => {
      if (ball.live) return;
      const p = toCanvas(e);
      if (Math.hypot(p.x - ball.x, p.y - ball.y) < 60) { aim = p; c.setPointerCapture(e.pointerId); }
    };
    const move = (e: PointerEvent) => { if (aim) aim = toCanvas(e); };
    const up = () => {
      if (!aim) return;
      const v = velocity(aim);
      aim = null;
      if (Math.hypot(v.vx, v.vy) < 2) return;
      ball = { ...ball, ...v, live: true, scored: false, t: 0 };
      localShots++; setShots(localShots);
    };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);

    const bounceOffPoint = (px: number, py: number) => {
      const dx = ball.x - px, dy = ball.y - py, d = Math.hypot(dx, dy);
      if (d < R + 3 && d > 0) {
        const nx = dx / d, ny = dy / d, dot = ball.vx * nx + ball.vy * ny;
        if (dot < 0) { ball.vx = (ball.vx - 2 * dot * nx) * 0.72; ball.vy = (ball.vy - 2 * dot * ny) * 0.72; }
        ball.x = px + nx * (R + 3); ball.y = py + ny * (R + 3);
      }
    };

    const reset = () => { ball = { x: startX(), y: 400, vx: 0, vy: 0, live: false, scored: false, t: 0 }; };

    const step = () => {
      if (ball.live) {
        const prevY = ball.y;
        ball.vy += G; ball.x += ball.vx; ball.y += ball.vy; ball.t++;
        bounceOffPoint(RIM_L, RIM_Y);
        bounceOffPoint(RIM_R, RIM_Y);
        if (ball.x + R > BOARD_X && ball.y > 70 && ball.y < 200 && ball.vx > 0) { ball.vx *= -0.6; ball.x = BOARD_X - R; }
        if (!ball.scored && prevY < RIM_Y && ball.y >= RIM_Y && ball.x > RIM_L + 4 && ball.x < RIM_R - 4 && ball.vy > 0) {
          ball.scored = true; localScore++; streak++; setScore(localScore);
          setMsg(streak >= 3 ? `${streak} in a row — on fire 🔥` : ["bucket!", "swish.", "money.", "nothing but net"][localScore % 4]);
          try {
            const b = Number(localStorage.getItem("hoops-best") ?? 0);
            if (localScore > b) { localStorage.setItem("hoops-best", String(localScore)); setBest(localScore); }
          } catch {}
        }
        if (ball.y + R > H - 20) { ball.y = H - 20 - R; ball.vy *= -0.45; ball.vx *= 0.8; }
        if (ball.x < -40 || ball.x > W + 40 || ball.t > 260 || (ball.y > H - 40 && Math.abs(ball.vy) < 1 && Math.abs(ball.vx) < 0.5)) {
          if (!ball.scored) { streak = 0; setMsg("so close. again"); }
          reset();
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // gym wall + floor
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#1b2a4a"); g.addColorStop(1, "#24375e");
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#c98d52"; ctx.fillRect(0, H - 20, W, 20);
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      for (let x = 0; x < W; x += 24) { ctx.beginPath(); ctx.moveTo(x, H - 20); ctx.lineTo(x, H); ctx.stroke(); }
      // backboard + pole
      ctx.fillStyle = "#6b7280"; ctx.fillRect(BOARD_X + 8, 120, 8, H - 140);
      ctx.fillStyle = "#f5f5f4"; ctx.fillRect(BOARD_X, 70, 8, 130);
      ctx.fillStyle = "#c8102e"; ctx.fillRect(BOARD_X - 2, 130, 3, 40);
      // net
      ctx.strokeStyle = "rgba(255,255,255,0.75)"; ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const x0 = RIM_L + (i * (RIM_R - RIM_L)) / 5, x1 = RIM_L + 10 + (i * (RIM_R - RIM_L - 20)) / 5;
        ctx.beginPath(); ctx.moveTo(x0, RIM_Y); ctx.lineTo(x1, RIM_Y + 40); ctx.stroke();
      }
      ctx.beginPath(); ctx.moveTo(RIM_L + 5, RIM_Y + 20); ctx.lineTo(RIM_R - 5, RIM_Y + 20); ctx.stroke();
      // rim
      ctx.strokeStyle = "#f97316"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(RIM_L, RIM_Y); ctx.lineTo(BOARD_X, RIM_Y); ctx.stroke();
      // aim guide (predicted path)
      if (aim) {
        const v = velocity(aim);
        const vx = v.vx;
        let x = ball.x, y = ball.y, vy = v.vy;
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        for (let i = 0; i < 26; i++) { vy += G * 2; x += vx * 2; y += vy * 2; if (i % 2 === 0) { ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill(); } }
      }
      // ball
      ctx.fillStyle = "#f08a24"; ctx.beginPath(); ctx.arc(ball.x, ball.y, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#3a1d06"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(ball.x - R, ball.y); ctx.lineTo(ball.x + R, ball.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ball.x, ball.y - R); ctx.lineTo(ball.x, ball.y + R); ctx.stroke();
      if (!ball.live && !aim) { ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(ball.x, ball.y, R + 9, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); }
      // label
      ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "600 11px IBM Plex Mono, monospace";
      ctx.fillText("WESTMINSTER DRAGONS", 14, 24);
    };

    step();
    return () => { cancelAnimationFrame(frame); c.removeEventListener("pointerdown", down); c.removeEventListener("pointermove", move); c.removeEventListener("pointerup", up); };
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#1b2a4a] text-white">
      <div className="px-4 pt-2 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span>score <b className="text-base text-[#f08a24]">{score}</b> / {shots}</span>
          <span>best <b>{best}</b></span>
        </div>
        <p className="mt-0.5 text-center text-white/60" aria-live="polite">{msg}</p>
      </div>
      <canvas ref={canvas} className="mx-auto aspect-[3/4] w-full max-w-[360px] touch-none" aria-label="Basketball mini-game: drag back from the ball and release to shoot" />
    </div>
  );
}
