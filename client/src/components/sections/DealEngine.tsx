import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import * as THREE from "three";
import sellerScreen1 from "@/assets/sellers/1.png";
import sellerScreen2 from "@/assets/sellers/2.png";
import sellerScreen3 from "@/assets/sellers/3.png";
import { useDeviceCapabilities } from "@/hooks/useDeviceCapabilities";


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

function createFacebookMarketplaceTexture(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#18191a";
  roundRect(ctx, 0, 0, 256, 384, 16);
  ctx.fill();

  ctx.fillStyle = "#242526";
  ctx.fillRect(0, 0, 256, 44);
  roundRect(ctx, 0, 0, 256, 44, 16);
  ctx.fill();
  ctx.fillStyle = "#242526";
  ctx.fillRect(0, 16, 256, 28);
  ctx.fill();

  drawAvatar(ctx, 12, 8, 28, "#1877f2", "AK");
  ctx.fillStyle = "#e4e6eb";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("Amit Kumar", 48, 24);
  ctx.fillStyle = "#b0b3b8";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("Marketplace · Active now", 48, 38);

  const msgs = [
    { in: true, text: "Is this still available?" },
    { in: false, text: "Yes it is! ₹2,500" },
    { in: true, text: "Will you take ₹1,500?" },
    { in: false, text: "Too low. ₹2,200 minimum" },
    { in: true, text: "₹1,800 last offer" },
    { in: false, text: "₹2,000 final, no less" },
    { in: true, text: "Ok deal. How to pay?" },
    { in: false, text: "GPay or UPI. Send screenshot" },
    { in: true, text: "Will pay tomorrow morning" },
    { in: false, text: "Ok waiting..." },
  ];

  let y = 58;
  for (const msg of msgs) {
    const maxW = 165;
    const pad = 8;
    ctx.font = "10px Inter, system-ui, sans-serif";
    const words = msg.text.split(" ");
    let lines: string[] = [];
    let line = words[0];
    for (let i = 1; i < words.length; i++) {
      const test = line + " " + words[i];
      if (ctx.measureText(test).width > maxW - pad * 2) { lines.push(line); line = words[i]; } else { line = test; }
    }
    lines.push(line);
    const lineH = 14;
    const bH = lines.length * lineH + pad * 2;
    const bW = Math.min(maxW, Math.max(...lines.map(l => ctx.measureText(l).width)) + pad * 2 + 6);
    const bx = msg.in ? 12 : 256 - bW - 12;
    ctx.fillStyle = msg.in ? "#3a3b3c" : "#0084ff";
    roundRect(ctx, bx, y, bW, bH, 14);
    ctx.fill();
    ctx.fillStyle = "#e4e6eb";
    ctx.font = "10px Inter, system-ui, sans-serif";
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], bx + pad, y + pad + 10 + i * lineH);
    }
    y += bH + 3;
    if (y > 370) break;
  }

  return c;
}

function createPaymentConfusionTexture(): HTMLCanvasElement {
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

  drawAvatar(ctx, 40, 8, 28, "#d9a04a", "VK");
  ctx.fillStyle = "#e9edef";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("Vijay K", 76, 24);
  ctx.fillStyle = "#8696a0";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("online", 76, 38);

  ctx.fillStyle = "#0b141a";
  ctx.fillRect(0, 44, 256, 340);

  const msgs = [
    { in: false, text: "Payment is ₹1,400. UPI only", time: "11:20 AM" },
    { in: true, text: "Sent ₹1,400 to your GPay", time: "11:45 AM" },
    { in: false, text: "I didn't receive anything 🤔", time: "11:46 AM" },
    { in: true, text: "Check again? Sent at 11:45", time: "11:47 AM" },
    { in: true, text: "[screenshot_payment.jpg]", time: "11:47 AM" },
    { in: false, text: "That's a different UPI ID...", time: "11:50 AM" },
    { in: true, text: "OMG wrong number!! 😰", time: "11:51 AM" },
    { in: true, text: "How do I get refund???", time: "11:52 AM" },
    { in: false, text: "That's not my problem 😅", time: "12:01 PM" },
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
      if (ctx.measureText(test).width > maxW - pad * 2) { lines.push(currentLine); currentLine = words[i]; } else { currentLine = test; }
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
    ctx.textAlign = "left";
    y += bubbleH + 4;
    if (y > 370) break;
  }

  return c;
}

function createGhostingChatTexture(): HTMLCanvasElement {
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

  drawAvatar(ctx, 40, 8, 28, "#4ad99a", "MS");
  ctx.fillStyle = "#e9edef";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("Meera Sethi", 76, 24);
  ctx.fillStyle = "#8696a0";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("last seen 3 days ago", 76, 38);

  ctx.fillStyle = "#0b141a";
  ctx.fillRect(0, 44, 256, 340);

  const msgs = [
    { in: true, text: "I want to buy this! Final price?", time: "Mon" },
    { in: false, text: "₹950 ma'am, best price", time: "Mon" },
    { in: true, text: "Done! I'll pay now. UPI?", time: "Mon" },
    { in: false, text: "Yes, sending UPI details", time: "Mon" },
    { in: false, text: "Hello? Sent UPI ID", time: "Tue" },
    { in: false, text: "Ma'am payment pending?", time: "Tue" },
    { in: false, text: "Are you still interested?", time: "Wed" },
    { in: false, text: "Please reply 🙏", time: "Wed" },
    { in: false, text: "Hello???", time: "Thu" },
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
      if (ctx.measureText(test).width > maxW - pad * 2) { lines.push(currentLine); currentLine = words[i]; } else { currentLine = test; }
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
    if (y > 370) break;
  }

  return c;
}

