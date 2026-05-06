// Booking.jsx — Redesigned for Taxi Service Ahangama
// All original functions preserved. Colors: #EAB875, #C3E7F1, #005acd

import React, { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupDate: "",
    returnDate: "",
    location: "",
    additionalNote: "",
  });

  const whatsappNumber = "94719916072";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
🚗 *New Booking Request — Taxi Service Ahangama*

👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📅 *Pickup Date:* ${formData.pickupDate}
🔄 *Return Date:* ${formData.returnDate}
📍 *Location:* ${formData.location || "Not specified"}
📝 *Note:* ${formData.additionalNote || "None"}

_Sent via taxiserviceahangama.lk_
    `.trim();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  const handleQuickCall = () => {
    window.location.href = "tel:+94719916072";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

        :root {
          --gold:      #EAB875;
          --sky:       #C3E7F1;
          --navy:      #005acd;
          --navy-dark: #003d8f;
          --navy-deep: #001f6b;
        }

        .bk-root { font-family: 'DM Sans', sans-serif; }

        /* ── Section ── */
        .bk-section {
          position: relative; overflow: hidden;
          padding: 100px 20px 110px;
          background: linear-gradient(160deg, #f0f4fa 0%, #e6edf8 50%, #dce8f5 100%);
        }

        /* Decorative blobs */
        .bk-blob {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }
        .bk-blob--1 {
          width: 520px; height: 520px; top: -120px; right: -140px;
          background: rgba(0,90,205,.07);
        }
        .bk-blob--2 {
          width: 400px; height: 400px; bottom: -100px; left: -120px;
          background: rgba(234,184,117,.12);
        }
        .bk-blob--3 {
          width: 260px; height: 260px; top: 40%; left: 55%;
          background: rgba(195,231,241,.2);
        }

        /* Geometric pattern overlay */
        .bk-pattern {
          position: absolute; inset: 0; opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23005acd' fill-rule='evenodd'%3E%3Cpath d='M0 0h4v4H0zm8 0h4v4H8zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zm8 0h4v4h-4zM0 8h4v4H0zm8 8h4v4H8zm8 8h4v4h-4zm8 8h4v4h-4zm8 8h4v4h-4z'/%3E%3C/g%3E%3C/svg%3E");
        }

        /* ── Inner wrapper ── */
        .bk-inner {
          max-width: 1060px; margin: 0 auto; position: relative; z-index: 5;
          display: grid; grid-template-columns: 1fr 1.55fr; gap: 48px; align-items: start;
        }
        @media(max-width:860px){ .bk-inner { grid-template-columns: 1fr; gap: 36px; } }

        /* ── LEFT PANEL ── */
        .bk-left {}

        .bk-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(234,184,117,.5);
          background: rgba(234,184,117,.1);
          border-radius: 99px; padding: 6px 16px; margin-bottom: 22px;
          font-size: 10px; font-weight: 800; letter-spacing: .15em;
          text-transform: uppercase; color: var(--navy);
        }
        .bk-eyebrow__dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--gold);
          animation: bdot 1.8s ease-in-out infinite;
        }
        @keyframes bdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }

        .bk-title {
          font-family: 'Playfair Display', serif; font-weight: 900;
          font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.08; color: #0c1a3d;
          margin: 0 0 16px;
        }
        .bk-title em { color: var(--navy); font-style: italic; }

        .bk-desc {
          font-size: .9rem; color: #5a6a85; line-height: 1.7; margin-bottom: 36px;
        }

        /* Info cards stack */
        .bk-info-stack { display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; }
        .bk-info-card {
          display: flex; align-items: center; gap: 14px;
          background: rgba(255,255,255,.75); backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,.9); border-radius: 16px; padding: 14px 18px;
          box-shadow: 0 2px 12px rgba(0,31,107,.06);
        }
        .bk-info-icon {
          width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .bk-info-icon--gold { background: rgba(234,184,117,.18); }
        .bk-info-icon--sky  { background: rgba(195,231,241,.35); }
        .bk-info-icon--navy { background: rgba(0,90,205,.1); }
        .bk-info-lbl { font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; color: #94a3b8; }
        .bk-info-val { font-size: .88rem; font-weight: 700; color: #0c1a3d; }

        /* Call card */
        .bk-call-card {
          border-radius: 22px; overflow: hidden;
          background: linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%);
          padding: 28px; color: #fff;
          box-shadow: 0 16px 48px rgba(0,31,107,.25);
        }
        .bk-call-card__title {
          font-family: 'Playfair Display', serif; font-size: 1.35rem;
          font-weight: 900; margin-bottom: 6px;
        }
        .bk-call-card__sub { font-size: .82rem; color: rgba(195,231,241,.85); margin-bottom: 20px; line-height: 1.55; }
        .bk-call-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 14px 20px; background: #fff; color: var(--navy);
          border: none; border-radius: 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: .95rem;
          box-shadow: 0 4px 18px rgba(0,0,0,.15);
          transition: transform .2s, filter .2s;
        }
        .bk-call-btn:hover { transform: scale(1.03); filter: brightness(1.04); }

        /* ── RIGHT PANEL — FORM ── */
        .bk-form-card {
          background: #fff; border-radius: 28px;
          border: 1.5px solid rgba(0,90,205,.08);
          box-shadow: 0 24px 72px rgba(0,31,107,.12), 0 4px 16px rgba(0,0,0,.04);
          overflow: hidden;
          animation: bkRise .75s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes bkRise { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        /* Gold accent bar */
        .bk-form-topbar {
          height: 5px;
          background: linear-gradient(90deg, var(--gold) 0%, #f5d08e 50%, var(--sky) 100%);
        }

        .bk-form-inner { padding: 36px 36px 40px; }
        @media(max-width:520px){ .bk-form-inner { padding: 24px 18px 30px; } }

        .bk-form-hd { margin-bottom: 28px; }
        .bk-form-title {
          font-family: 'Playfair Display', serif; font-size: 1.5rem;
          font-weight: 900; color: #0c1a3d; margin-bottom: 4px;
        }
        .bk-form-sub { font-size: .8rem; color: #94a3b8; font-weight: 500; }

        /* Form grid */
        .bk-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media(max-width:480px){ .bk-grid-2 { grid-template-columns: 1fr; } }

        .bk-fgroup { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; }
        .bk-fgroup:last-child { margin-bottom: 0; }
        .bk-label {
          font-size: 9.5px; font-weight: 800; text-transform: uppercase;
          letter-spacing: .12em; color: #64748b; padding-left: 2px;
        }
        .bk-required { color: var(--gold); margin-left: 2px; }
        .bk-input, .bk-textarea {
          width: 100%; padding: 13px 16px;
          border: 2px solid #e8edf8; border-radius: 14px;
          background: #f9fbff; font-family: 'DM Sans', sans-serif;
          font-size: .88rem; color: #1e293b; outline: none;
          transition: border-color .2s, background .2s, box-shadow .2s;
          box-sizing: border-box;
        }
        .bk-input:focus, .bk-textarea:focus {
          border-color: var(--navy); background: #fff;
          box-shadow: 0 0 0 4px rgba(0,90,205,.08);
        }
        .bk-input::placeholder, .bk-textarea::placeholder { color: #c4cde0; }
        .bk-textarea { resize: none; }

        /* Divider */
        .bk-divider {
          border: none; border-top: 1.5px dashed #e8edf8;
          margin: 20px 0;
        }

        /* Submit button */
        .bk-submit {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #25D366 0%, #1da851 100%);
          color: #fff; border: none; border-radius: 16px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-weight: 800; font-size: 1rem;
          box-shadow: 0 8px 28px rgba(37,211,102,.32);
          transition: transform .2s, box-shadow .2s, filter .2s;
          letter-spacing: .02em;
        }
        .bk-submit:hover {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 14px 38px rgba(37,211,102,.42);
          filter: brightness(1.06);
        }
        .bk-submit:active { transform: scale(.98); }

        .bk-submit-note {
          text-align: center; margin-top: 12px;
          font-size: 10px; font-weight: 700; color: #94a3b8;
          letter-spacing: .1em; text-transform: uppercase;
        }
      `}</style>

      <section id="book" className="bk-root bk-section">
        {/* Background decorations */}
        <div className="bk-blob bk-blob--1" />
        <div className="bk-blob bk-blob--2" />
        <div className="bk-blob bk-blob--3" />
        <div className="bk-pattern" />

        <div className="bk-inner">

          {/* ── LEFT — Intro + Call ── */}
          <div className="bk-left">
            <div className="bk-eyebrow">
              <span className="bk-eyebrow__dot" />
              Quick Booking
            </div>

            <h2 className="bk-title">
              Reserve Your<br /><em>Ride Today</em>
            </h2>

            <p className="bk-desc">
              Fill out the form and we'll confirm your booking instantly via WhatsApp.
              Airport transfers, safaris, whale watching &amp; more — all across Sri Lanka.
            </p>

            {/* Info cards */}
            <div className="bk-info-stack">
              <div className="bk-info-card">
                <div className="bk-info-icon bk-info-icon--gold">✈️</div>
                <div>
                  <p className="bk-info-lbl">Airport Transfers</p>
                  <p className="bk-info-val">BIA &amp; All Sri Lankan Airports</p>
                </div>
              </div>
              <div className="bk-info-card">
                <div className="bk-info-icon bk-info-icon--sky">🐘</div>
                <div>
                  <p className="bk-info-lbl">Safari &amp; Tours</p>
                  <p className="bk-info-val">Whale Watching · Wild Safari · Tuk Tuk Tours</p>
                </div>
              </div>
              <div className="bk-info-card">
                <div className="bk-info-icon bk-info-icon--navy">🕐</div>
                <div>
                  <p className="bk-info-lbl">Availability</p>
                  <p className="bk-info-val">24 / 7 — Always Ready</p>
                </div>
              </div>
            </div>

            {/* Call card */}
            <div className="bk-call-card">
              <h3 className="bk-call-card__title">Need Immediate Help?</h3>
              <p className="bk-call-card__sub">
                Speak directly with our driver for instant assistance and real-time availability.
              </p>
              <button className="bk-call-btn" onClick={handleQuickCall}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call +94 77 37 444 32
              </button>
            </div>
          </div>

          {/* ── RIGHT — Form ── */}
          <div className="bk-form-card">
            <div className="bk-form-topbar" />
            <div className="bk-form-inner">
              <div className="bk-form-hd">
                <h3 className="bk-form-title">Booking Details</h3>
                <p className="bk-form-sub">We'll confirm via WhatsApp within minutes.</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Name & Phone */}
                <div className="bk-grid-2">
                  <div className="bk-fgroup">
                    <label className="bk-label">Full Name<span className="bk-required">*</span></label>
                    <input
                      type="text" name="name" value={formData.name}
                      onChange={handleChange} required placeholder="e.g. Kamal Perera"
                      className="bk-input"
                    />
                  </div>
                  <div className="bk-fgroup">
                    <label className="bk-label">Phone Number<span className="bk-required">*</span></label>
                    <input
                      type="tel" name="phone" value={formData.phone}
                      onChange={handleChange} required placeholder="+94 XX XXX XXXX"
                      className="bk-input"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="bk-grid-2">
                  <div className="bk-fgroup">
                    <label className="bk-label">Pickup Date<span className="bk-required">*</span></label>
                    <input
                      type="date" name="pickupDate" value={formData.pickupDate}
                      onChange={handleChange} required className="bk-input"
                    />
                  </div>
                  <div className="bk-fgroup">
                    <label className="bk-label">Return Date<span className="bk-required">*</span></label>
                    <input
                      type="date" name="returnDate" value={formData.returnDate}
                      onChange={handleChange} required className="bk-input"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="bk-fgroup">
                  <label className="bk-label">Pickup Location</label>
                  <input
                    type="text" name="location" value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Bandaranaike Airport or Hotel Name"
                    className="bk-input"
                  />
                </div>

                <hr className="bk-divider" />

                {/* Additional Note */}
                <div className="bk-fgroup">
                  <label className="bk-label">Additional Note</label>
                  <textarea
                    name="additionalNote" rows="3" value={formData.additionalNote}
                    onChange={handleChange}
                    placeholder="Special requirements, vehicle preference, number of passengers…"
                    className="bk-textarea bk-input"
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="bk-submit">
                  <svg width="21" height="21" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Book via WhatsApp
                </button>

                <p className="bk-submit-note">✦ Instant confirmation · No credit card needed ✦</p>
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Booking;