import type { ReactNode } from 'react';
import { ParticipantsContext } from './ParticipantsContext';

export function ParticipantsProvider({ children }: { children: ReactNode }) {
  return (
    <ParticipantsContext.Provider
      value={{ participants: [], currentParticipantId: null, persistenceAvailable: false }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
}
