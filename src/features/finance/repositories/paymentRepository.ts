import type { SQLiteDatabase } from 'expo-sqlite';
import { withWriteTransaction } from '@/database/withWriteTransaction';
import { validatePayment } from '../services/paymentService';
import type { Payment, PaymentInput } from '../types/finance';
import { assertRecordId } from './assertRecordId';
import { listParticipants } from './participantRepository';

export async function createPayment(
  db: SQLiteDatabase,
  id: string,
  input: PaymentInput,
): Promise<Payment> {
  assertRecordId(id);
  const payment: Payment = { ...input, id };

  return withWriteTransaction(db, async (transaction) => {
    const participants = await listParticipants(transaction);
    validatePayment(
      payment,
      participants.map((participant) => participant.id),
    );
    await transaction.runAsync(
      `INSERT INTO payments (id, sender_id, recipient_id, amount_cents, date)
       VALUES (?, ?, ?, ?, ?)`,
      payment.id,
      payment.senderId,
      payment.recipientId,
      payment.amountCents,
      payment.date,
    );
    return payment;
  });
}

export async function listPayments(db: SQLiteDatabase): Promise<Payment[]> {
  return db.getAllAsync<Payment>(`
    SELECT id, sender_id AS senderId, recipient_id AS recipientId, amount_cents AS amountCents, date
    FROM payments
    ORDER BY date DESC, id DESC
  `);
}

export async function deletePayment(db: SQLiteDatabase, id: string): Promise<void> {
  assertRecordId(id);
  await withWriteTransaction(db, async (transaction) => {
    const result = await transaction.runAsync('DELETE FROM payments WHERE id = ?', id);
    if (result.changes !== 1) throw new Error('O acerto não foi encontrado.');
  });
}
