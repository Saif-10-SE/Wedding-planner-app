// ============================================================
// Lahore Elite Marquees — Complete Database
// Categorized with REALISTIC 2025-26 Lahore Market Pricing
// ============================================================

// Category Classifications:
// A+ (Ultra Luxury): Top-tier 5-star properties, international standards
// A  (Premium): High-end marquees with excellent reputation
// B  (Upper Mid-Range): Good quality, popular choices
// C  (Economy/Standard): Budget-friendly, decent quality

export const categoryInfo = {
  'A+': {
    label: 'Ultra Luxury',
    tagline: 'International Standards · Unmatched Prestige',
    color: 'gold',
    badgeClass: 'badge-aplus',
    cardClass: 'card-aplus',
    icon: '👑',
    gradient: 'from-yellow-600 via-yellow-400 to-yellow-600',
  },
  'A': {
    label: 'Premium',
    tagline: 'Elite Class · Exceptional Quality',
    color: 'burgundy',
    badgeClass: 'badge-a',
    cardClass: 'card-a',
    icon: '✦',
    gradient: 'from-burgundy-800 via-burgundy-600 to-burgundy-800',
  },
  'B': {
    label: 'Upper Mid-Range',
    tagline: 'Quality Service · Great Value',
    color: 'midnight',
    badgeClass: 'badge-b',
    cardClass: 'card-b',
    icon: '◆',
    gradient: 'from-midnight-700 via-midnight-600 to-midnight-700',
  },
  'C': {
    label: 'Economy',
    tagline: 'Budget Friendly · Reliable',
    color: 'gray',
    badgeClass: 'badge-c',
    cardClass: 'card-c',
    icon: '●',
    gradient: 'from-gray-600 via-gray-500 to-gray-600',
  }
};

