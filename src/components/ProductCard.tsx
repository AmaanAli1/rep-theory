import Link from "next/link";
import ProductDrawing from "@/components/ProductDrawing";
import { formatPrice, type Product } from "@/data/catalog";

/** Compact product row: blueprint drawing (inverts on hover), name, price, spec, colours. */
export default function ProductCard({ product: p }: { product: Product }) {
  const colourNames = p.colours?.map((c) => c.name).join(", ");

  return (
    <Link
      href={`/equipment/${p.slug}`}
      className="product-card flex h-full items-center gap-4 bg-paper p-3"
    >
      <div className="blueprint size-24 shrink-0 overflow-hidden">
        {p.drawing && <ProductDrawing kind={p.drawing} className="size-full" />}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex justify-between gap-3">
          <span className="flex flex-wrap items-center gap-2 text-base font-medium">
            {p.name}
            {p.custom && (
              <span className="bg-accent px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink">
                Custom
              </span>
            )}
          </span>
          <span className="font-mono">{formatPrice(p)}</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">
          {p.spec}
        </span>
        <div className="flex min-h-3.5 items-center justify-between gap-3">
          {p.colours && p.colours.length > 0 && (
            <span
              role="img"
              aria-label={`Available in ${colourNames}`}
              className="flex gap-1.5"
            >
              {p.colours.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="size-3 rounded-full shadow-[inset_0_0_0_1px_rgb(14_14_14/0.35)]"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </span>
          )}
          <span
            aria-hidden="true"
            className="card-arrow ml-auto font-mono text-[11px] uppercase tracking-[0.12em]"
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
