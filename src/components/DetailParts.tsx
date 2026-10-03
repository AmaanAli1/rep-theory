import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  formatPrice,
  getProduct,
  productHref,
  type Product,
} from "@/data/catalog";

/** Big section heading with a thick rule, used on every detail page */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b-[3px] border-ink pb-2.5 font-display text-[2.5rem] font-black uppercase">
      {children}
    </h2>
  );
}

/** "← Equipment / Straps / Custom Lifting Straps". The first crumb doubles as a back link. */
export function Breadcrumb({
  crumbs,
  current,
}: {
  crumbs: { href: string; label: string }[];
  current: string;
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]"
    >
      {crumbs.map((c, i) => (
        <span key={c.href} className="flex items-center gap-2.5">
          <Link
            href={c.href}
            className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-ember"
          >
            {i === 0 && (
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:-translate-x-1 motion-reduce:transition-none"
              >
                ←
              </span>
            )}
            {c.label}
          </Link>
          <span aria-hidden="true">/</span>
        </span>
      ))}
      <span aria-current="page" className="text-stone">
        {current}
      </span>
    </nav>
  );
}

/** Programs have no drawing, so they get a small black card instead */
function ProgramMiniCard({ product }: { product: Product }) {
  return (
    <Link
      href={productHref(product)}
      className="product-card group flex h-full flex-col gap-2.5 bg-ink p-4.5 text-chalk"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
        {product.spec}
      </span>
      <span className="flex justify-between gap-3">
        <span className="font-display text-3xl font-black uppercase">
          {product.name}
        </span>
        <span className="font-mono">{formatPrice(product)}</span>
      </span>
      <span className="text-sm leading-normal">{product.description}</span>
      <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.12em]">
        View{" "}
        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

/** "Pairs well with" row at the bottom of every detail page */
export function PairsWellWith({ slugs }: { slugs?: string[] }) {
  const related = (slugs ?? [])
    .map((s) => getProduct(s)?.product)
    .filter((x): x is Product => Boolean(x));
  if (related.length === 0) return null;

  return (
    <section className="flex flex-col gap-5 px-4 pb-24 sm:px-8 lg:px-12">
      <SectionTitle>Pairs well with</SectionTitle>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,18.75rem),1fr))] gap-3">
        {related.map((r) => (
          <li key={r.slug}>
            {r.drawing ? (
              <ProductCard product={r} />
            ) : (
              <ProgramMiniCard product={r} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
