import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { badgeColor, cn, formatTon } from '@/lib/utils';

type ListingCardProps = {
  listing: {
    id: string;
    tokenName: string;
    ticker: string;
    description: string;
    logoUrl: string | null;
    holders: number;
    volume24hTon: number;
    ageDays: number;
    verified: boolean;
    featured: boolean;
    trending: boolean;
  };
};

export function ListingCard({ listing }: ListingCardProps) {
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
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-line bg-panel2">
          {listing.logoUrl ? (
            <Image src={listing.logoUrl} alt={listing.tokenName} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-semibold text-sky-200">
              {listing.ticker.slice(0, 2)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="truncate text-base font-semibold">{listing.tokenName}</h3>
              <p className="text-sm text-muted">${listing.ticker}</p>
            </div>
            {badge ? <span className={cn('badge', badgeColor(badge))}>{badge}</span> : null}
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-slate-300">{listing.description}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="grid flex-1 grid-cols-3 gap-2 text-xs text-muted">
          <div>
            <div className="text-[11px] uppercase tracking-wide">Holders</div>
            <div className="mt-1 text-sm text-white">{listing.holders.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide">Vol</div>
            <div className="mt-1 text-sm text-white">{formatTon(listing.volume24hTon)}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide">Age</div>
            <div className="mt-1 text-sm text-white">{listing.ageDays}d</div>
          </div>
        </div>
        <Link href={`/token/${listing.id}`} className="btn-primary gap-2 px-4 py-2.5">
          View <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
