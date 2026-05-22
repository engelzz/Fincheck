import styled from 'styled-components/native';

export const Container = styled.View<{ hasError?: boolean }>`
  border-width: 1px;
  border-color: ${({ hasError }) => (hasError ? '#c92a2a' : '#ced4da')};
  border-radius: 8px;
`;

export const InputField = styled.TextInput`
  height: 52px;
  padding-horizontal: 16px;
  font-family: GeneralSans-400;
  font-size: 16px;
  color: #212529;
`;

export const ErrorText = styled.Text`
  color: #c92a2a;
  font-family: GeneralSans-400;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 4px;
`;
