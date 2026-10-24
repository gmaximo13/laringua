import { Stack } from 'expo-router';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';

import { DarkTheme } from '@/shared/DarkTheme';
import { DatabaseProvider } from '@/database/DatabaseProvider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterBold: Inter_700Bold,
    InterRegular: Inter_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: DarkTheme.colors.background }}>
      <StatusBar style="dark" />

      <DatabaseProvider>
        <Stack screenOptions={{ contentStyle: { backgroundColor: 'transparent' } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="expenses/index" options={{ headerShown: false }} />
          <Stack.Screen name="expenses/newExpense" options={{ headerShown: false }} />
          <Stack.Screen name="payment/index" options={{ headerShown: false }} />
        </Stack>
      </DatabaseProvider>
    </View>
  );
}
