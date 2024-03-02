import { useState, useEffect } from 'react';

/**
 * custom React hook: fetch data from input url
 * @param {string} url 
 * @returns {object} - 3 properties: data, error, loading
 * - data will not be null if request was successful
 * - error will not be null if fetch was unsuccessful
 * - loading will be true until fetch request is resolved
 * - e.g. { data: [...], error: null, loading: false }
 */
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok)
          throw new Error(
            `A network error was encountered: status ${response.status}`,
          );
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
}
