import { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { generateRecordId } from '@/database/generateRecordId';
import { useParticipants } from '../context/ParticipantsContext';
import { createExpense, updateExpense } from '../repositories/expenseRepository';
import { validateExpense } from '../services/expenseService';
import type { ExpenseInput } from '../types/finance';

export function useSaveExpense(expenseId?: string) {
  const db = useSQLiteContext();
  const { participants } = useParticipants();
  const pending = useRef(false);
  const active = useRef(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  async function saveExpense(input: ExpenseInput): Promise<boolean> {
    if (pending.current) return false;
    pending.current = true;
    setError(null);
    try {
      validateExpense(
        input,
        participants.map((person) => person.id),
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Confira os dados da despesa.');
      pending.current = false;
      return false;
    }
    setSaving(true);
    try {
      if (expenseId) {
        await updateExpense(db, expenseId, input);
      } else {
        const id = await generateRecordId(db);
        await createExpense(db, id, input);
      }
      // Keep the form locked after success until navigation unmounts it.
      return active.current;
    } catch (cause) {
      console.error('Expense saving failed:', cause);
      if (active.current) {
        setError('Não foi possível salvar a despesa. Seus campos foram mantidos; tente novamente.');
        setSaving(false);
      }
      pending.current = false;
      return false;
    }
  }

  return { saving, error, saveExpense };
}
