import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { generateRecordId } from '@/database/generateRecordId';
import { DarkTheme } from '@/shared/DarkTheme';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { ParticipantSetup } from '../components/ParticipantSetup';
import { createParticipantPair, listParticipants } from '../repositories/participantRepository';
import {
  getCurrentParticipantId,
  setCurrentParticipantId,
} from '../repositories/localProfileRepository';
import { assertParticipantPair } from '../services/participants';
import type { Participant } from '../types/finance';
import { ParticipantsContext } from './ParticipantsContext';

export function ParticipantsProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [participants, setParticipants] = useState<Participant[] | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const people = await listParticipants(db);
        if (people.length !== 0) assertParticipantPair(people.map((person) => person.id));
        const id = await getCurrentParticipantId(db);
        if (id && !people.some((person) => person.id === id))
          throw new Error('Perfil local inválido.');
        if (active) {
          setParticipants(people);
          setCurrentId(id);
        }
      } catch (error) {
        console.error('Participant loading failed:', error);
        if (active) setFailed(true);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [db, attempt]);

  const create = useCallback(
    async (selfName: string, partnerName: string) => {
      const selfId = await generateRecordId(db);
      const partnerId = await generateRecordId(db);
      const people = await createParticipantPair(
        db,
        [
          { id: selfId, name: selfName },
          { id: partnerId, name: partnerName },
        ],
        selfId,
      );
      setParticipants(people);
      setCurrentId(selfId);
    },
    [db],
  );

  const select = useCallback(
    async (id: string) => {
      await setCurrentParticipantId(db, id);
      setCurrentId(id);
    },
    [db],
  );

  if (failed || participants === null) {
    return (
      <View style={styles.status}>
        {failed ? (
          <>
            <Text style={styles.text}>Não foi possível carregar os participantes.</Text>
            <AddValueButton
              title="Tentar novamente"
              onPress={() => {
                setFailed(false);
                setAttempt((value) => value + 1);
              }}
            />
          </>
        ) : (
          <>
            <ActivityIndicator color={DarkTheme.colors.text} />
            <Text style={styles.text}>Carregando nosso cantinho...</Text>
          </>
        )}
      </View>
    );
  }

  if (participants.length === 0 || !currentId) {
    return <ParticipantSetup participants={participants} onCreate={create} onSelect={select} />;
  }

  return (
    <ParticipantsContext.Provider
      value={{ participants, currentParticipantId: currentId, persistenceAvailable: true }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
}

const styles = StyleSheet.create({
  status: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 16 },
  text: { color: DarkTheme.colors.text, textAlign: 'center' },
});
