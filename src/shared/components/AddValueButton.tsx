import { Text, StyleSheet, Pressable } from 'react-native';
import { DarkTheme } from '../DarkTheme';

export type TAddValueButton = {
  title: string;
};

export function AddValueButton({ title }: TAddValueButton) {
  return (
    <Pressable style={styles.addValueButton}>
      <Text style={styles.addValueButtonText}>{title}</Text>
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
