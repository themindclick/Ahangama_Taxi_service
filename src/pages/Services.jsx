// Services.jsx — Taxi Service Ahangama
import React, { useState, useRef } from "react";
import { businessInfo } from "../data/vehicles";

const services = [
  {
    id: "airport",
    number: "01",
    title: "Airport Transfers",
    subtitle: "Colombo International · CMB",
    desc: "Flight-tracked, 24/7 executive door-to-door service. Your driver monitors arrivals in real time — no waiting, no missed connections.",
    tags: ["Flight Tracking", "24 / 7", "Meet & Greet"],
  },
  {
    id: "safari",
    number: "02",
    title: "Wild Safari",
    subtitle: "Yala · Udawalawe · Minneriya",
    desc: "Private jeep expeditions into Sri Lanka's legendary national parks. Leopards, elephants, endemic birds — guided by those who know the terrain.",
    tags: ["Private Guide", "Park Entry", "Dawn Departures"],
  },
  {
    id: "whale",
    number: "03",
    title: "Whale Watching",
    subtitle: "Mirissa · Dondra Head",
    desc: "Blue whales, sperm whales, spinner dolphins. The Southern Coast is among Asia's finest cetacean corridors — we'll put you there at the right moment.",
    tags: ["Boat Transfers", "Expert Timing", "Full-Day"],
  },
  {
    id: "tours",
    number: "04",
    title: "Heritage Day Tours",
    subtitle: "Galle Fort · Sigiriya · Kandy",
    desc: "All-inclusive curated routes — transport, entry fees, and local context bundled. Sri Lanka's UNESCO sites and hidden gems, without the logistics.",
    tags: ["Entry Included", "Private Vehicle", "Curated Routes"],
  },
  {
    id: "instant",
    number: "05",
    title: "Instant Taxi",
    subtitle: "Southern Province · On Demand",
    desc: "Real-time rides across Ahangama, Galle, Unawatuna, and Weligama. Book via WhatsApp — confirmed in minutes, fixed fares, no surprises.",
    tags: ["Fixed Fares", "WhatsApp Booking", "Night Service"],
  },
  {
    id: "rental",
    number: "06",
    title: "Vehicle Rentals",
    subtitle: "Scooter · Tuk Tuk · Car",
    desc: "Self-drive coastal freedom. Pristine scooters, tuk tuks, and AC cars with helmets, insurance, and full roadside support built in.",
    tags: ["Self-Drive", "Insurance Included", "Flexible Duration"],
  },
];

