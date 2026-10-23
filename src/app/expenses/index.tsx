import { View, StyleSheet, ScrollView } from 'react-native';

import { ArrowBack } from '@/shared/components/ArrowBack';
import { DarkTheme } from '@/shared/DarkTheme';
import { ExpenseListItem } from '@/shared/components/ExpenseListItem';

export default function NewExpense() {
  return (
    <View style={styles.container}>
      <ArrowBack titleName="Despesas" />
      <ScrollView>
        <ExpenseListItem
          descreption="Despesa 1"
          userPaid="Eu"
          isUserPaid={true}
          amountValue="40,00"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: DarkTheme.colors.background,
  },
});
