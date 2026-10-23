import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@react-native-vector-icons/ant-design';
import { useRouter } from 'expo-router';

import { DarkTheme } from '@/shared/DarkTheme';

export default function BalanceTab() {
  const router = useRouter();

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.header}>
          <View style={styles.clover}>
            <Text style={styles.cloverText}>☘</Text>
          </View>
          <View>
            <Text style={styles.titleText}>Laringua</Text>
            <Text style={styles.subtitleText}>Nosso Cantinho</Text>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceCardContainer}>
            <View style={styles.balanceCardTextContainer}>
              <Text style={styles.cardTitleText}>Saldo</Text>
              <Text style={styles.cardSubtitleText}>Você deve receber</Text>
              <Text style={styles.balanceCardText}>R$ 100,00</Text>
            </View>
            <View style={styles.cardClover}>
              <Text style={styles.cardCloverText}>☘</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.addPaymentButton} onPress={() => router.push('/payment')}>
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
              <Text style={styles.cardTitleText}>R$ 200,00</Text>
            </View>
            <View style={styles.resumeCard}>
              <View style={styles.resumeCardIcon}>
                <AntDesign name="heart" color={DarkTheme.colors.secondary} size={20} />
              </View>
              <Text style={styles.cardResumeTitleText}>Ela pagou</Text>
              <Text style={styles.cardTitleText}>R$ 100,00</Text>
            </View>
          </View>
        </View>

        <View style={styles.expensesList}>
          <View style={styles.expensesListHeader}>
            <Text style={styles.cardTitleText}>Ultimas despesas</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllExpenses}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.expensesListContainer}>
            <View style={styles.expenseItem}>
              <View style={styles.expenseItemDescription}>
                <AntDesign name="pinterest" color={DarkTheme.colors.prymaryGreen} size={15} />
                <View>
                  <Text style={styles.expenseItemText}>Despesa 1</Text>
                  <Text style={styles.expenseHowPayText}>Você pagou</Text>
                </View>
              </View>

              <View style={styles.expenseItemAmount}>
                <Text style={styles.expenseItemAmountText}>R$ 100,00</Text>
              </View>
            </View>

            <View style={styles.expenseItem}>
              <View style={styles.expenseItemDescription}>
                <AntDesign name="pinterest" color={DarkTheme.colors.prymaryGreen} size={15} />
                <View>
                  <Text style={styles.expenseItemText}>Despesa 2</Text>
                  <Text style={styles.expenseHowPayText}>Você pagou</Text>
                </View>
              </View>

              <View style={styles.expenseItemAmount}>
                <Text style={styles.expenseItemAmountText}>R$ 50,00</Text>
              </View>
            </View>

            <View style={styles.expenseItem}>
              <View style={styles.expenseItemDescription}>
                <AntDesign name="pinterest" color={DarkTheme.colors.expense} size={15} />
                <View>
                  <Text style={styles.expenseItemText}>Despesa 3</Text>
                  <Text style={styles.expenseHowPayText}>Ela pagou</Text>
                </View>
              </View>

              <View style={styles.expenseItemAmount}>
                <Text style={styles.expenseItemAmountText}>R$ 100,00</Text>
              </View>
            </View>

            <View style={styles.expenseItem}>
              <View style={styles.expenseItemDescription}>
                <AntDesign name="pinterest" color={DarkTheme.colors.prymaryGreen} size={15} />
                <View>
                  <Text style={styles.expenseItemText}>Despesa 1</Text>
                  <Text style={styles.expenseHowPayText}>Você pagou</Text>
                </View>
              </View>

              <View style={styles.expenseItemAmount}>
                <Text style={styles.expenseItemAmountText}>R$ 50,00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

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

  expenseItem: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 16,
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: DarkTheme.colors.border,
  },

  expenseItemText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },

  expenseItemDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  expenseItemAmount: {
    justifyContent: 'center',
  },

  expenseHowPayText: {
    fontSize: DarkTheme.fontSizes.extraSmall,
    color: DarkTheme.colors.secondaryText,
  },

  expenseItemAmountText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },

  addExpenseButtonText: {
    color: DarkTheme.colors.secondary,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
});
