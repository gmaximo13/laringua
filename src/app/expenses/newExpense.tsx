import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Users, User, PencilLine } from 'lucide-react-native';
import { useState } from 'react';

import { DarkTheme } from '@/shared/DarkTheme';
import { ArrowBack } from '@/shared/components/ArrowBack';
import { Card } from '@/shared/components/Card';
import { HowPaid } from '@/shared/components/HowPaid';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { DatePickerCard } from '@/shared/components/DatePickerCard';

export default function NewExpenseScreen() {
  const [paymentSplit, setpaymentSplit] = useState<'equal' | 'custom' | 'user'>('equal');
  const [text, onChangeText] = useState('');
  const [userText, onChangeUserText] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <ArrowBack titleName="Adicionar Despesa" />
        <Card titleCard="Descrição" keyboardType="default" iconName="form" />
        <DatePickerCard />
        <Card titleCard="Valor" keyboardType="numeric" iconName="dollar" />
        <HowPaid />
        <View>
          <Text style={styles.titleText}>Dividir Pagamento</Text>
          <View style={styles.paymentSplitCardContainer}>
            <Pressable
              onPress={() => setpaymentSplit('equal')}
              style={
                paymentSplit === 'equal' ? styles.paymentSplitCardSelect : styles.paymentSplitCard
              }
            >
              <Users color={DarkTheme.colors.text} size={30} />
              <Text style={styles.paymentSplitCardText}>Igual</Text>
            </Pressable>
            <Pressable
              onPress={() => setpaymentSplit('custom')}
              style={
                paymentSplit === 'custom' ? styles.paymentSplitCardSelect : styles.paymentSplitCard
              }
            >
              <PencilLine color={DarkTheme.colors.text} size={30} />
              <Text style={styles.paymentSplitCardText}>Personalizado</Text>
            </Pressable>
            <Pressable
              onPress={() => setpaymentSplit('user')}
              style={
                paymentSplit === 'user' ? styles.paymentSplitCardSelect : styles.paymentSplitCard
              }
            >
              <User color={DarkTheme.colors.text} size={30} />
              <Text style={styles.paymentSplitCardText}>Total</Text>
            </Pressable>
          </View>
        </View>

        {paymentSplit === 'custom' && (
          <View style={styles.customPaymentContainer}>
            <View style={styles.customPaymentCard}>
              {/* <Text style={styles.customPaymentCardText}>Eu</Text> */}
              <TextInput
                style={styles.customPaymentInput}
                placeholder="Eu"
                placeholderTextColor={DarkTheme.colors.text}
                keyboardType="numeric"
                onChangeText={onChangeUserText}
                value={userText}
              ></TextInput>
            </View>
            <View style={styles.customPaymentCard}>
              {/* <Text style={styles.customPaymentCardText}>Ela</Text> */}
              <TextInput
                style={styles.customPaymentInput}
                placeholder="Ela"
                placeholderTextColor={DarkTheme.colors.text}
                keyboardType="numeric"
                onChangeText={onChangeText}
                value={text}
              ></TextInput>
            </View>
          </View>
        )}
      </View>

      <View>
        <AddValueButton title="Adicionar Despesa" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    backgroundColor: DarkTheme.colors.background,
  },

  paymentSplitContainer: {
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

  paymentSplitCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  paymentSplitCardSelect: {
    backgroundColor: DarkTheme.colors.prymaryGreen,
    borderColor: DarkTheme.colors.border,
    borderWidth: 2,
    borderRadius: 25,
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    paddingVertical: 10,
  },

  paymentSplitCard: {
    borderColor: DarkTheme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    paddingVertical: 10,
  },

  paymentSplitCardText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.small,
  },

  customPaymentContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customPaymentCard: {
    flexDirection: 'row',
    width: '45%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: DarkTheme.colors.border,
    backgroundColor: DarkTheme.colors.prymaryGreen,
    paddingHorizontal: 16,
  },

  // customPaymentCardText: {
  //   color: DarkTheme.colors.text,
  //   fontSize: DarkTheme.fontSizes.medium,
  //   padding: 5,
  // },

  customPaymentInput: {
    width: '80%',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: DarkTheme.fontSizes.medium,
    color: DarkTheme.colors.text,
  },
});
