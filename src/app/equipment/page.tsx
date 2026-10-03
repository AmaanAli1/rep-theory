import type { Metadata } from "next";
import ShopNav from "@/components/ShopNav";
import ShopCard from "@/components/ShopCard";
import { gearCategories } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Lifting straps, wrist wraps, cable attachments and barbell clips from Rep Theory.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function EquipmentPage() {
  const tabs = gearCategories.map((c) => ({
    id: c.id,
    label: c.name,
    count: c.products.length,
  }));
  const itemCount = gearCategories.flatMap((c) => c.products).length;

  return (
    <>
      <section className="flex flex-col gap-5 px-4 pb-8 pt-10 sm:px-8 md:pt-16 lg:px-12">
        <div className="flex flex-wrap justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em]">
          <span>
            Equipment · {pad(itemCount)} items · {pad(gearCategories.length)}{" "}
            categories
          </span>
          <span>Prices in CAD</span>
        </div>
        <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <h1 className="font-display text-[clamp(3rem,13.5vw,11rem)] font-black leading-[0.8] tracking-tight">
            EQUIPMENT
          </h1>
          <div className="mb-2.5 flex max-w-md flex-col gap-3 border-t-2 border-ink pt-3.5 lg:justify-self-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ember">
              The kit
            </span>
            <p className="font-serif text-[2.125rem] italic leading-[1.08]">
              Gear for the rep where your grip or wrists quit first.
            </p>
            <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.08em]">
              {gearCategories.map((c) => c.name).join(" · ")} ↓
            </p>
          </div>
        </div>
      </section>

      <ShopNav tabs={tabs} />

      <div className="pb-24">
        {gearCategories.map((cat) => (
          <section
            key={cat.id}
            id={cat.id}
            aria-labelledby={`${cat.id}-title`}
            className="flex scroll-mt-20 flex-col gap-6 px-4 pb-4 pt-16 sm:px-8 lg:px-12"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-3">
              <h2
                id={`${cat.id}-title`}
                className="font-display text-[clamp(2.5rem,10vw,3.75rem)] font-black uppercase leading-[0.9]"
              >
                {cat.num} {cat.name}
              </h2>
              <p className="font-mono text-xs uppercase tracking-[0.12em]">
                {cat.pitch}
              </p>
            </div>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,23.75rem),1fr))] gap-6">
              {cat.products.map((p) => (
                <li key={p.slug}>
                  <ShopCard product={p} fig={cat.num} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
