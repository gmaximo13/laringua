import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Keyboard,
  Platform,
  ToastAndroid,
} from 'react-native';
import { Users, User, PencilLine } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

import { DarkTheme } from '@/shared/DarkTheme';
import { ArrowBack } from '@/shared/components/ArrowBack';
import { Card } from '@/shared/components/Card';
import { HowPaid } from '@/shared/components/HowPaid';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { DatePickerCard } from '@/shared/components/DatePickerCard';
import { MoneyInput } from '@/shared/components/MoneyInput';
import { FixedFormLayout } from '@/shared/components/FixedFormLayout';
import { parseBRLToCents, formatMoneyInput } from '@/shared/utils/money';
import { toCalendarDate, fromCalendarDate } from '@/shared/utils/date';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { useSaveExpense } from '@/features/finance/hooks/useSaveExpense';
import type { Expense, SplitRule } from '@/features/finance/types/finance';

export function ExpenseForm({ initialExpense }: { initialExpense?: Expense }) {
  const { participants, currentParticipantId, persistenceAvailable } = useParticipants();
  const { saving, error, saveExpense } = useSaveExpense(initialExpense?.id);
  const title = initialExpense ? 'Editar Despesa' : 'Adicionar Despesa';
  const ownSplit = initialExpense?.splits.find(
    (split) => split.participantId === currentParticipantId,
  );
  const otherSplit = initialExpense?.splits.find(
    (split) => split.participantId !== currentParticipantId,
  );
  const [description, setDescription] = useState(initialExpense?.description ?? '');
  const [amount, setAmount] = useState(
    initialExpense ? formatMoneyInput(String(initialExpense.amountCents)) : '',
  );
  const [date, setDate] = useState(() =>
    initialExpense ? fromCalendarDate(initialExpense.date) : new Date(),
  );
  const [selfPaid, setSelfPaid] = useState(
    initialExpense ? initialExpense.payerId === currentParticipantId : true,
  );
  const [splitType, setSplitType] = useState<SplitRule['type']>(
    initialExpense?.splitType ?? 'equal',
  );
  const [selfAmount, setSelfAmount] = useState(
    ownSplit ? formatMoneyInput(String(ownSplit.amountCents)) : '',
  );
  const [partnerAmount, setPartnerAmount] = useState(
    otherSplit ? formatMoneyInput(String(otherSplit.amountCents)) : '',
  );
  const [selfRemainder, setSelfRemainder] = useState(
    initialExpense && initialExpense.amountCents % 2 === 1
      ? (ownSplit?.amountCents ?? 0) > Math.floor(initialExpense.amountCents / 2)
      : true,
  );
  const [inputError, setInputError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!successMessage) return;
    const timeout = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timeout);
  }, [successMessage]);

  const self = participants.find((person) => person.id === currentParticipantId);
  const partner = participants.find((person) => person.id !== currentParticipantId);

  if (!persistenceAvailable || !self || !partner) {
    return (
      <View style={styles.container}>
        <ArrowBack titleName={title} />
        <Text style={styles.text}>
          O cadastro de despesas está disponível no aplicativo Android.
        </Text>
      </View>
    );
  }

  const labels: [string, string] = [`${self.name}`, partner.name];
  let oddAmount = false;
  try {
    oddAmount = parseBRLToCents(amount) % 2 !== 0;
  } catch {
    /* Incomplete text is allowed while typing. */
  }

  async function submit() {
    if (saving || !self || !partner) return;
    setInputError(null);
    setSuccessMessage(null);
    try {
      const payerId = selfPaid ? self.id : partner.id;
      let split: SplitRule;
      if (splitType === 'equal') {
        split = { type: 'equal', remainderParticipantId: selfRemainder ? self.id : partner.id };
      } else if (splitType === 'single') {
        split = { type: 'single', responsibleParticipantId: selfPaid ? partner.id : self.id };
      } else {
        split = {
          type: 'custom',
          splits: [
            { participantId: self.id, amountCents: parseBRLToCents(selfAmount) },
            { participantId: partner.id, amountCents: parseBRLToCents(partnerAmount) },
          ],
        };
      }
      const saved = await saveExpense({
        description,
        amountCents: parseBRLToCents(amount),
        payerId,
        date: toCalendarDate(date),
        split,
      });
      if (saved) {
        if (!initialExpense) {
          setDescription('');
          setAmount('');
          setDate(new Date());
          setSelfPaid(true);
          setSplitType('equal');
          setSelfAmount('');
          setPartnerAmount('');
          setSelfRemainder(true);
          Keyboard.dismiss();
          if (Platform.OS === 'android') ToastAndroid.show('Despesa salva', ToastAndroid.SHORT);
          else setSuccessMessage('Despesa salva');
          return;
        }
        Alert.alert(
          'Despesa salva',
          initialExpense
            ? 'As alterações foram salvas neste celular.'
            : 'A despesa foi registrada neste celular.',
        );
        if (router.canGoBack()) router.back();
        else router.replace('/balance');
      }
    } catch (cause) {
      setInputError(cause instanceof Error ? cause.message : 'Confira os valores informados.');
    }
  }

  return (
    <FixedFormLayout
      footer={
        <>
          {successMessage && (
            <Text style={styles.success} accessibilityLiveRegion="polite">
              {successMessage}
            </Text>
          )}
          {(inputError || error) && (
            <Text style={styles.text} accessibilityRole="alert">
              {inputError || error}
            </Text>
          )}
          <AddValueButton
            title={initialExpense ? 'Salvar alterações' : title}
            onPress={() => void submit()}
            loading={saving}
            style={{ marginBottom: 0 }}
          />
        </>
      }
    >
      <ArrowBack titleName={title} />
      <Card
        titleCard="Descrição"
        keyboardType="default"
        iconName="form"
        value={description}
        onChangeText={setDescription}
        editable={!saving}
      />
      <DatePickerCard value={date} onChange={setDate} disabled={saving} />
      <Card
        titleCard="Valor"
        keyboardType="number-pad"
        monetary
        iconName="dollar"
        value={amount}
        onChangeText={setAmount}
        editable={!saving}
      />
      <HowPaid value={selfPaid} onChange={setSelfPaid} labels={labels} disabled={saving} />
      <Text style={styles.titleText}>Dividir responsabilidade</Text>
      <View style={styles.options}>
        {(
          [
            { type: 'equal', label: 'Igual', Icon: Users },
            { type: 'custom', label: 'Personalizado', Icon: PencilLine },
            { type: 'single', label: 'Total', Icon: User },
          ] as const
        ).map(({ type, label, Icon }) => (
          <Pressable
            key={type}
            onPress={() => setSplitType(type)}
            disabled={saving}
            accessibilityRole="radio"
            accessibilityState={{ selected: splitType === type, disabled: saving }}
            style={[styles.option, splitType === type && styles.selected]}
          >
            <Icon color={DarkTheme.colors.text} size={24} />
            <Text style={styles.optionText}>{label}</Text>
          </Pressable>
        ))}
      </View>
      {splitType === 'equal' && oddAmount && (
        <HowPaid
          title="Quem assume o centavo restante?"
          value={selfRemainder}
          onChange={setSelfRemainder}
          labels={labels}
          disabled={saving}
        />
      )}
      {splitType === 'single' && (
        <Text style={styles.hint}>
          {selfPaid ? partner.name : self.name} fica responsável por 100% desta despesa
        </Text>
      )}
      {splitType === 'custom' && (
        <View style={styles.custom}>
          {[
            { id: self.id, label: labels[0], value: selfAmount, change: setSelfAmount },
            { id: partner.id, label: labels[1], value: partnerAmount, change: setPartnerAmount },
          ].map((field) => (
            <View key={field.id} style={styles.customField}>
              <Text style={styles.customLabel} numberOfLines={1}>
                {field.label}
              </Text>
              <MoneyInput
                accessibilityLabel={`Responsabilidade de ${field.label}`}
                value={field.value}
                onChangeText={field.change}
                editable={!saving}
              />
            </View>
          ))}
        </View>
      )}
    </FixedFormLayout>
  );
}

const styles = StyleSheet.create({
  success: {
    color: DarkTheme.colors.text,
    backgroundColor: DarkTheme.colors.prymaryGreen,
    padding: 10,
    borderRadius: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  container: { flex: 1, backgroundColor: DarkTheme.colors.background },
  text: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium },
  titleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
    paddingTop: 8,
    paddingBottom: 6,
  },
  hint: { color: DarkTheme.colors.secondaryText, marginTop: 10, fontSize: 14 },
  options: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  option: {
    flex: 1,
    borderColor: DarkTheme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  selected: {
    backgroundColor: DarkTheme.colors.prymaryGreen,
    borderColor: DarkTheme.colors.border,
  },
  optionText: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.small },
  custom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 16,
  },
  customField: {
    flex: 1,
    minWidth: 0,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.prymaryGreen,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  customLabel: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.small,
  },
});
