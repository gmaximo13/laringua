import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { DarkTheme } from '@/shared/DarkTheme';

export default function HomeTab() {
  const [time, setTime] = useState(new Date());

  const relationshipStartDate = new Date(2025, 2, 22);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  let years = time.getFullYear() - relationshipStartDate.getFullYear();
  let months = time.getMonth() - relationshipStartDate.getMonth();
  let days = time.getDate() - relationshipStartDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(time.getFullYear(), time.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.clover}>
          <Text style={styles.cloverText}>☘</Text>
        </View>
        <View>
          <Text style={styles.titleText}>Laringua</Text>
          <Text style={styles.subtitleText}>Nosso Cantinho</Text>
        </View>
      </View>
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.cardTitleText}>Juntos há:</Text>
          <Text style={styles.balanceCardText}>
            {years} {years === 1 ? 'ano' : 'anos'}, {months} {months === 1 ? 'mês' : 'meses'} e{' '}
            {days} {days === 1 ? 'dia' : 'dias'}
          </Text>
          <Text style={styles.cardSubtitleText}>É só o começo</Text>
        </View>
        <View style={styles.cardClover}>
          <Text style={styles.cardCloverText}>☘</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    gap: 10,
    marginTop: 10,
  },

  clover: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: DarkTheme.colors.prymaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cloverText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraLarge,
  },

  titleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.large,
    fontWeight: 'bold',
  },

  subtitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
  },

  cardTitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.medium,
    fontWeight: 'bold',
  },

  cardSubtitleText: {
    color: DarkTheme.colors.secondaryText,
    fontSize: DarkTheme.fontSizes.extraSmall,
  },

  balanceCardText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraLarge,
    fontWeight: 'bold',
  },

  balanceCard: {
    flexDirection: 'row',
    backgroundColor: DarkTheme.colors.prymaryGreen,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 25,
    padding: 16,
  },

  balanceCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },

  balanceCardTextContainer: {
    gap: 3,
  },

  cardClover: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    opacity: 0.09,
    transform: [{ rotate: '-20deg' }],
  },

  cardCloverText: {
    color: DarkTheme.colors.border,
    fontSize: 50,
  },
});
