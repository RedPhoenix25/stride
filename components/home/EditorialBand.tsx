"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

export function EditorialBand() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative mt-14 overflow-hidden bg-ink md:mt-24">
      {reduced ? (
        <Image
          src="/editorial/band-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/editorial/band-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/editorial/band-loop.mp4" type="video/mp4" />
        </video>
      )}
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
