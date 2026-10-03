import Link from "next/link";
import ProductDrawing from "@/components/ProductDrawing";
import { formatPrice, type Product } from "@/data/catalog";

/** Large shop card: blueprint drawing on top, details below. */
export default function ShopCard({
  product: p,
  fig,
}: {
  product: Product;
  fig: string;
}) {
  const colourNames = p.colours?.map((c) => c.name).join(", ");

  return (
    <Link
      href={`/equipment/${p.slug}`}
      className="product-card group flex h-full flex-col bg-paper"
    >
      <div className="blueprint relative flex aspect-[4/3] items-center justify-center [background-size:16px_16px]">
        <span className="absolute left-3.5 top-3 font-mono text-[10px] uppercase tracking-[0.14em]">
          {p.code} · Fig. {fig}
        </span>
        {p.drawing && (
          <ProductDrawing kind={p.drawing} className="size-[62%]" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="flex flex-wrap items-center gap-2 text-xl font-medium">
            {p.name}
            {p.custom && (
              <span className="bg-accent px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink">
                Custom
              </span>
            )}
          </h3>
          <span className="font-mono text-lg">{formatPrice(p)}</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">
          {p.spec}
        </span>
        <p className="text-[15px] leading-normal">{p.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          {p.colours && (
            <span
              role="img"
              aria-label={`Available in ${colourNames}`}
              className="flex gap-1.5"
            >
              {p.colours.map((c) => (
                <span
                  key={c.name}
                  title={c.name}
                  className="size-3.5 rounded-full shadow-[inset_0_0_0_1px_rgb(14_14_14/0.35)]"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </span>
          )}
          <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.14em]">
            View{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
