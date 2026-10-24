import type { Expense } from '../types/finance';

export function useExpense(_id?: string) {
  return {
    expense: null as Expense | null,
    loading: false,
    error: 'As despesas locais estão disponíveis no aplicativo Android.',
    reload: () => {},
  };
}
