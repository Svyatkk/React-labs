import { useState, useEffect, useMemo } from 'react';
import type { EconomicIndicatorItem, KpiItem, SortField, SortOrder, WorldBankRecord } from '../types';
import { formatGdp } from '../utils/formatters';
import { KpiGrid } from './KpiGrid';
import { DataTable } from './DataTable';
import { StatusMessage } from './StatusMessage';

const API_URL =
  'https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&per_page=50&date=2022';

export function DashboardContainer() {
  const [data, setData] = useState<EconomicIndicatorItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [reloadToken, setReloadToken] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP помилка: ${response.status} ${response.statusText}`);
        }

        const json = await response.json() as unknown;
        const records = Array.isArray(json) && Array.isArray(json[1]) ? (json[1] as WorldBankRecord[]) : [];

        const parsedItems: EconomicIndicatorItem[] = records
          .filter((item): item is WorldBankRecord & { value: number } => item.value !== null && item.value !== undefined)
          .map((item, index) => ({
            id: item.countryiso3code || `${item.country?.id || 'country'}-${index}`,
            countryName: item.country?.value || 'Невідомо',
            countryCode: item.countryiso3code || item.country?.id || '—',
            indicatorName: item.indicator?.value || 'GDP (current US$)',
            year: item.date || '2022',
            value: Number(item.value) || 0,
          }));

        setData(parsedItems);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        const message = err instanceof Error ? err.message : 'Сталася невідома помилка під час завантаження даних';
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, [reloadToken]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const result =
        sortField === 'value'
          ? a.value - b.value
          : a[sortField].localeCompare(b[sortField]);

      return sortOrder === 'asc' ? result : -result;
    });
  }, [data, sortField, sortOrder]);

  const kpis: KpiItem[] = useMemo(() => {
    if (data.length === 0) return [];

    const totalGdp = data.reduce((acc, item) => acc + item.value, 0);
    const avgGdp = totalGdp / data.length;
    const maxItem = data.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), data[0]);

    return [
      {
        id: 'total-gdp',
        title: 'Сумарний ВВП (вибірка)',
        value: formatGdp(totalGdp),
        change: 'World Bank 2022',
        isPositive: true,
      },
      {
        id: 'avg-gdp',
        title: 'Середній ВВП',
        value: formatGdp(avgGdp),
        change: 'По розрахунку',
        isPositive: true,
      },
      {
        id: 'count-countries',
        title: 'Кількість записів',
        value: `${data.length}`,
        change: 'Завантажено',
        isPositive: true,
      },
      {
        id: 'max-country',
        title: 'Найбільший ВВП',
        value: formatGdp(maxItem.value),
        change: maxItem.countryName,
        isPositive: true,
      },
    ];
  }, [data]);

  const handleRetry = () => {
    setReloadToken((prev) => prev + 1);
  };

  return (
    <div className="dashboard-content">
      {loading && <StatusMessage type="loading" />}

      {!loading && error && (
        <StatusMessage type="error" message={error} onRetry={handleRetry} />
      )}

      {!loading && !error && data.length === 0 && (
        <StatusMessage type="empty" message="World Bank API не повернуло даних." />
      )}

      {!loading && !error && data.length > 0 && (
        <>
          <section className="section">
            <h2>Ключові показники (KPI з реальних даних)</h2>
            <KpiGrid kpis={kpis} />
          </section>

          <section className="section">
            <h2>Дані з World Bank API</h2>
            <DataTable
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
