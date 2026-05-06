// FleetPage.jsx — Redesigned for Taxi Service Ahangama
import React, { useState, useMemo, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { vehicles, serviceTypes, businessInfo } from "../data/vehicles";

const libraries = ["places"];



const FleetPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // NEW: Selection & Form states to match Hero features
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerCount, setPassengerCount] = useState("");  // ← moved inside
  const [bagsCount, setBagsCount] = useState("");            // ← moved inside
  const [bagsSize, setBagsSize] = useState("");


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: businessInfo.googleApiKey,
    libraries,
  });

  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);

  const onPickupChanged = () => {
    if (pickupAutocompleteRef.current !== null) {
      const place = pickupAutocompleteRef.current.getPlace();
      setPickupLocation(place.formatted_address || place.name);
    }
  };

  const onDropChanged = () => {
    if (dropAutocompleteRef.current !== null) {
      const place = dropAutocompleteRef.current.getPlace();
      setDropLocation(place.formatted_address || place.name);
    }
  };

const handleWhatsApp = () => {
  if (!selectedVehicle) return;

  const bagsDetail = [bagsCount, bagsSize].filter(Boolean).join(" × ") || "Not specified";

  const bookingDetails = [
    { label: "Vehicle",    value: `${selectedVehicle.label} (${selectedVehicle.model})` },
    { label: "Pickup",     value: pickupLocation  || "Not specified" },
    { label: "Drop",       value: dropLocation    || "Not specified" },
    { label: "Date/Time",  value: dateTime        || "Not specified" },
    { label: "Customer",   value: passengerName   || "Not specified" },
    { label: "Passengers", value: passengerCount  || "Not specified" },
    { label: "Baggage",    value: bagsDetail },
  ];

  const formattedDetails = bookingDetails
    .map(({ label, value }) => `*${label}:* ${value}`)
    .join("\n");

  const message = `Hello! I'd like to book a ride.\n\n${formattedDetails}`;

  window.open(
    `https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
};

  const handleCall = () => {
    window.location.href = `tel:${businessInfo.phone}`;
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

        .fl-search{position:relative;min-width:200px;}
        .fl-search__ico{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#94a3b8;pointer-events:none;}
        .fl-search__input{
          width:100%;padding:10px 16px 10px 40px;
          border:2px solid #e2eaf6;border-radius:12px;background:#f7f9ff;
          font-family:'DM Sans',sans-serif;font-size:.85rem;color:#1e293b;outline:none;
        }

        /* ─── GRID (UPDATED FOR 2 COL MOBILE) ──────── */
        .fl-grid{
          max-width:1180px;margin:0 auto;padding:6px 24px 80px;
          display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:26px;
        }
        @media(max-width:640px) {
          .fl-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 6px 12px 60px; }
          .vc__body { padding: 12px !important; }
          .vc__name { font-size: 1rem !important; }
          .vc__specs { padding: 8px !important; gap: 5px !important; }
          .vc-sp__ico { width: 22px !important; height: 22px !important; font-size: 10px !important; }
          .vc-sp__val { font-size: 9px !important; }
          .vc__note, .vc__features { display: none; }
          .vc__actions { grid-template-columns: 1fr; }
        }

        /* ─── VEHICLE CARD ────────────────────────── */
        .vc{
          background:#fff;border-radius:22px;overflow:hidden;border:2px solid #e8edf8;
          transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s,border-color .22s;
          cursor: pointer; animation:vcup .6s ease both;
        }
        .vc:hover{transform:translateY(-8px);box-shadow:0 22px 56px rgba(0,31,107,.13);border-color:var(--sky);}

        .vc__img-box{position:relative;aspect-ratio:16/11;overflow:hidden;background:linear-gradient(135deg,#dce7f5,#c8d8ee);}
        .vc__img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease;}
        
        .vc__price-badge{
          position:absolute;bottom:10px;left:10px;
          background:rgba(255,255,255,.93);backdrop-filter:blur(6px);
          padding:4px 12px;border-radius:99px;
          font-size:9px;font-weight:800;color:var(--navy);text-transform:uppercase;
        }

        .vc__body{padding:18px;}
        .vc__name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:900;color:#0c1a3d;margin-bottom:2px;}
        .vc__model{font-size:10px;font-weight:700;color:#9ca3af;margin-bottom:14px;}

        .vc__specs{display:grid;grid-template-columns:1fr 1fr;gap:8px;background:#f6f9ff;border-radius:13px;padding:12px;margin-bottom:13px;}
        .vc-sp{display:flex;align-items:center;gap:8px;}
        .vc-sp__ico{width:30px;height:30px;border-radius:9px;background:rgba(0,90,205,.1);display:flex;align-items:center;justify-content:center;font-size:13px;}
        .vc-sp__val{font-size:11px;font-weight:700;color:#1e293b;}

        .vc__actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
        .vc-btn{
          padding:10px;border:none;border-radius:10px;cursor:pointer;
          font-family:'DM Sans',sans-serif;font-weight:700;font-size:.75rem;
          display:flex;align-items:center;justify-content:center;gap:5px;
        }
        .vc-btn--wa{background:linear-gradient(135deg,#25D366,#1da851);color:#fff;}
        .vc-btn--call{background:var(--navy);color:#fff;}

        /* ─── MODAL POPUP STYLES ────────────────────── */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(12, 26, 61, 0.7);
          backdrop-filter: blur(6px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .modal-content {
          background: #fff; width: 100%; max-width: 550px; max-height: 90vh;
          border-radius: 24px; overflow-y: auto; position: relative;
          box-shadow: 0 30px 90px rgba(0,0,0,0.4);
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .modal-close {
          position: absolute; top: 20px; right: 20px; width: 32px; height: 32px;
          background: #f1f5f9; border-radius: 50%; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; z-index: 10;
        }

        .h-form { padding: 30px; border-top: 5px solid var(--gold); }
        .h-form__hd { display: flex; align-items: center; gap: 12px; margin-bottom: 25px; }
        .h-form__num {
          width: 36px; height: 36px; border-radius: 50%; background: var(--navy);
          color: #fff; font-weight: 900; display: flex; align-items: center; justify-content: center;
        }
        .h-form__title { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; }

        .h-fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        @media(max-width:480px){ .h-fgrid { grid-template-columns: 1fr; } }

        .h-fgroup { display: flex; flex-direction: column; gap: 6px; }
        .h-flabel { font-size: 9px; font-weight: 800; text-transform: uppercase; color: #64748b; }
        .h-finput {
          width: 100%; padding: 12px; border: 2px solid #dde5f4; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; outline: none; font-size: 0.85rem;
        }
        .h-finput:focus { border-color: var(--navy); }

        .h-actions { display: flex; gap: 12px; }
        .btn-wa { flex: 1; padding: 14px; background: #25D366; color: #fff; border: none; border-radius: 12px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-call { padding: 14px; border: 2px solid var(--navy); border-radius: 12px; color: var(--navy); font-weight: 800; background: #fff; cursor: pointer; }

        /* ─── REST ─── */
        .fl-cta{background:linear-gradient(135deg,var(--navy-dp) 0%,var(--navy) 100%);padding:80px 24px;text-align:center;position:relative;overflow:hidden;}
        .fl-cta__inner{position:relative;z-index:5;max-width:660px;margin:0 auto;}
        .fl-cta__title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;color:#fff;margin-bottom:12px;}
        .fl-cta__sub{color:rgba(195,231,241,.85);font-size:.9rem;margin-bottom:34px;}
        .fl-cta-btn--wa{background:linear-gradient(135deg,#25D366,#1da851);color:#fff; padding: 14px 26px; border-radius: 14px; border: none; font-weight: 800; cursor: pointer;}
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
              From budget rides to large vans, tuk tuks to scooters — the perfect vehicle for every journey.
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

        <p className="fl-meta">
          Showing <b>{filteredVehicles.length}</b> of <b>{vehicles.length}</b> vehicles
        </p>

        {/* ── Vehicle Grid ── */}
        <div className="fl-grid">
          {filteredVehicles.map((v, i) => (
            <div key={v.id} className="vc" onClick={() => setSelectedVehicle(v)} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="vc__img-box">
                <img src={v.image} alt={v.label} className="vc__img" />
                <span className="vc__price-badge">{v.price}</span>
              </div>
              <div className="vc__body">
                <h3 className="vc__name">{v.label}</h3>
                <p className="vc__model">{v.model}</p>
                <div className="vc__specs">
                  <div className="vc-sp">
                    <div className="vc-sp__ico">👥</div>
                    <p className="vc-sp__val">{v.capacity}</p>
                  </div>
                  <div className="vc-sp">
                    <div className="vc-sp__ico">🧳</div>
                    <p className="vc-sp__val">{v.baggage}</p>
                  </div>
                </div>
                <div className="vc__actions">
                  <button className="vc-btn vc-btn--wa">Book Now</button>
                  <button className="vc-btn vc-btn--call" onClick={(e) => { e.stopPropagation(); handleCall(); }}>Call</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div className="fl-cta">
          <div className="fl-cta__inner">
            <h2 className="fl-cta__title">Can't Find What <em>You Need?</em></h2>
            <p className="fl-cta__sub">Contact us directly — we'll match you to the perfect vehicle.</p>
            <button className="fl-cta-btn--wa" onClick={handleCall}>Contact Support</button>
          </div>
        </div>

        {/* ── BOOKING MODAL POPUP ── */}
        {selectedVehicle && (
                  <div className="modal-overlay" onClick={() => setSelectedVehicle(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                      <button className="modal-close" onClick={() => setSelectedVehicle(null)}>✕</button>
                      
                      <div className="h-form">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                          <div style={{ 
                            background: 'var(--navy)', color: '#fff', width: '40px', height: '40px', 
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 'bold', fontSize: '1.2rem'
                          }}>2</div>
                          <h2 className="h-section-title" style={{ margin: 0 }}>Confirm {selectedVehicle.label}</h2>
                        </div>
        
                        <div className="h-fgrid">
                          <div className="h-fgroup">
                            <label className="h-flabel">Pickup Location</label>
                            {isLoaded && (
                              <Autocomplete 
                                onLoad={ac => (pickupAutocompleteRef.current = ac)} 
                                onPlaceChanged={onPickupChanged}
                              >
                                <input type="text" placeholder="📍 Pickup point" className="h-finput" />
                              </Autocomplete>
                            )}
                          </div>
        
                          <div className="h-fgroup">
                            <label className="h-flabel">Drop Location</label>
                            {isLoaded && (
                              <Autocomplete 
                                onLoad={ac => (dropAutocompleteRef.current = ac)} 
                                onPlaceChanged={onDropChanged}
                              >
                                <input type="text" placeholder="🏁 Destination" className="h-finput" />
                              </Autocomplete>
                            )}
                          </div>
        
                          <div className="h-fgroup">
                            <label className="h-flabel">Date & Time</label>
                            <input type="datetime-local" className="h-finput" onChange={e => setDateTime(e.target.value)} />
                          </div>
        
                          <div className="h-fgroup">
                            <label className="h-flabel">Your Name</label>
                            <input type="text" placeholder="👤 Full Name" className="h-finput" onChange={e => setPassengerName(e.target.value)} />
                          </div>
        
                          <div className="h-fgroup">
                            <label className="h-flabel">No. of Passengers</label>
                            <input type="number" placeholder="How many people?" className="h-finput" min="1" onChange={e => setPassengerCount(e.target.value)} />
                          </div>
        
                          <div className="h-fgroup">
                            <label className="h-flabel">Baggage Details</label>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <input 
                                type="number" 
                                placeholder="Bags" 
                                className="h-finput" 
                                style={{ flex: 1 }} 
                                onChange={e => setBagsCount(e.target.value)} 
                              />
                              <select className="h-finput" style={{ flex: 1.5 }} onChange={e => setBagsSize(e.target.value)}>
                                <option value="">Size...</option>
                                <option value="Small">Small (Hand)</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large / XL</option>
                              </select>
                            </div>
                          </div>
                        </div>
        
                        <div className="h-actions">
                          <button className="btn-wa" onClick={() => handleWhatsApp(false)}>Confirm via WhatsApp</button>
                          <button className="btn-call" onClick={handleCall}>Call Us</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
      </div>
    </>
  );
};

export default FleetPage;