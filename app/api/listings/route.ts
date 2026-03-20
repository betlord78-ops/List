import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ListingStatus } from '@prisma/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const tab = searchParams.get('tab') || 'featured';

  const listings = await prisma.listing.findMany({
    where: {
      status: ListingStatus.APPROVED,
      ...(q
        ? {
            OR: [
              { tokenName: { contains: q, mode: 'insensitive' } },
              { ticker: { contains: q, mode: 'insensitive' } },
              { contractAddress: { contains: q, mode: 'insensitive' } },
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
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json(listings);
}
