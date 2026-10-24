import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { DarkTheme } from '../DarkTheme';

export type TAddValueButton = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AddValueButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}: TAddValueButton) {
  return (
    <Pressable
      style={[styles.addValueButton, (disabled || loading) && { opacity: 0.5 }, style]}
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
