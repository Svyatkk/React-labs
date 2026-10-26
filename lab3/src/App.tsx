import { useState } from 'react';
import './App.css';
import { economyService } from './api/economy.service';
import { useDebounce } from './hooks/useDebounce';
import { useFetch } from './hooks/useFetch';
import { formatGdp } from './utils/formatters';
import { KpiCard } from './components/KpiCard';
import { Counter } from './components/Counter';
import { Toggle } from './components/Toggle';
import { FilteredList } from './components/FilteredList';
import { FilterPanel } from './components/FilterPanel';
import type { FilterState, KpiItem, SortField, SortOrder } from './types';
import { kpiData } from './data/mockData';
const initialFilters: FilterState = {
  search: '',
  year: '2022',
  perPage: 300,
};

export function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const debouncedSearch = useDebounce(filters.search, 400);
  const debouncedYear = useDebounce(filters.year, 400);
  const debouncedPerPage = useDebounce(filters.perPage, 400);

  const { data, loading, error } = useFetch(
    () => economyService.getAll(debouncedYear, debouncedPerPage),
    [debouncedYear, debouncedPerPage]
  );

  const handleFilterChange = (field: keyof FilterState, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredData = (data || []).filter((item) => {
    const query = debouncedSearch.toLowerCase().trim();
    if (!query) return true;
    return (
      item.countryName.toLowerCase().includes(query) ||
      item.countryCode.toLowerCase().includes(query)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortField === 'value') {
      return sortOrder === 'asc' ? a.value - b.value : b.value - a.value;
    }
    const compare = a[sortField].localeCompare(b[sortField]);
    return sortOrder === 'asc' ? compare : -compare;
  });

  const totalGdp = filteredData.reduce((acc, item) => acc + item.value, 0);
  const avgGdp = filteredData.length > 0 ? totalGdp / filteredData.length : 0;
  const maxItem =
    filteredData.length > 0
      ? filteredData.reduce((prev, curr) => (curr.value > prev.value ? curr : prev))
      : null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Дашборд економічних показників</h1>
        <p>Лабораторна робота 3 — Контрольовані форми та кастомні хуки</p>
      </header>

      <FilterPanel
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

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

      {!loading && !error && filteredData.length === 0 && (
        <div className="card status-box empty">
          <p className="status-title">Дані відсутні</p>
          <p className="status-text">За обраними критеріями пошуку не знайдено записів.</p>
        </div>
      )}

      {!loading && !error && filteredData.length > 0 && (
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
              <Counter label="Звітний рік" initialValue={Number(filters.year)} min={1960} max={2025} />
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
