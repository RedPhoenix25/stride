import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-content py-14 text-center md:py-24">
      <div className="mx-auto max-w-prose">
        <h1 className="font-display text-d-xl-m uppercase text-ink md:text-d-xl">
          Page not found
        </h1>
        <p className="mx-auto mb-6 mt-4 max-w-prose font-body text-small leading-relaxed text-muted md:mb-8 md:mt-5 md:text-body">
          The page you&apos;re looking for has moved, sold out, or never existed. The collection is still here.
        </p>
        <Link href="/" className={buttonClasses("primary", "md")}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
