// Hero.jsx — Modern redesign for Taxi Service Ahangama
// All original functions preserved. Pure UI upgrade only.

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
          --sky:        #C3E7F1;
          --navy:       #005acd;
          --navy-dark:  #003d8f;
          --navy-deep:  #001f6b;
        }

        .h-root * { box-sizing: border-box; }
        .h-root { font-family: 'DM Sans', sans-serif; background: #eef2fa; min-height: 100vh; padding-bottom: 80px; }

        /* ─── BANNER ─────────────────────────────────── */
        .h-banner {
          position: relative; min-height: 52vh;
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

        /* ─── SHELL ──────────────────────────────────── */
        .h-shell {
          max-width: 1160px; margin: -52px auto 0; padding: 0 20px;
          position: relative; z-index: 20;
        }
        .h-card {
          background: #fff; border-radius: 28px;
          box-shadow: 0 28px 72px rgba(0,31,107,.14), 0 4px 14px rgba(0,0,0,.05);
          overflow: hidden;
        }

        /* ─── TABS ───────────────────────────────────── */
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

        /* ─── SECTION WRAP ───────────────────────────── */
        .h-section { padding: 40px 44px; }
        @media(max-width:768px){ .h-section { padding: 28px 18px; } }

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

        /* ─── VEHICLE GRID ───────────────────────────── */
        .h-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(268px, 1fr)); gap: 24px;
        }

        /* ─── VEHICLE CARD ───────────────────────────── */
        .vc {
          border-radius: 20px; border: 2px solid #e8edf8; background: #fff;
          overflow: hidden; cursor: pointer;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .22s;
          animation: fadeUp .65s ease both;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .vc:hover { transform: translateY(-8px); box-shadow: 0 22px 56px rgba(0,31,107,.14); border-color: var(--sky); }
        .vc.sel {
          border-color: var(--navy);
          box-shadow: 0 0 0 4px rgba(0,90,205,.13), 0 22px 56px rgba(0,31,107,.14);
          transform: translateY(-4px) scale(1.013);
        }

        /* Image */
        .vc__img-box { position: relative; aspect-ratio: 16/10; overflow: hidden; background: #dce7f5; }
        .vc__img { width:100%; height:100%; object-fit:cover; transition: transform .7s ease; }
        .vc:hover .vc__img { transform: scale(1.08); }

        /* Overlay */
        .vc__overlay {
          position: absolute; inset: 0;
          background: rgba(0,20,80,.52); backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center; gap: 14px;
          opacity: 0; transition: opacity .28s;
        }
        .vc:hover .vc__overlay { opacity: 1; }

        .ov-btn {
          width: 46px; height: 46px; border-radius: 50%; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: transform .2s, filter .2s;
          box-shadow: 0 4px 16px rgba(0,0,0,.28);
        }
        .ov-btn:hover { transform: scale(1.18); filter: brightness(1.1); }

        /* Badges */
        .vc-badge {
          position: absolute; font-size: 9px; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 4px 12px; border-radius: 99px;
        }
        .vc-badge--popular { top:12px; right:12px; background:#ef4444; color:#fff; animation:blink 1.6s ease-in-out infinite; }
        .vc-badge--sel     { top:12px; left:12px; background:var(--navy); color:#fff; }
        .vc-badge--tag     { bottom:10px; left:10px; background:rgba(255,255,255,.94); color:var(--navy); }

        /* Body */
        .vc__body { padding: 20px 20px 18px; }
        .vc__name {
          font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 900;
          color: #0c1a3d; margin-bottom: 2px; transition: color .2s;
        }
        .vc:hover .vc__name, .vc.sel .vc__name { color: var(--navy); }
        .vc__model { font-size: 10px; font-weight: 700; color: #9ca3af; letter-spacing: .08em; margin-bottom: 15px; }

        .vc__specs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
          background: #f6f9ff; border-radius: 14px; padding: 13px; margin-bottom: 13px;
        }
        .sp { display: flex; align-items: center; gap: 8px; }
        .sp__icon {
          width: 30px; height: 30px; border-radius: 9px;
          background: rgba(0,90,205,.1);
          display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0;
        }
        .sp__lbl { font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; }
        .sp__val { font-size: 11px; font-weight: 700; color: #1e293b; }

        .vc__note {
          font-size: 10px; color: #94a3b8; line-height: 1.55; font-style: italic;
          border-left: 3px solid var(--gold); padding-left: 10px;
        }

        /* ─── BOOKING FORM ───────────────────────────── */
        .h-form {
          background: linear-gradient(170deg, #f4f7ff 0%, #e9effc 100%);
          padding: 40px 44px 48px; border-top: 4px solid var(--gold);
          animation: fadeUp .55s ease both;
        }
        @media(max-width:768px){ .h-form { padding: 28px 18px 36px; } }

        .h-form__hd { display: flex; align-items: center; gap: 14px; margin-bottom: 30px; }
        .h-form__num {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--navy), var(--navy-dark));
          color: #fff; font-weight: 900; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 18px rgba(0,90,205,.32);
        }
        .h-form__title {
          font-family: 'Playfair Display', serif; font-size: clamp(1.5rem, 2.5vw, 2rem);
          font-weight: 900; color: #0c1a3d;
        }

        .h-fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 26px; }
        @media(max-width:680px){ .h-fgrid { grid-template-columns: 1fr; } }

        .h-fgroup { display: flex; flex-direction: column; gap: 7px; }
        .h-flabel { font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .12em; color: #64748b; padding-left: 2px; }
        .h-finput {
          width: 100%; padding: 13px 18px;
          border: 2px solid #dde5f4; border-radius: 14px;
          background: #fff; font-family: 'DM Sans', sans-serif;
          font-size: .88rem; color: #1e293b; outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .h-finput:focus { border-color: var(--navy); box-shadow: 0 0 0 4px rgba(0,90,205,.08); }
        .h-finput::placeholder { color: #c4cde0; }

        .maps-spin {
          grid-column: span 2; text-align: center; padding: 18px;
          font-size: .8rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          color: #94a3b8; font-style: italic; animation: blink 1.8s ease-in-out infinite;
        }

        /* ─── ACTION BUTTONS ─────────────────────────── */
        .h-actions { display: flex; gap: 14px; }
        @media(max-width:580px){ .h-actions { flex-direction: column; } }

        .btn-wa {
          flex: 1; padding: 16px 26px;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%);
          color: #fff; border: none; border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          box-shadow: 0 8px 28px rgba(0,90,205,.34);
          transition: transform .2s, box-shadow .2s, filter .2s; letter-spacing: .02em;
        }
        .btn-wa:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 14px 38px rgba(0,90,205,.44); filter: brightness(1.07); }
        .btn-wa:active { transform: scale(.98); }

        .btn-call {
          padding: 16px 26px; background: #fff; color: var(--navy);
          border: 2px solid var(--navy); border-radius: 14px;
          font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 1rem;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all .2s; white-space: nowrap;
        }
        .btn-call:hover { background: #eef3ff; transform: translateY(-2px); }

        .h-trust {
          text-align: center; margin-top: 22px;
          font-size: 10px; font-weight: 800; color: #94a3b8;
          letter-spacing: .18em; text-transform: uppercase;
        }
      `}</style>

      <section className="h-root">
        {/* ── Hero Banner ── */}
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

        {/* ── Booking Card Shell ── */}
        <div className="h-shell">
          <div className="h-card">

            {/* Service Tabs */}
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

            {/* Vehicle Selection */}
            <div className="h-section">
              <div className="h-section-hd">
                <div>
                  <p className="h-eyebrow">Step 1</p>
                  <h2 className="h-section-title">Select Your Vehicle</h2>
                  <p className="h-section-sub">Click on a vehicle to select it for your booking.</p>
                </div>
                <span className="h-chip">{filteredVehicles.length} Options Available</span>
              </div>

              <div className="h-grid">
                {filteredVehicles.map((car, i) => (
                  <div
                    key={car.id}
                    onMouseEnter={() => setHoveredCard(car.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedVehicle(car)}
                    className={`vc${selectedVehicle?.id === car.id ? " sel" : ""}`}
                    style={{ animationDelay: `${i * 85}ms` }}
                  >
                    {/* Image */}
                    <div className="vc__img-box">
                      <img src={car.image} alt={car.label} className="vc__img" />

                      {/* Hover overlay with quick actions */}
                      <div className="vc__overlay">
                        <button
                          className="ov-btn"
                          style={{ background: "#25D366" }}
                          onClick={(e) => { e.stopPropagation(); handleWhatsApp(); }}
                        >
                          <svg width="21" height="21" fill="#fff" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </button>
                        <button
                          className="ov-btn"
                          style={{ background: "#ef4444" }}
                          onClick={(e) => { e.stopPropagation(); handleCall(); }}
                        >
                          <svg width="21" height="21" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </button>
                      </div>

                      {/* Badges */}
                      {car.popular && <span className="vc-badge vc-badge--popular">Popular</span>}
                      {selectedVehicle?.id === car.id && <span className="vc-badge vc-badge--sel">Selected ✓</span>}
                      <span className="vc-badge vc-badge--tag">Premium Service</span>
                    </div>

                    {/* Card Body */}
                    <div className="vc__body">
                      <h3 className="vc__name">{car.label}</h3>
                      <p className="vc__model">{car.model}</p>

                      <div className="vc__specs">
                        <div className="sp">
                          <div className="sp__icon">👥</div>
                          <div>
                            <p className="sp__lbl">Capacity</p>
                            <p className="sp__val">{car.capacity}</p>
                          </div>
                        </div>
                        <div className="sp">
                          <div className="sp__icon">🧳</div>
                          <div>
                            <p className="sp__lbl">Baggage</p>
                            <p className="sp__val">{car.baggage}</p>
                          </div>
                        </div>
                      </div>

                      <p className="vc__note">{car.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Booking Form (step 2) ── */}
            {selectedVehicle && (
              <div className="h-form">
                <div className="h-form__hd">
                  <div className="h-form__num">2</div>
                  <h2 className="h-form__title">Confirm Booking Details</h2>
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
                          <input type="text" placeholder="📍 Where should we pick you up?" className="h-finput" />
                        </Autocomplete>
                      </div>
                      <div className="h-fgroup">
                        <label className="h-flabel">Drop Location</label>
                        <Autocomplete
                          onLoad={(ac) => (dropAutocompleteRef.current = ac)}
                          onPlaceChanged={onDropChanged}
                        >
                          <input type="text" placeholder="🏁 Where are you going?" className="h-finput" />
                        </Autocomplete>
                      </div>
                    </>
                  ) : (
                    <p className="maps-spin">Initialising Maps Engine…</p>
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
                    <svg width="21" height="21" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Confirm via WhatsApp
                  </button>
                  <button className="btn-call" onClick={handleCall}>
                    <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call Us
                  </button>
                </div>

                <p className="h-trust">✦ Safe &nbsp;·&nbsp; Reliable &nbsp;·&nbsp; 24 / 7 Service ✦</p>
              </div>
            )}

          </div>
        </div>
      </section>
    </>
  );
}