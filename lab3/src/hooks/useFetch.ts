import { useState, useEffect } from 'react';

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}


export function useFetch<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
): UseFetchResult<T> {
  const [state, setState] = useState<UseFetchResult<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        setState((prev) => ({ ...prev, loading: true, error: null }));
      }
    });

    fetchFn()
      .then((result) => {
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setState({ data: null, loading: false, error: err.message || 'Помилка завантаження' });
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return state;
}
