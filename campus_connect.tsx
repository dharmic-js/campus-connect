import React, { useState, useEffect, useRef } from 'react';
import {
  Car,
  ShoppingBag,
  Utensils,
  Trophy,
  Plus,
  MessageSquare,
  Phone,
  Star,
  MapPin,
  Clock,
  Users,
  ArrowLeft,
  CheckCircle2,
  Send,
  Sparkles,
  Search,
  X,
  Mic,
  MicOff,
  PhoneOff,
  Award,
  SlidersHorizontal,
  ArrowUpRight,
  Pause,
  Play
} from 'lucide-react';

// --- INSTAGRAM-STYLE BLUE VERIFIED TICK ---
const VerifiedTick = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`inline-block shrink-0 ${className}`}
    aria-label="Verified Same-University Student"
  >
    <title>Verified Same-University Student</title>
    <circle cx="12" cy="12" r="10" className="fill-sky-500" />
    <path
      d="M8.5 12.5L10.8 14.8L15.5 9.5"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- CUSTOM VECTOR RASTERIZER FOR THE THICKER, BRIGHTER "campus connect" LOGO ---
function drawCustomCampusConnectLogo(ctx, canvasWidth, canvasHeight) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = '#FFFFFF';

  const logicalW = 760;
  const logicalH = 250;
  const isMobile = canvasWidth < 640;
  const maxW = isMobile ? canvasWidth * 0.92 : Math.min(canvasWidth * 0.88, 1150);
  const maxH = isMobile ? canvasHeight * 0.38 : canvasHeight * 0.46;
  const scale = Math.min(maxW / logicalW, maxH / logicalH);
  const offsetX = (canvasWidth - logicalW * scale) / 2;
  const offsetY = (canvasHeight - logicalH * scale) / 2;

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(scale, scale);

  const t = 28; // Extra thick, bold geometric stroke
  const c = 17; // 45-degree chamfer size

  const poly = (pts) => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i][0], pts[i][1]);
    }
    ctx.closePath();
    ctx.fill();
  };

  // Compound polygon helper using 'evenodd' so inner holes (p, o, a, e) stay 100% hollow black
  const polyWithHole = (outerPts, innerPts) => {
    ctx.beginPath();
    ctx.moveTo(outerPts[0][0], outerPts[0][1]);
    for (let i = 1; i < outerPts.length; i++) {
      ctx.lineTo(outerPts[i][0], outerPts[i][1]);
    }
    ctx.closePath();

    ctx.moveTo(innerPts[0][0], innerPts[0][1]);
    for (let i = 1; i < innerPts.length; i++) {
      ctx.lineTo(innerPts[i][0], innerPts[i][1]);
    }
    ctx.closePath();
    ctx.fill('evenodd');
  };

  const drawC = (x, y, w, h) => {
    poly([
      [x + c, y],
      [x + w, y],
      [x + w, y + t],
      [x + t + 3, y + t],
      [x + t, y + t + 3],
      [x + t, y + h - t - 3],
      [x + t + 3, y + h - t],
      [x + w, y + h - t],
      [x + w, y + h],
      [x + c, y + h],
      [x, y + h - c],
      [x, y + c]
    ]);
  };

  const drawA = (x, y, w, h) => {
    const midY = y + Math.round(h * 0.42);
    polyWithHole(
      [
        [x + c, y],
        [x + w - c, y],
        [x + w, y + c],
        [x + w, y + h],
        [x + c, y + h],
        [x, y + h - c],
        [x, midY + c],
        [x + c, midY],
        [x + w - t, midY],
        [x + w - t, y + t + 3],
        [x + w - t - 3, y + t],
        [x + c, y + t],
        [x + 4, y + t]
      ],
      [
        [x + t + 3, midY + t - 3],
        [x + w - t, midY + t - 3],
        [x + w - t, y + h - t],
        [x + t + 3, y + h - t],
        [x + t, y + h - t - 3],
        [x + t, midY + t]
      ]
    );
  };

  const drawM = (x, y, w, h) => {
    const midX = x + w / 2;
    poly([
      [x, y + c],
      [x + c, y],
      [midX - t * 0.75, y],
      [midX, y + t * 1.1],
      [midX + t * 0.75, y],
      [x + w - c, y],
      [x + w, y + c],
      [x + w, y + h],
      [x + w - t, y + h],
      [x + w - t, y + t + 3],
      [x + w - t - 3, y + t],
      [midX + t * 0.85, y + t],
      [midX, y + t * 2.25],
      [midX - t * 0.85, y + t],
      [x + t + 3, y + t],
      [x + t, y + t + 3],
      [x + t, y + h],
      [x, y + h]
    ]);
  };

  const drawP = (x, y, w, h, desc) => {
    polyWithHole(
      [
        [x, y],
        [x + w - c, y],
        [x + w, y + c],
        [x + w, y + h - c],
        [x + w - c, y + h],
        [x + t, y + h],
        [x + t, y + h + desc],
        [x, y + h + desc]
      ],
      [
        [x + t, y + t],
        [x + w - t - 3, y + t],
        [x + w - t, y + t + 3],
        [x + w - t, y + h - t - 3],
        [x + w - t - 3, y + h - t],
        [x + t, y + h - t]
      ]
    );
  };

  const drawU = (x, y, w, h) => {
    poly([
      [x, y],
      [x + t, y],
      [x + t, y + h - t - 3],
      [x + t + 3, y + h - t],
      [x + w - t - 3, y + h - t],
      [x + w - t, y + h - t - 3],
      [x + w - t, y],
      [x + w, y],
      [x + w, y + h - c],
      [x + w - c, y + h],
      [x + c, y + h],
      [x, y + h - c]
    ]);
  };

  const drawS = (x, y, w, h) => {
    const midY = y + Math.round((h - t) / 2);
    poly([
      [x + c, y],
      [x + w, y],
      [x + w, y + t],
      [x + t + 2, y + t],
      [x + t, y + t + 2],
      [x + t, midY - 2],
      [x + t + 2, midY],
      [x + w - c, midY],
      [x + w, midY + c],
      [x + w, y + h - c],
      [x + w - c, y + h],
      [x, y + h],
      [x, y + h - t],
      [x + w - t - 2, y + h - t],
      [x + w - t, y + h - t - 2],
      [x + w - t, midY + t + 2],
      [x + w - t - 2, midY + t],
      [x + c, midY + t],
      [x, midY + t - c],
      [x, y + c]
    ]);
  };

  const drawO = (x, y, w, h) => {
    polyWithHole(
      [
        [x + c, y],
        [x + w - c, y],
        [x + w, y + c],
        [x + w, y + h - c],
        [x + w - c, y + h],
        [x + c, y + h],
        [x, y + h - c],
        [x, y + c]
      ],
      [
        [x + t + 3, y + t],
        [x + w - t - 3, y + t],
        [x + w - t, y + t + 3],
        [x + w - t, y + h - t - 3],
        [x + w - t - 3, y + h - t],
        [x + t + 3, y + h - t],
        [x + t, y + h - t - 3],
        [x + t, y + t + 3]
      ]
    );
  };

  const drawN = (x, y, w, h) => {
    poly([
      [x, y],
      [x + w - c, y],
      [x + w, y + c],
      [x + w, y + h],
      [x + w - t, y + h],
      [x + w - t, y + t + 3],
      [x + w - t - 3, y + t],
      [x + t, y + t],
      [x + t, y + h],
      [x, y + h]
    ]);
  };

  const drawE = (x, y, w, h) => {
    const midY = y + Math.round((h - t) / 2) + 2;
    polyWithHole(
      [
        [x + c, y],
        [x + w - c, y],
        [x + w, y + c],
        [x + w, midY + t],
        [x + t, midY + t],
        [x + t, y + h - t - 3],
        [x + t + 3, y + h - t],
        [x + w, y + h - t],
        [x + w, y + h],
        [x + c, y + h],
        [x, y + h - c],
        [x, y + c]
      ],
      [
        [x + t + 3, y + t],
        [x + w - t - 3, y + t],
        [x + w - t, y + t + 3],
        [x + w - t, midY - 2],
        [x + t, midY - 2],
        [x + t, y + t + 3]
      ]
    );
  };

  const drawT = (x, y, w, h) => {
    const asc = 28;
    poly([
      [x + 12, y - asc + t],
      [x + 12 + t, y - asc],
      [x + 12 + t, y],
      [x + w, y],
      [x + w, y + t],
      [x + 12 + t, y + t],
      [x + 12 + t, y + h - t - 3],
      [x + 12 + t + 3, y + h - t],
      [x + w, y + h - t],
      [x + w, y + h],
      [x + 12 + c, y + h],
      [x + 12, y + h - c],
      [x + 12, y + t],
      [x, y + t],
      [x, y],
      [x + 12, y]
    ]);
  };

  // ROW 1: "campus"
  const r1Y = 14;
  const r1H = 92;
  drawC(24, r1Y, 98, r1H);
  drawA(136, r1Y, 104, r1H);
  drawM(252, r1Y, 150, r1H);
  drawP(414, r1Y, 104, r1H, 32);
  drawU(530, r1Y, 104, r1H);
  drawS(646, r1Y, 98, r1H);

  // ROW 2: "connect"
  const r2Y = 140;
  const r2H = 92;
  drawC(14, r2Y, 94, r2H);
  drawO(118, r2Y, 104, r2H);
  drawN(232, r2Y, 102, r2H);
  drawN(344, r2Y, 102, r2H);
  drawE(456, r2Y, 102, r2H);
  drawC(568, r2Y, 94, r2H);
  drawT(670, r2Y, 76, r2H);

  ctx.restore();
}

// --- GENERATE EXTENDED PIXEL FOREARMS / SLEEVES BEYOND THE WRISTS ---
function generateExtendedArmPixels(side) {
  const armPixels = [];
  // Extend from x = 21 out to x = 135 so the arms never stop at the wrists
  for (let d = 21; d <= 135; d++) {
    const x = side === 'left' ? -d : d;
    // Slight natural forearm taper/slope
    const yShift = Math.floor((d - 21) * 0.06);
    const topY = -3 + yShift;
    const botY = 7 + yShift;

    // Thick pixel sleeve top & bottom contours + solid cuff bands
    armPixels.push([x, topY], [x, topY + 1]);
    armPixels.push([x, botY - 1], [x, botY]);

    // Solid interior fill for the extended sleeve/arm so it looks bold & cohesive
    for (let y = topY + 2; y <= botY - 2; y++) {
      armPixels.push([x, y]);
    }
  }
  return armPixels;
}

