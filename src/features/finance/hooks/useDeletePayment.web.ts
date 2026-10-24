export function useDeletePayment() {
  return {
    deletingId: null as string | null,
    error: null,
    removePayment: async (_id: string): Promise<boolean> => false,
  };
}
