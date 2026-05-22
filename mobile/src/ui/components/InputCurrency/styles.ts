import styled from 'styled-components/native';

export const Container = styled.View``;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CurrencyLabel = styled.Text`
  font-family: GeneralSans-400;
  font-size: 20px;
  color: #495057;
`;

export const ErrorText = styled.Text`
  color: #c92a2a;
  font-family: GeneralSans-400;
  font-size: 12px;
  margin-top: 4px;
`;
