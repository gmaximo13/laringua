import { AntDesign } from '@react-native-vector-icons/ant-design';
import { View, Text, StyleSheet, TextInput, type KeyboardTypeOptions } from 'react-native';
import { DarkTheme } from '../DarkTheme';
import { useState, type ComponentProps } from 'react';
import { MoneyInput } from './MoneyInput';
import { formCardStyles } from './formCardStyles';

export type TCard = {
  titleCard: string;
  keyboardType: KeyboardTypeOptions;
  iconName: ComponentProps<typeof AntDesign>['name'];
  value?: string;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  monetary?: boolean;
};

export function Card({
  titleCard,
  keyboardType,
  iconName,
  value,
  onChangeText,
  editable = true,
  monetary = false,
}: TCard) {
  const [text, onChangeTextInternal] = useState('');

  return (
    <View style={formCardStyles.card}>
      <View style={styles.cardIcon}>
        <AntDesign name={iconName} color={DarkTheme.colors.text} size={30} />
      </View>
      <View style={formCardStyles.content}>
        <Text style={styles.cardTitleText}>{titleCard}</Text>
        {monetary ? (
          <MoneyInput
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            accessibilityLabel={titleCard}
          />
        ) : (
          <TextInput
            keyboardType={keyboardType}
            editable={editable}
            accessibilityLabel={titleCard}
            style={styles.input}
            placeholderTextColor={DarkTheme.colors.text}
            onChangeText={onChangeText ?? onChangeTextInternal}
            value={value ?? text}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 36,
    borderRadius: 15,
    borderWidth: 0,
    borderColor: DarkTheme.colors.prymaryGreen,
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },

  cardIcon: {},

  cardTitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraSmall,
  },
});