// --- PIXEL-ART MATRICES MATCHING THE UPLOADED PIXEL HANDSHAKE + EXTENDED ARMS ---
const LEFT_HAND_PIXELS = [
  ...generateExtendedArmPixels('left'),
  // Left outer cuff bracket
  [-22, -1], [-22, 0], [-22, 1],
  [-21, -1], [-21, 0], [-21, 1],
  [-20, -2], [-20, -1], [-20, 0], [-20, 1],
  [-19, -2], [-19, -1],
  [-18, -2], [-18, -1], [-18, 6], [-18, 7],
  [-17, -2], [-17, -1], [-17, 0], [-17, 1], [-17, 2], [-17, 3], [-17, 4], [-17, 5], [-17, 6], [-17, 7],
  [-16, 0], [-16, 1], [-16, 2], [-16, 3], [-16, 4], [-16, 5], [-16, 6],
  // Left inner cuff bar
  [-15, -4], [-15, -3], [-15, -2], [-15, -1],
  [-14, -4], [-14, -3], [-14, -2], [-14, -1], [-14, 0], [-14, 1], [-14, 2], [-14, 3], [-14, 4], [-14, 5],
  [-13, 0], [-13, 1], [-13, 2], [-13, 3], [-13, 4], [-13, 5], [-13, 6],
  [-12, 4], [-12, 5], [-12, 6],
  // Left upper thumb arch & palm body
  [-11, -3], [-11, -2], [-11, -1], [-11, 0], [-11, 1], [-11, 2], [-11, 3],
  [-10, -5], [-10, -4], [-10, -3], [-10, -2], [-10, -1], [-10, 0], [-10, 1], [-10, 2], [-10, 3], [-10, 4],
  [-9, -6], [-9, -5], [-9, -4], [-9, -3], [-9, -2], [-9, -1], [-9, 0], [-9, 1], [-9, 2], [-9, 3], [-9, 4],
  [-8, -7], [-8, -6], [-8, -5], [-8, -2], [-8, -1], [-8, 0], [-8, 1], [-8, 2], [-8, 3], [-8, 4],
  [-7, -8], [-7, -7], [-7, -6], [-7, -3], [-7, -2], [-7, -1], [-7, 0], [-7, 1], [-7, 2], [-7, 3],
  [-6, -8], [-6, -7], [-6, -4], [-6, -3], [-6, -2], [-6, -1], [-6, 0], [-6, 1], [-6, 2],
  [-5, -8], [-5, -7], [-5, -5], [-5, -4], [-5, -3], [-5, -2], [-5, -1], [-5, 0], [-5, 1], [-5, 2],
  [-4, -8], [-4, -7], [-4, -5], [-4, -4], [-4, -3], [-4, -2], [-4, -1], [-4, 0], [-4, 1], [-4, 2],
  [-3, -8], [-3, -7], [-3, -2], [-3, -1], [-3, 0], [-3, 1], [-3, 2], [-3, 3],
  [-2, -7], [-2, -2], [-2, -1], [-2, 0], [-2, 1], [-2, 2], [-2, 3],
  [-1, -2], [-1, -1], [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4],
  [0, -2], [0, -1], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  // Left hand extended fingers wrapping diagonally down-right
  [1, -4], [1, -3], [1, -2], [1, -1], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
  [2, -5], [2, -4], [2, -3], [2, -2], [2, -1], [2, 0], [2, 2], [2, 3], [2, 5], [2, 6],
  [3, -5], [3, -4], [3, -3], [3, -2], [3, -1], [3, 0], [3, 3], [3, 4], [3, 6], [3, 7],
  [4, -4], [4, -3], [4, -2], [4, 0], [4, 1], [4, 4], [4, 5], [4, 7], [4, 8],
  [5, -3], [5, -2], [5, -1], [5, 1], [5, 2], [5, 5], [5, 6], [5, 8], [5, 9],
  [6, -2], [6, -1], [6, 0], [6, 2], [6, 3], [6, 6], [6, 7], [6, 9],
  [7, -1], [7, 0], [7, 1], [7, 3], [7, 4], [7, 7], [7, 8],
  [8, 0], [8, 1], [8, 2], [8, 4], [8, 5],
  [9, 1], [9, 2]
];

const RIGHT_HAND_PIXELS = [
  ...generateExtendedArmPixels('right'),
  // Right thumb interlocking over the center clasp
  [-2, -4], [-2, -3],
  [-1, -5], [-1, -4], [-1, -3],
  [0, -6], [0, -5], [0, -4],
  [1, -7], [1, -6], [1, -5],
  [2, -8], [2, -7], [2, -6],
  [3, -8], [3, -7],
  [4, -8], [4, -7], [4, -6],
  [5, -8], [5, -7], [5, -6],
  [6, -8], [6, -7], [6, -6], [6, -5],
  [7, -7], [7, -6], [7, -5], [7, -4],
  [8, -6], [8, -5], [8, -4], [8, -3],
  [9, -5], [9, -4], [9, -3], [9, -2],
  [10, -4], [10, -3], [10, -2], [10, -1], [10, 0],
  [11, -3], [11, -2], [11, -1], [11, 0], [11, 1], [11, 2], [11, 3], [11, 4], [11, 5],
  [12, -2], [12, -1], [12, 0], [12, 1], [12, 2], [12, 3], [12, 4], [12, 5], [12, 6],
  [13, -2], [13, -1], [13, 0], [13, 1], [13, 2], [13, 3], [13, 4], [13, 5],
  // Right inner cuff bar
  [14, -4], [14, -3], [14, -2], [14, -1],
  [15, -4], [15, -3], [15, -2], [15, -1], [15, 0], [15, 1], [15, 2], [15, 3], [15, 4], [15, 5],
  [16, 0], [16, 1], [16, 2], [16, 3], [16, 4], [16, 5], [16, 6],
  // Right outer cuff bracket
  [17, -2], [17, -1], [17, 0], [17, 1], [17, 2], [17, 3], [17, 4], [17, 5], [17, 6], [17, 7],
  [18, -2], [18, -1], [18, 6], [18, 7],
  [19, -2], [19, -1], [19, 6], [19, 7],
  [20, -2], [20, -1], [20, 0], [20, 1],
  [21, -1], [21, 0], [21, 1],
  [22, -1], [22, 0], [22, 1],
  // Lower curled grip fingers (4 rounded pixel nubs at the bottom)
  [-8, 4], [-8, 5],
  [-7, 3], [-7, 4], [-7, 5], [-7, 6],
  [-6, 3], [-6, 4], [-6, 5],
  [-5, 3], [-5, 4],
  [-6, 7], [-6, 8],
  [-5, 6], [-5, 7], [-5, 8],
  [-4, 5], [-4, 6], [-4, 7],
  [-3, 5], [-3, 6],
  [-3, 9], [-3, 10],
  [-2, 8], [-2, 9], [-2, 10],
  [-1, 7], [-1, 8], [-1, 9],
  [0, 7], [0, 8],
  [0, 11], [0, 12],
  [1, 10], [1, 11], [1, 12],
  [2, 9], [2, 10], [2, 11],
  [3, 9], [3, 10]
];

const IMPACT_RAY_PIXELS = [
  // Center vertical ray
  [-1, -16], [0, -16],
  [-1, -15], [0, -15],
  [-1, -14], [0, -14],
  [-1, -13], [0, -13],
  [-1, -12], [0, -12],
  [-1, -11], [0, -11],
  // Left diagonal ray
  [-7, -14], [-6, -14],
  [-7, -13], [-6, -13], [-5, -13],
  [-6, -12], [-5, -12], [-4, -12],
  [-5, -11], [-4, -11], [-3, -11],
  [-4, -10], [-3, -10],
  // Right diagonal ray
  [6, -14], [7, -14],
  [5, -13], [6, -13], [7, -13],
  [4, -12], [5, -12], [6, -12],
  [3, -11], [4, -11], [5, -11],
  [3, -10], [4, -10]
];

// --- DRAW EXTENDED PIXEL-ART ARMS & HANDS SWINGING IN TO DAP OVER THE SETTLED LOGO ---
function drawDapHands(ctx, width, height, dapProgress, impactSparks) {
  if (dapProgress <= 0) return;

  // Position directly over the center of the settled "campus connect" logo
  const centerX = width / 2;
  const centerY = height / 2;
  const isMobile = width < 640;
  const px = isMobile
    ? Math.max(2.8, Math.min(width / 115, 4.8))
    : Math.max(3.6, Math.min(width / 135, 6.2));

  // Swing & approach phase (0 -> 0.72): hands & extended arms swing in along an arc
  const approachT = Math.min(1, dapProgress / 0.72);
  // Smooth ease-in-out cubic for deliberate swinging motion
  const easeApproach =
    approachT < 0.5
      ? 4 * approachT * approachT * approachT
      : 1 - Math.pow(-2 * approachT + 2, 3) / 2;

  // Wind-up swing arc: arms start angled down/back, swing up high mid-arc, and swoop down into the clasp
  const swingArcY =
    approachT < 1
      ? Math.sin(approachT * Math.PI) * -42 * (px / 5) + (1 - easeApproach) * 28
      : 0;

  // Rotational swing angle (in radians): wind-up -> high swing -> flat lock on dap impact
  const swingAngle =
    approachT < 1
      ? (1 - easeApproach) * 0.42 - Math.sin(approachT * Math.PI) * 0.24
      : 0;

  let impactScale = 1;
  let bounceY = 0;
  if (dapProgress >= 0.72 && dapProgress < 0.9) {
    const bT = (dapProgress - 0.72) / 0.18;
    impactScale = 1 + Math.sin(bT * Math.PI) * 0.14;
    bounceY = -Math.sin(bT * Math.PI) * (6 * (px / 5));
  }

  const maxSlideDist = width * 0.58;
  const currentOffset = (1 - easeApproach) * maxSlideDist;

  const pSize = px * impactScale;

  const drawSwingingArmGroup = (coords, offsetX, offsetY, angleRad, pivotX) => {
    ctx.save();
    ctx.translate(offsetX, offsetY);
    if (angleRad !== 0) {
      ctx.translate(pivotX * pSize, 0);
      ctx.rotate(angleRad);
      ctx.translate(-pivotX * pSize, 0);
    }

    // 1. Thick dark pixel knockout border so the white pixel hands & arms stand out over the white logo
    ctx.fillStyle = '#000000';
    const pad = Math.max(2.5, pSize * 0.55);
    for (let i = 0; i < coords.length; i++) {
      const [gx, gy] = coords[i];
      ctx.fillRect(
        gx * pSize - pad,
        gy * pSize - pad,
        pSize + pad * 2,
        pSize + pad * 2
      );
    }

    // 2. Crisp white pixel blocks
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < coords.length; i++) {
      const [gx, gy] = coords[i];
      ctx.fillRect(
        gx * pSize - 0.3,
        gy * pSize - 0.3,
        pSize + 0.6,
        pSize + 0.6
      );
    }

    ctx.restore();
  };

  ctx.save();

  // Left Extended Arm & Hand swinging in from the Left
  drawSwingingArmGroup(
    LEFT_HAND_PIXELS,
    centerX - currentOffset,
    centerY + swingArcY + bounceY,
    -swingAngle,
    -28
  );

  // Right Extended Arm & Hand swinging in simultaneously from the Right
  drawSwingingArmGroup(
    RIGHT_HAND_PIXELS,
    centerX + currentOffset,
    centerY + swingArcY + bounceY,
    swingAngle,
    28
  );

  // Once the hands finish their swing & clasp in the center, show the 3 pixel burst bars + pixel sparks
  if (dapProgress >= 0.72) {
    drawSwingingArmGroup(IMPACT_RAY_PIXELS, centerX, centerY + bounceY, 0, 0);

    impactSparks.forEach((sp) => {
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.045;
      sp.alpha = Math.max(0, sp.alpha - 0.008);
      if (sp.alpha > 0) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(centerX + sp.x - 1.5, centerY + sp.y - 1.5, sp.size + 3, sp.size + 3);
        ctx.fillStyle = `rgba(255, 255, 255, ${sp.alpha})`;
        ctx.fillRect(centerX + sp.x, centerY + sp.y, sp.size, sp.size);
      }
    });
  }

  ctx.restore();
}

