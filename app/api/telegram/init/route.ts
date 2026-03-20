import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'Telegram Mini App init placeholder. Add Telegram initData verification here when you wire the bot.',
  });
}
