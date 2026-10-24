import { View } from 'react-native';

import { ArrowBack } from '@/shared/components/ArrowBack';
import { Card } from '@/shared/components/Card';
import { HowPaid } from '@/shared/components/HowPaid';
import { AddValueButton } from '@/shared/components/AddValueButton';
import { DatePickerCard } from '@/shared/components/DatePickerCard';
import { FixedFormLayout } from '@/shared/components/FixedFormLayout';

export default function Index() {
  return (
    <FixedFormLayout
      footer={<AddValueButton title="Adicionar Pagamento" style={{ marginBottom: 0 }} />}
    >
      <View>
        <ArrowBack titleName="Adicionar Pagamento" />
        <HowPaid />
        <DatePickerCard />
        <Card titleCard="Valor" keyboardType="number-pad" iconName="dollar" monetary />
      </View>
    </FixedFormLayout>
  );
}
