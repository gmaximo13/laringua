import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@react-native-vector-icons/ant-design';
import { useRouter } from 'expo-router';

import { DarkTheme } from '@/shared/DarkTheme';
import { ExpenseListItem } from '@/shared/components/ExpenseListItem';
import { useFinanceData } from '@/features/finance/hooks/useFinanceData';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { FinanceStatus } from '@/features/finance/components/FinanceStatus';
import { formatBRL } from '@/shared/utils/money';

export default function BalanceTab() {
  const router = useRouter();
  const { data, loading, error, reload } = useFinanceData();
  const { participants, currentParticipantId, persistenceAvailable } = useParticipants();
  const partner = participants.find((person) => person.id !== currentParticipantId);
  const balance =
    data?.balances.find((item) => item.participantId === currentParticipantId)?.balanceCents ?? 0;
  const selfPaid =
    data?.paidTotals.find((item) => item.participantId === currentParticipantId)?.amountCents ?? 0;
  const partnerPaid =
    data?.paidTotals.find((item) => item.participantId === partner?.id)?.amountCents ?? 0;

  return (
    <View style={styles.content}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={styles.header}>
          <View style={styles.clover}>
            <Text style={styles.cloverText}>☘</Text>
          </View>
          <View>
            <Text style={styles.titleText}>Laringua</Text>
            <Text style={styles.subtitleText}>Nosso Cantinho</Text>
          </View>
        </View>

        {loading || error || !data ? (
          <FinanceStatus
            loading={loading}
            message={
              loading
                ? 'Carregando finanças...'
                : (error ?? 'Não foi possível carregar as finanças.')
            }
            onRetry={!loading && persistenceAvailable ? reload : undefined}
          />
        ) : (
          <>
            <View style={styles.balanceCard}>
              <View style={styles.balanceCardContainer}>
                <View style={styles.balanceCardTextContainer}>
                  <Text style={styles.cardTitleText}>Saldo</Text>
                  <Text style={styles.cardSubtitleText}>
                    {balance > 0
                      ? 'Você deve receber'
                      : balance < 0
                        ? 'Você deve pagar'
                        : 'Tudo certo entre vocês'}
                  </Text>
                  <Text style={styles.balanceCardText}>{formatBRL(Math.abs(balance))}</Text>
                </View>
                <View style={styles.cardClover}>
                  <Text style={styles.cardCloverText}>☘</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addPaymentButton}
                onPress={() => router.push('/payment')}
              >
                <Text style={styles.addPaymentButtonText}>Registrar Acerto</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.resume}>
              <Text style={styles.cardTitleText}>Resumo do casal</Text>
              <View style={styles.resumeCardContainer}>
                <View style={styles.resumeCard}>
                  <View style={styles.resumeCardIcon}>
                    <AntDesign name="user" color={DarkTheme.colors.secondary} size={20} />
                  </View>
                  <Text style={styles.cardResumeTitleText}>Você pagou</Text>
                  <Text style={styles.cardTitleText}>{formatBRL(selfPaid)}</Text>
                </View>
                <View style={styles.resumeCard}>
                  <View style={styles.resumeCardIcon}>
                    <AntDesign name="heart" color={DarkTheme.colors.secondary} size={20} />
                  </View>
                  <Text style={styles.cardResumeTitleText} numberOfLines={1}>
                    {partner?.name ?? 'Outra pessoa'} pagou
                  </Text>
                  <Text style={styles.cardTitleText}>{formatBRL(partnerPaid)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.expensesList}>
              <View style={styles.expensesListHeader}>
                <Text style={styles.cardTitleText}>Últimas despesas</Text>
                <TouchableOpacity onPress={() => router.push('/expenses')}>
                  <Text style={styles.seeAllExpenses}>Ver todas</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.expensesListContainer}>
                {data.expenses.length === 0 ? (
                  <FinanceStatus message="Nenhuma despesa registrada ainda." />
                ) : (
                  data.expenses
                    .slice(0, 4)
                    .map((expense) => (
                      <ExpenseListItem
                        key={expense.id}
                        description={expense.description}
                        userPaid={`Pago por ${participants.find((person) => person.id === expense.payerId)?.name ?? 'Participante'}`}
                        isUserPaid={expense.payerId === currentParticipantId}
                        amountCents={expense.amountCents}
                        date={expense.date}
                      />
                    ))
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addExpenseButton}
        onPress={() => router.push('/expenses/newExpense')}
      >
        <Text style={styles.addExpenseButtonText}>Adicionar Despesa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: DarkTheme.colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 10,
  },

  clover: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: DarkTheme.colors.prymaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cloverText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraLarge,
  },

  titleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.large,
    fontWeight: 'bold',
  },

  subtitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },

  cardTitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },

  cardSubtitleText: {
    color: DarkTheme.colors.secondaryText,
    fontSize: DarkTheme.fontSizes.small,
  },

  balanceCardText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraLarge,
    fontWeight: 'bold',
  },

  balanceCard: {
    backgroundColor: DarkTheme.colors.prymaryGreen,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 25,
    padding: 16,
  },

  balanceCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },

  balanceCardTextContainer: {
    gap: 3,
  },

  addPaymentButton: {
    backgroundColor: DarkTheme.colors.secondary,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginHorizontal: 16,
  },

  addPaymentButtonText: {
    color: DarkTheme.colors.primary,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },

  cardClover: {
    position: 'absolute',
    right: -10,
    bottom: -100,
    opacity: 0.09,
    transform: [{ rotate: '-20deg' }],
  },

  cardCloverText: {
    color: DarkTheme.colors.border,
    fontSize: 200,
  },

  resume: {
    padding: 16,
  },

  resumeCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  resumeCard: {
    backgroundColor: DarkTheme.colors.primary,
    width: '48%',
    height: 100,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
    padding: 16,
    gap: 5,
  },

  cardResumeTitleText: {
    color: DarkTheme.colors.secondary,
    fontSize: DarkTheme.fontSizes.small,
  },

  resumeCardIcon: {
    width: 30,
    height: 30,
    backgroundColor: DarkTheme.colors.border,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addExpenseButton: {
    backgroundColor: DarkTheme.colors.primary,
    width: '90%',
    padding: 10,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  expensesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },

  expensesListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },

  seeAllExpenses: {
    color: DarkTheme.colors.text,
  },

  expensesListContainer: {
    backgroundColor: DarkTheme.colors.primary,
    borderWidth: 3,
    borderColor: DarkTheme.colors.border,
    borderRadius: 25,
  },

  addExpenseButtonText: {
    color: DarkTheme.colors.secondary,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
});
