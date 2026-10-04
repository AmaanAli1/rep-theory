"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie consent, stored in this browser only (localStorage).
 * Essential storage is always allowed; analytics and marketing default to off
 * and nothing optional runs until the visitor says yes.
 */
export type Consent = {
  analytics: boolean;
  marketing: boolean;
  savedAt: string; // ISO date, shown on the settings panel
};

const KEY = "rt-cookie-consent";
const EVENT = "rt-consent-change";

function read(): Consent | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      savedAt: String(parsed.savedAt ?? ""),
    };
  } catch {
    return null; // storage blocked or corrupted: treat as "not chosen yet"
  }
}

// useSyncExternalStore needs a stable snapshot, so cache by raw string
let cachedRaw: string | null | undefined;
let cached: Consent | null = null;
function getSnapshot(): Consent | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cached = read();
  }
  return cached;
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage); // other tabs
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Save a choice and tell every component on the page */
export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const value: Consent = { ...choice, savedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: the choice still applies for this page view
    cachedRaw = JSON.stringify(value);
    cached = value;
  }
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Current consent. `undefined` while rendering on the server (unknown),
 * `null` when the visitor hasn't chosen yet.
 */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}
