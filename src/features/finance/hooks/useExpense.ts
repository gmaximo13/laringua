import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { getExpenseById } from '../repositories/expenseRepository';
import { useParticipants } from '../context/ParticipantsContext';
import { validateExpense } from '../services/expenseService';
import type { Expense } from '../types/finance';

export function useExpense(id?: string) {
  const db = useSQLiteContext();
  const { participants } = useParticipants();
  const [expense, setExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => setAttempt((value) => value + 1), []);
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      setError(null);
      setExpense(null);
      async function load() {
        try {
          if (!id?.trim()) throw new Error('Identificador de despesa inválido.');
          const result = await getExpenseById(db, id);
          if (result)
            validateExpense(
              { ...result, split: { type: 'custom', splits: result.splits } },
              participants.map((person) => person.id),
            );
          if (active) setExpense(result);
        } catch (cause) {
          console.error(`Expense loading failed (attempt ${attempt + 1}):`, cause);
          if (active) setError('Não foi possível carregar a despesa.');
        } finally {
          if (active) setLoading(false);
        }
      }
      void load();
      return () => {
        active = false;
      };
    }, [db, id, participants, attempt]),
  );
  return { expense, loading, error, reload };
}
