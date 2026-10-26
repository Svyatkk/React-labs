import { useState, useEffect } from 'react';
import './App.css';
import { economyService } from './api/economy.service';
import { formatGdp } from './utils/formatters';
import { KpiCard } from './components/KpiCard';
import { Counter } from './components/Counter';
import { Toggle } from './components/Toggle';
import { FilteredList } from './components/FilteredList';
import {kpiData} from '../src/data/mockData';

import type { EconomicIndicatorItem, KpiItem, SortField, SortOrder } from './types';

export function App() {
  const [data, setData] = useState<EconomicIndicatorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    economyService
      .getAll()
      .then((items) => {
        setData(items);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message || 'Помилка завантаження даних');
        setLoading(false);
      });
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortField === 'value') {
      return sortOrder === 'asc' ? a.value - b.value : b.value - a.value;
    }
    const compare = a[sortField].localeCompare(b[sortField]);
    return sortOrder === 'asc' ? compare : -compare;
  });

  const totalGdp = data.reduce((acc, item) => acc + item.value, 0);
  const avgGdp = data.length > 0 ? totalGdp / data.length : 0;
  const maxItem =
    data.length > 0
      ? data.reduce((prev, curr) => (curr.value > prev.value ? curr : prev))
      : null;



  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Дашборд економічних показників</h1>
        <p>Лабораторна робота 2 — Світова економіка (World Bank API)</p>
      </header>

      {loading && (
        <div className="card status-box loading">
          <div className="spinner" />
          <p>Завантаження даних із World Bank API...</p>
        </div>
      )}

      {!loading && error && (
        <div className="card status-box error">
          <p className="status-title">Помилка завантаження</p>
          <p className="status-text">{error}</p>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="card status-box empty">
          <p className="status-title">Дані відсутні</p>
          <p className="status-text">World Bank API не повернуло даних.</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <>
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
              <Counter label="Звітний рік" initialValue={2022} min={1960} max={2025} />
              <Toggle label="Формат показників ВВП" />
            </div>
          </section>

          <section className="section">
            <h2>Дані по країнах</h2>
            <FilteredList
              items={sortedData}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
