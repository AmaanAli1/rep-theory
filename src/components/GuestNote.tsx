/** We deliberately don't require accounts: guest checkout, receipt by email. */
export default function GuestNote({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] ${className}`}>
      <span aria-hidden="true" className="text-[#5fd08a]">
        ✓
      </span>
      Guest checkout · No account needed
    </span>
  );
}
