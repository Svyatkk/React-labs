export interface KpiItem {
  id: number;
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface ToggleProps {
  label?: string;
}

export interface CounterProps {
  label?: string;
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

export interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}

export interface CountryItem {
  id: number;
  name: string;
  region: string;
  gdp: string;
  unemployment: string;
  lifeExpectancy: string;
}

export interface EconomicIndicatorItem {
  id: number;
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

export interface FilteredListProps {
  title?: string;
  items: EconomicIndicatorItem[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export interface CountryTableBodyProps {
  items: EconomicIndicatorItem[];
}

export interface FilterState {
  search: string;
  year: string;
  perPage: number;
}

export interface FilterPanelProps {
  filters: FilterState;
  onChange: (field: keyof FilterState, value: string | number) => void;
  onReset: () => void;
}
