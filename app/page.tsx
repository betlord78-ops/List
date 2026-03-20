import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header';
import { Tabs } from '@/components/Tabs';
import { ListingCard } from '@/components/ListingCard';
import { StickySubmit } from '@/components/StickySubmit';
import { ListingStatus } from '@prisma/client';

type Props = {
  searchParams?: {
    q?: string;
    tab?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const q = searchParams?.q || '';
  const tab = searchParams?.tab || 'featured';

  const where = {
    status: ListingStatus.APPROVED,
    ...(q
      ? {
          OR: [
            { tokenName: { contains: q, mode: 'insensitive' as const } },
            { ticker: { contains: q, mode: 'insensitive' as const } },
            { contractAddress: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
    ...(tab === 'featured'
      ? { featured: true }
      : tab === 'verified'
        ? { verified: true }
        : tab === 'trending'
          ? { trending: true }
          : {}),
  };

  const listings = await prisma.listing.findMany({
    where,
    orderBy:
      tab === 'new'
        ? { createdAt: 'desc' }
        : [
            { featured: 'desc' },
            { verified: 'desc' },
            { trending: 'desc' },
            { volume24hTon: 'desc' },
          ],
    take: 50,
  });

  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-28 pt-5">
      <Header search={q} />
      <div className="mt-5">
        <Tabs active={tab} q={q} />
      </div>
      <section className="mt-5 space-y-4">
        {listings.length ? (
          listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
        ) : (
          <div className="card p-6 text-center text-muted">No listings found yet.</div>
        )}
      </section>
      <StickySubmit />
    </main>
  );
}
