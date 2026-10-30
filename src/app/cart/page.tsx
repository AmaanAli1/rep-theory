import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Rep Theory cart: lifting gear and training programs, priced in CAD.",
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <>
      <PageIntro
        metaLeft="Cart · Test mode"
        metaRight="Prices in CAD"
        title="Cart"
        tag="Your kit"
        quote="Everything you picked, in one place."
        sub="Saved in this browser ↓"
      />
      <CartView />
    </>
  );
}
