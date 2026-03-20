import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PlanCard } from '@/components/PlanCard';

export default async function SubmitPage() {
  const plans = await prisma.plan.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-10 pt-5">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="btn-secondary px-3 py-2">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="text-right">
          <div className="text-lg font-bold">Submit Token</div>
          <div className="text-sm text-muted">Create a SpyTON listing order</div>
        </div>
      </div>

      <form action="/api/submit" method="POST" className="space-y-4">
        <div className="card p-4 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-muted">Project owner name</label>
            <input className="input" name="ownerName" placeholder="Your name or team name" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Owner Telegram</label>
            <input className="input" name="ownerTelegram" placeholder="@username or Telegram link" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Token name</label>
            <input className="input" name="tokenName" placeholder="SpyPepe" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Ticker</label>
            <input className="input" name="ticker" placeholder="SPY" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Contract address</label>
            <input className="input" name="contractAddress" placeholder="EQ..." required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Short description</label>
            <textarea className="input min-h-28" name="description" placeholder="What makes your token special?" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Logo URL</label>
            <input className="input" name="logoUrl" placeholder="https://..." />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Banner URL</label>
            <input className="input" name="bannerUrl" placeholder="https://..." />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Website</label>
            <input className="input" name="website" placeholder="https://..." />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">X / Twitter</label>
            <input className="input" name="twitter" placeholder="https://x.com/..." />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">Telegram</label>
            <input className="input" name="telegram" placeholder="https://t.me/..." />
          </div>
          <div>
            <label className="mb-2 block text-sm text-muted">DEX link</label>
            <input className="input" name="dexUrl" placeholder="https://..." />
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-sky-200">Choose a plan</div>
          {plans.map((plan, index) => (
            <div key={plan.id}>
              <input type="radio" id={plan.id} name="planId" value={plan.id} defaultChecked={index === 0} className="peer sr-only" />
              <PlanCard
                plan={{ ...plan, features: Array.isArray(plan.features) ? (plan.features as string[]) : [] }}
                selected={index === 0}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn-primary w-full py-3.5 text-base">Continue to Payment</button>
      </form>
    </main>
  );
}
