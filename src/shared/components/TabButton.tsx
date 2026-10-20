import { AntDesign } from '@react-native-vector-icons/ant-design';
import { TabTriggerSlotProps } from 'expo-router/ui';
import { Pressable } from 'react-native';
import { DarkTheme } from '../DarkTheme';

export type TTabButtonProps = TabTriggerSlotProps & {
  iconName: string;
};

export function TabButton({ iconName, isFocused, ...props }: TTabButtonProps) {
  return (
    <Pressable {...props}>
      <AntDesign
        name={iconName as 'home'}
        color={isFocused ? DarkTheme.colors.prymaryGreen : DarkTheme.colors.text}
        size={25}
        style={{ padding: 5 }}
      />
    </Pressable>
  );
}
