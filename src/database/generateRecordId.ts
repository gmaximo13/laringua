import type { SQLiteDatabase } from 'expo-sqlite';

export async function generateRecordId(db: SQLiteDatabase): Promise<string> {
  const result = await db.getFirstAsync<{ id: string }>('SELECT lower(hex(randomblob(16))) AS id');
  if (!result) {
    throw new Error('Não foi possível gerar o identificador do registro.');
  }
  return result.id;
}
