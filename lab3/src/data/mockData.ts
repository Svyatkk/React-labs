import type { KpiItem, CountryItem } from '../types';


export const kpiData: KpiItem[] = [
  {
    id: 1,
    title: 'Сумарний ВВП',
    value: '$105.4 трлн',
    change: '+4.1%',
    isPositive: true,
  },
  {
    id: 2,
    title: 'Населення світу',
    value: '8.08 млрд',
    change: '+0.9%',
    isPositive: true,
  },
  {
    id: 3,
    title: 'Тривалість життя',
    value: '73.2 роки',
    change: '+0.4%',
    isPositive: true,
  },
  {
    id: 4,
    title: 'Рівень безробіття',
    value: '5.1%',
    change: '-0.2%',
    isPositive: true,
  },
];

export const regions: string[] = [
  'Усі регіони',
  'Європа та Центральна Азія',
  'Східна Азія та Океанія',
  'Північна Америка',
  'Латинська Америка',
];

export const countriesData: CountryItem[] = [
  {
    id: 1,
    name: 'Україна',
    region: 'Європа та Центральна Азія',
    gdp: '$178 млрд',
    unemployment: '15.0%',
    lifeExpectancy: '69.7 р.',
  },
  {
    id: 2,
    name: 'Польща',
    region: 'Європа та Центральна Азія',
    gdp: '$842 млрд',
    unemployment: '2.8%',
    lifeExpectancy: '78.5 р.',
  },
  {
    id: 3,
    name: 'Німеччина',
    region: 'Європа та Центральна Азія',
    gdp: '$4.45 трлн',
    unemployment: '3.1%',
    lifeExpectancy: '80.9 р.',
  },
  {
    id: 4,
    name: 'США',
    region: 'Північна Америка',
    gdp: '$27.36 трлн',
    unemployment: '3.7%',
    lifeExpectancy: '77.5 р.',
  },
  {
    id: 5,
    name: 'Канада',
    region: 'Північна Америка',
    gdp: '$2.14 трлн',
    unemployment: '5.4%',
    lifeExpectancy: '81.3 р.',
  },
  {
    id: 6,
    name: 'Японія',
    region: 'Східна Азія та Океанія',
    gdp: '$4.21 трлн',
    unemployment: '2.6%',
    lifeExpectancy: '84.6 р.',
  },
  {
    id: 7,
    name: 'Китай',
    region: 'Східна Азія та Океанія',
    gdp: '$17.79 трлн',
    unemployment: '5.2%',
    lifeExpectancy: '78.2 р.',
  },
  {
    id: 8,
    name: 'Бразилія',
    region: 'Латинська Америка',
    gdp: '$2.17 трлн',
    unemployment: '8.0%',
    lifeExpectancy: '72.8 р.',
  },
];
