import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DarkTheme } from '@/shared/DarkTheme';
import { Card } from '@/shared/components/Card';
import { AddValueButton } from '@/shared/components/AddValueButton';
import type { Participant } from '../types/finance';

type Props = {
  participants: readonly Participant[];
  onCreate: (selfName: string, partnerName: string) => Promise<void>;
  onSelect: (id: string) => Promise<void>;
};

export function ParticipantSetup({ participants, onCreate, onSelect }: Props) {
  const insets = useSafeAreaInsets();
  const [selfName, setSelfName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pending = useRef(false);

  async function submit(operation: () => Promise<void>) {
    if (pending.current) return;
    pending.current = true;
    setSaving(true);
    setError(null);
    try {
      await operation();
    } catch (cause) {
      console.error('Participant setup failed:', cause);
      setError('Não foi possível salvar a configuração. Confira os nomes e tente novamente.');
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
        ]}
      >
        <Text style={styles.title}>Nosso cantinho</Text>
        {participants.length === 0 ? (
          <>
            <Text style={styles.text}>
              Para começar, informe quem vai organizar a vida a dois com você.
            </Text>
            <Card
              titleCard="Seu nome"
              iconName="user"
              keyboardType="default"
              value={selfName}
              onChangeText={setSelfName}
              editable={!saving}
            />
            <Card
              titleCard="Nome da outra pessoa"
              iconName="heart"
              keyboardType="default"
              value={partnerName}
              onChangeText={setPartnerName}
              editable={!saving}
            />
            <View style={styles.button}>
              <AddValueButton
                title="Começar"
                loading={saving}
                disabled={!selfName.trim() || !partnerName.trim()}
                onPress={() => void submit(() => onCreate(selfName, partnerName))}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.text}>Quem é você? Essa escolha fica salva neste celular.</Text>
            {participants.map((participant) => (
              <AddValueButton
                key={participant.id}
                title={participant.name}
                loading={saving}
                onPress={() => void submit(() => onSelect(participant.id))}
              />
            ))}
          </>
        )}
        {error && (
          <Text style={styles.text} accessibilityRole="alert">
            {error}
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DarkTheme.colors.background },
  content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, gap: 12 },
  title: { color: DarkTheme.colors.text, fontFamily: DarkTheme.fonts.families.bold, fontSize: 24 },
  text: { color: DarkTheme.colors.text, fontSize: 16 },
  button: { marginTop: 16 },
});
