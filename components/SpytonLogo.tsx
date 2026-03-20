export function SpytonLogo({ size = 42 }: { size?: number }) {
  return (
    <div
      className="relative rounded-full border border-sky-400/30 bg-[radial-gradient(circle_at_top,#38bdf8,transparent_45%),linear-gradient(180deg,#0f2642,#091324)] shadow-glow"
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-2 rounded-full border border-sky-300/20" />
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-sky-200">S</div>
    </div>
  );
}
