import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GearCustomizer from "@/components/GearCustomizer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  Breadcrumb,
  PairsWellWith,
  SectionTitle,
} from "@/components/DetailParts";
import { gearCategories, getProduct } from "@/data/catalog";

type Props = { params: Promise<{ slug: string }> };

// Every piece of gear gets a page at build time; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return gearCategories.flatMap((c) =>
    c.products.map((p) => ({ slug: p.slug })),
  );
}

function findGear(slug: string) {
  const found = getProduct(slug);
  return found && !found.product.details ? found : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = findGear(slug);
  if (!found) return {};
  return {
    title: `${found.product.name}: ${found.product.spec}`,
    description: found.product.longDescription ?? found.product.description,
    keywords: [found.product.name.toLowerCase(), found.category.name.toLowerCase(), "lifting gear", "gym accessories"],
    alternates: { canonical: `/equipment/${found.product.slug}` },
  };
}

export default async function GearPage({ params }: Props) {
  const { slug } = await params;
  const found = findGear(slug);
  if (!found) notFound();
  const { product: p, category } = found;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.longDescription ?? p.description,
          sku: p.code,
          brand: { "@type": "Brand", name: SITE_NAME },
          url: `${SITE_URL}/equipment/${p.slug}`,
          offers: {
            "@type": "Offer",
            price: p.price.toFixed(2),
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/equipment/${p.slug}`,
          },
        }}
      />
      <section className="flex flex-col gap-6 px-4 pb-16 pt-7 sm:px-8 lg:px-12">
        <Breadcrumb
          crumbs={[
            { href: "/equipment", label: "Equipment" },
            { href: `/equipment#${category.id}`, label: category.name },
          ]}
          current={p.name}
        />
        <GearCustomizer product={p} categoryName={category.name} />
      </section>

      <section className="grid gap-[clamp(1.5rem,4vw,3.5rem)] px-4 pb-16 sm:px-8 lg:grid-cols-2 lg:px-12">
        {p.specs && (
          <div>
            <SectionTitle>Specs</SectionTitle>
            <dl className="mt-3 grid grid-cols-[10rem_1fr] text-[15px]">
              {p.specs.map((s) => (
                <div key={s.label} className="contents">
                  <dt className="border-b border-[#c9c6be] py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
                    {s.label}
                  </dt>
                  <dd className="border-b border-[#c9c6be] py-3">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {p.howTo && (
          <div>
            <SectionTitle>How to use</SectionTitle>
            <ol className="mt-3">
              {p.howTo.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 border-b border-[#c9c6be] py-3"
                >
                  <span className="font-mono text-ember">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      <PairsWellWith slugs={p.related} />
    </>
  );
}
