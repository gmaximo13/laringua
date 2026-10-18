import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Text } from 'react-native';

// Defining the layout of the custom tab navigator
export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="home" href="/index">
          <Text>Home</Text>
        </TabTrigger>
        <TabTrigger name="balance" href="/balance">
          <Text>Balance</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
