// src/app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          AlphaOnchainPanel
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Minimal Web3 operations dashboard with wallet connect, on-chain
          balance tracking, network status, and a testnet swap module.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          Scaffolding in progress – next step: wallet connect & on-chain reads.
        </p>
      </div>
    </main>
  );
}
