export const initialFinanceSql = `
  CREATE TABLE participants (
    id TEXT PRIMARY KEY NOT NULL CHECK (length(trim(id)) > 0),
    name TEXT NOT NULL CHECK (length(trim(name)) > 0)
  );

  CREATE TABLE expenses (
    id TEXT PRIMARY KEY NOT NULL CHECK (length(trim(id)) > 0),
    description TEXT NOT NULL CHECK (length(trim(description)) > 0),
    amount_cents INTEGER NOT NULL
      CHECK (typeof(amount_cents) = 'integer' AND amount_cents BETWEEN 1 AND 9007199254740991),
    payer_id TEXT NOT NULL REFERENCES participants(id) ON DELETE RESTRICT,
    date TEXT NOT NULL CHECK (date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    split_type TEXT NOT NULL CHECK (split_type IN ('equal', 'custom', 'single'))
  );

  CREATE TABLE expense_splits (
    expense_id TEXT NOT NULL REFERENCES expenses(id) ON DELETE RESTRICT,
    participant_id TEXT NOT NULL REFERENCES participants(id) ON DELETE RESTRICT,
    amount_cents INTEGER NOT NULL
      CHECK (typeof(amount_cents) = 'integer' AND amount_cents BETWEEN 0 AND 9007199254740991),
    PRIMARY KEY (expense_id, participant_id)
  );

  CREATE TABLE payments (
    id TEXT PRIMARY KEY NOT NULL CHECK (length(trim(id)) > 0),
    sender_id TEXT NOT NULL REFERENCES participants(id) ON DELETE RESTRICT,
    recipient_id TEXT NOT NULL REFERENCES participants(id) ON DELETE RESTRICT,
    amount_cents INTEGER NOT NULL
      CHECK (typeof(amount_cents) = 'integer' AND amount_cents BETWEEN 1 AND 9007199254740991),
    date TEXT NOT NULL CHECK (date GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'),
    CHECK (sender_id <> recipient_id)
  );

  CREATE INDEX expenses_date_idx ON expenses(date DESC, id DESC);
  CREATE INDEX expenses_payer_idx ON expenses(payer_id);
  CREATE INDEX expense_splits_participant_idx ON expense_splits(participant_id);
  CREATE INDEX payments_date_idx ON payments(date DESC, id DESC);
  CREATE INDEX payments_sender_idx ON payments(sender_id);
  CREATE INDEX payments_recipient_idx ON payments(recipient_id);
`;
