import { useEffect, useMemo, useState } from 'react';
// apps/currency/CurrencyCommand.tsx
import { HiCurrencyDollar } from 'react-icons/hi2';
import type { CommandGroup } from '../types';

interface CurrencyCommandProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useCurrencyCommand = ({
  searchQuery,
  setSearchQuery,
}: CurrencyCommandProps): CommandGroup => {
  const [exchangeRates, setExchangeRates] = useState<Record<
    string,
    number
  > | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          'https://api.exchangerate-api.com/v4/latest/USD'
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchRates();
  }, []);

  const parseCurrencyQuery = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    const currencyPattern =
      /(?:convert\s+)?(\d+(?:\.\d+)?)\s*([a-z]{3})\s+(?:to|in)\s+([a-z]{3})/i;
    const match = normalizedQuery.match(currencyPattern);

    if (match && exchangeRates) {
      const [_, amount, fromCurrency, toCurrency] = match;
      const fromRate = exchangeRates[fromCurrency.toUpperCase()];
      const toRate = exchangeRates[toCurrency.toUpperCase()];

      if (fromRate && toRate) {
        const inUSD = Number.parseFloat(amount) / fromRate;
        const result = inUSD * toRate;

        return [
          {
            id: 'currency-conversion',
            name: `${amount} ${fromCurrency.toUpperCase()} = ${result.toFixed(2)} ${toCurrency.toUpperCase()}`,
            description: `Currency conversion (${new Date().toLocaleDateString()})`,
            icon: HiCurrencyDollar,
            action: async () => {
              await navigator.clipboard.writeText(result.toFixed(2));
            },
          },
        ];
      }
    }
    return [];
  };

  const commands = useMemo(() => {
    const baseCommand = {
      id: 'currency',
      name: 'Convert currency',
      description: 'Try: 100 usd to eur',
      icon: HiCurrencyDollar,
      action: () => setSearchQuery('100 usd to eur'),
    };

    const conversionResults = parseCurrencyQuery(searchQuery);
    return conversionResults.length > 0 ? conversionResults : [baseCommand];
  }, [searchQuery, setSearchQuery, exchangeRates]);

  return {
    name: 'Currency',
    commands,
  };
};
