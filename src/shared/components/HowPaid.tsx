import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { UserRoundPlus, HeartPlus } from 'lucide-react-native';

import { DarkTheme } from '../DarkTheme';

export function HowPaid() {
  const [userPaid, setUserPaid] = useState<boolean>(true);

  return (
    <View style={styles.userPaidContainer}>
      <Text style={styles.titleText}>Quem pagou:</Text>
      <View style={styles.userPaidSelectContainer}>
        <Pressable
          style={userPaid ? styles.userPaidSelect : styles.userPaid}
          onPress={() => setUserPaid(true)}
        >
          <UserRoundPlus color={DarkTheme.colors.text} size={30} />
          <Text style={styles.userPaidSelectText}>Eu</Text>
        </Pressable>

        <Pressable
          style={!userPaid ? styles.userPaidSelect : styles.userPaid}
          onPress={() => setUserPaid(false)}
        >
          <HeartPlus color={DarkTheme.colors.text} size={30} />
          <Text style={styles.userPaidSelectText}>Ela</Text>
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
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.large,
  },
});
