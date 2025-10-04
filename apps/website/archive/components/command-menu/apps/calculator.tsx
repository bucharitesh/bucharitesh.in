import { useMemo } from 'react';
import { HiCalculator } from 'react-icons/hi2';
import type { CommandGroup } from '../types';

interface CalculatorProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const calculateExpression = (query: string): number | null => {
  try {
    if (!query) return null;

    // Handle percentage calculations
    if (query.includes('%')) {
      const cleanQuery = query.toLowerCase().trim().replace(/\s+/g, ' ');

      if (cleanQuery.includes(' of ')) {
        const [percentPart, valuePart] = cleanQuery.split(' of ');
        const percentage = Number.parseFloat(percentPart);
        const value = Number.parseFloat(valuePart);
        if (!isNaN(percentage) && !isNaN(value)) {
          return (percentage / 100) * value;
        }
      }

      if (cleanQuery.includes(' on ')) {
        const [percentPart, valuePart] = cleanQuery.split(' on ');
        const percentage = Number.parseFloat(percentPart);
        const value = Number.parseFloat(valuePart);
        if (!isNaN(percentage) && !isNaN(value)) {
          return (percentage / 100) * value;
        }
      }

      const value = Number.parseFloat(query);
      if (!isNaN(value)) {
        return value / 100;
      }
    }

    // Handle basic arithmetic
    const sanitizedQuery = query
      .replace(/[×x]/g, '*')
      .replace(/[÷]/g, '/')
      .replace(/[^0-9+\-*/.() ]/g, '');

    if (sanitizedQuery.includes('function') || sanitizedQuery.includes('=>')) {
      return null;
    }

    return new Function(`return ${sanitizedQuery}`)();
  } catch (error) {
    return null;
  }
};

export const useCalculatorCommand = ({
  searchQuery,
  setSearchQuery,
}: CalculatorProps): CommandGroup => {
  const calculationResult = useMemo(() => {
    if (
      searchQuery.match(/^[\d\s+\-*/%()×x.]+$/) ||
      searchQuery.toLowerCase().includes('% of ') ||
      searchQuery.toLowerCase().includes('% on ')
    ) {
      return calculateExpression(searchQuery);
    }
    return null;
  }, [searchQuery]);

  const formatCalculationResult = (result: number | null): string => {
    if (result === null) return '';
    if (Number.isInteger(result)) return result.toString();
    return result.toFixed(2);
  };

  const commands = useMemo(() => {
    const baseCommand = {
      id: 'calculator',
      name: 'Calculate',
      description: 'Try: 2 + 2 or 34% of 567',
      icon: HiCalculator,
      action: () => setSearchQuery('34% of 567'),
    };

    if (calculationResult !== null) {
      return [
        {
          id: 'calculation-result',
          name: `= ${formatCalculationResult(calculationResult)}`,
          description: searchQuery,
          icon: HiCalculator,
          action: async () => {
            await navigator.clipboard.writeText(calculationResult.toString());
          },
        },
      ];
    }

    return [baseCommand];
  }, [calculationResult, searchQuery, setSearchQuery]);

  return {
    name: calculationResult !== null ? 'Result' : 'Tools',
    commands,
  };
};
