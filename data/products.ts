import type { Product } from "@/lib/types";

const shoeSizes = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => String(from + index));

export const products: Product[] = [
  {
    id: "p-001",
    slug: "velocity-runner-black",
    name: "Velocity Runner",
    category: "sneakers",
    price: 89500,
    colourway: "Black / Volt",
    sizes: shoeSizes(40, 45),
    images: [
      "/products/velocity-runner-black-1.jpg",
      "/products/velocity-runner-black-2.jpg",
    ],
    badge: "new",
    stock: 18,
    description:
      "A daily running shoe with a volt-accented knit upper and a full-length foam midsole. Built for road miles and gym sessions alike.",
    features: [
      "Lightweight knit upper",
      "Full-length foam midsole",
      "Rubber outsole with a volt heel tab",
    ],
  },
  {
    id: "p-002",
    slug: "court-classic-white",
    name: "Court Classic",
    category: "sneakers",
    price: 72000,
    colourway: "White / White",
    sizes: shoeSizes(39, 45),
    images: [
      "/products/court-classic-white-1.jpg",
      "/products/court-classic-white-2.jpg",
    ],
    stock: 24,
    description:
      "A low-profile court shoe in full-grain white leather. Clean, flat and easy to wear with anything.",
    features: [
      "Full-grain leather upper",
      "Padded collar",
      "Vulcanised rubber sole",
    ],
  },
  {
    id: "p-003",
    slug: "trailbreak-gtx-olive",
    name: "Trailbreak GTX",
    category: "sneakers",
    price: 124000,
    colourway: "Olive / Black",
    sizes: shoeSizes(41, 46),
    images: [
      "/products/trailbreak-gtx-olive-1.jpg",
      "/products/trailbreak-gtx-olive-2.jpg",
    ],
    badge: "new",
    stock: 9,
    description:
      "A trail shoe with a waterproof membrane and a deep lug outsole. Made for wet paths and loose ground.",
    features: [
      "Waterproof membrane",
      "6mm lug outsole",
      "Rock plate underfoot",
    ],
  },
  {
    id: "p-004",
    slug: "aero-knit-grey",
    name: "Aero Knit",
    category: "sneakers",
    price: 96000,
    colourway: "Grey / White",
    sizes: shoeSizes(39, 44),
    images: ["/products/aero-knit-grey-1.jpg", "/products/aero-knit-grey-2.jpg"],
    stock: 0,
    description:
      "A breathable knit sneaker with a sock-like fit and a slim sole. Designed for warm days and long walks.",
    features: [
      "Engineered knit upper",
      "Sock-fit collar",
      "Compression-moulded sole",
    ],
  },
  {
    id: "p-005",
    slug: "pace-low-black",
    name: "Pace Low",
    category: "sneakers",
    price: 68500,
    compareAtPrice: 79000,
    colourway: "Black / Gum",
    sizes: shoeSizes(38, 44),
    images: ["/products/pace-low-black-1.jpg", "/products/pace-low-black-2.jpg"],
    badge: "sale",
    stock: 12,
    description:
      "A low-top sneaker with a gum sole and a soft canvas upper. A simple everyday pair at a lower price.",
    features: ["Cotton canvas upper", "Gum rubber sole", "Cushioned insole"],
  },
  {
    id: "p-006",
    slug: "sprint-2-volt",
    name: "Sprint 2.0",
    category: "sneakers",
    price: 105000,
    colourway: "Volt / Black",
    sizes: shoeSizes(40, 46),
    images: ["/products/sprint-2-volt-1.jpg", "/products/sprint-2-volt-2.jpg"],
    stock: 7,
    description:
      "A race-day trainer with a volt upper and a responsive plate. Tuned for short, fast sessions.",
    features: ["Carbon plate", "Volt mesh upper", "7mm drop"],
  },
  {
    id: "p-007",
    slug: "training-tee-black",
    name: "Training Tee",
    category: "apparel",
    price: 18500,
    colourway: "Black",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/products/training-tee-black-1.jpg",
      "/products/training-tee-black-2.jpg",
    ],
    stock: 40,
    description:
      "A lightweight training tee in sweat-wicking jersey. Cut straight through the body with a clean neckline.",
    features: ["Sweat-wicking jersey", "Straight fit", "Ribbed neckline"],
  },
  {
    id: "p-008",
    slug: "tech-fleece-hoodie-grey",
    name: "Tech Fleece Hoodie",
    category: "apparel",
    price: 54000,
    colourway: "Grey",
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/products/tech-fleece-hoodie-grey-1.jpg",
      "/products/tech-fleece-hoodie-grey-2.jpg",
    ],
    badge: "new",
    stock: 22,
    description:
      "A midweight fleece hoodie with a double-layer hood and zip pockets. Warm enough for the walk to the gym.",
    features: [
      "Midweight fleece",
      "Double-layer hood",
      "Zip side pockets",
    ],
  },
  {
    id: "p-009",
    slug: "court-shorts-black",
    name: "Court Shorts",
    category: "apparel",
    price: 24000,
    colourway: "Black",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/court-shorts-black-1.jpg",
      "/products/court-shorts-black-2.jpg",
    ],
    stock: 30,
    description:
      "Short training shorts with a woven shell and a soft liner. Built to move without riding up.",
    features: ["Woven shell", "Built-in liner", "Zip back pocket"],
  },
  {
    id: "p-010",
    slug: "compression-leggings-ink",
    name: "Compression Leggings",
    category: "apparel",
    price: 32000,
    colourway: "Ink",
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [
      "/products/compression-leggings-ink-1.jpg",
      "/products/compression-leggings-ink-2.jpg",
    ],
    stock: 16,
    description:
      "Full-length compression leggings with a high waistband and flat seams. Made to stay put through runs and lifts.",
    features: ["Four-way stretch", "High waistband", "Flatlock seams"],
  },
  {
    id: "p-011",
    slug: "windbreaker-jacket-volt",
    name: "Windbreaker Jacket",
    category: "apparel",
    price: 78000,
    compareAtPrice: 92000,
    colourway: "Volt",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/windbreaker-jacket-volt-1.jpg",
      "/products/windbreaker-jacket-volt-2.jpg",
    ],
    badge: "sale",
    stock: 11,
    description:
      "A packable windbreaker in volt ripstop with a vented back. Cuts wind without holding heat.",
    features: ["Ripstop shell", "Vented back panel", "Packs into its pocket"],
  },
  {
    id: "p-012",
    slug: "oversized-jersey-white",
    name: "Oversized Jersey",
    category: "apparel",
    price: 38000,
    colourway: "White",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "/products/oversized-jersey-white-1.jpg",
      "/products/oversized-jersey-white-2.jpg",
    ],
    stock: 14,
    description:
      "An oversized jersey in heavy cotton with dropped shoulders. Cut loose for layering over a tee.",
    features: ["Heavy cotton jersey", "Dropped shoulders", "Ribbed cuffs"],
  },
  {
    id: "p-013",
    slug: "performance-cap-black",
    name: "Performance Cap",
    category: "accessories",
    price: 16500,
    colourway: "Black",
    sizes: ["One size"],
    images: [
      "/products/performance-cap-black-1.jpg",
      "/products/performance-cap-black-2.jpg",
    ],
    badge: "new",
    stock: 35,
    description:
      "A six-panel cap with a curved brim and a moisture band inside. Adjustable at the back.",
    features: ["Six-panel build", "Moisture band", "Adjustable strap"],
  },
  {
    id: "p-014",
    slug: "gym-duffel-black",
    name: "Gym Duffel 35L",
    category: "accessories",
    price: 42000,
    colourway: "Black",
    sizes: ["One size"],
    images: [
      "/products/gym-duffel-black-1.jpg",
      "/products/gym-duffel-black-2.jpg",
    ],
    stock: 8,
    description:
      "A 35-litre duffel with a separate shoe compartment and a padded strap. Fits a full training kit.",
    features: [
      "35-litre capacity",
      "Shoe compartment",
      "Padded shoulder strap",
    ],
  },
  {
    id: "p-015",
    slug: "training-socks-white",
    name: "Training Socks 3-pack",
    category: "accessories",
    price: 9500,
    colourway: "White",
    sizes: ["S/M", "L/XL"],
    images: [
      "/products/training-socks-white-1.jpg",
      "/products/training-socks-white-2.jpg",
    ],
    stock: 50,
    description:
      "Three pairs of cushioned training socks with a ribbed cuff. Reinforced at the heel and toe.",
    features: ["Three pairs", "Cushioned sole", "Reinforced heel and toe"],
  },
  {
    id: "p-016",
    slug: "insulated-bottle-volt",
    name: "Insulated Bottle 750ml",
    category: "accessories",
    price: 14000,
    colourway: "Volt",
    sizes: ["One size"],
    images: [
      "/products/insulated-bottle-volt-1.jpg",
      "/products/insulated-bottle-volt-2.jpg",
    ],
    stock: 20,
    description:
      "A double-walled steel bottle that keeps drinks cold for hours. Screw cap with a carry loop.",
    features: [
      "Double-walled steel",
      "750ml capacity",
      "Leakproof screw cap",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
