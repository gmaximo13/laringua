import type { SQLiteDatabase } from 'expo-sqlite';
import { withWriteTransaction } from '@/database/withWriteTransaction';
import { validateExpense } from '../services/expenseService';
import type { Expense, ExpenseInput, ExpenseSplit } from '../types/finance';
import { assertRecordId } from './assertRecordId';
import { listParticipants } from './participantRepository';

export async function createExpense(
  db: SQLiteDatabase,
  id: string,
  input: ExpenseInput,
): Promise<Expense> {
  assertRecordId(id);
  // Snapshot input before awaiting: callers may continue changing their form state.
  const draft: ExpenseInput = {
    ...input,
    description: input.description.trim(),
    split:
      input.split.type === 'custom'
        ? { type: 'custom', splits: input.split.splits.map((split) => ({ ...split })) }
        : { ...input.split },
  };

  return withWriteTransaction(db, async (transaction) => {
    const participants = await listParticipants(transaction);
    const splits = validateExpense(
      draft,
      participants.map((participant) => participant.id),
    );
    const expense: Expense = {
      id,
      description: draft.description,
      amountCents: draft.amountCents,
      payerId: draft.payerId,
      date: draft.date,
      splitType: draft.split.type,
      splits,
    };

    await transaction.runAsync(
      `INSERT INTO expenses (id, description, amount_cents, payer_id, date, split_type)
       VALUES (?, ?, ?, ?, ?, ?)`,
      expense.id,
      expense.description,
      expense.amountCents,
      expense.payerId,
      expense.date,
      expense.splitType,
    );
    for (const split of splits) {
      await transaction.runAsync(
        'INSERT INTO expense_splits (expense_id, participant_id, amount_cents) VALUES (?, ?, ?)',
        expense.id,
        split.participantId,
        split.amountCents,
      );
    }
    return expense;
  });
}

type ExpenseRow = Omit<Expense, 'splits'> & {
  splitParticipantId: string | null;
  splitAmountCents: number | null;
};

export async function listExpenses(db: SQLiteDatabase): Promise<Expense[]> {
  // One statement reads expenses and allocations from the same database snapshot.
  const rows = await db.getAllAsync<ExpenseRow>(`
    SELECT e.id, e.description, e.amount_cents AS amountCents,
           e.payer_id AS payerId, e.date, e.split_type AS splitType,
           s.participant_id AS splitParticipantId, s.amount_cents AS splitAmountCents
    FROM expenses e
    LEFT JOIN expense_splits s ON s.expense_id = e.id
    ORDER BY e.date DESC, e.id DESC, s.participant_id ASC
  `);
  const expenses = new Map<string, Expense & { splits: ExpenseSplit[] }>();
  for (const row of rows) {
    let expense = expenses.get(row.id);
    if (!expense) {
      expense = {
        id: row.id,
        description: row.description,
        amountCents: row.amountCents,
        payerId: row.payerId,
        date: row.date,
        splitType: row.splitType,
        splits: [],
      };
      expenses.set(row.id, expense);
    }
    if (row.splitParticipantId !== null && row.splitAmountCents !== null) {
      expense.splits.push({
        participantId: row.splitParticipantId,
        amountCents: row.splitAmountCents,
      });
    }
  }
  return [...expenses.values()];
}
