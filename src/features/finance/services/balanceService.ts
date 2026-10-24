import { assertCents } from '@/shared/utils/money';
import type { Expense, ParticipantBalance, ParticipantId, Payment } from '../types/finance';
import { validateExpense } from './expenseService';
import { validatePayment } from './paymentService';
import { assertParticipantPair } from './participants';

export function calculateBalances(
  participantIds: readonly ParticipantId[],
  expenses: readonly Expense[],
  payments: readonly Payment[],
): ParticipantBalance[] {
  assertParticipantPair(participantIds);
  const balances = new Map(participantIds.map((id) => [id, 0]));
  const add = (id: ParticipantId, amount: number) => {
    const next = balances.get(id)! + amount;
    assertCents(Math.abs(next), true);
    balances.set(id, next);
  };

  for (const expense of expenses) {
    // Validate persisted allocations without recalculating historical rounding choices.
    validateExpense(
      { ...expense, split: { type: 'custom', splits: expense.splits } },
      participantIds,
    );
    add(expense.payerId, expense.amountCents);
    for (const split of expense.splits) {
      add(split.participantId, -split.amountCents);
    }
  }

  for (const payment of payments) {
    validatePayment(payment, participantIds);
    add(payment.senderId, payment.amountCents);
    add(payment.recipientId, -payment.amountCents);
  }

  return participantIds.map((participantId) => ({
    participantId,
    balanceCents: balances.get(participantId)!,
  }));
}
