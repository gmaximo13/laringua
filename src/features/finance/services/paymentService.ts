import { assertCalendarDate } from '@/shared/utils/date';
import { assertCents } from '@/shared/utils/money';
import type { ParticipantId, PaymentInput } from '../types/finance';
import { assertParticipant, assertParticipantPair } from './participants';

export function validatePayment(
  input: PaymentInput,
  participantIds: readonly ParticipantId[],
): void {
  assertParticipantPair(participantIds);
  assertParticipant(input.senderId, participantIds);
  assertParticipant(input.recipientId, participantIds);
  if (input.senderId === input.recipientId) {
    throw new Error('O remetente e o destinatário devem ser diferentes.');
  }
  assertCents(input.amountCents);
  assertCalendarDate(input.date);
  // An overpayment is valid: it reverses the balance rather than creating an expense.
}
