// ============================================================
// Lahore Wedding Menu — Per-Event Intelligent Menu System
// Each event type (Mehndi, Barat, Valima, etc.) has:
//   - Own recommended dishes
//   - Own pricing multiplier
//   - Own character & style
// ============================================================

export const categoryMultipliers = {
  'A+': 1.0,
  'A': 0.85,
  'B': 0.70,
  'C': 0.55,
};

// ============================================================
// EVENT TYPES — Each with distinct character
// ============================================================
export const eventTypes = {
  mehndi: {
    id: 'mehndi',
    name: 'Mehndi',
    urdu: 'مہندی',
    icon: '🌿',
    emoji: '💛',
    color: 'mehndi',
    gradient: 'from-mehndi-500 via-mehndi-400 to-haldi-400',
    bgClass: 'event-mehndi',
    textColor: 'text-mehndi-700',
    borderColor: 'border-mehndi-400',
    bgColor: 'bg-mehndi-50',
    badgeBg: 'bg-mehndi-500',
    description: 'Festive & light — chaat, BBQ, and vibrant flavors',
    menuStyle: 'Lighter menu with traditional live stations & BBQ focus',
    pricingMultiplier: 0.75, // Mehndi is lighter, less per head
    suggestedGuestRatio: 0.8, // usually fewer guests than Barat
  },
  barat: {
    id: 'barat',
    name: 'Barat',
    urdu: 'بارات',
    icon: '👑',
    emoji: '❤️',
    color: 'primary',
    gradient: 'from-primary-800 via-primary-600 to-primary-500',
    bgClass: 'event-barat',
    textColor: 'text-primary-800',
    borderColor: 'border-primary-400',
    bgColor: 'bg-neutral-50',
    badgeBg: 'bg-primary-700',
    description: 'Grand & heavy — full traditional menu, maximum dishes',
    menuStyle: 'Heavy traditional menu with premium dishes & maximum variety',
    pricingMultiplier: 1.0, // Barat is the main event, full pricing
    suggestedGuestRatio: 1.0,
  },
  valima: {
    id: 'valima',
    name: 'Valima',
    urdu: 'ولیمہ',
    icon: '🌙',
    emoji: '💚',
    color: 'emerald',
    gradient: 'from-emerald-700 via-emerald-500 to-emerald-400',
    bgClass: 'event-valima',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-400',
    bgColor: 'bg-emerald-50',
    badgeBg: 'bg-emerald-600',
    description: 'Elegant mix — continental + traditional, sophisticated',
    menuStyle: 'Elegant continental + traditional mix, balanced premium',
    pricingMultiplier: 0.90,
    suggestedGuestRatio: 0.85,
  },
  nikkah: {
    id: 'nikkah',
    name: 'Nikkah',
    urdu: 'نکاح',
    icon: '📿',
    emoji: '🤍',
    color: 'accent',
    gradient: 'from-accent-600 via-accent-400 to-accent-500',
    bgClass: 'event-nikkah',
    textColor: 'text-accent-700',
    borderColor: 'border-accent-400',
    bgColor: 'bg-accent-50',
    badgeBg: 'bg-accent-500',
    description: 'Intimate & refined — quality over quantity',
    menuStyle: 'Refined menu focused on quality, fewer but premium choices',
    pricingMultiplier: 0.65,
    suggestedGuestRatio: 0.5,
  },
  engagement: {
    id: 'engagement',
    name: 'Engagement',
    urdu: 'منگنی',
    icon: '💍',
    emoji: '💗',
    color: 'rose',
    gradient: 'from-rose-700 via-rose-500 to-rose-400',
    bgClass: 'event-engagement',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-400',
    bgColor: 'bg-rose-50',
    badgeBg: 'bg-rose-600',
    description: 'Sweet & celebratory — focus on desserts & starters',
    menuStyle: 'Focus on starters, sweets, and celebratory items',
    pricingMultiplier: 0.60,
    suggestedGuestRatio: 0.4,
  },
};