export const marquees = [
  // =============================================
  // CATEGORY A+ — Ultra Luxury
  // =============================================
  {
    id: 1,
    name: "Royal Palm Golf & Country Club",
    slug: "royal-palm",
    category: "A+",
    location: "Canal Road, Lahore",
    area: "Canal Road",
    description: "The epitome of luxury weddings in Lahore. Sprawling lawns, world-class cuisine, and impeccable 5-star service with helipad access and lush green surroundings.",
    capacity: { min: 500, max: 3000 },
    rating: 4.9,
    reviews: 245,
    image: "https://lh3.googleusercontent.com/p/AF1QipNkTpG9ztXRkjqhZMKMz_vNJ3VxfMxfKbOjh_F_=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipNkTpG9ztXRkjqhZMKMz_vNJ3VxfMxfKbOjh_F_=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipMfWHOGDEjX4hYrVUG0zWnqxFGFHp76E2VB7lVf=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipP4Mu1DHqS6HFQG7qS6K9i5s7kHE_4i8mXO1OJl=s1360-w1360-h1020"
    ],
    amenities: ["Valet Parking", "5-Star Catering", "Bridal Suite", "Prayer Area", "AC Halls", "Outdoor Lawns", "Helipad"],
    pricing: {
      perHead: { min: 3500, max: 7500 },
      hallRental: 350000,
      lawn: 200000
    },
    menuPackages: [
      { name: "Silver", price: 3500, items: ["Main Course (3)", "Starters (3)", "Desserts (2)", "Beverages"] },
      { name: "Gold", price: 4800, items: ["Main Course (4)", "Starters (4)", "Live BBQ Station", "Desserts (3)", "Beverages"] },
      { name: "Platinum", price: 6200, items: ["Main Course (5)", "Starters (5)", "Live Stations (2)", "Desserts (4)", "Premium Beverages", "Imported Items"] },
      { name: "Diamond", price: 7500, items: ["Unlimited Menu", "Live Stations (3)", "Continental + Desi", "Premium Desserts", "Personal Chef Service"] }
    ],
    decorPackages: [
      { name: "Classic", price: 250000, includes: ["Stage Setup", "Basic Lighting", "Flower Arrangements", "Entry Gate"] },
      { name: "Premium", price: 500000, includes: ["Designer Stage", "LED Panels", "Premium Flowers", "Themed Entry", "Ceiling Draping"] },
      { name: "Luxury", price: 850000, includes: ["Custom Design", "Chandelier Setup", "Imported Flowers", "Full Venue Transformation"] },
      { name: "Royal", price: 1500000, includes: ["Celebrity Designer", "International Standards", "Everything Custom", "Fireworks"] }
    ],
    contact: { phone: "+92 42 35761234", email: "events@royalpalm.com.pk" },
    featured: true
  },
  {
    id: 2,
    name: "Pearl Continental Marquee",
    slug: "pc-marquee",
    category: "A+",
    location: "Shahrah-e-Quaid-e-Azam, Lahore",
    area: "Mall Road",
    description: "Pakistan's most iconic 5-star hotel. PC Lahore offers unmatched hospitality with signature cuisine, central Mall Road location, and banquet halls that have hosted countless prestigious events.",
    capacity: { min: 200, max: 1500 },
    rating: 4.8,
    reviews: 312,
    image: "https://lh3.googleusercontent.com/p/AF1QipN7-dLhQw9t5PHW1l2v2y-OgbhAQ0zLxq-kz6aP=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipN7-dLhQw9t5PHW1l2v2y-OgbhAQ0zLxq-kz6aP=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipMgXjJjV0x7Bkse5djTRHBigfDr6zP1EPM_z0fT=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipOkS9cjMfc3pHzM9QgdBBvDMJ0vRdJml7xQs-EV=s1360-w1360-h1020"
    ],
    amenities: ["Valet Parking", "5-Star Kitchen", "Bridal Room", "Mosque", "Multiple Halls", "Rooftop Option"],
    pricing: {
      perHead: { min: 4000, max: 8500 },
      hallRental: 300000,
      lawn: 0
    },
    menuPackages: [
      { name: "Classic", price: 4000, items: ["Continental Menu", "Main Course (3)", "Starters (4)", "Desserts (3)"] },
      { name: "Executive", price: 5500, items: ["Mixed Cuisine", "Main Course (4)", "Live BBQ", "Desserts (4)", "Mocktails"] },
      { name: "Presidential", price: 7000, items: ["International Buffet", "Seafood Station", "Live Cooking", "Premium Desserts"] },
      { name: "Imperial", price: 8500, items: ["Unlimited International", "Chef's Special", "Sushi Counter", "Chocolate Fountain"] }
    ],
    decorPackages: [
      { name: "Elegant", price: 200000, includes: ["Stage Design", "Basic Flowers", "Entrance Decor", "Table Setup"] },
      { name: "Grand", price: 450000, includes: ["Custom Stage", "Premium Florals", "LED Lighting", "Photo Booth"] },
      { name: "Majestic", price: 800000, includes: ["Themed Decor", "Imported Flowers", "Chandeliers", "Full Transformation"] }
    ],
    contact: { phone: "+92 42 36360210", email: "banquets@pchotels.com" },
    featured: true
  },
  // =============================================
  // CATEGORY A — Premium
  // =============================================
  {
    id: 3,
    name: "Faletti's Hotel",
    slug: "falettis",
    category: "A",
    location: "Egerton Road, Lahore",
    area: "Mall Road",
    description: "A heritage landmark since 1880, Faletti's combines colonial charm with modern luxury for timeless wedding celebrations in the heart of Lahore.",
    capacity: { min: 150, max: 800 },
    rating: 4.7,
    reviews: 189,
    image: "https://lh3.googleusercontent.com/p/AF1QipP_FqNVTE9QXF4SkWK0bSOnKOQgEZXfjlkfLrgO=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipP_FqNVTE9QXF4SkWK0bSOnKOQgEZXfjlkfLrgO=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipMR9m7OzBXG7Hx-J0jGxPFVOJB4xq5d9wE_kRpj=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipOcXhFf0T5k7EvUHy4Xc0pE_c1NTiLhOrCcNiSi=s1360-w1360-h1020"
    ],
    amenities: ["Heritage Building", "Gardens", "Bridal Suite", "Valet Parking", "AC Halls"],
    pricing: {
      perHead: { min: 3000, max: 6000 },
      hallRental: 250000,
      lawn: 150000
    },
    menuPackages: [
      { name: "Traditional", price: 3000, items: ["Desi Menu", "Main Course (3)", "Starters (3)", "Desserts (2)"] },
      { name: "Continental", price: 4200, items: ["Mixed Menu", "Main Course (4)", "Starters (4)", "Live Counter"] },
      { name: "Royal", price: 5200, items: ["Premium Buffet", "Main Course (5)", "Live Stations (2)", "Dessert Bar"] },
      { name: "Heritage", price: 6000, items: ["Signature Menu", "Chef's Specials", "Everything Premium"] }
    ],
    decorPackages: [
      { name: "Classic", price: 180000, includes: ["Traditional Stage", "Flower Decor", "Entry Setup"] },
      { name: "Victorian", price: 400000, includes: ["Heritage Theme", "Vintage Decor", "Premium Flowers"] },
      { name: "Royal", price: 700000, includes: ["Custom Everything", "Luxury Florals", "Full Venue"] }
    ],
    contact: { phone: "+92 42 36360660", email: "events@falettis.com" },
    featured: true
  },
  {
    id: 4,
    name: "Nishat Hotel",
    slug: "nishat-hotel",
    category: "A",
    location: "Gulberg III, Lahore",
    area: "Gulberg",
    description: "Modern luxury meets traditional hospitality at Nishat Hotel, featuring contemporary banquet halls and rooftop venue options in the commercial heart of Lahore.",
    capacity: { min: 200, max: 1200 },
    rating: 4.6,
    reviews: 156,
    image: "https://lh3.googleusercontent.com/p/AF1QipME-Mw7mzC-T1J-oXLhJ5b9pPE-2k0YqDFaR_Jb=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipME-Mw7mzC-T1J-oXLhJ5b9pPE-2k0YqDFaR_Jb=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipNx7qZCHGO6lj_RNfCfQ0kqpFSCdRgT1-OG5y1a=s1360-w1360-h1020"
    ],
    amenities: ["Modern Halls", "Rooftop Venue", "Valet Parking", "Bridal Room", "Prayer Area"],
    pricing: {
      perHead: { min: 2800, max: 5500 },
      hallRental: 200000,
      lawn: 0
    },
    menuPackages: [
      { name: "Standard", price: 2800, items: ["Desi Menu", "Main Course (3)", "Starters (3)", "Desserts (2)"] },
      { name: "Deluxe", price: 3800, items: ["Mixed Menu", "Main Course (4)", "Live BBQ", "Desserts (3)"] },
      { name: "Premium", price: 4500, items: ["Premium Buffet", "Main Course (5)", "Live Stations (2)", "Dessert Bar"] },
      { name: "Signature", price: 5500, items: ["Chef Special", "International Items", "Premium Everything"] }
    ],
    decorPackages: [
      { name: "Simple", price: 150000, includes: ["Stage Setup", "Basic Decor", "Flowers"] },
      { name: "Elegant", price: 350000, includes: ["Designer Stage", "Premium Flowers", "Lighting"] },
      { name: "Grand", price: 600000, includes: ["Full Custom", "Imported Items", "Transformation"] }
    ],
    contact: { phone: "+92 42 35776677", email: "events@nishathotels.com" },
    featured: false
  },
  {
    id: 5,
    name: "Lahore Gymkhana",
    slug: "gymkhana",
    category: "A",
    location: "Upper Mall, Lahore",
    area: "Mall Road",
    description: "Exclusive members-only club with sprawling colonial-era lawns and distinguished architecture. The Gymkhana offers a refined setting for Lahore's most prestigious families.",
    capacity: { min: 300, max: 2000 },
    rating: 4.8,
    reviews: 134,
    image: "https://lh3.googleusercontent.com/p/AF1QipPXGY4VhWe0-tY4KTPe5s9R2wBe1-b-SxTq5Cta=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipPXGY4VhWe0-tY4KTPe5s9R2wBe1-b-SxTq5Cta=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipOC9HJVi2lLfFE7hHDJIl4k8rmeWJ3skG8fR0j_=s1360-w1360-h1020"
    ],
    amenities: ["Heritage Venue", "Massive Lawns", "AC Halls", "Reserved Parking", "Members Club"],
    pricing: {
      perHead: { min: 3200, max: 6500 },
      hallRental: 300000,
      lawn: 250000
    },
    menuPackages: [
      { name: "Club Standard", price: 3200, items: ["Traditional Menu", "Main Course (3)", "Starters (4)"] },
      { name: "Club Premium", price: 4200, items: ["Mixed Cuisine", "Main Course (4)", "Live Stations (1)"] },
      { name: "Club Signature", price: 5500, items: ["Premium Buffet", "Chef Specials", "Wide Selection"] },
      { name: "Presidential", price: 6500, items: ["International Menu", "Everything Premium"] }
    ],
    decorPackages: [
      { name: "Traditional", price: 200000, includes: ["Classic Stage", "Garden Setup", "Flowers"] },
      { name: "Elegant", price: 450000, includes: ["Designer Decor", "Lighting", "Premium Florals"] },
      { name: "Grand", price: 800000, includes: ["Full Transformation", "Custom Design", "Premium Everything"] }
    ],
    contact: { phone: "+92 42 36304545", email: "events@gymkhana.org.pk" },
    featured: true
  },
  {
    id: 7,
    name: "Serena Hotel Lahore",
    slug: "serena",
    category: "A",
    location: "Faisal Chowk, Mall Road",
    area: "Mall Road",
    description: "Refined elegance with Aga Khan hospitality standards. Serena offers intimate boutique-style wedding venues with exceptional attention to detail.",
    capacity: { min: 150, max: 1000 },
    rating: 4.7,
    reviews: 98,
    image: "https://lh3.googleusercontent.com/p/AF1QipO-oHA-pvRJ6CjpdLOy0YKodJ0WtFoF3yI51SAs=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipO-oHA-pvRJ6CjpdLOy0YKodJ0WtFoF3yI51SAs=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipOFKJkE8m87S_7Ykg7KYw0FFBnPYjO3y4vWi1IX=s1360-w1360-h1020"
    ],
    amenities: ["Boutique Hotel", "Intimate Setting", "5-Star Service", "Bridal Suite", "Valet"],
    pricing: {
      perHead: { min: 3800, max: 7000 },
      hallRental: 280000,
      lawn: 180000
    },
    menuPackages: [
      { name: "Serena Classic", price: 3800, items: ["Signature Menu", "Main Course (3)", "Appetizers (4)"] },
      { name: "Serena Gold", price: 5000, items: ["Premium Buffet", "Main Course (4)", "Live Stations (2)"] },
      { name: "Serena Platinum", price: 6200, items: ["International Cuisine", "Chef's Table", "Premium All"] },
      { name: "Serena Royal", price: 7000, items: ["Custom Menu", "Everything Bespoke"] }
    ],
    decorPackages: [
      { name: "Elegant", price: 220000, includes: ["Sophisticated Setup", "Quality Flowers", "Tasteful Lighting"] },
      { name: "Luxurious", price: 500000, includes: ["Designer Decor", "Premium Florals", "Full Ambiance"] },
      { name: "Bespoke", price: 900000, includes: ["Custom Everything", "International Standards"] }
    ],
    contact: { phone: "+92 42 111 133 133", email: "lahore@serena.com.pk" },
    featured: true
  },
  // =============================================
  // CATEGORY B — Upper Mid-Range
  // =============================================
  {
    id: 6,
    name: "The Grand Marquee (Packages Mall)",
    slug: "grand-marquee",
    category: "B",
    location: "Packages Mall, Walton Road",
    area: "Walton",
    description: "Modern, spacious wedding venue attached to Packages Mall with massive capacity, contemporary design, and convenient parking.",
    capacity: { min: 500, max: 4000 },
    rating: 4.5,
    reviews: 223,
    image: "https://lh3.googleusercontent.com/p/AF1QipP_7D-SMhp2JmNM4sFzKDfiSxrn7Y3I5Z-0hB7c=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipP_7D-SMhp2JmNM4sFzKDfiSxrn7Y3I5Z-0hB7c=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipPK8-_TdELnLjXjd2Sf5Q0fFNlDi3sOFy2uMZ2Z=s1360-w1360-h1020"
    ],
    amenities: ["Massive Capacity", "Modern Design", "Mall Parking", "Multiple Halls", "AC Throughout"],
    pricing: {
      perHead: { min: 2200, max: 4500 },
      hallRental: 200000,
      lawn: 0
    },
    menuPackages: [
      { name: "Economy", price: 2200, items: ["Basic Menu", "Main Course (3)", "Starters (2)"] },
      { name: "Standard", price: 3000, items: ["Good Menu", "Main Course (3)", "Starters (3)", "Desserts (3)"] },
      { name: "Premium", price: 3800, items: ["Premium Menu", "Main Course (4)", "Live Stations (1)"] },
      { name: "Luxury", price: 4500, items: ["Full Buffet", "Everything Included"] }
    ],
    decorPackages: [
      { name: "Basic", price: 120000, includes: ["Simple Stage", "Basic Decor"] },
      { name: "Standard", price: 280000, includes: ["Good Stage", "Flowers", "Lighting"] },
      { name: "Premium", price: 500000, includes: ["Custom Stage", "Full Decor", "Premium Setup"] }
    ],
    contact: { phone: "+92 42 35893456", email: "info@grandmarquee.pk" },
    featured: false
  },
  {
    id: 10,
    name: "Royal Pines (DHA)",
    slug: "royal-pines",
    category: "B",
    location: "DHA Phase 6, Lahore",
    area: "DHA",
    description: "Modern marquee in upscale DHA with contemporary design, great catering, and popular among DHA and Cantt families.",
    capacity: { min: 300, max: 1500 },
    rating: 4.6,
    reviews: 167,
    image: "https://lh3.googleusercontent.com/p/AF1QipN5yvbBuB3N2c1tmI-GFH3xkQd0lFfp2Ng2JWkL=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipN5yvbBuB3N2c1tmI-GFH3xkQd0lFfp2Ng2JWkL=s1360-w1360-h1020",
      "https://lh3.googleusercontent.com/p/AF1QipOVFGkAaC0-cqsOjZ6J-dS7q1D-T2rMXuR3z7cg=s1360-w1360-h1020"
    ],
    amenities: ["DHA Location", "Modern Design", "Good Parking", "AC Throughout", "Prayer Area"],
    pricing: {
      perHead: { min: 2500, max: 5000 },
      hallRental: 180000,
      lawn: 120000
    },
    menuPackages: [
      { name: "Standard", price: 2500, items: ["Good Menu", "Main Course (3)", "Starters (3)"] },
      { name: "Deluxe", price: 3500, items: ["Better Menu", "Main Course (4)", "Live BBQ"] },
      { name: "Premium", price: 4200, items: ["Premium Menu", "Main Course (4)", "Dessert Bar"] },
      { name: "Elite", price: 5000, items: ["Best Menu", "Everything Premium"] }
    ],
    decorPackages: [
      { name: "Modern", price: 150000, includes: ["Contemporary Stage", "Modern Decor"] },
      { name: "Elegant", price: 350000, includes: ["Designer Setup", "Premium Flowers", "Lighting"] },
      { name: "Luxurious", price: 600000, includes: ["Full Custom", "Best Everything"] }
    ],
    contact: { phone: "+92 42 35691234", email: "events@royalpines.pk" },
    featured: true
  },
  // =============================================
  // CATEGORY C — Economy / Standard
  // =============================================
  {
    id: 8,
    name: "Fortress Stadium Marquee",
    slug: "fortress",
    category: "C",
    location: "Fortress Stadium, Cantt",
    area: "Cantt",
    description: "Spacious and affordable venue in the heart of Cantt with excellent accessibility and professional event management for budget-conscious families.",
    capacity: { min: 400, max: 2500 },
    rating: 4.4,
    reviews: 178,
    image: "https://lh3.googleusercontent.com/p/AF1QipOS6L9BLGiVdSJPVIJveAL_I3I7Wl6RxJQxeK2y=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipOS6L9BLGiVdSJPVIJveAL_I3I7Wl6RxJQxeK2y=s1360-w1360-h1020"
    ],
    amenities: ["Large Capacity", "Easy Access", "Ample Parking", "AC Halls", "Open Areas"],
    pricing: {
      perHead: { min: 1800, max: 3500 },
      hallRental: 120000,
      lawn: 80000
    },
    menuPackages: [
      { name: "Basic", price: 1800, items: ["Simple Menu", "Main Course (2)", "Starters (2)"] },
      { name: "Standard", price: 2400, items: ["Good Menu", "Main Course (3)", "Starters (3)", "Desserts"] },
      { name: "Premium", price: 2900, items: ["Better Menu", "Main Course (3)", "Live BBQ"] },
      { name: "Deluxe", price: 3500, items: ["Full Menu", "Good Selection"] }
    ],
    decorPackages: [
      { name: "Simple", price: 80000, includes: ["Basic Stage", "Simple Decor"] },
      { name: "Good", price: 180000, includes: ["Nice Stage", "Flowers", "Lighting"] },
      { name: "Premium", price: 350000, includes: ["Full Setup", "Quality Decor"] }
    ],
    contact: { phone: "+92 42 36671234", email: "events@fortressmarquee.com" },
    featured: false
  },
  {
    id: 9,
    name: "Barood Khana Marquee",
    slug: "barood-khana",
    category: "C",
    location: "Barood Khana, Mall Road",
    area: "Mall Road",
    description: "Historic location with decent amenities. A popular choice for traditional Lahori families who value location over luxury.",
    capacity: { min: 300, max: 1800 },
    rating: 4.3,
    reviews: 145,
    image: "https://lh3.googleusercontent.com/p/AF1QipN-3A4kJz-BQQiE7VoLnkSdO7yjk5K0nPAQrc0k=s1360-w1360-h1020",
    gallery: [
      "https://lh3.googleusercontent.com/p/AF1QipN-3A4kJz-BQQiE7VoLnkSdO7yjk5K0nPAQrc0k=s1360-w1360-h1020"
    ],
    amenities: ["Historic Location", "Good Parking", "Flexible Spaces", "AC Available"],
    pricing: {
      perHead: { min: 1500, max: 3000 },
      hallRental: 100000,
      lawn: 70000
    },
    menuPackages: [
      { name: "Economy", price: 1500, items: ["Basic Desi", "Main Course (2)", "Starters (2)"] },
      { name: "Standard", price: 2000, items: ["Good Menu", "Main Course (3)", "Starters (3)"] },
      { name: "Premium", price: 2500, items: ["Nice Menu", "Main Course (3)", "Live Counter"] },
      { name: "Special", price: 3000, items: ["Best Menu", "Good Selection"] }
    ],
    decorPackages: [
      { name: "Basic", price: 60000, includes: ["Simple Setup", "Basic Flowers"] },
      { name: "Standard", price: 150000, includes: ["Good Stage", "Nice Decor"] },
      { name: "Premium", price: 300000, includes: ["Full Decor", "Good Setup"] }
    ],
    contact: { phone: "+92 42 37654321", email: "info@baroodkhana.pk" },
    featured: false
  }
];

