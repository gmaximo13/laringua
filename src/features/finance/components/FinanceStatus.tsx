import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { DarkTheme } from '@/shared/DarkTheme';

export function FinanceStatus({
  loading = false,
  message,
  onRetry,
}: {
  loading?: boolean;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={DarkTheme.colors.text} />}
      <Text style={styles.text} accessibilityRole={onRetry ? 'alert' : undefined}>
        {message}
      </Text>
      {onRetry && (
        <Pressable style={styles.retry} onPress={onRetry} accessibilityRole="button">
          <Text style={styles.text}>Tentar novamente</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', gap: 12 },
  text: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium, textAlign: 'center' },
  retry: { backgroundColor: DarkTheme.colors.prymaryGreen, padding: 12, borderRadius: 20 },
});
