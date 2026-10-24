import type { SQLiteDatabase } from 'expo-sqlite';
import { withWriteTransaction } from '@/database/withWriteTransaction';
import { assertParticipant, assertParticipantPair } from '../services/participants';
import { listParticipants } from './participantRepository';

export async function getCurrentParticipantId(db: SQLiteDatabase): Promise<string | null> {
  const row = await db.getFirstAsync<{ participantId: string }>(
    'SELECT participant_id AS participantId FROM local_profile WHERE id = 1',
  );
  return row?.participantId ?? null;
}

export async function setCurrentParticipantId(db: SQLiteDatabase, id: string): Promise<void> {
  await withWriteTransaction(db, async (transaction) => {
    const participants = await listParticipants(transaction);
    const ids = participants.map((participant) => participant.id);
    assertParticipantPair(ids);
    assertParticipant(id, ids);
    await transaction.runAsync(
      `INSERT INTO local_profile (id, participant_id) VALUES (1, ?)
       ON CONFLICT(id) DO UPDATE SET participant_id = excluded.participant_id`,
      id,
    );
  });
}
