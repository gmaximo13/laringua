import { Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { DarkTheme } from '../DarkTheme';

export type TAddValueButton = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function AddValueButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: TAddValueButton) {
  return (
    <Pressable
      style={[styles.addValueButton, (disabled || loading) && { opacity: 0.5 }]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={DarkTheme.colors.secondary} />
      ) : (
        <Text style={styles.addValueButtonText}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addValueButton: {
    backgroundColor: DarkTheme.colors.prymaryGreen,
    width: '100%',
    padding: 10,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addValueButtonText: {
    color: DarkTheme.colors.secondary,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },
});