function createMultiBuyerChaosTexture(): HTMLCanvasElement {
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

  drawAvatar(ctx, 12, 8, 28, "#e91e63", "RB");
  ctx.fillStyle = "#fafafa";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("riya_boutique", 48, 24);
  ctx.fillStyle = "#8e8e8e";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("23 requests", 48, 38);

  const requests = [
    { name: "AJ", text: "Price?", color: "#4a90d9" },
    { name: "NK", text: "Available in blue?", color: "#d94a8c" },
    { name: "PT", text: "COD?", color: "#d9a04a" },
    { name: "RG", text: "Shipping to Delhi?", color: "#4ad99a" },
    { name: "SK", text: "Last price kya hai?", color: "#9a4ad9" },
    { name: "MK", text: "₹400 le lo? 🙏", color: "#d94a4a" },
    { name: "VP", text: "Size chart send karo", color: "#4ad9d9" },
    { name: "DK", text: "Discount milega?", color: "#d99a4a" },
    { name: "AS", text: "Return policy?", color: "#90d94a" },
    { name: "JP", text: "Hello?? Reply karo", color: "#4a4ad9" },
    { name: "RM", text: "Bulk order price?", color: "#d94a90" },
  ];

  let y = 54;
  for (const req of requests) {
    ctx.fillStyle = "#1a1a1a";
    roundRect(ctx, 8, y, 240, 28, 8);
    ctx.fill();

    drawAvatar(ctx, 14, y + 4, 20, req.color, req.name);

    ctx.fillStyle = "#fafafa";
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillText(req.text, 40, y + 19);

    ctx.fillStyle = "#ff4444";
    ctx.beginPath();
    ctx.arc(236, y + 14, 4, 0, Math.PI * 2);
    ctx.fill();

    y += 30;
    if (y > 370) break;
  }

  return c;
}

