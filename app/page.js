"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            API Keys
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Manage your API keys from a dedicated dashboard.
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Create, rotate, and retire keys securely. Jump into the dashboards
            experience to use the full CRUD interface.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => router.push("/dashboards")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white shadow transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Go to dashboard
            </button>
          </div>
        </header>

        <section className="rounded-2xl border border-dashed border-zinc-300 bg-white/60 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            What happens next?
          </h2>
          <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
            The dashboards page hosts the CRUD-like UI where you can create,
            update, and delete API keys. Click either button above to jump in.
          </p>
        </section>
      </main>
    </div>
  );
}
