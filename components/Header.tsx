import { Menu, Search } from 'lucide-react';
import { SpytonLogo } from './SpytonLogo';

export function Header({ search = '' }: { search?: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <SpytonLogo />
          <div>
            <h1 className="text-xl font-bold tracking-tight">SpyTON Listing</h1>
            <p className="text-sm text-muted">Discover and promote TON tokens</p>
          </div>
        </div>
        <button className="rounded-2xl border border-line bg-panel2 p-3 text-muted">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <form action="/" className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          name="q"
          defaultValue={search}
          placeholder="Search token name, ticker or CA"
          className="input pl-11 pr-4"
        />
      </form>
    </div>
  );
}
