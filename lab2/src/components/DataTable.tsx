import type { EconomicIndicatorItem, SortField, SortOrder } from '../types';
import { formatGdp } from '../utils/formatters';

interface DataTableProps {
  items: EconomicIndicatorItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export function DataTable({ items, sortField, sortOrder, onSort }: DataTableProps) {
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <span className="sort-icon neutral"> ↕</span>;
    }
    return <span className="sort-icon active">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>;
  };

  return (
    <div className="card">
      <div className="table-controls-header">
        <h3 className="widget-title">Таблиця економічних показників (World Bank)</h3>
        <span className="table-meta">Всього записів: {items.length}</span>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="sortable-th" onClick={() => onSort('countryName')}>
                Країна / Регіон {renderSortIndicator('countryName')}
              </th>
              <th className="sortable-th" onClick={() => onSort('countryCode')}>
                Код {renderSortIndicator('countryCode')}
              </th>
              <th>Показник</th>
              <th>Рік</th>
              <th className="sortable-th" onClick={() => onSort('value')}>
                ВВП (USD) {renderSortIndicator('value')}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((country) => (
              <tr key={country.id}>
                <td><strong>{country.countryName}</strong></td>
                <td><span className="badge-code">{country.countryCode}</span></td>
                <td>{country.indicatorName}</td>
                <td>{country.year}</td>
                <td className="numeric-col">{formatGdp(country.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
