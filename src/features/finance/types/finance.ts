export type ParticipantId = string;

export type Participant = {
  id: ParticipantId;
  name: string;
};

// Monetary values are always safe integer BRL cents, never decimal reais.
export type ExpenseSplit = {
  participantId: ParticipantId;
  amountCents: number;
};

export type SplitRule =
  | { type: 'equal'; remainderParticipantId: ParticipantId }
  | { type: 'custom'; splits: readonly ExpenseSplit[] }
  | { type: 'single'; responsibleParticipantId: ParticipantId };

export type ExpenseInput = {
  description: string;
  amountCents: number;
  payerId: ParticipantId;
  // Calendar date in YYYY-MM-DD internally; display and input use DD/MM/YYYY.
  date: string;
  split: SplitRule;
};

export type Expense = {
  id: string;
  description: string;
  amountCents: number;
  payerId: ParticipantId;
  date: string;
  splitType: SplitRule['type'];
  splits: readonly ExpenseSplit[];
};

export type PaymentInput = {
  senderId: ParticipantId;
  recipientId: ParticipantId;
  amountCents: number;
  date: string;
};

export type Payment = PaymentInput & { id: string };

export type ParticipantBalance = {
  participantId: ParticipantId;
  // Positive: receivable. Negative: payable.
  balanceCents: number;
};
