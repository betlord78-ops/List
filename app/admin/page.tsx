import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { ListingStatus, OrderStatus } from '@prisma/client';

export default async function AdminPage() {
  if (!isAdminAuthenticated()) redirect('/admin/login');

  const listings = await prisma.listing.findMany({
    include: { orders: { orderBy: { createdAt: 'desc' }, take: 1 } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 pb-10 pt-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">SpyTON Admin</h1>
          <p className="text-sm text-muted">Review payments, approve listings, and manage marketplace badges.</p>
        </div>
        <form action="/api/admin/logout" method="POST">
          <button className="btn-secondary">Logout</button>
        </form>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-line bg-panel shadow-glow">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line text-muted">
            <tr>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Plan / Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Flags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => {
              const order = item.orders[0];
              return (
                <tr key={item.id} className="border-b border-line/70 align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold">{item.tokenName} (${item.ticker})</div>
                    <div className="mt-1 max-w-xs text-xs text-muted">{item.contractAddress}</div>
                    <div className="mt-2 text-xs text-slate-300">Owner: {item.ownerName || '-'} / {item.ownerTelegram || '-'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div>{order?.amountTon || 0} TON</div>
                    <div className="mt-1 text-xs text-muted">{order?.status || OrderStatus.PENDING}</div>
                    <div className="mt-1 break-all text-xs text-slate-300">Memo: {order?.paymentMemo || item.paymentMemo || '-'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="badge bg-slate-500/10 text-slate-200">{item.status}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-300">
                    <div>Verified: {item.verified ? 'Yes' : 'No'}</div>
                    <div>Featured: {item.featured ? 'Yes' : 'No'}</div>
                    <div>Trending: {item.trending ? 'Yes' : 'No'}</div>
                  </td>
                  <td className="px-4 py-4">
                    <form action={`/api/admin/listings/${item.id}`} method="POST" className="space-y-2">
                      <input type="hidden" name="orderId" defaultValue={order?.id} />
                      <div className="grid gap-2 md:grid-cols-2">
                        <select name="status" defaultValue={item.status} className="input py-2.5">
                          {Object.values(ListingStatus).map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                        <select name="paymentStatus" defaultValue={order?.status || OrderStatus.PENDING} className="input py-2.5">
                          {Object.values(OrderStatus).map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                        <label className="flex items-center gap-2 text-xs"><input name="verified" type="checkbox" defaultChecked={item.verified} /> Verified</label>
                        <label className="flex items-center gap-2 text-xs"><input name="featured" type="checkbox" defaultChecked={item.featured} /> Featured</label>
                        <label className="flex items-center gap-2 text-xs"><input name="trending" type="checkbox" defaultChecked={item.trending} /> Trending</label>
                      </div>
                      <input name="txHash" placeholder="Tx hash (optional)" defaultValue={order?.txHash || ''} className="input py-2.5" />
                      <button className="btn-primary w-full py-2.5">Save</button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
