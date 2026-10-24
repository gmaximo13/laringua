import type { PaymentInput } from '../types/finance';

export function useCreatePayment() {
  return {
    saving: false,
    error: null,
    savePayment: async (_input: PaymentInput): Promise<boolean> => false,
  };
}
