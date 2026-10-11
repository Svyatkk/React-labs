interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

export function KpiCard({ title, value, change, isPositive = true }: KpiCardProps) {
  return (
    <div className="card kpi-card">
      <span className="card-title">{title}</span>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
        {change}
      </div>
    </div>
  );
}
