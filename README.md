# Stride — demo store

A fictional sportswear storefront built as a six-person assignment. Next.js App Router, TypeScript, Tailwind. No backend: products are mock data, the cart and the last order live in `localStorage`, and the payment step is a simulated gateway.

`main` is protected. Nobody pushes to it. The merge owner is the only person who merges.

## Start here

You need two things before writing code: your owner folder from `Stride-design-slices-v1.4.zip`, and `Sportswear-Store-Design-Brief.docx`. When they disagree, the brief wins.

```bash
git clone https://github.com/RedPhoenix25/stride.git
cd stride
git checkout test
git checkout -b shop        # your branch: home, shop, product, cart, checkout or payment
npm install
npm run dev
```

- Work only inside your own route folder — see "Where things live" below.
- Tokens, `lib/`, `components/` and `data/` belong to the design owner. Need a variant? Ask; do not edit them.
- Commit to your branch and open the pull request against `test`, never `main`.
- `test` reaches `main` only through the merge owner.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
```

## The six demo scenarios

`/payment` carries six numbered pills. Each one fakes a different gateway outcome, so the whole store can be demonstrated without a real card.

| Pill | Outcome | What to expect |
| --- | --- | --- |
| 1 | Success | 1.8 s processing, then `/order-confirmation` |
| 2 | Declined | Error banner, "Payment declined.", new reference per attempt |
| 3 | Insufficient funds | Error banner quoting the order total |
| 4 | Expired card | Error banner, "Card has expired." |
| 5 | Network failure | 4 s processing, then "We couldn't reach your bank." |
| 6 | CVV mismatch | Inline field error, submit blocked, no banner |

Every attempt gets a fresh `TRX-` reference. Card numbers are not validated (no Luhn check) — the pills decide the outcome.

## Test card

Any card-shaped input works. The frames and the demo script use:

- Visa `4242 4242 4242 4242`, expiry `12 / 29`, CVV `123`, name `Ada Obi`

## The fixed demo basket

Store a cart of these two lines to reproduce the frames exactly:

| Product | Size | Qty | Line |
| --- | --- | --- | --- |
| Velocity Runner, Black | 42 | 1 | ₦89,500 |
| Training Tee, Black | M | 2 | ₦37,000 |

Subtotal ₦126,500, delivery ₦2,500, total ₦129,000, bag badge 3. Delivery is free at ₦150,000 and above.

The last order the demo shows is `ST-20418`, paid with Visa ···· 4242 on 17 November 2026, delivered to Ada Obi, 14B Adeola Odeku Street, Victoria Island, Lagos.

## Where things live

| Path | What it is | Owner |
| --- | --- | --- |
| `app/layout.tsx`, `app/globals.css` | Root shell, fonts, tokens | Design |
| `tailwind.config.ts` | Every token: colour, type, spacing, radius, shadow | Design |
| `lib/types.ts` | The data contract every page codes against | Design |
| `lib/cart.ts`, `lib/storage.ts` | Cart maths, delivery rule, localStorage keys | Design |
| `lib/payment.ts` | Scenario outcomes and the exact banner copy | Design |
| `lib/store.tsx` | Client cart provider (`useStore`) | Design |
| `components/layout/` | Announcement, header, mobile nav, footer | Design |
| `components/ui/` | Button, Input, Badge, banners, cards with Quick add, size sheet, steppers, toast | Design |
| `data/products.ts` | 16 products, Appendix A values | Design |
| `app/page.tsx` | `/` | Owner 1 |
| `app/shop/` | `/shop` | Owner 2 |
| `app/product/[slug]/` | `/product/[slug]` | Owner 3 |
| `app/cart/`, `app/not-found.tsx` | `/cart`, 404 | Owner 4 |
| `app/checkout/` | `/checkout` | Owner 5 |
| `app/payment/`, `app/order-confirmation/` | `/payment`, `/order-confirmation` | Owner 6 |

Page owners add files under their own route folder and do not edit shared files. If a shared component needs a variant, ask the design owner.

## Copy and numbers

Do not retype prices, totals, delivery amounts, references or banner copy. Import `formatNaira`, the cart helpers and `bannerCopy` from `lib/`. The brief (§5) and the reference frames are the source of truth for wording.

## Images

`public/products/*.jpg` are 800×1000 studio packshots on a mist background, two per product — a front view for the cards and an alternate angle for the product gallery. They are generated placeholders, not real photography. Replace them with real shots before the demo; keep the same file names so `data/products.ts` needs no change.

`public/editorial/` holds the home-page art direction: `hero-desktop.jpg` (1792×772) for screens 768px and wider, `hero-mobile.jpg` (800×1000) for phones, and three 800×1000 category tiles. `app/page.tsx` picks the hero with a `<picture>` source, so the phone downloads only the mobile crop.
