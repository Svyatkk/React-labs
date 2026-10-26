import type { CountryTableBodyProps } from '../types';
import { formatGdp } from '../utils/formatters';

export function CountryTableBody({ items }: CountryTableBodyProps) {
  return (
    <tbody>
      {items.length > 0 ? (
        items.map((country) => (
          <tr key={country.id}>
            <td><strong>{country.countryName}</strong></td>
            <td><span className="badge-code">{country.countryCode}</span></td>
            <td>{country.indicatorName}</td>
            <td>{country.year}</td>
            <td className="numeric-col">{formatGdp(country.value)}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="no-data">
            Немає даних для відображення
          </td>
        </tr>
      )}
    </tbody>
  );
}
