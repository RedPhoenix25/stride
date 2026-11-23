import type { Product } from "@/lib/types";

const shoeSizes = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => String(from + index));

export const products: Product[] = [
  {
    id: "p-001",
    slug: "velocity-runner",
    name: "Velocity Runner",
    category: "sneakers",
    price: 89500,
    colourways: [
      {
        name: "Black / Volt",
        images: [
          "/products/velocity-runner-black-1.jpg",
          "/products/velocity-runner-black-2.jpg",
        ],
      },
      {
        name: "Blue / Volt",
        images: [
          "/products/velocity-runner-blue-1.jpg",
          "/products/velocity-runner-blue-2.jpg",
        ],
      },
      {
        name: "Red / Volt",
        images: [
          "/products/velocity-runner-red-1.jpg",
          "/products/velocity-runner-red-2.jpg",
        ],
      },
    ],
    sizes: shoeSizes(40, 45),
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
    slug: "court-classic",
    name: "Court Classic",
    category: "sneakers",
    price: 72000,
    colourways: [
      {
        name: "White / White",
        images: [
          "/products/court-classic-white-1.jpg",
          "/products/court-classic-white-2.jpg",
        ],
      },
      {
        name: "Black / White",
        images: [
          "/products/court-classic-black-1.jpg",
          "/products/court-classic-black-2.jpg",
        ],
      },
      {
        name: "Navy / White",
        images: [
          "/products/court-classic-navy-1.jpg",
          "/products/court-classic-navy-2.jpg",
        ],
      },
    ],
    sizes: shoeSizes(39, 45),
    stock: 24,
    description:
      "A low-profile court shoe in full-grain leather. Clean, flat and easy to wear with anything.",
    features: [
      "Full-grain leather upper",
      "Padded collar",
      "Vulcanised rubber sole",
    ],
  },
  {
    id: "p-003",
    slug: "trailbreak-gtx",
    name: "Trailbreak GTX",
    category: "sneakers",
    price: 124000,
    colourways: [
      {
        name: "Olive / Black",
        images: [
          "/products/trailbreak-gtx-olive-1.jpg",
          "/products/trailbreak-gtx-olive-2.jpg",
        ],
      },
      {
        name: "Black / Black",
        images: [
          "/products/trailbreak-gtx-black-1.jpg",
          "/products/trailbreak-gtx-black-2.jpg",
        ],
      },
      {
        name: "Sand / Black",
        images: [
          "/products/trailbreak-gtx-sand-1.jpg",
          "/products/trailbreak-gtx-sand-2.jpg",
        ],
      },
    ],
    sizes: shoeSizes(41, 46),
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
    slug: "aero-knit",
    name: "Aero Knit",
    category: "sneakers",
    price: 96000,
    colourways: [
      {
        name: "Grey / White",
        images: [
          "/products/aero-knit-grey-1.jpg",
          "/products/aero-knit-grey-2.jpg",
        ],
      },
      {
        name: "Black / White",
        images: [
          "/products/aero-knit-black-1.jpg",
          "/products/aero-knit-black-2.jpg",
        ],
      },
      {
        name: "Blue / White",
        images: [
          "/products/aero-knit-blue-1.jpg",
          "/products/aero-knit-blue-2.jpg",
        ],
      },
    ],
    sizes: shoeSizes(39, 44),
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
    slug: "pace-low",
    name: "Pace Low",
    category: "sneakers",
    price: 68500,
    compareAtPrice: 79000,
    colourways: [
      {
        name: "Black / Gum",
        images: [
          "/products/pace-low-black-1.jpg",
          "/products/pace-low-black-2.jpg",
        ],
      },
      {
        name: "White / Gum",
        images: [
          "/products/pace-low-white-1.jpg",
          "/products/pace-low-white-2.jpg",
        ],
      },
      {
        name: "Red / Gum",
        images: [
          "/products/pace-low-red-1.jpg",
          "/products/pace-low-red-2.jpg",
        ],
      },
    ],
    sizes: shoeSizes(38, 44),
    badge: "sale",
    stock: 12,
    description:
      "A low-top sneaker with a gum sole and a soft canvas upper. A simple everyday pair at a lower price.",
    features: ["Cotton canvas upper", "Gum rubber sole", "Cushioned insole"],
  },
  {
    id: "p-006",
    slug: "sprint-2",
    name: "Sprint 2.0",
    category: "sneakers",
    price: 105000,
    colourways: [
      {
        name: "Volt / Black",
        images: [
          "/products/sprint-2-volt-1.jpg",
          "/products/sprint-2-volt-2.jpg",
        ],
      },
      {
        name: "Black / Volt",
        images: [
          "/products/sprint-2-black-1.jpg",
          "/products/sprint-2-black-2.jpg",
        ],
      },
      {
        name: "White / Volt",
        images: [
          "/products/sprint-2-white-1.jpg",
          "/products/sprint-2-white-2.jpg",
        ],
      },
    ],
    sizes: shoeSizes(40, 46),
    stock: 7,
    description:
      "A race-day trainer with a mesh upper and a responsive plate. Tuned for short, fast sessions.",
    features: ["Carbon plate", "Breathable mesh upper", "7mm drop"],
  },
  {
    id: "p-007",
    slug: "training-tee",
    name: "Training Tee",
    category: "apparel",
    price: 18500,
    colourways: [
      {
        name: "Black",
        images: [
          "/products/training-tee-black-1.jpg",
          "/products/training-tee-black-2.jpg",
        ],
      },
      {
        name: "White",
        images: [
          "/products/training-tee-white-1.jpg",
          "/products/training-tee-white-2.jpg",
        ],
      },
      {
        name: "Volt",
        images: [
          "/products/training-tee-volt-1.jpg",
          "/products/training-tee-volt-2.jpg",
        ],
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 40,
    description:
      "A lightweight training tee in sweat-wicking jersey. Cut straight through the body with a clean neckline.",
    features: ["Sweat-wicking jersey", "Straight fit", "Ribbed neckline"],
  },
  {
    id: "p-008",
    slug: "tech-fleece-hoodie",
    name: "Tech Fleece Hoodie",
    category: "apparel",
    price: 54000,
    colourways: [
      {
        name: "Grey",
        images: [
          "/products/tech-fleece-hoodie-grey-1.jpg",
          "/products/tech-fleece-hoodie-grey-2.jpg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/tech-fleece-hoodie-black-1.jpg",
          "/products/tech-fleece-hoodie-black-2.jpg",
        ],
      },
      {
        name: "Olive",
        images: [
          "/products/tech-fleece-hoodie-olive-1.jpg",
          "/products/tech-fleece-hoodie-olive-2.jpg",
        ],
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
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
    slug: "court-shorts",
    name: "Court Shorts",
    category: "apparel",
    price: 24000,
    colourways: [
      {
        name: "Black",
        images: [
          "/products/court-shorts-black-1.jpg",
          "/products/court-shorts-black-2.jpg",
        ],
      },
      {
        name: "Grey",
        images: [
          "/products/court-shorts-grey-1.jpg",
          "/products/court-shorts-grey-2.jpg",
        ],
      },
      {
        name: "Navy",
        images: [
          "/products/court-shorts-navy-1.jpg",
          "/products/court-shorts-navy-2.jpg",
        ],
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
    description:
      "Short training shorts with a woven shell and a soft liner. Built to move without riding up.",
    features: ["Woven shell", "Built-in liner", "Zip back pocket"],
  },
  {
    id: "p-010",
    slug: "compression-leggings",
    name: "Compression Leggings",
    category: "apparel",
    price: 32000,
    colourways: [
      {
        name: "Ink",
        images: [
          "/products/compression-leggings-ink-1.jpg",
          "/products/compression-leggings-ink-2.jpg",
        ],
      },
      {
        name: "Grey",
        images: [
          "/products/compression-leggings-grey-1.jpg",
          "/products/compression-leggings-grey-2.jpg",
        ],
      },
      {
        name: "Olive",
        images: [
          "/products/compression-leggings-olive-1.jpg",
          "/products/compression-leggings-olive-2.jpg",
        ],
      },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 16,
    description:
      "Full-length compression leggings with a high waistband and flat seams. Made to stay put through runs and lifts.",
    features: ["Four-way stretch", "High waistband", "Flatlock seams"],
  },
  {
    id: "p-011",
    slug: "windbreaker-jacket",
    name: "Windbreaker Jacket",
    category: "apparel",
    price: 78000,
    compareAtPrice: 92000,
    colourways: [
      {
        name: "Volt",
        images: [
          "/products/windbreaker-jacket-volt-1.jpg",
          "/products/windbreaker-jacket-volt-2.jpg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/windbreaker-jacket-black-1.jpg",
          "/products/windbreaker-jacket-black-2.jpg",
        ],
      },
      {
        name: "Blue",
        images: [
          "/products/windbreaker-jacket-blue-1.jpg",
          "/products/windbreaker-jacket-blue-2.jpg",
        ],
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    badge: "sale",
    stock: 11,
    description:
      "A packable windbreaker in ripstop with a vented back. Cuts wind without holding heat.",
    features: ["Ripstop shell", "Vented back panel", "Packs into its pocket"],
  },
  {
    id: "p-012",
    slug: "oversized-jersey",
    name: "Oversized Jersey",
    category: "apparel",
    price: 38000,
    colourways: [
      {
        name: "White",
        images: [
          "/products/oversized-jersey-white-1.jpg",
          "/products/oversized-jersey-white-2.jpg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/oversized-jersey-black-1.jpg",
          "/products/oversized-jersey-black-2.jpg",
        ],
      },
      {
        name: "Volt",
        images: [
          "/products/oversized-jersey-volt-1.jpg",
          "/products/oversized-jersey-volt-2.jpg",
        ],
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 14,
    description:
      "An oversized jersey in heavy cotton with dropped shoulders. Cut loose for layering over a tee.",
    features: ["Heavy cotton jersey", "Dropped shoulders", "Ribbed cuffs"],
  },
  {
    id: "p-013",
    slug: "performance-cap",
    name: "Performance Cap",
    category: "accessories",
    price: 16500,
    colourways: [
      {
        name: "Black",
        images: [
          "/products/performance-cap-black-1.jpg",
          "/products/performance-cap-black-2.jpg",
        ],
      },
      {
        name: "White",
        images: [
          "/products/performance-cap-white-1.jpg",
          "/products/performance-cap-white-2.jpg",
        ],
      },
      {
        name: "Volt",
        images: [
          "/products/performance-cap-volt-1.jpg",
          "/products/performance-cap-volt-2.jpg",
        ],
      },
    ],
    sizes: ["One size"],
    badge: "new",
    stock: 35,
    description:
      "A six-panel cap with a curved brim and a moisture band inside. Adjustable at the back.",
    features: ["Six-panel build", "Moisture band", "Adjustable strap"],
  },
  {
    id: "p-014",
    slug: "gym-duffel",
    name: "Gym Duffel 35L",
    category: "accessories",
    price: 42000,
    colourways: [
      {
        name: "Black",
        images: [
          "/products/gym-duffel-black-1.jpg",
          "/products/gym-duffel-black-2.jpg",
        ],
      },
      {
        name: "Olive",
        images: [
          "/products/gym-duffel-olive-1.jpg",
          "/products/gym-duffel-olive-2.jpg",
        ],
      },
      {
        name: "Volt",
        images: [
          "/products/gym-duffel-volt-1.jpg",
          "/products/gym-duffel-volt-2.jpg",
        ],
      },
    ],
    sizes: ["One size"],
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
    slug: "training-socks",
    name: "Training Socks 3-pack",
    category: "accessories",
    price: 9500,
    colourways: [
      {
        name: "White",
        images: [
          "/products/training-socks-white-1.jpg",
          "/products/training-socks-white-2.jpg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/training-socks-black-1.jpg",
          "/products/training-socks-black-2.jpg",
        ],
      },
      {
        name: "Grey",
        images: [
          "/products/training-socks-grey-1.jpg",
          "/products/training-socks-grey-2.jpg",
        ],
      },
    ],
    sizes: ["S/M", "L/XL"],
    stock: 50,
    description:
      "Three pairs of cushioned training socks with a ribbed cuff. Reinforced at the heel and toe.",
    features: ["Three pairs", "Cushioned sole", "Reinforced heel and toe"],
  },
  {
    id: "p-016",
    slug: "insulated-bottle",
    name: "Insulated Bottle 750ml",
    category: "accessories",
    price: 14000,
    colourways: [
      {
        name: "Volt",
        images: [
          "/products/insulated-bottle-volt-1.jpg",
          "/products/insulated-bottle-volt-2.jpg",
        ],
      },
      {
        name: "Black",
        images: [
          "/products/insulated-bottle-black-1.jpg",
          "/products/insulated-bottle-black-2.jpg",
        ],
      },
      {
        name: "White",
        images: [
          "/products/insulated-bottle-white-1.jpg",
          "/products/insulated-bottle-white-2.jpg",
        ],
      },
    ],
    sizes: ["One size"],
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
