import type { KpiItem } from '../types';
import { KpiCard } from './KpiCard';

interface KpiGridProps {
  kpis: KpiItem[];
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="kpi-grid">
      {kpis.map((item) => (
        <KpiCard
          key={item.id}
          title={item.title}
          value={item.value}
          change={item.change}
          isPositive={item.isPositive}
        />
      ))}
    </div>
  );
}
