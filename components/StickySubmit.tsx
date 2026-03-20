import Link from 'next/link';

export function StickySubmit() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-md border-t border-line bg-bg/95 p-4 backdrop-blur">
      <Link href="/submit" className="btn-primary w-full py-3.5 text-base">
        Submit Token
      </Link>
    </div>
  );
}
