export interface KpiItem {
  id: number;
  title: string;
  value: string;
  change: string;
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
  change: string;
  isPositive?: boolean;
}


export interface FilteredListProps {
  title?: string;
  items: CountryItem[];
  categories: string[];
}


export interface CountryItem {
  id: number;
  name: string;
  region: string;
  gdp: string;
  unemployment: string;
  lifeExpectancy: string;
}
