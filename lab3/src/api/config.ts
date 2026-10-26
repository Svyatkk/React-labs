export const BASE_URL = 'https://api.worldbank.org/v2';
export const INDICATOR = 'NY.GDP.MKTP.CD';
export const YEAR = '2022';
export const PER_PAGE = 50;

export const fetchOptions: RequestInit = {
  headers: {
    Accept: 'application/json',
  },
};