function createShippingConfusionTexture(): HTMLCanvasElement {
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

  drawAvatar(ctx, 40, 8, 28, "#d94a4a", "AR");
  ctx.fillStyle = "#e9edef";
  ctx.font = "bold 11px Inter, system-ui, sans-serif";
  ctx.fillText("Arjun Reddy", 76, 24);
  ctx.fillStyle = "#8696a0";
  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillText("online", 76, 38);

  ctx.fillStyle = "#0b141a";
  ctx.fillRect(0, 44, 256, 340);

  const msgs = [
    { in: true, text: "Where is my order? It's been 5 days!!", time: "9:30 AM" },
    { in: false, text: "Let me check with courier", time: "10:15 AM" },
    { in: true, text: "You said 2-3 days delivery! 😡", time: "10:16 AM" },
    { in: false, text: "Sorry sir, courier is delayed", time: "10:30 AM" },
    { in: true, text: "Give me tracking number", time: "10:31 AM" },
    { in: false, text: "I don't have tracking... sent via local courier", time: "10:45 AM" },
    { in: true, text: "WHAT?! No tracking?!", time: "10:46 AM" },
    { in: true, text: "I want refund NOW", time: "10:46 AM" },
    { in: false, text: "Please wait 2 more days 🙏", time: "11:00 AM" },
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
      if (ctx.measureText(test).width > maxW - pad * 2) { lines.push(currentLine); currentLine = words[i]; } else { currentLine = test; }
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
    ctx.textAlign = "left";
    y += bubbleH + 4;
    if (y > 370) break;
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
  chaosTexture: THREE.Texture;
  orderTexture: THREE.Texture | null;
  textureSwapped: boolean;
  isHero: boolean;
}

const HERO_POSITIONS = [
  new THREE.Vector3(-3.4, -0.55, 0),
  new THREE.Vector3(0, -0.35, 0.3),
  new THREE.Vector3(3.4, -0.55, 0),
];

const CHAOS_PHASE_END_PROGRESS = 0.36;
const ORDER_SWAP_IN_PROGRESS = CHAOS_PHASE_END_PROGRESS;
const ORDER_SWAP_OUT_PROGRESS = 0.31;
const ORDER_OVERLAY_PROGRESS = 0.58;
const SELLER_SECTION_HEIGHT = "220vh";
const HERO_TARGET_SCALE = 1.8;
const ORDER_SCREEN_IMAGE_URLS = [sellerScreen1, sellerScreen2, sellerScreen3];
const OLD_WAY_PAIN_POINTS = [
  { text: "Lost in DMs", style: { top: "18%", left: "10%" } },
  { text: "Manual Follow-ups", style: { top: "26%", right: "12%" } },
  { text: "Price Confusion", style: { bottom: "30%", left: "14%" } },
  { text: "No Order Tracking", style: { bottom: "20%", right: "12%" } },
];

function isTextureReady(texture: THREE.Texture | null): texture is THREE.Texture {
  if (!texture) return false;
  const image = texture.image as HTMLImageElement | undefined;
  return Boolean(
    image &&
    image.complete &&
    image.naturalWidth > 0 &&
    image.naturalHeight > 0,
  );
}

const CW = 390;
const CH = 760;
const FX = 6;
const FY = 6;
const FW = CW - 12;
const FH = 680;
const FR = 44;
const SX = FX + 4;
const SY = FY + 4;
const SW = FW - 8;
const SH = FH - 8;
const SR = 40;
const BRAND = "#cafe38";
const FONT = "'Space Grotesk', Inter, system-ui, sans-serif";

function drawIPhoneFrame(ctx: CanvasRenderingContext2D, label: string) {
  ctx.clearRect(0, 0, CW, CH);

  const grad = ctx.createLinearGradient(FX, FY, FX + FW, FY + FH);
  grad.addColorStop(0, "#2a2a2e");
  grad.addColorStop(0.3, "#1c1c1e");
  grad.addColorStop(0.7, "#1c1c1e");
  grad.addColorStop(1, "#2a2a2e");
  ctx.fillStyle = grad;
  roundRect(ctx, FX, FY, FW, FH, FR);
  ctx.fill();

  ctx.strokeStyle = "#444448";
  ctx.lineWidth = 1;
  roundRect(ctx, FX, FY, FW, FH, FR);
  ctx.stroke();

  const innerGrad = ctx.createLinearGradient(FX, FY, FX + FW, FY);
  innerGrad.addColorStop(0, "#3a3a3e");
  innerGrad.addColorStop(0.02, "#444448");
  innerGrad.addColorStop(0.05, "#1c1c1e");
  innerGrad.addColorStop(0.95, "#1c1c1e");
  innerGrad.addColorStop(0.98, "#444448");
  innerGrad.addColorStop(1, "#3a3a3e");
  ctx.strokeStyle = innerGrad;
  ctx.lineWidth = 0.5;
  roundRect(ctx, FX + 1.5, FY + 1.5, FW - 3, FH - 3, FR - 1);
  ctx.stroke();

  ctx.fillStyle = "#000000";
  roundRect(ctx, SX, SY, SW, SH, SR);
  ctx.fill();

  const diW = 120;
  const diH = 32;
  const diX = FX + (FW - diW) / 2;
  const diY = SY + 10;
  ctx.fillStyle = "#1c1c1e";
  roundRect(ctx, diX, diY, diW, diH, 16);
  ctx.fill();
  ctx.fillStyle = "#0a0a0c";
  roundRect(ctx, diX + 2, diY + 2, diW - 4, diH - 4, 14);
  ctx.fill();
  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.arc(diX + diW - 22, diY + diH / 2, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0d0d1a";
  ctx.beginPath();
  ctx.arc(diX + diW - 22, diY + diH / 2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 11px ${FONT}`;
  ctx.textAlign = "left";
  ctx.fillText("9:41", SX + 28, diY + 21);
  ctx.textAlign = "right";
  ctx.fillText("100%", SX + SW - 24, diY + 21);

  ctx.fillStyle = "#ffffff";
  roundRect(ctx, SX + SW - 22, diY + 12, 18, 9, 2);
  ctx.fill();
  ctx.fillStyle = "#000000";
  roundRect(ctx, SX + SW - 21, diY + 13, 16, 7, 1.5);
  ctx.fill();
  ctx.fillStyle = "#cafe38";
  roundRect(ctx, SX + SW - 20, diY + 14, 14, 5, 1);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, SX + SW - 5, diY + 15, 2, 3, 1);
  ctx.fill();

  const hiW = 120;
  const hiH = 5;
  const hiX = FX + (FW - hiW) / 2;
  const hiY = FY + FH - 18;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, hiX, hiY, hiW, hiH, 3);
  ctx.fill();

  ctx.fillStyle = BRAND;
  ctx.font = `bold 20px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(label, CW / 2, FY + FH + 18);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function createSellerCatalogueScreen(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = CW;
  c.height = CH;
  const ctx = c.getContext("2d")!;
  drawIPhoneFrame(ctx, "Your Catalogue");

  const x = SX;
  const w = SW;
  let y = SY + 54;

  ctx.fillStyle = "#111111";
  ctx.fillRect(x, y, w, 44);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 16px ${FONT}`;
  ctx.fillText("My Products", x + 14, y + 28);
  ctx.fillStyle = BRAND;
  ctx.font = `bold 12px ${FONT}`;
  ctx.textAlign = "right";
  ctx.fillText("+ Add New", x + w - 14, y + 28);
  ctx.textAlign = "left";
  y += 52;

  ctx.fillStyle = "#1a1a1a";
  roundRect(ctx, x + 10, y, w - 20, 34, 17);
  ctx.fill();
  ctx.fillStyle = "#666666";
  ctx.font = `13px ${FONT}`;
  ctx.fillText("Search products...", x + 36, y + 22);
  ctx.fillStyle = "#888888";
  ctx.font = `14px ${FONT}`;
  ctx.fillText("⌕", x + 18, y + 23);
  y += 44;

  ctx.fillStyle = "#ffffff80";
  ctx.font = `11px ${FONT}`;
  ctx.fillText("12 Products · 3 Live · ₹45,200 revenue", x + 14, y + 14);
  y += 26;

  const products = [
    { name: "Silk Banarasi Saree", price: "₹2,400", stock: "8 left", live: true, sold: 24, img: "#c13584" },
    { name: "Cotton Kurti Set", price: "₹899", stock: "15 left", live: true, sold: 67, img: "#4a90d9" },
    { name: "Designer Lehenga", price: "₹5,200", stock: "3 left", live: false, sold: 12, img: "#d9a04a" },
    { name: "Embroidered Dupatta", price: "₹650", stock: "22 left", live: true, sold: 41, img: "#4ad99a" },
  ];

  for (const prod of products) {
    ctx.fillStyle = "#0d0d0d";
    roundRect(ctx, x + 8, y, w - 16, 90, 14);
    ctx.fill();
    ctx.strokeStyle = "#1f1f1f";
    ctx.lineWidth = 0.5;
    roundRect(ctx, x + 8, y, w - 16, 90, 14);
    ctx.stroke();

    ctx.fillStyle = prod.img;
    roundRect(ctx, x + 16, y + 10, 60, 70, 10);
    ctx.fill();
    ctx.fillStyle = "#ffffff30";
    ctx.font = `bold 20px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("👗", x + 46, y + 52);
    ctx.textAlign = "left";

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 13px ${FONT}`;
    ctx.fillText(prod.name, x + 86, y + 26);

    ctx.fillStyle = BRAND;
    ctx.font = `bold 15px ${FONT}`;
    ctx.fillText(prod.price, x + 86, y + 46);

    ctx.fillStyle = "#888888";
    ctx.font = `11px ${FONT}`;
    ctx.fillText(`${prod.stock} · ${prod.sold} sold`, x + 86, y + 62);

    if (prod.live) {
      ctx.fillStyle = "#cafe3830";
      roundRect(ctx, x + 86, y + 68, 42, 16, 8);
      ctx.fill();
      ctx.fillStyle = BRAND;
      ctx.font = `bold 9px ${FONT}`;
      ctx.fillText("● LIVE", x + 92, y + 80);
    } else {
      ctx.fillStyle = "#ffffff15";
      roundRect(ctx, x + 86, y + 68, 42, 16, 8);
      ctx.fill();
      ctx.fillStyle = "#666666";
      ctx.font = `bold 9px ${FONT}`;
      ctx.fillText("DRAFT", x + 92, y + 80);
    }

    ctx.fillStyle = "#ffffff20";
    ctx.font = `16px ${FONT}`;
    ctx.textAlign = "right";
    ctx.fillText("›", x + w - 24, y + 50);
    ctx.textAlign = "left";

    y += 98;
  }

  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(x, SY + SH - 56, w, 56);
  ctx.strokeStyle = "#1f1f1f";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(x, SY + SH - 56);
  ctx.lineTo(x + w, SY + SH - 56);
  ctx.stroke();

  const tabs = [
    { icon: "🏠", label: "Home", active: false },
    { icon: "📦", label: "Products", active: true },
    { icon: "💬", label: "Bargains", active: false },
    { icon: "📊", label: "Analytics", active: false },
  ];
  const tabW = w / tabs.length;
  tabs.forEach((tab, i) => {
    const tx = x + i * tabW + tabW / 2;
    const ty = SY + SH - 38;
    ctx.fillStyle = tab.active ? BRAND : "#666666";
    ctx.font = `16px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText(tab.icon, tx, ty);
    ctx.font = `bold 8px ${FONT}`;
    ctx.fillText(tab.label, tx, ty + 14);
  });
  ctx.textAlign = "left";

  return c;
}

function createSellerBargainScreen(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = CW;
  c.height = CH;
  const ctx = c.getContext("2d")!;
  drawIPhoneFrame(ctx, "Live Bargain");

  const x = SX;
  const w = SW;
  let y = SY + 54;

  const headerGrad = ctx.createLinearGradient(x, y, x, y + 50);
  headerGrad.addColorStop(0, "#0a1a0f");
  headerGrad.addColorStop(1, "#080808");
  ctx.fillStyle = headerGrad;
  ctx.fillRect(x, y, w, 50);
  ctx.fillStyle = "#ffffff";
  ctx.font = `14px ${FONT}`;
  ctx.fillText("‹", x + 14, y + 30);
  ctx.font = `bold 15px ${FONT}`;
  ctx.fillText("Live Bargain", x + 34, y + 30);
  ctx.fillStyle = "#ff4444";
  ctx.beginPath();
  ctx.arc(x + w - 30, y + 25, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ff4444";
  ctx.font = `bold 9px ${FONT}`;
  ctx.textAlign = "right";
  ctx.fillText("LIVE", x + w - 14, y + 29);
  ctx.textAlign = "left";
  y += 58;

  ctx.fillStyle = "#0f0f0f";
  roundRect(ctx, x + 10, y, w - 20, 80, 14);
  ctx.fill();
  ctx.fillStyle = "#c13584";
  roundRect(ctx, x + 18, y + 10, 52, 60, 10);
  ctx.fill();
  ctx.fillStyle = "#ffffff30";
  ctx.font = `bold 22px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("👗", x + 44, y + 48);
  ctx.textAlign = "left";

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 14px ${FONT}`;
  ctx.fillText("Silk Banarasi Saree", x + 80, y + 28);
  ctx.fillStyle = "#888888";
  ctx.font = `12px ${FONT}`;
  ctx.fillText("Listed price:", x + 80, y + 46);
  ctx.fillStyle = BRAND;
  ctx.font = `bold 16px ${FONT}`;
  ctx.fillText("₹2,400", x + 155, y + 46);
  ctx.fillStyle = "#666666";
  ctx.font = `11px ${FONT}`;
  ctx.fillText("5 buyers watching", x + 80, y + 64);
  y += 92;

  ctx.fillStyle = "#cafe3815";
  roundRect(ctx, x + 10, y, w - 20, 34, 10);
  ctx.fill();
  ctx.fillStyle = BRAND;
  ctx.font = `bold 11px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("⏱ Bargain ends in 2:34", CW / 2, y + 22);
  ctx.textAlign = "left";
  y += 44;

  ctx.fillStyle = "#ffffff60";
  ctx.font = `bold 10px ${FONT}`;
  ctx.fillText("BUYER OFFERS", x + 14, y + 10);
  y += 20;

  const offers = [
    { buyer: "Priya S.", offer: "₹1,800", time: "12s ago", avatar: "#4a90d9", best: true },
    { buyer: "Rahul K.", offer: "₹1,600", time: "28s ago", avatar: "#d9a04a", best: false },
    { buyer: "Sneha M.", offer: "₹1,500", time: "45s ago", avatar: "#9a4ad9", best: false },
  ];

  for (const o of offers) {
    ctx.fillStyle = o.best ? "#cafe3808" : "#0a0a0a";
    roundRect(ctx, x + 10, y, w - 20, 64, 12);
    ctx.fill();
    if (o.best) {
      ctx.strokeStyle = "#cafe3840";
      ctx.lineWidth = 1;
      roundRect(ctx, x + 10, y, w - 20, 64, 12);
      ctx.stroke();
    }

    drawAvatar(ctx, x + 20, y + 12, 36, o.avatar, o.buyer.substring(0, 2).toUpperCase());

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 13px ${FONT}`;
    ctx.fillText(o.buyer, x + 64, y + 28);
    ctx.fillStyle = "#666666";
    ctx.font = `10px ${FONT}`;
    ctx.fillText(o.time, x + 64, y + 44);

    ctx.fillStyle = "#ffffff";
    ctx.font = `bold 17px ${FONT}`;
    ctx.textAlign = "right";
    ctx.fillText(o.offer, x + w - 24, y + 32);
    if (o.best) {
      ctx.fillStyle = BRAND;
      ctx.font = `bold 9px ${FONT}`;
      ctx.fillText("BEST OFFER", x + w - 24, y + 48);
    }
    ctx.textAlign = "left";

    y += 72;
  }

  y += 8;
  ctx.fillStyle = BRAND;
  roundRect(ctx, x + 14, y, w - 28, 44, 12);
  ctx.fill();
  ctx.fillStyle = "#000000";
  ctx.font = `bold 14px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("Accept Best Offer  ₹1,800", CW / 2, y + 28);
  ctx.textAlign = "left";
  y += 52;

  ctx.fillStyle = "#1a1a1a";
  roundRect(ctx, x + 14, y, w - 28, 44, 12);
  ctx.fill();
  ctx.strokeStyle = "#cafe3850";
  ctx.lineWidth = 1;
  roundRect(ctx, x + 14, y, w - 28, 44, 12);
  ctx.stroke();
  ctx.fillStyle = BRAND;
  ctx.font = `bold 14px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("Counter Offer", CW / 2, y + 28);
  ctx.textAlign = "left";

  return c;
}

function createSellerOfferScreen(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = CW;
  c.height = CH;
  const ctx = c.getContext("2d")!;
  drawIPhoneFrame(ctx, "Deal Closed");

  const x = SX;
  const w = SW;
  let y = SY + 54;

  ctx.fillStyle = "#0a1a0f";
  ctx.fillRect(x, y, w, 50);
  ctx.fillStyle = "#ffffff";
  ctx.font = `14px ${FONT}`;
  ctx.fillText("‹", x + 14, y + 30);
  ctx.font = `bold 15px ${FONT}`;
  ctx.fillText("Order Confirmed", x + 34, y + 30);
  y += 58;

  ctx.fillStyle = "#cafe3815";
  roundRect(ctx, x + 10, y, w - 20, 130, 16);
  ctx.fill();
  ctx.strokeStyle = "#cafe3830";
  ctx.lineWidth = 1;
  roundRect(ctx, x + 10, y, w - 20, 130, 16);
  ctx.stroke();

  ctx.fillStyle = BRAND;
  ctx.font = `bold 36px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("✓", CW / 2, y + 40);
  ctx.font = `bold 16px ${FONT}`;
  ctx.fillText("Deal Closed!", CW / 2, y + 64);
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 24px ${FONT}`;
  ctx.fillText("₹1,800", CW / 2, y + 96);
  ctx.fillStyle = "#ffffff60";
  ctx.font = `12px ${FONT}`;
  ctx.fillText("Sold to Priya S. · Just now", CW / 2, y + 116);
  ctx.textAlign = "left";
  y += 144;

  ctx.fillStyle = "#ffffff40";
  ctx.font = `bold 10px ${FONT}`;
  ctx.fillText("ORDER DETAILS", x + 14, y + 14);
  y += 26;

  const details = [
    { label: "Product", value: "Silk Banarasi Saree" },
    { label: "Listed Price", value: "₹2,400" },
    { label: "Final Price", value: "₹1,800", highlight: true },
    { label: "Buyer", value: "Priya S." },
    { label: "Payment", value: "UPI · Verified ✓" },
    { label: "Shipping", value: "Auto-generated label" },
  ];

  for (const d of details) {
    ctx.fillStyle = "#0a0a0a";
    roundRect(ctx, x + 10, y, w - 20, 36, 8);
    ctx.fill();
    ctx.fillStyle = "#888888";
    ctx.font = `12px ${FONT}`;
    ctx.fillText(d.label, x + 20, y + 23);
    ctx.fillStyle = d.highlight ? BRAND : "#ffffff";
    ctx.font = d.highlight ? `bold 13px ${FONT}` : `13px ${FONT}`;
    ctx.textAlign = "right";
    ctx.fillText(d.value, x + w - 20, y + 23);
    ctx.textAlign = "left";
    y += 40;
  }

  y += 12;
  ctx.fillStyle = BRAND;
  roundRect(ctx, x + 14, y, w - 28, 42, 12);
  ctx.fill();
  ctx.fillStyle = "#000000";
  ctx.font = `bold 13px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("Print Shipping Label", CW / 2, y + 27);
  ctx.textAlign = "left";

  return c;
}

function createCardData(
  textureCreators: (() => HTMLCanvasElement)[],
  orderTextures: THREE.Texture[],
  count: number,
  _cols: number
): CardData[] {
  const cards: CardData[] = [];

  for (let i = 0; i < count; i++) {
    const isHero = i < 3;
    const texIdx = i % textureCreators.length;
    const canvas = textureCreators[texIdx]();
    const chaosTexture = new THREE.CanvasTexture(canvas);
    chaosTexture.minFilter = THREE.LinearFilter;
    chaosTexture.magFilter = THREE.LinearFilter;

    const orderTexture = isHero && orderTextures.length > 0
      ? orderTextures[i % orderTextures.length]
      : null;

    const geo = new THREE.PlaneGeometry(1.8, 3.5);
    const mat = new THREE.MeshBasicMaterial({
      map: chaosTexture,
      transparent: true,
      opacity: 0.55 + Math.random() * 0.25,
      color: new THREE.Color(0.75, 0.35, 0.35),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geo, mat);

    cards.push({
      chaosPos: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ),
      chaosRot: new THREE.Euler(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      ),
      gridPos: isHero ? HERO_POSITIONS[i].clone() : new THREE.Vector3(0, 0, -2),
      driftSpeed: 0.3 + Math.random() * 0.7,
      driftPhase: Math.random() * Math.PI * 2,
      driftAmplitude: new THREE.Vector3(
        0.4 + Math.random() * 0.6,
        0.3 + Math.random() * 0.5,
        0.15 + Math.random() * 0.25
      ),
      mesh,
      chaosTexture,
      orderTexture,
      textureSwapped: false,
      isHero,
    });
  }

  return cards;
}

function MobileView({ onStartSelling }: { onStartSelling?: () => void }) {
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
            onClick={onStartSelling}
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

function DesktopFallbackView({ onStartSelling }: { onStartSelling?: () => void }) {
  return (
    <section id="sellers" className="relative bg-[#030303] py-24 lg:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#cafe38]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#cafe38]">For Sellers</span>
            <div className="h-px w-10 bg-[#cafe38]" />
          </div>
          <h3 className="text-5xl font-bold font-display leading-[0.94] tracking-tight text-white md:text-6xl">
            Your DMs Are Not a{" "}
            <span className="bg-gradient-to-r from-[#cafe38] to-[#cafe38]/60 bg-clip-text text-transparent">
              Sales System.
            </span>
          </h3>
        </div>

        <div className="mx-auto mb-10 grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-red-500/25 bg-gradient-to-br from-[#1a0808] to-[#0f0505] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-300">
                x
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-red-300/90">Old Way</span>
            </div>
            <div className="space-y-2.5">
              <div className="h-3 rounded-full bg-red-500/15 w-full" />
              <div className="h-3 rounded-full bg-red-500/15 w-[82%]" />
              <div className="h-3 rounded-full bg-red-500/15 w-[75%]" />
              <div className="h-3 rounded-full bg-red-500/15 w-[68%]" />
            </div>
            <p className="mt-4 text-xs tracking-wide text-red-300/60">Manual DMs - Lost deals - No tracking</p>
          </div>

          <div className="rounded-3xl border border-[#cafe38]/30 bg-gradient-to-br from-[#0a1a0f] to-[#050d08] p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#cafe38]/35 bg-[#cafe38]/10 text-[#dfff88]">
                *
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#dfff88]">Zatch Way</span>
            </div>
            <div className="space-y-2.5">
              <div className="h-3 rounded-full bg-[#cafe38]/18 w-full" />
              <div className="h-3 rounded-full bg-[#cafe38]/18 w-[82%]" />
              <div className="h-3 rounded-full bg-[#cafe38]/18 w-[75%]" />
              <div className="h-3 rounded-full bg-[#cafe38]/18 w-[68%]" />
            </div>
            <p className="mt-4 text-xs tracking-wide text-[#cafe38]/65">Automated - Live - Closed deals</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onStartSelling}
            className="w-full max-w-[220px] rounded-xl bg-[#cafe38] px-6 py-3 text-sm font-bold text-black shadow-[0_0_24px_rgba(202,254,56,0.22)]"
            data-testid="button-start-selling"
          >
            Start Selling
          </button>
          <a
            href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[220px] rounded-xl border border-[#cafe38]/35 bg-[#cafe38]/10 px-6 py-3 text-center text-sm font-bold text-[#dfff88]"
            data-testid="link-download-zatch"
          >
            Download Zatch
          </a>
        </div>
      </div>
    </section>
  );
}

export function DealEngine({ onStartSelling }: { onStartSelling?: () => void }) {
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
  const { isFinePointer, prefersReducedMotion } = useDeviceCapabilities();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, { mass: 0.25, stiffness: 90, damping: 26 });

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    if (isMobile || !canvasRef.current || !isFinePointer || prefersReducedMotion) return;

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
      createFacebookMarketplaceTexture,
      createPaymentConfusionTexture,
      createGhostingChatTexture,
      createMultiBuyerChaosTexture,
      createShippingConfusionTexture,
    ];

    const textureLoader = new THREE.TextureLoader();
    const orderTextures: THREE.Texture[] = ORDER_SCREEN_IMAGE_URLS.map((imageUrl) => {
      const tex = textureLoader.load(imageUrl);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    });

    const cards = createCardData(textureCreators, orderTextures, 36, 6);
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

      const heroScale = HERO_TARGET_SCALE;

      for (const card of cardsRef.current) {
        const mat = card.mesh.material as THREE.MeshBasicMaterial;

        if (
          p >= ORDER_SWAP_IN_PROGRESS &&
          !card.textureSwapped &&
          isTextureReady(card.orderTexture)
        ) {
          mat.map = card.orderTexture;
          mat.color.setRGB(1, 1, 1);
          mat.opacity = 1;
          mat.needsUpdate = true;
          card.textureSwapped = true;
        } else if (p <= ORDER_SWAP_OUT_PROGRESS && card.textureSwapped) {
          mat.map = card.chaosTexture;
          mat.needsUpdate = true;
          card.textureSwapped = false;
        }

        if (p < CHAOS_PHASE_END_PROGRESS) {
          card.mesh.visible = true;
          const chaosP = p / CHAOS_PHASE_END_PROGRESS;
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

          card.mesh.scale.setScalar(THREE.MathUtils.lerp(card.mesh.scale.x, 1, 0.08));

          const r = THREE.MathUtils.lerp(0.8, 1, chaosP);
          const g = THREE.MathUtils.lerp(0.4, 0.7, chaosP);
          const b = THREE.MathUtils.lerp(0.4, 0.7, chaosP);
          mat.color.setRGB(r, g, b);

          mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.7 + Math.random() * 0.05, 0.05);
        } else {
          const gridP = Math.min((p - CHAOS_PHASE_END_PROGRESS) / (1 - CHAOS_PHASE_END_PROGRESS), 1);
          const eased = gridP * gridP * (3 - 2 * gridP);

          if (card.isHero) {
            card.mesh.visible = true;
            const breathe = Math.sin(time * 1.5 + card.driftPhase) * 0.01 * eased;

            card.mesh.position.x = THREE.MathUtils.lerp(card.mesh.position.x, card.gridPos.x, 0.06 + eased * 0.06);
            card.mesh.position.y = THREE.MathUtils.lerp(card.mesh.position.y, card.gridPos.y, 0.06 + eased * 0.06);
            card.mesh.position.z = THREE.MathUtils.lerp(card.mesh.position.z, card.gridPos.z, 0.06 + eased * 0.06);

            card.mesh.rotation.x = THREE.MathUtils.lerp(card.mesh.rotation.x, 0, 0.08 + eased * 0.08);
            card.mesh.rotation.y = THREE.MathUtils.lerp(card.mesh.rotation.y, 0, 0.08 + eased * 0.08);
            card.mesh.rotation.z = THREE.MathUtils.lerp(card.mesh.rotation.z, 0, 0.08 + eased * 0.08);

            card.mesh.scale.setScalar(THREE.MathUtils.lerp(card.mesh.scale.x, heroScale + breathe, 0.06 + eased * 0.06));

            mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1, 0.05);
            const r = THREE.MathUtils.lerp(mat.color.r, 1, 0.08);
            const g = THREE.MathUtils.lerp(mat.color.g, 1, 0.08);
            const b = THREE.MathUtils.lerp(mat.color.b, 1, 0.08);
            mat.color.setRGB(r, g, b);
          } else {
            const fadeSpeed = gridP > 0.12 ? 0.24 : 0.12;
            mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, fadeSpeed);
            if (gridP > 0.16 || mat.opacity < 0.02) {
              card.mesh.visible = false;
            }
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      for (const card of cardsRef.current) {
        const mat = card.mesh.material as THREE.MeshBasicMaterial;
        card.chaosTexture.dispose();
        mat.dispose();
        card.mesh.geometry.dispose();
        scene.remove(card.mesh);
      }

      for (const tex of orderTextures) {
        if (tex) tex.dispose();
      }

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isFinePointer, isMobile, prefersReducedMotion]);

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      progressRef.current = v;
      if (v < CHAOS_PHASE_END_PROGRESS - 0.06) setOverlayState("chaos");
      else if (v > ORDER_OVERLAY_PROGRESS + 0.04) setOverlayState("order");
      else setOverlayState("transition");
      setShowCTA(v > ORDER_OVERLAY_PROGRESS + 0.02);
    });
    return unsub;
  }, [smoothProgress]);

  if (isMobile) {
    return <MobileView onStartSelling={onStartSelling} />;
  }

  if (webglFailed || !isFinePointer || prefersReducedMotion) {
    return <DesktopFallbackView onStartSelling={onStartSelling} />;
  }

  return (
    <section
      id="sellers"
      ref={containerRef}
      className="relative bg-[#030303]"
      style={{ height: SELLER_SECTION_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          data-testid="webgl-canvas-container"
        />

        <div className="absolute inset-0 pointer-events-none z-10">
          <motion.div
            animate={{ opacity: overlayState === "chaos" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 50% at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, transparent 80%)",
            }}
          />
          <motion.div
            animate={{ opacity: overlayState === "order" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 60% 50% at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, transparent 80%)",
            }}
          />

          <div className="absolute inset-0">
            {OLD_WAY_PAIN_POINTS.map((point, index) => (
              <motion.div
                key={point.text}
                initial={false}
                animate={overlayState === "chaos"
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.8, y: 10 }
                }
                transition={{ duration: 0.4, delay: overlayState === "chaos" ? index * 0.06 : 0 }}
                className="absolute"
                style={point.style}
              >
                <motion.div
                  animate={overlayState === "chaos"
                    ? { y: [0, -6, 0], scale: [1, 1.05, 1] }
                    : { y: 0, scale: 1 }
                  }
                  transition={overlayState === "chaos"
                    ? { duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                  }
                  className="px-4 py-2 rounded-full bg-red-500/15 border border-red-500/40 text-red-100 text-xs font-semibold tracking-wide shadow-[0_12px_30px_rgba(255,80,80,0.25)] backdrop-blur-md"
                >
                  {point.text}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
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
                <h3 className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[0.95] text-red-400 mb-3 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                  The Old Way
                </h3>
                <p className="text-lg text-red-400/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">Manual selling via DMs</p>
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
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-[0.88] text-[#cafe38] mb-3 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                  The Zatch Way
                </h3>
                <p className="text-base md:text-lg text-[#cafe38]/60 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">Three screens. That's all it takes.</p>
                <motion.div
                  animate={{
                    opacity: showCTA ? 1 : 0,
                    y: showCTA ? 0 : 10,
                  }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="pointer-events-auto mt-5 flex flex-col sm:flex-row items-center gap-2 rounded-xl border border-[#cafe38]/25 bg-black/80 px-3 py-2 backdrop-blur-md"
                >
                  <button
                    onClick={onStartSelling}
                    className="px-5 py-2 rounded-lg bg-[#cafe38] text-black font-bold text-xs hover:bg-[#d8ff5c] transition-colors shadow-[0_0_16px_rgba(202,254,56,0.32)]"
                    data-testid="button-start-selling"
                  >
                    Start Selling
                  </button>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.zatch.app&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-lg bg-[#cafe38]/35 border border-[#cafe38]/55 text-[#d8ff5c] font-bold text-xs hover:bg-[#cafe38]/45 transition-colors shadow-[0_0_12px_rgba(0,0,0,0.45)]"
                    data-testid="link-download-zatch"
                  >
                    Download Zatch
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
