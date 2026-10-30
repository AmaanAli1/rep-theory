import type { Metadata } from "next";
import { Suspense } from "react";
import PageIntro from "@/components/PageIntro";
import JournalList from "@/components/JournalList";
import SocialBand from "@/components/SocialBand";
import { allPosts } from "@/data/journal";

export const metadata: Metadata = {
  title: "Journal: Lifting Tips, Gear How-Tos & Training Notes",
  description:
    "Practical lifting advice from Rep Theory: how to use lifting straps, when to deload, how to cut without losing strength, and more.",
  keywords: ["lifting tips", "how to use lifting straps", "deload week", "cutting without losing muscle", "strength training blog"],
  alternates: { canonical: "/blog" },
};

export default function JournalPage() {
  return (
    <>
      <PageIntro
        metaLeft={`Journal · ${String(allPosts.length).padStart(2, "0")} posts`}
        metaRight="Notes on training + gear"
        title="Journal"
        tag="The notes"
        quote="What we're learning about the last rep, written down."
        sub="New post every week ↓"
      />
      <section aria-label="Posts" className="px-4 pb-20 pt-2 sm:px-8 lg:px-12">
        {/* Reads ?topic= from the URL */}
        <Suspense fallback={<div className="min-h-[24rem]" />}>
          <JournalList />
        </Suspense>
      </section>
      <SocialBand />
    </>
  );
}
