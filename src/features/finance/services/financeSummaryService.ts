import { assertCents } from '@/shared/utils/money';
import { calculateBalances } from './balanceService';
import type { Expense, FinanceOverview, ParticipantId, Payment } from '../types/finance';

export function calculateFinanceOverview(
  participantIds: readonly ParticipantId[],
  expenses: readonly Expense[],
  payments: readonly Payment[],
): FinanceOverview {
  const balances = calculateBalances(participantIds, expenses, payments);
  const paidTotals = participantIds.map((participantId) => {
    let amountCents = 0;
    for (const expense of expenses) {
      if (expense.payerId === participantId) {
        amountCents += expense.amountCents;
        assertCents(amountCents, true);
      }
    }
    return { participantId, amountCents };
  });
  return { expenses, balances, paidTotals };
}
