import { AntDesign } from '@react-native-vector-icons/ant-design';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DarkTheme } from '../DarkTheme';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export function DatePickerCard() {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <Pressable style={styles.card} onPress={() => setShow(true)}>
      <View style={styles.cardIcon}>
        <AntDesign name="calendar" color={DarkTheme.colors.text} size={30} />
      </View>
      <View style={styles.cardTitle}>
        <Text style={styles.cardTitleText}>Data</Text>
        <Text style={styles.cardTitleText}>
          {date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={(event, selectedDate) => {
              setShow(false);

              if (event.type === 'set' && selectedDate) {
                setDate(selectedDate);
              }
            }}
            onDismiss={() => setShow(false)}
          />
        )}
      </View>
    </Pressable>
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
