import { useEffect, useRef, useState } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import { generateRecordId } from '@/database/generateRecordId';
import { useParticipants } from '../context/ParticipantsContext';
import { createPayment } from '../repositories/paymentRepository';
import { validatePayment } from '../services/paymentService';
import type { PaymentInput } from '../types/finance';

export function useCreatePayment() {
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

  async function savePayment(input: PaymentInput): Promise<boolean> {
    if (pending.current) return false;
    pending.current = true;
    setError(null);
    try {
      validatePayment(
        input,
        participants.map((person) => person.id),
      );
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Confira os dados do acerto.');
      pending.current = false;
      return false;
    }

    setSaving(true);
    try {
      const id = await generateRecordId(db);
      await createPayment(db, id, input);
      // Stay locked after success until navigation unmounts this form.
      return active.current;
    } catch (cause) {
      console.error('Payment creation failed:', cause);
      if (active.current) {
        setError('Não foi possível salvar o acerto. Seus campos foram mantidos; tente novamente.');
        setSaving(false);
      }
      pending.current = false;
      return false;
    }
  }

  return { saving, error, savePayment };
}
