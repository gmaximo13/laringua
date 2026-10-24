import type { ExpenseInput } from '../types/finance';

export function useCreateExpense() {
  return {
    saving: false,
    error: null,
    saveExpense: async (_input: ExpenseInput): Promise<boolean> => false,
  };
}
