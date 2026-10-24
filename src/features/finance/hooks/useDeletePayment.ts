import { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { deletePayment } from '../repositories/paymentRepository';

export function useDeletePayment() {
  const db = useSQLiteContext();
  const pending = useRef(false);
  const active = useRef(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);

  async function removePayment(id: string): Promise<boolean> {
    if (pending.current) return false;
    pending.current = true;
    setDeletingId(id);
    setError(null);
    try {
      await deletePayment(db, id);
      return active.current;
    } catch (cause) {
      console.error('Payment deletion failed:', cause);
      if (active.current) setError('Não foi possível excluir o acerto. Tente novamente.');
      return false;
    } finally {
      pending.current = false;
      if (active.current) setDeletingId(null);
    }
  }
  return { deletingId, error, removePayment };
}
