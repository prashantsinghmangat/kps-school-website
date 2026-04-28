"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  X,
  Sparkles,
  Calendar,
  GraduationCap,
  ArrowRight,
  Phone,
} from "lucide-react";

const STORAGE_KEY = "kps-admissions-popup-seen";
/** How long to suppress the popup after the user closes it (24 hours). */
const SUPPRESS_MS = 24 * 60 * 60 * 1000;
/** Delay before showing the popup on first load (ms). Lets the page settle. */
const SHOW_DELAY_MS = 1500;

/**
 * First-load admissions popup. Shows once per 24h (localStorage-backed).
 * Closes via X, Escape key, or clicking the overlay outside the dialog.
 *
 * On routes /admissions/* we suppress the popup — visitor is already there.
 */
export function AdmissionsPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Don't show on the admissions tree itself.
    if (window.location.pathname.startsWith("/admissions")) return;

    // Suppression window — if user closed it within last 24h, stay quiet.
    const lastSeen = window.localStorage.getItem(STORAGE_KEY);
    if (lastSeen) {
      const ts = Number(lastSeen);
      if (!Number.isNaN(ts) && Date.now() - ts < SUPPRESS_MS) return;
    }

    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Move focus into the dialog when opening.
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* localStorage unavailable — that's fine */
    }
  }

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={(e) => {
        // Close only if the click is on the overlay itself, not the dialog.
        if (e.target === e.currentTarget) close();
      }}
      className="fixed inset-0 z-[60] flex items-end justify-center overflow-y-auto p-4 sm:items-center"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="adm-popup-title"
        tabIndex={-1}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl outline-none animate-[fadeUp_220ms_ease-out]"
      >
        {/* Coloured header band */}
        <div
          className="relative px-6 py-6 text-white"
          style={{ background: "linear-gradient(135deg, #0a3d62 0%, #174873 60%, #c8102e 130%)" }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <X size={18} />
          </button>

          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ backgroundColor: "#f5b800", color: "#0f172a" }}
          >
            <Sparkles size={12} />
            Admissions Open
          </span>
          <h2
            id="adm-popup-title"
            className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight"
          >
            Welcome to <br />
            Krishna Public School
          </h2>
          <p className="mt-2 text-sm opacity-90">
            Admissions are now open for academic session{" "}
            <span className="font-bold" style={{ color: "#f5b800" }}>
              2026–27
            </span>
            .
          </p>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-start gap-2.5">
              <GraduationCap
                size={16}
                className="mt-0.5 flex-none"
                style={{ color: "#0a3d62" }}
              />
              <span>
                Open for{" "}
                <span className="font-semibold text-[--color-neutral-dark]">
                  Nursery to Class IX
                </span>{" "}
                and{" "}
                <span className="font-semibold text-[--color-neutral-dark]">
                  Class XI
                </span>
                . Limited seats in other classes.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Calendar
                size={16}
                className="mt-0.5 flex-none"
                style={{ color: "#0a3d62" }}
              />
              <span>
                Visit the school office to collect a prospectus, or apply online
                in just a few minutes.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone
                size={16}
                className="mt-0.5 flex-none"
                style={{ color: "#0a3d62" }}
              />
              <span>
                Call{" "}
                <a
                  href="tel:+911212554335"
                  className="font-semibold underline-offset-4 hover:underline"
                  style={{ color: "#0a3d62" }}
                >
                  0121-2554335
                </a>{" "}
                for any admissions enquiry.
              </span>
            </li>
          </ul>

          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
            <Link
              href="/admissions"
              onClick={close}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-110 hover:shadow-md"
              style={{ backgroundColor: "#0a3d62" }}
            >
              Admissions details <ArrowRight size={14} />
            </Link>
            <Link
              href="/admissions/apply"
              onClick={close}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-bold shadow-sm transition hover:brightness-105 hover:shadow-md"
              style={{ backgroundColor: "#f5b800", color: "#0f172a" }}
            >
              Apply online
            </Link>
          </div>

          <button
            type="button"
            onClick={close}
            className="block w-full pt-1 text-center text-xs text-[--color-muted-foreground] underline-offset-4 hover:underline"
          >
            Maybe later
          </button>
        </div>
      </div>

      {/* Tiny inline keyframes for the dialog's fade-up entrance. Living
          here (rather than in globals.css) keeps the animation contained
          to this component. */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
