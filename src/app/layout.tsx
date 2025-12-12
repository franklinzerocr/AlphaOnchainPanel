// src/app/layout.tsx
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "AlphaOnchain Panel",
  description:
    "AlphaOnchain Panel — A minimal Web3 operations dashboard with wallet connect, on-chain balance tracking, network status, and a testnet swap module. Built with Next.js, TypeScript, Wagmi, and Tailwind.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
