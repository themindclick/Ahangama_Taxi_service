import React, { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .about-root *, .about-root *::before, .about-root *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }

  .about-root {
    --navy: #001F6B;
    --navy-deep: #000D40;
    --gold: #C9A84C;
    --gold-light: #F0C96A;
    font-family: 'DM Sans', sans-serif;
    background: #07102B;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  /* Background */
  .about-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 20% 50%, #0d2060 0%, #040d24 60%, #02081a 100%);
    overflow: hidden;
    z-index: 0;
    pointer-events: none;
  }

  .about-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }
  .about-orb-1 { width: 500px; height: 500px; background: rgba(0,31,107,0.6); top: -150px; left: -100px; animation: orbFloat 8s ease-in-out infinite; }
  .about-orb-2 { width: 400px; height: 400px; background: rgba(201,168,76,0.15); bottom: -100px; right: 10%; animation: orbFloat 8s ease-in-out infinite; animation-delay: -4s; }
  .about-orb-3 { width: 300px; height: 300px; background: rgba(0,60,150,0.4); top: 40%; right: -50px; animation: orbFloat 8s ease-in-out infinite; animation-delay: -2s; }

  @keyframes orbFloat {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%       { transform: translateY(-30px) scale(1.05); }
  }

  /* Section */
  .about-section {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 80px 20px;
  }

  .about-container {
    max-width: 1160px;
    margin: 0 auto;
    width: 100%;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  /* Image Side */
  .about-image-side {
    position: relative;
    perspective: 1000px;
    animation: fadeSlideLeft 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }

  @keyframes fadeSlideLeft {
    from { opacity: 0; transform: translateX(-60px) rotateY(15deg); }
    to   { opacity: 1; transform: translateX(0) rotateY(0deg); }
  }

  .about-image-wrapper {
    position: relative;
    filter: drop-shadow(0 40px 80px rgba(0,0,0,0.6)) drop-shadow(0 10px 20px rgba(0,31,107,0.4));
  }

  .about-image-frame {
    position: absolute;
    top: 20px; left: 20px;
    right: -20px; bottom: -20px;
    border-radius: 28px;
    border: 2px solid rgba(201,168,76,0.3);
    z-index: -1;
  }

  .about-corner-tl,
  .about-corner-br {
    position: absolute;
    width: 40px; height: 40px;
    z-index: 5;
  }
  .about-corner-tl {
    top: -8px; left: -8px;
    border-top: 2px solid var(--gold);
    border-left: 2px solid var(--gold);
    border-radius: 4px 0 0 0;
  }
  .about-corner-br {
    bottom: -8px; right: -8px;
    border-bottom: 2px solid var(--gold);
    border-right: 2px solid var(--gold);
    border-radius: 0 0 4px 0;
  }

  .about-image-card {
    position: relative;
    width: 100%;
    aspect-ratio: 4/5;
    border-radius: 28px;
    overflow: hidden;
    transform-style: preserve-3d;
    transform: rotateY(-4deg) rotateX(2deg);
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1);
    cursor: pointer;
  }

  .about-image-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.3) 100%);
    z-index: 2;
    border-radius: 28px;
    pointer-events: none;
  }

  .about-image-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    border: 1px solid rgba(255,255,255,0.25);
    z-index: 3;
    pointer-events: none;
  }

  .about-image-card img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    filter: saturate(0.9) contrast(1.05);
    transition: transform 0.6s ease, filter 0.4s ease;
  }

  .about-image-card:hover img {
    transform: scale(1.04);
    filter: saturate(1.1) contrast(1.05);
  }

  /* Badge */
  .about-badge {
    position: absolute;
    bottom: -24px;
    right: -28px;
    z-index: 10;
    animation: badgeFloat 3s ease-in-out infinite 1s;
  }

  @keyframes badgeFloat {
    0%, 100% { transform: translateY(0px) rotate(-2deg); }
    50%       { transform: translateY(-8px) rotate(2deg); }
  }

  .about-badge-inner {
    background: linear-gradient(135deg, var(--gold) 0%, #E8B842 50%, var(--gold-light) 100%);
    padding: 22px 26px;
    border-radius: 20px;
    text-align: center;
    box-shadow:
      0 20px 40px rgba(201,168,76,0.4),
      0 0 0 1px rgba(255,255,255,0.3),
      inset 0 1px 0 rgba(255,255,255,0.5),
      inset 0 -2px 4px rgba(0,0,0,0.15);
    position: relative;
    overflow: hidden;
  }

  .about-badge-inner::before {
    content: '';
    position: absolute;
    top: 0; left: -60%;
    width: 50%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: badgeShine 3s ease-in-out infinite 2s;
  }

  @keyframes badgeShine {
    0%   { left: -60%; }
    100% { left: 160%; }
  }

  .about-badge-number {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--navy-deep);
    line-height: 1;
    display: block;
  }

  .about-badge-label {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: var(--navy-deep);
    display: block;
    margin-top: 4px;
  }

  /* Content Side */
  .about-content-side {
    animation: fadeSlideRight 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  @keyframes fadeSlideRight {
    from { opacity: 0; transform: translateX(60px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .about-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: var(--gold);
    margin-bottom: 20px;
  }

  .about-eyebrow::before {
    content: '';
    display: block;
    width: 30px;
    height: 1px;
    background: var(--gold);
  }

  .about-title {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 700;
    color: #fff;
    line-height: 1.15;
    margin-bottom: 28px;
  }

  .about-title em {
    font-style: italic;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .about-description {
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
    line-height: 1.85;
    margin-bottom: 40px;
    font-weight: 300;
  }

  .about-features {
    display: grid;
    gap: 16px;
  }

  .about-feature-card {
    display: flex;
    gap: 18px;
    align-items: flex-start;
    padding: 20px 22px;
    border-radius: 16px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: default;
  }

  .about-feature-card:nth-child(1) { animation: cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
  .about-feature-card:nth-child(2) { animation: cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) 0.65s both; }
  .about-feature-card:nth-child(3) { animation: cardReveal 0.6s cubic-bezier(0.22,1,0.36,1) 0.8s both; }

  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .about-feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: linear-gradient(180deg, var(--gold), var(--gold-light));
    border-radius: 3px 0 0 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .about-feature-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  .about-feature-card:hover {
    transform: translateX(6px) translateY(-2px);
    background: rgba(255,255,255,0.08);
    border-color: rgba(201,168,76,0.3);
    box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,168,76,0.1);
  }

  .about-feature-card:hover::before { opacity: 1; }
  .about-feature-card:hover::after  { opacity: 1; }

  .about-check-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    font-size: 0.8rem;
    font-weight: 900;
    color: var(--navy-deep);
    box-shadow: 0 4px 12px rgba(201,168,76,0.4);
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .about-feature-card:hover .about-check-icon {
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 6px 20px rgba(201,168,76,0.6);
  }

  .about-feature-text { position: relative; z-index: 1; }

  .about-feature-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
  }

  .about-feature-desc {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.6;
  }

  /* Particles */
  .about-particle {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    animation: particleRise linear infinite;
  }

  @keyframes particleRise {
    0%   { transform: translateY(0) scale(1); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-100%) scale(0.5); opacity: 0; }
  }

  @media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; gap: 60px; }
    .about-title { font-size: 2.2rem; }
    .about-badge { bottom: -18px; right: -14px; }
  }
