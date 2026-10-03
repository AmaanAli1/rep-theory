import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6 px-4 py-24 sm:px-8 lg:px-12">
      <span className="font-mono text-xs uppercase tracking-[0.14em]">
        Cart · 0 items
      </span>
      <h1 className="font-display text-[clamp(4rem,10vw,8rem)] font-black leading-[0.85]">
        YOUR CART IS EMPTY.
      </h1>
      <p className="max-w-xl text-lg leading-relaxed">
        Online checkout opens with our next update. In the meantime, browse the
        gear and programs and pick out what you&apos;ll need for the last rep.
      </p>
      <Link
        href="/equipment"
        className="group inline-flex items-center gap-2.5 self-start bg-ink px-6 py-4 font-display text-2xl font-extrabold tracking-wide text-chalk transition-colors duration-300 hover:bg-ember"
      >
        BROWSE EQUIPMENT
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </section>
  );
}