// ============================================================
// MENU CATEGORIES & DISHES
// ============================================================
export const menuCategories = [
  {
    id: 'starters',
    name: 'Starters',
    icon: '🥗',
    description: 'Soups, salads, and appetizers',
    minSelect: 0,
    maxSelect: 6,
    dishes: [
      { id: 'chicken-corn-soup', name: 'Chicken Corn Soup', basePrice: 350, unit: 'per head', popular: true },
      { id: 'hot-sour-soup', name: 'Hot & Sour Soup', basePrice: 350, unit: 'per head', popular: false },
      { id: 'cream-of-mushroom', name: 'Cream of Mushroom Soup', basePrice: 399, unit: 'per head', popular: false },
      { id: 'russian-salad', name: 'Russian Salad', basePrice: 1000, unit: 'per kg', popular: true },
      { id: 'macaroni-salad', name: 'Macaroni Salad', basePrice: 500, unit: 'per kg', popular: false },
      { id: 'fruit-chaat', name: 'Fruit Chaat', basePrice: 1000, unit: 'per kg', popular: true },
      { id: 'aloo-samosa', name: 'Aloo Samosa', basePrice: 100, unit: 'per pc', popular: true },
      { id: 'veg-spring-rolls', name: 'Vegetable Spring Rolls', basePrice: 80, unit: 'per pc', popular: false },
      { id: 'chicken-spring-rolls', name: 'Chicken Spring Rolls', basePrice: 100, unit: 'per pc', popular: false },
      { id: 'fish-fingers', name: 'Fish Fingers', basePrice: 1999, unit: 'per kg', popular: false },
      { id: 'dahi-baray', name: 'Dahi Baray', basePrice: 500, unit: 'per kg', popular: true },
      { id: 'pakoras', name: 'Assorted Pakoras', basePrice: 699, unit: 'per kg', popular: false },
    ]
  },
  {
    id: 'chicken',
    name: 'Main Course — Chicken',
    icon: '🍗',
    description: 'Chicken curries and specialties',
    minSelect: 1,
    maxSelect: 4,
    dishes: [
      { id: 'chicken-karahi', name: 'Chicken Karahi', basePrice: 550, popular: true },
      { id: 'chicken-qorma', name: 'Chicken Qorma', basePrice: 500, popular: true },
      { id: 'chicken-makhni', name: 'Chicken Makhni Handi', basePrice: 600, popular: true },
      { id: 'chicken-achari', name: 'Chicken Achari', basePrice: 520, popular: false },
      { id: 'chicken-jalfrezi', name: 'Chicken Jalfrezi', basePrice: 500, popular: false },
      { id: 'chicken-white-karahi', name: 'Chicken White Karahi', basePrice: 550, popular: true },
      { id: 'chicken-handi', name: 'Chicken Handi Lazeez', basePrice: 530, popular: false },
      { id: 'butter-chicken', name: 'Butter Chicken', basePrice: 580, popular: true },
      { id: 'chicken-changezi', name: 'Chicken Changezi', basePrice: 520, popular: false },
      { id: 'chicken-malai-boti-curry', name: 'Malai Boti Curry', basePrice: 600, popular: false },
    ]
  },
  {
    id: 'beef-mutton',
    name: 'Main Course — Beef / Mutton',
    icon: '🥩',
    description: 'Beef and mutton specialties',
    minSelect: 0,
    maxSelect: 3,
    dishes: [
      { id: 'beef-qorma', name: 'Beef Qorma', basePrice: 1500, popular: true },
      { id: 'mutton-karahi', name: 'Mutton Karahi', basePrice: 1800, popular: true },
      { id: 'mutton-kunna', name: 'Mutton Kunna', basePrice: 1700, popular: true },
      { id: 'beef-nihari', name: 'Beef Nihari', basePrice: 1500, popular: true },
      { id: 'beef-pasanday', name: 'Beef Pasanday', basePrice: 1500, popular: false },
      { id: 'mutton-rogan-josh', name: 'Mutton Rogan Josh', basePrice: 1800, popular: false },
      { id: 'beef-seekh-handi', name: 'Beef Seekh Handi', basePrice: 1500, popular: false },
      { id: 'beef-keema', name: 'Beef Keema Matar', basePrice: 1500, popular: false },
      { id: 'nalli-nihari', name: 'Nalli Nihari', basePrice: 2000, popular: true },
    ]
  },
  {
    id: 'rice',
    name: 'Rice',
    icon: '🍚',
    description: 'Biryani, pulao and rice dishes',
    minSelect: 1,
    maxSelect: 3,
    dishes: [
      { id: 'chicken-biryani', name: 'Chicken Biryani', basePrice: 1500, popular: true },
      { id: 'mutton-biryani', name: 'Mutton Biryani', basePrice: 2200, popular: false },
      { id: 'beef-pulao', name: 'Beef Yakhni Pulao', basePrice: 1800, popular: true },
      { id: 'mutton-pulao', name: 'Mutton Pulao', basePrice: 2300, popular: true },
      { id: 'veg-rice', name: 'Vegetable Fried Rice', basePrice: 900, popular: false },
      { id: 'zeera-rice', name: 'Zeera Rice', basePrice: 700, popular: false },
      { id: 'kabuli-pulao', name: 'Kabuli Pulao', basePrice: 2000, popular: false },
    ]
  },
  {
    id: 'bbq',
    name: 'BBQ',
    icon: '🔥',
    description: 'Grilled and tandoor items',
    minSelect: 0,
    maxSelect: 5,
    dishes: [
      { id: 'chicken-tikka', name: 'Chicken Tikka', basePrice: 1400, popular: true },
      { id: 'malai-boti', name: 'Chicken Malai Boti', basePrice: 1600, popular: true },
      { id: 'chicken-seekh', name: 'Chicken Seekh Kabab', basePrice: 1200, popular: true },
      { id: 'beef-seekh', name: 'Beef Seekh Kabab', basePrice: 1400, popular: true },
      { id: 'mutton-chops', name: 'Mutton Chops', basePrice: 2800, popular: false },
      { id: 'reshmi-kabab', name: 'Reshmi Kabab', basePrice: 1500, popular: true },
      { id: 'gola-kabab', name: 'Gola Kabab', basePrice: 1300, popular: false },
      { id: 'tandoori-chicken', name: 'Tandoori Chicken', basePrice: 1550, popular: false },
      { id: 'fish-tikka', name: 'Fish Tikka', basePrice: 1800, popular: false },
      { id: 'chapli-kabab', name: 'Chapli Kabab', basePrice: 1200, popular: false },
    ]
  },
  {
    id: 'continental',
    name: 'Continental (Upgrade)',
    icon: '🍝',
    description: 'Western cuisine add-ons',
    minSelect: 0,
    maxSelect: 3,
    dishes: [
      { id: 'pasta-alfredo', name: 'Pasta Alfredo', basePrice: 1300, popular: true },
      { id: 'pasta-arrabiata', name: 'Pasta Arrabiata', basePrice: 1200, popular: false },
      { id: 'grilled-chicken', name: 'Grilled Chicken with Sauce', basePrice: 1800, popular: true },
      { id: 'fish-and-chips', name: 'Fish & Chips', basePrice: 1600, popular: false },
      { id: 'stir-fry-veg', name: 'Stir Fry Vegetables', basePrice: 1000, popular: false },
      { id: 'garlic-bread', name: 'Garlic Bread', basePrice: 600, popular: false },
      { id: 'caesar-salad', name: 'Caesar Salad', basePrice: 900, popular: false },
    ]
  },
  {
    id: 'bread',
    name: 'Bread & Naan',
    icon: '🫓',
    description: 'Fresh bread selection',
    minSelect: 1,
    maxSelect: 3,
    dishes: [
      { id: 'plain-naan', name: 'Plain Naan', basePrice: 200, popular: true },
      { id: 'roghni-naan', name: 'Roghni Naan', basePrice: 300, popular: true },
      { id: 'garlic-naan', name: 'Garlic Naan', basePrice: 350, popular: false },
      { id: 'tandoori-roti', name: 'Tandoori Roti', basePrice: 150, popular: false },
      { id: 'kulcha', name: 'Kulcha', basePrice: 350, popular: false },
      { id: 'laccha-paratha', name: 'Laccha Paratha', basePrice: 400, popular: false },
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: '🍨',
    description: 'Traditional and modern sweets',
    minSelect: 1,
    maxSelect: 5,
    dishes: [
      { id: 'kheer', name: 'Kheer', basePrice: 600, popular: true },
      { id: 'gajar-halwa', name: 'Gajar ka Halwa', basePrice: 700, popular: true },
      { id: 'zarda', name: 'Zarda', basePrice: 550, popular: true },
      { id: 'gulab-jamun', name: 'Gulab Jamun', basePrice: 500, popular: true },
      { id: 'ice-cream', name: 'Ice Cream (2 flavors)', basePrice: 650, popular: true },
      { id: 'ras-malai', name: 'Ras Malai', basePrice: 800, popular: false },
      { id: 'shahi-tukray', name: 'Shahi Tukray', basePrice: 750, popular: false },
      { id: 'lab-e-shireen', name: 'Lab-e-Shireen', basePrice: 600, popular: false },
      { id: 'fruit-trifle', name: 'Fruit Trifle', basePrice: 700, popular: false },
      { id: 'jalebi', name: 'Jalebi (Hot)', basePrice: 450, popular: false },
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: '🥤',
    description: 'Drinks and refreshments',
    minSelect: 1,
    maxSelect: 4,
    dishes: [
      { id: 'soft-drinks', name: 'Soft Drinks (Unlimited)', basePrice: 400, popular: true },
      { id: 'fresh-juice', name: 'Fresh Juice Station', basePrice: 600, popular: true },
      { id: 'doodh-patti', name: 'Doodh Patti Chai', basePrice: 250, popular: true },
      { id: 'green-tea', name: 'Green Tea / Kahwa', basePrice: 300, popular: false },
      { id: 'lassi', name: 'Sweet Lassi', basePrice: 350, popular: false },
      { id: 'mocktails', name: 'Mocktails Station', basePrice: 800, popular: false },
    ]
  },
];

// ============================================================
// LIVE COUNTERS
// ============================================================
export const liveCounters = [
  { id: 'chaat-counter', name: 'Chaat Counter', icon: '🥘', baseCost: 25000, description: 'Papri chaat, dahi baray, aloo tikki — served live', popular: true },
  { id: 'pani-puri', name: 'Pani Puri Counter', icon: '💧', baseCost: 20000, description: 'Fresh gol gappay with multiple flavored waters', popular: true },
  { id: 'pasta-station', name: 'Pasta Live Station', icon: '🍝', baseCost: 35000, description: 'Cook-to-order pasta with choice of sauce', popular: false },
  { id: 'bbq-grill', name: 'BBQ Live Grill', icon: '🔥', baseCost: 45000, description: 'Live grilling station with tikka, boti, seekh kabab', popular: true },
  { id: 'tea-coffee', name: 'Tea & Coffee Bar', icon: '☕', baseCost: 18000, description: 'Doodh patti, kahwa, cappuccino, latte station', popular: true },
  { id: 'ice-cream-counter', name: 'Ice Cream Counter', icon: '🍦', baseCost: 22000, description: 'Multiple flavors with toppings choice', popular: false },
  { id: 'waffle-station', name: 'Waffle & Crepe Station', icon: '🧇', baseCost: 30000, description: 'Fresh waffles and crepes with toppings', popular: false },
  { id: 'noodle-station', name: 'Chinese Noodle Station', icon: '🍜', baseCost: 28000, description: 'Stir-fried noodles made live to order', popular: false },
];

// ============================================================
// PER-EVENT RECOMMENDED MENUS (Auto-loaded when event is selected)
// ============================================================
export const eventMenuPresets = {
  mehndi: {
    // Lighter menu, BBQ-heavy, chaat vibes
    categories: {
      starters: ['fruit-chaat', 'aloo-samosa', 'dahi-baray', 'pakoras'],
      chicken: ['chicken-karahi'],
      'beef-mutton': [],
      rice: ['chicken-biryani'],
      bbq: ['chicken-tikka', 'malai-boti', 'chicken-seekh', 'beef-seekh', 'chapli-kabab'],
      continental: [],
      bread: ['plain-naan', 'roghni-naan'],
      desserts: ['gulab-jamun', 'jalebi', 'ice-cream'],
      beverages: ['soft-drinks', 'lassi', 'doodh-patti'],
    },
    suggestedCounters: ['chaat-counter', 'pani-puri', 'bbq-grill'],
  },
  barat: {
    // Heavy full traditional menu
    categories: {
      starters: ['chicken-corn-soup', 'hot-sour-soup', 'russian-salad', 'fruit-chaat', 'dahi-baray'],
      chicken: ['chicken-karahi', 'chicken-qorma', 'chicken-makhni', 'butter-chicken'],
      'beef-mutton': ['beef-qorma', 'mutton-karahi', 'nalli-nihari'],
      rice: ['chicken-biryani', 'beef-pulao', 'mutton-pulao'],
      bbq: ['chicken-tikka', 'malai-boti', 'chicken-seekh', 'beef-seekh', 'reshmi-kabab'],
      continental: ['pasta-alfredo', 'grilled-chicken'],
      bread: ['plain-naan', 'roghni-naan', 'garlic-naan'],
      desserts: ['kheer', 'gajar-halwa', 'zarda', 'gulab-jamun', 'ice-cream'],
      beverages: ['soft-drinks', 'fresh-juice', 'doodh-patti', 'lassi'],
    },
    suggestedCounters: ['chaat-counter', 'bbq-grill', 'ice-cream-counter'],
  },
  valima: {
    // Elegant continental + traditional mix
    categories: {
      starters: ['chicken-corn-soup', 'cream-of-mushroom', 'russian-salad', 'chicken-spring-rolls'],
      chicken: ['chicken-qorma', 'butter-chicken', 'chicken-white-karahi'],
      'beef-mutton': ['beef-qorma', 'mutton-kunna'],
      rice: ['chicken-biryani', 'beef-pulao'],
      bbq: ['malai-boti', 'reshmi-kabab', 'fish-tikka'],
      continental: ['pasta-alfredo', 'grilled-chicken', 'caesar-salad'],
      bread: ['roghni-naan', 'garlic-naan'],
      desserts: ['ras-malai', 'fruit-trifle', 'ice-cream', 'lab-e-shireen'],
      beverages: ['soft-drinks', 'fresh-juice', 'mocktails', 'green-tea'],
    },
    suggestedCounters: ['pasta-station', 'tea-coffee', 'ice-cream-counter'],
  },
  nikkah: {
    // Intimate & refined
    categories: {
      starters: ['chicken-corn-soup', 'russian-salad', 'fruit-chaat'],
      chicken: ['chicken-qorma', 'chicken-makhni'],
      'beef-mutton': ['beef-qorma'],
      rice: ['chicken-biryani'],
      bbq: ['malai-boti', 'chicken-tikka'],
      continental: [],
      bread: ['roghni-naan'],
      desserts: ['kheer', 'gulab-jamun', 'ice-cream'],
      beverages: ['soft-drinks', 'doodh-patti'],
    },
    suggestedCounters: ['tea-coffee'],
  },
  engagement: {
    // Sweet & celebratory
    categories: {
      starters: ['fruit-chaat', 'aloo-samosa', 'chicken-spring-rolls', 'veg-spring-rolls'],
      chicken: ['butter-chicken'],
      'beef-mutton': [],
      rice: ['chicken-biryani'],
      bbq: ['malai-boti', 'reshmi-kabab'],
      continental: ['pasta-alfredo', 'garlic-bread'],
      bread: ['roghni-naan'],
      desserts: ['ras-malai', 'gulab-jamun', 'ice-cream', 'fruit-trifle', 'lab-e-shireen'],
      beverages: ['soft-drinks', 'fresh-juice', 'mocktails'],
    },
    suggestedCounters: ['ice-cream-counter', 'waffle-station'],
  },
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export const getDishPrice = (basePrice, category) => {
  const multiplier = categoryMultipliers[category] || 0.7;
  return Math.round(basePrice * multiplier);
};

export const getCounterPrice = (baseCost, category) => {
  const multiplier = categoryMultipliers[category] || 0.7;
  return Math.round(baseCost * multiplier);
};

// Calculate per-head cost for a single event (non-starter items only)
export const calculateMenuPerHead = (selectedDishes, category, excludeStarters = false) => {
  let total = 0;
  for (const cat of menuCategories) {
    if (excludeStarters && cat.id === 'starters') continue;
    const selected = selectedDishes[cat.id] || [];
    for (const dishId of selected) {
      const dish = cat.dishes.find(d => d.id === dishId);
      if (dish) {
        total += getDishPrice(dish.basePrice, category);
      }
    }
  }
  return total;
};

// Calculate total cost of starters based on quantities (not per-head)
export const calculateStartersCost = (selectedDishes, category, quantities = {}) => {
  let total = 0;
  const starterCat = menuCategories.find(c => c.id === 'starters');
  if (!starterCat) return 0;
  const selected = selectedDishes['starters'] || [];
  for (const dishId of selected) {
    const dish = starterCat.dishes.find(d => d.id === dishId);
    if (dish) {
      const price = getDishPrice(dish.basePrice, category);
      const qty = quantities[dishId] || 0;
      total += price * qty;
    }
  }
  return total;
};

// Get default starter quantities based on guest count
export const getDefaultStarterQuantities = (starterDishIds, guests) => {
  const starterCat = menuCategories.find(c => c.id === 'starters');
  if (!starterCat) return {};
  const quantities = {};
  for (const dishId of starterDishIds) {
    const dish = starterCat.dishes.find(d => d.id === dishId);
    if (dish) {
      if (dish.unit === 'per pc') quantities[dishId] = guests;
      else if (dish.unit === 'per kg') quantities[dishId] = Math.max(1, Math.ceil(guests / 50));
      else quantities[dishId] = guests; // per head
    }
  }
  return quantities;
};

// Calculate per-head cost adjusted by event type (excludes starters)
export const calculateEventMenuPerHead = (selectedDishes, category, eventType) => {
  const base = calculateMenuPerHead(selectedDishes, category, true);
  const event = eventTypes[eventType];
  return Math.round(base * (event?.pricingMultiplier || 1.0));
};

export const calculateCountersCost = (selectedCounters, category) => {
  let total = 0;
  for (const counterId of selectedCounters) {
    const counter = liveCounters.find(c => c.id === counterId);
    if (counter) {
      total += getCounterPrice(counter.baseCost, category);
    }
  }
  return total;
};

// Suggest dishes based on budget per head and category
export const suggestMenu = (budgetPerHead, category) => {
  const multiplier = categoryMultipliers[category] || 0.7;
  const suggestions = {};
  let remaining = budgetPerHead;
  for (const cat of menuCategories) {
    suggestions[cat.id] = [];
    const popularDishes = cat.dishes
      .filter(d => d.popular)
      .sort((a, b) => a.basePrice - b.basePrice);
    for (const dish of popularDishes) {
      const price = Math.round(dish.basePrice * multiplier);
      if (remaining >= price && suggestions[cat.id].length < cat.maxSelect) {
        suggestions[cat.id].push(dish.id);
        remaining -= price;
      }
    }
  }
  return suggestions;
};

// Budget suggestion mode — recommends changes if over budget
export const suggestBudgetOptimization = (currentMenuPerHead, targetPerHead, selectedDishes, category) => {
  if (currentMenuPerHead <= targetPerHead) return null;
  
  const suggestions = [];
  const overBy = currentMenuPerHead - targetPerHead;
  
  // Find most expensive selected dishes that could be swapped
  const allSelected = [];
  for (const cat of menuCategories) {
    const sel = selectedDishes[cat.id] || [];
    for (const dishId of sel) {
      const dish = cat.dishes.find(d => d.id === dishId);
      if (dish) {
        allSelected.push({ ...dish, categoryId: cat.id, adjustedPrice: getDishPrice(dish.basePrice, category) });
      }
    }
  }
  
  allSelected.sort((a, b) => b.adjustedPrice - a.adjustedPrice);
  
  let savings = 0;
  for (const dish of allSelected) {
    if (savings >= overBy) break;
    if (!dish.popular) {
      suggestions.push({
        action: 'remove',
        dish: dish.name,
        saving: dish.adjustedPrice,
        categoryId: dish.categoryId,
        dishId: dish.id,
      });
      savings += dish.adjustedPrice;
    }
  }
  
  return {
    overBudget: overBy,
    suggestions,
    potentialSavings: savings,
  };
};

// Get preset menu
export const menuPresets = {
  essential: {
    name: 'Essential',
    description: 'Core dishes for a traditional wedding dinner',
    targetDishes: 12,
    categories: {
      starters: ['chicken-corn-soup', 'russian-salad', 'aloo-samosa'],
      chicken: ['chicken-karahi', 'chicken-qorma'],
      'beef-mutton': ['beef-qorma'],
      rice: ['chicken-biryani'],
      bbq: ['chicken-tikka', 'chicken-seekh'],
      continental: [],
      bread: ['plain-naan', 'roghni-naan'],
      desserts: ['kheer', 'gulab-jamun'],
      beverages: ['soft-drinks', 'doodh-patti'],
    }
  },
  classic: {
    name: 'Classic',
    description: 'Popular Lahori wedding menu with great variety',
    targetDishes: 18,
    categories: {
      starters: ['chicken-corn-soup', 'russian-salad', 'fruit-chaat', 'dahi-baray'],
      chicken: ['chicken-karahi', 'chicken-qorma', 'chicken-makhni'],
      'beef-mutton': ['beef-qorma', 'mutton-karahi'],
      rice: ['chicken-biryani', 'beef-pulao'],
      bbq: ['chicken-tikka', 'malai-boti', 'beef-seekh'],
      continental: [],
      bread: ['plain-naan', 'roghni-naan'],
      desserts: ['kheer', 'gajar-halwa', 'gulab-jamun', 'ice-cream'],
      beverages: ['soft-drinks', 'fresh-juice', 'doodh-patti'],
    }
  },
  grand: {
    name: 'Grand',
    description: 'Elaborate menu covering all categories generously',
    targetDishes: 25,
    categories: {
      starters: ['chicken-corn-soup', 'hot-sour-soup', 'russian-salad', 'fruit-chaat', 'veg-spring-rolls', 'dahi-baray'],
      chicken: ['chicken-karahi', 'chicken-qorma', 'chicken-makhni', 'butter-chicken'],
      'beef-mutton': ['beef-qorma', 'mutton-karahi', 'mutton-kunna'],
      rice: ['chicken-biryani', 'beef-pulao', 'mutton-pulao'],
      bbq: ['chicken-tikka', 'malai-boti', 'chicken-seekh', 'beef-seekh', 'reshmi-kabab'],
      continental: ['pasta-alfredo', 'grilled-chicken'],
      bread: ['plain-naan', 'roghni-naan', 'garlic-naan'],
      desserts: ['kheer', 'gajar-halwa', 'zarda', 'gulab-jamun', 'ice-cream'],
      beverages: ['soft-drinks', 'fresh-juice', 'doodh-patti', 'lassi'],
    }
  }
};

// Count total dishes in a selection
export const countSelectedDishes = (selectedDishes) => {
  return Object.values(selectedDishes).reduce((acc, arr) => acc + arr.length, 0);
};
