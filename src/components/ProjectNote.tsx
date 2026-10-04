"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const notes = [
  {
    title: "Not a real brand.",
    body: "Products, prices, programs and the coach are made up for the assignment.",
  },
  {
    title: "Nothing is for sale.",
    body: "Add to cart and checkout are switched off. No payment details are ever collected.",
  },
  {
    title: "Not a final product.",
    body: "A first version covering Assignment 1's scope, not a finished store.",
  },
  {
    title: "Not fitness or medical advice.",
    body: "The programs are sample content.",
  },
];

const facts = [
  {
    k: "In scope",
    v: "Home, Equipment + Programs (10 products), Journal with an intro post, About, Privacy + cookie settings",
  },
  { k: "Team", v: "Amaan Ali, Ronnie Abed, Harsh Shekhar" },
  { k: "Built with", v: "Next.js, TypeScript, Tailwind CSS · hosted on Vercel" },
];

/** Yellow "CP340-B · Assignment 1" side tab that slides out a project note. */
export default function ProjectNote() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const tab = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Esc closes; Tab stays inside the drawer while it's open
  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    el?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        tab.current?.focus();
      }
      if (e.key === "Tab" && el) {
        const focusable = el.querySelectorAll<HTMLElement>("a, button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const meetTeam = (e: React.MouseEvent) => {
    setOpen(false);
    // Already on About: just glide down to the team once the drawer closes
    if (pathname === "/about") {
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(
        () =>
          document
            .getElementById("team")
            ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }),
        reduce ? 0 : 350,
      );
    }
  };

  return (
    <>
      <button
        ref={tab}
        type="button"
        aria-expanded={open}
        aria-controls="project-note"
        onClick={() => setOpen((o) => !o)}
        className={`fixed top-1/2 z-[45] -translate-y-1/2 border-2 border-r-0 border-ink bg-caution px-1.5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink transition-[right,background-color,padding] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] [writing-mode:vertical-rl] hover:bg-accent sm:px-2 sm:py-4 sm:text-[11px] sm:hover:pr-3 ${
          open ? "right-[min(27.5rem,92vw)]" : "right-0"
        }`}
      >
        CP340-B<span className="hidden sm:inline"> · Assignment 1</span>
      </button>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[44] bg-ink/45 transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        ref={panel}
        id="project-note"
        role="dialog"
        aria-modal="true"
        aria-label="About this project"
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[46] flex w-[min(27.5rem,92vw)] flex-col overflow-y-auto border-l-2 border-ink bg-chalk shadow-[-8px_0_0_var(--color-caution)] transition-[transform,visibility] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b-2 border-ink bg-caution px-5.5 py-4.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
            Project note · Read me
          </span>
          <button
            type="button"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
              tab.current?.focus();
            }}
            className="size-10 border-2 border-ink text-lg transition-colors hover:bg-ink hover:text-chalk"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4.5 px-5.5 py-6 [&>*]:transition-[opacity,transform] [&>*]:duration-500">
          {[
            <h2
              key="h"
              className="font-display text-[3.25rem] font-black uppercase leading-[0.85]"
            >
              This is a student project.
            </h2>,
            <p key="p" className="font-serif text-2xl italic leading-[1.15]">
              Rep Theory is a concept store built for CP340-B (E-commerce) at
              Wilfrid Laurier University, Assignment 1.
            </p>,
            <ul key="u" className="border-t border-ink">
              {notes.map((n) => (
                <li
                  key={n.title}
                  className="flex gap-3 border-b border-[#c9c6be] py-2.5 leading-normal"
                >
                  <span aria-hidden="true" className="text-ember">
                    +
                  </span>
                  <span>
                    <strong className="font-medium">{n.title}</strong> {n.body}
                  </span>
                </li>
              ))}
            </ul>,
            <dl key="d" className="grid grid-cols-[6.875rem_1fr] text-[15px]">
              {facts.map((f) => (
                <div key={f.k} className="contents">
                  <dt className="border-b border-[#c9c6be] py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
                    {f.k}
                  </dt>
                  <dd className="border-b border-[#c9c6be] py-2.5">{f.v}</dd>
                </div>
              ))}
            </dl>,
            <Link
              key="l"
              href="/about#team"
              onClick={meetTeam}
              className="font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-ember"
            >
              Meet the team on the About page →
            </Link>,
          ].map((child, i) => (
            <div
              key={i}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={open ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0"}
            >
              {child}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}
