"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { submitContact } from '@/app/actions/contact';

// High-Performance HTML5 Canvas particle system for SCENES 01 to 08 (Cinematic Intro)
function ParticleScene({ onComplete }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Vector function to dynamically render the original circular Atriowings wing shield logo
  const drawLogoShield = (ctx, cx, cy, r, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;

    // 1. Base Circular Shield with Blue/Cyan Gradient
    const shieldGrad = ctx.createRadialGradient(cx - r * 0.2, cy - r * 0.2, r * 0.1, cx, cy, r);
    shieldGrad.addColorStop(0, '#00d2ff');
    shieldGrad.addColorStop(0.7, '#0066ff');
    shieldGrad.addColorStop(1, '#0033aa');
    ctx.fillStyle = shieldGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // 2. White Wing Stripes inside
    ctx.fillStyle = '#ffffff';

    // Stripe 1
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.45, cy - r * 0.08);
    ctx.bezierCurveTo(cx - r * 0.4, cy - r * 0.45, cx + r * 0.35, cy - r * 0.25, cx + r * 0.45, cy - r * 0.08);
    ctx.bezierCurveTo(cx + r * 0.2, cy - r * 0.18, cx - r * 0.1, cy - r * 0.13, cx - r * 0.45, cy - r * 0.08);
    ctx.fill();

    // Stripe 2
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.5, cy + r * 0.12);
    ctx.bezierCurveTo(cx - r * 0.45, cy - r * 0.2, cx + r * 0.38, cy - r * 0.05, cx + r * 0.48, cy + r * 0.12);
    ctx.bezierCurveTo(cx + r * 0.2, cy, cx - r * 0.1, cy + r * 0.05, cx - r * 0.5, cy + r * 0.12);
    ctx.fill();

    // Stripe 3
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.4, cy + r * 0.32);
    ctx.bezierCurveTo(cx - r * 0.35, cy + r * 0.05, cx + r * 0.4, cy + r * 0.15, cx + r * 0.45, cy + r * 0.32);
    ctx.bezierCurveTo(ctx + r * 0.2, cy + r * 0.2, cx - r * 0.05, cy + r * 0.23, cx - r * 0.4, cy + r * 0.32);
    ctx.fill();

    ctx.restore();
  };

  // Vector function to draw the symmetrical detailed feathered wings (Scene 04 & 05)
  const drawWings = (ctx, cx, cy, r, wingScale, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#00d2ff';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#00d2ff';
    ctx.shadowBlur = 12;

    const drawWingHalf = (c) => {
      const drawFeather = (ax, ay, bx, by, cx, cy, dx, dy, ex, ey) => {
        c.beginPath();
        c.moveTo(ax * r * 1.1, ay * r * 1.1);
        c.bezierCurveTo(bx * r * 1.1, by * r * 1.1, cx * r * 1.1, cy * r * 1.1, dx * r * 1.1, dy * r * 1.1);
        c.bezierCurveTo(ex * r * 1.1, ey * r * 1.1, (ax + 0.05) * r * 1.1, (ay + 0.02) * r * 1.1, ax * r * 1.1, ay * r * 1.1);
        c.fill();
        c.stroke();
      };

      const wingGrad = c.createLinearGradient(0, -r * 1.5, r * 3, r);
      wingGrad.addColorStop(0, 'rgba(0, 140, 255, 0.22)');
      wingGrad.addColorStop(0.6, 'rgba(0, 212, 255, 0.3)');
      wingGrad.addColorStop(1, 'rgba(0, 212, 255, 0.02)');
      c.fillStyle = wingGrad;

      // Render 10 distinct, layered, thin bird feathers (V-shape eagle wings model)
      drawFeather(0, 0, 0.8, -0.9, 2.2, -1.9, 3.8, -2.2, 2.9, -1.4);
      drawFeather(0.3, -0.1, 1.2, -0.9, 2.6, -1.6, 3.9, -1.6, 3.0, -1.0);
      drawFeather(0.6, -0.15, 1.5, -0.8, 2.8, -1.2, 3.8, -1.0, 2.9, -0.6);
      drawFeather(0.8, -0.1, 1.6, -0.6, 2.8, -0.8, 3.6, -0.5, 2.7, -0.2);
      drawFeather(0.9, -0.05, 1.7, -0.4, 2.7, -0.4, 3.4, -0.1, 2.5, 0.1);
      drawFeather(0.9, 0.05, 1.6, 0.05, 2.5, -0.1, 3.1, 0.2, 2.4, 0.3);
      drawFeather(0.8, 0.15, 1.5, 0.2, 2.3, 0.15, 2.8, 0.5, 2.1, 0.5);
      drawFeather(0.7, 0.25, 1.3, 0.3, 2.0, 0.35, 2.4, 0.8, 1.8, 0.7);
      drawFeather(0.5, 0.35, 1.0, 0.4, 1.6, 0.5, 2.0, 1.1, 1.4, 0.9);
      drawFeather(0.3, 0.45, 0.7, 0.5, 1.2, 0.65, 1.5, 1.3, 1.0, 1.0);
    };

    // Left Wing (flipped horizontally)
    ctx.save();
    ctx.translate(cx - r * 0.75, cy);
    ctx.scale(-wingScale, wingScale);
    drawWingHalf(ctx);
    ctx.restore();

    // Right Wing
    ctx.save();
    ctx.translate(cx + r * 0.75, cy);
    ctx.scale(wingScale, wingScale);
    drawWingHalf(ctx);
    ctx.restore();

    ctx.restore();
  };

  // Draw tiny wing icon framing the tagline
  const drawTinyWing = (ctx, x, y, scale, side) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale * side, scale);
    ctx.strokeStyle = '#00d2ff';
    ctx.lineWidth = 1.2;
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(6, -5, 18, -14, 32, -17);
    ctx.bezierCurveTo(26, -11, 20, -5, 14, -1);
    ctx.bezierCurveTo(22, -4, 30, -4, 36, -4);
    ctx.bezierCurveTo(28, 1, 22, 2, 14, 2);
    ctx.bezierCurveTo(20, 2, 27, 5, 31, 8);
    ctx.bezierCurveTo(23, 6, 17, 5, 10, 4);
    ctx.stroke();
    ctx.restore();
  };

  // Text titles underneath logo
  const drawLogoText = (ctx, tx, ty, scale, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';

    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.round(23 * scale)}px 'Space Grotesk', sans-serif`;
    ctx.fillText("ATRIOWINGS", tx, ty + 54 * scale);

    ctx.fillStyle = '#00BFFF';
    ctx.font = `600 ${Math.round(10 * scale)}px monospace`;
    ctx.fillText("TECHNOLOGIES", tx, ty + 72 * scale);

    ctx.restore();
  };

  // Dynamic Bezier math to retrieve points along the flight path
  const getBezierPoint = (t, p0, p1, p2, p3) => {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;

    const dt = 0.001;
    const x2 = ax * Math.pow(t + dt, 3) + bx * Math.pow(t + dt, 2) + cx * (t + dt) + p0.x;
    const y2 = ay * Math.pow(t + dt, 3) + by * Math.pow(t + dt, 2) + cy * (t + dt) + p0.y;
    const angle = Math.atan2(y2 - y, x2 - x);

    return { x, y, angle };
  };

  // Render stylized paper plane
  const drawPaperPlane = (ctx, x, y, angle, size, alpha) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#35D6FF';
    ctx.fillStyle = '#020817';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#35D6FF';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size, -size * 0.6);
    ctx.lineTo(-size * 0.3, 0);
    ctx.lineTo(-size, size * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size, 0);
    ctx.lineTo(-size * 0.3, 0);
    ctx.stroke();
    ctx.restore();
  };

  // Custom Vector outlines to replace emojis inside bubbles
  const drawVectorIcon = (ctx, cx, cy, size, type) => {
    ctx.save();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (type === 'web') {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.32, cy - size * 0.2);
      ctx.lineTo(cx - size * 0.58, cy);
      ctx.lineTo(cx - size * 0.32, cy + size * 0.2);

      ctx.moveTo(cx + size * 0.32, cy - size * 0.2);
      ctx.lineTo(cx + size * 0.58, cy);
      ctx.lineTo(cx + size * 0.32, cy + size * 0.2);

      ctx.moveTo(cx + size * 0.12, cy - size * 0.3);
      ctx.lineTo(cx - size * 0.12, cy + size * 0.3);
      ctx.stroke();
    } 
    else if (type === 'marketing') {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.3, cy - size * 0.15);
      ctx.lineTo(cx + size * 0.15, cy - size * 0.3);
      ctx.lineTo(cx + size * 0.25, cy + size * 0.2);
      ctx.lineTo(cx - size * 0.3, cy + size * 0.1);
      ctx.closePath();

      ctx.moveTo(cx - size * 0.1, cy + size * 0.1);
      ctx.lineTo(cx - size * 0.18, cy + size * 0.3);
      ctx.lineTo(cx - size * 0.05, cy + size * 0.3);

      ctx.moveTo(cx + size * 0.25, cy - size * 0.25);
      ctx.bezierCurveTo(cx + size * 0.38, cy - size * 0.08, cx + size * 0.38, cy + size * 0.05, cx + size * 0.25, cy + size * 0.18);
      ctx.stroke();
    } 
    else if (type === 'design') {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.4);
      ctx.lineTo(cx - size * 0.24, cy - size * 0.08);
      ctx.lineTo(cx - size * 0.12, cy + size * 0.28);
      ctx.lineTo(cx + size * 0.12, cy + size * 0.28);
      ctx.lineTo(cx + size * 0.24, cy - size * 0.08);
      ctx.closePath();

      ctx.moveTo(cx, cy - size * 0.4);
      ctx.lineTo(cx, cy + size * 0.1);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy + 0.1 * size, 2, 0, Math.PI * 2);
      ctx.stroke();
    } 
    else if (type === 'writing') {
      ctx.beginPath();
      ctx.moveTo(cx - size * 0.28, cy - size * 0.38);
      ctx.lineTo(cx + size * 0.12, cy - size * 0.38);
      ctx.lineTo(cx + size * 0.28, cy - size * 0.2);
      ctx.lineTo(cx + size * 0.28, cy + size * 0.38);
      ctx.lineTo(cx - size * 0.28, cy + size * 0.38);
      ctx.closePath();

      ctx.moveTo(cx + size * 0.12, cy - size * 0.38);
      ctx.lineTo(cx + size * 0.12, cy - size * 0.2);
      ctx.lineTo(cx + size * 0.28, cy - size * 0.2);

      ctx.moveTo(cx - size * 0.16, cy - size * 0.05);
      ctx.lineTo(cx + size * 0.16, cy - size * 0.05);
      ctx.moveTo(cx - size * 0.16, cy + size * 0.08);
      ctx.lineTo(cx + size * 0.16, cy + size * 0.08);
      ctx.moveTo(cx - size * 0.16, cy + size * 0.2);
      ctx.lineTo(cx + size * 0.08, cy + size * 0.2);
      ctx.stroke();
    } 
    else if (type === 'video') {
      ctx.beginPath();
      ctx.rect(cx - size * 0.36, cy - size * 0.25, size * 0.72, size * 0.52);

      ctx.moveTo(cx - size * 0.36, cy - size * 0.08);
      ctx.lineTo(cx + size * 0.36, cy - size * 0.08);

      ctx.moveTo(cx - size * 0.24, cy - size * 0.25);
      ctx.lineTo(cx - size * 0.12, cy - size * 0.08);
      ctx.moveTo(cx, cy - size * 0.25);
      ctx.lineTo(cx + size * 0.12, cy - size * 0.08);
      ctx.moveTo(cx + size * 0.24, cy - size * 0.25);
      ctx.lineTo(cx + size * 0.36, cy - size * 0.08);

      ctx.moveTo(cx - size * 0.08, cy + size * 0.06);
      ctx.lineTo(cx + size * 0.12, cy + size * 0.14);
      ctx.lineTo(cx - size * 0.08, cy + size * 0.22);
      ctx.closePath();
      ctx.stroke();
    }

    ctx.restore();
  };

  // Draw circular glowing service bubbles
  const drawServiceBubble = (ctx, x, y, iconType, themeColor, progress, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha * progress;
    
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2.2;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, 22 * progress, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(2, 10, 22, 0.9)';
    ctx.beginPath();
    ctx.arc(x, y, 22 * progress, 0, Math.PI * 2);
    ctx.fill();

    if (progress > 0.4) {
      drawVectorIcon(ctx, x, y, 22 * progress, iconType);
    }

    ctx.restore();
  };

  // Draw rising pedestal column underneath bubbles
  const drawPedestalColumn = (ctx, x, y, bottomY, label, themeColor, progress, alpha) => {
    ctx.save();
    ctx.globalAlpha = alpha * progress;

    const colWidth = 52;
    const colHeight = (bottomY - y - 22) * progress;

    const colGrad = ctx.createLinearGradient(x - colWidth/2, y + 22, x + colWidth/2, y + 22);
    colGrad.addColorStop(0, 'rgba(0, 191, 255, 0.04)');
    colGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.09)');
    colGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.16)');
    colGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.09)');
    colGrad.addColorStop(1, 'rgba(0, 191, 255, 0.04)');
    
    ctx.fillStyle = colGrad;
    ctx.strokeStyle = 'rgba(0, 191, 255, 0.22)';
    ctx.lineWidth = 1.2;
    
    ctx.beginPath();
    ctx.rect(x - colWidth/2, y + 22, colWidth, colHeight);
    ctx.fill();
    ctx.stroke();

    const baseY = y + 22 + colHeight;
    
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 2.2;
    ctx.shadowColor = themeColor;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.ellipse(x, baseY, 36, 12, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 1.0;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.ellipse(x, baseY, 24, 8, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.save();
    ctx.translate(x, baseY + 6);
    ctx.scale(1, -0.42);
    ctx.globalAlpha = alpha * progress * 0.26;
    
    ctx.strokeStyle = themeColor;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(0, colHeight + 22, 22, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = "bold 9px 'Space Grotesk', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(label, 0, colHeight + 64);
    ctx.restore();

    ctx.fillStyle = '#ffffff';
    ctx.font = "bold 10px 'Space Grotesk', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(label, x, baseY + 26);

    ctx.restore();
  };

  // Subtle background city skyline renderer
  const drawSkyline = (ctx, alpha, width, height) => {
    ctx.save();
    ctx.globalAlpha = alpha * 0.18;
    ctx.fillStyle = '#03152B';

    const buildings = [
      { x: 0.05, w: 0.04, h: 0.25 },
      { x: 0.09, w: 0.03, h: 0.35, antenna: true },
      { x: 0.13, w: 0.05, h: 0.2 },
      { x: 0.19, w: 0.04, h: 0.3 },
      { x: 0.24, w: 0.06, h: 0.15 },
      { x: 0.72, w: 0.04, h: 0.32 },
      { x: 0.77, w: 0.03, h: 0.4, antenna: true },
      { x: 0.81, w: 0.05, h: 0.22 },
      { x: 0.87, w: 0.04, h: 0.28 },
      { x: 0.92, w: 0.04, h: 0.18 }
    ];

    buildings.forEach((b) => {
      const bx = b.x * width;
      const bw = b.w * width;
      const bh = b.h * height;
      const by = height * 0.72 - bh;

      ctx.fillRect(bx, by, bw, bh);

      if (b.antenna) {
        ctx.strokeStyle = '#00BFFF';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(bx + bw / 2, by);
        ctx.lineTo(bx + bw / 2, by - 25);
        ctx.stroke();
      }
    });

    ctx.restore();
  };

  // Vector function to render the high-tech glowing planet earth globe horizon
  const drawHorizonGlobe = (ctx, alpha, width, height, elapsed) => {
    ctx.save();
    ctx.globalAlpha = alpha;

    const hx = width / 2;
    const hy = height * 1.56;
    const r = height * 0.94;
    const horizonY = hy - r;

    const globeGrad = ctx.createRadialGradient(hx, horizonY, 50, hx, hy, r);
    globeGrad.addColorStop(0, '#031935');
    globeGrad.addColorStop(0.3, '#020b18');
    globeGrad.addColorStop(1, '#01050e');
    ctx.fillStyle = globeGrad;
    ctx.beginPath();
    ctx.arc(hx, hy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(0, 191, 255, 0.12)';
    ctx.lineWidth = 1.0;
    for (let i = 1; i <= 6; i++) {
      const latR = r - i * 18;
      ctx.beginPath();
      ctx.arc(hx, hy, latR, Math.PI * 1.22, Math.PI * 1.78);
      ctx.stroke();
    }

    const meridianCount = 14;
    for (let i = -meridianCount / 2; i <= meridianCount / 2; i++) {
      ctx.beginPath();
      const xOffset = i * (width * 0.08);
      ctx.moveTo(hx - r * 0.6, hy - r * 0.8);
      ctx.quadraticCurveTo(hx + xOffset, hy - r * 1.05, hx + r * 0.6, hy - r * 0.8);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 178, 61, 0.85)';
    ctx.shadowColor = '#FF8A3D';
    const cityLightSeeds = [
      { angle: -0.16, depth: 8 }, { angle: -0.13, depth: 22 }, { angle: -0.09, depth: 14 },
      { angle: -0.05, depth: 32 }, { angle: -0.02, depth: 10 }, { angle: 0.01, depth: 28 },
      { angle: 0.04, depth: 15 }, { angle: 0.08, depth: 24 }, { angle: 0.11, depth: 8 },
      { angle: 0.14, depth: 30 }, { angle: -0.21, depth: 18 }, { angle: 0.21, depth: 20 },
      { angle: -0.1, depth: 40 }, { angle: -0.07, depth: 45 }, { angle: 0.03, depth: 48 },
      { angle: 0.06, depth: 38 }, { angle: 0.17, depth: 42 }
    ];

    cityLightSeeds.forEach((seed, index) => {
      const theta = Math.PI * 1.5 + seed.angle;
      const lightR = r - seed.depth;
      const lx = hx + Math.cos(theta) * lightR;
      const ly = hy + Math.sin(theta) * lightR;

      ctx.shadowBlur = 5 + (index % 3) * 3;
      ctx.beginPath();
      ctx.arc(lx, ly, 1.2 + (index % 2) * 0.8, 0, Math.PI * 2);
      ctx.fill();

      if (index > 0 && index < cityLightSeeds.length - 1) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 138, 61, 0.16)';
        ctx.lineWidth = 0.5;
        const prevTheta = Math.PI * 1.5 + cityLightSeeds[index - 1].angle;
        const prevR = r - cityLightSeeds[index - 1].depth;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(hx + Math.cos(prevTheta) * prevR, hy + Math.sin(prevTheta) * prevR);
        ctx.stroke();
      }
    });
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#00BFFF';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#00BFFF';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(hx, hy, r, Math.PI * 1.24, Math.PI * 1.76);
    ctx.stroke();
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.0;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(hx, hy, r - 1.5, Math.PI * 1.24, Math.PI * 1.76);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const flareRadius = 85 + Math.sin(elapsed * 2) * 8;
    const flareGrad = ctx.createRadialGradient(hx, horizonY + 5, 2, hx, horizonY + 5, flareRadius);
    flareGrad.addColorStop(0, '#FFFFFF');
    flareGrad.addColorStop(0.2, '#FFE8BC');
    flareGrad.addColorStop(0.5, 'rgba(255, 138, 61, 0.45)');
    flareGrad.addColorStop(0.8, 'rgba(0, 191, 255, 0.15)');
    flareGrad.addColorStop(1, 'rgba(2, 8, 23, 0)');
    ctx.fillStyle = flareGrad;
    ctx.beginPath();
    ctx.arc(hx, horizonY + 5, flareRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      const rayAngle = Math.PI * 1.5 + (i - (rayCount - 1) / 2) * 0.15;
      ctx.beginPath();
      ctx.moveTo(hx, horizonY + 5);
      ctx.lineTo(hx + Math.cos(rayAngle - 0.04) * 220, horizonY - 150);
      ctx.lineTo(hx + Math.cos(rayAngle + 0.04) * 220, horizonY - 150);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 60 : 160;
    const streakCount = isMobile ? 6 : 18;

    const particles = [];
    const streaks = [];
    const swirlParticles = [];
    const wingParticles = [];

    // Initialize floating ambient particles
    for (let i = 0; i < particleCount; i++) {
      const colors = ['#008CFF', '#00BFFF', '#35D6FF', '#FFFFFF'];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        size: 0.8 + Math.random() * 2.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.15 + Math.random() * 0.45,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        speedFactor: 0.2 + Math.random() * 0.8
      });
    }

    // Initialize falling light streaks
    for (let i = 0; i < streakCount; i++) {
      streaks.push({
        x: Math.random() * width,
        y: -100 - Math.random() * 300,
        length: 40 + Math.random() * 100,
        speed: 1.5 + Math.random() * 2.5,
        width: 0.5 + Math.random() * 1,
        color: i % 2 === 0 ? '#00BFFF' : '#35D6FF',
        alpha: 0.12 + Math.random() * 0.35
      });
    }

    // Initialize logo swirl vortex particles
    const swirlCount = isMobile ? 50 : 110;
    for (let i = 0; i < swirlCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const initialRadius = 130 + Math.random() * 230;
      swirlParticles.push({
        angle: angle,
        baseRadius: initialRadius,
        speed: 1.7 + Math.random() * 2.4,
        size: 1.2 + Math.random() * 2.6,
        color: i % 3 === 0 ? '#008CFF' : i % 3 === 1 ? '#00D4FF' : '#FFFFFF',
        alpha: 0.4 + Math.random() * 0.45,
        wobble: Math.random() * 8
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    startTimeRef.current = performance.now();
    const animate = (timestamp) => {
      const elapsed = (timestamp - startTimeRef.current) / 1000;

      ctx.fillStyle = '#020817';
      ctx.fillRect(0, 0, width, height);

      let cx = width / 2;
      let cy = height * 0.5;
      let logoScale = 1.0;
      
      const isScene03 = elapsed >= 4.0;
      const isScene04 = elapsed >= 5.2;
      const isScene05 = elapsed >= 6.8;
      const isScene06 = elapsed >= 8.2;
      const isScene07 = elapsed >= 9.8;
      const isScene08 = elapsed >= 11.6;

      if (isScene05) {
        const slideProgress = Math.min((elapsed - 6.8) / 1.2, 1.0);
        cx = width / 2 - (width * 0.28) * slideProgress;
        cy = height * 0.5 - (height * 0.05) * slideProgress;
        logoScale = 1.0 - 0.25 * slideProgress;
      }

      const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(width, height) * 0.55);
      radialGlow.addColorStop(0, '#03152B');
      radialGlow.addColorStop(0.5, '#020817');
      radialGlow.addColorStop(1, '#020817');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      if (isScene06 && !isScene08) {
        const skylineAlpha = Math.min((elapsed - 8.2) / 1.0, 1.0);
        drawSkyline(ctx, skylineAlpha, width, height);
      }

      let particleAlphaMult = 1.0;
      let waveAlpha = 0;
      let waveAmp = 5;
      let streakAlphaMult = 0;
      let convergeProgress = 0;

      if (elapsed < 2.6) {
        if (elapsed < 0.5) {
          particleAlphaMult = 0.2;
          waveAlpha = 0.05;
          waveAmp = 5;
        } else if (elapsed < 1.2) {
          const p = (elapsed - 0.5) / 0.7;
          particleAlphaMult = 0.2 + p * 0.8;
          waveAlpha = 0.05 + p * 0.65;
          waveAmp = 5 + p * 25;
          streakAlphaMult = p;
        } else {
          const p = (elapsed - 1.2) / 1.4;
          particleAlphaMult = 1.0;
          waveAlpha = 0.7 + p * 0.3;
          waveAmp = 30 + Math.sin(elapsed * 2) * 5;
          streakAlphaMult = 1.0;
          convergeProgress = p * 0.35;
        }
      } else if (elapsed < 4.0) {
        particleAlphaMult = 1.0;
        streakAlphaMult = Math.max(0, 1.0 - (elapsed - 2.6) * 1.5);
        waveAlpha = Math.max(0, 1.0 - (elapsed - 2.6) * 1.5);
        convergeProgress = Math.min(0.35 + (elapsed - 2.6) * 0.65, 1.0);
      } else {
        particleAlphaMult = Math.max(0.15, 1.0 - (elapsed - 4.0) * 0.45);
      }

      if (streakAlphaMult > 0) {
        ctx.strokeStyle = '#00BFFF';
        for (let i = 0; i < streaks.length; i++) {
          const st = streaks[i];
          ctx.beginPath();
          ctx.lineWidth = st.width;
          ctx.globalAlpha = st.alpha * streakAlphaMult;
          ctx.moveTo(st.x, st.y);
          ctx.lineTo(st.x, st.y + st.length);
          ctx.stroke();

          st.y += st.speed;
          if (st.y > height) {
            st.y = -st.length - 50;
            st.x = Math.random() * width;
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i];
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha * particleAlphaMult;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();

        if (convergeProgress > 0) {
          const targetX = isScene05 ? cx : width / 2;
          const targetY = isScene05 ? cy : height * 0.5;
          pt.x = pt.originX + (targetX - pt.originX) * convergeProgress;
          pt.y = pt.originY + (targetY - pt.originY) * convergeProgress;
        } else {
          pt.x += pt.vx * pt.speedFactor;
          pt.y += pt.vy * pt.speedFactor;

          if (pt.x < 0 || pt.x > width) pt.vx *= -1;
          if (pt.y < 0 || pt.y > height) pt.vy *= -1;

          pt.originX = pt.x;
          pt.originY = pt.y;
        }
      }

      if (waveAlpha > 0) {
        const waveLayers = [
          { freq: 0.003, speed: 0.03, ampMult: 1.0, color: '#007BFF', offset: 0 },
          { freq: 0.005, speed: -0.02, ampMult: 0.8, color: '#00D4FF', offset: 50 }
        ];

        waveLayers.forEach((layer) => {
          ctx.fillStyle = layer.color;
          const dotSpacing = isMobile ? 8 : 4;
          const baselineY = height * 0.75;

          for (let x = 0; x < width; x += dotSpacing) {
            const angle = x * layer.freq + elapsed * layer.speed * 50 + layer.offset;
            const y = baselineY + Math.sin(angle) * waveAmp * layer.ampMult;

            const distFromCenter = Math.abs(x - (width/2));
            const centerHighlight = Math.max(0, 1 - distFromCenter / (width * 0.45));
            ctx.globalAlpha = waveAlpha * (0.35 + centerHighlight * 0.35);

            ctx.beginPath();
            ctx.arc(x, y, isMobile ? 1.0 : 1.4, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      if (elapsed >= 2.6 && elapsed < 4.0) {
        const swirlElapsed = elapsed - 2.6;
        const swirlProgress = Math.min(swirlElapsed / 1.4, 1.0);

        swirlParticles.forEach((pt) => {
          const currentRadius = pt.baseRadius * (1 - swirlProgress * 0.88) + Math.sin(swirlElapsed * 8 + pt.wobble) * 8 * (1 - swirlProgress);
          const currentAngle = pt.angle + (swirlElapsed * pt.speed * (2 + swirlProgress * 3));

          const px = cx + Math.cos(currentAngle) * currentRadius;
          const py = cy + Math.sin(currentAngle) * currentRadius;

          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pt.alpha * (0.3 + swirlProgress * 0.7);

          ctx.beginPath();
          ctx.arc(px, py, pt.size * (1 - swirlProgress * 0.2), 0, Math.PI * 2);
          ctx.fill();
        });

        const coreRadius = 30 + swirlProgress * 70;
        const core = ctx.createRadialGradient(cx, cy, 5, cx, cy, coreRadius);
        core.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
        core.addColorStop(0.4, 'rgba(0, 140, 255, 0.45)');
        core.addColorStop(1, 'rgba(2, 8, 23, 0)');
        ctx.fillStyle = core;
        ctx.globalAlpha = 0.2 + swirlProgress * 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#00BFFF';
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = swirlProgress * 0.85;
        ctx.shadowColor = '#00BFFF';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(cx, cy, 48, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (swirlProgress > 0.1) {
          const logoFadeIn = Math.min((swirlProgress - 0.1) / 0.9, 1.0);
          drawLogoShield(ctx, cx, cy, 35, logoFadeIn);
        }
      }

      if (isScene03 && !isScene08) {
        const stage3Elapsed = elapsed - 4.0;
        const s3Progress = Math.min(stage3Elapsed / 1.2, 1.0);

        if (stage3Elapsed < 0.8) {
          const burstAlpha = Math.max(0, 1.0 - stage3Elapsed * 1.25);
          const burstRadius = 40 + stage3Elapsed * 280;
          const burstGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, burstRadius);
          burstGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
          burstGrad.addColorStop(0.2, 'rgba(0, 212, 255, 0.8)');
          burstGrad.addColorStop(0.6, 'rgba(0, 85, 255, 0.25)');
          burstGrad.addColorStop(1, 'rgba(2, 8, 23, 0)');
          ctx.fillStyle = burstGrad;
          ctx.globalAlpha = burstAlpha;
          ctx.beginPath();
          ctx.arc(cx, cy, burstRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        const beamAlpha = s3Progress * 0.85;
        ctx.save();
        ctx.globalAlpha = beamAlpha;
        const beamGrad = ctx.createLinearGradient(cx - width * 0.35, cy, cx + width * 0.35, cy);
        beamGrad.addColorStop(0, 'rgba(0, 191, 255, 0)');
        beamGrad.addColorStop(0.5, '#00d2ff');
        beamGrad.addColorStop(1, 'rgba(0, 191, 255, 0)');
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.moveTo(cx - width * 0.35 * logoScale, cy + 90 * logoScale);
        ctx.lineTo(cx + width * 0.35 * logoScale, cy + 90 * logoScale);
        ctx.stroke();
        ctx.restore();

        drawLogoShield(ctx, cx, cy, 35 * logoScale, 1.0);
        drawLogoText(ctx, cx, cy, logoScale, s3Progress);
      }

      if (isScene04 && !isScene08) {
        const stage4Elapsed = elapsed - 5.2;
        const s4Progress = Math.min(stage4Elapsed / 1.6, 1.0);

        drawWings(ctx, cx, cy, 35 * logoScale, s4Progress * logoScale, 1.0);

        if (stage4Elapsed < 1.6 && Math.random() < 0.4) {
          const side = Math.random() < 0.5 ? -1 : 1;
          wingParticles.push({
            x: cx + side * (50 + Math.random() * 45) * logoScale,
            y: cy - (10 + Math.random() * 35) * logoScale,
            vx: side * (0.8 + Math.random() * 1.5),
            vy: -0.5 - Math.random() * 1.0,
            size: 1.0 + Math.random() * 1.8,
            color: Math.random() < 0.5 ? '#35D6FF' : '#ffffff',
            life: 1.0
          });
        }

        for (let i = wingParticles.length - 1; i >= 0; i--) {
          const wp = wingParticles[i];
          ctx.fillStyle = wp.color;
          ctx.globalAlpha = wp.life * 0.8;
          ctx.beginPath();
          ctx.arc(wp.x, wp.y, wp.size, 0, Math.PI * 2);
          ctx.fill();

          wp.x += wp.vx;
          wp.y += wp.vy;
          wp.life -= 0.02;

          if (wp.life <= 0) {
            wingParticles.splice(i, 1);
          }
        }
      }

      const p0 = { x: cx + 85 * logoScale, y: cy }; 
      const p1 = { x: width * 0.46, y: height * 0.72 };
      const p2 = { x: width * 0.72, y: height * 0.32 };
      const p3 = { x: width * 0.85, y: height * 0.45 };

      if (isScene05 && !isScene08) {
        const stage5Elapsed = elapsed - 6.8;
        const s5Duration = 1.4;
        const s5Progress = Math.min(stage5Elapsed / s5Duration, 1.0);

        ctx.save();
        ctx.strokeStyle = '#00d2ff';
        ctx.lineWidth = 2.0;
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        
        const pathSegments = 100;
        const maxSegment = Math.round(s5Progress * pathSegments);
        for (let step = 1; step <= maxSegment; step++) {
          const tSegment = step / pathSegments;
          const pt = getBezierPoint(tSegment, p0, p1, p2, p3);
          ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#00BFFF';
        const nodeInterval = isMobile ? 3 : 5;
        for (let step = 1; step <= maxSegment; step += nodeInterval) {
          const tSegment = step / pathSegments;
          const pt = getBezierPoint(tSegment, p0, p1, p2, p3);
          
          ctx.save();
          ctx.globalAlpha = 0.8;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        if (s5Progress > 0 && s5Progress < 1.0) {
          const planePt = getBezierPoint(s5Progress, p0, p1, p2, p3);
          drawPaperPlane(ctx, planePt.x, planePt.y, planePt.angle, isMobile ? 12 : 16, 1.0);
        } else if (s5Progress >= 1.0) {
          const planePt = getBezierPoint(1.0, p0, p1, p2, p3);
          drawPaperPlane(ctx, planePt.x, planePt.y, planePt.angle, isMobile ? 12 : 16, 1.0);
        }
      }

      if (isScene06 && !isScene08) {
        const stage6Elapsed = elapsed - 8.2;
        const s6Progress = Math.min(stage6Elapsed / 1.0, 1.0);

        ctx.save();
        ctx.globalAlpha = s6Progress;
        ctx.textAlign = 'center';

        const hx = width * 0.58; 
        const hy = height * 0.35;

        ctx.fillStyle = '#00BFFF';
        ctx.font = "bold 11px monospace";
        ctx.fillText("ATRIOWINGS TECHNOLOGIES", hx, hy - 40);

        drawTinyWing(ctx, hx - 98, hy - 44, 0.4, 1);
        drawTinyWing(ctx, hx + 98, hy - 44, 0.4, -1);

        ctx.fillStyle = '#ffffff';
        ctx.font = "bold 28px 'Space Grotesk', sans-serif";
        ctx.fillText("DIGITAL SOLUTIONS", hx, hy);
        ctx.fillText("THAT GIVE YOUR BUSINESS", hx, hy + 32);

        ctx.fillStyle = '#00d2ff';
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 15;
        ctx.fillText("WINGS TO FLY HIGH", hx, hy + 66);
        ctx.restore();
      }

      const serviceItems = [
        { label: "WEB DEVELOPING", iconType: "web", themeColor: "#007BFF", t: 0.15 },
        { label: "DIGITAL MARKETING", iconType: "marketing", themeColor: "#00E5FF", t: 0.35 },
        { label: "PRODUCT DESIGN", iconType: "design", themeColor: "#38BDF8", t: 0.55 },
        { label: "CONTENT WRITING", iconType: "writing", themeColor: "#FFB800", t: 0.75 },
        { label: "VIDEO ADS & EDITING", iconType: "video", themeColor: "#FF8A3D", t: 0.95 }
      ];

      if (isScene07 && !isScene08) {
        const stage7Elapsed = elapsed - 9.8;
        const globeAlpha = Math.min(stage7Elapsed / 1.0, 1.0);
        
        drawHorizonGlobe(ctx, globeAlpha, width, height, elapsed);

        serviceItems.forEach((item, idx) => {
          const bubbleDelay = idx * 0.25;
          if (stage7Elapsed > bubbleDelay) {
            const bubbleProgress = Math.min((stage7Elapsed - bubbleDelay) / 0.5, 1.0);
            const pt = getBezierPoint(item.t, p0, p1, p2, p3);
            drawServiceBubble(ctx, pt.x, pt.y, item.iconType, item.themeColor, bubbleProgress, 1.0);
          }
        });
      }

      if (isScene08) {
        const stage8Elapsed = elapsed - 11.6;
        const s8Duration = 1.5;
        const s8Progress = Math.min(stage8Elapsed / s8Duration, 1.0);

        const globeAlpha = Math.max(0.2, 1.0 - s8Progress * 0.4);
        drawHorizonGlobe(ctx, globeAlpha, width, height, elapsed);

        ctx.fillStyle = '#01050e';
        ctx.globalAlpha = s8Progress * 0.35;
        ctx.fillRect(0, height * 0.65, width, height * 0.35);

        ctx.save();
        ctx.globalAlpha = s8Progress * 0.7;
        ctx.strokeStyle = 'rgba(0, 191, 255, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width * 0.16, height * 0.38);
        ctx.lineTo(width * 0.84, height * 0.38);
        ctx.stroke();

        serviceItems.forEach((item, idx) => {
          const tx = width * 0.16 + idx * (width * 0.17);
          ctx.beginPath();
          ctx.arc(tx, height * 0.38, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        serviceItems.forEach((item, idx) => {
          const startPt = getBezierPoint(item.t, p0, p1, p2, p3);
          const targetX = width * 0.16 + idx * (width * 0.17);
          const targetY = height * 0.38;

          const px = startPt.x + (targetX - startPt.x) * s8Progress;
          const py = startPt.y + (targetY - startPt.y) * s8Progress;

          drawPedestalColumn(ctx, px, py, height * 0.65, item.label, item.themeColor, s8Progress, 1.0);
          drawServiceBubble(ctx, px, py, item.iconType, item.themeColor, 1.0, 1.0);
        });
      }

      if (elapsed < 13.5) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#020817', 
        zIndex: 99999,
        pointerEvents: 'none' 
      }} 
    />
  );
}

export default function Page() {
  const [sceneState, setSceneState] = useState('scene01'); // scene01 -> promo

  // Carousel & interactive slide states
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // click detail modal state
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleSceneComplete = () => {
    setSceneState('promo');
  };

  const handleSkip = () => {
    setSceneState('promo');
  };

  const services = [
    { 
      id: "01",
      title: "Web Developing", 
      icon: "laptop-code", /* Professional Developer Icon */
      color: "#007BFF",
      tagline: "High-Performance Frontend Systems & Edge Deployment",
      metric: "0.8s Avg Page Load Time",
      desc: "Fast, responsive and scalable websites that turn ideas into powerful digital experiences.",
      details: "We build premium Next.js applications optimized for web vitals, incorporating Turbopack pipelines, serverless deployments, and responsive UI systems that scale automatically.",
      deliverables: ["Next.js App Router Architecture", "Headless CMS Integrations", "Vercel / Cloudflare Edge CDN", "SEO Schema Annotations"],
      link: "/services/web-developing"
    },
    { 
      id: "02",
      title: "Digital Marketing", 
      icon: "chart-line", /* Professional Data Analytics Icon */
      color: "#00E5FF",
      tagline: "Data-Driven Search Acquisition & Conversion Funnels",
      metric: "+250% Growth Scoped",
      desc: "Data-driven strategies that increase visibility, engagement and business growth.",
      details: "Accelerate your user acquisition with organic SEO setups, data-driven PPC campaigns, social pipeline automations, and live conversion analytics tracking.",
      deliverables: ["Technical SEO Site Audit", "Google Ads & Social Campaigns", "Analytics Funnel Tracking", "Email Sequence Automation"],
      link: "/services/digital-marketing"
    },
    { 
      id: "03",
      title: "Product Design", 
      icon: "drafting-compass", /* Professional Design Icon */
      color: "#38BDF8",
      tagline: "User-Centric High-Fidelity Mockups & Interactive Prototypes",
      metric: "100% Custom Layouts",
      desc: "User-centered designs that create beautiful, intuitive and impactful experiences.",
      details: "Design interactive systems with customized typography, layout grids, wireframes, and prototypes tested for maximum user retention and friction-free navigation.",
      deliverables: ["Figma UI/UX Component Library", "Interactive Clickable Prototypes", "Visual Identity & Style Guides", "A/B Layout Testing"],
      link: "/services/product-design"
    },
    { 
      id: "04",
      title: "Content Writing", 
      icon: "file-alt", /* Professional Content Copy Icon */
      color: "#FFB800",
      tagline: "High-Converting Copywriting Designed for Search Rank Authority",
      metric: "100% Original SEO Content",
      desc: "SEO-friendly content that tells your story and builds your brand authority.",
      details: "Deploy copy that ranks. We research high-traffic search terms and architect targeted blogs, email newsletters, and landing pages built around conversion.",
      deliverables: ["SEO Keyword Focus Matrix", "Conversion Landing Copy", "Technical Blogging & Articles", "Brand Voice Style Guide"],
      link: "/services/content-writing"
    },
    { 
      id: "05",
      title: "Video Ads & Editing", 
      icon: "play-circle", /* Professional Media Player Icon */
      color: "#FF8A3D",
      tagline: "Premium Motion Graphics & Interactive Video Creatives",
      metric: "4K Commercial Grade",
      desc: "High-impact videos and edits that capture attention and drive action.",
      details: "Capture instant attention on social feeds with commercial-grade promotional videos, motion design assets, and engaging product showcase reels.",
      deliverables: ["Social Ad Visual Creatives", "Logo Intro & Outro Motion", "Color Grading & SFX Design", "Multi-platform Format Renders"],
      link: "/services/video-ads"
    }
  ];

  const whyChooseUs = [
    { 
      title: "Innovation First", 
      icon: "rocket", 
      desc: "We use Next.js, AI workflows, and modern cloud deployment to build high-performance systems.",
      color: "#007BFF" 
    },
    { 
      title: "Expert Team", 
      icon: "users", 
      desc: "A dedicated collective of senior engineers, designers, and marketers committed to your growth.",
      color: "#00E5FF" 
    },
    { 
      title: "Result Driven", 
      icon: "chart-bar", 
      desc: "Every solution is built around conversion metrics to scale active customer acquisition.",
      color: "#38BDF8" 
    },
    { 
      title: "On-time Delivery", 
      icon: "clock", 
      desc: "Using structured agile sprints, we ensure your software deploys exactly when promised.",
      color: "#8B5CF6" 
    },
    { 
      title: "Reliable Support", 
      icon: "headset", 
      desc: "Our post-launch support SLA ensures your systems remain secure and fast 24/7/365.",
      color: "#FF8A3D" 
    }
  ];

  const processSteps = [
    { 
      step: "01", 
      name: "Discover", 
      icon: "search", 
      desc: "We analyze your target market, technical challenges, and business goals to draft a solid project scope blueprint.",
      color: "#007BFF" 
    },
    { 
      step: "02", 
      name: "Plan", 
      icon: "clipboard-list", 
      desc: "We architect wireframes, mapping out system database schemas, cloud infrastructure, and user journey pipelines.",
      color: "#00E5FF" 
    },
    { 
      step: "03", 
      name: "Build", 
      icon: "code", 
      desc: "Our senior developers write clean modular code, utilizing Next.js, robust API routers, and continuous integration pipelines.",
      color: "#0052FF" 
    },
    { 
      step: "04", 
      name: "Launch", 
      icon: "paper-plane", 
      desc: "We execute rigorous automated QA testing and optimize page speed metrics before deploying to edge CDN hosting.",
      color: "#38BDF8" 
    },
    { 
      step: "05", 
      name: "Grow", 
      icon: "chart-line", 
      desc: "We monitor live traffic analytics, provide SEO audits, and scale infrastructure as your customer acquisition expands.",
      color: "#00C4FF" 
    }
  ];

  const projects = [
    { 
      category: "Corporate", 
      title: "Universal Engineering", 
      desc: "Industrial engineering corporate website with detailed service portfolio.", 
      img: "/img/portfolio pics/Universal Engineering.jpeg",
      link: "https://universalengineering.org.in/"
    },
    { 
      category: "E-Commerce", 
      title: "Mithra Shoppy", 
      desc: "E-Commerce multi-vendor shopping platform built with secure online payments and inventory tracker.", 
      img: "/img/portfolio pics/mithrashopy.com_.png",
      link: "https://mithrashopy.com/"
    },
    { 
      category: "Health Care", 
      title: "PRS Dental Care", 
      desc: "Dental clinic portal with interactive scheduling systems.", 
      img: "/img/portfolio pics/Prs dentel.jpeg",
      link: "https://prsdentalcare.com/"
    },
    { 
      category: "Health Care", 
      title: "GJS Hospitals", 
      desc: "Multi-specialty hospital management and patient records portal.", 
      img: "/img/portfolio pics/G.j Chid.jpeg",
      link: "https://gjshospitals.com/"
    },
    { 
      category: "Travel & Tours", 
      title: "Sivaji Sons", 
      desc: "Luxury travel booking engine with integrated packages planner.", 
      img: "/img/portfolio pics/Sivaji sons.jpeg",
      link: "http://www.sivajison.com/"
    }
  ];

  const partners = [
    { name: "Aarions", img: "/img/vendor/newbrand1.png" },
    { name: "Mithra Shoppy", img: "/img/vendor/newbrand2.png" },
    { name: "Dhara Foundations", img: "/img/vendor/newbrand3.png" },
    { name: "Sri Gnana Sai Baba Mandir", img: "/img/vendor/newbrand4.png" },
    { name: "Travel Hassle Free", img: "/img/vendor/newbrand5.png" },
    { name: "Yakobu", img: "/img/vendor/newbrand6.png" },
    { name: "M-Cars", img: "/img/vendor/mcars.png" },
    { name: "News Ghru", img: "/img/vendor/newsghru.png" },
    { name: "School", img: "/img/vendor/school.png" },
    { name: "Scissors", img: "/img/vendor/sissers.png" },
    { name: "UE Logo", img: "/img/vendor/uelogo.png" },
    { name: "Blessence", img: "/img/vendor/blessence.png" },
    { name: "Miniso", img: "/img/vendor/miniso poster logo.png" },
    { name: "PRS Logo", img: "/img/vendor/PRS LOGO.png" },
    { name: "Sivaji Sons", img: "/img/vendor/sivajisons.png" },
    { name: "Joyson Trust", img: "/img/vendor/joysontrust.png" },
    { name: "Space Media", img: "/img/vendor/spacemedia.png" },
    { name: "Meera Filings", img: "/img/vendor/meera filngs.png" },
    { name: "Digital Ghru", img: "/img/vendor/digitalghru.png" },
    { name: "Vasanth", img: "/img/vendor/vasanth.png" }
  ];

  const testimonials = [
    {
      stars: 5,
      text: "Atriowings delivered our website on time with excellent quality. Their team is professional, creative and easy to work with.",
      name: "Ramesh Kumar",
      role: "CEO, Naturals Salon",
      img: "/img/testimonial-1.jpg"
    },
    {
      stars: 5,
      text: "Their digital marketing strategies increased our online visibility and brought amazing results. Highly recommended!",
      name: "Priya Sharma",
      role: "Marketing Head, Skylark Institute",
      img: "/img/testimonial-2.jpg"
    },
    {
      stars: 5,
      text: "Great experience working with Atriowings. They understood our requirements and exceeded our expectations.",
      name: "Vikram Raj",
      role: "Director, Green Trends",
      img: "/img/testimonial-3.jpg"
    }
  ];

  // Stats numbers counter
  const CounterNumber = ({ value, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (!isInView) return;
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) return;
      const totalMiliseconds = 1600;
      const stepTime = Math.max(Math.floor(totalMiliseconds / end), 12);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 40);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
  };

  const handleNextService = () => {
    setCurrentServiceIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrevService = () => {
    setCurrentServiceIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('mobile', formData.mobile);
    submitData.append('subject', 'Promo Page Consultation Quote Request');
    submitData.append('message', formData.message);

    try {
      const res = await submitContact(submitData);
      if (res.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setQuoteOpen(false);
          setFormData({ name: '', email: '', mobile: '', message: '' });
        }, 2500);
      } else {
        alert(res.message || 'Failed to submit request.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during submission.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="promo-viewport">
      
      {/* Scoped CSS Stylesheet - Configured strictly to represent the light-themed premium look of the reference image */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Rubik:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .promo-viewport {
          background-color: #F1F4F8; /* Cozy, slightly dimmed gray-blue background */
          color: #0B1F3A;
          font-family: 'Rubik', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          position: relative;
        }

        .heading-font {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Topbar Header styling matching Atriowings official site header layout */
        .topbar-wrapper {
          background: #091E3E;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13.5px;
          padding: 8px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .topbar-links {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .topbar-link {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .topbar-socials {
          display: flex;
          gap: 12px;
        }

        .topbar-social-btn {
          color: #ffffff;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          transition: all 0.2s;
        }

        .topbar-social-btn:hover {
          background: #008CFF;
          border-color: #008CFF;
        }

        .header-navbar {
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 999;
        }

        .navbar-logo-wrap {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .nav-logo-brand-img {
          height: 38px;
          margin-right: 12px;
        }

        .nav-menu-links {
          display: none;
          gap: 26px;
          align-items: center;
        }

        @media (min-width: 992px) {
          .nav-menu-links {
            display: flex;
          }
        }

        .nav-menu-link {
          text-decoration: none;
          color: #0B1F3A;
          font-weight: 700;
          font-size: 14.5px;
          transition: color 0.2s;
        }

        .nav-menu-link:hover, .nav-menu-link.active {
          color: #008CFF;
        }

        .navbar-right-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .search-icon-btn {
          color: #008CFF;
          font-size: 16px;
          cursor: pointer;
        }

        .talk-btn {
          background: #008CFF;
          color: #ffffff;
          border: none;
          padding: 10px 24px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0, 140, 255, 0.25);
        }

        .talk-btn:hover {
          background: #006dd4;
        }

        /* Hero section container & background image styling */
        .hero-landing-grid-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          background: #ffffff;
        }

        .hero-blur-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("/img/promo.png");
          background-size: cover;
          background-position: center;
          filter: none;
          opacity: 1.0; /* Fully clear and visible */
          z-index: 0;
          pointer-events: none;
        }

        .hero-landing-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px 80px 24px; /* Lifted up by reducing top padding */
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-content-panel {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          padding: 0;
          border-radius: 0;
          border: none;
          box-shadow: none;
        }

        .hero-welcome-badge {
          display: inline-block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #00D2FF; /* Cyber cyan for contrast */
          border: 1px solid rgba(0, 210, 255, 0.4);
          background: rgba(0, 210, 255, 0.08);
          padding: 6px 14px;
          border-radius: 4px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .hero-title-headline {
          font-family: 'Nunito', sans-serif; /* Matched to homepage headers */
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.15;
          color: #FFFFFF; /* High-contrast white */
          margin: 0 0 20px 0;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.65); /* Drop shadow for clarity */
        }

        .hero-title-blue {
          color: #00D2FF; /* Cyber cyan wings highlight */
          text-shadow: 0 0 15px rgba(0, 210, 255, 0.4), 0 4px 15px rgba(0, 0, 0, 0.65);
        }

        .hero-description-para {
          color: #F1F5F9; /* Very light slate for contrast */
          font-size: 15px;
          line-height: 1.6;
          margin: 0 auto 36px auto;
          max-width: 620px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65);
        }

        .hero-cta-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-blue {
          background: #008CFF;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14.5px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
          box-shadow: 0 6px 18px rgba(0, 140, 255, 0.3);
        }

        .btn-blue:hover {
          background: #0072d0;
        }

        .btn-outline {
          border: 2px solid rgba(255, 255, 255, 0.6);
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14.5px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-outline:hover {
          border-color: #ffffff;
          background: #ffffff;
          color: #091E3E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
        }

        /* Large vector wings panel (right hero side) matching the layout */
        .hero-vector-panel {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 400px;
        }

        .giant-wings-svg {
          width: 100%;
          height: auto;
          max-width: 440px;
          filter: drop-shadow(0 15px 30px rgba(0, 140, 255, 0.25));
        }

        .stats-bar-box {
          max-width: 1150px;
          margin: -60px auto 20px auto; /* Overlaps half of the Hero banner and pulls section up */
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
          padding: 0 16px;
          position: relative;
          z-index: 10; /* Float above sections */
        }

        @media (min-width: 576px) {
          .stats-bar-box {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .stats-bar-box {
            grid-template-columns: repeat(5, 1fr); /* FORCES ALL 5 CARDS IN ONE SINGLE LINE ON DESKTOP */
          }
        }

        .stat-bar-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-left: 4px solid var(--theme-color);
          border-radius: 14px;
          padding: 22px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          box-shadow: 0 15px 35px rgba(9, 30, 62, 0.05), 0 1px 3px rgba(9, 30, 62, 0.02); /* Multi-layered deep smooth shadow */
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* Butter smooth transition */
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Shimmer Sheen Light Effect */
        .stat-bar-card::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          transition: all 0.6s ease;
          opacity: 0;
          pointer-events: none;
        }

        .stat-bar-card:hover::after {
          opacity: 1;
          left: 130%;
          transition: all 0.6s ease;
        }

        .stat-bar-card:hover {
          transform: translateY(-8px); /* Deeper lift on hover */
          animation: hover-blink-pulse 1.4s infinite ease-in-out;
          border-color: var(--theme-color);
        }

        @keyframes hover-blink-pulse {
          0% {
            box-shadow: 0 0 10px var(--theme-color-soft);
            background: rgba(255, 255, 255, 0.85);
          }
          50% {
            box-shadow: 0 0 20px var(--theme-color-glow-bright);
            background: rgba(255, 255, 255, 0.96);
          }
          100% {
            box-shadow: 0 0 10px var(--theme-color-soft);
            background: rgba(255, 255, 255, 0.85);
          }
        }

        .stat-bar-icon-wrap {
          font-size: 28px;
          color: var(--theme-color);
          transition: transform 0.25s;
        }

        .stat-bar-card:hover .stat-bar-icon-wrap {
          transform: scale(1.15);
        }

        .stat-bar-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #091E3E;
        }

        .stat-bar-label {
          font-size: 12px;
          color: #64748B;
          font-weight: 600;
        }

        /* Core Services Section with slider layout */
        .section-wrapper {
          padding: 60px 24px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        #services.section-wrapper {
          padding-top: 10px; /* Reduced top padding for overlapping stats card placement */
        }

        .section-welcome-badge {
          display: inline-block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #00D2FF; /* Cyber cyan badge */
          border: 1px solid rgba(0, 210, 255, 0.4);
          background: rgba(0, 210, 255, 0.08);
          padding: 6px 16px;
          border-radius: 50px;
          font-weight: 700;
          margin-bottom: 16px;
          text-shadow: 0 0 10px rgba(0, 210, 255, 0.2);
          animation: badge-blink-glow 2.5s infinite ease-in-out;
        }

        @keyframes badge-blink-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(0, 210, 255, 0.1);
            border-color: rgba(0, 210, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(0, 210, 255, 0.4);
            border-color: rgba(0, 210, 255, 0.7);
          }
        }

        .section-headline {
          font-family: 'Nunito', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800;
          background: linear-gradient(135deg, #008CFF 0%, #00E5FF 100%); /* High-end theme gradient */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 40px 0;
          position: relative;
          display: inline-block;
          animation: text-glow-pulse 3s infinite ease-in-out;
        }

        @keyframes text-glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 0px rgba(0, 140, 255, 0));
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.35));
          }
        }

        /* Service sliders matching the screenshot cards */
        /* Services infinite marquee matching references */
        .services-slider-container {
          max-width: 100%;
          overflow: hidden;
          padding: 24px 0;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
        }

        /* Ambient gradient fades on the edges of the services marquee */
        .services-slider-container::before,
        .services-slider-container::after {
          content: "";
          position: absolute;
          top: 0;
          width: 120px;
          height: 100%;
          z-index: 5;
          pointer-events: none;
        }

        .services-slider-container::before {
          left: 0;
          background: linear-gradient(to right, #F1F4F8 10%, rgba(241,244,248,0) 100%);
        }

        .services-slider-container::after {
          right: 0;
          background: linear-gradient(to left, #F1F4F8 10%, rgba(241,244,248,0) 100%);
        }

        .services-carousel-mask {
          overflow: hidden;
          width: 100%;
          padding: 10px 0;
          display: flex;
          justify-content: flex-start;
        }

        .services-scroll-deck {
          display: flex;
          gap: 24px;
          animation: servicesMarquee 35s linear infinite;
          width: max-content;
        }

        .services-scroll-deck:hover {
          animation-play-state: paused; /* Hover pauses the scrolling so cards can be clicked easily */
        }

        @keyframes servicesMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .promo-service-card {
          width: 290px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1.5px solid rgba(148, 163, 184, 0.14);
          padding: 36px 24px;
          border-radius: 16px;
          text-align: left;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Shimmer sweep effect */
        .promo-service-card::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          transition: all 0.6s ease;
          opacity: 0;
          pointer-events: none;
        }

        .promo-service-card:hover::after {
          opacity: 1;
          left: 130%;
          transition: all 0.6s ease;
        }

        .promo-service-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-glow);
          opacity: 0.8;
          transition: opacity 0.25s;
        }

        .promo-service-card:hover {
          transform: translateY(-8px);
          border-color: var(--card-glow);
          animation: service-card-pulse 1.4s infinite ease-in-out;
        }

        @keyframes service-card-pulse {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(9, 30, 62, 0.05), 0 0 10px var(--card-glow-soft);
          }
          50% {
            box-shadow: 0 16px 40px rgba(9, 30, 62, 0.08), 0 0 20px var(--card-glow-bright);
          }
        }

        .promo-service-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 38px;
          font-weight: 700;
          color: var(--card-glow);
          opacity: 0.16;
          margin-bottom: 8px;
          transition: opacity 0.25s;
        }

        .promo-service-card:hover .promo-service-number {
          opacity: 0.35;
        }

        .promo-service-icon-box {
          width: 58px;
          height: 58px;
          border-radius: 12px;
          background: var(--card-glow-soft);
          border: 1px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          color: var(--card-glow);
          margin-bottom: 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.02);
        }

        .promo-service-card:hover .promo-service-icon-box {
          transform: scale(1.15) rotate(6deg);
          background: var(--card-glow);
          color: #ffffff;
          box-shadow: 0 8px 20px var(--card-glow-bright);
        }

        .promo-service-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #091E3E;
          margin: 0 0 12px 0;
        }

        .promo-service-desc {
          font-size: 13px;
          color: #64748B;
          line-height: 1.5;
          margin: 0 0 24px 0;
          flex-grow: 1;
        }

        .explore-service-link {
          color: #008CFF;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Why Choose Atriowings circle blocks */
        #why-choose-us {
          background-image: url("/img/why-choose-bg.jpg");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
        }

        /* Why Choose Atriowings upgraded cards matching first image */
        .why-choose-row {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          padding: 0 16px;
        }

        @media (min-width: 576px) {
          .why-choose-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .why-choose-row {
            grid-template-columns: repeat(5, 1fr); /* 5 cards in a line */
          }

          /* Horizontal connecting dotted line behind cards */
          .why-choose-row::before {
            content: "";
            position: absolute;
            top: 66px; /* Aligns with the vertical center of the icon circle */
            left: 10%;
            right: 10%;
            height: 2px;
            background-image: linear-gradient(to right, rgba(0, 140, 255, 0.25) 50%, rgba(255,255,255,0) 0%);
            background-position: bottom;
            background-size: 10px 2px;
            background-repeat: repeat-x;
            z-index: -1;
          }
        }

        .why-choose-card {
          background-color: transparent;
          background-image: linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), url("/img/why-choose-bg.jpg");
          background-size: cover;
          background-position: center;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-bottom: 4px solid var(--accent-color);
          border-right: 4px solid var(--accent-color);
          border-radius: 20px;
          border-bottom-right-radius: 28px; /* Larger curve in bottom-right matching screenshot */
          padding: 30px 20px 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 12px 30px rgba(9, 30, 62, 0.04);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
        }

        .why-choose-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px var(--accent-color-soft);
          border-color: var(--accent-color);
        }

        .why-choose-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--accent-color-light);
          border: 1px solid var(--accent-color-halo);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .why-choose-icon-wrapper::after {
          content: "";
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border-radius: 50%;
          border: 1.5px dashed var(--accent-color-halo-ring);
          opacity: 0.5;
          transition: transform 0.8s ease;
        }

        .why-choose-card:hover .why-choose-icon-wrapper {
          transform: scale(1.08);
          background: var(--accent-color);
          border-color: var(--accent-color);
        }

        .why-choose-card:hover .why-choose-icon-wrapper::after {
          transform: rotate(180deg);
          opacity: 0.85;
          border-color: var(--accent-color);
        }

        .why-choose-icon-inner {
          font-size: 26px;
          color: var(--accent-color);
          transition: color 0.3s;
        }

        .why-choose-card:hover .why-choose-icon-inner {
          color: #ffffff; /* Turns white on hover */
        }

        .why-choose-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #091E3E;
          margin-bottom: 12px;
          position: relative;
        }

        .why-choose-title::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 2px;
          background: var(--accent-color);
          border-radius: 2px;
          opacity: 0.7;
          transition: width 0.3s;
        }

        .why-choose-card:hover .why-choose-title::after {
          width: 45px;
        }

        .why-choose-desc {
          font-size: 12.5px;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 16px;
          flex-grow: 1;
        }

        .why-choose-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: #ffffff;
          color: var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-top: auto; /* Aligns to bottom */
        }

        .why-choose-card:hover .why-choose-arrow-btn {
          background: var(--accent-color);
          color: #ffffff;
          border-color: var(--accent-color);
          transform: scale(1.1);
        }

        /* Connected process steps */
        /* Connected process steps */
        .process-pipeline {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 30px;
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 16px;
          z-index: 1;
        }

        @media (min-width: 576px) {
          .process-pipeline {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 992px) {
          .process-pipeline {
            grid-template-columns: repeat(5, 1fr); /* 5 cards in a row */
            gap: 16px;
          }
        }

        .process-card {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 16px;
          padding: 26px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 10px 30px rgba(9, 30, 62, 0.03);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        /* Centered Bottom Line Accent */
        .process-card::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 25%;
          right: 25%;
          height: 3.5px;
          background: var(--accent-color);
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          transition: left 0.3s, right 0.3s;
        }

        .process-card:hover::before {
          left: 10%;
          right: 10%;
        }

        .process-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 45px var(--accent-color-soft);
          border-color: rgba(148, 163, 184, 0.2);
        }

        /* Outer Icon Ring with top dot */
        .process-circle-outer {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          border: 2px solid rgba(148, 163, 184, 0.16);
          border-left: 2.5px solid var(--accent-color);
          border-bottom: 2.5px solid var(--accent-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 22px;
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Floating Dot on top of circle */
        .process-circle-outer::after {
          content: "";
          position: absolute;
          top: -5.5px;
          left: 50%;
          transform: translateX(-50%);
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 8px var(--accent-color-bright);
        }

        .process-card:hover .process-circle-outer {
          transform: rotate(180deg);
          border-color: var(--accent-color);
        }

        .process-circle-inner {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: var(--accent-color-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--accent-color);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* De-rotate inner icon when outer ring rotates to keep it upright */
        .process-card:hover .process-circle-inner {
          transform: rotate(-180deg);
          background: var(--accent-color);
          color: #ffffff;
        }

        .process-step-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-color);
          background: var(--accent-color-light);
          border: 1px solid var(--accent-color-halo);
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 16px;
        }

        .process-step-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15.5px;
          font-weight: 700;
          color: #091E3E;
          margin-bottom: 8px;
        }

        .process-step-desc {
          font-size: 12px;
          color: #64748B;
          line-height: 1.5;
        }

        /* Connecting play-arrow elements between cards on desktop */
        .process-arrow-connector {
          display: none;
        }

        @media (min-width: 992px) {
          .process-arrow-connector {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 70px; /* Aligns with the middle of the icon circles */
            z-index: 10;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #ffffff;
            border: 1px solid rgba(148, 163, 184, 0.15);
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            color: #008CFF;
            font-size: 8px;
            transform: translateX(-50%);
          }

          .process-connector-line-back {
            position: absolute;
            top: 70px;
            left: 8%;
            right: 8%;
            height: 2px;
            background-image: linear-gradient(to right, rgba(0, 140, 255, 0.15) 50%, rgba(255,255,255,0) 0%);
            background-position: bottom;
            background-size: 8px 2px;
            background-repeat: repeat-x;
            z-index: -1;
          }
        }

        /* Portfolio Work Cards */
        /* Portfolio Work Cards */
        .work-grid-deck {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          max-width: 1150px;
          margin: 0 auto 48px auto;
          padding: 0 16px;
        }

        @media (min-width: 600px) {
          .work-grid-deck {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 992px) {
          .work-grid-deck {
            grid-template-columns: repeat(3, 1fr); /* 3 cards per row makes them much bigger and readable */
          }
        }

        .work-showcase-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .work-showcase-card {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.12);
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(9, 30, 62, 0.04);
          text-align: left;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          height: 100%;
          cursor: pointer;
          position: relative;
        }

        /* Shimmer sweep effect */
        .work-showcase-card::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(30deg);
          transition: all 0.6s ease;
          opacity: 0;
          pointer-events: none;
        }

        .work-showcase-card:hover::after {
          opacity: 1;
          left: 130%;
          transition: all 0.6s ease;
        }

        .work-showcase-card:hover {
          transform: translateY(-12px) scale(1.02); /* Bigger lift and slight zoom */
          animation: work-card-pulse 1.4s infinite ease-in-out;
          border-color: rgba(0, 140, 255, 0.3);
        }

        @keyframes work-card-pulse {
          0%, 100% {
            box-shadow: 0 12px 35px rgba(9, 30, 62, 0.04), 0 0 10px rgba(0, 140, 255, 0.08);
          }
          50% {
            box-shadow: 0 20px 48px rgba(9, 30, 62, 0.08), 0 0 22px rgba(0, 140, 255, 0.35);
          }
        }

        .work-image-pane {
          position: relative;
          height: 210px; /* Increased from 150px to make images bigger and details clear */
          overflow: hidden;
          background-color: #091E3E;
        }

        .work-image-pane img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .work-showcase-card:hover .work-image-pane img {
          transform: scale(1.08);
        }

        /* View Project Overlay */
        .work-image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(9, 30, 62, 0.95); /* Deep high-contrast background to read text and see white logo! */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: #ffffff;
          padding: 15px;
        }

        .work-showcase-card:hover .work-image-overlay {
          opacity: 1;
        }

        .work-meta-layer {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .work-category-pill {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #008CFF;
          background: rgba(0, 140, 255, 0.05);
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          font-weight: 700;
          margin-bottom: 8px;
          align-self: flex-start;
        }

        .work-title-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #091E3E;
          margin-bottom: 6px;
        }

        .work-desc-text {
          font-size: 11px;
          color: #64748B;
          line-height: 1.45;
          margin: 0;
        }

        /* Partner brand carousel */
        .brand-carousel-pane {
          max-width: 1200px;
          margin: 0 auto;
          overflow: hidden;
          padding: 30px 0;
          position: relative;
        }

        /* Ambient gradient fades on the edges of the marquee scroll */
        .brand-carousel-pane::before,
        .brand-carousel-pane::after {
          content: "";
          position: absolute;
          top: 0;
          width: 120px;
          height: 100%;
          z-index: 5;
          pointer-events: none;
        }

        .brand-carousel-pane::before {
          left: 0;
          background: linear-gradient(to right, #ffffff 10%, rgba(255,255,255,0) 100%);
        }

        .brand-carousel-pane::after {
          right: 0;
          background: linear-gradient(to left, #ffffff 10%, rgba(255,255,255,0) 100%);
        }

        .brand-carousel-track {
          display: flex;
          gap: 24px;
          align-items: center;
          width: max-content;
          animation: marquee 25s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .brand-logo-container {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 14px;
          padding: 14px 28px;
          box-shadow: 0 4px 15px rgba(9, 30, 62, 0.02);
          display: flex;
          align-items: center;
          justify-content: center;
          height: 70px;
          min-width: 150px;
          transition: all 0.3s ease;
        }

        .brand-logo-container:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 140, 255, 0.08);
          border-color: rgba(0, 140, 255, 0.2);
        }

        .brand-logo-card {
          max-height: 42px;
          max-width: 120px;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0.85;
          transition: opacity 0.3s;
        }

        .brand-logo-container:hover .brand-logo-card {
          opacity: 1.0;
        }

        /* Testimonials bubble slider */
        .testimonials-slider-box {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .testimonial-card-item {
          background: #F8FAFC;
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 12px;
          padding: 36px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.015);
        }

        .testimonial-stars-wrap {
          color: #FFB800;
          font-size: 18px;
          margin-bottom: 16px;
        }

        .testimonial-quote-text {
          font-size: 15px;
          font-style: italic;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .testimonial-profile-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #091E3E;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
        }

        .testimonial-name-role {
          text-align: left;
        }

        .testimonial-client-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14.5px;
          font-weight: 700;
          color: #091E3E;
          margin-bottom: 2px;
        }

        .testimonial-client-role {
          font-size: 11px;
          color: #64748B;
        }

        .testimonial-dots-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }

        .testimonial-dot-btn {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(0, 140, 255, 0.2);
          border: none;
          cursor: pointer;
          transition: all 0.25s;
        }

        .testimonial-dot-btn.active {
          background: #008CFF;
          width: 24px;
          border-radius: 4px;
        }

        /* Large neon bird CTA banner */
        .cta-glowing-banner {
          max-width: 1100px;
          margin: 80px auto;
          background: linear-gradient(135deg, #091E3E 0%, #0056B3 100%);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 36px rgba(0, 140, 255, 0.22);
        }

        .cta-wings-glow-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 10 50 C 30 35, 45 42, 50 50 C 55 42, 70 35, 90 50' stroke='white' fill='none' stroke-width='2'/%3E%3C/svg%3E");
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          pointer-events: none;
        }

        .cta-headline-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 14px 0;
          z-index: 2;
          position: relative;
        }

        .cta-subtitle-text {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(255, 255, 255, 0.75);
          max-width: 600px;
          margin: 0 auto 36px auto;
          z-index: 2;
          position: relative;
        }

        .cta-banner-buttons {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          z-index: 2;
          position: relative;
        }

        .btn-white-cta {
          background: #ffffff;
          color: #008CFF;
          padding: 14px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14.5px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .btn-white-cta:hover {
          background: #f1f5f9;
        }

        .btn-trans-cta {
          border: 2px solid rgba(255, 255, 255, 0.35);
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 700;
          font-size: 14.5px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-trans-cta:hover {
          background: rgba(255,255,255,0.06);
          border-color: #ffffff;
        }

        /* Clean multi-column footer */
        .official-footer {
          background: #091E3E;
          color: rgba(255, 255, 255, 0.75);
          padding: 80px 24px 40px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-grid-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 768px) {
          .footer-grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .footer-grid-container {
            grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
          }
        }

        .footer-column-box {
          text-align: left;
        }

        .footer-branding-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .footer-description-text {
          font-size: 12.5px;
          line-height: 1.6;
          margin-bottom: 24px;
          color: rgba(255, 255, 255, 0.65);
        }

        .footer-col-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 15px;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col-link {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }

        .footer-col-link:hover {
          color: #008CFF;
        }

        .footer-contact-item {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 16px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.5;
        }

        .footer-contact-icon {
          color: #008CFF;
          font-size: 14px;
          margin-top: 3px;
        }

        .footer-newsletter-wrap {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .newsletter-input-deck {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 6px;
          overflow: hidden;
        }

        .newsletter-field {
          flex-grow: 1;
          background: transparent;
          border: none;
          padding: 12px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
        }

        .newsletter-submit-btn {
          background: #008CFF;
          color: #ffffff;
          border: none;
          padding: 0 18px;
          cursor: pointer;
          font-size: 14px;
        }

        .bottom-copylink-strip {
          max-width: 1200px;
          margin: 60px auto 0 auto;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: space-between;
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.45);
        }

        @media (min-width: 768px) {
          .bottom-copylink-strip {
            flex-direction: row;
          }
        }

        /* Glassmorphic Consultation Modal Popup */
        .glass-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(9, 30, 62, 0.45);
          backdrop-filter: blur(8px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .glass-quote-modal {
          background: #ffffff;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
          max-width: 540px;
          width: 100%;
          padding: 40px;
          text-align: left;
          position: relative;
        }

        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #64748B;
        }

        .console-input-row {
          margin-bottom: 20px;
        }

        .console-label {
          font-family: monospace;
          font-size: 11px;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }

        .console-input {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid rgba(148, 163, 184, 0.18);
          padding: 12px;
          border-radius: 6px;
          color: #0B1F3A;
          font-size: 13.5px;
          outline: none;
        }

        .console-input:focus {
          border-color: #008CFF;
          background: #ffffff;
        }

        .success-banner-msg {
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #10B981;
          padding: 14px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 12.5px;
          font-weight: 600;
        }
      ` }} />

      {/* Skip Button (Cinematic Scene 01 to 08 only) */}
      {sceneState === 'scene01' && (
        <button className="skip-intro-trigger" onClick={handleSkip}>
          Skip Intro →
        </button>
      )}

      {/* SCENES 01 to 08: CINEMATIC DYNAMIC DIGITAL INTRO */}
      <AnimatePresence>
        {sceneState === 'scene01' && (
          <ParticleScene onComplete={handleSceneComplete} />
        )}
      </AnimatePresence>

      {/* ACTUAL PROMOTIONAL CONTENT MATCHING STORYBOARD HERO LAYOUT EXACTLY */}
      {sceneState === 'promo' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >


          {/* Section 1: Hero Section */}
          <section className="hero-landing-grid-container">
            <div className="hero-blur-bg" />
            <div className="hero-landing-grid">
              <div className="hero-content-panel">
                <span className="hero-welcome-badge">WELCOME TO ATRIOWINGS</span>
                <h1 className="hero-title-headline">
                  Digital Solutions <br />
                  That Give Your <br />
                  <span className="hero-title-blue">Business Wings</span>
                </h1>
                <p className="hero-description-para">
                  We build, market, design and create powerful digital experiences that help businesses grow, engage and soar above the competition.
                </p>
                <div className="hero-cta-btns">
                  <button onClick={() => setQuoteOpen(true)} className="btn-blue">
                    Get a Free Quote <i className="fas fa-arrow-right"></i>
                  </button>
                  <a href="#services" className="btn-outline">
                    Explore Services <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Stats bar row - Staggered slide in from left to right */}
          <motion.section 
            className="stats-bar-box"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { value: "300", label: "Happy Clients", icon: "users", color: "#007BFF" },
              { value: "500", label: "Projects Delivered", icon: "check-circle", color: "#00E5FF" },
              { value: "8", label: "Years Experience", icon: "briefcase", color: "#FFB800" },
              { value: "50", label: "Digital Experts", icon: "user-shield", color: "#FF8A3D" },
              { value: "10", label: "Countries Served", icon: "globe", color: "#38BDF8" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="stat-bar-card"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { type: "spring", stiffness: 80, damping: 14 }
                  }
                }}
                style={{
                  '--theme-color': stat.color,
                  '--theme-color-soft': stat.color + '1c',
                  '--theme-color-glow-bright': stat.color + '55'
                }}
              >
                <div className="stat-bar-icon-wrap"><i className={`fas fa-${stat.icon}`}></i></div>
                <div>
                  <div className="stat-bar-number"><CounterNumber value={stat.value} suffix="+" /></div>
                  <div className="stat-bar-label">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.section>

          {/* Section 3: Our Core Services Slider */}
          <section className="section-wrapper" id="services">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-welcome-badge">WHAT WE DO</span>
              <br />
              <h2 className="section-headline">Our Core Services</h2>
            </motion.div>

            <div className="services-slider-container">
              <div className="services-carousel-mask">
                <div className="services-scroll-deck">
                  {[...services, ...services].map((ser, index) => (
                    <motion.div 
                      key={index} 
                      className="promo-service-card"
                      onClick={() => setSelectedService(ser)}
                      initial={{ opacity: 0, y: 50, x: -30 }} /* Slides up (down to top) and left to right */
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 70, damping: 13, delay: (index % services.length) * 0.08 }}
                      whileHover={{ y: -8, scale: 1.03 }}
                      style={{
                        '--card-glow': ser.color,
                        '--card-glow-soft': ser.color + '18',
                        '--card-glow-bright': ser.color + '55',
                      }}
                    >
                      <div className="promo-service-number">{ser.id}</div>
                      <div className="promo-service-icon-box">
                        <i className={`fas fa-${ser.icon}`}></i>
                      </div>
                      <h3 className="promo-service-title">{ser.title}</h3>
                      <p className="promo-service-desc">{ser.desc}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedService(ser);
                        }} 
                        className="explore-service-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        Explore Service <i className="fas fa-arrow-right"></i>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Why Choose Atriowings */}
          <section className="section-wrapper" id="why-choose-us">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-welcome-badge">WHY CHOOSE US</span>
              <br />
              <h2 className="section-headline">Why Choose Atriowings?</h2>
            </motion.div>

            <motion.div 
              className="why-choose-row"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {whyChooseUs.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="why-choose-card"
                  variants={{
                    hidden: { opacity: 0, y: 50, x: -20 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      x: 0,
                      transition: { type: "spring", stiffness: 70, damping: 13 }
                    }
                  }}
                  style={{
                    '--accent-color': item.color,
                    '--accent-color-soft': item.color + '15',
                    '--accent-color-light': item.color + '0c',
                    '--accent-color-halo': item.color + '22',
                    '--accent-color-halo-ring': item.color + '44'
                  }}
                >
                  <div className="why-choose-icon-wrapper">
                    <div className="why-choose-icon-inner">
                      <i className={`fas fa-${item.icon}`}></i>
                    </div>
                  </div>
                  <h4 className="why-choose-title">{item.title}</h4>
                  <p className="why-choose-desc">{item.desc}</p>
                  <div className="why-choose-arrow-btn">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Section 5: Our Proven Process Steps */}
          <section className="section-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-welcome-badge">OUR PROCESS</span>
              <br />
              <h2 className="section-headline">Our Proven Process</h2>
            </motion.div>

            <div className="process-pipeline">
              <div className="process-connector-line-back" />
              {processSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <motion.div 
                    className="process-card"
                    initial={{ opacity: 0, y: 50, x: -20 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 70, damping: 13, delay: idx * 0.08 }}
                    style={{
                      '--accent-color': step.color,
                      '--accent-color-soft': step.color + '15',
                      '--accent-color-light': step.color + '0c',
                      '--accent-color-halo': step.color + '22',
                      '--accent-color-bright': step.color
                    }}
                  >
                    <div className="process-circle-outer">
                      <div className="process-circle-inner">
                        <i className={`fas fa-${step.icon}`}></i>
                      </div>
                    </div>
                    <span className="process-step-pill">{step.step}</span>
                    <h4 className="process-step-name">{step.name}</h4>
                    <p className="process-step-desc">{step.desc}</p>
                  </motion.div>

                  {idx < processSteps.length - 1 && (
                    <div 
                      className="process-arrow-connector"
                      style={{ left: `${(idx + 1) * 20}%` }}
                    >
                      <i className="fas fa-play"></i>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Section 6: Our Recent Work portfolio deck */}
          <section className="section-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-welcome-badge">OUR WORK</span>
              <br />
              <h2 className="section-headline">Our Recent Work</h2>
            </motion.div>

            <motion.div 
              className="work-grid-deck"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {projects.map((proj, idx) => (
                <motion.a 
                  key={idx} 
                  href="/portfolio" 
                  className="work-showcase-card-link"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: "spring", stiffness: 80, damping: 14 }
                    }
                  }}
                >
                  <div className="work-showcase-card">
                    <div className="work-image-pane">
                      <img src={proj.img} alt={proj.title} />
                      <div className="work-image-overlay">
                        {/* Company Logo */}
                        <img 
                          src="/img/atriowings white logo.png" 
                          alt="AtrioWings Logo" 
                          style={{ 
                            height: '24px', 
                            width: 'auto', 
                            objectFit: 'contain',
                            marginBottom: '10px'
                          }} 
                        />
                        {/* Project Content */}
                        <span className="text-white-50 text-uppercase fw-bold mb-1" style={{ fontSize: '9px', letterSpacing: '1px' }}>
                          {proj.category}
                        </span>
                        <h5 className="text-white fw-bold mb-1 text-center" style={{ fontSize: '14px' }}>
                          {proj.title}
                        </h5>
                        <p className="text-white-50 text-center mb-2" style={{ fontSize: '10px', lineHeight: '1.3', padding: '0 5px' }}>
                          {proj.desc}
                        </p>
                        <span className="btn btn-sm btn-light py-0 px-3 rounded-pill fw-bold" style={{ fontSize: '9px', color: '#091E3E' }}>
                          View Project <i className="fas fa-arrow-right ms-1" style={{ fontSize: '8px' }}></i>
                        </span>
                      </div>
                    </div>
                    <div className="work-meta-layer">
                      <span className="work-category-pill">{proj.category}</span>
                      <h4 className="work-title-name">{proj.title}</h4>
                      <p className="work-desc-text">{proj.desc}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <a href="/portfolio" className="btn-blue">
              View All Projects <i className="fas fa-arrow-right"></i>
            </a>
          </section>

          {/* Section 7: Trusted Partners brand logo deck */}
          <section className="section-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-welcome-badge">TRUSTED BY</span>
              <br />
              <h2 className="section-headline" style={{ marginBottom: '24px' }}>Trusted by Businesses Worldwide</h2>
            </motion.div>

            <div className="brand-carousel-pane">
              <div className="brand-carousel-track">
                {/* Double arrays for infinite loop */}
                {[...partners, ...partners, ...partners].map((logo, idx) => (
                  <div key={idx} className="brand-logo-container">
                    <img 
                      src={logo.img} 
                      alt={logo.name} 
                      className="brand-logo-card" 
                      title={logo.name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 8: What Our Clients Say testimonial bubble slider */}
          <section className="section-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="section-welcome-badge">TESTIMONIALS</span>
              <br />
              <h2 className="section-headline">What Our Clients Say</h2>
            </motion.div>

            <div className="testimonials-slider-box">
              <div className="testimonial-card-item">
                <div className="testimonial-stars-wrap">
                  {Array.from({ length: testimonials[currentTestimonialIndex].stars }).map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <p className="testimonial-quote-text">
                  "{testimonials[currentTestimonialIndex].text}"
                </p>
                <div className="testimonial-profile-wrap">
                  <div className="testimonial-avatar">
                    {testimonials[currentTestimonialIndex].name.charAt(0)}
                  </div>
                  <div className="testimonial-name-role">
                    <h4 className="testimonial-client-name">{testimonials[currentTestimonialIndex].name}</h4>
                    <span className="testimonial-client-role">{testimonials[currentTestimonialIndex].role}</span>
                  </div>
                </div>
              </div>

              <div className="testimonial-dots-pagination">
                {testimonials.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`testimonial-dot-btn ${currentTestimonialIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonialIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Section 9: Glowing Blue Bird CTA banner */}
          <section className="section-wrapper" style={{ padding: '0 24px' }}>
            <div className="cta-glowing-banner">
              <div className="cta-wings-glow-overlay" />
              <h2 className="cta-headline-text">Ready to Give Your Business Wings?</h2>
              <p className="cta-subtitle-text">
                Let's build something amazing together and take your business to new heights.
              </p>
              <div className="cta-banner-buttons">
                <button onClick={() => setQuoteOpen(true)} className="btn-white-cta">
                  Get a Free Quote <i className="fas fa-arrow-right"></i>
                </button>
                <a href="/contact" className="btn-trans-cta">
                  Contact Us <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </section>

          {/* Section 10: Official Multi-Column Footer */}
          <footer className="official-footer">
            <div className="footer-grid-container">
              {/* Column 1: Branding info */}
              <div className="footer-column-box">
                <h4 className="footer-branding-title">Atriowings Technologies</h4>
                <p className="footer-description-text">
                  We build, market, design and create powerful digital experiences that help businesses grow and soar.
                </p>
                <div className="topbar-socials">
                  <a href="#" className="topbar-social-btn"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="topbar-social-btn"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="topbar-social-btn"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="topbar-social-btn"><i className="fab fa-instagram"></i></a>
                </div>
              </div>

              {/* Column 2: Quick links */}
              <div className="footer-column-box">
                <h4 className="footer-col-title">Quick Links</h4>
                <ul className="footer-link-list">
                  <li><a href="/" className="footer-col-link">Home</a></li>
                  <li><a href="/about" className="footer-col-link">About Us</a></li>
                  <li><a href="/services" className="footer-col-link">Services</a></li>
                  <li><a href="/portfolio" className="footer-col-link">Portfolio</a></li>
                  <li><a href="/blog" className="footer-col-link">Blogs</a></li>
                  <li><a href="/contact" className="footer-col-link">Contact Us</a></li>
                </ul>
              </div>

              {/* Column 3: Services info */}
              <div className="footer-column-box">
                <h4 className="footer-col-title">Services</h4>
                <ul className="footer-link-list">
                  <li><a href="/services/web-developing" className="footer-col-link">Web Development</a></li>
                  <li><a href="/services/digital-marketing" className="footer-col-link">Digital Marketing</a></li>
                  <li><a href="/services/product-design" className="footer-col-link">Product Design</a></li>
                  <li><a href="/services/content-writing" className="footer-col-link">Content Writing</a></li>
                  <li><a href="/services/video-ads" className="footer-col-link">Video Ads & Editing</a></li>
                </ul>
              </div>

              {/* Column 4: Contact info + newsletter */}
              <div className="footer-column-box">
                <h4 className="footer-col-title">Contact Us</h4>
                <div className="footer-contact-item">
                  <i className="fas fa-map-marker-alt footer-contact-icon"></i>
                  <span>No. 1, Gurudev Complex, 57th St, Venkatesaran Nagar, Chennai - 600 080.</span>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-phone-alt footer-contact-icon"></i>
                  <span>+91 8825948859</span>
                </div>
                <div className="footer-contact-item">
                  <i className="fas fa-envelope footer-contact-icon"></i>
                  <span>info@atriowings.in</span>
                </div>

                <div className="footer-newsletter-wrap" style={{ marginTop: '20px' }}>
                  <span className="footer-col-title" style={{ fontSize: '12px', marginBottom: '8px' }}>Newsletter</span>
                  <div className="newsletter-input-deck">
                    <input type="email" placeholder="Your email address" className="newsletter-field" />
                    <button className="newsletter-submit-btn"><i className="fas fa-paper-plane"></i></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copy Strip */}
            <div className="bottom-copylink-strip">
              <div>© 2026 Atriowings Technologies India Private Limited. All Rights Reserved.</div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <a href="#" className="footer-col-link">Privacy Policy</a>
                <a href="#" className="footer-col-link">Terms & Conditions</a>
              </div>
            </div>
          </footer>

          {/* Interactive Get a Quote Modal Popup */}
          {quoteOpen && (
            <div className="glass-modal-overlay">
              <div className="glass-quote-modal">
                <button className="modal-close-btn" onClick={() => setQuoteOpen(false)}>×</button>
                
                <h3 className="heading-font" style={{ fontSize: '20px', color: '#091E3E', marginBottom: '24px', fontWeight: 'bold' }}>
                  Request Consultation Quote
                </h3>

                {formSubmitted && (
                  <div className="success-banner-msg">
                    ✔ Consultation request sent. Our coordinators will reach out shortly.
                  </div>
                )}

                <form onSubmit={handleFormSubmit}>
                  <div className="console-input-row">
                    <label className="console-label">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter visitor name" 
                      className="console-input" 
                    />
                  </div>

                  <div className="console-input-row">
                    <label className="console-label">Contact Email</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="name@organization.com" 
                      className="console-input" 
                    />
                  </div>

                  <div className="console-input-row">
                    <label className="console-label">Mobile Number</label>
                    <input 
                      type="tel" 
                      required 
                      pattern="[0-9]{10,15}"
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                      placeholder="Enter 10-digit mobile number" 
                      className="console-input" 
                    />
                  </div>

                  <div className="console-input-row">
                    <label className="console-label">Requirement Scope</label>
                    <textarea 
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Describe target user metrics, platform scope, or system parameters..." 
                      className="console-input" 
                      style={{ minHeight: '80px', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="talk-btn" style={{ width: '100%', marginTop: '10px' }} disabled={formSubmitting}>
                    {formSubmitting ? 'Sending Request...' : 'Submit Launch request'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Interactive Core Service Details Modal Overlay */}
          {selectedService && (
            <div className="glass-modal-overlay" onClick={() => setSelectedService(null)}>
              <div className="glass-quote-modal" onClick={(e) => e.stopPropagation()} style={{ borderTop: `5px solid ${selectedService.color}` }}>
                <button className="modal-close-btn" onClick={() => setSelectedService(null)}>×</button>
                
                <span className="hero-welcome-badge" style={{ color: selectedService.color, borderColor: selectedService.color + '45', background: selectedService.color + '0a', marginBottom: '16px' }}>
                  {selectedService.metric}
                </span>

                <h3 className="heading-font" style={{ fontSize: '24px', color: '#091E3E', marginBottom: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <i className={`fas fa-${selectedService.icon}`} style={{ color: selectedService.color }}></i>
                  {selectedService.title}
                </h3>
                
                <p className="mono-font" style={{ color: '#64748B', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '20px' }}>
                  {selectedService.tagline}
                </p>

                <p className="promo-service-desc" style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '24px' }}>
                  {selectedService.details}
                </p>

                <h4 className="heading-font" style={{ fontSize: '14px', fontWeight: 700, color: '#091E3E', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Key Service Deliverables:
                </h4>

                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} style={{ fontSize: '12.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: selectedService.color, fontWeight: 'bold' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => {
                    setFormData({
                      ...formData,
                      message: `Hi flight coordinators, I would like to request consultation for Atriowings "${selectedService.title}" services.`
                    });
                    setSelectedService(null);
                    setQuoteOpen(true);
                  }}
                  className="talk-btn"
                  style={{ width: '100%', background: selectedService.color, boxShadow: `0 4px 15px ${selectedService.color}3a` }}
                >
                  Initiate Scoping Quote Request
                </button>
              </div>
            </div>
          )}

        </motion.div>
      )}

    </div>
  );
}
