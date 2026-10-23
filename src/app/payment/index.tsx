import { View, StyleSheet } from 'react-native';

import { DarkTheme } from '@/shared/DarkTheme';
import { ArrowBack } from '@/shared/components/ArrowBack';
import { Card } from '@/shared/components/Card';
import { HowPaid } from '@/shared/components/HowPaid';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { DatePickerCard } from '@/shared/components/DatePickerCard';

export default function Index() {
  return (
    <View style={styles.container}>
      <View>
        <ArrowBack titleName="Adicionar Pagamento" />
        <HowPaid />
        <DatePickerCard />
        <Card titleCard="Valor" keyboardType="numeric" iconName="dollar" />
      </View>

      <View>
        <AddValueButton title="Adicionar Pagamento" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: DarkTheme.colors.background,
  },
});
