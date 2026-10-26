import { useState } from 'react';
import type { FilteredListProps } from '../types';
import { CountryTableBody } from './CountryTableBody';

export function FilteredList({title = 'Показники країн за регіонами',items,categories,}: FilteredListProps) 
{
  const [selectedCategory, setSelectedCategory] = useState<string>('Усі регіони');
    
  const filteredItems = selectedCategory === 'Усі регіони'? items : items.filter((country) => country.region === selectedCategory);
      
    
  return (  
    <div className="card filter-section">
      <div className="filter-header">
        <h3 className="widget-title">{title}</h3>
        <div className="filter-controls">
          <label htmlFor="region-select">Регіон: </label>
          <select
            id="region-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Країна</th>
              <th>Регіон</th>
              <th>ВВП</th>
              <th>Безробіття</th>
              <th>Тривалість життя</th>
            </tr>
          </thead>
          <CountryTableBody items={filteredItems} />
        </table>
      </div>
    </div>
  );
}
