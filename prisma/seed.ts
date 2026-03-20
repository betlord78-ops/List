import { PrismaClient, ListingStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.upsert({
    where: { name: 'Basic Listing' },
    update: {},
    create: {
      name: 'Basic Listing',
      priceTon: 10,
      durationDays: 30,
      sortOrder: 1,
      features: ['Marketplace listing', 'Project page', 'Manual review']
    }
  });
  await prisma.plan.upsert({
    where: { name: 'Featured Listing' },
    update: {},
    create: {
      name: 'Featured Listing',
      priceTon: 25,
      durationDays: 30,
      sortOrder: 2,
      features: ['Featured badge', 'Top placement', 'Project page']
    }
  });
  await prisma.plan.upsert({
    where: { name: 'Trending Boost' },
    update: {},
    create: {
      name: 'Trending Boost',
      priceTon: 40,
      durationDays: 7,
      sortOrder: 3,
      features: ['Trending badge', 'Top placement', 'Community boost']
    }
  });

  const samples = [
    {
      tokenName: 'SpyPepe', ticker: 'SPY', contractAddress: 'EQD_SAMPLE_SPYPEPE', description: 'Fast-growing meme token on TON with an active raiding community.', logoUrl: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=300&q=80', verified: true, featured: true, status: ListingStatus.APPROVED, holders: 1240, volume24hTon: 24000, ageDays: 3
    },
    {
      tokenName: 'TonRocket', ticker: 'ROCKET', contractAddress: 'EQD_SAMPLE_TONROCKET', description: 'Community-led TON launch with strong social growth and fast momentum.', logoUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=300&q=80', trending: true, status: ListingStatus.APPROVED, holders: 860, volume24hTon: 12000, ageDays: 1
    },
    {
      tokenName: 'DedustCat', ticker: 'DCAT', contractAddress: 'EQD_SAMPLE_DCAT', description: 'Viral cat token on TON built for raids, memes, and community culture.', logoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80', featured: true, status: ListingStatus.APPROVED, holders: 2400, volume24hTon: 31000, ageDays: 5
    }
  ];

  for (const item of samples) {
    await prisma.listing.upsert({
      where: { contractAddress: item.contractAddress },
      update: item,
      create: item,
    });
  }
}

main().finally(async () => prisma.$disconnect());
