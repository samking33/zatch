import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import * as THREE from "three";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawAvatar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, initials: string) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = `bold ${size * 0.4}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, x + size / 2, y + size / 2 + 1);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function createWhatsAppTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0b141a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();

  ctx.fillStyle = "#1f2c33";
  ctx.fillRect(0, 0, 256, 44);
  roundRect(ctx, 0, 0, 256, 44, 16);
  ctx.fill();
  ctx.fillStyle = "#1f2c33";
  ctx.fillRect(0, 16, 256, 28);
  ctx.fill();

  drawAvatar(ctx, 40, 8, 28, "#5b8a72", "PS");
  ctx.fillStyle = "#e9edef";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("Priya Sharma", 76, 24);
  ctx.fillStyle = "#8696a0";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("last seen today at 2:14 PM", 76, 38);

  ctx.fillStyle = "#0b141a";
  ctx.fillRect(0, 44, 256, 340);

  const msgs = [
    { in: true, text: "Hi, is this saree available?", time: "2:14 PM" },
    { in: false, text: "Yes! ₹1,200 with free shipping", time: "2:45 PM" },
    { in: true, text: "Last price please? 🙏", time: "2:46 PM" },
    { in: false, text: "₹1,100 final ma'am", time: "3:10 PM" },
    { in: true, text: "₹800 possible? I'll buy 2", time: "3:11 PM" },
    { in: false, text: "No ma'am, minimum ₹1,000 😅", time: "3:30 PM" },
    { in: true, text: "Ok let me think... will get back", time: "3:31 PM" },
    { in: false, text: "Hello? Still interested? 😊", time: "5:15 PM" },
  ];

  let y = 58;
  for (const msg of msgs) {
    const bgColor = msg.in ? "#202c33" : "#005c4b";
    const maxW = 170;
    const pad = 8;

    ctx.font = "10px Inter, system-ui, sans-serif";
    const words = msg.text.split(" ");
    let lines: string[] = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const test = currentLine + " " + words[i];
      if (ctx.measureText(test).width > maxW - pad * 2) {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = test;
      }
    }
    lines.push(currentLine);

    const lineH = 14;
    const bubbleH = lines.length * lineH + pad * 2 + 8;
    const bubbleW = Math.min(maxW, Math.max(...lines.map(l => ctx.measureText(l).width)) + pad * 2 + 10);

    const bx = msg.in ? 12 : 256 - bubbleW - 12;

    ctx.fillStyle = bgColor;
    roundRect(ctx, bx, y, bubbleW, bubbleH, 8);
    ctx.fill();

    ctx.fillStyle = "#e9edef";
    ctx.font = "10px Inter, system-ui, sans-serif";
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], bx + pad, y + pad + 10 + i * lineH);
    }

    ctx.fillStyle = "#ffffff60";
    ctx.font = "7px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(msg.time, bx + bubbleW - pad, y + bubbleH - 4);
    if (!msg.in) {
      ctx.fillText("✓✓", bx + bubbleW - pad - ctx.measureText(msg.time).width - 6, y + bubbleH - 4);
    }
    ctx.textAlign = "left";

    y += bubbleH + 4;
  }

  ctx.fillStyle = "#ffffff10";
  ctx.fillRect(0, 352, 256, 32);
  roundRect(ctx, 8, 358, 200, 20, 10);
  ctx.fillStyle = "#2a3942";
  ctx.fill();
  ctx.fillStyle = "#ffffff30";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("Type a message...", 18, 372);

  return c;
}

function createInstagramDMTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#000000";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();

  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 0, 256, 44);
  roundRect(ctx, 0, 0, 256, 44, 16);
  ctx.fill();
  ctx.fillStyle = "#121212";
  ctx.fillRect(0, 16, 256, 28);
  ctx.fill();

  drawAvatar(ctx, 12, 8, 28, "#c13584", "SK");
  ctx.fillStyle = "#fafafa";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("sneha_kurti_store", 48, 24);
  ctx.fillStyle = "#8e8e8e";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("Active 2h ago", 48, 38);

  const dms = [
    { in: true, text: "Hii! Price of this kurti?" },
    { in: false, text: "₹599 only! DM for order" },
    { in: true, text: "COD available?" },
    { in: false, text: "Yes ma'am, DM your address" },
    { in: true, text: "What sizes do you have?" },
    { in: false, text: "S M L XL, all in stock" },
    { in: true, text: "Ok booking, sending address" },
    { in: true, text: "Actually nvm, found cheaper" },
  ];

  let y = 58;
  for (const msg of dms) {
    const maxW = 165;
    const pad = 8;

    ctx.font = "10px Inter, system-ui, sans-serif";
    const words = msg.text.split(" ");
    let lines: string[] = [];
    let line = words[0];
    for (let i = 1; i < words.length; i++) {
      const test = line + " " + words[i];
      if (ctx.measureText(test).width > maxW - pad * 2) {
        lines.push(line);
        line = words[i];
      } else {
        line = test;
      }
    }
    lines.push(line);

    const lineH = 14;
    const bH = lines.length * lineH + pad * 2;
    const bW = Math.min(maxW, Math.max(...lines.map(l => ctx.measureText(l).width)) + pad * 2 + 6);

    const bx = msg.in ? 12 : 256 - bW - 12;
    ctx.fillStyle = msg.in ? "#262626" : "#3797f0";
    roundRect(ctx, bx, y, bW, bH, 16);
    ctx.fill();

    ctx.fillStyle = "#fafafa";
    ctx.font = "10px Inter, system-ui, sans-serif";
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], bx + pad, y + pad + 10 + i * lineH);
    }

    y += bH + 4;
  }

  return c;
}

function createUnreadNotificationsTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0b141a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();

  ctx.fillStyle = "#1f2c33";
  roundRect(ctx, 0, 0, 256, 40, 16);
  ctx.fill();
  ctx.fillStyle = "#1f2c33";
  ctx.fillRect(0, 16, 256, 24);
  ctx.fill();

  ctx.fillStyle = "#00a884";
  ctx.font = "bold 10px Inter, system-ui, sans-serif";
  ctx.fillText("UNREAD CHATS", 14, 26);
  ctx.fillStyle = "#ff4444";
  ctx.font = "bold 9px Inter, system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("47 pending", 242, 26);
  ctx.textAlign = "left";

  const chats = [
    { name: "Rahul K.", msg: "What's the price for blue one?", time: "12m", count: 3, color: "#4a90d9" },
    { name: "Sneha D.", msg: "Payment sent where? UPI?", time: "25m", count: 1, color: "#d94a8c" },
    { name: "Vikram P.", msg: "Still available??? Hello??", time: "1h", count: 7, color: "#d9a04a" },
    { name: "Meera S.", msg: "Can you ship to Mumbai?", time: "2h", count: 2, color: "#4ad99a" },
    { name: "Arjun R.", msg: "Last price? I'll buy now", time: "3h", count: 1, color: "#9a4ad9" },
    { name: "Pooja T.", msg: "Do you have in XL size?", time: "4h", count: 4, color: "#d94a4a" },
    { name: "Kiran M.", msg: "Sent payment screenshot", time: "5h", count: 2, color: "#4ad9d9" },
  ];

  let y = 50;
  for (const chat of chats) {
    ctx.fillStyle = "#111b2180";
    roundRect(ctx, 8, y, 240, 42, 8);
    ctx.fill();

    drawAvatar(ctx, 14, y + 6, 30, chat.color, chat.name.substring(0, 2).toUpperCase());

    ctx.fillStyle = "#e9edef";
    ctx.font = "bold 10px Inter, system-ui, sans-serif";
    ctx.fillText(chat.name, 50, y + 18);

    ctx.fillStyle = "#8696a0";
    ctx.font = "9px Inter, system-ui, sans-serif";
    ctx.fillText(chat.msg.substring(0, 28), 50, y + 32);

    ctx.fillStyle = "#8696a080";
    ctx.font = "8px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(chat.time, 240, y + 16);

    ctx.fillStyle = "#25D366";
    ctx.beginPath();
    ctx.arc(236, y + 30, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 8px Inter, system-ui, sans-serif";
    ctx.fillText(String(chat.count), 236 - ctx.measureText(String(chat.count)).width / 2, y + 33);
    ctx.textAlign = "left";

    y += 46;
  }

  ctx.fillStyle = "#ff444440";
  ctx.font = "italic 8px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("+ 42 more unread conversations...", 128, y + 10);
  ctx.textAlign = "left";

  return c;
}

function createDealNegotiationTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0a0f0a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();

  ctx.strokeStyle = "#cafe3825";
  ctx.lineWidth = 1;
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.stroke();

  ctx.fillStyle = "#cafe3890";
  ctx.font = "bold 10px Inter, system-ui, sans-serif";
  ctx.fillText("AUTO-NEGOTIATION", 16, 30);

  ctx.fillStyle = "#ffffff15";
  roundRect(ctx, 170, 16, 70, 22, 11);
  ctx.fill();
  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 9px Inter, system-ui, sans-serif";
  ctx.fillText("Active", 190, 31);

  ctx.fillStyle = "#cafe3810";
  roundRect(ctx, 16, 50, 224, 60, 10);
  ctx.fill();
  ctx.strokeStyle = "#cafe3830";
  roundRect(ctx, 16, 50, 224, 60, 10);
  ctx.stroke();

  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 20px Space Grotesk, system-ui, sans-serif";
  ctx.fillText("Silk Saree", 28, 78);
  ctx.fillStyle = "#ffffff60";
  ctx.font = "10px Inter, system-ui, sans-serif";
  ctx.fillText("Listed at ₹1,200", 28, 98);

  const steps = [
    { label: "Buyer offered", amount: "₹750", color: "#ffffff80", icon: "B" },
    { label: "Zatch™ countered", amount: "₹899", color: "#cafe38", icon: "Z" },
    { label: "Buyer raised to", amount: "₹820", color: "#ffffff80", icon: "B" },
    { label: "Zatch™ final", amount: "₹870", color: "#cafe38", icon: "Z" },
  ];

  let y = 130;
  for (const step of steps) {
    ctx.fillStyle = "#ffffff08";
    roundRect(ctx, 16, y, 224, 36, 8);
    ctx.fill();

    drawAvatar(ctx, 24, y + 6, 24, step.icon === "Z" ? "#cafe38" : "#4a90d9", step.icon);

    ctx.fillStyle = step.color;
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(step.label, 56, y + 22);

    ctx.fillStyle = step.color;
    ctx.font = "bold 12px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(step.amount, 230, y + 24);
    ctx.textAlign = "left";

    y += 42;
  }

  ctx.fillStyle = "#cafe3815";
  roundRect(ctx, 16, y + 8, 224, 44, 10);
  ctx.fill();
  ctx.strokeStyle = "#cafe3840";
  roundRect(ctx, 16, y + 8, 224, 44, 10);
  ctx.stroke();

  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("✓  Deal Closed", 28, y + 30);
  ctx.font = "bold 16px Inter, system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("₹850", 230, y + 38);
  ctx.textAlign = "left";

  return c;
}

function createPaymentTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0a0f0a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();
  ctx.strokeStyle = "#cafe3825";
  ctx.lineWidth = 1;
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.stroke();

  ctx.fillStyle = "#cafe3890";
  ctx.font = "bold 10px Inter, system-ui, sans-serif";
  ctx.fillText("PAYMENTS", 16, 30);

  ctx.fillStyle = "#cafe3820";
  roundRect(ctx, 140, 14, 100, 22, 11);
  ctx.fill();
  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 8px Inter, system-ui, sans-serif";
  ctx.fillText("🔒 Secure", 160, 29);

  ctx.fillStyle = "#cafe3808";
  roundRect(ctx, 16, 48, 224, 70, 12);
  ctx.fill();

  ctx.fillStyle = "#ffffff40";
  ctx.font = "10px Inter, system-ui, sans-serif";
  ctx.fillText("Today's Revenue", 28, 70);
  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 28px Space Grotesk, system-ui, sans-serif";
  ctx.fillText("₹24,500", 28, 104);

  const payments = [
    { name: "Priya M.", amount: "₹2,400", time: "2m ago", color: "#5b8a72" },
    { name: "Rahul K.", amount: "₹4,500", time: "5m ago", color: "#4a90d9" },
    { name: "Sneha D.", amount: "₹1,200", time: "8m ago", color: "#d94a8c" },
    { name: "Vikram P.", amount: "₹3,800", time: "12m ago", color: "#d9a04a" },
    { name: "Meera S.", amount: "₹6,100", time: "15m ago", color: "#4ad99a" },
    { name: "Arjun R.", amount: "₹6,500", time: "20m ago", color: "#9a4ad9" },
  ];

  let y = 134;
  for (const p of payments) {
    ctx.fillStyle = "#ffffff06";
    roundRect(ctx, 16, y, 224, 36, 8);
    ctx.fill();

    drawAvatar(ctx, 22, y + 5, 26, p.color, p.name.substring(0, 2).toUpperCase());

    ctx.fillStyle = "#ffffff70";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(p.name, 54, y + 22);

    ctx.fillStyle = "#cafe38";
    ctx.font = "bold 11px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(p.amount, 200, y + 18);
    ctx.fillStyle = "#ffffff30";
    ctx.font = "8px Inter, system-ui, sans-serif";
    ctx.fillText(p.time, 200, y + 30);
    ctx.textAlign = "left";

    y += 40;
  }

  return c;
}

function createLiveStreamTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  const grad = ctx.createLinearGradient(0, 0, 256, 384);
  grad.addColorStop(0, "#0a1a0f");
  grad.addColorStop(1, "#050d08");
  ctx.fillStyle = grad;
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();
  ctx.strokeStyle = "#cafe3825";
  ctx.lineWidth = 1;
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.stroke();

  ctx.fillStyle = "#1a2a1f";
  roundRect(ctx, 10, 10, 236, 180, 12);
  ctx.fill();

  for (let i = 0; i < 20; i++) {
    ctx.fillStyle = `rgba(202,254,56,${Math.random() * 0.05})`;
    ctx.fillRect(
      10 + Math.random() * 220,
      10 + Math.random() * 170,
      Math.random() * 30 + 5,
      Math.random() * 30 + 5
    );
  }

  ctx.fillStyle = "#ff0000cc";
  roundRect(ctx, 18, 18, 42, 18, 9);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(28, 27, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "bold 9px Inter, system-ui, sans-serif";
  ctx.fillText("LIVE", 34, 31);

  ctx.fillStyle = "#00000090";
  roundRect(ctx, 190, 18, 50, 18, 9);
  ctx.fill();
  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 9px Inter, system-ui, sans-serif";
  ctx.fillText("👁 342", 197, 31);

  const chats = [
    { name: "M", text: "Beautiful collection! 😍", color: "#4ad99a" },
    { name: "R", text: "Can I Zatch the red one? 🔴", color: "#4a90d9" },
    { name: "S", text: "Price for green saree?", color: "#d94a8c" },
  ];
  let cy = 155;
  for (const chat of chats) {
    ctx.fillStyle = "#00000060";
    roundRect(ctx, 16, cy, 180, 22, 11);
    ctx.fill();
    drawAvatar(ctx, 20, cy + 3, 16, chat.color, chat.name);
    ctx.fillStyle = "#ffffffcc";
    ctx.font = "8px Inter, system-ui, sans-serif";
    ctx.fillText(chat.text, 40, cy + 16);
    cy += 24;
  }

  ctx.fillStyle = "#e9edef";
  ctx.font = "bold 12px Inter, system-ui, sans-serif";
  ctx.fillText("Silk Sarees Collection", 16, 220);
  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("Starting ₹899", 16, 238);
  ctx.fillStyle = "#ffffff40";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("Live now · 12 items listed", 16, 254);

  ctx.fillStyle = "#ffffff08";
  roundRect(ctx, 10, 268, 236, 1, 0);
  ctx.fill();

  const items = [
    { name: "Banarasi Red", price: "₹1,200", status: "3 watching" },
    { name: "Cotton Blue", price: "₹899", status: "5 bids" },
    { name: "Silk Green", price: "₹1,500", status: "Sold!" },
    { name: "Chiffon Pink", price: "₹750", status: "2 watching" },
  ];

  let iy = 278;
  for (const item of items) {
    ctx.fillStyle = "#ffffff06";
    roundRect(ctx, 14, iy, 228, 24, 6);
    ctx.fill();
    ctx.fillStyle = "#ffffffa0";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(item.name, 22, iy + 16);
    ctx.fillStyle = "#cafe38";
    ctx.font = "bold 10px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(item.price, 180, iy + 16);
    ctx.fillStyle = item.status === "Sold!" ? "#cafe38" : "#ffffff40";
    ctx.font = "8px Inter, system-ui, sans-serif";
    ctx.fillText(item.status, 236, iy + 16);
    ctx.textAlign = "left";
    iy += 28;
  }

  return c;
}

function createSellerDashboardTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0a0f0a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();
  ctx.strokeStyle = "#cafe3825";
  ctx.lineWidth = 1;
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.stroke();

  ctx.fillStyle = "#cafe3890";
  ctx.font = "bold 10px Inter, system-ui, sans-serif";
  ctx.fillText("SELLER DASHBOARD", 16, 28);
  ctx.fillStyle = "#ffffff30";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("Feb 2026", 180, 28);

  const stats = [
    { label: "Total Sales", value: "₹1,24,500", change: "+23%" },
    { label: "Orders", value: "87", change: "+15%" },
    { label: "Live Viewers", value: "1.2K", change: "+45%" },
    { label: "Conversion", value: "34%", change: "+8%" },
  ];

  let sx = 16;
  let sy = 44;
  for (let i = 0; i < stats.length; i++) {
    const w = 108;
    const x = sx + (i % 2) * 114;
    const y = sy + Math.floor(i / 2) * 70;

    ctx.fillStyle = "#ffffff08";
    roundRect(ctx, x, y, w, 60, 8);
    ctx.fill();

    ctx.fillStyle = "#ffffff40";
    ctx.font = "9px Inter, system-ui, sans-serif";
    ctx.fillText(stats[i].label, x + 10, y + 18);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px Space Grotesk, system-ui, sans-serif";
    ctx.fillText(stats[i].value, x + 10, y + 40);

    ctx.fillStyle = "#cafe38";
    ctx.font = "bold 9px Inter, system-ui, sans-serif";
    ctx.fillText(stats[i].change, x + 10, y + 54);
  }

  ctx.fillStyle = "#ffffff08";
  roundRect(ctx, 16, 192, 224, 80, 8);
  ctx.fill();
  ctx.fillStyle = "#ffffff40";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("Revenue Trend", 26, 210);

  const points = [20, 35, 28, 45, 40, 55, 50, 60, 52, 65, 58];
  ctx.strokeStyle = "#cafe38";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    const px = 26 + i * 19;
    const py = 260 - points[i];
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  ctx.fillStyle = "#ffffff10";
  ctx.font = "bold 10px Inter, system-ui, sans-serif";
  ctx.fillText("TOP PRODUCTS", 16, 296);

  const products = [
    { name: "Silk Saree Red", sold: "23 sold", rev: "₹27,600" },
    { name: "Cotton Kurti Set", sold: "18 sold", rev: "₹16,200" },
    { name: "Palazzo Pants", sold: "15 sold", rev: "₹11,250" },
  ];

  let py = 306;
  for (const p of products) {
    ctx.fillStyle = "#ffffff06";
    roundRect(ctx, 16, py, 224, 24, 6);
    ctx.fill();
    ctx.fillStyle = "#ffffffa0";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(p.name, 24, py + 16);
    ctx.fillStyle = "#ffffff40";
    ctx.font = "8px Inter, system-ui, sans-serif";
    ctx.fillText(p.sold, 140, py + 16);
    ctx.fillStyle = "#cafe38";
    ctx.font = "bold 10px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(p.rev, 234, py + 16);
    ctx.textAlign = "left";
    py += 28;
  }

  return c;
}

function createOrderTrackingTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#0a0f0a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();
  ctx.strokeStyle = "#cafe3825";
  ctx.lineWidth = 1;
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.stroke();

  ctx.fillStyle = "#cafe3890";
  ctx.font = "bold 10px Inter, system-ui, sans-serif";
  ctx.fillText("ORDER TRACKING", 16, 28);

  ctx.fillStyle = "#ffffff15";
  roundRect(ctx, 160, 14, 80, 22, 11);
  ctx.fill();
  ctx.fillStyle = "#cafe38";
  ctx.font = "bold 8px Inter, system-ui, sans-serif";
  ctx.fillText("4 Active", 180, 29);

  const orders = [
    {
      id: "#ZT-2847",
      buyer: "Priya M.",
      item: "Silk Saree - Maroon",
      amount: "₹1,200",
      status: "Shipped",
      statusColor: "#4a90d9",
    },
    {
      id: "#ZT-2846",
      buyer: "Rahul K.",
      item: "Cotton Kurta Set",
      amount: "₹899",
      status: "Packed",
      statusColor: "#d9a04a",
    },
    {
      id: "#ZT-2845",
      buyer: "Sneha D.",
      item: "Palazzo Pants Blue",
      amount: "₹650",
      status: "Delivered",
      statusColor: "#cafe38",
    },
    {
      id: "#ZT-2844",
      buyer: "Meera S.",
      item: "Jhumka Earrings Gold",
      amount: "₹450",
      status: "Processing",
      statusColor: "#d94a8c",
    },
  ];

  let y = 48;
  for (const order of orders) {
    ctx.fillStyle = "#ffffff06";
    roundRect(ctx, 12, y, 232, 76, 10);
    ctx.fill();

    ctx.fillStyle = "#ffffff30";
    ctx.font = "8px Inter, system-ui, sans-serif";
    ctx.fillText(order.id, 20, y + 16);

    ctx.fillStyle = order.statusColor;
    roundRect(ctx, 180, y + 6, 56, 16, 8);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.font = "bold 7px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(order.status, 208, y + 17);
    ctx.textAlign = "left";

    ctx.fillStyle = "#ffffffc0";
    ctx.font = "bold 10px Inter, system-ui, sans-serif";
    ctx.fillText(order.item, 20, y + 34);

    ctx.fillStyle = "#ffffff60";
    ctx.font = "9px Inter, system-ui, sans-serif";
    ctx.fillText("Buyer: " + order.buyer, 20, y + 50);

    ctx.fillStyle = "#cafe38";
    ctx.font = "bold 12px Inter, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(order.amount, 232, y + 50);
    ctx.textAlign = "left";

    if (order.status === "Shipped" || order.status === "Delivered") {
      const steps = ["Confirmed", "Packed", "Shipped", "Delivered"];
      const activeIdx = order.status === "Shipped" ? 2 : 3;
      const stepW = 48;
      for (let i = 0; i < steps.length; i++) {
        const cx = 28 + i * stepW;
        ctx.fillStyle = i <= activeIdx ? "#cafe38" : "#ffffff20";
        ctx.beginPath();
        ctx.arc(cx, y + 66, 3, 0, Math.PI * 2);
        ctx.fill();
        if (i < steps.length - 1) {
          ctx.strokeStyle = i < activeIdx ? "#cafe38" : "#ffffff20";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx + 4, y + 66);
          ctx.lineTo(cx + stepW - 4, y + 66);
          ctx.stroke();
        }
      }
    }

    y += 82;
  }

  return c;
}

interface CardData {
  chaosPos: THREE.Vector3;
  chaosRot: THREE.Euler;
  gridPos: THREE.Vector3;
  driftSpeed: number;
  driftPhase: number;
  driftAmplitude: THREE.Vector3;
  mesh: THREE.Mesh;
}

function createCardData(
  textureCreators: (() => HTMLCanvasElement)[],
  count: number,
  cols: number
): CardData[] {
  const cards: CardData[] = [];
  const rows = Math.ceil(count / cols);
  const spacingX = 2.2;
  const spacingY = 3.0;
  const offsetX = ((cols - 1) * spacingX) / 2;
  const offsetY = ((rows - 1) * spacingY) / 2;

  for (let i = 0; i < count; i++) {
    const texIdx = i % textureCreators.length;
    const canvas = textureCreators[texIdx]();
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const geo = new THREE.PlaneGeometry(1.8, 2.7);
    const mat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7 + Math.random() * 0.3,
      color: new THREE.Color(0.8, 0.4, 0.4),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);

    const col = i % cols;
    const row = Math.floor(i / cols);

    cards.push({
      chaosPos: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ),
      chaosRot: new THREE.Euler(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
      ),
      gridPos: new THREE.Vector3(
        col * spacingX - offsetX,
        -(row * spacingY - offsetY),
        0
      ),
      driftSpeed: 0.3 + Math.random() * 0.7,
      driftPhase: Math.random() * Math.PI * 2,
      driftAmplitude: new THREE.Vector3(
        0.3 + Math.random() * 0.5,
        0.2 + Math.random() * 0.4,
        0.1 + Math.random() * 0.2
      ),
      mesh,
    });
  }

  return cards;
}

function MobileView({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
  return (
    <section id="sellers" className="py-16 bg-[#030303] relative overflow-hidden">
      <div className="container mx-auto px-5 max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-px bg-[#cafe38]" />
          <span className="text-[11px] font-bold text-[#cafe38] tracking-[0.4em] uppercase" data-testid="text-sellers-tag">For Sellers</span>
        </div>

        <h3 className="text-3xl font-bold font-display tracking-tight leading-[0.95] mb-8" data-testid="text-sellers-heading">
          <span className="text-white">Your DMs Are Not a </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cafe38] to-[#cafe38]/50">Sales System.</span>
        </h3>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-red-500/20 bg-gradient-to-br from-[#1a0808] to-[#0f0505] p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-xs">✕</span>
              </div>
              <span className="text-xs font-bold text-red-400/80">Old Way</span>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-red-500/10 rounded-full w-full" />
              <div className="h-3 bg-red-500/10 rounded-full w-3/4" />
              <div className="h-3 bg-red-500/10 rounded-full w-5/6" />
              <div className="h-3 bg-red-500/10 rounded-full w-2/3" />
            </div>
            <p className="text-[9px] text-red-400/50 mt-3">Manual DMs · Lost deals · No tracking</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-[#cafe38]/20 bg-gradient-to-br from-[#0a1a0f] to-[#050d08] p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-[#cafe38]/10 border border-[#cafe38]/20 flex items-center justify-center">
                <span className="text-[#cafe38] text-xs">⚡</span>
              </div>
              <span className="text-xs font-bold text-[#cafe38]/90">Zatch Way</span>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-[#cafe38]/15 rounded-full w-full" />
              <div className="h-3 bg-[#cafe38]/15 rounded-full w-3/4" />
              <div className="h-3 bg-[#cafe38]/15 rounded-full w-5/6" />
              <div className="h-3 bg-[#cafe38]/15 rounded-full w-2/3" />
            </div>
            <p className="text-[9px] text-[#cafe38]/50 mt-3">Automated · Live · Closed deals</p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onJoinWaitlist}
            className="w-full py-3 rounded-xl bg-[#cafe38] text-black font-bold text-sm"
            data-testid="button-start-selling-mobile"
          >
            Start Selling
          </button>
          <a
            href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-[#cafe38]/10 border border-[#cafe38]/30 text-[#cafe38] font-bold text-sm text-center"
            data-testid="link-download-zatch-mobile"
          >
            Download Zatch
          </a>
        </div>
      </div>
    </section>
  );
}

export function DealEngine({ onJoinWaitlist }: { onJoinWaitlist?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const isVisibleRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const cardsRef = useRef<CardData[]>([]);
  const startTimeRef = useRef(performance.now());
  const [isMobile, setIsMobile] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [overlayState, setOverlayState] = useState<"chaos" | "transition" | "order">("chaos");
  const [showCTA, setShowCTA] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    if (isMobile || !canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const aspect = width / height;
    const frustumSize = 10;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      100
    );
    camera.position.set(0, 0, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const textureCreators = [
      createWhatsAppTexture,
      createInstagramDMTexture,
      createUnreadNotificationsTexture,
      createDealNegotiationTexture,
      createPaymentTexture,
      createLiveStreamTexture,
      createSellerDashboardTexture,
      createOrderTrackingTexture,
    ];

    const cards = createCardData(textureCreators, 36, 6);
    cardsRef.current = cards;

    for (const card of cards) {
      card.mesh.position.copy(card.chaosPos);
      card.mesh.rotation.copy(card.chaosRot);
      scene.add(card.mesh);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      const a = w / h;
      camera.left = (frustumSize * a) / -2;
      camera.right = (frustumSize * a) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const time = (performance.now() - startTimeRef.current) / 1000;
      const p = progressRef.current;

      for (const card of cards) {
        const mat = card.mesh.material as THREE.MeshBasicMaterial;

        if (p < 0.4) {
          const chaosP = p / 0.4;
          const collapseTarget = new THREE.Vector3(
            card.chaosPos.x * (1 - chaosP * 0.6),
            card.chaosPos.y * (1 - chaosP * 0.6),
            card.chaosPos.z * (1 - chaosP * 0.6)
          );

          const driftX = Math.sin(time * card.driftSpeed + card.driftPhase) * card.driftAmplitude.x * (1 - chaosP);
          const driftY = Math.cos(time * card.driftSpeed * 0.7 + card.driftPhase) * card.driftAmplitude.y * (1 - chaosP);
          const driftZ = Math.sin(time * card.driftSpeed * 0.5 + card.driftPhase + 1) * card.driftAmplitude.z * (1 - chaosP);

          card.mesh.position.x = THREE.MathUtils.lerp(card.mesh.position.x, collapseTarget.x + driftX, 0.08);
          card.mesh.position.y = THREE.MathUtils.lerp(card.mesh.position.y, collapseTarget.y + driftY, 0.08);
          card.mesh.position.z = THREE.MathUtils.lerp(card.mesh.position.z, collapseTarget.z + driftZ, 0.08);

          card.mesh.rotation.x = THREE.MathUtils.lerp(card.mesh.rotation.x, card.chaosRot.x * (1 - chaosP * 0.5), 0.08);
          card.mesh.rotation.y = THREE.MathUtils.lerp(card.mesh.rotation.y, card.chaosRot.y * (1 - chaosP * 0.5), 0.08);
          card.mesh.rotation.z = THREE.MathUtils.lerp(card.mesh.rotation.z, card.chaosRot.z * (1 - chaosP * 0.5), 0.08);

          const r = THREE.MathUtils.lerp(0.8, 1, chaosP);
          const g = THREE.MathUtils.lerp(0.4, 0.7, chaosP);
          const b = THREE.MathUtils.lerp(0.4, 0.7, chaosP);
          mat.color.setRGB(r, g, b);
        } else {
          const gridP = Math.min((p - 0.4) / 0.6, 1);
          const eased = gridP * gridP * (3 - 2 * gridP);

          const breathe = Math.sin(time * 1.5 + card.driftPhase) * 0.01 * eased;

          card.mesh.position.x = THREE.MathUtils.lerp(card.mesh.position.x, card.gridPos.x, 0.06 + eased * 0.06);
          card.mesh.position.y = THREE.MathUtils.lerp(card.mesh.position.y, card.gridPos.y, 0.06 + eased * 0.06);
          card.mesh.position.z = THREE.MathUtils.lerp(card.mesh.position.z, card.gridPos.z, 0.06 + eased * 0.06);

          card.mesh.rotation.x = THREE.MathUtils.lerp(card.mesh.rotation.x, 0, 0.08 + eased * 0.08);
          card.mesh.rotation.y = THREE.MathUtils.lerp(card.mesh.rotation.y, 0, 0.08 + eased * 0.08);
          card.mesh.rotation.z = THREE.MathUtils.lerp(card.mesh.rotation.z, 0, 0.08 + eased * 0.08);

          card.mesh.scale.setScalar(1 + breathe);

          const r = THREE.MathUtils.lerp(mat.color.r, 1, 0.08);
          const g = THREE.MathUtils.lerp(mat.color.g, 1, 0.08);
          const b = THREE.MathUtils.lerp(mat.color.b, 1, 0.08);
          mat.color.setRGB(r, g, b);
        }

        mat.opacity = THREE.MathUtils.lerp(mat.opacity, p > 0.5 ? 1 : 0.7 + Math.random() * 0.05, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      for (const card of cards) {
        const mat = card.mesh.material as THREE.MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
        card.mesh.geometry.dispose();
        scene.remove(card.mesh);
      }

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progressRef.current = v;
      if (v < 0.35) setOverlayState("chaos");
      else if (v > 0.65) setOverlayState("order");
      else setOverlayState("transition");
      setShowCTA(v > 0.85);
    });
    return unsub;
  }, [scrollYProgress]);

  if (isMobile || webglFailed) {
    return <MobileView onJoinWaitlist={onJoinWaitlist} />;
  }

  return (
    <section
      id="sellers"
      ref={containerRef}
      className="relative bg-[#030303]"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          data-testid="webgl-canvas-container"
        />

        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-10">
          <div className="relative w-full max-w-2xl px-8 text-center">
            <motion.div
              animate={{
                opacity: overlayState === "chaos" ? 1 : 0,
                y: overlayState === "chaos" ? 0 : -20,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              data-testid="text-old-way-label"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-red-500" />
                <span className="text-[11px] font-bold text-red-400 tracking-[0.4em] uppercase">For Sellers</span>
                <div className="w-8 h-px bg-red-500" />
              </div>
              <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[0.95] text-red-400/90 mb-3">
                The Old Way
              </h3>
              <p className="text-lg text-red-400/50">Manual selling via DMs</p>
            </motion.div>

            <motion.div
              animate={{
                opacity: overlayState === "order" ? 1 : 0,
                y: overlayState === "order" ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
              data-testid="text-zatch-way-label"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#cafe38]" />
                <span className="text-[11px] font-bold text-[#cafe38] tracking-[0.4em] uppercase">For Sellers</span>
                <div className="w-8 h-px bg-[#cafe38]" />
              </div>
              <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[0.95] text-[#cafe38] mb-3">
                The Zatch Way
              </h3>
              <p className="text-lg text-[#cafe38]/60">Automated. Live. Closed.</p>
            </motion.div>
          </div>

          <motion.div
            animate={{
              opacity: showCTA ? 1 : 0,
              y: showCTA ? 0 : 30,
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute bottom-20 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
          >
            <button
              onClick={onJoinWaitlist}
              className="px-8 py-3 rounded-xl bg-[#cafe38] text-black font-bold text-sm hover:bg-[#d8ff5c] transition-colors"
              data-testid="button-start-selling"
            >
              Start Selling
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-[#cafe38]/10 border border-[#cafe38]/30 text-[#cafe38] font-bold text-sm hover:bg-[#cafe38]/20 transition-colors"
              data-testid="link-download-zatch"
            >
              Download Zatch
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}