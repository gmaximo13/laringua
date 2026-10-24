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
): Promise<Participant[]> {
  const pair = participants.map((participant) => ({
    id: participant.id,
    name: participant.name.trim(),
  }));
  assertParticipantPair(pair.map((participant) => participant.id));
  if (pair.some((participant) => !participant.name)) {
    throw new Error('Informe o nome dos dois participantes.');
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
    return pair;
  });
}
