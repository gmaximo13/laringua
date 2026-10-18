import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AntDesign } from '@react-native-vector-icons/ant-design';

import { DarkTheme } from '@/shared/DarkTheme';
// Defining the layout of the custom tab navigator
export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={{ paddingTop: insets.top, flex: 1 }}>
      <TabSlot />
      <TabList style={[styles.tabList, { paddingBottom: insets.bottom + 10 }]}>
        <TabTrigger name="home" href="/">
          <AntDesign name="home" color={DarkTheme.colors.secondary} size={20} />
        </TabTrigger>
        <TabTrigger name="balance" href="/balance">
          <AntDesign name="wallet" color={DarkTheme.colors.secondary} size={20} />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    backgroundColor: DarkTheme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
