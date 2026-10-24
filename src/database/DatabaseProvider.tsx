import { Component, Suspense, type ErrorInfo, type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';

import { DarkTheme } from '@/shared/DarkTheme';
import { initializeDatabase } from './initializeDatabase';

type Props = { children: ReactNode };

function DatabaseStatus({ failed = false }: { failed?: boolean }) {
  return (
    <View style={styles.container}>
      {failed ? (
        <>
          <Text style={styles.text}>Não foi possível abrir os dados do Laringua.</Text>
          <Text style={styles.text}>Feche e abra o aplicativo para tentar novamente.</Text>
        </>
      ) : (
        <>
          <ActivityIndicator color={DarkTheme.colors.secondary} />
          <Text style={styles.text}>Preparando o Laringua...</Text>
        </>
      )}
    </View>
  );
}

// React error boundaries use a class to catch errors from the provider below them.
class DatabaseErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Laringua initialization failed:', error, info.componentStack);
  }

  render() {
    return this.state.failed ? <DatabaseStatus failed /> : this.props.children;
  }
}

export function DatabaseProvider({ children }: Props) {
  return (
    <DatabaseErrorBoundary>
      <Suspense fallback={<DatabaseStatus />}>
        <SQLiteProvider databaseName="laringua.db" onInit={initializeDatabase} useSuspense>
          {children}
        </SQLiteProvider>
      </Suspense>
    </DatabaseErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DarkTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  text: {
    color: DarkTheme.colors.text,
    textAlign: 'center',
    fontFamily: DarkTheme.fonts.families.regular,
  },
});
