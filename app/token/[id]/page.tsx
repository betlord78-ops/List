import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { badgeColor, cn, formatTon, shortAddress } from '@/lib/utils';

export default async function TokenDetails({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({ where: { id: params.id } });
  if (!listing) notFound();

  const badge = listing.verified
    ? 'Verified'
    : listing.featured
      ? 'Featured'
      : listing.trending
        ? 'Trending'
        : listing.ageDays <= 3
          ? 'New'
          : null;

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-10 pt-5">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="btn-secondary px-3 py-2">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Link href="/submit" className="btn-primary px-4 py-2.5">Submit Token</Link>
      </div>

      <section className="card overflow-hidden">
        {listing.bannerUrl ? (
          <div className="relative h-36 w-full">
            <Image src={listing.bannerUrl} alt={listing.tokenName} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-32 bg-[radial-gradient(circle_at_top,#38bdf8,transparent_40%),linear-gradient(180deg,#10213a,#091324)]" />
        )}
        <div className="p-5">
          <div className="-mt-16 flex items-end gap-4">
            <div className="relative h-24 w-24 overflow-hidden rounded-3xl border border-line bg-panel2">
              {listing.logoUrl ? (
                <Image src={listing.logoUrl} alt={listing.tokenName} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xl font-bold text-sky-200">
                  {listing.ticker.slice(0, 2)}
                </div>
              )}
            </div>
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{listing.tokenName}</h1>
                {badge ? <span className={cn('badge', badgeColor(badge))}>{badge}</span> : null}
              </div>
              <div className="text-muted">${listing.ticker}</div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-300">{listing.description}</p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="card bg-panel2 p-3">
              <div className="text-xs text-muted">Holders</div>
              <div className="mt-1 text-base font-semibold">{listing.holders.toLocaleString()}</div>
            </div>
            <div className="card bg-panel2 p-3">
              <div className="text-xs text-muted">24h Volume</div>
              <div className="mt-1 text-base font-semibold">{formatTon(listing.volume24hTon)}</div>
            </div>
            <div className="card bg-panel2 p-3">
              <div className="text-xs text-muted">Age</div>
              <div className="mt-1 text-base font-semibold">{listing.ageDays}d</div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-panel2 p-4 text-sm text-slate-300">
            <div className="text-xs uppercase tracking-wide text-muted">Contract address</div>
            <div className="mt-2 break-all font-mono text-white">{shortAddress(listing.contractAddress)}</div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {listing.website ? <a href={listing.website} target="_blank" className="btn-secondary gap-2">Website <ExternalLink className="h-4 w-4" /></a> : null}
            {listing.twitter ? <a href={listing.twitter} target="_blank" className="btn-secondary gap-2">X <ExternalLink className="h-4 w-4" /></a> : null}
            {listing.telegram ? <a href={listing.telegram} target="_blank" className="btn-secondary gap-2">Telegram <ExternalLink className="h-4 w-4" /></a> : null}
            {listing.dexUrl ? <a href={listing.dexUrl} target="_blank" className="btn-primary gap-2">Buy on DEX <ExternalLink className="h-4 w-4" /></a> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
