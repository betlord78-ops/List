import { NextResponse } from 'next/server';
import { getAdminCookieName } from '@/lib/auth';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url), { status: 303 });
  res.cookies.set(getAdminCookieName(), '', { path: '/', expires: new Date(0) });
  return res;
}
