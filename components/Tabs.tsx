import Link from 'next/link';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'featured', label: 'Featured' },
  { key: 'new', label: 'New' },
  { key: 'verified', label: 'Verified' },
  { key: 'trending', label: 'Trending' },
];

export function Tabs({ active, q = '' }: { active: string; q?: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={`/?tab=${tab.key}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
          className={cn(
            'whitespace-nowrap rounded-full border px-4 py-2 text-sm',
            active === tab.key
              ? 'border-sky-400/40 bg-sky-400/10 text-sky-200'
              : 'border-line bg-panel text-muted'
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
