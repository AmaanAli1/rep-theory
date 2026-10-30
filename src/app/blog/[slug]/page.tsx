import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollSpyToc from "@/components/ScrollSpyToc";
import ShareBar from "@/components/ShareBar";
import ProductCard from "@/components/ProductCard";
import PostFigure from "@/components/PostFigure";
import JsonLd from "@/components/JsonLd";
import { allPosts, getPost, posts } from "@/data/journal";
import { getProduct, type Product } from "@/data/catalog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const gear = (post.gear ?? [])
    .map((s) => getProduct(s)?.product)
    .filter((p): p is Product => Boolean(p));
  const more = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const path = `/blog/${post.slug}`;

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          mainEntityOfPage: `${SITE_URL}${path}`,
          keywords: post.keywords.join(", "),
        }}
      />
      <header className="mx-4 flex flex-col gap-4.5 border-b-[3px] border-ink pb-9 pt-7 sm:mx-8 lg:mx-12">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em]"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 transition-colors hover:text-ember"
          >
            <span aria-hidden="true" className="inline-block transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Journal
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-stone">
            {post.title}
          </span>
        </nav>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
          Post {post.num} · {post.topicLabel} · <time dateTime={post.date}>{post.dateLabel}</time> ·{" "}
          {post.readTime} read · By {post.author}
        </p>
        <h1 className="max-w-6xl font-display text-[clamp(3.25rem,9vw,8.75rem)] font-black uppercase leading-[0.82]">
          {post.title}
        </h1>
        <p className="max-w-3xl font-serif text-[clamp(1.5rem,3vw,1.875rem)] italic leading-[1.15]">
          {post.deck}
        </p>
        <ShareBar path={path} title={post.title} />
      </header>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(2rem,6vw,6rem)] px-4 pb-16 pt-10 sm:px-8 lg:grid-cols-[minmax(13rem,18rem)_minmax(0,45rem)] lg:px-12">
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <ScrollSpyToc label="In this post" items={post.sections ?? []} size="text-xl" sticky={false} />
          {gear.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <span className="border-b-2 border-ink pb-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
                Gear in this post
              </span>
              {gear.map((g) => (
                <ProductCard key={g.slug} product={g} />
              ))}
            </div>
          )}
        </aside>

        <div className="text-lg leading-[1.7] [&_p]:mb-4.5">
          {post.lead && (
            <p className="font-serif text-[1.75rem] italic leading-[1.2]">{post.lead}</p>
          )}
          {post.sections?.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2
                id={s.id}
                className="mb-3.5 mt-9 scroll-mt-24 font-display text-[2.5rem] font-black uppercase leading-[0.95]"
              >
                {s.title}
              </h2>
              {s.paragraphs.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
              {s.figure && <PostFigure kind={s.figure} />}
            </section>
          ))}

          {post.cta && (
            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 bg-ink p-5 text-chalk">
              <div className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {post.cta.eyebrow}
                </span>
                <span className="font-display text-[2rem] font-black uppercase">
                  {post.cta.title}
                </span>
              </div>
              <Link
                href={post.cta.href}
                className="group bg-chalk px-4.5 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember hover:text-[#f4f1ea]"
              >
                {post.cta.label}{" "}
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-4.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">— {post.author}</span>
            <ShareBar path={path} title={post.title} />
          </div>
        </div>
      </div>

      <section aria-labelledby="more-title" className="flex flex-col gap-4 px-4 pb-20 sm:px-8 lg:px-12">
        <h2
          id="more-title"
          className="border-b-[3px] border-ink pb-2.5 font-display text-5xl font-black uppercase"
        >
          Keep reading
        </h2>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4">
          {more.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="product-card group flex h-full flex-col gap-3 border-2 border-ink bg-paper p-5.5"
              >
                <span className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
                  <span>
                    Post {p.num} · {p.topicLabel}
                  </span>
                  <span>{p.readTime}</span>
                </span>
                <span className="font-display text-[2.25rem] font-black uppercase leading-[0.9]">
                  {p.title}
                </span>
                <span className="text-[15px] leading-relaxed">{p.excerpt}</span>
                <span className="mt-auto font-mono text-[11px] uppercase tracking-[0.14em]">
                  Read{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
