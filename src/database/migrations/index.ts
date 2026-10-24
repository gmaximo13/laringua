import { initialFinanceSql } from './001_initialFinance';
import { localProfileSql } from './002_localProfile';

// Append new migrations. Never edit a migration already applied to user databases.
export const migrations = [
  { version: 1, sql: initialFinanceSql },
  { version: 2, sql: localProfileSql },
] as const;