const particles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  bottom: Math.random() * -20,
  isGold: Math.random() > 0.5,
  duration: Math.random() * 12 + 10,
  delay: Math.random() * -18,
}));

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .sv2-root {
    font-family: 'DM Sans', sans-serif;
    background: #07102B;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    --gold:    #C9A84C;
    --gold-lt: #F0C96A;
    --navy:    #001F6B;
    --navy-d:  #000D40;
    --navy-x:  #040d24;
  }

  .sv2-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 20% 50%, #0d2060 0%, #040d24 60%, #02081a 100%);
    overflow: hidden; z-index: 0; pointer-events: none;
  }
  .sv2-orb {
    position: absolute; border-radius: 50%; filter: blur(80px);
    animation: sv2OrbFloat 8s ease-in-out infinite;
  }
  .sv2-orb-1 { width:500px;height:500px;background:rgba(0,31,107,.6);   top:-150px;left:-100px;  animation-delay:0s;  }
  .sv2-orb-2 { width:400px;height:400px;background:rgba(201,168,76,.15);bottom:-100px;right:10%; animation-delay:-4s; }
  .sv2-orb-3 { width:300px;height:300px;background:rgba(0,60,150,.4);   top:40%;right:-50px;     animation-delay:-2s; }

  @keyframes sv2OrbFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-30px) scale(1.05); }
  }

  .sv2-particle {
    position: absolute; border-radius: 50%; pointer-events: none;
    animation: sv2ParticleRise linear infinite;
  }
  @keyframes sv2ParticleRise {
    0%   { transform:translateY(0) scale(1); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:1; }
    100% { transform:translateY(-100%) scale(.5); opacity:0; }
  }

  .sv2-hero {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: 1fr 1fr;
    min-height: 80vh; overflow: hidden;
  }
  @media(max-width:860px){ .sv2-hero{ grid-template-columns:1fr; min-height:auto; } }

  .sv2-hero__left {
    position: relative; padding: 140px 64px 100px;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  @media(max-width:860px){ .sv2-hero__left{ padding:100px 28px 60px; } }

  .sv2-hero__grid {
    position: absolute; inset: 0; opacity: .04; pointer-events: none;
    background-image:
      linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),
      linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px);
    background-size: 56px 56px;
  }
  .sv2-hero__rule {
    position: absolute; top:0;bottom:0;right:0;width:1px;
    background: linear-gradient(to bottom, transparent, rgba(201,168,76,.5) 30%, rgba(201,168,76,.5) 70%, transparent);
  }

  .sv2-hero__inner { position: relative; z-index: 5; }

  .sv2-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 10px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
  }
  .sv2-eyebrow::before { content:''; width:32px;height:1.5px;background:var(--gold);opacity:.7; }

  .sv2-hero__title {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: clamp(3rem,6vw,5.5rem); line-height: .95;
    color: #fff; margin: 0 0 24px; letter-spacing: -.02em;
  }
  .sv2-hero__title em {
    display: block; font-style: italic; font-weight: 900;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: clamp(3.5rem,7vw,6.5rem);
  }

  .sv2-hero__desc {
    font-size: .95rem; color: rgba(255,255,255,.55); line-height: 1.8;
    max-width: 420px; font-weight: 300; margin-bottom: 44px;
  }

  .sv2-hero__stats {
    display: flex; gap: 40px; flex-wrap: wrap;
    padding-top: 32px;
    border-top: 1px solid rgba(201,168,76,.15);
  }
  .sv2-stat__n {
    font-family: 'Playfair Display', serif; font-size: 2.2rem; font-weight: 900;
    background: linear-gradient(135deg, var(--gold), var(--gold-lt));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; line-height: 1;
  }
  .sv2-stat__l {
    font-size: 10px; font-weight: 600; color: rgba(255,255,255,.35);
    letter-spacing: .12em; text-transform: uppercase; margin-top: 5px;
  }

  .sv2-hero__right {
    position: relative; min-height: 80vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  @media(max-width:860px){ .sv2-hero__right{ display:none; } }

  .sv2-hero__img {
    position: absolute; inset: 0;
    background: url('/assets/taxi.png') center/contain no-repeat;
    filter: brightness(0.9) saturate(1.1);
  }

  .sv2-hero__tint {
    position: absolute; inset: 0;
    background:
      linear-gradient(to right, #040d24 0%, transparent 35%),
      linear-gradient(to top, rgba(201,168,76,.12) 0%, transparent 55%);
  }
  .sv2-hero__bg-num {
    position: absolute; right: -20px; bottom: -20px;
    font-family: 'Playfair Display', serif; font-size: 22rem; font-weight: 900;
    color: rgba(255,255,255,.03); line-height: 1;
    user-select: none; pointer-events: none; letter-spacing: -.05em;
  }

  .sv2-hero__arc {
    position: absolute; bottom: -1px; left:0; right:0; height: 70px;
    background: #07102B;
    clip-path: ellipse(52% 100% at 50% 100%);
    z-index: 10;
  }

  .sv2-section {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto; padding: 96px 28px 110px;
  }

  .sv2-sh { margin-bottom: 60px; }
  .sv2-sh__eye {
    font-size: 10px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase;
    color: var(--gold); display: inline-flex; align-items: center; gap: 12px; margin-bottom: 16px;
  }
  .sv2-sh__eye::before { content:''; width:28px;height:1.5px;background:var(--gold); }
  .sv2-sh__title {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: clamp(2rem,4vw,3.2rem); line-height: 1.08; color: #fff;
  }
  .sv2-sh__title em {
    font-style: italic;
    background: linear-gradient(135deg, var(--gold), var(--gold-lt));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sv2-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    perspective: 1400px;
  }
  @media(max-width:1000px){ .sv2-grid{ grid-template-columns:repeat(2,1fr); } }
  @media(max-width:600px){  .sv2-grid{ grid-template-columns:1fr; } }

  .sv2-card {
    position: relative;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.08);
    backdrop-filter: blur(14px);
    border-radius: 20px;
    padding: 40px 32px 32px;
    transform-style: preserve-3d;
    transition: transform .12s ease, border-color .3s, box-shadow .3s;
    cursor: default;
    overflow: hidden;
    animation: sv2CardReveal .6s cubic-bezier(.22,1,.36,1) both;
  }

  @keyframes sv2CardReveal {
    from { opacity:0; transform:translateY(24px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .sv2-card::before {
    content: ''; position: absolute; top:0;left:0;right:0; height:2px;
    background: linear-gradient(90deg, var(--navy) 0%, var(--gold) 100%);
    transform: scaleX(0); transform-origin: left;
    transition: transform .45s cubic-bezier(.22,1,.36,1);
    border-radius: 20px 20px 0 0;
  }
  .sv2-card:hover { border-color: rgba(201,168,76,.3); }
  .sv2-card:hover::before { transform: scaleX(1); }

  .sv2-card::after {
    content: ''; position: absolute; inset:0; border-radius: 20px;
    background: linear-gradient(135deg, rgba(201,168,76,.07) 0%, transparent 55%);
    opacity: 0; transition: opacity .35s;
  }
  .sv2-card:hover::after { opacity: 1; }

  .sv2-card__glow {
    position: absolute; inset: -60px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,.08) 0%, transparent 70%);
    opacity: 0; pointer-events: none; transition: opacity .4s;
  }
  .sv2-card:hover .sv2-card__glow { opacity: 1; }

  .sv2-card__num {
    font-family: 'Playfair Display', serif; font-size: 4.5rem; font-weight: 900;
    line-height: 1; letter-spacing: -.04em;
    color: rgba(255,255,255,.06); margin-bottom: 18px;
    user-select: none; transition: color .3s;
  }
  .sv2-card:hover .sv2-card__num { color: rgba(201,168,76,.12); }

  .sv2-card__title {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: 1.35rem; color: #fff; margin-bottom: 5px;
    line-height: 1.15; letter-spacing: -.01em; transition: color .25s;
  }
  .sv2-card:hover .sv2-card__title { color: var(--gold-lt); }

  .sv2-card__sub {
    font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 18px; opacity: .85;
  }

  .sv2-card__desc {
    font-size: .84rem; color: rgba(255,255,255,.48); line-height: 1.78;
    margin-bottom: 22px; font-weight: 300;
  }

  .sv2-card__tags { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 26px; }
  .sv2-tag {
    padding: 5px 13px; border-radius: 6px;
    font-size: 10px; font-weight: 600; letter-spacing: .04em;
    color: rgba(255,255,255,.55);
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.1);
    transition: background .25s, color .25s, border-color .25s;
  }
  .sv2-card:hover .sv2-tag {
    background: rgba(201,168,76,.12);
    color: var(--gold-lt);
    border-color: rgba(201,168,76,.25);
  }

  .sv2-card__line {
    height: 1px; background: rgba(255,255,255,.07);
    margin-bottom: 22px; transition: background .3s;
  }
  .sv2-card:hover .sv2-card__line { background: rgba(201,168,76,.2); }

  .sv2-btn-primary {
    flex: 1; padding: 11px 16px;
    background: linear-gradient(135deg, var(--gold) 0%, #E8B842 100%);
    color: #000D40;
    border: none; border-radius: 10px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: .78rem;
    letter-spacing: .05em; text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 0 rgba(100,60,0,.35), 0 8px 20px rgba(201,168,76,.2);
    transition: transform .12s, box-shadow .12s, filter .2s;
    position: relative; overflow: hidden;
  }
  .sv2-btn-primary::before {
    content:''; position:absolute; top:0;left:-60%;width:50%;height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);
    animation: sv2BtnShine 3s ease-in-out infinite 2s;
  }
  @keyframes sv2BtnShine {
    0%  { left:-60%; }
    100%{ left:160%; }
  }
  .sv2-btn-primary:hover { transform:translateY(-2px); filter:brightness(1.08); box-shadow:0 6px 0 rgba(100,60,0,.35),0 14px 28px rgba(201,168,76,.3); }
  .sv2-btn-primary:active{ transform:translateY(2px); box-shadow:0 2px 0 rgba(100,60,0,.35),0 4px 10px rgba(201,168,76,.15); }

  .sv2-btn-icon {
    width:40px;height:40px;border-radius:10px;
    border:1.5px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    cursor:pointer; color:rgba(255,255,255,.5);
    display:flex;align-items:center;justify-content:center; flex-shrink:0;
    transition:border-color .2s,color .2s,background .2s,transform .12s,box-shadow .12s;
    box-shadow:0 2px 0 rgba(0,0,0,.2);
  }
  .sv2-btn-icon:hover {
    border-color:var(--gold);color:var(--gold);background:rgba(201,168,76,.1);
    transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,.2);
  }
  .sv2-btn-icon:active{ transform:translateY(2px);box-shadow:none; }

  .sv2-cta {
    position: relative; z-index: 1;
    padding: 100px 28px;
    overflow: hidden;
  }
  .sv2-cta__border {
    position: absolute; top:0; left:10%;right:10%; height:1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,.3), transparent);
  }
  .sv2-cta__mesh {
    position: absolute; inset:0; pointer-events:none;
    background:
      radial-gradient(ellipse 60% 80% at 10% 50%, rgba(0,31,107,.4) 0%, transparent 60%),
      radial-gradient(ellipse 40% 60% at 90% 20%, rgba(201,168,76,.08) 0%, transparent 55%);
  }

  .sv2-cta__inner {
    position: relative; z-index: 5;
    max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center;
  }
  @media(max-width:700px){ .sv2-cta__inner{ grid-template-columns:1fr;gap:32px; } }

  .sv2-cta__title {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: clamp(1.8rem,3.5vw,3rem); color:#fff; line-height:1.1;
    margin-bottom:12px;
  }
  .sv2-cta__title em {
    font-style:italic;
    background: linear-gradient(135deg, var(--gold), var(--gold-lt));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  }
  .sv2-cta__sub { font-size:.88rem;color:rgba(255,255,255,.45);line-height:1.75;font-weight:300; }

  .sv2-cta__btns { display:flex;flex-direction:column;gap:12px;flex-shrink:0; }
  @media(max-width:700px){ .sv2-cta__btns{ flex-direction:row;flex-wrap:wrap; } }

  .sv2-cta-btn {
    display:inline-flex;align-items:center;gap:10px;
    padding:14px 26px;border:none;border-radius:12px;cursor:pointer;
    font-family:'DM Sans',sans-serif;font-weight:700;font-size:.88rem;
    letter-spacing:.04em;white-space:nowrap;
    transition:transform .15s,box-shadow .15s,filter .2s;
  }
  .sv2-cta-btn:hover { transform:translateY(-2px);filter:brightness(1.07); }
  .sv2-cta-btn:active{ transform:translateY(1px); }

  .sv2-cta-btn--wa {
    background:linear-gradient(135deg,#25D366,#1da851);color:#fff;
    box-shadow:0 4px 0 #146b33,0 10px 30px rgba(37,211,102,.25);
  }
  .sv2-cta-btn--wa:hover { box-shadow:0 6px 0 #146b33,0 16px 36px rgba(37,211,102,.3); }

  .sv2-cta-btn--call {
    background:rgba(201,168,76,.12);color:var(--gold-lt);
    border:1.5px solid rgba(201,168,76,.25);
    box-shadow:0 4px 0 rgba(0,0,0,.3);
  }
  .sv2-cta-btn--call:hover { background:rgba(201,168,76,.18); }
`;

export default function Services() {
  const [hovered, setHovered] = useState(null);
  const [tilt, setTilt] = useState({});
  const cardRefs = useRef({});

  const handleWhatsApp = (title) => {
    const msg = encodeURIComponent(`Hi! I'd like to enquire about *${title}*. Can you share details?`);
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+${businessInfo.whatsapp}`;
  };

  const onMouseMove = (e, id) => {
    const el = cardRefs.current[id];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const y = -((e.clientY - r.top) / r.height - 0.5) * 12;
    setTilt((t) => ({ ...t, [id]: { x, y } }));
  };

  const onMouseLeave = (id) => {
    setTilt((t) => ({ ...t, [id]: { x: 0, y: 0 } }));
    setHovered(null);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sv2-root">

        <div className="sv2-bg">
          <div className="sv2-orb sv2-orb-1" />
          <div className="sv2-orb sv2-orb-2" />
          <div className="sv2-orb sv2-orb-3" />
          {particles.map((p) => (
            <div
              key={p.id}
              className="sv2-particle"
              style={{
                width: p.size, height: p.size,
                left: `${p.left}%`, bottom: `${p.bottom}%`,
                background: p.isGold ? "rgba(201,168,76,.5)" : "rgba(255,255,255,.25)",
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <section className="sv2-hero">
          <div className="sv2-hero__left">
            <div className="sv2-hero__grid" />
            <div className="sv2-hero__rule" />
            <div className="sv2-hero__inner">
              <p className="sv2-eyebrow">Our Services</p>
              <h1 className="sv2-hero__title">
                Six Ways to
                <em>Move You</em>
              </h1>
              <p className="sv2-hero__desc">
                Airport transfers, safari expeditions, whale watching, day tours, instant rides, and self-drive rentals — every journey across Sri Lanka handled with precision.
              </p>
              <div className="sv2-hero__stats">
                <div>
                  <p className="sv2-stat__n">10+</p>
                  <p className="sv2-stat__l">Years Active</p>
                </div>
                <div>
                  <p className="sv2-stat__n">24/7</p>
                  <p className="sv2-stat__l">Availability</p>
                </div>
                <div>
                  <p className="sv2-stat__n">6</p>
                  <p className="sv2-stat__l">Services</p>
                </div>
              </div>
            </div>
          </div>

          <div className="sv2-hero__right">
            <div className="sv2-hero__img" />
            <div className="sv2-hero__tint" />
            <div className="sv2-hero__bg-num">06</div>
          </div>

          <div className="sv2-hero__arc" />
        </section>

        <section className="sv2-section">
          <div className="sv2-sh">
            <p className="sv2-sh__eye">What We Offer</p>
            <h2 className="sv2-sh__title">
              Every Journey,<br /><em>Precisely Handled</em>
            </h2>
          </div>

          <div className="sv2-grid">
            {services.map((s, i) => {
              const t = tilt[s.id] || { x: 0, y: 0 };
              return (
                <div
                  key={s.id}
                  className="sv2-card"
                  ref={(el) => (cardRefs.current[s.id] = el)}
                  onMouseMove={(e) => onMouseMove(e, s.id)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => onMouseLeave(s.id)}
                  style={{
                    transform: `perspective(1000px) rotateY(${t.x}deg) rotateX(${t.y}deg)`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div className="sv2-card__glow" />
                  <p className="sv2-card__num">{s.number}</p>
                  <h3 className="sv2-card__title">{s.title}</h3>
                  <p className="sv2-card__sub">{s.subtitle}</p>
                  <p className="sv2-card__desc">{s.desc}</p>
                  <div className="sv2-card__tags">
                    {s.tags.map((tag) => (
                      <span key={tag} className="sv2-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="sv2-card__line" />
                  <div className="sv2-card__actions">
                    <button className="sv2-btn-primary" onClick={() => handleWhatsApp(s.title)}>
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Book Now
                    </button>
                    <button className="sv2-btn-icon" onClick={handleCall} title="Call us">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="sv2-cta">
          <div className="sv2-cta__border" />
          <div className="sv2-cta__mesh" />
          <div className="sv2-cta__inner">
            <div>
              <h2 className="sv2-cta__title">
                Ready to plan your<br /><em>Sri Lanka journey?</em>
              </h2>
              <p className="sv2-cta__sub">
                Reach us on WhatsApp for instant confirmation — or call directly. We respond within minutes, 24 hours a day.
              </p>
            </div>
            <div className="sv2-cta__btns">
              <button
                className="sv2-cta-btn sv2-cta-btn--wa"
                onClick={() => {
                  const msg = encodeURIComponent("Hi! I'd like to plan a trip with Taxi Service Ahangama. Can you help?");
                  window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </button>
              <button className="sv2-cta-btn sv2-cta-btn--call" onClick={handleCall}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +94 71 991 6072
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}