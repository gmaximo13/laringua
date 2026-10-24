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
  prefix: {
    height: 36,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
    fontFamily: DarkTheme.fonts.families.regular,
    lineHeight: 36,
    includeFontPadding: false,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 36,
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
    fontFamily: DarkTheme.fonts.families.regular,
    lineHeight: 22,
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },
});
