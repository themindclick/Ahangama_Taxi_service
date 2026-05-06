// src/data/vehicles.jsx

export const vehicles = [
  {
    id: "budget",
    label: "Budget",
    model: "Suzuki Wagon R or similar",
    categories: ["rental", "airport",],
    capacity: "Up to 2 Passengers",
    baggage: "2 Small Luggage",
    note: "Vehicle capacity may vary based on the size and quantity of passenger luggage.",
    image: "https://www.popularmaruti.com/blog/wp-content/uploads/2022/12/20903608375b891fb77e8402.66922053.jpg",
    price: "Economy",
    features: ["AC", "Clean Interior"]
  },
  {
    id: "sedan",
    label: "Sedan",
    model: "Toyota Prius / Honda Fit Shuttle GP2",
    categories: ["airport", ],
    capacity: "2 - 3 Passengers",
    baggage: "2 - 3 Medium & Large Luggage",
    note: "Vehicle capacity may vary based on the size and quantity of passenger luggage.",
    image: "https://mkt-vehicleimages-prd.autotradercdn.ca/photos/chrome/Expanded/White/2014TOY010a/2014TOY010a01.jpg",
    price: "Premium",
    features: ["Dual AC", "Spacious"]
  },
  {
    id: "medium-van",
    label: "Medium Van",
    model: "Toyota Noah",
    categories: ["airport", ],
    capacity: "2 - 5 Passengers",
    baggage: "3 - 5 Medium & Large Luggage",
    note: "Vehicle capacity may vary based on the size and quantity of passenger luggage.",
    image: "https://paultan.org/image/2014/01/2014_Toyota_Noah_07.jpg",
    price: "Family Choice",
    features: ["Extra Legroom", "Comfort"]
  },
  {
    id: "van-big",
    label: "Van Big",
    model: "Toyota KDH Flat Roof",
    categories: ["airport", ],
    capacity: "2 - 6 Passengers",
    baggage: "6 - 7 Large Luggage",
    note: "Vehicle capacity may vary based on the size and quantity of passenger luggage.",
    image: "https://catourssrilanka.com/wp-content/uploads/2025/02/11-Toyota-KDH-201.png",
    price: "Group",
    features: ["High Capacity", "Stable"]
  },
  {
    id: "van-bigger",
    label: "Van Bigger",
    model: "Toyota KDH High Roof",
    categories: ["airport", ],
    capacity: "2 - 10 Passengers",
    baggage: "8 - 10 Large Luggage",
    note: "Vehicle capacity may vary based on the size and quantity of passenger luggage.",
    image: "https://w0.peakpx.com/wallpaper/93/799/HD-wallpaper-of-toyota-hiace-combi-high-roof-2010-toyota-kdh.jpg",
    price: "Max Capacity",
    features: ["Max Space", "Tour Ready"]
  },
  {
    id: "scooter",
    label: "Scooter",
    model: "Honda Dio / Yamaha RayZR",
    categories: ["rental"],
    capacity: "2 Passengers",
    baggage: "None",
    note: "Helmets provided.",
    image: "https://imgd.aeplcdn.com/664x374/n/1xbebgb_1837952.jpg?q=80",
    price: "Daily Rate",
    features: ["Fuel Efficient"]
  },
  {
    id: "tuktuk",
    label: "Tuk Tuk",
    model: "Bajaj RE",
    categories: ["rental", ],
    capacity: "3 Passengers",
    baggage: "1 Small Bag",
    note: "Local vibes.",
    image: "https://tuktukrentsrilanka.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-30-at-7.39.13-AM.jpeg",
    price: "Local Rate",
    features: ["Open Air"]
  }
];

export const serviceTypes = [
  { 
    id: "airport", 
    label: "Airport Transfer", 
    icon: "✈️", 
    scroll: false, 
    desc: "Comfortable pickup & drop to all airports" 
  },
  { 
    id: "instant", 
    label: "Customize Tour", 
    icon: "🧳", 
    scroll: false, 
    desc: "Tailor-made packages just for you" 
  },
  { 
    id: "safari", 
    label: "Private Tours", 
    icon: "🐘", 
    scroll: true, 
    // FIX: This must match the ID you added to your component (safari-id)
    target: "safari-id", 
    desc: "Udawalawe, Yala & more wildlife adventures" 
  },
  { 
    id: "tour", 
    label: "Day Tours", 
    icon: "🗺️", 
    scroll: true, 
    // FIX: This must match the ID you added to your component (tour-id)
    target: "tour-id", 
    desc: "Explore the beauty of Sri Lanka with us" 
  },
  { 
    id: "rental", 
    label: "Daily Rentals", 
    icon: "🚕", 
    scroll: false, 
    desc: "Daily travel needs" 
  },
];
export const businessInfo = {
  whatsapp: "94773744432",
  googleApiKey: "AIzaSyBmORHcnKutmtalu-EkLoioNuQVKza-6DE" // Replace with your actual key
};