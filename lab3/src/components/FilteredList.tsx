import type { FilteredListProps, SortField } from '../types';
import { CountryTableBody } from './CountryTableBody';

export function FilteredList({
  title = 'Дані з World Bank API',
  items,
  sortField,
  sortOrder,
  onSort,
}: FilteredListProps) {
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <span className="sort-icon neutral"> ↕</span>;
    }
    return <span className="sort-icon active">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>;
  };

  return (
    <div className="card filter-section">
      <div className="filter-header">
        <h3 className="widget-title">{title}</h3>
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
          <CountryTableBody items={items} />
        </table>
      </div>
    </div>
  );
}
