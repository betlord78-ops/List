import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { ListingStatus, OrderStatus } from '@prisma/client';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!isAdminAuthenticated()) {
    return NextResponse.redirect(new URL('/admin/login', req.url), { status: 303 });
  }

  const form = await req.formData();
  const status = form.get('status')?.toString() as ListingStatus;
  const paymentStatus = form.get('paymentStatus')?.toString() as OrderStatus;
  const verified = form.get('verified') === 'on';
  const featured = form.get('featured') === 'on';
  const trending = form.get('trending') === 'on';
  const txHash = form.get('txHash')?.toString() || null;
  const orderId = form.get('orderId')?.toString();

  await prisma.listing.update({
    where: { id: params.id },
    data: { status, verified, featured, trending },
  });

  if (orderId) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: paymentStatus, txHash },
    });
  }

  return NextResponse.redirect(new URL('/admin', req.url), { status: 303 });
}
