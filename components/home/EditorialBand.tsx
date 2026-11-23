import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export function EditorialBand() {
  return (
    <section className="relative mt-14 overflow-hidden bg-ink md:mt-24">
      <Image
        src="/editorial/band-poster.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-right md:object-center"
      />
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />

      <div className="container-content relative py-14 text-white md:py-24">
        <h2 className="font-display text-d-l-m uppercase md:text-d-l">
          Train like it matters.
        </h2>
        <p className="mt-5 max-w-prose font-body text-small leading-relaxed text-white/80 md:mb-7 md:text-body">
          Every piece is cut for movement and built to survive the session. No
          gimmicks, no noise — just kit that keeps up.
        </p>
        <Link href="/shop" className={buttonClasses("secondary")}>
          Shop all
        </Link>
      </div>
    </section>
  );
}
