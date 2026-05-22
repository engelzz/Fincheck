import styled from "styled-components/native";

export const Container = styled.View``;

export const Label = styled.Text<{ hasError?: boolean }>`
  font-family: GeneralSans-400;
  font-size: 16px;
  color: ${({ hasError }) => (hasError ? "#c92a2a" : "#6c757d")};
  margin-bottom: 4px;
`;

export const ColorCircle = styled.View<{
  bg: string;
  borderColor: string;
  isSelected: boolean;
}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ bg }) => bg};
  border-width: ${({ isSelected }) => (isSelected ? "2px" : "1px")};
  border-color: ${({ borderColor, isSelected }) =>
    isSelected ? borderColor : "#dee2e6"};
  align-items: center;
  justify-content: center;
`;

export const CheckMark = styled.Text`
  font-family: GeneralSans-600;
  font-size: 16px;
`;

export const ErrorText = styled.Text`
  color: #c92a2a;
  font-family: GeneralSans-400;
  font-size: 12px;
  margin-top: 4px;
`;