// --- FALLING PIXELS LOGO + SWINGING DAP HANDS HERO CANVAS (12-15 SEC TOTAL TIMELINE) ---
const FallingPixelLogoHero = ({
  onAnimationComplete,
  isAnimationDone = false,
  onScrollDown
}: {
  onAnimationComplete?: () => void;
  isAnimationDone?: boolean;
  onScrollDown?: () => void;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [replayTrigger, setReplayTrigger] = useState(0);
  const completedNotifiedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const setupAndRun = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      drawCustomCampusConnectLogo(offCtx, width, height);

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const step = width < 520 ? 3 : (width > 1600 ? 5 : 4);
      const particles = [];

      // Tuned pixel fall physics (~4.2s fall + ~0.3s settle + ~2.5s swing & dap = ~7s total sequence)
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const idx = (y * width + x) * 4;
          if (imgData[idx + 3] > 128) {
            const columnWave = Math.sin((x / width) * Math.PI * 3) * 55;
            particles.push({
              tx: x,
              ty: y,
              x: x + (Math.random() - 0.5) * 16,
              y: -Math.random() * height * 0.9 - (height - y) * 0.45 - Math.abs(columnWave),
              vy: 0.9 + Math.random() * 0.9,
              gravity: 0.024 + Math.random() * 0.014,
              maxVy: 4.6 + Math.random() * 1.4,
              landed: false,
              size: step + 0.35,
              alpha: 0.75 + Math.random() * 0.25
            });
          }
        }
      }

      const ambientDrops = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.55,
        size: 2
      }));

      const createSparks = () =>
        Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
          const speed = 1.1 + Math.random() * 2.6;
          return {
            x: 0,
            y: 0,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 0.9,
            size: 4 + Math.random() * 3,
            alpha: 1
          };
        });

      let impactSparks = createSparks();
      let settleFrames = 0;
      let dapProgress = 0;
      let sparksTriggered = false;

      const render = () => {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.09)';
        for (let i = 0; i < ambientDrops.length; i++) {
          const d = ambientDrops[i];
          d.y += d.speed;
          if (d.y > height) {
            d.y = -6;
            d.x = Math.random() * width;
          }
          ctx.fillRect(d.x, d.y, d.size, d.size);
        }

        let landedCount = 0;
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].landed) landedCount++;
        }
        const landedRatio = particles.length > 0 ? landedCount / particles.length : 1;

        // Once settled (~4.2s), pause briefly (~0.3s), then swing hands in over ~2.5s
        if (landedRatio >= 0.998) {
          settleFrames++;
          if (settleFrames > 18) {
            dapProgress = Math.min(1, dapProgress + 0.0075);
          }
        }

        // Smoothly dim the settled logo down to ~76% opacity (75-80%) when the hands enter for contrast
        const settledLogoAlpha =
          dapProgress > 0 ? 1 - Math.min(1, dapProgress / 0.35) * 0.24 : 1;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          if (!p.landed) {
            p.vy = Math.min(p.maxVy, p.vy + p.gravity);
            p.y += p.vy;
            p.x += (p.tx - p.x) * 0.14;

            if (p.y < p.ty - 4 && p.y > -10) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
              ctx.fillRect(p.x, p.y - p.vy * 1.4, p.size, p.vy * 1.2);
            }

            if (p.y >= p.ty) {
              p.y = p.ty;
              p.x = p.tx;
              p.landed = true;
              p.alpha = 1;
            }
          }
          if (p.y > -10) {
            const drawAlpha = p.landed ? settledLogoAlpha : p.alpha;
            ctx.fillStyle = `rgba(255, 255, 255, ${drawAlpha})`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }

        if (dapProgress > 0) {
          if (dapProgress >= 0.72 && !sparksTriggered) {
            sparksTriggered = true;
            impactSparks = createSparks();
          }
          drawDapHands(ctx, width, height, dapProgress, impactSparks);
        }

        // Check if full animation sequence is completed
        if (dapProgress >= 1) {
          if (!completedNotifiedRef.current) {
            completedNotifiedRef.current = true;
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          }
        }

        animationFrameId = requestAnimationFrame(render);
      };

      render();
    };

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationFrameId);
        setupAndRun();
      }, 150);
    };

    const handleSkipOrComplete = () => {
      if (!completedNotifiedRef.current) {
        completedNotifiedRef.current = true;
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    };

    setupAndRun();
    window.addEventListener('resize', handleResize);
    window.addEventListener('wheel', handleSkipOrComplete, { passive: true });
    window.addEventListener('touchmove', handleSkipOrComplete, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleSkipOrComplete);
      window.removeEventListener('touchmove', handleSkipOrComplete);
    };
  }, [replayTrigger, onAnimationComplete]);

  const handleClick = () => {
    if (!isAnimationDone && !completedNotifiedRef.current) {
      completedNotifiedRef.current = true;
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    } else {
      setReplayTrigger((c) => c + 1);
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[100dvh] bg-black flex flex-col items-center justify-center overflow-hidden select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-editorial-mono {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .font-editorial-sans {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        @keyframes floatGlass {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes scanSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes roadMove {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -48; }
        }
        @keyframes carBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        @keyframes itemDrop1 {
          0% { transform: translateY(-28px) scale(0.7); opacity: 0; }
          40% { transform: translateY(0px) scale(1); opacity: 1; }
          80% { transform: translateY(6px) scale(0.85); opacity: 1; }
          100% { transform: translateY(12px) scale(0.4); opacity: 0; }
        }
        @keyframes clocheLift {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          45%, 65% { transform: translateY(-16px) rotate(-4deg); }
        }
        @keyframes steamRise {
          0% { transform: translateY(6px); opacity: 0; }
          50% { opacity: 0.95; }
          100% { transform: translateY(-14px); opacity: 0; }
        }
        @keyframes ballRally {
          0%, 100% { transform: translate(-42px, 4px) rotate(0deg); }
          25% { transform: translate(0px, -18px) rotate(180deg); }
          50% { transform: translate(42px, 4px) rotate(360deg); }
          75% { transform: translate(0px, -14px) rotate(540deg); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(0.85); opacity: 0.35; }
          50% { transform: scale(1.18); opacity: 0.9; }
        }
      `}</style>

      {/* FULL-SCREEN HERO CANVAS */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onClick={handleClick}
          className="w-full h-full block cursor-pointer"
          title={isAnimationDone ? "Tap to replay falling pixels & dap-up" : "Tap anywhere to skip animation"}
        />
      </div>

      {/* SKIP HINT (WHILE ANIMATION IS PLAYING) */}
      {!isAnimationDone && (
        <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-40">
          <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            Tap / Scroll to skip
          </span>
        </div>
      )}

      {/* SCROLL TO EXPLORE BUTTON (APPEARS ONCE ANIMATION FINISHES) */}
      <div
        className={`absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 transition-all duration-700 ease-out flex flex-col items-center gap-2 ${
          isAnimationDone
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.10] hover:border-white/25 backdrop-blur-xl transition-all cursor-pointer focus:outline-none"
          title="Scroll down to explore pooling verticals"
        >
          <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">
            Scroll to Explore
          </span>
          <svg
            className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white animate-bounce transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
};

// --- GLASSY ANIMATED ICON BOX FOR EACH POOLING VERTICAL ---
const GlassyInfographicBox = ({ categoryId, isPaused, onTogglePause }) => {
  return (
    <div className="relative w-full h-52 sm:h-68 overflow-hidden rounded-xl bg-gradient-to-br from-[#d8dee9]/16 via-[#b8c4d9]/10 to-[#050608] backdrop-blur-2xl flex items-center justify-center select-none transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)]">
      <div className="absolute -top-12 left-6 w-48 h-48 rounded-full bg-sky-200/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-14 right-8 w-52 h-52 rounded-full bg-amber-100/10 blur-3xl pointer-events-none" />

      <div
        className="relative w-full py-5 px-4 sm:px-7 bg-white/[0.12] backdrop-blur-2xl flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.65)] overflow-hidden"
        style={{ animation: isPaused ? 'none' : 'floatGlass 4.2s ease-in-out infinite' }}
      >
        {!isPaused && (
          <div
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
            style={{ animation: 'scanSlide 5.5s linear infinite' }}
          />
        )}

        {/* 1. CAB & AUTO POOL */}
        {categoryId === 'rides' && (
          <div className="relative w-56 sm:w-64 h-24 rounded-full bg-[#0b0d12]/95 px-6 flex items-center justify-center shadow-2xl overflow-hidden">
            <svg viewBox="0 0 220 80" className="w-full h-full overflow-visible">
              <line
                x1="10"
                y1="64"
                x2="210"
                y2="64"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="3"
                strokeDasharray="12 12"
                style={{ animation: isPaused ? 'none' : 'roadMove 0.9s linear infinite' }}
              />
              <line
                x1="18"
                y1="34"
                x2="48"
                y2="34"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: isPaused ? 'none' : 'roadMove 0.7s linear infinite' }}
              />
              <line
                x1="10"
                y1="46"
                x2="42"
                y2="46"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ animation: isPaused ? 'none' : 'roadMove 0.7s linear infinite' }}
              />
              <g style={{ animation: isPaused ? 'none' : 'carBounce 0.8s ease-in-out infinite' }}>
                <rect x="98" y="14" width="22" height="7" rx="2" fill="#FFFFFF" />
                <path
                  d="M62 46 L76 23 L138 23 L154 38 L168 40 L168 54 L62 54 Z"
                  fill="#FFFFFF"
                />
                <path d="M81 27 L106 27 L106 39 L73 39 Z" fill="#0b0d12" />
                <path d="M111 27 L134 27 L145 39 L111 39 Z" fill="#0b0d12" />
                <circle cx="94" cy="33" r="3.5" fill="#FFFFFF" />
                <circle cx="122" cy="33" r="3.5" fill="#FFFFFF" />
                <polygon
                  points="168,42 206,33 206,55 168,49"
                  fill="rgba(255,255,255,0.35)"
                />
                <circle cx="84" cy="54" r="9" fill="#0b0d12" stroke="#FFFFFF" strokeWidth="4" />
                <circle cx="144" cy="54" r="9" fill="#0b0d12" stroke="#FFFFFF" strokeWidth="4" />
              </g>
            </svg>
          </div>
        )}

        {/* 2. QUICK COMMERCE */}
        {categoryId === 'qcommerce' && (
          <div className="relative w-56 sm:w-64 h-24 rounded-full bg-[#0b0d12]/95 px-6 flex items-center justify-center shadow-2xl overflow-hidden">
            <svg viewBox="0 0 220 80" className="w-full h-full overflow-visible">
              <circle
                cx="110"
                cy="42"
                r="30"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="2"
                strokeDasharray="4 6"
                style={{
                  transformOrigin: '110px 42px',
                  animation: isPaused ? 'none' : 'pulseRing 2s ease-in-out infinite'
                }}
              />
              <g
                style={{
                  transformOrigin: '96px 20px',
                  animation: isPaused ? 'none' : 'itemDrop1 1.8s ease-in-out infinite'
                }}
              >
                <rect x="90" y="10" width="12" height="14" rx="2" fill="#FFFFFF" />
              </g>
              <g
                style={{
                  transformOrigin: '122px 20px',
                  animation: isPaused ? 'none' : 'itemDrop1 1.8s ease-in-out 0.6s infinite'
                }}
              >
                <circle cx="122" cy="16" r="6" fill="#FFFFFF" />
              </g>
              <g style={{ animation: isPaused ? 'none' : 'carBounce 1.1s ease-in-out infinite' }}>
                <path d="M84 32 L136 32 L131 64 L89 64 Z" fill="#FFFFFF" />
                <path
                  d="M98 32 C98 22, 122 22, 122 32"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon
                  points="113,37 103,49 111,49 107,59 119,46 111,46"
                  fill="#0b0d12"
                />
              </g>
            </svg>
          </div>
        )}

        {/* 3. FOOD CRAVINGS POOL */}
        {categoryId === 'food' && (
          <div className="relative w-56 sm:w-64 h-24 rounded-full bg-[#0b0d12]/95 px-6 flex items-center justify-center shadow-2xl overflow-hidden">
            <svg viewBox="0 0 220 80" className="w-full h-full overflow-visible">
              <path
                d="M96 34 Q92 26 98 20 Q104 14 98 8"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: isPaused ? 'none' : 'steamRise 1.6s ease-in-out infinite' }}
              />
              <path
                d="M110 32 Q106 24 112 18 Q118 12 112 6"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: isPaused ? 'none' : 'steamRise 1.6s ease-in-out 0.4s infinite' }}
              />
              <path
                d="M124 34 Q120 26 126 20 Q132 14 126 8"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ animation: isPaused ? 'none' : 'steamRise 1.6s ease-in-out 0.8s infinite' }}
              />
              <rect x="68" y="56" width="84" height="6" rx="3" fill="#FFFFFF" />
              <path d="M88 55 C88 43, 132 43, 132 55 Z" fill="rgba(255,255,255,0.75)" />
              <g
                style={{
                  transformOrigin: '110px 54px',
                  animation: isPaused ? 'none' : 'clocheLift 2.4s ease-in-out infinite'
                }}
              >
                <circle cx="110" cy="24" r="4.5" fill="#FFFFFF" />
                <path d="M76 54 C76 30, 144 30, 144 54 Z" fill="#FFFFFF" />
                <path
                  d="M86 48 C88 37, 102 34, 110 34"
                  fill="none"
                  stroke="#0b0d12"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        )}

        {/* 4. TURF & COURTS SQUAD */}
        {categoryId === 'sports' && (
          <div className="relative w-56 sm:w-64 h-24 rounded-full bg-[#0b0d12]/95 px-6 flex items-center justify-center shadow-2xl overflow-hidden">
            <svg viewBox="0 0 220 80" className="w-full h-full overflow-visible">
              <rect
                x="42"
                y="20"
                width="136"
                height="44"
                rx="6"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
              />
              <line
                x1="110"
                y1="20"
                x2="110"
                y2="64"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
              />
              <circle
                cx="110"
                cy="42"
                r="11"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
              />
              <rect x="48" y="31" width="5" height="22" rx="2.5" fill="#FFFFFF" />
              <rect x="167" y="31" width="5" height="22" rx="2.5" fill="#FFFFFF" />
              <g
                style={{
                  transformOrigin: '110px 42px',
                  animation: isPaused ? 'none' : 'ballRally 1.9s ease-in-out infinite'
                }}
              >
                <circle cx="110" cy="42" r="8" fill="#FFFFFF" />
                <polygon points="110,37 114,40 112,45 108,45 106,40" fill="#0b0d12" />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Bottom-Left Square Glass Button [ ↗ ] */}
      <div className="absolute bottom-3 left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/65 backdrop-blur-md flex items-center justify-center text-white/90 group-hover:bg-white group-hover:text-black transition-colors">
        <ArrowUpRight className="w-4 h-4" />
      </div>

      {/* Bottom-Right Square Glass Pause/Play Button [ || ] */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePause(categoryId);
        }}
        className="absolute bottom-3 right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-black/65 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-white hover:text-black transition-colors"
        title={isPaused ? 'Play Loop' : 'Pause Loop'}
      >
        {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

// --- CATEGORY DEFINITIONS ---
const CATEGORIES = [
  {
    id: 'rides',
    title: 'Cab & Auto Pool',
    subtitle: 'UBER • OLA • RAPIDO',
    icon: Car
  },
  {
    id: 'qcommerce',
    title: 'Quick Commerce',
    subtitle: 'BLINKIT • ZEPTO • INSTAMART',
    icon: ShoppingBag
  },
  {
    id: 'food',
    title: 'Food Cravings Pool',
    subtitle: 'ZOMATO • SWIGGY',
    icon: Utensils
  },
  {
    id: 'sports',
    title: 'Turf & Courts Squad',
    subtitle: 'CRICKET • FOOTBALL • TENNIS',
    icon: Trophy
  }
];

// --- INITIAL SAMPLE POOLS ---
const INITIAL_POOLS = [
  {
    id: 'ride-101',
    category: 'rides',
    hostName: 'Aarav Mehta',
    hostRating: 4.9,
    hostTrips: 34,
    hostAvatar: 'AM',
    hostPhone: '+91 98201 •••42',
    platform: 'Uber Premier',
    routeFrom: 'Main Gate (Hostel Block C)',
    routeTo: 'Kempegowda Int. Airport (T2)',
    timeWindow: 'Today, 5:30 PM – 6:00 PM',
    totalPrice: 1200,
    spotsTotal: 4,
    spotsFilled: 2,
    expectedPerPerson: 300,
    notes: 'Have 1 medium check-in bag. Splitting equally via UPI once trip starts.',
    joined: false,
    agreedContribution: 300,
    rated: false,
    status: 'open'
  },
  {
    id: 'ride-102',
    category: 'rides',
    hostName: 'Sneha Nair',
    hostRating: 4.8,
    hostTrips: 19,
    hostAvatar: 'SN',
    hostPhone: '+91 97114 •••89',
    platform: 'Ola Auto / Mini',
    routeFrom: 'Academic Block 4',
    routeTo: 'Indiranagar Metro Station',
    timeWindow: 'Today, 4:15 PM – 4:30 PM',
    totalPrice: 240,
    spotsTotal: 3,
    spotsFilled: 1,
    expectedPerPerson: 80,
    notes: 'Heading out right after the 4 PM lecture. Flexible by 10 mins.',
    joined: false,
    agreedContribution: 80,
    rated: false,
    status: 'open'
  },
  {
    id: 'qc-201',
    category: 'qcommerce',
    hostName: 'Rohan Gupta',
    hostRating: 5.0,
    hostTrips: 52,
    hostAvatar: 'RG',
    hostPhone: '+91 99102 •••15',
    platform: 'Blinkit',
    dropLocation: 'Hostel H7 Common Lounge',
    timeWindow: 'Ordering in 12 mins',
    currentCart: 145,
    targetCart: 199,
    benefitUnlocked: 'Free Delivery (MOV ₹199)',
    spotsTotal: 4,
    spotsFilled: 2,
    expectedPerPerson: 54,
    notes: 'Even if you just need a ₹20 Maggi or ₹30 coke, hop in so we skip the ₹35 delivery + surge fee!',
    joined: false,
    agreedContribution: 30,
    rated: false,
    status: 'open'
  },
  {
    id: 'qc-202',
    category: 'qcommerce',
    hostName: 'Diya Sharma',
    hostRating: 4.7,
    hostTrips: 14,
    hostAvatar: 'DS',
    hostPhone: '+91 98450 •••71',
    platform: 'Zepto SuperSaver',
    dropLocation: 'Girls Hostel B2 Gate',
    timeWindow: 'Ordering in 20 mins',
    currentCart: 380,
    targetCart: 499,
    benefitUnlocked: 'Flat ₹100 Off + ₹0 Delivery',
    spotsTotal: 5,
    spotsFilled: 3,
    expectedPerPerson: 119,
    notes: 'Need ₹119 more in cart to trigger the ₹100 bank + super saver discount. Discount split proportionally!',
    joined: false,
    agreedContribution: 60,
    rated: false,
    status: 'open'
  },
  {
    id: 'food-301',
    category: 'food',
    hostName: 'Kabir Verma',
    hostRating: 4.9,
    hostTrips: 41,
    hostAvatar: 'KV',
    hostPhone: '+91 98118 •••04',
    platform: 'Zomato Gold (7 km away)',
    restaurant: "Truffles / Leon's Burgers",
    dropLocation: 'Main Gate Turnstile',
    timeWindow: 'Ordering at 8:00 PM',
    currentCart: 420,
    targetCart: 699,
    benefitUnlocked: 'Flat ₹175 OFF + Free Long-Distance',
    spotsTotal: 4,
    spotsFilled: 2,
    expectedPerPerson: 279,
    notes: 'Ordering from the main city outlet (not on campus apps). Add ~₹280 worth of burgers/fries for max coupon!',
    joined: false,
    agreedContribution: 220,
    rated: false,
    status: 'open'
  },
  {
    id: 'food-302',
    category: 'food',
    hostName: 'Ananya Rao',
    hostRating: 4.8,
    hostTrips: 27,
    hostAvatar: 'AR',
    hostPhone: '+91 96321 •••63',
    platform: 'Swiggy One',
    restaurant: 'Meghana Foods (Biryani Pool)',
    dropLocation: 'Hostel Circle Bench',
    timeWindow: 'Ordering at 1:15 PM',
    currentCart: 650,
    targetCart: 1000,
    benefitUnlocked: '25% Jumbo Party Discount',
    spotsTotal: 5,
    spotsFilled: 3,
    expectedPerPerson: 200,
    notes: 'Clubbing a large order so everyone gets ~₹75 off their individual item.',
    joined: false,
    agreedContribution: 200,
    rated: false,
    status: 'open'
  },
  {
    id: 'sport-401',
    category: 'sports',
    hostName: 'Vikramaditya S.',
    hostRating: 4.9,
    hostTrips: 29,
    hostAvatar: 'VS',
    hostPhone: '+91 98801 •••33',
    platform: 'Playo • KickOff Arena',
    sportType: '7v7 Box Football / Cricket',
    venue: 'KickOff Rooftop Turf (1.5 km)',
    timeWindow: 'Tonight, 9:00 PM – 10:30 PM',
    totalPrice: 1400,
    spotsTotal: 14,
    spotsFilled: 10,
    expectedPerPerson: 100,
    notes: 'Need 4 more players! Friendly game, great way to chill after mid-sems. Turf + floodlights included.',
    joined: false,
    agreedContribution: 100,
    rated: false,
    status: 'open'
  },
  {
    id: 'sport-402',
    category: 'sports',
    hostName: 'Pranav & Simran',
    hostRating: 5.0,
    hostTrips: 16,
    hostAvatar: 'PS',
    hostPhone: '+91 97405 •••28',
    platform: 'Campus Indoor Complex',
    sportType: 'Lawn Tennis / Basketball',
    venue: 'Synthetic Court #2',
    timeWindow: 'Tomorrow, 6:30 AM – 7:30 AM',
    totalPrice: 400,
    spotsTotal: 4,
    spotsFilled: 2,
    expectedPerPerson: 100,
    notes: 'Looking for 2 doubles partners. Extra racquets available if you need one!',
    joined: false,
    agreedContribution: 100,
    rated: false,
    status: 'open'
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isHeroAnimationDone, setIsHeroAnimationDone] = useState(false);
  const [pools, setPools] = useState<any[]>(INITIAL_POOLS);
  const [searchQuery, setSearchQuery] = useState('');
  const [pausedCards, setPausedCards] = useState<Record<string, boolean>>({});
  const verticalsRef = useRef<HTMLDivElement | null>(null);

  // User Profile & Auth State
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: 'You (Aryan K.)',
    avatar: 'AK',
    university: 'IIT / Campus Tech University',
    email: 'aryan.k26@campus.edu.in',
    department: 'Computer Science & Engg. (3rd Yr)',
    hometown: 'Bengaluru, KA',
    hostel: 'Hostel H4 • Room 212',
    bio: 'Always down for late-night Blinkit runs, 7v7 turf football, and Friday airport cab splits.',
    interests: 'Football • Cold Brew • Hackathons • F1',
    trustScore: 4.92,
    poolsJoined: 23,
    totalSaved: 4850
  });

  const [profileDraft, setProfileDraft] = useState(userProfile);
  const [signInForm, setSignInForm] = useState({
    name: 'Aryan K.',
    email: 'aryan.k26@campus.edu.in',
    department: 'Computer Science & Engg.',
    hometown: 'Bengaluru, KA'
  });

  // Modals & Drawers
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [negotiatingPool, setNegotiatingPool] = useState(null);
  const [negotiationOffer, setNegotiationOffer] = useState('');
  const [negotiationNote, setNegotiationNote] = useState('');
  const [negotiationMode, setNegotiationMode] = useState('instant');

  // Edit Pool Requirements Modal
  const [editingPool, setEditingPool] = useState(null);
  const [editPoolDraft, setEditPoolDraft] = useState(null);

  // Active Chat & Call Modal
  const [activeChatPoolId, setActiveChatPoolId] = useState(null);
  const [chatMessages, setChatMessages] = useState({
    'ride-101': [
      {
        id: 1,
        sender: 'Aarav Mehta',
        text: 'Hey! I will book the Uber 10 mins before 5:30 PM near Block C gate.',
        time: '5:02 PM',
        isSelf: false
      }
    ],
    'qc-201': [
      {
        id: 1,
        sender: 'Rohan Gupta',
        text: 'Drop your Blinkit item screenshot or name here, adding to cart right now!',
        time: '6:10 PM',
        isSelf: false
      }
    ]
  });
  const [messageInput, setMessageInput] = useState('');
  const [inVoiceCall, setInVoiceCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);

  // Mutual Rating Modal
  const [ratingPool, setRatingPool] = useState(null);
  const [selectedStars, setSelectedStars] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['On-Time', 'Smooth UPI Split']);
  const [ratingFeedback, setRatingFeedback] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // New Pool Form State
  const [newPost, setNewPost] = useState({
    category: 'rides',
    platform: '',
    routeFrom: '',
    routeTo: '',
    dropLocation: '',
    restaurant: '',
    sportType: '',
    venue: '',
    timeWindow: '',
    totalPrice: '',
    currentCart: '',
    targetCart: '',
    benefitUnlocked: '',
    spotsTotal: '4',
    expectedPerPerson: '',
    notes: ''
  });

  useEffect(() => {
    let timer;
    if (inVoiceCall) {
      timer = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(timer);
  }, [inVoiceCall]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const formatCallTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const togglePauseCard = (catId) => {
    setPausedCards((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  // --- BOOKING & NEGOTIATION HANDLER ---
  const openJoinOrNegotiate = (pool, mode = 'instant') => {
    setNegotiatingPool(pool);
    setNegotiationMode(mode);
    setNegotiationOffer(String(pool.agreedContribution || pool.expectedPerPerson));
    setNegotiationNote('');
  };

  const confirmBookingOrNegotiation = (e) => {
    e.preventDefault();
    if (!negotiatingPool) return;

    const finalAmount = Number(negotiationOffer) || negotiatingPool.expectedPerPerson;
    const isNegotiated = finalAmount !== negotiatingPool.expectedPerPerson;

    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== negotiatingPool.id) return p;
        return {
          ...p,
          joined: true,
          spotsFilled: Math.min(p.spotsTotal, p.spotsFilled + 1),
          currentCart: p.currentCart ? p.currentCart + finalAmount : undefined,
          agreedContribution: finalAmount
        };
      })
    );

    const introMsg = isNegotiated
      ? `Joined pool with a negotiated split of ₹${finalAmount}. ${negotiationNote ? `"${negotiationNote}"` : ''}`
      : `Confirmed spot at ₹${finalAmount}! Ready to coordinate.`;

    const hostReply = isNegotiated
      ? `Deal! Accepted ₹${finalAmount}. Feel free to call or text here for live coordination.`
      : `Awesome, welcome aboard! Call or text here anytime.`;

    setChatMessages((prev) => ({
      ...prev,
      [negotiatingPool.id]: [
        ...(prev[negotiatingPool.id] || []),
        {
          id: Date.now(),
          sender: 'You',
          text: introMsg,
          time: 'Just now',
          isSelf: true
        },
        {
          id: Date.now() + 1,
          sender: negotiatingPool.hostName,
          text: hostReply,
          time: 'Just now',
          isSelf: false
        }
      ]
    }));

    const bookedPoolId = negotiatingPool.id;
    setNegotiatingPool(null);
    showToast(
      isNegotiated
        ? `Negotiation accepted at ₹${finalAmount}! Direct Chat & Call unlocked.`
        : `Spot booked! Direct Chat & Call unlocked with ${negotiatingPool.hostName}.`
    );
    setActiveChatPoolId(bookedPoolId);
  };

  // --- EDIT POOL REQUIREMENTS HANDLER ---
  const openEditRequirementsModal = (pool) => {
    setEditingPool(pool);
    setEditPoolDraft({
      timeWindow: pool.timeWindow || '',
      expectedPerPerson: String(pool.agreedContribution ?? pool.expectedPerPerson ?? ''),
      totalPrice: String(pool.totalPrice ?? ''),
      currentCart: String(pool.currentCart ?? ''),
      targetCart: String(pool.targetCart ?? ''),
      spotsTotal: String(pool.spotsTotal ?? 4),
      spotsFilled: String(pool.spotsFilled ?? 1),
      benefitUnlocked: pool.benefitUnlocked || '',
      dropLocation: pool.dropLocation || '',
      notes: pool.notes || ''
    });
  };

  const handleSavePoolRequirements = (e) => {
    e.preventDefault();
    if (!editingPool || !editPoolDraft) return;

    const updatedSplit = Number(editPoolDraft.expectedPerPerson) || editingPool.expectedPerPerson;
    const updatedTotalSpots = Math.max(1, Number(editPoolDraft.spotsTotal) || editingPool.spotsTotal);
    const updatedFilledSpots = Math.min(
      updatedTotalSpots,
      Math.max(0, Number(editPoolDraft.spotsFilled) || editingPool.spotsFilled)
    );

    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== editingPool.id) return p;
        return {
          ...p,
          timeWindow: editPoolDraft.timeWindow || p.timeWindow,
          expectedPerPerson: updatedSplit,
          agreedContribution: updatedSplit,
          totalPrice:
            p.category === 'rides' || p.category === 'sports'
              ? Number(editPoolDraft.totalPrice) || p.totalPrice
              : p.totalPrice,
          currentCart:
            p.category === 'qcommerce' || p.category === 'food'
              ? Number(editPoolDraft.currentCart) || p.currentCart
              : p.currentCart,
          targetCart:
            p.category === 'qcommerce' || p.category === 'food'
              ? Number(editPoolDraft.targetCart) || p.targetCart
              : p.targetCart,
          benefitUnlocked: editPoolDraft.benefitUnlocked || p.benefitUnlocked,
          dropLocation: editPoolDraft.dropLocation || p.dropLocation,
          spotsTotal: updatedTotalSpots,
          spotsFilled: updatedFilledSpots,
          notes: editPoolDraft.notes
        };
      })
    );

    setChatMessages((prev) => ({
      ...prev,
      [editingPool.id]: [
        ...(prev[editingPool.id] || []),
        {
          id: Date.now(),
          sender: editingPool.hostName,
          text: `Updated pool requirements: Split is now ₹${updatedSplit}/person • Spots ${updatedFilledSpots}/${updatedTotalSpots} (${editPoolDraft.timeWindow}).`,
          time: 'Just now',
          isSelf: false
        }
      ]
    }));

    setEditingPool(null);
    setEditPoolDraft(null);
    showToast('Pool requirements & negotiated split updated live!');
  };

  // --- CREATE NEW POOL HANDLER ---
  const handleCreatePool = (e) => {
    e.preventDefault();
    const cat = newPost.category;
    const id = `${cat}-${Date.now()}`;
    const spots = Number(newPost.spotsTotal) || 4;
    const perPerson =
      Number(newPost.expectedPerPerson) ||
      (newPost.totalPrice ? Math.round(Number(newPost.totalPrice) / spots) : 60);

    const created = {
      id,
      category: cat,
      hostName: userProfile.name,
      hostRating: userProfile.trustScore,
      hostTrips: userProfile.poolsJoined,
      hostAvatar: 'YO',
      hostPhone: '+91 98000 •••00',
      platform:
        newPost.platform ||
        (cat === 'rides'
          ? 'Uber / Ola'
          : cat === 'qcommerce'
          ? 'Blinkit'
          : cat === 'food'
          ? 'Zomato'
          : 'Campus Arena'),
      routeFrom: newPost.routeFrom || 'Campus Main Gate',
      routeTo: newPost.routeTo || 'City Center / Railway Stn',
      dropLocation: newPost.dropLocation || 'Hostel Block Entrance',
      restaurant: newPost.restaurant || 'Popular Restaurant Chain',
      sportType: newPost.sportType || '5v5 Turf Match',
      venue: newPost.venue || 'Main Sports Complex',
      timeWindow: newPost.timeWindow || 'In 20 mins',
      totalPrice: Number(newPost.totalPrice) || perPerson * spots,
      currentCart: Number(newPost.currentCart) || 120,
      targetCart: Number(newPost.targetCart) || 199,
      benefitUnlocked:
        newPost.benefitUnlocked ||
        (cat === 'qcommerce' ? 'Free Delivery (MOV)' : 'Extra 25% Coupon'),
      spotsTotal: spots,
      spotsFilled: 1,
      expectedPerPerson: perPerson,
      agreedContribution: perPerson,
      notes: newPost.notes || 'Ping me to split or negotiate your share!',
      joined: true,
      rated: false,
      status: 'open'
    };

    setPools((prev) => [created, ...prev]);
    setChatMessages((prev) => ({
      ...prev,
      [id]: [
        {
          id: 1,
          sender: 'System',
          text: 'Your pool is live on Campus Connect! Campus peers can now join or negotiate with you.',
          time: 'Just now',
          isSelf: false
        }
      ]
    }));

    setIsPostModalOpen(false);
    setCurrentView(cat);
    showToast('Your pool has been posted live for campus peers!');
  };

  // --- SEND CHAT MESSAGE ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatPoolId) return;

    const pool = pools.find((p) => p.id === activeChatPoolId);
    const userText = messageInput.trim();
    setMessageInput('');

    setChatMessages((prev) => ({
      ...prev,
      [activeChatPoolId]: [
        ...(prev[activeChatPoolId] || []),
        {
          id: Date.now(),
          sender: 'You',
          text: userText,
          time: 'Just now',
          isSelf: true
        }
      ]
    }));

    setTimeout(() => {
      if (!pool) return;
      setChatMessages((prev) => ({
        ...prev,
        [activeChatPoolId]: [
          ...(prev[activeChatPoolId] || []),
          {
            id: Date.now() + 2,
            sender: pool.hostName,
            text: `Got it! Let's meet at ${pool.routeFrom || pool.dropLocation || pool.venue} as planned.`,
            time: 'Just now',
            isSelf: false
          }
        ]
      }));
    }, 900);
  };

  // --- SUBMIT MUTUAL RATING ---
  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (!ratingPool) return;

    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== ratingPool.id) return p;
        const newHostRating = Number(
          ((p.hostRating * p.hostTrips + selectedStars) / (p.hostTrips + 1)).toFixed(2)
        );
        return {
          ...p,
          rated: true,
          status: 'completed',
          hostRating: newHostRating,
          hostTrips: p.hostTrips + 1
        };
      })
    );

    setUserProfile((prev) => ({
      ...prev,
      poolsJoined: prev.poolsJoined + 1,
      trustScore: Number(((prev.trustScore * prev.poolsJoined + 5) / (prev.poolsJoined + 1)).toFixed(2)),
      totalSaved: prev.totalSaved + 120
    }));

    showToast(`Mutual rating (${selectedStars}★) submitted for ${ratingPool.hostName}!`);
    setRatingPool(null);
    setRatingFeedback('');
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === currentView);
  const activeChatPool = pools.find((p) => p.id === activeChatPoolId);

  const filteredPools = pools.filter((p) => {
    if (currentView === 'my-pools') return p.joined;
    if (currentView !== 'landing' && p.category !== currentView) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.hostName?.toLowerCase().includes(q) ||
      p.platform?.toLowerCase().includes(q) ||
      p.routeFrom?.toLowerCase().includes(q) ||
      p.routeTo?.toLowerCase().includes(q) ||
      p.dropLocation?.toLowerCase().includes(q) ||
      p.restaurant?.toLowerCase().includes(q) ||
      p.sportType?.toLowerCase().includes(q) ||
      p.venue?.toLowerCase().includes(q) ||
      p.notes?.toLowerCase().includes(q)
    );
  });

  const joinedPoolsCount = pools.filter((p) => p.joined).length;

  return (
    <div className="min-h-screen bg-black text-white font-editorial-mono flex flex-col justify-between pb-24 md:pb-12 overflow-x-hidden selection:bg-white selection:text-black">
      {/* TOP NAVIGATION BAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-700 ease-out ${
          currentView !== 'landing' || isHeroAnimationDone
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Left: Profile Tab + Brand Wordmark */}
          <div className="flex items-center gap-2 sm:gap-3 relative min-w-0">
            {isSignedIn ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-1.5 sm:gap-2.5 p-1 sm:p-1.5 pr-2.5 sm:pr-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all focus:outline-none"
                  title="Profile, Trust Rating, Bio & Account Options"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center">
                    {userProfile.avatar}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] sm:text-xs font-bold text-white leading-none truncate max-w-[68px] sm:max-w-none">
                        {userProfile.name}
                      </span>
                      <VerifiedTick className="w-3.5 h-3.5" />
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-white/15 text-[10px] font-bold text-white">
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                        {userProfile.trustScore}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 truncate max-w-[135px] mt-0.5 hidden sm:block">
                      {userProfile.department.split(' ')[0]} • {userProfile.hostel}
                    </p>
                  </div>
                </button>

                {/* Top-Left Profile Dropdown Card */}
                {isProfileMenuOpen && (
                  <div className="fixed sm:absolute left-3 right-3 sm:right-auto sm:left-0 top-16 sm:top-auto sm:mt-2 sm:w-80 rounded-2xl bg-zinc-950/95 backdrop-blur-2xl shadow-2xl p-5 z-50 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white text-black font-extrabold text-sm flex items-center justify-center shrink-0">
                          {userProfile.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <h4 className="text-sm font-bold text-white">{userProfile.name}</h4>
                            <VerifiedTick className="w-4 h-4" />
                          </div>
                          <p className="text-xs text-zinc-300 font-medium">
                            {userProfile.department}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            From {userProfile.hometown} • {userProfile.hostel}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="p-1 text-zinc-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-white/[0.04] rounded-xl p-3 space-y-2 text-xs font-editorial-sans">
                      <p className="text-zinc-300 leading-relaxed">"{userProfile.bio}"</p>
                      <div className="pt-1.5 text-[11px] text-zinc-400 font-editorial-mono">
                        ⚡ {userProfile.interests}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-white/[0.04] rounded-xl p-2">
                        <span className="text-[10px] text-zinc-400 block uppercase">TRUST RATING</span>
                        <span className="text-xs font-bold text-white">
                          {userProfile.trustScore} ★ ({userProfile.poolsJoined})
                        </span>
                      </div>
                      <div className="bg-white/[0.04] rounded-xl p-2">
                        <span className="text-[10px] text-zinc-400 block uppercase">CAMPUS SAVED</span>
                        <span className="text-xs font-bold text-white">
                          ₹{userProfile.totalSaved}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          setProfileDraft(userProfile);
                          setIsProfileMenuOpen(false);
                          setIsEditProfileOpen(true);
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        [ EDIT BIO ]
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setIsSignedIn(false);
                          showToast('Signed out of Campus Connect.');
                        }}
                        className="py-2 px-3 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-zinc-300 text-xs font-bold uppercase transition-colors"
                      >
                        [ SIGN OUT ]
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>[ SIGN IN ]</span>
                <VerifiedTick className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => {
                setCurrentView('landing');
                setSearchQuery('');
              }}
              className="flex items-center gap-1.5 text-left group focus:outline-none pl-1 min-w-0"
            >
              <span className="font-editorial-mono font-extrabold tracking-tight lowercase text-white text-xs sm:text-base group-hover:text-zinc-300 transition-colors truncate">
                campus connect
              </span>
            </button>
          </div>

          {/* Center Quick Switcher (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.05] p-1 rounded-full">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                currentView === 'landing'
                  ? 'bg-white text-black'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              HUB
            </button>
            {CATEGORIES.map((cat) => {
              const isActive = currentView === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentView(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-white text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.title.split(' ')[0]}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              onClick={() => setCurrentView('my-pools')}
              className={`relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                currentView === 'my-pools'
                  ? 'bg-white text-black'
                  : 'bg-white/[0.07] text-white hover:bg-white/[0.14]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">MY POOLS</span>
              {joinedPoolsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white text-black text-[10px] font-extrabold">
                  {joinedPoolsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setNewPost((prev) => ({
                  ...prev,
                  category:
                    currentView !== 'landing' && currentView !== 'my-pools' ? currentView : 'rides'
                }));
                setIsPostModalOpen(true);
              }}
              className="flex items-center gap-1 rounded-full bg-white hover:bg-zinc-200 text-black px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>POST</span>
            </button>
          </div>
        </div>
      </header>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto z-50 max-w-md rounded-xl bg-zinc-900 text-white px-4 py-3 shadow-2xl flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span className="text-xs font-editorial-mono">{toastMessage}</span>
        </div>
      )}

      {/* FALLING PIXEL HERO LOGO + DAP HANDS (LANDING PAGE - FULL SCREEN) */}
      {currentView === 'landing' && (
        <FallingPixelLogoHero
          onAnimationComplete={() => setIsHeroAnimationDone(true)}
          isAnimationDone={isHeroAnimationDone}
          onScrollDown={() => verticalsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main
        className={`flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 ${
          currentView === 'landing' ? 'pt-14 sm:pt-20' : 'pt-20 sm:pt-24'
        }`}
      >
        {/* =========================================================
            VIEW 1: PRIMARY LANDING PAGE
           ========================================================= */}
        {currentView === 'landing' && (
          <div ref={verticalsRef} className="space-y-8 sm:space-y-12">
            {/* Main Headline */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <h1 className="text-2xl sm:text-5xl font-bold tracking-tight text-white">
                Pool Right Away.
              </h1>
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-300 bg-white/[0.06] rounded-full px-3.5 py-1.5 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {pools.filter((p) => p.status === 'open').length} LIVE OPTIONS
              </span>
            </div>

            {/* 4 CORE POOLING VERTICALS IN CONTINUOUS FLOW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {CATEGORIES.map((cat) => {
                const livePools = pools.filter((p) => p.category === cat.id && p.status === 'open');
                const liveCount = livePools.length;
                const latestPool = livePools[0];

                let latestText = 'No live pools right now. Tap to post the first one.';
                if (latestPool) {
                  if (cat.id === 'rides') {
                    latestText = `Latest: ${latestPool.routeFrom} → ${latestPool.routeTo} (${latestPool.timeWindow}) · ₹${latestPool.agreedContribution}/person split.`;
                  } else if (cat.id === 'qcommerce') {
                    const need = Math.max(0, latestPool.targetCart - latestPool.currentCart);
                    latestText = `Latest: ${latestPool.platform} to ${latestPool.dropLocation} · ₹${need} more needed for ${latestPool.benefitUnlocked}.`;
                  } else if (cat.id === 'food') {
                    latestText = `Latest: ${latestPool.restaurant} on ${latestPool.platform} · ${latestPool.benefitUnlocked}.`;
                  } else if (cat.id === 'sports') {
                    const left = latestPool.spotsTotal - latestPool.spotsFilled;
                    latestText = `Latest: ${latestPool.sportType} at ${latestPool.venue} · ${left} spots left at ₹${latestPool.agreedContribution}/head.`;
                  }
                }

                return (
                  <article
                    key={cat.id}
                    onClick={() => setCurrentView(cat.id)}
                    className="group cursor-pointer text-left flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3.5">
                      <GlassyInfographicBox
                        categoryId={cat.id}
                        isPaused={!!pausedCards[cat.id]}
                        onTogglePause={togglePauseCard}
                      />

                      <div className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-zinc-400 pt-1">
                        <span className="text-white font-semibold">{cat.subtitle}</span>
                        <span>·</span>
                        <span className="text-white font-bold">{liveCount} LIVE RN</span>
                      </div>

                      <h2 className="text-xl sm:text-[28px] font-normal text-white group-hover:text-zinc-200 leading-snug tracking-tight">
                        {cat.title}
                      </h2>

                      <p className="font-editorial-sans text-xs sm:text-[15px] text-zinc-400 leading-relaxed">
                        {latestText}
                      </p>
                    </div>

                    <div className="pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white group-hover:translate-x-1 transition-transform">
                        [ OPEN {cat.title.split(' ')[0].toUpperCase()} ↗ ]
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            VIEW 2: CATEGORY FEED OR MY POOLS PAGE
           ========================================================= */}
        {currentView !== 'landing' && (
          <div className="space-y-6">
            {/* Sub-header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('landing')}
                  className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white transition-colors"
                  title="Back to Hub"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-3xl font-bold text-white tracking-tight">
                      {currentView === 'my-pools' ? 'My Active Pools' : activeCategoryObj?.title}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] text-[11px] font-bold uppercase text-white">
                      {filteredPools.length} LIVE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-editorial-sans mt-0.5">
                    {currentView === 'my-pools'
                      ? 'Coordinate via direct chat or voice call, edit pool requirements, and rate peers.'
                      : activeCategoryObj?.subtitle}
                  </p>
                </div>
              </div>

              {/* Search & Post */}
              <div className="flex items-center gap-2.5">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter route, app, hostel..."
                    className="w-full pl-9 pr-4 py-2 rounded-full bg-white/[0.05] text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:bg-white/[0.1]"
                  />
                </div>
                {currentView !== 'my-pools' && (
                  <button
                    onClick={() => {
                      setNewPost((prev) => ({ ...prev, category: currentView }));
                      setIsPostModalOpen(true);
                    }}
                    className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-zinc-200 text-black px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>NEW POOL</span>
                  </button>
                )}
              </div>
            </div>

            {/* Pool Feed Grid */}
            {filteredPools.length === 0 ? (
              <div className="rounded-2xl bg-white/[0.03] p-12 text-center space-y-4">
                <p className="text-base font-bold text-white">No pools found in this view</p>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto font-editorial-sans">
                  {currentView === 'my-pools'
                    ? "You haven't joined or posted any pools yet. Pick a vertical on the hub to jump in!"
                    : 'Be the first on campus to post a pool here and split the cost.'}
                </p>
                <button
                  onClick={() => {
                    if (currentView === 'my-pools') {
                      setCurrentView('landing');
                    } else {
                      setNewPost((prev) => ({ ...prev, category: currentView }));
                      setIsPostModalOpen(true);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition"
                >
                  {currentView === 'my-pools' ? '[ EXPLORE HUB ]' : '[ POST POOL NOW ]'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPools.map((pool) => {
                  const spotsRemaining = Math.max(0, pool.spotsTotal - pool.spotsFilled);
                  const cartProgress = pool.targetCart
                    ? Math.min(100, Math.round((pool.currentCart / pool.targetCart) * 100))
                    : 0;
                  const amountRemaining = pool.targetCart
                    ? Math.max(0, pool.targetCart - pool.currentCart)
                    : 0;

                  return (
                    <div
                      key={pool.id}
                      className="rounded-2xl bg-white/[0.04] hover:bg-white/[0.06] p-5 sm:p-6 flex flex-col justify-between transition-all space-y-5"
                    >
                      <div className="space-y-4">
                        {/* Top Bar: Platform & Time */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-white/[0.1] text-white text-[11px] font-bold uppercase tracking-wider">
                            {pool.platform}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300">
                            <Clock className="w-3.5 h-3.5 text-white" />
                            {pool.timeWindow}
                          </span>
                        </div>

                        {/* Category Specific Details */}
                        {pool.category === 'rides' && (
                          <div className="rounded-xl bg-black/60 p-4 space-y-2.5">
                            <div className="flex items-start gap-2.5">
                              <span className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0" />
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                                  PICKUP POINT A
                                </span>
                                <p className="text-sm font-bold text-white">{pool.routeFrom}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2.5">
                              <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                                  DESTINATION POINT B
                                </span>
                                <p className="text-sm font-bold text-white">{pool.routeTo}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {(pool.category === 'qcommerce' || pool.category === 'food') && (
                          <div className="rounded-xl bg-black/60 p-4 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                                  {pool.category === 'food' ? 'RESTAURANT CHAIN' : 'DROP POINT'}
                                </span>
                                <p className="text-sm font-bold text-white">
                                  {pool.category === 'food' ? pool.restaurant : pool.dropLocation}
                                </p>
                              </div>
                              <span className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[10px] font-bold uppercase">
                                {pool.benefitUnlocked}
                              </span>
                            </div>

                            {/* Minimum Order Value Progress Bar */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-xs">
                                <span className="text-zinc-400">
                                  Cart: <strong className="text-white">₹{pool.currentCart}</strong> / ₹
                                  {pool.targetCart}
                                </span>
                                <span className="font-bold text-white">
                                  {amountRemaining > 0
                                    ? `₹${amountRemaining} more needed`
                                    : 'Target Unlocked!'}
                                </span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full bg-white rounded-full transition-all duration-500"
                                  style={{ width: `${cartProgress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {pool.category === 'sports' && (
                          <div className="rounded-xl bg-black/60 p-4 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                                SPORT / PITCH
                              </span>
                              <span className="text-xs font-bold text-white">
                                Total Turf: ₹{pool.totalPrice}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-white">{pool.sportType}</p>
                            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                              {pool.venue}
                            </p>
                          </div>
                        )}

                        {/* Notes */}
                        <p className="text-xs text-zinc-300 font-editorial-sans leading-relaxed">
                          "{pool.notes}"
                        </p>
                      </div>

                      {/* Bottom Footer: Host Info, Price & Actions */}
                      <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          {/* Host Badge */}
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center">
                              {pool.hostAvatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-white">
                                  {pool.hostName}
                                </span>
                                <VerifiedTick className="w-3.5 h-3.5" />
                                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-zinc-300">
                                  ★ {pool.hostRating}
                                </span>
                              </div>
                              <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {pool.spotsFilled}/{pool.spotsTotal} in ({spotsRemaining} left)
                              </span>
                            </div>
                          </div>

                          {/* Split Price */}
                          <div className="text-right">
                            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
                              {pool.category === 'qcommerce' ? 'MIN ADD' : 'PER PERSON'}
                            </span>
                            <div className="text-lg font-extrabold text-white">
                              ₹{pool.agreedContribution}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {!pool.joined ? (
                          <div className="grid grid-cols-3 gap-2">
                            <button
                              onClick={() => openEditRequirementsModal(pool)}
                              className="py-2.5 px-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 text-[11px] font-bold uppercase flex items-center justify-center gap-1 transition"
                              title="Pool Poster: Edit Requirements & Price Anytime"
                            >
                              <SlidersHorizontal className="w-3.5 h-3.5" />
                              <span>EDIT REQ.</span>
                            </button>
                            <button
                              onClick={() => openJoinOrNegotiate(pool, 'negotiate')}
                              className="py-2.5 px-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-[11px] font-bold uppercase transition"
                            >
                              NEGOTIATE
                            </button>
                            <button
                              onClick={() => openJoinOrNegotiate(pool, 'instant')}
                              className="py-2.5 px-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-[11px] font-bold uppercase transition"
                            >
                              BOOK SPOT
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <button
                                onClick={() => {
                                  setActiveChatPoolId(pool.id);
                                  setInVoiceCall(false);
                                }}
                                className="py-2.5 px-2.5 rounded-xl bg-white text-black text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-zinc-200 transition"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>CHAT</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveChatPoolId(pool.id);
                                  setInVoiceCall(true);
                                }}
                                className="py-2.5 px-2.5 rounded-xl bg-white/[0.12] text-white text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-white/[0.2] transition"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>CALL</span>
                              </button>
                              <button
                                onClick={() => openEditRequirementsModal(pool)}
                                className="py-2.5 px-2.5 rounded-xl bg-white/[0.06] text-zinc-200 text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 hover:bg-white/[0.12] transition"
                              >
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                <span>EDIT REQ.</span>
                              </button>
                              <button
                                onClick={() => {
                                  setRatingPool(pool);
                                  setSelectedStars(5);
                                }}
                                disabled={pool.rated}
                                className={`py-2.5 px-2.5 rounded-xl text-[11px] font-bold uppercase flex items-center justify-center gap-1 transition ${
                                  pool.rated
                                    ? 'bg-white/[0.04] text-zinc-600 cursor-not-allowed'
                                    : 'bg-white/[0.1] text-white hover:bg-white/[0.18]'
                                }`}
                              >
                                <Star className="w-3.5 h-3.5" />
                                <span>{pool.rated ? 'RATED' : 'RATE PEER'}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =========================================================
          MODAL 1: NEGOTIATE OR BOOK SPOT
         ========================================================= */}
      {negotiatingPool && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {negotiationMode === 'negotiate' ? 'PROPOSE CUSTOM SPLIT' : 'CONFIRM POOL BOOKING'}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Pool with {negotiatingPool.hostName}
                </h3>
              </div>
              <button
                onClick={() => setNegotiatingPool(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={confirmBookingOrNegotiation} className="space-y-4">
              <div className="rounded-xl bg-white/[0.04] p-3.5 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Service / App:</span>
                  <span className="font-bold text-white">{negotiatingPool.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Standard Split / Share:</span>
                  <span className="font-bold text-white">₹{negotiatingPool.expectedPerPerson}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                  {negotiatingPool.category === 'qcommerce'
                    ? 'Your Item Cart Value (₹) — Even ₹20–₹30 Works!'
                    : 'Your Proposed Share / Split Price (₹)'}
                </label>
                <input
                  type="number"
                  min="10"
                  required
                  value={negotiationOffer}
                  onChange={(e) => setNegotiationOffer(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black text-white font-bold text-sm focus:outline-none"
                />
                {negotiatingPool.category === 'qcommerce' && (
                  <div className="flex gap-2 mt-2">
                    {[20, 30, 50, 80].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setNegotiationOffer(String(amt))}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] text-xs font-bold text-white"
                      >
                        ₹{amt} Item
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1.5">
                  Quick Note (Items to add / Drop point / Offer reason)
                </label>
                <input
                  type="text"
                  value={negotiationNote}
                  onChange={(e) => setNegotiationNote(e.target.value)}
                  placeholder="e.g., Getting off 2 km earlier / Adding ₹25 chips..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setNegotiatingPool(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.08] text-xs font-bold uppercase text-zinc-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase transition"
                >
                  CONFIRM ₹{negotiationOffer || negotiatingPool.expectedPerPerson}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 2: POSTER EDIT POOL REQUIREMENTS
         ========================================================= */}
      {editingPool && editPoolDraft && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  POSTER CONTROLS • EDIT ANYTIME
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Edit Pool Requirements
                </h3>
              </div>
              <button
                onClick={() => {
                  setEditingPool(null);
                  setEditPoolDraft(null);
                }}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePoolRequirements} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                    Agreed Split / Share (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={editPoolDraft.expectedPerPerson}
                    onChange={(e) =>
                      setEditPoolDraft({ ...editPoolDraft, expectedPerPerson: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black text-sm font-bold text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                    Time Window
                  </label>
                  <input
                    type="text"
                    required
                    value={editPoolDraft.timeWindow}
                    onChange={(e) =>
                      setEditPoolDraft({ ...editPoolDraft, timeWindow: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                    Filled Spots
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editPoolDraft.spotsFilled}
                    onChange={(e) =>
                      setEditPoolDraft({ ...editPoolDraft, spotsFilled: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                    Total Spots Needed
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editPoolDraft.spotsTotal}
                    onChange={(e) =>
                      setEditPoolDraft({ ...editPoolDraft, spotsTotal: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-300 mb-1">
                  Updated Requirements / Notes
                </label>
                <textarea
                  rows={2}
                  value={editPoolDraft.notes}
                  onChange={(e) =>
                    setEditPoolDraft({ ...editPoolDraft, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingPool(null);
                    setEditPoolDraft(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.08] text-xs font-bold uppercase text-zinc-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase"
                >
                  UPDATE REQUIREMENTS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 3: DIRECT CHAT & VOICE CALL ROOM
         ========================================================= */}
      {activeChatPool && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-lg w-full h-[88vh] sm:h-[580px] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 bg-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black font-bold text-xs flex items-center justify-center">
                  {activeChatPool.hostAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white">{activeChatPool.hostName}</h4>
                    <VerifiedTick className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    {activeChatPool.platform} • Agreed: ₹{activeChatPool.agreedContribution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditRequirementsModal(activeChatPool)}
                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase bg-white/[0.08] text-white hover:bg-white/[0.15]"
                >
                  EDIT REQ.
                </button>
                <button
                  onClick={() => setInVoiceCall(!inVoiceCall)}
                  className={`p-2 rounded-lg transition ${
                    inVoiceCall
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  {inVoiceCall ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setActiveChatPoolId(null);
                    setInVoiceCall(false);
                  }}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {inVoiceCall && (
              <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      Voice Call Connected ({formatCallTime(callSeconds)})
                    </p>
                    <p className="text-[11px] text-zinc-400">{activeChatPool.hostPhone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-lg bg-white/10 text-white text-xs"
                  >
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setInVoiceCall(false)}
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold uppercase"
                  >
                    END
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black">
              {(chatMessages[activeChatPool.id] || []).map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-zinc-500 mb-1 px-1">
                    {msg.sender} • {msg.time}
                  </span>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-editorial-sans leading-relaxed ${
                      msg.isSelf
                        ? 'bg-white text-black font-medium rounded-br-none'
                        : 'bg-white/[0.08] text-white rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-zinc-950 flex items-center gap-2"
            >
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Coordinate pickup, items, or UPI split..."
                className="flex-1 px-4 py-2.5 rounded-full bg-black text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-white hover:bg-zinc-200 text-black transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 4: MUTUAL TRUST RATING
         ========================================================= */}
      {ratingPool && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-white" />
                <div>
                  <h3 className="text-base font-bold text-white">Rate Your Pooling Experience</h3>
                  <p className="text-xs text-zinc-400">
                    Mutual rating with {ratingPool.hostName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRatingPool(null)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitRating} className="space-y-4">
              <div className="flex flex-col items-center py-3 bg-black rounded-xl">
                <span className="text-[11px] text-zinc-400 mb-2 uppercase">
                  How trustworthy & punctual was {ratingPool.hostName}?
                </span>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setSelectedStars(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= selectedStars
                            ? 'fill-white text-white'
                            : 'text-zinc-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-2">
                  Endorsements
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'On-Time',
                    'Smooth UPI Split',
                    'Friendly Peer',
                    'Fast Order',
                    'Great Teammate'
                  ].map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() =>
                          setSelectedTags((prev) =>
                            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                          )
                        }
                        className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                          active
                            ? 'bg-white text-black'
                            : 'bg-white/[0.08] text-zinc-400'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase transition"
              >
                SUBMIT {selectedStars}★ RATING
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 5: POST A NEW POOL
         ========================================================= */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  CREATE CAMPUS POOL
                </span>
                <h3 className="text-lg font-bold text-white">Post a New Pool Request</h3>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePool} className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setNewPost({ ...newPost, category: cat.id })}
                    className={`py-2 px-2 rounded-xl text-xs font-bold uppercase transition ${
                      newPost.category === cat.id
                        ? 'bg-white text-black'
                        : 'bg-white/[0.06] text-zinc-400'
                    }`}
                  >
                    {cat.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                    App / Service
                  </label>
                  <input
                    type="text"
                    required
                    value={newPost.platform}
                    onChange={(e) => setNewPost({ ...newPost, platform: e.target.value })}
                    placeholder="e.g., Uber, Blinkit, Zomato"
                    className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                    Time Frame
                  </label>
                  <input
                    type="text"
                    required
                    value={newPost.timeWindow}
                    onChange={(e) => setNewPost({ ...newPost, timeWindow: e.target.value })}
                    placeholder="e.g., Today 6:00 PM / In 15 mins"
                    className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                    Max People
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="22"
                    value={newPost.spotsTotal}
                    onChange={(e) => setNewPost({ ...newPost, spotsTotal: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                    Expected Per Person (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPost.expectedPerPerson}
                    onChange={(e) => setNewPost({ ...newPost, expectedPerPerson: e.target.value })}
                    placeholder="e.g., 150"
                    className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Route / Drop Point / Notes
                </label>
                <input
                  type="text"
                  value={newPost.notes}
                  onChange={(e) => setNewPost({ ...newPost, notes: e.target.value })}
                  placeholder="Share pickup point, minimum order details, or rules..."
                  className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPostModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.08] text-xs font-bold uppercase text-zinc-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase"
                >
                  PUBLISH LIVE POOL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 6: EDIT PROFILE & BIO
         ========================================================= */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Edit Campus Profile</h3>
                <VerifiedTick className="w-4 h-4" />
              </div>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setUserProfile(profileDraft);
                setIsEditProfileOpen(false);
                showToast('Campus profile & bio updated!');
              }}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileDraft.name}
                    onChange={(e) => setProfileDraft({ ...profileDraft, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                    Where Are You From?
                  </label>
                  <input
                    type="text"
                    required
                    value={profileDraft.hometown}
                    onChange={(e) => setProfileDraft({ ...profileDraft, hometown: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Department & Year
                </label>
                <input
                  type="text"
                  required
                  value={profileDraft.department}
                  onChange={(e) => setProfileDraft({ ...profileDraft, department: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Short Fun Notes / Bio
                </label>
                <textarea
                  rows={2}
                  value={profileDraft.bio}
                  onChange={(e) => setProfileDraft({ ...profileDraft, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Interests
                </label>
                <input
                  type="text"
                  value={profileDraft.interests}
                  onChange={(e) => setProfileDraft({ ...profileDraft, interests: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.08] text-xs font-bold uppercase text-zinc-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase"
                >
                  SAVE BIO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL 7: UNIVERSITY SIGN IN
         ========================================================= */}
      {isSignInModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-zinc-950 rounded-t-3xl sm:rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Sign In to Campus Connect</h3>
                <VerifiedTick className="w-4 h-4" />
              </div>
              <button
                onClick={() => setIsSignInModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const initials = signInForm.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2);
                setUserProfile((prev) => ({
                  ...prev,
                  name: signInForm.name,
                  avatar: initials || 'ST',
                  email: signInForm.email,
                  department: signInForm.department,
                  hometown: signInForm.hometown
                }));
                setIsSignedIn(true);
                setIsSignInModalOpen(false);
                showToast('Signed in & verified with university email!');
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={signInForm.name}
                  onChange={(e) => setSignInForm({ ...signInForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-300 mb-1">
                  University Email (.edu / .ac.in)
                </label>
                <input
                  type="email"
                  required
                  value={signInForm.email}
                  onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black text-xs text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase"
              >
                SIGN IN & VERIFY
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-30 bg-black/95 backdrop-blur-xl px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] flex items-center justify-around border-t border-zinc-800/80 shadow-2xl transition-all duration-700 ease-out ${
          currentView !== 'landing' || isHeroAnimationDone
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      >
        <button
          onClick={() => setCurrentView('landing')}
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold uppercase ${
            currentView === 'landing' ? 'text-white' : 'text-zinc-500'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5" />
          <span>HUB</span>
        </button>
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = currentView === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCurrentView(cat.id)}
              className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold uppercase ${
                active ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{cat.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}