import { useLocalSearchParams } from 'expo-router';
import { ExpenseForm } from '@/features/finance/components/ExpenseForm';
import { FinanceStatus } from '@/features/finance/components/FinanceStatus';
import { useExpense } from '@/features/finance/hooks/useExpense';
import { useParticipants } from '@/features/finance/context/ParticipantsContext';
import { ArrowBack } from '@/shared/components/ArrowBack';
import { FixedFormLayout } from '@/shared/components/FixedFormLayout';

export default function EditExpenseScreen() {
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const { expense, loading, error, reload } = useExpense(id);
  const { persistenceAvailable } = useParticipants();
  if (loading || error || !expense) {
    return (
      <FixedFormLayout footer={null}>
        <ArrowBack titleName="Editar Despesa" />
        <FinanceStatus
          loading={loading}
          message={
            loading ? 'Carregando despesa...' : (error ?? 'Esta despesa não foi encontrada.')
          }
          onRetry={error && persistenceAvailable ? reload : undefined}
        />
      </FixedFormLayout>
    );
  }
  return <ExpenseForm key={expense.id} initialExpense={expense} />;
}
