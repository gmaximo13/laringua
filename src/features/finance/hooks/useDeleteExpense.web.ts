export function useDeleteExpense() {
  return {
    deleting: false,
    error: null,
    removeExpense: async (_id: string): Promise<boolean> => false,
  };
}
