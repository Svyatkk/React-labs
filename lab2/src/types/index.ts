export interface KpiItem {
  id: string;
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface EconomicIndicatorItem {
  id: string;
  countryName: string;
  countryCode: string;
  indicatorName: string;
  year: string;
  value: number;
}

export interface WorldBankRecord {
  country?: {
    id?: string;
    value?: string;
  };
  countryiso3code?: string;
  date?: string;
  value?: number | null;
  indicator?: {
    id?: string;
    value?: string;
  };
}

export type SortField = 'countryName' | 'countryCode' | 'value';
export type SortOrder = 'asc' | 'desc';

// Збережено для зворотної сумісності з типами ЛР1
export interface CountryItem {
  id: string;
  name: string;
  region: string;
  gdp: string;
  unemployment: string;
  lifeExpectancy: string;
}
