import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { UserRoundPlus, HeartPlus } from 'lucide-react-native';

import { DarkTheme } from '../DarkTheme';

export function HowPaid({
  value,
  onChange,
  labels = ['Eu', 'Ela'],
  disabled = false,
  title = 'Quem pagou:',
}: {
  value?: boolean;
  onChange?: (value: boolean) => void;
  labels?: readonly [string, string];
  disabled?: boolean;
  title?: string;
}) {
  const [localValue, setLocalValue] = useState(true);
  const userPaid = value ?? localValue;
  const select = onChange ?? setLocalValue;

  return (
    <View style={styles.userPaidContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.userPaidSelectContainer}>
        <Pressable
          style={userPaid ? styles.userPaidSelect : styles.userPaid}
          onPress={() => select(true)}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: userPaid, disabled }}
        >
          <UserRoundPlus color={DarkTheme.colors.text} size={30} />
          <Text style={styles.userPaidSelectText}>{labels[0]}</Text>
        </Pressable>

        <Pressable
          style={!userPaid ? styles.userPaidSelect : styles.userPaid}
          onPress={() => select(false)}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: !userPaid, disabled }}
        >
          <HeartPlus color={DarkTheme.colors.text} size={30} />
          <Text style={styles.userPaidSelectText}>{labels[1]}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userPaidContainer: {
    gap: 3,
    justifyContent: 'center',
  },

  title: {},

  titleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingBottom: 10,
  },

  userPaidSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userPaidSelect: {
    borderWidth: 2,
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.prymaryGreen,
    borderRadius: 25,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: 10,
  },

  userPaid: {
    borderWidth: 2,
    borderColor: DarkTheme.colors.primary,
    borderRadius: 25,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    padding: 10,
  },

  userPaidSelectText: {
    flexShrink: 1,
    textAlign: 'center',
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.large,
  },
});
