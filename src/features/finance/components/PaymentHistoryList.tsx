import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { DarkTheme } from '@/shared/DarkTheme';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { formatBRL } from '@/shared/utils/money';
import { formatDisplayDate } from '@/shared/utils/date';
import { usePayments } from '@/features/finance/hooks/usePayments';
import { useDeletePayment } from '@/features/finance/hooks/useDeletePayment';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { FinanceStatus } from '@/features/finance/components/FinanceStatus';
import type { Payment } from '@/features/finance/types/finance';

export function PaymentHistoryList() {
  const { payments, loading, error, reload } = usePayments();
  const { deletingId, error: deleteError, removePayment } = useDeletePayment();
  const { participants, persistenceAvailable } = useParticipants();
  const participantName = (id: string) =>
    participants.find((person) => person.id === id)?.name ?? 'Participante';

  function confirmDelete(payment: Payment) {
    if (deletingId) return;
    Alert.alert(
      'Excluir acerto?',
      `${participantName(payment.senderId)} → ${participantName(payment.recipientId)}\n${formatBRL(payment.amountCents)} em ${formatDisplayDate(payment.date)}\n\nA exclusão é definitiva e o saldo será recalculado. As despesas serão mantidas.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            void removePayment(payment.id).then((removed) => {
              if (removed) reload();
            });
          },
        },
      ],
    );
  }

  return (
    <View style={styles.screen}>
      {deleteError && (
        <Text style={styles.message} accessibilityRole="alert">
          {deleteError}
        </Text>
      )}
      {loading || error ? (
        <View style={styles.body}>
          <FinanceStatus
            loading={loading}
            message={
              loading ? 'Carregando acertos...' : (error ?? 'Não foi possível carregar os acertos.')
            }
            onRetry={!loading && persistenceAvailable ? reload : undefined}
          />
        </View>
      ) : (
        <FlatList
          style={styles.body}
          data={payments}
          keyExtractor={(payment) => payment.id}
          extraData={deletingId}
          ListEmptyComponent={<FinanceStatus message="Nenhum acerto registrado ainda." />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.amount}>{formatBRL(item.amountCents)}</Text>
              <Text style={styles.message}>De: {participantName(item.senderId)}</Text>
              <Text style={styles.message}>Para: {participantName(item.recipientId)}</Text>
              <View style={styles.row}>
                <Text style={styles.message}>{formatDisplayDate(item.date)}</Text>
                <Pressable
                  onPress={() => confirmDelete(item)}
                  disabled={deletingId !== null}
                  accessibilityRole="button"
                  accessibilityLabel={`Excluir acerto de ${formatBRL(item.amountCents)} de ${participantName(item.senderId)} para ${participantName(item.recipientId)}`}
                  style={styles.deleteButton}
                >
                  {deletingId === item.id ? (
                    <ActivityIndicator color={DarkTheme.colors.text} />
                  ) : (
                    <Text style={styles.message}>Excluir</Text>
                  )}
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
      {persistenceAvailable && (
        <AddValueButton
          title="Registrar Acerto"
          onPress={() => router.push('/payment')}
          disabled={deletingId !== null}
          style={{ marginBottom: 0 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: DarkTheme.colors.background },
  body: { flex: 1, marginVertical: 16 },
  card: {
    backgroundColor: DarkTheme.colors.primary,
    borderRadius: 25,
    padding: 16,
    marginBottom: 12,
    gap: 8,
  },
  amount: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.large, fontWeight: 'bold' },
  message: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  deleteButton: {
    minHeight: 44,
    minWidth: 80,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: DarkTheme.colors.expense,
  },
});
