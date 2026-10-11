import { useState } from 'react';
import type { CountryItem } from '../types';

interface FilteredListProps {
  title?: string;
  items: CountryItem[];
  categories: string[];
}



export function FilteredList({title = 'Показники країн за регіонами',items,categories,}: FilteredListProps) 
{const [selectedCategory, setSelectedCategory] = useState<string>(categories[0] ?? 'Усі регіони');

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
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((country) => (
                <tr key={country.id}>
                  <td>{country.name}</td>
                  <td>{country.region}</td>
                  <td>{country.gdp}</td>
                  <td>{country.unemployment}</td>
                  <td>{country.lifeExpectancy}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
                  Немає даних для обраного регіону
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
