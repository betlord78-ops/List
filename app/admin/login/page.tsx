import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  return (
    <main className="mx-auto min-h-screen max-w-md px-4 pb-10 pt-5">
      <div className="mb-4 flex items-center justify-between">
        <Link href="/" className="btn-secondary px-3 py-2">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="text-right">
          <div className="text-lg font-bold">Admin Login</div>
          <div className="text-sm text-muted">Enter SpyTON admin password</div>
        </div>
      </div>
      <form action="/api/admin/login" method="POST" className="card space-y-4 p-5">
        <div>
          <label className="mb-2 block text-sm text-muted">Password</label>
          <input type="password" name="password" className="input" placeholder="Admin password" required />
        </div>
        <button className="btn-primary w-full py-3.5">Login</button>
      </form>
    </main>
  );
}
