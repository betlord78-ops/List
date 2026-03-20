import { clsx } from 'clsx';

export function cn(...args: Parameters<typeof clsx>) {
  return clsx(args);
}

export function shortAddress(value: string) {
  if (!value) return '';
  if (value.length <= 12) return value;
  return `${value.slice(0, 6)}...${value.slice(-6)}`;
}

export function formatTon(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K TON`;
  return `${value.toLocaleString()} TON`;
}

export function badgeColor(label: string) {
  switch (label) {
    case 'Verified':
      return 'bg-blue-500/10 text-blue-300';
    case 'Featured':
      return 'bg-purple-500/10 text-purple-300';
    case 'Trending':
      return 'bg-orange-500/10 text-orange-300';
    case 'New':
      return 'bg-emerald-500/10 text-emerald-300';
    default:
      return 'bg-slate-500/10 text-slate-300';
  }
}

export function buildPaymentMemo(listingId: string) {
  return `SPYTON-${listingId.slice(-8).toUpperCase()}`;
}
