import { Redirect } from 'expo-router';

export default function ExpensesScreen() {
  return <Redirect href={{ pathname: '/history', params: { tab: 'expenses' } }} />;
}
