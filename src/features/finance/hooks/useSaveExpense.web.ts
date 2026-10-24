import type { ExpenseInput } from '../types/finance';

export function useSaveExpense(_expenseId?: string) {
  return {
    saving: false,
    error: null,
    saveExpense: async (_input: ExpenseInput): Promise<boolean> => false,
  };
}
