import type { ParticipantId } from '../types/finance';

export function assertParticipantPair(participantIds: readonly ParticipantId[]): void {
  if (
    participantIds.length !== 2 ||
    participantIds.some((id) => !id.trim()) ||
    new Set(participantIds).size !== 2
  ) {
    throw new Error('Informe dois participantes distintos.');
  }
}

export function assertParticipant(
  participantId: ParticipantId,
  participantIds: readonly ParticipantId[],
): void {
  if (!participantIds.includes(participantId)) {
    throw new Error('Participante não pertence a este casal.');
  }
}
