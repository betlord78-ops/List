import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { buildPaymentMemo } from '@/lib/utils';

const schema = z.object({
  ownerName: z.string().min(2),
  ownerTelegram: z.string().min(2),
  tokenName: z.string().min(2),
  ticker: z.string().min(1),
  contractAddress: z.string().min(5),
  description: z.string().min(10),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  telegram: z.string().optional(),
  dexUrl: z.string().optional(),
  planId: z.string().min(1),
});

export async function POST(req: Request) {
  const form = await req.formData();
  const values = Object.fromEntries(form.entries());
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const plan = await prisma.plan.findUnique({ where: { id: parsed.data.planId } });
  if (!plan) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });

  const listing = await prisma.listing.create({
    data: {
      ...parsed.data,
      ticker: parsed.data.ticker.toUpperCase(),
      logoUrl: parsed.data.logoUrl || null,
      bannerUrl: parsed.data.bannerUrl || null,
      website: parsed.data.website || null,
      twitter: parsed.data.twitter || null,
      telegram: parsed.data.telegram || null,
      dexUrl: parsed.data.dexUrl || null,
      planId: plan.id,
    },
  });

  const paymentMemo = buildPaymentMemo(listing.id);
  const order = await prisma.order.create({
    data: {
      listingId: listing.id,
      amountTon: plan.priceTon,
      paymentWallet: process.env.PAYMENT_WALLET || process.env.NEXT_PUBLIC_PAYMENT_WALLET || 'UQDemoSpyTONWallet',
      paymentMemo,
    },
  });

  await prisma.listing.update({ where: { id: listing.id }, data: { paymentMemo } });

  return NextResponse.redirect(new URL(`/payment/${order.id}`, req.url), { status: 303 });
}
