export type Restaurant = {
  id: string;
  name: string;
  cuisines: string[];
  category:
    | "Biryani"
    | "Pizza"
    | "South Indian"
    | "Chinese"
    | "Desserts"
    | "Healthy"
    | "Rolls & Wraps";
  rating: number;
  reviewCount: number;
  eta: string;
  costForTwo: number;
  distanceKm: number;
  isPureVeg: boolean;
  offer?: string;
  image: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Nawab's Dum Biryani House",
    cuisines: ["Biryani", "Mughlai", "North Indian"],
    category: "Biryani",
    rating: 4.4,
    reviewCount: 2312,
    eta: "28-33 min",
    costForTwo: 450,
    distanceKm: 2.1,
    isPureVeg: false,
    offer: "50% OFF up to ₹100",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
  },
  {
    id: "r2",
    name: "Wood & Fire Pizza Co.",
    cuisines: ["Pizza", "Italian", "Continental"],
    category: "Pizza",
    rating: 4.2,
    reviewCount: 1489,
    eta: "22-27 min",
    costForTwo: 500,
    distanceKm: 1.4,
    isPureVeg: false,
    offer: "Buy 1 Get 1 Free",
    image:
      "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=800&q=80",
  },
  {
    id: "r3",
    name: "Annapoorna Tiffin Centre",
    cuisines: ["South Indian", "Chettinad"],
    category: "South Indian",
    rating: 4.6,
    reviewCount: 4021,
    eta: "18-23 min",
    costForTwo: 250,
    distanceKm: 0.9,
    isPureVeg: true,
    offer: "Flat 40% OFF",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80",
  },
  {
    id: "r4",
    name: "Golden Dragon Express",
    cuisines: ["Chinese", "Thai", "Asian"],
    category: "Chinese",
    rating: 4.1,
    reviewCount: 987,
    eta: "30-35 min",
    costForTwo: 400,
    distanceKm: 3.2,
    isPureVeg: false,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80",
  },
  {
    id: "r5",
    name: "The Sweet Ledger",
    cuisines: ["Desserts", "Bakery", "Ice Cream"],
    category: "Desserts",
    rating: 4.5,
    reviewCount: 1765,
    eta: "20-25 min",
    costForTwo: 200,
    distanceKm: 1.8,
    isPureVeg: true,
    offer: "Flat ₹75 OFF",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80",
  },
  {
    id: "r6",
    name: "Greens & Grains",
    cuisines: ["Healthy", "Salads", "Bowls"],
    category: "Healthy",
    rating: 4.3,
    reviewCount: 632,
    eta: "25-30 min",
    costForTwo: 350,
    distanceKm: 2.6,
    isPureVeg: true,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  },
  {
    id: "r7",
    name: "Rolling Roll Co.",
    cuisines: ["Rolls & Wraps", "Street Food"],
    category: "Rolls & Wraps",
    rating: 4.0,
    reviewCount: 1120,
    eta: "15-20 min",
    costForTwo: 200,
    distanceKm: 1.1,
    isPureVeg: false,
    offer: "Free delivery",
    image:
      "https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?w=800&q=80",
  },
  {
    id: "r8",
    name: "Hyderabad House of Biryani",
    cuisines: ["Biryani", "Andhra"],
    category: "Biryani",
    rating: 4.3,
    reviewCount: 2890,
    eta: "32-37 min",
    costForTwo: 400,
    distanceKm: 4.0,
    isPureVeg: false,
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80",
  },
  {
    id: "r9",
    name: "Basil & Bay Pizzeria",
    cuisines: ["Pizza", "Italian"],
    category: "Pizza",
    rating: 4.4,
    reviewCount: 754,
    eta: "24-29 min",
    costForTwo: 550,
    distanceKm: 2.9,
    isPureVeg: true,
    offer: "20% OFF above ₹399",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&q=80",
  },
];

export const categories: { label: Restaurant["category"] | "All"; emoji: string }[] = [
  { label: "All", emoji: "🍽️" },
  { label: "Biryani", emoji: "🍚" },
  { label: "Pizza", emoji: "🍕" },
  { label: "South Indian", emoji: "🥞" },
  { label: "Chinese", emoji: "🥡" },
  { label: "Desserts", emoji: "🍮" },
  { label: "Healthy", emoji: "🥗" },
  { label: "Rolls & Wraps", emoji: "🌯" },
];