// Additional services pricing (realistic Lahore 2025-26 market rates)
export const additionalServices = {
  photography: [
    { name: "None / Not Required", price: 0, includes: ["No photography service selected"], isNone: true },
    { name: "Basic Package", price: 75000, includes: ["1 Photographer", "Digital Album", "250 Edited Photos", "USB Drive"] },
    { name: "Standard Package", price: 180000, includes: ["2 Photographers", "Cinematic Highlights", "500 Edited Photos", "1 Reel", "Online Gallery"] },
    { name: "Premium Package", price: 375000, includes: ["2 Photographers + Videographer", "Drone Coverage", "Full Feature Film", "800+ Photos", "Same Day Edit", "Instagram Reels"] },
    { name: "Luxury Package", price: 650000, includes: ["Full Creative Team (5+)", "Aerial Drone", "Documentary Film", "1500+ Photos", "Same Day Edit", "Social Media Package", "Printed Album"] }
  ],
  entertainment: [
    { name: "None / Not Required", price: 0, includes: ["No entertainment service selected"], isNone: true },
    { name: "DJ + Sound", price: 60000, includes: ["Professional DJ", "JBL Sound System", "Basic Dance Lights"] },
    { name: "DJ + Dhol", price: 120000, includes: ["DJ Setup", "Dhol Players (4)", "LED Dance Floor", "Fog Machine"] },
    { name: "Live Band", price: 275000, includes: ["6-Piece Live Band", "Professional Sound", "Stage Lighting", "2 Hour Set"] },
    { name: "Qawwali Night", price: 200000, includes: ["Qawwali Group (8+)", "Traditional Setup", "Cushion Seating Arrangement"] },
    { name: "Celebrity Performance", price: 800000, includes: ["Local Celebrity Artist", "Full Band & Crew", "Premium Stage Setup", "Sound & Lights"] }
  ],
  transport: [
    { name: "None / Not Required", price: 0, includes: ["No bridal transport selected"], isNone: true },
    { name: "Decorated Car", price: 35000, includes: ["Decorated Sedan for Couple", "Flower Decoration", "Chauffeur"] },
    { name: "Luxury Sedan", price: 75000, includes: ["Mercedes / BMW", "1 Escort Vehicle", "Uniformed Chauffeur", "Flower Decor"] },
    { name: "Vintage / Classic", price: 150000, includes: ["Vintage Car (Mustang / Classic)", "Full Floral Decoration", "Photo-ready Setup"] },
    { name: "Royal Convoy", price: 250000, includes: ["Luxury Import (Rolls Royce / Bentley Style)", "Protocol Escort (3 Cars)", "Full Convoy", "Video-ready"] }
  ],
  invitations: [
    { name: "None / Not Required", price: 0, includes: ["No invitation service selected"], isNone: true },
    { name: "Digital Only", price: 20000, includes: ["Animated Video Invite", "WhatsApp / Social Media Formats", "RSVP Tracking"] },
    { name: "Standard Cards", price: 75000, includes: ["300 Premium Cards", "Gold Foil Printing", "Envelopes", "Delivery within Lahore"] },
    { name: "Luxury Box Cards", price: 150000, includes: ["300 Designer Box Invites", "Laser Cut", "Mithai Box", "Personalized"] },
    { name: "Bespoke Collection", price: 250000, includes: ["Custom Artisan Design", "Premium Handmade Paper", "Wax Seal", "Hand Delivery", "Matching Suite (Save the Date, Menu, Thank You)"] }
  ]
};

