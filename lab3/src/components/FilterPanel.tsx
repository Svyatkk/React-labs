import type { FilterPanelProps } from '../types';

export function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  return (
    <div className="card filter-panel">
      <div className="filter-header">
        <h3 className="widget-title">Панель фільтрів та пошуку</h3>
        <button type="button" className="btn-reset" onClick={onReset}>
          Скинути фільтри
        </button>
      </div>

      <div className="filter-form-grid">
        <div className="form-group">
          <label htmlFor="search-input">Пошук за назвою або кодом:</label>
          <input
            id="search-input"
            type="text"
            className="form-control"
            placeholder="Наприклад, Ukraine, USA, DEU..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="year-select">Звітний рік:</label>
          <select
            id="year-select"
            className="form-control"
            value={filters.year}
            onChange={(e) => onChange('year', e.target.value)}
          >
            <option value="2023">2023 рік</option>
            <option value="2022">2022 рік</option>
            <option value="2021">2021 рік</option>
            <option value="2020">2020 рік</option>
            <option value="2019">2019 рік</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="per-page-select">Ліміт записів (API):</label>
          <select
            id="per-page-select"
            className="form-control"
            value={filters.perPage}
            onChange={(e) => onChange('perPage', Number(e.target.value))}
          >
            <option value={50}>50 записів</option>
            <option value={100}>100 записів</option>
            <option value={200}>200 записів</option>
            <option value={300}>300 записів</option>
          </select>
        </div>
      </div>
    </div>
  );
}
