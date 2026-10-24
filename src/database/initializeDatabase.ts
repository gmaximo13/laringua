import type { SQLiteDatabase } from 'expo-sqlite';
import { migrateDatabase } from './migrateDatabase';

export async function initializeDatabase(db: SQLiteDatabase): Promise<void> {
  // These settings must run outside a transaction, before any application query.
  await db.execAsync('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
  const foreignKeys = await db.getFirstAsync<{ foreign_keys: number }>('PRAGMA foreign_keys');
  if (foreignKeys?.foreign_keys !== 1) {
    throw new Error('Não foi possível habilitar a integridade do banco.');
  }
  await migrateDatabase(db);
}
