import { createContext, useContext } from 'react';
import type { Participant } from '../types/finance';

export type ParticipantsState = {
  participants: readonly Participant[];
  currentParticipantId: string | null;
  persistenceAvailable: boolean;
};

export const ParticipantsContext = createContext<ParticipantsState | null>(null);

export function useParticipants(): ParticipantsState {
  const context = useContext(ParticipantsContext);
  if (!context) throw new Error('Use useParticipants dentro de ParticipantsProvider.');
  return context;
}
