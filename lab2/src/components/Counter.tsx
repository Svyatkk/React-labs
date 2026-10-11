import { useState } from 'react';

interface CounterProps {
  label?: string;
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export function Counter({
  label = 'Звітний рік',
  initialValue = 2024,
  step = 1,
  min = 1960,
  max = 2025,
}: CounterProps) {
  const [value, setValue] = useState<number>(initialValue);

  const handleIncrement = () => {
    setValue((prev) => (max !== undefined ? Math.min(prev + step, max) : prev + step));
  };

  const handleDecrement = () => {
    setValue((prev) => (min !== undefined ? Math.max(prev - step, min) : prev - step));
  };

  const handleReset = () => {
    setValue(initialValue);
  };

  return (
    <div className="card widget-box">
      <h3 className="widget-title">{label}</h3>
      <div className="counter-display">{value}</div>
      <div className="counter-actions">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={min !== undefined && value <= min}
        >
          -
        </button>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={max !== undefined && value >= max}
        >
          +
        </button>
        <button type="button" onClick={handleReset}>
          Скинути
        </button>
      </div>
    </div>
  );
}
