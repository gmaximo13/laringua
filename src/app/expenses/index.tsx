import { View, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ArrowBack } from '@/shared/components/ArrowBack';
import { DarkTheme } from '@/shared/DarkTheme';
import { ExpenseListItem } from '@/shared/components/ExpenseListItem';
import { useFinanceData } from '@/features/finance/hooks/useFinanceData';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { FinanceStatus } from '@/features/finance/components/FinanceStatus';

export default function ExpensesScreen() {
  const insets = useSafeAreaInsets();
  const { data, loading, error, reload } = useFinanceData();
  const { participants, currentParticipantId, persistenceAvailable } = useParticipants();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <ArrowBack titleName="Despesas" />
      {loading || error || !data ? (
        <FinanceStatus
          loading={loading}
          message={
            loading ? 'Carregando despesas...' : (error ?? 'Não foi possível carregar as despesas.')
          }
          onRetry={!loading && persistenceAvailable ? reload : undefined}
        />
      ) : (
        <FlatList
          style={styles.list}
          data={data.expenses}
          keyExtractor={(expense) => expense.id}
          ListEmptyComponent={<FinanceStatus message="Nenhuma despesa registrada ainda." />}
          renderItem={({ item }) => (
            <ExpenseListItem
              description={item.description}
              userPaid={`Pago por ${participants.find((person) => person.id === item.payerId)?.name ?? 'Participante'}`}
              isUserPaid={item.payerId === currentParticipantId}
              amountCents={item.amountCents}
              date={item.date}
              onPress={() => router.push({ pathname: '/expenses/[id]', params: { id: item.id } })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, marginTop: 16 },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: DarkTheme.colors.background,
  },
});
