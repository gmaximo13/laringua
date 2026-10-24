import { initialFinanceSql } from './001_initialFinance';

// Append new migrations. Never edit a migration already applied to user databases.
export const migrations = [{ version: 1, sql: initialFinanceSql }] as const;
