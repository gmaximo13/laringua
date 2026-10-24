import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useParticipants } from '../context/ParticipantsContext';
import { readFinanceSnapshot } from '../repositories/financeRepository';
import { calculateFinanceOverview } from '../services/financeSummaryService';
import type { FinanceOverview } from '../types/finance';

export function useFinanceData() {
  const db = useSQLiteContext();
  const { participants } = useParticipants();
  const [data, setData] = useState<FinanceOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => setAttempt((value) => value + 1), []);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      setLoading(true);
      setError(null);
      setData(null);
      async function load() {
        try {
          const snapshot = await readFinanceSnapshot(db);
          const overview = calculateFinanceOverview(
            participants.map((person) => person.id),
            snapshot.expenses,
            snapshot.payments,
          );
          if (active) setData(overview);
        } catch (cause) {
          console.error(`Finance loading failed (attempt ${attempt + 1}):`, cause);
          if (active) setError('Não foi possível carregar os dados financeiros.');
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

  return { data, loading, error, reload };
}
