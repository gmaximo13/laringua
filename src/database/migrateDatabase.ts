import type { SQLiteDatabase } from 'expo-sqlite';
import { migrations } from './migrations';

export async function migrateDatabase(db: SQLiteDatabase): Promise<void> {
  // This runs before screens mount: no other queries may use this connection yet.
  // Keeping the same connection also preserves foreign_keys enforcement.
  await db.withTransactionAsync(async () => {
    const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    if (!result) {
      throw new Error('Não foi possível consultar a versão do banco.');
    }

    let currentVersion = result.user_version;
    const latestVersion = migrations[migrations.length - 1].version;
    if (currentVersion > latestVersion) {
      throw new Error('Este banco requer uma versão mais recente do aplicativo.');
    }

    for (const migration of migrations) {
      if (migration.version <= currentVersion) {
        continue;
      }
      if (migration.version !== currentVersion + 1) {
        throw new Error('A sequência de migrations está incompleta.');
      }

      await db.execAsync(migration.sql);
      // PRAGMA does not accept bound parameters. This version is a code-owned integer.
      await db.execAsync(`PRAGMA user_version = ${migration.version}`);
      currentVersion = migration.version;
    }
  });
}
