import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowBack } from '@/shared/components/ArrowBack';
import { DarkTheme } from '@/shared/DarkTheme';
import { ExpenseHistoryList } from '@/features/finance/components/ExpenseHistoryList';
import { PaymentHistoryList } from '@/features/finance/components/PaymentHistoryList';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const { tab } = useLocalSearchParams<{ tab?: string | string[] }>();
  const selected = tab === 'payments' ? 'payments' : 'expenses';

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom, 16) },
      ]}
    >
      <ArrowBack titleName="Histórico" />
      <View style={styles.tabs} accessibilityRole="tablist">
        {(
          [
            { key: 'expenses', label: 'Despesas' },
            { key: 'payments', label: 'Acertos' },
          ] as const
        ).map((item) => (
          <Pressable
            key={item.key}
            style={[styles.tab, selected === item.key && styles.selected]}
            accessibilityRole="tab"
            accessibilityState={{ selected: selected === item.key }}
            onPress={() => router.setParams({ tab: item.key })}
          >
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      {selected === 'expenses' ? <ExpenseHistoryList /> : <PaymentHistoryList />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 24, backgroundColor: DarkTheme.colors.background },
  tabs: { flexDirection: 'row', gap: 10, marginTop: 20 },
  tab: {
    flex: 1,
    minHeight: 44,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: DarkTheme.colors.primary,
    backgroundColor: DarkTheme.colors.primary,
  },
  selected: {
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.prymaryGreen,
  },
  label: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium, fontWeight: 'bold' },
});
