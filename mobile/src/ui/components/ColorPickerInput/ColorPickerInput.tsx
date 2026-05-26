import { FlatList, TouchableOpacity } from 'react-native';
import { CheckMark, ColorCircle, Container, ErrorText, Label } from './styles';

const COLORS = [
  { color: '#868E96', bg: '#DEE2E6' },
  { color: '#FA5252', bg: '#FECDD3' },
  { color: '#E64980', bg: '#FBCFE8' },
  { color: '#BE4BDB', bg: '#E9D5FF' },
  { color: '#7950F2', bg: '#DDD6FE' },
  { color: '#4C6EF5', bg: '#C7D2FE' },
  { color: '#228BE6', bg: '#BFDBFE' },
  { color: '#15AABF', bg: '#A5F3FC' },
  { color: '#12B886', bg: '#99F6E4' },
  { color: '#40C057', bg: '#BBF7D0' },
  { color: '#82C91E', bg: '#D9F99D' },
  { color: '#FAB005', bg: '#FEF08A' },
  { color: '#FD7E14', bg: '#FED7AA' },
  { color: '#212529', bg: '#6C757D' },
];

interface ColorPickerInputProps {
  value: string;
  onChange(color: string): void;
  error?: string;
}

export function ColorPickerInput({ value, onChange, error }: ColorPickerInputProps) {
  return (
    <Container>
      <Label hasError={!!error}>Cor</Label>
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.color}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChange(item.color)} style={{ marginRight: 8 }}>
            <ColorCircle bg={item.bg} borderColor={item.color} isSelected={value === item.color}>
              {value === item.color && <CheckMark>✓</CheckMark>}
            </ColorCircle>
          </TouchableOpacity>
        )}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
