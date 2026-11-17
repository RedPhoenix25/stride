import Link from "next/link";
import { products } from "@/data/products";
import { buttonClasses } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRightIcon } from "@/components/ui/icons";

const newArrivals = [
  "velocity-runner-black",
  "trailbreak-gtx-olive",
  "tech-fleece-hoodie-grey",
  "performance-cap-black",
];

const featured = [
  "court-classic-white",
  "sprint-2-volt",
  "pace-low-black",
  "training-tee-black",
  "court-shorts-black",
  "windbreaker-jacket-volt",
  "compression-leggings-ink",
  "gym-duffel-black",
];

const categories = [
  { label: "Sneakers", href: "/shop?category=sneakers" },
  { label: "Apparel", href: "/shop?category=apparel" },
  { label: "Accessories", href: "/shop?category=accessories" },
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="px-3 text-center font-body text-micro font-medium uppercase text-muted">
            Hero image · editorial
          </span>
        </div>
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
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="focus-ring group block"
              >
                <div className="flex aspect-product items-center justify-center bg-mist p-3.5 text-center font-body text-micro font-medium uppercase text-muted">
                  {category.label} · 4:5
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

      <section className="mt-14 bg-mist md:mt-24">
        <div className="container-content py-14 md:py-24">
          <h2 className="font-display text-d-l-m uppercase md:text-d-l">
            Train like it matters.
          </h2>
          <p className="mt-5 max-w-prose font-body text-small leading-relaxed text-ink/75 md:mb-7 md:text-body">
            Every piece is cut for movement and built to survive the session. No
            gimmicks, no noise — just kit that keeps up.
          </p>
          <Link href="/shop" className={buttonClasses("secondary")}>
            Shop all
          </Link>
        </div>
      </section>

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
