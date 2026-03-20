import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Copy } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { PAYMENT_WALLET } from '@/lib/env';

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({ where: { id: params.id }, include: { listing: true } });
  if (!order) notFound();

  const tonDeepLink = `ton://transfer/${PAYMENT_WALLET}?amount=${Math.round(order.amountTon * 1_000_000_000)}&text=${encodeURIComponent(order.paymentMemo)}`;

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-10 pt-5">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/submit" className="btn-secondary px-3 py-2">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="text-right">
          <div className="text-lg font-bold">Payment</div>
          <div className="text-sm text-muted">Complete your listing order</div>
        </div>
      </div>

      <section className="card p-5">
        <div className="text-sm text-muted">Listing</div>
        <h1 className="mt-1 text-xl font-bold">{order.listing.tokenName} (${order.listing.ticker})</h1>
        <div className="mt-4 rounded-2xl border border-line bg-panel2 p-4">
          <div className="text-xs uppercase tracking-wide text-muted">Amount</div>
          <div className="mt-2 text-2xl font-bold text-sky-200">{order.amountTon} TON</div>
        </div>
        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-2xl border border-line bg-panel2 p-4">
            <div className="text-xs uppercase tracking-wide text-muted">Payment wallet</div>
            <div className="mt-2 break-all font-mono text-white">{PAYMENT_WALLET}</div>
          </div>
          <div className="rounded-2xl border border-line bg-panel2 p-4">
            <div className="text-xs uppercase tracking-wide text-muted">Memo / comment</div>
            <div className="mt-2 break-all font-mono text-white">{order.paymentMemo}</div>
          </div>
        </div>

        <a href={tonDeepLink} className="btn-primary mt-5 w-full py-3.5 text-base">Open TON wallet</a>

        <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-100">
          Important: send the exact amount and include the exact memo. After payment, an admin will mark the order as paid and review your token.
        </div>

        <div className="mt-5 flex gap-3">
          <Link href="/admin/login" className="btn-secondary flex-1">Admin Review</Link>
          <Link href="/" className="btn-secondary flex-1">Back Home</Link>
        </div>
      </section>
    </main>
  );
}
