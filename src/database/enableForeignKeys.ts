import type { SQLiteDatabase } from 'expo-sqlite';

export async function enableForeignKeys(db: SQLiteDatabase): Promise<void> {
  // SQLite ignores changes to foreign_keys inside an active transaction.
  await db.execAsync('PRAGMA foreign_keys = ON;');
  const result = await db.getFirstAsync<{ foreign_keys: number }>('PRAGMA foreign_keys');
  if (result?.foreign_keys !== 1) {
    throw new Error('Não foi possível habilitar a integridade do banco.');
  }
}
