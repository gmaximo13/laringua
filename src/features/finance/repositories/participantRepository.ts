import type { SQLiteDatabase } from 'expo-sqlite';
import { withWriteTransaction } from '@/database/withWriteTransaction';
import { assertParticipantPair } from '../services/participants';
import type { Participant } from '../types/finance';

export async function listParticipants(db: SQLiteDatabase): Promise<Participant[]> {
  return db.getAllAsync<Participant>('SELECT id, name FROM participants ORDER BY id ASC');
}

export async function createParticipantPair(
  db: SQLiteDatabase,
  participants: readonly Participant[],
  currentParticipantId?: string,
): Promise<Participant[]> {
  const pair = participants.map((participant) => ({
    id: participant.id,
    name: participant.name.trim(),
  }));
  assertParticipantPair(pair.map((participant) => participant.id));
  if (pair.some((participant) => !participant.name)) {
    throw new Error('Informe o nome dos dois participantes.');
  }
  if (
    currentParticipantId &&
    !pair.some((participant) => participant.id === currentParticipantId)
  ) {
    throw new Error('Escolha um dos participantes cadastrados.');
  }

  return withWriteTransaction(db, async (transaction) => {
    const existing = await listParticipants(transaction);
    if (existing.length !== 0) {
      throw new Error('Os participantes já estão configurados neste banco.');
    }
    for (const participant of pair) {
      await transaction.runAsync(
        'INSERT INTO participants (id, name) VALUES (?, ?)',
        participant.id,
        participant.name,
      );
    }
    if (currentParticipantId) {
      await transaction.runAsync(
        'INSERT INTO local_profile (id, participant_id) VALUES (1, ?)',
        currentParticipantId,
      );
    }
    return pair;
  });
}
