import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useParticipants } from '../context/ParticipantsContext';
import { listPayments } from '../repositories/paymentRepository';
import { validatePayment } from '../services/paymentService';
import type { Payment } from '../types/finance';

export function usePayments() {
  const db = useSQLiteContext();
  const { participants } = useParticipants();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => setAttempt((value) => value + 1), []);
  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      setError(null);
      setPayments([]);
      async function load() {
        try {
          const rows = await listPayments(db);
          const ids = participants.map((person) => person.id);
          for (const payment of rows) validatePayment(payment, ids);
          if (active) setPayments(rows);
        } catch (cause) {
          console.error(`Payment history loading failed (attempt ${attempt + 1}):`, cause);
          if (active) setError('Não foi possível carregar os acertos.');
        } finally {
          if (active) setLoading(false);
        }
      }
      void load();
      return () => {
        active = false;
      };
    }, [db, participants, attempt]),
  );
  return { payments, loading, error, reload };
}
