import type { CountryItem } from '../types';

interface CountryTableBodyProps {
  items: CountryItem[];
}



export function CountryTableBody({ items }: CountryTableBodyProps) {
  return (
    <tbody>
      {items.length > 0 ? (
        items.map((country) => (
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
  );
}
