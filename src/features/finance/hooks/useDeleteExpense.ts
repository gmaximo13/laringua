import { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { deleteExpense } from '../repositories/expenseRepository';

export function useDeleteExpense() {
  const db = useSQLiteContext();
  const pending = useRef(false);
  const active = useRef(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  async function removeExpense(id: string): Promise<boolean> {
    if (pending.current) return false;
    pending.current = true;
    setDeleting(true);
    setError(null);
    try {
      await deleteExpense(db, id);
      return active.current;
    } catch (cause) {
      console.error('Expense deletion failed:', cause);
      pending.current = false;
      if (active.current) {
        setError('Não foi possível excluir a despesa. Tente novamente.');
        setDeleting(false);
      }
      return false;
    }
  }
  return { deleting, error, removeExpense };
}
