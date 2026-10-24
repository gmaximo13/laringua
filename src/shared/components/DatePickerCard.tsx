import { AntDesign } from '@react-native-vector-icons/ant-design';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DarkTheme } from '../DarkTheme';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDisplayDate, toCalendarDate } from '@/shared/utils/date';
import { formCardStyles } from './formCardStyles';

export function DatePickerCard({
  value,
  onChange,
  disabled = false,
}: {
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
}) {
  const [localDate, setLocalDate] = useState(new Date());
  const date = value ?? localDate;
  const [show, setShow] = useState(false);

  return (
    <Pressable
      style={formCardStyles.card}
      onPress={() => setShow(true)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Escolher data"
    >
      <View style={styles.cardIcon}>
        <AntDesign name="calendar" color={DarkTheme.colors.text} size={30} />
      </View>
      <View style={formCardStyles.content}>
        <Text style={styles.cardTitleText}>Data</Text>
        <View style={formCardStyles.value}>
          <Text style={styles.dateText}>{formatDisplayDate(toCalendarDate(date))}</Text>
        </View>
        {show && !disabled && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={(event, selectedDate) => {
              setShow(false);

              if (event.type === 'set' && selectedDate) {
                if (onChange) onChange(selectedDate);
                else setLocalDate(selectedDate);
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

  cardIcon: {},

  cardTitleText: {
    color: DarkTheme.colors.text,
    fontSize: DarkTheme.fontSizes.extraSmall,
  },

  dateText: { color: DarkTheme.colors.text, fontSize: DarkTheme.fontSizes.medium },
});
