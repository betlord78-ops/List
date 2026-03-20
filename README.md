# SpyTON Listing Mini App

A Telegram-friendly TON token listing marketplace built with Next.js, Prisma, PostgreSQL, and Tailwind.

## What is included

- SpyTON dark marketplace homepage
- Search + tabs
- Token details page
- Submission form
- Plan selection
- Payment instructions page with TON deep link + unique memo
- Admin login page
- Admin dashboard to mark orders paid, approve or reject listings, and assign badges
- Railway Postgres ready Prisma schema
- Vercel-ready Next.js app
- Telegram Mini App API placeholder

## Stack

- Frontend: Next.js App Router + Tailwind
- Backend: Next.js route handlers in the same repo
- Database: PostgreSQL on Railway
- Hosting: Vercel

## Important note

This project is deployable as an MVP.

What is production-ready already:
- frontend UI
- database models
- submission flow
- payment order creation
- admin review workflow
- listing publish flow

What you still may want to improve later:
- real TON blockchain auto-payment verification
- Telegram initData verification for secure user identity
- image upload storage instead of URL fields
- stronger admin auth than a single password cookie
- real analytics / views / votes / boosts

## Local setup

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`

## Vercel + Railway deployment

### 1. Railway
Create a PostgreSQL database in Railway and copy the connection string.

### 2. Vercel env vars
Add these environment variables in Vercel:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `PAYMENT_WALLET`
- `NEXT_PUBLIC_PAYMENT_WALLET`
- `NEXT_PUBLIC_APP_URL`

### 3. Deploy
Push this repo to GitHub and import it into Vercel.

### 4. Initialize database
After deploy, run these commands against the production database:

```bash
npx prisma db push
npx tsx prisma/seed.ts
```

You can run them locally with the production `DATABASE_URL`, or by using Railway shell.

## Default flow

1. User opens homepage
2. User clicks Submit Token
3. User fills token info and chooses a plan
4. App creates listing + order
5. User gets payment page with amount, wallet, and memo
6. Admin logs in and marks order paid
7. Admin changes listing status to `APPROVED`
8. Listing appears on the public homepage

## TON payment automation later

Right now the admin marks payments manually.

To automate later, add a cron or webhook worker that:
- watches the configured TON wallet
- checks incoming transfers
- matches incoming transfer memo to `order.paymentMemo`
- marks the matching order as `PAID`
- optionally moves listing to `PENDING_REVIEW`

## Telegram Mini App hookup later

You can open this app from your bot using Telegram Mini App buttons.

Then later add:
- Telegram `initData` verification
- auto attach Telegram user id to orders
- user-specific submission history

## Admin login

The admin page uses a simple password from `ADMIN_PASSWORD`.

Routes:
- `/admin/login`
- `/admin`

## Suggested next improvements

- TON Connect wallet pay button
- Auto verification from TON API / indexer
- Cloudinary or Supabase Storage for image upload
- Sorting by paid boost priority
- Listing expiration jobs
