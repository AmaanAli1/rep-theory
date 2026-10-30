import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProgramSheet from "@/components/ProgramSheet";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import BuyProgramButton from "@/components/BuyProgramButton";
import {
  Breadcrumb,
  PairsWellWith,
  SectionTitle,
} from "@/components/DetailParts";
import { formatPrice, getProduct, programs } from "@/data/catalog";

type Props = { params: Promise<{ slug: string }> };

// Every program gets a page at build time; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

function findProgram(slug: string) {
  const found = getProduct(slug);
  return found?.product.details ? found.product : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = findProgram(slug);
  if (!p) return {};
  return {
    title: p.priceNote ? `${p.name}: Online Strength Coaching` : `${p.name} Program: 12-Week Plan`,
    description: `${p.details?.goal} ${p.details?.who}`,
    keywords: [`${p.name.toLowerCase()} program`, "12 week training program", "workout plan", "online coaching"],
    alternates: { canonical: `/programs/${p.slug}` },
  };
}

/** Header row + rows with the same fixed columns, so everything lines up */
function TableHead({ cols }: { cols: { label: string; className?: string }[] }) {
  return (
    <thead>
      <tr className="border-b border-ink font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
        {cols.map((c) => (
          <th key={c.label} scope="col" className={`pb-2.5 font-normal ${c.className ?? ""}`}>
            {c.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const p = findProgram(slug);
  if (!p?.details) notFound();
  const details = p.details;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.longDescription ?? p.description,
          sku: p.code,
          category: p.priceNote ? "Online coaching subscription" : "Digital training program",
          brand: { "@type": "Brand", name: SITE_NAME },
          url: `${SITE_URL}/programs/${p.slug}`,
          offers: {
            "@type": "Offer",
            price: p.price.toFixed(2),
            priceCurrency: "CAD",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/programs/${p.slug}`,
          },
        }}
      />
      <section className="flex flex-col gap-6 px-4 pb-16 pt-7 sm:px-8 lg:px-12">
        <Breadcrumb
          crumbs={[{ href: "/programs", label: "Programs" }]}
          current={p.name}
        />

        <div className="grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-2">
          <ProgramSheet code={p.code} details={details} />

          <div className="@container flex flex-col gap-6.5">
            <div className="flex flex-col gap-3">
              <span className="self-start bg-ink px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-chalk">
                {details.format}
              </span>
              <h1 className="font-display text-[min(6.5rem,12.5cqi)] font-black uppercase leading-[0.85]">
                {p.name}
              </h1>
              <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3.5">
                <span className="font-mono text-[1.75rem]">{formatPrice(p)}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
                  {p.spec}
                  {p.priceNote ? "" : " · One-time purchase"}
                </span>
              </div>
              <p className="font-serif text-3xl italic leading-[1.12]">
                {details.goal}
              </p>
            </div>
            <div className="grid gap-6 border-t border-ink pt-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
                  Who it&apos;s for
                </h2>
                <p className="leading-normal">{details.who}</p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
                  What&apos;s included
                </h2>
                <ul className="flex flex-col gap-1.5">
                  {details.includes.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="text-ember">
                        +
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <BuyProgramButton product={p} />
          </div>
        </div>
      </section>

      {details.week && (
        <section className="flex flex-col gap-4 px-4 pb-16 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
            <h2 className="font-display text-[2.5rem] font-black uppercase">
              Sample week
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em]">
              Gear tags show what helps on each day
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <TableHead
                cols={[
                  { label: "Day", className: "w-20" },
                  { label: "Focus", className: "w-40" },
                  { label: "Exercises" },
                  { label: "Gear", className: "w-64" },
                ]}
              />
              <tbody>
                {details.week.map((d) => (
                  <tr key={d.day} className="border-b border-[#c9c6be] align-middle">
                    <th
                      scope="row"
                      className="py-4 pr-6 font-mono text-xs font-normal uppercase tracking-[0.12em] text-stone"
                    >
                      {d.day}
                    </th>
                    <td className="py-4 pr-6 font-display text-[1.75rem] font-extrabold uppercase">
                      {d.focus}
                    </td>
                    <td className="py-4 pr-6 text-[15px] leading-normal">{d.lifts}</td>
                    <td className="py-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {d.gear.map((g) => {
                          const gear = getProduct(g)?.product;
                          if (!gear) return null;
                          return (
                            <li key={g}>
                              <Link
                                href={`/equipment/${g}`}
                                className="gear-chip inline-block border border-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
                              >
                                {gear.name.replace(/^Custom /, "")}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {details.meals && (
        <section className="flex flex-col gap-4 px-4 pb-16 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-[3px] border-ink pb-2.5">
            <h2 className="font-display text-[2.5rem] font-black uppercase">
              Sample day of eating
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em]">
              Example only · Adjust portions to you
            </p>
          </div>
          <p className="max-w-[52rem] font-serif text-[1.625rem] italic leading-[1.2]">
            {details.meals.note}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <TableHead
                cols={[
                  { label: "Time", className: "w-20" },
                  { label: "Meal", className: "w-52" },
                  { label: "Example" },
                  { label: "Why", className: "w-72" },
                ]}
              />
              <tbody>
                {details.meals.day.map((m) => (
                  <tr key={m.time} className="border-b border-[#c9c6be] align-middle">
                    <th
                      scope="row"
                      className="py-4 pr-6 font-mono text-xs font-normal text-stone"
                    >
                      {m.time}
                    </th>
                    <td className="whitespace-nowrap py-4 pr-6 font-display text-[1.625rem] font-extrabold uppercase">
                      {m.meal}
                    </td>
                    <td className="py-4 pr-6 text-[15px] leading-normal">{m.food}</td>
                    <td className="py-4 font-mono text-[11px] leading-normal tracking-[0.06em] text-stone">
                      {m.why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
            An example, not your plan. The program starts with a calorie +
            intake assessment to set your own targets. For allergies or medical
            conditions, talk to a registered dietitian.
          </p>
        </section>
      )}

      <section className="flex flex-col gap-4 px-4 pb-16 sm:px-8 lg:px-12">
        <SectionTitle>Questions</SectionTitle>
        <FaqList faqs={details.faqs} />
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
          General fitness guidance, not medical or dietitian advice. Talk to a
          professional before starting if you have an injury or condition.
        </p>
      </section>

      <PairsWellWith slugs={p.related} />
    </>
  );
}
