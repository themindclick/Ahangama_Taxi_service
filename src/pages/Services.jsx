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
  .sv2-orb-1 { width:500px;height:500px;background:rgba(0,31,107,.6); top:-150px;left:-100px; }
  .sv2-orb-2 { width:400px;height:400px;background:rgba(201,168,76,.15);bottom:-100px;right:10%; }

  @keyframes sv2OrbFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50%      { transform: translateY(-30px) scale(1.05); }
  }

  .sv2-particle {
    position: absolute; border-radius: 50%; pointer-events: none;
    animation: sv2ParticleRise linear infinite;
  }

  .sv2-hero {
    position: relative; z-index: 1;
    display: grid; 
    grid-template-columns: 1fr 1fr;
    min-height: 80vh; 
  }
  
  @media(max-width:860px){ 
    .sv2-hero { 
       grid-template-columns: 1fr; 
       min-height: auto; 
       text-align: center;
    } 
  }

  .sv2-hero__left {
    position: relative; padding: 140px 64px 100px;
    display: flex; flex-direction: column; justify-content: center;
  }
  @media(max-width:860px){ 
    .sv2-hero__left { 
      padding: 80px 24px 40px; 
      align-items: center;
    } 
  }

  .sv2-hero__inner { position: relative; z-index: 5; }

  .sv2-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 10px; font-weight: 700; letter-spacing: .24em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 28px;
  }

  .sv2-hero__title {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: clamp(2.5rem, 6vw, 5.5rem); line-height: 1.1;
    color: #fff; margin: 0 0 24px; letter-spacing: -.02em;
  }
  .sv2-hero__title em {
    display: block; font-style: italic; font-weight: 900;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sv2-hero__desc {
    font-size: .95rem; color: rgba(255,255,255,.55); line-height: 1.8;
    max-width: 420px; font-weight: 300; margin-bottom: 44px;
  }

  /* Right Side Photo Container */
  .sv2-hero__right {
    position: relative; 
    display: flex; align-items: center; justify-content: center;
    min-height: 400px;
  }
  
  @media(max-width:860px){
    .sv2-hero__right {
      min-height: 300px;
      margin-bottom: 40px;
    }
  }

  .sv2-hero__img {
    width: 90%;
    height: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(0 20px 50px rgba(0,0,0,0.5));
    z-index: 2;
  }

  .sv2-section {
    position: relative; z-index: 1;
    max-width: 1200px; margin: 0 auto; padding: 60px 24px 100px;
  }

  .sv2-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
  }

  .sv2-card {
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px;
    padding: 32px;
    transition: all 0.3s ease;
  }
`;

export default function Services() {
  const handleWhatsApp = (title) => {
    const msg = encodeURIComponent(`Hi! I'd like to enquire about *${title}*.`);
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="sv2-root">
        <div className="sv2-bg">
          <div className="sv2-orb sv2-orb-1" />
          <div className="sv2-orb sv2-orb-2" />
        </div>

        {/* HERO SECTION */}
        <section className="sv2-hero">
          <div className="sv2-hero__left">
            <div className="sv2-hero__inner">
              <p className="sv2-eyebrow">Premium Transport</p>
              <h1 className="sv2-hero__title">
                Six Ways to <em>Move You</em>
              </h1>
              <p className="sv2-hero__desc">
                From Airport transfers to Safari expeditions. Every journey across Ahangama and Sri Lanka handled with precision.
              </p>
            </div>
          </div>

          <div className="sv2-hero__right">
            <div 
              className="sv2-hero__img" 
              style={{ backgroundImage: "url('/assets/taxi.png')" }} 
            />
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section className="sv2-section">
          <div className="sv2-grid">
            {services.map((s) => (
              <div key={s.id} className="sv2-card">
                <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '8px' }}>{s.title}</h3>
                <p style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '16px' }}>{s.subtitle}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '24px' }}>{s.desc}</p>
                <button 
                  style={{ 
                    width: '100%', padding: '12px', background: 'var(--gold)', 
                    border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' 
                  }}
                  onClick={() => handleWhatsApp(s.title)}
                >
                  Enquire Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <section style={{ textAlign: 'center', padding: '80px 24px', background: 'rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '24px' }}>Plan Your Adventure</h2>
          <button 
            style={{ 
              background: '#25D366', color: '#fff', padding: '16px 32px', 
              borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' 
            }}
            onClick={() => window.open(`https://wa.me/${businessInfo.whatsapp}`, "_blank")}
          >
            Chat on WhatsApp
          </button>
        </section>
      </div>
    </>
  );
}