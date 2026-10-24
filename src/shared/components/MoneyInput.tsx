import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DarkTheme } from '../DarkTheme';
import { formatMoneyInput } from '../utils/money';

type Props = {
  value?: string;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  accessibilityLabel: string;
};

export function MoneyInput({ value, onChangeText, editable = true, accessibilityLabel }: Props) {
  const [localValue, setLocalValue] = useState('');
  const text = value ?? localValue;

  function change(input: string) {
    const formatted = formatMoneyInput(input);
    if (onChangeText) onChangeText(formatted);
    else setLocalValue(formatted);
  }

  return (
    <View style={styles.row}>
      <Text style={styles.prefix} accessible={false}>
        R$
      </Text>
      <TextInput
        style={styles.input}
        accessibilityLabel={`${accessibilityLabel}, em reais`}
        keyboardType="number-pad"
        value={text}
        onChangeText={change}
        editable={editable}
        placeholder="0,00"
        placeholderTextColor={DarkTheme.colors.text}
        selection={{ start: text.length, end: text.length }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  prefix: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 44,
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },
});