`;

const features = [
  { title: "SLTDA Registered", desc: "Working exclusively with Sri Lanka Tourist Board verified professionals." },
  { title: "Ethical Standards", desc: "Strict Zero-Tolerance policy for Alcohol and Drugs among our fleet." },
  { title: "Direct Fleet", desc: "No middlemen. We manage every journey personally with verified vehicles." },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  left: Math.random() * 100,
  bottom: Math.random() * -20,
  isGold: Math.random() > 0.5,
  duration: Math.random() * 12 + 10,
  delay: Math.random() * -15,
}));

export default function About() {
  const cardRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const handleMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    };

    const handleLeave = () => {
      card.style.transform = "rotateY(-4deg) rotateX(2deg)";
    };

    wrapper.addEventListener("mousemove", handleMove);
    wrapper.addEventListener("mouseleave", handleLeave);
    return () => {
      wrapper.removeEventListener("mousemove", handleMove);
      wrapper.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className="about-root">
      <style>{styles}</style>

      {/* Animated Background */}
      <div className="about-bg">
        <div className="about-orb about-orb-1" />
        <div className="about-orb about-orb-2" />
        <div className="about-orb about-orb-3" />
        {particles.map((p) => (
          <div
            key={p.id}
            className="about-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              background: p.isGold ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.3)",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <section className="about-section">
        <div className="about-container">
          <div className="about-grid">

            {/* Left: Image */}
            <div className="about-image-side" ref={wrapperRef}>
              <div className="about-image-wrapper">
                <div className="about-image-frame" />
                <div className="about-corner-tl" />
                <div className="about-corner-br" />
                <div className="about-image-card" ref={cardRef}>
                  <img
                    src="/assets/dp.jpeg"
                    alt="Ahangama Coastal View"
                  />
                </div>
                <div className="about-badge">
                  <div className="about-badge-inner">
                    <span className="about-badge-number">10+</span>
                    <span className="about-badge-label">Years Excellence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="about-content-side">
              <p className="about-eyebrow">The Standard of Excellence</p>
              <h2 className="about-title">
                Managed by<br />
                <em>Uresh Ruchika</em>
              </h2>
              <p className="about-description">
                Taxi Service Ahangama has been a hallmark of reliability for over a decade. We specialize in
                providing the international community with a secure, professional, and ethical transport experience.
              </p>

              <div className="about-features">
                {features.map((item, i) => (
                  <div key={i} className="about-feature-card">
                    <div className="about-check-icon">✓</div>
                    <div className="about-feature-text">
                      <p className="about-feature-title">{item.title}</p>
                      <p className="about-feature-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}