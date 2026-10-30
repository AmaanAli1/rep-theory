import ProductDrawing from "@/components/ProductDrawing";
import type { Product } from "@/data/catalog";
import { kindOf } from "@/lib/pricing";

/** Small square thumbnail for a cart line: blueprint drawing or program tile. */
export default function LineThumb({
  product,
  size = "size-24",
}: {
  product: Product;
  size?: string;
}) {
  const kind = kindOf(product);
  if (kind === "gear" && product.drawing) {
    return (
      <div className={`blueprint flex shrink-0 items-center justify-center ${size}`}>
        <ProductDrawing kind={product.drawing} className="size-[86%]" />
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 flex-col justify-between bg-ink p-2.5 text-chalk ${size}`}
    >
      <span
        className={`font-mono text-[9px] tracking-[0.12em] ${kind === "coaching" ? "text-accent" : "text-ash"}`}
      >
        {product.code}
      </span>
      <span className="font-display text-[1.6rem] font-black leading-[0.9]">
        {kind === "coaching" ? "1:1" : "12 WK"}
      </span>
      {kind === "coaching" ? (
        <span className="font-mono text-[9px] tracking-[0.12em] text-ash">MONTHLY</span>
      ) : (
        <span className="grid grid-cols-12 gap-0.5">
          {Array.from({ length: 12 }, (_, i) => (
            <i
              key={i}
              className={`h-1.5 ${i === 5 || i === 11 ? "outline outline-1 -outline-offset-1 outline-accent" : i < 5 ? "bg-[#3a3a3a]" : "bg-chalk"}`}
            />
          ))}
        </span>
      )}
    </div>
  );
}
