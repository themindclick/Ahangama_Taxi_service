// FleetPage.jsx — Redesigned for Taxi Service Ahangama
// Data source: src/data/vehicles.jsx
// Default: shows ALL vehicles; filter by category tab or search

import React, { useState, useMemo } from "react";
import { vehicles, serviceTypes, businessInfo } from "../data/Vehicles";

const FleetPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleWhatsApp = (vehicleLabel) => {
    const msg = encodeURIComponent(
      `Hi! I'm interested in booking the *${vehicleLabel}*. Can you provide more details?`
    );
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:+${businessInfo.whatsapp}`;
  };

  const filteredVehicles = useMemo(() => {
    let list = vehicles;
    if (activeCategory !== "all") {
      list = list.filter((v) => v.categories.includes(activeCategory));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (v) =>
          v.label.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Tabs: "All" + non-scroll serviceTypes only
  const tabs = [
    { id: "all", label: "All Vehicles", icon: "🚗" },
    ...serviceTypes.filter((s) => !s.scroll),
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        :root {
          --gold:    #EAB875;
          --sky:     #C3E7F1;
          --navy:    #005acd;
          --navy-dk: #003d8f;
          --navy-dp: #001f6b;
          --bg:      #eef2fa;
        }

        .fl { font-family:'DM Sans',sans-serif; background:var(--bg); min-height:100vh; }

        /* ─── HERO ────────────────────────────────── */
        .fl-hero {
          position:relative; overflow:hidden; text-align:center;
          padding:88px 24px 110px;
          background:linear-gradient(140deg,var(--navy-dp) 0%,var(--navy) 55%,#0072ff 100%);
        }
        .fl-hero__b1,.fl-hero__b2{position:absolute;border-radius:50%;filter:blur(88px);pointer-events:none;}
        .fl-hero__b1{width:480px;height:480px;top:-130px;left:-80px;background:rgba(234,184,117,.13);}
        .fl-hero__b2{width:380px;height:380px;bottom:-70px;right:-60px;background:rgba(195,231,241,.11);}
        .fl-hero__noise{
          position:absolute;inset:0;opacity:.035;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .fl-hero__arc{position:absolute;bottom:-1px;left:0;right:0;height:70px;background:var(--bg);clip-path:ellipse(58% 100% at 50% 100%);}
        .fl-hero__inner{position:relative;z-index:5;}

        .fl-pill{
          display:inline-flex;align-items:center;gap:8px;
          border:1px solid rgba(234,184,117,.5);background:rgba(255,255,255,.1);backdrop-filter:blur(8px);
          border-radius:99px;padding:6px 18px;margin-bottom:18px;
          font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);
        }
        .fl-pill__dot{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:fldot 1.8s ease-in-out infinite;}
        @keyframes fldot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.65)}}

        .fl-hero__title{
          font-family:'Playfair Display',serif;font-weight:900;
          font-size:clamp(2.3rem,6vw,4.4rem);line-height:1.06;color:#fff;margin:0 0 14px;
          animation:flrise .9s cubic-bezier(.22,1,.36,1) both;
        }
        .fl-hero__title em{color:var(--gold);font-style:italic;}
        .fl-hero__sub{
          color:rgba(195,231,241,.9);font-size:1rem;max-width:540px;margin:0 auto 42px;line-height:1.7;
          animation:flrise .9s .12s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes flrise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}

        .fl-stats{display:flex;justify-content:center;gap:44px;flex-wrap:wrap;}
        .fl-stat__num{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:900;color:var(--gold);line-height:1;}
        .fl-stat__lbl{font-size:10px;font-weight:700;color:rgba(195,231,241,.7);letter-spacing:.1em;text-transform:uppercase;margin-top:4px;}

        /* ─── STICKY BAR ──────────────────────────── */
        .fl-bar{
          position:sticky;top:0;z-index:40;
          background:rgba(255,255,255,.97);backdrop-filter:blur(14px);
          border-bottom:1.5px solid #dde5f4;
          box-shadow:0 4px 20px rgba(0,31,107,.07);
        }
        .fl-bar__inner{
          max-width:1180px;margin:0 auto;padding:14px 24px;
          display:flex;align-items:center;gap:14px;flex-wrap:wrap;
        }

        .fl-tabs{display:flex;gap:6px;flex-wrap:wrap;flex:1;}
        .fl-tab{
          display:flex;align-items:center;gap:6px;padding:8px 16px;
          border-radius:10px;border:2px solid transparent;background:#f0f4fa;cursor:pointer;
          font-family:'DM Sans',sans-serif;font-size:.8rem;font-weight:700;color:#64748b;
          transition:all .2s;white-space:nowrap;
        }
        .fl-tab:hover{background:#e4ecfa;color:var(--navy);}
        .fl-tab.active{background:var(--navy);color:#fff;border-color:var(--navy);box-shadow:0 4px 14px rgba(0,90,205,.25);}
        .fl-tab__icon{font-size:15px;}

        .fl-search{position:relative;min-width:200px;}
        .fl-search__ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#94a3b8;pointer-events:none;}
        .fl-search__input{
          width:100%;padding:10px 16px 10px 40px;
          border:2px solid #e2eaf6;border-radius:12px;background:#f7f9ff;
          font-family:'DM Sans',sans-serif;font-size:.85rem;color:#1e293b;outline:none;
          transition:border-color .2s,box-shadow .2s;box-sizing:border-box;
        }
        .fl-search__input:focus{border-color:var(--navy);background:#fff;box-shadow:0 0 0 4px rgba(0,90,205,.08);}
        .fl-search__input::placeholder{color:#c4cde0;}

        /* ─── META ────────────────────────────────── */
        .fl-meta{max-width:1180px;margin:0 auto;padding:20px 24px 6px;font-size:.83rem;color:#64748b;}
        .fl-meta b{color:#0c1a3d;font-weight:800;}

        /* ─── GRID ────────────────────────────────── */
        .fl-grid{
          max-width:1180px;margin:0 auto;padding:6px 24px 80px;
          display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:26px;
        }

        /* ─── VEHICLE CARD ────────────────────────── */
        .vc{
          background:#fff;border-radius:22px;overflow:hidden;border:2px solid #e8edf8;
          transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .22s;
          animation:vcup .6s ease both;
        }
        @keyframes vcup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .vc:hover{transform:translateY(-8px);box-shadow:0 22px 56px rgba(0,31,107,.13);border-color:var(--sky);}

        .vc__img-box{position:relative;aspect-ratio:16/9;overflow:hidden;background:linear-gradient(135deg,#dce7f5,#c8d8ee);}
        .vc__img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease;}
        .vc:hover .vc__img{transform:scale(1.07);}

        .vc__overlay{
          position:absolute;inset:0;background:rgba(0,20,80,.54);backdrop-filter:blur(3px);
          display:flex;align-items:center;justify-content:center;gap:12px;
          opacity:0;transition:opacity .28s;
        }
        .vc:hover .vc__overlay{opacity:1;}
        .vc-ov-btn{
          width:46px;height:46px;border-radius:50%;border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          transition:transform .2s,filter .2s;box-shadow:0 4px 14px rgba(0,0,0,.28);
        }
        .vc-ov-btn:hover{transform:scale(1.18);filter:brightness(1.1);}

        .vc__price-badge{
          position:absolute;bottom:10px;left:10px;
          background:rgba(255,255,255,.93);backdrop-filter:blur(6px);
          padding:4px 12px;border-radius:99px;
          font-size:9px;font-weight:800;color:var(--navy);letter-spacing:.08em;text-transform:uppercase;
        }
        .vc__cat-badge{
          position:absolute;top:10px;right:10px;background:var(--navy);
          padding:4px 12px;border-radius:99px;
          font-size:9px;font-weight:800;color:#fff;letter-spacing:.06em;text-transform:uppercase;
        }

        .vc__body{padding:18px 18px 16px;}
        .vc__name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;color:#0c1a3d;margin-bottom:2px;transition:color .2s;}
        .vc:hover .vc__name{color:var(--navy);}
        .vc__model{font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:.07em;margin-bottom:14px;}

        .vc__specs{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#f6f9ff;border-radius:13px;padding:12px;margin-bottom:13px;}
        .vc-sp{display:flex;align-items:flex-start;gap:8px;}
        .vc-sp__ico{width:30px;height:30px;border-radius:9px;background:rgba(0,90,205,.1);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;margin-top:1px;}
        .vc-sp__lbl{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:#94a3b8;}
        .vc-sp__val{font-size:11px;font-weight:700;color:#1e293b;line-height:1.3;}

        .vc__features{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:13px;}
        .vc__feat{padding:3px 11px;border-radius:99px;background:rgba(195,231,241,.35);border:1px solid rgba(0,90,205,.12);font-size:10px;font-weight:700;color:var(--navy);}

        .vc__note{font-size:9.5px;color:#94a3b8;font-style:italic;line-height:1.5;border-left:3px solid var(--gold);padding-left:10px;margin-bottom:14px;}

        .vc__actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .vc-btn{
          padding:10px 14px;border:none;border-radius:12px;cursor:pointer;
          font-family:'DM Sans',sans-serif;font-weight:700;font-size:.82rem;
          display:flex;align-items:center;justify-content:center;gap:6px;
          transition:filter .2s,transform .15s;
        }
        .vc-btn:hover{filter:brightness(1.07);transform:scale(1.02);}
        .vc-btn--wa{background:linear-gradient(135deg,#25D366,#1da851);color:#fff;}
        .vc-btn--call{background:linear-gradient(135deg,var(--navy),var(--navy-dk));color:#fff;}

        /* ─── EMPTY ───────────────────────────────── */
        .fl-empty{grid-column:1/-1;text-align:center;padding:80px 20px;animation:vcup .6s ease both;}
        .fl-empty__icon{font-size:60px;margin-bottom:14px;}
        .fl-empty__title{font-family:'Playfair Display',serif;font-size:1.7rem;font-weight:900;color:#0c1a3d;margin-bottom:8px;}
        .fl-empty__sub{font-size:.88rem;color:#64748b;margin-bottom:22px;}
        .fl-empty__btn{padding:11px 26px;background:var(--navy);color:#fff;border:none;border-radius:13px;font-family:'DM Sans',sans-serif;font-weight:700;cursor:pointer;font-size:.88rem;transition:filter .2s,transform .15s;}
        .fl-empty__btn:hover{filter:brightness(1.1);transform:scale(1.03);}

        /* ─── CTA ─────────────────────────────────── */
        .fl-cta{background:linear-gradient(135deg,var(--navy-dp) 0%,var(--navy) 100%);padding:80px 24px;text-align:center;position:relative;overflow:hidden;}
        .fl-cta__b1,.fl-cta__b2{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;background:rgba(234,184,117,.1);}
        .fl-cta__b1{width:400px;height:400px;top:-100px;right:-80px;}
        .fl-cta__b2{width:300px;height:300px;bottom:-60px;left:-60px;}
        .fl-cta__inner{position:relative;z-index:5;max-width:660px;margin:0 auto;}
        .fl-cta__title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;color:#fff;margin-bottom:12px;}
        .fl-cta__title em{color:var(--gold);font-style:italic;}
        .fl-cta__sub{color:rgba(195,231,241,.85);font-size:.9rem;margin-bottom:34px;line-height:1.65;}
        .fl-cta__btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;}
        .fl-cta-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border:none;border-radius:14px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:800;font-size:.93rem;transition:transform .2s,filter .2s;}
        .fl-cta-btn:hover{transform:scale(1.04);filter:brightness(1.08);}
        .fl-cta-btn--wa{background:linear-gradient(135deg,#25D366,#1da851);color:#fff;box-shadow:0 8px 26px rgba(37,211,102,.28);}
        .fl-cta-btn--call{background:#fff;color:var(--navy);box-shadow:0 8px 26px rgba(0,0,0,.1);}
      `}</style>

      <div className="fl">

        {/* ── Hero ── */}
        <div className="fl-hero">
          <div className="fl-hero__b1" /><div className="fl-hero__b2" />
          <div className="fl-hero__noise" />
          <div className="fl-hero__inner">
            <div className="fl-pill"><span className="fl-pill__dot" />Ahangama · Galle · Sri Lanka</div>
            <h1 className="fl-hero__title">Our Complete <em>Fleet</em></h1>
            <p className="fl-hero__sub">
              From budget rides to large vans, tuk tuks to scooters — the perfect vehicle for every journey across Sri Lanka.
            </p>
            <div className="fl-stats">
              <div className="fl-stat"><p className="fl-stat__num">{vehicles.length}+</p><p className="fl-stat__lbl">Vehicles</p></div>
              <div className="fl-stat"><p className="fl-stat__num">24/7</p><p className="fl-stat__lbl">Available</p></div>
              <div className="fl-stat"><p className="fl-stat__num">100%</p><p className="fl-stat__lbl">Insured</p></div>
            </div>
          </div>
          <div className="fl-hero__arc" />
        </div>

        {/* ── Sticky Filter Bar ── */}
        <div className="fl-bar">
          <div className="fl-bar__inner">
            <div className="fl-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`fl-tab${activeCategory === tab.id ? " active" : ""}`}
                >
                  <span className="fl-tab__icon">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="fl-search">
              <svg className="fl-search__ico" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search vehicles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="fl-search__input"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="fl-meta">
          Showing <b>{filteredVehicles.length}</b> of <b>{vehicles.length}</b> vehicles
        </p>

        {/* ── Vehicle Grid ── */}
        <div className="fl-grid">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((v, i) => (
              <div key={v.id} className="vc" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="vc__img-box">
                  <img src={v.image} alt={v.label} className="vc__img" />
                  <div className="vc__overlay">
                    <button className="vc-ov-btn" style={{ background: "#25D366" }} onClick={() => handleWhatsApp(v.label)}>
                      <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </button>
                    <button className="vc-ov-btn" style={{ background: "#ef4444" }} onClick={handleCall}>
                      <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                  <span className="vc__price-badge">{v.price}</span>
                  <span className="vc__cat-badge">{v.label}</span>
                </div>

                <div className="vc__body">
                  <h3 className="vc__name">{v.label}</h3>
                  <p className="vc__model">{v.model}</p>

                  <div className="vc__specs">
                    <div className="vc-sp">
                      <div className="vc-sp__ico">👥</div>
                      <div>
                        <p className="vc-sp__lbl">Capacity</p>
                        <p className="vc-sp__val">{v.capacity}</p>
                      </div>
                    </div>
                    <div className="vc-sp">
                      <div className="vc-sp__ico">🧳</div>
                      <div>
                        <p className="vc-sp__lbl">Baggage</p>
                        <p className="vc-sp__val">{v.baggage}</p>
                      </div>
                    </div>
                  </div>

                  {v.features && v.features.length > 0 && (
                    <div className="vc__features">
                      {v.features.map((f) => (
                        <span key={f} className="vc__feat">✓ {f}</span>
                      ))}
                    </div>
                  )}

                  <p className="vc__note">{v.note}</p>

                  <div className="vc__actions">
                    <button className="vc-btn vc-btn--wa" onClick={() => handleWhatsApp(v.label)}>
                      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </button>
                    <button className="vc-btn vc-btn--call" onClick={handleCall}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="fl-empty">
              <div className="fl-empty__icon">🔍</div>
              <h3 className="fl-empty__title">No vehicles found</h3>
              <p className="fl-empty__sub">Try a different category or clear your search</p>
              <button className="fl-empty__btn" onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}>
                Show All Vehicles
              </button>
            </div>
          )}
        </div>

        {/* ── CTA Banner ── */}
        <div className="fl-cta">
          <div className="fl-cta__b1" /><div className="fl-cta__b2" />
          <div className="fl-cta__inner">
            <h2 className="fl-cta__title">Can't Find What <em>You Need?</em></h2>
            <p className="fl-cta__sub">
              Contact us directly — we'll match you to the perfect vehicle and can arrange
              custom packages for long-term rentals, tours &amp; group travel.
            </p>
            <div className="fl-cta__btns">
              <button className="fl-cta-btn fl-cta-btn--wa" onClick={() => handleWhatsApp("a vehicle")}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Message on WhatsApp
              </button>
              <button className="fl-cta-btn fl-cta-btn--call" onClick={handleCall}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +94 71 991 6072
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default FleetPage;