import type { FinanceOverview } from '../types/finance';

export function useFinanceData() {
  return {
    data: null as FinanceOverview | null,
    loading: false,
    error: 'Os dados financeiros locais estão disponíveis no aplicativo Android.',
    reload: () => {},
  };
}
