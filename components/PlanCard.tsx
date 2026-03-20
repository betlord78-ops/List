import { cn } from '@/lib/utils';

type Plan = {
  id: string;
  name: string;
  priceTon: number;
  durationDays: number;
  features: string[];
};

export function PlanCard({ plan, selected }: { plan: Plan; selected?: boolean }) {
  return (
    <label className={cn('card block cursor-pointer p-4', selected && 'border-sky-400/40 bg-sky-400/5')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{plan.name}</div>
          <div className="text-sm text-muted">{plan.durationDays} days</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-sky-200">{plan.priceTon} TON</div>
        </div>
      </div>
      <div className="mt-3 space-y-1 text-sm text-slate-300">
        {plan.features.map((item) => (
          <div key={item}>• {item}</div>
        ))}
      </div>
    </label>
  );
}
