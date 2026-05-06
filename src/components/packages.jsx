import React from "react";
import { businessInfo } from "../data/vehicles";

const packages = [
  // --- SAFARI PACKAGES ---
  {
    id: "yala",
    category: "safari",
    title: "The Premier Yala Safari",
    subtitle: "Highest Leopard Density in the World",
    image: "https://www.reservationyala.lk/_next/image?url=%2Fimages%2Fexpert-guide%25202.jpg&w=3840&q=75",
    timing: "Morning or Afternoon (6:00 AM – 6:00 PM)",
    duration: "2.5 - 3 Hours Travel",
    price: "All-Inclusive",
    highlights: ["Free water bottle", "Comfortable A/C car or van with pickup & drop-off", "Private 4x4 safari jeep", "Safari entrance tickets", "Experienced safari jeep driver (English Guide)", "Expressway tolls", "Parking and vehicle expenses"],
    excluding: ["Meals", "Personal / private expenses"],
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
    highlights: ["Free water bottle", "Comfortable A/C car or van with pickup & drop-off", "Elephant Transit Home ticket", "Private 4x4 safari jeep", "Safari entrance tickets", "Experienced safari jeep driver (English Guide)", "Expressway tolls", "Parking and vehicle expenses"],
    excluding: ["Meals", "Personal / private expenses"],
    features: ["Private AC Transport", "Expert Tracker", "Snack Breaks Included"]
  },
  {
    id: "mirissa-whale",
    category: "safari",
    title: "Mirissa Whale Watching",
    subtitle: "Ocean Giants & Scenic Hills",
    image: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?q=80&w=2070&auto=format&fit=crop",
    timing: "Strict Start: 06:00 AM",
    duration: "Morning Session",
    price: "Ocean Choice",
    highlights: ["Blue Whale Watching", "Coconut Tree Hill", "Luxury Boat Session", "Harbor Fees", "Free water bottle", "Expressway tolls & Parking"],
    excluding: ["Main Meals", "Personal snorkeling equipment rentals"],
    features: ["Private Transport", "Life Jackets", "Harbor Taxes Included"]
  },

  // --- TOUR PACKAGES ---
  {
    id: "galle-city",
    category: "tour",
    title: "Galle City & Coastal Heritage",
    subtitle: "16th-Century Dutch Fort & Turtles",
    image: "https://www.archaeology.lk/wp-content/uploads/2020/11/galle_fort_sri_lanka_aerial_view_buddhika_dilshan.jpg",
    timing: "08:30 AM or 09:00 AM",
    duration: "Flexible",
    price: "Coastal",
    highlights: ["Galle Dutch Fort", "Turtle Hatchery", "Stilt Fishermen", "Jungle Beach", "Free water bottle", "Pickup & drop-off included", "Expressway tolls & Parking"],
    excluding: ["Meals", "Personal / private expenses"],
    features: ["Private AC Car/Van", "Authentic Tuk-Tuk Option", "Entry Fees Included"]
  },
  {
    id: "ella-adventure",
    category: "tour",
    title: "Ella Highland Adventure",
    subtitle: "Misty Mountains & Iconic Bridges",
    image: "https://www.arugambayagenda.com/wp-content/uploads/2024/07/stock-photo-train-arriving-famous-nine-arches-bridge-ella-sri-lanka.jpeg",
    timing: "05:30 AM – 06:00 AM",
    duration: "Full Day Trip",
    price: "Highland",
    highlights: ["Nine Arch Bridge", "Little Adam’s Peak", "Ravana Waterfall", "Ella Town", "Free water bottle", "Expressway tolls & Parking"],
    excluding: ["Meals", "Personal / private expenses"],
    features: ["Private AC Transport", "Expert Driver-Guide", "Highway Tolls Included"]
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
    highlights: ["64-Island Boat Tour", "Fish Massage", "Cinnamon Island", "Moonstone Mines", "Free water bottle", "Pickup & drop-off included"],
    excluding: ["Lunch", "Beverages", "Personal tips"],
    features: ["Private Transport", "Fish Massage Entry", "Tuk-Tuk Option Available"]
  },
  {
    id: "heritage-tea",
    category: "tour",
    title: "Heritage Tea & Lake Serenity",
    subtitle: "Tea Culture & Peaceful Waters",
    image: "https://surmountventures.net/wp-content/uploads/2022/01/tea-plantation.jpg",
    timing: "Recommended: 09:00 AM",
    duration: "Half Day",
    price: "New Experience",
    highlights: ["Handunugoda Tea Estate", "Koggala Lake Boat Safari", "Virgin White Tea Tasting", "Folk Museum", "Free water bottle", "Pickup & drop-off included"],
    excluding: ["Food", "Personal purchases at Tea Shop", "Museum entry fees"],
    features: ["Private Transport", "Estate Tour Included", "Lake Boat Safari"]
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
    highlights: ["Guided Jungle Trek", "Endemic Bird Watching", "Natural Waterfalls", "Rare Flora", "Free water bottle", "Pickup & drop-off included"],
    excluding: ["Meals", "Personal / private expenses"],
    features: ["Forest Permits Included", "Professional Guide", "AC Van Transport"]
  },

  // --- MULTI-DAY TOURS ---
  {
    id: "tour-01",
    category: "tour",
    title: "HIGHLAND ESCAPE",
    subtitle: "Misty Hills & Tea Estates",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=2000",
    timing: "03 Days / 02 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Ella (Rawana Waterfalls & Little Adam’s Peak Sunset) - Night Stop: Ella",
      "Day 02: Ella ➡️ Nuwara Eliya (Nine Arch Bridge, Scenic Train Ride (Optional) & Tea Factory) - Night Stop: Nuwara Eliya",
      "Day 03: Nuwara Eliya ➡️ Airport/Ahangama (Gregory Lake & Victoria Park - Scenic drive to final destination)",
      "Included: ✅ Private AC Transport, Fuel, Highway Tolls"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Expert Driver-Guide", "Scenic Highland Route", "Flexible Pace"]
  },
  {
    id: "tour-02",
    category: "tour",
    title: "THE CULTURAL QUICK LOOK",
    subtitle: "Ancient Cities & Sacred Temples",
    image: "https://www.attractionsinsrilanka.com/wp-content/uploads/2019/09/sigiriya-rock-1.jpg",
    timing: "03 Days / 02 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Kandy (Temple of the Sacred Tooth Relic & Kandy Cultural Dance Show) - Night Stop: Kandy",
      "Day 02: Kandy ➡️ Sigiriya (Royal Botanical Gardens (Peradeniya) & Dambulla Cave Temple) - Night Stop: Sigiriya",
      "Day 03: Sigiriya ➡️ Airport/Ahangama (Sigiriya Lion Rock Fortress or Pidurangala Rock - Return journey)",
      "Included: ✅ Private AC Transport, Expert Driver-Guide"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Cultural Heritage Sites", "Private AC Transport", "Professional Guidance"]
  },
  {
    id: "tour-03",
    category: "tour",
    title: "SCENIC HILLS & SPIRITUAL TOWER",
    subtitle: "Mountains, Temples & 360-Degree Views",
    image: "https://sandinmysuitcase.com/wp-content/uploads/2021/04/Kandy-Sri-Lanka.jpg",
    timing: "04 Days / 03 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Ella (Rawana Falls & Nine Arch Bridge) - Night Stop: Ella",
      "Day 02: Ella ➡️ Kandy (Little Adam’s Peak & Scenic drive to Kandy via mountains) - Night Stop: Kandy",
      "Day 03: Kandy ➡️ Ambuluwawa (Temple of the Tooth & the 360-degree Ambuluwawa Tower) - Night Stop: Kandy",
      "Day 04: Kandy ➡️ Airport/Ahangama (Spice Garden & Gem Museum - Final drop-off)",
      "Included: ✅ Multilingual Transport, Highway/Parking fees"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Mountain Scenery", "Ambuluwawa Tower Visit", "Gem & Spice Tours"]
  },
  {
    id: "tour-04",
    category: "tour",
    title: "WILDLIFE & HIGHLAND TRAIL",
    subtitle: "Elephants, Waterfalls & Iconic Trains",
    image: "https://www.teardrop-hotels.com/goatfell/wp-content/uploads/sites/5/2024/07/Nuwara-Eliya-City-Tour-1200x630-1.jpg",
    timing: "04 Days / 03 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Udawalawe (Visit: Elephant Transit Home & Afternoon Safari at Udawalawe Park) - Night Stop: Udawalawe",
      "Day 02: Udawalawe ➡️ Nuwara Eliya (Visit: Tea Plantations & Ramboda Waterfalls) - Night Stop: Nuwara Eliya",
      "Day 03: Nuwara Eliya ➡️ Ella (Visit: Gregory Lake & iconic Train Ride from Nanu Oya to Ella) - Night Stop: Ella",
      "Day 04: Ella ➡️ Airport/Ahangama (Visit: Nine Arch Bridge & Rawana Falls - Return journey)",
      "Included: ✅ Private Transport, Driver-Guide"
    ],
    excluding: ["Safari Jeep Fees", "Hotels", "Meals", "Entry Tickets"],
    features: ["Wildlife Safari", "Famous Train Journey", "Tea Country Scenery"]
  },
  {
    id: "tour-05",
    category: "tour",
    title: "ANCIENT KINGDOMS & WILDLIFE",
    subtitle: "History, Village Life & Safari",
    image: "https://netscowork.com/wp-content/uploads/2024/06/pexels-lyn-hoare-2778850-5042817-scaled.webp",
    timing: "05 Days / 04 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Ella (Visit: Rawana Falls & Nine Arch Bridge) - Night Stop: Ella",
      "Day 02: Ella ➡️ Sigiriya (Visit: Little Adam's Peak & Travel to the Cultural Triangle) - Night Stop: Sigiriya",
      "Day 03: Sigiriya Exploration (Visit: Sigiriya Rock Fortress, Village Tour (Bullock Cart ride), & Minneriya Safari) - Night Stop: Sigiriya",
      "Day 04: Sigiriya ➡️ Kandy (Visit: Dambulla Cave Temple & Spice Garden Matale) - Night Stop: Kandy",
      "Day 05: Kandy ➡️ Airport/Ahangama (Visit: Temple of the Tooth & Peradeniya Gardens - Final drop-off)",
      "Included: ✅ Full AC Transport, Highway Fees, Pro Guide"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Cultural Triangle Tour", "Authentic Village Experience", "Sigiriya Rock Fortress"]
  },
  {
    id: "tour-06",
    category: "tour",
    title: "ADVENTURE & TEA COUNTRY",
    subtitle: "Rafting, Waterfalls & Mountain Trails",
    image: "https://www.travelmapsrilanka.com/destinations/destinationimages/visit-devon-falls.webp",
    timing: "05 Days / 04 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Kitulgala (Visit: White Water Rafting & Adventure activities in the river) - Night Stop: Kitulgala",
      "Day 02: Kitulgala ➡️ Nuwara Eliya (Visit: St. Clair’s and Devon Waterfalls) - Night Stop: Nuwara Eliya",
      "Day 03: Nuwara Eliya ➡️ Ella (Visit: Tea Factory & Hill Country Train Journey) - Night Stop: Ella",
      "Day 04: Ella Exploration (Visit: Nine Arch Bridge & Little Adam's Peak) - Night Stop: Ella",
      "Day 05: Ella ➡️ Airport/Ahangama (Visit: Rawana Falls - End of tour)",
      "Included: ✅ Private AC Transport, Adventure Coordination"
    ],
    excluding: ["Adventure Activity Fees", "Hotels", "Meals", "Entry Tickets"],
    features: ["Water Rafting Adventure", "Hill Country Train", "Waterfall Photography"]
  },
  {
    id: "tour-07",
    category: "tour",
    title: "THE GRAND CEYLON ADVENTURE",
    subtitle: "Complete Hill Country Experience",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/bc/05/aa/ella.jpg?w=1400&h=-1&s=1",
    timing: "06 Days / 05 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Ella (Rawana Falls/Nine Arch) - Night Stop: Ella",
      "Day 02: Ella ➡️ Nuwara Eliya (Train Journey/Gregory Lake) - Night Stop: Nuwara Eliya",
      "Day 03: Nuwara Eliya ➡️ Kandy (Tea Factory/Ramboda Falls) - Night Stop: Kandy",
      "Day 04: Kandy ➡️ Sigiriya (Temple of Tooth/Dambulla Caves) - Night Stop: Sigiriya",
      "Day 05: Sigiriya ➡️ Matale (Sigiriya Rock/Pidurangala/Spice Garden) - Night Stop: Sigiriya",
      "Day 06: Sigiriya ➡️ Airport/Ahangama (Drop-off)",
      "Included: ✅ Private AC Transport, Fuel & Highway Tolls"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Grand Circular Route", "Comprehensive Site Visits", "Private AC Transport"]
  },
  {
    id: "tour-08",
    category: "tour",
    title: "SPIRITUAL & ANCIENT NORTH",
    subtitle: "Sacred Cities & Ancient Capitals",
    image: "https://www.yogawinetravel.com/wp-content/uploads/2019/04/Anuradhapura-ticket-in-front-of-the-Twin-Ponds-in-Sri-Lanka_feature.jpg",
    timing: "07 Days / 06 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Ella - Night Stop: Ella",
      "Day 02: Ella ➡️ Nuwara Eliya - Night Stop: Nuwara Eliya",
      "Day 03: Nuwara Eliya ➡️ Kandy - Night Stop: Kandy",
      "Day 04: Kandy ➡️ Ambuluwawa ➡️ Kandy - Night Stop: Kandy",
      "Day 05: Kandy ➡️ Sigiriya (Dambulla Caves) - Night Stop: Sigiriya",
      "Day 06: Sigiriya ➡️ Anuradhapura (First Ancient Capital) - Night Stop: Anuradhapura",
      "Day 07: Anuradhapura ➡️ Airport/Ahangama",
      "Included: ✅ Private AC Transport, Professional Driver-Guide"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Ancient Capital Tour", "Spiritual Sites", "Private AC Transport"]
  },
  {
    id: "tour-09",
    category: "tour",
    title: "HERITAGE & WILDLIFE EXPEDITION",
    subtitle: "Safaris & Ancient Cities",
    image: "https://www.laurewanders.com/wp-content/uploads/2025/01/A-day-in-Polonnaruwa-00001.jpg",
    timing: "08 Days / 07 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Yala - Night: Yala",
      "Day 02: Yala Safari ➡️ Ella - Night: Ella",
      "Day 03: Ella Highlights (Train/Nine Arch) - Night: Ella",
      "Day 04: Ella ➡️ Kandy - Night: Kandy",
      "Day 05: Kandy City & Temple - Night: Kandy",
      "Day 06: Kandy ➡️ Sigiriya - Night: Sigiriya",
      "Day 07: Sigiriya Rock & Polonnaruwa Ancient City - Night: Sigiriya",
      "Day 08: Sigiriya ➡️ Airport/Ahangama",
      "Included: ✅ Private AC Transport, Expert Navigation"
    ],
    excluding: ["Safari Jeep Fees", "Hotels", "Meals", "Entry Tickets"],
    features: ["Dual Safari Opportunity", "Ancient City Heritage", "Complete Regional Tour"]
  },
  {
    id: "tour-10",
    category: "tour",
    title: "THE ULTIMATE SRI LANKAN JOURNEY",
    subtitle: "Full Island Exploration",
    image: "https://content.r9cdn.net/rimg/dimg/16/71/1bacba85-city-46478-169110981a8.jpg?width=1366&height=768&xhint=1958&yhint=842&crop=true",
    timing: "10 Days / 09 Nights",
    duration: "Multi-Day Journey",
    price: "Custom",
    highlights: [
      "Day 01: Ahangama ➡️ Udawalawe (Safari) - Night: Udawalawe",
      "Day 02: Udawalawe ➡️ Ella - Night: Ella",
      "Day 03: Ella Highlights - Night: Ella",
      "Day 04: Ella ➡️ Nuwara Eliya (Train) - Night: Nuwara Eliya",
      "Day 05: Nuwara Eliya ➡️ Kandy - Night: Kandy",
      "Day 06: Kandy & Ambuluwawa - Night: Kandy",
      "Day 07: Kandy ➡️ Sigiriya (Dambulla) - Night: Sigiriya",
      "Day 08: Sigiriya Rock & Village Tour - Night: Sigiriya",
      "Day 09: Sigiriya ➡️ Negombo (Beach relaxation) - Night: Negombo",
      "Day 10: Negombo ➡️ Airport Drop-off",
      "Included: ✅ Full Tour Transport, Highway Fees, Driver-Guide"
    ],
    excluding: ["Hotels", "Meals", "Entry Tickets"],
    features: ["Complete Tour", "Wildlife, Hill Country & Beach", "All Major Landmarks"]
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

  const safariPackages = packages.filter(pkg => pkg.category === "safari");
  const tourPackages = packages.filter(pkg => pkg.category === "tour");

  const PackageCard = ({ pkg }) => (
    <div key={pkg.id} className="vc" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="vc__img-box" style={{ height: "240px" }}>
        <img src={pkg.image} alt={pkg.title} className="vc__img" />
        <span className="vc-badge vc-badge--tag" style={{ background: "var(--navy)", color: "#fff", textTransform: 'capitalize' }}>
          {pkg.category}
        </span>
        <span className="vc-badge" style={{ bottom: "10px", right: "10px", background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: "10px" }}>
          {pkg.duration}
        </span>
      </div>

      <div className="vc__body" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <h3 className="vc__name" style={{ fontSize: "1.5rem" }}>{pkg.title}</h3>
        <p className="vc__model" style={{ color: "var(--gold)", marginBottom: "15px" }}>{pkg.subtitle}</p>

        <div style={{ marginBottom: "15px" }}>
          {pkg.highlights.map((h, i) => (
            <div key={i} style={{ fontSize: "12px", color: "#4b5563", marginBottom: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#16a34a" }}>✓</span> {h}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "20px", padding: "10px", background: "#fff5f5", borderRadius: "10px" }}>
          <p style={{ fontSize: "10px", fontWeight: "800", color: "#c53030", textTransform: "uppercase", marginBottom: "5px" }}>
            Not Included:
          </p>
          {pkg.excluding.map((ex, i) => (
            <div key={i} style={{ fontSize: "11px", color: "#7f8c8d", marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "#c53030" }}>✕</span> {ex}
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
  );

  return (
    <section id="packages" className="h-root" style={{ padding: "80px 20px" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
        
        {/* Main Header */}
        <div className="h-section-hd" style={{ marginBottom: "50px", textAlign: "center", justifyContent: "center" }}>
          <div style={{ maxWidth: "700px" }}>
            <p className="h-eyebrow" style={{ justifyContent: "center" }}>Curated Experiences</p>
            <h2 className="h-section-title" style={{ fontSize: "2.8rem" }}>
              Our Exclusive <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Packages</em>
            </h2>
          </div>
        </div>

        {/* --- SAFARI PACKAGES SECTION --- */}
        <h3 style={{ fontSize: "2rem", marginBottom: "30px", borderLeft: "5px solid var(--gold)", paddingLeft: "15px", color: "var(--navy-deep)" }}>
          Safari Packages
        </h3>
        <div id="safari-id" className="h-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", marginBottom: "80px" }}>
          {safariPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>

        {/* --- TOUR PACKAGES SECTION --- */}
        <h3 style={{ fontSize: "2rem", marginBottom: "30px", borderLeft: "5px solid var(--gold)", paddingLeft: "15px", color: "var(--navy-deep)" }}>
          Tour Packages
        </h3>
        <div id="tour-id" className="h-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}>
          {tourPackages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>

        {/* Travel Note */}
        <div style={{
          marginTop: "60px",
          padding: "30px",
          borderRadius: "24px",
          background: "var(--gold-light)",
          border: "1px dashed var(--gold)",
          textAlign: "center"
        }}>
          <h4 style={{ color: "var(--navy-deep)", fontWeight: "800", marginBottom: "10px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>
            ⚠️ Important Travel Note
          </h4>
          <p style={{ fontSize: "13px", color: "#5a6b8a", maxWidth: "800px", margin: "0 auto", lineHeight: "1.6" }}>
            Traffic & weather conditions in Sri Lanka can change quickly. We recommend starting your journey 30 minutes earlier.
          </p>
        </div>
      </div>
    </section>
  );
}