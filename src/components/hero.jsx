// Hero.jsx — Modern redesign for Taxi Service Ahangama
import React, { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
// NOTE: Ensure these are exported from your ../data/vehicles file
// For this demo, I'm assuming the structure matches your previous snippet.
import { vehicles, serviceTypes, businessInfo } from "../data/vehicles";

const libraries = ["places"];

export default function Hero() {
  const [activeService, setActiveService] = useState("airport");
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Form States
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [passengerCount, setPassengerCount] = useState("");
  const [bagsCount, setBagsCount] = useState("");
  const [bagsSize, setBagsSize] = useState("");

  // Customize Tour Specific States
  const [tourType, setTourType] = useState("");
  const [tourDays, setTourDays] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [handLuggage, setHandLuggage] = useState(0);
  const [checkInLuggage, setCheckInLuggage] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [tempDest, setTempDest] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: businessInfo.googleApiKey,
    libraries,
  });

  const pickupAutocompleteRef = useRef(null);
  const dropAutocompleteRef = useRef(null);
  const destAutocompleteRef = useRef(null);

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
      setPickupLocation(place.formatted_address || place.name || "");
    }
  };

  const onDropChanged = () => {
    if (dropAutocompleteRef.current !== null) {
      const place = dropAutocompleteRef.current.getPlace();
      setDropLocation(place.formatted_address || place.name || "");
    }
  };

  const onDestChanged = () => {
    if (destAutocompleteRef.current !== null) {
      const place = destAutocompleteRef.current.getPlace();
      setTempDest(place.formatted_address || place.name || "");
    }
  };

  const addDestination = () => {
    if (tempDest.trim()) {
      setDestinations([...destinations, tempDest.trim()]);
      setTempDest("");
      // Clear the input field manually if needed
      if (destAutocompleteRef.current) {
        const input = destAutocompleteRef.current.getPlace();
        // Logic to clear actual input DOM can be added if using native refs
      }
    }
  };

  const handleWhatsApp = (isTour = false) => {
    let msg = "";

    if (isTour) {
      // 1. CUSTOM TOUR MESSAGE
      msg =
        `*✨ CUSTOM TOUR INQUIRY*%0A%0A` +
        `*Tour Type:* ${tourType || "Flexible"}%0A` +
        `*Pickup:* ${pickupLocation || "Not specified"}%0A` +
        `*Drop:* ${dropLocation || "Not specified"}%0A` +
        `*Date:* ${dateTime || "Not specified"}%0A` +
        `*Days:* ${tourDays}%0A` +
        `*Pax:* Adults: ${adults}, Children: ${children}, Infants: ${infants}%0A` +
        `*Luggage:* Hand: ${handLuggage}, Check-in: ${checkInLuggage}%0A` +
        `*Destinations:* ${destinations.join(" -> ") || "Flexible"}`;
    } else {
      if (!selectedVehicle) return;

      // Determine the Title based on the active tab
      // Assuming your serviceTypes IDs are 'airport' and 'rental'
      const title = activeService === "airport"
        ? "*✈️ AIRPORT HIRE BOOKING*"
        : "*🚗 VEHICLE RENTAL BOOKING*";

      // 2. AIRPORT OR RENTAL MESSAGE
      msg =
        `${title}%0A%0A` +
        `Hello! I'd like to book a ride.%0A%0A` +
        `*Vehicle:* ${selectedVehicle.label} (${selectedVehicle.model})%0A` +
        `*Pickup:* ${pickupLocation || "Not specified"}%0A` +
        `*Drop:* ${dropLocation || "Not specified"}%0A` +
        `*Date/Time:* ${dateTime || "Not specified"}%0A` +
        `*Customer:* ${passengerName || "Not specified"}%0A` +
        `*Passengers:* ${passengerCount || "Not specified"}%0A` +
        `*Luggage:* ${bagsCount || "0"} Bag(s) (${bagsSize || "N/A"})`;
    }

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

        /* FIX: Ensure Google Places Autocomplete dropdown is visible above modals */
        .pac-container {
          z-index: 10000 !important;
          font-family: 'DM Sans', sans-serif;
          border-radius: 12px;
          margin-top: 4px;
          border: none;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        .h-root * { box-sizing: border-box; }
        .h-root { font-family: 'DM Sans', sans-serif; background: #eef2fa; min-height: 100vh; padding-bottom: 80px; }


                /* ── HERO BANNER (split layout) ── */
        .h-banner {
         position: relative;
          min-height: 58vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .h-banner__bg {
          position: absolute; inset: 0;
           background: url('/assets/bg.png') center/cover no-repeat;
        }
        .h-banner__overlay {
          position: absolute; inset: 0;
           background: linear-gradient(100deg, #001f6b 0%, #003d8f 2%, rgba(0,31,107,0.55) 10%, transparent 100%);
        }
        .h-banner__noise {
          position: absolute; inset: 0; opacity: .04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .h-banner__arc {
          position: absolute; bottom: -1px; left: 0; right: 0; height: 52px;
          background: #eef2fa;
          clip-path: ellipse(58% 100% at 50% 100%);
        }
        .h-banner__left {
          position: relative; z-index: 5;
          flex: 1; padding: 60px 40px 100px 60px;
          max-width: 580px;
          animation: riseUp .9s cubic-bezier(.22,1,.36,1) both;
        }
        .h-banner__right {
          position: relative; z-index: 5;
          flex: 1; display: flex; align-items: flex-end; justify-content: center;
          padding: 0 20px 72px 0;
        }
        .h-banner__van {
          width: 100%; max-width: 560px;
          object-fit: contain;
          filter: drop-shadow(0 24px 48px rgba(0,0,0,0.45));
          animation: floatVan 4s ease-in-out infinite;
        }
        @keyframes floatVan {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        /* badge */
        .h-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(0,31,107,0.65); border: 1px solid rgba(234,184,117,0.55);
          backdrop-filter: blur(8px); border-radius: 6px;
          padding: 6px 14px; margin-bottom: 20px;
          font-size: 11px; font-weight: 700; color: var(--gold); letter-spacing: .06em;
        }

        /* heading */
        .h-title {
          font-family: 'Playfair Display', serif; font-weight: 900;
          font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.12; color: #fff;
          margin: 0 0 14px;
        }
        .h-title em { color: var(--gold); font-style: normal; }
        .h-sub {
          color: rgba(195,231,241,.9); font-size: 0.95rem; font-weight: 400;
          line-height: 1.65; margin-bottom: 26px;
        }

        /* mini service highlights */
        .h-svc-row { display: flex; gap: 22px; flex-wrap: wrap; margin-bottom: 30px; }
        .h-svc-item { display: flex; align-items: center; gap: 9px; }
        .h-svc-icon {
          width: 34px; height: 34px; border-radius: 8px;
          background: rgba(255,255,255,0.15); display: flex;
          align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0;
        }
        .h-svc-label { font-size: 10px; font-weight: 800; color: #fff; letter-spacing: .05em; display: block; }
        .h-svc-sub   { font-size: 9px;  color: rgba(195,231,241,0.75); display: block; }

        /* CTA buttons */
        .h-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
        .h-btn-gold {
          padding: 13px 26px; background: var(--gold); color: #0c1a3d;
          border: none; border-radius: 10px; font-weight: 800; font-size: 0.88rem;
          cursor: pointer; display: flex; align-items: center; gap: 7px;
          transition: all .22s; font-family: 'DM Sans', sans-serif;
        }
        .h-btn-gold:hover { background: #d4a058; transform: translateY(-2px); }
        .h-btn-dark {
          padding: 13px 26px; background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px); border: 1.5px solid rgba(255,255,255,0.35);
          color: #fff; border-radius: 10px; font-weight: 800; font-size: 0.88rem;
          cursor: pointer; display: flex; align-items: center; gap: 7px;
          transition: all .22s; font-family: 'DM Sans', sans-serif;
        }
        .h-btn-dark:hover { background: rgba(255,255,255,0.22); transform: translateY(-2px); 
        }
        @keyframes riseUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} 
        }

        @media(max-width:900px) {
          .h-banner { flex-direction: column; }
          .h-banner__left { padding: 50px 24px 20px; max-width: 100%; }
          .h-banner__right { display: none; }
        }

        .h-shell {
          max-width: 1160px; margin: -52px auto 0; padding: 0 20px;
          position: relative; z-index: 20;
        }
        .h-card {
          background: #fff; border-radius: 28px;
          box-shadow: 0 28px 72px rgba(0,31,107,.14), 0 4px 14px rgba(0,0,0,.05);
          overflow: hidden;
        }

        /* ── SERVICE TABS (icon card style) ── */
        .h-tabs-wrapper {
          padding: 28px 30px 10px;
          border-bottom: 1.5px solid #edf0f8;
        }
        .h-tabs-title {
          display: flex; align-items: center; justify-content: center; gap: 14px;
          margin-bottom: 24px;
        }
        .h-tabs-title__line { flex: 1; max-width: 80px; height: 2px; background: var(--gold); border-radius: 2px; }
        .h-tabs-title__text {
          font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
          font-weight: 800; color: #0c1a3d; letter-spacing: .06em;
          text-transform: uppercase; white-space: nowrap;
        }
        .h-tabs { display: flex; overflow-x: auto; gap: 8px; scrollbar-width: none; justify-content: center; }
        .h-tabs::-webkit-scrollbar { display: none; }
        .h-tab {
          flex: 0 0 auto; min-width: 110px; padding: 14px 12px 18px;
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          border: none; background: transparent; cursor: pointer; position: relative;
          font-family: 'DM Sans', sans-serif; transition: all .22s; border-radius: 14px;
        }
        .h-tab::after {
          content: ''; position: absolute; bottom: 0; left: 20px; right: 20px;
          height: 3px; border-radius: 3px 3px 0 0; background: var(--navy);
          transform: scaleX(0); transition: transform .25s ease;
        }
        
        .h-tab:not(.active):hover { background: #f6f9ff; }
        .h-tab__icon-wrap {
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--navy-deep);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          transition: transform .22s, background .22s;
        }
        .h-tab.active .h-tab__icon-wrap { background: var(--navy); transform: scale(1.08); }
        .h-tab:not(.active):hover .h-tab__icon-wrap { background: var(--navy); }
        .h-tab__label {
          font-size: 9px; font-weight: 800; letter-spacing: .1em;
          text-transform: uppercase; color: #0c1a3d; text-align: center; line-height: 1.3;
        }
        .h-tab__desc {
          font-size: 8px; color: #9ca3af; text-align: center;
          line-height: 1.4; margin-top: -4px;
        }
        @media(max-width: 640px) {
          .h-tabs-wrapper { padding: 20px 12px 8px; }
          .h-tab { min-width: 88px; padding: 10px 6px 14px; }
          .h-tab__icon-wrap { width: 42px; height: 42px; font-size: 18px; }
          .h-tab__desc { display: none; }
        }

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

        .h-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); 
          gap: 20px;
        }
        @media(max-width:640px) {
          .h-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
          .vc__body { padding: 10px !important; overflow: hidden; }
          .vc__name { 
             font-size: 0.95rem !important; 
             word-wrap: break-word; 
             overflow-wrap: break-word; 
             line-height: 1.2;
          }
          .vc__model { font-size: 8px !important; margin-bottom: 8px !important; }
          .vc__specs { padding: 6px !important; gap: 4px !important; }
          .sp { gap: 4px !important; align-items: flex-start !important; }
          .sp__icon { width: 18px !important; height: 18px !important; font-size: 9px !important; flex-shrink: 0; }
          .sp__val { font-size: 8.5px !important; word-break: break-all; }
          .vc__note { display: none; } 
        }

        .vc {
          border-radius: 20px; border: 2px solid #e8edf8; background: #fff;
          overflow: hidden; cursor: pointer;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .22s;
          animation: fadeUp .65s ease both;
          display: flex; flex-direction: column;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        .vc:hover { transform: translateY(-8px); box-shadow: 0 22px 56px rgba(0,31,107,.14); border-color: var(--sky); }
        
        .vc__img-box { position: relative; aspect-ratio: 16/11; overflow: hidden; background: #dce7f5; }
        .vc__img { width:100%; height:100%; object-fit:cover; transition: transform .7s ease; }
        
        .vc-badge {
          position: absolute; font-size: 8px; font-weight: 900;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 99px;
        }
        .vc-badge--popular { top:10px; right:10px; background:#ef4444; color:#fff; }
        .vc-badge--tag { bottom:8px; left:8px; background:rgba(255,255,255,.94); color:var(--navy); }

        .vc__body { padding: 18px; flex-grow: 1; display: flex; flex-direction: column; }
        .vc__name {
          font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 900;
          color: #0c1a3d; margin-bottom: 2px;
        }
        .vc__model { font-size: 9px; font-weight: 700; color: #9ca3af; letter-spacing: .08em; margin-bottom: 12px; }

        .vc__specs {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
          background: #f6f9ff; border-radius: 12px; padding: 10px; margin-bottom: 10px;
        }
        .sp { display: flex; align-items: center; gap: 6px; overflow: hidden; }
        .sp__icon {
          width: 26px; height: 26px; border-radius: 7px;
          background: rgba(0,90,205,.1);
          display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0;
        }
        .sp__val { font-size: 10px; font-weight: 700; color: #1e293b; white-space: normal; word-break: break-word; }

        .modal-overlay {
          position: fixed; inset: 0; background: rgba(12, 26, 61, 0.7);
          backdrop-filter: blur(6px); z-index: 1000;
          display: flex; align-items: center; justify-content: center; padding: 20px;
        }
        .modal-content {
          background: #fff; width: 100%; max-width: 600px; max-height: 90vh;
          border-radius: 24px; overflow-y: auto; position: relative;
          box-shadow: 0 30px 90px rgba(0,0,0,0.4);
        }
        .modal-close {
          position: absolute; top: 20px; right: 20px; width: 36px; height: 36px;
          background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1); z-index: 10;
        }

        .h-form { padding: 30px; border-top: 5px solid var(--gold); }
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
        .btn-wa {
          flex: 1; padding: 14px; background: linear-gradient(135deg, var(--navy), var(--navy-dark));
          color: #fff; border: none; border-radius: 12px; font-weight: 800; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-call {
          padding: 14px; border: 2px solid var(--navy); border-radius: 12px;
          color: var(--navy); font-weight: 800; background: #fff; cursor: pointer;
        }

        .ct-container { display: flex; gap: 30px; flex-wrap: wrap; }
        .ct-main { flex: 1.5; min-width: 300px; }
        .ct-side { flex: 1; min-width: 250px; background: #f8fafc; padding: 24px; border-radius: 20px; border: 1px solid #edf2f7; }
        .ct-row { display: flex; gap: 12px; margin-bottom: 12px; }
        .ct-counter-group { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 15px; }
        .ct-counter { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .ct-counter-ctrl { display: flex; align-items: center; border: 1.5px solid #dde5f4; border-radius: 20px; padding: 2px 10px; background: #fff; }
        .ct-btn { border: none; background: none; font-size: 18px; cursor: pointer; color: var(--navy); padding: 0 5px; }
        .ct-val { font-weight: 800; min-width: 20px; text-align: center; font-size: 14px; }
        .dest-chip-box { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px; }
        .dest-chip { background: var(--navy); color: white; padding: 4px 12px; border-radius: 6px; font-size: 11px; }
      `}</style>

      <section className="h-root">
        <div className="h-banner">
          <div className="h-banner__bg" />
          <div className="h-banner__overlay" />
          <div className="h-banner__noise" />
          {/* LEFT — text content */}
          <div className="h-banner__left">
            <div className="h-badge">⭐ Trusted Taxi Service in Ahangama</div>
            <h1 className="h-title">Private <em>Taxi &amp; Tours</em><br />in Ahangama</h1>
            <p className="h-sub">Safe, Comfortable &amp; Reliable Transport Services<br />for Your Journey in Sri Lanka.</p>

            <div className="h-svc-row">
              <div className="h-svc-item">
                <div className="h-svc-icon">✈️</div>
                <div><span className="h-svc-label">Airport Transfers</span><span className="h-svc-sub">On-time &amp; Hassle-free</span></div>
              </div>
              <div className="h-svc-item">
                <div className="h-svc-icon">🦁</div>
                <div><span className="h-svc-label">Safari Adventures</span><span className="h-svc-sub">Explore Wildlife</span></div>
              </div>
              <div className="h-svc-item">
                <div className="h-svc-icon">🗺️</div>
                <div><span className="h-svc-label">Custom Tours</span><span className="h-svc-sub">Your Journey, Your Way</span></div>
              </div>
            </div>

            <div className="h-cta-row">
              <button className="h-btn-gold"
                onClick={() => document.getElementById('vehiclesection')?.scrollIntoView({ behavior: 'smooth' })}>
                Book Your Ride →
              </button>
              <button 
  className="h-btn-dark"
  onClick={() => handleTabChange({ scroll: true, target: "tour-id" })}
>
  Explore Tours →
</button>
            </div>
          </div>
        </div>


        <div className="h-shell " id="vehiclesection" >
          <div className="h-card">
            <div className="h-tabs-wrapper">
              <div className="h-tabs-title">
                <span className="h-tabs-title__line" />
                <span className="h-tabs-title__text">Choose Your Service</span>
                <span className="h-tabs-title__line" />
              </div>
              <div className="h-tabs">
                {serviceTypes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleTabChange(s)}
                    className={`h-tab${activeService === s.id && !s.scroll ? " active" : ""}`}
                  >
                    <span className="h-tab__icon-wrap">{s.icon}</span>
                    <span className="h-tab__label">{s.label}</span>
                    {s.desc && <span className="h-tab__desc">{s.desc}</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-section">
              {activeService === "instant" ? (
                /* CUSTOM TOUR FORM */
                <div className="ct-container">
                  <div className="ct-main">
                    <h2 className="h-section-title" style={{ marginBottom: '20px' }}>Travel Details</h2>

                    <select className="h-finput" style={{ marginBottom: '12px' }} onChange={(e) => setTourType(e.target.value)}>
                      <option value="">Choose a tour type</option>
                      <option value="Sightseeing">Sightseeing Tour</option>
                      <option value="Wildlife">Wildlife Tour</option>
                      <option value="Cultural">Cultural Tour</option>
                    </select>

                    <div className="ct-row">
                      {isLoaded ? (
                        <>
                          <Autocomplete
                            onLoad={ac => (pickupAutocompleteRef.current = ac)}
                            onPlaceChanged={onPickupChanged}
                          >
                            <input type="text" placeholder="Pick Location" className="h-finput" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} />
                          </Autocomplete>
                          <Autocomplete
                            onLoad={ac => (dropAutocompleteRef.current = ac)}
                            onPlaceChanged={onDropChanged}
                          >
                            <input type="text" placeholder="Drop Location" className="h-finput" value={dropLocation} onChange={e => setDropLocation(e.target.value)} />
                          </Autocomplete>
                        </>
                      ) : (
                        <>
                          <input type="text" placeholder="Pick Location" className="h-finput" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} />
                          <input type="text" placeholder="Drop Location" className="h-finput" value={dropLocation} onChange={e => setDropLocation(e.target.value)} />
                        </>
                      )}
                    </div>

                    <div className="ct-row">
                      <input type="date" className="h-finput" style={{ flex: 2 }} onChange={e => setDateTime(e.target.value)} />
                      <select className="h-finput" style={{ flex: 1 }} value={tourDays} onChange={e => setTourDays(e.target.value)}>
                        {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(n => <option key={n} value={n}>Days {n}</option>)}
                      </select>
                    </div>

                    <div className="ct-counter-group">
                      {[
                        { label: 'Adults', val: adults, set: setAdults },
                        { label: 'Children', val: children, set: setChildren },
                        { label: 'Infants', val: infants, set: setInfants },
                        { label: 'Hand Luggage', val: handLuggage, set: setHandLuggage },
                        { label: 'Check-in Luggage', val: checkInLuggage, set: setCheckInLuggage }
                      ].map((item, idx) => (
                        <div className="ct-counter" key={idx}>
                          <span className="h-flabel">{item.label}</span>
                          <div className="ct-counter-ctrl">
                            <button className="ct-btn" onClick={() => item.set(Math.max(0, item.val - 1))}>-</button>
                            <span className="ct-val">{item.val}</span>
                            <button className="ct-btn" onClick={() => item.set(item.val + 1)}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="btn-wa" style={{ marginTop: '20px' }} onClick={() => handleWhatsApp(true)}>Confirm via WhatsApp</button>
                  </div>

                  <div className="ct-side">
                    <h3 className="h-flabel" style={{ marginBottom: '12px', fontSize: '12px' }}>Add Destinations</h3>
                    <div className="ct-row">
                      {isLoaded ? (
                        <Autocomplete
                          onLoad={ac => (destAutocompleteRef.current = ac)}
                          onPlaceChanged={onDestChanged}
                        >
                          <input
                            type="text"
                            placeholder="Add Destinations"
                            className="h-finput"
                            value={tempDest}
                            onChange={e => setTempDest(e.target.value)}
                          />
                        </Autocomplete>
                      ) : (
                        <input
                          type="text"
                          placeholder="Add Destinations"
                          className="h-finput"
                          value={tempDest}
                          onChange={e => setTempDest(e.target.value)}
                        />
                      )}
                      <button onClick={addDestination} style={{ background: '#0c1a3d', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 15px', cursor: 'pointer', fontWeight: 700 }}>Add</button>
                    </div>
                    <div className="dest-chip-box">
                      {destinations.map((d, i) => <span key={i} className="dest-chip">{d}</span>)}
                    </div>
                  </div>
                </div>
              ) : (
                /* ORIGINAL VEHICLE GRID */
                <>
                  <div className="h-section-hd">
                    <div>
                      <p className="h-eyebrow">Step 1</p>
                      <h2 className="h-section-title">Select Your Vehicle</h2>
                    </div>
                    <span className="h-chip">{filteredVehicles.length} Options</span>
                  </div>

                  <div className="h-grid">
                    {filteredVehicles.map((car) => (
                      <div key={car.id} onClick={() => setSelectedVehicle(car)} className="vc">
                        <div className="vc__img-box">
                          <img src={car.image} alt={car.label} className="vc__img" />
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
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* BOOKING MODAL */}
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
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={ac => (pickupAutocompleteRef.current = ac)}
                        onPlaceChanged={onPickupChanged}
                      >
                        <input type="text" placeholder="📍 Pickup point" className="h-finput" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} />
                      </Autocomplete>
                    ) : (
                      <input type="text" placeholder="📍 Pickup point" className="h-finput" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} />
                    )}
                  </div>

                  <div className="h-fgroup">
                    <label className="h-flabel">Drop Location</label>
                    {isLoaded ? (
                      <Autocomplete
                        onLoad={ac => (dropAutocompleteRef.current = ac)}
                        onPlaceChanged={onDropChanged}
                      >
                        <input type="text" placeholder="🏁 Destination" className="h-finput" value={dropLocation} onChange={e => setDropLocation(e.target.value)} />
                      </Autocomplete>
                    ) : (
                      <input type="text" placeholder="🏁 Destination" className="h-finput" value={dropLocation} onChange={e => setDropLocation(e.target.value)} />
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
      </section>
    </>
  );
}