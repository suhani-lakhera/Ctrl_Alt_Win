// src/hooks/useCurrencies.ts
import { useState, useEffect } from 'react';

interface Currency { id: number; name: string; code: string; }

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/currencies');
        // ... (rest of the fetching logic)
        const data: Currency[] = await response.json(); 
        setCurrencies(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  return { currencies, loading, error }; // Return the data and status
}