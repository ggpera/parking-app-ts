import { useState, useEffect } from 'react';
import fetchJsonp from 'fetch-jsonp';

const useApi = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const params: URLSearchParams = new URLSearchParams({
        resource_id: '6a7cb189-54db-4895-8570-22a1c2c2446e',
        limit: '1100',
      });
      try {
        const response = await fetchJsonp(`${url}?${params}`);
        const responseData: T = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err as Error | null);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApi;
