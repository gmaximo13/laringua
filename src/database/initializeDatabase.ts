import type { SQLiteDatabase } from 'expo-sqlite';
import { migrateDatabase } from './migrateDatabase';
import { enableForeignKeys } from './enableForeignKeys';

export async function initializeDatabase(db: SQLiteDatabase): Promise<void> {
  // These settings must run outside a transaction, before any application query.
  await enableForeignKeys(db);
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await migrateDatabase(db);
}
