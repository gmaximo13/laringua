import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useExpense } from '@/features/finance/hooks/useExpense';
import { useDeleteExpense } from '@/features/finance/hooks/useDeleteExpense';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { FinanceStatus } from '@/features/finance/components/FinanceStatus';
import { ArrowBack } from '@/shared/components/ArrowBack';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { DarkTheme } from '@/shared/DarkTheme';
import { formatBRL } from '@/shared/utils/money';
import { formatDisplayDate } from '@/shared/utils/date';

export default function ExpenseDetailsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const { expense, loading, error, reload } = useExpense(id);
  const { deleting, error: deleteError, removeExpense } = useDeleteExpense();
  const { participants, persistenceAvailable } = useParticipants();

  function confirmDelete() {
    if (!expense || deleting) return;
    const target = expense;
    Alert.alert(
      'Excluir despesa?',
      `${target.description} — ${formatBRL(target.amountCents)}\n\nA exclusão é definitiva. O saldo será recalculado e os acertos já registrados serão mantidos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            void removeExpense(target.id).then((removed) => {
              if (removed) {
                if (router.canGoBack()) router.back();
                else router.replace('/expenses');
              }
            });
          },
        },
      ],
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + 12, paddingBottom: Math.max(insets.bottom, 12) },
      ]}
    >
      <ArrowBack titleName="Detalhes da despesa" />
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 16 }}>
        {loading || error || !expense ? (
          <FinanceStatus
            loading={loading}
            message={
              loading ? 'Carregando despesa...' : (error ?? 'Esta despesa não foi encontrada.')
            }
            onRetry={error && persistenceAvailable ? reload : undefined}
          />
        ) : (
          <View style={styles.details}>
            <Text style={styles.title}>{expense.description}</Text>
            <Text style={styles.title}>{formatBRL(expense.amountCents)}</Text>
            <Text style={styles.text}>Data: {formatDisplayDate(expense.date)}</Text>
            <Text style={styles.text}>
              Pago por: {participants.find((person) => person.id === expense.payerId)?.name}
            </Text>
            <Text style={styles.text}>
              Divisão:{' '}
              {{ equal: 'Igual', custom: 'Personalizada', single: 'Total' }[expense.splitType]}
            </Text>
            <Text style={styles.title}>Responsabilidades</Text>
            {expense.splits.map((split) => (
              <Text key={split.participantId} style={styles.text}>
                {participants.find((person) => person.id === split.participantId)?.name}:{' '}
                {formatBRL(split.amountCents)}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
      {expense && !loading && !error && (
        <View style={styles.footer}>
          {deleteError && (
            <Text style={styles.text} accessibilityRole="alert">
              {deleteError}
            </Text>
          )}
          <AddValueButton
            title="Editar"
            onPress={() =>
              router.push({ pathname: '/expenses/[id]/edit', params: { id: expense.id } })
            }
            disabled={deleting}
            style={{ marginBottom: 10 }}
          />
          <AddValueButton
            title="Excluir despesa"
            onPress={confirmDelete}
            loading={deleting}
            style={{ marginBottom: 0, backgroundColor: DarkTheme.colors.expense }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 24, backgroundColor: DarkTheme.colors.background },
  scroll: { flex: 1 },
  footer: { paddingTop: 12, gap: 6 },
  details: {
    marginTop: 20,
    gap: 14,
    padding: 16,
    backgroundColor: DarkTheme.colors.primary,
    borderRadius: 25,
  },
  title: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.large, fontWeight: 'bold' },
  text: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium },
});
