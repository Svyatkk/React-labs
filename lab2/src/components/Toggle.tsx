import { useState } from 'react';

interface ToggleProps {
  label?: string;
}

export function Toggle({ label = 'Формат показників ВВП' }: ToggleProps) {
  const [isPerCapita, setIsPerCapita] = useState<boolean>(false);

  const handleToggle = () => {
    setIsPerCapita((prev) => !prev);
  };

  return (
    <div className="card widget-box">
      <h3 className="widget-title">{label}</h3>
      <div className="toggle-actions">
        <button type="button" onClick={handleToggle}>
          Перемкнути режим
        </button>
      </div>
      <div className="toggle-info">
        <span>Режим: </span>
        <strong>{isPerCapita ? 'На душу населення' : 'Загальний (номінальний)'}</strong>
      </div>
      <div className="toggle-result">
        {isPerCapita ? (
          <p>Показник: ~$13,130 на особу (середньосвітовий)</p>
        ) : (
          <p>Показник: ~$105.4 трлн (сукупний обсяг)</p>
        )}
      </div>
    </div>
  );
}
