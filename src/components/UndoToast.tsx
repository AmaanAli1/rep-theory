"use client";

export default function UndoToast({ name, onUndo, className = "" }: { name: string; onUndo: () => void; className?: string }) {
  return (
    <div
      role="status"
      className={`toast-in fixed left-1/2 z-[60] flex -translate-x-1/2 items-center gap-4.5 border-2 border-chalk bg-ink py-3 pl-4.5 pr-3.5 font-mono text-xs uppercase tracking-[0.1em] text-chalk shadow-[6px_6px_0_var(--color-accent)] ${className}`}
    >
      <span>Removed {name}</span>
      <button
        type="button"
        onClick={onUndo}
        className="bg-chalk px-3 py-2 uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember hover:text-[#f4f1ea]"
      >
        Undo
      </button>
    </div>
  );
}
