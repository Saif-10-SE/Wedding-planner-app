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
    color: 'emerald',
    badgeClass: 'badge-a',
    cardClass: 'card-a',
    icon: '✦',
    gradient: 'from-emerald-800 via-emerald-600 to-emerald-800',
  },
  'B': {
    label: 'Upper Mid-Range',
    tagline: 'Quality Service · Great Value',
    color: 'haldi',
    badgeClass: 'badge-b',
    cardClass: 'card-b',
    icon: '◆',
    gradient: 'from-haldi-700 via-haldi-500 to-haldi-700',
  },
  'C': {
    label: 'Economy',
    tagline: 'Budget Friendly · Reliable',
    color: 'gray',
    badgeClass: 'badge-c',
    cardClass: 'card-c',
    icon: '●',
    gradient: 'from-emerald-600 via-emerald-400 to-emerald-600',
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
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1550005109-ffd4e8d353e3?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80&fit=crop&auto=format"
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
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200&q=80&fit=crop&auto=format",
    gallery: [
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1200&q=80&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=1200&q=80&fit=crop&auto=format"
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
