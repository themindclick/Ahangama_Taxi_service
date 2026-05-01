import React from "react";
import { businessInfo } from "../data/Vehicles";

const packages = [
  {
    id: "yala",
    category: "safari",
    title: "The Premier Yala Safari",
    subtitle: "Highest Leopard Density in the World",
    image: "https://www.reservationyala.lk/_next/image?url=%2Fimages%2Fexpert-guide%25202.jpg&w=3840&q=75",
    timing: "Morning or Afternoon (6:00 AM – 6:00 PM)",
    duration: "2.5 - 3 Hours Travel",
    price: "All-Inclusive",
    highlights: ["Private 4x4 Jeep", "Park Entry Tickets", "English Guide", "Island-wide Pickup"],
    features: ["Private AC Transport", "Chilled Water", "Unlimited Photo Stops"]
  },
  {
    id: "udawalawe",
    category: "safari",
    title: "Udawalawe Giants & Elephant Home",
    subtitle: "Heart-warming Elephant Encounters",
    image: "https://elephanttrail.lk/wp-content/uploads/2025/09/Elephants-2.jpg",
    timing: "Flexible Sessions (7:00 AM or 11:30 AM)",
    duration: "1.5 - 2.5 Hours Travel",
    price: "Family Choice",
    highlights: ["Baby Elephant Feeding", "3-Hour Private Safari", "Transit Home Entry", "Door-to-door Service"],
    features: ["Private AC Transport", "Expert Tracker", "Snack Breaks Included"]
  },
  {
    id: "madu",
    category: "tour",
    title: "Madu River & Mangroves",
    subtitle: "Cultural Boat Journey",
    image: "https://www.pelago.com/img/products/LK-Sri%20Lanka/madu-river-sunrise-mangrove-kayaking/41647a10-edc4-4524-984a-c424c04ab053_madu-river-sunrise-mangrove-kayaking.jpg",
    timing: "08:30 AM – 03:30 PM",
    duration: "2-Hour Boat Safari",
    price: "Relaxing",
    highlights: ["64-Island Boat Tour", "Fish Massage", "Cinnamon Island", "Moonstone Mines"],
    features: ["Private Transport", "Entry Fees Included", "Tuk-Tuk Option Available"]
  },
  {
    id: "sinharaja",
    category: "tour",
    title: "Sinharaja Rainforest Expedition",
    subtitle: "UNESCO World Heritage Site",
    image: "https://www.srilankanexpeditions.lk/tour_img/1487828611sinharaja_2.jpg",
    timing: "Best Start: 06:00 AM",
    duration: "Full Day Trekking",
    price: "Adventure",
    highlights: ["Guided Jungle Trek", "Endemic Bird Watching", "Natural Waterfalls", "Rare Flora"],
    features: ["Forest Permits Included", "Professional Guide", "AC Van Transport"]
  }
];

export default function Packages() {
  const handleBooking = (pkg) => {
    const msg = 
      `Hello! I'm interested in the *${pkg.title}*.%0A%0A` +
      `*Type:* ${pkg.category.toUpperCase()}%0A` +
      `*Timing:* ${pkg.timing}%0A` +
      `Please provide more details and availability.`;
    window.open(`https://wa.me/${businessInfo.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <section id="packages" className="h-root" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        
        {/* Header */}
        <div className="h-section-hd" style={{ marginBottom: "50px", textAlign: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: "700px" }}>
            <p className="h-eyebrow" style={{ justifyContent: "center" }}>Curated Experiences</p>
            <h2 className="h-section-title" style={{ fontSize: "2.8rem" }}>Our Exclusive <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Packages</em></h2>
            <p className="h-section-sub">All-inclusive family adventures with hassle-free island-wide pickup and drop-off.</p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="h-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {packages.map((pkg) => (
            <div key={pkg.id} className="vc" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              
              {/* Package Image */}
              <div className="vc__img-box" style={{ height: "240px" }}>
                <img src={pkg.image} alt={pkg.title} className="vc__img" />
                <span className="vc-badge vc-badge--tag" style={{ background: "var(--navy)", color: "#fff" }}>
                  {pkg.category}
                </span>
                <span className="vc-badge" style={{ bottom: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "10px" }}>
                  {pkg.duration}
                </span>
              </div>

              {/* Package Content */}
              <div className="vc__body" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <h3 className="vc__name" style={{ fontSize: "1.5rem" }}>{pkg.title}</h3>
                <p className="vc__model" style={{ color: "var(--gold)", marginBottom: "15px" }}>{pkg.subtitle}</p>
                
                <div style={{ marginBottom: "20px" }}>
                   {pkg.highlights.map((h, i) => (
                     <div key={i} style={{ fontSize: "12px", color: "#4b5563", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--navy)" }}>✓</span> {h}
                     </div>
                   ))}
                </div>

                <div className="vc__specs" style={{ marginTop: "auto" }}>
                  <div className="sp">
                    <div className="sp__icon">⏰</div>
                    <div>
                      <p className="sp__lbl">Best Time</p>
                      <p className="sp__val" style={{ fontSize: "10px" }}>{pkg.timing}</p>
                    </div>
                  </div>
                  <div className="sp">
                    <div className="sp__icon">💎</div>
                    <div>
                      <p className="sp__lbl">Inclusion</p>
                      <p className="sp__val">All-Inclusive</p>
                    </div>
                  </div>
                </div>

                <button className="btn-wa" onClick={() => handleBooking(pkg)} style={{ marginTop: "15px", width: "100%" }}>
                   Book This Adventure
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Note Banner */}
        <div style={{ 
            marginTop: "60px", 
            padding: "30px", 
            borderRadius: "24px", 
            background: "var(--gold-light)", 
            border: "1px dashed var(--gold)",
            textAlign: "center"
        }}>
           <h4 style={{ color: "var(--navy-deep)", fontWeight: "800", marginBottom: "10px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>⚠️ Important Travel Note</h4>
           <p style={{ fontSize: "13px", color: "#5a6b8a", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
            Traffic & weather conditions in Sri Lanka can change quickly. We recommend starting your journey 30 minutes earlier to ensure a relaxed, stress-free wildlife encounter!
           </p>
        </div>
      </div>
    </section>
  );
}