// Helper function to format price in PKR
export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `PKR ${(price/10000000).toFixed(1)} Cr`;
  }
  if (price >= 100000) {
    return `PKR ${(price/100000).toFixed(1)} Lac`;
  }
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Format price short (for cards, etc.)
export const formatPriceShort = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Get marquee by slug
export const getMarqueeBySlug = (slug) => {
  return marquees.find(m => m.slug === slug);
};

// Get featured marquees
export const getFeaturedMarquees = () => {
  return marquees.filter(m => m.featured);
};

// Get marquees by category
export const getMarqueesByCategory = (category) => {
  return marquees.filter(m => m.category === category);
};

// Get category badge class
export const getCategoryBadge = (category) => {
  return categoryInfo[category] || categoryInfo['C'];
};

// Filter marquees by criteria
export const filterMarquees = (filters) => {
  let filtered = [...marquees];
  
  if (filters.area) {
    filtered = filtered.filter(m => m.area === filters.area);
  }
  
  if (filters.category) {
    filtered = filtered.filter(m => m.category === filters.category);
  }
  
  if (filters.minCapacity) {
    filtered = filtered.filter(m => m.capacity.max >= filters.minCapacity);
  }
  
  if (filters.maxBudget) {
    filtered = filtered.filter(m => m.pricing.perHead.min <= filters.maxBudget);
  }
  
  if (filters.minRating) {
    filtered = filtered.filter(m => m.rating >= filters.minRating);
  }
  
  return filtered;
};

// Get all areas
export const getAreas = () => {
  return [...new Set(marquees.map(m => m.area))];
};

// Get all categories
export const getCategories = () => {
  return ['A+', 'A', 'B', 'C'];
};
