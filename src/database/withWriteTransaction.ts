import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { enableForeignKeys } from './enableForeignKeys';

export async function withWriteTransaction<T>(
  db: SQLiteDatabase,
  operation: (transaction: SQLiteDatabase) => Promise<T>,
): Promise<T> {
  return withTransaction(db, operation, true);
}

export async function withReadTransaction<T>(
  db: SQLiteDatabase,
  operation: (transaction: SQLiteDatabase) => Promise<T>,
): Promise<T> {
  return withTransaction(db, operation, false);
}

async function withTransaction<T>(
  db: SQLiteDatabase,
  operation: (transaction: SQLiteDatabase) => Promise<T>,
  write: boolean,
): Promise<T> {
  // Open the same file with a separate connection, not the provider's cached connection.
  const separator = db.databasePath.lastIndexOf('/');
  if (separator < 0) {
    throw new Error('A operação exige um banco local em arquivo.');
  }
  const connection = await openDatabaseAsync(
    db.databasePath.slice(separator + 1),
    { ...db.options, useNewConnection: true },
    db.databasePath.slice(0, separator),
  );

  try {
    await enableForeignKeys(connection);
    await connection.execAsync('PRAGMA busy_timeout = 5000;');
    // Writes reserve the writer; reads keep a snapshot without reserving a writer.
    await connection.execAsync(write ? 'BEGIN IMMEDIATE;' : 'BEGIN;');
    try {
      const result = await operation(connection);
      await connection.execAsync('COMMIT;');
      return result;
    } catch (error) {
      try {
        await connection.execAsync('ROLLBACK;');
      } catch (rollbackError) {
        console.error('Laringua transaction rollback failed:', rollbackError);
      }
      throw error;
    }
  } finally {
    await connection.closeAsync();
  }
}
