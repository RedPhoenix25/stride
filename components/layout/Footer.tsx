import Link from "next/link";

const SHOP_LINKS = [
  { label: "Sneakers", href: "/shop?category=sneakers" },
  { label: "Apparel", href: "/shop?category=apparel" },
  { label: "Accessories", href: "/shop?category=accessories" },
];

const HELP_LINKS = ["Delivery", "Returns", "Contact"];
const FOLLOW_LINKS = ["Instagram", "X", "TikTok"];

const linkClass = "block font-body text-meta text-mist no-underline";

export function Footer() {
  return (
    <footer className="mt-14 bg-ink pt-14 text-white md:mt-24 md:pt-18">
      <div className="container-content">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-6">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-h3 uppercase">Stride</p>
            <p className="mt-3 max-w-72 font-body text-meta text-white/65">
              Sportswear made for the sessions that count. A fictional house
              brand, built as a demo store.
            </p>
          </div>

          <div>
            <p className="mb-3.5 font-body text-micro font-semibold uppercase text-white/55">
              Shop
            </p>
            {SHOP_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkClass} my-2.5`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-3.5 font-body text-micro font-semibold uppercase text-white/55">
              Help
            </p>
            {HELP_LINKS.map((label) => (
              <span key={label} className={`${linkClass} my-2.5`}>
                {label}
              </span>
            ))}
          </div>

          <div>
            <p className="mb-3.5 font-body text-micro font-semibold uppercase text-white/55">
              Follow
            </p>
            {FOLLOW_LINKS.map((label) => (
              <span key={label} className={`${linkClass} my-2.5`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/20 pt-5 font-body text-caption text-white/55 md:mt-14 md:flex-row md:items-center md:justify-between">
          <span>
            © 2026 Stride. This is a demo store — no real orders are processed.
          </span>
          <span>Visa · Mastercard · Verve</span>
        </div>
      </div>
    </footer>
  );
}
