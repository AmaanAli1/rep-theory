import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ScrollSpyToc from "@/components/ScrollSpyToc";
import CookieSettings from "@/components/CookieSettings";
import { PRIVACY_EMAIL } from "@/data/journal";

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Settings",
  alternates: { canonical: "/privacy" },
  description:
    "How Rep Theory handles your information, which cookies we use, your rights under PIPEDA, and your cookie settings.",
};

const sections = [
  { id: "collect", title: "What we collect" },
  { id: "cookies", title: "Cookies" },
  { id: "use", title: "How we use it" },
  { id: "share", title: "Who we share it with" },
  { id: "rights", title: "Your rights" },
  { id: "security", title: "Security" },
  { id: "contact", title: "Contact" },
];

const tocItems = [...sections, { id: "cookie-settings", title: "Cookie settings", num: "→" }];

const short = [
  { t: "No accounts", d: "Browse everything without signing up." },
  { t: "No card data", d: "We never see or store card numbers." },
  { t: "Optional = off", d: "Analytics and marketing cookies wait for your yes." },
  { t: "Your call", d: "Ask to see, fix or delete your data anytime." },
];

const cookieTable = [
  { type: "Essential", does: "Remembers your cookie choice and what's in your cart (stored in your browser, not on our servers).", def: "Always on" },
  { type: "Analytics", does: "Counts page views anonymously so we know what's useful.", def: "Off" },
  { type: "Marketing", does: "Would measure ads on social media. Not used yet.", def: "Off" },
];

function H2({ index }: { index: number }) {
  const s = sections[index];
  return (
    <h2
      id={s.id}
      className="mb-4 mt-11 flex scroll-mt-24 items-baseline gap-3.5 border-b-2 border-ink pb-2.5 font-display text-[2.5rem] font-black uppercase leading-[0.95]"
    >
      <span className="font-mono text-[13px] font-normal text-ember">0{index + 1}</span>
      {s.title}
    </h2>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-4.5">
      {items.map((x, i) => (
        <li key={i} className="flex gap-3.5 border-b border-[#c9c6be] py-2.5 text-[17px] leading-normal">
          <span aria-hidden="true" className="text-ember">
            +
          </span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-medium">{children}</strong>
);

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        metaLeft="Privacy · Last updated Oct 30, 2026"
        metaRight="PIPEDA · Canada"
        title="Privacy"
        tag="The short version"
        quote="We collect as little as we can, and you choose what's optional."
        sub="The full policy + your cookie settings ↓"
      />

      <section aria-label="The short version" className="px-4 pb-12 sm:px-8 lg:px-12">
        <ul className="grid bg-ink text-chalk sm:grid-cols-2 lg:grid-cols-4">
          {short.map((s, i) => (
            <li key={s.t} className="flex flex-col gap-2.5 border-[#2a2a2a] p-6 sm:border-r">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <span className="font-display text-[2rem] font-black uppercase leading-[0.95]">{s.t}</span>
              <span className="text-[15px] leading-normal text-[#d8d5cd]">{s.d}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-[clamp(2rem,6vw,6rem)] px-4 pb-16 pt-2 sm:px-8 lg:grid-cols-[minmax(13rem,18rem)_minmax(0,47.5rem)] lg:px-12">
        <ScrollSpyToc label="On this page" items={tocItems} size="text-xl" />

        <div className="text-lg leading-[1.7] [&_p]:mb-4.5">
          <p className="font-mono text-xs! uppercase leading-[1.7]! tracking-[0.08em] text-stone">
            Rep Theory is a CP340-B group project. Checkout runs in Stripe test
            mode, so no real orders or payments are taken, but this policy
            describes exactly how the site handles your information.
          </p>

          <H2 index={0} />
          <p>Only what we need to run the site:</p>
          <Bullets
            items={[
              <><B>Your cookie choice.</B> Saved in your browser so we don&apos;t ask again.</>,
              <><B>What you send us.</B> Your email and message, if you contact us.</>,
              <><B>With your OK only:</B> anonymous page-view counts (which pages are visited, not who visited them).</>,
              <><B>Your cart.</B> Saved in your browser only, so it&apos;s still there when you come back.</>,
              <><B>When you check out:</B> Stripe collects your name, email, card and (for gear) shipping address. We receive your name, email, city and order details to confirm the order, never your card number.</>,
            ]}
          />
          <p>
            We don&apos;t ask for your date of birth, we don&apos;t build
            profiles, and you never need an account to browse.
          </p>

          <H2 index={1} />
          <p>
            Cookies are small files your browser keeps for a site. Essential
            ones are always on because the site needs them. Everything else is
            off until you turn it on.
          </p>
          <div className="mb-4.5 overflow-x-auto">
            <table className="w-full min-w-[35rem] border-collapse text-left text-[15px]">
              <thead>
                <tr className="border-b border-ink font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
                  <th scope="col" className="w-32 py-2.5 pr-4 font-normal">Type</th>
                  <th scope="col" className="py-2.5 pr-4 font-normal">What it does</th>
                  <th scope="col" className="w-28 py-2.5 font-normal">Default</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((r) => (
                  <tr key={r.type} className="border-b border-[#c9c6be]">
                    <th scope="row" className="py-3.5 pr-4 font-display text-[1.375rem] font-extrabold uppercase">
                      {r.type}
                    </th>
                    <td className="py-3.5 pr-4 leading-normal">{r.does}</td>
                    <td className="py-3.5 font-mono text-[11px] uppercase tracking-[0.1em]">{r.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <H2 index={2} />
          <Bullets
            items={[
              "To run the site and remember your settings.",
              "To answer your messages.",
              "To see which pages help people, using anonymous counts, if you allow it.",
              "To process and ship your order, and to run your coaching subscription.",
            ]}
          />
          <p>
            We never sell your information, and we don&apos;t use it for
            anything you haven&apos;t agreed to.
          </p>

          <H2 index={3} />
          <p>
            Only the services that keep the site running: our hosting provider
            (Vercel) serves the pages, and Stripe, a certified payment
            processor, handles checkout and subscriptions. They only get what
            they need for that job. Share buttons are plain links, so X,
            Facebook and LinkedIn learn nothing until you choose to share.
            We&apos;ll list any new service here before we use it.
          </p>

          <H2 index={4} />
          <p>Under Canada&apos;s privacy law (PIPEDA), you can:</p>
          <Bullets
            items={[
              "Ask what information we have about you.",
              "Ask us to correct it.",
              "Withdraw your consent, for example by turning off analytics below.",
              "Ask us to delete it.",
            ]}
          />
          <p>
            Email us and we&apos;ll respond within 30 days. If you&apos;re not
            happy with our answer, you can contact the Office of the Privacy
            Commissioner of Canada.
          </p>

          <H2 index={5} />
          <Bullets
            items={[
              "Every page is served over HTTPS (encrypted).",
              "Security headers stop other sites from framing our pages or loading unexpected scripts.",
              "Prices are re-checked on our server at checkout, so a cart edited in the browser can't change what you pay.",
              "We never see or store card numbers. Payment details go straight to Stripe, a PCI-compliant processor. This site runs Stripe in test mode, so no real payments are taken.",
              "Only the team can access messages you send us.",
            ]}
          />

          <H2 index={6} />
          <p>
            Privacy questions go to our privacy contact, Amaan Ali, at{" "}
            {PRIVACY_EMAIL}.
          </p>
        </div>
      </div>

      <CookieSettings />
    </>
  );
}
