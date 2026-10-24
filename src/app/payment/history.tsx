import { Redirect } from 'expo-router';

export default function PaymentHistoryScreen() {
  return <Redirect href={{ pathname: '/history', params: { tab: 'payments' } }} />;
}
