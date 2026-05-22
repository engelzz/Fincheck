import { useMemo } from 'react';
import { TextInput } from 'react-native';
import { Container, CurrencyLabel, ErrorText, Row } from './styles';

interface InputCurrencyProps {
  value: string | number;
  onChange(value: string): void;
  error?: string;
}

function formatCurrencyDisplay(digits: string): string {
  const num = parseInt(digits || '0', 10);
  return (num / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function InputCurrency({ value, onChange, error }: InputCurrencyProps) {
  const displayValue = useMemo(() => {
    if (typeof value === 'number') {
      return value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return value || '0,00';
  }, [value]);

  function handleChangeText(text: string) {
    const digits = text.replace(/\D/g, '');
    onChange(formatCurrencyDisplay(digits));
  }

  return (
    <Container>
      <Row>
        <CurrencyLabel>R$</CurrencyLabel>
        <TextInput
          value={displayValue}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          selectTextOnFocus
          style={{
            flex: 1,
            fontFamily: 'GeneralSans-600',
            fontSize: 32,
            color: '#212529',
            padding: 0,
          }}
        />
      </Row>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
