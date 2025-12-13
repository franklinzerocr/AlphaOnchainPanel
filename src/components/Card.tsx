"use client";

import React from "react";

export function Card({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="group relative rounded-2xl p-[1px]">
      {/* gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/30 via-violet-500/25 to-cyan-400/25 opacity-70 blur-[0.2px]" />
      {/* glow */}
      <div className="absolute -inset-8 rounded-[28px] bg-gradient-to-r from-sky-500/15 via-violet-500/10 to-cyan-400/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
        <header className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold tracking-tight text-slate-100">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
            ) : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </header>

        <div>{children}</div>
      </div>
    </section>
  );
}
