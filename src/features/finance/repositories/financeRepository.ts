import type { SQLiteDatabase } from 'expo-sqlite';
import { withReadTransaction } from '@/database/withWriteTransaction';
import { listExpenses } from './expenseRepository';
import { listPayments } from './paymentRepository';

export async function readFinanceSnapshot(db: SQLiteDatabase) {
  return withReadTransaction(db, async (transaction) => {
    const expenses = await listExpenses(transaction);
    const payments = await listPayments(transaction);
    return { expenses, payments };
  });
}
