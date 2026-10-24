import { useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

import { ArrowBack } from '@/shared/components/ArrowBack';
import { Card } from '@/shared/components/Card';
import { HowPaid } from '@/shared/components/HowPaid';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { DatePickerCard } from '@/shared/components/DatePickerCard';
import { FixedFormLayout } from '@/shared/components/FixedFormLayout';
import { DarkTheme } from '@/shared/DarkTheme';
import { parseBRLToCents } from '@/shared/utils/money';
import { toCalendarDate } from '@/shared/utils/date';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { useCreatePayment } from '@/features/finance/hooks/useCreatePayment';

export default function PaymentScreen() {
  const { participants, currentParticipantId, persistenceAvailable } = useParticipants();
  const { saving, error, savePayment } = useCreatePayment();
  const [selfSent, setSelfSent] = useState(true);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);
  const self = participants.find((person) => person.id === currentParticipantId);
  const partner = participants.find((person) => person.id !== currentParticipantId);

  async function submit() {
    if (saving || !self || !partner || !persistenceAvailable) return;
    setInputError(null);
    try {
      const saved = await savePayment({
        senderId: selfSent ? self.id : partner.id,
        recipientId: selfSent ? partner.id : self.id,
        amountCents: parseBRLToCents(amount),
        date: toCalendarDate(date),
      });
      if (saved) {
        Alert.alert('Acerto salvo', 'O pagamento foi registrado neste celular.');
        if (router.canGoBack()) router.back();
        else router.replace('/balance');
      }
    } catch (cause) {
      setInputError(cause instanceof Error ? cause.message : 'Confira o valor informado.');
    }
  }

  if (!persistenceAvailable || !self || !partner) {
    return (
      <FixedFormLayout footer={null}>
        <ArrowBack titleName="Adicionar Pagamento" />
      </FixedFormLayout>
    );
  }

  return (
    <FixedFormLayout
      footer={
        <>
          {(inputError || error) && (
            <Text style={styles.error} accessibilityRole="alert">
              {inputError || error}
            </Text>
          )}
          <AddValueButton
            title="Adicionar Pagamento"
            onPress={() => void submit()}
            loading={saving}
            style={{ marginBottom: 0 }}
          />
        </>
      }
    >
      <ArrowBack titleName="Adicionar Pagamento" />
      <HowPaid
        title="Quem pagou:"
        value={selfSent}
        onChange={setSelfSent}
        labels={[self.name, partner.name]}
        disabled={saving}
      />
      <DatePickerCard value={date} onChange={setDate} disabled={saving} />
      <Card
        titleCard="Valor"
        keyboardType="number-pad"
        iconName="dollar"
        monetary
        value={amount}
        onChangeText={setAmount}
        editable={!saving}
      />
    </FixedFormLayout>
  );
}

const styles = StyleSheet.create({
  error: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.small, marginBottom: 8 },
});
