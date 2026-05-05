// Hero.jsx — Modern redesign for Taxi Service Ahangama
import React, { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { vehicles, serviceTypes, businessInfo } from "../data/vehicles";

const libraries = ["places"];

export default function Hero() {
  const [activeService, setActiveService] = useState("airport");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Form States
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [passengerName, setPassengerName] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: businessInfo.googleApiKey,
    libraries,
  });

  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);

  const filteredVehicles = vehicles.filter((v) =>
    v.categories.includes(activeService)
  );

  const handleTabChange = (service) => {
    if (service.scroll) {
      const element = document.getElementById(service.target);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      setActiveService(service.id);
      setSelectedVehicle(null);
    }
  };

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
    const msg =
      `Hello! I'd like to book a ride.%0A%0A` +
      `*Vehicle:* ${selectedVehicle.label} (${selectedVehicle.model})%0A` +
      `*Pickup:* ${pickupLocation || "Not specified"}%0A` +
      `*Drop:* ${dropLocation || "Not specified"}%0A` +
      `*Date/Time:* ${dateTime || "Not specified"}%0A` +
      `*Customer:* ${passengerName || "Not specified"}`;
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = `tel:${businessInfo.phone}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        :root {
          --gold:       #EAB875;
          --gold-light: rgba(234,184,117,0.18);
          --sky:         #C3E7F1;
          --navy:       #005acd;
          --navy-dark:  #003d8f;
          --navy-deep:  #001f6b;
        }

        .h-root * { box-sizing: border-box; }
        .h-root { font-family: 'DM Sans', sans-serif; background: #eef2fa; min-height: 100vh; padding-bottom: 80px; }

        .h-banner {
          position: relative; min-height: 40vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; text-align: center;
        }
        .h-banner__bg {
          position: absolute; inset: 0;
          background: url('https://do6raq9h04ex.cloudfront.net/sites/8/2021/07/galle-fort-1050x700-1.jpg') center/cover no-repeat;
        }
        .h-banner__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(130deg, var(--navy-deep) 0%, var(--navy) 10%, rgba(0,90,205,.55) 100%);
        }
        .h-banner__noise {
          position: absolute; inset: 0; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .h-banner__arc {
          position: absolute; bottom: -1px; left: 0; right: 0; height: 72px;
          background: #eef2fa;
          clip-path: ellipse(58% 100% at 50% 100%);
        }
        .h-banner__inner { position: relative; z-index: 5; padding: 0 24px; }

        .h-pill {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(234,184,117,.45);
          background: rgba(255,255,255,.1); backdrop-filter: blur(8px);
          border-radius: 99px; padding: 6px 18px; margin-bottom: 18px;
          font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--gold);
        }
        .h-pill__dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
          animation: blink 1.8s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        .h-title {
          font-family: 'Playfair Display', serif; font-weight: 900;
          font-size: clamp(2.2rem, 5.5vw, 4.2rem); line-height: 1.06; color: #fff;
          margin: 0 0 14px; animation: riseUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        .h-title em { color: var(--gold); font-style: italic; }
        .h-sub {
          color: rgba(195,231,241,.9); font-size: 1.02rem; font-weight: 400;
          animation: riseUp .9s .15s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes riseUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }

        .h-shell {
          max-width: 1160px; margin: -52px auto 0; padding: 0 20px;
          position: relative; z-index: 20;
        }
        .h-card {
          background: #fff; border-radius: 28px;
          box-shadow: 0 28px 72px rgba(0,31,107,.14), 0 4px 14px rgba(0,0,0,.05);
          overflow: hidden;
        }

        .h-tabs { display: flex; overflow-x: auto; border-bottom: 1.5px solid #edf0f8; scrollbar-width: none; }
        .h-tabs::-webkit-scrollbar { display: none; }
        .h-tab {
          flex: 1; min-width: 105px; padding: 18px 10px;
          display: flex; flex-direction: column; align-items: center; gap: 5px;
          border: none; background: transparent; cursor: pointer; position: relative;
          font-family: 'DM Sans', sans-serif; transition: all .22s;
        }
        .h-tab::after {
          content: ''; position: absolute; bottom: 0; left: 16px; right: 16px;
          height: 3px; border-radius: 3px 3px 0 0; background: var(--navy);
          transform: scaleX(0); transition: transform .25s ease;
        }
        .h-tab.active { color: var(--navy); }
        .h-tab.active::after { transform: scaleX(1); }
        .h-tab:not(.active) { color: #a0aabb; }
        .h-tab:not(.active):hover { color: var(--navy); background: #f6f9ff; }
        .h-tab__icon { font-size: 20px; }
        .h-tab__label { font-size: 9.5px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }

        .h-section { padding: 40px 44px; }
        @media(max-width:768px){ .h-section { padding: 28px 14px; } }

        .h-eyebrow {
          display: flex; align-items: center; gap: 8px;
          font-size: 9.5px; font-weight: 800; letter-spacing: .18em;
          text-transform: uppercase; color: var(--gold); margin-bottom: 6px;
        }
        .h-eyebrow::before { content:''; width:22px; height:2px; background:var(--gold); border-radius:2px; }
        .h-section-title {
          font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 2.8vw, 2.2rem);
          font-weight: 900; color: #0c1a3d; margin-bottom: 4px;
        }
        .h-section-sub { font-size: .84rem; color: #6b7280; }
        .h-chip {
          background: linear-gradient(135deg, var(--navy), var(--navy-dark));
          color: #fff; font-size: 9.5px; font-weight: 800; letter-spacing: .1em;
          text-transform: uppercase; padding: 6px 16px; border-radius: 99px;
          white-space: nowrap;
        }
        .h-section-hd {
          display: flex; justify-content: space-between; align-items: flex-end;
          flex-wrap: wrap; gap: 16px; margin-bottom: 30px;
        }

        /* UPDATED GRID FOR MOBILE: 2 Columns */
        .h-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); 
          gap: 20px;
        }
        @media(max-width:640px) {
          .h-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .vc__body { padding: 12px !px !important; }
          .vc__name { font-size: 1rem !important; }
          .vc__specs { padding: 8px !important; gap: 5px !important; }
          .sp__icon { width: 22px !important; height: 22px !important; font-size: 10px !important; }
          .sp__val { font-size: 9px !important; }
          .vc__note { display: none; } /* Hide note on mobile grid to save space */
        }

        .vc {
          border-radius: 20px; border: 2px solid #e8edf8; background: #fff;
          overflow: hidden; cursor: pointer;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .22s;
          animation: fadeUp .65s ease both;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .vc:hover { transform: translateY(-8px); box-shadow: 0 22px 56px rgba(0,31,107,.14); border-color: var(--sky); }
        .vc.sel { border-color: var(--navy); }

        .vc__img-box { position: relative; aspect-ratio: 16/11; overflow: hidden; background: #dce7f5; }
        .vc__img { width:100%; height:100%; object-fit:cover; transition: transform .7s ease; }
        
        .vc-badge {
          position: absolute; font-size: 8px; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 99px;
        }
        .vc-badge--popular { top:10px; right:10px; background:#ef4444; color:#fff; }
        .vc-badge--tag { bottom:8px; left:8px; background:rgba(255,255,255,.94); color:var(--navy); }

        .vc__body { padding: 18px; }
        .vc__name {
          font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 900;
          color: #0c1a3d; margin-bottom: 2px;
        }
        .vc__model { font-size: 9px; font-weight: 700; color: #9ca3af; letter-spacing: .08em; margin-bottom: 12px; }

        .vc__specs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          background: #f6f9ff; border-radius: 12px; padding: 10px; margin-bottom: 10px;
        }
        .sp { display: flex; align-items: center; gap: 6px; }
        .sp__icon {
          width: 26px; height: 26px; border-radius: 7px;
          background: rgba(0,90,205,.1);
          display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0;
        }
        .sp__lbl { font-size: 8px; font-weight: 800; color: #94a3b8; text-transform: uppercase; }
        .sp__val { font-size: 10px; font-weight: 700; color: #1e293b; }

        .vc__note { font-size: 9px; color: #94a3b8; line-height: 1.4; font-style: italic; border-left: 2px solid var(--gold); padding-left: 8px; }

        /* ─── MODAL POPUP STYLES ────────────────────── */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(12, 26, 61, 0.7);
          backdrop-filter: blur(6px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .modal-content {
          background: #fff; width: 100%; max-width: 600px; max-height: 90vh;
          border-radius: 24px; overflow-y: auto; position: relative;
          box-shadow: 0 30px 90px rgba(0,0,0,0.4);
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideIn { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        .modal-close {
          position: absolute; top: 20px; right: 20px; width: 36px; height: 36px;
          background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10;
        }

        .h-form { padding: 30px; border-top: 5px solid var(--gold); }
        .h-form__hd { display: flex; align-items: center; gap: 14px; margin-bottom: 25px; }
        .h-form__num {
          width: 40px; height: 40px; border-radius: 50%; background: var(--navy);
          color: #fff; font-weight: 900; display: flex; align-items: center; justify-content: center;
        }
        .h-form__title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 900; color: #0c1a3d; }

        .h-fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        @media(max-width:480px){ .h-fgrid { grid-template-columns: 1fr; } }

        .h-fgroup { display: flex; flex-direction: column; gap: 6px; }
        .h-flabel { font-size: 9px; font-weight: 800; text-transform: uppercase; color: #64748b; }
        .h-finput {
          width: 100%; padding: 12px 16px; border: 2px solid #dde5f4; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; outline: none;
        }
        .h-finput:focus { border-color: var(--navy); }

        .h-actions { display: flex; gap: 12px; margin-top: 10px; }
        @media(max-width:480px){ .h-actions { flex-direction: column; } }

        .btn-wa {
          flex: 1; padding: 14px; background: linear-gradient(135deg, var(--navy), var(--navy-dark));
          color: #fff; border: none; border-radius: 12px; font-weight: 800; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-call {
          padding: 14px; border: 2px solid var(--navy); border-radius: 12px;
          color: var(--navy); font-weight: 800; background: #fff; cursor: pointer;
        }
        .h-trust { text-align: center; margin-top: 20px; font-size: 9px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
      `}</style>

      <section className="h-root">
        <div className="h-banner">
          <div className="h-banner__bg" />
          <div className="h-banner__overlay" />
          <div className="h-banner__noise" />
          <div className="h-banner__inner">
            <div className="h-pill">
              <span className="h-pill__dot" />
              Ahangama · Galle · Sri Lanka
            </div>
            <h1 className="h-title">
              Choose Your <em>Ride</em>
            </h1>
            <p className="h-sub">
              Select a category and your preferred vehicle<br />to start your journey in Sri Lanka.
            </p>
          </div>
          <div className="h-banner__arc" />
        </div>

        <div className="h-shell">
          <div className="h-card">
            <div className="h-tabs">
              {serviceTypes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleTabChange(s)}
                  className={`h-tab${activeService === s.id && !s.scroll ? " active" : ""}`}
                >
                  <span className="h-tab__icon">{s.icon}</span>
                  <span className="h-tab__label">{s.label}</span>
                </button>
              ))}
            </div>

            <div className="h-section">
              <div className="h-section-hd">
                <div>
                  <p className="h-eyebrow">Step 1</p>
                  <h2 className="h-section-title">Select Your Vehicle</h2>
                  <p className="h-section-sub">Click on a vehicle to book now.</p>
                </div>
                <span className="h-chip">{filteredVehicles.length} Options</span>
              </div>

              <div className="h-grid">
                {filteredVehicles.map((car, i) => (
                  <div
                    key={car.id}
                    onClick={() => setSelectedVehicle(car)}
                    className="vc"
                    style={{ animationDelay: `${i * 85}ms` }}
                  >
                    <div className="vc__img-box">
                      <img src={car.image} alt={car.label} className="vc__img" />
                      {car.popular && <span className="vc-badge vc-badge--popular">Popular</span>}
                      <span className="vc-badge vc-badge--tag">Premium</span>
                    </div>

                    <div className="vc__body">
                      <h3 className="vc__name">{car.label}</h3>
                      <p className="vc__model">{car.model}</p>
                      <div className="vc__specs">
                        <div className="sp">
                          <div className="sp__icon">👥</div>
                          <div><p className="sp__val">{car.capacity}</p></div>
                        </div>
                        <div className="sp">
                          <div className="sp__icon">🧳</div>
                          <div><p className="sp__val">{car.baggage}</p></div>
                        </div>
                      </div>
                      <p className="vc__note">{car.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MODAL POPUP FOR BOOKING ── */}
        {selectedVehicle && (
          <div className="modal-overlay" onClick={() => setSelectedVehicle(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedVehicle(null)}>✕</button>
              
              <div className="h-form">
                <div className="h-form__hd">
                  <div className="h-form__num">2</div>
                  <h2 className="h-form__title">Confirm {selectedVehicle.label}</h2>
                </div>

                <div className="h-fgrid">
                  {isLoaded ? (
                    <>
                      <div className="h-fgroup">
                        <label className="h-flabel">Pickup Location</label>
                        <Autocomplete
                          onLoad={(ac) => (pickupAutocompleteRef.current = ac)}
                          onPlaceChanged={onPickupChanged}
                        >
                          <input type="text" placeholder="📍 Pickup point" className="h-finput" />
                        </Autocomplete>
                      </div>
                      <div className="h-fgroup">
                        <label className="h-flabel">Drop Location</label>
                        <Autocomplete
                          onLoad={(ac) => (dropAutocompleteRef.current = ac)}
                          onPlaceChanged={onDropChanged}
                        >
                          <input type="text" placeholder="🏁 Destination" className="h-finput" />
                        </Autocomplete>
                      </div>
                    </>
                  ) : (
                    <p style={{ gridColumn: 'span 2', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>Loading Maps...</p>
                  )}

                  <div className="h-fgroup">
                    <label className="h-flabel">Date &amp; Time</label>
                    <input type="datetime-local" className="h-finput" onChange={(e) => setDateTime(e.target.value)} />
                  </div>

                  <div className="h-fgroup">
                    <label className="h-flabel">Your Name</label>
                    <input type="text" placeholder="👤 Full Name" className="h-finput" onChange={(e) => setPassengerName(e.target.value)} />
                  </div>
                </div>

                <div className="h-actions">
                  <button className="btn-wa" onClick={handleWhatsApp}>
                    Confirm via WhatsApp
                  </button>
                  <button className="btn-call" onClick={handleCall}>
                    Call Us
                  </button>
                </div>

                <p className="h-trust">✦ Safe · Reliable · 24/7 Service ✦</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}