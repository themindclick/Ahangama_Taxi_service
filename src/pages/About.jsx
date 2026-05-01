import React from "react";

export default function About() {
  return (
    <>
      <section className="h-root" style={{ padding: "100px 0", background: "#fff" }}>
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
            
            {/* Left: Image Side */}
            <div style={{ position: "relative" }}>
              <div style={{ 
                width: "100%", 
                aspectRatio: "4/5", 
                borderRadius: "30px", 
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(0,31,107,0.15)"
              }}>
                <img 
                  src="/assets/dp.jpeg" 
                  alt="Ahangama Coastal View" 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Floating Experience Badge */}
              <div style={{ 
                position: "absolute", 
                bottom: "-20px", 
                right: "-20px", 
                background: "var(--navy)", 
                color: "#fff", 
                padding: "24px", 
                borderRadius: "20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
              }}>
                <p style={{ fontSize: "2.5rem", fontWeight: "900", margin: 0, lineHeight: 1 }}>10+</p>
                <p style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>Years Excellence</p>
              </div>
            </div>

            {/* Right: Content Side */}
            <div>
              <p className="h-eyebrow">The Standard of Excellence</p>
              <h2 className="h-section-title" style={{ fontSize: "3rem", marginBottom: "24px" }}>
                Managed by <br/><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Uresh Ruchika</em>
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#4b5563", lineHeight: "1.8", marginBottom: "30px" }}>
                Taxi Service Ahangama has been a hallmark of reliability for over a decade. We specialize in 
                providing the international community with a secure, professional, and ethical transport experience. 
              </p>
              
              <div style={{ display: "grid", gap: "20px" }}>
                {[
                  { title: "SLTDA Registered", desc: "Working exclusively with Sri Lanka Tourist Board verified professionals." },
                  { title: "Ethical Standards", desc: "Strict Zero-Tolerance policy for Alcohol and Drugs among our fleet." },
                  { title: "Direct Fleet", desc: "No middlemen. We manage every journey personally with verified vehicles." }
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "15px" }}>
                    <div style={{ color: "var(--gold)", fontSize: "1.2rem", fontWeight: "bold" }}>✓</div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--navy-deep)", fontWeight: "800" }}>{item.title}</h4>
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#6b7280" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}