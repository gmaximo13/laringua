export const localProfileSql = `
  CREATE TABLE local_profile (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    participant_id TEXT NOT NULL REFERENCES participants(id) ON DELETE RESTRICT
  );
`;
