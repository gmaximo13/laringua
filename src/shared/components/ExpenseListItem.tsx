import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@react-native-vector-icons/ant-design';

import { DarkTheme } from '../DarkTheme';
import { formatBRL } from '../utils/money';
import { formatDisplayDate } from '../utils/date';

export type TExpenseListItem = {
  description: string;
  userPaid: string;
  isUserPaid: boolean;
  amountCents: number;
  date: string;
  onPress?: () => void;
};

export function ExpenseListItem({
  description,
  userPaid,
  isUserPaid,
  amountCents,
  date,
  onPress,
}: TExpenseListItem) {
  return (
    <Pressable
      style={styles.expenseItem}
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={styles.expenseItemDescription}>
        <AntDesign
          name="pinterest"
          color={isUserPaid ? DarkTheme.colors.prymaryGreen : DarkTheme.colors.expense}
          size={15}
        />
        <View style={styles.details}>
          <Text style={styles.expenseItemText} numberOfLines={2}>
            {description}
          </Text>
          <Text style={styles.expenseHowPayText}>
            {userPaid} · {formatDisplayDate(date)}
          </Text>
        </View>
      </View>

      <View style={styles.expenseItemAmount}>
        <Text style={styles.expenseItemAmountText}>{formatBRL(amountCents)}</Text>
      </View>
    </Pressable>
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
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  expenseItemAmount: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  details: { flex: 1, minWidth: 0 },

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
