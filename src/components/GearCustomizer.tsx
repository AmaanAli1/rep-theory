"use client";

import { useEffect, useId, useRef, useState } from "react";
import QtyStepper from "@/components/QtyStepper";
import { addToCart } from "@/lib/cart";
import GearDrawing from "@/components/GearDrawing";
import { formatCad, formatPrice, type Product } from "@/data/catalog";

const DARK = new Set(["Black", "Navy", "Olive"]);
const MAX_TEXT = 12;

/** Top of a gear detail page: live drawing on the left, options and price on the right. */
export default function GearCustomizer({
  product: p,
  categoryName,
}: {
  product: Product;
  categoryName: string;
}) {
  const colours = p.colours ?? [];
  const [colourIndex, setColourIndex] = useState(0);
  const [choice, setChoice] = useState<Record<string, string>>(() =>
    Object.fromEntries((p.choices ?? []).map((c) => [c.label, c.options[0]])),
  );
  const [text, setText] = useState("");
  const [qty, setQty] = useState(1);
  const textId = useId();

  const colour = colours[colourIndex];
  const preview = text || "YOUR NAME";
  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(addedTimer.current), []);

  const add = () => {
    addToCart(
      {
        slug: p.slug,
        colour: colour?.name,
        choice: p.choices?.[0] ? choice[p.choices[0].label] : undefined,
        text: p.custom ? text.trim() || undefined : undefined,
      },
      qty,
    );
    setJustAdded(true);
    window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setJustAdded(false), 2000);
  };
  const firstChoice = p.choices?.[0] ? choice[p.choices[0].label] : undefined;

  return (
    <div className="grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-2">
      {/* Drawing */}
      <div className="flex flex-col gap-3">
        <div className="blueprint relative flex aspect-[8/5] items-center justify-center border-2 border-ink [background-size:24px_24px]">
          <span className="absolute left-4 top-3.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            {p.code} · Top view
          </span>
          <span className="absolute right-4 top-3.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            {colour ? `Colour: ${colour.name}` : "Scale 1:4"}
          </span>
          {p.drawing && colour && (
            <GearDrawing
              kind={p.drawing}
              colour={colour.hex}
              stitch={
                DARK.has(colour.name)
                  ? "var(--color-chalk)"
                  : "var(--color-ink)"
              }
              text={preview}
              choice={firstChoice}
              label={`Line drawing of the ${p.name.toLowerCase()} in ${colour.name}${
                firstChoice ? `, ${firstChoice.toLowerCase()}` : ""
              }${p.custom ? `, with ${preview} on it` : ""}`}
            />
          )}
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-stone">
          {p.custom
            ? "The drawing updates as you choose options and type your text."
            : "The drawing updates as you choose options."}
        </p>
      </div>

      {/* Details and options */}
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          {p.custom && (
            <span className="self-start bg-accent px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em]">
              Custom
            </span>
          )}
          <h1 className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-black uppercase leading-[0.85]">
            {p.name}
          </h1>
          <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-3.5">
            <span className="font-mono text-[1.75rem]">{formatPrice(p)}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
              {p.spec}
            </span>
          </div>
          <p className="text-[17px] leading-relaxed">
            {p.longDescription ?? p.description}
          </p>
        </div>

        {colours.length > 0 && (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              Colour · <span className="text-stone">{colour?.name}</span>
            </legend>
            <div className="flex flex-wrap gap-3">
              {colours.map((c, i) => {
                const on = i === colourIndex;
                return (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={on}
                    onClick={() => setColourIndex(i)}
                    className="size-10 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: on
                        ? "inset 0 0 0 1px rgb(14 14 14 / .35), 0 0 0 3px var(--color-chalk), 0 0 0 5px var(--color-ink)"
                        : "inset 0 0 0 1px rgb(14 14 14 / .35)",
                    }}
                  />
                );
              })}
            </div>
          </fieldset>
        )}

        {p.choices?.map((c) => (
          <fieldset key={c.label} className="flex flex-col gap-3">
            <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em]">
              {c.label} · <span className="text-stone">{choice[c.label]}</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {c.options.map((o) => {
                const on = choice[c.label] === o;
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={on}
                    onClick={() =>
                      setChoice((prev) => ({ ...prev, [c.label]: o }))
                    }
                    className={`min-h-11 min-w-14 border-2 border-ink px-4 font-mono text-sm uppercase transition-colors ${
                      on ? "bg-ink text-chalk" : "hover:bg-ink hover:text-chalk"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        {p.custom && (
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor={textId}
              className="font-mono text-[11px] uppercase tracking-[0.14em]"
            >
              {p.customLabel ?? "Custom text"}
            </label>
            <input
              id={textId}
              type="text"
              maxLength={MAX_TEXT}
              placeholder="YOUR NAME"
              autoComplete="off"
              value={text}
              onChange={(e) =>
                setText(
                  e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9 ]/g, "")
                    .slice(0, MAX_TEXT),
                )
              }
              className="min-h-13 w-full border-2 border-ink bg-paper px-3.5 py-3 font-display text-2xl font-extrabold tracking-wide"
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-stone">
              {text.length} / {MAX_TEXT} · Letters, numbers and spaces
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-stretch gap-3">
          <QtyStepper qty={qty} onChange={setQty} />
          <button
            type="button"
            onClick={add}
            className="group flex flex-1 items-center justify-between border-2 border-ink bg-ink px-7 py-4 font-display text-2xl font-extrabold tracking-wide text-chalk transition-colors duration-300 hover:border-ember hover:bg-ember"
          >
            {justAdded ? "✓ ADDED" : "ADD TO CART"}
            <span className="font-mono text-base">
              {formatCad(p.price * qty)}
            </span>
          </button>
        </div>
        <p className="-mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-stone">
          Free shipping on gear over $75 · Test store, no real charges
        </p>
        <span className="sr-only">Category: {categoryName}</span>
      </div>
    </div>
  );
}
