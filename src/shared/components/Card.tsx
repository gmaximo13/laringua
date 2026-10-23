import { AntDesign } from '@react-native-vector-icons/ant-design';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { DarkTheme } from '../DarkTheme';
import { useState } from 'react';

export type TCard = {
  titleCard: string;
  keyboardType: string;
  iconName: string;
};

export function Card({ titleCard, keyboardType, iconName }: TCard) {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.card}>
      <View style={styles.cardIcon}>
        <AntDesign name={iconName as 'form'} color={DarkTheme.colors.text} size={30} />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>{titleCard}</Text>
        <TextInput
          keyboardType={keyboardType as 'default'}
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 15,
    borderWidth: 0,
    borderColor: DarkTheme.colors.prymaryGreen,
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: DarkTheme.colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },

  cardIcon: {},

  cardTitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraSmall,
  },

  cardTitle: {
    paddingHorizontal: 16,
    width: '90%',
  },
});
