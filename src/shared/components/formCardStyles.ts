import { StyleSheet } from 'react-native';
import { DarkTheme } from '../DarkTheme';

export const formCardStyles = StyleSheet.create({
  card: {
    height: 72,
    flexShrink: 0,
    flexDirection: 'row',
    backgroundColor: DarkTheme.colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    padding: 8,
    marginTop: 8,
  },
  content: { flex: 1, minWidth: 0, paddingHorizontal: 16 },
  value: { height: 36, justifyContent: 'center' },
});
