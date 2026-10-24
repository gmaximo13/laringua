import { assertCalendarDate } from '@/shared/utils/date';
import { assertCents } from '@/shared/utils/money';
import type { ExpenseInput, ExpenseSplit, ParticipantId, SplitRule } from '../types/finance';
import { assertParticipant, assertParticipantPair } from './participants';

export function calculateExpenseSplits(
  amountCents: number,
  participantIds: readonly ParticipantId[],
  rule: SplitRule,
): ExpenseSplit[] {
  assertCents(amountCents);
  assertParticipantPair(participantIds);

  switch (rule.type) {
    case 'equal': {
      assertParticipant(rule.remainderParticipantId, participantIds);
      const base = Math.floor(amountCents / 2);
      return participantIds.map((participantId) => ({
        participantId,
        amountCents: base + (participantId === rule.remainderParticipantId ? amountCents % 2 : 0),
      }));
    }
    case 'single':
      assertParticipant(rule.responsibleParticipantId, participantIds);
      return participantIds.map((participantId) => ({
        participantId,
        amountCents: participantId === rule.responsibleParticipantId ? amountCents : 0,
      }));
    case 'custom': {
      if (rule.splits.length !== 2 || new Set(rule.splits.map((s) => s.participantId)).size !== 2) {
        throw new Error('Informe uma responsabilidade para cada participante.');
      }
      let total = 0;
      for (const split of rule.splits) {
        assertParticipant(split.participantId, participantIds);
        assertCents(split.amountCents, true);
        total += split.amountCents;
        assertCents(total, true);
      }
      if (total !== amountCents) {
        throw new Error('A soma das responsabilidades deve ser igual ao valor da despesa.');
      }
      return rule.splits.map((split) => ({ ...split }));
    }
    default:
      throw new Error('Tipo de divisão inválido.');
  }
}

export function validateExpense(
  input: ExpenseInput,
  participantIds: readonly ParticipantId[],
): ExpenseSplit[] {
  if (!input.description.trim()) {
    throw new Error('Informe a descrição da despesa.');
  }
  assertCalendarDate(input.date);
  assertParticipant(input.payerId, participantIds);
  const splits = calculateExpenseSplits(input.amountCents, participantIds, input.split);
  if (input.split.type === 'single' && input.split.responsibleParticipantId === input.payerId) {
    throw new Error('Na divisão total, a responsabilidade deve ser da outra pessoa.');
  }
  return splits;
}
