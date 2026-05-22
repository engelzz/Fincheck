import { TextInputProps } from 'react-native';
import { Container, ErrorText, InputField } from './styles';

interface InputProps extends TextInputProps {
  error?: string;
}

export function Input({ error, ...rest }: InputProps) {
  return (
    <Container hasError={!!error}>
      <InputField placeholderTextColor="#adb5bd" {...rest} />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
