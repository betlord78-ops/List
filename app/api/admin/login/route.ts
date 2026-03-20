import { NextResponse } from 'next/server';
import { getAdminCookieName } from '@/lib/auth';

export async function POST(req: Request) {
  const form = await req.formData();
  const password = form.get('password')?.toString() || '';
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL('/admin/login', req.url), { status: 303 });
  }

  const res = NextResponse.redirect(new URL('/admin', req.url), { status: 303 });
  res.cookies.set(getAdminCookieName(), password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
