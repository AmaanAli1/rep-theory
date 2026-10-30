import type { Metadata } from "next";
import CancelledView from "@/components/CancelledView";

export const metadata: Metadata = {
  title: "Checkout cancelled",
  robots: { index: false, follow: false },
};

export default function CancelledPage() {
  return <CancelledView />;
}
