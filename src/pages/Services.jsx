import React from "react";

const serviceList = [
  {
    title: "Airport Transfers",
    icon: "✈️",
    desc: "Executive 24/7 door-to-door service to and from CMB International Airport. Punctual and comfortable.",
    tag: "Punctual"
  },
  {
    title: "Elite City Taxi",
    icon: "🚕",
    desc: "Safe local transport across Ahangama and Southern Province. Preferred by solo travelers.",
    tag: "Safe"
  },
  {
    title: "Customized Journeys",
    icon: "🗺️",
    desc: "Bespoke 3-14 day island expeditions. Tailor-made itineraries to match your specific pace.",
    tag: "Bespoke"
  },
  {
    title: "Eco Rentals",
    icon: "🛵",
    desc: "Pristine condition scooters and bicycles for authentic coastal and village exploration.",
    tag: "Flexible"
  }
];

export default function Services() {
  return (
    <section className="h-root" style={{ padding: "80px 20px", background: "#f8fafc" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="h-eyebrow" style={{ justifyContent: "center" }}>Core Specialized Services</p>
          <h2 className="h-section-title">What We Offer</h2>
        </div>

        <div className="h-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {serviceList.map((service, i) => (
            <div key={i} className="vc" style={{ padding: "40px 30px", textAlign: "center" }}>
              <div style={{ 
                fontSize: "3rem", 
                marginBottom: "20px", 
                display: "inline-block",
                padding: "20px",
                background: "var(--gold-light)",
                borderRadius: "50%"
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", color: "var(--navy-deep)", marginBottom: "12px" }}>
                {service.title}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: "1.6", marginBottom: "20px" }}>
                {service.desc}
              </p>
              <span className="h-chip" style={{ background: "transparent", border: "1px solid var(--navy)", color: "var(--navy)" }}>
                {service.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Payment & Security Section */}
        <div style={{ 
          marginTop: "80px", 
          background: "var(--navy-deep)", 
          borderRadius: "28px", 
          padding: "40px", 
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "30px"
        }}>
          <div style={{ flex: "1 1 400px" }}>
            <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.8rem", marginBottom: "10px" }}>
              Secure & Modern Payments
            </h3>
            <p style={{ color: "var(--sky)", fontSize: "0.95rem" }}>
              We accept Cash (LKR, USD, EUR), Bank Transfers, and Crypto (USDT & Bitcoin).
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
             {["Family Safety", "Female Traveler Friendly", "Zero Alcohol Policy"].map((pill, idx) => (
               <div key={idx} style={{ 
                 background: "rgba(255,255,255,0.1)", 
                 padding: "10px 20px", 
                 borderRadius: "99px", 
                 fontSize: "12px", 
                 fontWeight: "bold",
                 border: "1px solid var(--gold)"
               }}>
                 ✓ {pill}
               </div>
             ))}
          </div>
        </div>

      </div>
    </section>
  );
}