import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { buttonClasses } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { EditorialBand } from "@/components/home/EditorialBand";
import { ArrowRightIcon } from "@/components/ui/icons";

const newArrivals = [
  "velocity-runner",
  "trailbreak-gtx",
  "tech-fleece-hoodie",
  "performance-cap",
];

const featured = [
  "court-classic",
  "sprint-2",
  "pace-low",
  "training-tee",
  "court-shorts",
  "windbreaker-jacket",
  "compression-leggings",
  "gym-duffel",
];

const categories = [
  {
    label: "Sneakers",
    href: "/shop?category=sneakers",
    image: "/editorial/category-sneakers.jpg",
  },
  {
    label: "Apparel",
    href: "/shop?category=apparel",
    image: "/editorial/category-apparel.jpg",
  },
  {
    label: "Accessories",
    href: "/shop?category=accessories",
    image: "/editorial/category-accessories.jpg",
  },
];

function pick(slugs: string[]) {
  return slugs.map((slug) => {
    const product = products.find((item) => item.slug === slug);
    if (!product) throw new Error(`Missing product: ${slug}`);
    return product;
  });
}

function SectionHead({ title, href }: { title: string; href: string }) {
  return (
    <div className="mb-7 flex items-end justify-between">
      <h2 className="font-body text-h2-m font-semibold md:text-h2">{title}</h2>
      <Link
        href={href}
        className="focus-ring font-body text-meta font-semibold underline underline-offset-4"
      >
        View all
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative h-hero-m overflow-hidden bg-mist md:h-hero">
        <picture>
          <source media="(min-width: 768px)" srcSet="/editorial/hero-desktop.jpg" />
          <img
            src="/editorial/hero-mobile.jpg"
            alt="Athlete in a black training kit with a volt sleeve, standing in a dark studio"
            width={800}
            height={1000}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
        <div className="hero-shade absolute inset-0" />
        <div className="absolute inset-0">
          <div className="container-content flex h-full flex-col items-start justify-end pb-7 text-white md:pb-14">
            <p className="font-body text-caption font-semibold uppercase">
              New season
            </p>
            <h1 className="mt-3.5 font-display text-d-xl-m uppercase md:text-d-xl">
              Built for
              <br />
              the work.
            </h1>
            <p className="mb-5 mt-3.5 max-w-prose font-body text-small text-white/85 md:mb-6 md:text-body">
              New season training kit, made to move.
            </p>
            <Link href="/shop" className={buttonClasses("secondary")}>
              Shop new arrivals
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <h2 className="mb-7 font-body text-h2-m font-semibold md:text-h2">
            Collections
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.href}
                href={category.href}
                className={`focus-ring group block ${
                  index === 2 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-mist ${
                    index === 2 ? "aspect-[16/9] md:aspect-product" : "aspect-product"
                  }`}
                >
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between pt-3.5 font-body text-body font-semibold">
                  <span>{category.label}</span>
                  <ArrowRightIcon className="h-5 w-5 text-ink" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-content">
          <SectionHead title="New arrivals" href="/shop" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {pick(newArrivals).map((product) => (
              <ProductCard key={product.id} product={product} priority />
            ))}
          </div>
        </div>
      </section>

      <EditorialBand />

      <section className="section section-last">
        <div className="container-content">
          <SectionHead title="Featured collection" href="/shop" />
          <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-4 md:gap-x-6 md:gap-y-12">
            {pick(featured).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
