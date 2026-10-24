import type { Payment } from '../types/finance';

export function usePayments() {
  return {
    payments: [] as Payment[],
    loading: false,
    error: 'O histórico local está disponível no aplicativo Android.',
    reload: () => {},
  };
}
