import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@react-native-vector-icons/ant-design';

import { DarkTheme } from '../DarkTheme';

export type TExpenseListItem = {
  descreption: string;
  userPaid: string;
  isUserPaid: boolean;
  amountValue: string;
};

export function ExpenseListItem({
  descreption,
  userPaid,
  isUserPaid,
  amountValue,
}: TExpenseListItem) {
  return (
    <View style={styles.expenseItem}>
      <View style={styles.expenseItemDescription}>
        <AntDesign
          name="pinterest"
          color={isUserPaid ? DarkTheme.colors.prymaryGreen : DarkTheme.colors.expense}
          size={15}
        />
        <View>
          <Text style={styles.expenseItemText}>{descreption}</Text>
          <Text style={styles.expenseHowPayText}>{userPaid}</Text>
        </View>
      </View>

      <View style={styles.expenseItemAmount}>
        <Text style={styles.expenseItemAmountText}>{'R$ ' + amountValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
