import { BASE_URL, INDICATOR, YEAR, PER_PAGE, fetchOptions } from './config';
import type { EconomicIndicatorItem, WorldBankRecord } from '../types';

export const economyService = {
  async getAll(year: string = YEAR, perPage: number = PER_PAGE): Promise<EconomicIndicatorItem[]> {
    const response = await fetch(
      `${BASE_URL}/country/all/indicator/${INDICATOR}?format=json&per_page=${perPage}&date=${year}`,
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`Помилка при отриманні даних: ${response.status}`);
    }

    const data = await response.json();
    const records: WorldBankRecord[] = data[1] || [];

    return records
      .filter((item) => item.value !== null)
      .map((item, index) => ({
        id: index + 1,
        countryName: item.country?.value || 'Невідомо',
        countryCode: item.countryiso3code || item.country?.id || '—',
        indicatorName: item.indicator?.value || 'GDP (current US$)',
        year: item.date || year,
        value: Number(item.value) || 0,
      }));
  },
};
