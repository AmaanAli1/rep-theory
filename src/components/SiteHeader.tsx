"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import AddedPopup from "@/components/AddedPopup";
import CartDrawer from "@/components/CartDrawer";
import { onAdded, useCart } from "@/lib/cart";
import { priceCart } from "@/lib/pricing";

const links = [
  { href: "/equipment", label: "Equipment" },
  { href: "/programs", label: "Programs" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = priceCart(useCart());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const onCartPage = usePathname() === "/cart";

  // Bring the header back into view when something is added
  useEffect(() => onAdded(() => setHidden(false)), []);

  // Hide on scroll down, show again on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-ink text-chalk transition-transform duration-300 ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-6 px-4 py-5 sm:px-8 md:grid-cols-[1fr_auto_1fr] lg:px-12">
        <Link
          href="/"
          className="justify-self-start font-display text-3xl font-black tracking-wide transition-colors duration-300 hover:text-accent"
        >
          REP THEORY
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-9 font-mono text-xs uppercase tracking-[0.14em]">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 justify-self-end font-mono text-xs tracking-[0.14em]">
          <button
            type="button"
            className="min-h-11 border border-chalk/60 px-3.5 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
          <Link
            href="/cart"
            aria-haspopup={onCartPage ? undefined : "dialog"}
            aria-expanded={onCartPage ? undefined : drawerOpen}
            aria-controls={onCartPage ? undefined : "mini-cart"}
            onClick={(e) => {
              // Open the mini cart instead of navigating (new-tab clicks still work)
              if (onCartPage || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              setMenuOpen(false);
              setDrawerOpen(true);
            }}
            className="text-accent transition-colors duration-300 hover:text-chalk"
          >
            CART{" "}
            <span
              aria-label={`${count} items`}
              className="ml-1 inline-flex h-5 min-w-5 items-center justify-center bg-accent px-1.5 font-medium text-ink"
            >
              {count}
            </span>
          </Link>
        </div>
      </div>

      <AddedPopup />
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-chalk/15 px-4 pb-6 md:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-chalk/15 py-4 font-display text-4xl font-black uppercase"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
