import './App.css';
import { KpiCard } from './components/KpiCard';
import { Counter } from './components/Counter';
import { Toggle } from './components/Toggle';
import { FilteredList } from './components/FilteredList';
import { kpiData, regions, countriesData } from './data/mockData';

export function App() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <p>Дашборд економічних показників. Лабораторна робота 1</p>
      </header>
      

      <section className="section">
        <h2>Ключові показники (KPI)</h2>
        <div className="kpi-grid">
          {kpiData.map((item) => (
            <KpiCard
              key={item.id}
              title={item.title}
              value={item.value}
              change={item.change}
              isPositive={item.isPositive}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Параметри перегляду</h2>
        <div className="widgets-grid">
          <Counter label="Звітний рік" initialValue={2024} min={1960} max={2025} />
          <Toggle label="Формат показників ВВП" />
        </div>
      </section>

      <section className="section">
        <h2>Дані по країнах</h2>
        <FilteredList items={countriesData} categories={regions} />
      </section>
    </div>
  );
}

export default App;
